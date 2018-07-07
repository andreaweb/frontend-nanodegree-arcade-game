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
        this.y = getRandomY();
        // if(this !== allEnemies[0]){ //INFINITE LOOP!
        //     if(this == allEnemies[1]){
        //         while(safeRoom( //makes sure the X and Y positions don't intersect too much
        //             [allEnemies[0].x, allEnemies[0].y],
        //             [this.x, this.y])
        //         ){
        //             this.x = getRandomX();
        //             this.y = getRandomY();
        //         }
        //     }
        //     if(this == allEnemies[2]){
        //         console.log("second case")
        //         while(safeRoom( //makes sure the X and Y positions don't intersect too much
        //             [allEnemies[1].x, allEnemies[1].y],
        //             [this.x, this.y])
        //         ){
        //             this.x = getRandomX();
        //             this.y = getRandomY();
        //         }
        //     }
            
        // }
    }
};
function getRandomX(){
    return Math.round(-(Math.random() * 300));
}
function getRandomY(){
    return Math.round(Math.random() * (300 - 130) + 130);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
function safeRoom(a, b){
    let result = [];
    for(let i = 0; i < a.length; i++){
        for(let j = 0; j < b.length; j++){
            if(
                (a[i]+90) > b[j] 
                && 
                b[j] < a[i]
            ){
                result.push(a[i])
            }//must calculate again
        }
    }
    return result[1] ? true : false 
}
//playerLeftEdge <= bugRightEdge && bugRightEdge <= playerRightEdge

//x and y of every single enemy must differ from every other single enemy
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.x = x || 215;
    this.y = y || 425;
    this.sprite = 'images/girl.png';
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.die = function(enemies){
    let positionX = []
    for(let i = 35; positionX.length < 35; i--){
        positionX.push(this.x + i)
    }
    for(let i = 0; positionX.length < 70; i++){
        positionX.push(this.x - i)
    }
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
                console.log(" Esquerda J "+playerLeftEdge+"  Direita J "+playerRightEdge);
                console.log(" Bottom J "+playerDownEdge+"  Topo J "+playerUpEdge);
                console.log(" Direita I "+bugRightEdge+"  Topo I "+bugUpEdge);
                console.log("dead")
                debugger
            }
          
        }
    }
}
Player.prototype.handleInput = function(key){
    console.log(key)
    if(key == 'up'){
        if(this.y <= 0){return false}
        this.y = this.y - 75;
    }else if(key == 'down'){
        if(this.y >= 400){return false}
        this.y = this.y + 75;
    }else if(key =='left'){
        if(this.x <= 0){return false}
        this.x = this.x - 105;
    }else if(key=='right'){
        if(this.x >= 400){return false}
        this.x = this.x + 105;
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
        let randomY = getRandomY(); //sets each enemy to a different Y
        if(allEnemies[0]){
            while(safeRoom( //makes sure the X and Y positions don't intersect too much
                [allEnemies[allEnemies.length-1].x, allEnemies[allEnemies.length-1].y],
                [randomX, randomY])
            ){
                randomX = getRandomX();
                randomY = getRandomY();
                console.log(randomX, randomY)
            }
        }
        const enemy = new Enemy(randomX, randomY);
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
