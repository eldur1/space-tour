'use strict';
import gsap from 'gsap';

import { _getProperty } from 'gsap/gsap-core';
let input = document.querySelector('.input');
let fusee = document.querySelector('.fusee-js');
let i = 0;


// particle js
import { tsParticles } from "tsparticles";

tsParticles
  .loadJSON("tsparticles", "../assets/gravity/particlesjs-config.json")
  .then((container) => {
    console.log("callback - tsparticles config loaded");
  })
  .catch((error) => {
    console.error(error);
  });






function fuseeAnimation() {
    // Etape 1 : sortie de l'atmosphere
    if(i < 20) {
        let posY = -20;
        gsap.to(".fusee-js", {
            y:"+="+posY,
            duration: 0.5,
            rotate: "8deg",
        });
    }
    // Etape 2 : dans l'espace
    else if(i < 30) {
        let posY = -500; 
        gsap.to(".fusee-js", {    
            y:"+="+posY,
            duration: 1,
        });
        // Change stage objectif
    }
    i++;
}


window.onkeypress = (e) => {
    if(e.keyCode == 32) {
        fuseeAnimation()
        // gsap.to(".input", 0.3, {
        //     opacity:1
        // });
    } 
}

input.addEventListener("mousedown", (e) => {
    fuseeAnimation()
})

// window.onkeyup = (e) => {
//     if(e.keyCode == 32) {
//         gsap.to(".input", 0.3, {
//             opacity:0.5
//         });
//     }
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
// }




