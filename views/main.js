	var socket = io();

	socket.on('start', function(msg) {
		document["coverArt"].src = msg.coverArt;
		document["coverArt"].alt = msg.album;
		document.getElementById('title').innerHTML = msg.title;
		var aa = 'on ' + msg.album + ' by ' + msg.artist;
		document.getElementById('albumartist').innerHTML = aa;
	});

	socket.on('lovehate', function(msg) {
		if (msg.rating == 1) {
			rating = 'love';
		} else {
			rating = 'hate';
		}

		document.getElementById('lovehate').innerHTML = rating;
	});

	function appendStation(station) {
		var ul = document.getElementById("stationList");
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(station[1]));
		li.setAttribute("id", station[0]);
		ul.appendChild(li);
	}

	function parseStation(stations) {
		var a = stations.split(":");
		appendStation(a);
	}

	socket.on('stations', function(msg) {
		document.getElementById("stationList").innerHTML = "";
		for (i in msg.stations) {
			parseStation(msg.stations[i]);
		}
	});

	function sendCommand(action) {
		socket.emit('action', { action: action });
	}
