/* gerado pelo build.py - não edite */
const V = 'ads-21f8b10c08';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('ads-') && k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if(r.method !== 'GET' || u.origin !== location.origin) return;
  if(r.mode === 'navigate' || u.pathname.endsWith('/assets.json') || u.pathname.endsWith('/sw.js')){   // página e lista: rede primeiro, cache se estiver sem internet
    e.respondWith(fetch(r).then(x => { if(x.ok && r.mode === 'navigate'){ const c = x.clone(); caches.open(V).then(h => h.put(r, c)); } return x; }).catch(() => caches.match(r, {ignoreSearch:true}).then(x => x || caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(r).then(x => x || fetch(r).then(y => { if(y.ok){ const c = y.clone(); caches.open(V).then(h => h.put(r, c)); } return y; })));   // assets: cache primeiro
});
