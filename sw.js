const CACHE_NAME = 'my-site-cache-v1';
const OFFLINE_URL = 'offline.html';  


const urlsToCache = [
    OFFLINE_URL,  
    'App.js',     
    'style.css',  
    'manifest.json',
    'AletterFix (2).png',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap',
    'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css',
    'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js'
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching offline page and essential files');
            return cache.addAll(urlsToCache); 
        })
    );
});


self.addEventListener('fetch', (event) => {
    
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
            .then((response) => {
                return response;
            })
            .catch(() => {
                
                return caches.match(OFFLINE_URL);
            })
        );
    } else {

        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).then((networkResponse) => {
                  
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }).catch(() => {
             
               
                });
            })
        );
    }
});


self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
