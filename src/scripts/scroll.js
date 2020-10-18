const btnScroll = document.querySelector(".btn-scroll");

// function easeOutCubic(t) {
//     return 1 - easeInCubic(1 - t);
// }

// function ScrollDown(e, time, where) {
//     var eTop = e.getBoundingClientRect().top;
//     var eAmt = eTop / 100;
//     var curTime = 0;
//     while (curTime <= time) {
//         window.setTimeout(SVS_B, curTime, eAmt, where);
//         curTime += time / 100;
//     }
// }

// function SVS_B(eAmt, where) {
//     if (where == "center" || where == "")
//         window.scrollBy(0, eAmt / 2);
//     if (where == "top")
//         window.scrollBy(0, eAmt);
// }
// // Code forké de
// //  https://stackoverflow.com/questions/51229742/javascript-window-scroll-behavior-smooth-not-working-in-safari


btnScroll.addEventListener("click", (e) => {
    ScrollDown(document.querySelector(".section--what"), 500, "top");
})