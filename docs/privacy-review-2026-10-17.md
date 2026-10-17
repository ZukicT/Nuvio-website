# Nuvio website privacy and subscription update

Prepared October 17, 2026 for the existing Washington State, United States provider and a worldwide App Store audience.

## Scope and review limit

The published privacy policy and targeted Terms of Service corrections are factual drafts for review by a licensed attorney in Washington State and other relevant jurisdictions. They are a starting point, not legal advice, a certification of compliance, or a substitute for licensed review. Existing unrelated terms, including dispute resolution and liability provisions, were preserved and were not audited for enforceability.

The owner authorized publishing corrections to the existing claims that Nuvio had no advertising, subscriptions, or data-collecting SDKs. The site now distinguishes locally stored financial entries from service information processed by AdMob, RevenueCat, Apple, Google Analytics, Google Fonts, GitHub Pages, and Discord support. The complete privacy policy is available in English, Simplified Chinese, and Traditional Chinese, matching the website's existing supported languages. Other terms body content remains English, matching the previous site behavior.

Version 2.7 and optional Pro are described as upcoming because 2.6 was the live App Store version when prepared. Revisit this wording after 2.7 is released. Apple local pricing and purchase confirmation govern actual offers and eligibility.

## Verified sources

- Google iOS SDK disclosure, updated October 15, 2026: https://developers.google.com/admob/ios/privacy/data-disclosure
- RevenueCat Apple privacy guidance: https://www.revenuecat.com/docs/platform-resources/apple-platform-resources/apple-app-privacy
- RevenueCat policy: https://www.revenuecat.com/privacy
- FTC business privacy guidance: https://www.ftc.gov/business-guidance/privacy-security
- Apple subscription management: https://support.apple.com/118428
- Apple Standard EULA: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/

These sources substantiate service descriptions and truthful disclosure. They do not establish that this implementation meets every regional consent or advertising requirement.

## Outstanding review items

- The Nuvio 2.7 work adds Google UMP consent and iOS App Tracking Transparency controls for personalized advertising. Verify those controls on physical devices and in each configured region before release. Website Analytics consent and applicable opt-out obligations remain a separate review item.
- Review international privacy notices, legal bases, transfers, representative/contact requirements, retention practices, and California sale/sharing characterization with qualified counsel against the actual business and provider settings.
- The existing contact form has a Discord webhook embedded in public browser code. A server-side form endpoint with abuse controls would avoid exposing that endpoint. No webhook or private credential was added by this update.
- The policy does not promise that anonymous SDK identifiers are unidentifiable or that app deletion cancels a subscription.

## Deployment and rollback

The existing GitHub Pages workflow deploys pushes to main. Previous website revision: d87af7e. To roll back this change, revert the website update commit and push the revert to main. No database migration is involved.
