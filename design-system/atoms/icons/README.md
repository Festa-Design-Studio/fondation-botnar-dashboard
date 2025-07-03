# Icon System Atom

A comprehensive SVG icon library designed for the Fondation Botnar dashboard, providing scalable, accessible icons with consistent visual styling and interaction patterns.

## Overview

The icon system provides a curated collection of SVG icons organized by functional categories. Each icon is optimized for accessibility, scalability, and consistent visual appearance across different themes and contexts.

### Key Features
- **48+ curated icons** across 6 functional categories
- **Fully accessible** with ARIA support and screen reader compatibility
- **Dark mode support** with automatic theme adaptation
- **Scalable SVG format** for crisp rendering at any size
- **Interactive showcase** with real-time preview and code generation
- **CSS utilities** for consistent styling and behavior

## Icon Categories

### Navigation (4 icons)
Icons for dashboard navigation, routing, and directional actions.
- **Home** - Dashboard home navigation
- **Menu** - Menu toggle, navigation drawer
- **Arrow Left** - Back navigation, previous page
- **Arrow Right** - Forward navigation, next page

### Actions (4 icons)
Common action icons for user interactions and data manipulation.
- **Add** - Add new items, create actions
- **Edit** - Edit content, modify data
- **Delete** - Delete items, remove content
- **Save** - Save data, download files

### Data & Analytics (4 icons)
Icons for data visualization, charts, and analytical tools.
- **Chart Bar** - Bar charts, data visualization
- **Chart Line** - Line charts, trend analysis
- **Table** - Data tables, grid layouts
- **Filter** - Filter data, search refinement

### Communication (4 icons)
Icons for messaging, notifications, and social interactions.
- **Bell** - Notifications, alerts
- **Mail** - Email, messages
- **Chat** - Chat, discussions
- **Share** - Share content, social features

### Status (4 icons)
Status indicators, feedback icons, and state representations.
- **Check** - Success states, completed tasks
- **X** - Close, cancel, error states
- **Warning** - Warning messages, caution
- **Info** - Information, help tooltips

### Files & Media (4 icons)
Icons for file operations, uploads, downloads, and media content.
- **Document** - Documents, files
- **Upload** - File upload, import data
- **Download** - Download files, export data
- **Image** - Images, media content

## Usage Guidelines

### Basic Implementation

#### HTML Structure
```html
<!-- Basic icon -->
<div class="w-5 h-5 text-gray-600">
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
  </svg>
</div>

<!-- Icon with accessibility -->
<div class="w-5 h-5 text-gray-600" role="img" aria-label="Add new item">
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
  </svg>
</div>
```

#### Icon Button
```html
<button class="icon-button" aria-label="Add new item">
  <div class="w-5 h-5">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
    </svg>
  </div>
</button>
```

#### Icon with Text
```html
<div class="icon-text">
  <div class="w-4 h-4">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
    </svg>
  </div>
  <span>Add Item</span>
</div>
```

### CSS Classes

#### Size Classes
```css
.icon-xs { width: 0.75rem; height: 0.75rem; } /* 12px */
.icon-sm { width: 1rem; height: 1rem; }       /* 16px */
.icon-md { width: 1.25rem; height: 1.25rem; } /* 20px */
.icon-lg { width: 1.5rem; height: 1.5rem; }   /* 24px */
.icon-xl { width: 2rem; height: 2rem; }       /* 32px */
.icon-2xl { width: 3rem; height: 3rem; }      /* 48px */
.icon-3xl { width: 4rem; height: 4rem; }      /* 64px */
```

#### Color Classes
```css
.icon-primary { color: #e91e63; }    /* Brand pink */
.icon-secondary { color: #1976d2; }  /* Brand blue */
.icon-success { color: #10b981; }    /* Success green */
.icon-warning { color: #ef6c00; }    /* Warning orange */
.icon-error { color: #ef4444; }      /* Error red */
.icon-info { color: #3b82f6; }       /* Info blue */
```

#### Interactive States
```css
.icon-interactive {
    color: #6b7280;
    transition: color 0.2s ease-in-out;
}

.icon-interactive:hover {
    color: #e91e63;
}
```

