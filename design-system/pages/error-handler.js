/**
 * Error Handler for Fondation Botnar Dashboard
 * Provides comprehensive error handling, user-friendly messages, and error recovery
 */

class ErrorHandler {
    constructor() {
        this.errors = new Map();
        this.subscribers = new Set();
        this.retryQueues = new Map();
        this.globalErrorCount = 0;
        
        // Error type mappings
        this.errorTypes = {
            NETWORK: 'network',
            API: 'api',
            VALIDATION: 'validation',
            PERMISSION: 'permission',
            TIMEOUT: 'timeout',
            UNKNOWN: 'unknown'
        };
        
        // User-friendly error messages
        this.userMessages = {
            network: 'Unable to connect to the server. Please check your internet connection.',
            api: 'The server encountered an error. Please try again in a moment.',
            validation: 'The data provided is invalid. Please check your input.',
            permission: 'You do not have permission to perform this action.',
            timeout: 'The request took too long to complete. Please try again.',
            unknown: 'An unexpected error occurred. Please try again.'
        };
        
        // Initialize global error handling
        this.initializeGlobalHandlers();
    }

    /**
     * Initialize global error handlers
     */
    initializeGlobalHandlers() {
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, 'global', 'unhandled_promise');
            event.preventDefault();
        });

        // JavaScript errors
        window.addEventListener('error', (event) => {
            this.handleError(event.error, 'global', 'javascript_error');
        });

        // Network errors for fetch requests
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
                const response = await originalFetch(...args);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response;
            } catch (error) {
                this.handleNetworkError(error, args[0]);
                throw error;
            }
        };
    }

    /**
     * Main error handling method
     */
    handleError(error, context = 'unknown', category = 'unknown') {
        // Handle null or undefined errors
        if (!error) {
            error = new Error('Unknown error occurred');
        }
        
        const errorId = this.generateErrorId();
        const errorType = this.determineErrorType(error);
        
        const errorInfo = {
            id: errorId,
            error: error,
            message: error.message || error.toString() || 'Unknown error',
            type: errorType,
            context: context,
            category: category,
            timestamp: Date.now(),
            userMessage: this.getUserFriendlyMessage(errorType, error),
            stack: error.stack,
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        // Store error
        this.errors.set(errorId, errorInfo);
        this.globalErrorCount++;

        // Log error for debugging
        this.logError(errorInfo);

        // Notify subscribers
        this.notifySubscribers(errorInfo);

        // Show user notification
        this.showUserNotification(errorInfo);

        // Track error analytics
        this.trackError(errorInfo);

        return errorId;
    }

    /**
     * Handle API errors specifically
     */
    handleAPIError(error, endpoint, context = {}) {
        const errorId = this.handleError(error, `api:${endpoint}`, 'api');
        
        // Add API-specific context
        const errorInfo = this.errors.get(errorId);
        errorInfo.endpoint = endpoint;
        errorInfo.requestContext = context;
        
        // Determine if retry is appropriate
        if (this.shouldRetry(error)) {
            this.scheduleRetry(endpoint, context);
        }
        
        return errorId;
    }

    /**
     * Handle network errors
     */
    handleNetworkError(error, url) {
        const errorId = this.handleError(error, `network:${url}`, 'network');
        
        // Check if offline
        if (!navigator.onLine) {
            this.handleOfflineError();
        }
        
        return errorId;
    }

    /**
     * Handle validation errors
     */
    handleValidationError(errors, context = '') {
        const errorId = this.generateErrorId();
        
        const errorInfo = {
            id: errorId,
            type: this.errorTypes.VALIDATION,
            context: context,
            category: 'validation',
            errors: errors,
            timestamp: Date.now(),
            userMessage: 'Please check the form data and correct any errors.',
            url: window.location.href
        };

        this.errors.set(errorId, errorInfo);
        this.notifySubscribers(errorInfo);
        
        return errorId;
    }

    /**
     * Determine error type from error object
     */
    determineErrorType(error) {
        // Handle null or undefined error objects
        if (!error) {
            return this.errorTypes.UNKNOWN;
        }
        
        const errorName = error.name || '';
        const errorMessage = error.message || '';
        
        if (errorName === 'TypeError' && errorMessage.includes('fetch')) {
            return this.errorTypes.NETWORK;
        }
        
        if (errorMessage.includes('HTTP 4')) {
            if (errorMessage.includes('401') || errorMessage.includes('403')) {
                return this.errorTypes.PERMISSION;
            }
            return this.errorTypes.API;
        }
        
        if (errorMessage.includes('HTTP 5')) {
            return this.errorTypes.API;
        }
        
        if (errorMessage.includes('timeout')) {
            return this.errorTypes.TIMEOUT;
        }
        
        if (errorName === 'ValidationError') {
            return this.errorTypes.VALIDATION;
        }
        
        return this.errorTypes.UNKNOWN;
    }

    /**
     * Get user-friendly error message
     */
    getUserFriendlyMessage(errorType, error) {
        // Check for specific error codes/messages
        if (error.message.includes('401')) {
            return 'Your session has expired. Please log in again.';
        }
        
        if (error.message.includes('403')) {
            return 'You do not have permission to access this resource.';
        }
        
        if (error.message.includes('404')) {
            return 'The requested resource could not be found.';
        }
        
        if (error.message.includes('500')) {
            return 'The server is experiencing issues. Please try again later.';
        }
        
        // Return generic message for error type
        return this.userMessages[errorType] || this.userMessages.unknown;
    }

    /**
     * Show user notification
     */
    showUserNotification(errorInfo) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 bg-red-500 text-white max-w-md`;
        
        notification.innerHTML = `
            <div class="flex items-start">
                <svg class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                <div class="flex-1">
                    <p class="font-medium">Error</p>
                    <p class="text-sm opacity-90">${errorInfo.userMessage}</p>
                    ${this.shouldShowRetry(errorInfo) ? `
                        <button onclick="window.errorHandler.retryLastAction('${errorInfo.id}')" 
                                class="mt-2 text-sm underline hover:no-underline">
                            Try Again
                        </button>
                    ` : ''}
                </div>
                <button onclick="this.parentElement.parentElement.remove()" 
                        class="ml-3 text-white hover:text-gray-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 7 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 7000);
    }

    /**
     * Determine if retry should be offered
     */
    shouldShowRetry(errorInfo) {
        return ['network', 'api', 'timeout'].includes(errorInfo.type) && 
               !errorInfo.context.includes('permission');
    }

    /**
     * Determine if automatic retry should be attempted
     */
    shouldRetry(error) {
        const retryableErrors = [
            'network',
            'timeout',
            'fetch'
        ];
        
        return retryableErrors.some(type => 
            error.message.toLowerCase().includes(type)
        );
    }

    /**
     * Schedule automatic retry
     */
    scheduleRetry(endpoint, context, attempt = 1) {
        const maxAttempts = 3;
        const backoffDelay = Math.pow(2, attempt) * 1000; // Exponential backoff
        
        if (attempt > maxAttempts) {
            console.warn(`Max retry attempts reached for ${endpoint}`);
            return;
        }
        
        if (!this.retryQueues.has(endpoint)) {
            this.retryQueues.set(endpoint, []);
        }
        
        const retryId = setTimeout(() => {
            this.executeRetry(endpoint, context, attempt);
        }, backoffDelay);
        
        this.retryQueues.get(endpoint).push(retryId);
    }

    /**
     * Execute retry attempt
     */
    async executeRetry(endpoint, context, attempt) {
        try {
            // This would integrate with DataManager
            if (window.dataManager) {
                await window.dataManager.fetchData(endpoint, { 
                    useCache: false,
                    retries: 0 // Prevent recursive retries
                });
            }
            
            // Clear retry queue on success
            this.clearRetryQueue(endpoint);
            
        } catch (error) {
            this.scheduleRetry(endpoint, context, attempt + 1);
        }
    }

    /**
     * Clear retry queue for endpoint
     */
    clearRetryQueue(endpoint) {
        if (this.retryQueues.has(endpoint)) {
            const retryIds = this.retryQueues.get(endpoint);
            retryIds.forEach(id => clearTimeout(id));
            this.retryQueues.delete(endpoint);
        }
    }

    /**
     * Manual retry last action
     */
    retryLastAction(errorId) {
        const errorInfo = this.errors.get(errorId);
        if (!errorInfo) return;
        
        if (errorInfo.endpoint) {
            this.executeRetry(errorInfo.endpoint, errorInfo.requestContext || {}, 1);
        } else if (errorInfo.context.includes('network:')) {
            const url = errorInfo.context.replace('network:', '');
            window.location.reload();
        }
    }

    /**
     * Handle offline scenarios
     */
    handleOfflineError() {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg bg-orange-500 text-white max-w-md`;
        notification.id = 'offline-notification';
        
        notification.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 3v6m0 6v6"/>
                </svg>
                <div>
                    <p class="font-medium">No Internet Connection</p>
                    <p class="text-sm opacity-90">Working in offline mode</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Listen for online event
        window.addEventListener('online', () => {
            const offlineNotification = document.getElementById('offline-notification');
            if (offlineNotification) {
                offlineNotification.remove();
            }
            
            // Refresh data when back online
            if (window.dataManager) {
                window.dataManager.refreshAll();
            }
        }, { once: true });
    }

    /**
     * Log error for debugging
     */
    logError(errorInfo) {
        console.group(`🚨 Error ${errorInfo.id}`);
        console.error('Message:', errorInfo.message);
        console.error('Type:', errorInfo.type);
        console.error('Context:', errorInfo.context);
        console.error('Timestamp:', new Date(errorInfo.timestamp).toISOString());
        if (errorInfo.stack) {
            console.error('Stack:', errorInfo.stack);
        }
        console.groupEnd();
    }

    /**
     * Track error for analytics
     */
    trackError(errorInfo) {
        // This would integrate with analytics service
        if (window.analytics) {
            window.analytics.track('Error Occurred', {
                errorId: errorInfo.id,
                errorType: errorInfo.type,
                context: errorInfo.context,
                userMessage: errorInfo.userMessage,
                timestamp: errorInfo.timestamp
            });
        }
    }

    /**
     * Subscribe to error events
     */
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    /**
     * Notify subscribers of new errors
     */
    notifySubscribers(errorInfo) {
        this.subscribers.forEach(callback => {
            try {
                callback(errorInfo);
            } catch (error) {
                console.error('Error subscriber callback failed:', error);
            }
        });
    }

    /**
     * Get error statistics
     */
    getErrorStats() {
        const errors = Array.from(this.errors.values());
        const last24Hours = Date.now() - (24 * 60 * 60 * 1000);
        
        return {
            total: this.globalErrorCount,
            recent: errors.filter(e => e.timestamp > last24Hours).length,
            byType: this.groupErrorsByType(errors),
            byContext: this.groupErrorsByContext(errors)
        };
    }

    /**
     * Group errors by type
     */
    groupErrorsByType(errors) {
        return errors.reduce((acc, error) => {
            acc[error.type] = (acc[error.type] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Group errors by context
     */
    groupErrorsByContext(errors) {
        return errors.reduce((acc, error) => {
            const context = error.context.split(':')[0];
            acc[context] = (acc[context] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Clear old errors (memory management)
     */
    cleanup() {
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        
        for (const [id, error] of this.errors.entries()) {
            if (error.timestamp < oneWeekAgo) {
                this.errors.delete(id);
            }
        }
    }

    /**
     * Generate unique error ID
     */
    generateErrorId() {
        return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Health check method
     */
    getHealthStatus() {
        const stats = this.getErrorStats();
        const recentErrorRate = stats.recent / 24; // errors per hour
        
        return {
            status: recentErrorRate > 5 ? 'unhealthy' : 'healthy',
            errorRate: recentErrorRate,
            totalErrors: stats.total,
            recentErrors: stats.recent,
            activeRetries: this.retryQueues.size
        };
    }
}

// Global error handler instance
window.errorHandler = new ErrorHandler();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ErrorHandler;
}