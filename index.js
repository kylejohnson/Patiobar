var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var fifo = 'ctl';

server.listen(3000);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');

	socket.on('action', function (data) {
		var action = data.action.substring(0, 1)
		console.log(action);



fs.open(fifo, 'w', 0644, function(error, fd) {
  if (error) {
    if (fd) {
      fs.close(fd);
    }
    console.log('Error opening fifo: ' + error);
    return;
  }

	buf = new Buffer(action);

  fs.write(fd, buf, 0, action.length, null, function(error, written, buffer) {
    if (fd) {
      fs.close(fd);
    }
    if (error) {
      console.log('Error writing to fifo: ' + error);
    } else {
      if (written == action.length) {
        console.log('Input has been written successfully!');
      } else {
        console.log('Error: Only wrote ' + written + ' out of ' + action.length + ' bytes to fifo.');
      }
    }
  });
});





	});
	

});

app.post('/start', function(request, response){
	artist = request.query.artist;
	title = request.query.title;
	album = request.query.album;
	coverArt = request.query.coverArt;
	
	io.emit('start', { artist: artist, title: title, coverArt: coverArt, album: album });

	response.send(request.query);
});

app.post('/lovehate', function(request, response) {
	rating = request.query.rating;

	io.emit('lovehate', { rating: rating });

	console.log(request.query)
});
