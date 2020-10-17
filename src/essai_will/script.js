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

let asteroids = [];

for (let i = 0; i <= 20; i++) {
    let asteroid = new Sprite("assets/asteroid.svg", getRandomInt(4)*25, getRandomInt(1400), 800 + getRandomInt(1000));
    asteroids.push(asteroid);
}

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
        asteroid._node.style.display = "none";
    }
    asteroids.forEach(asteroid => {
        if (rocket.checkCollision(asteroid)) {
            asteroid.stopAnimation();
            asteroid._node.style.display = "none";
        }
    });
        

}

asteroids.forEach(asteroid => {
    asteroid.startAnimation(moveAsteroid, 40);
});

// Check la collision

Sprite.prototype.checkCollision = function(other){
    return ! ( (this.bottom + this._node.height < other.bottom) ||
                this.bottom > (other.bottom + other._node.height) ||
                (this.left + this._node.width < other.left) ||
                this.left > (other.left + other._node.width) );
}; 