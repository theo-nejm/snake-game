import { singleplayerLoop } from './gameModes/singleplayer.js';

let gameInterval;
const gameMode = 'singleplayer';

window.onload = () => {
  if(gameMode === 'singleplayer') {
    singleplayerLoop();
  }
}
