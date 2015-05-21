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

function draw(){
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var data = getData();
  var i = 0;
  var offset = 5;
  var width  = (canvas.width - offset * (data.length  + 1)) / data.length;
  var x = offset;
  ctx.fillStyle = "rgb(255, 255, 255)";
  while(i < data.length){
    var h = data[i] * canvas.height / 2;
    ctx.fillRect(x, canvas.height / 2 - h, width, h);
    x = x + width + offset;
    i = i + 1;
  }
}

function createAnalyser(){
  var player = document.querySelector("audio");
  var audioContext = new AudioContext();
  var source = audioContext.createMediaElementSource(player);
  var analyser = audioContext.createAnalyser();
  source.connect(audioContext.destination);
  analyser.fftSize = 256;
  source.connect(analyser);
  return analyser;
}

function getData(){
  var data = new Float32Array(analyser.fftSize);
  analyser.getFloatTimeDomainData(data);
  return data;
}

function update(){
  draw();
  requestAnimationFrame(update);
}

var skip15secButton = document.querySelector("#skip");
skip15secButton.addEventListener("click",  onSkip15secButtonClicked);

var rewind15secButton = document.querySelector("#rewind");
rewind15secButton.addEventListener("click",  onRewind15secButtonClicked);

var rewindToTopButton = document.querySelector("#rewindToTop");
rewindToTopButton.addEventListener("click",  onRewindToTopButtonClicked);

var enableLoopButton = document.querySelector("#enableLoop");
enableLoopButton.addEventListener("click",  onEnableLoopButtonClicked);

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var analyser = createAnalyser();

update();
