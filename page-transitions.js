/**
 * Page Transitions
 * Handles clip circle transitions between pages
 */

const PageTransitions = {
  transitionOverlay: null,
  
  init() {
    // Create transition overlay
    this.transitionOverlay = document.createElement('div');
    this.transitionOverlay.className = 'page-transition-overlay';
    this.transitionOverlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: var(--white);
      z-index: 99999;
      pointer-events: none;
      clip-path: circle(0% at 50% 50%);
      transition: clip-path 0.8s cubic-bezier(0.65, 0, 0.35, 1);
    `;
    document.body.appendChild(this.transitionOverlay);
    
    // Intercept navigation clicks
    this.interceptLinks();
  },
  
  interceptLinks() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href && !link.href.includes('#') && !link.href.includes('mailto:') && !link.href.includes('tel:')) {
        // Check if it's an internal link
        const currentDomain = window.location.hostname;
        const linkDomain = new URL(link.href).hostname;
        
        if (currentDomain === linkDomain) {
          e.preventDefault();
          this.navigate(link.href);
        }
      }
    });
  },
  
  navigate(url) {
    // Expand circle
    this.transitionOverlay.style.clipPath = 'circle(150% at 50% 50%)';
    
    // Navigate after animation
    setTimeout(() => {
      window.location.href = url;
    }, 400);
  },
  
  enter() {
    // Contract circle on page load
    this.transitionOverlay.style.clipPath = 'circle(150% at 50% 50%)';
    
    setTimeout(() => {
      this.transitionOverlay.style.clipPath = 'circle(0% at 50% 50%)';
    }, 100);
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  PageTransitions.init();
  
  // Trigger enter animation
  setTimeout(() => {
    PageTransitions.enter();
  }, 100);
});
