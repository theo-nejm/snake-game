import Snake from "./Snake.js";

export class Player extends Snake {
  constructor({ x, y, size, name, score }) {
    super(x, y, size);

    this.name = name;
    this.score = score;
  }
}
