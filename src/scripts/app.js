import gsap from 'gsap';
import { _getProperty } from 'gsap/gsap-core';
let space_bar = document.querySelector('.space-bar');
let fusee = document.querySelector('.fusee-js');


let i = 0;



// Faire descendre la fusée si on reste pas appuyé
function fuseeAnimation() {
    // Etape 1
    if(i < 25) {
        let posY = -20;
        gsap.to(".fusee-js", {
            y:"+="+posY,
            duration: 1,
            rotate: "8deg"
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
    else if(i < 35) {
        let posY = -1000;
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

function SpaceBarAnimation() {
}


// Detect space bar 


window.onkeypress = (e) => {
    if(e.keyCode == 32) {
        fuseeAnimation()
        SpaceBarAnimation()
        gsap.to(".space-bar", 0.3, {
            opacity:1
        });
        SpaceBarAnimation()
    } 
}


window.onkeyup = (e) => {
    gsap.to(".space-bar", 0.3, {
        opacity:0.5
    });
}
    



