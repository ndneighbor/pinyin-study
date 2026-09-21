const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const extension = path.join(__dirname, '..');
const popupCode = readFileSync(path.join(extension, 'popup.js'), 'utf8');
const strokesCode = readFileSync(path.join(extension, 'strokes.js'), 'utf8');

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function element() {
  const listeners = new Map();
  return {
    value: '', checked: false, hidden: false, textContent: '', children: [],
    addEventListener(type, callback) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(callback);
    },
    dispatchEvent(event) {
      for (const callback of listeners.get(event.type) || []) callback(event);
      return true;
    },
    replaceChildren(...children) { this.children = children; },
    append(child) { this.children.push(child); },
    setAttribute() {},
  };
}

function openPopup(options = {}) {
  const elements = new Map();
  const getElement = id => {
    if (!elements.has(id)) elements.set(id, element());
    return elements.get(id);
  };
  const calls = { queries: [], injections: [], renders: [], fetches: [], strokes: [], inputs: [] };
  const window = element();
  const location = { hash: options.hash || '', pathname: '/popup.html' };
  const chrome = {
    tabs: {
      async query(query) {
        calls.queries.push(query);
        return options.queryResult ? await options.queryResult : [options.tab || { id: 7, url: 'https://example.com/study' }];
      },
    },
    scripting: {
      async executeScript(details) {
        calls.injections.push(details);
        if (options.injectionResult) return await options.injectionResult;
        // Chrome serializes the function into the target page's isolated world.
        const result = vm.runInNewContext(`(${details.func.toString()})()`, {
          document: { activeElement: options.activeElement || { matches: () => false, isContentEditable: false } },
          window: { getSelection: () => ({ toString: () => options.selection || '' }) },
        });
        return [{ result }];
      },
    },
  };
  const context = vm.createContext({
    document: { getElementById: getElement, createElement: element },
    window, location,
    history: { replaceState() { location.hash = ''; } },
    localStorage: { getItem: () => null, setItem() {} },
    URLSearchParams, Event, chrome: options.noChrome ? undefined : chrome,
    PinyinStudy: {
      lookup: text => /\p{Script=Han}/u.test(text) ? { text } : null,
      render: (_, result) => calls.renders.push(result.text),
    },
    fetch: async url => {
      calls.fetches.push(url);
      return { ok: true, json: async () => ({ strokes: ['test stroke'] }) };
    },
    schedulePages() {},
    matchMedia: () => ({ matches: false }),
    HanziWriter: {
      create: (_, character) => {
        calls.strokes.push(character);
        return { animateCharacter: async () => {}, pauseAnimation() {} };
      },
    },
  });
  getElement('text').addEventListener('input', () => calls.inputs.push(getElement('text').value));
  vm.runInContext(popupCode, context, { filename: 'popup.js' });
  // Test the real stroke listener as well as the pronunciation update.
  vm.runInContext(strokesCode, context, { filename: 'strokes.js' });
  return {
    calls, getElement,
    type(text) {
      getElement('text').value = text;
      getElement('text').dispatchEvent(new Event('input'));
    },
    selectFromMenu(text) {
      location.hash = '#text=' + encodeURIComponent(text);
      window.dispatchEvent(new Event('hashchange'));
    },
  };
}

const settle = () => new Promise(resolve => setImmediate(resolve));

test('manifest grants user-initiated lookup only, without background site access', () => {
  const manifest = JSON.parse(readFileSync(path.join(extension, 'manifest.json'), 'utf8'));
  assert.deepEqual([...manifest.permissions].sort(), ['activeTab', 'contextMenus', 'scripting']);
  assert.equal(manifest.host_permissions, undefined);
  assert.equal(manifest.optional_host_permissions, undefined);
  assert.equal(manifest.content_scripts, undefined);
});

test('toolbar selection updates pronunciation and the real stroke listener', async () => {
  const popup = openPopup({ selection: '  学  ' });
  await settle();
  assert.equal(popup.getElement('text').value, '学');
  assert.deepEqual(popup.calls.inputs, ['学']);
  assert.deepEqual(popup.calls.renders, ['学']);
  assert.deepEqual(popup.calls.strokes, ['学']);
  assert.deepEqual(popup.calls.fetches, ['vendor/strokes/%E5%AD%A6.json']);
  assert.equal(popup.calls.injections[0].target.tabId, 7);
});

