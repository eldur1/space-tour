const btnScroll = document.querySelector(".btn-scroll");
const ScrollTo = document.querySelector(".section--what");
btnScroll.addEventListener("click", (e) => {
    zenScroll.to(ScrollTo)
})