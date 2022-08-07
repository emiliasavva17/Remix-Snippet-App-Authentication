// SW version
const version = '1.1';

// Static cache (App shell) - assets that are always cached
const appAssets = [
    "manifest.json",
    "/icons/favicon.ico",
    "/"
    
];

// SW Install
self.addEventListener( 'install', e => {
    // wait until the cache gets created
    e.waitUntil(
        caches.open( `static-${version}` )
        // add all app assets to it
            .then( cache => cache.addAll(appAssets) )
    );
});

// SW Activate
self.addEventListener( 'activate', e => {
    // clean old versions of the static cache
    let cleaned = caches.keys().then( keys => {
        // loop the keys, if the key != current version 
        // but it was a static cache (older version) - delete it 
        keys.forEach( key => {
            if ( key !== `static-${version}` && key.match('static-')) {
                return caches.delete(key);
            }
        });
    });
    e.waitUntil(cleaned);
});


// Fallback to Network - Go to the cache, if not there, try the network
const fallbackNetwork = (req) => {

    return caches.match(req).then (cachedRes => {
        // If the request was found in the cache, return it
        if(cachedRes) return cachedRes;

        // Fall back to network if request not found in cache
        return fetch(req).then ( networkResponse => {
            // Update cache with new response - if request resolves, add it to the cache
            caches.open(`static-${version}`)
                .then( cache => cache.put( req, networkResponse ));
            
            // Return clone of the Network Response  
            return networkResponse.clone();
        });
    });
};

// Network with Cache Fallback
const fallbackCache = (req) => {

    // Try Network
    return fetch(req).then( networkResponse => {

        // Check if it's resolved, else go to cache
        if ( !networkResponse.ok ) throw 'Fetch Error';
    
        // Update cache
        caches.open( `static-${version}` )
            .then( cache => cache.put( req, networkResponse) );

        // Return clone of Network Response
        return networkResponse.clone();
    
    })

    // Try cache
    .catch( err => caches.match(req) );
};

// SW Fetch
self.addEventListener('fetch', e => {

    if( e.request.url.match(location.origin)) {
        e.respondWith( fallbackNetwork(e.request) );

    } else if ( e.request.url.match('/snippets/') ) {
        e.respondWith( fallbackCache(e.request) );

    }
});