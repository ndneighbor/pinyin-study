const input = document.getElementById('text');
const output = document.getElementById('result');
function updateReading() {
  updateMeaning();
  const result = PinyinStudy.lookup(input.value);
  if (result) PinyinStudy.render(output, result);
  else { output.replaceChildren(); const hint = document.createElement('p'); hint.className = 'note'; hint.textContent = input.value.trim() ? 'Enter at least one Chinese character.' : 'Type above to see pinyin with tone marks.'; output.append(hint); }
}

const toggle = document.getElementById('show-meaning');
const meaning = document.getElementById('meaning');
toggle.checked = localStorage.getItem('showMeaning') === 'true';
let dictionaryPromise;
let revision = 0;
async function updateMeaning() {
  const version = ++revision;
  meaning.hidden = !toggle.checked;
  meaning.replaceChildren();
  if (!toggle.checked || !/\p{Script=Han}/u.test(input.value)) return;
  meaning.textContent = 'Loading definitions…';
  try {
    dictionaryPromise ||= fetch('vendor/meanings.json').then(r => { if (!r.ok) throw Error(); return r.json(); });
    const dictionary = await dictionaryPromise;
    if (version !== revision) return;
    meaning.replaceChildren();
    const text = input.value.trim().slice(0, 300);
    const words = [];
    if (Object.hasOwn(dictionary, text)) words.push(text);
    else {
      const chars = [...text];
      for (let i = 0; i < chars.length;) {
        if (!/\p{Script=Han}/u.test(chars[i])) { i++; continue; }
        let word = chars[i];
        for (let n = Math.min(20, chars.length - i); n > 1; n--) {
          const candidate = chars.slice(i, i + n).join('');
          if (Object.hasOwn(dictionary, candidate)) { word = candidate; break; }
        }
        words.push(word); i += [...word].length;
      }
    }
    const caption = document.createElement('p'); caption.className = 'note';
    caption.textContent = 'English meanings';
    meaning.append(caption);
    for (const word of [...new Set(words)]) {
      const title = document.createElement('strong'); title.textContent = word; meaning.append(title);
      const entries = Object.hasOwn(dictionary, word) ? dictionary[word] : [];
      for (const [reading, definition] of entries) {
        const row = document.createElement('p'); row.textContent = reading + ' — ' + definition; meaning.append(row);
      }
      if (!entries.length) { const row = document.createElement('p'); row.textContent = 'No dictionary entry found.'; meaning.append(row); }
    }
  } catch {
    dictionaryPromise = null;
    if (version === revision) meaning.textContent = 'Could not load definitions. Uncheck and recheck to retry.';
  }
}
toggle.addEventListener('change', () => {
  localStorage.setItem('showMeaning', String(toggle.checked)); updateMeaning();
});
let selectionRevision = 0;
input.addEventListener('input', () => {
  selectionRevision++;
  updateReading();
});
function acceptSelection() {
  selectionRevision++;
  const selectedText = new URLSearchParams(location.hash.slice(1)).get('text');
  if (selectedText !== null) {
    input.value = selectedText.slice(0, 300);
    history.replaceState(null, '', location.pathname);
  }
  updateReading();
  return selectedText !== null;
}

async function readTabSelection() {
  if (!globalThis.chrome?.scripting || !chrome.tabs) return;
  const version = selectionRevision;
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id || !/^https?:\/\//.test(tab.url || '')) return;
    if (version !== selectionRevision) return;
    const [selection] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const active = document.activeElement;
        if (active?.matches('input, textarea') || active?.isContentEditable) return '';
        return (window.getSelection()?.toString() || '').trim().slice(0, 300);
      }
    });
    const text = selection?.result;
    if (version !== selectionRevision || typeof text !== 'string' || !/\p{Script=Han}/u.test(text)) return;
    input.value = text.slice(0, 300);
    // Notify the reading and stroke panels together, just like typed text.
    input.dispatchEvent(new Event('input', { bubbles: true }));
  } catch {
    // Chrome-protected pages remain usable through the popup's text field.
  }
}
window.addEventListener('hashchange', acceptSelection);
if (!acceptSelection()) readTabSelection();
