
function ServiceEvents() {}


ServiceEvents.workerCallback = function(event) {
    console.log("Service callback called: ", event);
}

export default ServiceEvents;




