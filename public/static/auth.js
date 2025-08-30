// Authentication System for BrokerAnalysis
// ADDITIVE MODULE - Preserves all existing functionality while adding authentication

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.authToken = null;
        this.googleScriptLoaded = false;
        this.googleClientId = null;
        this.init();
    }

    async init() {
        // Load configuration first
        await this.loadConfig();
        
        // Check for existing session
        await this.checkSession();
        
        // Load Google OAuth script
        this.loadGoogleAuth();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Update UI based on auth state
        this.updateAuthUI();
    }

    async loadConfig() {
        try {
            const response = await fetch('/api/config');
            if (response.ok) {
                const config = await response.json();
                this.googleClientId = config.google_client_id;
                console.log('✅ Configuration loaded');
            }
        } catch (error) {
            console.error('Error loading configuration:', error);
            // Fallback to placeholder
            this.googleClientId = '1041234567890-abc123def456ghi789jkl012mno345pqr.apps.googleusercontent.com';
        }
    }

    async checkSession() {
        try {
            const response = await fetch('/api/auth/me', {
                method: 'GET',
                credentials: 'include'
            });
            
            if (response.ok) {
                this.currentUser = await response.json();
                console.log('✅ User session found:', this.currentUser.email);
            } else {
                this.currentUser = null;
                console.log('ℹ️ No active session');
            }
        } catch (error) {
            console.error('Error checking session:', error);
            this.currentUser = null;
        }
    }

    loadGoogleAuth() {
        if (this.googleScriptLoaded) return;
        
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            this.googleScriptLoaded = true;
            this.initializeGoogleAuth();
        };
        document.head.appendChild(script);
    }

    initializeGoogleAuth() {
        if (typeof google !== 'undefined' && this.googleClientId) {
            console.log('🔧 Initializing Google Auth with Client ID:', this.googleClientId);
            google.accounts.id.initialize({
                client_id: this.googleClientId,
                callback: this.handleGoogleResponse.bind(this),
                auto_select: false,
                cancel_on_tap_outside: true
            });
        } else {
            console.warn('⚠️ Google Auth not initialized: missing client ID or Google SDK');
        }
    }

    async handleGoogleResponse(response) {
        try {
            const result = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credential: response.credential }),
                credentials: 'include'
            });

            if (result.ok) {
                const userData = await result.json();
                this.currentUser = userData.user;
                this.closeAuthModal();
                this.updateAuthUI();
                this.showSuccessMessage('Successfully signed in with Google!');
                
                // Trigger broker match flow if that was the original intent
                if (this.pendingBrokerMatch) {
                    this.startBrokerMatch();
                }
            } else {
                throw new Error('Google authentication failed');
            }
        } catch (error) {
            console.error('Google auth error:', error);
            this.showErrorMessage('Google sign-in failed. Please try again.');
        }
    }

    setupEventListeners() {
        // Sign in/up button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-auth-action="signin"]')) {
                e.preventDefault();
                this.showAuthModal('signin');
            } else if (e.target.matches('[data-auth-action="signup"]')) {
                e.preventDefault();
                this.showAuthModal('signup');
            } else if (e.target.matches('[data-auth-action="signout"]')) {
                e.preventDefault();
                this.signOut();
            }
        });

        // Auth modal form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('#signin-form')) {
                e.preventDefault();
                this.handleEmailSignIn(e.target);
            } else if (e.target.matches('#signup-form')) {
                e.preventDefault();
                this.handleEmailSignUp(e.target);
            }
        });

        // Broker match flow
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="broker-match"]') || 
                e.target.closest('[data-action="broker-match"]')) {
                e.preventDefault();
                this.requireAuthForBrokerMatch();
            }
        });
    }

    requireAuthForBrokerMatch() {
        if (this.currentUser) {
            // User is authenticated, proceed with broker match
            this.startBrokerMatch();
        } else {
            // User needs to authenticate first
            this.pendingBrokerMatch = true;
            this.showAuthModal('signin', 'Please sign in to get personalized broker recommendations.');
        }
    }

    startBrokerMatch() {
        this.pendingBrokerMatch = false;
        
        // Call the existing broker recommendation functionality
        if (typeof window.startRecommendation === 'function') {
            window.startRecommendation();
        } else if (typeof window.BrokerAnalysis !== 'undefined' && window.brokerAnalysis) {
            window.brokerAnalysis.startRecommendation();
        } else {
            // Fallback: scroll to recommendation widget
            const widget = document.getElementById('recommendation-widget');
            if (widget) {
                widget.classList.remove('hidden');
                widget.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    showAuthModal(mode = 'signin', message = null) {
        // Remove existing modal
        const existingModal = document.getElementById('auth-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal
        const modal = document.createElement('div');
        modal.id = 'auth-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        
        modal.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
                <button onclick="this.closest('#auth-modal').remove()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
                
                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-user-plus text-blue-600 text-2xl"></i>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">
                        ${mode === 'signin' ? 'Sign In' : 'Create Account'}
                    </h2>
                    ${message ? `<p class="text-blue-600 text-sm">${message}</p>` : ''}
                </div>

                <!-- Google Sign In Button -->
                <div class="mb-4">
                    <div id="google-signin-button" class="w-full"></div>
                </div>

                <div class="text-center text-gray-500 text-sm mb-4">
                    or continue with email
                </div>

                <!-- Email Form -->
                <form id="${mode}-form" class="space-y-4">
                    ${mode === 'signup' ? `
                        <div class="grid grid-cols-2 gap-3">
                            <input type="text" name="firstName" placeholder="First Name" required 
                                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <input type="text" name="lastName" placeholder="Last Name" required
                                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                    ` : ''}
                    
                    <input type="email" name="email" placeholder="Email address" required
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    
                    <input type="password" name="password" placeholder="Password" required
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    
                    ${mode === 'signup' ? `
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" required
                            class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        
                        <label class="flex items-start space-x-2 text-sm text-gray-600">
                            <input type="checkbox" name="terms" required class="mt-1">
                            <span>I agree to the <a href="/terms" class="text-blue-600 hover:underline">Terms of Service</a> 
                            and <a href="/privacy" class="text-blue-600 hover:underline">Privacy Policy</a></span>
                        </label>
                    ` : ''}
                    
                    <button type="submit" class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                        ${mode === 'signin' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div class="text-center mt-4 text-sm text-gray-600">
                    ${mode === 'signin' 
                        ? `Don't have an account? <button onclick="authSystem.showAuthModal('signup')" class="text-blue-600 hover:underline">Sign up</button>`
                        : `Already have an account? <button onclick="authSystem.showAuthModal('signin')" class="text-blue-600 hover:underline">Sign in</button>`
                    }
                </div>
                
                <div class="text-center mt-2 text-sm">
                    <a href="/forgot-password" class="text-blue-600 hover:underline">Forgot your password?</a>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Initialize Google Sign In button
        setTimeout(() => {
            if (this.googleScriptLoaded && typeof google !== 'undefined' && this.googleClientId) {
                google.accounts.id.renderButton(
                    document.getElementById('google-signin-button'),
                    {
                        theme: 'outline',
                        size: 'large',
                        text: mode === 'signin' ? 'signin_with' : 'signup_with',
                        width: '100%'
                    }
                );
            } else {
                // Show fallback message if Google Auth is not properly configured
                const googleButton = document.getElementById('google-signin-button');
                if (googleButton) {
                    googleButton.innerHTML = `
                        <div class="text-center text-red-600 text-sm p-3 border border-red-200 rounded-lg">
                            <i class="fas fa-exclamation-triangle mr-2"></i>
                            Google Sign-In not configured
                        </div>
                    `;
                }
            }
        }, 100);

        // Close modal on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    closeAuthModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.remove();
        }
    }

    async handleEmailSignIn(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            const result = await response.json();

            if (response.ok) {
                this.currentUser = result.user;
                this.closeAuthModal();
                this.updateAuthUI();
                this.showSuccessMessage('Successfully signed in!');
                
                // Trigger broker match flow if that was the original intent
                if (this.pendingBrokerMatch) {
                    this.startBrokerMatch();
                }
            } else {
                this.showErrorMessage(result.error || 'Sign in failed');
            }
        } catch (error) {
            console.error('Sign in error:', error);
            this.showErrorMessage('Sign in failed. Please try again.');
        }
    }

    async handleEmailSignUp(form) {
        const formData = new FormData(form);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            this.showErrorMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    firstName, 
                    lastName, 
                    email, 
                    password 
                }),
                credentials: 'include'
            });

            const result = await response.json();

            if (response.ok) {
                this.currentUser = result.user;
                this.closeAuthModal();
                this.updateAuthUI();
                this.showSuccessMessage('Account created successfully!');
                
                // Trigger broker match flow if that was the original intent
                if (this.pendingBrokerMatch) {
                    this.startBrokerMatch();
                }
            } else {
                this.showErrorMessage(result.error || 'Account creation failed');
            }
        } catch (error) {
            console.error('Sign up error:', error);
            this.showErrorMessage('Account creation failed. Please try again.');
        }
    }

    async signOut() {
        try {
            await fetch('/api/auth/signout', {
                method: 'POST',
                credentials: 'include'
            });
            
            this.currentUser = null;
            this.updateAuthUI();
            this.showSuccessMessage('Successfully signed out');
            
            // Redirect to homepage if on protected page
            if (window.location.pathname.includes('/dashboard')) {
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Sign out error:', error);
            this.showErrorMessage('Sign out failed');
        }
    }

    updateAuthUI() {
        // Update all auth-related UI elements
        const authButtons = document.querySelectorAll('[data-auth-state]');
        
        authButtons.forEach(element => {
            const showWhen = element.getAttribute('data-auth-state');
            
            if (showWhen === 'authenticated' && this.currentUser) {
                element.style.display = '';
                // Update user info if element has data attributes
                if (element.hasAttribute('data-user-name')) {
                    element.textContent = this.currentUser.first_name || this.currentUser.email;
                }
                if (element.hasAttribute('data-user-email')) {
                    element.textContent = this.currentUser.email;
                }
            } else if (showWhen === 'unauthenticated' && !this.currentUser) {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        });

        // Update navigation menus
        this.updateNavigationMenus();
    }

    updateNavigationMenus() {
        // Update all navigation instances with auth buttons
        const navContainers = document.querySelectorAll('.nav-auth-container');
        
        navContainers.forEach(container => {
            if (this.currentUser) {
                // Show authenticated state
                container.innerHTML = `
                    <div class="flex items-center space-x-4">
                        <a href="/dashboard" class="text-gray-700 hover:text-primary transition-colors">
                            <i class="fas fa-tachometer-alt mr-1"></i>Dashboard
                        </a>
                        <div class="relative group">
                            <button class="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors">
                                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span class="text-sm font-semibold text-blue-600">
                                        ${(this.currentUser.first_name?.[0] || this.currentUser.email[0]).toUpperCase()}
                                    </span>
                                </div>
                                <span class="hidden md:block">${this.currentUser.first_name || this.currentUser.email.split('@')[0]}</span>
                                <i class="fas fa-chevron-down text-xs"></i>
                            </button>
                            <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div class="py-2">
                                    <a href="/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <i class="fas fa-tachometer-alt mr-2"></i>Dashboard
                                    </a>
                                    <a href="/dashboard/matches" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <i class="fas fa-heart mr-2"></i>My Broker Matches
                                    </a>
                                    <a href="/dashboard/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <i class="fas fa-user mr-2"></i>Profile Settings
                                    </a>
                                    <hr class="my-1">
                                    <button data-auth-action="signout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                        <i class="fas fa-sign-out-alt mr-2"></i>Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // Show unauthenticated state
                container.innerHTML = `
                    <div class="flex items-center space-x-3">
                        <button data-auth-action="signin" class="text-gray-700 hover:text-primary transition-colors font-medium">
                            Sign In
                        </button>
                        <button data-auth-action="signup" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Sign Up
                        </button>
                    </div>
                `;
            }
        });
    }

    showSuccessMessage(message) {
        this.showToast(message, 'success');
    }

    showErrorMessage(message) {
        this.showToast(message, 'error');
    }

    showToast(message, type = 'info') {
        // Remove existing toasts
        document.querySelectorAll('.auth-toast').forEach(toast => toast.remove());

        const toast = document.createElement('div');
        toast.className = `auth-toast fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
        
        const bgColor = {
            success: 'bg-green-600',
            error: 'bg-red-600',
            info: 'bg-blue-600'
        }[type] || 'bg-gray-600';

        toast.className += ` ${bgColor} text-white`;
        
        toast.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    // Public methods for external use
    isAuthenticated() {
        return !!this.currentUser;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    requireAuth(callback) {
        if (this.isAuthenticated()) {
            callback();
        } else {
            this.showAuthModal('signin', 'Please sign in to continue.');
        }
    }
}

// Initialize auth system
window.authSystem = new AuthSystem();

// Global functions for backward compatibility
window.startRecommendation = function() {
    window.authSystem.requireAuthForBrokerMatch();
};