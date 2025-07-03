# Molecules - Fondation Botnar Design System

Molecules are simple groups of atoms functioning together as a unit. These components combine basic elements to create reusable interface patterns.

## Overview

Molecules include:
- **KPI Cards**: Data display cards with metrics and trends
- **Chart Components**: Basic chart containers with titles and controls
- **Filter Controls**: Search bars, dropdowns, date pickers
- **Navigation Items**: Menu items, breadcrumbs, pagination
- **Data Tables**: Simple tables with sorting and basic filtering
- **Modal Dialogs**: Alert, confirm, and form modals
- **Loading States**: Skeletons, spinners, progress indicators

## Naming Convention

Molecule components should follow this structure:
```
molecules/
├── kpi-cards/
│   ├── metric-card.html
│   ├── trend-card.html
│   └── README.md
├── chart-components/
│   ├── chart-container.html
│   ├── chart-legend.html
│   └── README.md
└── ...
```

## Implementation Guidelines

### Alpine.js Integration
- Use Alpine.js for component interactivity
- Implement proper state management
- Handle user interactions gracefully
- Provide loading and error states

### Accessibility Requirements
- ARIA labels and descriptions
- Keyboard navigation patterns
- Focus management for interactive elements
- Screen reader announcements for state changes
- Color-independent information conveyance

### Responsive Design
- Mobile-first approach
- Flexible layouts using CSS Grid/Flexbox
- Appropriate touch targets (44px minimum)
- Readable typography at all screen sizes

### Data Integration
- Accept props through Alpine.js or data attributes
- Handle empty states gracefully
- Implement error boundaries
- Support real-time data updates

## Documentation Requirements

Each molecule must include:
1. **Interactive Examples**: Working demonstrations
2. **State Variations**: Default, loading, error, empty states
3. **Props Documentation**: Expected data structure
4. **Event Handling**: User interactions and callbacks
5. **Accessibility Guide**: ARIA patterns and keyboard shortcuts
6. **Integration Notes**: How to connect with data sources

## Testing Checklist

- [ ] Component functionality testing
- [ ] State management validation
- [ ] Accessibility compliance (WCAG AA)
- [ ] Responsive design testing
- [ ] Cross-browser compatibility
- [ ] Performance optimization
- [ ] Error handling verification
- [ ] Data integration testing

## Alpine.js Patterns

### Data Component Pattern
```javascript
function dataCard() {
  return {
    data: {},
    loading: false,
    error: null,
    
    init() {
      this.loadData();
    },
    
    async loadData() {
      // Implementation
    }
  }
}
```

### Event Handling Pattern
```javascript
function interactiveComponent() {
  return {
    handleClick(event) {
      this.$dispatch('component-clicked', { 
        id: this.id, 
        data: this.data 
      });
    }
  }
}
```

## Status Tracking

| Component | Status | Functionality | Accessibility | Documentation | Tests |
|-----------|--------|---------------|---------------|---------------|-------|
| KPI Cards | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ |
| Chart Components | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ |
| Filter Controls | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ |
| Data Tables | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ |
| Navigation | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ |

**Legend**: ✅ Complete | 🔄 In Progress | ⏸️ Not Started | ❌ Failed

---

**Last Updated**: January 2025  
**Next Review**: Phase 3 Development