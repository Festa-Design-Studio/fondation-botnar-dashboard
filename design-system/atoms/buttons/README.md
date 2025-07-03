# Button Atoms

Button components for the Fondation Botnar Dashboard design system. These atomic components provide the foundation for all interactive actions across the dashboard application.

## Overview

Our button system follows a clear hierarchy and supports multiple variants, sizes, and states. All button components support dark mode and meet WCAG 2.1 AA accessibility standards.

## Components

### [Primary Buttons](./primary-buttons.html)
Complete button component library with variants, states, and accessibility features.

**Button Types:**
- **Primary**: Main call-to-action buttons (Submit Application, Save Changes)
- **Secondary**: Alternative actions and secondary options (Cancel, Export Data)
- **Ghost**: Tertiary actions and navigation (Learn More, Settings)
- **Danger**: Destructive actions requiring confirmation (Delete Grant, Reject)

**Button Sizes:**
- **Small (32px)**: Compact buttons for secondary actions and space-constrained interfaces
- **Medium (40px)**: Standard button size for most interface actions
- **Large (48px)**: Prominent buttons for primary actions and mobile interfaces

**Button States:**
- **Default**: Normal resting state
- **Hover**: Mouse over interaction
- **Focus**: Keyboard focus with ring indicator
- **Active**: Click/press state
- **Disabled**: Non-interactive state
- **Loading**: Async operation in progress

## Usage Guidelines

### Button Hierarchy

Follow this hierarchy when placing multiple buttons:

1. **Primary Button**: One per page/form for the main action
2. **Secondary Button**: Alternative or cancel actions
3. **Ghost Button**: Tertiary actions and navigation
4. **Danger Button**: Destructive actions (use sparingly)

### Implementation Examples

```html
<!-- Primary Button -->
<button class="bg-botnar-pink-500 hover:bg-botnar-pink-600 dark:bg-botnar-pink-600 dark:hover:bg-botnar-pink-700 text-white px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-botnar-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
    Submit Application
</button>

<!-- Secondary Button -->
<button class="bg-transparent hover:bg-botnar-blue-50 dark:hover:bg-botnar-blue-900/20 text-botnar-blue-600 dark:text-botnar-blue-400 border border-botnar-blue-600 dark:border-botnar-blue-400 px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-botnar-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
    Cancel
</button>

<!-- Ghost Button -->
<button class="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
    Learn More
</button>

<!-- Danger Button -->
<button class="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
    Delete Grant
</button>
```

### With Icons

```html
<!-- Button with leading icon -->
<button class="bg-botnar-pink-500 hover:bg-botnar-pink-600 text-white px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-botnar-pink-500 focus:ring-offset-2 flex items-center">
    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
    </svg>
    Add Grant
</button>

<!-- Button with trailing icon -->
<button class="bg-botnar-pink-500 hover:bg-botnar-pink-600 text-white px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-botnar-pink-500 focus:ring-offset-2 flex items-center">
    Submit Application
    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
</button>
```

### Loading States

```html
<!-- Loading button with Alpine.js -->
<button class="bg-botnar-pink-500 hover:bg-botnar-pink-600 text-white px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-botnar-pink-500 focus:ring-offset-2 flex items-center" 
        x-data="{ loading: false }" 
        @click="loading = true"
        :disabled="loading">
    <svg x-show="loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span x-text="loading ? 'Processing...' : 'Submit'"></span>
</button>
```

## Design Tokens

### Colors

**Primary Buttons:**
- Background: `botnar-pink-500` (#e91e63)
- Hover: `botnar-pink-600` (#d81b60)
- Dark Background: `botnar-pink-600` (#d81b60)
- Dark Hover: `botnar-pink-700` (#c2185b)

**Secondary Buttons:**
- Text: `botnar-blue-600` (#1976d2)
- Border: `botnar-blue-600` (#1976d2)
- Hover Background: `botnar-blue-50` (#e3f2fd)
- Dark Text: `botnar-blue-400` (#42a5f5)

**Ghost Buttons:**
- Text: `gray-700` (#374151)
- Hover Background: `gray-100` (#f3f4f6)
- Dark Text: `gray-300` (#d1d5db)
- Dark Hover: `gray-700` (#374151)

**Danger Buttons:**
- Background: `red-600` (#dc2626)
- Hover: `red-700` (#b91c1c)
- Dark Background: `red-700` (#b91c1c)
- Dark Hover: `red-800` (#991b1b)

### Spacing

**Padding:**
- Small: `px-3 py-2` (12px horizontal, 8px vertical)
- Medium: `px-4 py-2.5` (16px horizontal, 10px vertical)
- Large: `px-6 py-3` (24px horizontal, 12px vertical)

**Border Radius:**
- Small: `rounded` (4px)
- Medium/Large: `rounded-md` (6px)

### Typography

**Font Weight:** `font-medium` (500)
**Font Size:**
- Small: `text-sm` (14px)
- Medium: `text-base` (16px)
- Large: `text-lg` (18px)

## Accessibility Features

### WCAG Compliance
- **AA contrast ratios**: All buttons meet 4.5:1 minimum contrast
- **Touch targets**: Minimum 44px height for all interactive elements
- **Focus indicators**: Clear focus rings for keyboard navigation
- **Color independence**: Buttons work without color (text labels, icons)

### Keyboard Support
- **Enter key**: Activates button
- **Space key**: Activates button
- **Tab navigation**: Proper focus order
- **Escape key**: Cancels loading states (where applicable)

### Screen Reader Support
- **Descriptive text**: Clear button labels
- **ARIA labels**: For icon-only buttons
- **State announcements**: Loading, success, error states
- **Role semantics**: Proper button role attribution

### Implementation Requirements
- Use semantic `<button>` elements
- Include `aria-label` for icon-only buttons
- Provide `aria-describedby` for additional context
- Use `disabled` attribute for inactive states
- Include loading state announcements

## Best Practices

### Do's
✅ Use one primary button per page/form  
✅ Maintain consistent button hierarchy  
✅ Include loading states for async actions  
✅ Ensure minimum 44px touch targets  
✅ Use descriptive button labels  
✅ Test with keyboard navigation  
✅ Provide visual feedback for all interactions  

### Don'ts
❌ Multiple primary buttons in same context  
❌ Using "Click here" or generic labels  
❌ Buttons smaller than minimum touch size  
❌ Missing focus states or poor contrast  
❌ Overusing danger buttons  
❌ Inconsistent button styling across pages  

## Testing Checklist

### Functionality
- [ ] All button variants render correctly
- [ ] Hover states work as expected
- [ ] Focus states are clearly visible
- [ ] Click/tap interactions work
- [ ] Loading states function properly
- [ ] Disabled states prevent interaction

### Accessibility
- [ ] WCAG AA contrast validation passed
- [ ] Keyboard navigation works correctly
- [ ] Screen reader compatibility verified
- [ ] Touch target sizes meet minimums
- [ ] Focus management is logical
- [ ] ARIA labels are descriptive

### Cross-browser
- [ ] Chrome 90+ compatibility
- [ ] Firefox 88+ compatibility
- [ ] Safari 14+ compatibility
- [ ] Edge 90+ compatibility

### Responsive
- [ ] Buttons scale appropriately on mobile
- [ ] Touch interactions work on all devices
- [ ] Text remains readable at all sizes
- [ ] Icons scale properly

---

**Last Updated**: January 2025  
**Version**: 1.0  
**Status**: Complete