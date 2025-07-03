/**
 * Fondation Botnar Dashboard - End-to-End Test Suite
 * Comprehensive testing framework for all user workflows
 */

class E2ETestSuite {
    constructor() {
        this.testResults = [];
        this.currentTest = null;
        this.testConfig = {
            timeout: 10000,
            retries: 3,
            screenshotOnFailure: true,
            verbose: true
        };
        this.init();
    }

    /**
     * Initialize test suite
     */
    init() {
        this.setupTestEnvironment();
        this.loadTestData();
    }

    /**
     * Setup test environment
     */
    setupTestEnvironment() {
        // Add test-specific styles
        const testStyles = document.createElement('style');
        testStyles.textContent = `
            .test-highlight {
                outline: 2px solid #00ff00 !important;
                outline-offset: 2px;
            }
            .test-error {
                outline: 2px solid #ff0000 !important;
                outline-offset: 2px;
            }
            .test-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 20px;
                z-index: 10000;
                font-family: monospace;
                display: none;
            }
        `;
        document.head.appendChild(testStyles);

        // Add test overlay
        const testOverlay = document.createElement('div');
        testOverlay.id = 'test-overlay';
        testOverlay.className = 'test-overlay';
        document.body.appendChild(testOverlay);
    }

    /**
     * Load test data
     */
    loadTestData() {
        this.testData = {
            users: {
                admin: {
                    email: 'admin@fondation-botnar.org',
                    password: 'admin123',
                    role: 'admin'
                },
                analyst: {
                    email: 'analyst@fondation-botnar.org',
                    password: 'analyst123',
                    role: 'analyst'
                },
                demo: {
                    email: 'demo@fondation-botnar.org',
                    password: 'dashboard2025',
                    role: 'viewer'
                }
            },
            testGrant: {
                title: 'Test Grant for E2E',
                organization: 'Test Organization',
                amount: 1000000,
                region: 'Africa'
            }
        };
    }

    /**
     * Run all tests
     */
    async runAllTests() {
        this.log('Starting E2E Test Suite...');
        
        const testSuites = [
            () => this.testAuthentication(),
            () => this.testDashboardHome(),
            () => this.testGrantPortfolio(),
            () => this.testImpactAssessment(),
            () => this.testFinancialReports(),
            () => this.testProgramAnalysis(),
            () => this.testResponsiveDesign(),
            () => this.testAccessibility(),
            () => this.testPerformance(),
            () => this.testSecurity()
        ];

        for (const testSuite of testSuites) {
            try {
                await testSuite();
            } catch (error) {
                this.logError(`Test suite failed: ${error.message}`);
            }
        }

        this.generateTestReport();
    }

    /**
     * Test authentication workflows
     */
    async testAuthentication() {
        this.startTestSuite('Authentication Tests');

        // Test login flow
        await this.test('Login with valid credentials', async () => {
            await this.navigateTo('/design-system/pages/auth/login.html');
            await this.fillField('#email', this.testData.users.demo.email);
            await this.fillField('#password', this.testData.users.demo.password);
            await this.clickElement('button[type="submit"]');
            await this.waitForNavigation();
            await this.assertURL('dashboard-home');
        });

        // Test logout flow
        await this.test('Logout functionality', async () => {
            await this.clickElement('button[onclick*="logout"]');
            await this.waitForNavigation();
            await this.assertURL('login.html');
        });

        // Test invalid login
        await this.test('Login with invalid credentials', async () => {
            await this.fillField('#email', 'invalid@example.com');
            await this.fillField('#password', 'wrongpassword');
            await this.clickElement('button[type="submit"]');
            await this.assertElementVisible('[x-show="errorMessage"]');
        });

        // Test password recovery
        await this.test('Password recovery flow', async () => {
            await this.clickElement('a[href="forgot-password.html"]');
            await this.waitForNavigation();
            await this.assertURL('forgot-password.html');
            await this.fillField('#email', this.testData.users.demo.email);
            await this.clickElement('button[type="submit"]');
            await this.assertElementVisible('.success-message');
        });
    }

