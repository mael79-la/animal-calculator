const CACHE_NAME = 'pet-calc-v1';
const ASSETS = ['index.html', 'style.css', 'app.js', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))));
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(cachedResponse => cachedResponse || fetch(e.request)));
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker activo', reg.scope))
            .catch(err => console.error('Error en Service Worker', err));
    });
}

document.getElementById('btn-calculate').addEventListener('click', () => {
    const type = document.getElementById('pet-type').value;
    const age = parseInt(document.getElementById('pet-age').value);
    
    if (isNaN(age) || age <= 0) {
        alert('Por favor, introduce una edad válida.');
        return;
    }

    let humanAge = age === 1 ? 15 : age === 2 ? 24 : 24 + (age - 2) * 4;
    const emoji = type === 'dog' ? '🐕' : '🐈';
    
    const resultBox = document.getElementById('result-box');
    const resultText = document.getElementById('result-text');
    
    resultText.innerHTML = `Tu mascota ${emoji} equivale a tener unos <strong>${humanAge} años</strong> humanos.`;
    resultBox.classList.remove('hidden');
});

