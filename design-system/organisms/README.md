# Organisms - Complex UI Components

Complex UI organisms composed of multiple molecules and atoms that form distinct sections of an interface. These organisms provide complete, functional experiences for dashboard users within the Fondation Botnar ecosystem.

## Overview

Organisms represent the highest level of complexity in our atomic design system, combining multiple molecular components into cohesive, functional interfaces. They serve as the building blocks for complete page templates and provide comprehensive user experiences.

## Current Status

**Phase 4 Progress**: 2 of 4 tasks complete (50%)

### Completed Components
- ✅ **Dashboard Layouts** - Complex dashboard organisms with multiple layout variants
- ✅ **Data Table Components** - Advanced data manipulation with virtual scrolling

### Planned Components  
- 📝 **Modal Dialog Systems** - Accessible modals with focus management
- 📝 **Form Wizards** - Multi-step forms with validation and progress tracking

## Naming Convention

Organism components should follow this structure:
```
organisms/
├── chart-containers/
│   ├── grant-distribution-chart.html
│   ├── funding-trends-chart.html
│   └── README.md
├── navigation/
│   ├── main-header.html
│   ├── sidebar-nav.html
│   └── README.md
└── ...
```

## Implementation Guidelines

### Complex State Management
- Use Alpine.js stores for shared state
- Implement proper data flow patterns
- Handle complex user interactions
- Manage multiple component states

### Chart.js Integration
- Implement accessibility features
- Handle responsive resizing
- Manage chart lifecycle
- Provide data loading states

### Advanced Accessibility
- Complex ARIA patterns (trees, grids, live regions)
- Skip links and landmark navigation
- Keyboard shortcut systems
- Screen reader optimization for data visualization
- High contrast mode support

### Performance Considerations
- Lazy loading for heavy components
- Virtual scrolling for large datasets
- Debounced search and filtering
- Memory management for charts

### Data Architecture
- RESTful API integration patterns
- Error handling and retry logic
- Caching strategies
- Real-time data updates

## Documentation Requirements

Each organism must include:
1. **Complete Implementation Guide**: Step-by-step setup
2. **API Integration**: Data requirements and endpoints
3. **State Management**: Alpine.js store patterns
4. **Accessibility Features**: Complete ARIA implementation
5. **Performance Notes**: Optimization strategies
6. **Customization Options**: Theming and configuration
7. **Integration Examples**: Usage within templates

## Testing Checklist

- [ ] End-to-end functionality testing
- [ ] Complex state management validation
- [ ] API integration testing
- [ ] Accessibility compliance (WCAG AAA where possible)
- [ ] Performance benchmarking
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Error handling scenarios
- [ ] Data loading states
- [ ] Memory leak testing

## Alpine.js Store Patterns

### Dashboard Data Store
```javascript
Alpine.store('dashboardData', {
  grants: [],
  loading: false,
  filters: {},
  
  async loadGrants() {
    this.loading = true;
    try {
      const response = await fetch('/api/grants');
      this.grants = await response.json();
    } catch (error) {
      console.error('Failed to load grants:', error);
    } finally {
      this.loading = false;
    }
  }
});
```

### Chart Management Store
```javascript
Alpine.store('chartManager', {
  instances: new Map(),
  
  register(id, instance) {
    this.instances.set(id, instance);
  },
  
  destroy(id) {
    const instance = this.instances.get(id);
    if (instance) {
      instance.destroy();
      this.instances.delete(id);
    }
  }
});
```

## Chart.js Integration Patterns

### Accessible Chart Component
```javascript
function accessibleChart() {
  return {
    chart: null,
    
    init() {
      this.initChart();
      this.setupAccessibility();
    },
    
    initChart() {
      const ctx = this.$refs.canvas.getContext('2d');
      this.chart = new Chart(ctx, {
        // Configuration with accessibility plugins
        plugins: ['chartjs-plugin-a11y-legend']
      });
    },
    
    setupAccessibility() {
      // ARIA labels, descriptions, and keyboard navigation
    }
  }
}
```

## Available Components

### Dashboard Layouts ✅
Complex dashboard organisms combining multiple molecules for comprehensive data visualization interfaces.

**Variants:**
- Executive Dashboard (KPIs and strategic metrics)
- Operational Dashboard (detailed program management)
- Analytical Dashboard (deep analysis tools)

**Features:**
- Multiple layout configurations
- Real-time data integration
- Advanced filtering and search
- Export capabilities
- Responsive design across all devices

[View Dashboard Layouts →](dashboard/index.html)

### Data Table Components ✅
Advanced data table organisms with sophisticated sorting, filtering, pagination, and virtual scrolling capabilities.

**Variants:**
- Program Management Tables (comprehensive program oversight)
- Beneficiary Tracking Tables (individual and demographic data)
- Financial Data Tables (budget and expenditure tracking)

**Features:**
- Multi-column sorting and filtering
- Global search with debounced input
- Row selection and bulk operations
- Virtual scrolling for large datasets
- Dual view modes (table and card view)
- Advanced export capabilities

[View Data Tables →](data-tables/index.html)

## Status Tracking

| Component | Status | Functionality | Accessibility | Performance | Documentation | Tests |
|-----------|--------|---------------|---------------|-------------|---------------|-------|
| Dashboard Layouts | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Data Table Components | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Modal Dialog Systems | 📝 | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ |
| Form Wizards | 📝 | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ |

**Legend**: ✅ Complete | 🔄 In Progress | ⏸️ Not Started | 📝 Planned | ❌ Failed

---

**Phase Status**: 🚧 Phase 4 - In Development  
**Last Updated**: July 2025  
**Completion**: 50% (2 of 4 tasks)