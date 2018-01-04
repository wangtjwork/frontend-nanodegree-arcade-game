function generateRandomInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
class Enemy {
  constructor(initialY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -100;
    this.y = initialY;
    this.speed = speed;
    this.rowHeight = [63, 145, 227];
    this.sprite = 'images/enemy-bug.png';
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) { // bug moved to the right side of screen
      this.x = -100;
      this.y = this.rowHeight[generateRandomInclusive(0,2)];
      this.speed = generateRandomInclusive(200, 500);
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.x = 200;
    this.y = 390;
    this.speed = 10;
    this.sprite = 'images/char-boy.png';
  }

  update(dt) {
    return;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyType) {
    switch(keyType) {
      case 'up':
        this.y -= 82;
        if (this.y < 0) {
          console.log('victory!');
        }
        break;
      case 'down':
        if (this.y === 390) {
          break;
        }
        this.y += 82;
        break;
      case 'left':
        if (this.x == 0) {
          break;
        }
        this.x -= 100;
        break;
      case 'right':
        if (this.x === 400) {
          break;
        }
        this.x += 100;
        break;
      default:
        break;
    }
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const firstEnemy = new Enemy(63, 100);
const player = new Player();
const allEnemies = [firstEnemy];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    e.preventDefault();
    player.handleInput(allowedKeys[e.keyCode]);
});
