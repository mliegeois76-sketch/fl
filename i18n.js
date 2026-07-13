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
      close: "×",
      placeholderGlobal: "Rechercher des produits...",
      startTyping: "Commencez à taper pour rechercher des produits...",
      noResults: "Aucun produit trouvé correspondant à votre recherche."
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
    },
    auth: {
      signIn: "Connexion",
      signUp: "Inscription",
      signOut: "Déconnexion",
      myAccount: "Mon compte",
      email: "Email",
      password: "Mot de passe",
      firstName: "Prénom",
      lastName: "Nom",
      forgotPassword: "Mot de passe oublié ?",
      createAccount: "Créer un compte",
      welcomeBack: "Bon retour",
      register: "S'inscrire"
    },
    wishlist: {
      title: "Liste de souhaits",
      empty: "Votre liste de souhaits est vide",
      addToCart: "Ajouter au panier",
      remove: "Supprimer",
      moveAll: "Tout déplacer vers le panier",
      clear: "Vider la liste",
      added: "Ajouté aux favoris",
      removed: "Retiré des favoris"
    },
    account: {
      dashboard: "Tableau de bord",
      orders: "Mes commandes",
      wishlist: "Favoris",
      profile: "Profil",
      addresses: "Adresses",
      notifications: "Notifications",
      noOrders: "Vous n'avez pas encore de commandes.",
      noAddresses: "Aucune adresse enregistrée.",
      addAddress: "Ajouter une adresse",
      emailPreferences: "Préférences email",
      orderUpdates: "Mises à jour de commande et notifications de livraison",
      promotions: "Emails promotionnels et offres spéciales",
      newsletter: "Newsletter et annonces de nouveaux produits",
      reviews: "Rappels d'avis et recommandations de produits",
      unsubscribe: "Se désabonner de tous les emails"
    },
    admin: {
      dashboard: "Tableau de bord",
      products: "Produits",
      users: "Utilisateurs",
      orders: "Commandes",
      messages: "Messages",
      shipping: "Livraison",
      analytics: "Analytics",
      emails: "Journal emails",
      reviews: "Avis",
      data: "Gestion des données",
      overview: "Vue d'ensemble",
      totalUsers: "Utilisateurs totaux",
      totalOrders: "Commandes totales",
      totalProducts: "Produits totaux",
      emailsSent: "Emails envoyés",
      revenue: "Revenu total",
      avgOrderValue: "Valeur moyenne de commande",
      conversionRate: "Taux de conversion",
      topProducts: "Produits les plus vendus",
      salesTrend: "Tendance des ventes"
    },
    reviews: {
      title: "Avis clients",
      whatCollectorsSay: "Ce que les collectionneurs disent des sculptures FL",
      leaveReview: "Laisser un avis",
      noReviews: "Aucun avis pour le moment",
      onProduct: "sur"
    },
    notifications: {
      success: "Succès",
      error: "Erreur",
      warning: "Attention",
      info: "Information"
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
      close: "×",
      placeholderGlobal: "Search products...",
      startTyping: "Start typing to search products...",
      noResults: "No products found matching your search."
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
    },
    auth: {
      signIn: "Sign In",
      signUp: "Sign Up",
      signOut: "Sign Out",
      myAccount: "My Account",
      email: "Email",
      password: "Password",
      firstName: "First Name",
      lastName: "Last Name",
      forgotPassword: "Forgot password?",
      createAccount: "Create Account",
      welcomeBack: "Welcome back",
      register: "Register"
    },
    wishlist: {
      title: "Wishlist",
      empty: "Your wishlist is empty",
      addToCart: "Add to Cart",
      remove: "Remove",
      moveAll: "Move All to Cart",
      clear: "Clear Wishlist",
      added: "Added to favorites",
      removed: "Removed from favorites"
    },
    account: {
      dashboard: "Dashboard",
      orders: "My Orders",
      wishlist: "Wishlist",
      profile: "Profile",
      addresses: "Addresses",
      notifications: "Notifications",
      noOrders: "You have no orders yet.",
      noAddresses: "No saved addresses.",
      addAddress: "Add New Address",
      emailPreferences: "Email Preferences",
      orderUpdates: "Order updates and shipping notifications",
      promotions: "Promotional emails and special offers",
      newsletter: "Newsletter and new product announcements",
      reviews: "Review reminders and product recommendations",
      unsubscribe: "Unsubscribe from all emails"
    },
    admin: {
      dashboard: "Dashboard",
      products: "Products",
      users: "Users",
      orders: "Orders",
      messages: "Messages",
      shipping: "Shipping",
      analytics: "Analytics",
      emails: "Email Log",
      reviews: "Reviews",
      data: "Data Management",
      overview: "Store Overview",
      totalUsers: "Total Users",
      totalOrders: "Total Orders",
      totalProducts: "Total Products",
      emailsSent: "Emails Sent",
      revenue: "Total Revenue",
      avgOrderValue: "Average Order Value",
      conversionRate: "Conversion Rate",
      topProducts: "Top Selling Products",
      salesTrend: "Sales Trend"
    },
    reviews: {
      title: "Customer Reviews",
      whatCollectorsSay: "What collectors say about FL sculptures",
      leaveReview: "Leave a Review",
      noReviews: "No reviews yet",
      onProduct: "on"
    },
    notifications: {
      success: "Success",
      error: "Error",
      warning: "Warning",
      info: "Information"
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
    
    const globalSearchInput = document.getElementById('globalSearchInput');
    if (globalSearchInput) globalSearchInput.placeholder = t.search.placeholderGlobal;
    
    const searchPlaceholder = document.querySelector('.search-placeholder');
    if (searchPlaceholder) searchPlaceholder.textContent = t.search.startTyping;
    
    const noResults = document.querySelector('.no-results');
    if (noResults) noResults.textContent = t.search.noResults;

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
    
    // Update auth buttons
    document.querySelectorAll('.sign-in-btn').forEach(btn => btn.textContent = t.auth.signIn);
    document.querySelectorAll('.sign-up-btn').forEach(btn => btn.textContent = t.auth.signUp);
    document.querySelectorAll('.sign-out-btn').forEach(btn => btn.textContent = t.auth.signOut);
    document.querySelectorAll('.my-account-btn').forEach(btn => btn.textContent = t.auth.myAccount);
    
    // Update account navigation
    document.querySelectorAll('.account-nav a').forEach(link => {
      const text = link.textContent.trim();
      if (text === 'Dashboard' || text === 'Tableau de bord') link.textContent = t.account.dashboard;
      if (text === 'My Orders' || text === 'Mes commandes') link.textContent = t.account.orders;
      if (text === 'Wishlist' || text === 'Favoris') link.textContent = t.account.wishlist;
      if (text === 'Profile' || text === 'Profil') link.textContent = t.account.profile;
      if (text === 'Addresses' || text === 'Adresses') link.textContent = t.account.addresses;
      if (text === 'Notifications') link.textContent = t.account.notifications;
    });
    
    // Update admin tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
      const text = tab.textContent.trim();
      const adminKeys = Object.keys(t.admin);
      const matchingKey = adminKeys.find(k => t.admin[k] === text || translations.fr.admin[k] === text);
      if (matchingKey) {
        tab.textContent = t.admin[matchingKey];
      }
    });
    
    // Update reviews section
    const reviewsTitle = document.querySelector('.section-head h2');
    if (reviewsTitle && (reviewsTitle.textContent.includes('Customer Reviews') || reviewsTitle.textContent.includes('Avis clients'))) {
      reviewsTitle.textContent = t.reviews.title;
    }
    
    const reviewsSubtitle = document.querySelector('.section-head p');
    if (reviewsSubtitle && (reviewsSubtitle.textContent.includes('collectors') || reviewsSubtitle.textContent.includes('collectionneurs'))) {
      reviewsSubtitle.textContent = t.reviews.whatCollectorsSay;
    }
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
