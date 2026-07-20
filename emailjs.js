/**
 * EmailJS Integration Service
 * This service handles email sending using EmailJS
 * Configure your EmailJS credentials in the configuration section below
 */

const EmailJSService = {
  // EmailJS Configuration
  // Replace these with your actual EmailJS credentials
  config: {
    SERVICE_ID: 'service_6ochzcb',
    TEMPLATE_ORDER_CONFIRMATION: 'template_07pf0nv',
    TEMPLATE_ADMIN_NOTIFICATION: 'template_1bg64yi',
    PUBLIC_KEY: '2367eO-cBhcOAJTn6'
  },

  /**
   * Initialize EmailJS with your public key
   */
  init() {
    if (typeof emailjs !== 'undefined') {
      emailjs.init(this.config.PUBLIC_KEY);
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
      to_email: 'm.liegeois76@gmail.com',
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
   * Generic email sending function
   */
  async sendEmail(serviceId, templateId, templateParams, emailType) {
    try {
      if (typeof emailjs === 'undefined') {
        // Fallback to console logging if EmailJS not loaded
        this.logEmail(emailType, templateParams.to_email, 'simulated');
        return { success: true, method: 'simulated' };
      }

      const response = await emailjs.send(serviceId, templateId, templateParams);
      this.logEmail(emailType, templateParams.to_email, 'sent');
      return { success: true, method: 'emailjs', response };
    } catch (error) {
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

};

// Initialize EmailJS when script loads
document.addEventListener('DOMContentLoaded', () => {
  EmailJSService.init();
});
