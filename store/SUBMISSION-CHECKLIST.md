# Submission status — Pinyin Study 1.4.4

## Ready
- Verified upload ZIP, 9,594 files, manifest at root, bundled licenses. Every packaged file matches the current source; archive integrity and all bundled JSON checked.
- 440 × 280 promotional PNG and two 1280 × 800 screenshots captured from the real popup running locally in Chrome.
- Listing, single-purpose statement, permission explanations, reviewer instructions, and privacy policy.
- Chrome Web Store product page, support contact, credits, and privacy page prepared in ngelo.xyz pull request. Public ZIP downloads and developer-install steps are removed.
- Website production build passed.
- Popup checked in Chrome: 学 pronunciation, English meaning and eight-stroke diagram; 银行 phrase pronunciation and definition, with stroke panel hidden.

## Still required
- After store publication, add the verified listing URL to the site’s `src/data/pinyin-study.json` and deploy to enable Add to Chrome. Until then the page shows Coming to the Chrome Web Store.
- Merge and deploy the ngelo.xyz change, then verify https://ngelo.xyz/pinyin-study and https://ngelo.xyz/pinyin-study/privacy are publicly available.
- Test the installed extension's selection card, right-click menu, long-text pagination, and disconnected-network behavior. Chrome extension management was blocked by browser policy. Local popup checks do not replace these installation checks.
- Open the Chrome Web Store developer dashboard, complete any registration, upload the ZIP and artwork, copy the listing/privacy fields, and submit for review. Publisher dashboard access was denied in this session; nothing was uploaded or submitted.

## Assets
Use screenshot-character-1280x800.jpg and screenshot-phrase-1280x800.jpg for screenshots; pinyin-study-promo-440x280.png for the small promotional tile. The screenshots use the real popup in a promotional layout, without browser-only installation claims. The generated promotional image is artwork, not a UI screenshot.

## Sources
https://developer.chrome.com/docs/webstore/images
https://developer.chrome.com/docs/webstore/cws-dashboard-privacy
https://developer.chrome.com/docs/webstore/publish
