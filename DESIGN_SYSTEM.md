# GeniDoc Hayat - Design System & UI Guidelines

## 1. DESIGN PHILOSOPHY

**Inspiration**: Apple Health + Stripe Dashboard + Linear + Alan Health + Glassmorphism + Premium Pediatric Healthcare

**Principles**:

- **Premium**: World-class healthtech aesthetic
- **Clear**: Extreme clarity for parents and doctors
- **Calm**: Medical but not cold, reassuring
- **Modern**: 2025+ design patterns
- **Responsive**: Perfect on all devices
- **Accessible**: WCAG AA compliant
- **Delightful**: Micro-interactions that delight

**Core Feeling**: "This is a platform I trust with my child's health and I want to check it every day"

---

## 2. COLOR PALETTE

### Primary System

```
Deep Medical Blue:
  #00327D - Primary brand
  #0047AB - Primary container
  #1B5BC0 - Hover state
  #DAE2FF - Background soft
  #B1C5FF - Light variant

Medical Turquoise:
  #006A63 - Secondary brand
  #48A9A0 - Medium
  #8EF4E9 - Light container
  #71D7CD - Very light

Success Green:
  #2D8C3D - Health positive
  #C2E5C8 - Light background
  #71D7A1 - Accent

Error Red:
  #BA1A1A - Emergency/critical
  #FFDAD6 - Error container

Warning Orange:
  #E89836 - Caution/warning
  #FFE6CC - Warning light

Neutral:
  #FFFFFF - Pure white surfaces
  #F7F9FB - App background (very light blue tint)
  #F2F4F6 - Surface low
  #ECEEF0 - Surface container
  #E6E8EA - Surface high
  #E0E3E5 - Surface highest
  #D9DBDE - Outline variant
  #C3C6D5 - Border subtle
  #191C1E - Text primary
  #434653 - Text secondary
  #737784 - Text muted
```

### Usage

```
Headers, CTAs, primary actions → Deep Medical Blue
Secondary actions, cards focus → Medical Turquoise
Success states, positive data → Success Green
Emergency, critical data, errors → Error Red
Warnings, pending states → Warning Orange
Text and borders → Neutral grays
Backgrounds → Light blue-tinted whites
```

---

## 3. TYPOGRAPHY

### Font Stack

```
Primary: Plus Jakarta Sans
Fallback: Inter, Manrope, system-ui, sans-serif

Import: https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800
```

### Scale & Weights

```
Display / Hero
  Size: 48px
  Weight: 700 (bold)
  Line height: 56px (117%)
  Letter spacing: -0.5px
  Use: Page titles, big announcements

Headline L
  Size: 32px
  Weight: 700
  Line height: 40px (125%)
  Letter spacing: 0
  Use: Section titles

Headline M
  Size: 28px
  Weight: 600
  Line height: 36px (129%)
  Letter spacing: 0
  Use: Mobile section titles

Headline S
  Size: 24px
  Weight: 600
  Line height: 32px (133%)
  Letter spacing: 0
  Use: Card titles

Title Large
  Size: 20px
  Weight: 600
  Line height: 28px (140%)
  Letter spacing: 0
  Use: Subsection titles

Title Medium
  Size: 16px
  Weight: 600
  Line height: 24px (150%)
  Letter spacing: 0.15px
  Use: Form labels, strong text

Body Large
  Size: 18px
  Weight: 400
  Line height: 28px (156%)
  Letter spacing: 0
  Use: Rich text, descriptions

Body
  Size: 16px
  Weight: 400
  Line height: 24px (150%)
  Letter spacing: 0.15px
  Use: Main body text, default

Body Small
  Size: 14px
  Weight: 400
  Line height: 20px (143%)
  Letter spacing: 0.25px
  Use: Secondary text, hints

Label
  Size: 13px
  Weight: 600
  Line height: 16px (123%)
  Letter spacing: 0.5px
  Use: Badges, pills, labels

Caption
  Size: 12px
  Weight: 500
  Line height: 16px (133%)
  Letter spacing: 0.4px
  Use: Tiny text, footnotes
```

---

## 4. SPACING SYSTEM

```
2px   - xs
4px   - sm
8px   - md
12px  - lg
16px  - xl
24px  - 2xl
32px  - 3xl
40px  - 4xl
48px  - 5xl
64px  - 6xl

Mobile padding: 16px (md)
Tablet padding: 24px (2xl)
Desktop padding: 40px (4xl)

Gap between sections: 64px
Gap between components: 24px
Gap between UI elements: 8px
```

---

## 5. BORDER RADIUS

```
2px   - Minimal rounding (inputs)
4px   - Subtle (small elements)
8px   - Standard (most UI)
12px  - Medium (cards, buttons)
16px  - Large (containers)
24px  - XL (large containers)
40px+ - Pill/full round (badges, avatars)
```

---

## 6. SHADOWS

```
// Soft, medical, non-aggressive

Shadow 1 (hover):
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

Shadow 2 (cards):
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

Shadow 3 (elevated):
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

Shadow 4 (floating):
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

Shadow 5 (modals):
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
```

---

## 7. BUTTON STYLES

