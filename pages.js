const pageView = document.getElementById('page');
const previous = document.getElementById('prev');
const next = document.getElementById('next');
const count = document.getElementById('page-count');
let pages = [], pageIndex = 0;
function displayPage() {
  pageView.replaceChildren(...(pages[pageIndex] || []).map(node => node.cloneNode(true)));
  const multiplePages = pages.length > 1;
  document.getElementById('pager').style.visibility = multiplePages ? 'visible' : 'hidden';
  count.textContent = multiplePages ? `${pageIndex + 1} / ${pages.length}` : '';
  previous.disabled = pageIndex === 0; next.disabled = pageIndex >= pages.length - 1;
}
function paginate() {
  pages = []; pageIndex = 0; pageView.replaceChildren();
  const blocks = [...document.getElementById('result').children];
  const definitions = document.getElementById('meaning');
  if (!definitions.hidden) {
    if (definitions.children.length) blocks.push(...definitions.children);
    else if (definitions.textContent) { const p = document.createElement('p'); p.textContent = definitions.textContent; blocks.push(p); }
  }
  function save() { pages.push([...pageView.children].map(n => n.cloneNode(true))); pageView.replaceChildren(); }
  for (const block of blocks) {
    let node = block.cloneNode(true); pageView.append(node);
    if (pageView.scrollHeight <= pageView.clientHeight) continue;
    node.remove();
    if (pageView.children.length) save();
    pageView.append(node);
    if (pageView.scrollHeight <= pageView.clientHeight) continue;
    // Split unusually long blocks at character boundaries so nothing is discarded.
    const chars = [...node.textContent]; node.textContent = '';
    for (const char of chars) {
      const before = node.textContent; node.textContent += char;
      if (pageView.scrollHeight > pageView.clientHeight && before) {
        node.textContent = before; save();
        node = block.cloneNode(false); node.textContent = char; pageView.append(node);
      }
    }
  }
  if (pageView.children.length || !pages.length) save();
  displayPage();
}
previous.addEventListener('click', () => { if(pageIndex > 0) { pageIndex--; displayPage(); } });
next.addEventListener('click', () => { if(pageIndex < pages.length - 1) { pageIndex++; displayPage(); } });
let scheduled;
function schedulePages() { cancelAnimationFrame(scheduled); scheduled = requestAnimationFrame(paginate); }
new MutationObserver(schedulePages).observe(document.getElementById('source'), {childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['hidden']});
window.addEventListener('resize', schedulePages);
schedulePages();
