const staticAssets = [
   './',
   './styles.css',
   './app.js'
  ];

self.addEventListener('install', async event => {
  
  const cache = await caches.open('news-static');

  cache.addAll(staticAssets);


});

self.addEventListener('fetch', event => {
  
 console.log('fetch');

});