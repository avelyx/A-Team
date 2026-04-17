/* Service Worker — Offline-Cache für Shell + gelesene Tiles */
const CACHE = 'svartalven-b43726-v2';
const SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './map.js',
  './manifest.webmanifest',
  './assets/leaflet/leaflet.js',
  './assets/leaflet/leaflet.css',
  './assets/leaflet/images/marker-icon.png',
  './assets/leaflet/images/marker-icon-2x.png',
  './assets/leaflet/images/marker-shadow.png',
  './assets/leaflet/images/layers.png',
  './assets/leaflet/images/layers-2x.png',
  './assets/icons/icon-192.svg',
  './assets/icons/icon-512.svg',
  './data/trip.js',
  './data/contacts.js',
  './data/pois.js',
  './data/routes.js',
  './data/checklists.js',
  './data/arrival.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Tile-Anfragen: stale-while-revalidate (kleines Soft-Cache, respektiert Tile-Usage-Policy)
  if (url.host.match(/tile\.(opentopomap|openstreetmap)\.org/)) {
    e.respondWith(
      caches.open(CACHE + '-tiles').then(cache =>
        cache.match(e.request).then(cached => {
          const net = fetch(e.request).then(resp => {
            if (resp && resp.ok) cache.put(e.request, resp.clone());
            return resp;
          }).catch(() => cached);
          return cached || net;
        })
      )
    );
    return;
  }

  // Shell: cache-first
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
  );
});
