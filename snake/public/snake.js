
 
    //INITAL VARIABLE DELERATION FOR CANVAS ELEMENT
    let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    gameSpaceWidth = canvas.width = 800,     //width of the canvas
    gameSpaceHeight = canvas.height = 800,  //height of canvas

    ticks = 0, //messures how many frames have occured since start of game

    snakeBlockSize = 25,  // this will determin the size of the grid blocks that the snake moves on, as well as the size of each block that makes up the snake
    snkPos = [],         // this array will contain all the positions that the snake currently takes up

    localHighScore = 0, //this var will be set eachtime the player beats their current highscore


    powerup_positions = [],


    direction = 'u';     // the direction the snake moves this can change every time the user inputs an arrow key; u = up, d = down, l = left, r = right;

    //console.log(window.innerWidth);

    //a boolean lets the program interpret if the game should be started. (it should be executed once per game)
    let gameStarted = false,
        gameStopped;


    //game score
    let score = 0, scoreInc = 1;
    //boolean that allows the program to only have to show the score when the score is updated, not every frame
    let shownScore = false;

    //LOAD HIGHSCORES
    const xhr = new XMLHttpRequest(), method = 'GET', endpoint = 'http://localhost:7777/all';

    xhr.open(method, endpoint, true )

    xhr.setRequestHeader('Accept', '*')

    xhr.onload = () => {

        let jsonData = JSON.parse(xhr.responseText);

        // console.log(jsonData.all_scores);
        
        set_up_leaderboard()

    }

    xhr.send()


    //CREATE BLACK BACKGROUND
        
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

                    gameStarted = true


                    startGame()
                    
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
        speed = 77;
        score = 0;
        scoreInc = 1;
        direction = '';
        ticks = 0;
        powerupsOnScreen = 0;
        powerup_positions = [];
        shownScore = false

        gameStopped = false;


        console.log('game started');


        //this funciton will clear the snakebody position array
        add_powerup()
        add_powerup()
        start_snake()
        
    }


    // GAME LOOP

    let speed = 77, //speed of snake (ms wait between frames)

        powerupsOnScreen = 0;

    function game_cycle() {

        if (direction == '') {
            document.getElementById('message').innerHTML = 'Press an arrow key to start!';
            
        } else {
            
            if (!shownScore) {
                console.log('test');
                
                document.getElementById('message').innerHTML = 'Score: ' + score;
                shownScore = true
            }
        }

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
        detect_powerup()

        detect_wall() //log if the wall has been hit
        detect_self_hit() //log if one snake part hits the snake head
            
        // console.log('snake moved', ticks, snkPos);
        if (!gameStopped) {
            setTimeout(requestAnimationFrame, speed, (game_cycle));
        } else {
            setTimeout(startGame, 1000);
    
        }
        
    } 

    //END OF GAME CYCLE
    /////////////////////////////////////////////////////////////////////

    //SNAKE CREATION 
    function start_snake() {

        let snakeHead = {x:(gameSpaceWidth/snakeBlockSize)/2, y:(gameSpaceHeight/snakeBlockSize)/2};

        snkPos = [snakeHead];

        add_snake_block()
        add_snake_block()

        //start game, enters continuous loop until gameover
        game_cycle()

        create_star_field() //adds stars to Stars array

        
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
            
            create_snake_block(snkPos[i].x, snkPos[i].y, i);
            
        }

    }


    function add_snake_block() {

        let newX = snkPos[snkPos.length-1].x,
            newY = snkPos[snkPos.length-1].y

        let newSnakeBlock = {x: newX, y: newY};

        snkPos.push(newSnakeBlock)

        // console.log(newSnakeBlock);
        
    }

    function create_snake_block(x, y, index) {

        let x1 = (x * snakeBlockSize) - snakeBlockSize,
            x2 = (x * snakeBlockSize),
            y1 = (y * snakeBlockSize) - snakeBlockSize,
            y2 = (y * snakeBlockSize),

            margin = (snakeBlockSize /10);

            color = ticks + (index*20);


        context.beginPath();
        context.rect(x1 + margin, y1 + margin, snakeBlockSize - margin*2, snakeBlockSize - margin*2);
        context.fillStyle = `hsl( ${color}, 100%, 70%)`;
        context.fill();
        
    }

    //ADDITIONAL ITEMS ON SCREEN

    // adds a power up to the play field that can be picked up by user
    function add_powerup() {
        //set a random position on the grid
        let powerup_coord = {
            x: Math.round(((gameSpaceWidth/snakeBlockSize) -7 )* Math.random()) + 3,
            y: Math.round(((gameSpaceHeight/snakeBlockSize) -7 )* Math.random()) + 3,
            color: Math.round(Math.random() * 360)
            
        }

        powerup_positions.push(powerup_coord)

    }

    function render_powerup() {
        
        for (let i = 0; i < powerup_positions.length; i++) {

            // let x = (powerup_positions[i].x * snakeBlockSize) - snakeBlockSize,
            //     y = (powerup_positions[i].y  * snakeBlockSize) - snakeBlockSize;
            let x = (powerup_positions[i].x * snakeBlockSize) - snakeBlockSize/2,
            y = (powerup_positions[i].y  * snakeBlockSize) - snakeBlockSize/2;
            
            context.save()

            context.beginPath();

            context.arc(x, y, snakeBlockSize/2, 0, Math.PI*2)
            
            context.fillStyle = 'hsl(' + powerup_positions[i].color + ', 100%, 70%)';
            context.fill();

            context.restore()
            
        }
    }

    //COLLISION DETECTION

    //CD for powerups
    function detect_powerup() {

        for (let i = 0; i < powerup_positions.length; i++) {
        
            if (snkPos[0].x == powerup_positions[i].x && snkPos[0].y == powerup_positions[i].y) {
                // console.log('powerup!');

                powerup_positions.splice(i,1);
                powerupsOnScreen--

                if (speed >= 44) {
                    speed-=4;
                }

                score += scoreInc;

                scoreInc++;

                document.getElementById('message').innerHTML = 'Score: ' + score;

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

        document.getElementById('message').innerHTML = '<h1 style="color:red">Game Over!</h1>';

        if (localHighScore < score) {
            localHighScore = score

            document.getElementById('localhs').innerText = localHighScore;
        }

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

        context.strokeStyle = "white";
        
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

        context.fillStyle = 'black';

        context.rect(0,0, gameSpaceWidth, gameSpaceHeight);

        context.fill()

        context.save()

        context.translate(gameSpaceWidth/2, gameSpaceHeight/2)

        renderStars() //displays each star from its position in the Stars array 

        context.restore()

        moveStars(57) //moves the position of each start slightly
        
    }

    //CREATING LEADERBOARD

    function set_up_leaderboard() {

        //create table in DOM

        //sort by top score
        
        //show up to ten scores

        //use for loop 
        //and make a table with key/value pairs for name and score

        //append info to dom
    }

    // FUNCTIONS FOR CREATING BACKGROUND

    let Stars = []; //this array will store the values of the current stars on the screen

    
    function make_circle(x, y, hue, size, lightness){

        context.beginPath()
        context.arc(x, y,  size, 0, 2 * Math.PI)

        let saturation = 70;

        context.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        context.fill()

        
    }


    function create_star_field() {

        const width = gameSpaceWidth, height = gameSpaceHeight;

        Stars = [];

        for (let i = 0; i < 200; i++) {

            let hue = Math.random() * 360,
                    x = (Math.random() * width) - width /2,
                    y = (Math.random() * height) - height /2,
                    size = 1,
                    lightness = 60;
             
            Stars.push({
                x: x, y: y, hue: hue, radius: size, lightness: lightness
            });
            
        }
        
    }


    function renderStars() {

        for (let i = 0; i < Stars.length; i++) {
            
            make_circle(Stars[i].x, Stars[i].y, Stars[i].hue, Stars[i].radius, Stars[i].lightness);
            
        }

    }

    function moveStars(speed) {

        for (let i = 0; i < Stars.length; i++) {

            const width = gameSpaceWidth;

            let NewX = Stars[i].x * (1 + speed/1000),
                NewY = Stars[i].y * (1 + speed/1000);


                if (NewX > width || NewX < -width || NewY > width || NewY < -width) {

                    Stars.splice(i, 1); //if it goes off screen, delete it from the stars to be rendered

                    addStar() // then add a new one to replace it

                    i--

                } else {

                    Stars[i].x = NewX;
                    Stars[i].y = NewY;

                    Stars[i].lightness += 3;
                    
                    Stars[i].radius += .027;

                }
           
        }
        
    }


    function addStar() { //when one star dies another is born

        const width = gameSpaceWidth, height = gameSpaceHeight;

        let hue = (Math.random() * 360),
        x = (Math.random() * width/2) - width /4,
        y = (Math.random() * height/2) - height /4,
        size = 1,
        lightness = 0;
 
        Stars.push({
            x: x, y: y, hue: hue, radius: size, lightness: lightness
        });
        
    }


    console.log('page has loaded');