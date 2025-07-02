/**
 * Fondation Botnar Dashboard - Utility Components
 * 
 * Common utility components for dashboard functionality
 */

/**
 * Notification System Component
 */
window.notificationSystem = function() {
  return window.BotnarComponents.baseComponent({
    id: 'notification-system',
    debug: false,
    
    data: {
      notifications: []
    },
    
    init() {
      // Sync with global store
      this.notifications = Alpine.store('dashboardData').notifications;
      
      // Listen for new notifications
      this.listen('dashboard:data:updated', (event) => {
        if (event.detail.key === 'notifications') {
          this.notifications = event.detail.value;
        }
      });
    },
    
    removeNotification(id) {
      Alpine.store('dashboardData').removeNotification(id);
    },
    
    clearAll() {
      Alpine.store('dashboardData').clearNotifications();
    },
    
    getNotificationIcon(type) {
      const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
      };
      return icons[type] || 'ℹ️';
    },
    
    getNotificationClass(type) {
      const classes = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800'
      };
      return classes[type] || classes.info;
    }
  });
};

/**
 * Dashboard Filters Component
 */
window.dashboardFilters = function() {
  return window.BotnarComponents.baseComponent({
    id: 'dashboard-filters',
    debug: false,
    
    data: {
      filters: {},
      countries: ['All Countries', 'Romania', 'Ghana', 'Colombia', 'Indonesia', 'Tanzania', 'Kenya'],
      programs: ['All Programs', 'Health', 'Education', 'Research', 'Infrastructure', 'Capacity Building'],
      grantStatuses: ['All Statuses', 'Active', 'Pending', 'Completed', 'On Hold'],
      dateRangePresets: [
        { label: 'Last 6 months', value: '6m' },
        { label: 'Last year', value: '1y' },
        { label: 'Last 2 years', value: '2y' },
        { label: 'All time', value: 'all' }
      ]
    },
    
    init() {
      // Sync with global store
      this.filters = Alpine.store('dashboardData').filters;
    },
    
    updateFilter(key, value) {
      this.filters[key] = value;
      Alpine.store('dashboardData').updateFilter(key, value);
      
      this.emit('filters:applied', {
        key: key,
        value: value,
        allFilters: this.filters
      });
    },
    
    updateDateRange(period) {
      this.updateFilter('dateRange', {
        ...this.filters.dateRange,
        period: period
      });
    },
    
    resetFilters() {
      Alpine.store('dashboardData').resetFilters();
      this.filters = Alpine.store('dashboardData').filters;
      
      this.emit('filters:reset', {});
    },
    
    getActiveFiltersCount() {
      let count = 0;
      
      if (this.filters.countries && this.filters.countries.length > 0) count++;
      if (this.filters.programs && this.filters.programs.length > 0) count++;
      if (this.filters.grantStatus && this.filters.grantStatus !== 'all') count++;
      if (this.filters.dateRange && this.filters.dateRange.period !== '1y') count++;
      
      return count;
    },
    
    exportFilters() {
      return JSON.stringify(this.filters, null, 2);
    },
    
    importFilters(filtersJson) {
      try {
        const filters = JSON.parse(filtersJson);
        Object.keys(filters).forEach(key => {
          this.updateFilter(key, filters[key]);
        });
        
        Alpine.store('dashboardData').addNotification(
          'success',
          'Filters imported successfully',
          3000
        );
        
      } catch (error) {
        Alpine.store('dashboardData').addNotification(
          'error',
          'Failed to import filters: Invalid format',
          5000
        );
      }
    }
  });
};

/**
 * Performance Monitor Component
 */
window.performanceMonitor = function() {
  return window.BotnarComponents.baseComponent({
    id: 'performance-monitor',
    debug: false,
    
    data: {
      metrics: [],
      averages: {},
      memoryUsage: 0,
      chartCount: 0,
      showDetails: false
    },
    
    init() {
      this.updateMetrics();
      
      // Update metrics every 5 seconds
      this.metricsInterval = setInterval(() => {
        this.updateMetrics();
      }, 5000);
      
      // Listen for performance events
      this.listen('chart:created', () => this.updateMetrics());
      this.listen('chart:updated', () => this.updateMetrics());
      this.listen('component:initialized', () => this.updateMetrics());
    },
    
    destroy() {
      if (this.metricsInterval) {
        clearInterval(this.metricsInterval);
      }
    },
    
    updateMetrics() {
      const perfStore = Alpine.store('performance');
      const dashStore = Alpine.store('dashboardData');
      
      this.metrics = perfStore.metrics.slice(-10); // Last 10 metrics
      
      // Calculate averages
      this.averages = {
        chartRender: perfStore.getAverageByType('chartRender'),
        dataLoad: perfStore.getAverageByType('dataLoad'),
        componentInit: perfStore.getAverageByType('componentInit')
      };
      
      // Get memory usage
      if (performance.memory) {
        this.memoryUsage = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1);
      }
      
      // Get chart count
      this.chartCount = dashStore.charts.instances.size;
    },
    
    getMetricClass(type, value) {
      const thresholds = Alpine.store('performance').thresholds;
      const threshold = thresholds[type];
      
      if (!threshold) return 'text-gray-600';
      
      if (value > threshold * 2) return 'text-red-600';
      if (value > threshold) return 'text-yellow-600';
      return 'text-green-600';
    },
    
    clearMetrics() {
      Alpine.store('performance').clear();
      this.updateMetrics();
    },
    
    toggleDetails() {
      this.showDetails = !this.showDetails;
    }
  });
};

