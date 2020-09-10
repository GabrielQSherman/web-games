
    //COLLISION DETECTION - collision

    //CD for powerups
    function detect_powerup() {

      for (let i = 0; i < food_positions.length; i++) {
      
          if (snkPos[0].x == food_positions[i].x && snkPos[0].y == food_positions[i].y) {
              // console.log('powerup!');

              food_positions.splice(i,1);
              powerupsOnScreen--

              if (speed >= 20) {

                  // console.log(speed);
                  
                  speed-=1;
              }

              score += scoreInc;

              scoreInc++;

              document.getElementById('message').innerHTML = 'Score: ' + score;

              add_snake_block()

              activate_star_speed()
      
              activate_trail()
              
          }
          
      }
  }

  //CD for wall

  function detect_wall() {

      if ( snkPos[0].x < 1 ) {

          snkPos[0].x = gameSpaceWidth/snakeBlockSize;
          
      } else if (snkPos[0].x > gameSpaceWidth/snakeBlockSize ) {

          snkPos[0].x = 0;

      } else if ( snkPos[0].y > gameSpaceHeight/snakeBlockSize ) {

          snkPos[0].y = 0;

      } else if ( snkPos[0].y < 1 ) {

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