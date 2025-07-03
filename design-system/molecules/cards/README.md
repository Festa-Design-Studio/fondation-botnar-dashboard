# Card Components Molecule

Reusable card components that combine atomic design elements (typography, colors, buttons, icons) into cohesive content containers for the Fondation Botnar dashboard. Cards serve as flexible building blocks for displaying various types of information in an organized, scannable format.

## Overview

Card components are molecular-level elements that encapsulate content in a visually distinct container. They provide a consistent structure for presenting information while maintaining flexibility for different content types and use cases.

### Key Features
- **8+ card types** for different content scenarios
- **4 layout variants** (default, bordered, elevated, interactive)
- **3 size options** (small, medium, large)
- **Responsive design** with mobile-optimized layouts
- **Full accessibility** with ARIA support and keyboard navigation
- **Dark mode support** with automatic theme adaptation
- **Interactive showcase** with real-time customization

## Card Types

### Basic Card
General-purpose content container with header, body, and optional actions.

```html
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Card Title</h3>
        <p class="card-subtitle">Optional subtitle</p>
    </div>
    <div class="card-content">
        <p class="card-text">Main content goes here...</p>
    </div>
    <div class="card-actions">
        <button class="btn btn-primary btn-sm">Action</button>
        <button class="btn btn-secondary btn-sm">Cancel</button>
    </div>
</div>
```

### Metric Card
Displays key performance indicators and numerical data.

```html
<div class="card card-metric">
    <div class="card-content">
        <div class="flex items-center justify-between">
            <div>
                <p class="card-metric-label">Total Children Reached</p>
                <p class="card-metric-value">2.4M</p>
                <p class="card-metric-change card-metric-change-positive">
                    +12% from last month
                </p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <!-- Icon -->
            </div>
        </div>
    </div>
</div>
```

### Status Card
Communicates system status, alerts, or state information.

```html
<div class="card card-status card-status-success">
    <div class="card-content">
        <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <!-- Success icon -->
            </div>
            <div>
                <h4 class="card-title">System Status</h4>
                <p class="card-text">All systems operational</p>
            </div>
        </div>
    </div>
</div>
```

### Article Card
Perfect for blog posts, news articles, or content previews.

```html
<div class="card card-article">
    <div class="card-image">
        <img src="article-image.jpg" alt="Article preview" class="w-full h-48 object-cover">
    </div>
    <div class="card-content">
        <h3 class="card-title">Article Title</h3>
        <p class="card-text">Article excerpt or description...</p>
    </div>
    <div class="card-footer">
        <div class="flex items-center justify-between text-sm text-gray-500">
            <span>March 15, 2025</span>
            <span>Author Name</span>
        </div>
    </div>
</div>
```

### Profile Card
User profile display with avatar and information.

```html
<div class="card card-profile">
    <div class="card-image">
        <img src="avatar.jpg" alt="User avatar" class="card-profile-avatar">
    </div>
    <div class="card-content">
        <h3 class="card-profile-name">Dr. Sarah Johnson</h3>
        <p class="card-profile-role">Senior Researcher</p>
        <p class="card-text">Specialist in childhood development and nutrition programs.</p>
    </div>
    <div class="card-actions">
        <button class="btn btn-primary btn-sm">Contact</button>
        <button class="btn btn-secondary btn-sm">View Profile</button>
    </div>
</div>
```

### Interactive Card
Clickable cards that respond to user interaction.

```html
<div class="card card-interactive" tabindex="0" role="button" aria-label="View project details">
    <div class="card-content">
        <h3 class="card-title">Interactive Project</h3>
        <p class="card-text">Click to explore this project in detail.</p>
        <div class="mt-4">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-botnar-pink-100 text-botnar-pink-800">
                Clickable
            </span>
        </div>
    </div>
</div>
```

### Form Card
Contains form elements for user input.

```html
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Contact Form</h3>
        <p class="card-subtitle">Get in touch with our team</p>
    </div>
    <div class="card-content">
        <form class="space-y-4">
            <div class="form-group">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" class="form-input" placeholder="Your name">
            </div>
            <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-input" placeholder="your.email@example.com">
            </div>
        </form>
    </div>
    <div class="card-actions">
        <button class="btn btn-primary w-full">Send Message</button>
    </div>
</div>
```

### Dashboard Card
Specialized for dashboard widgets and data display.

```html
<div class="card">
    <div class="card-header">
        <div class="flex items-center justify-between">
            <h3 class="card-title">Monthly Progress</h3>
            <button class="text-gray-400 hover:text-gray-600">
                <!-- Options icon -->
            </button>
        </div>
    </div>
    <div class="card-content">
        <!-- Chart or data visualization -->
        <div class="h-32 bg-gray-100 rounded flex items-center justify-center">
            Chart Placeholder
        </div>
    </div>
    <div class="card-footer">
        <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">Last updated: 2 hours ago</span>
            <a href="#" class="card-link">View Details</a>
        </div>
    </div>
</div>
```

