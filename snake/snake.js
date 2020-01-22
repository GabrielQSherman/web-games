
//a boolean lets the program interpret if the game should be started. (it should be)
let gameStarted = false;




// HANDLING USER INPUT

const KeyCodeObj = {
    space: 0x0039,
    arrowLeft: 0xE04B,
    arrowUp: 0xE048
}

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
    
        default:
            break;
    }
    
}

function keyUpHandler(event) {
    
}


//START OF GAME PROGRAM FUNCTION, SHOULD ONLY BE EXECUTED ONCE

function startGame() {

    console.log('game started');
    
    
}