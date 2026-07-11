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
    const signinTab = document.querySelector('.auth-tab[data-mode="signin"]');
    const signupTab = document.querySelector('.auth-tab[data-mode="signup"]');

    if (mode === 'signin') {
      signinForm.style.display = 'block';
      signupForm.style.display = 'none';
      signinTab?.classList.add('active');
      signupTab?.classList.remove('active');
    } else {
      signinForm.style.display = 'none';
      signupForm.style.display = 'block';
      signinTab?.classList.remove('active');
      signupTab?.classList.add('active');
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
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;

    if (this.users.find(u => u.email === email)) {
      this.showNotification('Email already registered', 'error');
      return;
    }

    const newUser = {
      id: 'user_' + Date.now(),
      firstName,
      lastName,
      email,
      password,
      createdAt: new Date().toISOString(),
      addresses: [],
      orders: []
    };

    this.users.push(newUser);
    localStorage.setItem('fl_users', JSON.stringify(this.users));
    
    this.currentUser = newUser;
    localStorage.setItem('fl_currentUser', JSON.stringify(newUser));
    
    this.updateAuthUI();
    this.closeAuthModal();
    this.showNotification('Welcome to FL Sculptures!');
    
    // Trigger welcome email
    this.sendWelcomeEmail(newUser);
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

  sendWelcomeEmail(user) {
    // Simulated email trigger - in production, this would use EmailJS or similar
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

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
  window.authSystem = new AuthSystem();
});
