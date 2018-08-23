const staticAssets = [
   './',
   './css/app.css',
   './css/font-awesome.min.css',
   './libs',
   './favicon',
   './js/app.js',
   './fallback.json',
   './images/fetch-dog.jpg',
   './images/15xvbd5.png'
  ];

self.addEventListener('install', async event => {
  
  const cache = await caches.open('news-static');

  cache.addAll(staticAssets);


});

self.addEventListener('fetch', event => {
  
 const req  = event.request;
 const url =  new URL(req.url);

 if(url.origin === location.origin){
  
   event.respondWith(cacheFirst(req));
 
 }else {
 	event.respondWith(networkFirst(req));
 }

});

async function cacheFirst(req) {

  // check if have response request
  const cachedResponse  = await caches.match(req);
  return cachedResponse || fetch(req);
  

}

async function networkFirst(req){

 const cache =  await caches.open('news-dynamic');
  try {
     const res = await fetch(req);
     cache.put(req, res.clone());
     return res;
  } catch(e) {
   const  cachedResponse = 	await cache.match(req);
   return cachedResponse || await caches.match('./fallback.json');

  }
 
}