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

// Menu HTML
const MENU_HTML = `
  <a href="index.html" data-i18n="nav.home">Accueil</a>
  <a href="collection.html" data-i18n="nav.collection">Collection</a>
  <a href="about.html" data-i18n="nav.about">À propos</a>
  <a href="contact.html" data-i18n="nav.contact">Contact</a>`;

// Footer HTML
const FOOTER_HTML = `
<div class="footer-grid">
  <a href="index.html" data-i18n="nav.home">Accueil</a>
  <a href="collection.html" data-i18n="nav.collection">Collection</a>
  <a href="about.html" data-i18n="nav.about">À propos</a>
  <a href="contact.html" data-i18n="nav.contact">Contact</a>
  <a href="mentions-legales.html">Mentions Légales</a>
  <a href="confidentialite.html">Politique de Confidentialité</a>
  <a href="cgv.html">CGV</a>
  <a href="cookies.html">Cookies</a>
  <a href="cgv.html#paiement">Paiement & Sécurité</a>
</div>`;

// Cookie Consent Banner
const COOKIE_BANNER_HTML = `
<div id="cookie-banner" class="cookie-banner" style="display: none;">
  <div class="cookie-content">
    <p>Nous utilisons des cookies pour vous offrir la meilleure expérience sur notre site. <a href="cookies.html">En savoir plus</a></p>
    <div class="cookie-buttons">
      <button class="cookie-btn cookie-accept" onclick="acceptCookies()">Accepter</button>
      <button class="cookie-btn cookie-decline" onclick="declineCookies()">Refuser</button>
    </div>
  </div>
</div>`;

function initCookieConsent() {
  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem('cookieConsent');
  
  if (!cookieChoice) {
    // Show banner after a short delay
    setTimeout(() => {
      const banner = document.getElementById('cookie-banner');
      if (banner) {
        banner.style.display = 'flex';
      }
    }, 1000);
  }
}

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.display = 'none';
  }
  // Here you could enable analytics cookies
}

function declineCookies() {
  localStorage.setItem('cookieConsent', 'declined');
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.display = 'none';
  }
  // Ensure only essential cookies are used
}

document.addEventListener('DOMContentLoaded', ()=>{
  initGlobalMenu();
  const mount = document.getElementById('site-footer');
  if(mount){ mount.innerHTML = FOOTER_HTML; }
  
  // Inject menu HTML into menu overlay
  const menuNav = document.querySelector('.menu-overlay .menu-nav');
  if(menuNav){ menuNav.innerHTML = MENU_HTML; }
  
  // Add cookie banner to body
  document.body.insertAdjacentHTML('beforeend', COOKIE_BANNER_HTML);
  initCookieConsent();
  
  initContactForm();
  
  // Initialize cart toggle
  initCartToggle();
  
  // Initialize language selector
  initLanguageSelector();
});

// Cart toggle
function initCartToggle() {
  const cartToggle = document.querySelector('.cart-toggle');
  if (cartToggle && window.shoppingCart) {
    cartToggle.addEventListener('click', () => {
      window.shoppingCart.toggleCart();
    });
  }
}

// Language selector
function initLanguageSelector() {
  const langToggle = document.querySelector('.lang-toggle');
  const langMenu = document.getElementById('langMenu');
  
  if (langToggle && langMenu) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('active');
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.classList.remove('active');
      }
    });
    
    // Language option clicks
    const langOptions = langMenu.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = option.dataset.lang;
        if (window.i18n) {
          window.i18n.setLanguage(lang);
          document.querySelector('.current-lang').textContent = lang.toUpperCase();
        }
        langMenu.classList.remove('active');
        
        // Update active state
        langOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
      });
    });
  }
}

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
