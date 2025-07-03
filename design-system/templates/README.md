# Templates - Fondation Botnar Design System

Templates are page-level layouts that combine organisms, molecules, and atoms to create complete dashboard structures. These define the overall content organization and layout patterns.

## Overview

Templates include:
- **Portfolio Overview**: High-level grant portfolio visualization
- **Grant Performance**: Individual grant tracking and metrics
- **Evaluation Dashboard**: Impact assessment and measurement
- **Financial Dashboard**: Budget allocation and financial reporting
- **Geographic Dashboard**: Location-based data visualization
- **Program Dashboard**: Program-specific performance metrics
- **Comparison Dashboard**: Side-by-side analysis views

## Naming Convention

Template components should follow this structure:
```
templates/
├── portfolio-overview/
│   ├── portfolio-overview-template.html
│   ├── portfolio-layout.css
│   └── README.md
├── grant-performance/
│   ├── grant-performance-template.html
│   ├── grant-layout.css
│   └── README.md
└── ...
```

## Implementation Guidelines

### Layout Architecture
- CSS Grid for main layout structure
- Flexbox for component arrangement
- Responsive breakpoints for all screen sizes
- Print-friendly layouts where applicable

### Content Strategy
- Placeholder content for all data points
- Realistic sample data for demonstrations
- Progressive disclosure patterns
- Contextual help and guidance

### Navigation Patterns
- Consistent header and navigation placement
- Breadcrumb trails for deep navigation
- Action buttons and CTAs positioning
- Search and filter placement

### Performance Architecture
- Lazy loading for below-fold content
- Progressive enhancement patterns
- Skeleton loading states
- Error boundary implementation

### Accessibility Patterns
- Landmark regions and skip links
- Focus management strategies
- Screen reader navigation
- Keyboard shortcut systems

## Documentation Requirements

Each template must include:
1. **Layout Documentation**: Grid and flexbox patterns
2. **Content Guidelines**: Data requirements and structure
3. **Responsive Behavior**: Breakpoint specifications
4. **Navigation Patterns**: User flow and interaction design
5. **Performance Notes**: Loading strategies and optimization
6. **Accessibility Map**: Landmark structure and navigation
7. **Customization Guide**: Theming and configuration options

## Testing Checklist

- [ ] Layout integrity across all breakpoints
- [ ] Content overflow and truncation handling
- [ ] Navigation flow and user experience
- [ ] Performance metrics and loading times
- [ ] Accessibility compliance (WCAG AAA)
- [ ] Cross-browser compatibility
- [ ] Print stylesheet functionality
- [ ] Error state handling
- [ ] Data loading scenarios
- [ ] User interaction patterns

## Layout Patterns

### Dashboard Grid System
```css
.dashboard-layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 280px 1fr 320px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

@media (max-width: 1024px) {
  .dashboard-layout {
    grid-template-areas: 
      "header"
      "main"
      "footer";
    grid-template-columns: 1fr;
  }
}
```

### Responsive Chart Containers
```css
.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .chart-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
```

## Data Integration Patterns

### Template Data Structure
```javascript
const templateData = {
  metadata: {
    title: 'Portfolio Overview',
    lastUpdated: '2025-01-02',
    dataSource: 'grants-api'
  },
  sections: {
    header: { /* header data */ },
    kpis: { /* KPI metrics */ },
    charts: { /* chart configurations */ },
    tables: { /* table data */ }
  },
  user: {
    permissions: ['read', 'export'],
    preferences: { theme: 'light' }
  }
};
```

### State Management Integration
```javascript
function dashboardTemplate() {
  return {
    loading: true,
    error: null,
    data: null,
    
    async init() {
      await this.loadTemplateData();
      this.setupEventListeners();
    },
    
    async loadTemplateData() {
      // Template-specific data loading
    }
  }
}
```

## Status Tracking

| Template | Layout | Content | Navigation | Performance | Accessibility | Documentation | Tests |
|----------|--------|---------|------------|-------------|---------------|---------------|-------|
| Portfolio Overview | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ |
| Grant Performance | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ |
| Evaluation Dashboard | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ |
| Financial Dashboard | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ |
| Geographic Dashboard | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ | ⏸️ |

**Legend**: ✅ Complete | 🔄 In Progress | ⏸️ Not Started | ❌ Failed

---

**Last Updated**: January 2025  
**Next Review**: Phase 5 Development