// Shopping Cart System with localStorage (session) and Supabase (orders)
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

    // Cart toggle - use event delegation
    document.addEventListener('click', (e) => {
      if (e.target.closest('.cart-toggle')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Cart toggle clicked');
        this.toggleCart();
      }
    });

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
    this.showNotification('Produit ajouté au panier');
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
      cartCount.textContent = `(${this.getCartCount()})`;
    }

    // Update cart count badge
    const cartCountBadge = document.querySelector('.cart-count-badge');
    if (cartCountBadge) {
      cartCountBadge.textContent = this.getCartCount();
      cartCountBadge.style.display = this.getCartCount() > 0 ? 'flex' : 'none';
    }

    // Update cart items
    const cartItems = document.querySelector('.cart-items');
    if (cartItems) {
      if (this.cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
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
    console.log('toggleCart called');
    const cartSidebar = document.querySelector('.cart-sidebar');
    console.log('Cart sidebar found:', cartSidebar);
    if (cartSidebar) {
      cartSidebar.classList.toggle('open');
      console.log('Cart sidebar classes after toggle:', cartSidebar.className);
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

  // Create order in Supabase
  async createOrder(orderData) {
    const { data: { user }, error: authError } = await window.supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    // Insert order
    const { data: order, error: orderError } = await window.supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total: this.getCartTotal(),
        status: 'pending',
        shipping_address: orderData.shippingAddress,
        billing_address: orderData.billingAddress,
        payment_method: orderData.paymentMethod,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (orderError) {
      throw new Error('Failed to create order: ' + orderError.message);
    }

    // Insert order items
    const orderItems = this.cart.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await window.supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      throw new Error('Failed to create order items: ' + itemsError.message);
    }

    // Decrease product stock
    for (const item of this.cart) {
      await window.supabase
        .from('products')
        .update({ stock: window.supabase.rpc('decrement_stock', { product_id: item.id, qty: item.quantity }) })
        .eq('id', item.id);
    }

    // Clear cart after successful order
    this.clearCart();

    return order;
  }
}

// Initialize cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.shoppingCart = new ShoppingCart();
});
