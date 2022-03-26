export default class Apple {
  constructor(canvas, snake) {
    let isTouching;
    while(true) {
      isTouching = false;

      this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size;
      this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size;

      for(let i = 0; i < snake.tail.length; i++) {
        if(this.x === snake.tail[i].x && this.y === snake.tail[i].y) isTouching = true;
      }

      this.color = 'pink';
      this.size = snake.size;

      if(!isTouching) break;
    }
  }
}
