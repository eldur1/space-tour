const {
    default: gsap
} = require("gsap/gsap-core");
import CSSPlugin from "gsap/CSSPlugin"
gsap.registerPlugin(CSSPlugin);
var Victor = require('victor');
// INIT
let background = document.querySelector(".background");
var canvas = document.getElementById("myCanvas");
var clientWidth = document.body.clientWidth;
var clientHeight = document.body.clientHeight;
var ctx = canvas.getContext("2d");
var ratioScreen = clientWidth / clientHeight;
var playerHeight = 85 * ratioScreen;
var playerWidth = 70 * ratioScreen;
var playerX = (clientWidth - playerWidth) / 2;
var playerY = (clientHeight - playerHeight) / 2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
let gameOverContainer = document.querySelector(".gameOver");
var btn_retry = document.querySelector('.btn--retry');
let hud = document.querySelector(".hud");
let dialogue = 0;
let dialogueContent = document.querySelector(".dialogues p");
let dialoguesContainer = document.querySelector('.dialogues-container');
let okBtn = document.querySelector(".btn--validate");
let imgNewton = document.querySelector(".dialogues-container img");
let neptuneSeen = false;
let uranusSeen = false;
let saturneSeen = false;
let jupiterSeen = false;
let marsSeen = false;
let venusSeen = false;
let earthSeen = false;
let tutoPassed = false;

// Import img
var img = new Image();
img.src = "../assets/gravity/rocket.svg";

// Gestion de pauses
let gameOver = false;
let gamePaused = true;
let pauseBtn = document.querySelector(".btn--pause");
pauseBtn.addEventListener("click", (e) => {
  if (!gameOver) {
    gamePaused = !gamePaused;
    pauseBtn.classList.toggle("btn--pause-resume");
    background.classList.toggle("background--stopped");
    hud.classList.toggle('hud--dial-open');
    } else {}
})

// Gestion de l'évolution du jeu et des dialogues 

let dialogues = [];

fetch("../assets/data/dialogues.json")
.then(function(response) {
    if (response.status !== 200){
        console.log('error')
    }
    response.json().then(function(data){
        dialogues = data.dialogues;
    });
});

function closeDialogues(){
    dialoguesContainer.style.display = "none";
    gamePaused = !gamePaused;
    pauseBtn.classList.remove("btn--pause-resume");
    background.classList.remove("background--stopped");
    background.classList.remove('background--dial-open');
    pauseBtn.style.display = "block";
    canvas.classList.remove('canvas--dial-open');
    hud.classList.remove('hud--dial-open');
};
function openDialogues(){
    dialogues.forEach(item => {
        if (dialogue == item.dialogueNb) {
            dialogueContent.innerHTML = item.text;
            imgNewton.src = item.characterImg;
            imgNewton.srcset = item.characterImgRetina;
        }
    });
    dialoguesContainer.style.display = "block";
    gamePaused = !gamePaused;
    pauseBtn.classList.add("btn--pause-resume");
    background.classList.add("background--stopped");
    background.classList.add('background--dial-open');
    pauseBtn.style.display = "none";
    canvas.classList.add('canvas--dial-open');
    hud.classList.add('hud--dial-open');
};


if (sessionStorage.getItem('tutoPassed')) {
    tutoPassed = sessionStorage.getItem('tutoPassed');
}
else {
    tutoPassed = "false";
}
if (sessionStorage.getItem('earthSeen')) {
    earthSeen = sessionStorage.getItem('earthSeen');
}
else {
    earthSeen = "false";
}
if (sessionStorage.getItem('venusSeen')) {
    venusSeen = sessionStorage.getItem('venusSeen');
}
else {
    venusSeen = "false";
}
if (sessionStorage.getItem('marsSeen')) {
    marsSeen = sessionStorage.getItem('marsSeen');
}
else {
    marsSeen = "false";
}
if (sessionStorage.getItem('jupiterSeen')) {
    jupiterSeen = sessionStorage.getItem('jupiterSeen');
}
else {
    jupiterSeen = "false";
}
if (sessionStorage.getItem('saturneSeen')) {
    saturneSeen = sessionStorage.getItem('saturneSeen');
}
else {
    saturneSeen = "false";
}
if (sessionStorage.getItem('uranusSeen')) {
    uranusSeen = sessionStorage.getItem('uranusSeen');
}
else {
    uranusSeen = "false";
}
if (sessionStorage.getItem('neptuneSeen')) {
    neptuneSeen = sessionStorage.getItem('neptuneSeen');
}
else {
    neptuneSeen = "false";
}

