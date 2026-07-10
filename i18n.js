// Internationalization (i18n) System
const translations = {
  fr: {
    nav: {
      home: "Accueil",
      collection: "Collection",
      atelier: "Atelier",
      blog: "Blog",
      about: "À propos",
      faq: "FAQ",
      contact: "Contact",
      acquire: "Acquérir"
    },
    hero: {
      home: {
        subtitle: "[Accroche de la marque — une phrase courte à confirmer]",
        explore: "Explorer",
        exploreText: "[Texte d'intro homepage à confirmer]"
      },
      collection: {
        title: "Les œuvres disponibles",
        subtitle: "[Texte d'intro de la page collection — à confirmer]"
      },
      atelier: {
        title: "La démarche",
        subtitle: "[Texte d'intro de la page atelier — à confirmer]"
      },
      blog: {
        title: "Journal de l'atelier",
        subtitle: "Coulisses de création, réflexions sur l'art et actualités de la galerie."
      },
      about: {
        title: "L'artiste",
        subtitle: "Une démarche sculpturale entre tradition et contemporanéité."
      },
      faq: {
        title: "Questions fréquentes",
        subtitle: "Tout ce que vous devez savoir sur nos sculptures et nos services."
      },
      contact: {
        title: "Nous écrire",
        subtitle: "[Texte d'intro contact — à confirmer]"
      }
    },
    cart: {
      title: "Panier",
      close: "×",
      empty: "Votre panier est vide",
      total: "Total",
      checkout: "Commander"
    },
    search: {
      placeholder: "Rechercher...",
      close: "×"
    },
    filters: {
      all: "Toutes",
      bronze: "Bronze",
      pierre: "Pierre",
      bois: "Bois",
      ceramique: "Céramique"
    },
    addToCart: "Ajouter au panier",
    newsletter: {
      title: "Restez informé",
      text: "Recevez nos dernières actualités et invitations vernissages.",
      placeholder: "Votre email",
      submit: "S'inscrire"
    }
  },
  en: {
    nav: {
      home: "Home",
      collection: "Collection",
      atelier: "Studio",
      blog: "Blog",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      acquire: "Acquire"
    },
    hero: {
      home: {
        subtitle: "[Brand tagline — short phrase to confirm]",
        explore: "Explore",
        exploreText: "[Homepage intro text to confirm]"
      },
      collection: {
        title: "Available Works",
        subtitle: "[Collection page intro text to confirm]"
      },
      atelier: {
        title: "The Approach",
        subtitle: "[Studio page intro text to confirm]"
      },
      blog: {
        title: "Studio Journal",
        subtitle: "Behind the scenes, art reflections, and gallery news."
      },
      about: {
        title: "The Artist",
        subtitle: "A sculptural approach between tradition and contemporaneity."
      },
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about our sculptures and services."
      },
      contact: {
        title: "Get in Touch",
        subtitle: "[Contact page intro text to confirm]"
      }
    },
    cart: {
      title: "Cart",
      close: "×",
      empty: "Your cart is empty",
      total: "Total",
      checkout: "Checkout"
    },
    search: {
      placeholder: "Search...",
      close: "×"
    },
    filters: {
      all: "All",
      bronze: "Bronze",
      pierre: "Stone",
      bois: "Wood",
      ceramique: "Ceramic"
    },
    addToCart: "Add to cart",
    newsletter: {
      title: "Stay Informed",
      text: "Receive our latest news and vernissage invitations.",
      placeholder: "Your email",
      submit: "Subscribe"
    }
  }
};

class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('fl_lang') || 'fr';
    this.init();
  }

  init() {
    this.applyLanguage(this.currentLang);
    this.bindEvents();
  }

  bindEvents() {
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.textContent.toLowerCase();
        this.setLanguage(lang);
      });
    });
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('fl_lang', lang);
    this.applyLanguage(lang);
    
    // Update active state
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.classList.remove('active');
      if (btn.textContent.toLowerCase() === lang) {
        btn.classList.add('active');
      }
    });
  }

  applyLanguage(lang) {
    const t = translations[lang];
    
    // Update navigation
    document.querySelectorAll('#mainNav a, nav.menu-nav a').forEach(link => {
      const key = link.textContent.trim();
      const navKeys = Object.keys(t.nav);
      const matchingKey = navKeys.find(k => t.nav[k] === key || translations.fr.nav[k] === key);
      if (matchingKey) {
        link.textContent = t.nav[matchingKey];
      }
    });

    // Update cart
    const cartTitle = document.querySelector('.cart-header h3');
    if (cartTitle) cartTitle.textContent = t.cart.title;
    
    const cartEmpty = document.querySelector('.empty-cart');
    if (cartEmpty) cartEmpty.textContent = t.cart.empty;
    
    const cartTotal = document.querySelector('.cart-total-row span:first-child');
    if (cartTotal) cartTotal.textContent = t.cart.total;
    
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) checkoutBtn.textContent = t.cart.checkout;

    // Update search
    const searchInput = document.querySelector('.search-input');
    if (searchInput) searchInput.placeholder = t.search.placeholder;

    // Update filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
      const filter = btn.dataset.filter;
      if (t.filters[filter]) {
        btn.textContent = t.filters[filter];
      }
    });

    // Update add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.textContent = t.addToCart;
    });

    // Update newsletter
    const newsletterTitle = document.querySelector('.newsletter-content h2');
    if (newsletterTitle) newsletterTitle.textContent = t.newsletter.title;
    
    const newsletterText = document.querySelector('.newsletter-content p');
    if (newsletterText) newsletterText.textContent = t.newsletter.text;
    
    const newsletterInput = document.querySelector('.newsletter-form input');
    if (newsletterInput) newsletterInput.placeholder = t.newsletter.placeholder;
    
    const newsletterBtn = document.querySelector('.newsletter-form button');
    if (newsletterBtn) newsletterBtn.textContent = t.newsletter.submit;
  }

  t(key) {
    const keys = key.split('.');
    let value = translations[this.currentLang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }
}

// Initialize i18n when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new I18n();
});
