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
        text += " ♡ ";

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
 var klavesnice = ["Y", "S", "X", "D", "C", "V", "G", "B", "H", "N", "J", "M", ",", "L", ".", "Ů", "-", "Q", "2", "W", "3", "E", "4", "R", "T", "6", "Z", "7", "U", "I", "9", "O", "0","P","=","Ú"];

jQuery(document).ready(function(){
    var i = 0;
    jQuery("li").each(function () {
      jQuery(this).html("<span class='spanik'><span class='nota'>"+jQuery(this).attr('id')+"</span><br><span style='display: none' class='klavesa'>"+klavesnice[i]+"</span></span>");
      jQuery(this).css("color", "white");
      console.log(jQuery(this).attr('id'));
      i++;
    });

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






//var C5, CS5, D5, DS5;
