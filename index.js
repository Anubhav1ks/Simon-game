var buttoncolor=["red","blue","green","yellow"];
var gamepattern=[];
var userclickpattern=[];
var level=0;
var started=false;


$(".btn").click(function(){
  var userchooseclick= $(this).attr("id");
  userclickpattern.push(userchooseclick);
  // alert(userclickpattern);
  playsound(userchooseclick);
  animatepress(userchooseclick);
  // alert(userclickpattern.length);
  checkanswer(userclickpattern.length-1);
});

function nextSequence(){
    userclickpattern = [];
  level++;
  $("#level-title").text("level "+level);
  var randomnumber= Math.floor(Math.random()*4);
  var randomchoosecolor=buttoncolor[randomnumber];
  gamepattern.push(randomchoosecolor);
  // $("#"+randomchoosecolor).addClass("pressed");
  $("#" + randomchoosecolor).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomchoosecolor);
}

function playsound(name){
  var audio = new Audio("sounds/" + name+ ".mp3");
  audio.play();
}
function animatepress(currentcolor){
  $("#"+currentcolor).addClass("pressed");
  setInterval(function(){
    $("#"+currentcolor).removeClass("pressed");
  },100);
}

$(document).keypress(function(){
  if (!started){
    $("#level-title").text("Level  " + level);
    nextSequence();
    started=true;
  }
});

function checkanswer(currentlevel){
    if(gamepattern[currentlevel]===userclickpattern[currentlevel]){
      console.log("success");
      if(userclickpattern.length===gamepattern.length){
      setTimeout(function(){
        nextSequence();
      },1000)
      }
    }
    else{
      console.log("wrong");
      playsound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass();
      },200);
      $("#level-title").text("Press A Key to Start");
    }
    startover();
}

function startover(){
  level=0;
  gamepattern=[];
  started=false;
}
