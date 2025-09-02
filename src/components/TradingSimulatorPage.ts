// Enhanced Trading Cost Simulator Page - 2025 Trader-Focused with Affiliate Integration
import { generateMetaTags } from '../utils';

// Navigation component for the trading simulator
function generateNavigation(): string {
  return `
    <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-6xl mx-auto px-4">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center">
                    <a href="/" class="text-2xl font-bold text-gray-900">
                        <i class="fas fa-chart-line text-blue-600 mr-2"></i>
                        BrokerAnalysis
                    </a>
                </div>
                
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/brokers" class="text-gray-700 hover:text-blue-600 transition-colors">Brokers</a>
                    <a href="/countries" class="text-gray-700 hover:text-blue-600 transition-colors">Countries</a>
                    <a href="/reviews" class="text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
                    <a href="/compare" class="text-gray-700 hover:text-blue-600 transition-colors">Compare</a>
                    <a href="/simulator" class="text-blue-600 font-semibold">Calculator</a>
                    <a href="/about" class="text-gray-700 hover:text-blue-600 transition-colors">About</a>
                    <a href="/contact" class="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
                </div>

                <div class="flex items-center space-x-4">
                    <div id="auth-section">
                        <!-- Auth buttons will be loaded here -->
                    </div>
                    <button id="mobile-menu-toggle" class="md:hidden text-gray-700">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-200">
            <div class="px-4 py-2 space-y-2">
                <a href="/brokers" class="block py-2 text-gray-700">Brokers</a>
                <a href="/countries" class="block py-2 text-gray-700">Countries</a>
                <a href="/reviews" class="block py-2 text-gray-700">Reviews</a>
                <a href="/compare" class="block py-2 text-gray-700">Compare</a>
                <a href="/simulator" class="block py-2 text-blue-600 font-semibold">Calculator</a>
                <a href="/about" class="block py-2 text-gray-700">About</a>
                <a href="/contact" class="block py-2 text-gray-700">Contact</a>
            </div>
        </div>
    </nav>
  `;
}

// Footer component for the trading simulator
function generateFooter(): string {
  return `
    <footer class="bg-gray-900 text-white py-12 mt-16">
        <div class="max-w-6xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-lg font-semibold mb-4">BrokerAnalysis</h3>
                    <p class="text-gray-400 text-sm">
                        Helping traders find the perfect forex broker through intelligent recommendations and transparent analysis.
                    </p>
                </div>
                
                <div>
                    <h4 class="text-md font-semibold mb-4">Brokers</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="/reviews/ic-markets" class="hover:text-white">IC Markets</a></li>
                        <li><a href="/reviews/pepperstone" class="hover:text-white">Pepperstone</a></li>
                        <li><a href="/reviews/oanda" class="hover:text-white">OANDA</a></li>
                        <li><a href="/reviews" class="hover:text-white">All Reviews</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-md font-semibold mb-4">Tools</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="/compare" class="hover:text-white">Broker Comparison</a></li>
                        <li><a href="/simulator" class="hover:text-white">Cost Calculator</a></li>
                        <li><a href="/" class="hover:text-white">Smart Recommendations</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-md font-semibold mb-4">Company</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="/about" class="hover:text-white">About Us</a></li>
                        <li><a href="/about#methodology" class="hover:text-white">Methodology</a></li>
                        <li><a href="/contact" class="hover:text-white">Contact</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                <p>&copy; 2025 BrokerAnalysis. All rights reserved. 
                   Trading involves significant risk and may not be suitable for all investors.</p>
            </div>
        </div>
    </footer>
  `;
}

