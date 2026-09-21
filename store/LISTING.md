# Chrome Web Store listing

## Name
Pinyin Study

## Short description
Select Chinese text to see Mandarin pinyin. Offline, with tone marks and alternate readings.

## Detailed description
Read Chinese with a little help from Pinyin Study.

Select a Chinese character or phrase on a webpage to see Mandarin pinyin with tone marks. For a closer look, right-click your selection and choose Show pinyin, or open the extension and type or paste text.

• Pinyin with tone marks and alternate readings for individual characters.
• Optional English dictionary definitions for words and phrases.
• Animated stroke order for supported single characters, with a Replay button.
• Offline pronunciation, dictionary, and stroke data.
• No account, analytics, or lookup history.

Pinyin Study supports selections of up to 300 characters on ordinary webpages. Chrome internal pages and the Chrome Web Store do not support the selection card. For other content, paste text into the popup; PDF right-click lookup works when Chrome supplies the selection.

Pronunciation can vary with context, especially for names and ambiguous phrases. Dictionary entries explain words; they are not sentence translations. Stroke-order data is available for 9,574 characters.

Dictionary: CC-CEDICT/MDBG, CC BY-SA 4.0. Pronunciation: pinyin-pro. Stroke animation: Hanzi Writer, with hanzi-writer-data derived from Make Me a Hanzi. Licenses are bundled with the extension.

## Single purpose
Help users study Chinese text through local Mandarin pronunciation, word definitions, and character stroke-order lookup.

## contextMenus justification
Adds Show pinyin to the selection context menu so users can open selected Chinese text in the extension's lookup window.

## Website access justification
The content script runs on HTTP and HTTPS webpages to detect user text selections and show a pinyin card beside the selection. Selected text is processed locally and is not transmitted. Broad page matching lets this user-initiated lookup work across the webpages the user reads.

## Remote code
No remotely hosted code is executed. All JavaScript, dictionaries, and stroke data are bundled in the extension.

## Data practices draft
No user data is collected or transmitted to the developer or third parties. Selected or pasted text is processed locally, without a saved lookup history. Only the Show meaning preference is persisted in local storage. External attribution links open third-party websites when clicked.

## Reviewer instructions
No account or credentials are required.
1. Open a normal webpage containing 你好 or 银行; select the Chinese text and verify a pinyin card appears.
2. Right-click Chinese text and choose Show pinyin. Verify the lookup window opens.
3. Enable Show meaning to see English word definitions.
4. Enter 学 to see stroke order and use Replay. Enter a phrase to hide stroke order.
5. Try a long passage with meanings enabled; use the page arrows when present.
6. Disconnect from the network and repeat popup lookups to verify local operation.

## Release notes
1.4.4: Simplified footer credits and hid unnecessary single-page navigation.

## Website and support
Homepage (after site deployment): https://ngelo.xyz/pinyin-study
Privacy policy (after site deployment): https://ngelo.xyz/pinyin-study/privacy
Support: email@ngelo.xyz

Do not enter the proposed URLs into the store until the website change is deployed and the pages are publicly accessible.
