const CACHE_NAME = 'my-site-cache-v1';

const urlsToCache = [
    'offline.html',  
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

// Event listener untuk meng-cache file selama proses instalasi service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching offline page and essential files');
            console.log('Caching:', urlsToCache); // Log urls yang sedang di-cache
            return cache.addAll(urlsToCache); 
        })
    );
});

// Event listener untuk menangani permintaan fetch
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
            .then((response) => {
                return response; // Kembalikan respons jika berhasil
            })
            .catch(() => {
                // Jika gagal, kembalikan offline.html
                return caches.match('offline.html');
            })
        );
    } else {
        // Untuk permintaan lain, coba ambil dari cache terlebih dahulu
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }).catch(() => {
                    // Jika ada kesalahan, kembalikan offline.html sebagai fallback
                    return caches.match('offline.html');
                });
            })
        );
    }
});

// Event listener untuk menghapus cache lama saat service worker diaktifkan
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
