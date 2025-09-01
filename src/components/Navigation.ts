// Complete navigation component with all dropdowns and functionality
import { generateMetaTags } from '../utils';

export function generateCompleteNavigation(): string {
  return `
    <!-- Skip Navigation for Accessibility -->
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded">
        Skip to main content
    </a>
    
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b" role="navigation" aria-label="Main navigation">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-chart-line text-blue-600 text-2xl" aria-hidden="true"></i>
                    <span class="text-xl font-bold text-blue-900">BrokerAnalysis</span>
                </div>
                
                <!-- Enhanced Navigation with Dropdown Menus -->
                <div class="hidden md:flex items-center justify-center flex-1" id="main-navigation">
                    <div class="flex items-center space-x-2">
                        <div class="relative group">
                            <button class="flex items-center space-x-1 text-blue-800 hover:text-blue-600 transition-colors py-2 px-3 rounded-md nav-menu-button" 
                                    aria-label="Best Brokers menu" 
                                    aria-expanded="false" 
                                    aria-haspopup="true">
                                <i class="fas fa-trophy text-sm" aria-hidden="true"></i>
                                <span class="font-medium">Best Brokers</span>
                                <i class="fas fa-chevron-down text-xs ml-1" aria-hidden="true"></i>
                            </button>
                            <div class="absolute left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div class="py-2">
                                    <a href="/brokers" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">All Brokers Directory</a>
                                    <a href="/countries" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">Countries & Regulators</a>
                                    <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">By Country</div>
                                    <div class="grid grid-cols-2 gap-0 max-h-64 overflow-y-auto">
                                        <a href="/brokers/australia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border-r border-blue-100">Australia</a>
                                        <a href="/brokers/canada" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">Canada</a>
                                        <a href="/brokers/uk" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border-r border-blue-100">UK</a>
                                        <a href="/brokers/south-africa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">South Africa</a>
                                        <a href="/brokers/pakistan" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border-r border-blue-100">Pakistan</a>
                                        <a href="/brokers/philippines" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">Philippines</a>
                                        <a href="/brokers/india" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border-r border-blue-100">India</a>
                                        <a href="/brokers/malaysia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">Malaysia</a>
                                        <a href="/brokers/dubai" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border-r border-blue-100">Dubai</a>
                                        <a href="/brokers/qatar" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">Qatar</a>
                                        <a href="/brokers/indonesia" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border-r border-blue-100">Indonesia</a>
                                        <a href="/brokers/usa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">USA</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="relative group">
                            <button class="flex items-center space-x-1 text-blue-800 hover:text-blue-600 transition-colors py-2 px-3 rounded-md nav-menu-button">
                                <i class="fas fa-chart-bar text-sm"></i>
                                <span class="font-medium">Trading Types</span>
                                <i class="fas fa-chevron-down text-xs ml-1"></i>
                            </button>
                            <div class="absolute left-0 mt-1 w-72 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div class="py-2 max-h-80 overflow-y-auto">
                                    <a href="/brokers/gold-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">Gold (XAUUSD) Trading</a>
                                    <a href="/brokers/islamic-halal" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">Islamic Halal Trading</a>
                                    <a href="/brokers/automated-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">Automated Forex Trading</a>
                                    <a href="/brokers/high-leverage" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">High Leverage Brokers</a>
                                    <a href="/brokers/oil-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">Oil Trading Platform</a>
                                    <a href="/brokers/copy-trading" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">Copy Trading Platform</a>
                                    <a href="/brokers/ecn" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">ECN Brokers</a>
                                    <a href="/brokers/scalping" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">Scalping Forex Brokers</a>
                                    <a href="/brokers/demo-accounts" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">Forex Demo Accounts</a>
                                    <a href="/brokers/mt4" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">MT4 Brokers</a>
                                    <a href="/brokers/stocks" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">Stocks Trading Platform</a>
                                    <a href="/brokers/beginners" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">Brokers For Beginners</a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="relative group">
                            <button class="flex items-center space-x-1 text-blue-800 hover:text-blue-600 transition-colors py-2 px-3 rounded-md nav-menu-button">
                                <i class="fas fa-star text-sm"></i>
                                <span class="font-medium">Reviews</span>
                                <i class="fas fa-chevron-down text-xs ml-1"></i>
                            </button>
                            <div class="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div class="py-2">
                                    <a href="/reviews" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">All Reviews</a>
                                    <a href="/reviews/platforms" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">Trading Platforms</a>
                                    <a href="/reviews/types" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">Types of Forex Brokers</a>
                                    <hr class="my-1 border-blue-200">
                                    <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">Top Brokers</div>
                                    <div class="max-h-48 overflow-y-auto">
                                        <a href="/reviews/fp-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">FP Markets</a>
                                        <a href="/reviews/fxtm" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">FXTM</a>
                                        <a href="/reviews/blackbull-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">Blackbull Markets</a>
                                        <a href="/reviews/eightcap" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">Eightcap</a>
                                        <a href="/reviews/octa" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">Octa</a>
                                        <a href="/reviews/plus500" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">Plus500</a>
                                        <a href="/reviews/avatrade" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">Avatrade</a>
                                        <a href="/reviews/xm" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">XM</a>
                                        <a href="/reviews/pepperstone" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">Pepperstone</a>
                                        <a href="/reviews/ic-markets" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">IC Markets</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="relative group">
                            <button class="flex items-center space-x-1 text-blue-800 hover:text-blue-600 transition-colors py-2 px-3 rounded-md nav-menu-button">
                                <i class="fas fa-tools text-sm"></i>
                                <span class="font-medium">Tools</span>
                                <i class="fas fa-chevron-down text-xs ml-1"></i>
                            </button>
                            <div class="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div class="py-2">
                                    <a href="/compare" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <i class="fas fa-balance-scale mr-2 text-blue-500"></i>Compare Brokers
                                    </a>
                                    <a href="/simulator" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <i class="fas fa-chart-line mr-2 text-yellow-400"></i>Trading Simulator
                                    </a>
                                    <a href="/" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <i class="fas fa-heart mr-2 text-red-500"></i>Broker Matcher
                                    </a>
                                    <hr class="my-1 border-blue-200">
                                    <div class="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 border-b border-blue-200">Calculators</div>
                                    <a href="/tools/profit-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">Profit Calculator</a>
                                    <a href="/tools/margin-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">Margin Calculator</a>
                                    <a href="/tools/pip-calculator" class="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">Pip Calculator</a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="relative group">
                            <button class="flex items-center space-x-1 text-blue-800 hover:text-blue-600 transition-colors py-2 px-3 rounded-md nav-menu-button">
                                <i class="fas fa-info-circle text-sm"></i>
                                <span class="font-medium">About</span>
                                <i class="fas fa-chevron-down text-xs ml-1"></i>
                            </button>
                            <div class="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div class="py-2">
                                    <a href="/about" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">About Us</a>
                                    <a href="/methodology" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">Methodology</a>
                                    <a href="/contact" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">Contact</a>
                                    <a href="/api-docs" class="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">API</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Auth Navigation -->
                    <div class="nav-auth-container">
                        <!-- Will be populated by auth system -->
                    </div>
                    
                    <button id="mobile-menu-btn" class="md:hidden p-2 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" aria-label="Open mobile navigation menu" aria-expanded="false" aria-controls="mobile-menu">
                        <i class="fas fa-bars" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden bg-white shadow-md border-b" role="navigation" aria-label="Mobile navigation menu">
        <div class="px-2 py-2">
            <!-- Best Brokers -->
            <div class="border-b border-blue-200 last:border-b-0">
                <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-blue-600 mobile-menu-toggle" data-menu="best-brokers">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-trophy text-sm"></i>
                        <span class="font-medium">Best Brokers</span>
                    </div>
                    <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                </button>
                <div class="mobile-submenu hidden bg-blue-50 pb-2">
                    <a href="/brokers/top-100" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">Top 100 Forex Brokers</a>
                    <div class="px-6 py-1 text-xs font-semibold text-gray-500 uppercase">By Country</div>
                    <a href="/brokers/australia" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Australia</a>
                    <a href="/brokers/canada" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Canada</a>
                    <a href="/brokers/uk" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">UK</a>
                    <a href="/brokers/south-africa" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">South Africa</a>
                    <a href="/brokers/pakistan" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Pakistan</a>
                    <a href="/brokers/philippines" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Philippines</a>
                    <a href="/brokers/india" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">India</a>
                    <a href="/brokers/malaysia" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Malaysia</a>
                    <a href="/brokers/dubai" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Dubai</a>
                    <a href="/brokers/qatar" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Qatar</a>
                    <a href="/brokers/indonesia" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Indonesia</a>
                    <a href="/brokers/usa" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">USA</a>
                </div>
            </div>
            
            <!-- Trading Types -->
            <div class="border-b border-blue-200 last:border-b-0">
                <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-blue-600 mobile-menu-toggle" data-menu="trading-types">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-chart-bar text-sm"></i>
                        <span class="font-medium">Trading Types</span>
                    </div>
                    <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                </button>
                <div class="mobile-submenu hidden bg-blue-50 pb-2">
                    <a href="/brokers/gold-trading" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">Gold (XAUUSD) Trading</a>
                    <a href="/brokers/islamic-halal" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">Islamic Halal Trading</a>
                    <a href="/brokers/automated-trading" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">Automated Forex Trading</a>
                    <a href="/brokers/high-leverage" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">High Leverage Brokers</a>
                    <a href="/brokers/oil-trading" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">Oil Trading Platform</a>
                    <a href="/brokers/copy-trading" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">Copy Trading Platform</a>
                    <a href="/brokers/ecn" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">ECN Brokers</a>
                    <a href="/brokers/scalping" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">Scalping Forex Brokers</a>
                    <a href="/brokers/demo-accounts" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">Forex Demo Accounts</a>
                    <a href="/brokers/mt4" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">MT4 Brokers</a>
                    <a href="/brokers/stocks" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">Stocks Trading Platform</a>
                    <a href="/brokers/beginners" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">Brokers For Beginners</a>
                </div>
            </div>
            
            <!-- Reviews -->
            <div class="border-b border-blue-200 last:border-b-0">
                <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-blue-600 mobile-menu-toggle" data-menu="reviews">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-star text-sm"></i>
                        <span class="font-medium">Reviews</span>
                    </div>
                    <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                </button>
                <div class="mobile-submenu hidden bg-blue-50 pb-2">
                    <a href="/reviews" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">All Reviews</a>
                    <a href="/reviews/platforms" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">Trading Platforms</a>
                    <a href="/reviews/types" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">Types of Forex Brokers</a>
                    <hr class="my-2 border-blue-200">
                    <div class="px-6 py-1 text-xs font-semibold text-gray-500 uppercase">Top Brokers</div>
                    <a href="/reviews/fp-markets" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">FP Markets</a>
                    <a href="/reviews/fxtm" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">FXTM</a>
                    <a href="/reviews/blackbull-markets" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Blackbull Markets</a>
                    <a href="/reviews/eightcap" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Eightcap</a>
                    <a href="/reviews/octa" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Octa</a>
                    <a href="/reviews/plus500" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Plus500</a>
                    <a href="/reviews/avatrade" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Avatrade</a>
                    <a href="/reviews/xm" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">XM</a>
                    <a href="/reviews/pepperstone" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Pepperstone</a>
                </div>
            </div>
            
            <!-- Tools -->
            <div class="border-b border-blue-200 last:border-b-0">
                <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-blue-600 mobile-menu-toggle" data-menu="tools">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-tools text-sm"></i>
                        <span class="font-medium">Tools</span>
                    </div>
                    <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                </button>
                <div class="mobile-submenu hidden bg-blue-50 pb-2">
                    <a href="/compare" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">
                        <i class="fas fa-balance-scale mr-2 text-blue-500"></i>Compare Brokers
                    </a>
                    <a href="/simulator" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">
                        <i class="fas fa-chart-line mr-2 text-yellow-400"></i>Trading Simulator
                    </a>
                    <a href="/" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">
                        <i class="fas fa-heart mr-2 text-red-500"></i>Broker Matcher
                    </a>
                    <hr class="my-2 border-blue-200">
                    <div class="px-6 py-1 text-xs font-semibold text-gray-500 uppercase">Calculators</div>
                    <a href="/tools/profit-calculator" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Profit Calculator</a>
                    <a href="/tools/margin-calculator" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Margin Calculator</a>
                    <a href="/tools/pip-calculator" class="block py-2 px-8 text-sm text-blue-600 hover:text-blue-600">Pip Calculator</a>
                </div>
            </div>
            
            <!-- About -->
            <div class="border-b border-blue-200 last:border-b-0">
                <button class="w-full flex items-center justify-between py-3 px-4 text-left text-blue-800 hover:text-blue-600 mobile-menu-toggle" data-menu="about">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-info-circle text-sm"></i>
                        <span class="font-medium">About</span>
                    </div>
                    <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                </button>
                <div class="mobile-submenu hidden bg-blue-50 pb-2">
                    <a href="/about" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">About Us</a>
                    <a href="/methodology" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">Methodology</a>
                    <a href="/contact" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">Contact</a>
                    <a href="/api-docs" class="block py-2 px-6 text-sm text-blue-600 hover:text-blue-600">API</a>
                </div>
            </div>
        </div>
    </div>
  `;
}