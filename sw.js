/**
 * Fondation Botnar Dashboard - Service Worker
 * Provides offline functionality and performance optimization
 */

const CACHE_NAME = 'botnar-dashboard-v1.0.0';
const STATIC_CACHE = 'botnar-static-v1.0.0';
const DATA_CACHE = 'botnar-data-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/design-system/index.html',
    '/design-system/pages/dashboard-home/',
    '/design-system/pages/grant-portfolio/',
    '/design-system/pages/impact-assessment/',
    '/design-system/pages/financial-reports/',
    '/design-system/pages/program-analysis/',
    '/design-system/pages/auth/login.html',
    '/dist/botnar-design-system.css',
    '/design-system/pages/data-manager.js',
    '/design-system/pages/auth.js',
    '/design-system/pages/performance-optimizer.js',
    'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
];

// API endpoints to cache
const API_PATTERNS = [
    /\/api\/dashboard\//,
    /\/api\/grants\//,
    /\/api\/financial\//,
    /\/api\/impact\//,
    /\/api\/programs\//
];

// Cache strategies
const CACHE_STRATEGIES = {
    'cache-first': ['fonts', 'images', 'css', 'js'],
    'network-first': ['html', 'api'],
    'stale-while-revalidate': ['data', 'json']
};

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('[SW] Installing service worker');
    
    event.waitUntil(
        Promise.all([
            // Cache static assets
            caches.open(STATIC_CACHE).then(cache => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS.map(url => new Request(url, {
                    cache: 'reload'
                })));
            }),
            
            // Skip waiting to activate immediately
            self.skipWaiting()
        ])
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('[SW] Activating service worker');
    
    event.waitUntil(
        Promise.all([
            // Delete old caches
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME && 
                            cacheName !== STATIC_CACHE && 
                            cacheName !== DATA_CACHE) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            
            // Take control of all clients
            self.clients.claim()
        ])
    );
});

// Fetch event - handle network requests
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-HTTP requests
    if (!request.url.startsWith('http')) {
        return;
    }
    
    // Handle different types of requests
    if (request.method === 'GET') {
        if (isAPIRequest(url)) {
            event.respondWith(handleAPIRequest(request));
        } else if (isStaticAsset(url)) {
            event.respondWith(handleStaticAsset(request));
        } else if (isHTMLRequest(request)) {
            event.respondWith(handleHTMLRequest(request));
        } else {
            event.respondWith(handleOtherRequest(request));
        }
    }
});

// Check if request is for API data
function isAPIRequest(url) {
    return API_PATTERNS.some(pattern => pattern.test(url.pathname));
}

// Check if request is for static asset
function isStaticAsset(url) {
    const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.woff', '.woff2', '.ttf'];
    return staticExtensions.some(ext => url.pathname.endsWith(ext));
}

// Check if request is for HTML
function isHTMLRequest(request) {
    return request.headers.get('accept').includes('text/html');
}

