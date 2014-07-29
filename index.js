var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function(req, res){
  res.sendfile('post.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');

	

});

app.post('/', function(request, response){
	artist = request.query.artist;
	title = request.query.title;
	album = request.query.album;
	coverArt = request.query.coverArt;
	
	io.emit('pianobar', { artist: artist, title: title, coverArt: coverArt, album: album });

	response.send(request.query);
});
