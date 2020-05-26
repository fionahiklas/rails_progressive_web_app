
import PWAMain from 'packs/pwa_main';

// TODO: Apparently this can fail on older/incompatible browsers, might
// TODO: need to be made more robust
document.addEventListener('DOMContentLoaded', function(){
    console.log("Document ready, registering the main service worker");
    PWAMain.register_main_service_worker();
    console.log("All done.");
});
