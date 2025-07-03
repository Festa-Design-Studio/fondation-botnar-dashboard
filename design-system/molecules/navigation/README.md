# Navigation Components Molecule

Comprehensive navigation components that combine atomic design elements (typography, colors, buttons, icons) into functional wayfinding patterns for the Fondation Botnar dashboard. Navigation molecules provide structured user flow and site organization through various navigation patterns.

## Overview

Navigation components are molecular-level elements that enable users to move through and understand the structure of the application. They provide clear wayfinding, hierarchical organization, and intuitive user interaction patterns.

### Key Features
- **5+ navigation types** for different use cases and contexts
- **3 layout variants** (default, minimal, bordered)
- **Responsive design** with mobile-optimized patterns
- **Full accessibility** with ARIA support and keyboard navigation
- **Dark mode support** with automatic theme adaptation
- **Interactive showcase** with real-time customization

## Navigation Types

### Header Navigation
Primary navigation with branding, main menu items, and user actions.

```html
<header class="navbar">
    <div class="navbar-brand">
        <a href="#" class="navbar-brand">Fondation Botnar</a>
    </div>
    <nav class="navbar-nav">
        <a href="#" class="nav-link active">Dashboard</a>
        <a href="#" class="nav-link">Projects</a>
        <a href="#" class="nav-link">Reports</a>
        <a href="#" class="nav-link">Team</a>
    </nav>
    <div class="navbar-actions">
        <button class="navbar-toggle">Menu</button>
    </div>
</header>
```

### Sidebar Navigation
Vertical navigation menu with hierarchical organization.

```html
<div class="sidebar">
    <div class="sidebar-header">
        <h2 class="sidebar-title">Dashboard</h2>
    </div>
    <nav class="sidebar-nav">
        <div class="sidebar-section">
            <h3 class="sidebar-section-title">Main</h3>
            <a href="#" class="nav-link active">
                <svg class="nav-link-icon"><!-- Icon --></svg>
                Overview
                <span class="nav-badge">3</span>
            </a>
            <a href="#" class="nav-link">
                <svg class="nav-link-icon"><!-- Icon --></svg>
                Projects
            </a>
            <a href="#" class="nav-link">
                <svg class="nav-link-icon"><!-- Icon --></svg>
                Analytics
            </a>
        </div>
        <div class="sidebar-section">
            <h3 class="sidebar-section-title">Settings</h3>
            <a href="#" class="nav-link">
                <svg class="nav-link-icon"><!-- Icon --></svg>
                Preferences
            </a>
        </div>
    </nav>
</div>
```

### Breadcrumb Navigation
Hierarchical navigation showing current location in site structure.

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="#" class="breadcrumb-item">Home</a>
    <span class="breadcrumb-separator" aria-hidden="true">/</span>
    <a href="#" class="breadcrumb-item">Health Programs</a>
    <span class="breadcrumb-separator" aria-hidden="true">/</span>
    <a href="#" class="breadcrumb-item">Child Nutrition</a>
    <span class="breadcrumb-separator" aria-hidden="true">/</span>
    <span class="breadcrumb-item active" aria-current="page">Annual Report 2024</span>
</nav>
```

### Tab Navigation
Content organization with tabbed interface for related sections.

```html
<div class="tabs">
    <nav class="tab-nav" role="tablist">
        <a href="#tab1" class="tab-link active" role="tab" aria-selected="true" aria-controls="tab1">
            <svg class="nav-link-icon"><!-- Icon --></svg>
            Overview
            <span class="nav-badge">2</span>
        </a>
        <a href="#tab2" class="tab-link" role="tab" aria-selected="false" aria-controls="tab2">
            <svg class="nav-link-icon"><!-- Icon --></svg>
            Impact Metrics
        </a>
        <a href="#tab3" class="tab-link" role="tab" aria-selected="false" aria-controls="tab3">
            <svg class="nav-link-icon"><!-- Icon --></svg>
            Geographic Data
        </a>
    </nav>
    <div class="tab-content">
        <div id="tab1" class="tab-pane active" role="tabpanel">
            <!-- Tab 1 content -->
        </div>
        <div id="tab2" class="tab-pane" role="tabpanel">
            <!-- Tab 2 content -->
        </div>
        <div id="tab3" class="tab-pane" role="tabpanel">
            <!-- Tab 3 content -->
        </div>
    </div>
