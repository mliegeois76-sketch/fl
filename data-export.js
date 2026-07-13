/**
 * Data Export/Backup Service
 * This service handles data backup and export functionality for the FL Sculptures platform
 */

const DataExportService = {
  /**
   * Export all platform data to a JSON file
   */
  exportAllData() {
    const data = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      data: {
        users: JSON.parse(localStorage.getItem('fl_users')) || [],
        products: JSON.parse(localStorage.getItem('fl_products')) || [],
        orders: JSON.parse(localStorage.getItem('fl_allOrders')) || [],
        emailLog: JSON.parse(localStorage.getItem('fl_emailLog')) || [],
        reviews: JSON.parse(localStorage.getItem('fl_productReviews')) || {},
        resetTokens: JSON.parse(localStorage.getItem('fl_resetTokens')) || {}
      }
    };
    
    this.downloadJSON(data, 'fl-sculptures-backup.json');
  },

  /**
   * Export specific data type
   */
  exportDataType(dataType) {
    let data;
    let filename;
    
    switch(dataType) {
      case 'users':
        data = JSON.parse(localStorage.getItem('fl_users')) || [];
        filename = 'fl-users-backup.json';
        break;
      case 'products':
        data = JSON.parse(localStorage.getItem('fl_products')) || [];
        filename = 'fl-products-backup.json';
        break;
      case 'orders':
        data = JSON.parse(localStorage.getItem('fl_allOrders')) || [];
        filename = 'fl-orders-backup.json';
        break;
      case 'reviews':
        data = JSON.parse(localStorage.getItem('fl_productReviews')) || {};
        filename = 'fl-reviews-backup.json';
        break;
      default:
        console.error('Unknown data type:', dataType);
        return;
    }
    
    const exportData = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      dataType,
      data
    };
    
    this.downloadJSON(exportData, filename);
  },

  /**
   * Import data from JSON file
   */
  importData(jsonData, options = {}) {
    const { merge = true, clearExisting = false } = options;
    
    if (clearExisting) {
      // Clear existing data before import
      if (jsonData.data.users) localStorage.setItem('fl_users', JSON.stringify(jsonData.data.users));
      if (jsonData.data.products) localStorage.setItem('fl_products', JSON.stringify(jsonData.data.products));
      if (jsonData.data.orders) localStorage.setItem('fl_allOrders', JSON.stringify(jsonData.data.orders));
      if (jsonData.data.emailLog) localStorage.setItem('fl_emailLog', JSON.stringify(jsonData.data.emailLog));
      if (jsonData.data.reviews) localStorage.setItem('fl_productReviews', JSON.stringify(jsonData.data.reviews));
      if (jsonData.data.resetTokens) localStorage.setItem('fl_resetTokens', JSON.stringify(jsonData.data.resetTokens));
    } else if (merge) {
      // Merge data with existing
      if (jsonData.data.users) {
        const existingUsers = JSON.parse(localStorage.getItem('fl_users')) || [];
        const mergedUsers = this.mergeArrays(existingUsers, jsonData.data.users, 'id');
        localStorage.setItem('fl_users', JSON.stringify(mergedUsers));
      }
      if (jsonData.data.products) {
        const existingProducts = JSON.parse(localStorage.getItem('fl_products')) || [];
        const mergedProducts = this.mergeArrays(existingProducts, jsonData.data.products, 'id');
        localStorage.setItem('fl_products', JSON.stringify(mergedProducts));
      }
      if (jsonData.data.orders) {
        const existingOrders = JSON.parse(localStorage.getItem('fl_allOrders')) || [];
        const mergedOrders = this.mergeArrays(existingOrders, jsonData.data.orders, 'orderId');
        localStorage.setItem('fl_allOrders', JSON.stringify(mergedOrders));
      }
      if (jsonData.data.reviews) {
        const existingReviews = JSON.parse(localStorage.getItem('fl_productReviews')) || {};
        const mergedReviews = { ...existingReviews, ...jsonData.data.reviews };
        localStorage.setItem('fl_productReviews', JSON.stringify(mergedReviews));
      }
    }
    
    return { success: true, message: 'Data imported successfully' };
  },

  /**
   * Merge two arrays by unique key
   */
  mergeArrays(existing, incoming, key) {
    const merged = [...existing];
    const existingKeys = new Set(existing.map(item => item[key]));
    
    incoming.forEach(item => {
      if (!existingKeys.has(item[key])) {
        merged.push(item);
      }
    });
    
    return merged;
  },

  /**
   * Download JSON data as file
   */
  downloadJSON(data, filename) {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Get data statistics
   */
  getDataStats() {
    return {
      users: (JSON.parse(localStorage.getItem('fl_users')) || []).length,
      products: (JSON.parse(localStorage.getItem('fl_products')) || []).length,
      orders: (JSON.parse(localStorage.getItem('fl_allOrders')) || []).length,
      emails: (JSON.parse(localStorage.getItem('fl_emailLog')) || []).length,
      reviews: Object.keys(JSON.parse(localStorage.getItem('fl_productReviews')) || {}).length,
      storageSize: this.getStorageSize()
    };
  },

  /**
   * Get localStorage size in bytes
   */
  getStorageSize() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length;
      }
    }
    return total;
  },

  /**
   * Clear all data (with confirmation)
   */
  clearAllData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.clear();
      return { success: true, message: 'All data cleared' };
    }
    return { success: false, message: 'Data clear cancelled' };
  },

  /**
   * Clear specific data type
   */
  clearDataType(dataType) {
    const keyMap = {
      users: 'fl_users',
      products: 'fl_products',
      orders: 'fl_allOrders',
      emailLog: 'fl_emailLog',
      reviews: 'fl_productReviews',
      resetTokens: 'fl_resetTokens'
    };
    
    const key = keyMap[dataType];
    if (key && localStorage.getItem(key)) {
      localStorage.removeItem(key);
      return { success: true, message: `${dataType} data cleared` };
    }
    return { success: false, message: 'Data type not found' };
  },

  /**
   * Validate data integrity
   */
  validateData() {
    const issues = [];
    
    // Check users data
    const users = JSON.parse(localStorage.getItem('fl_users')) || [];
    users.forEach(user => {
      if (!user.id || !user.email) {
        issues.push(`Invalid user data: missing id or email`);
      }
    });
    
    // Check products data
    const products = JSON.parse(localStorage.getItem('fl_products')) || [];
    products.forEach(product => {
      if (!product.id || !product.name || typeof product.price !== 'number') {
        issues.push(`Invalid product data: missing id, name, or invalid price`);
      }
    });
    
    // Check orders data
    const orders = JSON.parse(localStorage.getItem('fl_allOrders')) || [];
    orders.forEach(order => {
      if (!order.orderId || !order.customer || !order.items) {
        issues.push(`Invalid order data: missing orderId, customer, or items`);
      }
    });
    
    return {
      valid: issues.length === 0,
      issues,
      stats: this.getDataStats()
    };
  }
};
