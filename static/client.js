var socket = io();

var keyboard = new QwertyHancock({
    id: 'keyboard',
    width: 600,
    height: 150,
    octaves: 1,
    startNote: 'C5',
});

var context = new AudioContext(),
    masterVolume = context.createGain(),
    oscillators = {};

masterVolume.gain.value = 0.001;

masterVolume.connect(context.destination);

keyboard.keyDown = function (note, frequency) {

    var res = note.replace("#", "S");
    start(""+res+"");
    console.log(res);
    socket.emit("zahrat", res);
    /* var osc = context.createOscillator(),
         osc2 = context.createOscillator();

     osc.frequency.value = frequency;
     osc.type = 'sine';
     osc.detune.value = -10;

     osc2.frequency.value = frequency;
     osc2.type = 'sine';
     osc2.detune.value = 10;

     osc.connect(masterVolume);
     osc2.connect(masterVolume);

     masterVolume.connect(context.destination);

     oscillators[frequency] = [osc, osc2];

     osc.start(context.currentTime);
     osc2.start(context.currentTime);   */
};

keyboard.keyUp = function (note, frequency) {
};
var source;

function start(nota) {
    // Note: this will load asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", "/noty/"+nota+".mp3", true);
    request.responseType = "arraybuffer"; // Read as binary data

    // Asynchronous callback
    request.onload = function() {
        var data = request.response;

        audioRouting(data);
    };

    request.send();
}

function audioRouting(data) {
    source = context.createBufferSource(); // Create sound source
    context.decodeAudioData(data, function(buffer){ // Create source buffer from raw binary
        source.connect(masterVolume);
        masterVolume.connect(context.destination);
        source.buffer = buffer; // Add buffered data to object
        source.connect(context.destination); // Connect sound source to output
        playSound(source); // Pass the object to the play function
    });
}

function playSound() {
    source.start(context.currentTime); // play the source immediately
}

socket.on("zahrat", function(data){
    start(""+data+"");
});

//var C5, CS5, D5, DS5;
