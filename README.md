# Nuvio Website

Website for Nuvio, a free iOS money manager app. Built with vanilla HTML, CSS, and JavaScript. Hosted on GitHub Pages.

## What's Here

- Homepage with app features and download links
- Contact page with support form
- Privacy Policy and Terms of Service pages
- Responsive design that works on all devices

## Tech Stack

- Pure HTML/CSS/JavaScript (no frameworks)
- GitHub Pages for hosting
- GitHub Actions for automated deployment

## File Structure

```
/
├── index.html          # Homepage
├── contact.html        # Contact page
├── privacy.html        # Privacy Policy
├── terms.html          # Terms of Service
├── 404.html            # Error page
├── assets/
│   ├── css/
│   │   └── styles.css  # Main stylesheet
│   ├── js/
│   │   └── script.js   # JavaScript
│   └── images/         # All images and assets
├── config/
│   ├── site.webmanifest
│   ├── sitemap.xml
│   └── robots.txt
└── CNAME               # Custom domain config
```

## Design

- Visual reference: the Nuvio app's `DESIGN.md` and saved `Docs/03-design-system/board/design-board.json` in the sibling app project.
- Brand colors: Blue (#1C7BFF), Orange (#FF9600), Pink (#FF6FA3), Green (#58CC02).
- Typography: locally hosted Nunito variable font from the app.
- Homepage presentation: `assets/css/homepage.css`.
- Shared web styling: `assets/css/nuvio-play.css`, loaded after the existing page styles. Rounded surfaces use neutral borders and solid bottom edges.
- App wordmark and mascot assets live in `assets/images/brand/`. Actual app screenshots in `assets/images/app/` show labeled sample data. The homepage has keyboard-accessible feature tabs and native FAQ details.
- Responsive desktop and mobile layouts, keyboard focus states, and reduced-motion support.
- Homepage copy and app screenshots cover all seven app languages. The Automatic selector matches browser preferences, with a saved manual override. Support and legal pages retain their current three-language coverage.
- Redesign is prepared locally. Publish after the corresponding app update is approved; release copy still needs a separate review. See [search and release notes](docs/SEO-RELEASE.md) for metadata, references, verification, and post-release measurement.

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the main branch. The GitHub Actions workflow handles the deployment.

Custom domain: nuviomm.com

## License

© 2025 Nuvio. All rights reserved.

## Shared navigation and footer

Edit `partials/header.html` and `partials/footer.html`, then run `python3 tools/sync_chrome.py`. This synchronizes static markup in the homepage, contact, privacy, terms, and 404 pages. Homepage section links stay local; interior pages link to the matching homepage section. Shared visual rules are in `assets/css/homepage.css`; interior content rules are in `assets/css/interior.css`.
