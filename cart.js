// Shopping Cart System with localStorage
class ShoppingCart {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('fl_cart')) || [];
    this.init();
  }

  init() {
    this.updateCartUI();
    this.bindEvents();
  }

  bindEvents() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart')) {
        const btn = e.target.closest('.add-to-cart');
        const productId = btn.dataset.productId;
        const productName = btn.dataset.productName;
        const productPrice = btn.dataset.productPrice;
        const productImage = btn.dataset.productImage;
        
        this.addToCart({
          id: productId,
          name: productName,
          price: parseFloat(productPrice),
          image: productImage,
          quantity: 1
        });
      }
    });

    // Cart toggle
    const cartToggle = document.querySelector('.cart-toggle');
    if (cartToggle) {
      cartToggle.addEventListener('click', () => this.toggleCart());
    }

    // Close cart
    const closeCart = document.querySelector('.close-cart');
    if (closeCart) {
      closeCart.addEventListener('click', () => this.closeCart());
    }

    // Remove from cart
    document.addEventListener('click', (e) => {
      if (e.target.closest('.remove-item')) {
        const btn = e.target.closest('.remove-item');
        const index = parseInt(btn.dataset.index);
        this.removeFromCart(index);
      }
    });

    // Quantity controls
    document.addEventListener('click', (e) => {
      if (e.target.closest('.qty-plus')) {
        const btn = e.target.closest('.qty-plus');
        const index = parseInt(btn.dataset.index);
        this.updateQuantity(index, 1);
      }
      if (e.target.closest('.qty-minus')) {
        const btn = e.target.closest('.qty-minus');
        const index = parseInt(btn.dataset.index);
        this.updateQuantity(index, -1);
      }
    });
  }

  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push(product);
    }
    
    this.saveCart();
    this.updateCartUI();
    this.showNotification('Product added to cart');
  }

  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.saveCart();
    this.updateCartUI();
  }

  updateQuantity(index, change) {
    const item = this.cart[index];
    item.quantity += change;
    
    if (item.quantity <= 0) {
      this.removeFromCart(index);
    } else {
      this.saveCart();
      this.updateCartUI();
    }
  }

  saveCart() {
    localStorage.setItem('fl_cart', JSON.stringify(this.cart));
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  updateCartUI() {
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = this.getCartCount();
      cartCount.style.display = this.getCartCount() > 0 ? 'flex' : 'none';
    }

    // Update cart items
    const cartItems = document.querySelector('.cart-items');
    if (cartItems) {
      if (this.cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      } else {
        cartItems.innerHTML = this.cart.map((item, index) => `
          <div class="cart-item">
            <div class="cart-item-image">
              ${item.image ? `<img src="${item.image}" alt="${item.name}">` : '<div class="placeholder-image"></div>'}
            </div>
            <div class="cart-item-details">
              <h4>${item.name}</h4>
              <p class="cart-item-price">${item.price.toFixed(2)} €</p>
              <div class="cart-item-qty">
                <button class="qty-minus" data-index="${index}">−</button>
                <span>${item.quantity}</span>
                <button class="qty-plus" data-index="${index}">+</button>
              </div>
            </div>
            <button class="remove-item" data-index="${index}">×</button>
          </div>
        `).join('');
      }
    }

    // Update cart total
    const cartTotal = document.querySelector('.cart-total');
    if (cartTotal) {
      cartTotal.textContent = `${this.getCartTotal().toFixed(2)} €`;
    }

    // Update checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.disabled = this.cart.length === 0;
    }
  }

  toggleCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    if (cartSidebar) {
      cartSidebar.classList.toggle('open');
    }
  }

  closeCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    if (cartSidebar) {
      cartSidebar.classList.remove('open');
    }
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartUI();
  }
}

// Initialize cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.shoppingCart = new ShoppingCart();
});
