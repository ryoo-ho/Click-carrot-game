"use strict";

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.popUPRefreshBtn = document.querySelector(".pop-up__refresh");
    this.popUpMessage = document.querySelector(".pop-up__message");
    this.popUPRefreshBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }
  setClickListener(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.popUp.classList.add("make__hide");
  }
  show(text) {
    this.popUp.classList.remove("make__hide");
    this.popUpMessage.innerText = text;
  }
}