## Properties & Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | string | `md` | Icon size (xs, sm, md, lg, xl, 2xl, 3xl) |
| `color` | string | `gray` | Icon color theme |
| `interactive` | boolean | `false` | Enable hover/focus states |
| `animation` | string | `none` | Animation type (spin, bounce, pulse) |
| `aria-label` | string | - | Accessibility label for screen readers |

## Variants

### Size Variants
Icons are available in 7 standard sizes following Tailwind CSS conventions.

```html
<!-- Extra small - 12px -->
<div class="icon-xs text-gray-600">...</div>

<!-- Small - 16px -->
<div class="icon-sm text-gray-600">...</div>

<!-- Medium - 20px (default) -->
<div class="icon-md text-gray-600">...</div>

<!-- Large - 24px -->
<div class="icon-lg text-gray-600">...</div>

<!-- Extra large - 32px -->
<div class="icon-xl text-gray-600">...</div>

<!-- 2X large - 48px -->
<div class="icon-2xl text-gray-600">...</div>

<!-- 3X large - 64px -->
<div class="icon-3xl text-gray-600">...</div>
```

### Color Variants
Icons inherit text color and support theme-specific color classes.

```html
<!-- Brand colors -->
<div class="w-5 h-5 icon-primary">...</div>
<div class="w-5 h-5 icon-secondary">...</div>

<!-- Status colors -->
<div class="w-5 h-5 icon-success">...</div>
<div class="w-5 h-5 icon-warning">...</div>
<div class="w-5 h-5 icon-error">...</div>
<div class="w-5 h-5 icon-info">...</div>

<!-- Neutral colors -->
<div class="w-5 h-5 text-gray-400">...</div>
<div class="w-5 h-5 text-gray-600">...</div>
<div class="w-5 h-5 text-gray-800">...</div>
```

### Button Variants
Icons can be used as interactive buttons with proper accessibility.

```html
<!-- Basic icon button -->
<button class="icon-button">
  <div class="w-5 h-5">...</div>
</button>

<!-- Primary icon button -->
<button class="icon-button-primary">
  <div class="w-5 h-5">...</div>
</button>

<!-- Secondary icon button -->
<button class="icon-button-secondary">
  <div class="w-5 h-5">...</div>
</button>
```

## States

### Default State
- Icons display with current text color
- Standard opacity and visual clarity
- No interactive behaviors

### Hover State
- Color transition for interactive icons
- Subtle visual feedback
- Maintains accessibility contrast

### Focus State
- Clear focus indicators with ring styles
- High contrast focus rings
- Keyboard navigation support

### Active State
- Pressed appearance with scale transform
- Immediate visual feedback
- Brief animation duration

### Disabled State
- Reduced opacity (50%)
- Pointer events disabled
- Non-interactive appearance

## Accessibility

### ARIA Support
```html
<!-- Decorative icon -->
<div class="w-5 h-5" role="img" aria-hidden="true">...</div>

<!-- Informative icon -->
<div class="w-5 h-5" role="img" aria-label="Success">...</div>

<!-- Interactive icon -->
<button aria-label="Delete item">
  <div class="w-5 h-5">...</div>
</button>
```

### Screen Reader Support
```html
<!-- Hidden text for screen readers -->
<button>
  <div class="w-5 h-5">...</div>
  <span class="sr-only">Delete item</span>
</button>

<!-- Announced descriptions -->
<div class="w-5 h-5" role="img" aria-describedby="icon-help">...</div>
<div id="icon-help" class="sr-only">Click to view help information</div>
```

### Touch Targets
- Minimum 24px touch target for interactive icons
- Adequate spacing between clickable icons
- Clear visual feedback for touch interactions

## Interactive Showcase

### [Icon System Showcase](./index.html)
Interactive icon library with real-time preview, customization, and code generation.

**Features:**
- Browse all icons by category
- Click icons to see usage examples
- Adjust size and styling options
- Copy HTML code to clipboard
- Dark mode support
- Keyboard navigation
- Screen reader compatible

**Usage:**
```html
<!-- Visit the showcase page for interactive examples -->
<a href="./index.html">Explore Icon System</a>
```

