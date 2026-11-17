const CACHE_NAME='erogardens-multipage-v4';
const APP_SHELL=['/','/index.html','/market.html','/cart.html','/profile.html','/styles.css','/data.js','/app.js','/manifest.webmanifest','/assets/icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))));self.clients.claim()});
self.addEventListener('fetch',event=>{const request=event.request;if(request.method!=='GET')return;const url=new URL(request.url);if(url.origin!==self.location.origin)return;event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy))}return response}).catch(()=>caches.match('/index.html'))))});
