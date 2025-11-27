# Nuvio Website - File Structure Index
**Last Updated:** January 27, 2025  
**Purpose:** Reference document to prevent file duplication and track project structure

---

## 📁 Current Active File Structure

### Root Level (Production Files)
**These are the active files used by GitHub Pages:**

```
/
├── index.html                    ✅ ACTIVE - Main homepage
├── contact.html                  ✅ ACTIVE - Contact/support page
├── privacy.html                  ✅ ACTIVE - Privacy policy page
├── terms.html                    ✅ ACTIVE - Terms of service page
├── 404.html                      ✅ ACTIVE - Custom 404 error page
├── README.md                     ✅ ACTIVE - Project documentation
├── .gitignore                    ✅ ACTIVE - Git ignore rules
│
├── assets/                       ✅ ACTIVE - All website assets
│   ├── css/
│   │   └── styles.css           ✅ ACTIVE - Main stylesheet (2,146 lines)
│   ├── js/
│   │   └── script.js            ✅ ACTIVE - Main JavaScript
│   └── images/                  ✅ ACTIVE - All images and illustrations
│       ├── AppIconBird.png      ✅ ACTIVE - App icon
│       ├── No background bird.png ✅ ACTIVE - Logo
│       ├── bmc-button yallow.svg ✅ ACTIVE - Buy Me a Coffee button
│       ├── Slice 1.png          ✅ ACTIVE - App screenshot 1
│       ├── Slice 2.png          ✅ ACTIVE - App screenshot 2
│       ├── Slice 3.png          ✅ ACTIVE - App screenshot 3
│       ├── Slice 4.png          ✅ ACTIVE - App screenshot 4
│       ├── Slice 5.png          ✅ ACTIVE - App screenshot 5
│       ├── Slice 6.png          ✅ ACTIVE - App screenshot 6
│       ├── choose-your-currency-illustration.svg ✅ ACTIVE
│       ├── choose-your-language-illustration.svg ✅ ACTIVE
│       ├── sad-bird-illustration.svg ✅ ACTIVE
│       ├── starting-balance-illustration.svg ✅ ACTIVE
│       ├── stay-on-track-illustration.svg ✅ ACTIVE
│       ├── your-money-right-illustration.svg ✅ ACTIVE
│       ├── youre-all-set-illustration.svg ✅ ACTIVE
│       └── App-Assets/           ⚠️  LEGACY - iOS asset bundles (not used in web)
│
├── config/                       ✅ ACTIVE - Configuration files
│   ├── site.webmanifest         ✅ ACTIVE - PWA manifest
│   ├── robots.txt               ✅ ACTIVE - SEO robots file
│   ├── sitemap.xml              ✅ ACTIVE - SEO sitemap
│   └── manifest.json            ✅ ACTIVE - Additional manifest
│
├── docs/                         ✅ ACTIVE - Documentation
│   ├── BRAND_COLORS_WEB_REFERENCE.md ✅ ACTIVE - Brand color guide
│   ├── PROJECT_FILE_STRUCTURE_INDEX.md ✅ ACTIVE - This file
│   └── sprint-artifacts/
│       └── WEBSITE_REDESIGN_PROJECT_PLAN.md ✅ ACTIVE - Project plan
│
└── .github/                      ✅ ACTIVE - GitHub configuration
    └── workflows/
        └── static.yml           ✅ ACTIVE - GitHub Pages deployment workflow
```

---

## 🗂️ Legacy/Deprecated Files

**✅ CLEANUP COMPLETE:** All duplicate files in `src/` directory have been removed (January 27, 2025).

**Status:** No deprecated files remain. All files are in their correct locations.

---

## 📋 File Reference Guide

### HTML Files
| File | Location | Purpose | Status |
|------|----------|---------|--------|
| Homepage | `/index.html` | Main landing page | ✅ Active |
| Contact | `/contact.html` | Support/contact form | ✅ Active |
| Privacy | `/privacy.html` | Privacy policy | ✅ Active |
| Terms | `/terms.html` | Terms of service | ✅ Active |
| 404 Error | `/404.html` | Custom error page | ✅ Active |

### CSS Files
| File | Location | Purpose | Status |
|------|----------|---------|--------|
| Main Stylesheet | `/assets/css/styles.css` | All website styles | ✅ Active |

### JavaScript Files
| File | Location | Purpose | Status |
|------|----------|---------|--------|
| Main Script | `/assets/js/script.js` | Site functionality | ✅ Active |

### Image Assets
| Category | Location | Notes |
|----------|----------|-------|
| App Icon | `/assets/images/AppIconBird.png` | Main app icon |
| Logo | `/assets/images/No background bird.png` | Site logo |
| Screenshots | `/assets/images/Slice 1-6.png` | App screenshots |
| Illustrations | `/assets/images/*.svg` | Feature illustrations |
| Buttons | `/assets/images/bmc-button yallow.svg` | Support button |