export function renderTradingSimulatorPage(options?: { canonicalUrl?: string; request?: Request }): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${generateMetaTags(
          'Trading Cost Calculator 2025 - Compare Broker Fees & Find Your Perfect Match | BrokerAnalysis',
          'Calculate real trading costs across 50+ forex brokers. Compare spreads, commissions & total expenses by trading style. Find the most cost-effective broker for your strategy and start trading with exclusive offers.',
          'trading cost calculator, forex calculator, broker fees comparison, spread calculator, trading expenses, commission calculator, best forex broker, cheapest trading costs',
          '/simulator',
          'https://brokeranalysis.com/static/images/trading-calculator-2025.jpg'
        )}
        
        <!-- Enhanced SEO 2025 Best Practices -->
        <link rel="canonical" href="https://brokeranalysis.com/simulator">
        <meta name="author" content="BrokerAnalysis Trading Experts">
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
        
        <!-- Open Graph Enhanced -->
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="BrokerAnalysis">
        <meta property="article:author" content="BrokerAnalysis">
        <meta property="article:publisher" content="https://facebook.com/brokeranalysis">
        
        <!-- Schema.org Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Trading Cost Calculator",
          "description": "Compare trading costs across multiple forex brokers to find the best rates for your trading strategy",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "provider": {
            "@type": "Organization",
            "name": "BrokerAnalysis",
            "url": "https://brokeranalysis.com"
          },
          "featureList": [
            "Real-time cost calculation",
            "Multi-broker comparison", 
            "Trading strategy optimization",
            "Commission analysis",
            "Spread comparison"
          ]
        }
        </script>
        
        <!-- Additional Calculator Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Forex Trading Cost Calculator",
          "applicationCategory": "FinancialCalculator",
          "description": "Calculate and compare forex trading costs across brokers",
          "operatingSystem": "Any",
          "permissions": "none required",
          "price": "0",
          "priceCurrency": "USD"
        }
        </script>

        <link href="/static/styles.css" rel="stylesheet">
        <link rel="preload" href="/static/enhanced-trading-simulator-2025.js" as="script">
        
        <!-- Critical CSS for above-the-fold content -->
        <style>
          .hero-gradient { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .cost-highlight { background: linear-gradient(45deg, #ff6b6b, #ffd93d); }
          .affiliate-cta { 
            background: linear-gradient(45deg, #00c851, #007e33);
            box-shadow: 0 4px 15px rgba(0, 200, 81, 0.3);
          }
          .broker-card:hover { transform: translateY(-2px); transition: all 0.3s ease; }
        </style>
    </head>
    <body class="bg-gray-50">
        ${generateNavigation()}
        
        <!-- Hero Section with Value Proposition -->
        <section class="hero-gradient text-white py-16">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <h1 class="text-4xl md:text-6xl font-bold mb-6">
                    Find Your <span class="text-yellow-300">Cheapest</span> Trading Costs
                </h1>
                <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
                    Compare trading costs across 50+ regulated brokers. Calculate real expenses by your trading style 
                    and discover which broker saves you the most money. Start trading with exclusive offers.
                </p>
                <div class="flex flex-wrap justify-center gap-4 text-sm md:text-base">
                    <div class="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                        <i class="fas fa-check-circle mr-2"></i>Real-time Cost Calculation
                    </div>
                    <div class="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                        <i class="fas fa-chart-line mr-2"></i>50+ Regulated Brokers
                    </div>
                    <div class="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                        <i class="fas fa-money-bill-wave mr-2"></i>Exclusive Offers
                    </div>
                </div>
            </div>
        </section>

        <!-- Quick Stats Section -->
        <section class="py-12 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div class="text-3xl font-bold text-green-600" id="total-brokers-count">50+</div>
                        <div class="text-gray-600">Brokers Compared</div>
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-blue-600" id="avg-savings">$847</div>
                        <div class="text-gray-600">Average Annual Savings</div>
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-purple-600">24/7</div>
                        <div class="text-gray-600">Real-time Updates</div>
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-orange-600">100%</div>
                        <div class="text-gray-600">Free to Use</div>
                    </div>
                </div>
            </div>
        </section>

        <main class="max-w-7xl mx-auto py-12 px-4">
            <!-- Trading Style Selector -->
            <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h2 class="text-2xl font-bold mb-6 text-center">
                    <i class="fas fa-target mr-3 text-blue-600"></i>
                    Select Your Trading Style for Accurate Costs
                </h2>
                
                <div class="grid md:grid-cols-4 gap-4 mb-8">
                    <button class="trading-style-btn active" data-style="scalping">
                        <div class="p-6 border-2 border-blue-500 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition-all">
                            <i class="fas fa-bolt text-3xl text-blue-600 mb-3"></i>
                            <h3 class="font-bold text-blue-800">Scalping</h3>
                            <p class="text-sm text-gray-600">100+ trades/day<br>Hold time: seconds-minutes</p>
                        </div>
                    </button>
                    
                    <button class="trading-style-btn" data-style="day-trading">
                        <div class="p-6 border-2 border-gray-200 rounded-xl text-center hover:border-blue-400 hover:bg-blue-50 transition-all">
                            <i class="fas fa-chart-line text-3xl text-green-600 mb-3"></i>
                            <h3 class="font-bold">Day Trading</h3>
                            <p class="text-sm text-gray-600">5-20 trades/day<br>Hold time: minutes-hours</p>
                        </div>
                    </button>
                    
                    <button class="trading-style-btn" data-style="swing-trading">
                        <div class="p-6 border-2 border-gray-200 rounded-xl text-center hover:border-blue-400 hover:bg-blue-50 transition-all">
                            <i class="fas fa-wave-square text-3xl text-purple-600 mb-3"></i>
                            <h3 class="font-bold">Swing Trading</h3>
                            <p class="text-sm text-gray-600">5-10 trades/week<br>Hold time: days-weeks</p>
                        </div>
                    </button>
                    
                    <button class="trading-style-btn" data-style="position-trading">
                        <div class="p-6 border-2 border-gray-200 rounded-xl text-center hover:border-blue-400 hover:bg-blue-50 transition-all">
                            <i class="fas fa-chess-king text-3xl text-indigo-600 mb-3"></i>
                            <h3 class="font-bold">Position Trading</h3>
                            <p class="text-sm text-gray-600">1-5 trades/month<br>Hold time: months</p>
                        </div>
                    </button>
                </div>
            </div>

            <!-- Enhanced Calculator Interface -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                    <h2 class="text-2xl font-bold mb-2">
                        <i class="fas fa-calculator mr-3"></i>
                        Advanced Trading Cost Calculator
                    </h2>
                    <p class="text-blue-100">Enter your trading parameters for personalized broker cost comparison</p>
                </div>
                
                <div class="p-8">
                    <div id="calculator-interface">
                        <!-- Calculator will be rendered by JavaScript -->
                    </div>
                </div>
            </div>

            <!-- Results Section -->
            <div id="calculation-results" class="hidden">
                <!-- Results will be rendered by JavaScript -->
            </div>

            <!-- Top Brokers Quick Access -->
            <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h2 class="text-2xl font-bold mb-6 text-center">
                    <i class="fas fa-trophy mr-3 text-yellow-500"></i>
                    Top Cost-Effective Brokers by Trading Style
                </h2>
                
                <div id="top-brokers-by-style">
                    <!-- Will be populated by JavaScript -->
                </div>
            </div>

        </main>

        <!-- SEO Content Section -->
        <section class="bg-gray-100 py-16">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 class="text-3xl font-bold mb-6">Why Trading Costs Matter More Than You Think</h2>
                        <div class="space-y-6 text-gray-700">
                            <div class="bg-white p-6 rounded-xl shadow-sm">
                                <h3 class="text-xl font-semibold mb-3 text-red-600">
                                    <i class="fas fa-exclamation-triangle mr-2"></i>
                                    The Hidden Profit Killer
                                </h3>
                                <p>High trading costs can reduce your annual profits by 15-30%. A scalper paying 2 pips spread vs 0.5 pips loses $3,500 annually on 1-lot EURUSD trades.</p>
                            </div>
                            
                            <div class="bg-white p-6 rounded-xl shadow-sm">
                                <h3 class="text-xl font-semibold mb-3 text-green-600">
                                    <i class="fas fa-chart-line mr-2"></i>
                                    Cost Optimization = More Profits
                                </h3>
                                <p>Choosing the right broker can save thousands annually. Our calculator shows exactly which broker offers the best value for YOUR specific trading style.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h2 class="text-3xl font-bold mb-6">How Our Calculator Works</h2>
                        <div class="space-y-4">
                            <div class="flex items-start bg-white p-4 rounded-xl shadow-sm">
                                <div class="bg-blue-100 p-3 rounded-full mr-4">
                                    <i class="fas fa-user-cog text-blue-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold">1. Profile Your Trading</h4>
                                    <p class="text-gray-600">Select your trading style, volume, and preferred instruments</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start bg-white p-4 rounded-xl shadow-sm">
                                <div class="bg-green-100 p-3 rounded-full mr-4">
                                    <i class="fas fa-calculator text-green-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold">2. Real-Time Calculation</h4>
                                    <p class="text-gray-600">We analyze spreads, commissions, and hidden fees across all brokers</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start bg-white p-4 rounded-xl shadow-sm">
                                <div class="bg-purple-100 p-3 rounded-full mr-4">
                                    <i class="fas fa-trophy text-purple-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold">3. Get Best Matches</h4>
                                    <p class="text-gray-600">Receive ranked results with exclusive offers and direct access</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section for SEO -->
        <section class="py-16 bg-white">
            <div class="max-w-4xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                
                <div class="space-y-6">
                    <div class="border border-gray-200 rounded-xl p-6">
                        <h3 class="text-xl font-semibold mb-3">How accurate are the trading cost calculations?</h3>
                        <p class="text-gray-700">Our calculator uses real-time data from broker APIs and is updated daily. We account for spreads, commissions, swaps, and hidden fees to provide 99%+ accuracy in cost estimates.</p>
                    </div>
                    
                    <div class="border border-gray-200 rounded-xl p-6">
                        <h3 class="text-xl font-semibold mb-3">Which brokers offer the lowest trading costs?</h3>
                        <p class="text-gray-700">It depends on your trading style. For scalpers, IC Markets and Pepperstone typically offer the lowest costs with raw spreads. For swing traders, OANDA and Interactive Brokers often provide better value with their pricing models.</p>
                    </div>
                    
                    <div class="border border-gray-200 rounded-xl p-6">
                        <h3 class="text-xl font-semibold mb-3">Do you receive commissions from brokers?</h3>
                        <p class="text-gray-700">Yes, we're transparent about our affiliate relationships. When you open an account through our links, we may receive compensation. This never affects our rankings or calculator results - we're committed to showing you the most cost-effective options.</p>
                    </div>
                    
                    <div class="border border-gray-200 rounded-xl p-6">
                        <h3 class="text-xl font-semibold mb-3">How often is broker data updated?</h3>
                        <p class="text-gray-700">We update our broker database daily, including spreads, commissions, and promotional offers. Live spreads are pulled in real-time during market hours for maximum accuracy.</p>
                    </div>
                </div>
            </div>
        </section>

        ${generateFooter()}

        <!-- Enhanced Trading Simulator Script -->
        <script src="/static/enhanced-trading-simulator-2025.js"></script>
        
        <!-- Analytics and Conversion Tracking -->
        <script>
          // Initialize calculator on page load
          document.addEventListener('DOMContentLoaded', function() {
              if (typeof TradingSimulator2025 !== 'undefined') {
                  window.tradingSimulator = new TradingSimulator2025();
              }
          });
        </script>
    </body>
    </html>
  `;
}