# FL — Site de Sculptures d'Art Contemporain

Site web moderne et animé pour FL, sculpteur d'art contemporain. Design minimaliste et luxueux avec animations Apple-style.

## 🎨 Caractéristiques

- **Design minimaliste et élégant** inspiré des sites Apple
- **Animations fluides** avec GSAP et ScrollTrigger
- **Transitions de page** sophistiquées
- **Micro-interactions** sur tous les éléments interactifs
- **Responsive design** optimisé pour mobile et desktop
- **SEO optimisé** avec meta tags complets
- **Formulaire de contact** fonctionnel via Formspree

## 📁 Structure du projet

```
fl-site/
├── index.html              # Page d'accueil avec gate animation
├── collection.html         # Collection de sculptures
├── atelier.html            # Présentation de l'atelier
├── acquerir.html           # Processus d'acquisition
├── contact.html            # Formulaire de contact
├── mentions-legales.html   # Mentions légales
├── cgv.html               # Conditions générales de vente
├── confidentialite.html   # Politique de confidentialité
├── cookies.html           # Politique de cookies
├── style.css              # Styles principaux
├── main.js                # Scripts d'animation et fonctionnalités
├── config.js              # Configuration (Formspree ID)
├── netlify.toml           # Configuration Netlify
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

### Formulaire de contact

Le formulaire utilise Formspree pour l'envoi des messages :

1. Créez un compte sur [Formspree](https://formspree.io/)
2. Créez un nouveau formulaire
3. Copiez le Form ID
4. Remplacez `xnjkevdb` dans `config.js` par votre Form ID :

```javascript
const FL_CONFIG = {
  formspreeId: 'VOTRE_FORM_ID'
};
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
- **GSAP 3.12.5**: Animations professionnelles
- **ScrollTrigger**: Animations au scroll
- **Formspree**: Formulaire de contact

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

### Formulaire non fonctionnel
1. Vérifiez le Form ID dans `config.js`
2. Testez le formulaire sur Formspree
3. Vérifiez les CORS settings

## 📈 Performance

Le site est optimisé pour :
- **Chargement rapide**: Scripts chargés dynamiquement
- **Animations fluides**: 60fps avec GSAP
- **SEO**: Meta tags et structure sémantique

## 🔒 Sécurité

- Formulaire sécurisé via Formspree
- Pas de données sensibles stockées
- HTTPS recommandé en production

## 📞 Support

Pour toute question ou problème :
- Vérifiez la console du navigateur
- Consultez la documentation GSAP
- Contactez le développeur

## 📄 Licence

Ce site est la propriété de FL. Tous droits réservés.

---

**Développé avec ❤️ pour FL Sculptures**
