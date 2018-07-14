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
        this.x = getRandomX();
        this.y = getYPos(allEnemies.indexOf(this)+1);//numbers required for multiplier are 1, 2 or 3
    }
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function getRandomX(){
    return Math.round(-(Math.random() * 300));
}
function getYPos(multplier){
    let result = 100*multplier;
        result = result + 40/multplier;
    return result;
}

// Draw the enemy on the screen, required method for game


//playerLeftEdge <= bugRightEdge && bugRightEdge <= playerRightEdge

//x and y of every single enemy must differ from every other single enemy
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.x = x || 215;
    this.y = y || 425;
    this.sprite = 'images/girl.png';
    this.lifeSprite = 'images/Heart.png';
    this.win = false;
    this.dead = false;
    this.celebrate = 'images/Selector.png';
    this.celebrateY = -40;
    this.lives = 3;
    this.score = 0;  
};
Player.prototype.render = function(){
    if(this.y ==50){
        this.win = true
    }
    if(this.win){
        ctx.drawImage(Resources.get(this.celebrate), this.x-15, this.celebrateY)
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y-30)
        
        //reset game here
    }else{
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    for(let i = 0; i < this.lives; i++){
        ctx.drawImage(Resources.get(this.lifeSprite), 15 + (i*50), 555)
    }
    ctx.fillText('Score: '+this.score, 310, 595);
}
Player.prototype.die = function(enemies){
    let playerLeftEdge = this.x;
    let playerRightEdge = this.x + 70;
    let playerDownEdge = this.y + 70;
    let playerUpEdge = this.y;
   
    for(let index = 0; index < enemies.length; index++){//100w 70h enemies
        let bugRightEdge = enemies[index].x + 60
      
        let bugUpEdge = enemies[index].y + 15

        //playerLeftEdge <= bugRightEdge && bugRightEdge => playerRightEdge //if true, check Y
        //playerDownEdge <= bugUpEdge && bugUpEdge => playerUpEdge //if true, dead
        if(playerLeftEdge <= bugRightEdge && bugRightEdge <= playerRightEdge){
            if(playerUpEdge <= bugUpEdge && bugUpEdge <= playerDownEdge){
                // console.log(" Esquerda J "+playerLeftEdge+"  Direita J "+playerRightEdge);
                // console.log(" Bottom J "+playerDownEdge+"  Topo J "+playerUpEdge);
                // console.log(" Direita I "+bugRightEdge+"  Topo I "+bugUpEdge);
                // this.dead = true
               // debugger
            }
          
        }
    }

    if(this.dead){
//reset game
        if(this.lives > 1){
            this.lives = this.lives - 1;
        }else{
            this.lives = 0;
        }
    }
}
Player.prototype.handleInput = function(key){
    if(key == 'up'){
        if(this.y <= 50){
            return false
        }
        this.y = this.y - 75;
    }else if(key == 'down'){
        if(this.y >= 400){return false}
        this.y = this.y + 75;
    }else if(key =='left'){
        if(this.x <= 10){return false}
        this.x = this.x - 105;
    }else if(key=='right'){
        if(this.x >= 400){return false}
        this.x = this.x + 105;
    }
    if(this.y >= 125 && this.y <= 275){//every step on a stone adds 10 points to the score
        this.score = this.score + 10
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [];
const maxEnemies = 3;

//populates the array
while (maxEnemies > allEnemies.length) {
        let randomX = getRandomX(); //sets each enemy to a different X
        let yPos = getYPos(allEnemies.length+1); //sets each enemy to a different Y
       
        const enemy = new Enemy(randomX, yPos);
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
