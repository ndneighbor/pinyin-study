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
input.addEventListener('input', updateReading);
function acceptSelection() {
  const selectedText = new URLSearchParams(location.hash.slice(1)).get('text');
  if (selectedText !== null) {
    input.value = selectedText.slice(0, 300);
    history.replaceState(null, '', location.pathname);
  }
  updateReading();
}
window.addEventListener('hashchange', acceptSelection);
acceptSelection();
