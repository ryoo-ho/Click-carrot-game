const timer = document.querySelector(".timer");
const timer2 = document.querySelector(".timer2");
let a = 1;
let b = 10;

function A() {}
function B() {
  b++;
  timer.innerText = b;
}

setInterval(() => {
  a++;
  timer2.innerText = a;
}, 1000);
setInterval(B, 500);
