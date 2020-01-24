
window.onload = () => {

    console.log('page has loaded');
    
    context.beginPath();
    context.rect(0,0,gameSpaceWidth, gameSpaceHeight);
    context.fillStyle = 'black';
    context.fill()
    
}

 //INITAL VARIABLE DELERATION FOR CANVAS ELEMENT
 let canvas = document.getElementById("canvas"),
 context = canvas.getContext("2d"),
 gameSpaceWidth = canvas.width = 600,     //width of the canvas
 gameSpaceHeight = canvas.height = 600,  //height of canvas

 ticks = 0, //messures how many frames have occured since start of game

 snakeBlockSize = 30,  // this will determin the size of the grid blocks that the snake moves on, as well as the size of each block that makes up the snake
 snkPos = [];         // this array will contain all the positions that the snake currently takes up
 direction = 'u'     // the direction the snake moves this can change every time the user inputs an arrow key; u = up, d = down, l = left, r = right;

 console.log(window.innerWidth);


//a boolean lets the program interpret if the game should be started. (it should be executed once per game)
let gameStarted = false;


// HANDLING USER INPUT

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

//FUNCTIONS THAT INTERPERT USER INPUT
//the event param holds the key value which is accociated with a char on the keyboard

function keyDownHandler(event) {

    switch (event.code) {
        case "Space":

            if (!gameStarted) {
                
                startGame()
                gameStarted = true
            }
            
            break;
        case "ArrowLeft":
            console.log('left arrow down');

            direction = 'l'
            
            break;
        case "ArrowRight":
            console.log('r arrow down');

            direction = 'r'
            
            break;
        case "ArrowUp":
            console.log('u arrow down');

            direction = 'u'
            
            break;
        case "ArrowDown":
            console.log('d arrow down');

            direction = 'd'
            
            break;
        default:
            break;
    }
    
}

function keyUpHandler(event) {
    switch (event.code) {
        case "ArrowLeft":
            console.log('left arrow up');
            
            break;
        case "ArrowRight":
            console.log('r arrow up');
            
            break;
        case "ArrowUp":
            console.log('u arrow up');
            
            break;
        case "ArrowDown":
            console.log('d arrow up');
            
            break;
        default:
            break;
    }
    
}
/////////////////////////////////////////////////////////////////////////////////////////////

//START OF GAME PROGRAM FUNCTION, SHOULD ONLY BE EXECUTED ONCE

function startGame() {


    console.log('game started');

    create_play_grid()

    start_snake()
    
}

function game_cycle() {

    clear_screen() //everything that will apear on screen must be called after this funciton call

    create_background()

    ticks++ //frame count increase

    //gets userinput to detirm the direction of the snake
    direction_handling()
    
    for (let i = 0; i < snkPos.length; i++) {
        
        create_block(snkPos[i].x, snkPos[i].y)
        
    }

    for (let i = 1; i < snkPos.length; i++) {
        
       snkPos[i] = snkPos[i-1];

    }
        
    console.log('snake moved');
    
    setTimeout(requestAnimationFrame, 200, (game_cycle));
} 



function start_snake() {

    let snakeHead = {x:10, y:10};

    snkPos = [snakeHead];

    add_snake_block()

    //start game, enters continuous loop until gameover
    game_cycle()
    
}


function add_snake_block() {

    

    let newSnakeBlock = {x: snkPos[snkPos.length-1].x, y: snkPos[snkPos.length-1].x}

    snkPos.push(newSnakeBlock)

    console.log(newSnakeBlock);


    
}

function create_block(x, y) {

    let x1 = (x * snakeBlockSize) - snakeBlockSize,
        x2 = (x * snakeBlockSize),
        y1 = (y * snakeBlockSize) - snakeBlockSize,
        y2 = (y * snakeBlockSize);

    context.beginPath();
    context.rect(x1, y1, snakeBlockSize, snakeBlockSize);
    context.fillStyle = 'white';
    context.fill();
    
}

function clear_screen() { 
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

function direction_handling() {

    switch (direction) {
        case 'd':

        snkPos[0].y++
            
            break;
        case 'u':

        snkPos[0].y--
            
            break;
        case 'r':

        snkPos[0].x++
            
            break;
        case 'l':

        snkPos[0].x--
            
            break;
    
        default:
            break;
    }

}


//creates a grid on the playable space
function create_play_grid() {

    context.strokeStyle = "black";
    
    for (let i = snakeBlockSize; i < gameSpaceWidth; i+= snakeBlockSize) {

        context.beginPath()
        context.moveTo(i,0);
        context.lineTo(i, gameSpaceHeight);
        context.stroke()

        context.beginPath()
        context.moveTo(0, i);
        context.lineTo(gameSpaceHeight, i);
        context.stroke()
     
    }
    
}

function create_background() { //slowchanging rainbow color background

    context.fillStyle = 'hsl(' + (ticks/2) + ', 100%, 50%)';

    context.beginPath()
    context.rect(0,0, gameSpaceWidth, gameSpaceHeight);
    context.fill()
    
}