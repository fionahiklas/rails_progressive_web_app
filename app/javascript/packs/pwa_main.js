
var PwaMain = {
    popupWindow: null
}

function windowMessageListener(event) {
    console.log("Received event: ", event);
}


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
    var loginButton = document.getElementById("loginButton");
    loginButton.addEventListener('click', function() {
	console.log("loginButton clicked, opening popup");
	PwaMain.popupWindow = window.open("/pwa/login", "Login Window", "width=350,height=250");
	console.log("window should be open now");
    });
    window.addEventListener('message', windowMessageListener);
}


export default PwaMain;




