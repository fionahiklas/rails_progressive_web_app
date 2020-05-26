
function PwaMain() {}


PwaMain.register_main_service_worker = function() {
    if ("serviceworker" in navigator) {
	navigator.serviceWorker.register("/pwa_serviceworker.js")
	    .then(function(registration) {
		console.log("Service worker registered with scope: ", registration.scope);
	    }).catch(function(err) {
		console.log("Service worker registration failed: ", err);
	    });
    }
}

export default PwaMain;




