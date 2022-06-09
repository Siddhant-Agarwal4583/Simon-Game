var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(document).on("keypress",function(event){
  if(!started){
    nextSequence();
    started=true;
  }
});

function nextSequence(){
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function checkAnswer(currentLevel){
  // if(userClickedPattern.length<=gamePattern.length && userClickedPattern[userClickedPattern.length-1]!==gamePattern[userClickedPattern.length-1]){
  //   $("body").addClass("game-over");
  //   playSound("wrong");
  //   setTimeout(function(){
  //     $("body").removeClass("game-over");
  //   },100);
  // }
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    // console.log("success");

    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        userClickedPattern=[];
        nextSequence();
      },1000);
    }

  }

  else{

    // console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }


}


$(".btn").on("click",function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  // console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function startOver(){
  console.log("Level: "+level);
  level=0;
  console.log("gamePattern: "+gamePattern);
  console.log("userClickedPattern: "+userClickedPattern);
  gamePattern=[];
  userClickedPattern=[];
  started=false;
}
