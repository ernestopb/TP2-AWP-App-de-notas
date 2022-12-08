console.log('service worker yatta!!');

const CACHE_NAME = 'cache_appnotas';

self.addEventListener('install', evento => {
    console.log(evento);
    const cache = caches.open(CACHE_NAME).then(cache => {
        console.log(cache);
        return cache.addAll([
            'index.html',
            'css/estilos.css',
            'icons/icon-72x72.png',
            'icons/icon-96x96.png',
            'icons/icon-128x128.png',
            'icons/icon-144x144.png',
            'icons/icon-152x152.png',
            'icons/icon-192x192.png',
            'icons/icon-384x384.png',
            'icons/icon-512x512.png',
            'app.js'
        ]);
    })
    evento.waitUntil(cache);
    
});

self.addEventListener( 'fetch', e => {
    const respuestaCache = caches.match(e.request).then( res => {
        if( res) {
            return res;
        } else { 
            return fetch( e.request).then( respuesta => {
                

                caches.open( CACHE_NAME).then( cache => {
                    cache.put( e.request, respuesta)
                })

                return respuesta.clone()
            })
        }
    })

    e.respondWith(respuestaCache)
})