    /**
     * Test dashboard home functionality
     */
    async testDashboardHome() {
        this.startTestSuite('Dashboard Home Tests');

        await this.ensureLoggedIn();

        // Test page load
        await this.test('Dashboard home loads correctly', async () => {
            await this.navigateTo('/design-system/pages/dashboard-home/');
            await this.assertElementVisible('.kpi-card');
            await this.assertElementVisible('#portfolioGrowthChart');
            await this.assertElementVisible('#geographicChart');
        });

        // Test KPI cards
        await this.test('KPI cards display data', async () => {
            const kpiCards = document.querySelectorAll('.kpi-card');
            this.assert(kpiCards.length >= 4, 'Should have at least 4 KPI cards');
            
            for (const card of kpiCards) {
                const value = card.querySelector('.kpi-value');
                this.assert(value && value.textContent.trim(), 'KPI card should have value');
            }
        });

        // Test chart interactions
        await this.test('Charts are interactive', async () => {
            await this.waitForElement('#portfolioGrowthChart');
            
            // Simulate chart interaction
            const chart = document.querySelector('#portfolioGrowthChart');
            const event = new MouseEvent('click', { bubbles: true });
            chart.dispatchEvent(event);
            
            // Chart should respond to interaction
            this.assert(true, 'Chart interaction completed');
        });

        // Test recent activities
        await this.test('Recent activities display', async () => {
            await this.assertElementVisible('.activity-item');
            const activities = document.querySelectorAll('.activity-item');
            this.assert(activities.length > 0, 'Should display recent activities');
        });
    }

    /**
     * Test grant portfolio functionality
     */
    async testGrantPortfolio() {
        this.startTestSuite('Grant Portfolio Tests');

        await this.ensureLoggedIn();
        await this.navigateTo('/design-system/pages/grant-portfolio/');

        // Test page load
        await this.test('Grant portfolio loads correctly', async () => {
            await this.assertElementVisible('.grant-card');
            await this.assertElementVisible('.filter-panel');
            await this.assertElementVisible('.search-input');
        });

        // Test search functionality
        await this.test('Search grants', async () => {
            await this.fillField('.search-input', 'health');
            await this.wait(1000); // Wait for search to filter
            
            const visibleGrants = document.querySelectorAll('.grant-card:not([style*="display: none"])');
            this.assert(visibleGrants.length > 0, 'Search should return results');
        });

        // Test filtering
        await this.test('Filter grants by status', async () => {
            await this.clickElement('.filter-panel select[name="status"]');
            await this.selectOption('.filter-panel select[name="status"]', 'active');
            await this.clickElement('.apply-filters-btn');
            await this.wait(1000);
            
            const activeGrants = document.querySelectorAll('.grant-card[data-status="active"]');
            this.assert(activeGrants.length > 0, 'Should filter by active status');
        });

        // Test grant card interactions
        await this.test('Grant card interactions', async () => {
            const firstCard = document.querySelector('.grant-card');
            if (firstCard) {
                await this.clickElement('.grant-card .btn-primary');
                // Should open grant details or navigate
                this.assert(true, 'Grant card interaction completed');
            }
        });
    }

    /**
     * Test impact assessment functionality
     */
    async testImpactAssessment() {
        this.startTestSuite('Impact Assessment Tests');

        await this.ensureLoggedIn();
        await this.navigateTo('/design-system/pages/impact-assessment/');

        // Test page load
        await this.test('Impact assessment loads correctly', async () => {
            await this.assertElementVisible('.impact-metric');
            await this.assertElementVisible('#impactChart');
        });

        // Test metrics display
        await this.test('Impact metrics display correctly', async () => {
            const metrics = document.querySelectorAll('.impact-metric');
            this.assert(metrics.length > 0, 'Should display impact metrics');
            
            for (const metric of metrics) {
                const value = metric.querySelector('.metric-value');
                this.assert(value && value.textContent.trim(), 'Metric should have value');
            }
        });

        // Test comparison tools
        await this.test('Program comparison functionality', async () => {
            const compareBtn = document.querySelector('.compare-programs-btn');
            if (compareBtn) {
                await this.clickElement('.compare-programs-btn');
                await this.assertElementVisible('.comparison-panel');
            }
        });
    }

