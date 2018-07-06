// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x || 0;
    this.y = y || 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.speed = Math.random() * (600 - 60) + 60;
    this.x = this.x + this.speed * dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > 480){
        this.x = -(Math.random() * 300);
        this.y = Math.random() * (230 - 50) + 50;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.x = x || 200;
    this.y = y || 400;
    this.sprite = 'images/girl.png';
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(key){
    console.log(key)
    if(key == 'up'){
        if(this.y <= 0){return false}
        this.y = this.y - 90;
    }else if(key == 'down'){
        if(this.y >= 400){return false}
        this.y = this.y + 90;
    }else if(key =='left'){
        if(this.x <= 0){return false}
        this.x = this.x - 90;
    }else if(key=='right'){
        if(this.x >= 400){return false}
        this.x = this.x + 90;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const maxEnemies = 3;
while (maxEnemies > allEnemies.length) {//min 50, max 230
        const randomX = -(Math.random() * 300);
        const randomY =  Math.random() * (230 - 50) + 50;
        const enemy = new Enemy(0, randomY);
        allEnemies.push(enemy);
}

const player = new Player();


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