## Card Variants

### Default Variant
Standard card with subtle background and minimal shadow.

```html
<div class="card">
    <!-- Card content -->
</div>
```

### Bordered Variant
Card with visible border and no shadow.

```html
<div class="card card-bordered">
    <!-- Card content -->
</div>
```

### Elevated Variant
Card with pronounced drop shadow for emphasis.

```html
<div class="card card-elevated">
    <!-- Card content -->
</div>
```

### Interactive Variant
Card with hover effects and focus states.

```html
<div class="card card-interactive" tabindex="0">
    <!-- Card content -->
</div>
```

## Card Sizes

### Small Cards
Compact cards for minimal content.

```html
<div class="card card-sm">
    <!-- Reduced padding and spacing -->
</div>
```

### Medium Cards (Default)
Standard card size for most use cases.

```html
<div class="card">
    <!-- Default spacing -->
</div>
```

### Large Cards
Spacious cards for detailed content.

```html
<div class="card card-lg">
    <!-- Increased padding and spacing -->
</div>
```

## Card Layouts

### Horizontal Card
Side-by-side image and content layout.

```html
<div class="card card-horizontal">
    <div class="card-image">
        <img src="image.jpg" alt="Description" class="w-32 h-full object-cover">
    </div>
    <div class="card-body">
        <div class="card-header">
            <h3 class="card-title">Horizontal Card</h3>
        </div>
        <div class="card-content">
            <p class="card-text">Content displayed alongside image.</p>
        </div>
        <div class="card-actions">
            <button class="btn btn-primary btn-sm">Action</button>
        </div>
    </div>
</div>
```

### Card Grid Layouts
Responsive grid systems for multiple cards.

```html
<!-- 3-column grid (responsive) -->
<div class="card-grid card-grid-3">
    <div class="card"><!-- Card 1 --></div>
    <div class="card"><!-- Card 2 --></div>
    <div class="card"><!-- Card 3 --></div>
</div>

<!-- Equal height card deck -->
<div class="card-deck">
    <div class="card"><!-- Card 1 --></div>
    <div class="card"><!-- Card 2 --></div>
    <div class="card"><!-- Card 3 --></div>
</div>

<!-- Masonry layout -->
<div class="card-masonry">
    <div class="card"><!-- Varying height cards --></div>
    <div class="card"><!-- Auto-arranged --></div>
    <div class="card"><!-- Masonry style --></div>
</div>
```

## Properties & Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | string | `default` | Card style variant (default, bordered, elevated, interactive) |
| `size` | string | `md` | Card size (sm, md, lg) |
| `type` | string | `basic` | Card type (basic, metric, status, article, profile, form) |
| `interactive` | boolean | `false` | Enable hover and focus interactions |
| `loading` | boolean | `false` | Show loading animation |

## CSS Classes

### Base Classes
```css
.card              /* Base card container */
.card-header       /* Card header section */
.card-content      /* Main content area */
.card-actions      /* Action buttons area */
.card-footer       /* Footer section */
.card-image        /* Image container */
```

### Variant Classes
```css
.card-bordered     /* Bordered variant */
.card-elevated     /* Elevated with shadow */
.card-interactive  /* Interactive with hover */
```

### Size Classes
```css
.card-sm          /* Small card */
.card-md          /* Medium card (default) */
.card-lg          /* Large card */
```

### Type Classes
```css
.card-metric      /* Metric display card */
.card-status      /* Status indicator card */
.card-article     /* Article/content card */
.card-profile     /* Profile display card */
.card-horizontal  /* Horizontal layout */
```

### Layout Classes
```css
.card-grid        /* Grid container */
.card-grid-2      /* 2-column grid */
.card-grid-3      /* 3-column grid */
.card-grid-4      /* 4-column grid */
.card-deck        /* Equal height cards */
.card-masonry     /* Masonry layout */
```

## Accessibility

### ARIA Support
Cards implement proper accessibility patterns:

```html
<!-- Interactive card -->
<div class="card card-interactive" 
     role="button" 
     tabindex="0"
     aria-label="View project details">
    <!-- Content -->
</div>

<!-- Card with heading -->
<div class="card" aria-labelledby="card-title-1">
    <div class="card-header">
        <h3 id="card-title-1" class="card-title">Accessible Card</h3>
    </div>
    <!-- Content -->
</div>
```

### Keyboard Navigation
- Interactive cards are focusable with `tabindex="0"`
- Enter and Space keys activate interactive cards
- Clear focus indicators for keyboard users
- Logical tab order within card content

