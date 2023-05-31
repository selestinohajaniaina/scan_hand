const tableau = document.querySelector('#tableau');
const ctxSn = tableau.getContext('2d');
const ctxSn1 = tableau.getContext('2d');
const blkSize = 26;
const row = 20;
const col = 20;
var gameOver = false;

tableau.width = col * blkSize;
tableau.height = row * blkSize;

var snakeX = blkSize * 5;
var snakeY = blkSize * 5;

var snake = [];

var foodX;
var foodY;

var veloX = 0;
var veloY = 0;

function maj() {
    if(gameOver) {
        return;
    }

    ctxSn.fillStyle = 'black';
    ctxSn.fillRect(0, 0, tableau.width, tableau.height );

    ctxSn1.beginPath();
    ctxSn1.fillStyle = 'red';
    ctxSn1.arc(foodX+13, foodY+13, blkSize/2, 0, 2*Math.PI );
    ctxSn1.fill();

    if( snakeX == foodX && snakeY == foodY ) {
        snake.push([foodX, foodY]);
        food();
    }

    ctxSn.fillStyle = 'lime';
    snakeX += veloX * blkSize;
    snakeY += veloY * blkSize;
    ctxSn.fillRect(snakeX, snakeY, blkSize, blkSize );

    snake.map((e) => {
        ctxSn.fillRect(e[0], e[1], blkSize, blkSize ); 
        if( snakeX == e[0] && snakeY == e[1]) {
            gameOver = true;
        // alert("game over");
        }
    });

    for(let i = snake.length - 1; i > 0; i--) {
        snake[i] = snake[i - 1];
    }

    if(snake.length) {
        snake[0] = [snakeX, snakeY];
        // console.log(snake[0]);
    }

    if(snakeX < 0 || snakeX > col * blkSize || snakeY < 0 || snakeY > row * blkSize) {
        gameOver = true;
        // alert("game over");
    }

}

function food() {
    foodX = Math.floor(Math.random() * col) * blkSize;
    foodY = Math.floor(Math.random() * row) * blkSize;
}

function changeDrx(x,y) {
    if(y < canvas.height/3 && y > 0 && x > canvas.width/3 && x < 2 * canvas.width/3) {
		console.log("UP");
	}else if(y < canvas.height && y > 2 * canvas.height /3 && x > canvas.width/3 && x < 2 * canvas.width/3) {
		console.log("DOWN");
	}else if(y < 2 * canvas.height / 3 && y > canvas.height /3 && x > 0 && x < canvas.width/3) {
		console.log("RIGHT");
	}else if(y < 2 * canvas.height / 3 && y > canvas.height/3 && x < canvas.width && x > 2 * canvas.width/3){

		console.log("LEFT");
    }else {
        console.log('autre');
    }
    // if (y <= 200 && veloX != 1){
    //     //down
    //     veloX = 0;
    //     veloY = 1;
    // }else if (x <= 100 && veloY != 1){
    //     //up
    //     veloX = 0;
    //     veloY = -1;
    // }else if (y >= 200 && veloX != -1){
    //     //right
    //     veloX = 1;
    //     veloY = 0;
    // }else if (x >= 100 && veloY != -1){
    //     //left
    //     veloX = -1;
    //     veloY = 0;
    // }else if (e.keyCode == 32){
    //     //down
    //     veloX = 0;
    //     veloY = 0;
    // }
}

food();
setInterval(() => {
    maj();
    if(directionX && directionY) {
        // console.log(directionX,directionY);
        changeDrx(directionX,directionY);
    }
},1000);