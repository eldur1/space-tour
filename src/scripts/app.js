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

    // Gestion de pauses
    let gameOver = false;
    let gamePaused = false;
    let pauseBtn = document.querySelector(".pause_btn");
    pauseBtn.addEventListener("click", (e) => {
        if (!gameOver) {
            gamePaused = !gamePaused;
        }
        
    })

    let gameOverTxt = document.querySelector(".gameOver p");
    
    
    // Ajout planète

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    var planetes = [];

    let terre = {"name" : "terre", "width" : 150, "height" : 150, "xPos" : getRandomInt(clientWidth - 150), "yPos": -500, "champDistance" : 200}
    let venus = {"name" : "vénus", "width" : 150, "height" : 150, "xPos" : getRandomInt(clientWidth - 150), "yPos": -1000, "champDistance" : 200}
    let mars = {"name" : "mars", "width" : 120, "height" : 120, "xPos" : getRandomInt(clientWidth - 120), "yPos": -1600, "champDistance" : 150}
    let jupiter = {"name" : "jupiter", "width" : 300, "height" : 300, "xPos" : getRandomInt(clientWidth - 300), "yPos": -2200, "champDistance" : 400}
    let saturne = {"name" : "saturne", "width" : 280, "height" : 240, "xPos" : getRandomInt(clientWidth - 280), "yPos": -2800, "champDistance" : 360}
    let uranus = {"name" : "uranus", "width" : 250, "height" : 200, "xPos" : getRandomInt(clientWidth - 250), "yPos": -3400, "champDistance" : 300}
    let neptune = {"name" : "neptune", "width" : 200, "height" : 200, "xPos" : getRandomInt(clientWidth - 200), "yPos": -4000, "champDistance" : 300}

    planetes.push(terre, venus, mars, jupiter, saturne, uranus, neptune);



    var ratio = window.devicePixelRatio || 1;


    // Ajout planètes


    planetes.forEach(item => {
        let planete = item["name"];
        item["name"] = new Image ();
        item["name"].className = planete;
        item["name"].src = "../assets/__planets/" + planete + ".svg";
        console.log(item["name"]);
    });






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
        
        var playerPos = new Victor(playerX + (playerWidth/2), playerY + (playerHeight/2));
        if (!gamePaused) {
            planetes.forEach(item => {
                var planetPos = new Victor(item["xPos"] + (item["width"]/2), item["yPos"] + (item["height"]/2));
                var vectorX = ((item["xPos"] + item["width"]/2) - (playerX + playerWidth/2));
                var vectorY = ((item["yPos"] + item["height"]/2) - (playerY + playerHeight/2));
                var distance = playerPos.distance(planetPos);
                var angleV = Victor(vectorX, vectorY).verticalAngleDeg();
                var angleH = Victor(vectorX, vectorY).angleDeg();
                if (distance <= item["champDistance"]) {
                    // vérifie le playerX/playerY par rapport au planetX/planetY
                    if (angleV >= 0 && angleH > 0 ) {
                        playerX += 1;
                        playerY += 1;
                    } 
                    else if (angleV <= 0 && angleH < 0 ) {
                        playerX += -1;
                        playerY += -1;
                    }
                    else if (angleV >= 0 && angleH < 0 ) {
                        playerX += 1;
                        playerY += -1;
                    }
                    else if (angleV <= 0 && angleH > 0 ) {
                        playerX += -1;
                        playerY += 1;
                    }
                    
                }
                

                if (item["yPos"] < clientHeight) {
                    item["yPos"] += 1;
                }
                
                // GameOver
                if (distance <= item["width"]/2) {
                    gamePaused = true;
                    gameOverTxt.style.opacity = "1";
                    gameOver = true;
                }
            
            });

            
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
                playerY -= 3;
                if (playerY <= 0) {
                    playerY = 0;
                }
            }
        }
        
        planetes.forEach(item => {
            ctx.drawImage(item["name"], item["xPos"], item["yPos"], item["width"], item["height"]);
        });
        ctx.drawImage(img, playerX, playerY, playerWidth, playerHeight);
        requestAnimationFrame(draw);
    }
    window.onresize = function() {
        canvasResize();
        rocketResize();
    }
    canvasResize();
    draw();
    
