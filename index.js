var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');

var fifo = process.env.PIANOBAR_FIFO || 'ctl';
var listenPort = process.env.PATIOBAR_PORT || 3000;

server.listen(listenPort);

// Routing
app.use(express.static(__dirname + '/views'));

function readCurrentSong() {
	var currentSong = fs.readFileSync(process.env.HOME + '/.config/pianobar/currentSong').toString()

	if (currentSong) {
			var a = currentSong.split(',,,');
			io.emit('start', { artist: a[0], title: a[1], album: a[2], coverArt: a[3], rating: a[4] });
	}

}


function PidoraCTL(action) {
	fs.open(fifo, 'w', 0644, function(error, fd) {
	  if (error) {
	    if (fd) {
	      fs.close(fd);
	    }
	    console.log('Error opening fifo: ' + error);
	    return;
	  }
	
		buf = new Buffer.from(action);
	
	  fs.write(fd, buf, 0, action.length, null, function(error, written, buffer) {
	    if (fd) {
	      fs.close(fd);
	    }
	    if (error) {
	      console.log('Error writing to fifo: ' + error);
	    } else {
	      if (written == action.length) {
	        console.log(action + ' has been written successfully!');
	      } else {
	        console.log('Error: Only wrote ' + written + ' out of ' + action.length + ' bytes to fifo.');
	      }
	    }
	  });
	});
}

function readStations() {
	var stations = fs.readFileSync(process.env.HOME + '/.config/pianobar/stationList').toString().split("\n");

	io.emit('stations', { stations: stations });
}

io.on('connection', function(socket) {
	console.log('a user connected');
	readCurrentSong();
	readStations();

	socket.on('action', function (data) {
		var action = data.action.substring(0, 1)
		PidoraCTL(action);
	});

	socket.on('changeStation', function (data) {
		var stationId = data.stationId;
		var cmd = 's' + stationId + '\n';
		PidoraCTL(cmd);
	});

app.post('/start', function(request, response){
	artist = request.query.artist;
	title = request.query.title;
	album = request.query.album;
	coverArt = request.query.coverArt;
	rating = request.query.rating;
	
	io.emit('start', { artist: artist, title: title, coverArt: coverArt, album: album, rating: rating });

	readStations();

	response.send(request.query);
});

app.post('/lovehate', function(request, response) {
	rating = request.query.rating;

	io.emit('lovehate', { rating: rating });

	console.log(request.query);
});


});