okBtn.addEventListener("click", (e) => {
    dialogue++;
    dialogues.forEach(item => {
        if (dialogue == item.dialogueNb) {
            dialogueContent.innerHTML = item.text;
            imgNewton.src = item.characterImg;
            imgNewton.srcset = item.characterImgRetina;
            if (dialogue == 16 || dialogue == 18 || dialogue == 20 || dialogue == 23 || dialogue == 25 || dialogue == 27 || dialogue == 29 || dialogue == 31 || dialogue == 33 ){
                closeDialogues();
            }
            if (dialogue == 1 && tutoPassed == "true") {
                closeDialogues();
                dialogue = 2;
            }
            
        }
        
    });
});


// Ajout planète

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var planetes = [];


let terre = {
  "id": "terre",
  "name": "terre",
  "width": 200 * ratioScreen,
  "height": 200 * ratioScreen,
  "xPos": getRandomInt(clientWidth - 200 * ratioScreen),
  "yPos": -2400,
  "champDistance": 300 * ratioScreen
}
let venus = {
  "id": "vénus",
  "name": "vénus",
  "width": 200 * ratioScreen,
  "height": 200 * ratioScreen,
  "xPos": getRandomInt(clientWidth - 200 * ratioScreen),
  "yPos": -6400,
  "champDistance": 300 * ratioScreen
}
let mars = {
  "id": "mars",
  "name": "mars",
  "width": 170 * ratioScreen,
  "height": 170 * ratioScreen,
  "xPos": getRandomInt(clientWidth - 170 * ratioScreen),
  "yPos": -10400,
  "champDistance": 255 * ratioScreen
}
let jupiter = {
  "id": "jupiter",
  "name": "jupiter",
  "width": 350 * ratioScreen,
  "height": 350 * ratioScreen,
  "xPos": getRandomInt(clientWidth - 350 * ratioScreen),
  "yPos": -14400,
  "champDistance": 475 * ratioScreen
}
let saturne = {
  "id": "saturne",
  "name": "saturne",
  "width": 320 * ratioScreen,
  "height": 300 * ratioScreen,
  "xPos": getRandomInt(clientWidth - 300 * ratioScreen),
  "yPos": -19200,
  "champDistance": 350 * ratioScreen
}
let uranus = {
  "id": "uranus",
  "name": "uranus",
  "width": 300 * ratioScreen,
  "height": 270 * ratioScreen,
  "xPos": getRandomInt(clientWidth - 270 * ratioScreen),
  "yPos": -24000,
  "champDistance": 305 * ratioScreen
}
let neptune = {
  "id": "neptune",
  "name": "neptune",
  "width": 220 * ratioScreen,
  "height": 220 * ratioScreen,
  "xPos": getRandomInt(clientWidth - 220 * ratioScreen),
  "yPos": -28800,
  "champDistance": 330 * ratioScreen
}

planetes.push(terre, venus, mars, jupiter, saturne, uranus, neptune);

for (let i = 1; i <= 36; i++) {
  if (i != 3 && i != 8 && i != 13 && i != 18 && i != 24 && i != 36 && i != 30) {
    let width = getRandomInt(100) + 200;
    let planet = {
      "id": i,
      "name": "planet" + getRandomInt(7),
      "width": width * ratioScreen,
      "height": width * ratioScreen,
      "xPos": getRandomInt(clientWidth - width * ratioScreen),
      "yPos": -1000 - ((i - 1) * 800),
      "champDistance": width * 1.2 * ratioScreen
    };
    planetes.push(planet);
  }
}