### Primary Button

```
Background: Deep Medical Blue (#00327D)
Text: White
Padding: 12px 24px
Border radius: 12px
Font: Title Medium (16px, 600)
Shadow: Shadow 1 on hover
Hover: #1B5BC0, +2px down shadow
Active: #00327D, slight press feedback
Disabled: Gray out 50%, no cursor
```

### Secondary Button

```
Background: Medical Turquoise (#006A63)
Text: White
Padding: 12px 24px
Border radius: 12px
Font: Title Medium (16px, 600)
Hover: #48A9A0
```

### Tertiary / Ghost Button

```
Background: transparent
Border: 1px solid outline variant
Text: Primary text
Padding: 12px 24px
Border radius: 12px
Hover: light background tint
```

### Danger Button

```
Background: Error Red (#BA1A1A)
Text: White
Padding: 12px 24px
Border radius: 12px
Hover: darker red
```

---

## 8. INPUT STYLES

```
Padding: 12px 16px
Border: 1px solid outline variant
Border radius: 12px
Font: Body (16px)
Background: white / surface
Focus: 2px blue border, soft blue background tint
Disabled: gray background, no interaction
Placeholder: muted text

Type: email, password, text, number, date
```

---

## 9. CARD STYLES

```
Background: white / surface
Border: 1px solid outline variant (very subtle)
Border radius: 16px - 24px
Padding: 24px - 32px
Shadow: Shadow 2
Hover: Shadow 3 transition
```

### Card Variants

```
Default: White, subtle border
Interactive: Has hover state
Elevated: Shadow 3
Accent: Blue tinted background
Alert: Red/orange tinted background
```

---

## 10. LAYOUT & GRID

### Desktop (>1024px)

```
Sidebar: 280px fixed left
Main content: calc(100% - 280px)
Max content width: 1280px
Padding: 40px
Gap between sections: 64px
```

### Tablet (768px - 1024px)

```
Sidebar: 240px
Padding: 24px
Gap: 48px
```

### Mobile (<768px)

```
No sidebar (mobile nav bottom)
Full width: 100%
Padding: 16px
Gap: 32px
Bottom nav: 64px fixed
```

---

## 11. COMPONENTS STYLE GUIDE

### Sidebar

```
Background: surface-container-low (very light gray)
Width: 280px
Border right: 1px outline-variant
Items padding: 12px 16px
Item border radius: 0 12px 12px 0
Active item: turquoise background + blue icon
Hover: slight blue tint
Transition: 150ms ease
Icons: Lucide React, 20px
Font: Body (14px)
```

### Topbar

```
Background: semi-transparent white (rgba(255,255,255, 0.9))
Backdrop blur: 12px
Border bottom: 1px outline-variant (subtle)
Height: 64px
Fixed / sticky
Padding: 12px 40px
Flex: space-between
```

### Badge / Pill

```
Background: turquoise light or blue light
Text: turquoise dark or blue dark
Padding: 6px 12px
Border radius: 20px+
Font: Label (13px, 600)
Example: "Carte Active", "En attente"
```

### Timeline Node

```
Circle diameter: 12px - 16px
Color by event type:
  - Consultation: blue
  - Vaccination: turquoise
  - Growth: green
  - Document: orange
  - Permission: purple
Glow effect on hover
Line connecting nodes: 2px gray
```

### Stat Card

```
Icon circle: 48px, light blue background
Icon: Lucide, turquoise
Title: Body small, muted
Value: Headline M, primary text
Trend: small green/red arrow + percentage
Background: white card
Border radius: 16px
Shadow: Shadow 1
```

### Alert / Banner

```
Background: light tinted (blue/orange/red depending)
Border left: 4px colored (blue/orange/red)
Padding: 16px
Border radius: 12px
Icon + text + close button
```

---

## 12. MICRO-INTERACTIONS (Framer Motion)

```
Page enter:
  - Fade in + slide up: 0.3s, ease-out-cubic

Card hover:
  - Slight up: 2px
  - Shadow increase: Shadow 2 → Shadow 3
  - Duration: 200ms

Button click:
  - Press down: 2px
  - Release: 100ms
  - Ripple effect optional

Badge pulse:
  - Scale: 1 → 1.05 → 1
  - Duration: 2s infinite
  - Opacity pulse

Loading skeleton:
  - Shimmer left-to-right
  - Duration: 1.5s infinite

Modal appear:
  - Backdrop fade in: 200ms
  - Card scale + fade: 200ms, ease-out

Success toast:
  - Slide from top
  - Auto-dismiss: 4s
```

---

## 13. DARK MODE (Future, not MVP)

```
Avoid for MVP. Design is light-mode optimized for medical.
Can add later with CSS variables.
Dark mode palette would be:
  - Background: #0A0E1A
  - Surfaces: #151B2E
  - Primary: #5BA3E8 (lighter blue for contrast)
  - Text: #E8EAED
```

---

## 14. PARENT DASHBOARD LAYOUT

