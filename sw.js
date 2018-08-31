const staticAssets = [
    './',
    './css/app.css',
    './libs/bootstrap/dist/css/bootstrap.css',
    './libs/jquery/dist/jquery.js',
    './libs/tether/dist/js/tether.min.js',
    './libs/bootstrap/dist/js/bootstrap.js',
    './favicon/apple-icon-57x57.png',
    './favicon/apple-icon-76x76.png',
    './favicon/apple-icon-114x114.png',
    './favicon/apple-icon-152x152.png',
    './favicon/apple-icon-180x180.png',
    './favicon/android-icon-192x192.png',
    './favicon/android-chrome-512x512.png',
    './favicon/favicon-32x32.png',
    './favicon/favicon-96x96.png',
    './favicon/favicon-16x16.png',
    './js/app.js',
    './fallback.json',
    './images/fetch-dog.jpg',
    './images/No_Image_Available.jpg',
    './images/15xvbd5.png'
];

self.addEventListener('install', async event => {

    const cache = await caches.open('news-static');

    cache.addAll(staticAssets);


});

self.addEventListener('fetch', event => {

    const req = event.request;
    const url = new URL(req.url);

    if (url.origin === location.origin) {
        if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

        event.respondWith(cacheFirst(req));

    } else {
        event.respondWith(networkFirst(req));
    }

});

async function cacheFirst(req) {
    // check if have response request
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);


}

async function networkFirst(req) {

    const cache = await caches.open('news-dynamic');
    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (e) {
        const cachedResponse = await cache.match(req);
        return cachedResponse || await caches.match('./fallback.json');

    }

}