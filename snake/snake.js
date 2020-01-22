
window.onload = () => {

   
    
}

 //INITAL VARIABLE DELERATION FOR CANVAS ELEMENT
 let canvas = document.getElementById("canvas"),
 context = canvas.getContext("2d"),
 width = canvas.width,     //width of the canvas
 height = canvas.height;  //height of canvas
 
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
    
    
}