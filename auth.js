// Authentication System with localStorage
class AuthSystem {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('fl_currentUser')) || null;
    this.users = JSON.parse(localStorage.getItem('fl_users')) || [];
    this.init();
  }

  init() {
    this.updateAuthUI();
    this.bindEvents();
  }

  bindEvents() {
    // Sign in button
    document.addEventListener('click', (e) => {
      if (e.target.closest('.sign-in-btn')) {
        this.showAuthModal('signin');
      }
    });

    // Sign up button
    document.addEventListener('click', (e) => {
      if (e.target.closest('.sign-up-btn')) {
        this.showAuthModal('signup');
      }
    });

    // Close modal
    document.addEventListener('click', (e) => {
      if (e.target.closest('.auth-close') || e.target.classList.contains('auth-overlay')) {
        this.closeAuthModal();
      }
    });

    // Toggle between signin/signup
    document.addEventListener('click', (e) => {
      if (e.target.closest('.toggle-auth')) {
        const mode = e.target.closest('.toggle-auth').dataset.mode;
        this.showAuthModal(mode);
      }
    });

    // Sign in form
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
      signinForm.addEventListener('submit', (e) => this.handleSignIn(e));
    }

    // Sign up form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => this.handleSignUp(e));
    }

    // Password reset form
    const resetForm = document.getElementById('resetForm');
    if (resetForm) {
      resetForm.addEventListener('submit', (e) => this.handlePasswordReset(e));
    }

    // Social login buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.google-login')) {
        this.handleSocialLogin('google');
      }
      if (e.target.closest('.apple-login')) {
        this.handleSocialLogin('apple');
      }
    });

    // Sign out
    document.addEventListener('click', (e) => {
      if (e.target.closest('.sign-out-btn')) {
        this.signOut();
      }
    });
  }

  showAuthModal(mode) {
    const modal = document.getElementById('authModal');
    if (!modal) return;

    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    const resetForm = document.getElementById('resetForm');
    const signinTab = document.querySelector('.auth-tab[data-mode="signin"]');
    const signupTab = document.querySelector('.auth-tab[data-mode="signup"]');

    if (mode === 'signin') {
      signinForm.style.display = 'block';
      signupForm.style.display = 'none';
      resetForm.style.display = 'none';
      signinTab?.classList.add('active');
      signupTab?.classList.remove('active');
    } else if (mode === 'signup') {
      signinForm.style.display = 'none';
      signupForm.style.display = 'block';
      resetForm.style.display = 'none';
      signinTab?.classList.remove('active');
      signupTab?.classList.add('active');
    } else if (mode === 'reset') {
      signinForm.style.display = 'none';
      signupForm.style.display = 'none';
      resetForm.style.display = 'block';
      signinTab?.classList.remove('active');
      signupTab?.classList.remove('active');
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  handleSignIn(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Validation
    if (!this.validateEmail(email)) {
      this.showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    if (!password || password.length < 6) {
      this.showNotification('Password must be at least 6 characters', 'error');
      return;
    }

    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      this.currentUser = user;
      localStorage.setItem('fl_currentUser', JSON.stringify(user));
      this.updateAuthUI();
      this.closeAuthModal();
      this.showNotification('Welcome back, ' + user.firstName);
    } else {
      this.showNotification('Invalid email or password', 'error');
    }
  }

  handleSignUp(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Enhanced validation using ValidationService
    const schema = {
      firstName: { type: 'name', required: true },
      lastName: { type: 'name', required: true },
      email: { type: 'email', required: true },
      password: { type: 'password', required: true }
    };
    
    let validationResult;
    if (typeof ValidationService !== 'undefined') {
      validationResult = ValidationService.validateFormData(formData, schema);
      if (!validationResult.valid) {
        const errorMessages = Object.values(validationResult.errors).join(', ');
        this.showNotification(errorMessages, 'error');
        return;
      }
    } else {
      // Fallback to basic validation
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const email = formData.get('email');
      const password = formData.get('password');

      if (!firstName || firstName.trim().length < 2) {
        this.showNotification('First name must be at least 2 characters', 'error');
        return;
      }
      
      if (!lastName || lastName.trim().length < 2) {
        this.showNotification('Last name must be at least 2 characters', 'error');
        return;
      }
      
      if (!this.validateEmail(email)) {
        this.showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      if (!password || password.length < 6) {
        this.showNotification('Password must be at least 6 characters', 'error');
        return;
      }
    }

    const sanitized = validationResult ? validationResult.sanitized : {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    if (this.users.find(u => u.email === sanitized.email)) {
      this.showNotification('Email already registered', 'error');
      return;
    }

    const verificationToken = this.generateVerificationToken();
    
    const newUser = {
      id: 'user_' + Date.now(),
      firstName: sanitized.firstName,
      lastName: sanitized.lastName,
      email: sanitized.email,
      password: sanitized.password,
      createdAt: new Date().toISOString(),
      emailVerified: false,
      verificationToken: verificationToken,
      verificationTokenExpires: new Date(Date.now() + 86400000).toISOString(), // 24 hours
      addresses: [],
      orders: []
    };

    this.users.push(newUser);
    localStorage.setItem('fl_users', JSON.stringify(this.users));
    
    // Send verification email
    this.sendVerificationEmail(newUser);
    
    this.showNotification('Account created! Please check your email to verify your account.');
    this.closeAuthModal();
  }

  handleSocialLogin(provider) {
    // Simulated social login
    const simulatedUser = {
      id: 'user_' + Date.now(),
      firstName: provider === 'google' ? 'Google' : 'Apple',
      lastName: 'User',
      email: `user@${provider}.com`,
      provider,
      createdAt: new Date().toISOString(),
      addresses: [],
      orders: []
    };

    // Check if user already exists
    const existingUser = this.users.find(u => u.email === simulatedUser.email);
    
    if (existingUser) {
      this.currentUser = existingUser;
    } else {
      this.users.push(simulatedUser);
      localStorage.setItem('fl_users', JSON.stringify(this.users));
      this.currentUser = simulatedUser;
    }

    localStorage.setItem('fl_currentUser', JSON.stringify(this.currentUser));
    this.updateAuthUI();
    this.closeAuthModal();
    this.showNotification('Signed in with ' + provider);
    
    if (!existingUser) {
      this.sendWelcomeEmail(this.currentUser);
    }
  }

  signOut() {
    this.currentUser = null;
    localStorage.removeItem('fl_currentUser');
    this.updateAuthUI();
    this.showNotification('Signed out successfully');
    window.location.href = 'index.html';
  }

  updateAuthUI() {
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.querySelector('.user-menu');
    
    if (this.currentUser) {
      if (authButtons) authButtons.style.display = 'none';
      if (userMenu) {
        userMenu.style.display = 'flex';
        const userName = userMenu.querySelector('.user-name');
        if (userName) userName.textContent = this.currentUser.firstName;
      }
    } else {
      if (authButtons) authButtons.style.display = 'flex';
      if (userMenu) userMenu.style.display = 'none';
    }
  }

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
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

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Wishlist functionality
  addToWishlist(productId) {
    if (!this.currentUser) {
      this.showNotification('Please sign in to add to wishlist', 'error');
      this.showAuthModal('signin');
      return false;
    }

    if (!this.currentUser.wishlist) {
      this.currentUser.wishlist = [];
    }

    if (!this.currentUser.wishlist.includes(productId)) {
      this.currentUser.wishlist.push(productId);
      this.saveCurrentUser();
      this.showNotification('Added to wishlist');
      return true;
    } else {
      this.showNotification('Already in wishlist', 'error');
      return false;
    }
  }

  removeFromWishlist(productId) {
    if (!this.currentUser || !this.currentUser.wishlist) {
      return false;
    }

    const index = this.currentUser.wishlist.indexOf(productId);
    if (index !== -1) {
      this.currentUser.wishlist.splice(index, 1);
      this.saveCurrentUser();
      this.showNotification('Removed from wishlist');
      return true;
    }
    return false;
  }

  isInWishlist(productId) {
    if (!this.currentUser || !this.currentUser.wishlist) {
      return false;
    }
    return this.currentUser.wishlist.includes(productId);
  }

  getWishlist() {
    if (!this.currentUser || !this.currentUser.wishlist) {
      return [];
    }
    return this.currentUser.wishlist;
  }

  saveCurrentUser() {
    localStorage.setItem('fl_currentUser', JSON.stringify(this.currentUser));
    
    // Also update in users array
    const users = JSON.parse(localStorage.getItem('fl_users')) || [];
    const userIndex = users.findIndex(u => u.id === this.currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = this.currentUser;
      localStorage.setItem('fl_users', JSON.stringify(users));
    }
  }

  handlePasswordReset(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    // Validation
    if (!this.validateEmail(email)) {
      this.showNotification('Please enter a valid email address', 'error');
      return;
    }

    const user = this.users.find(u => u.email === email);
    
    if (user) {
      // Simulate sending password reset email
      this.sendPasswordResetEmail(user);
      this.showNotification('Password reset email sent to ' + email);
      this.closeAuthModal();
    } else {
      // For security, still show success even if email doesn't exist
      this.showNotification('If an account exists with this email, a password reset link has been sent.');
      this.closeAuthModal();
    }
  }

  sendPasswordResetEmail(user) {
    // Use EmailJSService if available, otherwise fallback to simulation
    if (typeof EmailJSService !== 'undefined') {
      EmailJSService.sendPasswordReset(user);
    } else {
      // Fallback simulation
      console.log('📧 Password Reset Email Triggered:', {
        to: user.email,
        subject: 'Password Reset Request - FL Sculptures',
        template: 'password_reset',
        data: {
          firstName: user.firstName,
          email: user.email,
          resetToken: 'simulated_token_' + Date.now()
        }
      });
    }
  }

  sendWelcomeEmail(user) {
    // Use EmailJSService if available, otherwise fallback to simulation
    if (typeof EmailJSService !== 'undefined') {
      EmailJSService.sendWelcomeEmail(user);
    } else {
      // Fallback simulation
      console.log('📧 Welcome Email Triggered:', {
        to: user.email,
        subject: 'Welcome to FL Sculptures',
        template: 'welcome_email',
        data: {
          firstName: user.firstName,
          email: user.email
        }
      });
      
      // Store for admin dashboard
      const emailLog = JSON.parse(localStorage.getItem('fl_emailLog')) || [];
      emailLog.push({
        type: 'welcome',
        to: user.email,
        sentAt: new Date().toISOString(),
        status: 'sent'
      });
      localStorage.setItem('fl_emailLog', JSON.stringify(emailLog));
    }
  }

  sendVerificationEmail(user) {
    const verificationLink = `${window.location.origin}/verify-email.html?token=${user.verificationToken}&email=${user.email}`;
    
    if (typeof EmailJSService !== 'undefined') {
      // Would use EmailJS verification template
      console.log('📧 Verification Email Triggered:', {
        to: user.email,
        subject: 'Verify Your Email - FL Sculptures',
        verificationLink
      });
    } else {
      // Fallback simulation
      console.log('📧 Verification Email Triggered:', {
        to: user.email,
        subject: 'Verify Your Email - FL Sculptures',
        verificationLink
      });
      
      const emailLog = JSON.parse(localStorage.getItem('fl_emailLog')) || [];
      emailLog.push({
        type: 'email_verification',
        to: user.email,
        sentAt: new Date().toISOString(),
        status: 'sent'
      });
      localStorage.setItem('fl_emailLog', JSON.stringify(emailLog));
    }
  }

  generateVerificationToken() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  verifyEmail(token, email) {
    const users = JSON.parse(localStorage.getItem('fl_users')) || [];
    const user = users.find(u => u.email === email);
    
    if (!user || !user.verificationToken || user.verificationToken !== token) {
      return { success: false, message: 'Invalid verification token' };
    }
    
    // Check if token is expired
    if (new Date(user.verificationTokenExpires) < new Date()) {
      return { success: false, message: 'Verification token has expired' };
    }
    
    // Verify email
    user.emailVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    
    // Update in localStorage
    const userIndex = users.findIndex(u => u.id === user.id);
    users[userIndex] = user;
    localStorage.setItem('fl_users', JSON.stringify(users));
    
    // Update current user if logged in
    if (this.currentUser && this.currentUser.id === user.id) {
      this.currentUser = user;
      localStorage.setItem('fl_currentUser', JSON.stringify(user));
    }
    
    return { success: true, message: 'Email verified successfully' };
  }

  resendVerificationEmail(email) {
    const users = JSON.parse(localStorage.getItem('fl_users')) || [];
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    
    if (user.emailVerified) {
      return { success: false, message: 'Email already verified' };
    }
    
    // Generate new token
    user.verificationToken = this.generateVerificationToken();
    user.verificationTokenExpires = new Date(Date.now() + 86400000).toISOString();
    
    // Update in localStorage
    const userIndex = users.findIndex(u => u.id === user.id);
    users[userIndex] = user;
    localStorage.setItem('fl_users', JSON.stringify(users));
    
    // Send verification email
    this.sendVerificationEmail(user);
    
    return { success: true, message: 'Verification email sent' };
  }
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
  window.authSystem = new AuthSystem();
});
