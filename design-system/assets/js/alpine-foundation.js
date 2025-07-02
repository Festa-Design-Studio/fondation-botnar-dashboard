/**
 * Fondation Botnar Dashboard - Alpine.js Foundation Components
 * 
 * This file provides the core Alpine.js patterns and utilities for the dashboard:
 * - Global state management store
 * - Base component patterns and factories
 * - Lifecycle helpers and event system
 * - Memory management for chart instances
 */

/**
 * Global Dashboard Data Store
 * Centralized state management for all dashboard components
 */
document.addEventListener('alpine:init', () => {
  Alpine.store('dashboardData', {
    // Global loading states
    loading: {
      charts: false,
      data: false,
      filters: false
    },
    
    // Shared data sets
    data: {
      grants: [],
      countries: [],
      programs: [],
      metrics: {},
      lastUpdated: null
    },
    
    // Global filters and date ranges
    filters: {
      dateRange: {
        start: null,
        end: null,
        period: '1y' // '6m', '1y', '2y', 'all'
      },
      countries: [],
      programs: [],
      grantStatus: 'all'
    },
    
    // Chart instances registry for memory management
    charts: {
      instances: new Map(),
      performance: [],
      errors: []
    },
    
    // UI state
    ui: {
      sidebarOpen: false,
      activeTab: 'overview',
      theme: 'light',
      density: 'comfortable' // 'compact', 'comfortable', 'spacious'
    },
    
    // Notifications system
    notifications: [],
    
    // Methods for data management
    setLoading(component, state) {
      this.loading[component] = state;
    },
    
    updateData(key, value) {
      this.data[key] = value;
      this.data.lastUpdated = new Date().toISOString();
      this.emit('data:updated', { key, value });
    },
    
    addNotification(type, message, duration = 5000) {
      const notification = {
        id: Date.now() + Math.random(),
        type: type, // 'success', 'error', 'warning', 'info'
        message: message,
        timestamp: new Date().toISOString()
      };
      
      this.notifications.unshift(notification);
      
      if (duration > 0) {
        setTimeout(() => {
          this.removeNotification(notification.id);
        }, duration);
      }
      
      return notification.id;
    },
    
    removeNotification(id) {
      const index = this.notifications.findIndex(n => n.id === id);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    },
    
    clearNotifications() {
      this.notifications = [];
    },
    
    // Chart management
    registerChart(id, instance) {
      this.charts.instances.set(id, instance);
      console.log(`Chart registered: ${id}`);
    },
    
    unregisterChart(id) {
      const instance = this.charts.instances.get(id);
      if (instance && typeof instance.destroy === 'function') {
        instance.destroy();
      }
      this.charts.instances.delete(id);
      console.log(`Chart unregistered: ${id}`);
    },
    
    getChart(id) {
      return this.charts.instances.get(id);
    },
    
    destroyAllCharts() {
      this.charts.instances.forEach((instance, id) => {
        this.unregisterChart(id);
      });
    },
    
    // Filter management
    updateFilter(key, value) {
      this.filters[key] = value;
      this.emit('filters:changed', { key, value, filters: this.filters });
    },
    
    resetFilters() {
      this.filters = {
        dateRange: { start: null, end: null, period: '1y' },
        countries: [],
        programs: [],
        grantStatus: 'all'
      };
      this.emit('filters:reset', this.filters);
    },
    
    // Event system
    emit(event, data) {
      window.dispatchEvent(new CustomEvent(`dashboard:${event}`, {
        detail: data
      }));
    }
  });
  
  /**
   * Performance monitoring store
   */
  Alpine.store('performance', {
    metrics: [],
    thresholds: {
      chartRender: 100, // ms
      dataLoad: 1000,   // ms
      memory: 50        // MB
    },
    
    record(type, duration, metadata = {}) {
      const metric = {
        type,
        duration,
        timestamp: Date.now(),
        metadata
      };
      
      this.metrics.push(metric);
      
      // Keep only last 100 metrics
      if (this.metrics.length > 100) {
        this.metrics = this.metrics.slice(-100);
      }
      
      // Check thresholds
      this.checkThresholds(metric);
    },
    
    checkThresholds(metric) {
      const threshold = this.thresholds[metric.type];
      if (threshold && metric.duration > threshold) {
        Alpine.store('dashboardData').addNotification(
          'warning',
          `Performance warning: ${metric.type} took ${metric.duration}ms (threshold: ${threshold}ms)`,
          3000
        );
      }
    },
    
    getAverageByType(type) {
      const typeMetrics = this.metrics.filter(m => m.type === type);
      if (typeMetrics.length === 0) return 0;
      
      const sum = typeMetrics.reduce((acc, m) => acc + m.duration, 0);
      return sum / typeMetrics.length;
    },
    
    clear() {
      this.metrics = [];
    }
  });
});

