const { default: gsap } = require("gsap/gsap-core");

    // INIT
    var canvas = document.getElementById("myCanvas");
    let stars1 = document.querySelector(".stars1");
    let stars2 = document.querySelector(".stars2");
    let stars3 = document.querySelector(".stars3");
    var clientWidth = document.body.clientWidth;
    var clientHeight = document.body.clientHeight;
    var ctx = canvas.getContext("2d");
    var playerHeight = 85;
    var playerWidth = 70;
    var playerX = (clientWidth - playerWidth) / 2;
    var playerY = clientHeight - playerHeight - 70;
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;
    var img = new Image();
    img.src = "../assets/gravity/rocket.svg";
    var ratio   = window.devicePixelRatio || 1;

    let rocketLaunch = false;

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
        let isLaunched = false;
        document.addEventListener('keydown', event => {
            if (event.code === 'Space' && !isLaunched ) {
                    let incrementalSpeed = 0.01;
                    let speedBuffer = 0;
                    playerY -= incrementalSpeed;
                    incrementalSpeed = incrementalSpeed * 1.015;
                    speedBuffer += 50;
                    console.log(playerY);
            }
        
        });
        document.addEventListener('keyup', event => {
            if (event.code === 'Space' && !isLaunched ) {
                // Refaire descendre la fusée 
            }
        
        });
        
        // KEYBOARD
            // Need to launch the rocket before being able to move the rocket
        if(rocketLaunch) {
            if(rightPressed) {
                playerX += 6;
                if (playerX >= window.innerWidth-70) {
                    playerX = window.innerWidth-70;
                }
            }
            else if(leftPressed) {
                playerX -= 6;
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
                playerY -= 10;
                if (playerY <= 0) {
                    playerY = 0;
                }
            }
        }

        ctx.drawImage(img, playerX, playerY, playerWidth, playerHeight);
        requestAnimationFrame(draw);
    }
    window.onresize = function() {
        canvasResize();
        rocketResize();
    }
    canvasResize();
    draw();
