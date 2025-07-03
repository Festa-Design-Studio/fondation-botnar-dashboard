/**
 * Fondation Botnar Dashboard - Performance Optimizer
 * Comprehensive performance monitoring and optimization utilities
 */

class PerformanceOptimizer {
    constructor() {
        this.metrics = {
            navigation: null,
            vitals: {},
            resources: [],
            observations: []
        };
        this.config = {
            lcpThreshold: 2500,  // 2.5 seconds
            fidThreshold: 100,   // 100 milliseconds
            clsThreshold: 0.1,   // 0.1 score
            fcpThreshold: 1800,  // 1.8 seconds
            ttiThreshold: 3500   // 3.5 seconds
        };
        this.observers = new Map();
        this.init();
    }

    /**
     * Initialize performance monitoring
     */
    init() {
        if (typeof window === 'undefined') return;
        
        // Wait for page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startMonitoring());
        } else {
            this.startMonitoring();
        }
    }

    /**
     * Start all performance monitoring
     */
    startMonitoring() {
        this.monitorCoreWebVitals();
        this.monitorResourceLoading();
        this.monitorUserInteractions();
        this.optimizeImages();
        this.optimizeCSS();
        this.optimizeJavaScript();
        this.setupIntersectionObserver();
    }

    /**
     * Monitor Core Web Vitals
     */
    monitorCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        if ('LargestContentfulPaint' in window) {
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                this.metrics.vitals.lcp = {
                    value: lastEntry.startTime,
                    rating: this.getRating(lastEntry.startTime, this.config.lcpThreshold),
                    element: lastEntry.element,
                    timestamp: Date.now()
                };
                
                this.reportMetric('lcp', this.metrics.vitals.lcp);
            });
            
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.set('lcp', lcpObserver);
        }

        // First Input Delay (FID)
        if ('FirstInputDelay' in window || 'PerformanceEventTiming' in window) {
            const fidObserver = new PerformanceObserver((entryList) => {
                entryList.getEntries().forEach((entry) => {
                    if (entry.processingStart && entry.startTime) {
                        const fid = entry.processingStart - entry.startTime;
                        
                        this.metrics.vitals.fid = {
                            value: fid,
                            rating: this.getRating(fid, this.config.fidThreshold),
                            entry: entry,
                            timestamp: Date.now()
                        };
                        
                        this.reportMetric('fid', this.metrics.vitals.fid);
                    }
                });
            });
            
            fidObserver.observe({ entryTypes: ['first-input'] });
            this.observers.set('fid', fidObserver);
        }

        // Cumulative Layout Shift (CLS)
        if ('LayoutShift' in window) {
            let clsValue = 0;
            let sessionValue = 0;
            let sessionEntries = [];
            
            const clsObserver = new PerformanceObserver((entryList) => {
                entryList.getEntries().forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        const firstSessionEntry = sessionEntries[0];
                        const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
                        
                        if (sessionValue === 0 || 
                            entry.startTime - lastSessionEntry.startTime < 1000 &&
                            entry.startTime - firstSessionEntry.startTime < 5000) {
                            sessionValue += entry.value;
                            sessionEntries.push(entry);
                        } else {
                            clsValue = Math.max(clsValue, sessionValue);
                            sessionValue = entry.value;
                            sessionEntries = [entry];
                        }
                    }
                });
                
                clsValue = Math.max(clsValue, sessionValue);
                
                this.metrics.vitals.cls = {
                    value: clsValue,
                    rating: this.getRating(clsValue, this.config.clsThreshold),
                    entries: sessionEntries,
                    timestamp: Date.now()
                };
                
                this.reportMetric('cls', this.metrics.vitals.cls);
            });
            
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            this.observers.set('cls', clsObserver);
        }

        // First Contentful Paint (FCP)
        this.measureNavigationTiming();
    }

    /**
     * Measure navigation timing metrics
     */
    measureNavigationTiming() {
        if (!window.performance || !window.performance.getEntriesByType) return;
        
        const navigation = window.performance.getEntriesByType('navigation')[0];
        if (!navigation) return;
        
        this.metrics.navigation = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            request: navigation.responseStart - navigation.requestStart,
            response: navigation.responseEnd - navigation.responseStart,
            dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            load: navigation.loadEventEnd - navigation.loadEventStart,
            fcp: this.getFCP(),
            tti: this.getTTI()
        };
        
        this.reportMetric('navigation', this.metrics.navigation);
    }

    /**
     * Get First Contentful Paint
     */
    getFCP() {
        const fcpEntry = window.performance.getEntriesByName('first-contentful-paint')[0];
        return fcpEntry ? fcpEntry.startTime : null;
    }

    /**
     * Get Time to Interactive (simplified)
     */
    getTTI() {
        // Simplified TTI calculation
        const navigation = window.performance.getEntriesByType('navigation')[0];
        return navigation ? navigation.domContentLoadedEventEnd : null;
    }

    /**
     * Monitor resource loading performance
     */
    monitorResourceLoading() {
        if (!window.performance || !window.performance.getEntriesByType) return;
        
        const resources = window.performance.getEntriesByType('resource');
        
        this.metrics.resources = resources.map(resource => ({
            name: resource.name,
            type: this.getResourceType(resource.name),
            size: resource.transferSize || resource.encodedBodySize,
            duration: resource.duration,
            startTime: resource.startTime,
            cached: resource.transferSize === 0 && resource.decodedBodySize > 0
        }));
        
        // Identify slow resources
        const slowResources = this.metrics.resources.filter(resource => 
            resource.duration > 1000 && resource.type !== 'font'
        );
        
        if (slowResources.length > 0) {
            this.reportMetric('slowResources', slowResources);
        }
    }

    /**
     * Get resource type from URL
     */
    getResourceType(url) {
        const extension = url.split('.').pop().split('?')[0].toLowerCase();
        
        if (['js', 'javascript'].includes(extension)) return 'script';
        if (['css'].includes(extension)) return 'stylesheet';
        if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(extension)) return 'image';
        if (['woff', 'woff2', 'ttf', 'eot'].includes(extension)) return 'font';
        if (['json', 'xml'].includes(extension)) return 'xhr';
        
        return 'other';
    }

    /**
     * Monitor user interactions
     */
    monitorUserInteractions() {
        const interactionTypes = ['click', 'keydown', 'scroll'];
        
        interactionTypes.forEach(type => {
            document.addEventListener(type, (event) => {
                const startTime = performance.now();
                
                // Use requestIdleCallback to measure when interaction completes
                if (window.requestIdleCallback) {
                    requestIdleCallback(() => {
                        const duration = performance.now() - startTime;
                        
                        if (duration > 50) { // Only track slow interactions
                            this.reportMetric('interaction', {
                                type: type,
                                duration: duration,
                                target: event.target.tagName,
                                timestamp: Date.now()
                            });
                        }
                    });
                }
            }, { passive: true });
        });
    }

    /**
     * Optimize images with lazy loading and format detection
     */
    optimizeImages() {
        const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Load image
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        
                        // Add fade-in effect
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.3s ease-in-out';
                        
                        img.onload = () => {
                            img.style.opacity = '1';
                        };
                        
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
        
        // Check for WebP support and optimize
        this.checkWebPSupport();
    }

    /**
     * Check WebP support and replace images
     */
    checkWebPSupport() {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
            const isSupported = webP.height === 2;
            
            if (isSupported) {
                const images = document.querySelectorAll('img[data-webp]');
                images.forEach(img => {
                    if (img.src && !img.src.includes('.webp')) {
                        const webpSrc = img.dataset.webp;
                        if (webpSrc) {
                            img.src = webpSrc;
                        }
                    }
                });
            }
        };
        
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    /**
     * Optimize CSS loading and critical path
     */
    optimizeCSS() {
        // Preload critical CSS
        const criticalCSS = document.querySelector('link[rel="preload"][as="style"]');
        if (criticalCSS) {
            criticalCSS.addEventListener('load', () => {
                criticalCSS.rel = 'stylesheet';
            });
        }
        
        // Load non-critical CSS asynchronously
        const nonCriticalCSS = document.querySelectorAll('link[data-async="true"]');
        nonCriticalCSS.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const asyncLink = document.createElement('link');
                asyncLink.rel = 'stylesheet';
                asyncLink.href = href;
                asyncLink.media = 'print';
                asyncLink.onload = () => {
                    asyncLink.media = 'all';
                };
                
                document.head.appendChild(asyncLink);
                link.remove();
            }
        });
    }

    /**
     * Optimize JavaScript loading and execution
     */
    optimizeJavaScript() {
        // Defer non-critical scripts
        const scripts = document.querySelectorAll('script[data-defer="true"]');
        scripts.forEach(script => {
            if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
                script.defer = true;
            }
        });
        
        // Load scripts on user interaction
        const interactionScripts = document.querySelectorAll('script[data-on-interaction]');
        if (interactionScripts.length > 0) {
            const loadInteractionScripts = () => {
                interactionScripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.src = script.dataset.src || script.src;
                    document.head.appendChild(newScript);
                    script.remove();
                });
                
                // Remove event listeners
                ['click', 'keydown', 'touchstart', 'scroll'].forEach(event => {
                    document.removeEventListener(event, loadInteractionScripts);
                });
            };
            
            ['click', 'keydown', 'touchstart', 'scroll'].forEach(event => {
                document.addEventListener(event, loadInteractionScripts, { once: true, passive: true });
            });
        }
    }

    /**
     * Setup intersection observer for animations and content loading
     */
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Trigger animations
                    if (element.dataset.animate) {
                        element.classList.add('animate-in');
                    }
                    
                    // Load content
                    if (element.dataset.loadContent) {
                        this.loadDeferredContent(element);
                    }
                    
                    animationObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        // Observe elements with animation or deferred content
        const animatedElements = document.querySelectorAll('[data-animate], [data-load-content]');
        animatedElements.forEach(el => animationObserver.observe(el));
    }

    /**
     * Load deferred content when in viewport
     */
    loadDeferredContent(element) {
        const contentType = element.dataset.loadContent;
        
        switch (contentType) {
            case 'chart':
                this.loadChart(element);
                break;
            case 'table':
                this.loadTable(element);
                break;
            case 'widget':
                this.loadWidget(element);
                break;
        }
    }

    /**
     * Load chart when in viewport
     */
    loadChart(element) {
        const chartId = element.dataset.chartId;
        const chartType = element.dataset.chartType;
        
        if (chartId && typeof window.loadChart === 'function') {
            window.loadChart(chartId, chartType);
        }
    }

    /**
     * Load table when in viewport
     */
    loadTable(element) {
        const tableId = element.dataset.tableId;
        
        if (tableId && typeof window.loadTable === 'function') {
            window.loadTable(tableId);
        }
    }

    /**
     * Load widget when in viewport
     */
    loadWidget(element) {
        const widgetId = element.dataset.widgetId;
        
        if (widgetId && typeof window.loadWidget === 'function') {
            window.loadWidget(widgetId);
        }
    }

    /**
     * Get performance rating based on thresholds
     */
    getRating(value, threshold) {
        if (value <= threshold * 0.5) return 'good';
        if (value <= threshold) return 'needs-improvement';
        return 'poor';
    }

    /**
     * Report performance metric
     */
    reportMetric(type, data) {
        // Log to console in development
        if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev')) {
            console.log(`[Performance] ${type}:`, data);
        }
        
        // Send to analytics
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'performance_metric', {
                metric_type: type,
                metric_value: typeof data === 'object' ? data.value : data,
                custom_metric_rating: data.rating || 'unknown'
            });
        }
        
        // Store in metrics
        this.metrics.observations.push({
            type: type,
            data: data,
            timestamp: Date.now()
        });
        
        // Trigger custom event
        document.dispatchEvent(new CustomEvent('performanceMetric', {
            detail: { type, data }
        }));
    }

    /**
     * Get performance summary
     */
    getPerformanceSummary() {
        return {
            vitals: this.metrics.vitals,
            navigation: this.metrics.navigation,
            resourceCount: this.metrics.resources.length,
            slowResources: this.metrics.resources.filter(r => r.duration > 1000).length,
            observations: this.metrics.observations.length,
            score: this.calculatePerformanceScore()
        };
    }

    /**
     * Calculate overall performance score
     */
    calculatePerformanceScore() {
        const weights = {
            lcp: 0.25,
            fid: 0.25,
            cls: 0.25,
            fcp: 0.25
        };
        
        let score = 0;
        let totalWeight = 0;
        
        Object.entries(weights).forEach(([metric, weight]) => {
            const data = this.metrics.vitals[metric];
            if (data) {
                let metricScore = 0;
                switch (data.rating) {
                    case 'good': metricScore = 100; break;
                    case 'needs-improvement': metricScore = 70; break;
                    case 'poor': metricScore = 30; break;
                }
                
                score += metricScore * weight;
                totalWeight += weight;
            }
        });
        
        return totalWeight > 0 ? Math.round(score / totalWeight) : 0;
    }

    /**
     * Optimize page for better performance
     */
    optimizePage() {
        // Remove unused CSS
        this.removeUnusedCSS();
        
        // Optimize images
        this.optimizeImages();
        
        // Prefetch critical resources
        this.prefetchCriticalResources();
        
        // Setup service worker for caching
        this.setupServiceWorker();
    }

    /**
     * Remove unused CSS (simplified)
     */
    removeUnusedCSS() {
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        
        stylesheets.forEach(link => {
            if (link.dataset.critical !== 'true' && 
                link.media === 'print' || 
                link.disabled) {
                link.remove();
            }
        });
    }

    /**
     * Prefetch critical resources
     */
    prefetchCriticalResources() {
        const criticalResources = [
            '/api/dashboard/overview',
            '/api/grants?limit=20',
            '/assets/fonts/inter-var.woff2'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    /**
     * Setup service worker for caching
     */
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    /**
     * Cleanup performance observers
     */
    cleanup() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
    }
}

// Initialize performance optimizer
window.performanceOptimizer = new PerformanceOptimizer();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}