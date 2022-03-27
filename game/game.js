import { singleplayerLoop } from './gameModes/singleplayer.js';
import { x1Loop } from './gameModes/x1.js';

let gameInterval;
const gameMode = 'x1';

window.onload = () => {
  if(gameMode === 'singleplayer') {
    singleplayerLoop();
  } else if (gameMode === 'x1') {
    x1Loop();
  }
}
