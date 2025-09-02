// Enhanced Navigation Component - Redesigned 2025 UX & SEO Optimized Header
// Streamlined 4-menu system with improved information architecture
import { generateMetaTags } from '../utils';

export function generateCompleteNavigation(): string {
  return `
    <!-- Skip Navigation for Accessibility -->
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded">
        Skip to main content
    </a>
    
    <!-- Redesigned Navigation Header 2025 - Enhanced for Accessibility -->
    <nav class="bg-white shadow-lg border-b border-gray-200" role="navigation" aria-label="Main navigation">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Enhanced Logo with Tagline -->
                <div class="flex items-center space-x-3">
                    <a href="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity group focus:outline-none focus:ring-4 focus:ring-blue-300/50 rounded-lg" aria-label="BrokerAnalysis - Go to homepage">
                        <i class="fas fa-chart-line text-blue-600 text-2xl group-hover:scale-110 transition-transform" aria-hidden="true"></i>
                        <div class="flex flex-col">
                            <span class="text-xl font-bold text-blue-900">BrokerAnalysis</span>
                            <span class="text-xs text-blue-600 hidden sm:block">Find Your Perfect Broker</span>
                        </div>
                    </a>
                </div>
                
                <!-- Streamlined 4-Menu Navigation with Enhanced Accessibility -->
                <div class="hidden lg:flex items-center justify-center flex-1" id="main-navigation" role="menubar">
                    <div class="flex items-center space-x-2">
                        
                        <!-- 1. 🏢 Find Brokers (Mega Menu) -->
                        <div class="relative group" role="none">
                            <button class="flex items-center space-x-1 text-blue-800 hover:text-blue-600 focus:text-blue-600 transition-colors py-3 px-4 rounded-lg nav-menu-button font-semibold bg-blue-50 hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-300/50" 
                                    role="menuitem"
                                    aria-label="Find brokers menu" 
                                    aria-expanded="false" 
                                    aria-haspopup="true"
                                    onkeydown="handleMenuKeydown(event, 'brokers')"
                                    onfocus="handleMenuFocus('brokers')"
                                    onblur="handleMenuBlur('brokers')">
                                <i class="fas fa-building text-base" aria-hidden="true"></i>
                                <span>Find Brokers</span>
                                <i class="fas fa-chevron-down text-xs ml-1" aria-hidden="true"></i>
                            </button>
                            <div class="absolute left-0 mt-1 w-[640px] bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50" role="menu" aria-labelledby="brokers-menu-button">
                                <div class="py-4">
                                    <div class="grid grid-cols-3 gap-6 px-6">
                                        <!-- Column 1: By Country -->
                                        <div>
                                            <div class="pb-2 mb-3 border-b border-gray-200">
                                                <h3 class="text-sm font-bold text-blue-900 uppercase tracking-wide">
                                                    <i class="fas fa-globe text-blue-600 mr-2"></i>By Country
                                                </h3>
                                            </div>
                                            <div class="space-y-1">
                                                <a href="/countries/usa" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    🇺🇸 USA (CFTC/NFA)
                                                </a>
                                                <a href="/countries/uk" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    🇬🇧 UK (FCA)
                                                </a>
                                                <a href="/countries/australia" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    🇦🇺 Australia (ASIC)
                                                </a>
                                                <a href="/countries/canada" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    🇨🇦 Canada (CIRO)
                                                </a>
                                                <a href="/countries/singapore" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    🇸🇬 Singapore (MAS)
                                                </a>
                                                <a href="/countries/dubai" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    🇦🇪 Dubai (DFSA)
                                                </a>
                                                <a href="/countries" class="block px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 transition-colors rounded font-medium">
                                                    <i class="fas fa-arrow-right mr-1"></i>View All Countries
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <!-- Column 2: By Trading Style & Features -->
                                        <div>
                                            <div class="pb-2 mb-3 border-b border-gray-200">
                                                <h3 class="text-sm font-bold text-blue-900 uppercase tracking-wide">
                                                    <i class="fas fa-bolt text-yellow-500 mr-2"></i>By Style & Features
                                                </h3>
                                            </div>
                                            <div class="space-y-1">
                                                <a href="/brokers/scalping" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    ⚡ Scalping Brokers
                                                </a>
                                                <a href="/brokers/ecn" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    🏦 ECN Brokers
                                                </a>
                                                <a href="/brokers/islamic-accounts" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    🕌 Islamic Accounts
                                                </a>
                                                <a href="/brokers/high-leverage" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    📈 High Leverage
                                                </a>
                                                <a href="/brokers/copy-trading" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    👥 Copy Trading
                                                </a>
                                                <a href="/brokers/automated-trading" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    🤖 Automated Trading
                                                </a>
                                                <a href="/brokers/beginners" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    🎓 Beginner Friendly
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <!-- Column 3: By Asset & Platform -->
                                        <div>
                                            <div class="pb-2 mb-3 border-b border-gray-200">
                                                <h3 class="text-sm font-bold text-blue-900 uppercase tracking-wide">
                                                    <i class="fas fa-coins text-yellow-600 mr-2"></i>By Asset & Platform
                                                </h3>
                                            </div>
                                            <div class="space-y-1">
                                                <a href="/brokers/gold-trading" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    🥇 Gold Trading
                                                </a>
                                                <a href="/brokers/oil-trading" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    🛢️ Oil Trading
                                                </a>
                                                <a href="/brokers/stock-trading" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    📊 Stock Trading
                                                </a>
                                                <a href="/brokers/mt4" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    💻 MT4 Specialists
                                                </a>
                                                <a href="/brokers/demo-accounts" class="block px-2 py-1 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded">
                                                    🎮 Demo Accounts
                                                </a>
                                                <div class="mt-3 pt-3 border-t border-gray-200">
                                                    <a href="/reviews" class="block px-2 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded font-medium text-center">
                                                        <i class="fas fa-star mr-1"></i>All Broker Reviews
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 2. 📊 Compare & Tools Menu -->
                        <div class="relative group" role="none">
                            <button class="flex items-center space-x-1 text-blue-800 hover:text-blue-600 focus:text-blue-600 transition-colors py-3 px-4 rounded-lg nav-menu-button font-semibold hover:bg-blue-50 focus:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-300/50" 
                                    role="menuitem"
                                    aria-label="Compare and tools menu" 
                                    aria-expanded="false" 
                                    aria-haspopup="true"
                                    onkeydown="handleMenuKeydown(event, 'tools')"
                                    onfocus="handleMenuFocus('tools')"
                                    onblur="handleMenuBlur('tools')">
                                <i class="fas fa-tools text-base" aria-hidden="true"></i>
                                <span>Compare & Tools</span>
                                <i class="fas fa-chevron-down text-xs ml-1" aria-hidden="true"></i>
                            </button>
                            <div class="absolute left-0 mt-1 w-80 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50" role="menu" aria-labelledby="tools-menu-button">
                                <div class="py-4">
                                    <div class="px-4 pb-2 mb-3 border-b border-gray-200">
                                        <h3 class="text-sm font-bold text-blue-900 uppercase tracking-wide">
                                            <i class="fas fa-calculator text-green-600 mr-2"></i>Smart Tools
                                        </h3>
                                    </div>
                                    <div class="space-y-1 px-2">
                                        <a href="/" class="block px-3 py-2 text-sm text-blue-800 hover:bg-green-50 hover:text-green-700 transition-colors rounded-lg font-medium border border-transparent hover:border-green-200">
                                            <i class="fas fa-brain mr-2 text-green-600"></i>🧠 AI Broker Matcher
                                            <div class="text-xs text-gray-500 mt-1">Get personalized recommendations</div>
                                        </a>
                                        <a href="/compare" class="block px-3 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-700 transition-colors rounded-lg font-medium">
                                            <i class="fas fa-balance-scale mr-2 text-blue-600"></i>📊 Side-by-Side Comparison
                                            <div class="text-xs text-gray-500 mt-1">Compare up to 4 brokers</div>
                                        </a>
                                        <a href="/simulator" class="block px-3 py-2 text-sm text-blue-800 hover:bg-orange-50 hover:text-orange-700 transition-colors rounded-lg font-medium">
                                            <i class="fas fa-calculator mr-2 text-orange-600"></i>💰 Trading Cost Calculator
                                            <div class="text-xs text-gray-500 mt-1">Strategy-aware cost analysis</div>
                                        </a>
                                    </div>
                                    
                                    <div class="px-4 pt-3 pb-2 mb-2 border-b border-gray-200">
                                        <h3 class="text-sm font-bold text-blue-900 uppercase tracking-wide">
                                            <i class="fas fa-chart-line text-purple-600 mr-2"></i>Additional Calculators
                                        </h3>
                                    </div>
                                    <div class="space-y-1 px-2">
                                        <a href="/calculators#profit" class="block px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 transition-colors rounded">
                                            <i class="fas fa-arrow-up mr-2 text-green-500"></i>Profit Calculator
                                        </a>
                                        <a href="/calculators#margin" class="block px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 transition-colors rounded">
                                            <i class="fas fa-percentage mr-2 text-blue-500"></i>Margin Calculator
                                        </a>
                                        <a href="/calculators#pip" class="block px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 transition-colors rounded">
                                            <i class="fas fa-ruler mr-2 text-purple-500"></i>Pip Value Calculator
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 3. 📚 Learn Menu -->
                        <div class="relative group" role="none">
                            <button class="flex items-center space-x-1 text-blue-800 hover:text-blue-600 focus:text-blue-600 transition-colors py-3 px-4 rounded-lg nav-menu-button font-semibold hover:bg-blue-50 focus:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-300/50" 
                                    role="menuitem"
                                    aria-label="Learn menu" 
                                    aria-expanded="false" 
                                    aria-haspopup="true"
                                    onkeydown="handleMenuKeydown(event, 'learn')"
                                    onfocus="handleMenuFocus('learn')"
                                    onblur="handleMenuBlur('learn')">
                                <i class="fas fa-graduation-cap text-base" aria-hidden="true"></i>
                                <span>Learn</span>
                                <i class="fas fa-chevron-down text-xs ml-1" aria-hidden="true"></i>
                            </button>
                            <div class="absolute left-0 mt-1 w-72 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50" role="menu" aria-labelledby="learn-menu-button">
                                <div class="py-4">
                                    <div class="px-4 pb-2 mb-3 border-b border-gray-200">
                                        <h3 class="text-sm font-bold text-blue-900 uppercase tracking-wide">
                                            <i class="fas fa-book text-purple-600 mr-2"></i>Education Hub
                                        </h3>
                                    </div>
                                    <div class="space-y-1 px-2">
                                        <a href="/about" class="block px-3 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg font-medium">
                                            <i class="fas fa-info-circle mr-2"></i>📖 How We Rate Brokers
                                            <div class="text-xs text-gray-500 mt-1">Our transparent methodology</div>
                                        </a>
                                        <a href="/about#regulation-guide" class="block px-3 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg">
                                            <i class="fas fa-shield-alt mr-2"></i>🛡️ Regulation Explained
                                        </a>
                                        <a href="/about#choosing-brokers" class="block px-3 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg">
                                            <i class="fas fa-compass mr-2"></i>🧭 Broker Selection Guide
                                        </a>
                                        <a href="/about#trading-costs" class="block px-3 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg">
                                            <i class="fas fa-calculator mr-2"></i>💰 Understanding Trading Costs
                                        </a>
                                    </div>
                                    
                                    <div class="px-4 pt-3 pb-2 mb-2 border-b border-gray-200">
                                        <h3 class="text-sm font-bold text-blue-900 uppercase tracking-wide">
                                            <i class="fas fa-question-circle text-green-600 mr-2"></i>Support & FAQ
                                        </h3>
                                    </div>
                                    <div class="space-y-1 px-2">
                                        <a href="/#faq" class="block px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 transition-colors rounded">
                                            <i class="fas fa-question mr-2"></i>Frequently Asked Questions
                                        </a>
                                        <a href="/contact" class="block px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 transition-colors rounded">
                                            <i class="fas fa-envelope mr-2"></i>Contact Support
                                        </a>
                                        <div class="px-3 py-2 text-xs text-gray-500 border-t border-gray-200 mt-2 pt-2">
                                            <i class="fas fa-exclamation-triangle mr-1 text-orange-500"></i>
                                            Risk Warning: Trading involves significant risk
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
                
                <!-- Enhanced Authentication & User Menu -->
                <div class="flex items-center space-x-3">
                    <!-- Authentication Section -->
                    <div class="nav-auth-container flex items-center space-x-3" id="nav-auth-container">
                        <!-- Default: Not authenticated -->
                        <div id="nav-auth-signin" class="flex items-center space-x-3">
                            <button onclick="window.smartRecommendation?.createAuthModal()" class="text-blue-600 hover:text-blue-800 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50 border border-blue-200 hover:border-blue-300">
                                <i class="fas fa-sign-in-alt mr-1"></i>Sign In
                            </button>
                            <button onclick="window.smartRecommendation?.showSignUpForm()" class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105">
                                <i class="fas fa-rocket mr-1"></i>Start Free Analysis
                            </button>
                        </div>
                        
                        <!-- Authenticated: User menu -->
                        <div id="nav-auth-user" class="hidden relative group">
                            <button class="flex items-center space-x-2 text-blue-800 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50 border border-blue-200 font-semibold" 
                                    aria-label="User account menu" 
                                    aria-expanded="false" 
                                    aria-haspopup="true">
                                <i class="fas fa-user-circle text-lg" aria-hidden="true"></i>
                                <span id="nav-user-name" class="font-medium">Account</span>
                                <i class="fas fa-chevron-down text-xs" aria-hidden="true"></i>
                            </button>
                            <div class="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div class="py-3">
                                    <div class="px-4 pb-2 mb-2 border-b border-gray-200">
                                        <div class="flex items-center space-x-2">
                                            <i class="fas fa-user-circle text-lg text-blue-600"></i>
                                            <span id="nav-user-display" class="font-semibold text-gray-800">My Account</span>
                                        </div>
                                    </div>
                                    <a href="/dashboard" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                                        <i class="fas fa-tachometer-alt mr-2"></i>Dashboard
                                    </a>
                                    <a href="/dashboard/matches" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <i class="fas fa-heart mr-2"></i>My Broker Matches
                                    </a>
                                    <a href="/dashboard/comparisons" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <i class="fas fa-balance-scale mr-2"></i>Saved Comparisons
                                    </a>
                                    <a href="/dashboard/settings" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <i class="fas fa-cog mr-2"></i>Account Settings
                                    </a>
                                    <div class="border-t border-gray-200 my-2"></div>
                                    <a href="/api/auth/logout" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium">
                                        <i class="fas fa-sign-out-alt mr-2"></i>Sign Out
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mobile Menu Button -->
                    <button id="mobile-menu-btn" class="lg:hidden p-2 text-blue-800 hover:text-blue-600 focus:text-blue-600 hover:bg-blue-50 focus:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300/50" aria-label="Open mobile navigation menu" aria-expanded="false" aria-controls="mobile-menu">
                        <i class="fas fa-bars text-xl" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Enhanced Mobile Menu -->
    <div id="mobile-menu" class="hidden lg:hidden bg-white shadow-lg border-b border-gray-200" role="navigation" aria-label="Mobile navigation menu">
        <div class="px-2 py-3">
            
            <!-- 1. 🏢 Find Brokers Menu -->
            <div class="border-b border-gray-100 last:border-b-0">
                <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-blue-600 transition-colors mobile-menu-toggle" data-menu="brokers">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-building text-sm"></i>
                        <span class="font-semibold">🏢 Find Brokers</span>
                    </div>
                    <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                </button>
                <div class="mobile-submenu hidden bg-blue-50 pb-3">
                    <div class="px-4 py-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">Browse by Country</div>
                    <a href="/countries/usa" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        🇺🇸 USA (CFTC/NFA)
                    </a>
                    <a href="/countries/australia" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        🇦🇺 Australia (ASIC)
                    </a>
                    <a href="/countries/canada" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        🇨🇦 Canada (CIRO)
                    </a>
                    <a href="/countries/singapore" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        🇸🇬 Singapore (MAS)
                    </a>
                    <a href="/countries" class="block py-1 px-6 text-sm text-blue-700 hover:text-blue-900 font-medium">
                        <i class="fas fa-arrow-right mr-1"></i>View All Countries
                    </a>
                    
                    <div class="px-4 py-2 mt-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">By Features</div>
                    <a href="/brokers/scalping" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        ⚡ Scalping Brokers
                    </a>
                    <a href="/brokers/ecn" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        🏦 ECN Brokers
                    </a>
                    <a href="/brokers/islamic-accounts" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        🕌 Islamic Accounts
                    </a>
                    <a href="/brokers/copy-trading" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        👥 Copy Trading
                    </a>
                    
                    <div class="px-4 py-2 mt-2">
                        <a href="/reviews" class="block py-2 px-3 text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded font-medium text-center">
                            <i class="fas fa-star mr-1"></i>All Broker Reviews
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- 2. 📊 Compare & Tools Menu -->
            <div class="border-b border-gray-100 last:border-b-0">
                <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-blue-600 transition-colors mobile-menu-toggle" data-menu="tools">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-tools text-sm"></i>
                        <span class="font-semibold">📊 Compare & Tools</span>
                    </div>
                    <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                </button>
                <div class="mobile-submenu hidden bg-blue-50 pb-3">
                    <div class="px-4 py-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">Smart Tools</div>
                    <a href="/" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600 font-medium">
                        <i class="fas fa-brain mr-2 text-green-600"></i>🧠 AI Broker Matcher
                    </a>
                    <a href="/compare" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600 font-medium">
                        <i class="fas fa-balance-scale mr-2 text-blue-600"></i>📊 Compare Brokers
                    </a>
                    <a href="/simulator" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600 font-medium">
                        <i class="fas fa-calculator mr-2 text-orange-600"></i>💰 Cost Calculator
                    </a>
                    
                    <div class="px-4 py-2 mt-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">Additional Calculators</div>
                    <a href="/calculators#profit" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-arrow-up mr-2 text-green-500"></i>Profit Calculator
                    </a>
                    <a href="/calculators#margin" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-percentage mr-2 text-blue-500"></i>Margin Calculator
                    </a>
                    <a href="/calculators#pip" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-ruler mr-2 text-purple-500"></i>Pip Calculator
                    </a>
                </div>
            </div>
            
            <!-- 3. 📚 Learn Menu -->
            <div class="border-b border-gray-100 last:border-b-0">
                <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-blue-600 transition-colors mobile-menu-toggle" data-menu="learn">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-graduation-cap text-sm"></i>
                        <span class="font-semibold">📚 Learn</span>
                    </div>
                    <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                </button>
                <div class="mobile-submenu hidden bg-blue-50 pb-3">
                    <div class="px-4 py-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">Education</div>
                    <a href="/about" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600 font-medium">
                        <i class="fas fa-info-circle mr-2"></i>📖 How We Rate Brokers
                    </a>
                    <a href="/about#regulation" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600">
                        <i class="fas fa-shield-alt mr-2"></i>🛡️ Regulation Guide
                    </a>
                    <a href="/about#choosing" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600">
                        <i class="fas fa-compass mr-2"></i>🧭 Broker Selection Guide
                    </a>
                    
                    <div class="px-4 py-2 mt-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">Support</div>
                    <a href="/#faq" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-question mr-2"></i>FAQ
                    </a>
                    <a href="/contact" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-envelope mr-2"></i>Contact Support
                    </a>
                </div>
            </div>
            
            <!-- 4. 👤 Mobile Authentication Section -->
            <div class="border-t border-gray-200 pt-4 mt-3">
                <div id="mobile-auth-section" class="px-4">
                    <!-- Default: Not authenticated -->
                    <div id="mobile-auth-signin" class="space-y-3">
                        <div class="text-center mb-3">
                            <h3 class="text-sm font-bold text-blue-900 uppercase tracking-wide">
                                <i class="fas fa-user-circle mr-2"></i>Get Started
                            </h3>
                        </div>
                        <button onclick="window.smartRecommendation?.createAuthModal()" class="w-full text-center text-blue-600 hover:text-blue-800 font-medium transition-colors px-4 py-3 border border-blue-600 rounded-lg hover:bg-blue-50">
                            <i class="fas fa-sign-in-alt mr-2"></i>Sign In
                        </button>
                        <button onclick="window.smartRecommendation?.showSignUpForm()" class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-md">
                            <i class="fas fa-rocket mr-2"></i>Start Free Analysis
                        </button>
                        <div class="text-center text-xs text-gray-500 mt-2">
                            🚀 Join 50,000+ traders using our platform
                        </div>
                    </div>
                    
                    <!-- Authenticated: User menu -->
                    <div id="mobile-auth-user" class="hidden">
                        <div class="pb-3 mb-3 border-b border-gray-200">
                            <div class="flex items-center space-x-2 text-blue-800 mb-2">
                                <i class="fas fa-user-circle text-xl text-blue-600"></i>
                                <div>
                                    <span id="mobile-user-name" class="font-semibold text-gray-800 block">My Account</span>
                                    <span class="text-xs text-gray-500">Premium Member</span>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <a href="/dashboard" class="block py-2 px-3 text-sm text-blue-800 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                <i class="fas fa-tachometer-alt mr-2"></i>Dashboard
                            </a>
                            <a href="/dashboard/matches" class="block py-2 px-3 text-sm text-blue-800 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                <i class="fas fa-heart mr-2"></i>My Broker Matches
                            </a>
                            <a href="/dashboard/comparisons" class="block py-2 px-3 text-sm text-blue-800 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                <i class="fas fa-balance-scale mr-2"></i>Saved Comparisons
                            </a>
                            <a href="/dashboard/settings" class="block py-2 px-3 text-sm text-blue-800 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                <i class="fas fa-cog mr-2"></i>Account Settings
                            </a>
                            <a href="/api/auth/logout" class="block py-2 px-3 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors font-medium">
                                <i class="fas fa-sign-out-alt mr-2"></i>Sign Out
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Enhanced Navigation JavaScript -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle functionality
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (mobileMenuBtn && mobileMenu) {
                mobileMenuBtn.addEventListener('click', function() {
                    const isHidden = mobileMenu.classList.contains('hidden');
                    
                    if (isHidden) {
                        mobileMenu.classList.remove('hidden');
                        mobileMenuBtn.setAttribute('aria-expanded', 'true');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-times text-xl" aria-hidden="true"></i>';
                        document.body.style.overflow = 'hidden'; // Prevent background scrolling
                    } else {
                        mobileMenu.classList.add('hidden');
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl" aria-hidden="true"></i>';
                        document.body.style.overflow = ''; // Restore scrolling
                    }
                });
            }
            
            // Mobile submenu toggle functionality
            const mobileMenuToggles = document.querySelectorAll('.mobile-menu-toggle');
            
            mobileMenuToggles.forEach(toggle => {
                toggle.addEventListener('click', function() {
                    const menuId = this.getAttribute('data-menu');
                    const submenu = this.nextElementSibling;
                    const chevron = this.querySelector('.mobile-chevron');
                    
                    if (submenu && submenu.classList.contains('mobile-submenu')) {
                        const isHidden = submenu.classList.contains('hidden');
                        
                        // Close all other submenus
                        document.querySelectorAll('.mobile-submenu').forEach(sub => {
                            if (sub !== submenu) {
                                sub.classList.add('hidden');
                            }
                        });
                        
                        // Reset all chevron rotations
                        document.querySelectorAll('.mobile-chevron').forEach(chev => {
                            if (chev !== chevron) {
                                chev.style.transform = 'rotate(0deg)';
                            }
                        });
                        
                        // Toggle current submenu
                        if (isHidden) {
                            submenu.classList.remove('hidden');
                            chevron.style.transform = 'rotate(180deg)';
                            this.setAttribute('aria-expanded', 'true');
                        } else {
                            submenu.classList.add('hidden');
                            chevron.style.transform = 'rotate(0deg)';
                            this.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                const mobileMenu = document.getElementById('mobile-menu');
                const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                
                if (mobileMenu && mobileMenuBtn && 
                    !mobileMenu.contains(event.target) && 
                    !mobileMenuBtn.contains(event.target) && 
                    !mobileMenu.classList.contains('hidden')) {
                    
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl" aria-hidden="true"></i>';
                    document.body.style.overflow = '';
                }
            });
            
            // Close mobile menu on window resize to desktop size
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 1024) { // lg breakpoint
                    const mobileMenu = document.getElementById('mobile-menu');
                    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                    
                    if (mobileMenu && mobileMenuBtn) {
                        mobileMenu.classList.add('hidden');
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl" aria-hidden="true"></i>';
                        document.body.style.overflow = '';
                    }
                }
            });
            
            // Enhanced navigation menu hover effects for desktop
            const navButtons = document.querySelectorAll('.nav-menu-button');
            
            navButtons.forEach(button => {
                const dropdown = button.parentElement.querySelector('div[class*="absolute"]');
                
                if (dropdown) {
                    let hoverTimeout;
                    
                    button.parentElement.addEventListener('mouseenter', function() {
                        clearTimeout(hoverTimeout);
                        dropdown.classList.remove('opacity-0', 'invisible');
                        dropdown.classList.add('opacity-100', 'visible');
                        button.setAttribute('aria-expanded', 'true');
                    });
                    
                    button.parentElement.addEventListener('mouseleave', function() {
                        hoverTimeout = setTimeout(() => {
                            dropdown.classList.remove('opacity-100', 'visible');
                            dropdown.classList.add('opacity-0', 'invisible');
                            button.setAttribute('aria-expanded', 'false');
                        }, 150); // Small delay for smoother UX
                    });
                }
            });
            
            // Keyboard navigation support
            document.addEventListener('keydown', function(event) {
                // Escape key closes mobile menu
                if (event.key === 'Escape') {
                    const mobileMenu = document.getElementById('mobile-menu');
                    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                    
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl" aria-hidden="true"></i>';
                        document.body.style.overflow = '';
                        mobileMenuBtn.focus(); // Return focus to menu button
                    }
                }
            });
            
            console.log('Enhanced Navigation initialized successfully');
        });
    </script>
  `;
}