var socket = io();

var keyboard = new QwertyHancock({
    id: 'keyboard',
    width: 800,
    height: 300,
    octaves: 2,
    startNote: 'C5',
});
/*
var C5 = new Howl({
    src: ['noty/C1.mp3']
});
var D5 = new Howl({
    src: ['noty/D1.mp3']
});
var E5 = new Howl({
    src: ['noty/E1.mp3']
});*/
var F5 = new Howl({
    src: ['noty/F1.mp3']
});

socket.on("novy", function(){
    console.log("nove pripojeni");
});

keyboard.keyDown = function (note, frequency) {

    res =  note.replace("#", "S");
    var nota = new Howl({
        src: ['noty/'+res+'.mp3']
    });
    nota.play();
};

keyboard.keyUp = function (note, frequency) {

};







//var C5, CS5, D5, DS5;
