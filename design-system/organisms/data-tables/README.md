# Data Table Components - Organisms

Advanced data table organisms with sophisticated sorting, filtering, pagination, and virtual scrolling capabilities designed for complex data management in the Fondation Botnar dashboard ecosystem.

## Overview

Data table components represent sophisticated organisms that combine multiple molecular and atomic components to create comprehensive data management interfaces. These tables are designed to handle large datasets efficiently while maintaining full accessibility and providing rich interaction patterns.

## Component Structure

```
data-tables/
├── index.html              # Complete data table showcase
├── README.md               # This documentation file
└── data-table-utilities.css # Specialized CSS for table components
```

## Table Variants

### 1. Program Management Table
**Purpose**: Comprehensive view of all Fondation Botnar programs and initiatives
**Key Features**:
- Multi-column sorting and filtering
- Progress tracking with visual indicators
- Status management and bulk operations
- Regional and type-based filtering
- Export capabilities for reporting

**Use Cases**:
- Program oversight and management
- Resource allocation planning
- Progress monitoring and reporting
- Strategic decision making

### 2. Beneficiary Tracking Table
**Purpose**: Detailed tracking of program beneficiaries and impact metrics
**Key Features**:
- Individual beneficiary records
- Impact measurement tracking
- Demographic filtering and analysis
- Outcome monitoring
- Data privacy compliance features

**Use Cases**:
- Impact assessment and evaluation
- Beneficiary outreach planning
- Demographic analysis
- Compliance reporting

### 3. Financial Data Table
**Purpose**: Budget allocation, expenditure, and financial performance tracking
**Key Features**:
- Financial data visualization
- Budget vs. actual comparisons
- Currency handling and formatting
- Financial reporting capabilities
- Audit trail maintenance

**Use Cases**:
- Financial planning and analysis
- Budget monitoring and control
- Financial reporting and compliance
- Cost-effectiveness analysis

## Core Features

### Advanced Data Management
- **Global Search**: Full-text search across all visible columns
- **Column-Specific Filtering**: Dedicated filters for status, region, type, and custom fields
- **Multi-Column Sorting**: Sort by multiple columns with clear direction indicators
- **Real-time Filtering**: Debounced input for performance optimization
- **Data Export**: CSV export for filtered or selected data

### User Interface Features
- **Dual View Modes**: Table view and card view for different user preferences
- **Column Visibility Control**: Show/hide columns based on user needs
- **Row Selection**: Single and multi-row selection with bulk operations
- **Responsive Design**: Optimized layouts for desktop, tablet, and mobile
- **Dark Mode Support**: Full theme compatibility

### Performance Optimizations
- **Virtual Scrolling**: Efficient rendering for large datasets (1000+ rows)
- **Pagination**: Configurable page sizes (10, 25, 50, 100 rows)
- **Debounced Search**: Prevents excessive filtering operations
- **Lazy Loading**: Progressive data loading for massive datasets
- **Memory Management**: Efficient DOM manipulation and cleanup

### Accessibility Features
- **WCAG 2.1 AA Compliance**: Full accessibility standard compliance
- **Screen Reader Support**: Comprehensive ARIA labels and descriptions
- **Keyboard Navigation**: Full keyboard accessibility for all features
- **Focus Management**: Logical tab order and visible focus indicators
- **Semantic HTML**: Proper table structure with headers and scope attributes

## Technical Implementation

### Data Structure Requirements
```javascript
// Expected data format
{
  id: 1,                    // Unique identifier (required)
  name: 'Program Name',     // Display name
  status: 'active',         // Status value for filtering
  region: 'Africa',         // Geographic region
  type: 'Health',          // Program type
  budget: '€12.5M',        // Formatted budget string
  progress: 85,            // Numeric progress (0-100)
  startDate: '2023-01-15', // Date string
  endDate: '2024-12-31',   // Date string
  manager: 'Sarah Johnson' // Assigned manager
}
```

