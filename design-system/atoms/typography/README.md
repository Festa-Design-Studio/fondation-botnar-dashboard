# Typography Atoms

Typography components for the Fondation Botnar Dashboard design system. These atomic components provide the foundation for all text-based content across the dashboard application.

## Overview

Our typography system is built on the Inter font family and follows a mobile-first, responsive approach. All typography components support dark mode and meet WCAG 2.1 AA accessibility standards.

## Components

### [Headings](./headings.html)
Semantic heading components (H1-H6) with responsive scaling and proper hierarchy.

**Features:**
- Dashboard title (H1): 2rem → 2.5rem
- Section title (H2): 1.5rem → 1.625rem  
- Widget title (H3): 1.125rem → 1.25rem
- Subsection (H4): 1rem → 1.125rem
- Card title (H5): 0.875rem → 1rem
- Label (H6): 0.75rem → 0.875rem

**Usage:**
```html
<h1 class="text-dashboard-title">Strategic Learning Dashboard</h1>
<h2 class="text-section-title">Grant Performance Overview</h2>
<h3 class="text-widget-title">Active Grants Distribution</h3>
```

### [Body Text](./body-text.html)
Paragraph and body text components with optimal reading typography.

**Features:**
- Large text: 1.125rem → 1.25rem
- Regular text: 1rem → 1.125rem
- Small text: 0.875rem → 1rem
- Extra small text: 0.75rem → 0.875rem

**Usage:**
```html
<p class="text-lg md:text-xl">Large introductory text</p>
<p class="text-base md:text-lg">Regular body text</p>
<p class="text-sm md:text-base">Small supporting text</p>
```

### [Labels & Data](./labels-data.html)
Typography for form labels, data displays, charts, and interface elements.

**Features:**
- Form labels with required indicators
- KPI and data display typography
- Chart labels and tooltips
- Status badges and tags
- Table typography

**Usage:**
```html
<!-- Form Labels -->
<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Email Address <span class="text-red-500">*</span>
</label>

<!-- KPI Display -->
<div class="text-kpi-large text-botnar-blue-600">2,847</div>

<!-- Status Badge -->
<span class="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
    Active
</span>
```

## Typography Scale

### Mobile (< 768px)
- **H1**: 2rem (32px)
- **H2**: 1.5rem (24px)
- **H3**: 1.125rem (18px)
- **H4**: 1rem (16px)
- **H5**: 0.875rem (14px)
- **H6**: 0.75rem (12px)
- **Large text**: 1.125rem (18px)
- **Body text**: 1rem (16px)
- **Small text**: 0.875rem (14px)
- **Extra small**: 0.75rem (12px)

### Desktop (≥ 768px)
- **H1**: 2.5rem (40px)
- **H2**: 1.625rem (26px)
- **H3**: 1.25rem (20px)
- **H4**: 1.125rem (18px)
- **H5**: 1rem (16px)
- **H6**: 0.875rem (14px)
- **Large text**: 1.25rem (20px)
- **Body text**: 1.125rem (18px)
- **Small text**: 1rem (16px)
- **Extra small**: 0.875rem (14px)

## Font Weights

- **Light** (300): Special emphasis, large headings
- **Regular** (400): Body text, standard content
- **Medium** (500): Data labels, emphasis
- **Semibold** (600): Headings, form labels
- **Bold** (700): Major headings, KPIs

## Color Usage

### Light Mode
- **Primary text**: `text-gray-900` (#111827)
- **Secondary text**: `text-gray-700` (#374151)
- **Tertiary text**: `text-gray-600` (#4b5563)
- **Muted text**: `text-gray-500` (#6b7280)
- **Link text**: `text-botnar-blue-600` (#1976d2)

### Dark Mode
- **Primary text**: `dark:text-gray-100` (#f3f4f6)
- **Secondary text**: `dark:text-gray-300` (#d1d5db)
- **Tertiary text**: `dark:text-gray-400` (#9ca3af)
- **Muted text**: `dark:text-gray-500` (#6b7280)
- **Link text**: `dark:text-botnar-blue-400` (#42a5f5)

## Responsive Implementation

All typography components use responsive classes:

```html
<!-- Responsive heading -->
<h1 class="text-2xl md:text-4xl font-bold">Title</h1>

<!-- Responsive body text -->
<p class="text-base md:text-lg">Content</p>

<!-- Responsive small text -->
<span class="text-sm md:text-base">Label</span>
```

## Accessibility Features

### Semantic Structure
- Proper heading hierarchy (H1 → H6)
- Meaningful heading text
- Skip navigation links
- Screen reader optimization

### Visual Accessibility
- WCAG AA contrast ratios (4.5:1 minimum)
- Responsive font scaling
- Dark mode support
- Focus indicators

### Implementation
- Use semantic HTML elements
- Provide alternative text for decorative elements
- Ensure logical tab order
- Test with screen readers

## Usage Guidelines

### Best Practices
1. **Maintain hierarchy**: Use headings in logical order (H1 → H2 → H3)
2. **Single H1**: One H1 per page for main title
3. **Descriptive text**: Use clear, concise heading and label text
4. **Consistent styling**: Apply typography classes consistently
5. **Test accessibility**: Verify with screen readers and keyboard navigation

### What to Avoid
- Using headings for visual styling only
- Skipping heading levels (H1 → H3)
- Multiple H1 elements per page
- Text smaller than 12px
- Poor color contrast
- Unclear or vague labels

## Implementation Notes

### CSS Classes
Typography components use Tailwind CSS utility classes and custom design system classes:

- `.text-dashboard-title`: Main dashboard title
- `.text-section-title`: Section headings
- `.text-widget-title`: Widget/card titles
- `.text-kpi-large`: Large KPI numbers
- `.text-data-medium`: Data labels
- `.text-data-small`: Small data text

### Dark Mode
All typography components automatically support dark mode using Tailwind's `dark:` prefix:

```html
<h1 class="text-gray-900 dark:text-gray-100">
    Title that adapts to theme
</h1>
```

### Font Loading
Inter font is loaded from Google Fonts with display=swap for performance:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Testing

### Manual Testing
- [ ] All text is readable in both light and dark modes
- [ ] Font sizes scale properly on mobile and desktop
- [ ] Headings follow logical hierarchy
- [ ] Required field indicators are visible
- [ ] Focus states are clearly visible

### Automated Testing
- [ ] WCAG color contrast validation
- [ ] Font size accessibility checks
- [ ] Heading structure validation
- [ ] Screen reader compatibility

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Status**: Complete