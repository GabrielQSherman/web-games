
    //FUNCTIONS THAT INTERPRET USER INPUT
    //the event param holds the key value which is accociated with a char on the keyboard
    document.addEventListener('keydown', keyDownHandler, false);

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

    function changePlayerIcon() {

        let iconSelect = document.getElementById('playerIcon');
        
        // console.log('change to', iconSelect.value);
        
        snakeHeadImg.src = iconSelect.value;

        iconSelect.blur() //unfocus select elm...prevents arrow keys from contiunouslly changing icon until user manually focuses somewhere else on the document

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