### Column Configuration
```javascript
// Column definition structure
{
  key: 'name',           // Data property key
  label: 'Program Name', // Display label
  visible: true,         // Visibility state
  sortable: true,        // Sorting capability
  type: 'string'         // Data type for sorting
}
```

### State Management
The data table uses Alpine.js reactive data patterns:

```javascript
{
  // Data management
  allData: [],         // Complete dataset
  filteredData: [],    // Filtered results
  paginatedData: [],   // Current page data
  
  // Interaction state
  selectedRows: [],    // Selected row IDs
  selectAll: false,    // Select all state
  
  // Table configuration
  sortColumn: 'name',  // Current sort column
  sortDirection: 'asc',// Sort direction
  pageSize: 25,        // Rows per page
  currentPage: 1,      // Current page number
  
  // UI state
  viewMode: 'table',   // Display mode
  searchQuery: '',     // Search input
  filters: {}          // Active filters
}
```

### Performance Considerations

#### Large Dataset Handling
1. **Virtual Scrolling**: Render only visible rows for datasets > 1000 items
2. **Server-Side Pagination**: For datasets > 10,000 items, implement server-side processing
3. **Progressive Loading**: Load data in chunks to improve initial render time
4. **Memory Management**: Cleanup DOM elements and event listeners properly

#### Search and Filter Optimization
1. **Debounced Input**: 300ms delay on search input to prevent excessive operations
2. **Index Building**: Build search indices for frequently searched columns
3. **Caching**: Cache filter results to improve performance
4. **Background Processing**: Use Web Workers for intensive filtering operations

## Accessibility Implementation

### ARIA Patterns
```html
<!-- Table with proper ARIA roles -->
<table role="table" aria-label="Program management data">
  <thead>
    <tr role="row">
      <th role="columnheader" aria-sort="ascending">
        Program Name
      </th>
    </tr>
  </thead>
  <tbody role="rowgroup">
    <tr role="row">
      <td role="gridcell">Program Data</td>
    </tr>
  </tbody>
</table>

<!-- Screen reader announcements -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
  Search results updated: 25 items found
</div>
```

### Keyboard Navigation
- **Tab**: Navigate between interactive elements
- **Space**: Toggle row selection checkboxes
- **Enter**: Activate buttons and links
- **Arrow Keys**: Navigate within table cells (future enhancement)
- **Escape**: Clear selection or close modals

### Screen Reader Support
- Dynamic announcements for search results
- Clear labeling of sort directions
- Progress bar descriptions
- Status change notifications
- Bulk action confirmations

## Integration Patterns

### API Integration
```javascript
// Example API integration pattern
async function loadTableData() {
  this.loading = true;
  try {
    const response = await fetch('/api/programs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Failed to load data');
    
    const data = await response.json();
    this.allData = data.programs;
    this.applyFilters();
  } catch (error) {
    this.handleError(error);
  } finally {
    this.loading = false;
  }
}
```

### Real-time Updates
```javascript
// WebSocket integration for live updates
function initializeRealTimeUpdates() {
  const ws = new WebSocket('wss://api.botnar.org/updates');
  
  ws.onmessage = (event) => {
    const update = JSON.parse(event.data);
    
    if (update.type === 'program_update') {
      this.updateProgram(update.data);
      this.announce('Program data updated');
    }
  };
}
```

## Security Considerations

### Data Privacy
- Client-side filtering only for public data
- Secure API endpoints for sensitive information
- Row-level security implementation
- Audit logging for data access

### XSS Prevention
- Sanitized HTML content in cells
- Validated search inputs
- Escaped special characters
- CSP headers for additional protection

## Testing Strategy

### Unit Testing
```javascript
// Example test cases
describe('Data Table Component', () => {
  test('should filter data correctly', () => {
    const component = new DataTable();
    component.allData = mockData;
    component.searchQuery = 'health';
    component.applyFilters();
    
    expect(component.filteredData).toHaveLength(5);
  });
  
  test('should handle sorting', () => {
    const component = new DataTable();
    component.sortBy('name');
    
    expect(component.sortColumn).toBe('name');
    expect(component.sortDirection).toBe('asc');
  });
});
```