</div>
```

### Pagination Navigation
Navigation through large datasets with page controls.

```html
<div class="flex items-center justify-between">
    <div class="pagination-info">
        Showing <span class="font-medium">1-10</span> of 
        <span class="font-medium">97</span> results
    </div>
    <nav class="pagination" aria-label="Pagination">
        <button class="pagination-item" disabled aria-label="Previous page">
            <svg class="w-4 h-4"><!-- Previous icon --></svg>
        </button>
        <a href="#" class="pagination-item active" aria-current="page" aria-label="Page 1">1</a>
        <a href="#" class="pagination-item" aria-label="Page 2">2</a>
        <a href="#" class="pagination-item" aria-label="Page 3">3</a>
        <a href="#" class="pagination-item" aria-label="Page 4">4</a>
        <span class="pagination-item" aria-hidden="true">...</span>
        <a href="#" class="pagination-item" aria-label="Page 10">10</a>
        <button class="pagination-item" aria-label="Next page">
            <svg class="w-4 h-4"><!-- Next icon --></svg>
        </button>
    </nav>
</div>
```

## Navigation Variants

### Default Variant
Standard navigation with subtle styling and hover effects.

```html
<nav class="nav">
    <a href="#" class="nav-link active">Active Link</a>
    <a href="#" class="nav-link">Regular Link</a>
    <a href="#" class="nav-link" disabled>Disabled Link</a>
</nav>
```

### Minimal Variant
Clean navigation with minimal visual styling.

```html
<nav class="nav nav-minimal">
    <a href="#" class="nav-link active">Active Link</a>
    <a href="#" class="nav-link">Regular Link</a>
</nav>
```

### Bordered Variant
Navigation with visible borders and enhanced definition.

```html
<nav class="nav nav-bordered">
    <a href="#" class="nav-link active">Active Link</a>
    <a href="#" class="nav-link">Regular Link</a>
</nav>
```

## Layout Patterns

### Horizontal Navigation
Side-by-side navigation items.

```html
<nav class="nav nav-horizontal">
    <a href="#" class="nav-link">Item 1</a>
    <a href="#" class="nav-link">Item 2</a>
    <a href="#" class="nav-link">Item 3</a>
</nav>
```

### Vertical Navigation
Stacked navigation items.

```html
<nav class="nav nav-vertical">
    <a href="#" class="nav-link">Item 1</a>
    <a href="#" class="nav-link">Item 2</a>
    <a href="#" class="nav-link">Item 3</a>
</nav>
```

### Responsive Navigation
Navigation that adapts to different screen sizes.

```html
<nav class="navbar">
    <div class="navbar-brand">Brand</div>
    <button class="navbar-toggle nav-mobile-visible">
        <svg><!-- Menu icon --></svg>
    </button>
    <div class="navbar-nav nav-mobile-hidden">
        <a href="#" class="nav-link">Link 1</a>
        <a href="#" class="nav-link">Link 2</a>
    </div>
</nav>
```

## Navigation Sizes

### Small Navigation
Compact navigation for space-constrained areas.

```html
<nav class="pagination pagination-sm">
    <button class="pagination-item">Previous</button>
    <a href="#" class="pagination-item">1</a>
    <a href="#" class="pagination-item">2</a>
    <button class="pagination-item">Next</button>
</nav>
```

### Large Navigation
Spacious navigation for prominent placement.

```html
<nav class="pagination pagination-lg">
    <button class="pagination-item">Previous</button>
    <a href="#" class="pagination-item">1</a>
    <a href="#" class="pagination-item">2</a>
    <button class="pagination-item">Next</button>
