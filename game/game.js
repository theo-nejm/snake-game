import Apple from "./Apple.js";
import Snake from "./Snake.js";

const canvas = document.getElementById('game');
const canvasContext = canvas.getContext('2d');

const snake = new Snake(200, 200, 20);
let apple = new Apple(canvas, snake);
let gameInterval;
let isGameOver = false;

window.onload = () => {
  gameLoop();
}

function gameLoop() {
  gameInterval = setInterval(show, 1000 / 10);
}

function show() {
  update();
  draw();
}

function update() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
  checkSelfHit();
  eatApple();
  checkWallHit();
}

function gameOver() {
  clearInterval(gameInterval);
  isGameOver = true;
}

function checkWallHit() {
  const snakeHead = snake.tail[snake.tail.length - 1];
  if(snakeHead.x === -snake.size) {
    snakeHead.x = canvas.width - snake.size;
  } else if(snakeHead.x === canvas.width) {
    snakeHead.x = -snake.size;
  } else if(snakeHead.y === -snake.size) {
    snakeHead.y = canvas.height - snake.size;
  } else if(snakeHead.y === canvas.width) {
    snakeHead.y = -snake.size;
  }
}

function checkSelfHit() {
  const snakeHead = snake.tail[snake.tail.length - 1];
  for(let i = 0; i < snake.tail.length - 1; i++) {
    if(snakeHead.x === snake.tail[i].x && snakeHead.y === snake.tail[i].y) {
      gameOver();
    }
  }
}

function eatApple() {
  if(snake.tail[snake.tail.length -1].x === apple.x && snake.tail[snake.tail.length -1].y === apple.y) {
    snake.tail[snake.tail.length] = { x: apple.x, y: apple.y };

    apple = new Apple(canvas, snake);
  }
}

function draw() {
  if(isGameOver) {
    createRect(0, 0, canvas.width, canvas.height, 'rgba(255, 50, 50, .75)'); 

    canvasContext.font = "48px Arial";
    canvasContext.fillStyle = "#FAFAFA";
    canvasContext.fillText("GAME OVER! ", 48, 160);
    canvasContext.fillText("Score: " +  (snake.tail.length - 1), 96, 260);
  } else {
    createRect(0, 0, canvas.width, canvas.height, "#FAFAFA");

    for(let i = 0; i < snake.tail.length; i++) {
      createRect(snake.tail[i].x, snake.tail[i].y, 20 - 1, 20 - 1, "#2C2C2C");
    }
  
    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "#00FF42";
    canvasContext.fillText("Score: " +  (snake.tail.length - 1), (canvas.width - 120), 18);
  
    createRect(apple.x, apple.y, apple.size, apple.size, 'red');  
  }
}

function createRect(x, y, sizeX, sizeY, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, sizeX, sizeY);
}

window.addEventListener('keydown', (ev) => {
  ev.preventDefault();

  setTimeout(() => {
    if(ev.keyCode == 37 && snake.rotateX !== 1) {
      snake.rotateX = -1;
      snake.rotateY = 0;
    } else if(ev.keyCode == 38 && snake.rotateY !== 1) {
      snake.rotateX = 0;
      snake.rotateY = -1;
    } else if(ev.keyCode == 39 && snake.rotateX !== -1) {
      snake.rotateX = 1;
      snake.rotateY = 0;
    } else if(ev.keyCode == 40 && snake.rotateY !== -1) {
      snake.rotateX = 0;
      snake.rotateY = 1;
    }
  }, 1000 / 10)
});
