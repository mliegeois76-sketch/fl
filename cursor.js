const cursor = document.createElement('img');
cursor.src = 'cursor-arrow.png';
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);

const cursorLabel = document.createElement('div');
cursorLabel.id = 'cursor-label';
document.body.appendChild(cursorLabel);

document.addEventListener('mousemove', e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  cursorLabel.style.transform = `translate(${e.clientX + 20}px, ${e.clientY + 20}px)`;
});

document.addEventListener('mouseover', e => {
  const piece = e.target.closest('.piece-visual');
  if (piece) {
    cursor.classList.add('cursor-hover');
    const pieceName = piece.closest('.piece')?.querySelector('.piece-name')?.textContent;
    cursorLabel.textContent = pieceName || 'Voir';
    cursorLabel.style.opacity = '1';
  }
});

document.addEventListener('mouseout', e => {
  const piece = e.target.closest('.piece-visual');
  if (piece) {
    cursor.classList.remove('cursor-hover');
    cursorLabel.textContent = '';
    cursorLabel.style.opacity = '0';
  }
});
