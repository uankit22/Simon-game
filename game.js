var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var i = 0;
var start = 0;
var j = 0;
var newGame = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  increaseLevel(i);
  i++;
}

window.onkeydown = function(en) {
  if (start == 0) {

    nextSequence();

    start++;
  }
  if (newGame == 1) {

    startOver();

    newGame++;
  }
};

function increaseLevel(lvl) {
  lvl++;
  $("h1").text("level " + lvl);
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 50);
}


$(".btn").click(function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    $("#" + userChosenColour).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (i == 0) {
      gameover();
      startOver();
    }
    checkAnswer();
  }

)


function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function checkAnswer() {


  if (
    gamePattern[j] == userClickedPattern[0]) {
    userClickedPattern = [];
    j++;

  } else
    gameover();

  if (j == i) {
    setTimeout(function() {
      nextSequence();
      j = 0;
    }, 500);
  }

}

function gameover() {
  $("body").addClass("game-over");
  playSound("wrong");
  $("h1").text("Gameover, Press any key to restart");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  newGame = 1;

}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  i = 0;
  start = 1;
  j = 0;

  nextSequence();
}
