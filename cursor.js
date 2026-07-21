const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);
document.addEventListener('mousemove', e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
document.addEventListener('mouseover', e => {
  const piece = e.target.closest('.piece-visual');
  if (piece) {
    cursor.classList.add('cursor-hover');
    cursor.textContent = 'Voir';
  }
});
document.addEventListener('mouseout', e => {
  const piece = e.target.closest('.piece-visual');
  if (piece) {
    cursor.classList.remove('cursor-hover');
    cursor.textContent = '';
  }
});
