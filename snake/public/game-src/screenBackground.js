    

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

      moveStars() //moves the position of each start slightly
      
  }