### Screen Reader Support
- Proper heading hierarchy within cards
- Descriptive aria-labels for interactive elements
- Status cards announce their state
- Clear content structure for screen readers

## Interactive Showcase

### [Card Components Showcase](./index.html)
Interactive demonstration with customizable card builder and real-time preview.

**Features:**
- Live card customization
- All card types and variants
- Size and element toggles
- HTML code generation
- Dark mode support
- Accessibility testing

## Responsive Behavior

### Mobile Optimization
```css
@media (max-width: 768px) {
    .card-grid-2,
    .card-grid-3,
    .card-grid-4 {
        grid-template-columns: 1fr;
    }
    
    .card-deck {
        flex-direction: column;
    }
    
    .card-horizontal {
        flex-direction: column;
    }
}
```

### Tablet Adjustments
```css
@media (min-width: 769px) and (max-width: 1024px) {
    .card-grid-3,
    .card-grid-4 {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

## Animation and Interactions

### Hover Effects
```css
.card-interactive:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Loading States
```css
.card-loading {
    /* Shimmer animation for loading cards */
    animation: card-loading 1.5s infinite;
}
```

### Entrance Animations
```css
.card-fade-in {
    animation: card-fade-in 0.3s ease-out;
}
```

## Best Practices

### Do's
✅ Use consistent card spacing in layouts  
✅ Include clear headings for card content  
✅ Maintain visual hierarchy within cards  
✅ Use appropriate card variants for context  
✅ Ensure interactive cards have focus states  
✅ Test card layouts on mobile devices  

### Don'ts
❌ Overcrowd cards with too much content  
❌ Use inconsistent spacing between cards  
❌ Mix too many card variants in one view  
❌ Forget focus states on interactive cards  
❌ Use poor contrast in card content  
❌ Create overly complex card structures  

## Examples in Context

### Dashboard Grid
```html
<div class="card-grid card-grid-3">
    <div class="card card-metric">
        <!-- KPI card -->
    </div>
    <div class="card card-status card-status-success">
        <!-- Status card -->
    </div>
    <div class="card">
        <!-- Chart card -->
    </div>
</div>
```

### Article List
```html
<div class="space-y-6">
    <div class="card card-article card-horizontal">
        <!-- Horizontal article card -->
    </div>
    <div class="card card-article card-horizontal">
        <!-- Another article -->
    </div>
</div>
```

### Profile Section
```html
<div class="card-deck">
    <div class="card card-profile">
        <!-- Team member 1 -->
    </div>
    <div class="card card-profile">
        <!-- Team member 2 -->
    </div>
    <div class="card card-profile">
        <!-- Team member 3 -->
    </div>
</div>
```

## Related Components
- **[Typography](../../atoms/typography/README.md)**: Card titles and text styling
- **[Buttons](../../atoms/buttons/README.md)**: Card action buttons
- **[Icons](../../atoms/icons/README.md)**: Card icons and indicators
- **[Colors](../../atoms/colors/README.md)**: Card color schemes and states
- **[Forms](../../atoms/forms/README.md)**: Form cards and input cards

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- CSS Grid and Flexbox support required
- Full responsive design features

## Testing Checklist

### Accessibility Testing
- [ ] All interactive cards are keyboard accessible
- [ ] Focus indicators are clearly visible
- [ ] Screen readers announce card content properly
- [ ] ARIA labels are descriptive and helpful
- [ ] Color contrast meets WCAG AA standards
- [ ] Cards maintain structure without CSS

### Functionality Testing
- [ ] Card layouts adapt to different screen sizes
- [ ] Interactive cards respond to hover and focus
- [ ] Loading states display correctly
- [ ] Dark mode variants render properly
- [ ] Card grids maintain proper spacing

### Visual Testing
- [ ] Cards render consistently across browsers
- [ ] Spacing and alignment are consistent
- [ ] Images scale properly within cards
- [ ] Animations perform smoothly
- [ ] Print styles are appropriate

## Files

- **[index.html](./index.html)** - Interactive card components showcase
- **[card-utilities.css](./card-utilities.css)** - Complete CSS utility classes
- **[README.md](./README.md)** - This documentation file

## Migration Notes
When updating from previous card systems:
- Update class names to follow new naming conventions
- Add proper ARIA attributes for accessibility
- Test responsive layouts on multiple devices
- Verify dark mode compatibility
- Update any custom card styling to match new patterns

## Changelog
| Version | Date | Changes |
|---------|------|---------| 
| 1.0.0 | 2025-01-20 | Initial card components implementation with 8 card types |

---

**Component Status**: Production Ready  
**Last Updated**: 2025-01-20  
**Maintainer**: Design System Team