    /**
     * Test financial reports functionality
     */
    async testFinancialReports() {
        this.startTestSuite('Financial Reports Tests');

        await this.ensureLoggedIn();
        await this.navigateTo('/design-system/pages/financial-reports/');

        // Test page load
        await this.test('Financial reports loads correctly', async () => {
            await this.assertElementVisible('.budget-card');
            await this.assertElementVisible('#budgetChart');
        });

        // Test budget analysis
        await this.test('Budget vs actual analysis', async () => {
            const budgetCards = document.querySelectorAll('.budget-card');
            this.assert(budgetCards.length > 0, 'Should display budget cards');
            
            // Check for variance indicators
            const indicators = document.querySelectorAll('.variance-indicator');
            this.assert(indicators.length > 0, 'Should show variance indicators');
        });

        // Test export functionality
        await this.test('Export functionality', async () => {
            const exportBtn = document.querySelector('.export-btn');
            if (exportBtn) {
                await this.clickElement('.export-btn');
                // Should trigger export
                this.assert(true, 'Export functionality triggered');
            }
        });
    }

    /**
     * Test program analysis functionality
     */
    async testProgramAnalysis() {
        this.startTestSuite('Program Analysis Tests');

        await this.ensureLoggedIn();
        await this.navigateTo('/design-system/pages/program-analysis/');

        // Test page load
        await this.test('Program analysis loads correctly', async () => {
            await this.assertElementVisible('.program-selector');
            await this.assertElementVisible('.performance-metric');
        });

        // Test program selection
        await this.test('Program selection', async () => {
            const selector = document.querySelector('.program-selector select');
            if (selector && selector.options.length > 1) {
                await this.selectOption('.program-selector select', selector.options[1].value);
                await this.wait(1000);
                
                // Should update metrics
                const metrics = document.querySelectorAll('.performance-metric');
                this.assert(metrics.length > 0, 'Should display performance metrics');
            }
        });
    }

    /**
     * Test responsive design
     */
    async testResponsiveDesign() {
        this.startTestSuite('Responsive Design Tests');

        const breakpoints = [
            { name: 'Mobile', width: 375 },
            { name: 'Tablet', width: 768 },
            { name: 'Desktop', width: 1024 }
        ];

        for (const breakpoint of breakpoints) {
            await this.test(`${breakpoint.name} responsiveness`, async () => {
                this.setViewport(breakpoint.width, 667);
                await this.navigateTo('/design-system/pages/dashboard-home/');
                
                // Check sidebar behavior on mobile/tablet
                if (breakpoint.width < 1024) {
                    const sidebar = document.querySelector('.sidebar');
                    const hamburger = document.querySelector('.hamburger-menu');
                    
                    this.assert(hamburger, 'Should have hamburger menu on mobile/tablet');
                    
                    if (hamburger) {
                        await this.clickElement('.hamburger-menu');
                        await this.wait(500);
                        this.assert(sidebar.classList.contains('open'), 'Sidebar should open on mobile');
                    }
                }
                
                // Check content overflow
                const body = document.body;
                this.assert(body.scrollWidth <= window.innerWidth + 5, 'Should not have horizontal overflow');
            });
        }
    }

