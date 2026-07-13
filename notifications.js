/**
 * Notification Service
 * This service handles real-time notifications for the FL Sculptures platform
 */

const NotificationService = {
  /**
   * Show a notification to the user
   */
  showNotification(title, message, type = 'info', duration = 5000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
      </div>
      <button class="notification-close">×</button>
    `;
    
    // Add to DOM
    const container = document.getElementById('notificationContainer') || this.createContainer();
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto dismiss
    const dismissTimeout = setTimeout(() => this.dismissNotification(notification), duration);
    
    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
      clearTimeout(dismissTimeout);
      this.dismissNotification(notification);
    });
    
    return notification;
  },
  
  /**
   * Create notification container
   */
  createContainer() {
    const container = document.createElement('div');
    container.id = 'notificationContainer';
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
  },
  
  /**
   * Dismiss a notification
   */
  dismissNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  },
  
  /**
   * Show success notification
   */
  success(title, message, duration) {
    return this.showNotification(title, message, 'success', duration);
  },
  
  /**
   * Show error notification
   */
  error(title, message, duration) {
    return this.showNotification(title, message, 'error', duration);
  },
  
  /**
   * Show warning notification
   */
  warning(title, message, duration) {
    return this.showNotification(title, message, 'warning', duration);
  },
  
  /**
   * Show info notification
   */
  info(title, message, duration) {
    return this.showNotification(title, message, 'info', duration);
  },
  
  /**
   * Check for new notifications for current user
   */
  checkForNotifications() {
    const currentUser = JSON.parse(localStorage.getItem('fl_currentUser'));
    if (!currentUser) return;
    
    const notifications = JSON.parse(localStorage.getItem('fl_notifications')) || {};
    const userNotifications = notifications[currentUser.id] || [];
    
    // Show unread notifications
    userNotifications.forEach(notification => {
      if (!notification.read) {
        this.showNotification(
          notification.title,
          notification.message,
          notification.type,
          notification.duration || 5000
        );
        
        // Mark as read
        notification.read = true;
      }
    });
    
    // Update localStorage
    notifications[currentUser.id] = userNotifications;
    localStorage.setItem('fl_notifications', JSON.stringify(notifications));
  },
  
  /**
   * Add a notification for a user
   */
  addNotification(userId, title, message, type = 'info', duration = 5000) {
    const notifications = JSON.parse(localStorage.getItem('fl_notifications')) || {};
    
    if (!notifications[userId]) {
      notifications[userId] = [];
    }
    
    notifications[userId].push({
      id: 'notif_' + Date.now(),
      title,
      message,
      type,
      duration,
      read: false,
      createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('fl_notifications', JSON.stringify(notifications));
  },
  
  /**
   * Add notification for current user
   */
  addForCurrentUser(title, message, type = 'info', duration = 5000) {
    const currentUser = JSON.parse(localStorage.getItem('fl_currentUser'));
    if (!currentUser) return;
    
    this.addNotification(currentUser.id, title, message, type, duration);
    this.showNotification(title, message, type, duration);
  },
  
  /**
   * Get unread notification count for user
   */
  getUnreadCount(userId) {
    const notifications = JSON.parse(localStorage.getItem('fl_notifications')) || {};
    const userNotifications = notifications[userId] || [];
    
    return userNotifications.filter(n => !n.read).length;
  },
  
  /**
   * Clear all notifications for user
   */
  clearUserNotifications(userId) {
    const notifications = JSON.parse(localStorage.getItem('fl_notifications')) || {};
    notifications[userId] = [];
    localStorage.setItem('fl_notifications', JSON.stringify(notifications));
  }
};
