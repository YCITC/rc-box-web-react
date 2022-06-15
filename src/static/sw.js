'use strict';

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  // console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  console.log(event.data.text());

  const title = 'RC-Box';
  const options = {
    body: event.data.text(),
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
  
  // const notificationPromise = self.registration.showNotification(title, options);
  // event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});