# Alpine.js Foundation Components Guide

## 📋 Overview

The Alpine.js Foundation Components provide a comprehensive architecture for building scalable dashboard components with consistent patterns, state management, and lifecycle handling.

## 🏗️ Architecture Overview

### Core Components

1. **Global Stores** - Centralized state management
2. **Component Factories** - Reusable component patterns
3. **Utility Components** - Common dashboard functionality
4. **Event System** - Component communication

## 🔄 Global State Management

### Dashboard Data Store

The `dashboardData` store manages all global application state:

```javascript
Alpine.store('dashboardData', {
  // Global loading states
  loading: { charts: false, data: false, filters: false },
  
  // Shared data sets
  data: { grants: [], countries: [], programs: [], metrics: {} },
  
  // Global filters
  filters: { dateRange: {}, countries: [], programs: [] },
  
  // Chart instances registry
  charts: { instances: new Map() },
  
  // UI state
  ui: { sidebarOpen: false, theme: 'light' },
  
  // Notifications
  notifications: []
})
```

### Performance Store

Tracks application performance metrics:

```javascript
Alpine.store('performance', {
  metrics: [],
  thresholds: { chartRender: 100, dataLoad: 1000 },
  
  record(type, duration, metadata) {
    // Records performance metrics
  }
})
```

## 🧩 Component Factories

### Base Component

Provides common functionality for all components:

```javascript
window.BotnarComponents.baseComponent({
  id: 'my-component',
  debug: true,
  
  init() {
    // Custom initialization
  },
  
  data: {
    // Component-specific data
  }
})
```

**Features:**
- ✅ Lifecycle management (init/destroy)
- ✅ Error handling with notifications
- ✅ Performance tracking
- ✅ Event system integration
- ✅ Memory cleanup

### Chart Component

Specialized for Chart.js integration:

```javascript
window.BotnarComponents.chartComponent({
  id: 'my-chart',
  chartType: 'bar',
  canvasId: 'myChart',
  
  getChartData() {
    return {
      labels: ['A', 'B', 'C'],
      datasets: [{ data: [1, 2, 3] }]
    };
  }
})
```

**Features:**
- ✅ Automatic chart initialization
- ✅ Global chart registry
- ✅ Filter change handling
- ✅ Export functionality
- ✅ Memory management

### Data Component

For data loading and caching:

```javascript
window.BotnarComponents.dataComponent({
  id: 'data-loader',
  refreshInterval: 30000,
  
  async fetchData() {
    // Implement data fetching
    return await api.getData();
  }
})
```

**Features:**
- ✅ Automatic caching
- ✅ Refresh intervals
- ✅ Loading states
- ✅ Error handling

## 🔧 Utility Components

### Notification System

```javascript
x-data="notificationSystem()"
```

**Methods:**
- `removeNotification(id)` - Remove specific notification
- `clearAll()` - Clear all notifications
- `getNotificationIcon(type)` - Get icon for notification type

### Dashboard Filters

```javascript
x-data="dashboardFilters()"
```

**Methods:**
- `updateFilter(key, value)` - Update specific filter
- `resetFilters()` - Reset all filters
- `getActiveFiltersCount()` - Count active filters

### Performance Monitor

```javascript
x-data="performanceMonitor()"
```

**Features:**
- Real-time performance metrics
- Threshold monitoring
- Chart and memory tracking
- Detailed metrics view

### Data Exporter

```javascript
x-data="dataExporter()"
```

**Supported Formats:**
- CSV
- JSON
- Excel (requires additional library)

### Theme Switcher

```javascript
x-data="themeSwitcher()"
```

**Themes:**
- Light
- Dark
- Auto (system preference)

## 📊 Chart Component Examples

### Grant Distribution Chart

```javascript
window.grantDistributionChart = function(config = {}) {
  return window.BotnarComponents.chartComponent({
    id: 'grant-distribution-chart',
    chartType: 'bar',
    canvasId: config.canvasId || 'grantChart',
    
    async loadGrantData() {
      // Load data and update chart
    },
    
    getChartData() {
      return {
        labels: this.countries,
        datasets: [{
          label: 'Number of Grants',
          data: this.grants,
          backgroundColor: window.BotnarColors?.categorical
        }]
      };
    }
  });
};
```

