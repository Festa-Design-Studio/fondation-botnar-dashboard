# Design Tokens Documentation

## Overview

This document outlines the complete design token system for the Fondation Botnar Dashboard. Design tokens are the foundational design decisions represented as code, ensuring consistency across all components and platforms.

## Color Tokens

### Brand Colors

```css
/* Primary Brand Colors */
--color-botnar-pink: #e91e63;     /* Primary brand color for CTAs and highlights */
--color-botnar-blue: #1976d2;     /* Primary data visualization color */
```

#### Pink Scale
```css
--color-botnar-pink-50: #fce4ec;   /* Lightest pink for backgrounds */
--color-botnar-pink-100: #f8bbd9;  /* Light pink for hover states */
--color-botnar-pink-200: #f48fb1;  /* */
--color-botnar-pink-300: #f06292;  /* */
--color-botnar-pink-400: #ec407a;  /* */
--color-botnar-pink-500: #e91e63;  /* Primary pink */
--color-botnar-pink-600: #d81b60;  /* Pink hover state */
--color-botnar-pink-700: #c2185b;  /* Pink active state */
--color-botnar-pink-800: #ad1457;  /* */
--color-botnar-pink-900: #880e4f;  /* Darkest pink */
```

#### Blue Scale
```css
--color-botnar-blue-50: #e3f2fd;   /* Lightest blue for backgrounds */
--color-botnar-blue-100: #bbdefb;  /* Light blue for hover states */
--color-botnar-blue-200: #90caf9;  /* */
--color-botnar-blue-300: #64b5f6;  /* */
--color-botnar-blue-400: #42a5f5;  /* */
--color-botnar-blue-500: #2196f3;  /* */
--color-botnar-blue-600: #1976d2;  /* Primary blue */
--color-botnar-blue-700: #1565c0;  /* Blue active state */
--color-botnar-blue-800: #0d47a1;  /* */
--color-botnar-blue-900: #0a3d7c;  /* Darkest blue */
```

### Status Colors

```css
/* Success States */
--color-success: #388e3c;          /* Success green */
--color-success-light: #c8e6c9;    /* Light success background */
--color-success-dark: #2e7d32;     /* Dark success text */

/* Warning States */
--color-warning: #f57c00;          /* Warning orange (use with caution) */
--color-warning-safe: #ef6c00;     /* WCAG AA compliant orange */
--color-warning-light: #ffecb3;    /* Light warning background */
--color-warning-dark: #e65100;     /* Dark warning text */

/* Error States */
--color-error: #d32f2f;            /* Error red */
--color-error-light: #ffcdd2;      /* Light error background */
--color-error-dark: #c62828;       /* Dark error text */

/* Info States */
--color-info: #0288d1;             /* Info cyan */
--color-info-light: #b3e5fc;       /* Light info background */
--color-info-dark: #0277bd;        /* Dark info text */
```

### Text Colors

```css
/* Primary Text */
--color-text-primary: #212121;     /* Main body text */
--color-text-secondary: #757575;   /* Secondary text, captions */
--color-text-muted: #9e9e9e;       /* Muted text (18px+ only) */
--color-text-inverse: #ffffff;     /* Text on dark backgrounds */

/* Interactive Text */
--color-text-link: #1976d2;        /* Links and interactive text */
--color-text-link-hover: #1565c0;  /* Link hover state */
```

### Background Colors

```css
/* Background Layers */
--color-bg-primary: #ffffff;       /* Main content background */
--color-bg-secondary: #fafafa;     /* Page background */
--color-bg-tertiary: #f5f5f5;      /* Card/component backgrounds */
--color-bg-overlay: rgba(0, 0, 0, 0.5); /* Modal overlays */

/* Interactive Backgrounds */
--color-bg-hover: rgba(0, 0, 0, 0.04);    /* Hover states */
--color-bg-active: rgba(0, 0, 0, 0.08);   /* Active states */
--color-bg-focus: rgba(233, 30, 99, 0.1); /* Focus states */
```

