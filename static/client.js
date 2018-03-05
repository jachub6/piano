var socket = io();

var keyboard = new QwertyHancock({
    id: 'keyboard',
    width: 800,
    height: 300,
    octaves: 3,
    startNote: 'C4',
    activeColour: '#3a3a3a'
});

socket.on("uspesne", function(data){
    text="";
    for(var i=0;i<data;i++)
    {
        text += " ❤ ";

    }
    document.getElementById("uzivatele").innerHTML=text;
});

socket.on("zahraj", function(data){
    console.log("prijem: "+ data);
    var nota = new Howl({
        src: ['noty/'+data+'.mp3']
    });
    nota.play();
    var res =  data.replace("S", "#");
    document.getElementById(res).style.backgroundColor = '#3a3a3a';
    if(res.includes("#"))
    {
        setTimeout(function(){ document.getElementById(res).style.backgroundColor = 'black'; }, 2000);
    }
    else
    {
        setTimeout(function(){ document.getElementById(res).style.backgroundColor = 'white'; }, 2000);
    }


});

keyboard.keyDown = function (note, frequency) {

    var res =  note.replace("#", "S");
    socket.emit("zahraj", res);
    console.log("odchozi: "+ res);
    var nota = new Howl({
        src: ['noty/'+res+'.mp3']
    });
    nota.play();
};

keyboard.keyUp = function (note, frequency) {

};







//var C5, CS5, D5, DS5;
