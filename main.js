// Global menu overlay
function toggleMenu(forceState) {
  const menuOverlay = document.getElementById('menuOverlay');
  if (!menuOverlay) return;

  const isOpen = typeof forceState === 'boolean'
    ? forceState
    : !menuOverlay.classList.contains('active');

  menuOverlay.classList.toggle('active', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';

  const links = menuOverlay.querySelectorAll('nav.menu-nav a');
  links.forEach((link, index) => {
    link.style.transitionDelay = isOpen ? `${index * 0.07}s` : '0s';
  });
}

function initGlobalMenu() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.menu-toggle') || e.target.closest('.menu-close')) {
      toggleMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const menuOverlay = document.getElementById('menuOverlay');
      if (menuOverlay?.classList.contains('active')) {
        toggleMenu(false);
      }
    }
  });

  document.querySelectorAll('nav.menu-nav a:not([data-section])').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

// Legacy navigation toggle
function toggleNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  nav.classList.toggle('open');
}

// Close nav on link click
document.querySelectorAll('#mainNav a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.remove('open');
  });
});

// Footer HTML
const FOOTER_HTML = `
<div class="footer-grid">
  <a href="index.html">Accueil</a>
  <a href="collection.html">Collection</a>
  <a href="about.html">À propos</a>
  <a href="contact.html">Contact</a>
  <a href="mentions-legales.html">Mentions Légales</a>
  <a href="confidentialite.html">Politique de Confidentialité</a>
  <a href="cgv.html">CGV</a>
  <a href="cookies.html">Cookies</a>
  <a href="#">Paiement & Sécurité</a>
</div>`;

document.addEventListener('DOMContentLoaded', ()=>{
  initGlobalMenu();
  const mount = document.getElementById('site-footer');
  if(mount){ mount.innerHTML = FOOTER_HTML; }
  initContactForm();
});

// Contact form handling
function initContactForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  const status = document.getElementById('formStatus');
  const submitBtn = form.querySelector('.submit-btn');
  const defaultLabel = submitBtn.textContent;

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    status.textContent = '';
    status.className = 'form-status';

    const id = typeof FL_CONFIG !== 'undefined' ? FL_CONFIG.formspreeId : '';
    if(!id || id === 'YOUR_FORM_ID'){
      status.textContent = 'Formulaire non configuré — ajoutez votre Form ID dans config.js';
      status.classList.add('error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi…';

    try{
      const res = await fetch(`https://formspree.io/f/${id}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });

      if(res.ok){
        form.reset();
        status.textContent = 'Message envoyé.';
        status.classList.add('success');
        submitBtn.textContent = 'Envoyé';
      } else {
        throw new Error('submit failed');
      }
    } catch {
      status.textContent = 'Erreur lors de l\'envoi — réessayez ou écrivez directement par email.';
      status.classList.add('error');
      submitBtn.textContent = defaultLabel;
    } finally {
      submitBtn.disabled = false;
    }
  });
}
