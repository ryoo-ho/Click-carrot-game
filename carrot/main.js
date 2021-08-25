"use strict";

const CARROT_SIZE = 80;
const CARROY_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

const popUp = document.querySelector(".pop-up");
const popUPBtn = document.querySelector(".pop-up__refresh");
const popUpMessage = document.querySelector(".pop-up__message");

let started = false;
let score = 0;
let timer = null;

gameTimer.innerText = GAME_DURATION_SEC;

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  initGame();
  showStopBtn();
  timerStart(GAME_DURATION_SEC);
}

function stopGame() {
  timerStop();
  const gameStopBtnIcon = gameBtn.querySelector(".fa-stop");
  gameStopBtnIcon.classList.add("fa-play");
  gameStopBtnIcon.classList.remove("fa-stop");

  hideStopBtn();
  showPopUp("fuck you");
}

function showPopUp(text) {
  popUpMessage.innerText = text;
  popUp.classList.remove("pop-up__hide");
  field.classList.add("pop-up__hide");
}

function showStopBtn() {
  const gameStartBtnIcon = gameBtn.querySelector(".fa-play");
  gameStartBtnIcon.classList.add("fa-stop");
  gameStartBtnIcon.classList.remove("fa-play");
}

function hideStopBtn() {
  gameBtn.style.visibility = "hidden";
}

function timerStart(seconds) {
  let time = seconds;
  timer = setInterval(() => {
    time = time - 1;
    gameTimer.innerText = time;
    if (time == 0) {
      clearInterval(timer);
      showPopUp();
    }
  }, 1000);
}

function timerStop() {
  clearInterval(timer);
}

function initGame() {
  field.innerHTML = "";
  // 벌레와 당근을 생성한 뒤 field에 추가
  addItem("carrot", CARROY_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");

  // 당근을 클릭하면 카운트
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

//refresh 새로운 게임 시작
