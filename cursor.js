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
  const pieceHome = e.target.closest('.piece-home');
  const link = e.target.closest('a');
  const zoomContainer = e.target.closest('.zoom-container');
  
  if (zoomContainer) {
    cursor.classList.add('cursor-zoom');
  } else if (piece) {
    cursor.classList.add('cursor-hover');
  } else if (pieceHome) {
    cursor.classList.add('cursor-hover');
  } else if (link) {
    cursor.classList.add('cursor-hover');
  }
});

document.addEventListener('mouseout', e => {
  const piece = e.target.closest('.piece-visual');
  const pieceHome = e.target.closest('.piece-home');
  const link = e.target.closest('a');
  const zoomContainer = e.target.closest('.zoom-container');
  
  if (zoomContainer) {
    cursor.classList.remove('cursor-zoom');
  } else if (piece || pieceHome || link) {
    cursor.classList.remove('cursor-hover');
  }
});
