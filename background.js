const MENU_ID = 'show-pinyin';
const MENU_OPTIONS = { title: 'Show pinyin for “%s”', contexts: ['selection'] };
// Chrome keeps menus across worker restarts. Update before attempting creation.
function updateMenu() {
  return new Promise(resolve => {
    chrome.contextMenus.update(MENU_ID, MENU_OPTIONS, () => {
      resolve(!chrome.runtime.lastError);
    });
  });
}
async function ensureMenu() {
  if (await updateMenu()) return;
  const created = await new Promise(resolve => {
    chrome.contextMenus.create({ id: MENU_ID, ...MENU_OPTIONS }, () => {
      const error = chrome.runtime.lastError;
      resolve({ ok: !error, message: error?.message });
    });
  });
  // Another registration may have completed between update and create.
  if (!created.ok && !(await updateMenu())) {
    console.error('Pinyin Study could not register its menu:', created.message);
  }
}
let menuRegistration = Promise.resolve();
function registerMenu() {
  menuRegistration = menuRegistration.then(ensureMenu).catch(error => {
    console.error('Pinyin Study menu registration failed:', error);
  });
  return menuRegistration;
}
chrome.runtime.onInstalled.addListener(registerMenu);
chrome.runtime.onStartup.addListener(registerMenu);
// Serialize lookups so rapid clicks cannot create duplicate windows.
let pending = Promise.resolve();
async function showLookup(text) {
  const base = chrome.runtime.getURL('popup.html');
  const url = base + '#text=' + encodeURIComponent(text);
  const windows = await chrome.windows.getAll({ populate: true, windowTypes: ['popup'] });
  for (const win of windows) {
    const tab = win.tabs?.find(tab => tab.url?.split('#')[0] === base);
    if (!tab) continue;
    try {
      await chrome.tabs.update(tab.id, { url });
      await chrome.windows.update(win.id, { focused: true, width: 600, height: 640 });
      return;
    } catch { /* The user may have closed the window during the lookup. */ }
  }
  await chrome.windows.create({ url, type: 'popup', width: 600, height: 640 });
}
chrome.contextMenus.onClicked.addListener(info => {
  if (info.menuItemId !== 'show-pinyin' || !info.selectionText) return;
  const text = info.selectionText.trim().slice(0, 300);
  pending = pending.catch(() => {}).then(() => showLookup(text));
});
