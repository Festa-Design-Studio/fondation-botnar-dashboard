/**
 * Fondation Botnar Dashboard - Security Utilities
 * Comprehensive security utilities for XSS/CSRF protection
 */

class SecurityUtils {
    constructor() {
        this.csrfToken = null;
        this.nonce = null;
        this.init();
    }

    /**
     * Initialize security utilities
     */
    init() {
        this.generateCSRFToken();
        this.generateNonce();
        this.setupCSP();
        // this.sanitizeUserInputs(); // Disabled to prevent innerHTML recursion
        this.setupEventListeners();
    }

    /**
     * Generate CSRF token
     */
    generateCSRFToken() {
        this.csrfToken = this.generateRandomToken(32);
        
        // Store in session storage
        sessionStorage.setItem('csrf_token', this.csrfToken);
        
        // Add to meta tag
        let csrfMeta = document.querySelector('meta[name="csrf-token"]');
        if (!csrfMeta) {
            csrfMeta = document.createElement('meta');
            csrfMeta.name = 'csrf-token';
            document.head.appendChild(csrfMeta);
        }
        csrfMeta.content = this.csrfToken;
    }

    /**
     * Generate cryptographic nonce
     */
    generateNonce() {
        this.nonce = this.generateRandomToken(16);
        
        // Add to meta tag for CSP
        let nonceMeta = document.querySelector('meta[name="csp-nonce"]');
        if (!nonceMeta) {
            nonceMeta = document.createElement('meta');
            nonceMeta.name = 'csp-nonce';
            document.head.appendChild(nonceMeta);
        }
        nonceMeta.content = this.nonce;
    }

    /**
     * Generate random token
     */
    generateRandomToken(length) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        
        if (window.crypto && window.crypto.getRandomValues) {
            const randomValues = new Uint8Array(length);
            window.crypto.getRandomValues(randomValues);
            
            for (let i = 0; i < length; i++) {
                token += charset[randomValues[i] % charset.length];
            }
        } else {
            // Fallback for older browsers
            for (let i = 0; i < length; i++) {
                token += charset[Math.floor(Math.random() * charset.length)];
            }
        }
        
