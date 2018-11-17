var socket = io();



window.mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

if(mobilecheck()){
    screen.orientation.lock('landscape');
    var width = window.innerWidth;
    var height = window.innerHeight;
    jQuery("#nastaveni").hide();
    jQuery("#prepinac").hide();
}
else
{
    var width = 800;
    var height = 300;
}

var keyboard = new QwertyHancock({
    id: 'Keyboard',
    width: width,
    height: height,
    octaves: 3,
    startNote: 'C4',
    activeColour: '#3a3a3a'
});

var nastaveniP=false;
function nastaveni(){
    if(nastaveniP){
        nastaveniP=false;
        jQuery(".nastaveni").hide();
    }
    else
    {
        jQuery(".nastaveni").show();
        nastaveniP=true;
    }
}
if(!mobilecheck()){
socket.on("uspesne", function(data){
    text="";
    for(var i=0;i<data;i++)
    {
        text += " ♡ ";

    }
    document.getElementById("uzivatele").innerHTML=text;
});
}
var synth;

socket.on("zahraj", function(data){
    var res =  data.replace("S", "#");
    synth.triggerAttack(res);
    document.getElementById(res).style.backgroundColor = '#3a3a3a';
    if(res.includes("#"))
    {
        document.getElementById(res).style.backgroundColor = 'white';
    }
    else
    {

        document.getElementById(res).style.backgroundColor = 'black';
    }


});

socket.on("dohraj", function(data){

    var res =  data.replace("S", "#");
    console.log("res");
    synth.triggerRelease(res);
    document.getElementById(res).style.backgroundColor = '#3a3a3a';
    if(res.includes("#"))
    {
        document.getElementById(res).style.backgroundColor = 'black';
    }
    else
    {


        document.getElementById(res).style.backgroundColor = 'white';
    }

});

keyboard.keyDown = function (note, frequency) {

    var res =  note.replace("#", "S");
    socket.emit("zahraj", res);

    synth.triggerAttack(note);

};

keyboard.keyUp = function (note, frequency) {
    synth.triggerRelease(note);
    var res =  note.replace("#", "S");
    socket.emit("dohraj", res);
};
 var klavesnice = ["Y", "S", "X", "D", "C", "V", "G", "B", "H", "N", "J", "M", ",", "L", ".", "Ů", "-", "Q", "2", "W", "3", "E", "4", "R", "T", "6", "Z", "7", "U", "I", "9", "O", "0","P","=","Ú"];
 var waveform;
 var fft;
 var vol;
var limiter;
var panVol;
jQuery(document).ready(function(){

    synth = new Tone.PolySynth(5, Tone.Synth);
    waveform = new Tone.Waveform(512);
    fft = new Tone.FFT(32);
    synth.fan(fft, waveform);
    panVol = new Tone.PanVol(-1,-10).toMaster();
    limiter = new Tone.Limiter(-10).toMaster();
    synth.chain(limiter, panVol).toMaster();

    var i = 0;
    if(!mobilecheck()) {
        jQuery("li").each(function () {
            jQuery(this).html("<span class='spanik'><span class='nota'>" + jQuery(this).attr('id') + "</span><br><span style='display: none' class='klavesa'>" + klavesnice[i] + "</span></span>");
            jQuery(this).css("color", "white");
            //console.log(jQuery(this).attr('id'));
            i++;
        });
    }


});
var verze=true;
function popisek() {
    if(verze)
    {

        jQuery(".nota").each(function () {

          jQuery(this).hide();

       });
        jQuery(".klavesa").each(function () {

            jQuery(this).show();

        });
        jQuery("#noticka").show();
        jQuery("#klavesnice").hide();
        verze=false;
    }
    else
    {

        jQuery(".nota").each(function () {

            jQuery(this).show();

        });
        jQuery(".klavesa").each(function () {

            jQuery(this).hide();

        });
        jQuery("#noticka").hide();
        jQuery("#klavesnice").show();
        verze=true;
    }

}

jQuery(".ovladaci").change(function () {

    var data = getNastaveniData();
    synth.set(data);
    socket.emit("zmenaNastaveni", data);
    console.log("ccc");
});


function getNastaveniData(){
//console.log("odes");
    var attack = parseFloat(jQuery("input[name=attack]").val());
    var decay = parseFloat(jQuery("input[name=decay]").val());
    var sustain = parseFloat(jQuery("input[name=sustain]").val());
    var release = parseFloat(jQuery("input[name=release]").val());
    var wave = jQuery("select[name=wave]").val();
    var detune = parseFloat(jQuery("input[name=detune]").val());
    var data = {
        "filter" : {
            "type": "lowpass"
        },
        "oscillator" : {
            "type": wave,
            "detune": detune
        },
        "envelope" : {
            "attack" : attack,
            "decay" : decay,
            "sustain" : sustain,
            "release" : release
        },
    };

    console.log(data);
    return data;
}

socket.on("zmenaNastaveni", function(data){
    //console.log("prij");
    jQuery("input[name=attack]").val(data.envelope.attack);
    jQuery("input[name=decay]").val(data.envelope.decay);
    jQuery("input[name=sustain]").val(data.envelope.sustain);
    jQuery("input[name=release]").val(data.envelope.release);
    jQuery("input[name=detune]").val(data.oscillator.detune);
    jQuery("select[name=wave]").val(data.oscillator.type);
    synth.set(data);
});

if(!mobilecheck()) {
//drawing the FFT
    var fftContext = $("<canvas>", {
        "id": "fft"
    }).appendTo("#Content").get(0).getContext("2d");

//the waveform data
    var waveContext = $("<canvas>", {
        "id": "waveform"
    }).appendTo("#Content").get(0).getContext("2d");

    var waveformGradient;

    function drawWaveform(values) {
        //draw the waveform
        // waveContext.fillStyle="rgba(60,60,60,1)";
        waveContext.clearRect(0, 0, canvasWidth, canvasHeight);
        waveContext.beginPath();
        waveContext.lineJoin = "round";
        waveContext.lineWidth = 6;
        waveContext.strokeStyle = waveformGradient;
        waveContext.moveTo(0, (values[0] / 255) * canvasHeight);
        for (var i = 1, len = values.length; i < len; i++) {
            var val = (values[i] + 1) / 2;
            var x = canvasWidth * (i / len);
            var y = val * canvasHeight;
            waveContext.lineTo(x, y);
        }
        waveContext.stroke();
    }

//size the canvases
    var canvasWidth, canvasHeight;

    function sizeCanvases() {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        waveContext.canvas.width = canvasWidth;
        fftContext.canvas.width = canvasWidth;
        waveContext.canvas.height = canvasHeight;
        fftContext.canvas.height = canvasHeight;
        //make the gradient
        waveformGradient = waveContext.createLinearGradient(0, 0, canvasWidth, canvasHeight);
        waveformGradient.addColorStop(0, "#ddd");
        waveformGradient.addColorStop(1, "#ddd");
    }

    sizeCanvases();
    $(window).resize(sizeCanvases);

    function loop() {
        requestAnimationFrame(loop);
        //get the fft data and draw it
        var fftValues = fft.getValue();
        // drawFFT(fftValues);
        //get the waveform valeus and draw it
        var waveformValues = waveform.getValue();
        drawWaveform(waveformValues);
    }

    loop();

}



//var C5, CS5, D5, DS5;
