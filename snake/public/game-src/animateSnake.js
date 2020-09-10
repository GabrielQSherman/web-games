   //SNAKE CREATION 
   function start_snake() {

    let startX = Math.ceil((gameSpaceWidth/snakeBlockSize) * Math.random()), startY = Math.ceil((gameSpaceHeight/snakeBlockSize) * Math.random());

    // let snakeHead = {x:(gameSpaceWidth/snakeBlockSize)/2, y:(gameSpaceHeight/snakeBlockSize)/2};
    let snakeHead = {x: startX, y: startY};
    snkPos = [snakeHead];

    for (let i = 0; i < 2; i++) {
        add_snake_block()         
    }

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

    if (snakeHeadImg.src.includes('pacman')) {

        makePMHead(x1+ snakeBlockSize/2, y1+ snakeBlockSize/2)
        
    } else if (snakeHeadImg.src.includes('eye') || snakeHeadImg.src.includes('yinyang')) {
        let factor = .01;
        context.drawImage(snakeHeadImg, x1 + margin * factor, y1 + margin* factor, snakeBlockSize - margin*2* factor, snakeBlockSize - margin*2* factor);
    } else {
        let factor = .2;
        context.drawImage(snakeHeadImg, x1 + margin * factor, y1 + margin* factor, snakeBlockSize - margin*2* factor, snakeBlockSize - margin*2* factor);
    }

}

function makePMHead(x, y) {

    context.fillStyle = trailTimer > 0 ? `hsl( ${ticks}, 100%, 70%)`:'yellow';
    
    let mouthAngleStart = ((Math.cos(ticks/3))*1.2),
        mouthAngleEnd = (Math.PI*2 - (Math.cos(ticks/3))*1.2),

        headSize = snakeBlockSize/3 + snkPos.length/3;

    context.save()

    context.translate(x,y)

    switch (direction) { //direction 'right' will work fine as is, so no rotation needed
        case 'd':
                    context.rotate(Math.PI/2)
            break;
        case 'u':
                    context.rotate(-Math.PI/2)
            break;
        case 'l':
                    context.rotate(Math.PI/2 + 1.5)
            break;
        default:
            break;
    }

    context.beginPath();
    context.moveTo(0,0)
    context.arc(0,0, headSize, mouthAngleStart , mouthAngleEnd);
    context.fill();
    
    context.restore()
}