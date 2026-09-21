# Pinyin Study — Chrome Web Store release

## Submission status

On September 21, 2026, the publisher reported completing the Chrome Web Store submission for version 1.4.5. Review is pending; the dashboard status has not been independently verified. Approval, publication, and a public listing URL have not been verified.

## Public pages on Railway

- Product and support: https://site-production-7fa7.up.railway.app/pinyin-study
- Privacy policy: https://site-production-7fa7.up.railway.app/pinyin-study/privacy
- Support email: email@ngelo.xyz

The Railway URLs were deployed and verified on September 21, 2026. The eventual custom-domain routes are https://ngelo.xyz/pinyin-study and https://ngelo.xyz/pinyin-study/privacy. The product page offers Chrome Web Store installation only; submission archives are kept outside the public site.

## Install link

`src/data/pinyin-study.json` contains `chromeWebStoreUrl`. It is currently null because a published listing URL has not been provided or verified.

Once the store listing is published, set that field to its full `https://chromewebstore.google.com/detail/...` URL. Build and deploy. The page automatically replaces the availability message with Add to Chrome. Do not link to search results, the publisher dashboard, or a locally installed extension ID.

## Submission materials

The companion ndneighbor/pinyin-study repository contains `store/LISTING.md`, privacy disclosures, screenshots, and promotional art. Use the extension-only `pinyin-study-1.4.5.zip` for the store upload. The larger submission bundle contains reference documents and artwork and must not be uploaded as the extension package.

Version 1.4.5 uses toolbar and right-click lookups. It requests contextMenus, activeTab, and scripting, without broad host permissions or persistent content scripts. The product page and privacy policy describe this behavior.

## Outstanding release steps

1. Finish installed-extension verification: toolbar selection lookup, right-click menu, protected-page paste fallback, long-text pagination, and disconnected-network behavior. Submission does not establish that these checks were performed.
2. After approval and publication, verify and add the store URL as described above.
