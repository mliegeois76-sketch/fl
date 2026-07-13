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
      },
      acquire: {
        title: "Acquérir",
        subtitle: "[Texte d'intro page acquérir — à confirmer]"
      }
    },
    nav: {
      home: "Accueil",
      collection: "Collection",
      about: "À propos",
      atelier: "Atelier",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contact",
      acquire: "Acquérir"
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
      register: "S'inscrire",
      orContinueWith: "Ou continuer avec",
      orSignUpWith: "Ou s'inscrire avec"
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
      },
      acquire: {
        title: "Acquire",
        subtitle: "[Acquire page intro text to confirm]"
      }
    },
    nav: {
      home: "Home",
      collection: "Collection",
      about: "About",
      atelier: "Studio",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contact",
      acquire: "Acquire"
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
      register: "Register",
      orContinueWith: "Or continue with",
      orSignUpWith: "Or sign up with"
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
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = e.target.dataset.lang;
        this.setLanguage(lang);
      });
    });
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('fl_lang', lang);
    this.applyLanguage(lang);

    // Update active state
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
      }
    });

    // Update current lang display
    const currentLangDisplay = document.querySelector('.current-lang');
    if (currentLangDisplay) {
      currentLangDisplay.textContent = lang.toUpperCase();
    }
  }

  applyLanguage(lang) {
    const t = translations[lang];
    
    // Generic data-i18n translation
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.textContent = translation;
      }
    });

    // Handle placeholder attributes separately
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.placeholder = translation;
      }
    });
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