### Configuration Files
| File | Location | Purpose |
|------|----------|---------|
| PWA Manifest | `/config/site.webmanifest` | Progressive Web App config |
| Robots | `/config/robots.txt` | Search engine crawler rules |
| Sitemap | `/config/sitemap.xml` | SEO sitemap |
| Manifest | `/config/manifest.json` | Additional manifest |

---

## 🔗 Path Reference Guide

### When referencing files in HTML:

**From root HTML files (index.html, contact.html, etc.):**
- CSS: `assets/css/styles.css`
- JS: `assets/js/script.js`
- Images: `assets/images/filename.png`
- Config: `config/site.webmanifest`

**Example:**
```html
<link rel="stylesheet" href="assets/css/styles.css">
<script src="assets/js/script.js"></script>
<img src="assets/images/AppIconBird.png" alt="App Icon">
```

### When referencing files in CSS:

**From styles.css:**
- Images: `url('../images/filename.png')` (relative to CSS file)

**Example:**
```css
background-image: url('../images/AppIconBird.png');
```

### When referencing files in JavaScript:

**From script.js:**
- Images: `assets/images/filename.png` (relative to root)
- Other JS: `assets/js/filename.js`

---

## ✅ File Status Legend

- ✅ **ACTIVE** - Currently in use, safe to modify
- ⚠️ **DEPRECATED** - Old file, do NOT use or modify
- 🔄 **MIGRATED** - Moved to new location
- 📝 **DOCUMENTATION** - Reference/documentation file

---

## 🚫 Common Mistakes to Avoid

1. **Don't reference `../assets/`** - Use `assets/images/` from root
2. **Don't create duplicate CSS files** - Use `assets/css/styles.css` (only one CSS file)
3. **Don't create duplicate JS files** - Use `assets/js/script.js` (only one JS file)
4. **Don't put HTML in subdirectories** - All HTML at root level for GitHub Pages
5. **Don't duplicate images** - Check `assets/images/` first before adding new images
6. **Don't create files in subdirectories** - Follow the structure defined in this index

---

## 📝 File Creation Guidelines

### When creating new files:

1. **HTML Pages** → Create at root level (`/newpage.html`)
2. **CSS Files** → Add to `assets/css/` or extend `styles.css`
3. **JavaScript Files** → Add to `assets/js/`
4. **Images** → Add to `assets/images/`
5. **Config Files** → Add to `config/`
6. **Documentation** → Add to `docs/`

### Naming Conventions:

- **HTML:** lowercase with hyphens (`contact-us.html`)
- **CSS/JS:** lowercase with hyphens (`custom-script.js`)
- **Images:** PascalCase or descriptive (`AppIconBird.png`, `hero-image.svg`)
- **Config:** lowercase (`site.webmanifest`)

---

## 🔍 Quick File Search

**Need to find a file? Check these locations:**

- **HTML pages:** Root directory (`/`)
- **Styles:** `assets/css/`
- **Scripts:** `assets/js/`
- **Images:** `assets/images/`
- **Config:** `config/`
- **Docs:** `docs/`

---

## 📊 File Statistics

- **Total HTML Files:** 5 (all at root)
- **CSS Files:** 1 (`assets/css/styles.css` - 2,146 lines)
- **JavaScript Files:** 1 (`assets/js/script.js`)
- **Image Files:** 20+ (PNG, SVG formats)
  - 1 app icon (AppIconBird.png)
  - 1 logo (No background bird.png)
  - 6 screenshots (Slice 1-6.png)
  - 7 illustrations (SVG files)
  - 1 button (bmc-button yallow.svg)
  - iOS asset bundles (App-Assets/ - legacy, not used)
- **Config Files:** 4 (manifest, robots, sitemap, manifest.json)

---

## 🔄 Migration History

**January 27, 2025 - File Structure Reorganization:**
- ✅ Moved all HTML files from `src/html/` to root
- ✅ Moved CSS from `src/css/` to `assets/css/`
- ✅ Moved JS from `src/js/` to `assets/js/`
- ✅ Moved images from `src/assets/` to `assets/images/`
- ✅ Updated all file references in HTML/CSS/JS
- ✅ Created custom 404.html page
- ✅ Updated manifest and sitemap paths
- ✅ **Removed all duplicate files from `src/` directory**
- ✅ **Removed empty `src/` directory**
- ✅ **Verified all file references are correct**

---

## 📞 Questions?

If you're unsure where a file should go:
1. Check this index first
2. Follow the "File Creation Guidelines" above
3. Reference existing similar files
4. **Never create duplicates** - check if file exists first

---

**Last Updated:** January 27, 2025  
**Maintained By:** BMAD Team  
**Version:** 1.0

