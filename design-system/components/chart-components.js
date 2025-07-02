/**
 * Fondation Botnar Dashboard - Chart Component Implementations
 * 
 * Specific chart component implementations using the Alpine.js foundation
 */

/**
 * Grant Distribution Bar Chart Component
 */
window.grantDistributionChart = function(config = {}) {
  return window.BotnarComponents.chartComponent({
    id: 'grant-distribution-chart',
    chartType: 'bar',
    canvasId: config.canvasId || 'grantDistributionChart',
    debug: config.debug || false,
    
    // Component-specific data
    data: {
      countries: [],
      grants: [],
      refreshing: false
    },
    
    init() {
      // Call parent init
      window.BotnarComponents.chartComponent().init.call(this);
      
      // Load initial data
      this.loadGrantData();
    },
    
    async loadGrantData() {
      try {
        this.refreshing = true;
        
        // Simulate API call - replace with actual data fetching
        await new Promise(resolve => setTimeout(resolve, 500));
        
        this.countries = ['Romania', 'Ghana', 'Colombia', 'Indonesia', 'Tanzania', 'Kenya'];
        this.grants = [15, 12, 18, 8, 10, 14];
        
        this.refreshing = false;
        
        // Update chart if it exists
        if (this.chartInstance) {
          this.updateChart({
            labels: this.countries,
            datasets: [{
              label: 'Number of Grants',
              data: this.grants,
              backgroundColor: window.BotnarColors?.categorical || ['#1976d2', '#e91e63', '#388e3c', '#ef6c00', '#9c27b0', '#00796b'],
              borderColor: window.BotnarColors?.categorical || ['#1976d2', '#e91e63', '#388e3c', '#ef6c00', '#9c27b0', '#00796b'],
              borderWidth: 2
            }]
          });
        }
        
      } catch (error) {
        this.handleError('Failed to load grant data', error);
        this.refreshing = false;
      }
    },
    
    getChartData() {
      return {
        labels: this.countries,
        datasets: [{
          label: 'Number of Grants',
          data: this.grants,
          backgroundColor: window.BotnarColors?.categorical || ['#1976d2', '#e91e63', '#388e3c', '#ef6c00', '#9c27b0', '#00796b'],
          borderColor: window.BotnarColors?.categorical || ['#1976d2', '#e91e63', '#388e3c', '#ef6c00', '#9c27b0', '#00796b'],
          borderWidth: 2
        }]
      };
    },
    
    shouldUpdateChart(dataUpdate) {
      return dataUpdate.key === 'grants' || dataUpdate.key === 'countries';
    },
    
    onFiltersChanged(filters) {
      // Reload data when filters change
      this.loadGrantData();
    },
    
    // Public methods
    refreshData() {
      return this.loadGrantData();
    },
    
    getChartSummary() {
      const total = this.grants.reduce((sum, count) => sum + count, 0);
      return {
        totalGrants: total,
        countriesCount: this.countries.length,
        averagePerCountry: total / this.countries.length
      };
    }
  });
};

/**
 * Funding Trends Line Chart Component
 */
window.fundingTrendsChart = function(config = {}) {
  return window.BotnarComponents.chartComponent({
    id: 'funding-trends-chart',
    chartType: 'line',
    canvasId: config.canvasId || 'fundingTrendsChart',
    debug: config.debug || false,
    
    data: {
      timePeriod: '1y',
      months: [],
      fundingData: [],
      loading: false
    },
    
    init() {
      window.BotnarComponents.chartComponent().init.call(this);
      this.loadFundingData();
    },
    
    async loadFundingData() {
      try {
        this.loading = true;
        
        // Simulate API call with different data based on time period
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const dataByPeriod = {
          '6m': {
            months: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [3.8, 4.1, 3.7, 4.2, 4.5, 4.8]
          },
          '1y': {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [2.1, 2.3, 2.8, 3.2, 2.9, 3.5, 3.8, 4.1, 3.7, 4.2, 4.5, 4.8]
          },
          '2y': {
            months: ['2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4'],
            data: [8.5, 9.2, 8.8, 9.5, 10.1, 10.8, 11.2, 11.9]
          }
        };
        
        const periodData = dataByPeriod[this.timePeriod] || dataByPeriod['1y'];
        this.months = periodData.months;
        this.fundingData = periodData.data;
        
        this.loading = false;
        
        if (this.chartInstance) {
          this.updateChart({
            labels: this.months,
            datasets: [{
              label: 'Funding (CHF Millions)',
              data: this.fundingData,
              borderColor: (window.BotnarColors?.blue?.[600]) || '#1976d2',
              backgroundColor: (window.BotnarColors?.blue?.[100]) || 'rgba(25, 118, 210, 0.1)',
              fill: true,
              tension: 0.1
            }]
          });
        }
        
      } catch (error) {
        this.handleError('Failed to load funding data', error);
        this.loading = false;
      }
    },
    
    getChartData() {
      return {
        labels: this.months,
        datasets: [{
          label: 'Funding (CHF Millions)',
          data: this.fundingData,
          borderColor: (window.BotnarColors?.blue?.[600]) || '#1976d2',
          backgroundColor: (window.BotnarColors?.blue?.[100]) || 'rgba(25, 118, 210, 0.1)',
          fill: true,
          tension: 0.1
        }]
      };
    },
    
    // Public methods
    changePeriod(period) {
      if (['6m', '1y', '2y'].includes(period)) {
        this.timePeriod = period;
        this.loadFundingData();
        
        this.emit('period:changed', {
          period: period,
          chartId: this.chartId
        });
      }
    },
    
    getTrendAnalysis() {
      if (this.fundingData.length < 2) return null;
      
      const first = this.fundingData[0];
      const last = this.fundingData[this.fundingData.length - 1];
      const change = last - first;
      const percentChange = (change / first) * 100;
      
      return {
        trend: change > 0 ? 'increasing' : 'decreasing',
        change: change,
        percentChange: percentChange,
        total: this.fundingData.reduce((sum, val) => sum + val, 0)
      };
    }
  });
};

