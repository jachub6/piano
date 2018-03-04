var socket = io();

var keyboard = new QwertyHancock({
    id: 'keyboard',
    width: 800,
    height: 300,
    octaves: 2,
    startNote: 'C5',
});

socket.on("novy", function(){

    console.log("nove pripojeni");

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
    console.log("prichozi"+data);
});



function loadSound(url, sourceName) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
        // Asynchronously decode the audio file data
        context.decodeAudioData(
            request.response,
            function(buffer) {
                if (!buffer) {
                    console.log('error decoding file data: ' + url);
                    return;
                }
                window[sourceName] = buffer;
            }
        );
    }

    request.onerror = function() {
        console.log('error loading file data: ' + url);
    }

    request.send();
}



//var C5, CS5, D5, DS5;
