/**
 * Fondation Botnar Dashboard - Authentication Utilities
 * Shared authentication functions for the dashboard
 */

class AuthManager {
    constructor() {
        this.requiredAuthKeys = ['isAuthenticated', 'userSession'];
    }

    /**
     * Check if user is authenticated
     * @returns {boolean} - Authentication status
     */
    isAuthenticated() {
        const isAuth = localStorage.getItem('isAuthenticated') === 'true';
        const hasSession = sessionStorage.getItem('userSession');
        return isAuth && hasSession;
    }

    /**
     * Get current user role
     * @returns {string} - User role (admin, analyst, viewer)
     */
    getUserRole() {
        return localStorage.getItem('userRole') || 'viewer';
    }

    /**
     * Get current user email
     * @returns {string|null} - User email or null
     */
    getUserEmail() {
        return localStorage.getItem('botnar_user_email') || 
               sessionStorage.getItem('botnar_user_email');
    }

    /**
     * Check authentication and redirect if needed
     * @param {string} redirectUrl - URL to redirect to if not authenticated
     * @returns {boolean} - True if authenticated, false if redirected
     */
    requireAuth(redirectUrl = '../auth/login.html') {
        if (!this.isAuthenticated()) {
            this.showAuthError();
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 2000);
            return false;
        }
        return true;
    }

    /**
     * Logout user and clear all authentication data
     * @param {string} redirectUrl - URL to redirect after logout
     */
    logout(redirectUrl = '../auth/login.html') {
        // Clear all authentication data
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('botnar_auth_token');
        localStorage.removeItem('botnar_user_email');
        
        sessionStorage.removeItem('userSession');
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('botnar_auth_token');
        sessionStorage.removeItem('botnar_user_email');

        this.showLogoutMessage();
        
        // Redirect after brief delay
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 1000);
    }

    /**
     * Set authentication state (for login)
     * @param {Object} userData - User data object
     * @param {boolean} rememberMe - Whether to persist login
     */
    setAuthenticated(userData, rememberMe = false) {
        const timestamp = Date.now();
        
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', userData.role || 'viewer');
        sessionStorage.setItem('userSession', `session_${timestamp}`);
        sessionStorage.setItem('authToken', `demo_token_${timestamp}`);
        
        if (rememberMe) {
            localStorage.setItem('botnar_auth_token', `demo_token_${timestamp}`);
            localStorage.setItem('botnar_user_email', userData.email);
        } else {
            sessionStorage.setItem('botnar_auth_token', `demo_token_${timestamp}`);
            sessionStorage.setItem('botnar_user_email', userData.email);
        }
    }

    /**
     * Check if user has required role
     * @param {string|string[]} requiredRoles - Required role(s)
     * @returns {boolean} - True if user has required role
     */
    hasRole(requiredRoles) {
        const userRole = this.getUserRole();
        const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
        return roles.includes(userRole) || userRole === 'admin'; // Admin has all permissions
    }

    /**
     * Show authentication error message
     */
    showAuthError() {
        this.showNotification('Session expired. Please log in again.', 'warning');
    }

    /**
     * Show logout message
     */
    showLogoutMessage() {
        this.showNotification('Logging out...', 'info');
    }

    /**
     * Show notification (requires notification system to be available)
     */
    showNotification(message, type = 'info') {
        // Check if global notification function exists
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
            return;
        }

        // Fallback notification system
        const notification = document.createElement('div');
        const colors = {
            info: 'bg-blue-500',
            success: 'bg-green-500',
            warning: 'bg-yellow-500',
            error: 'bg-red-500'
        };

        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white transition-all duration-300 ${colors[type] || colors.info}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    /**
     * Get authentication status info
     * @returns {Object} - Authentication status object
     */
    getAuthStatus() {
        return {
            isAuthenticated: this.isAuthenticated(),
            userRole: this.getUserRole(),
            userEmail: this.getUserEmail(),
            sessionActive: !!sessionStorage.getItem('userSession')
        };
    }
}

// Create global auth manager instance
window.authManager = new AuthManager();

// Authentication guard function for easy use
window.requireAuth = (redirectUrl) => {
    return window.authManager.requireAuth(redirectUrl);
};

// Quick logout function
window.logout = (redirectUrl) => {
    window.authManager.logout(redirectUrl);
};