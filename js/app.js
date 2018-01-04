function generateRandomInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
class Enemy {
  constructor(rowIndex, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -100;
    this.y = Enemy.ROWHEIGHT[rowIndex];
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }

  static get ROWHEIGHT() {
    return [63, 145, 227];
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
      this.y = Enemy.ROWHEIGHT[generateRandomInclusive(0,2)];
      this.speed = generateRandomInclusive(200, 500);
    }
    this.checkCollision();
  }

  // check for collision, when the user is at the same height,
  // and within 50px of the enemy
  checkCollision() {
    if (this.y === player.y && this.x >= player.x - 50 && this.x <= player.x + 50) {
      player.reset(); // player return to initial state
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
    this.y = 391;
    this.sprite = 'images/char-boy.png';
  }

  // reset position back to initial position
  reset() {
    this.x = 200;
    this.y = 391;
  }

  update(dt) {
    return;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // change position on keyboard input
  handleInput(keyType) {
    switch(keyType) {
      case 'up':
        this.y -= 82;
        if (this.y < 0) { // victory! reached water
          this.reset();
        }
        break;
      case 'down':
        console.log(this.y);
        if (this.y === 391) { // border
          break;
        }
        this.y += 82;
        break;
      case 'left':
        if (this.x == 0) { // border
          break;
        }
        this.x -= 100;
        break;
      case 'right':
        if (this.x === 400) { // border
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
const firstEnemy = new Enemy(0, 150);
const secondEnemy = new Enemy(1, 250);
const thirdEnemy = new Enemy(2, 300);
const player = new Player();
const allEnemies = [firstEnemy, secondEnemy, thirdEnemy];

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