## Animation Support

### CSS Animations
```css
/* Spinning animation */
.icon-spin {
    animation: icon-spin 1s linear infinite;
}

/* Bounce animation */
.icon-bounce {
    animation: icon-bounce 1s infinite;
}

/* Pulse animation */
.icon-pulse {
    animation: icon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### Usage Examples
```html
<!-- Loading spinner -->
<div class="w-5 h-5 icon-spin text-gray-600">
  <!-- Circular arrow or spinner icon -->
</div>

<!-- Notification bounce -->
<div class="w-5 h-5 icon-bounce text-red-500">
  <!-- Bell or alert icon -->
</div>

<!-- Pulse effect -->
<div class="w-5 h-5 icon-pulse text-blue-500">
  <!-- Info or status icon -->
</div>
```

## Best Practices

### Do's
✅ Use semantic HTML with proper ARIA labels  
✅ Maintain consistent icon sizes within contexts  
✅ Provide alternative text for informative icons  
✅ Use appropriate colors for different states  
✅ Test with screen readers and keyboard navigation  
✅ Follow touch target size guidelines  

### Don'ts
❌ Use icons alone to convey critical information  
❌ Make icons too small for interaction  
❌ Override icon colors unnecessarily  
❌ Use decorative icons without aria-hidden  
❌ Ignore keyboard accessibility  
❌ Use inconsistent icon styles  

## Examples in Context

### Example 1: Navigation Menu
```html
<nav class="space-y-2">
  <a href="/dashboard" class="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100">
    <div class="w-5 h-5 text-gray-600">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
      </svg>
    </div>
    <span>Dashboard</span>
  </a>
</nav>
```

### Example 2: Action Buttons
```html
<div class="flex space-x-2">
  <button class="icon-button-primary" aria-label="Add new item">
    <div class="w-4 h-4">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
    </div>
  </button>
  
  <button class="icon-button" aria-label="Edit item">
    <div class="w-4 h-4">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
      </svg>
    </div>
  </button>
</div>
```

### Example 3: Status Indicators
```html
<div class="flex items-center space-x-2">
  <div class="w-4 h-4 text-green-500" role="img" aria-label="Active status">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
  </div>
  <span class="text-sm text-gray-700">System Active</span>
</div>
```

## Related Components
- **[Buttons](../buttons/README.md)**: Icon buttons and button combinations
- **[Navigation](../../molecules/navigation/README.md)**: Navigation components using icons
- **[Status Indicators](../../molecules/status/README.md)**: Status components with icons
- **[Forms](../forms/README.md)**: Form inputs with icon enhancements

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Full SVG support required
- CSS animations supported

## Testing Checklist

### Accessibility Testing
- [ ] All interactive icons have proper ARIA labels
- [ ] Focus indicators are visible and clear
- [ ] Screen reader announcements are appropriate
- [ ] Keyboard navigation works correctly
- [ ] Touch targets meet size requirements (24px minimum)

### Visual Testing
- [ ] Icons render correctly across browsers
- [ ] Dark mode variations display properly
- [ ] Icon scaling maintains quality
- [ ] Color contrast meets WCAG standards
- [ ] Animations perform smoothly

### Interactive Testing
- [ ] Hover states provide clear feedback
- [ ] Click interactions work reliably
- [ ] Copy functionality operates correctly
- [ ] Showcase page loads and functions
- [ ] Theme switching works properly

## Files

- **[index.html](./index.html)** - Interactive icon system showcase
- **[icon-utilities.css](./icon-utilities.css)** - CSS utility classes for icons
- **[README.md](./README.md)** - This documentation file

## Migration Notes
When updating from previous icon systems:
- Replace font icons with SVG implementations
- Update class names to follow new utility patterns
- Add proper accessibility attributes
- Test icon sizing and positioning
- Verify dark mode compatibility

## Changelog
| Version | Date | Changes |
|---------|------|---------| 
| 1.0.0 | 2025-01-20 | Initial icon system implementation with 48+ icons |

---

**Component Status**: Production Ready  
**Last Updated**: 2025-01-20  
**Maintainer**: Design System Team