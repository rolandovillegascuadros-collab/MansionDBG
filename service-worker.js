// cache v23-layout-chat-winner
const CACHE_NAME = 'mansiondbg-v23-layout-chat-winner';
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./improvements.css",
  "./script.js",
  "./online-backend.js",
  "./firebase-config.js",
  "./assets/brand/umbrella-main-board.png",
  "./FIREBASE_SETUP.md",
  "./manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  const freshFirst = [".html", ".js", ".css", ".webmanifest"].some((ext) => url.pathname.endsWith(ext)) || url.pathname === "/";
  if (freshFirst) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
