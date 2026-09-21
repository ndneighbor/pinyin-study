# Pinyin Study — Chrome Web Store release

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

1. Use the verified Railway product and privacy URLs above in the submission.
2. Finish installed-extension verification: toolbar selection lookup, right-click menu, protected-page paste fallback, long-text pagination, and disconnected-network behavior.
3. Open the item in the Chrome Web Store developer dashboard, upload the 1.4.5 extension ZIP, complete the listing/privacy fields and contact email verification, and submit for review. Automated dashboard access is blocked; these steps need to be completed manually.
4. After publication, verify and add the store URL as described above.
