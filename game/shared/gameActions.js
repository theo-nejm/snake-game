import Apple from "../domain/Apple.js";

function show(update, draw) {
  update();
  draw();
}

function checkWallHit(snake, canvas) {
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

function checkSelfHit(snake, gameInterval) {
  const snakeHead = snake.tail[snake.tail.length - 1];
  for(let i = 0; i < snake.tail.length - 1; i++) {
    if(snakeHead.x === snake.tail[i].x && snakeHead.y === snake.tail[i].y) {
      return gameOver(gameInterval);
    }
  }
}

function eatApple(snake, apple, canvas) {
  if(snake.tail[snake.tail.length -1].x === apple.x && snake.tail[snake.tail.length -1].y === apple.y) {
    snake.tail[snake.tail.length] = { x: apple.x, y: apple.y };

    return new Apple(canvas, snake);
  }

  return apple;
}

function gameOver(gameInterval) {
  clearInterval(gameInterval);
  
  return true;
}

export {
  show, checkWallHit, checkSelfHit, eatApple, gameOver
} 
