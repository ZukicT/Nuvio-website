# Nuvio Brand Colors - Web Developer Reference

Complete color palette for light and dark mode implementation.

---

## 🎨 Primary Brand Colors

**These colors remain consistent in both light and dark modes:**

| Color Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| **Primary Blue** | `#5774CD` | `rgb(87, 116, 205)` | Main brand color, primary CTAs, links (Blue-Purple) |
| **Primary Orange** | `#FEA419` | `rgb(254, 164, 25)` | Accents, highlights, icons |
| **Primary Pink** | `#FF6584` | `rgb(255, 101, 132)` | Warnings, errors, alerts |
| **Primary Light Blue** | `#E2E9FF` | `rgb(226, 233, 255)` | Backgrounds, subtle highlights |
| **Primary Red** | `#FE3A01` | `rgb(254, 58, 1)` | Destructive actions, critical alerts |

**Additional Brand Colors:**
- **Brand Black** (Onboarding Dark BG): `#191920` / `rgb(25, 25, 32)`

---

## 🌞 Light Mode Colors

### Backgrounds
| Color Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| **Background Primary** | `#FFFFFF` | `rgb(255, 255, 255)` | Main app background |
| **Card Background** | `#FFFFFF` | `rgb(255, 255, 255)` | Card/section backgrounds |
| **Background Secondary** | `#E2E9FF` | `rgb(226, 233, 255)` | Secondary backgrounds |
| **Background Tertiary** | `#F2F2F2` | `rgb(242, 242, 242)` | Subtle separation |

### Text Colors
| Color Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| **Text Primary** | `#3F3D56` | `rgb(63, 61, 86)` | Main body text, headings (Dark Gray) |
| **Text Secondary** | `#5774CD` | `rgb(87, 116, 205)` | Secondary text, labels (Blue-Purple) |
| **Text Tertiary** | `#808080` | `rgb(128, 128, 128)` | Subtle text, hints |
| **Text Quaternary** | `#B3B3B3` | `rgb(179, 179, 179)` | Disabled text |

### Semantic Colors (Light Mode)
| Color Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| **Success** | `#5774CD` | `rgb(87, 116, 205)` | Success states (uses brand blue-purple) |
| **Success Background** | `rgba(0, 102, 0, 0.1)` | `rgb(0, 102, 0)` @ 10% opacity | Success backgrounds |
| **Warning** | `#FF6584` | `rgb(255, 101, 132)` | Warning states |
| **Error** | `#FF6584` | `rgb(255, 101, 132)` | Error states (uses pink) |
| **Error Background** | `rgba(102, 0, 0, 0.1)` | `rgb(102, 0, 0)` @ 10% opacity | Error backgrounds |
| **Info** | `#5774CD` | `rgb(87, 116, 205)` | Info states (uses brand blue-purple) |

---

## 🌙 Dark Mode Colors

### Backgrounds
| Color Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| **Background Primary** | `#000000` | `rgb(0, 0, 0)` | Main app background (pure black) |
| **Card Background** | `#1A1A1A` | `rgb(26, 26, 26)` | Card/section backgrounds |
| **Background Secondary** | `#262626` | `rgb(38, 38, 38)` | Secondary backgrounds |

**Onboarding Dark Background:**
- **Onboarding Background** | `#191920` | `rgb(25, 25, 32)` | Onboarding screens only

### Text Colors
| Color Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| **Text Primary** | `#FFFFFF` | `rgb(255, 255, 255)` | Main body text, headings |
| **Text Secondary** | `#CCCCCC` | `rgb(204, 204, 204)` | Secondary text, labels |
| **Text Tertiary** | `#999999` | `rgb(153, 153, 153)` | Subtle text, hints |
| **Text Quaternary** | `#666666` | `rgb(102, 102, 102)` | Disabled text |

### Semantic Colors (Dark Mode)
| Color Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| **Success** | `#66CC66` | `rgb(102, 204, 102)` | Success states |
| **Success Background** | `rgba(51, 102, 51, 0.3)` | `rgb(51, 102, 51)` @ 30% opacity | Success backgrounds |
| **Warning** | `#FF6584` | `rgb(255, 101, 132)` | Warning states (same as light) |
| **Error** | `#E66666` | `rgb(230, 102, 102)` | Error states |
| **Error Background** | `rgba(102, 51, 51, 0.3)` | `rgb(102, 51, 51)` @ 30% opacity | Error backgrounds |
| **Info** | `#0052D9` | `rgb(0, 82, 217)` | Info states (same as light) |

---

## 🎯 Button Colors

