globalThis.PinyinStudy = {
  lookup(text) {
    const value = text.trim().slice(0, 300);
    if (!/\p{Script=Han}/u.test(value)) return null;
    const reading = pinyinPro.pinyin(value);
    const alternatives = [...value].length === 1
      ? [...new Set(pinyinPro.pinyin(value, { multiple: true, type: 'array' }))] : [];
    return { text: value, reading, alternatives };
  },
  render(container, result) {
    container.replaceChildren();
    const line = (tag, text, cls) => {
      const el = document.createElement(tag);
      el.textContent = text;
      if (cls) el.className = cls;
      container.append(el);
    };
    line('div', result.text, 'han');
    line('div', result.reading, 'pinyin');
    if (result.alternatives.length > 1) line('div', 'Readings: ' + result.alternatives.join(' · '), 'note');
    line('div', 'Mandarin · Select a phrase for context', 'note');
  }
};
