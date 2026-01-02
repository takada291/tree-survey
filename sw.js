const CACHE_NAME = 'tree-survey-final-v1'; // 名前を一新
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'sw.js',
  'icon-192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 一つずつキャッシュして、失敗したファイルがわかるようにする
      return Promise.all(
        urlsToCache.map((url) => {
          return cache.add(url).catch(err => console.error('キャッシュ失敗:', url));
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