### Light Mode Buttons
| Button Type | Background | Text | Hex Values |
|-------------|------------|------|------------|
| **Primary Button** | `#5774CD` | `#FFFFFF` | BG: `#5774CD`, Text: `#FFFFFF` |
| **Secondary Button** | `#E2E9FF` | `#3F3D56` | BG: `#E2E9FF`, Text: `#3F3D56` |
| **Destructive Button** | `#FE3A01` | `#FFFFFF` | BG: `#FE3A01`, Text: `#FFFFFF` |

### Dark Mode Buttons
| Button Type | Background | Text | Hex Values |
|-------------|------------|------|------------|
| **Primary Button** | `#5774CD` | `#FFFFFF` | BG: `#5774CD`, Text: `#FFFFFF` |
| **Secondary Button** | `#262626` | `#FFFFFF` | BG: `#262626`, Text: `#FFFFFF` |
| **Destructive Button** | `#FE3A01` | `#FFFFFF` | BG: `#FE3A01`, Text: `#FFFFFF` |

**Onboarding Buttons (Dark Mode):**
- **Button Background** | `#FFFFFF` | `rgb(255, 255, 255)` | White buttons on dark
- **Button Text** | `#3F3D56` | `rgb(63, 61, 86)` | Dark text on white buttons

---

## 📐 CSS/SCSS Variables Format

```css
/* Primary Brand Colors */
--primary-blue: #5774CD;        /* Primary Blue-Purple */
--primary-orange: #FEA419;      /* Primary Orange */
--primary-pink: #FF6584;        /* Primary Pink */
--primary-light-blue: #E2E9FF;   /* Very Light Blue-Purple */
--primary-red: #FE3A01;         /* Vibrant Red */
--brand-black: #191920;         /* Onboarding Dark BG */

/* Light Mode */
--bg-primary-light: #FFFFFF;
--bg-card-light: #FFFFFF;
--bg-secondary-light: #E2E9FF;
--bg-tertiary-light: #F5F5F5;

--text-primary-light: #3F3D56;  /* Dark Gray */
--text-secondary-light: #5774CD; /* Blue-Purple */
--text-tertiary-light: #808080;
--text-quaternary-light: #B3B3B3;

/* Dark Mode */
--bg-primary-dark: #000000;
--bg-card-dark: #1A1A1A;
--bg-secondary-dark: #262626;
--bg-onboarding-dark: #191920;

--text-primary-dark: #FFFFFF;
--text-secondary-dark: #CCCCCC;
--text-tertiary-dark: #999999;
--text-quaternary-dark: #666666;

/* Semantic Colors */
--success-light: #5774CD;        /* Blue-Purple */
--success-dark: #66CC66;
--error-light: #FF6584;          /* Pink */
--error-dark: #E66666;
--warning: #FF6584;              /* Same in both modes */
--info: #5774CD;                 /* Blue-Purple, same in both modes */
```

---

## 🎨 Design System Notes

### Color Philosophy
- **Flat Design**: No gradients, shadows, or visual effects
- **High Contrast**: All text meets WCAG AA standards (4.5:1 minimum)
- **Consistent Branding**: Primary colors remain the same across modes
- **Semantic Adaptation**: Backgrounds and text adapt for readability

### Usage Guidelines
1. **Primary Blue** (`#5774CD`): Use for primary actions, links, and brand elements (Blue-Purple)
2. **Primary Orange** (`#FEA419`): Use for accents, highlights, and positive indicators
3. **Primary Pink** (`#FF6584`): Use for warnings, errors, and attention-grabbing elements
4. **Primary Light Blue** (`#E2E9FF`): Use for subtle backgrounds and secondary highlights
5. **Primary Red** (`#FE3A01`): Use for destructive actions and critical alerts

### Accessibility
- Minimum contrast ratio: **4.5:1** for normal text
- Minimum contrast ratio: **3:1** for large text
- All color combinations tested for accessibility compliance

---

## 📱 Platform-Specific Notes

### iOS App Implementation
- Uses SwiftUI `Color` with RGB values
- Adaptive colors switch automatically based on system appearance
- Onboarding screens use different dark mode palette (`#191920` background)
- Main app uses pure black (`#000000`) for dark mode

### Web Implementation Recommendations
1. Use CSS custom properties (variables) for easy theme switching
2. Implement `prefers-color-scheme` media query for automatic dark mode
3. Test all color combinations for accessibility compliance
4. Maintain brand color consistency across all platforms

---

**Last Updated:** January 2025  
**Version:** 2.1.0