### Integration Testing
- API data loading and error handling
- Real-time update processing
- Export functionality validation
- Cross-browser compatibility

### Accessibility Testing
- Screen reader navigation
- Keyboard-only interaction
- Color contrast validation
- ARIA attribute verification

## Usage Examples

### Basic Implementation
```html
<div x-data="dataTablesDemo()">
  <!-- Search and filters -->
  <div class="table-controls">
    <input x-model="searchQuery" 
           @input.debounce.300ms="applyFilters()"
           placeholder="Search all data...">
  </div>
  
  <!-- Data table -->
  <table class="data-table">
    <thead>
      <tr>
        <template x-for="column in visibleColumns">
          <th @click="sortBy(column.key)">
            <span x-text="column.label"></span>
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <template x-for="item in paginatedData">
        <tr>
          <template x-for="column in visibleColumns">
            <td x-text="item[column.key]"></td>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</div>
```

### Custom Configuration
```javascript
// Extended table with custom features
function customDataTable() {
  return {
    ...dataTablesDemo(),
    
    // Custom column definitions
    columns: [
      { key: 'name', label: 'Program Name', visible: true, sortable: true, type: 'string' },
      { key: 'impact', label: 'Impact Score', visible: true, sortable: true, type: 'number', formatter: 'percentage' }
    ],
    
    // Custom filters
    customFilters: {
      dateRange: { start: null, end: null },
      impactThreshold: 0.8
    },
    
    // Custom export formats
    exportFormats: ['csv', 'xlsx', 'pdf'],
    
    // Advanced filtering
    applyAdvancedFilters() {
      // Custom filtering logic
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
- **Tailwind CSS**: 3.x (utility classes)
- **Inter Font**: Variable font for typography

## Performance Metrics

### Target Performance
- **Initial Render**: < 100ms for 1000 rows
- **Search Response**: < 50ms for filtered results
- **Sort Operation**: < 100ms for any column
- **Memory Usage**: < 50MB for 10,000 rows

### Optimization Techniques
- Virtual scrolling for large datasets
- Debounced search input (300ms)
- Efficient DOM manipulation
- Memory leak prevention
- Progressive data loading

## Troubleshooting

### Common Issues

1. **Performance Degradation**
   - Enable virtual scrolling for large datasets
   - Implement server-side pagination
   - Optimize filter functions
   - Use Web Workers for heavy processing

2. **Accessibility Issues**
   - Verify ARIA labels are present
   - Test keyboard navigation flow
   - Check screen reader announcements
   - Validate focus management

3. **Data Display Issues**
   - Verify data structure matches column definitions
   - Check data type handling in sort functions
   - Validate filter logic
   - Ensure proper error handling

### Debug Mode
Enable debug logging with URL parameter:
```javascript
// Add ?debug=table to URL for debug output
if (new URLSearchParams(window.location.search).get('debug') === 'table') {
  console.log('Data Table Debug Mode Enabled');
  // Additional debugging output
}
```

## Contributing

When extending data table components:

1. **Follow Patterns**: Use established Alpine.js patterns
2. **Maintain Accessibility**: Test with assistive technologies
3. **Performance First**: Optimize for large datasets
4. **Document Changes**: Update README and code comments
5. **Test Thoroughly**: Verify across browsers and devices

## Related Components

- **Molecules**: Filter Components, Card Components, Navigation Components
- **Atoms**: Button Components, Form Elements, Typography
- **Organisms**: Dashboard Layouts (data integration)

---

**Component Status**: ✅ Production Ready  
**Last Updated**: July 2025  
**Version**: 1.0.0  
**Complexity**: 🔴 HIGH (6-7 days implementation)