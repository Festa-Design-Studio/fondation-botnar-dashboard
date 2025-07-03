# Implementation Guidelines - Fondation Botnar Design System

This document provides comprehensive guidelines for implementing components and features within the Fondation Botnar Dashboard Design System.

## Core Principles

### 1. Accessibility First
- Every component must meet WCAG 2.1 AA standards minimum
- Strive for AAA compliance where feasible
- Test with real assistive technologies
- Provide meaningful alternatives for all visual content

### 2. Progressive Enhancement
- Start with semantic HTML
- Layer on CSS for visual design
- Add JavaScript for enhanced functionality
- Ensure core functionality works without JavaScript

### 3. Performance by Default
- Optimize for Core Web Vitals
- Implement lazy loading strategies
- Use efficient data structures
- Monitor and measure performance impact

### 4. Consistency & Reusability
- Follow established patterns and conventions
- Create reusable, composable components
- Maintain consistent naming conventions
- Document all variations and use cases

## Development Standards

### HTML Guidelines

#### Semantic Structure
```html
<!-- Good: Semantic HTML with proper hierarchy -->
<article class="grant-card">
  <header class="grant-card__header">
    <h3 class="grant-card__title">Grant Title</h3>
    <time class="grant-card__date" datetime="2025-01-02">January 2, 2025</time>
  </header>
  <div class="grant-card__content">
    <p class="grant-card__description">Grant description...</p>
  </div>
  <footer class="grant-card__actions">
    <button class="btn btn--primary" type="button">View Details</button>
  </footer>
</article>

<!-- Bad: Non-semantic structure -->
<div class="card">
  <div class="title">Grant Title</div>
  <div class="date">January 2, 2025</div>
  <div class="content">Grant description...</div>
  <div class="button">View Details</div>
</div>
```

#### Accessibility Attributes
```html
<!-- Required ARIA patterns -->
<button 
  class="btn btn--primary"
  type="button"
  aria-describedby="btn-help"
  aria-expanded="false"
  aria-controls="dropdown-menu">
  Filter Options
</button>

<div id="btn-help" class="sr-only">
  Use this button to open filtering options for the data table
</div>

<ul id="dropdown-menu" class="dropdown" aria-hidden="true">
  <li><a href="#" role="menuitem">By Date Range</a></li>
  <li><a href="#" role="menuitem">By Country</a></li>
</ul>
```

### CSS Guidelines

#### Local Tailwind CSS Setup

The project uses a local Tailwind CSS compilation system for optimal performance and customization:

```bash
# Development workflow
npm run dev          # Watch mode with auto-rebuild
npm run build        # Production build (minified)
npm run build:dev    # Development build (unminified)
```

**File Structure:**
- **Source**: `design-system/assets/css/base.css` (input file)
- **Config**: `tailwind.config.js` (Tailwind configuration)
- **Output**: `dist/botnar-design-system.css` (compiled CSS)

**HTML Integration:**
```html
<!-- Local compiled CSS (current approach) -->
<link rel="stylesheet" href="dist/botnar-design-system.css">

<!-- NOT CDN (previous approach - avoid) -->
<!-- <script src="https://cdn.tailwindcss.com"></script> -->
```

#### Utility-First with Custom Components
```css
/* Utility classes for common patterns */
.btn {
  @apply px-4 py-2 rounded-md font-medium transition-colors;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn--primary {
  @apply bg-botnar-pink-500 text-white;
  @apply hover:bg-botnar-pink-600;
  @apply focus:ring-botnar-pink-500;
}

/* Custom component for complex patterns */
.chart-container {
  position: relative;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
}

.chart-container__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-container__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}
```

#### Dark Mode Implementation Patterns

Dark mode is implemented using Tailwind's class-based dark mode system:

**Configuration (tailwind.config.js):**
```javascript
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  // ... rest of config
}
```

**HTML Structure:**
```html
<!-- Light mode (default) -->
<html lang="en">
<body class="bg-gray-50 text-gray-900">

<!-- Dark mode (with 'dark' class) -->
<html lang="en" class="dark">
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

**Component Dark Mode Patterns:**
```html
<!-- Card component with dark mode support -->
<div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
  <h3 class="text-gray-900 dark:text-gray-100 text-lg font-semibold">
    Card Title
  </h3>
  <p class="text-gray-600 dark:text-gray-300 mt-2">
    Card content with proper contrast in both themes
  </p>
  <button class="bg-botnar-pink-500 hover:bg-botnar-pink-600 dark:bg-botnar-pink-600 dark:hover:bg-botnar-pink-700 text-white px-4 py-2 rounded-md">
    Action Button
  </button>
