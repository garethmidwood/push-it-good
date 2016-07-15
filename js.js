// all times in seconds
var timings = [
  2, 5, 24, 28, 71, 84, 85, 86, 88, 90, 92, 94, 96, 97, 110, 136, 139, 142, 145, 170, 171, 175, 185, 186, 189, 190, 193
];
var started = false;
var scoring = false;
var hasScored = false;
var timer = 0;
var score = 0;


// handles request from pusher
function pushed() {
  if (scoring) {
    console.log('SCORE!');
    hasScored = true;
    doScore();
  } else {
    showEmoji('#poo');
  }
}

// starts video
function go() {
  video = $('video').get(0);

  if (!started) {
    $('#play').remove();
    started = true;
    video.play();
    setInterval(ticker, 1000);
    $('body').addClass('playing');
  }
}

// decides whether them gangsta's just holla'd a push
function ticker() {
  timer++;

  if (timings.indexOf(timer) >= 0) {
    showPush(timings.indexOf(timer) % 2);
  }
}

// show something on screen, they PUSHED it (real good)
function showPush(odd) {
  var toggle = odd ? '#push-odd' : '#push-even';

  scoring = true;
  hasScored = false;
  $(toggle).fadeIn(function() {
    $(this).fadeOut(function() {
      scoring = false;
      if (!hasScored) {
        showEmoji('#poo');
      }
    });
  });
}


function doScore() {
  var emojis = ['#great', '#good', '#ok'];

  var emojiSelector = emojis[Math.floor(Math.random()*emojis.length)];

  var points = 0;

  switch(emojiSelector) {
    case '#great':
      points = 500; 
      shake();
      break;
    case '#good':
      points = 300; 
      break;
    case '#ok':
      points = 100; 
      break;
  }

  scorePoints(points);

  showEmoji(emojiSelector);
}

function showEmoji(emojiSelector) {
  var clone = $(emojiSelector).clone();
  
  $(clone).insertAfter(emojiSelector);

  $(clone).css({
    //for safari & chrome
    "-webkit-animation-name":"spinning",
    "-webkit-animation-duration":"0.6s",
    "-webkit-animation-iteration-count":"1",
    "-webkit-animation-fill-mode" : "forwards",
  });

  $(clone).animate({
    left: $('body').width() / 2 - $("#poo").width() / 2,
    top: $('body').height() / 2 - $("#poo").height() / 2
  }, 600, function() {
    
    // get rid of the emoji after it's been on screen a wee bit
    $(clone).delay(200).animate({
      left: -400
    }, 300, function() {
      $(this).remove();
    });

  });
};

function scorePoints(points) {
    score += points;

    $('#score span').html(score).css('color', 'orange').animate({
      fontSize: 140
    }, 100, function() {
      $(this).animate({
        fontSize: 40
      }, 100, function() {
        $(this).css('color', 'white'); 
      });
    });
}

function shake() {
  $('body').animate({
    'background-position-x': "20px",
    'background-position-y': "-30px"
  }, 100, function() {
    $(this).animate({
      'background-position-x': "-20px",
      'background-position-y': "30px"
    }, 100, function() {
      $(this).animate({
      'background-position-x': "0",
      'background-position-y': "0"
    }, 100);
    });
  });
}
