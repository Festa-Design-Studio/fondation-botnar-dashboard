# Filter Components

Search, filter, and sorting interface components for data manipulation and user interactions in the Fondation Botnar Design System.

## Overview

Filter components combine atomic elements to create powerful data filtering interfaces that help users find and organize information efficiently.

## Components

### Search Components
- **Basic Search**: Simple search input with icon
- **Search with Button**: Search input paired with action button
- **Search with Suggestions**: Auto-complete search with dropdown suggestions

### Filter Types
- **Checkbox Filters**: Multi-select filtering with counts
- **Dropdown Filters**: Single-select filtering with categories
- **Range Filters**: Numeric range selection with dual sliders
- **Date Filters**: Date range selection for temporal filtering
- **Combined Filter Panels**: Complete filtering solutions

### Sorting Components
- **Sort Dropdown**: Traditional dropdown with direction toggle
- **Sort Pills**: Visual sorting options with pill buttons

## Features

- 🔍 **Real-time Filtering**: Instant results as users interact
- ♿ **WCAG 2.1 AA Compliant**: Full keyboard navigation and screen reader support
- 🌙 **Dark Mode Support**: Seamless theme switching
- 📱 **Responsive Design**: Mobile-optimized filter panels
- 🎯 **Active Filter Display**: Clear indication of applied filters
- 🔄 **Reset Functionality**: Easy filter clearing

## Usage

### Basic Search
```html
<div class="relative max-w-md">
    <input type="search" 
           placeholder="Search..."
           class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
        <svg class="w-5 h-5 text-gray-400">...</svg>
    </div>
</div>
```

### Checkbox Filter
```html
<label class="flex items-center">
    <input type="checkbox" class="w-4 h-4 text-botnar-pink-600">
    <span class="ml-2">Health Programs</span>
    <span class="ml-auto text-sm text-gray-500">(45)</span>
</label>
```

### Combined Filter Panel
```html
<div class="bg-white rounded-lg p-6">
    <!-- Search -->
    <input type="search" placeholder="Search programs...">
    
    <!-- Filters -->
    <select>...</select>
    
    <!-- Active Filters -->
    <div class="flex gap-2">
        <span class="filter-tag">Health Programs ×</span>
    </div>
</div>
```

## Best Practices

1. **Show Active Filters**: Always display which filters are currently applied
2. **Provide Clear Labels**: Use descriptive labels for all filter options
3. **Include Counts**: Show result counts for each filter option when possible
4. **Enable Reset**: Provide easy ways to clear individual or all filters
5. **Use Live Updates**: Update results in real-time as filters change
6. **Group Related Filters**: Organize filters logically by category

## Accessibility

- All inputs have proper labels and ARIA attributes
- Full keyboard navigation support
- Screen reader announcements for filter changes
- Clear focus indicators
- Proper heading hierarchy
- Color contrast meets WCAG AA standards

## Customization

### CSS Variables
```css
/* Custom range slider colors */
--filter-slider-track: #e5e7eb;
--filter-slider-thumb: #e91e63;

/* Search input styling */
--filter-search-border: #d1d5db;
--filter-search-focus: #e91e63;
```

### Alpine.js Integration
All filter components use Alpine.js for interactivity:
- Real-time filtering
- Dynamic option updates
- State management
- Event handling

## Examples

### Product Filter Panel
```javascript
{
    categories: ['electronics', 'clothing', 'books'],
    priceRange: { min: 0, max: 1000 },
    sortBy: 'price',
    searchQuery: ''
}
```

### User Management Filters
```javascript
{
    roles: ['admin', 'editor', 'viewer'],
    status: ['active', 'inactive'],
    dateRange: { start: '2024-01-01', end: '2024-12-31' }
}
```

## Related Components

- [Form Elements](../../atoms/forms/) - Base form inputs
- [Navigation](../navigation/) - Filter navigation patterns
- [Cards](../cards/) - Filtered content display