</nav>
```

## Properties & Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | string | `header` | Navigation type (header, sidebar, breadcrumb, tabs, pagination) |
| `variant` | string | `default` | Navigation style variant (default, minimal, bordered) |
| `orientation` | string | `horizontal` | Navigation layout (horizontal, vertical) |
| `collapsible` | boolean | `false` | Enable collapsible behavior for sidebar |
| `responsive` | boolean | `true` | Enable responsive behavior |

## CSS Classes

### Base Classes
```css
.nav               /* Base navigation container */
.nav-horizontal    /* Horizontal layout */
.nav-vertical      /* Vertical layout */
.nav-link          /* Navigation link */
.nav-link-icon     /* Link icon */
.nav-badge         /* Navigation badge */
```

### Header Navigation Classes
```css
.navbar            /* Header navigation container */
.navbar-brand      /* Brand/logo area */
.navbar-nav        /* Navigation links container */
.navbar-actions    /* Actions area (search, user menu) */
.navbar-toggle     /* Mobile menu toggle */
```

### Sidebar Navigation Classes
```css
.sidebar           /* Sidebar container */
.sidebar-header    /* Sidebar header */
.sidebar-title     /* Sidebar title */
.sidebar-nav       /* Sidebar navigation */
.sidebar-section   /* Navigation section */
.sidebar-section-title /* Section title */
.sidebar-collapsed /* Collapsed sidebar state */
```

### Breadcrumb Classes
```css
.breadcrumb        /* Breadcrumb container */
.breadcrumb-item   /* Breadcrumb item */
.breadcrumb-separator /* Item separator */
.breadcrumb-icon   /* Breadcrumb icon */
.breadcrumb-truncated /* Truncated breadcrumbs */
```

### Tab Navigation Classes
```css
.tabs              /* Tab container */
.tab-nav           /* Tab navigation */
.tab-link          /* Tab link */
.tab-content       /* Tab content container */
.tab-pane          /* Individual tab panel */
.tabs-pills        /* Pill-style tabs */
```

### Pagination Classes
```css
.pagination        /* Pagination container */
.pagination-item   /* Pagination item */
.pagination-info   /* Pagination information */
.pagination-sm     /* Small pagination */
.pagination-lg     /* Large pagination */
```

## Accessibility

### ARIA Support
Navigation components implement comprehensive accessibility patterns:

```html
<!-- Header navigation -->
<nav role="navigation" aria-label="Main navigation">
    <ul class="navbar-nav">
        <li><a href="#" class="nav-link" aria-current="page">Dashboard</a></li>
        <li><a href="#" class="nav-link">Projects</a></li>
    </ul>
</nav>

<!-- Breadcrumb navigation -->
<nav aria-label="Breadcrumb">
    <ol class="breadcrumb">
        <li><a href="#" class="breadcrumb-item">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Current</li>
    </ol>
</nav>

<!-- Tab navigation -->
<div class="tabs">
    <div class="tab-nav" role="tablist">
        <button class="tab-link" role="tab" aria-selected="true" aria-controls="panel1">Tab 1</button>
        <button class="tab-link" role="tab" aria-selected="false" aria-controls="panel2">Tab 2</button>
    </div>
    <div id="panel1" class="tab-pane" role="tabpanel" aria-labelledby="tab1">Content 1</div>
    <div id="panel2" class="tab-pane" role="tabpanel" aria-labelledby="tab2">Content 2</div>
</div>

<!-- Pagination navigation -->
<nav aria-label="Pagination Navigation">
    <ul class="pagination">
        <li><button class="pagination-item" aria-label="Go to previous page">Previous</button></li>
        <li><a href="#" class="pagination-item" aria-label="Go to page 1" aria-current="page">1</a></li>
        <li><a href="#" class="pagination-item" aria-label="Go to page 2">2</a></li>
        <li><button class="pagination-item" aria-label="Go to next page">Next</button></li>
    </ul>
</nav>
```

### Keyboard Navigation
- All navigation elements are focusable with proper tab order
- Arrow keys navigate through related items (tabs, pagination)
- Enter and Space keys activate navigation items
- Escape key closes mobile menus and dropdowns
- Home and End keys jump to first/last items in navigation groups

### Screen Reader Support
- Proper heading hierarchy for navigation sections
- Descriptive aria-labels for navigation landmarks
- Current page/state announcement with aria-current
- Loading and error states announced to screen readers

## Interactive Showcase

### [Navigation Components Showcase](./index.html)
Interactive demonstration with customizable navigation builder and real-time preview.

**Features:**
- Live navigation customization
- All navigation types and variants
- Icon and badge toggles
- HTML code generation
- Dark mode support
- Accessibility testing

## Responsive Behavior

### Mobile Optimization
```css
@media (max-width: 768px) {
    .navbar-nav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
    }
    
    .navbar-nav.active {
        display: flex;
    }
    
    .navbar-toggle {
        display: block;
    }
    
    .sidebar {
        width: 100%;
    }
    
    .breadcrumb {
        font-size: 0.75rem;
    }
    
    .pagination {
        justify-content: center;
    }
}
```

### Tablet Adjustments
```css
@media (min-width: 769px) and (max-width: 1024px) {
    .sidebar {
        width: 12rem;
    }
    
    .navbar-nav {
        gap: 1rem;
    }
}
```

## Animation and Interactions

### Hover Effects
```css
.nav-link:hover {
    color: #374151;
    background-color: #f3f4f6;
    transform: translateY(-1px);
}
```

### Focus States
```css
.nav-link:focus {
    outline: 2px solid #e91e63;
    outline-offset: 2px;
}
```

### Loading States
```css
.nav-loading {
    animation: nav-loading 1.5s infinite;
}
```

## Best Practices

### Do's
✅ Use consistent navigation patterns across pages  
✅ Provide clear visual hierarchy in navigation  
✅ Include active states for current page/section  
✅ Ensure navigation is keyboard accessible  
✅ Use descriptive labels for navigation items  
✅ Test navigation on mobile devices  

### Don'ts
❌ Inconsistent navigation placement across pages  
❌ Missing focus indicators for keyboard users  
❌ Overcrowding navigation with too many items  
❌ Unclear or ambiguous navigation labels  
❌ Not testing navigation on mobile devices  
❌ Missing breadcrumbs in deep hierarchies  

## Examples in Context

### Dashboard Layout
```html
<div class="dashboard-layout">
    <header class="navbar">
        <!-- Header navigation -->
    </header>
    <div class="flex">
        <aside class="sidebar">
            <!-- Sidebar navigation -->
        </aside>
        <main class="flex-1">
            <nav class="breadcrumb">
                <!-- Breadcrumb navigation -->
            </nav>
            <div class="content">
                <!-- Main content -->
                <div class="tabs">
                    <!-- Tab navigation -->
                </div>
                <nav class="pagination">
                    <!-- Pagination navigation -->
                </nav>
            </div>
        </main>
    </div>
