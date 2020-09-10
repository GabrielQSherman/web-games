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

          let x = (food_positions[i].x * snakeBlockSize) - snakeBlockSize*1.5,
              y = (food_positions[i].y  * snakeBlockSize) - snakeBlockSize*1.5,
              image = food_positions[i].color > 180 ? star1Img : star2Img; 
              //detirmine what image the powerup will use based on the powerup color property

              //create some random lines to make powerup more drawing to the eye
              context.save()
              context.translate(x + snakeBlockSize,y + snakeBlockSize);

              for (let j = 0; j < 5; j++) {

                  context.beginPath();
                 
                  context.moveTo(0,0);

                  context.rotate( Math.random() * ( Math.PI * 2) );

                  context.lineTo(Math.random() * snakeBlockSize/3 + snakeBlockSize/2,Math.random() * 5 + 15);

                  context.strokeStyle = 'hsl(' + ( Math.random() * 100 + food_positions[i].color ) +  ', 100%, 70%)';

                  context.stroke()
                  
                  
              }
              context.restore()

          //makes main star image
          context.drawImage(image, x, y, snakeBlockSize*2, snakeBlockSize*2);
          
      }
  }
