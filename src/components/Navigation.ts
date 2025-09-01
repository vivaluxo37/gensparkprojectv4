// Enhanced Navigation Component - Comprehensive & User-Friendly Header
// This is the main navigation used across all pages
import { generateMetaTags } from '../utils';

export function generateCompleteNavigation(): string {
  return `
    <!-- Skip Navigation for Accessibility -->
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded">
        Skip to main content
    </a>
    
    <!-- Enhanced Navigation Header -->
    <nav class="bg-white shadow-lg border-b border-gray-200" role="navigation" aria-label="Main navigation">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex items-center space-x-3">
                    <a href="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <i class="fas fa-chart-line text-blue-600 text-2xl" aria-hidden="true"></i>
                        <span class="text-xl font-bold text-blue-900">BrokerAnalysis</span>
                    </a>
                </div>
                
                <!-- Main Navigation Menu -->
                <div class="hidden lg:flex items-center justify-center flex-1" id="main-navigation">
                    <div class="flex items-center space-x-1">
                        
                        <!-- 1. Brokers Menu -->
                        <div class="relative group">
                            <button class="flex items-center space-x-1 text-blue-800 hover:text-blue-600 transition-colors py-3 px-4 rounded-md nav-menu-button font-medium" 
                                    aria-label="Brokers menu" 
                                    aria-expanded="false" 
                                    aria-haspopup="true">
                                <i class="fas fa-building text-sm" aria-hidden="true"></i>
                                <span>Brokers</span>
                                <i class="fas fa-chevron-down text-xs ml-1" aria-hidden="true"></i>
                            </button>
                            <div class="absolute left-0 mt-1 w-96 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div class="py-3">
                                    <div class="px-4 py-2">
                                        <h3 class="text-sm font-semibold text-blue-900 uppercase tracking-wide">Browse Brokers</h3>
                                    </div>
                                    <a href="/brokers" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                                        <i class="fas fa-list mr-2"></i>All Brokers Directory
                                    </a>
                                    <a href="/reviews" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                                        <i class="fas fa-star mr-2"></i>Broker Reviews
                                    </a>
                                    <a href="/compare" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                                        <i class="fas fa-balance-scale mr-2"></i>Compare Brokers
                                    </a>
                                    
                                    <hr class="my-2 border-gray-200">
                                    <div class="px-4 py-2">
                                        <h3 class="text-sm font-semibold text-blue-900 uppercase tracking-wide">Popular Countries</h3>
                                    </div>
                                    <div class="grid grid-cols-2 gap-0 max-h-48 overflow-y-auto">
                                        <a href="/countries/usa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors border-r border-gray-100">
                                            <i class="fas fa-flag-usa text-xs mr-2"></i>USA (CFTC)
                                        </a>
                                        <a href="/countries/australia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                            <i class="fas fa-globe text-xs mr-2"></i>Australia (ASIC)
                                        </a>
                                        <a href="/countries/canada" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors border-r border-gray-100">
                                            <i class="fas fa-leaf text-xs mr-2"></i>Canada (CIRO)
                                        </a>
                                        <a href="/countries/singapore" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                            <i class="fas fa-city text-xs mr-2"></i>Singapore (MAS)
                                        </a>
                                        <a href="/countries/dubai" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors border-r border-gray-100">
                                            <i class="fas fa-gem text-xs mr-2"></i>Dubai (DFSA)
                                        </a>
                                        <a href="/countries/india" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                            <i class="fas fa-rupee-sign text-xs mr-2"></i>India (SEBI)
                                        </a>
                                    </div>
                                    
                                    <hr class="my-2 border-gray-200">
                                    <a href="/countries" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors font-medium">
                                        <i class="fas fa-globe-americas mr-2"></i>View All Countries →
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 2. Trading Types Menu -->
                        <div class="relative group">
                            <button class="flex items-center space-x-1 text-blue-800 hover:text-blue-600 transition-colors py-3 px-4 rounded-md nav-menu-button font-medium">
                                <i class="fas fa-chart-line text-sm"></i>
                                <span>Trading</span>
                                <i class="fas fa-chevron-down text-xs ml-1"></i>
                            </button>
                            <div class="absolute left-0 mt-1 w-80 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div class="py-3">
                                    <div class="px-4 py-2">
                                        <h3 class="text-sm font-semibold text-blue-900 uppercase tracking-wide">Trading Styles</h3>
                                    </div>
                                    <a href="/calculators" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                                        <i class="fas fa-calculator mr-2 text-green-600"></i>Trading Calculators
                                    </a>
                                    <a href="/simulator" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                                        <i class="fas fa-coins mr-2 text-orange-500"></i>Cost Calculator
                                    </a>
                                    <a href="/compare" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <i class="fas fa-bolt mr-2 text-yellow-500"></i>Scalping Brokers
                                    </a>
                                    <a href="/reviews" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <i class="fas fa-sun mr-2 text-orange-500"></i>Day Trading
                                    </a>
                                    <a href="/reviews" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <i class="fas fa-wave-square mr-2 text-purple-500"></i>Swing Trading
                                    </a>
                                    
                                    <hr class="my-2 border-gray-200">
                                    <div class="px-4 py-2">
                                        <h3 class="text-sm font-semibold text-blue-900 uppercase tracking-wide">Trading Assets</h3>
                                    </div>
                                    <a href="/reviews" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                        <i class="fas fa-coins mr-2 text-yellow-600"></i>Gold (XAU/USD) Trading
                                    </a>
                                    <a href="/reviews" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                        <i class="fas fa-tint mr-2 text-gray-700"></i>Oil Trading
                                    </a>
                                    <a href="/reviews" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                        <i class="fas fa-chart-area mr-2 text-green-600"></i>Stock Trading
                                    </a>
                                    <a href="/reviews" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                        <i class="fas fa-bitcoin mr-2 text-orange-500"></i>Crypto Trading
                                    </a>
                                    
                                    <hr class="my-2 border-gray-200">
                                    <div class="px-4 py-2">
                                        <h3 class="text-sm font-semibold text-blue-900 uppercase tracking-wide">Special Features</h3>
                                    </div>
                                    <a href="/reviews" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                        <i class="fas fa-mosque mr-2 text-green-700"></i>Islamic Trading (Halal)
                                    </a>
                                    <a href="/reviews" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                        <i class="fas fa-robot mr-2 text-blue-600"></i>Automated Trading
                                    </a>
                                    <a href="/reviews" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                        <i class="fas fa-copy mr-2 text-purple-600"></i>Copy Trading
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 3. Reviews Menu -->
                        <div class="relative group">
                            <button class="flex items-center space-x-1 text-blue-800 hover:text-blue-600 transition-colors py-3 px-4 rounded-md nav-menu-button font-medium">
                                <i class="fas fa-star text-sm"></i>
                                <span>Reviews</span>
                                <i class="fas fa-chevron-down text-xs ml-1"></i>
                            </button>
                            <div class="absolute left-0 mt-1 w-72 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div class="py-3">
                                    <div class="px-4 py-2">
                                        <h3 class="text-sm font-semibold text-blue-900 uppercase tracking-wide">Browse Reviews</h3>
                                    </div>
                                    <a href="/reviews" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                                        <i class="fas fa-list mr-2"></i>All Broker Reviews
                                    </a>
                                    
                                    <hr class="my-2 border-gray-200">
                                    <div class="px-4 py-2">
                                        <h3 class="text-sm font-semibold text-blue-900 uppercase tracking-wide">Top Rated Brokers</h3>
                                    </div>
                                    <div class="max-h-52 overflow-y-auto">
                                        <a href="/reviews/ic-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                            <i class="fas fa-star text-yellow-500 text-xs mr-2"></i>IC Markets
                                            <span class="text-xs text-gray-500 ml-1">(4.8/5)</span>
                                        </a>
                                        <a href="/reviews/pepperstone" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                            <i class="fas fa-star text-yellow-500 text-xs mr-2"></i>Pepperstone
                                            <span class="text-xs text-gray-500 ml-1">(4.7/5)</span>
                                        </a>
                                        <a href="/reviews/oanda" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                            <i class="fas fa-star text-yellow-500 text-xs mr-2"></i>OANDA
                                            <span class="text-xs text-gray-500 ml-1">(4.6/5)</span>
                                        </a>
                                        <a href="/reviews/interactive-brokers" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                            <i class="fas fa-star text-yellow-500 text-xs mr-2"></i>Interactive Brokers
                                            <span class="text-xs text-gray-500 ml-1">(4.5/5)</span>
                                        </a>
                                        <a href="/reviews/xm-group" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                            <i class="fas fa-star text-yellow-500 text-xs mr-2"></i>XM Group
                                            <span class="text-xs text-gray-500 ml-1">(4.4/5)</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 4. Tools Menu -->
                        <div class="relative group">
                            <button class="flex items-center space-x-1 text-blue-800 hover:text-blue-600 transition-colors py-3 px-4 rounded-md nav-menu-button font-medium">
                                <i class="fas fa-tools text-sm"></i>
                                <span>Tools</span>
                                <i class="fas fa-chevron-down text-xs ml-1"></i>
                            </button>
                            <div class="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div class="py-3">
                                    <div class="px-4 py-2">
                                        <h3 class="text-sm font-semibold text-blue-900 uppercase tracking-wide">Trading Tools</h3>
                                    </div>
                                    <a href="/calculators" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                                        <i class="fas fa-calculator mr-2 text-green-600"></i>Trading Calculators
                                    </a>
                                    <a href="/simulator" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                                        <i class="fas fa-coins mr-2 text-orange-500"></i>Cost Calculator
                                    </a>
                                    <a href="/compare" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                                        <i class="fas fa-balance-scale mr-2 text-blue-600"></i>Broker Comparison
                                    </a>
                                    <a href="/" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                                        <i class="fas fa-heart mr-2 text-red-500"></i>Broker Matcher
                                    </a>
                                    
                                    <hr class="my-2 border-gray-200">
                                    <div class="px-4 py-2">
                                        <h3 class="text-sm font-semibold text-blue-900 uppercase tracking-wide">Individual Calculators</h3>
                                    </div>
                                    <a href="/calculators#profit-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                        <i class="fas fa-chart-line mr-2 text-green-500"></i>Profit Calculator
                                    </a>
                                    <a href="/calculators#margin-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                        <i class="fas fa-percentage mr-2 text-blue-500"></i>Margin Calculator
                                    </a>
                                    <a href="/calculators#pip-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors">
                                        <i class="fas fa-calculator mr-2 text-purple-500"></i>Pip Calculator
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 5. Help Menu -->
                        <div class="relative group">
                            <button class="flex items-center space-x-1 text-blue-800 hover:text-blue-600 transition-colors py-3 px-4 rounded-md nav-menu-button font-medium">
                                <i class="fas fa-question-circle text-sm"></i>
                                <span>Help</span>
                                <i class="fas fa-chevron-down text-xs ml-1"></i>
                            </button>
                            <div class="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div class="py-3">
                                    <a href="/about" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                                        <i class="fas fa-info-circle mr-2"></i>About BrokerAnalysis
                                    </a>
                                    <a href="/about#methodology" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <i class="fas fa-microscope mr-2"></i>Our Methodology
                                    </a>
                                    <a href="/contact" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <i class="fas fa-envelope mr-2"></i>Contact Support
                                    </a>
                                    
                                    <hr class="my-2 border-gray-200">
                                    <div class="px-4 py-2 text-sm text-gray-500">
                                        <i class="fas fa-shield-alt mr-2"></i>Risk Warning: Trading involves risk
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
                
                <!-- Authentication & User Menu -->
                <div class="flex items-center space-x-4">
                    <!-- Authentication Section -->
                    <div class="nav-auth-container flex items-center space-x-3" id="nav-auth-container">
                        <!-- Default: Not authenticated -->
                        <div id="nav-auth-signin" class="flex items-center space-x-3">
                            <button onclick="window.smartRecommendation?.createAuthModal()" class="text-blue-600 hover:text-blue-800 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                                <i class="fas fa-sign-in-alt mr-1"></i>Sign In
                            </button>
                            <button onclick="window.smartRecommendation?.showSignUpForm()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
                                <i class="fas fa-user-plus mr-1"></i>Get Started Free
                            </button>
                        </div>
                        
                        <!-- Authenticated: User menu -->
                        <div id="nav-auth-user" class="hidden relative group">
                            <button class="flex items-center space-x-2 text-blue-800 hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-blue-50" 
                                    aria-label="User menu" 
                                    aria-expanded="false" 
                                    aria-haspopup="true">
                                <i class="fas fa-user-circle text-lg" aria-hidden="true"></i>
                                <span id="nav-user-name" class="font-medium">User</span>
                                <i class="fas fa-chevron-down text-xs" aria-hidden="true"></i>
                            </button>
                            <div class="absolute right-0 mt-1 w-52 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div class="py-3">
                                    <a href="/dashboard" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                                        <i class="fas fa-tachometer-alt mr-2"></i>My Dashboard
                                    </a>
                                    <a href="/dashboard" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <i class="fas fa-star mr-2"></i>My Broker Matches
                                    </a>
                                    <a href="/dashboard" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <i class="fas fa-user mr-2"></i>Account Settings
                                    </a>
                                    <div class="border-t border-gray-200 my-1"></div>
                                    <a href="/api/auth/logout" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                        <i class="fas fa-sign-out-alt mr-2"></i>Sign Out
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mobile Menu Button -->
                    <button id="mobile-menu-btn" class="lg:hidden p-2 text-blue-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" aria-label="Open mobile navigation menu" aria-expanded="false" aria-controls="mobile-menu">
                        <i class="fas fa-bars text-xl" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden lg:hidden bg-white shadow-lg border-b border-gray-200" role="navigation" aria-label="Mobile navigation menu">
        <div class="px-2 py-3">
            
            <!-- 1. Brokers Menu -->
            <div class="border-b border-gray-100 last:border-b-0">
                <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-blue-600 transition-colors mobile-menu-toggle" data-menu="brokers">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-building text-sm"></i>
                        <span class="font-medium">Brokers</span>
                    </div>
                    <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                </button>
                <div class="mobile-submenu hidden bg-blue-50 pb-3">
                    <div class="px-4 py-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">Browse Brokers</div>
                    <a href="/brokers" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600 font-medium">
                        <i class="fas fa-list mr-2"></i>All Brokers Directory
                    </a>
                    <a href="/reviews" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600 font-medium">
                        <i class="fas fa-star mr-2"></i>Broker Reviews
                    </a>
                    <a href="/compare" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600 font-medium">
                        <i class="fas fa-balance-scale mr-2"></i>Compare Brokers
                    </a>
                    
                    <div class="px-4 py-2 mt-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">Popular Countries</div>
                    <a href="/countries/usa" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-flag-usa text-xs mr-2"></i>USA (CFTC)
                    </a>
                    <a href="/countries/australia" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-globe text-xs mr-2"></i>Australia (ASIC)
                    </a>
                    <a href="/countries/canada" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-leaf text-xs mr-2"></i>Canada (CIRO)
                    </a>
                    <a href="/countries/singapore" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-city text-xs mr-2"></i>Singapore (MAS)
                    </a>
                    <a href="/countries/dubai" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-gem text-xs mr-2"></i>Dubai (DFSA)
                    </a>
                    <a href="/countries/india" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-rupee-sign text-xs mr-2"></i>India (SEBI)
                    </a>
                    
                    <a href="/countries" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-800 font-medium mt-2">
                        <i class="fas fa-globe-americas mr-2"></i>View All Countries →
                    </a>
                </div>
            </div>
            
            <!-- 2. Trading Menu -->
            <div class="border-b border-gray-100 last:border-b-0">
                <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-blue-600 transition-colors mobile-menu-toggle" data-menu="trading">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-line text-sm"></i>
                        <span class="font-medium">Trading</span>
                    </div>
                    <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                </button>
                <div class="mobile-submenu hidden bg-blue-50 pb-3">
                    <div class="px-4 py-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">Trading Styles</div>
                    <a href="/simulator" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600 font-medium">
                        <i class="fas fa-calculator mr-2 text-green-600"></i>Trading Cost Calculator
                    </a>
                    <a href="/compare" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600">
                        <i class="fas fa-bolt mr-2 text-yellow-500"></i>Scalping Brokers
                    </a>
                    <a href="/reviews" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600">
                        <i class="fas fa-sun mr-2 text-orange-500"></i>Day Trading
                    </a>
                    <a href="/reviews" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600">
                        <i class="fas fa-wave-square mr-2 text-purple-500"></i>Swing Trading
                    </a>
                    
                    <div class="px-4 py-2 mt-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">Trading Assets</div>
                    <a href="/reviews" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-coins mr-2 text-yellow-600"></i>Gold (XAU/USD) Trading
                    </a>
                    <a href="/reviews" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-tint mr-2 text-gray-700"></i>Oil Trading
                    </a>
                    <a href="/reviews" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-chart-area mr-2 text-green-600"></i>Stock Trading
                    </a>
                    <a href="/reviews" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-bitcoin mr-2 text-orange-500"></i>Crypto Trading
                    </a>
                    
                    <div class="px-4 py-2 mt-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">Special Features</div>
                    <a href="/reviews" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-mosque mr-2 text-green-700"></i>Islamic Trading (Halal)
                    </a>
                    <a href="/reviews" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-robot mr-2 text-blue-600"></i>Automated Trading
                    </a>
                    <a href="/reviews" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-copy mr-2 text-purple-600"></i>Copy Trading
                    </a>
                </div>
            </div>
            
            <!-- 3. Reviews Menu -->
            <div class="border-b border-gray-100 last:border-b-0">
                <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-blue-600 transition-colors mobile-menu-toggle" data-menu="reviews">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-star text-sm"></i>
                        <span class="font-medium">Reviews</span>
                    </div>
                    <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                </button>
                <div class="mobile-submenu hidden bg-blue-50 pb-3">
                    <div class="px-4 py-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">Browse Reviews</div>
                    <a href="/reviews" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600 font-medium">
                        <i class="fas fa-list mr-2"></i>All Broker Reviews
                    </a>
                    
                    <div class="px-4 py-2 mt-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">Top Rated Brokers</div>
                    <a href="/reviews/ic-markets" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-star text-yellow-500 text-xs mr-2"></i>IC Markets (4.8/5)
                    </a>
                    <a href="/reviews/pepperstone" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-star text-yellow-500 text-xs mr-2"></i>Pepperstone (4.7/5)
                    </a>
                    <a href="/reviews/oanda" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-star text-yellow-500 text-xs mr-2"></i>OANDA (4.6/5)
                    </a>
                    <a href="/reviews/interactive-brokers" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-star text-yellow-500 text-xs mr-2"></i>Interactive Brokers (4.5/5)
                    </a>
                    <a href="/reviews/xm-group" class="block py-1 px-6 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-star text-yellow-500 text-xs mr-2"></i>XM Group (4.4/5)
                    </a>
                </div>
            </div>
            
            <!-- 4. Tools Menu -->
            <div class="border-b border-gray-100 last:border-b-0">
                <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-blue-600 transition-colors mobile-menu-toggle" data-menu="tools">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-tools text-sm"></i>
                        <span class="font-medium">Tools</span>
                    </div>
                    <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                </button>
                <div class="mobile-submenu hidden bg-blue-50 pb-3">
                    <div class="px-4 py-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">Trading Tools</div>
                    <a href="/simulator" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600 font-medium">
                        <i class="fas fa-calculator mr-2 text-green-600"></i>Cost Calculator
                    </a>
                    <a href="/compare" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600 font-medium">
                        <i class="fas fa-balance-scale mr-2 text-blue-600"></i>Broker Comparison
                    </a>
                    <a href="/" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600 font-medium">
                        <i class="fas fa-heart mr-2 text-red-500"></i>Broker Matcher
                    </a>
                    
                    <div class="px-4 py-2 mt-2 text-xs font-semibold text-blue-900 uppercase tracking-wide">Coming Soon</div>
                    <div class="px-6 py-1 text-sm text-gray-500">
                        <i class="fas fa-chart-pie mr-2"></i>Profit Calculator
                    </div>
                    <div class="px-6 py-1 text-sm text-gray-500">
                        <i class="fas fa-percentage mr-2"></i>Margin Calculator
                    </div>
                    <div class="px-6 py-1 text-sm text-gray-500">
                        <i class="fas fa-ruler mr-2"></i>Pip Calculator
                    </div>
                </div>
            </div>
            
            <!-- 5. Help Menu -->
            <div class="border-b border-gray-100 last:border-b-0">
                <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-blue-600 transition-colors mobile-menu-toggle" data-menu="help">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-question-circle text-sm"></i>
                        <span class="font-medium">Help</span>
                    </div>
                    <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                </button>
                <div class="mobile-submenu hidden bg-blue-50 pb-3">
                    <a href="/about" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600 font-medium">
                        <i class="fas fa-info-circle mr-2"></i>About BrokerAnalysis
                    </a>
                    <a href="/about#methodology" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600">
                        <i class="fas fa-microscope mr-2"></i>Our Methodology
                    </a>
                    <a href="/contact" class="block py-2 px-6 text-sm text-blue-800 hover:text-blue-600">
                        <i class="fas fa-envelope mr-2"></i>Contact Support
                    </a>
                    
                    <div class="px-6 py-2 mt-2 text-sm text-gray-500 border-t border-gray-200">
                        <i class="fas fa-shield-alt mr-2"></i>Risk Warning: Trading involves risk
                    </div>
                </div>
            </div>
            
            <!-- 6. Mobile Authentication Section -->
            <div class="border-t border-gray-200 pt-3 mt-3">
                <div id="mobile-auth-section" class="px-4">
                    <!-- Default: Not authenticated -->
                    <div id="mobile-auth-signin" class="space-y-3">
                        <button onclick="window.smartRecommendation?.createAuthModal()" class="w-full text-center text-blue-600 hover:text-blue-800 font-medium transition-colors px-4 py-2 border border-blue-600 rounded-lg hover:bg-blue-50">
                            <i class="fas fa-sign-in-alt mr-2"></i>Sign In
                        </button>
                        <button onclick="window.smartRecommendation?.showSignUpForm()" class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
                            <i class="fas fa-user-plus mr-2"></i>Get Started Free
                        </button>
                    </div>
                    
                    <!-- Authenticated: User menu -->
                    <div id="mobile-auth-user" class="hidden">
                        <div class="pb-3 mb-3 border-b border-gray-200">
                            <div class="flex items-center space-x-2 text-blue-800 mb-2">
                                <i class="fas fa-user-circle text-lg"></i>
                                <span id="mobile-user-name" class="font-medium">User</span>
                            </div>
                        </div>
                        <div class="space-y-1">
                            <a href="/dashboard" class="block py-2 text-sm text-blue-800 hover:text-blue-600">
                                <i class="fas fa-tachometer-alt mr-2"></i>My Dashboard
                            </a>
                            <a href="/dashboard" class="block py-2 text-sm text-blue-800 hover:text-blue-600">
                                <i class="fas fa-star mr-2"></i>My Broker Matches
                            </a>
                            <a href="/dashboard" class="block py-2 text-sm text-blue-800 hover:text-blue-600">
                                <i class="fas fa-user mr-2"></i>Account Settings
                            </a>
                            <a href="/api/auth/logout" class="block py-2 text-sm text-red-600 hover:text-red-800">
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