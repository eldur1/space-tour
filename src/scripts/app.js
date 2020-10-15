import gsap from 'gsap';
let space_bar = document.querySelector('.space-bar');



let i = 0;

function perpetualMouvement() {
    while(i > 3) {
        setInterval(function(){ 
            console.log("Hello"); 
            }, 3000);
    }

  }

function fuseeAnimation() {


    // Etape 1
    if(i < 1) {
        let posY = -20;
        gsap.to(".fusee-js", {
            y:"+="+posY,
            duration: 1,
            rotate: "8deg"
        });
        console.log(i);
    }
    else if(i < 2) {
        let posY = -120;
        gsap.to(".fusee-js", {
            y:"+="+posY,
            duration: 1,
        });
        console.log(i);

    }
    else if(i < 3) {
        let posY = -1000;
        gsap.to(".fusee-js", {
            y:"+="+posY,
            duration: 1,
        });
        console.log(i);
        // Change stage objectif

    }
    else if(i < 4) {
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
    perpetualMouvement();
});

window.onkeydown = function(e) { 
    fuseeAnimation();
    perpetualMouvement();
    return !(e.keyCode == 32);
};