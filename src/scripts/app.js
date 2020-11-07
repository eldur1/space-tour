const { default: gsap } = require("gsap/gsap-core");
import CSSPlugin from "gsap/CSSPlugin"
gsap.registerPlugin(CSSPlugin);
var Victor = require('victor');
    // INIT

    var canvas = document.getElementById("myCanvas");
    var clientWidth = document.body.clientWidth;
    var clientHeight = document.body.clientHeight;
    var ctx = canvas.getContext("2d");
    var ratioScreen = clientWidth/clientHeight;
    var playerHeight = 85*ratioScreen;
    var playerWidth = 70*ratioScreen;
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

    
    let terre = {"name" : "terre", "width" : 150*ratioScreen, "height" : 150*ratioScreen, "xPos" : getRandomInt(clientWidth - 150*ratioScreen), "yPos": -900*ratioScreen, "champDistance" : 200*ratioScreen}
    let venus = {"name" : "vénus", "width" : 150*ratioScreen, "height" : 150*ratioScreen, "xPos" : getRandomInt(clientWidth - 150*ratioScreen), "yPos": -2100*ratioScreen, "champDistance" : 200*ratioScreen}
    let mars = {"name" : "mars", "width" : 120*ratioScreen, "height" : 120*ratioScreen, "xPos" : getRandomInt(clientWidth - 120*ratioScreen), "yPos": -3300*ratioScreen, "champDistance" : 170*ratioScreen}
    let jupiter = {"name" : "jupiter", "width" : 300*ratioScreen, "height" : 300*ratioScreen, "xPos" : getRandomInt(clientWidth - 300*ratioScreen), "yPos": -5100*ratioScreen, "champDistance" : 400*ratioScreen}
    let saturne = {"name" : "saturne", "width" : 280*ratioScreen, "height" : 240*ratioScreen, "xPos" : getRandomInt(clientWidth - 280*ratioScreen), "yPos": -6900*ratioScreen, "champDistance" : 360*ratioScreen}
    let uranus = {"name" : "uranus", "width" : 250*ratioScreen, "height" : 200*ratioScreen, "xPos" : getRandomInt(clientWidth - 250*ratioScreen), "yPos": -8700*ratioScreen, "champDistance" : 300*ratioScreen}
    let neptune = {"name" : "neptune", "width" : 200*ratioScreen, "height" : 200*ratioScreen, "xPos" : getRandomInt(clientWidth - 200*ratioScreen), "yPos": -10500*ratioScreen, "champDistance" : 300*ratioScreen}

    planetes.push(terre, venus, mars, jupiter, saturne, uranus, neptune);

    for (let i = 1; i < 17; i++) {
        let planet = {"name" : "planet"+getRandomInt(7), "width" : (i*5+120)*ratioScreen, "height" : (i*5+120)*ratioScreen, "xPos" : getRandomInt(clientWidth - (i*20+100)*ratioScreen), "yPos": -500*i*1.2*ratioScreen, "champDistance" : (i*5+120)*1.2*ratioScreen};
        planetes.push(planet);
    }


    var ratio = window.devicePixelRatio || 1;


    // Ajout planètes


    planetes.forEach(item => {
        let planete = item["name"];
        item["name"] = new Image ();
        item["name"].className = planete;
        item["name"].src = "../assets/__planets/" + planete + ".svg";
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
                        playerX += 1.5;
                        playerY += 1.5;
                    } 
                    else if (angleV <= 0 && angleH < 0 ) {
                        playerX += -1.5;
                        playerY += -1.5;
                    }
                    else if (angleV >= 0 && angleH < 0 ) {
                        playerX += 1.5;
                        playerY += -1.5;
                    }
                    else if (angleV <= 0 && angleH > 0 ) {
                        playerX += -1.5;
                        playerY += 1.5;
                    }
                    
                }
                

                if (item["yPos"] < clientHeight+100) {
                    item["yPos"] += 1.5;
                }else{
                    item["champDistance"] = 0;
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
    
