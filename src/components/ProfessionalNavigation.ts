/**
 * Professional Navigation Component
 * Implements a clean, modern navigation with 3-color scheme,
 * reduced icon usage, and improved mobile responsiveness
 */

export function renderProfessionalNavigation(): string {
  return `
    <!-- Professional Navigation - Fixed Header -->
    <header class="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 border-b border-gray-100">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center">
            <a href="/" class="flex items-center space-x-2 group">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-105">
                <span class="text-white font-bold text-xl">BA</span>
              </div>
              <span class="text-xl font-bold text-gray-900 hidden sm:block">BrokerAnalysis</span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <div class="relative group">
              <button class="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 flex items-center">
                Brokers
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div class="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div class="py-2">
                  <a href="/brokers" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">All Brokers</a>
                  <a href="/brokers/ecn" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">ECN Brokers</a>
                  <a href="/brokers/mt4" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">MT4 Brokers</a>
                  <a href="/brokers/islamic-accounts" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">Islamic Accounts</a>
                  <a href="/brokers/high-leverage" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">High Leverage</a>
                  <a href="/brokers/beginners" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">For Beginners</a>
                </div>
              </div>
            </div>

            <div class="relative group">
              <button class="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 flex items-center">
                Trading
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div class="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div class="py-2">
                  <a href="/brokers/gold-trading" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">Gold Trading</a>
                  <a href="/brokers/oil-trading" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">Oil Trading</a>
                  <a href="/brokers/stock-trading" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">Stock Trading</a>
                  <a href="/brokers/copy-trading" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">Copy Trading</a>
                  <a href="/brokers/scalping" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">Scalping</a>
                  <a href="/brokers/automated-trading" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">Automated Trading</a>
                </div>
              </div>
            </div>

            <a href="/countries" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Countries</a>
            <a href="/compare" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Compare</a>
            <a href="/simulator" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Tools</a>
            <a href="/about" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
          </div>

          <!-- CTA and Auth Buttons -->
          <div class="hidden md:flex items-center space-x-4">
            <a href="/#recommendation-widget" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Find Your Broker
            </a>
            <div id="auth-buttons" class="flex items-center space-x-2">
              <!-- Auth buttons will be inserted here by JavaScript -->
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button id="mobile-menu-button" class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100">
        <div class="px-4 py-4 space-y-2">
          <a href="/brokers" class="block py-2 text-gray-700 hover:text-blue-600 font-medium">All Brokers</a>
          <a href="/countries" class="block py-2 text-gray-700 hover:text-blue-600 font-medium">Countries</a>
          <a href="/compare" class="block py-2 text-gray-700 hover:text-blue-600 font-medium">Compare</a>
          <a href="/simulator" class="block py-2 text-gray-700 hover:text-blue-600 font-medium">Tools</a>
          <a href="/about" class="block py-2 text-gray-700 hover:text-blue-600 font-medium">About</a>
          <div class="pt-4 border-t border-gray-100">
            <a href="/#recommendation-widget" class="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Find Your Broker
            </a>
            <div id="mobile-auth-buttons" class="mt-2">
              <!-- Mobile auth buttons will be inserted here by JavaScript -->
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Spacer for fixed header -->
    <div class="h-16"></div>

    <script>
      // Mobile menu toggle
      document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
          mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Update button icon
            const isOpen = !mobileMenu.classList.contains('hidden');
            this.innerHTML = isOpen 
              ? '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
              : '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
          });
        }

        // Check authentication status and update buttons
        checkAuthStatus();
      });

      async function checkAuthStatus() {
        try {
          const response = await fetch('/api/auth/status', {
            credentials: 'include'
          });
          const data = await response.json();
          
          const desktopAuthButtons = document.getElementById('auth-buttons');
          const mobileAuthButtons = document.getElementById('mobile-auth-buttons');
          
          if (data.authenticated) {
            const userHtml = \`
              <a href="/dashboard" class="text-gray-700 hover:text-blue-600 font-medium">Dashboard</a>
              <button onclick="logout()" class="text-gray-600 hover:text-red-600 font-medium">Logout</button>
            \`;
            if (desktopAuthButtons) desktopAuthButtons.innerHTML = userHtml;
            if (mobileAuthButtons) mobileAuthButtons.innerHTML = \`
              <a href="/dashboard" class="block w-full text-center py-2 text-gray-700 hover:text-blue-600 font-medium">Dashboard</a>
              <button onclick="logout()" class="block w-full text-center py-2 text-gray-600 hover:text-red-600 font-medium">Logout</button>
            \`;
          } else {
            const guestHtml = \`
              <a href="/auth/login" class="text-gray-700 hover:text-blue-600 font-medium">Login</a>
              <a href="/auth/signup" class="text-gray-700 hover:text-blue-600 font-medium">Sign Up</a>
            \`;
            if (desktopAuthButtons) desktopAuthButtons.innerHTML = guestHtml;
            if (mobileAuthButtons) mobileAuthButtons.innerHTML = \`
              <a href="/auth/login" class="block w-full text-center py-2 text-gray-700 hover:text-blue-600 font-medium">Login</a>
              <a href="/auth/signup" class="block w-full text-center py-2 text-gray-700 hover:text-blue-600 font-medium">Sign Up</a>
            \`;
          }
        } catch (error) {
          console.error('Auth check failed:', error);
        }
      }

      async function logout() {
        try {
          await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
          });
          window.location.href = '/';
        } catch (error) {
          console.error('Logout failed:', error);
        }
      }
    </script>
  `;
}