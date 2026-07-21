const cursorPoint = document.createElement('div');
cursorPoint.id = 'cursor-point';
document.body.appendChild(cursorPoint);

const cursorRing = document.createElement('div');
cursorRing.id = 'cursor-ring';
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
const lerpFactor = 0.15;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorPoint.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateRing() {
  ringX += (mouseX - ringX) * lerpFactor;
  ringY += (mouseY - ringY) * lerpFactor;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document.addEventListener('mouseover', e => {
  const piece = e.target.closest('.piece-visual');
  if (piece) {
    cursorRing.classList.add('cursor-hover');
    const pieceName = piece.closest('.piece')?.querySelector('.piece-name')?.textContent;
    cursorRing.textContent = pieceName || 'Voir';
  }
});

document.addEventListener('mouseout', e => {
  const piece = e.target.closest('.piece-visual');
  if (piece) {
    cursorRing.classList.remove('cursor-hover');
    cursorRing.textContent = '';
  }
});
