# Cookie policy and consent implementation review

Prepared October 18, 2026 for the Nuvio website operated from Washington State, United States, with international visitors. The document type is a website Cookie Policy, supported by the existing Privacy Policy. This draft is a starting point for review by a licensed attorney in the relevant jurisdictions. It does not certify legal compliance or enforceability.

## Implemented behavior

The six public pages use the same first-visit banner, persistent compact Privacy choices button, and settings dialog. Optional preferences and analytics default off. Reject optional and Accept optional have matching visual treatment. Language storage and analytics are separate choices. Essential storage records the consent decision. The website remains usable without optional consent.

Google Analytics is loaded only after an explicit saved or current opt-in, on the production hostname. This is basic consent gating, not advanced cookieless measurement. The analytics tag uses the existing measurement ID, keeps advertising consent denied, disables Google Signals and ad-personalization signals, and sets a 180-day cookie lifetime. Download-click events also check the current consent state. Withdrawing analytics disables collection, clears accessible first-party analytics cookies, and reloads to discard loaded listeners. A browser Global Privacy Control signal or Do Not Track value of 1 keeps analytics disabled. These controls do not configure app advertising or subscriptions.

Consent records are honored for 180 days. Language selection follows the primary browser language, then supported alternatives, with English fallback. A new preference key retires the old saved language choice. Persistence of manual language selection requires preference consent. No IP-location service is used.

The cookie policy describes actual storage keys, categories, lifetimes, third-party processing, withdrawal, support attachments, browser signals, and contact information. The Privacy Policy's website section now describes opt-in analytics and links to the cookie policy.

## Validation and limits

`node tools/test-consent.cjs` checks opt-in, rejection, saved decisions, expiry, version validation, withdrawal, cookie cleanup, one-time analytics loading, privacy signals, primary U.S. English, other locales, stale preference removal, and consent-controlled language persistence. Browser checks cover banner, dialog, rejection, compact reopening, saved preference state across pages, and narrow-phone layouts. This browser sends a privacy signal, so its analytics toggle is correctly disabled. The analytics-enabled code path is tested with simulated browser state. No Google Analytics account access was available to verify dashboard retention, enhanced-measurement settings, or reporting.

Before relying on a compliance claim, licensed review should check applicable jurisdictions, controller disclosures, processor arrangements, Google account settings and retention, and whether additional state or international rights disclosures apply. Client-side consent controls do not replace those account and organizational obligations.

Sources checked October 18, 2026:

- [Google consent implementation](https://developers.google.com/tag-platform/security/guides/consent).
- [Google Analytics cookie usage](https://support.google.com/analytics/answer/11397207).
- [ICO guidance on cookies and similar technologies](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/).
