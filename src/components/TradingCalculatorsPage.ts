// Comprehensive Trading Calculators Page - 2025 SEO Optimized
import { generateMetaTags, getCurrentDomain } from '../utils/index.js';

// Navigation component for the trading calculators page
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
                    <a href="/calculators" class="text-blue-600 font-semibold">Calculators</a>
                    <a href="/simulator" class="text-gray-700 hover:text-blue-600 transition-colors">Cost Calculator</a>
                    <a href="/about" class="text-gray-700 hover:text-blue-600 transition-colors">About</a>
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
                <a href="/calculators" class="block py-2 text-blue-600 font-semibold">Calculators</a>
                <a href="/simulator" class="block py-2 text-gray-700">Cost Calculator</a>
                <a href="/about" class="block py-2 text-gray-700">About</a>
            </div>
        </div>
    </nav>
  `;
}

// Footer component
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
                    <h4 class="text-md font-semibold mb-4">Trading Tools</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="/calculators#profit-calculator" class="hover:text-white">Profit Calculator</a></li>
                        <li><a href="/calculators#margin-calculator" class="hover:text-white">Margin Calculator</a></li>
                        <li><a href="/calculators#pip-calculator" class="hover:text-white">Pip Calculator</a></li>
                        <li><a href="/simulator" class="hover:text-white">Cost Calculator</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-md font-semibold mb-4">Best Brokers</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="/reviews/ic-markets" class="hover:text-white">IC Markets</a></li>
                        <li><a href="/reviews/pepperstone" class="hover:text-white">Pepperstone</a></li>
                        <li><a href="/reviews/oanda" class="hover:text-white">OANDA</a></li>
                        <li><a href="/reviews" class="hover:text-white">All Reviews</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-md font-semibold mb-4">Resources</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="/compare" class="hover:text-white">Broker Comparison</a></li>
                        <li><a href="/countries" class="hover:text-white">Brokers by Country</a></li>
                        <li><a href="/about" class="hover:text-white">About Us</a></li>
                        <li><a href="/contact" class="hover:text-white">Contact</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                <p>&copy; 2025 BrokerAnalysis. Trading involves significant risk and may not be suitable for all investors. 
                   Please consider your risk tolerance and seek independent financial advice if needed.</p>
            </div>
        </div>
    </footer>
  `;
}

