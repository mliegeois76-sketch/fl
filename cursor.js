const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);
document.addEventListener('mousemove', e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
