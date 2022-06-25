
'use strict';

// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';

// Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/group.html',
  '/status.html',
  '/call-log.html',
  '/login.html',
  '/register.html',
  '/forgot-password.html',
  '/scripts/popper.min.js',
  '/scripts/bootstrap.min.js',
  '/scripts/jquery-3.4.1.min.js',
  '/scripts/plugins/mcustomscroll/jquery.mCustomScrollbar.js',
  '/scripts/app.js',
  '/scripts/install.js',
  '/scripts/luxon-1.11.4.js',
  '/scripts/plugins/mcustomscroll/jquery.mCustomScrollbar.css',
  '/scripts/plugins/fontawesome/css/fontawesome.min.css',
  '/scripts/plugins/fontawesome/css/all.min.css',
  '/styles/bootstrap.min.css',
  '/styles/inline.css',
  '/images/install.svg',
  '/images/avatar-1.jpg',
  '/images/avatar-2.jpg',
  '/images/avatar-3.jpg',
  '/images/avatar-4.jpg',
  '/images/avatar-5.jpg',
  '/images/avatar-6.jpg',
  '/images/avatar-7.jpg',
  '/images/avatar-8.jpg',
  '/images/call-icon.png',
  '/images/carousel.jpg',
  '/images/carousel1.jpg',
  '/images/carousel2.jpg',
  '/images/double-tick.png',
  '/images/incoming-call-icon.svg',
  '/images/logo.png',
  '/images/favicon.ico',
  '/images/media1.jpg',
  '/images/media2.jpg',
  '/images/media3.jpg',
  '/images/missed-call-icon.svg',
  '/images/status-icon.png',
  '/images/top-curve-bg.png',
  '/images/screenshot-icon.png',
  '/images/call-close.svg',
  '/fonts/lato-regular.woff2',
  '/fonts/lato-regular.woff',
  '/fonts/lato-bold.woff2',
  '/fonts/lato-bold.woff',
  '/fonts/lato-black.woff2',
  '/fonts/lato-black.woff',
  '/scripts/plugins/fontawesome/webfonts/fa-solid-900.woff2',
  '/scripts/plugins/fontawesome/webfonts/fa-solid-900.woff',
  '/scripts/plugins/fontawesome/webfonts/fa-solid-900.ttf',
  '/scripts/plugins/fontawesome/webfonts/fa-regular-400.woff2',
  '/scripts/plugins/fontawesome/webfonts/fa-regular-400.woff',
  '/scripts/plugins/fontawesome/webfonts/fa-regular-400.ttf',
  '/scripts/plugins/fontawesome/webfonts/fa-brands-400.woff2',
  '/scripts/plugins/fontawesome/webfonts/fa-brands-400.woff',
  '/scripts/plugins/fontawesome/webfonts/fa-brands-400.ttf',

];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // Remove previous cached data from disk.
  evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // Add fetch event handler here.
  if (evt.request.url.includes('/forecast/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
      }));
  return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
);

});
