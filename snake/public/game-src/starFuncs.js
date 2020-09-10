

    function create_star_field() {

      const width = gameSpaceWidth, height = gameSpaceHeight;

      Stars = [];

      for (let i = 0; i < 333; i++) {

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
      starSpeed = snkPos.length;
      x1 = x,
      y1 = y,
      x2 = starSpeedTimer < 0 ? x*(1+ starSpeed/50 + ((starSpeedTimer)/7)) : x*(1 + starSpeed/50),
      y2 = starSpeedTimer < 0 ? y*(1+ starSpeed/50 + ((starSpeedTimer)/7)) : y*(1 + starSpeed/50),
      
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

  function moveStars() {

      let starSpeed = snkPos.length < 27 ? snkPos.length: 27,

          width = gameSpaceWidth;

      for (let i = 0; i < Stars.length; i++) {

          let NewX = starSpeedTimer < 0 ? Stars[i].x * ((1 + snkPos.length/100) + ((starSpeedTimer+20)/300)) : Stars[i].x * (1 + snkPos.length/100) ,
              NewY = starSpeedTimer < 0 ? Stars[i].y * ((1 + snkPos.length/100) + ((starSpeedTimer+20)/300)) : Stars[i].y * (1 + snkPos.length/100);


              if (NewX > width || NewX < -width || NewY > width || NewY < -width) {

                  Stars.splice(i, 1); //if it goes off screen, delete it from the stars to be rendered

                  addStar() // then add a new one to replace it

                  i--

              } else {

                  Stars[i].x = NewX;
                  Stars[i].y = NewY;

                  Stars[i].lightness += (snkPos.length / 70) + 3.7;
              }
         
      }
      
  }

  
  function addStar() { //when one star dies another is born
    let  
    ranNum = Math.random() * 100   
    radius = (ticks/15) + 5;
    randomX1 = (Math.cos(ranNum) * radius),
    randomY1 = (Math.sin(ranNum) * radius),

    ranNum = Math.random() * 100,

    x =  (randomX1 * ranNum),
    y =  (randomY1 * ranNum);
    lightness = 0;

    Stars.push({
        x: x, y: y, lightness: lightness
    });
    
}
