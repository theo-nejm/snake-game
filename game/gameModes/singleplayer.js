import Apple from "../domain/Apple.js";
import { createRect } from "../shared/canvasActions.js";
import { checkSelfHit, checkWallHit, eatApple, show } from "../shared/gameActions.js";
import Snake from "../domain/Snake.js";

let isGameOver = false;

const canvas = document.getElementById('game');
const canvasContext = canvas.getContext('2d');

let gameInterval;
let applesInterval;

let snake;

let apples;

export function singleplayerLoop() {
  snake = new Snake(200, 200, 20);
  apples = [new Apple(canvas, snake)]
  gameInterval = setInterval(() => show(update, draw), 1000 / 10);
  applesInterval = setInterval(() => {
    apples.push(new Apple(canvas, snake));
  }, 10 * 1000);
}

function update() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
  isGameOver = !!checkSelfHit(snake, gameInterval, applesInterval);
  eatApple(snake, apples, canvas);
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
      createRect(snake.tail[i].x, snake.tail[i].y, snake.size - 1, snake.size - 1, "#2C2C2C", canvasContext);
    }
  
    canvasContext.font = "20px sans-serif";
    canvasContext.fillStyle = "#EA227A";
    canvasContext.fillText("Score: " +  (snake.tail.length - 1), (canvas.width - 92), 32);
  
    apples.forEach(apple => {
      createRect(apple.x, apple.y, apple.size, apple.size, 'red', canvasContext);
    })
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
  }, 1);
});

document.getElementById('start-game').onclick = () => {
  singleplayerLoop();
}
