/**
 * Wishlist/Favorites Service
 * This service handles wishlist functionality using Supabase profiles table
 */

const WishlistService = {
  /**
   * Get wishlist for current user from Supabase
   */
  async getWishlist() {
    const { data: { user } } = await window.supabase.auth.getUser();
    if (!user) return [];
    
    const { data: profile, error } = await window.supabase
      .from('profiles')
      .select('wishlist')
      .eq('id', user.id)
      .single();
    
    if (error || !profile) return [];
    return profile.wishlist || [];
  },

  /**
   * Save wishlist to Supabase profiles table
   */
  async saveWishlist(wishlist) {
    const { data: { user } } = await window.supabase.auth.getUser();
    if (!user) return false;
    
    const { error } = await window.supabase
      .from('profiles')
      .update({ wishlist })
      .eq('id', user.id);
    
    return !error;
  },

  /**
   * Add product to wishlist
   */
  async addToWishlist(productId, productName, productPrice, productImage) {
    const wishlist = await this.getWishlist();
    
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
    
    await this.saveWishlist(wishlist);
    this.updateWishlistCount();
    
    return { success: true, message: 'Added to wishlist' };
  },

  /**
   * Remove product from wishlist
   */
  async removeFromWishlist(productId) {
    const wishlist = await this.getWishlist();
    const filtered = wishlist.filter(item => item.productId !== productId);
    
    await this.saveWishlist(filtered);
    this.updateWishlistCount();
    
    return { success: true, message: 'Removed from wishlist' };
  },

  /**
   * Check if product is in wishlist
   */
  async isInWishlist(productId) {
    const wishlist = await this.getWishlist();
    return wishlist.some(item => item.productId === productId);
  },

  /**
   * Clear wishlist
   */
  async clearWishlist() {
    await this.saveWishlist([]);
    this.updateWishlistCount();
    return { success: true, message: 'Wishlist cleared' };
  },

  /**
   * Update wishlist count in UI
   */
  updateWishlistCount() {
    this.getWishlist().then(wishlist => {
      const countElements = document.querySelectorAll('.wishlist-count');
      countElements.forEach(el => {
        el.textContent = `(${wishlist.length})`;
      });
    });
  },

  /**
   * Move all wishlist items to cart
   */
  async moveAllToCart() {
    const wishlist = await this.getWishlist();
    let movedCount = 0;
    
    wishlist.forEach(item => {
      if (window.shoppingCart) {
        window.shoppingCart.addToCart({
          id: item.productId,
          name: item.productName,
          price: item.productPrice,
          image: item.productImage,
          quantity: 1
        });
        movedCount++;
      }
    });
    
    if (movedCount > 0) {
      await this.clearWishlist();
      return { success: true, message: `${movedCount} items moved to cart` };
    }
    
    return { success: false, message: 'No items could be moved' };
  }
};