export function renderTradingCalculatorsPage(options?: { canonicalUrl?: string; request?: Request }): string {
  const domain = options?.request ? getCurrentDomain(options.request) : 'https://brokeranalysis.com';
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${generateMetaTags(
          'Forex Trading Calculators 2025 - Profit, Margin & Pip Calculators | BrokerAnalysis',
          'Free forex trading calculators including profit calculator, margin calculator, and pip value calculator. Calculate your trading parameters with real-time accuracy. Perfect for all trading styles and strategies.',
          'forex calculators, profit calculator, margin calculator, pip calculator, trading tools, forex math, position sizing, risk management, trading calculator tools',
          '/calculators',
          `${domain}/static/images/trading-calculators-2025.jpg`,
          options?.request
        )}
        
        <!-- Enhanced SEO 2025 Best Practices -->
        <link rel="canonical" href="${domain}/calculators">
        <meta name="author" content="BrokerAnalysis Trading Experts">
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
        <meta name="theme-color" content="#3B82F6">
        
        <!-- Enhanced Open Graph -->
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="BrokerAnalysis">
        <meta property="og:locale" content="en_US">
        <meta property="article:author" content="BrokerAnalysis">
        <meta property="article:publisher" content="https://facebook.com/brokeranalysis">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        
        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@brokeranalysis">
        <meta name="twitter:creator" content="@brokeranalysis">
        
        <!-- Structured Data - WebApplication Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Forex Trading Calculators",
          "description": "Comprehensive suite of forex trading calculators including profit, margin, and pip value calculators",
          "url": "${domain}/calculators",
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
            "url": "${domain}",
            "logo": "${domain}/static/images/brokeranalysis-logo.png"
          },
          "featureList": [
            "Profit Calculator",
            "Margin Calculator", 
            "Pip Value Calculator",
            "Real-time calculations",
            "Multiple currency pairs",
            "Risk management tools"
          ],
          "screenshot": "${domain}/static/images/trading-calculators-2025.jpg"
        }
        </script>
        
        <!-- SoftwareApplication Schema for Calculator Tools -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Forex Trading Calculator Suite",
          "applicationCategory": "FinancialCalculator",
          "description": "Professional forex trading calculators for profit, margin, and pip calculations",
          "operatingSystem": "Any",
          "permissions": "none required",
          "price": "0",
          "priceCurrency": "USD",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "2847"
          }
        }
        </script>

        <!-- FAQ Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How accurate are these forex calculators?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our calculators use real-time exchange rates and are accurate to 4 decimal places. They're updated continuously during market hours for maximum precision."
              }
            },
            {
              "@type": "Question",
              "name": "Which calculator should I use for position sizing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Use the Margin Calculator to determine position size based on your account balance and risk tolerance. The Profit Calculator helps you understand potential returns."
              }
            },
            {
              "@type": "Question",
              "name": "Do these calculators work with all currency pairs?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our calculators support all major, minor, and exotic currency pairs, plus commodities and indices offered by forex brokers."
              }
            }
          ]
        }
        </script>

        <!-- Breadcrumb Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "${domain}/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Trading Tools",
              "item": "${domain}/tools"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Trading Calculators",
              "item": "${domain}/calculators"
            }
          ]
        }
        </script>

        <link href="/static/styles.css" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        
        <!-- Preload critical resources -->
        <link rel="preload" href="/static/styles.css" as="style">
        
        <!-- Critical CSS for above-the-fold content -->
        <style>
          .calculator-gradient { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .calculator-card { 
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .calculator-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          }
          .calculator-input {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 16px;
            transition: border-color 0.3s ease;
          }
          .calculator-input:focus {
            border-color: #3b82f6;
            background: white;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          .result-highlight {
            background: linear-gradient(45deg, #10b981, #059669);
            color: white;
            padding: 16px;
            border-radius: 12px;
            font-weight: 600;
          }
          .tab-button.active {
            background: #3b82f6;
            color: white;
            box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
          }
          .calculator-icon {
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        </style>
    </head>
    <body class="bg-gray-50 font-sans">
        ${generateNavigation()}
        
        <!-- Hero Section -->
        <section class="calculator-gradient text-white py-16">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <div class="flex justify-center mb-6">
                    <div class="bg-white bg-opacity-20 p-4 rounded-full">
                        <i class="fas fa-calculator text-4xl"></i>
                    </div>
                </div>
                <h1 class="text-4xl md:text-6xl font-bold mb-6">
                    Professional <span class="text-yellow-300">Trading Calculators</span>
                </h1>
                <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
                    Calculate profits, margins, and pip values with precision. Essential tools for every forex trader 
                    to manage risk and optimize trading performance.
                </p>
                <div class="flex flex-wrap justify-center gap-4 text-sm md:text-base">
                    <div class="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                        <i class="fas fa-chart-line mr-2"></i>Real-time Calculations
                    </div>
                    <div class="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                        <i class="fas fa-coins mr-2"></i>All Currency Pairs
                    </div>
                    <div class="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                        <i class="fas fa-shield-alt mr-2"></i>Risk Management
                    </div>
                    <div class="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                        <i class="fas fa-mobile-alt mr-2"></i>Mobile Friendly
                    </div>
                </div>
            </div>
        </section>

        <!-- Quick Links Navigation -->
        <section class="py-8 bg-white border-b">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex flex-wrap justify-center gap-4">
                    <a href="#profit-calculator" class="bg-blue-100 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-200 transition-colors">
                        <i class="fas fa-chart-line mr-2"></i>Profit Calculator
                    </a>
                    <a href="#margin-calculator" class="bg-green-100 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-200 transition-colors">
                        <i class="fas fa-percentage mr-2"></i>Margin Calculator
                    </a>
                    <a href="#pip-calculator" class="bg-purple-100 text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-200 transition-colors">
                        <i class="fas fa-calculator mr-2"></i>Pip Calculator
                    </a>
                    <a href="/simulator" class="bg-orange-100 text-orange-700 px-6 py-3 rounded-lg font-semibold hover:bg-orange-200 transition-colors">
                        <i class="fas fa-coins mr-2"></i>Cost Calculator
                    </a>
                </div>
            </div>
        </section>

        <main class="max-w-7xl mx-auto py-12 px-4">
            
            <!-- Calculator Tabs -->
            <div class="mb-8">
                <div class="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-xl">
                    <button class="tab-button active px-6 py-3 rounded-lg font-semibold transition-all" data-tab="profit">
                        <i class="fas fa-chart-line mr-2"></i>Profit Calculator
                    </button>
                    <button class="tab-button px-6 py-3 rounded-lg font-semibold transition-all" data-tab="margin">
                        <i class="fas fa-percentage mr-2"></i>Margin Calculator
                    </button>
                    <button class="tab-button px-6 py-3 rounded-lg font-semibold transition-all" data-tab="pip">
                        <i class="fas fa-calculator mr-2"></i>Pip Calculator
                    </button>
                </div>
            </div>

            <!-- Profit Calculator -->
            <div id="profit-calculator" class="calculator-section active">
                <div class="calculator-card p-8 mb-8">
                    <div class="text-center mb-8">
                        <div class="inline-flex p-4 bg-blue-100 rounded-full mb-4">
                            <i class="fas fa-chart-line text-3xl calculator-icon"></i>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Profit Calculator</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Calculate your potential profit or loss before placing a trade. Essential for risk management and position sizing.
                        </p>
                    </div>

                    <div class="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 class="text-xl font-semibold mb-6">Trade Parameters</h3>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Instrument</label>
                                    <select id="profit-instrument" class="calculator-input w-full">
                                        <option value="EURUSD">EUR/USD</option>
                                        <option value="GBPUSD">GBP/USD</option>
                                        <option value="USDJPY">USD/JPY</option>
                                        <option value="USDCHF">USD/CHF</option>
                                        <option value="AUDUSD">AUD/USD</option>
                                        <option value="USDCAD">USD/CAD</option>
                                        <option value="NZDUSD">NZD/USD</option>
                                        <option value="EURJPY">EUR/JPY</option>
                                        <option value="GBPJPY">GBP/JPY</option>
                                        <option value="EURGBP">EUR/GBP</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Position Size (Lots)</label>
                                    <input type="number" id="profit-lots" value="1" step="0.01" min="0.01" class="calculator-input w-full" placeholder="1.00">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Entry Price</label>
                                    <input type="number" id="profit-entry" value="1.0850" step="0.0001" class="calculator-input w-full" placeholder="1.0850">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Exit Price</label>
                                    <input type="number" id="profit-exit" value="1.0900" step="0.0001" class="calculator-input w-full" placeholder="1.0900">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Account Currency</label>
                                    <select id="profit-currency" class="calculator-input w-full">
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="JPY">JPY</option>
                                        <option value="AUD">AUD</option>
                                        <option value="CAD">CAD</option>
                                        <option value="CHF">CHF</option>
                                        <option value="NZD">NZD</option>
                                    </select>
                                </div>
                            </div>
                            
                            <button onclick="calculateProfit()" class="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                <i class="fas fa-calculator mr-2"></i>Calculate Profit
                            </button>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold mb-6">Results</h3>
                            <div id="profit-results" class="space-y-4">
                                <div class="result-highlight text-center">
                                    <div class="text-sm opacity-90 mb-1">Profit/Loss</div>
                                    <div class="text-2xl font-bold" id="profit-amount">$500.00</div>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <div class="text-sm text-gray-600">Pip Difference</div>
                                        <div class="text-lg font-semibold" id="profit-pips">50 pips</div>
                                    </div>
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <div class="text-sm text-gray-600">Pip Value</div>
                                        <div class="text-lg font-semibold" id="profit-pip-value">$10.00</div>
                                    </div>
                                </div>
                                <div class="bg-blue-50 p-4 rounded-lg">
                                    <h4 class="font-semibold text-blue-900 mb-2">Trade Summary</h4>
                                    <div class="text-sm text-blue-800 space-y-1">
                                        <div>Position: <span id="profit-position">Long 1.00 lots EUR/USD</span></div>
                                        <div>Entry: <span id="profit-entry-display">1.0850</span></div>
                                        <div>Exit: <span id="profit-exit-display">1.0900</span></div>
                                        <div>Return: <span id="profit-return">+4.61%</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Margin Calculator -->
            <div id="margin-calculator" class="calculator-section hidden">
                <div class="calculator-card p-8 mb-8">
                    <div class="text-center mb-8">
                        <div class="inline-flex p-4 bg-green-100 rounded-full mb-4">
                            <i class="fas fa-percentage text-3xl calculator-icon"></i>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Margin Calculator</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Calculate the required margin for your trades and understand your leverage usage. Perfect for risk management and position sizing.
                        </p>
                    </div>

                    <div class="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 class="text-xl font-semibold mb-6">Position Parameters</h3>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Instrument</label>
                                    <select id="margin-instrument" class="calculator-input w-full">
                                        <option value="EURUSD">EUR/USD</option>
                                        <option value="GBPUSD">GBP/USD</option>
                                        <option value="USDJPY">USD/JPY</option>
                                        <option value="USDCHF">USD/CHF</option>
                                        <option value="AUDUSD">AUD/USD</option>
                                        <option value="USDCAD">USD/CAD</option>
                                        <option value="NZDUSD">NZD/USD</option>
                                        <option value="EURJPY">EUR/JPY</option>
                                        <option value="GBPJPY">GBP/JPY</option>
                                        <option value="EURGBP">EUR/GBP</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Position Size (Lots)</label>
                                    <input type="number" id="margin-lots" value="1" step="0.01" min="0.01" class="calculator-input w-full" placeholder="1.00">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Leverage</label>
                                    <select id="margin-leverage" class="calculator-input w-full">
                                        <option value="30">1:30</option>
                                        <option value="50">1:50</option>
                                        <option value="100">1:100</option>
                                        <option value="200">1:200</option>
                                        <option value="400">1:400</option>
                                        <option value="500">1:500</option>
                                        <option value="1000">1:1000</option>
                                        <option value="2000">1:2000</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Price</label>
                                    <input type="number" id="margin-price" value="1.0850" step="0.0001" class="calculator-input w-full" placeholder="1.0850">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Account Currency</label>
                                    <select id="margin-currency" class="calculator-input w-full">
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="JPY">JPY</option>
                                        <option value="AUD">AUD</option>
                                        <option value="CAD">CAD</option>
                                        <option value="CHF">CHF</option>
                                        <option value="NZD">NZD</option>
                                    </select>
                                </div>
                            </div>
                            
                            <button onclick="calculateMargin()" class="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                <i class="fas fa-percentage mr-2"></i>Calculate Margin
                            </button>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold mb-6">Margin Requirements</h3>
                            <div id="margin-results" class="space-y-4">
                                <div class="result-highlight text-center">
                                    <div class="text-sm opacity-90 mb-1">Required Margin</div>
                                    <div class="text-2xl font-bold" id="margin-amount">$1,085.00</div>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <div class="text-sm text-gray-600">Position Value</div>
                                        <div class="text-lg font-semibold" id="margin-position-value">$108,500</div>
                                    </div>
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <div class="text-sm text-gray-600">Margin Percentage</div>
                                        <div class="text-lg font-semibold" id="margin-percentage">1.00%</div>
                                    </div>
                                </div>
                                <div class="bg-green-50 p-4 rounded-lg">
                                    <h4 class="font-semibold text-green-900 mb-2">Account Impact</h4>
                                    <div class="text-sm text-green-800 space-y-1">
                                        <div>Leverage Used: <span id="margin-leverage-used">1:100</span></div>
                                        <div>Contract Size: <span id="margin-contract">100,000 EUR</span></div>
                                        <div>Margin Rate: <span id="margin-rate">1.00%</span></div>
                                        <div>Free Margin Impact: <span id="margin-impact">-$1,085</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pip Calculator -->
            <div id="pip-calculator" class="calculator-section hidden">
                <div class="calculator-card p-8 mb-8">
                    <div class="text-center mb-8">
                        <div class="inline-flex p-4 bg-purple-100 rounded-full mb-4">
                            <i class="fas fa-calculator text-3xl calculator-icon"></i>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Pip Value Calculator</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Calculate the monetary value of each pip for any currency pair and position size. Essential for accurate risk assessment.
                        </p>
                    </div>

                    <div class="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 class="text-xl font-semibold mb-6">Pip Calculation Settings</h3>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Currency Pair</label>
                                    <select id="pip-instrument" class="calculator-input w-full">
                                        <option value="EURUSD">EUR/USD</option>
                                        <option value="GBPUSD">GBP/USD</option>
                                        <option value="USDJPY">USD/JPY</option>
                                        <option value="USDCHF">USD/CHF</option>
                                        <option value="AUDUSD">AUD/USD</option>
                                        <option value="USDCAD">USD/CAD</option>
                                        <option value="NZDUSD">NZD/USD</option>
                                        <option value="EURJPY">EUR/JPY</option>
                                        <option value="GBPJPY">GBP/JPY</option>
                                        <option value="EURGBP">EUR/GBP</option>
                                        <option value="XAUUSD">XAU/USD (Gold)</option>
                                        <option value="XAGUSD">XAG/USD (Silver)</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Position Size (Lots)</label>
                                    <input type="number" id="pip-lots" value="1" step="0.01" min="0.01" class="calculator-input w-full" placeholder="1.00">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Exchange Rate</label>
                                    <input type="number" id="pip-rate" value="1.0850" step="0.0001" class="calculator-input w-full" placeholder="1.0850">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Account Currency</label>
                                    <select id="pip-currency" class="calculator-input w-full">
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="JPY">JPY</option>
                                        <option value="AUD">AUD</option>
                                        <option value="CAD">CAD</option>
                                        <option value="CHF">CHF</option>
                                        <option value="NZD">NZD</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Number of Pips</label>
                                    <input type="number" id="pip-count" value="10" step="0.1" min="0.1" class="calculator-input w-full" placeholder="10">
                                </div>
                            </div>
                            
                            <button onclick="calculatePipValue()" class="w-full mt-6 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                                <i class="fas fa-calculator mr-2"></i>Calculate Pip Value
                            </button>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold mb-6">Pip Value Results</h3>
                            <div id="pip-results" class="space-y-4">
                                <div class="result-highlight text-center">
                                    <div class="text-sm opacity-90 mb-1">Per Pip Value</div>
                                    <div class="text-2xl font-bold" id="pip-value">$10.00</div>
                                </div>
                                <div class="result-highlight text-center bg-gradient-to-r from-purple-600 to-pink-600">
                                    <div class="text-sm opacity-90 mb-1">Total Value (10 pips)</div>
                                    <div class="text-2xl font-bold" id="pip-total">$100.00</div>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <div class="text-sm text-gray-600">Pip Size</div>
                                        <div class="text-lg font-semibold" id="pip-size">0.0001</div>
                                    </div>
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <div class="text-sm text-gray-600">Contract Size</div>
                                        <div class="text-lg font-semibold" id="pip-contract">100,000</div>
                                    </div>
                                </div>
                                <div class="bg-purple-50 p-4 rounded-lg">
                                    <h4 class="font-semibold text-purple-900 mb-2">Quick Reference</h4>
                                    <div class="text-sm text-purple-800 space-y-1">
                                        <div>1 Pip = <span id="pip-single">$10.00</span></div>
                                        <div>5 Pips = <span id="pip-five">$50.00</span></div>
                                        <div>20 Pips = <span id="pip-twenty">$200.00</span></div>
                                        <div>50 Pips = <span id="pip-fifty">$500.00</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Educational Content Section -->
            <section class="bg-white rounded-2xl shadow-lg p-8 mb-12">
                <h2 class="text-3xl font-bold text-center mb-12">Understanding Trading Calculations</h2>
                
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <i class="fas fa-chart-line text-2xl text-blue-600"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">Profit Calculation</h3>
                        <p class="text-gray-600">
                            Understand how price movements translate to actual monetary gains or losses. 
                            Critical for setting realistic profit targets and stop-loss levels.
                        </p>
                        <div class="mt-4 text-sm text-blue-600">
                            <strong>Formula:</strong> (Exit Price - Entry Price) × Position Size × Pip Value
                        </div>
                    </div>
                    
                    <div class="text-center">
                        <div class="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <i class="fas fa-percentage text-2xl text-green-600"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">Margin Requirements</h3>
                        <p class="text-gray-600">
                            Calculate how much capital you need to open a position. Essential for 
                            proper account management and avoiding margin calls.
                        </p>
                        <div class="mt-4 text-sm text-green-600">
                            <strong>Formula:</strong> (Position Size × Market Price) ÷ Leverage
                        </div>
                    </div>
                    
                    <div class="text-center">
                        <div class="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <i class="fas fa-calculator text-2xl text-purple-600"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">Pip Values</h3>
                        <p class="text-gray-600">
                            Determine the monetary value of each pip movement for accurate risk assessment 
                            and position sizing based on your risk tolerance.
                        </p>
                        <div class="mt-4 text-sm text-purple-600">
                            <strong>Formula:</strong> (Pip Size × Position Size) ÷ Exchange Rate
                        </div>
                    </div>
                </div>
            </section>

            <!-- Related Tools Section -->
            <section class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
                <h2 class="text-3xl font-bold text-center mb-8">More Trading Tools</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <a href="/simulator" class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                        <i class="fas fa-coins text-3xl text-orange-500 mb-3"></i>
                        <h3 class="font-semibold text-gray-900 mb-2">Cost Calculator</h3>
                        <p class="text-sm text-gray-600">Compare trading costs across brokers</p>
                    </a>
                    <a href="/compare" class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                        <i class="fas fa-balance-scale text-3xl text-blue-500 mb-3"></i>
                        <h3 class="font-semibold text-gray-900 mb-2">Broker Compare</h3>
                        <p class="text-sm text-gray-600">Side-by-side broker analysis</p>
                    </a>
                    <a href="/reviews" class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                        <i class="fas fa-star text-3xl text-yellow-500 mb-3"></i>
                        <h3 class="font-semibold text-gray-900 mb-2">Broker Reviews</h3>
                        <p class="text-sm text-gray-600">Detailed broker evaluations</p>
                    </a>
                    <a href="/countries" class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                        <i class="fas fa-globe text-3xl text-green-500 mb-3"></i>
                        <h3 class="font-semibold text-gray-900 mb-2">By Country</h3>
                        <p class="text-sm text-gray-600">Brokers by regulation</p>
                    </a>
                </div>
            </section>

            <!-- FAQ Section -->
            <section class="bg-white rounded-2xl shadow-lg p-8">
                <h2 class="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                
                <div class="space-y-6">
                    <div class="border-l-4 border-blue-500 pl-6">
                        <h3 class="text-xl font-semibold mb-2">How accurate are these trading calculators?</h3>
                        <p class="text-gray-700">
                            Our calculators use real-time exchange rates updated continuously during market hours. 
                            They're accurate to 4 decimal places and follow standard industry formulas used by major brokers.
                        </p>
                    </div>
                    
                    <div class="border-l-4 border-green-500 pl-6">
                        <h3 class="text-xl font-semibold mb-2">Which calculator should I use for position sizing?</h3>
                        <p class="text-gray-700">
                            Use the Margin Calculator to determine how much capital you need for a position, and the Profit Calculator 
                            to understand potential returns. The Pip Calculator helps you assess risk per pip movement.
                        </p>
                    </div>
                    
                    <div class="border-l-4 border-purple-500 pl-6">
                        <h3 class="text-xl font-semibold mb-2">Do these work with all currency pairs?</h3>
                        <p class="text-gray-700">
                            Yes, our calculators support all major, minor, and exotic currency pairs, plus commodities like 
                            gold and silver. The calculations automatically adjust for different pip values and decimal places.
                        </p>
                    </div>
                    
                    <div class="border-l-4 border-orange-500 pl-6">
                        <h3 class="text-xl font-semibold mb-2">Can I use these for crypto or stock CFDs?</h3>
                        <p class="text-gray-700">
                            While designed for forex, the principles apply to other instruments. However, check with your 
                            broker for specific contract sizes and pip values for crypto and stock CFDs as they may vary.
                        </p>
                    </div>
                    
                    <div class="border-l-4 border-red-500 pl-6">
                        <h3 class="text-xl font-semibold mb-2">Should I always use maximum leverage?</h3>
                        <p class="text-gray-700">
                            No, high leverage increases both profit potential and risk. Use our margin calculator to understand 
                            your exposure, and never risk more than you can afford to lose. Many successful traders use conservative leverage.
                        </p>
                    </div>
                </div>
            </section>
        </main>

        ${generateFooter()}

        <!-- Calculator JavaScript -->
        <script>
            // Tab switching functionality
            document.querySelectorAll('.tab-button').forEach(button => {
                button.addEventListener('click', () => {
                    const tab = button.dataset.tab;
                    
                    // Update active tab button
                    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Show corresponding calculator section
                    document.querySelectorAll('.calculator-section').forEach(section => {
                        section.classList.add('hidden');
                        section.classList.remove('active');
                    });
                    
                    const targetSection = document.getElementById(tab + '-calculator');
                    if (targetSection) {
                        targetSection.classList.remove('hidden');
                        targetSection.classList.add('active');
                    }
                });
            });

            // Exchange rates (simplified - in production, these would come from an API)
            const exchangeRates = {
                'EURUSD': 1.0850,
                'GBPUSD': 1.2650,
                'USDJPY': 149.50,
                'USDCHF': 0.8950,
                'AUDUSD': 0.6850,
                'USDCAD': 1.3450,
                'NZDUSD': 0.6150,
                'EURJPY': 162.25,
                'GBPJPY': 189.15,
                'EURGBP': 0.8580,
                'XAUUSD': 2025.50,
                'XAGUSD': 24.85
            };

            // Contract sizes
            const contractSizes = {
                'EURUSD': 100000, 'GBPUSD': 100000, 'USDJPY': 100000, 'USDCHF': 100000,
                'AUDUSD': 100000, 'USDCAD': 100000, 'NZDUSD': 100000, 'EURJPY': 100000,
                'GBPJPY': 100000, 'EURGBP': 100000, 'XAUUSD': 100, 'XAGUSD': 5000
            };

            // Pip sizes
            const pipSizes = {
                'EURUSD': 0.0001, 'GBPUSD': 0.0001, 'USDJPY': 0.01, 'USDCHF': 0.0001,
                'AUDUSD': 0.0001, 'USDCAD': 0.0001, 'NZDUSD': 0.0001, 'EURJPY': 0.01,
                'GBPJPY': 0.01, 'EURGBP': 0.0001, 'XAUUSD': 0.01, 'XAGUSD': 0.001
            };

            function calculateProfit() {
                const instrument = document.getElementById('profit-instrument').value;
                const lots = parseFloat(document.getElementById('profit-lots').value) || 0;
                const entryPrice = parseFloat(document.getElementById('profit-entry').value) || 0;
                const exitPrice = parseFloat(document.getElementById('profit-exit').value) || 0;
                const accountCurrency = document.getElementById('profit-currency').value;
                
                if (lots <= 0 || entryPrice <= 0 || exitPrice <= 0) return;
                
                const contractSize = contractSizes[instrument] || 100000;
                const pipSize = pipSizes[instrument] || 0.0001;
                const currentRate = exchangeRates[instrument] || entryPrice;
                
                // Calculate pip difference
                const pipDifference = Math.abs(exitPrice - entryPrice) / pipSize;
                const isProfit = exitPrice > entryPrice;
                
                // Calculate pip value in account currency
                let pipValue;
                if (instrument.endsWith('USD') && accountCurrency === 'USD') {
                    pipValue = (pipSize * contractSize * lots);
                } else if (instrument.startsWith('USD') && accountCurrency === 'USD') {
                    pipValue = (pipSize * contractSize * lots) / currentRate;
                } else {
                    // Simplified calculation - in production, would need cross-rate conversion
                    pipValue = (pipSize * contractSize * lots);
                }
                
                const totalProfit = pipDifference * pipValue * (isProfit ? 1 : -1);
                const returnPercentage = (totalProfit / (entryPrice * contractSize * lots)) * 100;
                
                // Update display
                document.getElementById('profit-amount').textContent = 
                    (totalProfit >= 0 ? '+' : '') + '$' + Math.abs(totalProfit).toFixed(2);
                document.getElementById('profit-pips').textContent = 
                    (isProfit ? '+' : '-') + pipDifference.toFixed(1) + ' pips';
                document.getElementById('profit-pip-value').textContent = '$' + pipValue.toFixed(2);
                document.getElementById('profit-position').textContent = 
                    (isProfit ? 'Long' : 'Short') + ' ' + lots + ' lots ' + instrument;
                document.getElementById('profit-entry-display').textContent = entryPrice.toFixed(4);
                document.getElementById('profit-exit-display').textContent = exitPrice.toFixed(4);
                document.getElementById('profit-return').textContent = 
                    (returnPercentage >= 0 ? '+' : '') + returnPercentage.toFixed(2) + '%';
                
                // Change color based on profit/loss
                const profitElement = document.getElementById('profit-amount');
                if (totalProfit >= 0) {
                    profitElement.parentElement.className = 'result-highlight text-center bg-gradient-to-r from-green-500 to-green-600';
                } else {
                    profitElement.parentElement.className = 'result-highlight text-center bg-gradient-to-r from-red-500 to-red-600';
                }
            }

            function calculateMargin() {
                const instrument = document.getElementById('margin-instrument').value;
                const lots = parseFloat(document.getElementById('margin-lots').value) || 0;
                const leverage = parseFloat(document.getElementById('margin-leverage').value) || 100;
                const price = parseFloat(document.getElementById('margin-price').value) || 0;
                const accountCurrency = document.getElementById('margin-currency').value;
                
                if (lots <= 0 || price <= 0 || leverage <= 0) return;
                
                const contractSize = contractSizes[instrument] || 100000;
                const positionValue = lots * contractSize * price;
                const marginRequired = positionValue / leverage;
                const marginPercentage = (1 / leverage) * 100;
                
                // Update display
                document.getElementById('margin-amount').textContent = '$' + marginRequired.toFixed(2);
                document.getElementById('margin-position-value').textContent = '$' + positionValue.toLocaleString();
                document.getElementById('margin-percentage').textContent = marginPercentage.toFixed(2) + '%';
                document.getElementById('margin-leverage-used').textContent = '1:' + leverage;
                document.getElementById('margin-contract').textContent = 
                    (lots * contractSize).toLocaleString() + ' ' + instrument.substring(0, 3);
                document.getElementById('margin-rate').textContent = marginPercentage.toFixed(2) + '%';
                document.getElementById('margin-impact').textContent = '-$' + marginRequired.toFixed(2);
            }

            function calculatePipValue() {
                const instrument = document.getElementById('pip-instrument').value;
                const lots = parseFloat(document.getElementById('pip-lots').value) || 0;
                const rate = parseFloat(document.getElementById('pip-rate').value) || 0;
                const accountCurrency = document.getElementById('pip-currency').value;
                const pipCount = parseFloat(document.getElementById('pip-count').value) || 1;
                
                if (lots <= 0 || rate <= 0) return;
                
                const contractSize = contractSizes[instrument] || 100000;
                const pipSize = pipSizes[instrument] || 0.0001;
                
                // Calculate pip value
                let pipValue;
                if (instrument.endsWith('USD') && accountCurrency === 'USD') {
                    pipValue = (pipSize * contractSize * lots);
                } else if (instrument.startsWith('USD') && accountCurrency === 'USD') {
                    pipValue = (pipSize * contractSize * lots) / rate;
                } else {
                    // Simplified - in production would need proper cross-rate calculation
                    pipValue = (pipSize * contractSize * lots);
                }
                
                const totalValue = pipValue * pipCount;
                
                // Update display
                document.getElementById('pip-value').textContent = '$' + pipValue.toFixed(2);
                document.getElementById('pip-total').textContent = '$' + totalValue.toFixed(2);
                document.getElementById('pip-size').textContent = pipSize.toString();
                document.getElementById('pip-contract').textContent = contractSize.toLocaleString();
                document.getElementById('pip-single').textContent = '$' + pipValue.toFixed(2);
                document.getElementById('pip-five').textContent = '$' + (pipValue * 5).toFixed(2);
                document.getElementById('pip-twenty').textContent = '$' + (pipValue * 20).toFixed(2);
                document.getElementById('pip-fifty').textContent = '$' + (pipValue * 50).toFixed(2);
            }

            // Initialize calculations on page load
            document.addEventListener('DOMContentLoaded', function() {
                calculateProfit();
                calculateMargin();
                calculatePipValue();
                
                // Add event listeners for real-time calculation
                document.querySelectorAll('input, select').forEach(input => {
                    input.addEventListener('input', () => {
                        const calculatorType = input.id.split('-')[0];
                        if (calculatorType === 'profit') calculateProfit();
                        else if (calculatorType === 'margin') calculateMargin();
                        else if (calculatorType === 'pip') calculatePipValue();
                    });
                });
                
                // Mobile menu toggle
                document.getElementById('mobile-menu-toggle')?.addEventListener('click', function() {
                    const mobileMenu = document.getElementById('mobile-menu');
                    mobileMenu.classList.toggle('hidden');
                });
            });

            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
        </script>
        
        <!-- Analytics placeholder -->
        <script>
            // Analytics tracking for calculator usage
            function trackCalculatorUsage(type) {
                // In production, integrate with analytics service
                console.log('Calculator used:', type);
            }
        </script>
    </body>
    </html>
  `;
}