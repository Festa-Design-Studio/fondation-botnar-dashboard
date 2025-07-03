/**
 * Performance Monitor for Fondation Botnar Dashboard
 * Monitors and reports on application performance metrics
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            navigation: {},
            paint: {},
            layout: {},
            resources: [],
            memory: {},
            connections: [],
            customMarks: new Map(),
            vitals: {}
        };
        
        this.observers = new Map();
        this.thresholds = {
            LCP: 2500,      // Largest Contentful Paint
            FID: 100,       // First Input Delay
            CLS: 0.1,       // Cumulative Layout Shift
            FCP: 1800,      // First Contentful Paint
            TTI: 3500,      // Time to Interactive
            TTFB: 600       // Time to First Byte
        };
        
        this.subscribers = new Set();
        this.isMonitoring = false;
        
        this.init();
    }

    /**
     * Initialize performance monitoring
     */
    init() {
        if (typeof window === 'undefined' || !window.performance) {
            console.warn('Performance API not available');
            return;
        }

        this.startMonitoring();
        this.setupObservers();
        this.measureNavigationTiming();
        this.measurePaintTiming();
        this.measureResourceTiming();
        this.setupVitalsMonitoring();
        
        // Measure memory usage periodically
        this.startMemoryMonitoring();
        
        // Set up periodic reporting
        this.startPeriodicReporting();
    }

    /**
     * Start performance monitoring
     */
    startMonitoring() {
        this.isMonitoring = true;
        this.startTime = performance.now();
        
        // Mark monitoring start
        this.mark('monitoring-start');
        
        console.log('🚀 Performance monitoring started');
    }

    /**
     * Setup performance observers
     */
    setupObservers() {
        // Layout Shift Observer
        if (window.PerformanceObserver && PerformanceObserver.supportedEntryTypes.includes('layout-shift')) {
            const layoutShiftObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        this.metrics.vitals.CLS = (this.metrics.vitals.CLS || 0) + entry.value;
                    }
                }
            });
            
            layoutShiftObserver.observe({ type: 'layout-shift', buffered: true });
            this.observers.set('layout-shift', layoutShiftObserver);
        }

        // Largest Contentful Paint Observer
        if (window.PerformanceObserver && PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint')) {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.vitals.LCP = lastEntry.startTime;
            });
            
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
            this.observers.set('lcp', lcpObserver);
        }

        // First Input Delay Observer
        if (window.PerformanceObserver && PerformanceObserver.supportedEntryTypes.includes('first-input')) {
            const fidObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    this.metrics.vitals.FID = entry.processingStart - entry.startTime;
                    break; // Only need the first input
                }
            });
            
            fidObserver.observe({ type: 'first-input', buffered: true });
            this.observers.set('fid', fidObserver);
        }

        // Navigation Observer
        if (window.PerformanceObserver && PerformanceObserver.supportedEntryTypes.includes('navigation')) {
            const navObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    this.processNavigationEntry(entry);
                }
            });
            
            navObserver.observe({ type: 'navigation', buffered: true });
            this.observers.set('navigation', navObserver);
        }

        // Resource Observer
        if (window.PerformanceObserver && PerformanceObserver.supportedEntryTypes.includes('resource')) {
            const resourceObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    this.processResourceEntry(entry);
                }
            });
            
            resourceObserver.observe({ type: 'resource', buffered: true });
            this.observers.set('resource', resourceObserver);
        }
    }

    /**
     * Measure navigation timing
     */
    measureNavigationTiming() {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            this.metrics.navigation = {
                dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
                tcpConnect: navigation.connectEnd - navigation.connectStart,
                tlsHandshake: navigation.connectEnd - navigation.secureConnectionStart,
                ttfb: navigation.responseStart - navigation.requestStart,
                responseTime: navigation.responseEnd - navigation.responseStart,
                domProcessing: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                totalTime: navigation.loadEventEnd - navigation.navigationStart
            };
            
            this.metrics.vitals.TTFB = this.metrics.navigation.ttfb;
        }
    }

    /**
     * Measure paint timing
     */
    measurePaintTiming() {
        const paintEntries = performance.getEntriesByType('paint');
        for (const entry of paintEntries) {
            this.metrics.paint[entry.name] = entry.startTime;
            
            if (entry.name === 'first-contentful-paint') {
                this.metrics.vitals.FCP = entry.startTime;
            }
        }
    }

    /**
     * Measure resource timing
     */
    measureResourceTiming() {
        const resources = performance.getEntriesByType('resource');
        
        this.metrics.resources = resources.map(resource => ({
            name: resource.name,
            type: this.getResourceType(resource),
            size: resource.transferSize || 0,
            duration: resource.duration,
            cached: resource.transferSize === 0 && resource.decodedBodySize > 0
        }));
        
        // Analyze resource performance
        this.analyzeResourcePerformance();
    }

    /**
     * Process navigation entry
     */
    processNavigationEntry(entry) {
        this.metrics.navigation = {
            ...this.metrics.navigation,
            navigationType: entry.type,
            redirectCount: entry.redirectCount,
            transferSize: entry.transferSize,
            encodedBodySize: entry.encodedBodySize,
            decodedBodySize: entry.decodedBodySize
        };
    }

    /**
     * Process resource entry
     */
    processResourceEntry(entry) {
        const resourceInfo = {
            name: entry.name,
            type: this.getResourceType(entry),
            size: entry.transferSize || 0,
            duration: entry.duration,
            cached: entry.transferSize === 0 && entry.decodedBodySize > 0,
            timestamp: entry.startTime
        };
        
        this.metrics.resources.push(resourceInfo);
        
        // Check for slow resources
        if (entry.duration > 1000) {
            this.reportSlowResource(resourceInfo);
        }
    }

    /**
     * Get resource type from entry
     */
    getResourceType(entry) {
        if (entry.initiatorType) {
            return entry.initiatorType;
        }
        
        const url = entry.name;
        if (url.match(/\.(js|mjs)$/)) return 'script';
        if (url.match(/\.(css)$/)) return 'stylesheet';
        if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) return 'image';
        if (url.match(/\.(woff|woff2|ttf|otf)$/)) return 'font';
        
        return 'other';
    }

    /**
     * Analyze resource performance
     */
    analyzeResourcePerformance() {
        const analysis = {
            totalSize: 0,
            cachedResources: 0,
            slowResources: 0,
            resourceTypes: {}
        };
        
        for (const resource of this.metrics.resources) {
            analysis.totalSize += resource.size;
            
            if (resource.cached) {
                analysis.cachedResources++;
            }
            
            if (resource.duration > 1000) {
                analysis.slowResources++;
            }
            
            if (!analysis.resourceTypes[resource.type]) {
                analysis.resourceTypes[resource.type] = {
                    count: 0,
                    totalSize: 0,
                    averageDuration: 0
                };
            }
            
            analysis.resourceTypes[resource.type].count++;
            analysis.resourceTypes[resource.type].totalSize += resource.size;
        }
        
        // Calculate average durations
        for (const type in analysis.resourceTypes) {
            const typeResources = this.metrics.resources.filter(r => r.type === type);
            const totalDuration = typeResources.reduce((sum, r) => sum + r.duration, 0);
            analysis.resourceTypes[type].averageDuration = totalDuration / typeResources.length;
        }
        
        this.metrics.resourceAnalysis = analysis;
    }

    /**
     * Setup Core Web Vitals monitoring
     */
    setupVitalsMonitoring() {
        // Time to Interactive calculation
        this.calculateTTI();
        
        // Monitor vitals thresholds
        setInterval(() => {
            this.checkVitalsThresholds();
        }, 5000);
    }

    /**
     * Calculate Time to Interactive
     */
    calculateTTI() {
        // Simplified TTI calculation
        setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                this.metrics.vitals.TTI = navigation.domContentLoadedEventEnd;
            }
        }, 1000);
    }

    /**
     * Check if vitals exceed thresholds
     */
    checkVitalsThresholds() {
        const warnings = [];
        
        for (const [metric, threshold] of Object.entries(this.thresholds)) {
            const value = this.metrics.vitals[metric];
            if (value && value > threshold) {
                warnings.push({
                    metric,
                    value,
                    threshold,
                    severity: this.getSeverity(value, threshold)
                });
            }
        }
        
        if (warnings.length > 0) {
            this.reportVitalsWarnings(warnings);
        }
    }

    /**
     * Get severity level
     */
    getSeverity(value, threshold) {
        const ratio = value / threshold;
        if (ratio > 2) return 'critical';
        if (ratio > 1.5) return 'warning';
        return 'info';
    }

    /**
     * Start memory monitoring
     */
    startMemoryMonitoring() {
        if (!performance.memory) return;
        
        const measureMemory = () => {
            this.metrics.memory = {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit,
                timestamp: Date.now()
            };
            
            // Check for memory leaks
            this.checkMemoryUsage();
        };
        
        measureMemory();
        setInterval(measureMemory, 30000); // Every 30 seconds
    }

    /**
     * Check memory usage patterns
     */
    checkMemoryUsage() {
        if (!this.metrics.memory.used) return;
        
        const usagePercent = (this.metrics.memory.used / this.metrics.memory.limit) * 100;
        
        if (usagePercent > 80) {
            this.reportMemoryWarning(usagePercent);
        }
    }

    /**
     * Start periodic reporting
     */
    startPeriodicReporting() {
        setInterval(() => {
            this.generateReport();
        }, 60000); // Every minute
    }

    /**
     * Custom performance marking
     */
    mark(name, detail = null) {
        performance.mark(name);
        this.metrics.customMarks.set(name, {
            timestamp: performance.now(),
            detail
        });
    }

    /**
     * Measure time between marks
     */
    measure(name, startMark, endMark = null) {
        if (!endMark) {
            endMark = `${name}-end`;
            this.mark(endMark);
        }
        
        performance.measure(name, startMark, endMark);
        
        const measure = performance.getEntriesByName(name, 'measure')[0];
        return measure ? measure.duration : null;
    }

    /**
     * Track custom timing
     */
    timeFunction(fn, label) {
        const startMark = `${label}-start`;
        const endMark = `${label}-end`;
        
        this.mark(startMark);
        const result = fn();
        this.mark(endMark);
        
        const duration = this.measure(label, startMark, endMark);
        
        return { result, duration };
    }

    /**
     * Generate performance report
     */
    generateReport() {
        const report = {
            timestamp: Date.now(),
            vitals: { ...this.metrics.vitals },
            navigation: { ...this.metrics.navigation },
            paint: { ...this.metrics.paint },
            memory: { ...this.metrics.memory },
            resources: {
                count: this.metrics.resources.length,
                ...this.metrics.resourceAnalysis
            },
            score: this.calculatePerformanceScore(),
            recommendations: this.generateRecommendations()
        };
        
        this.notifySubscribers(report);
        return report;
    }

    /**
     * Calculate overall performance score
     */
    calculatePerformanceScore() {
        const weights = {
            LCP: 0.25,
            FID: 0.25,
            CLS: 0.25,
            FCP: 0.15,
            TTFB: 0.10
        };
        
        let score = 0;
        let totalWeight = 0;
        
        for (const [metric, weight] of Object.entries(weights)) {
            const value = this.metrics.vitals[metric];
            const threshold = this.thresholds[metric];
            
            if (value && threshold) {
                const metricScore = Math.max(0, 100 - (value / threshold) * 50);
                score += metricScore * weight;
                totalWeight += weight;
            }
        }
        
        return totalWeight > 0 ? Math.round(score / totalWeight) : 0;
    }

    /**
     * Generate performance recommendations
     */
    generateRecommendations() {
        const recommendations = [];
        
        // LCP recommendations
        if (this.metrics.vitals.LCP > this.thresholds.LCP) {
            recommendations.push({
                metric: 'LCP',
                message: 'Improve largest contentful paint by optimizing images and reducing server response times',
                priority: 'high'
            });
        }
        
        // FID recommendations
        if (this.metrics.vitals.FID > this.thresholds.FID) {
            recommendations.push({
                metric: 'FID',
                message: 'Reduce first input delay by minimizing JavaScript execution time',
                priority: 'medium'
            });
        }
        
        // CLS recommendations
        if (this.metrics.vitals.CLS > this.thresholds.CLS) {
            recommendations.push({
                metric: 'CLS',
                message: 'Improve layout stability by setting dimensions for images and avoiding dynamic content injection',
                priority: 'high'
            });
        }
        
        // Resource recommendations
        if (this.metrics.resourceAnalysis?.slowResources > 5) {
            recommendations.push({
                metric: 'Resources',
                message: 'Multiple slow-loading resources detected. Consider optimizing or lazy loading',
                priority: 'medium'
            });
        }
        
        // Memory recommendations
        if (this.metrics.memory?.used) {
            const usagePercent = (this.metrics.memory.used / this.metrics.memory.limit) * 100;
            if (usagePercent > 70) {
                recommendations.push({
                    metric: 'Memory',
                    message: 'High memory usage detected. Check for memory leaks or optimize data structures',
                    priority: 'medium'
                });
            }
        }
        
        return recommendations;
    }

    /**
     * Report performance warnings
     */
    reportVitalsWarnings(warnings) {
        for (const warning of warnings) {
            console.warn(`⚠️ Performance Warning: ${warning.metric} (${warning.value.toFixed(2)}ms) exceeds threshold (${warning.threshold}ms)`);
        }
        
        this.notifySubscribers({ type: 'warning', warnings });
    }

    /**
     * Report slow resource
     */
    reportSlowResource(resource) {
        console.warn(`🐌 Slow Resource: ${resource.name} took ${resource.duration.toFixed(2)}ms to load`);
        
        this.notifySubscribers({ 
            type: 'slow-resource', 
            resource 
        });
    }

    /**
     * Report memory warning
     */
    reportMemoryWarning(usagePercent) {
        console.warn(`🧠 Memory Warning: ${usagePercent.toFixed(1)}% of heap limit used`);
        
        this.notifySubscribers({ 
            type: 'memory-warning', 
            usagePercent,
            memory: this.metrics.memory
        });
    }

    /**
     * Subscribe to performance events
     */
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    /**
     * Notify subscribers
     */
    notifySubscribers(data) {
        this.subscribers.forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error('Performance monitor subscriber error:', error);
            }
        });
    }

    /**
     * Get current metrics
     */
    getMetrics() {
        return {
            ...this.metrics,
            score: this.calculatePerformanceScore(),
            isMonitoring: this.isMonitoring
        };
    }

    /**
     * Get performance summary
     */
    getSummary() {
        return {
            vitals: this.metrics.vitals,
            score: this.calculatePerformanceScore(),
            resourceCount: this.metrics.resources.length,
            memoryUsage: this.metrics.memory.used ? 
                Math.round((this.metrics.memory.used / this.metrics.memory.limit) * 100) : null,
            recommendations: this.generateRecommendations().length
        };
    }

    /**
     * Stop monitoring
     */
    stop() {
        this.isMonitoring = false;
        
        // Disconnect observers
        for (const observer of this.observers.values()) {
            observer.disconnect();
        }
        this.observers.clear();
        
        console.log('🛑 Performance monitoring stopped');
    }
}

// Global performance monitor instance
window.performanceMonitor = new PerformanceMonitor();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}