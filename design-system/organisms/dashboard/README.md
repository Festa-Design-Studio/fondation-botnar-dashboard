# Dashboard Layouts - Organisms

Complex dashboard layout organisms that combine multiple molecules (charts, cards, navigation, filters) into comprehensive data visualization interfaces for strategic decision-making.

## Overview

Dashboard layouts represent the most complex components in our atomic design system, integrating multiple molecular components into cohesive, functional interfaces. These organisms provide complete dashboard experiences tailored to different user roles and use cases within the Fondation Botnar ecosystem.

## Component Structure

```
dashboard/
├── index.html          # Complete dashboard showcase with all variants
├── README.md           # This documentation file
└── dashboard-utilities.css # Specialized CSS for dashboard layouts
```

## Layout Variants

### 1. Executive Dashboard
**Purpose**: High-level overview for senior leadership and stakeholders
**Key Features**:
- Prominent KPI displays with trend indicators
- Strategic-level charts and visualizations
- Minimal interaction complexity
- Focus on outcomes and impact metrics
- Export capabilities for reporting

**Use Cases**:
- Board meetings and executive presentations
- Strategic planning sessions
- Public reporting and stakeholder communications
- High-level performance monitoring

### 2. Operational Dashboard
**Purpose**: Detailed program management for operational teams
**Key Features**:
- Advanced filtering and search capabilities
- Detailed data tables with sorting and pagination
- Real-time status updates and notifications
- Action-oriented interface elements
- Drill-down capabilities for detailed analysis

**Use Cases**:
- Daily program management
- Resource allocation decisions
- Operational performance monitoring
- Team coordination and task management

### 3. Analytical Dashboard
**Purpose**: Deep analysis tools for researchers and data analysts
**Key Features**:
- Complex data visualizations and statistical analysis
- Comparative analysis tools and frameworks
- Advanced filtering and data manipulation
- Export capabilities for research outputs
- Interactive exploration features

**Use Cases**:
- Research and evaluation projects
- Impact assessment studies
- Policy development support
- Academic collaborations and publications

## Technical Implementation

### State Management
Dashboard organisms require sophisticated state management to coordinate between multiple molecular components:

```javascript
// Dashboard state structure
{
  selectedLayout: 'executive',
  dateRange: '30d',
  filters: {
    region: '',
    program: '',
    status: ''
  },
  charts: {},
  kpiData: [...],
  programData: [...],
  analysisInsights: [...],
  recommendations: [...]
}
```

### Component Integration
Dashboard layouts integrate these molecular components:
- **Chart Components**: Data visualization with Chart.js
- **Card Components**: KPI displays and metric cards  
- **Filter Components**: Advanced filtering interfaces
- **Navigation Components**: Dashboard navigation and breadcrumbs
- **Form Elements**: Input controls and selectors

### Performance Considerations

1. **Lazy Loading**: Charts below the fold are loaded on demand
2. **Data Virtualization**: Large tables use virtual scrolling
3. **Debounced Filtering**: Real-time search with performance optimization
4. **Chart Destruction**: Proper cleanup when switching layouts
5. **State Persistence**: Layout preferences saved to localStorage

## Accessibility Features

### WCAG 2.1 AA Compliance
- **Semantic Structure**: Proper HTML5 landmarks and headings
- **Keyboard Navigation**: Full keyboard accessibility between components
- **Screen Reader Support**: ARIA labels and live regions for dynamic updates
- **Focus Management**: Logical tab order and visible focus indicators
- **Color Contrast**: High contrast ratios maintained across all themes

### Assistive Technology Support
- **Screen Reader Announcements**: Dynamic content changes announced
- **Alternative Text**: Comprehensive alt text for all visual elements
- **Data Table Accessibility**: Proper headers and scope attributes
- **Chart Accessibility**: Chart.js accessibility plugin integration

## Responsive Design

### Breakpoint Strategy
```css
/* Mobile First Approach */
.dashboard-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
```

### Component Adaptations
- **Mobile**: Single column layout with collapsible sections
- **Tablet**: Two-column grid with optimized touch targets
- **Desktop**: Full grid layout with hover interactions

## Data Integration