</div>
```

**JavaScript Theme Switching:**
```javascript
// Theme management in Alpine.js components
function themeManager() {
  return {
    theme: 'light',
    
    init() {
      // Initialize from localStorage
      this.theme = localStorage.getItem('botnar-theme') || 'light';
      this.applyTheme();
    },
    
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      this.applyTheme();
      localStorage.setItem('botnar-theme', this.theme);
    },
    
    applyTheme() {
      if (this.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}
```

**Dark Mode Color Guidelines:**
- Use `dark:` prefixes for all color utilities
- Ensure sufficient contrast ratios in both themes
- Test with real users in different lighting conditions
- Prefer semantic color tokens over hard-coded values

#### Responsive Design Patterns
```css
/* Mobile-first responsive design */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}

@media (min-width: 768px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

@media (min-width: 1280px) {
  .dashboard-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### JavaScript Guidelines

#### Alpine.js Component Pattern
```javascript
// Standard component structure
function dataCard() {
  return {
    // Data properties
    data: null,
    loading: false,
    error: null,
    
    // Computed properties
    get formattedValue() {
      return this.data ? this.formatNumber(this.data.value) : '—';
    },
    
    get trendDirection() {
      return this.data?.change >= 0 ? 'up' : 'down';
    },
    
    // Lifecycle methods
    init() {
      this.loadData();
      this.setupEventListeners();
    },
    
    destroy() {
      this.cleanup();
    },
    
    // Methods
    async loadData() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch(this.apiEndpoint);
        if (!response.ok) throw new Error('Failed to load data');
        this.data = await response.json();
      } catch (error) {
        this.error = error.message;
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },
    
    handleError(error) {
      console.error('Data card error:', error);
      this.$dispatch('data-error', { error, component: 'data-card' });
    },
    
    formatNumber(value) {
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1
      }).format(value);
    }
  }
}
```

#### Store Management Pattern
```javascript
// Global store for shared state
Alpine.store('dashboard', {
  // State
  data: {
    grants: [],
    countries: [],
    programs: []
  },
  
  loading: {
    grants: false,
    countries: false,
    programs: false
  },
  
  filters: {
    dateRange: null,
    countries: [],
    programs: [],
    searchTerm: ''
  },
  
  // Computed properties
  get filteredGrants() {
    let grants = this.data.grants;
    
    if (this.filters.searchTerm) {
      grants = grants.filter(grant => 
        grant.title.toLowerCase().includes(this.filters.searchTerm.toLowerCase())
      );
    }
    
    if (this.filters.countries.length > 0) {
      grants = grants.filter(grant => 
        this.filters.countries.includes(grant.country)
      );
    }
    
    return grants;
  },
  
  // Actions
  async loadGrants() {
    this.loading.grants = true;
    try {
      const response = await fetch('/api/grants');
      this.data.grants = await response.json();
    } catch (error) {
      console.error('Failed to load grants:', error);
    } finally {
      this.loading.grants = false;
    }
  },
  
  setFilter(key, value) {
    this.filters[key] = value;
    this.notifyFilterChange();
  },
  
  clearFilters() {
    this.filters = {
      dateRange: null,
      countries: [],
      programs: [],
      searchTerm: ''
    };
    this.notifyFilterChange();
  },
  
  notifyFilterChange() {
    Alpine.store('notifications').add({
      type: 'info',
      message: `Showing ${this.filteredGrants.length} grants`
    });
  }
});
```

#### Chart.js Integration Pattern
```javascript
function chartComponent() {
  return {
    chart: null,
    data: null,
    
    init() {
      this.setupChart();
      this.loadData();
      
      // Cleanup on destroy
      this.$cleanup(() => {
        if (this.chart) {
          this.chart.destroy();
        }
      });
    },
    
    setupChart() {
      const ctx = this.$refs.canvas.getContext('2d');
      
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: 'Grant Distribution',
            data: [],
            backgroundColor: '#e91e63',
            borderColor: '#d81b60',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.parsed.y} grants`;
                }
              }
            },
            // Accessibility plugin
            a11y: {
              enabled: true
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Countries'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Number of Grants'
              },
              beginAtZero: true
            }
          },
          // Accessibility features
          onHover: (event, activeElements) => {
            this.updateScreenReaderInfo(activeElements);
          }
        }
      });
    },
    
    async loadData() {
      try {
        const response = await fetch('/api/chart-data');
        const data = await response.json();
        this.updateChart(data);
      } catch (error) {
        console.error('Failed to load chart data:', error);
      }
    },
    
    updateChart(data) {
      this.chart.data.labels = data.labels;
      this.chart.data.datasets[0].data = data.values;
      this.chart.update();
      
      // Update accessibility info
      this.updateChartAccessibility(data);
    },
    
    updateChartAccessibility(data) {
      const summary = `Chart showing ${data.labels.length} countries with grant distribution`;
      this.$refs.chartSummary.textContent = summary;
      
      // Update table for screen readers
      this.updateDataTable(data);
    }
  }
}
```

## Error Handling

### User-Friendly Error Messages
```javascript
class ErrorHandler {
  static getErrorMessage(error, context = '') {
    const errorMap = {
      'NetworkError': 'Unable to connect to the server. Please check your internet connection.',
      'ValidationError': 'The data provided is invalid. Please check your input.',
      'AuthenticationError': 'Your session has expired. Please log in again.',
      'PermissionError': 'You don\'t have permission to perform this action.',
      'NotFoundError': 'The requested data could not be found.',
      'ServerError': 'A server error occurred. Please try again later.'
    };
    
    return errorMap[error.name] || 'An unexpected error occurred. Please try again.';
  }
  
