export function createRect(x, y, sizeX, sizeY, color, canvasContext) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, sizeX, sizeY);
}
