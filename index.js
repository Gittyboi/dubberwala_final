// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;
//var host = process.env.host || '0.0.0.0';
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
/*var port2 = 3002;
server.listen(3002, function(){
  console.log('Server listening at port %d', port2 );
});*/

// Routing
app.get('/', function (req, res) {

//if(1.login hai && 2.aur koi login nahi hai)
//{
//res.sendfile('public/failure.html');
//}
//else
res.sendfile('public/index.html')

});


app.get('/form', function(req,res){

  res.sendfile('public/index_form.html');
});

//res.sendfile('public/login.html')

app.get('/player', function(req, res){
  res.sendfile('public/index_player2.html')
});

  //app.get('/lang1', function (req, res) {
 // res.sendfile('public/player.html')});
app.use(express.static(path.join(__dirname, 'public')));




// Chatroom

var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;
  //console.log("hbfje");

  // when the client emits 'new message', this listens and executes

socket.on('video_control',function(data)
{
  //console.log(data);
  io.sockets.emit('listener123',data);
});


socket.on('current_source',function(data)
{
  //console.log(data);

  setInterval(function()
  { 
  io.sockets.emit('source_data', data)
  }, 5000);

});


  //socket.broadcast.emit('source_data',data);});

socket.on('sync_time',function(data)
  {
    //console.log(data); 
    io.sockets.emit('syncer',data);
  });


socket.on('pause/play',function(data)
  {
    //console.log(data);
    io.sockets.emit('current_playing_state',data);
  });


});