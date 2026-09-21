# Pinyin Study — Chrome Web Store release

## Public pages

- Product and support: https://ngelo.xyz/pinyin-study
- Privacy policy: https://ngelo.xyz/pinyin-study/privacy
- Support email: email@ngelo.xyz

These URLs become valid after this site change is merged and deployed. Verify both pages before entering them in the developer dashboard. The product page offers Chrome Web Store installation only; submission archives are kept outside the public site.

## Install link

`src/data/pinyin-study.json` contains `chromeWebStoreUrl`. It is currently null because a published listing URL has not been provided or verified.

Once the store listing is published, set that field to its full `https://chromewebstore.google.com/detail/...` URL. Build and deploy. The page automatically replaces the availability message with Add to Chrome. Do not link to search results, the publisher dashboard, or a locally installed extension ID.

## Submission materials

The companion ndneighbor/pinyin-study repository contains `store/LISTING.md`, privacy disclosures, screenshots, and promotional art. Use the extension-only `pinyin-study-1.4.4.zip` for the store upload. The larger submission bundle contains reference documents and artwork and must not be uploaded as the extension package.

## Outstanding release steps

1. Deploy this product and privacy page.
2. Finish installed-extension verification: selection card, right-click menu, long-text pagination, and disconnected-network behavior.
3. Create or open the item in the Chrome Web Store developer dashboard, upload the extension ZIP, complete the listing/privacy fields, and submit for review. Dashboard access was denied during preparation; submission has not occurred.
4. After publication, verify and add the store URL as described above.