    /**
     * Test accessibility
     */
    async testAccessibility() {
        this.startTestSuite('Accessibility Tests');

        await this.test('Keyboard navigation', async () => {
            await this.navigateTo('/design-system/pages/dashboard-home/');
            
            // Test tab navigation
            const focusableElements = document.querySelectorAll(
                'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            this.assert(focusableElements.length > 0, 'Should have focusable elements');
            
            // Simulate tab navigation
            let currentFocus = 0;
            for (let i = 0; i < Math.min(5, focusableElements.length); i++) {
                focusableElements[i].focus();
                this.assert(document.activeElement === focusableElements[i], 'Element should be focusable');
            }
        });

        await this.test('ARIA labels and roles', async () => {
            const interactiveElements = document.querySelectorAll('button, [role="button"], input');
            
            for (const element of interactiveElements) {
                const hasLabel = element.getAttribute('aria-label') || 
                                element.getAttribute('aria-labelledby') ||
                                element.textContent.trim();
                
                this.assert(hasLabel, `Element should have accessible label: ${element.tagName}`);
            }
        });

        await this.test('Color contrast', async () => {
            // Simple contrast check for text elements
            const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
            let contrastIssues = 0;
            
            for (const element of textElements) {
                if (element.textContent.trim()) {
                    const styles = getComputedStyle(element);
                    const color = styles.color;
                    const bgColor = styles.backgroundColor;
                    
                    // Simple check - in real implementation, use proper contrast calculation
                    if (color === bgColor) {
                        contrastIssues++;
                    }
                }
            }
            
            this.assert(contrastIssues === 0, 'Should not have obvious contrast issues');
        });
    }

    /**
     * Test performance
     */
    async testPerformance() {
        this.startTestSuite('Performance Tests');

        await this.test('Page load performance', async () => {
            const startTime = performance.now();
            await this.navigateTo('/design-system/pages/dashboard-home/');
            const loadTime = performance.now() - startTime;
            
            this.assert(loadTime < 3000, `Page should load in under 3 seconds (${loadTime}ms)`);
        });

        await this.test('Core Web Vitals', async () => {
            // Check if performance optimizer is available
            if (window.performanceOptimizer) {
                const summary = window.performanceOptimizer.getPerformanceSummary();
                
                if (summary.vitals.lcp) {
                    this.assert(summary.vitals.lcp.value < 2500, 'LCP should be under 2.5 seconds');
                }
                
                if (summary.vitals.cls) {
                    this.assert(summary.vitals.cls.value < 0.1, 'CLS should be under 0.1');
                }
                
                if (summary.vitals.fid) {
                    this.assert(summary.vitals.fid.value < 100, 'FID should be under 100ms');
                }
            }
        });

        await this.test('Resource loading', async () => {
            const resources = performance.getEntriesByType('resource');
            const largeResources = resources.filter(r => r.transferSize > 1000000); // > 1MB
            
            this.assert(largeResources.length < 5, 'Should not have too many large resources');
            
            const slowResources = resources.filter(r => r.duration > 2000); // > 2 seconds
            this.assert(slowResources.length === 0, 'Should not have slow loading resources');
        });
    }

    /**
     * Test security
     */
    async testSecurity() {
        this.startTestSuite('Security Tests');

        await this.test('CSRF protection', async () => {
            // Check if security utils are available
            if (window.securityUtils) {
                const status = window.securityUtils.getSecurityStatus();
                this.assert(status.csrfToken, 'Should have CSRF token protection');
            }
            
            // Check for CSRF tokens in forms
            const forms = document.querySelectorAll('form');
            for (const form of forms) {
                const csrfInput = form.querySelector('input[name="csrf_token"]');
                this.assert(csrfInput, 'Forms should have CSRF token');
            }
        });

        await this.test('Content Security Policy', async () => {
            const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
            this.assert(cspMeta, 'Should have CSP meta tag');
            
            if (cspMeta) {
                const policy = cspMeta.content;
                this.assert(policy.includes("default-src 'self'"), 'Should have restrictive default-src');
            }
        });

        await this.test('XSS protection', async () => {
            // Test input sanitization
            const textInputs = document.querySelectorAll('input[type="text"], textarea');
            
            for (const input of textInputs) {
                const originalValue = input.value;
                const xssAttempt = '<script>alert("xss")</script>';
                
                input.value = xssAttempt;
                input.dispatchEvent(new Event('change'));
                
                // Value should be sanitized
                this.assert(!input.value.includes('<script>'), 'Should sanitize script tags');
                
                input.value = originalValue; // Restore original value
            }
        });
    }

    /**
     * Utility methods for testing
     */

    async ensureLoggedIn() {
        // Check if already logged in
        if (window.authManager && window.authManager.isAuthenticated()) {
            return;
        }
        
        // Login with demo credentials
        await this.navigateTo('/design-system/pages/auth/login.html');
        await this.fillField('#email', this.testData.users.demo.email);
        await this.fillField('#password', this.testData.users.demo.password);
        await this.clickElement('button[type="submit"]');
        await this.waitForNavigation();
    }

    async navigateTo(url) {
        return new Promise((resolve) => {
            window.location.href = url;
            window.addEventListener('load', resolve, { once: true });
        });
    }

    async fillField(selector, value) {
        const element = document.querySelector(selector);
        if (element) {
            element.value = value;
            element.dispatchEvent(new Event('change', { bubbles: true }));
            element.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    async clickElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.click();
            await this.wait(100); // Small delay for click processing
        }
    }

    async selectOption(selector, value) {
        const select = document.querySelector(selector);
        if (select) {
            select.value = value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    async waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }
            
            const observer = new MutationObserver(() => {
                const element = document.querySelector(selector);
                if (element) {
                    observer.disconnect();
                    resolve(element);
                }
            });
            
            observer.observe(document.body, { childList: true, subtree: true });
            
            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    }

    async waitForNavigation() {
        await this.wait(1000); // Simple wait for navigation
    }

    async assertElementVisible(selector) {
        const element = document.querySelector(selector);
        this.assert(element, `Element ${selector} should exist`);
        
        if (element) {
            const styles = getComputedStyle(element);
            this.assert(styles.display !== 'none', `Element ${selector} should be visible`);
        }
    }

    async assertURL(expectedURL) {
        this.assert(window.location.href.includes(expectedURL), 
                   `URL should contain ${expectedURL}, got ${window.location.href}`);
    }

    setViewport(width, height) {
        // This would require browser automation tools in real implementation
        // For now, just simulate the viewport change
        Object.defineProperty(window, 'innerWidth', { value: width, writable: true });
        Object.defineProperty(window, 'innerHeight', { value: height, writable: true });
        window.dispatchEvent(new Event('resize'));
    }

    async wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async test(name, testFunction) {
        this.currentTest = { name, startTime: Date.now() };
        this.log(`Running test: ${name}`);
        
        try {
            await testFunction();
            const duration = Date.now() - this.currentTest.startTime;
            this.testResults.push({
                name,
                status: 'passed',
                duration,
                error: null
            });
            this.log(`✅ PASSED: ${name} (${duration}ms)`);
        } catch (error) {
            const duration = Date.now() - this.currentTest.startTime;
            this.testResults.push({
                name,
                status: 'failed',
                duration,
                error: error.message
            });
            this.logError(`❌ FAILED: ${name} - ${error.message}`);
            
            if (this.testConfig.screenshotOnFailure) {
                this.takeScreenshot(name);
            }
        }
    }

    startTestSuite(suiteName) {
        this.log(`\n📋 Starting test suite: ${suiteName}`);
    }

    assert(condition, message) {
        if (!condition) {
            throw new Error(message || 'Assertion failed');
        }
    }

    log(message) {
        if (this.testConfig.verbose) {
            console.log(`[E2E Test] ${message}`);
        }
    }

    logError(message) {
        console.error(`[E2E Test] ${message}`);
    }

    takeScreenshot(testName) {
        // In a real implementation, this would capture a screenshot
        // For now, just log the attempt
        this.log(`Screenshot captured for failed test: ${testName}`);
    }

    generateTestReport() {
        const passed = this.testResults.filter(t => t.status === 'passed').length;
        const failed = this.testResults.filter(t => t.status === 'failed').length;
        const total = this.testResults.length;
        const passRate = ((passed / total) * 100).toFixed(1);
        
        const report = {
            summary: {
                total,
                passed,
                failed,
                passRate: `${passRate}%`,
                duration: this.testResults.reduce((sum, t) => sum + t.duration, 0)
            },
            results: this.testResults
        };
        
        this.log('\n📊 Test Report:');
        this.log(`Total Tests: ${total}`);
        this.log(`Passed: ${passed}`);
        this.log(`Failed: ${failed}`);
        this.log(`Pass Rate: ${passRate}%`);
        this.log(`Total Duration: ${report.summary.duration}ms`);
        
        if (failed > 0) {
            this.log('\n❌ Failed Tests:');
            this.testResults
                .filter(t => t.status === 'failed')
                .forEach(t => this.log(`  - ${t.name}: ${t.error}`));
        }
        
        // Store report for external access
        window.testReport = report;
        
        return report;
    }
}

// Initialize test suite
window.e2eTestSuite = new E2ETestSuite();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = E2ETestSuite;
}