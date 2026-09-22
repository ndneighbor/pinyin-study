# Chrome Web Store listing

## Published listing
Pinyin Study 1.4.5 is live: https://chromewebstore.google.com/detail/pinyin-study/llfggmdlfkdimnnofjcidjdicnaoiajp

The public listing was verified on September 21, 2026: version 1.4.5, offered by Angelo, with Add to Chrome available. The text below is retained as the listing and reviewer reference for this release.

## Name
Pinyin Study

## Short description
Look up Chinese text for Mandarin pinyin, word meanings, and stroke order. Works offline.

## Detailed description
Read Chinese with a little help from Pinyin Study.

Select Chinese text on a webpage, then click the Pinyin Study toolbar icon or right-click and choose Show pinyin. You can also type or paste text into the popup.

• Pinyin with tone marks and alternate readings for individual characters.
• Optional English dictionary definitions for words and phrases.
• Animated stroke order for supported single characters, with a Replay button.
• Offline pronunciation, dictionary, and stroke data.
• No account, analytics, or lookup history.

Pinyin Study supports up to 300 characters per lookup. Toolbar lookup works on ordinary webpages. For Chrome internal pages, the Chrome Web Store, and other unsupported content, paste text into the popup. PDF right-click lookup works when Chrome supplies the selection.

Page access is temporary and starts when you click the toolbar icon. The extension does not request broad website access or monitor pages in the background.

Pronunciation can vary with context, especially for names and ambiguous phrases. Dictionary entries explain words; they are not sentence translations. Stroke-order data is available for 9,574 characters.

Dictionary: CC-CEDICT/MDBG, CC BY-SA 4.0. Pronunciation: pinyin-pro. Stroke animation: Hanzi Writer, with hanzi-writer-data derived from Make Me a Hanzi. Licenses are bundled with the extension.

## Single purpose
Help users study Chinese text through local Mandarin pronunciation, word definitions, and character stroke-order lookup.

## contextMenus justification
Adds Show pinyin to the selection context menu so users can open selected Chinese text in the extension's lookup window.

## activeTab justification
Provides temporary access to the current tab when the user clicks the Pinyin Study toolbar icon, so the extension can read the selected Chinese text and show a local lookup. It is not used to monitor browsing or access pages in the background.

## scripting justification
Runs a bundled function once in the active page to read the user's selected text after a toolbar click. The selection is processed locally for pinyin, word definitions, and stroke order. No code is downloaded or injected into other tabs.

## Host permissions
Version 1.4.5 requests no host permissions and has no persistent content scripts.

## Remote code
Select "No, I am not using remote code." All JavaScript, dictionaries, and stroke data are bundled in the extension. No remotely hosted code is executed.

## Data practices
Disclose Website content for the selected, typed, or pasted text processed by the extension, even though processing stays on the device. No lookup text is transmitted to the developer or third parties, and no lookup history is saved. Only the Show meaning preference is persisted in local storage. External attribution links open third-party websites when clicked.

The extension does not sell or share user data, use it for purposes unrelated to its single purpose, or use it for creditworthiness or lending decisions. Review and complete the dashboard's required data-use certifications.

## Reviewer instructions
No account or credentials are required.
1. Pin Pinyin Study to the toolbar. On an ordinary webpage, select 你好 or 银行. Click the toolbar icon and verify the selected text and pinyin appear in the popup.
2. Select different Chinese text, right-click, and choose Show pinyin. Verify the lookup window opens with that selection. Repeat to verify the window is reused.
3. Enable Show meaning to see English word definitions.
4. Enter 学 to see stroke order and use Replay. Enter a phrase to hide stroke order.
5. Try a long passage with meanings enabled; use the page arrows when present.
6. On a Chrome internal page, open the popup and paste Chinese text to verify lookup works without page access.
7. Disconnect from the network and repeat popup lookups to verify local operation.
8. Select text without opening the extension and verify no card appears. The extension should request no access to all websites.

## Release notes
1.4.5: Replaced automatic selection cards with toolbar and right-click lookups. Removed broad website access; toolbar lookup now uses temporary access after a click.

## Website and support
Homepage: https://site-production-7fa7.up.railway.app/pinyin-study
Privacy policy: https://site-production-7fa7.up.railway.app/pinyin-study/privacy
Support: email@ngelo.xyz

Both Railway URLs were verified publicly accessible on September 21, 2026. Use these URLs for submission; update them after the custom-domain cutover.
