# Homepage redesign and search release notes

Prepared on October 18, 2026. The owner authorized publishing the redesigned website on October 18, superseding the earlier app-approval hold. See RELEASE-2026-10-18.md for release checks and rollback. No Search Console submission or live analytics configuration was performed.

## Page structure

The homepage moves from a general feature-card grid to a product-led path: benefit and download action, actual app overview, selectable expense/budget/loan previews, daily check-in streak scene, three setup steps, visible FAQs, and a final download action. The app's Nunito font, saved blue palette, original mascot, neutral borders, and solid button edges remain the visual foundation.

Mobbin references informed hierarchy and product presentation, not the artwork or app interface:

- [Monarch: product screen beside the value proposition](https://mobbin.com/sites/sections/5e856b27-50dc-48c3-8378-05260573e2b8).
- [Aave: compact benefit and iOS download action](https://mobbin.com/sites/sections/fb1684ae-9a5f-473d-9c3c-961aa6d0e46d).
- [Origin: connect product detail with a benefit](https://mobbin.com/sites/sections/ea1010a1-7f9e-40c2-8b07-3838bc45eb0b).

Screenshots come from the sibling app project's `output/appstore-screenshots-2026-10-17/corrected/iphone/en/` folder. Its README identifies these as actual app captures with demo fixtures. Web copies preserve the full screen and aspect ratio, resized to 660 pixels wide and encoded as WebP. Financial figures are sample fixtures from the app captures. Image alt text identifies the sample data. The owner requested removal of the visible screenshot captions. Homepage text and app screenshots support English, German, Spanish, Japanese, Korean, Simplified Chinese, and Traditional Chinese. The Automatic language choice follows browser language preferences, including regional matching, with manual overrides saved locally. Translations are bundled; no live translation provider is contacted. Contact supports the same seven languages. Legal text retains its existing English, Simplified Chinese, and Traditional Chinese versions; other selections use the English legal text with localized navigation.

## Intended search appearance

Site name: **Nuvio**

Title, 50 characters:

> Nuvio: Expense Tracker & Budget Planner for iPhone

Description, 147 characters:

> Track expenses, plan your budget, and build better money habits with Nuvio for iPhone. See where you can save. Free to download, with optional Pro.

The title states product, purpose, and platform. The description adds the habit-building purpose, saving benefit, and free download with optional Pro. The title and description are suggestions, not a controlled preview of a Google result.

Google sets no character limit for titles or descriptions. It truncates to available device width and may generate different title links or snippets from page content. The chosen lengths are editing decisions for this page, not Google requirements. Sources: [title links](https://developers.google.com/search/docs/appearance/title-link), [snippets](https://developers.google.com/search/docs/appearance/snippet).

## Search implementation

- One visible H1, descriptive section headings, standard links, and useful text in the original HTML.
- Canonical homepage remains `https://nuviomm.com/`. Social titles and descriptions match the search metadata.
- A 1200 by 630 pixel branded social preview and correctly sized app-face favicons replace the old icon references. Manifest icon paths resolve relative to their manifest files.
- Connected Organization, WebSite, WebPage, MobileApplication, and FAQPage data describe the page and app. The unverified aggregate rating, obsolete version/date claims, and nonexistent site-search action were removed.
- FAQ structured data matches the four questions and answers available in the page's expandable details. This does not promise FAQ rich-result eligibility. Google requires structured data to represent actual page content: [structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
- Sitemaps retain existing public URLs and record actual local page modification dates.
- No new crawler restrictions, special AI files, or fabricated reviews. Google describes the same SEO foundations for AI Overviews and AI Mode: [AI features and websites](https://developers.google.com/search/docs/appearance/ai-features).

## Measurement after release

The existing Google Analytics tag receives a custom `app_store_click` event when a visitor clicks a homepage download link on `nuviomm.com`. The `placement` parameter distinguishes header, mobile-menu, hero, insights, expenses, budgets, loans, and footer. Local previews do not send this custom event. A click records outbound intent, not an installed app. See [Google Analytics event setup](https://developers.google.com/analytics/devguides/collection/ga4/events).

After publishing:

1. Confirm app availability and Pro wording against the approved release. Check every App Store link.
2. Inspect the homepage in Search Console and validate live structured data in Google's Rich Results Test. Request indexing and confirm the sitemap is accessible. Local syntax validation cannot establish Google's live eligibility or index status.
3. Verify `app_store_click` in Analytics Realtime. Register `placement` as an event-scoped custom dimension for placement reports if desired. Analytics account settings were not changed here.
4. Compare Search Console impressions, clicks, CTR, and average position over comparable periods, split by query, device, and country. Separate branded searches from general expense-tracker and budget-app searches. No CTR or ranking uplift has been measured.
5. Compare outbound App Store clicks per landing-page session separately from search CTR. Query mix, ranking, seasonality, and the approved app release may affect the result alongside the website change.

The current language switcher uses one URL. It does not establish separate language pages or hreflang targets. Dedicated localized URLs can be a later international-search change; none were invented for this release.

## Verification

Desktop and 320/390/820-pixel layouts were reviewed in the browser. Mobile navigation, click selection of budget previews, keyboard movement to the loan preview, and FAQ expansion were checked. Static checks cover local asset URLs, anchors, unique IDs, one H1, translation coverage, JSON-LD parsing, visible FAQ/schema correspondence, sitemap XML, manifest icons, and JavaScript syntax.

Feel gate: input, response, consistency, context, companion metaphor, and visual polish passed the local review. Reduced-motion rules disable hero movement and section arrivals. The hero uses an open white scene with wallet, receipt, coin, and savings-jar props around a CSS iPhone 18 Pro-style frame, with side buttons, an island, and a home indicator. Device reference: [Apple iPhone 18 Pro specifications](https://www.apple.com/iphone-18-pro/specs/). Live performance, indexing, search CTR, and Analytics delivery remain release checks.

The mascot stays still, with the localized speech “One small step. You’ve got this.” Phone and prop motion loops continuously. The decorative hero scene ignores pointer input, and no pointer listeners modify its transforms or animation state. Reduced Motion disables the loops. CTA faces stay level on hover and sink onto a crisp solid edge on press, with no hover lift.

The hero shows the owner-provided App Store rating of 4.8 out of 5, linked to the listing. No review count or aggregate-rating markup was invented.

The product section focuses on saving money and consistent habits: Save more, Track spending, Plan a budget, and Reduce debt. Plain text tabs provide navigation. The eight-second progress track, story number, and localized Pause/Play control sit below the deck, separate from the tabs.

All four compositions use the same light blue canvas to keep the green artwork distinct. Large app illustrations are paired with readable HTML details: daily allowance, example entries, budget remaining, and repayment progress. The green daily balance, budget summary, and loan figures follow the native app. Entry amounts are illustrative examples. Each composition is marked Sample data. Amounts and labels are localized. The hero retains the actual app screenshot.

The savings jar and loan illustration reuse `output/navigation-icons/nav-budget-master.png` and `nav-loans-master.png`, resized for the web as `assets/images/brand/savings-jar.png` and `loans-art.png`. Wallet and mascot artwork also come from the app. No generated replacement artwork is used.

Cards rotate every eight seconds while the deck is visible. Selecting a tab restarts its timer. Background tabs, off-screen content, and keyboard focus inside a card suspend rotation. Reduced Motion starts rotation paused and disables illustration movement. Panels share a grid cell to hold the deck height across changes. Motion uses gentle illustration movement and short detail arrivals. The decorative hero remains independent of pointer movement.

## Lower-page refresh

The former privacy promotion was replaced at the owner's request by a habit-momentum section. Its 17-day example follows the app's sample streak, with sequenced flame highlights and an animated path. Privacy information remains in the FAQ and linked policy. The three setup steps use a connected timeline, small app details, and sequential highlights. The FAQ retains native details controls with a brief answer entrance.

The closing CTA and footer take structural direction from [Duolingo's homepage](https://www.duolingo.com/): a centered download invitation, existing app illustrations, a curved full-width color transition, grouped navigation, and a visible language row. Nuvio uses its own blue palette and artwork. Footer language choices share the header's saved preference. No social accounts or destination pages were invented. The celebration and receipt mascot images come from the app's asset catalog.

Same-page section links use an explicit smooth scroll with the current header height and a 24-pixel gap. Language menus use opacity and small scale/position transitions. The mobile menu can animate closed without remaining interactive. Closed menus are inert. Reduced Motion makes scrolling and menu transitions immediate and disables decorative loops. Local checks include desktop and 320/390-pixel layouts, FAQ expansion, footer German/Automatic selection, language-menu opening/Escape dismissal, section navigation, mobile-menu opening and section selection, local assets, translation keys, JavaScript syntax, and JSON-LD parsing.

The streak heading and all seven weekday markers use the app design board's existing `symbols/flame.fill.png` export, with transparent padding trimmed. The website colors that native symbol mask with the app orange token. The substitute flame paths were removed. Native component reference: `Nuvio/Shared/DesignSystem/NuvioFlame.swift`.

Section navigation now uses a requestAnimationFrame scroll animation rather than relying on embedded-browser support for native smooth scrolling. Wheel, touch, scrolling keys, and a new navigation action interrupt the current animation. FAQ details animate their full height over 300 milliseconds on both expansion and collapse, including reversal during an active transition. Reduced Motion uses immediate state changes.

Desktop sections alternate their emphasis: feature copy left and artwork right, streak artwork left and copy right, setup introduction left and steps right, then FAQ cards left and introduction right. Below 851 pixels, all sections preserve the heading-first document order.

## Contact and interior pages

The contact page now uses a split support/form layout, direct email access, the existing receipt mascot, accessible form labels, optional device details, and expandable common questions. Its existing submission handler remains connected to the same field IDs and status region. Empty-form validation and Other-device reveal were checked without sending a support message.

`partials/header.html` and `partials/footer.html` are the canonical static chrome. Run `python3 tools/sync_chrome.py` to synchronize all five pages. Interior pages link to homepage sections; homepage links remain local for smooth scrolling. Navigation, download controls, blue footer, language row, and menu motion share their styles across every page. Contact strings support all seven app languages. Legal wording was preserved, with English fallback marked as English for assistive technology. Privacy and terms retain their reading layout and table of contents. The 404 return action uses the shared app-style button.

Verification covers exact shared-template equality, one H1 and unique IDs per page, balanced containers, local assets, inline-script syntax, contact translation coverage, desktop privacy/terms/404 views, and contact layouts at 320 and 390 pixels.


## Keyword and relevance pass, October 18

Target phrases below are editorial choices based on actual app features and user intent. They are not verified search-volume or ranking claims.

| Intent | Phrases | Placement |
| --- | --- | --- |
| Find an iPhone app | expense tracker for iPhone, budget planner | Homepage title, hero introduction, app description |
| Understand spending | daily expense tracker, track income and expenses | Spending feature copy and getting-started FAQ |
| Plan everyday money | monthly budget, category budgets, remaining budget | Budget feature copy |
| Build habits and save | better money habits, save money, daily expense tracking | Hero, streak copy, practical savings FAQ |
| Get product help | Nuvio support, expense tracking help | Contact title and description |

The visual hero heading stays unchanged. Introductory copy explains the product directly, without a repeated keyword list. Two new FAQs answer saving and getting-started questions, including realistic limits on savings and the manual transaction workflow. Both questions and answers are translated into all seven supported languages. The six visible English FAQs exactly match the homepage FAQ structured data. This does not imply eligibility for a Google FAQ rich result.

Titles and descriptions are unique across the homepage, support, privacy, and terms pages. Open Graph and Twitter copy match their page metadata. All four pages reference the existing 1200 by 630 social card; this fixes the contact page's missing social image. Obsolete keywords meta tags and unused Google Fonts preconnections were removed. Canonical URLs and both sitemap files remain consistent with the four public pages. The 404 page remains excluded from indexing.

Before release, verify the public responses after deployment, then submit the canonical sitemap in Google Search Console and request indexing for changed pages. Record the release date. Compare clicks, impressions, CTR, and average position for relevant queries and pages over comparable 28-day periods, separating branded searches from nonbranded searches. No Search Console connection or search-performance baseline was available in this local pass. The language selector uses one URL, so it does not establish separately indexed language pages or hreflang destinations.

References: [Google title links](https://developers.google.com/search/docs/appearance/title-link), [Google snippets](https://developers.google.com/search/docs/appearance/snippet), and [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## Crawl configuration refresh, October 18

The root and config copies of robots.txt and sitemap.xml are synchronized. The sitemap lists all five canonical public pages, including cookies.html, and excludes the noindex 404 page and internal templates. Last-modified dates remain October 18, matching the latest significant page updates. Removed the ignored priority and changefreq sitemap fields and the unsupported Google crawl-delay directive. Public pages and rendering assets remain crawlable; config, docs, partials, scripts, tools, and local review paths are disallowed for crawling. These rules are crawl guidance and do not provide access control or guarantee removal from search results.

## Search Console exclusion audit, October 18

Live checks confirmed that HTTP, HTTP www, and HTTPS www homepages each return a single 301 redirect to https://nuviomm.com/, which returns 200 with a self-referencing canonical. All five sitemap destinations return 200 directly, have one correct canonical tag, and have no noindex meta or X-Robots-Tag header. A nonexistent path returns a real 404. The /index.html alias returns 200 and correctly canonicalizes to the root homepage. Internal home and cross-page section links now use / and /#section consistently, including the shared templates and sync tool. Same-page links retain fragment-only navigation.

The supplied Search Console screenshot shows three redirect exclusions, one alternate canonical exclusion, and zero currently crawled-but-not-indexed pages. Its example URLs are not visible, so matching those exact exclusions to the checked URL variants remains unconfirmed. Expected redirect and duplicate exclusions should remain excluded. No Search Console validation or indexing request was submitted.
