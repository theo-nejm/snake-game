import Apple from "../Apple.js";
import { createRect } from "../shared/canvasActions.js";
import { checkSelfHit, checkWallHit, eatApple, show } from "../shared/gameActions.js";
import Snake from "../Snake.js";

let isGameOver = false;

const canvas = document.getElementById('game');
const canvasContext = canvas.getContext('2d');
let gameInterval;

const snake = new Snake(200, 200, 20);
var apple = new Apple(canvas, snake);

export function singleplayerLoop() {
  gameInterval = setInterval(() => show(update, draw), 1000 / 10);
}

function update() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
  checkSelfHit(snake, isGameOver, gameInterval);
  eatApple(snake, apple, canvas);
  checkWallHit(snake, canvas);
}

function draw() {
  if(isGameOver) {
    createRect(0, 0, canvas.width, canvas.height, 'rgba(255, 50, 50, .75)', canvasContext); 

    canvasContext.font = "48px Arial";
    canvasContext.fillStyle = "#FAFAFA";
    canvasContext.fillText("GAME OVER! ", 48, 160);
    canvasContext.fillText("Score: " +  (snake.tail.length - 1), 96, 260);
  } else {
    createRect(0, 0, canvas.width, canvas.height, "#FAFAFA", canvasContext);

    for(let i = 0; i < snake.tail.length; i++) {
      createRect(snake.tail[i].x, snake.tail[i].y, 20 - 1, 20 - 1, "#2C2C2C", canvasContext);
    }
  
    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "#00FF42";
    canvasContext.fillText("Score: " +  (snake.tail.length - 1), (canvas.width - 120), 18);
  
    createRect(apple.x, apple.y, apple.size, apple.size, 'red', canvasContext);
    console.log('apple drawn: ' + apple.x, apple.y);
  }
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