/**
 * Budget Allocation Pie Chart Component
 */
window.budgetAllocationChart = function(config = {}) {
  return window.BotnarComponents.chartComponent({
    id: 'budget-allocation-chart',
    chartType: 'pie',
    canvasId: config.canvasId || 'budgetAllocationChart',
    debug: config.debug || false,
    
    data: {
      programs: [],
      allocations: [],
      currency: 'CHF'
    },
    
    init() {
      window.BotnarComponents.chartComponent().init.call(this);
      this.loadBudgetData();
    },
    
    async loadBudgetData() {
      try {
        this.setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 400));
        
        this.programs = ['Health', 'Education', 'Research', 'Infrastructure', 'Capacity Building'];
        this.allocations = [35, 25, 20, 12, 8];
        
        this.setLoading(false);
        
        if (this.chartInstance) {
          this.updateChart({
            labels: this.programs,
            datasets: [{
              data: this.allocations,
              backgroundColor: (window.BotnarColors?.categorical) 
                ? window.BotnarColors.categorical.slice(0, 5) 
                : ['#1976d2', '#e91e63', '#388e3c', '#ef6c00', '#9c27b0'],
              borderColor: '#ffffff',
              borderWidth: 2
            }]
          });
        }
        
      } catch (error) {
        this.handleError('Failed to load budget data', error);
      }
    },
    
    getChartData() {
      return {
        labels: this.programs,
        datasets: [{
          data: this.allocations,
          backgroundColor: (window.BotnarColors?.categorical) 
            ? window.BotnarColors.categorical.slice(0, 5) 
            : ['#1976d2', '#e91e63', '#388e3c', '#ef6c00', '#9c27b0'],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      };
    },
    
    getBudgetSummary() {
      const total = this.allocations.reduce((sum, val) => sum + val, 0);
      return {
        total: total,
        currency: this.currency,
        breakdown: this.programs.map((program, index) => ({
          program: program,
          amount: this.allocations[index],
          percentage: ((this.allocations[index] / total) * 100).toFixed(1)
        }))
      };
    }
  });
};

/**
 * Grant Status Doughnut Chart Component
 */
window.grantStatusChart = function(config = {}) {
  return window.BotnarComponents.chartComponent({
    id: 'grant-status-chart',
    chartType: 'doughnut',
    canvasId: config.canvasId || 'grantStatusChart',
    debug: config.debug || false,
    
    data: {
      statuses: [],
      counts: [],
      colors: []
    },
    
    init() {
      window.BotnarComponents.chartComponent().init.call(this);
      this.loadStatusData();
    },
    
    async loadStatusData() {
      try {
        this.setLoading(true);
        
        await new Promise(resolve => setTimeout(resolve, 350));
        
        this.statuses = ['Active', 'Pending', 'Completed', 'On Hold'];
        this.counts = [42, 8, 25, 3];
        this.colors = [
          (window.BotnarColors?.success?.[700]) || '#388e3c',
          (window.BotnarColors?.warning?.[800]) || '#ef6c00',
          (window.BotnarColors?.blue?.[600]) || '#1976d2',
          (window.BotnarColors?.error?.[700]) || '#d32f2f'
        ];
        
        this.setLoading(false);
        
        if (this.chartInstance) {
          this.updateChart({
            labels: this.statuses,
            datasets: [{
              data: this.counts,
              backgroundColor: this.colors,
              borderColor: '#ffffff',
              borderWidth: 2
            }]
          });
        }
        
      } catch (error) {
        this.handleError('Failed to load status data', error);
      }
    },
    
    getChartData() {
      return {
        labels: this.statuses,
        datasets: [{
          data: this.counts,
          backgroundColor: this.colors,
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      };
    },
    
    getStatusSummary() {
      const total = this.counts.reduce((sum, val) => sum + val, 0);
      return {
        total: total,
        breakdown: this.statuses.map((status, index) => ({
          status: status,
          count: this.counts[index],
          percentage: ((this.counts[index] / total) * 100).toFixed(1),
          color: this.colors[index]
        }))
      };
    }
  });
};

console.log('Botnar Chart Components loaded successfully');