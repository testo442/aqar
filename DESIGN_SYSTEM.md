# Aqarna Design System

A professional, production-ready design system for the Aqarna real estate platform. Built to Zillow/Rightmove standards with full accessibility compliance.

## Color System

### Primary Blue
The primary brand color used for CTAs, links, and key interactive elements.

- **Primary 50**: `#EFF6FF` - Lightest tint (backgrounds, subtle highlights)
- **Primary 100**: `#DBEAFE` - Light backgrounds
- **Primary 200**: `#BFDBFE` - Hover states on light backgrounds
- **Primary 300**: `#93C5FD` - Disabled states
- **Primary 400**: `#60A5FA` - Secondary actions
- **Primary 500**: `#3B82F6` - Base primary (hover states)
- **Primary 600**: `#2563EB` - **DEFAULT PRIMARY** (buttons, links, brand) - WCAG AA compliant
- **Primary 700**: `#1D4ED8` - Hover states on primary buttons
- **Primary 800**: `#1E40AF` - Secondary blue (darker variant)
- **Primary 900**: `#1E3A8A` - Darkest shade (text on light backgrounds)

**Usage:**
- `primary-600`: Primary buttons, links, brand elements
- `primary-700`: Hover states on primary buttons
- `primary-50`: Light backgrounds, subtle highlights
- `primary-200`: Hover states on light backgrounds

### Secondary Blue
A darker variant for secondary actions and emphasis.

- **Secondary Blue**: `#1E40AF` (primary-800) - Used for secondary CTAs and emphasis

### Neutral Colors (Slate)
Professional grayscale for text, borders, and backgrounds. All meet WCAG AA contrast requirements.

- **Slate 50**: `#F8FAFC` - Lightest background
- **Slate 100**: `#F1F5F9` - Light backgrounds, borders
- **Slate 200**: `#E2E8F0` - Borders, dividers
- **Slate 300**: `#CBD5E1` - Disabled borders
- **Slate 400**: `#94A3B8` - Placeholder text, icons
- **Slate 500**: `#64748B` - Muted text (WCAG AA: 4.6:1)
- **Slate 600**: `#475569` - **SECONDARY TEXT** (WCAG AA: 6.2:1)
- **Slate 700**: `#334155` - **BODY TEXT** (WCAG AA: 9.1:1)
- **Slate 800**: `#1E293B` - Headings (WCAG AAA: 12.6:1)
- **Slate 900**: `#0F172A` - **PRIMARY TEXT/HEADINGS** (WCAG AAA: 15.8:1)

**Usage:**
- `slate-900`: Primary headings, important text
- `slate-800`: Secondary headings
- `slate-700`: Body text, paragraphs
- `slate-600`: Secondary text, captions
- `slate-500`: Muted text, metadata
- `slate-400`: Placeholder text, disabled text
- `slate-200`: Borders, dividers
- `slate-100`: Light backgrounds
- `slate-50`: Subtle backgrounds

### Background Colors

- **Background Primary**: `#FFFFFF` (white) - Main background
- **Background Secondary**: `#F8FAFC` (slate-50) - Section backgrounds
- **Background Tertiary**: `#F1F5F9` (slate-100) - Card backgrounds, subtle sections

### Semantic Colors

- **Success**: `#10B981` (green-500) - Success states
- **Warning**: `#F59E0B` (amber-500) - Warning states
- **Error**: `#EF4444` (red-500) - Error states, destructive actions
- **Info**: `#3B82F6` (primary-500) - Informational messages

## Typography

### Font Family

- **Primary**: Inter (Google Fonts)
- **Fallback**: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

### Font Sizes (Standardized)

#### Headings
- **H1 (Hero)**: `text-4xl md:text-5xl lg:text-6xl xl:text-7xl` (36px → 72px)
  - Font weight: `font-bold` (700)
  - Line height: `leading-[1.1]` (1.1)
  - Letter spacing: `-0.025em` (premium tight tracking)
  - Color: `text-slate-900`
  - Font features: `kern` 1, `liga` 1