test('toolbar capture caps selected text at 300 characters', async () => {
  const popup = openPopup({ selection: '学'.repeat(350) });
  await settle();
  assert.equal(popup.getElement('text').value, '学'.repeat(300));
});

test('chrome pages, extension pages, and missing tab URL never trigger injection', async t => {
  for (const tab of [
    { id: 7, url: 'chrome://settings/' },
    { id: 7, url: 'chrome-extension://example/popup.html' },
    { id: 7, url: 'file:///tmp/example.html' },
    { id: 7 },
  ]) {
    await t.test(tab.url || 'missing URL', async () => {
      const popup = openPopup({ tab, selection: '学' });
      await settle();
      assert.equal(popup.calls.injections.length, 0);
      popup.type('好');
      assert.equal(popup.calls.renders.at(-1), '好');
    });
  }
});

test('selection inside input, textarea, or editable content is excluded', async t => {
  for (const kind of ['input', 'textarea', 'contenteditable']) {
    await t.test(kind, async () => {
      const popup = openPopup({
        selection: '私密',
        activeElement: {
          matches: selector => selector.split(', ').includes(kind),
          isContentEditable: kind === 'contenteditable',
        },
      });
      await settle();
      assert.equal(popup.getElement('text').value, '');
      assert.equal(popup.calls.inputs.length, 0);
    });
  }
});

test('failed injection leaves manual lookup usable', async () => {
  const injection = deferred();
  const popup = openPopup({ injectionResult: injection.promise });
  await settle();
  injection.reject(new Error('Cannot access a Chrome-protected page'));
  await settle();
  popup.type('好');
  await settle();
  assert.equal(popup.calls.renders.at(-1), '好');
  assert.equal(popup.calls.strokes.at(-1), '好');
});

test('non-Chinese and empty selections leave a blank manual lookup', async t => {
  for (const selection of ['', '   ', 'hello']) {
    await t.test(JSON.stringify(selection), async () => {
      const popup = openPopup({ selection });
      await settle();
      assert.equal(popup.getElement('text').value, '');
      assert.equal(popup.calls.inputs.length, 0);
    });
  }
});

test('context-menu text bypasses toolbar capture and renders strokes', async () => {
  const popup = openPopup({ hash: '#text=' + encodeURIComponent('学'), selection: '错误' });
  await settle();
  assert.equal(popup.calls.queries.length, 0);
  assert.equal(popup.calls.injections.length, 0);
  assert.equal(popup.getElement('text').value, '学');
  assert.deepEqual(popup.calls.strokes, ['学']);
  popup.selectFromMenu('好');
  await settle();
  assert.equal(popup.getElement('text').value, '好');
  assert.deepEqual(popup.calls.strokes, ['学', '好']);
});

test('typing while tab discovery is pending prevents injection', async () => {
  const query = deferred();
  const popup = openPopup({ queryResult: query.promise, selection: '错误' });
  popup.type('好');
  query.resolve([{ id: 7, url: 'https://example.com/' }]);
  await settle();
  assert.equal(popup.calls.injections.length, 0);
  assert.equal(popup.getElement('text').value, '好');
});

test('late selection cannot replace text the user typed', async () => {
  const injection = deferred();
  const popup = openPopup({ injectionResult: injection.promise });
  await settle();
  popup.type('好');
  injection.resolve([{ result: '错误' }]);
  await settle();
  assert.equal(popup.getElement('text').value, '好');
  assert.deepEqual(popup.calls.inputs, ['好']);
});

test('late selection cannot replace a newer context-menu lookup', async () => {
  const injection = deferred();
  const popup = openPopup({ injectionResult: injection.promise });
  await settle();
  popup.selectFromMenu('好');
  injection.resolve([{ result: '错误' }]);
  await settle();
  assert.equal(popup.getElement('text').value, '好');
  assert.deepEqual(popup.calls.strokes, ['好']);
});

test('ordinary browser preview remains usable without extension APIs', async () => {
  const popup = openPopup({ noChrome: true });
  await settle();
  popup.type('好');
  assert.equal(popup.calls.renders.at(-1), '好');
  assert.equal(popup.calls.injections.length, 0);
});