### Border Colors

```css
/* Border Variants */
--color-border-light: #e0e0e0;     /* Light borders */
--color-border-medium: #bdbdbd;    /* Medium borders */
--color-border-dark: #757575;      /* Dark borders */
--color-border-focus: #e91e63;     /* Focus ring borders */
```

## Typography Tokens

### Font Families

```css
/* Font Stacks */
--font-family-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-family-mono: 'JetBrains Mono', Monaco, 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', monospace;
```

### Font Sizes

```css
/* Base Scale */
--font-size-xs: 0.75rem;     /* 12px - Axis labels */
--font-size-sm: 0.875rem;    /* 14px - Small data labels */
--font-size-base: 1rem;      /* 16px - Body text */
--font-size-lg: 1.125rem;    /* 18px - Widget titles */
--font-size-xl: 1.25rem;     /* 20px - Large text */
--font-size-2xl: 1.5rem;     /* 24px - Section titles */
--font-size-3xl: 1.875rem;   /* 30px - KPI numbers */
--font-size-4xl: 2.25rem;    /* 36px - Dashboard titles */

/* Dashboard-Specific Sizes */
--font-size-kpi-large: 1.75rem;    /* 28px - Large KPI values */
--font-size-data-medium: 1rem;     /* 16px - Medium data labels */
--font-size-tooltip: 0.875rem;     /* 14px - Tooltip text */
```

### Font Weights

```css
/* Weight Scale */
--font-weight-light: 300;
--font-weight-normal: 400;    /* Body text */
--font-weight-medium: 500;    /* Data labels */
--font-weight-semibold: 600;  /* Headings */
--font-weight-bold: 700;      /* Titles, KPIs */
--font-weight-extrabold: 800; /* Emphasis */
```

### Line Heights

```css
/* Line Height Scale */
--line-height-tight: 1.25;    /* Headings */
--line-height-normal: 1.5;    /* Body text */
--line-height-relaxed: 1.625; /* Reading text */
--line-height-loose: 2;       /* Special spacing */
```

## Spacing Tokens

### Base Spacing Scale

```css
/* Core Spacing Units */
--spacing-micro: 0.25rem;    /* 4px - Element padding */
--spacing-xs: 0.5rem;        /* 8px - Icon spacing */
--spacing-sm: 0.75rem;       /* 12px - Small gaps */
--spacing-md: 1rem;          /* 16px - Component margins */
--spacing-lg: 1.5rem;        /* 24px - Section spacing */
--spacing-xl: 2rem;          /* 32px - Page margins */
--spacing-2xl: 2.5rem;       /* 40px - Large sections */
--spacing-3xl: 3rem;         /* 48px - Major sections */
```

### Component-Specific Spacing

```css
/* Dashboard Layout */
--spacing-dashboard-margin: 2rem;    /* 32px - Dashboard margins */
--spacing-section-gap: 1.5rem;       /* 24px - Between sections */
--spacing-component-gap: 1rem;       /* 16px - Between components */

/* Cards and Containers */
--spacing-card-padding: 1.5rem;      /* 24px - Card internal padding */
--spacing-card-gap: 1.5rem;          /* 24px - Gap between cards */

/* Forms and Inputs */
--spacing-button-padding-x: 1rem;    /* 16px - Button horizontal */
--spacing-button-padding-y: 0.5rem;  /* 8px - Button vertical */
--spacing-form-gap: 1rem;            /* 16px - Between form fields */

/* Charts and Data Visualization */
--spacing-chart-padding: 1.5rem;     /* 24px - Chart container padding */
--spacing-chart-margin: 1rem;        /* 16px - Chart margins */
--spacing-legend-gap: 0.75rem;       /* 12px - Legend item spacing */

/* Grid System */
--spacing-grid-gap: 1.5rem;          /* 24px - Grid gap */
--spacing-grid-margin: 2rem;         /* 32px - Grid container margin */
```

