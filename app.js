function skip15sec(){
  var player = document.querySelector("audio");
  player.currentTime = player.currentTime + 15;
}

function showPlaybackRate(value){
  var label = document.querySelector("#playback-rate-control > span");
  label.textContent = "x " + value;
}

function setPlaybackRate(value){
  var player = document.querySelector("audio");
  player.playbackRate = value;
  
  showPlaybackRate(value);
}

function setMusic(index){
  var player = document.querySelector("audio");
  player.pause();

  index = index % playList.length;
  var music = playList[index];
  player.src = music;

  player.play();
}

function playNextMusic(){
  playing = (playing + 1) % playList.length;
  setMusic(playing);
}

function onSkip15secButtonClicked(event){
  skip15sec();
}

function onPlaybackRateChanged(event){
  var rate = playbackRateControl.value;
  setPlaybackRate(rate);
};

function onPlaybackEnded(event){
  playNextMusic();
};

var skip15secButton = document.querySelector("#skip-15s-button");
skip15secButton.addEventListener("click", onSkip15secButtonClicked);

var playbackRateControl = document.querySelector("#playback-rate-control > input");
playbackRateControl.addEventListener("change", onPlaybackRateChanged);

var playList = ["01.mp3", "02.mp3", "03.mp3"];
var playing = 0;

var player = document.querySelector("audio");
player.addEventListener("ended", onPlaybackEnded);
