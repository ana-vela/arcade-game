/* Code structure inspired by Rodrick's Arcade Game walkthrough
 * https://zoom.us/recording/play/aulotDlzKFegQFIJTaTzKgWvNkVsYtlwO454vL1UPE1Cm6lOUBQCtfVurPOIAGAS?startTime=1529542978000
 */


class Entity {
  constructor() {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }

//When the player reaches the goal, the player returns to the starting point.
  resetGame() {
    this.x = 2;
    this.y = 5;
    document.location.reload();
  }

  update(dt) {
    this.isOutOfBoundsX = this.x > 5;
    this.isOutOfBoundsY = this.y < 1;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }

//checks collision for player or enemy, player returns back to starting point

  checkCollisions(playerOrEnemy) {
    if (this.y === playerOrEnemy.y) {
      if (this.x >= playerOrEnemy.x - 0.5 && this.x <= playerOrEnemy.x +0.5) {
        return true;
      }
    }
    else {
      return false;
    }
  }
}

// Sets up player

class Player extends Entity {
  constructor() {
    super();
    this.sprite += 'char-boy.png';
    this.moving = false;
    this.win = false;
  }

//When player wins, an alert displays and the game is reset
update(dt) {
  super.update();
  if (this.isOutOfBoundsY && !this.moving && !this.win) {
    alert("You made it to the finish line!");
    this.win = true;
    this.resetGame();
  }
}

render() {
  super.render();
  this.moving = false;
}

handleInput(input) {
  switch(input) {
    case 'left':
      this.x = this.x > 0 ? this.x -1 : this.x;
      break;
    case 'up':
      this.y = this.y > 0 ? this.y -1 : this.y;
      break;
    case 'right':
      this.x = this.x < 4 ? this.x +1 : this.x;
      break;
    case 'down':
      this.y = this.y < 5 ? this.y +1 : this.y;
      break;
    default:
      break;
    }
  this.moving = true;
  }
}


// Sets up enemy

class Enemy extends Entity {
    constructor (x, y) {
      super();
      this.sprite += 'enemy-bug.png';
      this.x = x;
      this.y = y;
    }

    update(dt) {
      super.update();
      if(this.isOutOfBoundsX){
        this.x = -1;
      }
      else {
        this.x += dt;
      }
    }
  }
