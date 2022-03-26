window.onload = () => {
  const canvas = document.getElementById('game');
  const context = canvas.getContext('2d');

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.height, canvas.width);
};
