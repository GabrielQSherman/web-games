
 
    //INITAL VARIABLE DELERATION FOR CANVAS ELEMENT
    let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    gameSpaceWidth = canvas.width = 1200,     //width of the canvas
    gameSpaceHeight = canvas.height = 1200,  //height of canvas

    ticks = 0, //messures how many frames have occured since start of game

    trailTimer = 0, //this will detirmin if a trail is left behind the snake or not

    snakeBlockSize = 25,  // this will determin the size of the grid blocks that the snake moves on, as well as the size of each block that makes up the snake
    snkPos = [],         // this array will contain all the positions that the snake currently takes up

    localHighScore = 0, //this var will be set eachtime the player beats their current highscore


    food_positions = [],

    trail_positions = [],


    direction;     // the direction the snake moves this can change every time the user inputs an arrow key; u = up, d = down, l = left, r = right;

    //console.log(window.innerWidth);

    //a boolean lets the program interpret if the game should be started. (it should be executed once per game)
    let gameStarted = false,
        gameStopped;

    //game score
    let score, scoreInc;
    
    let shownScore = false, //boolean that allows the program to only have to show the score when the score is updated, not every frame
        
        serverConnected, //the program will make a request to the database which host the highscores. This boolean will detirmin if a table of scores is created or a failed to reach server message is shown to the user

        speed = 0, //speed of snake (ms wait between frames)

        powerupsOnScreen = 0;

    let darkmode = false;

    load_latest_hs() //LOAD IN HIGHSCORES FROM DATABASE ON PAGELOAD

    //load image for snake head
    let snakeHeadImg = new Image();
        snakeHeadImg.src = 'smallCBpattern.png';

    //CREATE BLACK BACKGROUND
        
    context.beginPath();
    context.rect(0,0,gameSpaceWidth, gameSpaceHeight);
    context.fillStyle = 'black';
    context.fill()


    // HANDLING USER INPUT

    document.addEventListener('keydown', keyDownHandler, false);
    // document.addEventListener('keyup', keyUpHandler, false);

    //FUNCTIONS THAT INTERPRET USER INPUT
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

            case "KeyP":
            case "KeyQ":

                if (gameStarted) {
                    alert('Game Paused\n\nPress Enter, Space, or "Ok" to resume')
                }
                
                break;
            default:
                break;
        }
        
    }

    /////////////////////////////////////////////////////////////////////////////////////////////

    //START OF GAME PROGRAM FUNCTION, SHOULD ONLY BE EXECUTED ONCE

    function startGame() {

        //reset neccesary variables
        speed = 50;
        trailTimer = 0;
        score = 0;
        scoreInc = 100;
        direction = '';
        ticks = 0;
        powerupsOnScreen = 0;
        food_positions = [];
        trail_positions = []
        shownScore = false

        gameStopped = false;


        // console.log('game started');


        //this funciton will clear the snakebody position array
        // for (let i = 0; i < 50; i++) {
        //     add_powerup()
        //     add_powerup()         
        // }
        

        start_snake()
        
    }


    // GAME LOOP

    function game_cycle() {

        if (direction == '') {
            document.getElementById('message').innerHTML = 'Press an arrow key to start!';
            
        } else {
            
            if (!shownScore) {
                // console.log('test');
                
                document.getElementById('message').innerHTML = 'Score: ' + score;
                shownScore = true
            }
        }

        // console.log(speed);
        

        clear_screen() //everything that will apear on screen must be called after this funciton call

        create_background() //creates a colorful background, default is the html background

        // create_play_grid() //shows the grid that the snake moves on

        ticks++ //frame count increase


        //add powerup
        if (ticks % 50 == 0 && powerupsOnScreen < 2) {

            add_powerup()

            powerupsOnScreen++
            
        }

        if (trailTimer > 0) {

            trailTimer--

            createTrail()
        }

        renderTrail()

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
            setTimeout(startGame, 300);
    
        }
        
    } 

    //END OF GAME CYCLE
    /////////////////////////////////////////////////////////////////////

    //SNAKE CREATION 
    function start_snake() {

        let startX = Math.ceil((gameSpaceWidth/snakeBlockSize) * Math.random()), startY = Math.ceil((gameSpaceHeight/snakeBlockSize) * Math.random());

        // let snakeHead = {x:(gameSpaceWidth/snakeBlockSize)/2, y:(gameSpaceHeight/snakeBlockSize)/2};
        let snakeHead = {x: startX, y: startY};
        snkPos = [snakeHead];

        add_snake_block()
        add_snake_block()

        //start game, enters continuous loop until gameover
        game_cycle()

        create_star_field() //adds stars to Stars array

        
    }

    function add_snake_block() {

        let newX = snkPos[snkPos.length-1].x,
            newY = snkPos[snkPos.length-1].y

        let newSnakeBlock = {x: newX, y: newY};

        snkPos.push(newSnakeBlock)

        // console.log(newSnakeBlock);
        
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



        for (let i = 1; i < snkPos.length; i++) {

                create_snake_block(snkPos[i].x, snkPos[i].y, i);
            
        }

        create_snake_head(snkPos[0].x, snkPos[0].y, 0);

    }

    function create_snake_block(x, y, index) {

            let
            margin = (snakeBlockSize /10),
            x1 = (x * snakeBlockSize) - snakeBlockSize,
            x2 = snakeBlockSize - margin*2,
            y1 = (y * snakeBlockSize) - snakeBlockSize,
            y2 = snakeBlockSize - margin*2,


            color = ticks + (index*20);

            context.beginPath();
            context.rect(x1 + margin, y1 + margin, x2, y2);
            context.fillStyle = `hsl( ${color}, 100%, 70%)`;
            context.fill();

    }

    function create_snake_head(x, y, index) {

       

        let
            margin = (snakeBlockSize /10),
            x1 = (x * snakeBlockSize) - snakeBlockSize,
            x2 = snakeBlockSize - margin*2,
            y1 = (y * snakeBlockSize) - snakeBlockSize,
            y2 = snakeBlockSize - margin*2;


        context.drawImage(snakeHeadImg, x1 + margin, y1 + margin, snakeBlockSize - margin*2, snakeBlockSize - margin*2);

        // context.beginPath();
        // context.rect(x1 + margin, y1 + margin, snakeBlockSize - margin*2, snakeBlockSize - margin*2);
        // context.fillStyle = `hsl( ${color}, 100%, 70%)`;
        // context.fill();

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

        food_positions.push(powerup_coord)

    }

    function render_powerup() {
        
        for (let i = 0; i < food_positions.length; i++) {

            // let x = (food_positions[i].x * snakeBlockSize) - snakeBlockSize,
            //     y = (food_positions[i].y  * snakeBlockSize) - snakeBlockSize;
            let x = (food_positions[i].x * snakeBlockSize) - snakeBlockSize/2,
            y = (food_positions[i].y  * snakeBlockSize) - snakeBlockSize/2;
            
            context.save()

            context.beginPath();

            context.arc(x, y, snakeBlockSize/2, 0, Math.PI*2)
            
            context.fillStyle = 'hsl(' + food_positions[i].color + ', 100%, 70%)';
            context.fill();

            context.restore()
            
        }
    }

    //COLLISION DETECTION - collision

    //CD for powerups
    function detect_powerup() {

        for (let i = 0; i < food_positions.length; i++) {
        
            if (snkPos[0].x == food_positions[i].x && snkPos[0].y == food_positions[i].y) {
                // console.log('powerup!');

                food_positions.splice(i,1);
                powerupsOnScreen--

                if (speed >= 20) {

                    console.log(speed);
                    
                    speed-=1;
                }

                score += scoreInc;

                scoreInc++;

                document.getElementById('message').innerHTML = 'Score: ' + score;

                add_snake_block()

                activate_trail()
                
            }
            
        }
    }

    //CD for wall

    function detect_wall() {

        if ( snkPos[0].x > gameSpaceWidth/snakeBlockSize ) {
        
            snkPos[0].x = 0;

        } else if ( snkPos[0].x < 1 ) {

            snkPos[0].x = gameSpaceWidth/snakeBlockSize;

        } else if ( snkPos[0].y > gameSpaceHeight/snakeBlockSize ) {

            snkPos[0].y = 0;

        } else if (  snkPos[0].y < 1 ) {

            snkPos[0].y = gameSpaceHeight/snakeBlockSize;

        }
        
    }

    //CD for player body

    function detect_self_hit() {

        for (let i = 3; i < snkPos.length; i++) {
            if (snkPos[0].x == snkPos[i].x && snkPos[0].y == snkPos[i].y) {
                // console.log('self hit');

                game_over()
                
            }
            
        }
        
    }

    //GAME OVER FUNCITON 
    function game_over() {

        document.getElementById('message').innerHTML = '<h1 style="color:red">Game Over!</h1>';

        //It will break the code if the program tries to access an element that does not exist
        if (serverConnected) {

            //the table element will be checked to see if the players score was higher than or equal to the score in 10th
            const lb = document.getElementById('leaderBoardTab');

            //regardless of the length (# of rows) of the table, this var will always be set to the last score displayed
            let lastLBScore = lb.lastElementChild.lastElementChild.innerText;

            // console.log(lastLBScore, score);

            if (score >= lastLBScore || lastLBScore === 'Score' ) {
                //if the players score is in the top ten they will be added to the leaderboard

                let name = enter_highscore_name(0,0);

                // console.log(name);

                if (name != undefined) upload_highscore(score, name)
                
            }
            
        }

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

    //send message to user if get request was not sucessful

    function get_hs_failed() {

        const leaderBoardDiv = document.getElementById("lbdiv");

        leaderBoardDiv.innerHTML = '<h1>Failed to get highscore data from server, make sure server is up and running correctly<h1>'

    }

    //set up leaderboard html table element if get request was successful
    function set_up_leaderboard(responseArr) {

        //create leaderboard 'title'
        // <h1 id="LB">Leader Board</h1> htmt equivelent
        const lbTitle = document.createElement('h1');

        lbTitle.id = 'LB';
        lbTitle.innerText = 'Leader Board';

        //use xhr to get all scores -> pass the array from the parsed response text, and passes as parameter of this function
        const sortedScores = responseArr.sort((a, b) => {
           
            return (parseInt(b.score) - parseInt(a.score));

        });

        //responseArr will have all the current highscores in database (name & score) as a json obj
       
        //CREATING scores table ...

        //create table in DOM
        const leaderTable = document.createElement('table'),

        //create headers
         tableRow = document.createElement('tr'),
         tableHeaderName = document.createElement('th'),
         tableHeaderScore = document.createElement('th');

         tableHeaderName.innerText = 'Name';
         tableHeaderScore.innerText = 'Score';

         tableRow.appendChild(tableHeaderName);
         tableRow.appendChild(tableHeaderScore);

         leaderTable.appendChild(tableRow)

         let numOfScores = 21;
        
         for (let i = 0; i < sortedScores.length && i < numOfScores && i < 27; i++) {

            if (sortedScores[i-1] != undefined && sortedScores[i].score === sortedScores[i-1].score) {
                numOfScores++
            }
            
            const tr = document.createElement('tr'); //one variable for the row the info is contained on

            const tdName = document.createElement('td'); //one for each

            const tdScore = document.createElement('td'); //peice of infomation

            tdName.innerText = sortedScores[i].name;
            tdScore.innerText = sortedScores[i].score;

            tr.appendChild(tdName);
            tr.appendChild(tdScore);

            leaderTable.appendChild(tr);
            
        }

        leaderTable.id = 'leaderBoardTab';

        leaderTable.align = 'center';
        
        const leaderBoardDiv = document.getElementById("lbdiv");

        leaderBoardDiv.innerHTML = ''

        //append the title then the table
        leaderBoardDiv.appendChild(lbTitle)

        leaderBoardDiv.appendChild(leaderTable);


    }

    // FUNCTIONS FOR CREATING BACKGROUND

    let Stars = []; //this array will store the values of the current stars on the screen


    function create_star_field() {

        const width = gameSpaceWidth, height = gameSpaceHeight;

        Stars = [];

        for (let i = 0; i < 200; i++) {

            let 
                x = (Math.random() * width) - width /2,
                y = (Math.random() * height) - height /2,
                lightness = 0;
             
            Stars.push({
                x: x, y: y, lightness: lightness
            });
            
        }
        
    }


    function renderStars() {

        for (let i = 0; i < Stars.length; i++) {
            
            make_star(Stars[i].x, Stars[i].y, Stars[i].lightness)
            
        }

    }

    function make_star(x, y, lightness) {

        let 
        x1 = x,
        y1 = y,
        x2 = x*(1.13),
        y2 = y*(1.13),
        
        grad = context.createLinearGradient(x1, y1, x2, y2);

        //set up gradient
        grad.addColorStop(1, `hsl(0, 100%, ${lightness +5}%)`);
        grad.addColorStop(6/7, `hsl(45, 100%, ${lightness+2}%)`);
        grad.addColorStop(5/7, `hsl(90, 100%, ${lightness+1}%)`);
        grad.addColorStop(4/7, `hsl(135, 100%, ${lightness}%)`);
        grad.addColorStop(3/7, `hsl(180, 100%, ${lightness-1}%)`);
        grad.addColorStop(2/7, `hsl(245, 100%, ${lightness-2}%)`);
        grad.addColorStop(1/7, `hsl(305, 100%, ${lightness -5}%)`);
        
        context.strokeStyle = grad;
        
        //gradient line stroke 
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);
       
        context.stroke();

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
                }
           
        }
        
    }


    function addStar() { //when one star dies another is born

        const width = gameSpaceWidth, height = gameSpaceHeight;

        let
        x = (Math.random() * width/2) - width /4,
        y = (Math.random() * height/2) - height /4,

        lightness = 0;
 
        Stars.push({
            x: x, y: y, lightness: lightness
        });
        
    }

    //HIGHSCORE FUNCTIONS 

    //LOAD HIGHSCORES when page loads
    

    function load_latest_hs() {

        const xhr = new XMLHttpRequest(), method = 'GET', endpoint = 'http://localhost:7777/all';

        xhr.open(method, endpoint, true )

        xhr.setRequestHeader('Accept', '*')

        xhr.onload = () => {

            let jsonData = JSON.parse(xhr.responseText);

            // console.log(jsonData.all_scores);
            
            set_up_leaderboard(jsonData.all_scores)

            serverConnected = true
        }

        xhr.onerror = (err) => {
            //function that will send a message to the user letting them know
            // the highscores could not be retrieved from server
            get_hs_failed() 

            serverConnected = false;
        }

        xhr.send()

    }

    function enter_highscore_name(message, cancelCount) {

        if (message === 0) {
            message = "YOU MADE THE LEADERBOARD!!!\nEnter 3 Charaters To Secure Your Spot On The Leaderboard"
        }

        let hsName = prompt(message, "");

        if (hsName != null) {

            hsName = hsName.trim()

            if (hsName.length > 2) {

                // console.log(hsName.substring(0,3).toUpperCase());

                return hsName.substring(0,3).toUpperCase();

            } else {

                message = "The Name Entered Must Be 3 Character, longer inputs will be shortened"

                return enter_highscore_name(message, 0)

            }

            
        } else if (cancelCount == 0) {

            message = "Are you sure you want to cancel? Just enter a name and your highscore will be saved"

           return enter_highscore_name(message, 1)
            
        } else if (cancelCount == 1) {

            message = "If this prompt is cancled your highscore will not be saved"

           return enter_highscore_name(message, 2)

        }  
        
    }

    
    //SEND SCORE DATA TO DATABASE

    function upload_highscore(score, name) {

        let userScore = score, userName = name,

            json = JSON.stringify({name: userName, score: userScore});

        const xhr = new XMLHttpRequest(), method = 'POST', endpoint = 'http://localhost:7777/addnew';

        xhr.open(method, endpoint, true )

        xhr.setRequestHeader('Accept', '*')
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {

            let jsonData = JSON.parse(xhr.responseText);

            console.log(jsonData.message);

        }

        xhr.send(json)

        setTimeout(load_latest_hs, 100)

    }

    //Function for creating a colored trail behind snake when food is eaten
    function createTrail() {

        let snakeButt = snkPos.slice(snkPos.length-1, snkPos.length);
        

        let newX = snakeButt[0].x,
            newY = snakeButt[0].y,

            color = ticks + ((snkPos.length-1) * 20),

            alpha = 1;

        let trailBlock = {x: newX, y: newY, color: color, alpha: alpha };

    
        trail_positions.push(trailBlock);
        
    }

    //function that adds to the timer, this var will detirmin how long a trail will continue behind the snake
    function activate_trail() {

        trailTimer += snkPos.length*1.5;

    }

    function renderTrail() {

        for (let i = 0; i < trail_positions.length; i++) {
            

            const x = trail_positions[i].x,  y = trail_positions[i].y;
            
            let x1 = (x * snakeBlockSize) - snakeBlockSize,
            x2 = (x * snakeBlockSize),
            y1 = (y * snakeBlockSize) - snakeBlockSize,
            y2 = (y * snakeBlockSize),

            margin = 0;

            color = trail_positions[i].color,

            alpha = trail_positions[i].alpha;

            trail_positions[i].color += (trail_positions.length - i)*5.7

            trail_positions[i].alpha -= .05;

            if (trail_positions[i].alpha <= 0 ) {

                trail_positions.splice(i,1);
                
            }

            context.beginPath();
            context.rect(x1 + margin, y1 + margin, snakeBlockSize - margin*2, snakeBlockSize - margin*2);
            context.fillStyle = `hsla( ${color}, 100%, 70%, ${alpha})`;
            context.fill();
            
        }
        

    }

    function toggleDarkMode() {

        const 
            rSB = document.getElementById('rightSideBar'),
            lSB = document.getElementById('leftSideBar'),
            LB = document.getElementById('lbdiv'),
            GI = document.getElementById('gameinfo');

            console.log(GI);
            
        
        if (!darkmode) {

            document.body.style.background = 'black'
            rSB.style.background = 'black'
            lSB.style.background = 'black'
            LB.style.background = 'black'
            GI.style.background = 'black'

            GI.style.borderImage = 'linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0))';
            canvas.style.borderImage = 'linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0))'

            darkmode = true

        } else {
    

            document.body.style.backgroundImage = "url('checkerboard-bg.jpg')";
            rSB.style.backgroundImage = 'linear-gradient(rgb(125, 244, 255), rgb(255, 122, 178))';
            lSB.style.backgroundImage = 'linear-gradient(rgb(224, 122, 255), yellow)';
            LB.style.background = 'rgb(152, 243, 255)'

            GI.style.borderImage = 'repeating-linear-gradient(45deg, rgb(255, 0, 0), rgb(255, 160, 51), rgb(235, 255, 51),  rgb(109, 255, 51),  rgb(51, 255, 255),  rgb(116, 51, 255), rgb(197, 51, 255), rgb(255, 51, 170) 30px) 60';
            canvas.style.borderImage = 'repeating-linear-gradient(135deg, rgb(255, 0, 0), rgb(255, 160, 51), rgb(235, 255, 51),  rgb(109, 255, 51),  rgb(51, 255, 255),  rgb(116, 51, 255), rgb(197, 51, 255), rgb(255, 51, 170) 30px) 60';

            darkmode = false

        }
        
    }