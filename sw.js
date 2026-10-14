// Rede primeiro, cache como reserva para funcionar offline.
const FILES = ['./', 'index.html', 'manifest.json', 'icon.svg', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => e.waitUntil(caches.open('king').then(c => c.addAll(FILES))));
self.addEventListener('fetch', e => e.respondWith(
  fetch(e.request)
    .then(r => { const copy = r.clone(); caches.open('king').then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request))
));
