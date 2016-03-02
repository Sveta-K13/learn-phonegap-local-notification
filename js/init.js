
cordova.plugins.notification.local.on("click", function (notification, state) {
	cordova.plugins.notification.local.clear(notification.id, function() {
    	alert(notification.id +"("+ notification.data+ ")"+" clear");
	});
    alert(notification.id + " was clicked");
}, this)

function everyhour () {
	cordova.plugins.notification.local.schedule({
		id: 20,
	    text: "by now and everyhour",
	    every: "hour",
	    led: "00FF00",
	    data: new Date().toLocaleString()
	});
}

function in5sec () {

	var now             = new Date().getTime(),
	    _5_sec_from_now = new Date(now + 5*1000);

	cordova.plugins.notification.local.schedule({
		id: 1,
	    text: "Delayed 5s Notification",
	    at: _5_sec_from_now,
	    led: "FF0000",
	    data: new Date(_5_sec_from_now).toLocaleString()
	});

}

function in5min () {

	var now             = new Date().getTime(),
	    _5_min_from_now = new Date(now + 5*60*1000);

	cordova.plugins.notification.local.schedule({
		id: 2,
	    text: "Delayed 5m Notification",
	    at: _5_min_from_now,
	    led: "FF0000",
	    sound: null,
	    data: new Date(_5_min_from_now).toLocaleString()
	});
}