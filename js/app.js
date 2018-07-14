
/*
*  ENEMY OBJECT
*/

var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Enemy init position is 1st-3rd row (random), and out of canvas
    this.x = -202;
    this.y = 83 * (Math.floor(Math.random() * Math.floor(3))) + 45;
    // Enemy speed value random 1 - 3
    this.speed = Math.floor(Math.random() * Math.floor(3)) + 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 100 * this.speed * dt;
    // Collision detection
    if (this.y === game.player.y && (
      (this.x > game.player.x - 60 && this.x < game.player.x - 50) ||
      (game.player.x > this.x - 40 && game.player.x < this.x))) {
      game.player.reset();
    }
    // Destroy Enemy object if it has left the game area
    if (this.x > 600) {
      game.destroyEnemy(this);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
*  PLAYER OBJECT
*/

var Player = function() {
  this.sprite = 'images/char-boy.png';
  // Player init position is in 5th row, 3rd column
  this.x = (2 * 101);
  this.y = (4 * 83) + 45;
};

Player.prototype.update = function() {
  // noop
};

// Update player position upon allowed keypress
// Limit player character position to game area
Player.prototype.handleInput = function(keyPressed) {
  switch (keyPressed) {
    case 'left':
      if (this.x - 101 > -1) {
        this.x -= 101;
      }
      break
    case 'up':
      this.y -= 83;
      // Reset player position when player reaches water
      if (this.y < 0) {
        this.reset();
      }
      break
    case 'right':
      if (this.x + 101 < 420) {
        this.x += 101;
      }
      break
    case 'down':
      if (this.y + 83 < 420) {
        this.y += 83;
      }
  }
};

// Reset player to start position
Player.prototype.reset = function () {
  this.x = (2 * 101);
  this.y = (4 * 83) + 45;
};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
*  GAME OBJECT
*/

function Game() {
  this.allEnemies = [];
  this.player = new Player();
  this.score = 0;
}

Game.prototype.createEnemy = function() {
  this.allEnemies.push(new Enemy());
};

Game.prototype.destroyEnemy = function(nme) {
  target = this.allEnemies.indexOf(nme);
  this.allEnemies.splice(target, 1);
}

// Timer for periodically creating enemies
Game.prototype.stopWatch = function(ctrl) {
  if (ctrl === 'start') {
    timer = setTimeout(this.tick.bind(this), 1000);
  } else if (ctrl === 'stop'){
    clearTimeout(timer);
  } else {
    timer = setTimeout(this.tick.bind(this), 1000);
  }
}

// increment the seconds counter by 1
// create an Enemy
Game.prototype.tick = function() {
  this.createEnemy();
  this.stopWatch();
}

// Start game
Game.prototype.start = function() {
  this.stopWatch('start');
}


/*
*  EVENT LISTENERS
*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    game.player.handleInput(allowedKeys[e.keyCode]);
});


/*
*  START GAME
*/

var game = new Game();
game.start();
