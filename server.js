var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', 8080);
app.use('/static', express.static(__dirname + '/static'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/noty', express.static(__dirname + '/noty'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/piano.html', function(request, response) {
    response.sendFile(path.join(__dirname, 'piano.html'));
});

server.listen(8080, function() {
    console.log('Starting server on port 8080');
});

var users = {jmeno:"anonym"};
var jmena=[];
io.on('connection', function(socket) {
    socket.on("jmeno", function(data){
        jmena.push(data);
        users.jmeno=jmena;
        socket.emit('uspesne');
    });

    socket.on("zahrat", function (data) {
      io.socketst.emit("zahrat", data);
    });

});
