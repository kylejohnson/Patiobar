	var socket = io();

	socket.on('start', function(msg) {
		$( "#coverArt" ).attr({
			alt: msg.album,
			src: msg.coverArt,
			title: msg.album
		});
		$("#title").text(msg.title);
		var aa = 'on ' + msg.album + ' by ' + msg.artist;
		$("#albumartist").text(aa);

		if (msg.rating == 1) {
			document.getElementById("love").className = "btn btn-success pull-left";
		} else {
			document.getElementById("love").className = "btn btn-default pull-left";

		}
	});

	socket.on('lovehate', function(msg) {
		if (msg.rating == 1) {
			document.getElementById("love").className = "btn btn-success pull-left";
		}

	});

	function appendStation(station) {
		var s = document.getElementById('stations');
		var b = document.createElement('button');
		var stationId = station[0];
		var stationName = station[1].replace("Radio", "");

		var linkText = document.createTextNode(stationName);

		b.appendChild(linkText);
		b.setAttribute('type', 'button');
		b.setAttribute('onClick', "changeStation('" + stationId + "')");
		b.setAttribute('class', 'btn btn-default navbar-btn btn-sm');

		s.appendChild(b);
	}

	function parseStation(stations) {
		var a = stations.split(":");
		appendStation(a);
	}

	socket.on('stations', function(msg) {
		document.getElementById('stations').innerHTML = "";
		msg.stations.pop();
		for (i in msg.stations) {
			parseStation(msg.stations[i]);
		}
	});

	function sendCommand(action) {
		socket.emit('action', { action: action });
	}

	function changeStation(stationId) {
		socket.emit('changeStation', { stationId: stationId });
	}
