// Product data source with stock management
const ProductCatalog = {
  products: [
    {
      id: 1,
      name: "Ethereal Form",
      material: "Bronze patiné",
      dimensions: "45 × 30 × 20 cm",
      weight: "12 kg",
      price: 2500,
      stock: 3,
      category: "Abstract",
      description: "A flowing bronze sculpture capturing the essence of movement and stillness. Hand-finished with a rich patina that develops character over time.",
      image: "",
      size: "s-xl",
      available: true
    },
    {
      id: 2,
      name: "Geometric Silence",
      material: "Marbre Carrare",
      dimensions: "25 × 25 × 60 cm",
      weight: "35 kg",
      price: 1800,
      stock: 2,
      category: "Geometric",
      description: "Minimalist marble sculpture exploring the relationship between light and shadow. Each piece carved from a single block of Italian marble.",
      image: "",
      size: "s-s",
      available: true
    },
    {
      id: 3,
      name: "Celestial Ring",
      material: "Bronze et verre soufflé",
      dimensions: "70 × 70 × 50 cm",
      weight: "18 kg",
      price: 3200,
      stock: 1,
      category: "Abstract",
      description: "A circular bronze form embracing a blown glass element. The interplay of materials creates a dialogue between earth and air.",
      image: "",
      size: "s-m",
      available: true
    },
    {
      id: 4,
      name: "Triangular Ascent",
      material: "Granit gris",
      dimensions: "80 × 70 × 40 cm",
      weight: "45 kg",
      price: 4500,
      stock: 2,
      category: "Geometric",
      description: "Monumental granite sculpture rising towards the sky. The raw texture contrasts with the precise geometric form.",
      image: "",
      size: "s-l",
      available: true
    },
    {
      id: 5,
      name: "Organic Drop",
      material: "Bronze",
      dimensions: "35 × 35 × 50 cm",
      weight: "8 kg",
      price: 2800,
      stock: 4,
      category: "Organic",
      description: "Nature-inspired bronze sculpture with a smooth, tactile surface. The form evokes a water droplet frozen in time.",
      image: "",
      size: "s-m",
      available: true
    },
    {
      id: 6,
      name: "Vertical Flow",
      material: "Acier inoxydable",
      dimensions: "20 × 20 × 80 cm",
      weight: "15 kg",
      price: 2200,
      stock: 3,
      category: "Modern",
      description: "Polished stainless steel sculpture with a mirror-like finish. Reflects its environment, creating a dynamic visual experience.",
      image: "",
      size: "s-s",
      available: true
    }
  ],

  // Get all products
  getAll() {
    return this.products;
  },

  // Get product by ID
  getById(id) {
    return this.products.find(p => p.id === parseInt(id));
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

  // Decrease stock (for checkout)
  decreaseStock(id, quantity = 1) {
    const product = this.getById(id);
    if (product && product.stock >= quantity) {
      product.stock -= quantity;
      this.saveToStorage();
      return true;
    }
    return false;
  },

  // Increase stock (for returns/cancellations)
  increaseStock(id, quantity = 1) {
    const product = this.getById(id);
    if (product) {
      product.stock += quantity;
      this.saveToStorage();
      return true;
    }
    return false;
  },

  // Add new product (for admin)
  addProduct(product) {
    const newId = Math.max(...this.products.map(p => p.id)) + 1;
    product.id = newId;
    product.stock = product.stock || 0;
    product.available = product.stock > 0;
    this.products.push(product);
    this.saveToStorage();
    return newId;
  },

  // Update product (for admin)
  updateProduct(id, updates) {
    const index = this.products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      this.products[index].available = this.products[index].stock > 0;
      this.saveToStorage();
      return true;
    }
    return false;
  },

  // Delete product (for admin)
  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  },

  // Save to localStorage
  saveToStorage() {
    localStorage.setItem('fl_products', JSON.stringify(this.products));
  },

  // Load from localStorage
  loadFromStorage() {
    const stored = localStorage.getItem('fl_products');
    if (stored) {
      this.products = JSON.parse(stored);
    }
  },

  // Get product rating (average from approved reviews)
  getProductRating(productId) {
    const allReviews = JSON.parse(localStorage.getItem('fl_productReviews')) || {};
    const productReviews = allReviews[productId] || [];
    const approvedReviews = productReviews.filter(r => r.status === 'approved');
    
    if (approvedReviews.length === 0) {
      return {
        average: 0,
        count: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }
    
    const total = approvedReviews.reduce((sum, r) => sum + r.rating, 0);
    const average = total / approvedReviews.length;
    
    // Calculate distribution
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    approvedReviews.forEach(r => {
      distribution[r.rating]++;
    });
    
    return {
      average: Math.round(average * 10) / 10, // Round to 1 decimal
      count: approvedReviews.length,
      distribution
    };
  },

  // Get all products with ratings
  getProductsWithRatings() {
    return this.products.map(product => ({
      ...product,
      rating: this.getProductRating(product.id)
    }));
  },

  // Reset to default products
  resetToDefaults() {
    localStorage.removeItem('fl_products');
    this.loadFromStorage();
  }
};

// Initialize product catalog
ProductCatalog.loadFromStorage();

// If no products in storage, initialize with defaults
if (!localStorage.getItem('fl_products')) {
  ProductCatalog.saveToStorage();
}