- **H2 (Page Title)**: `text-3xl md:text-4xl lg:text-5xl` (30px → 48px)
  - Font weight: `font-bold` (700)
  - Line height: `leading-[1.15]` (1.15)
  - Letter spacing: `-0.02em` (premium tight tracking)
  - Color: `text-slate-900`
  - Font features: `kern` 1, `liga` 1

- **H3 (Section Title)**: `text-2xl md:text-3xl` (24px → 30px)
  - Font weight: `font-semibold` (600)
  - Line height: `leading-[1.3]` (1.3)
  - Letter spacing: `-0.01em`
  - Color: `text-slate-900`
  - Font features: `kern` 1

- **H4 (Subsection)**: `text-xl md:text-2xl` (20px → 24px)
  - Font weight: `font-semibold` (600)
  - Line height: `leading-[1.35]` (1.35)
  - Letter spacing: `-0.01em`
  - Color: `text-slate-900`

- **H5**: `text-lg md:text-xl` (18px → 20px)
  - Font weight: `font-semibold` (600)
  - Color: `text-slate-800`

- **H6**: `text-base md:text-lg` (16px → 18px)
  - Font weight: `font-semibold` (600)
  - Color: `text-slate-800`

#### Body Text
- **Body Large**: `text-lg` (18px)
  - Font weight: `font-normal` (400)
  - Line height: `leading-[1.7]` (1.7 - premium readability)
  - Color: `text-slate-700`
  - Letter spacing: `0` (normal)

- **Body**: `text-base` (16px) - **DEFAULT**
  - Font weight: `font-normal` (400)
  - Line height: `leading-[1.7]` (1.7 - premium readability)
  - Color: `text-slate-700`
  - Letter spacing: `0` (normal)

- **Body Small**: `text-sm` (14px)
  - Font weight: `font-normal` (400)
  - Line height: `leading-[1.6]` (1.6)
  - Color: `text-slate-700`
  - Letter spacing: `0` (normal)

#### Small Text
- **Caption**: `text-xs` (12px)
  - Font weight: `font-normal` (400)
  - Line height: `leading-[1.5]` (1.5)
  - Color: `text-slate-600`
  - Letter spacing: `tracking-wide` (0.05em)

- **Label**: `text-xs` (12px)
  - Font weight: `font-semibold` (600)
  - Line height: `leading-[1.5]` (1.5)
  - Color: `text-slate-700`
  - Letter spacing: `tracking-wide uppercase` (0.05em - premium label style)

### Font Weights

- **Light**: 300 - Rarely used
- **Normal**: 400 - Body text (default)
- **Medium**: 500 - Labels, emphasis
- **Semibold**: 600 - Headings, strong emphasis
- **Bold**: 700 - Hero headings, strong emphasis

## Buttons

### Primary Button
Main call-to-action buttons with premium styling.

```tsx
<Button variant="default">
  Primary Action
</Button>
```

**Styles:**
- Background: `bg-primary-600`
- Text: `text-white`
- Hover: `bg-primary-700` with subtle lift (`-translate-y-0.5`)
- Shadow: `shadow-sm` → `shadow-md` on hover
- Border radius: `rounded-xl` (16px - premium rounded)
- Height: `h-11` (44px - premium touch target)
- Padding: `px-6` (horizontal)
- Font: `font-semibold text-base`
- Transition: `duration-200` with smooth hover lift
- Disabled: `opacity-50 cursor-not-allowed`

### Secondary Button
Secondary actions with refined outline style.

```tsx
<Button variant="outline">
  Secondary Action
</Button>
```

**Styles:**
- Background: `bg-white`
- Border: `border border-slate-200`
- Text: `text-slate-700`
- Hover: `bg-slate-50 border-slate-300` with subtle lift
- Shadow: `shadow-sm` → `shadow-md` on hover
- Border radius: `rounded-xl` (16px)
- Height: `h-11` (44px)
- Padding: `px-6`
- Font: `font-semibold text-base`
- Transition: `duration-200` with smooth hover lift

### Disabled Button
All button variants when disabled.

**Styles:**
- Opacity: `opacity-50`
- Cursor: `cursor-not-allowed`
- Pointer events: `pointer-events-none`
- No hover effects or transitions

### Button Sizes

