
window.onload = () => {


    //INITAL VARIABLE DELERATION FOR CANVAS ELEMENT
    let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    gameSpaceWidth = canvas.width = 600,     //width of the canvas
    gameSpaceHeight = canvas.height = 600,  //height of canvas

    ticks = 0, //messures how many frames have occured since start of game

    snakeBlockSize = 15,  // this will determin the size of the grid blocks that the snake moves on, as well as the size of each block that makes up the snake
    snkPos = [],        // this array will contain all the positions that the snake currently takes up


    powerup_positions = [],


    direction = 'u';     // the direction the snake moves this can change every time the user inputs an arrow key; u = up, d = down, l = left, r = right;

    //console.log(window.innerWidth);

    //a boolean lets the program interpret if the game should be started. (it should be executed once per game)
    let gameStarted = false,
        gameStopped;


    //game score
    let score = 0;

    //CREATE BLACK BACKGROUND

    console.log('page has loaded');
        
    context.beginPath();
    context.rect(0,0,gameSpaceWidth, gameSpaceHeight);
    context.fillStyle = 'black';
    context.fill()


    // HANDLING USER INPUT

    document.addEventListener('keydown', keyDownHandler, false);
    // document.addEventListener('keyup', keyUpHandler, false);

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
                // console.log('left arrow down');

                direction = 'l'
                
                break;
            case "ArrowRight":
                // console.log('r arrow down');

                direction = 'r'
                
                break;
            case "ArrowUp":
                // console.log('u arrow down');

                direction = 'u'
                
                break;
            case "ArrowDown":
                // console.log('d arrow down');

                direction = 'd'
                
                break;
            default:
                break;
        }
        
    }


    /////////////////////////////////////////////////////////////////////////////////////////////

    //START OF GAME PROGRAM FUNCTION, SHOULD ONLY BE EXECUTED ONCE

    function startGame() {

        //reset neccesary variables
        speed = 100;
        score = 0;
        direction = '';
        ticks = 0;
        powerupsOnScreen = 0;
        powerup_positions = [];

        gameStopped = false;


        console.log('game started');

        //this funciton will clear the snakebody position array
        start_snake()
        
    }


    // GAME LOOP

    let speed = 100, //speed of snake (ms wait between frames)

        powerupsOnScreen = 0;

    function game_cycle() {

        console.log(speed);
        

        clear_screen() //everything that will apear on screen must be called after this funciton call

        create_background() //creates a colorful background, default is the html background

        // create_play_grid() //shows the grid that the snake moves on

        ticks++ //frame count increase


        //add powerup
        if (ticks % 50 == 0 && powerupsOnScreen < 2) {

            add_powerup()

            powerupsOnScreen++
            
        }

        render_powerup()

        
        //this function handles displaying the snake to the screen, making sure the snake is created as a 'train' of blocks
        //the direction handling function is embeded in this function as well
        create_snake()


        //collision detection 
        if (powerupsOnScreen > 0) {
            detect_powerup()
        }

        detect_wall() //log if the wall has been hit
        detect_self_hit() //log if one snake part hits the snake head
            
        // console.log('snake moved', ticks, snkPos);
        if (!gameStopped) {
            setTimeout(requestAnimationFrame, speed, (game_cycle));
        } else {
            startGame()
        }
        
    } 

    //END OF GAME CYCLE
    /////////////////////////////////////////////////////////////////////

    //SNAKE CREATION 
    function start_snake() {

        let snakeHead = {x:(gameSpaceWidth/snakeBlockSize)/2, y:(gameSpaceHeight/snakeBlockSize)/2};

        snkPos = [snakeHead];

        add_snake_block()


        //start game, enters continuous loop until gameover
        game_cycle()
        
    }

    function create_snake() {

        let lastsnkPos = [];

        for (let i = 1; i < snkPos.length; i++) {

            lastsnkPos[i-1] = {};
        
            lastsnkPos[i-1].x = snkPos[i-1].x;
            lastsnkPos[i-1].y = snkPos[i-1].y;
            
        }

        //move the snake, also check if the direction has changed
        direction_handling()

        for (let i = 1; i < snkPos.length; i++) {
            
            snkPos[i].x = lastsnkPos[i-1].x;
            snkPos[i].y = lastsnkPos[i-1].y;
            
        }



        for (let i = 0; i < snkPos.length; i++) {
            
            create_snake_block(snkPos[i].x, snkPos[i].y);
            
        }

    }


    function add_snake_block() {

        let newX = snkPos[snkPos.length-1].x,
            newY = snkPos[snkPos.length-1].y

        let newSnakeBlock = {x: newX, y: newY};

        snkPos.push(newSnakeBlock)

        // console.log(newSnakeBlock);
        
    }

    function create_snake_block(x, y) {

        let x1 = (x * snakeBlockSize) - snakeBlockSize,
            x2 = (x * snakeBlockSize),
            y1 = (y * snakeBlockSize) - snakeBlockSize,
            y2 = (y * snakeBlockSize),

            margin = (snakeBlockSize /10);

        context.beginPath();
        context.rect(x1 + margin, y1 + margin, snakeBlockSize - margin*2, snakeBlockSize - margin*2);
        context.fillStyle = 'white';
        context.fill();
        
    }

    //ADDITIONAL ITEMS ON SCREEN

    // adds a power up to the play field that can be picked up by user
    function add_powerup() {
        //set a random position on the grid
        let powerup_coord = {
            x: Math.round(((gameSpaceWidth/snakeBlockSize) -7 )* Math.random()) + 3,
            y: Math.round(((gameSpaceHeight/snakeBlockSize) -7 )* Math.random()) + 3
            
        }

        powerup_positions.push(powerup_coord)

    }

    function render_powerup() {
        
        for (let i = 0; i < powerup_positions.length; i++) {

            let x = (powerup_positions[i].x * snakeBlockSize) - snakeBlockSize,
                y = (powerup_positions[i].y  * snakeBlockSize) - snakeBlockSize;

            context.beginPath();
            context.rect(x, y, snakeBlockSize, snakeBlockSize);
            context.fillStyle = 'hsl(' + (Math.random() * 360) + ', 100%, 50%)';
            context.fill();
            
        }
    }

    //COLLISION DETECTION

    //CD for powerups
    function detect_powerup() {

        for (let i = 0; i < powerup_positions.length; i++) {
        
            if (snkPos[0].x == powerup_positions[i].x && snkPos[0].y == powerup_positions[i].y) {
                console.log('powerup!');

                powerup_positions.splice(i,1);
                powerupsOnScreen--

                speed-=2;

                add_snake_block()
                
            }
            
        }
    }

    //CD for wall

    function detect_wall() {

        if (snkPos[0].x > gameSpaceWidth/snakeBlockSize || snkPos[0].x < 1 || snkPos[0].y > gameSpaceHeight/snakeBlockSize || snkPos[0].y < 1) {
            console.log('hit wall');

            game_over()
            
        }
        
    }

    //CD for player body

    function detect_self_hit() {

        for (let i = 3; i < snkPos.length; i++) {
            if (snkPos[0].x == snkPos[i].x && snkPos[0].y == snkPos[i].y) {
                console.log('self hit');

                game_over()
                
            }
            
        }
        
    }

    //GAME OVER FUNCITON
    function game_over() {

        document.getElementById('message').innerHTML = 'Game Over';

        gameStopped = true;

    }

    //PLAYER MOVMENT CONTROL
    function direction_handling() {

        let currentSnakeHead = snkPos[0];

        switch (direction) {
            case 'd':

                currentSnakeHead.y++
                
                break;
            case 'u':

                currentSnakeHead.y--
                
                break;
            case 'r':

                currentSnakeHead.x++
                
                break;
            case 'l':

                currentSnakeHead.x--
                
                break;
        
            default:
                break;
        }

    }

    //additional functions for game play area
    /////////////////////////////////////////
    function clear_screen() { 
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
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

        context.fillStyle = 'hsl(' + (ticks*2) + ', 100%, 30%)';

        context.beginPath()
        context.rect(0,0, gameSpaceWidth, gameSpaceHeight);
        context.fill()
        
    }

}