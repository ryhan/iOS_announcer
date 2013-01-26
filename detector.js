$(window).load(function() {

WebSpeech.setVoice('en');

no_voice = false;

$('footer').bind("touchstart", function(e){
  WebSpeech.pause();
  $(e.currentTarget).hide();
  $('.reading').removeClass('reading');
  no_voice = true;
});

var vector = function(x,y){
  this.x = x;
  this.y = y;
}

var last_p = $('p')[0];

$('p').bind("touchstart", function(e){ last_p = e.currentTarget;});

var position = new vector( 0, 0),
    velocity = new vector( 0, 0),
    acceleration = new vector( 0, 0);

var flat_for = 0;


if ( window.DeviceMotionEvent != undefined ) 
{
  window.ondevicemotion = function(e) 
  {
    var gravity = event.accelerationIncludingGravity;
    acceleration.x = gravity.x * 5;
    acceleration.y = gravity.y * 5;

    var flat = (Math.abs(acceleration.x * acceleration.y) < 10);

    flat_for += 2*(flat == true) - 1;

    if (flat_for <= 0){ flat_for = 0;}
    if (flat_for > 30){ flat_for = 30;}

    if (flat_for > 10){ $('body').addClass('flat');}
    else{  $('body').removeClass('flat');}

    if (flat_for == 10 && flat== true && no_voice== false){
      
      var text = $(last_p).text();

      $('p').removeClass('reading');
      $(last_p).addClass('reading');
      WebSpeech.speak(text);
    }

    if (flat_for < 10){
      WebSpeech.pause();
      WebSpeech.stop();
    }

  }
}

});