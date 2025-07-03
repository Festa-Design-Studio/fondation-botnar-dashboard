/**
 * Fondation Botnar Dashboard - Chart Initializer
 * Universal chart initialization utility for all pages
 */

class ChartInitializer {
    constructor() {
        this.charts = {};
        this.chartConfigs = {};
        this.retryAttempts = 0;
        this.maxRetries = 10;
    }

    /**
     * Wait for Chart.js to be available
     */
    async waitForChartJS() {
        console.log('Waiting for Chart.js to load...');
        let attempts = 0;
        const maxAttempts = 50;
        
        while (typeof Chart === 'undefined' && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (typeof Chart === 'undefined') {
            console.error('Chart.js failed to load after', maxAttempts * 100, 'ms');
            throw new Error('Chart.js not available');
        }
        
        console.log('Chart.js loaded successfully');
        return true;
    }

    /**
     * Initialize all charts with retry mechanism
     */
    async initializeCharts(configs) {
        try {
            await this.waitForChartJS();
            
            console.log('Initializing charts with configs:', Object.keys(configs));
            
            for (const [chartId, config] of Object.entries(configs)) {
                await this.createChart(chartId, config);
            }
            
            console.log('All charts initialized successfully');
        } catch (error) {
            console.error('Failed to initialize charts:', error);
            
            // Retry mechanism
            if (this.retryAttempts < this.maxRetries) {
                this.retryAttempts++;
                console.log(`Retrying chart initialization (attempt ${this.retryAttempts}/${this.maxRetries})`);
                setTimeout(() => {
                    this.initializeCharts(configs);
                }, 1000);
            } else {
                console.error('Chart initialization failed after', this.maxRetries, 'attempts');
                this.showChartError();
            }
        }
    }

    /**
     * Create individual chart
     */
    async createChart(chartId, config) {
        const canvas = document.getElementById(chartId);
        
        if (!canvas) {
            console.error(`Canvas element not found for chart: ${chartId}`);
            return null;
        }

        try {
            console.log(`Creating chart: ${chartId}`);
            
            // Destroy existing chart if it exists
            if (this.charts[chartId]) {
                this.charts[chartId].destroy();
            }

            // Create new chart
            const chart = new Chart(canvas, config);
            this.charts[chartId] = chart;
            
            console.log(`Chart created successfully: ${chartId}`);
            return chart;
        } catch (error) {
            console.error(`Error creating chart ${chartId}:`, error);
            this.showChartError(chartId);
            return null;
        }
    }

    /**
     * Show error message when charts fail to load
     */
    showChartError(chartId = null) {
        const errorMessage = chartId 
            ? `Error loading chart: ${chartId}` 
            : 'Error loading charts. Please refresh the page.';
        
        const selectors = chartId 
            ? [`#${chartId}`]
            : ['canvas[id$="Chart"]', 'canvas[id*="chart"]'];
        
        selectors.forEach(selector => {
            const elements = chartId ? [document.getElementById(chartId)] : document.querySelectorAll(selector);
            
            elements.forEach(element => {
                if (element) {
                    const container = element.closest('.chart-container, .chart-wrapper, [class*="chart"]');
                    if (container) {
                        container.innerHTML = `
                            <div class="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                                <div class="text-center">
                                    <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                    </svg>
                                    <p class="text-gray-500 dark:text-gray-400 text-sm">${errorMessage}</p>
                                    <button onclick="window.location.reload()" class="mt-2 px-4 py-2 bg-botnar-blue-600 text-white rounded-md text-sm hover:bg-botnar-blue-700">
                                        Retry
                                    </button>
                                </div>
                            </div>
                        `;
                    }
                }
            });
        });
    }

    /**
     * Get default chart configurations for common chart types
     */
    getDefaultConfig(type, data, options = {}) {
        const baseConfig = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: options.showLegend !== false
                }
            },
            ...options
        };

        switch (type) {
            case 'line':
                return {
                    type: 'line',
                    data: data,
                    options: {
                        ...baseConfig,
                        scales: {
                            y: {
                                beginAtZero: false,
                                ...options.yAxis
                            }
                        },
                        elements: {
                            line: {
                                tension: 0.4
                            }
                        }
                    }
                };

            case 'doughnut':
                return {
                    type: 'doughnut',
                    data: data,
                    options: {
                        ...baseConfig,
                        cutout: '60%',
                        plugins: {
                            ...baseConfig.plugins,
                            legend: {
                                display: options.showLegend !== false,
                                position: 'bottom'
                            }
                        }
                    }
                };

            case 'bar':
                return {
                    type: 'bar',
                    data: data,
                    options: {
                        ...baseConfig,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ...options.yAxis
                            }
                        }
                    }
                };

            case 'pie':
                return {
                    type: 'pie',
                    data: data,
                    options: {
                        ...baseConfig,
                        plugins: {
                            ...baseConfig.plugins,
                            legend: {
                                display: options.showLegend !== false,
                                position: 'bottom'
                            }
                        }
                    }
                };

            default:
                return {
                    type: type,
                    data: data,
                    options: baseConfig
                };
        }
    }

    /**
     * Standard color palettes
     */
    getColorPalette(name = 'default') {
        const palettes = {
            default: ['#0066CC', '#FF6B9D', '#00CC66', '#FF9900', '#8B5CF6', '#10B981'],
            botnar: ['#0066CC', '#FF6B9D', '#00CC66', '#FF9900', '#6B46C1', '#059669'],
            blue: ['#3B82F6', '#1E40AF', '#60A5FA', '#93C5FD', '#DBEAFE', '#EFF6FF'],
            pink: ['#EC4899', '#BE185D', '#F472B6', '#F9A8D4', '#FCE7F3', '#FDF2F8'],
            green: ['#10B981', '#047857', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5']
        };
        
        return palettes[name] || palettes.default;
    }

    /**
     * Update chart data
     */
    updateChart(chartId, newData) {
        const chart = this.charts[chartId];
        if (chart) {
            chart.data = newData;
            chart.update();
            console.log(`Chart updated: ${chartId}`);
        } else {
            console.error(`Chart not found for update: ${chartId}`);
        }
    }

    /**
     * Destroy chart
     */
    destroyChart(chartId) {
        const chart = this.charts[chartId];
        if (chart) {
            chart.destroy();
            delete this.charts[chartId];
            console.log(`Chart destroyed: ${chartId}`);
        }
    }

    /**
     * Destroy all charts
     */
    destroyAllCharts() {
        Object.keys(this.charts).forEach(chartId => {
            this.destroyChart(chartId);
        });
        console.log('All charts destroyed');
    }

    /**
     * Resize all charts
     */
    resizeCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }
}

// Create global instance
window.chartInitializer = new ChartInitializer();

// Handle window resize
window.addEventListener('resize', () => {
    if (window.chartInitializer) {
        window.chartInitializer.resizeCharts();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChartInitializer;
}