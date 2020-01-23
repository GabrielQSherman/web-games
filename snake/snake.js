
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

 snakeBlockSize = 30;  // this will determin the size of the grid blocks that the snake moves on, as well as the size of each block that makes up the snake
 
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
            
            break;
        case "ArrowRight":
            console.log('r arrow down');
            
            break;
        case "ArrowUp":
            console.log('u arrow down');
            
            break;
        case "ArrowDown":
            console.log('d arrow down');
            
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


//START OF GAME PROGRAM FUNCTION, SHOULD ONLY BE EXECUTED ONCE

function startGame() {

    console.log('game started');

    
 
    
    //set the background to white when the game starts
    context.beginPath();
    context.rect( 0, 0, gameSpaceWidth, gameSpaceHeight);
    context.fillStyle = 'white';
    context.fill()

    create_play_grid()
    
}

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