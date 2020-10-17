import gsap from 'gsap';

import { _getProperty } from 'gsap/gsap-core';
let input = document.querySelector('.input');
let fusee = document.querySelector('.fusee-js');
let planets = document.querySelectorAll('.planet');

let i = 0;

function fuseeAnimation() {
    // Etape 1
    if(i < 25) {
        let posY = -20;
        gsap.to(".fusee-js", {
            y:"+="+posY,
            duration: 0.5,
            rotate: "8deg",
        });
        setTimeout(() => {
            var transformValues = window.getComputedStyle(fusee).getPropertyValue("transform").match(/(-?[0-9\.]+)/g);
            let distance = transformValues[5];
            console.log(distance);
        }, 1000);


    }
    else {
            // Faire avancer les planètes + bouger les étoiles
            let posY = +50;
            gsap.to('.planet', {
                y:"+="+posY,
            });
        console.log(i);
        // Change stage objectif
    }
    i++;

}



// Detect space bar 
/* window.onkeydown = function (e){
    switch(e.key) {
        case 'ArrowLeft':
            gsap.to(".fusee-js", {
                rotate:"-=3deg",
                duration:0.3,
            });
            break;
        case 'ArrowRight':
            gsap.to(".fusee-js", {
                rotate:"+=3deg",
                duration:0.3
            });
            break;
        case 'ArrowUp':
            fuseeAnimation()
            input.classList.add("active");
            gsap.to(".input", 0.3, {
                opacity:0.5
            });
            input.classList.remove("active");
            console.log("cocou");
            break;

    }
} */


 input.addEventListener("mousedown", (e) => {
    fuseeAnimation()
})

     window.onkeyup = (e) => {
     if(i < 20) {
        setTimeout(() => {
            var transformValues = window.getComputedStyle(fusee).getPropertyValue("transform").match(/(-?[0-9\.]+)/g);
            let distance = transformValues[5];
            console.log(distance);
            gsap.to('.fusee-js', 2, {
                y:0
            });
            i = 0;
        }, 500);
    } 
}
 


