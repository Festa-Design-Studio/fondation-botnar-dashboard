# [Component Name] Atom

[Brief description of the component and its purpose in the design system]

## Overview

[Detailed explanation of what this atom is and why it exists. Include the specific use cases and the problem it solves.]

## Usage

### Basic Implementation

```html
<!-- Basic example of the component -->
<div class="component-class">
  <!-- Component content -->
</div>
```

### With JavaScript (Alpine.js)

```html
<!-- Example with Alpine.js integration if applicable -->
<div x-data="componentName()" class="component-class">
  <!-- Interactive component content -->
</div>
```

## Variants

### [Variant Name]
[Description of this variant and when to use it]

```html
<!-- Code example for this variant -->
```

### [Another Variant]
[Description and use case]

```html
<!-- Code example -->
```

## Properties & Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `property1` | string | 'default' | Description of what this property does |
| `property2` | boolean | false | When and why to use this |
| `property3` | number | 0 | Valid values and constraints |

## States

### Default State
- Normal appearance and behavior
- User expectations in this state

### Hover State
- Visual changes on hover
- Interactive feedback provided

### Focus State
- Keyboard focus appearance
- Focus ring specifications

### Active State
- Appearance during interaction
- User feedback mechanisms

### Disabled State
- Visual indication of disabled state
- Interaction prevention methods

### Loading State (if applicable)
- Loading indicator appearance
- Content behavior during loading

## Accessibility

### WCAG Compliance
- **Level**: AA compliant
- **Contrast Ratio**: [Specify contrast ratios]
- **Touch Target**: Minimum 44px × 44px

### Keyboard Support
| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from component |
| `Enter` | Activate component (if interactive) |
| `Space` | Alternative activation (if applicable) |
| `Escape` | Cancel/close action (if applicable) |

### Screen Reader Support
- Proper semantic HTML structure
- ARIA labels and descriptions
- State announcements
- Role attributes (if needed)

### Implementation Requirements
```html
<!-- Example with accessibility attributes -->
<element
  role="[appropriate role]"
  aria-label="[descriptive label]"
  aria-describedby="[id of description]"
  tabindex="[0 or -1]">
  Content
</element>
```

## Design Tokens

### Colors
```css
/* Color tokens used by this component */
--component-primary: var(--botnar-pink-500);
--component-hover: var(--botnar-pink-600);
--component-text: var(--gray-900);
```

### Typography
```css
/* Typography tokens */
--component-font-size: 1rem;
--component-font-weight: 500;
--component-line-height: 1.5;
```

### Spacing
```css
/* Spacing tokens */
--component-padding: var(--spacing-4);
--component-margin: var(--spacing-2);
```

## Best Practices

### Do's
✅ [Specific good practice]  
✅ [Another recommended approach]  
✅ [Important consideration]  

### Don'ts
❌ [Common mistake to avoid]  
❌ [Anti-pattern]  
❌ [Performance issue to avoid]  

## Examples in Context

### Example 1: [Use Case Name]
[Description of the use case]

```html
<!-- Complete example showing the component in context -->
```

### Example 2: [Another Use Case]
[Description]

```html
<!-- Another contextual example -->
```

## Related Components
- **[Related Atom]**: How they work together
- **[Related Molecule]**: Common combinations
- **[Design Pattern]**: Larger patterns that use this atom

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Testing Checklist

### Functionality
- [ ] All states render correctly
- [ ] Interactive behaviors work as expected
- [ ] JavaScript functionality (if applicable)
- [ ] Error handling implemented

### Accessibility
- [ ] Keyboard navigation functional
- [ ] Screen reader tested
- [ ] Color contrast verified
- [ ] Focus indicators visible
- [ ] ARIA implementation correct

### Cross-browser
- [ ] Chrome testing complete
- [ ] Firefox testing complete
- [ ] Safari testing complete
- [ ] Edge testing complete

### Performance
- [ ] Load time acceptable
- [ ] No memory leaks
- [ ] Animations smooth (60fps)
- [ ] No layout shifts

## Migration Notes
[Any notes about migrating from previous versions or other systems]

## Changelog
| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | YYYY-MM-DD | Initial implementation |

---

**Component Status**: [Development/Review/Production]  
**Last Updated**: YYYY-MM-DD  
**Maintainer**: [Team/Person Name]