/**
 * Base Component Factory
 * Provides common functionality for all dashboard components
 */
window.BotnarComponents = {
  /**
   * Base component with common lifecycle and functionality
   */
  baseComponent(config = {}) {
    return {
      // Component lifecycle
      loading: false,
      error: null,
      initialized: false,
      
      // Performance tracking
      _startTime: null,
      
      // Base configuration
      id: config.id || `component_${Date.now()}`,
      debug: config.debug || false,
      
      // Lifecycle methods
      init() {
        this._startTime = performance.now();
        this.log('Initializing component');
        
        try {
          // Call custom init if provided
          if (config.init && typeof config.init === 'function') {
            config.init.call(this);
          }
          
          this.initialized = true;
          this.onInitialized();
        } catch (error) {
          this.handleError('Initialization failed', error);
        }
      },
      
      destroy() {
        this.log('Destroying component');
        
        try {
          // Call custom destroy if provided
          if (config.destroy && typeof config.destroy === 'function') {
            config.destroy.call(this);
          }
          
          // Clean up any registered charts
          const store = Alpine.store('dashboardData');
          if (this.chartIds) {
            this.chartIds.forEach(id => store.unregisterChart(id));
          }
          
          this.onDestroyed();
        } catch (error) {
          this.handleError('Destruction failed', error);
        }
      },
      
      onInitialized() {
        const duration = performance.now() - this._startTime;
        Alpine.store('performance').record('componentInit', duration, {
          id: this.id,
          type: config.type || 'base'
        });
        
        this.log(`Component initialized in ${duration.toFixed(2)}ms`);
        this.emit('component:initialized', { id: this.id, duration });
      },
      
      onDestroyed() {
        this.log('Component destroyed');
        this.emit('component:destroyed', { id: this.id });
      },
      
      // Error handling
      handleError(message, error) {
        this.error = { message, error: error.message, timestamp: new Date().toISOString() };
        this.loading = false;
        
        console.error(`[${this.id}] ${message}:`, error);
        
        Alpine.store('dashboardData').addNotification(
          'error',
          `${this.id}: ${message}`,
          5000
        );
        
        this.emit('component:error', {
          id: this.id,
          message,
          error: error.message
        });
      },
      
      clearError() {
        this.error = null;
      },
      
      // State management helpers
      setLoading(state) {
        this.loading = state;
        this.emit('component:loading', { id: this.id, loading: state });
      },
      
      // Event helpers
      emit(event, data) {
        window.dispatchEvent(new CustomEvent(event, {
          detail: { component: this.id, ...data }
        }));
      },
      
      listen(event, callback) {
        window.addEventListener(event, callback);
        
        // Store listener for cleanup
        if (!this._listeners) this._listeners = [];
        this._listeners.push({ event, callback });
      },
      
      // Logging
      log(message, ...args) {
        if (this.debug) {
          console.log(`[${this.id}]`, message, ...args);
        }
      },
      
      // Memory management
      cleanup() {
        // Remove event listeners
        if (this._listeners) {
          this._listeners.forEach(({ event, callback }) => {
            window.removeEventListener(event, callback);
          });
          this._listeners = [];
        }
        
        // Clear component data
        Object.keys(this).forEach(key => {
          if (key.startsWith('_') || ['id', 'debug'].includes(key)) return;
          
          if (typeof this[key] === 'object' && this[key] !== null) {
            this[key] = null;
          }
        });
      },
      
      // Merge any additional config properties
      ...config.data || {}
    };
  },
  
  /**
   * Chart Component Factory
   * Specialized component for Chart.js integration
   */
  chartComponent(config = {}) {
    const baseComponent = this.baseComponent({
      ...config,
      type: 'chart',
      
      init() {
        this.chartInstance = null;
        this.chartId = config.chartId || `chart_${this.id}`;
        this.chartType = config.chartType || 'bar';
        this.canvasId = config.canvasId || this.chartId;
        
        // Initialize chart after a short delay to ensure DOM is ready
        this.$nextTick(() => {
          setTimeout(() => this.initChart(), 50);
        });
        
        // Listen for data updates
        this.listen('dashboard:data:updated', (event) => {
          if (this.shouldUpdateChart(event.detail)) {
            this.updateChart(event.detail);
          }
        });
        
        // Listen for filter changes
        this.listen('dashboard:filters:changed', (event) => {
          this.onFiltersChanged(event.detail);
        });
      },
      
      destroy() {
        this.destroyChart();
      }
    });
    
    return {
      ...baseComponent,
      
      // Chart-specific properties
      chartInstance: null,
      chartId: null,
      chartType: 'bar',
      canvasId: null,
      
      // Chart lifecycle
      initChart() {
        try {
          this.setLoading(true);
          
          const canvas = document.getElementById(this.canvasId);
          if (!canvas) {
            throw new Error(`Canvas element not found: ${this.canvasId}`);
          }
          
          const ctx = canvas.getContext('2d');
          const chartConfig = this.getChartConfig();
          
          this.chartInstance = new window.BotnarChart(ctx, chartConfig);
          
          // Register with global store
          Alpine.store('dashboardData').registerChart(this.chartId, this.chartInstance);
          
          this.setLoading(false);
          this.emit('chart:created', {
            chartId: this.chartId,
            type: this.chartType
          });
          
          this.log('Chart initialized successfully');
          
        } catch (error) {
          this.handleError('Chart initialization failed', error);
        }
      },
      
      destroyChart() {
        if (this.chartInstance) {
          Alpine.store('dashboardData').unregisterChart(this.chartId);
          this.chartInstance = null;
        }
      },
      
      // Chart configuration - to be overridden by specific chart components
      getChartConfig() {
        const configFunction = window[`Botnar${this.chartType.charAt(0).toUpperCase() + this.chartType.slice(1)}ChartConfig`];
        
        if (!configFunction) {
          throw new Error(`Chart configuration function not found for type: ${this.chartType}`);
        }
        
        const baseConfig = configFunction();
        const data = this.getChartData();
        
        return {
          ...baseConfig,
          data: data,
          options: {
            ...baseConfig.options,
            ...this.getChartOptions()
          }
        };
      },
      
      // Data and options - to be implemented by specific components
      getChartData() {
        return config.data || {
          labels: [],
          datasets: []
        };
      },
      
      getChartOptions() {
        return config.options || {};
      },
      
      // Update methods
      updateChart(data) {
        if (!this.chartInstance) return;
        
        try {
          const newData = this.processDataUpdate(data);
          
          if (newData.labels) {
            this.chartInstance.data.labels = newData.labels;
          }
          
          if (newData.datasets) {
            this.chartInstance.data.datasets = newData.datasets;
          }
          
          this.chartInstance.update('active');
          
          this.emit('chart:updated', {
            chartId: this.chartId,
            data: newData
          });
          
        } catch (error) {
          this.handleError('Chart update failed', error);
        }
      },
      
      shouldUpdateChart(dataUpdate) {
        // Override in specific components to determine if chart should update
        return true;
      },
      
      processDataUpdate(data) {
        // Override in specific components to process data updates
        return data;
      },
      
      onFiltersChanged(filters) {
        // Override in specific components to handle filter changes
        this.log('Filters changed', filters);
      },
      
      // Export functionality
      exportChart(format = 'png') {
        if (!this.chartInstance) {
          this.handleError('Export failed', new Error('Chart not initialized'));
          return;
        }
        
        try {
          const link = document.createElement('a');
          link.download = `${this.chartId}-${new Date().toISOString().split('T')[0]}.${format}`;
          link.href = this.chartInstance.toBase64Image();
          link.click();
          
          this.emit('chart:exported', {
            chartId: this.chartId,
            format: format
          });
          
          Alpine.store('dashboardData').addNotification(
            'success',
            'Chart exported successfully',
            3000
          );
          
        } catch (error) {
          this.handleError('Chart export failed', error);
        }
      }
    };
  },
  
  /**
   * Data Component Factory
   * For components that manage data loading and processing
   */
  dataComponent(config = {}) {
    const baseComponent = this.baseComponent({
      ...config,
      type: 'data',
      
      init() {
        this.cache = new Map();
        this.refreshInterval = config.refreshInterval || null;
        
        // Auto-load data if specified
        if (config.autoLoad !== false) {
          this.loadData();
        }
        
        // Set up refresh interval if specified
        if (this.refreshInterval) {
          this.setupRefreshInterval();
        }
      },
      
      destroy() {
        this.clearRefreshInterval();
        this.clearCache();
      }
    });
    
    return {
      ...baseComponent,
      
      // Data-specific properties
      cache: null,
      refreshInterval: null,
      lastFetch: null,
      
      // Data loading
      async loadData(force = false) {
        try {
          this.setLoading(true);
          this.clearError();
          
          const cacheKey = this.getCacheKey();
          
          if (!force && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (this.isCacheValid(cached)) {
              this.onDataLoaded(cached.data);
              this.setLoading(false);
              return cached.data;
            }
          }
          
          const startTime = performance.now();
          const data = await this.fetchData();
          const duration = performance.now() - startTime;
          
          // Cache the data
          this.cache.set(cacheKey, {
            data: data,
            timestamp: Date.now()
          });
          
          this.lastFetch = new Date().toISOString();
          this.onDataLoaded(data);
          this.setLoading(false);
          
          // Record performance
          Alpine.store('performance').record('dataLoad', duration, {
            component: this.id,
            cacheKey: cacheKey
          });
          
          return data;
          
        } catch (error) {
          this.handleError('Data loading failed', error);
          return null;
        }
      },
      
      // To be implemented by specific data components
      async fetchData() {
        throw new Error('fetchData method must be implemented');
      },
      
      getCacheKey() {
        return `${this.id}_default`;
      },
      
      isCacheValid(cached) {
        const maxAge = config.cacheMaxAge || 5 * 60 * 1000; // 5 minutes
        return (Date.now() - cached.timestamp) < maxAge;
      },
      
      onDataLoaded(data) {
        // Update global store
        Alpine.store('dashboardData').updateData(this.id, data);
        
        this.emit('data:loaded', {
          component: this.id,
          data: data
        });
      },
      
      // Cache management
      clearCache() {
        if (this.cache) {
          this.cache.clear();
        }
      },
      
      // Refresh interval
      setupRefreshInterval() {
        if (this._refreshTimer) {
          clearInterval(this._refreshTimer);
        }
        
        this._refreshTimer = setInterval(() => {
          this.loadData(true);
        }, this.refreshInterval);
      },
      
      clearRefreshInterval() {
        if (this._refreshTimer) {
          clearInterval(this._refreshTimer);
          this._refreshTimer = null;
        }
      }
    };
  }
};

/**
 * Global Error Handler
 */
window.addEventListener('error', (event) => {
  Alpine.store('dashboardData').addNotification(
    'error',
    `JavaScript Error: ${event.message}`,
    5000
  );
});

/**
 * Memory Cleanup on Page Unload
 */
window.addEventListener('beforeunload', () => {
  if (Alpine.store('dashboardData')) {
    Alpine.store('dashboardData').destroyAllCharts();
  }
});

console.log('Botnar Alpine.js Foundation Components loaded successfully');