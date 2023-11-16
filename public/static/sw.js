// @ts-nocheck
import ServiceWorkerStorage from 'serviceworker-storage';

self.addEventListener('push', (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: 'fingarden.ru',
    icon: 'https://fingarden.ru/fingarden.svg',
  });
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

const storage = new ServiceWorkerStorage('sw:storage', 1);

async function handlePush() {
  const newSubscription = await self.registration.pushManager.getSubscription();
  const oldSubscription = JSON.parse(await storage.getItem('subscription'));
  if (newSubscription.endpoint !== oldSubscription.endpoint) {
    storage.setItem('subscription', newSubscription);
    const req = new Request(
      'https://fingarden.ru/api/checkouts/refreshpushsubscription',
      {
        method: 'POST',
        body: {
          oldSubscription: oldSubscription,
          newSubscription: newSubscription,
        },
      },
    );
    const response = await self.fetch(req);
    console.log(response);
  }
}

async function savePush(subscription) {
  await storage.setItem('subscription', subscription);
}

self.addEventListener('pushsubscriptionchange', (event) =>
  event.waitUntil(handlePush()),
);

// Listen messages from browser and wait for the first subscription to save it for
// future expirations.
self.addEventListener('message', (event) => {
  if (event.data.action === 'REQUEST_SUBSCRIPTION') {
    event.waitUntil(savePush(event.data.subscription));
  }
});
