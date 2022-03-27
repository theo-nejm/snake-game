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

function checkSelfHit(snake) {
  const snakeHead = snake.tail[snake.tail.length - 1];
  for(let i = 0; i < snake.tail.length - 1; i++) {
    if(snakeHead.x === snake.tail[i].x && snakeHead.y === snake.tail[i].y) {
      return true;
    }
  }
}

function checkPlayersHit(snake1, snake2) {
  for(let i = 0; i < snake1.tail.length; i++) {
    const snake2Head = snake2.tail[snake2.tail.length - 1]
    if(snake2Head.x === snake1.tail[i].x && snake2Head.y === snake1.tail[i].y) {
      return -1;
    }
  }

  for(let i = 0; i < snake2.tail.length; i++) {
    const snake1Head = snake1.tail[snake1.tail.length - 1]
    if(snake1Head.x === snake2.tail[i].x && snake1Head.y === snake2.tail[i].y) {
      return 1;
    }
  }

  return 0;
}

function eatApple(snake, apples, canvas) {
  apples.forEach((apple, index) => {
    if(snake.tail[snake.tail.length -1].x === apple.x && snake.tail[snake.tail.length -1].y === apple.y) {
      snake.tail[snake.tail.length] = { x: apple.x, y: apple.y };
  
      apples.splice(index, 1);
    }
  });
}

function gameOver(gameInterval, applesInterval) {
  clearInterval(gameInterval);
  clearInterval(applesInterval);
  
  return true;
}

export {
  show, checkWallHit, checkSelfHit, eatApple, gameOver, checkPlayersHit
} 