### Funding Trends Chart

```javascript
window.fundingTrendsChart = function(config = {}) {
  return window.BotnarComponents.chartComponent({
    id: 'funding-trends-chart',
    chartType: 'line',
    
    changePeriod(period) {
      this.timePeriod = period;
      this.loadFundingData();
    },
    
    getTrendAnalysis() {
      // Calculate trend metrics
      return {
        trend: 'increasing',
        percentChange: 15.2
      };
    }
  });
};
```

## 🎯 Best Practices

### Component Creation

1. **Always extend base components** - Use factories for consistency
2. **Handle errors gracefully** - Use built-in error handling
3. **Clean up resources** - Implement proper destroy methods
4. **Use global stores** - For shared state management

### Performance

1. **Monitor metrics** - Use performance store
2. **Implement caching** - For data components
3. **Cleanup charts** - Prevent memory leaks
4. **Lazy load data** - Don't load everything at once

### State Management

1. **Use stores for global state** - Don't pass data between components
2. **Emit events for communication** - Use event system
3. **Keep components focused** - Single responsibility principle

### Error Handling

1. **Use try-catch blocks** - In async operations
2. **Show user-friendly messages** - Via notification system
3. **Log errors for debugging** - Console and store errors

## 🚀 Usage Examples

### Basic Chart Component

```html
<div x-data="grantDistributionChart({ canvasId: 'myChart', debug: true })">
  <div class="flex justify-between mb-4">
    <h3>Grant Distribution</h3>
    <button @click="refreshData()">Refresh</button>
  </div>
  
  <canvas id="myChart"></canvas>
  
  <div x-show="error" class="text-red-600" x-text="error?.message"></div>
</div>
```

### Custom Component

```javascript
window.myCustomComponent = function() {
  return window.BotnarComponents.baseComponent({
    id: 'custom-component',
    
    data: {
      items: [],
      loading: false
    },
    
    async loadItems() {
      try {
        this.setLoading(true);
        this.items = await api.getItems();
      } catch (error) {
        this.handleError('Failed to load items', error);
      } finally {
        this.setLoading(false);
      }
    }
  });
};
```

## 🔍 Debugging

### Enable Debug Mode

```javascript
x-data="myComponent({ debug: true })"
```

### Monitor Performance

```javascript
// Access performance metrics
const metrics = Alpine.store('performance').metrics;

// Check chart instances
const charts = Alpine.store('dashboardData').charts.instances;
```

### Event Monitoring

```javascript
// Listen to component events
window.addEventListener('component:initialized', (event) => {
  console.log('Component initialized:', event.detail);
});

// Listen to chart events
window.addEventListener('chart:created', (event) => {
  console.log('Chart created:', event.detail);
});
```

## 🧪 Testing

### Component Testing

```javascript
// Initialize component for testing
const component = window.myComponent();
component.init();

// Test methods
await component.loadData();
assert(component.data.length > 0);

// Cleanup
component.destroy();
```

### Store Testing

```javascript
// Test store functionality
Alpine.store('dashboardData').addNotification('test', 'Test message');
assert(Alpine.store('dashboardData').notifications.length === 1);
```

## 📝 Migration Guide

### From Basic Alpine.js

1. Replace `x-data="{ ... }"` with component factories
2. Move shared state to global stores
3. Add error handling and performance monitoring
4. Implement proper cleanup methods

### Adding New Components

1. Extend appropriate base component
2. Implement required methods (`getChartData`, `fetchData`, etc.)
3. Add to component registry
4. Create documentation and examples

## 🔗 API Reference

### Base Component Methods

- `init()` - Initialize component
- `destroy()` - Cleanup component
- `handleError(message, error)` - Handle errors
- `setLoading(state)` - Set loading state
- `emit(event, data)` - Emit events
- `listen(event, callback)` - Listen for events

### Chart Component Methods

- `initChart()` - Initialize chart
- `updateChart(data)` - Update chart data
- `exportChart(format)` - Export chart
- `getChartConfig()` - Get chart configuration

### Data Component Methods

- `loadData(force)` - Load data
- `clearCache()` - Clear cache
- `setupRefreshInterval()` - Set refresh interval

This foundation provides a robust, scalable architecture for building complex dashboard components while maintaining consistency and performance.