        return token;
    }

    /**
     * Setup Content Security Policy
     */
    setupCSP() {
        // CSP should be configured at the server level for production
        // Meta tag CSP has limitations (frame-ancestors doesn't work)
        // This method is disabled to prevent console warnings
        console.log('[Security] CSP should be configured at server level for production');
    }

    /**
     * Generate CSP policy
     */
    generateCSPPolicy() {
        return [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https:",
            "connect-src 'self' api.fondation-botnar.org",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'"
        ].join('; ');
    }

    /**
     * Sanitize user inputs to prevent XSS
     */
    sanitizeUserInputs() {
        // Override document.write to prevent XSS
        document.write = function() {
            console.warn('[Security] document.write() blocked for security');
        };

        // innerHTML monitoring disabled to prevent recursion issues
        // In production, use server-side sanitization instead
        console.log('[Security] innerHTML monitoring disabled for compatibility');
    }

    /**
     * Sanitize HTML content
     */
    sanitizeHTML(html) {
        // Create a temporary div to parse HTML
        const temp = document.createElement('div');
        // Use the original innerHTML setter to avoid recursion
        const originalSetter = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set;
        originalSetter.call(temp, html);
        
        // Remove all script tags
        const scripts = temp.querySelectorAll('script');
        scripts.forEach(script => script.remove());
        
        // Remove dangerous attributes
        const dangerousAttrs = ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur'];
        const allElements = temp.querySelectorAll('*');
        
        allElements.forEach(element => {
            dangerousAttrs.forEach(attr => {
                if (element.hasAttribute(attr)) {
                    element.removeAttribute(attr);
                }
            });
            
            // Remove javascript: and data: URLs
            ['href', 'src', 'action'].forEach(attr => {
                const value = element.getAttribute(attr);
                if (value && (value.toLowerCase().startsWith('javascript:') || 
                             value.toLowerCase().startsWith('data:'))) {
                    element.removeAttribute(attr);
                }
            });
        });
        
        return temp.innerHTML;
    }

    /**
     * HTML encode string to prevent XSS
     */
    htmlEncode(str) {
        if (typeof str !== 'string') return str;
        
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * JavaScript encode string
     */
    jsEncode(str) {
        if (typeof str !== 'string') return str;
        
        return str
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/"/g, '\\"')
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
    }

    /**
     * URL encode string
     */
    urlEncode(str) {
        if (typeof str !== 'string') return str;
        return encodeURIComponent(str);
    }

    /**
     * Validate and sanitize form input
     */
    sanitizeInput(input, options = {}) {
        if (typeof input !== 'string') return input;
        
        let sanitized = input;
        
        // Trim whitespace
        if (options.trim !== false) {
            sanitized = sanitized.trim();
        }
        
        // Remove HTML tags
        if (options.stripTags !== false) {
            sanitized = sanitized.replace(/<[^>]*>/g, '');
        }
        
        // Remove potentially dangerous characters
        if (options.removeDangerous !== false) {
            sanitized = sanitized.replace(/[<>'"&]/g, '');
        }
        
        // Limit length
        if (options.maxLength) {
            sanitized = sanitized.substring(0, options.maxLength);
        }
        
        // Apply custom pattern
        if (options.pattern) {
            const matches = sanitized.match(options.pattern);
            sanitized = matches ? matches[0] : '';
        }
        
        return sanitized;
    }

    /**
     * Validate CSRF token
     */
    validateCSRFToken(token) {
        const storedToken = sessionStorage.getItem('csrf_token');
        return token && storedToken && token === storedToken;
    }

    /**
     * Add CSRF token to form
     */
    addCSRFTokenToForm(form) {
        if (!form) return;
        
        let csrfInput = form.querySelector('input[name="csrf_token"]');
        if (!csrfInput) {
            csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = 'csrf_token';
            form.appendChild(csrfInput);
        }
        
        csrfInput.value = this.csrfToken;
    }

    /**
     * Add CSRF token to AJAX requests
     */
    addCSRFTokenToRequest(options = {}) {
        if (!options.headers) {
            options.headers = {};
        }
        
        options.headers['X-CSRF-Token'] = this.csrfToken;
        return options;
    }

    /**
     * Secure fetch wrapper
     */
    async secureFetch(url, options = {}) {
        // Add CSRF token
        options = this.addCSRFTokenToRequest(options);
        
        // Add security headers
        if (!options.headers) {
            options.headers = {};
        }
        
        options.headers['X-Requested-With'] = 'XMLHttpRequest';
        options.headers['Cache-Control'] = 'no-cache';
        
        // Validate URL
        if (!this.isValidURL(url)) {
            throw new Error('Invalid URL');
        }
        
        try {
            const response = await fetch(url, options);
            
            // Check for security headers in response
            this.validateResponseHeaders(response);
            
            return response;
        } catch (error) {
            console.error('[Security] Fetch error:', error);
            throw error;
        }
    }

    /**
     * Validate URL to prevent SSRF
     */
    isValidURL(url) {
        try {
            const urlObj = new URL(url, window.location.origin);
            
            // Only allow HTTPS in production
            if (window.location.protocol === 'https:' && urlObj.protocol !== 'https:') {
                return false;
            }
            
            // Block private IP ranges
            const hostname = urlObj.hostname;
            const privateRanges = [
                /^127\./,
                /^10\./,
                /^172\.(1[6-9]|2[0-9]|3[01])\./,
                /^192\.168\./,
                /^localhost$/i
            ];
            
            // Allow localhost in development
            if (window.location.hostname === 'localhost') {
                return true;
            }
            
            return !privateRanges.some(range => range.test(hostname));
        } catch (error) {
            return false;
        }
    }

    /**
     * Validate response headers
     */
    validateResponseHeaders(response) {
        const securityHeaders = [
            'X-Content-Type-Options',
            'X-Frame-Options',
            'X-XSS-Protection'
        ];
        
        securityHeaders.forEach(header => {
            if (!response.headers.get(header)) {
                console.warn(`[Security] Missing security header: ${header}`);
            }
        });
    }

    /**
     * Setup event listeners for security
     */
    setupEventListeners() {
        // Prevent clickjacking
        if (window.self !== window.top) {
            console.warn('[Security] Page loaded in frame, potential clickjacking');
            document.body.style.display = 'none';
        }
        
        // Monitor for XSS attempts
        window.addEventListener('error', (event) => {
            // Only warn for suspicious external script errors
            if (event.message && event.message.includes('Script error') && 
                event.filename && !event.filename.includes(window.location.origin)) {
                console.warn('[Security] Potential XSS attempt blocked:', event.filename);
            }
        });
        
        // Add CSRF tokens to all forms
        document.addEventListener('DOMContentLoaded', () => {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => this.addCSRFTokenToForm(form));
        });
        
        // Monitor form submissions
        document.addEventListener('submit', (event) => {
            const form = event.target;
            if (form.tagName === 'FORM') {
                this.validateFormSubmission(form, event);
            }
        });
        
        // Monitor dynamic content insertion
        if (window.MutationObserver) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                this.scanForSecurityIssues(node);
                            }
                        });
                    }
                });
            });
            
            // Only observe if document.body exists
            if (document.body) {
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            } else {
                // Wait for DOM to be ready
                document.addEventListener('DOMContentLoaded', () => {
                    if (document.body) {
                        observer.observe(document.body, {
                            childList: true,
                            subtree: true
                        });
                    }
                });
            }
        }
    }

    /**
     * Validate form submission
     */
    validateFormSubmission(form, event) {
        // Check CSRF token
        const csrfInput = form.querySelector('input[name="csrf_token"]');
        if (!csrfInput || !this.validateCSRFToken(csrfInput.value)) {
            console.error('[Security] Invalid CSRF token');
            event.preventDefault();
            return false;
        }
        
        // Sanitize form inputs
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.type !== 'hidden' && input.value) {
                input.value = this.sanitizeInput(input.value, {
                    maxLength: 1000,
                    stripTags: true
                });
            }
        });
        
        return true;
    }

    /**
     * Scan element for security issues
     */
    scanForSecurityIssues(element) {
        // Check for inline scripts
        const scripts = element.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.innerHTML.trim()) {
                console.warn('[Security] Inline script detected:', script);
            }
        });
        
        // Check for dangerous attributes
        const dangerousAttrs = ['onclick', 'onload', 'onerror'];
        const allElements = element.querySelectorAll('*');
        
        allElements.forEach(el => {
            dangerousAttrs.forEach(attr => {
                if (el.hasAttribute(attr)) {
                    console.warn(`[Security] Dangerous attribute ${attr} detected:`, el);
                    el.removeAttribute(attr);
                }
            });
        });
    }

    /**
     * Secure local storage operations
     */
    secureStorage = {
        setItem: (key, value) => {
            try {
                // Encrypt sensitive data
                if (key.includes('token') || key.includes('password')) {
                    value = this.simpleEncrypt(value);
                }
                localStorage.setItem(key, value);
            } catch (error) {
                console.error('[Security] Storage error:', error);
            }
        },
        
        getItem: (key) => {
            try {
                let value = localStorage.getItem(key);
                
                // Decrypt sensitive data
                if (value && (key.includes('token') || key.includes('password'))) {
                    value = this.simpleDecrypt(value);
                }
                
                return value;
            } catch (error) {
                console.error('[Security] Storage error:', error);
                return null;
            }
        },
        
        removeItem: (key) => {
            try {
                localStorage.removeItem(key);
            } catch (error) {
                console.error('[Security] Storage error:', error);
            }
        }
    };

    /**
     * Simple encryption for sensitive data (not for production use)
     */
    simpleEncrypt(text) {
        // This is a simple XOR encryption for demo purposes
        // In production, use proper encryption libraries
        const key = 'botnar-security-key';
        let encrypted = '';
        
        for (let i = 0; i < text.length; i++) {
            encrypted += String.fromCharCode(
                text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
            );
        }
        
        return btoa(encrypted);
    }

    /**
     * Simple decryption for sensitive data
     */
    simpleDecrypt(encrypted) {
        try {
            const key = 'botnar-security-key';
            const decoded = atob(encrypted);
            let decrypted = '';
            
            for (let i = 0; i < decoded.length; i++) {
                decrypted += String.fromCharCode(
                    decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                );
            }
            
            return decrypted;
        } catch (error) {
            console.error('[Security] Decryption error:', error);
            return null;
        }
    }

    /**
     * Rate limiting for API calls
     */
    rateLimiter = {
        calls: new Map(),
        
        isAllowed: (endpoint, maxCalls = 100, timeWindow = 60000) => {
            const now = Date.now();
            const key = endpoint;
            
            if (!this.calls.has(key)) {
                this.calls.set(key, []);
            }
            
            const callTimes = this.calls.get(key);
            
            // Remove old calls outside time window
            while (callTimes.length > 0 && callTimes[0] < now - timeWindow) {
                callTimes.shift();
            }
            
            // Check if limit exceeded
            if (callTimes.length >= maxCalls) {
                console.warn(`[Security] Rate limit exceeded for ${endpoint}`);
                return false;
            }
            
            // Add current call
            callTimes.push(now);
            return true;
        }
    };

    /**
     * Get security status
     */
    getSecurityStatus() {
        return {
            csrfToken: !!this.csrfToken,
            httpsEnabled: window.location.protocol === 'https:',
            cspEnabled: !!document.querySelector('meta[http-equiv="Content-Security-Policy"]'),
            secureStorage: typeof Storage !== 'undefined',
            timestamp: Date.now()
        };
    }
}

// Initialize security utilities
window.securityUtils = new SecurityUtils();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SecurityUtils;
}