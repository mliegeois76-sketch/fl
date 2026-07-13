/**
 * Scroll Animations
 * Handles fade-up and stagger animations on scroll using Intersection Observer
 */

const ScrollAnimations = {
  observer: null,
  
  init() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Handle stagger animations
          if (entry.target.classList.contains('scroll-stagger')) {
            const items = entry.target.querySelectorAll('.item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('visible');
              }, index * 150);
            });
          }
        }
      });
    }, observerOptions);
    
    // Observe all scroll animation elements
    document.querySelectorAll('.scroll-fade-up, .scroll-stagger').forEach(el => {
      this.observer.observe(el);
    });
  },
  
  observe(element) {
    if (this.observer) {
      this.observer.observe(element);
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  ScrollAnimations.init();
});