### Data Structure Requirements
```javascript
// KPI Data Format
{
  id: 1,
  label: 'Total Beneficiaries',
  value: '2.4M',
  change: '+12%',
  trend: 'up|down|stable',
  color: 'bg-botnar-pink-100',
  icon: '<svg>...</svg>'
}

// Program Data Format
{
  id: 1,
  name: 'Child Health Initiative',
  type: 'Health',
  region: 'Africa',
  budget: '€12.5M',
  progress: 85,
  status: 'active|completed|planned'
}
```

### API Integration Guidelines
1. **Real-time Updates**: WebSocket or polling for live data
2. **Error Handling**: Graceful degradation when data unavailable
3. **Caching Strategy**: Appropriate caching for performance
4. **Data Validation**: Client-side validation before display

## Security Considerations

### Data Privacy
- No sensitive data logged to console
- Secure data transmission (HTTPS)
- User permission checks for data access
- Audit trails for data modifications

### XSS Prevention
- Sanitized HTML content using x-html safely
- Validated user inputs in filters
- CSP headers for additional protection

## Testing Strategy

### Unit Testing
- Component state management
- Data transformation functions
- Chart initialization and updates
- Filter logic validation

### Integration Testing
- Inter-component communication
- Data flow between molecules
- State synchronization
- Performance benchmarks

### Accessibility Testing
- Screen reader navigation
- Keyboard-only interaction
- Color contrast validation
- WCAG 2.1 AA compliance verification

## Usage Examples

### Basic Implementation
```html
<div x-data="dashboardLayoutsDemo()">
  <!-- Layout Selector -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <template x-for="layout in layouts">
      <button @click="selectedLayout = layout.id; initializeCharts()">
        <span x-text="layout.name"></span>
      </button>
    </template>
  </div>
  
  <!-- Dashboard Content -->
  <div x-show="selectedLayout === 'executive'">
    <!-- Executive dashboard content -->
  </div>
</div>
```

### Custom Configuration
```javascript
// Extend the base dashboard component
function customDashboard() {
  return {
    ...dashboardLayoutsDemo(),
    
    // Custom KPI data
    customKpis: [...],
    
    // Custom chart configurations
    createCustomCharts() {
      // Implementation
    },
    
    // Custom filtering logic
    applyCustomFilters() {
      // Implementation
    }
  }
}
```

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## Dependencies

- **Alpine.js**: 3.x (reactive framework)
- **Chart.js**: 3.9.1 (data visualization)
- **Tailwind CSS**: 3.x (utility classes)
- **Inter Font**: Variable font for typography

## Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: 90+
- **Accessibility**: 100
- **Best Practices**: 95+
- **SEO**: 90+

### Load Time Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## Troubleshooting

### Common Issues

1. **Charts Not Rendering**
   - Verify Chart.js is loaded
   - Check canvas element exists in DOM
   - Ensure proper timing with Alpine.js lifecycle

2. **Performance Issues**
   - Implement chart lazy loading
   - Use data virtualization for large tables
   - Optimize filter debouncing

3. **Accessibility Issues**
   - Verify ARIA labels are present
   - Test keyboard navigation flow
   - Check screen reader announcements

### Debug Mode
Enable debug mode by adding `?debug=true` to URL:
```javascript
// Debug utilities
if (new URLSearchParams(window.location.search).get('debug')) {
  console.log('Dashboard Debug Mode Enabled');
  // Additional debugging output
}
```

## Contributing

When extending dashboard layouts:

1. **Follow Design Patterns**: Use established molecular components
2. **Maintain Accessibility**: Test with screen readers and keyboard navigation
3. **Performance First**: Implement lazy loading and optimization
4. **Document Changes**: Update README and inline code comments
5. **Test Thoroughly**: Verify across browsers and devices

## Related Components

- **Molecules**: Chart Components, Card Components, Filter Components
- **Atoms**: Button Components, Form Elements, Typography
- **Templates**: Dashboard Templates (coming in Phase 5)

---

**Component Status**: ✅ Production Ready  
**Last Updated**: July 2025  
**Version**: 1.0.0  
**Complexity**: 🔴 HIGH (6-8 days implementation)