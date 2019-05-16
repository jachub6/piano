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
app.use('/node_modules/tone/build', express.static(__dirname + '/node_modules/tone/build'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/noty', express.static(__dirname + '/noty'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'piano.html'));
});


server.listen(8080, function() {
    console.log('Starting server on port 8080');
});
var pocet=0;
var nastaveniSynthu = {
    "filter" : {
        "type": "lowpass"
    },
    "oscillator" : {
        "type": "sawtooth",
        "detune" : 0
    },
    "envelope" : {
        "attack" : 0.01 ,
        "decay" : 0.1 ,
        "sustain" : 0.1 ,
        "release" : 3
    }
};
io.on('connection', function(socket) {
    pocet++;
    console.log(nastaveniSynthu);
    socket.emit('zmenaNastaveni', nastaveniSynthu);

    socket.on("zmenaNastaveni", function (data) {
        nastaveniSynthu=data;
        //console.log(nastaveniSynthu);
        socket.broadcast.emit("zmenaNastaveni", data);
    });

    io.sockets.emit('uspesne', pocet);


    socket.on("zahraj", function (data) {
        socket.broadcast.emit("zahraj", data);
    });

    socket.on("dohraj", function (data) {
        socket.broadcast.emit("dohraj", data);
    });

    socket.on("disconnect", function(){
       pocet--;
        io.sockets.emit('uspesne', pocet);
    });



});
