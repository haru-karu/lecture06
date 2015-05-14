function skip15sec(){
  var player  = document.querySelector("audio");
  player.currentTime = player.currentTime + 15;
}

function rewind15sec(){
  var player  = document.querySelector("audio");
  player.currentTime = player.currentTime - 15;
}

function rewindToTop(){
  var player = document.querySelector("audio");
  player.currentTime = 0;
}

function enableLoop(){
  var player = document.querySelector("audio");
  player.loop = true;
}

function onSkip15secButtonClicked(event){
  skip15sec();
}

function onRewind15secButtonClicked(event){
  rewind15sec();
}

function onRewindToTopButtonClicked(event){
  rewindToTop();
}

function onEnableLoopButtonClicked(event){
  enableLoop();
}

var skip15secButton = document.querySelector("#skip");
skip15secButton.addEventListener("click",  onSkip15secButtonClicked);

var rewind15secButton = document.querySelector("#rewind");
rewind15secButton.addEventListener("click",  onRewind15secButtonClicked);

var rewindToTopButton = document.querySelector("#rewindToTop");
rewindToTopButton.addEventListener("click",  onRewindToTopButtonClicked);

var enableLoopButton = document.querySelector("#enableLoop");
enableLoopButton.addEventListener("click",  onEnableLoopButtonClicked);