  static handleError(error, context = '') {
    const message = this.getErrorMessage(error, context);
    
    // Log error for debugging
    console.error(`Error in ${context}:`, error);
    
    // Show user notification
    Alpine.store('notifications').add({
      type: 'error',
      message: message,
      duration: 5000
    });
    
    // Track error for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: error.message,
        fatal: false
      });
    }
  }
}
```

## Testing Requirements

### Accessibility Testing
```javascript
// Automated accessibility testing
describe('Component Accessibility', () => {
  it('should have proper ARIA labels', () => {
    const button = document.querySelector('.btn');
    expect(button.getAttribute('aria-label')).toBeTruthy();
  });
  
  it('should be keyboard navigable', () => {
    const button = document.querySelector('.btn');
    button.focus();
    expect(document.activeElement).toBe(button);
  });
  
  it('should have sufficient color contrast', async () => {
    const result = await axe.run('.component');
    expect(result.violations).toHaveLength(0);
  });
});
```

### Performance Testing
```javascript
// Performance monitoring
function measurePerformance(componentName) {
  return {
    start() {
      performance.mark(`${componentName}-start`);
    },
    
    end() {
      performance.mark(`${componentName}-end`);
      performance.measure(
        `${componentName}-duration`,
        `${componentName}-start`,
        `${componentName}-end`
      );
      
      const measure = performance.getEntriesByName(`${componentName}-duration`)[0];
      if (measure.duration > 100) {
        console.warn(`${componentName} took ${measure.duration}ms to render`);
      }
    }
  }
}
```

## CSS Build Troubleshooting

### Common Issues and Solutions

#### CSS Not Updating
**Problem**: Changes to `base.css` or `tailwind.config.js` not reflected in browser
**Solution**:
```bash
# Stop any running processes and rebuild
npm run build
# Or restart watch mode
npm run dev
```

#### Missing Dark Mode Classes
**Problem**: Dark mode utilities not working
**Solution**:
1. Verify `darkMode: 'class'` in `tailwind.config.js`
2. Ensure `dark:` prefixes are used in HTML
3. Rebuild CSS: `npm run build`

#### Build Errors
**Problem**: Tailwind compilation fails
**Solutions**:
- Check `tailwind.config.js` for syntax errors
- Verify input file exists: `design-system/assets/css/base.css`
- Update dependencies: `npm install`
- Clear npm cache: `npm cache clean --force`

#### Custom Colors Not Working
**Problem**: Botnar brand colors not available
**Solution**:
1. Check `tailwind.config.js` extends section
2. Verify color definitions in config
3. Use proper class names: `bg-botnar-pink-500`, `text-botnar-blue-600`

#### Performance Issues
**Problem**: Large CSS file size
**Solutions**:
- Use production build: `npm run build` (minified)
- Review `content` paths in `tailwind.config.js`
- Remove unused CSS with proper purging configuration

### Development Best Practices

1. **Always use local compilation** - avoid CDN for production
2. **Test in both themes** - light and dark mode
3. **Use semantic color tokens** - prefer design system colors
4. **Watch mode for development** - `npm run dev` for auto-rebuild
5. **Production builds** - `npm run build` before deployment

## Documentation Requirements

Every component must include:

1. **README.md** with usage examples
2. **Accessibility notes** including ARIA patterns
3. **Browser support** information
4. **Performance considerations**
5. **API documentation** for props and events
6. **Visual examples** in multiple states
7. **Testing instructions**

---

**Last Updated**: January 2025  
**Version**: 0.1.0