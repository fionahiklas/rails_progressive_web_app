
function PwaMain() {}


PwaMain.register_main_service_worker = function() {
    console.log("Checking to see if we can register the service worker")
    if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/pwa/serviceworker")
	    .then(function(registration) {
		console.log("Service worker registered with scope: ", registration.scope);
	    }).catch(function(err) {
		console.log("Service worker registration failed: ", err);
	    });
    } else {
	console.log("Can't register a service worker, browser doesn't support this");
    }
}

PwaMain.register_login_button = function() {
    console.log("Registering login button handler");
    
}

export default PwaMain;




