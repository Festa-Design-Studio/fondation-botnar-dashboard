/**
 * Data Manager for Fondation Botnar Dashboard
 * Handles data fetching, caching, loading states, and error management
 */

class DataManager {
    constructor() {
        this.cache = new Map();
        this.subscribers = new Set();
        this.loadingStates = new Map();
        this.errorStates = new Map();
        this.retryAttempts = new Map();
        this.maxRetries = 3;
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
        
        // Performance monitoring
        this.metrics = {
            requestCount: 0,
            cacheHits: 0,
            cacheMisses: 0,
            averageResponseTime: 0,
            totalResponseTime: 0
        };
        
        // Initialize mock API endpoints
        this.endpoints = {
            portfolio: '/api/portfolio',
            grants: '/api/grants',
            kpis: '/api/kpis',
            activities: '/api/activities',
            regional: '/api/regional-distribution',
            trends: '/api/portfolio-trends'
        };
        
        // Simulated data for demonstration
        this.mockData = this.initializeMockData();
    }

    /**
     * Initialize mock data for demonstration purposes
     */
    initializeMockData() {
        return {
            portfolio: {
                totalValue: 45600000,
                activeGrants: 127,
                beneficiaries: 2800000,
                impactScore: 8.7,
                successRate: 92
            },
            grants: [
                {
                    id: 1,
                    title: 'Digital Health Initiative Kenya',
                    organization: 'Kenya Health Partners',
                    amount: 2300000,
                    region: 'africa',
                    program: 'Digital Health',
                    status: 'active',
                    duration: '36 months',
                    progress: 65,
                    startDate: '2023-03-15',
                    endDate: '2026-03-15',
                    beneficiaries: 185000,
                    impactScore: 8.5
                },
                {
                    id: 2,
                    title: 'Education Technology Program',
                    organization: 'EduTech Solutions India',
                    amount: 1800000,
                    region: 'asia',
                    program: 'Education',
                    status: 'active',
                    duration: '24 months',
                    progress: 42,
                    startDate: '2023-08-01',
                    endDate: '2025-08-01',
                    beneficiaries: 95000,
                    impactScore: 8.2
                },
                {
                    id: 3,
                    title: 'Urban Innovation Lab São Paulo',
                    organization: 'Urban Labs Brazil',
                    amount: 3200000,
                    region: 'latin_america',
                    program: 'Urban Development',
                    status: 'pending',
                    duration: '48 months',
                    progress: 0,
                    startDate: '2024-01-15',
                    endDate: '2028-01-15',
                    beneficiaries: 120000,
                    impactScore: 0
                },
                {
                    id: 4,
                    title: 'Youth Mental Health Initiative',
                    organization: 'Mental Health Africa',
                    amount: 1500000,
                    region: 'africa',
                    program: 'Digital Health',
                    status: 'under_review',
                    duration: '30 months',
                    progress: 0,
                    startDate: '2024-02-01',
                    endDate: '2026-08-01',
                    beneficiaries: 75000,
                    impactScore: 0
                },
                {
                    id: 5,
                    title: 'AI for Education Platform',
                    organization: 'AI Learning Systems',
                    amount: 2700000,
                    region: 'asia',
                    program: 'Innovation',
                    status: 'active',
                    duration: '42 months',
                    progress: 28,
                    startDate: '2023-06-01',
                    endDate: '2026-12-01',
                    beneficiaries: 150000,
                    impactScore: 7.8
                }
            ],
            activities: [
                {
                    id: 1,
                    type: 'grant',
                    title: 'Digital Health Initiative Kenya approved',
                    description: 'New grant funding approved for €2.3M',
                    time: '2 hours ago',
                    timestamp: Date.now() - (2 * 60 * 60 * 1000)
                },
                {
                    id: 2,
                    type: 'report',
                    title: 'Q4 Impact Assessment completed',
                    description: 'Quarterly evaluation report available',
                    time: '5 hours ago',
                    timestamp: Date.now() - (5 * 60 * 60 * 1000)
                },
                {
                    id: 3,
                    type: 'alert',
                    title: 'Budget review required',
                    description: 'Education Program Ethiopia needs review',
                    time: '1 day ago',
                    timestamp: Date.now() - (24 * 60 * 60 * 1000)
                }
            ],
            regionalDistribution: {
                africa: 42,
                asia: 35,
                latin_america: 18,
                europe: 5
            },
            portfolioTrends: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                values: [38.5, 39.2, 41.1, 42.3, 43.8, 44.2, 45.1, 44.9, 45.6, 46.2, 45.8, 45.6]
            }
        };
    }

    /**
     * Main data fetching method with caching and error handling
     */
    async fetchData(endpoint, options = {}) {
        const { useCache = true, timeout = 10000, retries = this.maxRetries } = options;
        const cacheKey = this.getCacheKey(endpoint, options);
        
        // Check cache first
        if (useCache && this.isValidCacheEntry(cacheKey)) {
            this.metrics.cacheHits++;
            return this.cache.get(cacheKey).data;
        }
        
        this.metrics.cacheMisses++;
        this.setLoadingState(endpoint, true);
        this.clearError(endpoint);
        
        const startTime = performance.now();
        
        try {
            const data = await this.performRequest(endpoint, timeout);
            const responseTime = performance.now() - startTime;
            
            // Update performance metrics
            this.updateMetrics(responseTime);
            
            // Cache the result
            if (useCache) {
                this.cacheData(cacheKey, data);
            }
            
            // Clear retry attempts on success
            this.retryAttempts.delete(endpoint);
            
            // Notify subscribers
            this.notifySubscribers(endpoint, data);
            
            return data;
            
        } catch (error) {
            this.handleRequestError(endpoint, error, options);
            throw error;
        } finally {
            this.setLoadingState(endpoint, false);
        }
    }

    /**
     * Simulate API request with realistic delays and occasional failures
     */
    async performRequest(endpoint, timeout) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            const delay = Math.random() * 1000 + 500; // 500-1500ms
            
            // Simulate occasional failures (5% chance)
            const shouldFail = Math.random() < 0.05;
            
            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error(`Network error for ${endpoint}`));
                    return;
                }
                
                // Return mock data based on endpoint
                const data = this.getMockDataForEndpoint(endpoint);
                resolve(data);
            }, delay);
            
            // Handle timeout
            setTimeout(() => {
                reject(new Error(`Request timeout for ${endpoint}`));
            }, timeout);
        });
    }

    /**
     * Get mock data for specific endpoint
     */
    getMockDataForEndpoint(endpoint) {
        switch (endpoint) {
            case '/api/portfolio':
                return this.mockData.portfolio;
            case '/api/grants':
                return this.mockData.grants;
            case '/api/kpis':
                return this.mockData.portfolio;
            case '/api/activities':
                return this.mockData.activities;
            case '/api/regional-distribution':
                return this.mockData.regionalDistribution;
            case '/api/portfolio-trends':
                return this.mockData.portfolioTrends;
            default:
                throw new Error(`Unknown endpoint: ${endpoint}`);
        }
    }

    /**
     * Handle request errors with retry logic
     */
    async handleRequestError(endpoint, error, options) {
        const currentRetries = this.retryAttempts.get(endpoint) || 0;
        
        if (currentRetries < options.retries) {
            this.retryAttempts.set(endpoint, currentRetries + 1);
            
            // Exponential backoff
            const backoffDelay = Math.pow(2, currentRetries) * 1000;
            
            setTimeout(() => {
                this.fetchData(endpoint, options);
            }, backoffDelay);
            
        } else {
            this.setError(endpoint, error);
            this.retryAttempts.delete(endpoint);
        }
    }

    /**
     * Cache management
     */
    getCacheKey(endpoint, options) {
        return `${endpoint}_${JSON.stringify(options)}`;
    }

    isValidCacheEntry(key) {
        if (!this.cache.has(key)) return false;
        
        const entry = this.cache.get(key);
        return Date.now() - entry.timestamp < this.cacheTimeout;
    }

    cacheData(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
        
        // Cleanup old cache entries
        this.cleanupCache();
    }

    cleanupCache() {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now - entry.timestamp > this.cacheTimeout) {
                this.cache.delete(key);
            }
        }
    }

    /**
     * Loading state management
     */
    setLoadingState(endpoint, isLoading) {
        this.loadingStates.set(endpoint, isLoading);
        this.notifyStateChange('loading', endpoint, isLoading);
    }

    isLoading(endpoint) {
        return this.loadingStates.get(endpoint) || false;
    }

    /**
     * Error state management
     */
    setError(endpoint, error) {
        this.errorStates.set(endpoint, {
            message: error.message,
            timestamp: Date.now(),
            endpoint
        });
        this.notifyStateChange('error', endpoint, error);
    }

    getError(endpoint) {
        return this.errorStates.get(endpoint);
    }

    clearError(endpoint) {
        this.errorStates.delete(endpoint);
        this.notifyStateChange('error', endpoint, null);
    }

    /**
     * Performance metrics
     */
    updateMetrics(responseTime) {
        this.metrics.requestCount++;
        this.metrics.totalResponseTime += responseTime;
        this.metrics.averageResponseTime = this.metrics.totalResponseTime / this.metrics.requestCount;
    }

    getMetrics() {
        return {
            ...this.metrics,
            cacheHitRatio: this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses),
            cacheSize: this.cache.size
        };
    }

    /**
     * Subscription management
     */
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    notifySubscribers(endpoint, data) {
        this.subscribers.forEach(callback => {
            try {
                callback({ type: 'data', endpoint, data });
            } catch (error) {
                console.error('Subscriber callback error:', error);
            }
        });
    }

    notifyStateChange(type, endpoint, state) {
        this.subscribers.forEach(callback => {
            try {
                callback({ type, endpoint, state });
            } catch (error) {
                console.error('Subscriber callback error:', error);
            }
        });
    }

    /**
     * Utility methods for dashboard components
     */
    async getPortfolioKPIs() {
        return this.fetchData('/api/kpis');
    }

    async getGrants(filters = {}) {
        const grants = await this.fetchData('/api/grants');
        return this.filterGrants(grants, filters);
    }

    async getRecentActivities(limit = 10) {
        const activities = await this.fetchData('/api/activities');
        return activities.slice(0, limit);
    }

    async getRegionalDistribution() {
        return this.fetchData('/api/regional-distribution');
    }

    async getPortfolioTrends(period = '1Y') {
        return this.fetchData('/api/portfolio-trends');
    }

    /**
     * Grant filtering logic
     */
    filterGrants(grants, filters) {
        return grants.filter(grant => {
            if (filters.status && grant.status !== filters.status) return false;
            if (filters.region && grant.region !== filters.region) return false;
            if (filters.program && !grant.program.toLowerCase().includes(filters.program.toLowerCase())) return false;
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                return grant.title.toLowerCase().includes(searchTerm) ||
                       grant.organization.toLowerCase().includes(searchTerm);
            }
            return true;
        });
    }

    /**
     * Data refresh methods
     */
    async refreshAll() {
        const endpoints = Object.values(this.endpoints);
        const promises = endpoints.map(endpoint => 
            this.fetchData(endpoint, { useCache: false })
        );
        
        try {
            await Promise.all(promises);
        } catch (error) {
            console.error('Failed to refresh all data:', error);
        }
    }

    invalidateCache(endpoint = null) {
        if (endpoint) {
            for (const key of this.cache.keys()) {
                if (key.includes(endpoint)) {
                    this.cache.delete(key);
                }
            }
        } else {
            this.cache.clear();
        }
    }

    /**
     * Health check and diagnostics
     */
    getHealthStatus() {
        const metrics = this.getMetrics();
        const errorCount = this.errorStates.size;
        const loadingCount = Array.from(this.loadingStates.values()).filter(Boolean).length;
        
        return {
            status: errorCount === 0 ? 'healthy' : 'degraded',
            metrics,
            errors: errorCount,
            loading: loadingCount,
            cacheSize: this.cache.size,
            uptime: performance.now()
        };
    }
}

// Global instance for dashboard use
window.dataManager = new DataManager();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}