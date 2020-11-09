"use strict";
const btnScroll = document.querySelector(".btn--scroll");
const ScrollTo = document.querySelector(".section--what");
btnScroll.addEventListener("click", (e) => {
    zenscroll.to(ScrollTo, 800);
})