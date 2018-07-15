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
    // Destroy Enemy object if it has left the game area
    if (this.x > 600) {
      game.destroyObj(this, game.allEnemies);
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

Player.prototype.update = function () {
  // If hit by enemy, reset player positon
  for (const enemy of game.allEnemies) {
    if (enemy.y === this.y) {
      if (
        (enemy.x > this.x - 60 && enemy.x < this.x - 50) ||
        (this.x > enemy.x - 40 && this.x < enemy.x)) {
        game.player.reset();
        return;
      }
    }
  }
};

// Handle keyboard input
Player.prototype.handleInput = function(keyPressed) {
  var x = this.x;
  var y = this.y;

  switch (keyPressed) {
    case 'left':
        x -= 101;
      break
    case 'up':
      y -= 83;
      break
    case 'right':
        x += 101;
      break
    case 'down':
        y += 83;
  }
  this.evalPos(x, y);
};

Player.prototype.evalPos = function(x, y) {
  // If either side of the map is reached, keep current player positon
  if (y > 420 || x > 420 || x < -1) {
    return;
  }

  // If obstace is in the way, keep current player positon
  for (const rock of game.allRocks) {
    if (rock.x === x && rock.y === y) {
      return;
    }
  }

  // If gem is reached, remove gem from map and increment score
  for (const gem of game.allGems) {
    if (gem.x === x && gem.y === y) {
      game.destroyObj(gem, game.allGems);
      // increment score
      game.scorePlusOne();
    }
  }

  // Reset player position if player has reached water
  if (y < 0) {
    this.reset();
  }

 // Update player position
  else {
    this.updatePos(x, y);
  }
};

// Update player position
Player.prototype.updatePos = function(x, y) {
  this.x = x;
  this.y = y;
}

// Reset player position to initial
Player.prototype.reset = function () {
  this.x = (2 * 101);
  this.y = (4 * 83) + 45;
};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
*  GEM OBJECT
*/

var Gem = function() {
  this.allSprites = [
    'images/Gem Orange.png',
    'images/Gem Green.png',
    'images/Gem Blue.png'
  ];
  this.sprite = this.allSprites[Math.floor(Math.random() * this.allSprites.length)];
  this.x = 101 * (Math.floor(Math.random() * Math.floor(5)));
  this.y = 83 * (Math.floor(Math.random() * Math.floor(3))) + 45;
};

// Draw the Gem on the screen, required method for game
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
* ROCK OBJECT
*/

var Rock = function() {
  this.sprite = 'images/Rock.png';
  this.x = 101 * (Math.floor(Math.random() * Math.floor(5)));
  this.y = 83 * (Math.floor(Math.random() * Math.floor(3))) + 45;
};

// Draw the Player on the screen, required method for game
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
*  GAME OBJECT
*/

var Game = function() {
  this.allEnemies = [];
  this.allGems = [];
  this.player = new Player();
  this.score = 0;
};

Game.prototype.spawnObj = function(proto, container) {
  container.push(proto);
};

Game.prototype.destroyObj = function(obj, container) {
  target = container.indexOf(obj);
  container.splice(target, 1);
};

// Timer for periodically creating enemies
Game.prototype.stopWatch = function(ctrl) {
  if (ctrl === 'start') {
    timer = setTimeout(this.tick.bind(this), 1000);
  } else if (ctrl === 'stop'){
    clearTimeout(timer);
  } else {
    timer = setTimeout(this.tick.bind(this), 1000);
  }
};

// increment the seconds counter by 1
// create an Enemy
Game.prototype.tick = function() {
  this.spawnObj(new Enemy(), this.allEnemies);
  this.stopWatch();
};

// incease player score
Game.prototype.scorePlusOne = function() {
  this.score += 1;
};

// Set up and start game
Game.prototype.start = function() {
  // Clear gameplay object lists
  this.allEnemies = [];
  this.allGems = [];
  this.allRocks = [];
  // Spawn n gems
  for (var n = 3; n > 0; n--) {
    this.spawnObj(new Gem(), this.allGems);
  }
  // Spawn n rocks
  for (var n = 3; n > 0; n--) {
    this.spawnObj(new Rock(), this.allRocks);
  }
  // Start spawning enemies
  this.stopWatch('start');
};


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
