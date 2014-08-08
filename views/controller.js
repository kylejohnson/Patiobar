var app = angular.module('patiobar', []);


app.factory('socket', function ($rootScope) {
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };

});




function SongController($scope, socket) {
	$scope.sendCommand = function(action) {
		socket.emit('action', { action: action });
	};

	scoket.on('start', function(msg) {
		console.log(msg);
		coverArt = msg.coverArt
		album = msg.album;
		title = msg.title;
		albumartist = 'on ' + msg.album + ' by ' + msg.artist;
	});

	$scope.coverArt = coverArt;

	
	socket.on('lovehate', function(msg) {
		if (msg.rating == 1) {
			rating = 'love';
		} else {
			rating = 'hate';
		}
	
		document.getElementById('lovehate').innerHTML = rating;
	});
}




function StationController($scope, socket) {
	$scope.appendStation = function(station) {
		var ul = document.getElementById("stationList");
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(station[1]));
		li.setAttribute("id", station[0]);
		ul.appendChild(li);
	}

	$scope.parseStation = function(stations) {
		var a = stations.split(":");
		appendStation(a);
	}

	socket.on('stations', function(msg) {
		document.getElementById("stationList").innerHTML = "";
		for (i in msg.stations) {
			parseStation(msg.stations[i]);
		}
	});
}
