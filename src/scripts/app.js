import gsap from 'gsap';

import { _getProperty } from 'gsap/gsap-core';
let input = document.querySelector('.input');
let fusee = document.querySelector('.fusee-js');


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
    /*         gsap.to(".fusee-js", {
                y:"-="+accumulate,
                duration: 1,
                rotate: "8deg"
            }); */

            var transformValues = window.getComputedStyle(fusee).getPropertyValue("transform").match(/(-?[0-9\.]+)/g);
            let distance = transformValues[5];
            console.log(distance);
                

        }, 1000);


        // mouvement perpetuel
    }
    // Etape 2 : dans l'espace
    else if(i < 30) {
        let posY = -500; 
        gsap.to(".fusee-js", {    
            y:"+="+posY,
            duration: 1,
        });
        console.log(i);
        // Change stage objectif

    }
    else if(i < 35) {
        console.log('bloqué');
        // Mission complete

    }

/*             // Etape 2
    gsap.to(".fusee-js", {
        y:"-="+posY,
        duration: 1,
        rotate:"-85deg",
    });


 */
    i++;

}


// Detect space bar 
window.onkeypress = (e) => {
    if(e.keyCode == 32) {
        fuseeAnimation()
        input.classList.add("active");
    } 
}

input.addEventListener("mousedown", (e) => {
    fuseeAnimation()
})

 window.onkeyup = (e) => {
     if(e.keyCode == 32) {
         gsap.to(".input", 0.3, {
             opacity:0.5
         });
        input.classList.remove("active");
     }
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




