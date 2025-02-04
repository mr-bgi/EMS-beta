self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("eduvision-cache").then((cache) => {
        return cache.addAll([
          "/",
          "/index.html",
          "/css/mobile.css",
          "/vendor/bootstrap/bootstrap.min.css",
          "/icons/mobile/notification.png",
          "/icons/mobile/menu-bar.png",
          "/icons/mobile/time.png",
          "/images/avatar/sample-profile.png",
          "/vendor/bootstrap/bootstrap.bundle.min.js"
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  