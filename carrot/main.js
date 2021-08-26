"use strict";

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

const popUp = document.querySelector(".pop-up");
const popUPRefreshBtn = document.querySelector(".pop-up__refresh");
const popUpMessage = document.querySelector(".pop-up__message");

let started = false;
let score = 0;
let secondsTimer = null;
let millisecondsTimer = null;

gameTimer.innerText = `${GAME_DURATION_SEC}.0`;

// 게임 화면을 클릭 했을 때
field.addEventListener("click", onFieldClick);

// 게임 화면을 클릭 했을 때 - 당근이면? 벌레면?
function onFieldClick(event) {
  const target = event.target;

  // 클릭하는 target에 class가 carrot 이면 실행
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    console.log(event.target);
    updateScoreBoard();

    // 클릭하는 target에 class가 bug 이면 실행
  } else if (target.matches(".bug")) {
    stopGame("You Lose!");
  }
}

// 팝업창의 리플레이 버튼을 눌렀을 때
popUPRefreshBtn.addEventListener("click", () => {
  startGame();
  hidePopUp();
});

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
  if (score == CARROT_COUNT) {
    stopGame("You Won!");
    timerStop();
  }
}

// 게임 시작 버튼을 눌렀을 때
gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame("Replay?");
  } else {
    startGame();
  }
});

function startGame() {
  gameScore.innerText = CARROT_COUNT;
  score = 0;
  started = true;
  initGame();
  showStopBtn();
  timerStart(GAME_DURATION_SEC);
  hidePopUp();
}

function initGame() {
  field.innerHTML = "";
  // 벌레와 당근을 생성한 뒤 field에 추가
  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");

    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function stopGame(message) {
  started = false;
  timerStop();
  const gameStopBtnIcon = gameBtn.querySelector(".fa-stop");
  gameStopBtnIcon.classList.add("fa-play");
  gameStopBtnIcon.classList.remove("fa-stop");

  //   hideStopBtn();
  showPopUp(message);
}

function showPopUp(text) {
  popUpMessage.innerText = text;
  popUp.classList.remove("pop-up__hide");
  field.classList.add("pop-up__hide");
}

function hidePopUp() {
  field.classList.remove("pop-up__hide");
  popUp.classList.add("pop-up__hide");
}

function showStopBtn() {
  const gameStartBtnIcon = gameBtn.querySelector(".fas");
  gameStartBtnIcon.classList.add("fa-stop");
  gameStartBtnIcon.classList.remove("fa-play");
}

// function hideStopBtn() {
//   gameBtn.style.visibility = "hidden";
// }

function timerStart(seconds) {
  slowTimer(seconds);
  //   fastTimer(seconds);
}

function slowTimer(seconds) {
  let timer = seconds;
  secondsTimer = setInterval(() => {
    timer = timer - 0.01;

    gameTimer.innerText = timer.toFixed(2);
    if (gameTimer.innerText == 0) {
      clearInterval(secondsTimer);
      showPopUp("Time Over");
    }
  }, 10);
}

// function fastTimer(seconds) {
//   let miliTimer = seconds;
//   millisecondsTimer = setInterval(() => {
//     miliTimer--;
//     gameTimerMiliSec.innerText = miliTimer;
//     if (miliTimer == 0) {
//       clearInterval(millisecondsTimer);
//       showPopUp("Time Over");
//     }
//   }, 100);
// }

function timerStop() {
  clearInterval(secondsTimer);
  clearInterval(millisecondsTimer);
}

// 벌레와 당근을 생성한 뒤 field에 추가
function initGame() {
  field.innerHTML = "";
  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
}

// 벌레와 당근을 생성하는 함수
function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");

    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