- **Small**: `h-9 px-4 text-sm` (36px height, premium padding)
- **Default**: `h-11 px-6 text-base` (44px height - **RECOMMENDED**)
- **Large**: `h-14 px-8 text-base` (56px height - hero CTAs)
- **Icon**: `h-11 w-11` (44px square)

## Components

### Cards

**Standard Card:**
```tsx
<Card className="rounded-2xl shadow-soft border border-slate-100">
  {/* Content */}
</Card>
```

**Card with Hover:**
```tsx
<Card className="rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
  {/* Content */}
</Card>
```

**Premium Card Padding:**
- Standard: `p-6` (24px)
- Large: `p-8` (32px)
- Small: `p-4` (16px)

### Inputs

**Standard Input:**
```tsx
<Input className="rounded-xl border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200" />
```

**Styles:**
- Border: `border-slate-200`
- Text: `text-slate-900`
- Placeholder: `text-slate-400`
- Focus border: `border-primary-500`
- Focus ring: `ring-2 ring-primary-200`
- Border radius: `rounded-xl` (16px - premium rounded)
- Height: `h-10` (default) or `h-14` (large forms)
- Transition: `duration-200` for smooth focus states

## Spacing

### Premium Spacing Scale

#### Section Spacing
- `py-12 md:py-16` (48px → 64px) - Small sections
- `py-16 md:py-24` (64px → 96px) - Standard sections
- `py-16 md:py-24 lg:py-32` (64px → 96px → 128px) - Large hero sections

#### Card Padding
- `p-4 md:p-6` (16px → 24px) - Small cards
- `p-6` (24px) - Standard cards (**RECOMMENDED**)
- `p-6 md:p-8` (24px → 32px) - Large cards
- `p-8` (32px) - Premium large cards

#### Component Spacing
- `gap-4` (16px) - Tight spacing
- `gap-5` (20px) - Standard spacing
- `gap-6` (24px) - Comfortable spacing
- `gap-8` (32px) - Generous spacing
- `gap-10 md:gap-16` (40px → 64px) - Premium section gaps

#### Vertical Rhythm
- `mb-2` (8px) - Tight vertical spacing
- `mb-3` (12px) - Standard vertical spacing
- `mb-4` (16px) - Comfortable vertical spacing
- `mb-6` (24px) - Generous vertical spacing
- `mb-8` (32px) - Premium vertical spacing

## Shadows

- **shadow-soft**: Standard card elevation
- **shadow-soft-md**: Medium elevation
- **shadow-soft-lg**: Hover states, elevated cards
- **shadow-soft-xl**: Modals, overlays

## Border Radius

- **sm**: 6px - Small elements
- **DEFAULT**: 8px - Default
- **lg**: 12px - Buttons, inputs, cards
- **xl**: 16px - Large cards
- **2xl**: 20px - Extra large cards

## Accessibility

### Contrast Ratios (WCAG AA Compliant)

- **slate-900 on white**: 15.8:1 (AAA)
- **slate-800 on white**: 12.6:1 (AAA)
- **slate-700 on white**: 9.1:1 (AAA)
- **slate-600 on white**: 6.2:1 (AA)
- **slate-500 on white**: 4.6:1 (AA)
- **primary-600 on white**: 4.5:1 (AA)
- **white on primary-600**: 4.5:1 (AA)

### Best Practices

1. **Always use design system tokens** - Never use arbitrary colors
2. **Text contrast** - Use slate-900 for headings, slate-700 for body
3. **Interactive elements** - Always provide hover and focus states
4. **Disabled states** - Use opacity-50 and cursor-not-allowed
5. **Focus indicators** - Use ring-2 with primary-200 for focus states

## Usage Examples

### Hero Heading
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
  Real Estate in Kuwait
</h1>
```

### Body Text
```tsx
<p className="text-base text-slate-700 leading-relaxed">
  Your paragraph text here.
</p>
```

### Primary Button
```tsx
<Button className="bg-primary-600 text-white hover:bg-primary-700 rounded-lg px-6 py-2.5 font-semibold shadow-sm hover:shadow-md">
  Get Started
</Button>
```

### Secondary Button
```tsx
<Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg">
  Learn More
</Button>
```
