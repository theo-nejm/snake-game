import Snake from "./Snake.js";

class Player extends Snake {
  constructor(name, score) {
    this.name = name;
    this.score = score;

    super(this);
  }
}
