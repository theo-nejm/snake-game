document.getElementById('tutorial').onclick = () => {
  document.getElementById('tutorial-content').classList.add('shown');
}

document.getElementById('tutorial-content').onclick = () => {
  document.getElementById('tutorial-content').classList.remove('shown');
}
