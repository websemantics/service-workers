/*
 * Service Workers, examples ..
 * Url: https://madebymike.com.au//writing/service-workers/?utm_source=codropscollective
 *
 *                        ___
 *         _   _        (  _`\                      _
 *        ( \_/ )       | (_(_)   __   _ __  _   _ (_)   ___    __
 *       __) _ (__      `\__ \  /'__`\( '__)( ) ( )| | /'___) /'__`\                   _   _
 *      (__ (_) __)     ( )_) |(  ___/| |   | \_/ || |( (___ (  ___/                  ( \_/ )
 *         ) _ (        `\____)`\____)(_)   `\___/'(_)`\____)`\____)     _   _       __) _ (__
 *        (_/ \_)                                                _   _  ( \_/ )  _  (__ (_) __)
 *      _   _   _               _                               ( \_/ )__) _ (__( \_/ )) _ (
 *     ( ) ( ) ( )   _    _ __ ( )/')    __   _ __   ___       __) _ ((__ (_) __)) _ ((_/ \_)
 *     | | | | | | /'_`\ ( '__)| , <   /'__`\( '__)/',__)     (__ (_) __)) _ ((__ (_) __)
 *     | (_/ \_) |( (_) )| |   | |\`\ (  ___/| |   \__, \        ) _ (  (_/ \_)  ) _ (
 *     `\___x___/'`\___/'(_)   (_) (_)`\____)(_)   (____/       (_/ \_)         (_/ \_)
 */


 ;(function(root, CACHE_NAME) {

  var urlsToCache = [
    '/',
    '/offline.html',
    '/css/styles.min.css'
  ];

  // Install
  root.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
      })
    );
  });

  root.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName !== CACHE_NAME;
          }).map(function(cacheName) {
            console.log('Deleting '+ cacheName);
            return caches.delete(cacheName);
          })
        );
      })
    );
  });

  root.addEventListener('fetch', function(event) {
    e.respondWith(
      // If network fetch fails serve offline page form cache
      fetch(event.request).catch(function(error) {
        return caches.open(CACHE_NAME).then(function(cache) {
          return cache.match('/offline.html');
        });
      })
    );
  });

  root.addEventListener('fetch', function(event) {

    var requestURL = new URL(event.request.url);

    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {

          // If there is a cached response return this otherwise grab from network
          return response || fetch(event.request).then(function(response) {

            // Check if the network request is successful
            // don't update the cache with error pages!!
            // Also check the request domain matches service worker domain
            if (response.ok && requestURL.origin == location.origin){
              // All good? Update the cache with the network response
              cache.put(event.request, response.clone());
            }

            return response;

          }).catch(function() {

            // We can't access the network, return an offline page from the cache
            return caches.match('/offline.html');

          });

        });
      });
    );
  });

  root.addEventListener('message', function(event) {
    caches.open(CACHE_NAME).then(function(cache) {

      return cache.keys().then(function(requests) {

        var urls = requests.filter(function(request){
          return request.url.indexOf("/writing/") !== -1;
        }).map(function(request) {
          return request.url;
        });
        return urls.sort();

      }).then(function(urls) {
        event.ports[0].postMessage(urls);
      });

    });
  });

var messageChannel = new MessageChannel();
messageChannel.port1.onmessage = function(event) {
  // Add list of offline pages to body with JavaScript
  // `event.data` contains an array of cached URLs
};
navigator.serviceWorker.controller.postMessage("get-pages", [messageChannel.port2]);

}(this, 'sw-key'))
