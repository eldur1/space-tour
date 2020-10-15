import gsap from 'gsap';
let space_bar = document.querySelector('.space-bar');



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
        console.log(i);


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


space_bar.addEventListener('click', (e)=> {
    fuseeAnimation();

});

window.onkeydown = function(e) { 
    fuseeAnimation();
    return !(e.keyCode == 32);
};