# FL — Site de Sculptures d'Art Contemporain

Site web moderne et animé pour FL, sculpteur d'art contemporain. Design minimaliste et luxueux avec animations Apple-style et backend Supabase.

## 🎨 Caractéristiques

- **Design minimaliste et élégant** inspiré des sites Apple
- **Animations fluides** avec GSAP et ScrollTrigger
- **Transitions de page** sophistiquées
- **Micro-interactions** sur tous les éléments interactifs
- **Responsive design** optimisé pour mobile et desktop
- **SEO optimisé** avec meta tags complets
- **Backend Supabase** pour authentification, produits et commandes
- **Système de panier** avec localStorage et persistance
- **Guest checkout** (commandes sans compte)
- **Admin dashboard** pour gestion des produits et commandes
- **Emails transactionnels** via EmailJS

## 📁 Structure du projet

```
fl-site/
├── index.html              # Page d'accueil avec gate animation
├── collection.html         # Collection de sculptures
├── product.html            # Page détail produit
├── atelier.html            # Présentation de l'atelier
├── acquerir.html           # Processus d'acquisition
├── contact.html            # Formulaire de contact
├── checkout.html           # Page de paiement
├── account.html            # Page compte utilisateur
├── admin.html              # Dashboard admin
├── order-success.html      # Page de confirmation commande
├── mentions-legales.html   # Mentions légales
├── cgv.html               # Conditions générales de vente
├── confidentialite.html   # Politique de confidentialité
├── cookies.html           # Politique de cookies
├── style.css              # Styles principaux
├── auth.js                # Système d'authentification Supabase
├── cart.js                # Système de panier
├── products.js            # Gestion des produits
├── wishlist.js            # Système de wishlist
├── emailjs.js             # Service d'envoi d'emails
├── main.js                # Scripts d'animation et fonctionnalités
├── config.js              # Configuration
├── migrations/            # Migrations SQL Supabase
│   ├── Fix-RLS-profiles-is-admin.sql
│   └── Enable-Guest-Checkout.sql
└── .gitignore             # Fichiers ignorés par Git
```

## 🚀 Déploiement

### Netlify (Recommandé)

1. Créez un compte sur [Netlify](https://www.netlify.com/)
2. Connectez votre repository Git
3. Configurez les paramètres de build :
   - **Build command**: (laisser vide)
   - **Publish directory**: `/`
4. Déployez automatiquement à chaque push

### Autres hébergeurs statiques

Le site peut être déployé sur :
- **Vercel**: `vercel deploy`
- **GitHub Pages**: Activez GitHub Pages dans les settings du repo
- **Cloudflare Pages**: Connectez votre repository

## ⚙️ Configuration

### Supabase

Le site utilise Supabase comme backend. Configurez votre projet :

1. Créez un projet sur [Supabase](https://supabase.com/)
2. Exécutez les migrations SQL dans le dossier `migrations/`
3. Activez Google OAuth dans Authentication > Sign In / Providers
4. Configurez les policies RLS pour la sécurité

### EmailJS

Le service d'emails utilise EmailJS. Configurez dans `emailjs.js` :

```javascript
config: {
  SERVICE_ID: 'votre_service_id',
  TEMPLATE_ORDER_CONFIRMATION: 'votre_template_id',
  TEMPLATE_ADMIN_NOTIFICATION: 'votre_template_id',
  PUBLIC_KEY: 'votre_public_key'
}
```

### Personnalisation

#### Couleurs
Modifiez les variables CSS dans `style.css` :

```css
:root{
  --white:#FAFAF8;      /* Fond principal */
  --paper:#F3F1EC;      /* Fond secondaire */
  --ink:#191817;        /* Texte principal */
  --stone:#8B857C;      /* Texte secondaire */
  --bronze:#8A6E4F;     /* Accent */
  --line:#DEDAD1;       /* Lignes */
}
```

#### Contenu
Remplacez les textes entre crochets `[...]` par votre contenu réel :
- Accroche de la marque
- Descriptions d'œuvres
- Informations de contact
- Mentions légales

## 🔐 Sécurité

- **RLS Policies** Supabase pour protection des données
- **XSS Protection** avec échappement HTML dans admin dashboard
- **Admin Access Control** vérification `is_admin` côté serveur
- **Guest checkout sécurisé** avec tracking par email
- **HTTPS recommandé** en production

## 🎬 Animations

Le site utilise plusieurs types d'animations :

### Page d'accueil
- **Gate animation**: Révélation 3D des lettres "FL"
- **Hero reveal**: Animation lettre par lettre du titre
- **Parallax**: Effet de profondeur au scroll

### Transitions
- **Page transitions**: Clip-path animé entre les pages
- **Scroll reveal**: Apparition des éléments au défilement

### Micro-interactions
- **Effet magnétique**: Les boutons suivent la souris
- **Hover effects**: Surélévation et ombres au survol
- **Header intelligent**: Se cache au scroll vers le bas

## 📱 Responsive

Le site est optimisé pour :
- **Desktop**: > 760px
- **Tablette**: 760px - 1024px
- **Mobile**: < 760px

## 🔧 Technologies

- **HTML5**: Structure sémantique
- **CSS3**: Styles modernes avec variables
- **JavaScript (ES6+)**: Fonctionnalités interactives
- **Supabase**: Backend (Auth, Database, Storage)
- **EmailJS**: Service d'emails transactionnels
- **GSAP 3.12.5**: Animations professionnelles
- **ScrollTrigger**: Animations au scroll

## 📝 Pages légales

Les pages légales sont des gabarits à personnaliser :
- **Mentions légales**: Informations éditeur et hébergeur
- **CGV**: Conditions de vente (à valider par un juriste)
- **Confidentialité**: RGPD compliant
- **Cookies**: Politique de cookies

⚠️ **Important**: Faites valider les pages légales par un professionnel du droit avant mise en ligne.

## 🐛 Débogage

### Problèmes d'animation
Si les animations ne fonctionnent pas :
1. Vérifiez la console pour les erreurs
2. Assurez-vous que GSAP est bien chargé
3. Vérifiez que ScrollTrigger est enregistré

### Problèmes Supabase
1. Vérifiez les credentials dans les fichiers JS
2. Testez les policies RLS dans Supabase Dashboard
3. Vérifiez que les migrations ont été appliquées

### Emails non envoyés
1. Vérifiez les credentials EmailJS
2. Testez les templates dans EmailJS Dashboard
3. Vérifiez la console pour les erreurs

## 📈 Performance

Le site est optimisé pour :
- **Chargement rapide**: Scripts chargés dynamiquement
- **Animations fluides**: 60fps avec GSAP
- **SEO**: Meta tags et structure sémantique
- **Nettoyage console.logs**: Code de production optimisé

## 🔒 Sécurité

- **RLS Policies** Supabase pour protection des données
- **XSS Protection** dans admin dashboard
- **Admin Access Control** vérification is_admin
- **Guest checkout sécurisé**
- **HTTPS recommandé** en production

## 📞 Support

Pour toute question ou problème :
- Vérifiez la console du navigateur
- Consultez la documentation Supabase
- Consultez la documentation EmailJS
- Contactez le développeur

## 📄 Licence

Ce site est la propriété de FL. Tous droits réservés.

---

**Développé avec ❤️ pour FL Sculptures**
