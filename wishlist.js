/**
 * Wishlist/Favorites Service
 * This service handles wishlist functionality for the FL Sculptures platform
 */

const WishlistService = {
  /**
   * Get wishlist for current user
   */
  getWishlist() {
    const currentUser = JSON.parse(localStorage.getItem('fl_currentUser'));
    if (!currentUser) return [];
    
    const allWishlists = JSON.parse(localStorage.getItem('fl_wishlists')) || {};
    return allWishlists[currentUser.id] || [];
  },

  /**
   * Save wishlist for current user
   */
  saveWishlist(wishlist) {
    const currentUser = JSON.parse(localStorage.getItem('fl_currentUser'));
    if (!currentUser) return false;
    
    const allWishlists = JSON.parse(localStorage.getItem('fl_wishlists')) || {};
    allWishlists[currentUser.id] = wishlist;
    localStorage.setItem('fl_wishlists', JSON.stringify(allWishlists));
    return true;
  },

  /**
   * Add product to wishlist
   */
  addToWishlist(productId, productName, productPrice, productImage) {
    const wishlist = this.getWishlist();
    
    // Check if product already in wishlist
    if (wishlist.some(item => item.productId === productId)) {
      return { success: false, message: 'Product already in wishlist' };
    }
    
    wishlist.push({
      productId,
      productName,
      productPrice,
      productImage,
      addedAt: new Date().toISOString()
    });
    
    this.saveWishlist(wishlist);
    this.updateWishlistCount();
    
    return { success: true, message: 'Added to wishlist' };
  },

  /**
   * Remove product from wishlist
   */
  removeFromWishlist(productId) {
    const wishlist = this.getWishlist();
    const filtered = wishlist.filter(item => item.productId !== productId);
    
    this.saveWishlist(filtered);
    this.updateWishlistCount();
    
    return { success: true, message: 'Removed from wishlist' };
  },

  /**
   * Check if product is in wishlist
   */
  isInWishlist(productId) {
    const wishlist = this.getWishlist();
    return wishlist.some(item => item.productId === productId);
  },

  /**
   * Clear wishlist
   */
  clearWishlist() {
    this.saveWishlist([]);
    this.updateWishlistCount();
    return { success: true, message: 'Wishlist cleared' };
  },

  /**
   * Update wishlist count in UI
   */
  updateWishlistCount() {
    const wishlist = this.getWishlist();
    const countElements = document.querySelectorAll('.wishlist-count');
    countElements.forEach(el => {
      el.textContent = `(${wishlist.length})`;
    });
  },

  /**
   * Move all wishlist items to cart
   */
  moveAllToCart() {
    const wishlist = this.getWishlist();
    let movedCount = 0;
    
    wishlist.forEach(item => {
      if (window.shoppingCart) {
        window.shoppingCart.addToCart(
          item.productId,
          item.productName,
          item.productPrice,
          item.productImage
        );
        movedCount++;
      }
    });
    
    if (movedCount > 0) {
      this.clearWishlist();
      return { success: true, message: `${movedCount} items moved to cart` };
    }
    
    return { success: false, message: 'No items could be moved' };
  }
};
