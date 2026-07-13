/**
 * EmailJS Integration Service
 * This service handles email sending using EmailJS
 * Configure your EmailJS credentials in the configuration section below
 */

const EmailJSService = {
  // EmailJS Configuration
  // Replace these with your actual EmailJS credentials
  config: {
    SERVICE_ID: 'YOUR_EMAILJS_SERVICE_ID',
    TEMPLATE_ORDER_CONFIRMATION: 'YOUR_ORDER_CONFIRMATION_TEMPLATE_ID',
    TEMPLATE_ADMIN_NOTIFICATION: 'YOUR_ADMIN_NOTIFICATION_TEMPLATE_ID',
    TEMPLATE_PASSWORD_RESET: 'YOUR_PASSWORD_RESET_TEMPLATE_ID',
    TEMPLATE_WELCOME: 'YOUR_WELCOME_TEMPLATE_ID',
    PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY'
  },

  /**
   * Initialize EmailJS with your public key
   */
  init() {
    if (typeof emailjs !== 'undefined') {
      emailjs.init(this.config.PUBLIC_KEY);
      console.log('EmailJS initialized');
    } else {
      console.warn('EmailJS library not loaded. Emails will be logged to console only.');
    }
  },

  /**
   * Send order confirmation email to customer
   */
  async sendOrderConfirmation(order) {
    const templateParams = {
      to_email: order.customer.email,
      to_name: order.customer.firstName + ' ' + order.customer.lastName,
      order_id: order.orderId,
      order_total: order.total.toFixed(2) + ' €',
      items_count: order.items.length,
      order_date: new Date(order.date).toLocaleDateString()
    };

    return this.sendEmail(
      this.config.SERVICE_ID,
      this.config.TEMPLATE_ORDER_CONFIRMATION,
      templateParams,
      'order_confirmation'
    );
  },

  /**
   * Send admin notification email for new order
   */
  async sendAdminNotification(order) {
    const templateParams = {
      to_email: 'admin@fl-art.com',
      order_id: order.orderId,
      order_total: order.total.toFixed(2) + ' €',
      customer_email: order.customer.email,
      customer_name: order.customer.firstName + ' ' + order.customer.lastName,
      items_count: order.items.length
    };

    return this.sendEmail(
      this.config.SERVICE_ID,
      this.config.TEMPLATE_ADMIN_NOTIFICATION,
      templateParams,
      'admin_notification'
    );
  },

  /**
   * Send password reset email
   */
  async sendPasswordReset(user) {
    const resetToken = this.generateResetToken();
    const resetLink = `${window.location.origin}/reset-password.html?token=${resetToken}`;

    const templateParams = {
      to_email: user.email,
      to_name: user.firstName,
      reset_link: resetLink,
      reset_token: resetToken
    };

    // Store reset token in localStorage for validation
    const resetTokens = JSON.parse(localStorage.getItem('fl_resetTokens')) || {};
    resetTokens[user.email] = {
      token: resetToken,
      expiresAt: new Date(Date.now() + 3600000).toISOString() // 1 hour expiry
    };
    localStorage.setItem('fl_resetTokens', JSON.stringify(resetTokens));

    return this.sendEmail(
      this.config.SERVICE_ID,
      this.config.TEMPLATE_PASSWORD_RESET,
      templateParams,
      'password_reset'
    );
  },

  /**
   * Send welcome email to new user
   */
  async sendWelcomeEmail(user) {
    const templateParams = {
      to_email: user.email,
      to_name: user.firstName,
      welcome_link: `${window.location.origin}/account.html`
    };

    return this.sendEmail(
      this.config.SERVICE_ID,
      this.config.TEMPLATE_WELCOME,
      templateParams,
      'welcome_email'
    );
  },

  /**
   * Generic email sending function
   */
  async sendEmail(serviceId, templateId, templateParams, emailType) {
    try {
      if (typeof emailjs === 'undefined') {
        // Fallback to console logging if EmailJS not loaded
        console.log('📧 Email Triggered (Simulated):', {
          type: emailType,
          serviceId,
          templateId,
          params: templateParams
        });
        this.logEmail(emailType, templateParams.to_email, 'simulated');
        return { success: true, method: 'simulated' };
      }

      const response = await emailjs.send(serviceId, templateId, templateParams);
      console.log('Email sent successfully:', response);
      this.logEmail(emailType, templateParams.to_email, 'sent');
      return { success: true, method: 'emailjs', response };
    } catch (error) {
      console.error('Email sending failed:', error);
      this.logEmail(emailType, templateParams.to_email, 'failed');
      return { success: false, error };
    }
  },

  /**
   * Log email to localStorage for tracking
   */
  logEmail(type, to, status) {
    const emailLog = JSON.parse(localStorage.getItem('fl_emailLog')) || [];
    emailLog.push({
      type,
      to,
      sentAt: new Date().toISOString(),
      status
    });
    localStorage.setItem('fl_emailLog', JSON.stringify(emailLog));
  },

  /**
   * Generate a random reset token
   */
  generateResetToken() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  },

  /**
   * Validate reset token
   */
  validateResetToken(email, token) {
    const resetTokens = JSON.parse(localStorage.getItem('fl_resetTokens')) || {};
    const tokenData = resetTokens[email];
    
    if (!tokenData || tokenData.token !== token) {
      return false;
    }
    
    // Check if token is expired
    if (new Date(tokenData.expiresAt) < new Date()) {
      delete resetTokens[email];
      localStorage.setItem('fl_resetTokens', JSON.stringify(resetTokens));
      return false;
    }
    
    return true;
  },

  /**
   * Clear used reset token
   */
  clearResetToken(email) {
    const resetTokens = JSON.parse(localStorage.getItem('fl_resetTokens')) || {};
    delete resetTokens[email];
    localStorage.setItem('fl_resetTokens', JSON.stringify(resetTokens));
  }
};

// Initialize EmailJS when script loads
document.addEventListener('DOMContentLoaded', () => {
  EmailJSService.init();
});
