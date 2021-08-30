"use strict";

import PopUp from "./popup.js";

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 2;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const gameStartBtnIcon = gameBtn.querySelector(".fas");

const popUp = document.querySelector(".pop-up");
const popUPRefreshBtn = document.querySelector(".pop-up__refresh");
const popUpMessage = document.querySelector(".pop-up__message");

let started = false;
let score = 0;
let timer = null;

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const wonSound = new Audio("./sound/game_win.mp3");

gameTimer.innerText = `${GAME_DURATION_SEC}.00`;

field.addEventListener("click", onFieldClick);

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame("Replay?");
  } else {
    startGame();
  }
});

// ----- GAME FIELD -----
function onFieldClick(event) {
  const target = event.target;

  if (target.matches(".carrot")) {
    target.remove();
    score++;
    console.log(event.target);
    updateScoreBoard();
    playSound(carrotSound);
  } else if (target.matches(".bug")) {
    stopGame("You Lose!");
    playSound(bugSound);
  }
}

function hideField() {
  field.classList.add("make__hide");
}
function showField() {
  field.classList.remove("make__hide");
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
  if (score == CARROT_COUNT) {
    stopGame("You Won!");
    timerStop();
    playSound(wonSound);
  }
}

function initGame() {
  field.innerHTML = "";
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

// ----- START & STOP GAME -----
function startGame() {
  gameScore.innerText = CARROT_COUNT;
  score = 0;
  started = true;
  showField();
  initGame();
  showStopBtn();
  timerStart(GAME_DURATION_SEC);
  showGameBtn();
  gameFinishBanner.hide();
}

function stopGame(message) {
  started = false;
  hideField();
  timerStop();
  showStopBtn();
  hideGameBtn();
  gameFinishBanner.show(message);
}

// ----- BUTTON -----
function showGameBtn() {
  gameBtn.classList.remove("make__hide");
}
function hideGameBtn() {
  gameBtn.classList.add("make__hide");
}

function showStopBtn() {
  gameStartBtnIcon.classList.add("fa-stop");
  gameStartBtnIcon.classList.remove("fa-play");
}

// TIMER
function timerStart(seconds) {
  slowTimer(seconds);
}

function timerStop() {
  clearInterval(timer);
}

function slowTimer(seconds) {
  timer = setInterval(() => {
    seconds = seconds - 0.01;
    console.log(seconds);
    gameTimer.innerText = seconds.toFixed(2);
    if (gameTimer.innerText == 0) {
      clearInterval(timer);
      hideField();
      gameFinishBanner.show("Time Over");
      gameBtn.classList.add("make__hide");
    }
  }, 10);
}

// ----- SOUND -----

function playSound(sound) {
  sound.play();
}