// Handle API requests with network-first strategy
async function handleAPIRequest(request) {
    const cache = await caches.open(DATA_CACHE);
    
    try {
        // Try network first
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed for API request, trying cache:', request.url);
        
        // Fall back to cache
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline page or error response
        return new Response(
            JSON.stringify({
                error: 'Network unavailable',
                offline: true,
                timestamp: Date.now()
            }),
            {
                status: 503,
                statusText: 'Service Unavailable',
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
    const cache = await caches.open(STATIC_CACHE);
    
    // Try cache first
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
        // Update cache in background if needed
        updateCacheInBackground(request, cache);
        return cachedResponse;
    }
    
    // Fall back to network
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[SW] Failed to fetch static asset:', request.url);
        return new Response('Asset unavailable offline', { status: 404 });
    }
}

// Handle HTML requests
async function handleHTMLRequest(request) {
    const cache = await caches.open(CACHE_NAME);
    
    try {
        // Try network first for HTML to get latest content
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed for HTML request, trying cache:', request.url);
        
        // Fall back to cache
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Fall back to offline page
        return cache.match('/offline.html') || new Response(
            getOfflineHTML(),
            { headers: { 'Content-Type': 'text/html' } }
        );
    }
}

// Handle other requests
async function handleOtherRequest(request) {
    try {
        return await fetch(request);
    } catch (error) {
        console.log('[SW] Failed to fetch:', request.url);
        return new Response('Resource unavailable', { status: 404 });
    }
}

// Update cache in background for stale-while-revalidate
function updateCacheInBackground(request, cache) {
    fetch(request).then(response => {
        if (response.ok) {
            cache.put(request, response);
        }
    }).catch(error => {
        console.log('[SW] Background cache update failed:', error);
    });
}

// Generate offline HTML page
function getOfflineHTML() {
    return `
        <!DOCTYPE html>
        <html lang="en" class="h-full">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Offline - Fondation Botnar Dashboard</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    margin: 0;
                    padding: 0;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #0066CC 0%, #004499 100%);
                    color: white;
                }
                .container {
                    text-align: center;
                    padding: 2rem;
                    max-width: 600px;
                }
                .icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                h1 {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    font-weight: 700;
                }
                p {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                    opacity: 0.9;
                }
                .retry-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .retry-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                }
                .cached-links {
                    margin-top: 3rem;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                }
                .cached-links h2 {
                    font-size: 1.2rem;
                    margin-bottom: 1rem;
                    opacity: 0.9;
                }
                .cached-links a {
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    display: inline-block;
                    margin: 0.5rem 1rem;
                    padding: 0.5rem 1rem;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }
                .cached-links a:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="icon">📡</div>
                <h1>You're Offline</h1>
                <p>
                    It looks like you've lost your internet connection. 
                    Don't worry - you can still access some cached content below, 
                    or try reconnecting to get the latest data.
                </p>
                <button class="retry-btn" onclick="window.location.reload()">
                    Try Again
                </button>
                
                <div class="cached-links">
                    <h2>Available Offline</h2>
                    <a href="/design-system/pages/dashboard-home/">Dashboard Home</a>
                    <a href="/design-system/pages/grant-portfolio/">Grant Portfolio</a>
                    <a href="/design-system/pages/impact-assessment/">Impact Assessment</a>
                    <a href="/design-system/pages/financial-reports/">Financial Reports</a>
                    <a href="/design-system/pages/program-analysis/">Program Analysis</a>
                </div>
            </div>
            
            <script>
                // Auto-retry when connection is restored
                window.addEventListener('online', () => {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                });
                
                // Show connection status
                if (navigator.onLine) {
                    document.querySelector('.retry-btn').textContent = 'Reload Page';
                }
            </script>
        </body>
        </html>
    `;
}

// Background sync for when connection is restored
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// Perform background sync
async function doBackgroundSync() {
    console.log('[SW] Performing background sync');
    
    try {
        // Sync any pending data
        const cache = await caches.open(DATA_CACHE);
        const cachedRequests = await cache.keys();
        
        // Update cached API responses
        for (const request of cachedRequests) {
            try {
                const response = await fetch(request);
                if (response.ok) {
                    await cache.put(request, response);
                }
            } catch (error) {
                console.log('[SW] Failed to sync:', request.url);
            }
        }
        
        console.log('[SW] Background sync completed');
    } catch (error) {
        console.log('[SW] Background sync failed:', error);
    }
}

// Handle push notifications
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        
        const options = {
            body: data.body || 'New update available',
            icon: '/assets/icons/icon-192x192.png',
            badge: '/assets/icons/badge-72x72.png',
            data: data.data || {},
            actions: data.actions || [
                {
                    action: 'view',
                    title: 'View',
                    icon: '/assets/icons/view.png'
                },
                {
                    action: 'dismiss',
                    title: 'Dismiss',
                    icon: '/assets/icons/dismiss.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title || 'Fondation Botnar Dashboard', options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow(event.notification.data.url || '/')
        );
    }
});

// Message handling for cache updates
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CACHE_UPDATE') {
        event.waitUntil(updateCache(event.data.url));
    }
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({
            version: CACHE_NAME,
            timestamp: Date.now()
        });
    }
});

// Update specific cache entry
async function updateCache(url) {
    try {
        const cache = await caches.open(CACHE_NAME);
        const response = await fetch(url);
        
        if (response.ok) {
            await cache.put(url, response);
            console.log('[SW] Cache updated for:', url);
        }
    } catch (error) {
        console.log('[SW] Failed to update cache for:', url, error);
    }
}

// Periodic cache cleanup
setInterval(() => {
    cleanupOldCacheEntries();
}, 24 * 60 * 60 * 1000); // Daily cleanup

async function cleanupOldCacheEntries() {
    const cache = await caches.open(DATA_CACHE);
    const requests = await cache.keys();
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    
    for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
            const dateHeader = response.headers.get('date');
            if (dateHeader) {
                const responseDate = new Date(dateHeader).getTime();
                if (now - responseDate > maxAge) {
                    await cache.delete(request);
                    console.log('[SW] Cleaned up old cache entry:', request.url);
                }
            }
        }
    }
}

console.log('[SW] Service worker loaded and ready');