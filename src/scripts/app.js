const { default: gsap } = require("gsap/gsap-core");
import CSSPlugin from "gsap/CSSPlugin"
gsap.registerPlugin(CSSPlugin);
var Victor = require('victor');
    // INIT

    var canvas = document.getElementById("myCanvas");
    var clientWidth = document.body.clientWidth;
    var clientHeight = document.body.clientHeight;
    var ctx = canvas.getContext("2d");
    var playerHeight = 85;
    var playerWidth = 70;
    var playerX = (clientWidth - playerWidth) / 2;
    var playerY = (clientHeight - playerHeight) / 2;
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;
    // Import img
    var img = new Image();
    img.src = "../assets/gravity/rocket.svg";
    var asteroid = new Image();
    asteroid.src = "../assets/__planets/terre.svg";
    let mars = new Image()
    mars.src = "../assets/__planets/mars.svg";

    // Ajout planète
    var planetes = [
        ["jupiter"],
        ["mars"],
        ["neptune"],
        ["saturn"],
        ["terre"],
        ["uranus"],
        ["vénus"]
    ] 




    let gravity = false;


    var asteroidX = 600;
    var asteroidY = 200;
    var asteroidHeight = 150;
    var asteroidWidth = 150;

    var ratio = window.devicePixelRatio || 1;



    // Ajout planètes

    for(let item in planetes) {
        let planete = planetes[item]
        planetes[item] = new Image();
        planetes[item].className = planete;
        planetes[item].src = "../assets/__planets/" + planete + ".svg";
        console.log(planetes[item]);
        //ctx.drawImage(planetes[item], 0,0) ; 
    }






    // KEYBOARD
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    function keyDownHandler(e) {
        if ("code" in e) {
            switch(e.code) {
                case "Unidentified":
                    break;
                case "ArrowRight":
                case "Right": // IE <= 9 and FF <= 36
                case "KeyD":
                    rightPressed = true;
                    return;
                case "ArrowLeft":
                case "Left": // IE <= 9 and FF <= 36
                case "KeyA":
                    leftPressed = true;
                    return;
                case "ArrowUp":
                case "Up": // IE <= 9 and FF <= 36
                case "KeyW":
                    upPressed = true;
                    return;
                case "ArrowDown":
                case "Down": // IE <= 9 and FF <= 36
                case "KeyS":
                    downPressed = true;
                    return;
                default:
                    return;
            }
        }

        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
        if(e.keyCode == 40) {
            downPressed = true;
        }
        else if(e.keyCode == 38) {
            upPressed = true;
        }
    }
    function keyUpHandler(e) {
        if ("code" in e) {
            switch(e.code) {
                case "Unidentified":
                    break;
                case "ArrowRight":
                case "Right": // IE <= 9 and FF <= 36
                case "KeyD":
                    rightPressed = false;
                    return;
                case "ArrowLeft":
                case "Left": // IE <= 9 and FF <= 36
                case "KeyA":
                    leftPressed = false;
                    return;
                case "ArrowUp":
                case "Up": // IE <= 9 and FF <= 36
                case "KeyW":
                    upPressed = false;
                    return;
                case "ArrowDown":
                case "Down": // IE <= 9 and FF <= 36
                case "KeyS":
                    downPressed = false;
                    return;
                default:
                    return;
            }
        }

        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
        if(e.keyCode == 40) {
            downPressed = false;
        }
        else if(e.keyCode == 38) {
            upPressed = false;
        }
    }

    // TOUCH
    document.addEventListener("touchstart", touchHandler);
    document.addEventListener("touchmove", touchHandler);
    function touchHandler(e) {
        if(e.touches) {
            playerX = e.touches[0].pageX - canvas.offsetLeft - playerWidth / 2;
            playerY = e.touches[0].pageY - canvas.offsetTop - playerHeight / 2;
            output.innerHTML = "Touch:  <br />"+ " x: " + playerX + ", y: " + playerY;
            e.preventDefault();
        }
    }

    // GAMEPAD
    window.addEventListener("gamepadconnected", gamepadHandler);
    var controller = {};
    var buttonsPressed = [];
    function gamepadHandler(e) {
        controller = e.gamepad;
        output.innerHTML = "Gamepad: " + controller.id;
    }
    function gamepadUpdateHandler() {
        buttonsPressed = [];
        if(controller.buttons) {
            for(var b=0; b<controller.buttons.length; b++) {
                if(controller.buttons[b].pressed) {
                    buttonsPressed.push(b);
                }
            }
        }
    }
    function gamepadButtonPressedHandler(button) {
        var press = false;
        for(var i=0; i<buttonsPressed.length; i++) {
            if(buttonsPressed[i] == button) {
                press = true;
            }
        }
        return press;
    }
    // Dynamic resizing of canvas
    function canvasResize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width  = canvas.width + "px";
        canvas.style.height = canvas.height + "px";
        canvas.width  *= ratio;
        canvas.height *= ratio;
        ctx.scale(ratio, ratio);
    }
    // Dynamic rocket position
    function rocketResize() {
        playerX = (window.innerWidth-85)/2;
        playerY = (window.innerHeight-70)/2;
    }
 
    // DRAW

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var asteroidPos = new Victor(asteroidX + (asteroidWidth/2), asteroidY + (asteroidHeight/2));
        var playerPos = new Victor(playerX + (playerWidth/2), playerY + (playerHeight/2));
        var vectorX = ((asteroidX + asteroidWidth/2) - (playerX + playerWidth/2));
        var vectorY = ((asteroidY + asteroidHeight/2) - (playerY + playerHeight/2));
        var distance = playerPos.distance(asteroidPos);
        var angleV = Victor(vectorX, vectorY).verticalAngleDeg();
        var angleH = Victor(vectorX, vectorY).angleDeg();
        if (distance <= 200) {
            // vérifie le playerX/playerY par rapport au asteroidX/asteroidY
            if (angleV >= 0 && angleH > 0 ) {
                playerX += 2;
                playerY += 2;
            } 
            else if (angleV <= 0 && angleH < 0 ) {
                playerX += -2;
                playerY += -2;
            }
            else if (angleV >= 0 && angleH < 0 ) {
                playerX += 2;
                playerY += -2;
            }
            else if (angleV <= 0 && angleH > 0 ) {
                playerX += -2;
                playerY += 2;
            }
            
        }
        
        // KEYBOARD
            // Need to launch the rocket before being able to move the rocket
        if(rightPressed) {
            playerX += 3;
            if (playerX >= window.innerWidth-70) {
                playerX = window.innerWidth-70;
            }
        }
        else if(leftPressed) {
            playerX -= 3;
            if (playerX <= 0) {
                playerX = 0;
            }
        }
        if(downPressed) {
            playerY += 3;
            if (playerY >= window.innerHeight-85) {
                playerY = window.innerHeight-85;
            }
        }
        else if(upPressed) {
            playerY -= 6;
            if (playerY <= 0) {
                playerY = 0;
            }
        }
        ctx.drawImage(asteroid, asteroidX, asteroidY, asteroidWidth, asteroidHeight);
        ctx.drawImage(img, playerX, playerY, playerWidth, playerHeight);
        requestAnimationFrame(draw);
    }
    window.onresize = function() {
        canvasResize();
        rocketResize();
    }
    canvasResize();
    draw();
    
