/**
 * Loading Components for Fondation Botnar Dashboard
 * Provides skeleton loaders, progress indicators, and loading states
 */

const LoadingComponents = {
    /**
     * Skeleton loader for KPI cards
     */
    kpiCardSkeleton: `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                    <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
                <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            <div class="mt-4 flex items-center">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 mr-2"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
        </div>
    `,

    /**
     * Skeleton loader for grant cards
     */
    grantCardSkeleton: `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
            <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div class="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            
            <div class="space-y-3 mb-4">
                <div class="flex justify-between">
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </div>
                <div class="flex justify-between">
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
                <div class="flex justify-between">
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </div>
            </div>
            
            <div class="mb-4">
                <div class="flex justify-between mb-2">
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10"></div>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"></div>
            </div>
            
            <div class="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div class="flex space-x-2">
                    <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        </div>
    `,

    /**
     * Skeleton loader for charts
     */
    chartSkeleton: `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
            <div class="flex items-center justify-between mb-4">
                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                <div class="flex space-x-2">
                    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
                    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
                    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
                </div>
            </div>
            <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
    `,

    /**
     * Skeleton loader for activity items
     */
    activitySkeleton: `
        <div class="flex items-start space-x-3 animate-pulse">
            <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0"></div>
            <div class="flex-1">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
        </div>
    `,

    /**
     * Progress spinner component
     */
    spinner: `
        <div class="inline-flex items-center">
            <svg class="animate-spin h-5 w-5 text-botnar-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    `,

    /**
     * Loading overlay for full content areas
     */
    loadingOverlay: `
        <div class="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center z-10">
            <div class="text-center">
                <svg class="animate-spin h-8 w-8 text-botnar-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="text-sm text-gray-600 dark:text-gray-400">Loading data...</p>
            </div>
        </div>
    `,

    /**
     * Progress bar component
     */
    progressBar: (progress, label = 'Loading...') => `
        <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${label}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">${progress}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-botnar-blue-600 h-2 rounded-full transition-all duration-300" style="width: ${progress}%"></div>
            </div>
        </div>
    `,

    /**
     * Error state component
     */
    errorState: (message, retry = null) => `
        <div class="text-center py-8">
            <svg class="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Something went wrong</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">${message}</p>
            ${retry ? `<button onclick="${retry}" class="btn-primary">Try Again</button>` : ''}
        </div>
    `,

    /**
     * Empty state component
     */
    emptyState: (title, description, action = null) => `
        <div class="text-center py-12">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"/>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">${title}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">${description}</p>
            ${action ? action : ''}
        </div>
    `
};

/**
 * Loading Manager - Handles loading state coordination
 */
class LoadingManager {
    constructor() {
        this.loadingStates = new Map();
        this.subscribers = new Set();
    }

    /**
     * Set loading state for a component
     */
    setLoading(componentId, isLoading, message = 'Loading...') {
        this.loadingStates.set(componentId, {
            isLoading,
            message,
            timestamp: Date.now()
        });
        
        this.notifySubscribers(componentId, isLoading, message);
    }

    /**
     * Check if component is loading
     */
    isLoading(componentId) {
        const state = this.loadingStates.get(componentId);
        return state ? state.isLoading : false;
    }

    /**
     * Get loading message for component
     */
    getLoadingMessage(componentId) {
        const state = this.loadingStates.get(componentId);
        return state ? state.message : '';
    }

    /**
     * Subscribe to loading state changes
     */
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    /**
     * Notify subscribers of state changes
     */
    notifySubscribers(componentId, isLoading, message) {
        this.subscribers.forEach(callback => {
            try {
                callback({ componentId, isLoading, message });
            } catch (error) {
                console.error('Loading manager subscriber error:', error);
            }
        });
    }

    /**
     * Show skeleton loader in element
     */
    showSkeleton(elementId, skeletonType, count = 1) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const skeleton = LoadingComponents[skeletonType + 'Skeleton'];
        if (!skeleton) return;

        element.innerHTML = Array(count).fill(skeleton).join('');
    }

    /**
     * Show loading overlay on element
     */
    showOverlay(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;

        // Make sure element is positioned relatively
        element.style.position = 'relative';
        
        // Remove existing overlay
        this.hideOverlay(elementId);
        
        // Add new overlay
        const overlay = document.createElement('div');
        overlay.innerHTML = LoadingComponents.loadingOverlay;
        overlay.className = 'loading-overlay';
        element.appendChild(overlay.firstElementChild);
    }

    /**
     * Hide loading overlay
     */
    hideOverlay(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const overlay = element.querySelector('.absolute.inset-0');
        if (overlay) {
            overlay.remove();
        }
    }

    /**
     * Show error state in element
     */
    showError(elementId, message, retryCallback = null) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const retryFn = retryCallback ? `window.${retryCallback.name}()` : null;
        element.innerHTML = LoadingComponents.errorState(message, retryFn);
    }

    /**
     * Show empty state in element
     */
    showEmpty(elementId, title, description, actionHtml = null) {
        const element = document.getElementById(elementId);
        if (!element) return;

        element.innerHTML = LoadingComponents.emptyState(title, description, actionHtml);
    }

    /**
     * Performance optimized loading states
     */
    batchUpdate(updates) {
        // Batch multiple loading state updates
        requestAnimationFrame(() => {
            updates.forEach(({ componentId, isLoading, message }) => {
                this.setLoading(componentId, isLoading, message);
            });
        });
    }

    /**
     * Automatic timeout handling
     */
    setLoadingWithTimeout(componentId, timeout = 30000, timeoutMessage = 'Request timed out') {
        this.setLoading(componentId, true);
        
        const timeoutId = setTimeout(() => {
            this.setLoading(componentId, false);
            this.showError(componentId, timeoutMessage);
        }, timeout);
        
        // Return cleanup function
        return () => {
            clearTimeout(timeoutId);
            this.setLoading(componentId, false);
        };
    }
}

// Global loading manager instance
window.loadingManager = new LoadingManager();

// Alpine.js integration
document.addEventListener('alpine:init', () => {
    Alpine.store('loading', {
        states: new Map(),
        
        setLoading(componentId, isLoading) {
            this.states.set(componentId, isLoading);
        },
        
        isLoading(componentId) {
            return this.states.get(componentId) || false;
        }
    });
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LoadingComponents, LoadingManager };
}