// Product data source with Supabase
const ProductCatalog = {
  products: [],

  // Get all products from Supabase
  async getAll() {
    const { data, error } = await window.supabase
      .from('products')
      .select('*');
    
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    
    this.products = data || [];
    return this.products;
  },

  // Get product by ID
  getById(id) {
    return this.products.find(p => p.id === id);
  },

  // Get products by category
  getByCategory(category) {
    return this.products.filter(p => p.category === category);
  },

  // Get available products (in stock)
  getAvailable() {
    return this.products.filter(p => p.stock > 0);
  },

  // Check if product is in stock
  isInStock(id) {
    const product = this.getById(id);
    return product ? product.stock > 0 : false;
  },

  // Decrease stock (for checkout) - update in Supabase
  async decreaseStock(id, quantity = 1) {
    const product = this.getById(id);
    if (product && product.stock >= quantity) {
      const { error } = await window.supabase
        .from('products')
        .update({ stock: product.stock - quantity })
        .eq('id', id);
      
      if (!error) {
        product.stock -= quantity;
        return true;
      }
    }
    return false;
  },

  // Increase stock (for returns/cancellations) - update in Supabase
  async increaseStock(id, quantity = 1) {
    const product = this.getById(id);
    if (product) {
      const { error } = await window.supabase
        .from('products')
        .update({ stock: product.stock + quantity })
        .eq('id', id);
      
      if (!error) {
        product.stock += quantity;
        return true;
      }
    }
    return false;
  },

  // Add new product (for admin) - insert to Supabase
  async addProduct(product) {
    const { data, error } = await window.supabase
      .from('products')
      .insert({
        ...product,
        stock: product.stock || 0,
        available: (product.stock || 0) > 0
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error adding product:', error);
      return null;
    }
    
    this.products.push(data);
    return data.id;
  },

  // Update product (for admin) - update in Supabase
  async updateProduct(id, updates) {
    const { error } = await window.supabase
      .from('products')
      .update({
        ...updates,
        available: (updates.stock || 0) > 0
      })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating product:', error);
      return false;
    }
    
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      this.products[index].available = this.products[index].stock > 0;
      return true;
    }
    return false;
  },

  // Delete product (for admin) - delete from Supabase
  async deleteProduct(id) {
    const { error } = await window.supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting product:', error);
      return false;
    }
    
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  },

  // Get product rating (average from approved reviews)
  getProductRating(productId) {
    // For now, return default rating - reviews could be moved to Supabase later
    return {
      average: 0,
      count: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  },

  // Get all products with ratings
  getProductsWithRatings() {
    return this.products.map(product => ({
      ...product,
      rating: this.getProductRating(product.id)
    }));
  }
};

// Initialize product catalog - fetch from Supabase on load
document.addEventListener('DOMContentLoaded', async () => {
  await ProductCatalog.getAll();
});
