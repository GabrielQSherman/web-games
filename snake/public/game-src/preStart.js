
  
    //INITAL VARIABLE DELERATION FOR CANVAS ELEMENT
    let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    gameSpaceWidth = canvas.width = 1200,     //width of the canvas
    gameSpaceHeight = canvas.height = 1200,  //height of canvas

    ticks = 0, //messures how many frames have occured since start of game

    trailTimer = 0,           //this will determine if a trail is left behind the snake or not
    starSpeedTimer = 0       //this will determine if the stars are speed up to indicate if the player got a new powerup

    snakeBlockSize = 30,   // this will determin the size of the grid blocks that the snake moves on, as well as the size of each block that makes up the snake
    snkPos = [],          // this array will contain all the positions that the snake currently takes up

    localHighScore = 0, //this var will be set eachtime the player beats their current highscore


    food_positions = [],

    trail_positions = [],


    direction = '';     // the direction the snake moves this can change every time the user inputs an arrow key; u = up, d = down, l = left, r = right;
    
    let Stars = []; //this array will store the values of the current stars on the screen

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
        snakeHeadImg.src = document.getElementById('playerIcon').value;

    let star1Img = new Image();
        star1Img.src = 'star1.png';

    let star2Img = new Image();
        star2Img.src = 'star2.png';

    //CREATE BLACK BACKGROUND
        
    context.beginPath();
    context.rect(0,0,gameSpaceWidth, gameSpaceHeight);
    context.fillStyle = 'black';
    context.fill()
