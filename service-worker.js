const filesToCache = [
    '/',
    'style.css',
    'index.html',
    'main.js',
    'README.md',
    'images/weather2.jpg',
    'images/weather1.jpg',
    'images/share-solid.svg',
    'scripts/webShare.js',
    'manifest.json'


];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
    // console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );
});

self.addEventListener('activate', event => {
    // console.log('Activating new service worker...');

    const cacheWhitelist = [staticCacheName];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    // console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    //  console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                // console.log('Network request for ', event.request.url);
                return fetch(event.request)
                    .then(response => {
                        //  Respond with custom 404 page
                        if (response.status === 404) {
                            return caches.match('pages/404.html');
                        }
                        return caches.open(staticCacheName)
                            .then(cache => {
                                cache.put(event.request.url, response.clone());
                                return response;
                            });
                    });

            }).catch(error => {
                // Respond with custom offline page
                console.log('Error, ', error);
                return caches.match('pages/offline.html');

            })
    );
});