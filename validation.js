/**
 * Data Validation and Sanitization Service
 * This service provides validation and sanitization functions for user input
 */

const ValidationService = {
  /**
   * Sanitize HTML to prevent XSS attacks
   */
  sanitizeHTML(input) {
    if (typeof input !== 'string') return input;
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  },

  /**
   * Sanitize string input (basic sanitization)
   */
  sanitizeString(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers
  },

  /**
   * Validate email format
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate password strength
   */
  validatePassword(password) {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate phone number (basic validation)
   */
  validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Validate postal code (basic validation)
   */
  validatePostalCode(postalCode) {
    const postalRegex = /^[\d\w\s\-]{3,10}$/;
    return postalRegex.test(postalCode);
  },

  /**
   * Validate name (letters, spaces, hyphens, apostrophes)
   */
  validateName(name) {
    const nameRegex = /^[a-zA-Z\s\-'\u00C0-\u00FF]{2,}$/;
    return nameRegex.test(name);
  },

  /**
   * Validate numeric input
   */
  validateNumber(input, min = null, max = null) {
    const num = parseFloat(input);
    
    if (isNaN(num)) {
      return { valid: false, error: 'Must be a number' };
    }
    
    if (min !== null && num < min) {
      return { valid: false, error: `Must be at least ${min}` };
    }
    
    if (max !== null && num > max) {
      return { valid: false, error: `Must be at most ${max}` };
    }
    
    return { valid: true };
  },

  /**
   * Validate URL
   */
  validateURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Sanitize and validate form data
   */
  validateFormData(formData, schema) {
    const errors = {};
    const sanitized = {};
    
    for (const [field, rules] of Object.entries(schema)) {
      const value = formData.get(field);
      
      // Check required fields
      if (rules.required && (!value || value.trim() === '')) {
        errors[field] = `${field} is required`;
        continue;
      }
      
      // Skip validation if field is empty and not required
      if (!value || value.trim() === '') {
        sanitized[field] = '';
        continue;
      }
      
      // Type-specific validation
      switch (rules.type) {
        case 'email':
          if (!this.validateEmail(value)) {
            errors[field] = 'Invalid email format';
          } else {
            sanitized[field] = this.sanitizeString(value);
          }
          break;
          
        case 'password':
          const passwordResult = this.validatePassword(value);
          if (!passwordResult.valid) {
            errors[field] = passwordResult.errors.join(', ');
          } else {
            sanitized[field] = value; // Don't sanitize passwords
          }
          break;
          
        case 'phone':
          if (!this.validatePhone(value)) {
            errors[field] = 'Invalid phone number';
          } else {
            sanitized[field] = this.sanitizeString(value);
          }
          break;
          
        case 'name':
          if (!this.validateName(value)) {
            errors[field] = 'Invalid name format';
          } else {
            sanitized[field] = this.sanitizeString(value);
          }
          break;
          
        case 'number':
          const numResult = this.validateNumber(value, rules.min, rules.max);
          if (!numResult.valid) {
            errors[field] = numResult.error;
          } else {
            sanitized[field] = parseFloat(value);
          }
          break;
          
        case 'text':
        default:
          sanitized[field] = this.sanitizeString(value);
          if (rules.minLength && value.length < rules.minLength) {
            errors[field] = `Must be at least ${rules.minLength} characters`;
          }
          if (rules.maxLength && value.length > rules.maxLength) {
            errors[field] = `Must be at most ${rules.maxLength} characters`;
          }
          break;
      }
    }
    
    return {
      valid: Object.keys(errors).length === 0,
      errors,
      sanitized
    };
  },

  /**
   * Validate product data
   */
  validateProduct(product) {
    const errors = [];
    
    if (!product.name || product.name.trim().length < 2) {
      errors.push('Product name must be at least 2 characters');
    }
    
    if (!product.material || product.material.trim().length < 2) {
      errors.push('Material must be at least 2 characters');
    }
    
    if (typeof product.price !== 'number' || product.price <= 0) {
      errors.push('Price must be a positive number');
    }
    
    if (typeof product.stock !== 'number' || product.stock < 0) {
      errors.push('Stock must be a non-negative number');
    }
    
    if (!product.category || product.category.trim().length < 2) {
      errors.push('Category must be at least 2 characters');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate user data
   */
  validateUser(user) {
    const errors = [];
    
    if (!user.firstName || !this.validateName(user.firstName)) {
      errors.push('Invalid first name');
    }
    
    if (!user.lastName || !this.validateName(user.lastName)) {
      errors.push('Invalid last name');
    }
    
    if (!user.email || !this.validateEmail(user.email)) {
      errors.push('Invalid email address');
    }
    
    if (!user.password || user.password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate order data
   */
  validateOrder(order) {
    const errors = [];
    
    if (!order.orderId) {
      errors.push('Order ID is required');
    }
    
    if (!order.customer || !order.customer.email) {
      errors.push('Customer email is required');
    }
    
    if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
      errors.push('Order must contain at least one item');
    }
    
    if (typeof order.total !== 'number' || order.total <= 0) {
      errors.push('Order total must be a positive number');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },

  /**
   * Sanitize review text
   */
  sanitizeReview(text) {
    if (typeof text !== 'string') return '';
    
    return this.sanitizeString(text)
      .substring(0, 1000); // Limit review length
  },

  /**
   * Validate review data
   */
  validateReview(review) {
    const errors = [];
    
    if (!review.name || review.name.trim().length < 2) {
      errors.push('Reviewer name must be at least 2 characters');
    }
    
    if (!review.rating || review.rating < 1 || review.rating > 5) {
      errors.push('Rating must be between 1 and 5');
    }
    
    if (!review.text || review.text.trim().length < 10) {
      errors.push('Review text must be at least 10 characters');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
};
