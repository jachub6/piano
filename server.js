var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', 8080);
app.use('/static', express.static(__dirname + '/static'));
app.use('/node_modules/howler/dist', express.static(__dirname + '/node_modules/howler/dist'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/noty', express.static(__dirname + '/noty'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'piano.html'));
});


server.listen(443, function() {
    console.log('Starting server on port 443');
});
var pocet=0;
io.on('connection', function(socket) {
    pocet++;
    io.sockets.emit('uspesne', pocet);


    socket.on("zahraj", function (data) {
        socket.broadcast.emit("zahraj", data);
    });

    socket.on("disconnect", function(){
       pocet--;
        io.sockets.emit('uspesne', pocet);
    });



});
