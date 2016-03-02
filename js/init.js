document.addEventListener('deviceready', function () {
    // cordova.plugins.notification.local is now available

	cordova.plugins.notification.local.on("click", function (notification, state) {
		cordova.plugins.notification.local.clear(notification.id, function() {
	    	alert(notification.id +"("+ notification.data.date+ ")"+" clear");
		});
	    alert(notification.id + " was clicked");
	}, this);

}, false);

function everyhour () {
	cordova.plugins.notification.local.schedule({
		id: 20,
	    text: "by now and everyhour",
	    every: "hour",
	    led: "00FFFF", //only android
	    data: {date: new Date().toLocaleString()}
	});
}

function stopEveryhour () {
	cordova.plugins.notification.local.cancel(20, function() {
			alert("canceling everyhour");
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
	    data: {date: new Date(_5_sec_from_now).toLocaleString()},
	    icon: 'file://assets/animals.svg',
	    smallIcon: 'file://assets/animals.svg'
	})
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
	    data: { date: new Date(_5_min_from_now).toLocaleString() }
	});
}