

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
        for (let i = 0; i < 1; i++) {
            add_powerup()
        }
        
        //this funciton will clear the snakebody position array
        start_snake()
        
    }

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
        if (ticks % 30 == 0 && powerupsOnScreen < (ticks/200) && powerupsOnScreen < 5) {

            add_powerup()

            powerupsOnScreen++
            
        }

        if (starSpeedTimer < 0) {
            
            starSpeedTimer++

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

        let gameSpeed = starSpeedTimer < -10 ? 5 : speed;
        if (!gameStopped) {
            setTimeout(requestAnimationFrame, gameSpeed, (game_cycle));
        } else {
            setTimeout(startGame, 300);
    
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





