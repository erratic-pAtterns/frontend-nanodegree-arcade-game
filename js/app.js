// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Enemy init position is 1st-3rd row, out of canvas
    this.x = -202;
    this.y = (83 * (Math.floor(Math.random() * Math.floor(3)))) + 55;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 60 * dt;
    // TODO collision detection
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  // Player init position is in 5th row, 3rd column
  this.x = (2 * 101);
  this.y = (4 * 83) + 45;
};

Player.prototype.update = function() {
  // noop
};

Player.prototype.handleInput = function(keyPressed) {
  // TODO limit movement inside of game area
  // TODO reset game when player has reached water
  switch (keyPressed) {
    case 'left':
      this.x -= 101;
      break
    case 'up':
      this.y -= 83;
      break
    case 'right':
      this.x += 101;
      break
    case 'down':
      this.y += 83;
  }
};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instantiate enemy and player objects.
var player = new Player();
var allEnemies = [];

// TODO continous enemy creation
var nmy = new Enemy();
allEnemies.push(nmy);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
