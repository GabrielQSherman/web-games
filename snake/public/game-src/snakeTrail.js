
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

  function activate_star_speed() {

      starSpeedTimer -= 17;
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
