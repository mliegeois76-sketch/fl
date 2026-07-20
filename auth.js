// Authentication System with Supabase
class AuthSystem {
  constructor() {
    this.supabase = window.supabase;
    this.currentUser = null;
    this.init();
  }

  init() {
    // Check for existing session
    this.supabase.auth.getSession().then(({ data: { session } }) => {
      this.currentUser = session?.user || null;
      this.updateAuthUI();
    });

    // Listen for auth changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.currentUser = session?.user || null;
      this.updateAuthUI();
    });

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
      if (resetForm) resetForm.style.display = 'none';
      signinTab?.classList.add('active');
      signupTab?.classList.remove('active');
    } else if (mode === 'signup') {
      signinForm.style.display = 'none';
      signupForm.style.display = 'block';
      if (resetForm) resetForm.style.display = 'none';
      signinTab?.classList.remove('active');
      signupTab?.classList.add('active');
    } else if (mode === 'reset') {
      signinForm.style.display = 'none';
      signupForm.style.display = 'none';
      if (resetForm) resetForm.style.display = 'block';
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

  async handleSignIn(e) {
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

    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      this.showNotification(error.message, 'error');
    } else {
      this.currentUser = data.user;
      this.updateAuthUI();
      this.closeAuthModal();
      this.showNotification('Welcome back');
    }
  }

  async handleSignUp(e) {
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

    const { data, error } = await this.supabase.auth.signUp({
      email: sanitized.email,
      password: sanitized.password,
      options: {
        data: {
          first_name: sanitized.firstName,
          last_name: sanitized.lastName
        }
      }
    });

    if (error) {
      this.showNotification(error.message, 'error');
    } else {
      this.showNotification('Account created! Please check your email to verify your account.');
      this.closeAuthModal();
    }
  }

  async handleSocialLogin(provider) {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: window.location.href.split('#')[0]
      }
    });

    if (error) {
      this.showNotification(error.message, 'error');
    }
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      this.showNotification(error.message, 'error');
    } else {
      this.currentUser = null;
      this.updateAuthUI();
      this.showNotification('Signed out successfully');
      window.location.href = 'index.html';
    }
  }

  updateAuthUI() {
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.querySelector('.user-menu');
    
    if (this.currentUser) {
      if (authButtons) authButtons.style.display = 'none';
      if (userMenu) {
        userMenu.style.display = 'flex';
        const userName = userMenu.querySelector('.user-name');
        if (userName) {
          const firstName = this.currentUser.user_metadata?.first_name || 'User';
          userName.textContent = firstName;
        }
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

  // Wishlist functionality (using Supabase profiles table)
  async addToWishlist(productId) {
    if (!this.currentUser) {
      this.showNotification('Please sign in to add to wishlist', 'error');
      this.showAuthModal('signin');
      return false;
    }

    const { data: profile, error: fetchError } = await this.supabase
      .from('profiles')
      .select('wishlist')
      .eq('id', this.currentUser.id)
      .single();

    if (fetchError) {
      this.showNotification('Error loading wishlist', 'error');
      return false;
    }

    const wishlist = profile?.wishlist || [];
    if (wishlist.includes(productId)) {
      this.showNotification('Already in wishlist', 'error');
      return false;
    }

    const { error: updateError } = await this.supabase
      .from('profiles')
      .update({ wishlist: [...wishlist, productId] })
      .eq('id', this.currentUser.id);

    if (updateError) {
      this.showNotification('Error adding to wishlist', 'error');
      return false;
    }

    this.showNotification('Added to wishlist');
    return true;
  }

  async removeFromWishlist(productId) {
    if (!this.currentUser) {
      return false;
    }

    const { data: profile, error: fetchError } = await this.supabase
      .from('profiles')
      .select('wishlist')
      .eq('id', this.currentUser.id)
      .single();

    if (fetchError) {
      return false;
    }

    const wishlist = profile?.wishlist || [];
    const index = wishlist.indexOf(productId);
    if (index === -1) {
      return false;
    }

    const newWishlist = wishlist.filter(id => id !== productId);

    const { error: updateError } = await this.supabase
      .from('profiles')
      .update({ wishlist: newWishlist })
      .eq('id', this.currentUser.id);

    if (updateError) {
      return false;
    }

    this.showNotification('Removed from wishlist');
    return true;
  }

  async isInWishlist(productId) {
    if (!this.currentUser) {
      return false;
    }

    const { data: profile, error } = await this.supabase
      .from('profiles')
      .select('wishlist')
      .eq('id', this.currentUser.id)
      .single();

    if (error || !profile) {
      return false;
    }

    return (profile?.wishlist || []).includes(productId);
  }

  async getWishlist() {
    if (!this.currentUser) {
      return [];
    }

    const { data: profile, error } = await this.supabase
      .from('profiles')
      .select('wishlist')
      .eq('id', this.currentUser.id)
      .single();

    if (error || !profile) {
      return [];
    }

    return profile?.wishlist || [];
  }

  async handlePasswordReset(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    // Validation
    if (!this.validateEmail(email)) {
      this.showNotification('Please enter a valid email address', 'error');
      return;
    }

    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.href.split('#')[0].replace(/\/[^/]*$/, '/reset-password.html')
    });

    if (error) {
      this.showNotification(error.message, 'error');
    } else {
      this.showNotification('Password reset email sent to ' + email);
      this.closeAuthModal();
    }
  }
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
  window.authSystem = new AuthSystem();
});
