// 再生中の曲を15秒スキップする関数
function skip15sec(){
  var player  = document.querySelector("audio");
  player.currentTime = player.currentTime + 15;
}

// 再生中の曲を15秒巻き戻すする関数
function rewind15sec(){
  var player  = document.querySelector("audio");
  player.currentTime = player.currentTime - 15;
}

// 先頭まで巻き戻す関数
function rewindToTop(){
  var player = document.querySelector("audio");
  player.currentTime = 0;
}

// ループ再生を on にする関数
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

// アニメーションの各フレームを描画する関数
function draw(){
  // 全画面を黒で塗りつぶし、リセット
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var data = getData();  //その時点での曲の解析結果を取得
  var i = 0;
  var offset = 5;
  var width  = (canvas.width - offset * (data.length  + 1)) / data.length;
  var x = offset;
  ctx.fillStyle = "rgb(255, 255, 255)";

  // 解析結果を棒グラフで表示
  while(i < data.length){
    var h = data[i] * canvas.height / 2;
    ctx.fillRect(x, canvas.height / 2 - h, width, h);
    x = x + width + offset;
    i = i + 1;
  }
}

// 音声を解析するオブジェクトを作成する関数
// http://curtaincall.weblike.jp/portfolio-web-sounder/webaudioapi-visualization/draw-wave に
// 解説あり
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

// 解析結果を配列で返す関数
function getData(){
  var data = new Float32Array(analyser.fftSize);
  analyser.getFloatTimeDomainData(data);
  return data;
}

// アニメーションをする関数
// requestAnimationFrame については
// http://liginc.co.jp/web/js/130758 に解説があります
function update(){
  draw();
  requestAnimationFrame(update);
}

// ボタン
var skip15secButton = document.querySelector("#skip");
skip15secButton.addEventListener("click",  onSkip15secButtonClicked);

var rewind15secButton = document.querySelector("#rewind");
rewind15secButton.addEventListener("click",  onRewind15secButtonClicked);

var rewindToTopButton = document.querySelector("#rewindToTop");
rewindToTopButton.addEventListener("click",  onRewindToTopButtonClicked);

var enableLoopButton = document.querySelector("#enableLoop");
enableLoopButton.addEventListener("click",  onEnableLoopButtonClicked);

// キャンバス
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

// 音声解析オブジェクトを作成
var analyser = createAnalyser();

// アニメーション開始
update();