var ratio = window.devicePixelRatio || 1;


// Ajout planètes
planetes.forEach(item => {
  let planete = item["name"];
  item["name"] = new Image();
  item["name"].className = planete;
  item["name"].src = "../assets/__planets/" + planete + ".svg";
});

// KEYBOARD
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if ("code" in e) {
        switch (e.code) {
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

    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
    if (e.keyCode == 40) {
        downPressed = true;
    } else if (e.keyCode == 38) {
        upPressed = true;
    }
}  

function keyUpHandler(e) {
    if ("code" in e) {
        switch (e.code) {
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

    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
    if (e.keyCode == 40) {
        downPressed = false;
    } else if (e.keyCode == 38) {
        upPressed = false;
    }
}

// TOUCH
document.addEventListener("touchstart", touchHandler);
document.addEventListener("touchmove", touchHandler);

function touchHandler(e) {
    if (e.touches) {
        playerX = e.touches[0].pageX - canvas.offsetLeft - playerWidth / 2;
        playerY = e.touches[0].pageY - canvas.offsetTop - playerHeight / 2;
        output.innerHTML = "Touch:  <br />" + " x: " + playerX + ", y: " + playerY;
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
    if (controller.buttons) {
        for (var b = 0; b < controller.buttons.length; b++) {
            if (controller.buttons[b].pressed) {
                buttonsPressed.push(b);
            }
        }
    }
}

function gamepadButtonPressedHandler(button) {
    var press = false;
    for (var i = 0; i < buttonsPressed.length; i++) {
    if (buttonsPressed[i] == button) {
        press = true;
        }
    }
    return press;
}
// Dynamic resizing of canvas
function canvasResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
    canvas.width *= ratio;
    canvas.height *= ratio;
    ctx.scale(ratio, ratio);
}
// Dynamic rocket position
function rocketResize() {
    playerX = (window.innerWidth - 85) / 2;
    playerY = (window.innerHeight - 70) / 2;
}


// Setup barre
let progress = 0;
function bar() {
    let posBarX = playerX + 80;
    let posBarY = playerY + 30;
    let maxProgress = Math.min(progress, 200);
    let progressionPourcent = Math.round(maxProgress / 2) + "%";

    // Texte progression 
    ctx.fillStyle = "white";
    ctx.fillText("Progression : ", posBarX, posBarY - 10);
    ctx.fillText(progressionPourcent, posBarX + 65, posBarY - 10);

    // Bar background
    ctx.fillStyle = "black";
    ctx.fillRect(posBarX, posBarY, 200, 20);

    // Bar progress
    // Limite de progression
    if (maxProgress < progress) {
        progress = 200;
    } else {
        progress += 0.05;
    }
    // Draw progress bar
    ctx.fillStyle = "#EB4747";
    ctx.fillRect(posBarX, posBarY, maxProgress, 20);
}


// Game Over 
function toggleGameOverScreen() {
  background.classList.toggle("background--stopped");
  gameOverContainer.classList.toggle("gameOver--show");
  btn_retry.classList.toggle("hidden");
}
// Local storage
function gameOverScreen() {
    toggleGameOverScreen()
    btn_retry.addEventListener('click', () => {
        document.location.reload(true);
    });
}


// DRAW
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var playerPos = new Victor(playerX + (playerWidth / 2), playerY + (playerHeight / 2));
    if (!gamePaused) {
        bar()
        planetes.forEach(item => {
            var planetPos = new Victor(item["xPos"] + (item["width"] / 2), item["yPos"] + (item["height"] / 2));
            var vectorX = ((item["xPos"] + item["width"] / 2) - (playerX + playerWidth / 2));
            var vectorY = ((item["yPos"] + item["height"] / 2) - (playerY + playerHeight / 2));
            var distance = playerPos.distance(planetPos);
            var angleV = Victor(vectorX, vectorY).verticalAngleDeg();
            var angleH = Victor(vectorX, vectorY).angleDeg();
            if (distance <= item["champDistance"]) {
                // vérifie le playerX/playerY par rapport au planetX/planetY
                if (angleV >= 0 && angleH > 0) {
                    playerX += 1.5;
                    playerY += 1.5;
                } else if (angleV <= 0 && angleH < 0) {
                    playerX += -1.5;
                    playerY += -1.5;
                } else if (angleV >= 0 && angleH < 0) {
                    playerX += 1.5;
                    playerY += -1.5;
                } else if (angleV <= 0 && angleH > 0) {
                    playerX += -1.5;
                    playerY += 1.5;
                }
            }

            if (item["yPos"] < clientHeight + 100) {
                item["yPos"] += 1.5;
            } else {
                item["champDistance"] = 0;
            }

            // GameOver
            if (distance <= item["width"] / 2) {
                gamePaused = true;
                // gameOverTxt.style.opacity = "1";
                gameOver = true;
                gameOverScreen()
            }
            
            // Gestion dialogues
            if (tutoPassed == "false") {
                if (item["id"] == 1 && item["yPos"] >= 0 - item["width"]/2) {
                    dialogue = 16;
                    openDialogues();
                    // Rendre les dialogues skippable
                    sessionStorage.setItem('tutoPassed', true);
                    tutoPassed = true;
                    
                }
            }
            if (earthSeen == "false") {
                if (item["id"] == "terre" && item["yPos"] >= 0 - item["width"]/2) {
                    dialogue = 18;
                    openDialogues();
                    sessionStorage.setItem('earthSeen', true);
                    earthSeen = true;
                }   
            }
            if (venusSeen == "false") {
                if (item["id"] == "vénus" && item["yPos"] >= 0 - item["width"]/2) {
                    dialogue = 20;
                    openDialogues();
                    sessionStorage.setItem('venusSeen', true);
                    venusSeen = true;
                }   
            }
            if (marsSeen == "false") {
                if (item["id"] == "mars" && item["yPos"] >= 0 - item["width"]/2) {
                    dialogue = 23;
                    openDialogues();
                    
                    sessionStorage.setItem('marsSeen', true);
                    marsSeen = true;
                }   
            }
            if (jupiterSeen == "false") {
                if (item["id"] == "jupiter" && item["yPos"] >= 0 - item["width"]/2) {
                    dialogue = 25;
                    openDialogues();
                    
                    sessionStorage.setItem('jupiterSeen', true);
                    jupiterSeen = true;
                }   
            }
            if (saturneSeen == "false") {
                if (item["id"] == "saturne" && item["yPos"] >= 0 - item["width"]/2) {
                    dialogue = 27;
                    openDialogues();
                    
                    sessionStorage.setItem('saturneSeen', true);
                    saturneSeen = true;
                }   
            }
            if (uranusSeen == "false") {
                if (item["id"] == "uranus" && item["yPos"] >= 0 - item["width"]/2) {
                    dialogue = 29;
                    openDialogues();
                    
                    sessionStorage.setItem('uranusSeen', true);
                    uranusSeen = true;
                }   
            }
            if (neptuneSeen == "false") {
                if (item["id"] == "neptune" && item["yPos"] >= 0 - item["width"]/2) {
                    dialogue = 31;
                    openDialogues();
                    
                    sessionStorage.setItem('neptuneSeen', true);
                    neptuneSeen = true;
                }   
            }
                
        
        
        });
            
            
        // KEYBOARD
        // Need to launch the rocket before being able to move the rocket
        if (rightPressed) {
            playerX += 3;
            if (playerX >= window.innerWidth - 70) {
                playerX = window.innerWidth - 70;
            }
        } else if (leftPressed) {
            playerX -= 3;
            if (playerX <= 0) {
                playerX = 0;
            }
        }
        if (downPressed) {
            playerY += 3;
            if (playerY >= window.innerHeight - 85) {
                playerY = window.innerHeight - 85;
            }
        } else if (upPressed) {
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
window.onresize = function () {
    canvasResize();
    rocketResize();
}
canvasResize();
draw();