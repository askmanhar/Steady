const CACHE = 'steady-clean-v5';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (e.request.method === 'GET' && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
// ============================================================
// Steady v2 — append these handlers to sw.js when v2.1 ships
// ============================================================
self.addEventListener('push', e => {
  let d = {}; try { d = e.data.json(); } catch (err) {}
  e.waitUntil(self.registration.showNotification(d.title || 'Steady', {
    body: d.body || 'A gentle reminder.',
    tag: d.tag, icon: './icon.svg', badge: './icon.svg',
    data: { url: d.url || './', kind: d.kind, nudgeId: d.nudgeId },
    // medicine gets an inline action; mood stays one-tap-open
    actions: d.kind === 'med' ? [{ action: 'taken', title: 'Taken' }] : []
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const { url, kind, nudgeId } = e.notification.data || {};
  e.waitUntil((async () => {
    const wins = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    const win = wins[0] ? await wins[0].focus() : await clients.openWindow(url || './');
    // the app listens for these messages and acts (mark taken / acknowledge nudge)
    if (win && e.action === 'taken') win.postMessage({ steady: 'mark-taken', tag: e.notification.tag });
    if (win && kind === 'nudge')     win.postMessage({ steady: 'ack-nudge', nudgeId });
  })());
});