</div>
```

### Mobile Navigation
```html
<nav class="navbar">
    <div class="navbar-brand">Botnar</div>
    <button class="navbar-toggle" aria-expanded="false" aria-controls="mobile-menu">
        Menu
    </button>
    <div id="mobile-menu" class="navbar-nav">
        <a href="#" class="nav-link">Dashboard</a>
        <a href="#" class="nav-link">Projects</a>
        <a href="#" class="nav-link">Reports</a>
    </div>
</nav>
```

### Content Navigation
```html
<article>
    <nav class="breadcrumb">
        <a href="#" class="breadcrumb-item">Health Programs</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-item active">Article Title</span>
    </nav>
    
    <div class="tabs">
        <nav class="tab-nav">
            <a href="#content" class="tab-link active">Article</a>
            <a href="#related" class="tab-link">Related</a>
            <a href="#resources" class="tab-link">Resources</a>
        </nav>
        <!-- Tab content -->
    </div>
</article>
```

## Related Components
- **[Typography](../../atoms/typography/README.md)**: Navigation text styling
- **[Buttons](../../atoms/buttons/README.md)**: Navigation action buttons
- **[Icons](../../atoms/icons/README.md)**: Navigation icons and indicators
- **[Colors](../../atoms/colors/README.md)**: Navigation color schemes and states
- **[Cards](../cards/README.md)**: Content containers in navigation contexts

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Full responsive design features
- CSS Grid and Flexbox support required

## Testing Checklist

### Accessibility Testing
- [ ] All navigation is keyboard accessible
- [ ] Focus indicators are clearly visible
- [ ] Screen readers announce navigation correctly
- [ ] ARIA labels are descriptive and helpful
- [ ] Color contrast meets WCAG AA standards
- [ ] Navigation maintains structure without CSS

### Functionality Testing
- [ ] Navigation adapts to different screen sizes
- [ ] Mobile menu toggles work correctly
- [ ] Tab navigation switches content properly
- [ ] Pagination controls function as expected
- [ ] Breadcrumbs show correct hierarchy
- [ ] Active states display correctly

### Visual Testing
- [ ] Navigation renders consistently across browsers
- [ ] Spacing and alignment are consistent
- [ ] Hover and focus states are clearly visible
- [ ] Dark mode variants render properly
- [ ] Icons align properly with text
- [ ] Responsive breakpoints work correctly

## Files

- **[index.html](./index.html)** - Interactive navigation components showcase
- **[navigation-utilities.css](./navigation-utilities.css)** - Complete CSS utility classes
- **[README.md](./README.md)** - This documentation file

## Migration Notes
When updating from previous navigation systems:
- Update class names to follow new naming conventions
- Add proper ARIA attributes for accessibility
- Test responsive layouts on multiple devices
- Verify dark mode compatibility
- Update any custom navigation styling to match new patterns

## Changelog
| Version | Date | Changes |
|---------|------|---------| 
| 1.0.0 | 2025-01-20 | Initial navigation components implementation with 5 navigation types |

---

**Component Status**: Production Ready  
**Last Updated**: 2025-01-20  
**Maintainer**: Design System Team