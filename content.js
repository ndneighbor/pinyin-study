(() => {
  let host;
  function dismiss() { host?.remove(); host = null; }
  function showSelection() {
    const active = document.activeElement;
    if (active && (active.matches('input, textarea') || active.isContentEditable)) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) return dismiss();
    const text = selection.toString().trim();
    if (text.length > 300) return dismiss();
    const result = PinyinStudy.lookup(text);
    if (!result) return dismiss();
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    dismiss();
    host = document.createElement('div');
    host.style.cssText = 'all:initial!important;position:fixed!important;z-index:2147483647!important;display:block!important;';
    const root = host.attachShadow({ mode: 'closed' });
    const style = document.createElement('style');
    style.textContent = `:host{color-scheme:light} .card{box-sizing:border-box;width:310px;max-width:calc(100vw - 24px);max-height:250px;overflow:auto;padding:20px;background:#fffdf7;color:#233e35;border:1px solid #cbd7c9;border-radius:16px;box-shadow:0 8px 32px #102c3229;font:14px/1.5 system-ui,sans-serif;overflow-wrap:anywhere}.han{font-size:25px;padding-right:22px}.pinyin{font-size:23px;color:#23745b;margin:6px 0 12px}.note{font-size:12px;color:#65756c;margin-top:5px}button{float:right;border:0;background:none;font-size:22px;cursor:pointer;color:#65756c}`;
    const card = document.createElement('div');
    card.className = 'card'; card.setAttribute('role','region'); card.setAttribute('aria-label','Pinyin pronunciation');
    const close = document.createElement('button'); close.textContent = '×'; close.setAttribute('aria-label','Close pinyin'); close.onclick = dismiss;
    const body = document.createElement('div');
    PinyinStudy.render(body, result);
    card.append(close, body); root.append(style, card); document.documentElement.append(host);
    host.addEventListener('pointerup', e => e.stopPropagation());
    const box = host.getBoundingClientRect();
    host.style.setProperty('left', Math.max(12, Math.min(rect.left, innerWidth - box.width - 12)) + 'px', 'important');
    const top = rect.bottom + 10 + box.height <= innerHeight ? rect.bottom + 10 : rect.top - box.height - 10;
    host.style.setProperty('top', Math.max(12, top) + 'px', 'important');
  }
  document.addEventListener('pointerup', showSelection);
  document.addEventListener('keyup', e => { if(e.key === 'Escape') dismiss(); else if(e.key.startsWith('Arrow') && e.shiftKey) showSelection(); });
  document.addEventListener('pointerdown', e => { if(host && !e.composedPath().includes(host)) dismiss(); });
  window.addEventListener('scroll', dismiss, true);
  window.addEventListener('resize', dismiss);
})();
