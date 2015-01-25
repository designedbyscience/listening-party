var osa = require('osa');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var toggleQT = function(done){
	
	qt = Application('QuickTime Player');
	qt.includeStandardAdditions = true;
	
	
	state = qt.documents.at(0).playing();

	if (state) {

		qt.documents.at(0).pause();
		return {"playerState": "pause"};
	} else{
		qt.documents.at(0).play();
		return {"playerState": "play"};		
	} 	



}


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket){
  socket.on('toggle', function(msg){

	 osa(toggleQT, function (err, result, log) {

	    if (err) {
	        console.error(err)
	    }
		io.emit('playerStateToggle', result);
	
	});
	
  });
  
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