### Touch Targets

```css
/* Accessibility Touch Targets */
--spacing-touch-target: 2.75rem;     /* 44px - Minimum touch target */
--spacing-touch-padding: 0.75rem;    /* 12px - Touch padding */
```

## Border Radius Tokens

```css
/* Radius Scale */
--radius-sm: 0.25rem;       /* 4px - Small elements */
--radius-md: 0.375rem;      /* 6px - Buttons, inputs */
--radius-lg: 0.5rem;        /* 8px - Cards, containers */
--radius-xl: 0.75rem;       /* 12px - Large containers */
--radius-2xl: 1rem;         /* 16px - Special containers */
--radius-full: 9999px;      /* Full radius - Pills, avatars */

/* Component-Specific Radius */
--radius-card: 0.5rem;      /* 8px - Standard card radius */
--radius-button: 0.375rem;  /* 6px - Button radius */
--radius-input: 0.375rem;   /* 6px - Input radius */
--radius-chart: 0.5rem;     /* 8px - Chart container radius */
```

## Shadow Tokens

```css
/* Shadow System */
--shadow-card: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-card-hover: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-chart: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-focus: 0 0 0 3px rgba(233, 30, 99, 0.1);
--shadow-dropdown: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-modal: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

## Transition Tokens

```css
/* Transition Timing */
--transition-fast: 150ms ease-in-out;      /* Quick interactions */
--transition-normal: 300ms ease-in-out;    /* Standard transitions */
--transition-slow: 500ms ease-in-out;      /* Slow, deliberate changes */

/* Easing Functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## Z-Index Tokens

```css
/* Z-Index Scale */
--z-index-dropdown: 1000;
--z-index-sticky: 1020;
--z-index-fixed: 1030;
--z-index-modal-backdrop: 1040;
--z-index-modal: 1050;
--z-index-popover: 1060;
--z-index-tooltip: 1070;
--z-index-toast: 1080;
```

## Responsive Breakpoints

```css
/* Breakpoint Tokens */
--breakpoint-xs: 475px;
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1440px;

/* Dashboard-Specific Breakpoints */
--breakpoint-dashboard-sm: 640px;
--breakpoint-dashboard-md: 768px;
--breakpoint-dashboard-lg: 1024px;
--breakpoint-dashboard-xl: 1280px;
--breakpoint-dashboard-2xl: 1440px;
```

## Animation Tokens

```css
/* Animation Durations */
--animation-fast: 150ms;
--animation-normal: 300ms;
--animation-slow: 500ms;

/* Animation Curves */
--animation-ease-in: cubic-bezier(0.4, 0, 1, 1);
--animation-ease-out: cubic-bezier(0, 0, 0.2, 1);
--animation-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Predefined Animations */
--animation-fade-in: fadeIn 0.3s ease-in-out;
--animation-slide-up: slideUp 0.3s ease-out;
--animation-pulse-soft: pulseSoft 2s infinite;
```

## Usage Guidelines

### Color Usage
- Use primary brand colors for interactive elements and key highlights
- Apply status colors consistently across all UI states
- Ensure all color combinations meet WCAG AA contrast requirements
- Use neutral colors for text and backgrounds to maintain readability

### Typography Usage
- Use the font size scale consistently across components
- Apply appropriate font weights for hierarchy and emphasis
- Maintain line height ratios for optimal readability
- Use dashboard-specific sizes for data visualization elements

### Spacing Usage
- Apply consistent spacing using the defined scale
- Use component-specific spacing tokens for specialized layouts
- Ensure touch targets meet minimum accessibility requirements
- Maintain visual rhythm through consistent spacing patterns

### Implementation
These tokens are implemented in:
- `tailwind.config.js` - Tailwind CSS configuration
- `base.css` - CSS custom properties
- Component styles - Applied through utility classes

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Next Review**: February 2025