/**
 * Data Export Component
 */
window.dataExporter = function() {
  return window.BotnarComponents.baseComponent({
    id: 'data-exporter',
    debug: false,
    
    data: {
      exportFormat: 'csv',
      exportOptions: [
        { value: 'csv', label: 'CSV' },
        { value: 'json', label: 'JSON' },
        { value: 'xlsx', label: 'Excel' }
      ],
      includeFilters: true,
      includeCharts: false,
      exporting: false
    },
    
    async exportData() {
      try {
        this.exporting = true;
        
        const dashStore = Alpine.store('dashboardData');
        const exportData = {
          metadata: {
            exportDate: new Date().toISOString(),
            filters: this.includeFilters ? dashStore.filters : null,
            version: '1.0.0'
          },
          data: dashStore.data
        };
        
        // Add chart data if requested
        if (this.includeCharts) {
          exportData.charts = {};
          dashStore.charts.instances.forEach((instance, id) => {
            if (instance.data) {
              exportData.charts[id] = {
                type: instance.config.type,
                data: instance.data
              };
            }
          });
        }
        
        await this.downloadData(exportData);
        
        dashStore.addNotification(
          'success',
          `Data exported successfully as ${this.exportFormat.toUpperCase()}`,
          3000
        );
        
      } catch (error) {
        this.handleError('Export failed', error);
      } finally {
        this.exporting = false;
      }
    },
    
    async downloadData(data) {
      const filename = `botnar-dashboard-export-${new Date().toISOString().split('T')[0]}`;
      
      switch (this.exportFormat) {
        case 'json':
          this.downloadJson(data, filename);
          break;
        case 'csv':
          this.downloadCsv(data, filename);
          break;
        case 'xlsx':
          await this.downloadExcel(data, filename);
          break;
        default:
          throw new Error(`Unsupported export format: ${this.exportFormat}`);
      }
    },
    
    downloadJson(data, filename) {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      this.triggerDownload(blob, `${filename}.json`);
    },
    
    downloadCsv(data, filename) {
      // Simple CSV export - can be enhanced based on data structure
      let csv = 'Type,Key,Value\\n';
      
      Object.entries(data.data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            csv += `${key},${index},${JSON.stringify(item)}\\n`;
          });
        } else {
          csv += `${key},,${JSON.stringify(value)}\\n`;
        }
      });
      
      const blob = new Blob([csv], { type: 'text/csv' });
      this.triggerDownload(blob, `${filename}.csv`);
    },
    
    async downloadExcel(data, filename) {
      // Note: This would require a library like SheetJS for full Excel support
      // For now, download as CSV with .xlsx extension
      Alpine.store('dashboardData').addNotification(
        'warning',
        'Excel export not fully implemented. Downloading as CSV instead.',
        5000
      );
      
      this.downloadCsv(data, filename);
    },
    
    triggerDownload(blob, filename) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    }
  });
};

/**
 * Theme Switcher Component
 */
window.themeSwitcher = function() {
  return window.BotnarComponents.baseComponent({
    id: 'theme-switcher',
    debug: false,
    
    data: {
      currentTheme: 'light',
      themes: [
        { value: 'light', label: 'Light', icon: '☀️' },
        { value: 'dark', label: 'Dark', icon: '🌙' },
        { value: 'auto', label: 'Auto', icon: '🌓' }
      ]
    },
    
    init() {
      // Get theme from store or localStorage
      const stored = localStorage.getItem('botnar-theme') || Alpine.store('dashboardData').ui.theme;
      this.setTheme(stored);
      
      // Listen for system theme changes if auto mode
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          if (this.currentTheme === 'auto') {
            this.applyTheme(e.matches ? 'dark' : 'light');
          }
        });
      }
    },
    
    setTheme(theme) {
      this.currentTheme = theme;
      
      let actualTheme = theme;
      if (theme === 'auto') {
        actualTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      this.applyTheme(actualTheme);
      
      // Store preference
      localStorage.setItem('botnar-theme', theme);
      Alpine.store('dashboardData').ui.theme = theme;
      
      this.emit('theme:changed', { theme: theme, actualTheme: actualTheme });
    },
    
    applyTheme(theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Update chart themes if needed
      Alpine.store('dashboardData').charts.instances.forEach((instance) => {
        if (instance.options && instance.options.plugins && instance.options.plugins.tooltip) {
          // Update chart theme - this would need to be implemented based on chart configuration
          instance.update('none');
        }
      });
    },
    
    toggleTheme() {
      const currentIndex = this.themes.findIndex(t => t.value === this.currentTheme);
      const nextIndex = (currentIndex + 1) % this.themes.length;
      this.setTheme(this.themes[nextIndex].value);
    }
  });
};

console.log('Botnar Utility Components loaded successfully');