```
┌────────────────────────────────────────────────────────────────┐
│ Logo          Notifications  Emergency  Avatar              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Baby Profile Hero Card - Large, Premium]                    │
│    Avatar | Hayat Senhaji | 23 jours | HDY-24-000123         │
│    Carte Active | QR Quick | Emergency                        │
│                                                                 │
│  [Health Snapshot - 3 Cards Bento]                             │
│    [Prochain vaccin] [Prochain RDV] [Croissance]            │
│                                                                 │
│  [Milestone Garden - 1 Card]                                   │
│    Timeline de jalons (Naissance, 1er bilan, 1 mois, etc)    │
│                                                                 │
│  [Health Orbit Section]                                        │
│    Title: L'Orbite de Santé                                    │
│    Timeline verticale avec nodes colorés                       │
│    Événements scrollables                                       │
│                                                                 │
│  [Vaccination Journey - 1 Card]                                │
│    Timeline vaccins complétés, à venir, en retard              │
│                                                                 │
│  [Growth Charts - 1 Card]                                      │
│    3 graphiques: Poids, Taille, PC                             │
│    Percentiles et tendances                                     │
│                                                                 │
│  [Care Circle - 1 Card]                                        │
│    Pédiatres autorisés, avec permission status                 │
│    + Bouton ajouter accès                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 15. PEDIATRICIAN DASHBOARD LAYOUT

```
┌────────────────────────────────────────────────────────────────┐
│ Logo          Notifications  Profile                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Search Center - Search + Scanner]                            │
│    "Chercher par nom, ID, téléphone, ou scanner QR"           │
│    Input + Scan button                                          │
│                                                                 │
│  [Quick Stats - 4 Cards]                                       │
│    [Consultations aujourd'hui] [Patients suivi]               │
│    [Vaccins en retard] [Cartes scannées]                       │
│                                                                 │
│  [Recent Patients - Table/Cards]                               │
│    Patient name | Last visit | Next appointment | Actions    │
│                                                                 │
│  [Button] Nouvelle consultation                                │
│  [Button] Scanner une carte                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 16. TAILWIND CONFIG SETUP

```javascript
// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#DAE2FF",
          100: "#B1C5FF",
          900: "#00327D",
        },
        secondary: {
          50: "#8EF4E9",
          600: "#006A63",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          low: "#F2F4F6",
          container: "#ECEEF0",
          high: "#E6E8EA",
        },
        background: "#F7F9FB",
        text: {
          primary: "#191C1E",
          secondary: "#434653",
          muted: "#737784",
        },
        error: "#BA1A1A",
        success: "#2D8C3D",
        warning: "#E89836",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["48px", { lineHeight: "56px", fontWeight: "700" }],
        headline: ["32px", { lineHeight: "40px", fontWeight: "700" }],
        title: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        label: ["13px", { lineHeight: "16px", fontWeight: "600" }],
      },
      spacing: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "40px",
        "5xl": "48px",
        "6xl": "64px",
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },
      boxShadow: {
        soft1: "0 1px 2px rgba(0, 0, 0, 0.05)",
        soft2: "0 2px 8px rgba(0, 0, 0, 0.08)",
        soft3: "0 4px 12px rgba(0, 0, 0, 0.1)",
        soft4: "0 8px 24px rgba(0, 0, 0, 0.12)",
        soft5: "0 12px 32px rgba(0, 0, 0, 0.15)",
      },
      backdropBlur: {
        xl: "blur(12px)",
      },
      maxWidth: {
        "7xl": "1280px",
      },
    },
  },
  plugins: [],
};
```

---

## 17. COMPONENT LIBRARY TO BUILD

### UI Components (shadcn/ui + custom)

- Button (all variants)
- Input / Textarea
- Select / Dropdown
- Checkbox / Radio
- Card
- Badge / Pill
- Modal / Dialog
- Toast / Alert
- Tabs
- Drawer / Sidebar
- Pagination
- Dropdown Menu
- Avatar
- Tooltip

### Medical Components (custom)

- BabyProfileCard
- HealthSnapshot
- TimelineOrbit
- TimelineEventCard
- VaccinationJourney
- VaccineCard
- GrowthChart
- MedicalVault
- DocumentCard
- CareCircle
- PermissionRequestCard
- SmartCardPreview
- QRCodeCard
- EmergencyCapsule
- ConsultationForm
- PrescriptionBuilder
- AuditLogTimeline
- StatCard
- MetricCard

### Layout Components

- AppShell
- Sidebar
- Topbar
- BottomNav (mobile)
- PageHeader
- ProtectedRoute
- RoleGuard

---

## 18. ACCESSIBILITY

- WCAG AA compliant colors (min 4.5:1 contrast)
- Alt text on all images
- ARIA labels on interactive elements
- Keyboard navigation supported
- Focus indicators visible
- Semantic HTML
- Form validation errors clear
- Loading states communicated

---

## 19. RESPONSIVE BREAKPOINTS

```
Mobile:    < 640px   (Default)
Tablet:    640-1024px  (Sidebar collapsible)
Desktop:   > 1024px  (Full layout)
```

---

## 20. NEXT STEPS

1. Setup Tailwind config with design tokens
2. Create component library
3. Build layouts
4. Implement pages
5. Add Framer Motion animations
6. Test responsive
