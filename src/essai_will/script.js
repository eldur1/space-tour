"use strict"

function Sprite(filename, size, left, bottom){
    this._node = document.createElement("img");
    this._node.src = filename;
    this._node.style.position = "absolute";
    this._node.style.width = size + "px";
    document.body.appendChild(this._node);
    
    Object.defineProperty(this, "left", {
        get: function() {
            return this._left;
        },
        set: function(value) {
            this._left = value;
            this._node.style.left = value + "px";
        }
    });
    Object.defineProperty(this, "bottom", {
        get: function() {
            return this._bottom;
        },
        set: function(value) {
            this._bottom = value;
            this._node.style.bottom = value + "px";
        }
    });
    Object.defineProperty(this, "display", {
        get: function() {
            return this._display;
        },
        set: function(value) {
            this._display = value;
            this._node.style.bottom = value;
        }
    });
    this.left = left;
    this.bottom = bottom;
}

function getRandomInt(max) {
    return (Math.floor(Math.random() * Math.floor(max)))+1;
}

let rocket = new Sprite("assets/rocket.svg", 50, 650, 50);
let asteroid1 = new Sprite("assets/asteroid.svg", getRandomInt(4)*25, 100, 800);
let asteroid2 = new Sprite("assets/asteroid.svg", getRandomInt(4)*25, 300, 800);
let asteroid3 = new Sprite("assets/asteroid.svg", getRandomInt(4)*25, 600, 800);
let asteroid4 = new Sprite("assets/asteroid.svg", getRandomInt(4)*25, 1000, 800);
let asteroid5 = new Sprite("assets/asteroid.svg", getRandomInt(4)*25, 1400, 800);


// Bouger la fusée de gauche à droite

document.onkeydown = function( event ) {
    //console.log (event.keyCode);
    if (event.keyCode == 37) {
        rocket.left -= 10;
    } else if (event.keyCode == 39) {
        rocket.left += 10;
    };

    if (rocket.left < 0) {
        rocket.left = 0;
    }
    if (rocket.left > document.body.clientWidth - rocket._node.width) { 
        rocket.left = document.body.clientWidth - rocket._node.width;
    }
}


// Bouger les astéroïdes

Sprite.prototype.startAnimation = function(fct, interval) {
    if (this._clock) window.clearInterval(this._clock);
    var _this = this;
    this._clock = window.setInterval(function() {
        fct(_this);
    }, interval);   
};

Sprite.prototype.stopAnimation = function(){
    window.clearInterval(this._clock);
};

function moveAsteroid(asteroid){
    asteroid.bottom -= 3;
    if (asteroid.bottom <= 0 - asteroid._node.height) {
        asteroid.stopAnimation();
    }
    if (rocket.checkCollision(asteroid1)) {
        asteroid1.stopAnimation();
    }
    if(rocket.checkCollision(asteroid2)){
        asteroid2.stopAnimation();
    }
    if(rocket.checkCollision(asteroid3)){
        asteroid3.stopAnimation();
    }
    if(rocket.checkCollision(asteroid4)){
        asteroid4.stopAnimation();
    }
    if(rocket.checkCollision(asteroid5)){
        asteroid5.stopAnimation();
    }

}

asteroid1.startAnimation( moveAsteroid, 40);
asteroid2.startAnimation( moveAsteroid, 40);
asteroid3.startAnimation( moveAsteroid, 40);
asteroid4.startAnimation( moveAsteroid, 40);
asteroid5.startAnimation( moveAsteroid, 40);


// Check la collision

Sprite.prototype.checkCollision = function(other){
    return ! ( (this.bottom + this._node.height < other.bottom) ||
                this.bottom > (other.bottom + other._node.height) ||
                (this.left + this._node.width < other.left) ||
                this.left > (other.bottom + other._node.width) );
}; 