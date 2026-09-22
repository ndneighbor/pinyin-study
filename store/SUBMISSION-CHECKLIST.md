# Submission status — Pinyin Study 1.4.5

## Published
- On September 21, 2026, the publisher reported completing the Chrome Web Store submission for version 1.4.5.
- Pinyin Study 1.4.5 is published on the [Chrome Web Store](https://chromewebstore.google.com/detail/pinyin-study/llfggmdlfkdimnnofjcidjdicnaoiajp). The public listing was verified on September 21, 2026: version 1.4.5, offered by Angelo, with Add to Chrome available.

## Ready
- Verified 1.4.5 upload ZIP: 9,593 files, manifest at root, bundled licenses. Every packaged file matches the current source; archive integrity and all bundled JSON checked. Permissions are contextMenus, activeTab, and scripting, with no host permissions or persistent content scripts.
- 440 × 280 promotional PNG and two 1280 × 800 screenshots captured from the real popup running locally in Chrome.
- Listing, single-purpose statement, permission explanations, reviewer instructions, and privacy policy updated for toolbar and right-click lookups without broad website access.
- Chrome Web Store product page, support contact, credits, and privacy page deployed to Railway. Public ZIP downloads and developer-install steps are removed.
- Website deployed and verified at https://site-production-7fa7.up.railway.app. Updated 1.4.5 product and privacy copy is live; both pages return 200 with correct canonical URLs. Social images, CSS, and 404 behavior were checked during the original deployment.
- The live product page now shows Add to Chrome linked to the published Chrome Web Store listing. The updated product and privacy pages return HTTP 200, and the availability message is removed.
- Popup checked in Chrome: 学 pronunciation, English meaning and eight-stroke diagram; 银行 phrase pronunciation and definition, with stroke panel hidden.
- All 22 automated checks pass for toolbar selection, input and stroke updates, permission scope, protected-page fallback, editable fields, context-menu input, and delayed-result races. Chrome APIs are mocked in these checks.

## Still required
- Test the installed extension's toolbar selection lookup, right-click menu, protected-page paste fallback, long-text pagination, and disconnected-network behavior. Chrome extension management was blocked by browser policy. Local popup checks do not replace these installation checks.

## Assets
Use screenshot-character-1280x800.jpg and screenshot-phrase-1280x800.jpg for screenshots; pinyin-study-promo-440x280.png for the small promotional tile. The screenshots use the real popup in a promotional layout, without browser-only installation claims. The generated promotional image is artwork, not a UI screenshot.

## Sources
https://developer.chrome.com/docs/webstore/images
https://developer.chrome.com/docs/webstore/cws-dashboard-privacy
https://developer.chrome.com/docs/webstore/publish
