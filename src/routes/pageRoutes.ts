// Page routes for static pages, country pages, and main user interface
import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import type { Bindings } from '../types';
import { BrokerService } from '../services/brokerService';
import { generateMetaTags, generateStructuredData, getCurrentDomain } from '../utils';
import { renderLayout } from '../components/Layout.js';
import { renderHomePage } from '../components/HomePage.js';
import { renderFAQ } from '../components/FAQ.js';

const pageRoutes = new Hono<{ Bindings: Bindings }>();

// Homepage - Complete migrated version with all features
pageRoutes.get('/', (c) => {
  const homeContent = `
    ${renderHomePage()}
    ${renderFAQ()}
  `;

  return c.html(renderLayout(homeContent, {
    title: 'Best Forex Brokers 2025 - Compare 67+ Regulated Brokers | BrokerAnalysis',
    description: 'Find the perfect forex broker with our intelligent matching system. Compare spreads, regulation, and features of 67+ top-rated brokers. Get personalized recommendations now.',
    keywords: 'forex brokers, best forex brokers 2025, regulated forex brokers, forex broker comparison, forex trading, broker reviews, forex spreads, trading platforms',
    canonicalUrl: '/',
    request: c.req.raw,
    additionalHead: `
      <!-- Static CSS preload disabled for development -->
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://cdnjs.cloudflare.com">
      ${generateStructuredData({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "BrokerAnalysis",
        "url": "https://brokeranalysis.com",
        "description": "Find and compare the best forex brokers with our intelligent recommendation system. Detailed reviews, ratings, and personalized broker matching.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://brokeranalysis.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      })}
    `
  }));
});

// Reviews listing page
pageRoutes.get('/reviews', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${generateMetaTags(
          'Forex Broker Reviews 2025 - In-Depth Analysis & Ratings | BrokerAnalysis',
          'Comprehensive reviews of 12+ top forex brokers. Read detailed analysis of spreads, regulation, platforms, and features. Updated for 2025.',
          'forex broker reviews, IC Markets review, Pepperstone review, broker ratings, forex broker comparison',
          '/reviews',
          undefined,
          c.req.raw
        )}
        
        <link rel="stylesheet" href="/static/styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body class="bg-gray-50">
        ${generateNavigation()}
        
        <main class="max-w-6xl mx-auto py-12 px-4">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">Forex Broker Reviews</h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Comprehensive reviews and ratings of the world's top forex brokers. 
                    Each review includes detailed analysis of spreads, regulation, platforms, and more.
                </p>
            </div>

            <!-- Search and Filter -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="broker-search" placeholder="Search brokers..." 
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>
                    <select id="filter-regulation" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">All Regulations</option>
                        <option value="ASIC">ASIC (Australia)</option>
                        <option value="FCA">FCA (UK)</option>
                        <option value="CySEC">CySEC (Cyprus)</option>
                        <option value="CFTC">CFTC (USA)</option>
                    </select>
                    <select id="filter-min-deposit" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Any Deposit</option>
                        <option value="0">$0 - $100</option>
                        <option value="100">$100 - $500</option>
                        <option value="500">$500+</option>
                    </select>
                </div>
            </div>

            <!-- Brokers Grid -->
            <div id="brokers-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Broker cards will be loaded here -->
            </div>

            <!-- Pagination -->
            <div id="pagination" class="mt-12">
                <!-- Pagination will be loaded here -->
            </div>
        </main>

        ${generateFooter()}
        
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                loadBrokers();
                setupFilters();
            });
        </script>
    </body>
    </html>
  `);
});

// About page
pageRoutes.get('/about', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${generateMetaTags(
          'About BrokerAnalysis - Our Methodology & Team | Forex Broker Reviews',
          'Learn about our rigorous broker review methodology, rating system, and commitment to helping traders find the best forex brokers.',
          'about broker analysis, forex broker methodology, rating system, broker reviews',
          '/about',
          undefined,
          c.req.raw
        )}
        
        <link rel="stylesheet" href="/static/styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body class="bg-gray-50">
        ${generateNavigation()}
        
        <main class="max-w-4xl mx-auto py-12 px-4">
            <div class="bg-white rounded-lg shadow-sm p-8">
                <h1 class="text-4xl font-bold text-gray-900 mb-6">About BrokerAnalysis</h1>
                
                <div class="prose prose-lg max-w-none">
                    <p class="text-xl text-gray-600 mb-8">
                        BrokerAnalysis is dedicated to helping forex traders find the perfect broker through 
                        comprehensive reviews, intelligent recommendations, and transparent analysis.
                    </p>

                    <h2 class="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
                    <p>
                        We believe every trader deserves access to accurate, unbiased information about forex brokers. 
                        Our mission is to democratize broker selection by providing data-driven insights and 
                        AI-powered recommendations that match traders with brokers suited to their specific needs.
                    </p>

                    <h2 class="text-2xl font-bold mt-8 mb-4">Review Methodology</h2>
                    <p>Our comprehensive review process evaluates brokers across multiple dimensions:</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                        <div class="bg-blue-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-3">
                                <i class="fas fa-shield-alt text-blue-600 mr-2"></i>
                                Regulation & Safety (25%)
                            </h3>
                            <ul class="text-sm space-y-1">
                                <li>• Regulatory oversight quality</li>
                                <li>• Capital adequacy requirements</li>
                                <li>• Investor protection schemes</li>
                                <li>• Corporate transparency</li>
                            </ul>
                        </div>
                        
                        <div class="bg-green-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-3">
                                <i class="fas fa-chart-line text-green-600 mr-2"></i>
                                Trading Costs (25%)
                            </h3>
                            <ul class="text-sm space-y-1">
                                <li>• Spread competitiveness</li>
                                <li>• Commission structures</li>
                                <li>• Swap/rollover rates</li>
                                <li>• Hidden fees analysis</li>
                            </ul>
                        </div>
                        
                        <div class="bg-purple-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-3">
                                <i class="fas fa-desktop text-purple-600 mr-2"></i>
                                Trading Platforms (20%)
                            </h3>
                            <ul class="text-sm space-y-1">
                                <li>• Platform reliability & speed</li>
                                <li>• Available features & tools</li>
                                <li>• Mobile app quality</li>
                                <li>• Third-party integration</li>
                            </ul>
                        </div>
                        
                        <div class="bg-orange-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-3">
                                <i class="fas fa-headset text-orange-600 mr-2"></i>
                                Service & Support (15%)
                            </h3>
                            <ul class="text-sm space-y-1">
                                <li>• Customer support quality</li>
                                <li>• Educational resources</li>
                                <li>• Account management</li>
                                <li>• Market research & analysis</li>
                            </ul>
                        </div>
                        
                        <div class="bg-red-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-3">
                                <i class="fas fa-coins text-red-600 mr-2"></i>
                                Market Access (10%)
                            </h3>
                            <ul class="text-sm space-y-1">
                                <li>• Available instruments</li>
                                <li>• Market depth & liquidity</li>
                                <li>• Execution quality</li>
                                <li>• Market hours coverage</li>
                            </ul>
                        </div>
                        
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-3">
                                <i class="fas fa-user-friends text-gray-600 mr-2"></i>
                                User Experience (5%)
                            </h3>
                            <ul class="text-sm space-y-1">
                                <li>• Account opening process</li>
                                <li>• Deposit/withdrawal ease</li>
                                <li>• Website usability</li>
                                <li>• Overall user satisfaction</li>
                            </ul>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold mt-8 mb-4">Data Sources</h2>
                    <p>
                        We gather data from multiple authoritative sources to ensure accuracy and completeness:
                    </p>
                    <ul class="list-disc list-inside mt-4 space-y-2">
                        <li>Direct testing of broker platforms and services</li>
                        <li>Official regulatory filings and disclosures</li>
                        <li>Real-time spread monitoring and execution analysis</li>
                        <li>Customer feedback and industry surveys</li>
                        <li>Third-party auditing reports and certifications</li>
                    </ul>

                    <h2 class="text-2xl font-bold mt-8 mb-4">Transparency & Ethics</h2>
                    <p>
                        We maintain strict editorial independence and transparency in our review process:
                    </p>
                    <ul class="list-disc list-inside mt-4 space-y-2">
                        <li><strong>No pay-for-placement:</strong> Rankings are based solely on our objective scoring methodology</li>
                        <li><strong>Regular updates:</strong> Reviews are updated quarterly to reflect current market conditions</li>
                        <li><strong>Conflict disclosure:</strong> Any potential conflicts of interest are clearly disclosed</li>
                        <li><strong>Open methodology:</strong> Our rating criteria and weightings are publicly available</li>
                    </ul>

                    <div class="bg-blue-50 p-6 rounded-lg mt-8">
                        <h3 class="text-xl font-bold mb-2">
                            <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                            Risk Disclosure
                        </h3>
                        <p class="text-sm text-gray-700">
                            Trading forex involves significant risk and may not be suitable for all investors. 
                            The high degree of leverage can work against you as well as for you. Before deciding 
                            to trade forex, you should carefully consider your investment objectives, level of 
                            experience, and risk appetite. You should be aware of all the risks associated with 
                            trading and seek advice from an independent financial advisor if you have any doubts.
                        </p>
                    </div>
                </div>
            </div>
        </main>

        ${generateFooter()}
    </body>
    </html>
  `);
});

// Simulator page
pageRoutes.get('/simulator', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${generateMetaTags(
          'Trading Cost Calculator - Compare Forex Broker Fees & Spreads | BrokerAnalysis',
          'Calculate real trading costs across multiple brokers. Compare spreads, commissions, and total costs based on your trading strategy and volume.',
          'trading cost calculator, forex fees calculator, spread comparison, broker costs, trading simulator',
          '/simulator',
          undefined,
          c.req.raw
        )}
        
        <link rel="stylesheet" href="/static/styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body class="bg-gray-50">
        ${generateNavigation()}
        
        <main class="max-w-6xl mx-auto py-12 px-4">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">Trading Cost Calculator</h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Calculate and compare real trading costs across multiple forex brokers. 
                    Factor in your trading strategy, volume, and preferred instruments.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Calculator Input Panel -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                        <h2 class="text-xl font-semibold mb-6">Calculator Settings</h2>
                        
                        <div class="space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Trading Strategy</label>
                                <select id="strategy-select" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                                    <option value="scalping">Scalping (200+ trades/month)</option>
                                    <option value="day-trading">Day Trading (100 trades/month)</option>
                                    <option value="swing-trading" selected>Swing Trading (40 trades/month)</option>
                                    <option value="position-trading">Position Trading (10 trades/month)</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Trade Volume (USD)</label>
                                <input type="number" id="volume-input" value="100000" min="1000" max="10000000" step="1000"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                                <p class="text-xs text-gray-500 mt-1">Standard lot = $100,000</p>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Currency Pair</label>
                                <select id="instrument-select" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                                    <option value="EURUSD" selected>EUR/USD</option>
                                    <option value="GBPUSD">GBP/USD</option>
                                    <option value="USDJPY">USD/JPY</option>
                                    <option value="AUDUSD">AUD/USD</option>
                                    <option value="USDCAD">USD/CAD</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Select Brokers to Compare</label>
                                <div id="broker-checkboxes" class="space-y-2">
                                    <!-- Broker checkboxes will be loaded here -->
                                </div>
                            </div>

                            <button id="calculate-costs" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                                <i class="fas fa-calculator mr-2"></i>
                                Calculate Costs
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Results Panel -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <h2 class="text-xl font-semibold mb-6">Cost Comparison Results</h2>
                        
                        <div id="cost-results">
                            <div class="text-center py-12 text-gray-500">
                                <i class="fas fa-chart-bar text-4xl mb-4"></i>
                                <p>Configure your settings and click "Calculate Costs" to see results</p>
                            </div>
                        </div>
                    </div>

                    <!-- Strategy Information -->
                    <div class="bg-blue-50 rounded-lg p-6 mt-6">
                        <h3 class="font-semibold text-lg mb-3">
                            <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                            Understanding Trading Costs
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <h4 class="font-medium mb-2">Spreads</h4>
                                <p class="text-gray-700">The difference between bid and ask prices. Lower spreads reduce your trading costs.</p>
                            </div>
                            <div>
                                <h4 class="font-medium mb-2">Commissions</h4>
                                <p class="text-gray-700">Fixed fees charged per lot traded. Common in ECN/Raw spread accounts.</p>
                            </div>
                            <div>
                                <h4 class="font-medium mb-2">Slippage</h4>
                                <p class="text-gray-700">Price difference between expected and actual execution, especially during volatility.</p>
                            </div>
                            <div>
                                <h4 class="font-medium mb-2">Swap Rates</h4>
                                <p class="text-gray-700">Interest charges or credits for positions held overnight.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        ${generateFooter()}
        
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                initializeCalculator();
                loadBrokerOptions();
            });
        </script>
    </body>
    </html>
  `);
});

// Country-specific broker pages
const countryPages = [
  { slug: 'australia', name: 'Australia', regulator: 'ASIC' },
  { slug: 'uk', name: 'United Kingdom', regulator: 'FCA' },
  { slug: 'canada', name: 'Canada', regulator: 'IIROC' },
  { slug: 'usa', name: 'United States', regulator: 'CFTC/NFA' },
  { slug: 'south-africa', name: 'South Africa', regulator: 'FSCA' },
  { slug: 'pakistan', name: 'Pakistan', regulator: 'SECP' },
  { slug: 'philippines', name: 'Philippines', regulator: 'BSP' },
  { slug: 'india', name: 'India', regulator: 'SEBI' },
  { slug: 'malaysia', name: 'Malaysia', regulator: 'SC' },
  { slug: 'dubai', name: 'Dubai/UAE', regulator: 'DFSA' },
  { slug: 'qatar', name: 'Qatar', regulator: 'QFCRA' },
  { slug: 'indonesia', name: 'Indonesia', regulator: 'Bappebti' }
];

countryPages.forEach(country => {
  pageRoutes.get(`/brokers/${country.slug}`, (c) => {
    return c.html(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${generateMetaTags(
            `Best Forex Brokers in ${country.name} 2025 - ${country.regulator} Regulated | BrokerAnalysis`,
            `Find the best ${country.regulator}-regulated forex brokers for traders in ${country.name}. Compare spreads, features, and regulations from top-rated brokers.`,
            `forex brokers ${country.name}, ${country.regulator} regulated brokers, best forex broker ${country.name}`,
            `/brokers/${country.slug}`,
            undefined,
            c.req.raw
          )}
          
          <link rel="stylesheet" href="/static/styles.css">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      </head>
      <body class="bg-gray-50">
          ${generateNavigation()}
          
          <main class="max-w-6xl mx-auto py-12 px-4">
              <div class="text-center mb-12">
                  <h1 class="text-4xl font-bold text-gray-900 mb-4">
                      Best Forex Brokers in ${country.name}
                  </h1>
                  <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                      Discover ${country.regulator}-regulated forex brokers offering the best trading conditions 
                      for traders in ${country.name}. All brokers are thoroughly vetted for safety and reliability.
                  </p>
              </div>

              <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <div class="flex items-center mb-4">
                      <i class="fas fa-shield-alt text-green-600 text-xl mr-3"></i>
                      <h2 class="text-xl font-semibold">About ${country.regulator} Regulation</h2>
                  </div>
                  <div id="regulation-info" class="text-gray-700">
                      <!-- Regulation information will be loaded here -->
                  </div>
              </div>

              <div id="country-brokers-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <!-- Country-specific broker cards will be loaded here -->
              </div>
          </main>

          ${generateFooter()}
          
          <script>
              document.addEventListener('DOMContentLoaded', function() {
                  loadCountryBrokers('${country.slug}', '${country.regulator}');
              });
          </script>
      </body>
      </html>
    `);
  });
});

// Dashboard pages (require authentication)
pageRoutes.get('/dashboard', async (c) => {
  const sessionId = getCookie(c, 'session_id');
  if (!sessionId) {
    return c.redirect('/');
  }

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard - BrokerAnalysis</title>
        <link rel="stylesheet" href="/static/styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body class="bg-gray-50">
        ${generateNavigation()}
        
        <main class="max-w-6xl mx-auto py-12 px-4">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-star text-2xl text-yellow-500"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500">Saved Matches</p>
                            <p id="saved-matches-count" class="text-2xl font-bold text-gray-900">--</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-eye text-2xl text-blue-500"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500">Brokers Viewed</p>
                            <p class="text-2xl font-bold text-gray-900">12+</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-calculator text-2xl text-green-500"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500">Cost Calculations</p>
                            <p class="text-2xl font-bold text-gray-900">∞</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6">
                <h2 class="text-xl font-semibold mb-6">Your Broker Matches</h2>
                <div id="user-matches">
                    <!-- User matches will be loaded here -->
                </div>
            </div>
        </main>

        ${generateFooter()}
        
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                loadUserDashboard();
            });
        </script>
    </body>
    </html>
  `);
});

// SEO pages (robots.txt, sitemap.xml)
pageRoutes.get('/robots.txt', (c) => {
  const domain = getCurrentDomain(c.req.raw);
  return c.text(`User-agent: *
Allow: /

# Sitemaps
Sitemap: ${domain}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /api/auth/
Disallow: /dashboard/

# Allow all public pages
Allow: /
Allow: /reviews/
Allow: /compare
Allow: /simulator
Allow: /about
Allow: /brokers/
Allow: /api/brokers
Allow: /api/stats
`, { headers: { 'Content-Type': 'text/plain' } });
});

pageRoutes.get('/sitemap.xml', async (c) => {
  try {
    const { DB } = c.env;
    const brokerService = new BrokerService(DB);
    
    // Get all brokers for dynamic URLs
    const brokersResult = await brokerService.getAllBrokers(1, 100);
    const brokers = brokersResult.brokers;
    
    const baseUrl = getCurrentDomain(c.req.raw);
    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/reviews</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/compare</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/simulator</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;

    // Add broker review pages
    brokers.forEach(broker => {
      sitemap += `
  <url>
    <loc>${baseUrl}/reviews/${broker.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
    
    // Add country pages
    countryPages.forEach(country => {
      sitemap += `
  <url>
    <loc>${baseUrl}/brokers/${country.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    return c.text(sitemap, { 
      headers: { 
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      } 
    });
  } catch (error) {
    console.error('Sitemap error:', error);
    return c.text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: { 'Content-Type': 'application/xml' }
    });
  }
});

// Test routes
pageRoutes.get('/test-simulator', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Simulator Test - BrokerAnalysis</title>
        <link rel="stylesheet" href="/static/styles.css">
    </head>
    <body class="bg-gray-100 p-8">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold mb-6">Trading Cost Simulator Test</h1>
            <div class="bg-white rounded-lg p-6 shadow-sm">
                <p class="mb-4">Testing the enhanced trading cost calculator with real broker data.</p>
                <a href="/simulator" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Go to Simulator
                </a>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Helper functions for generating common HTML components
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
                    <a href="/reviews" class="text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
                    <a href="/compare" class="text-gray-700 hover:text-blue-600 transition-colors">Compare</a>
                    <a href="/simulator" class="text-gray-700 hover:text-blue-600 transition-colors">Calculator</a>
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
                <a href="/reviews" class="block py-2 text-gray-700">Reviews</a>
                <a href="/compare" class="block py-2 text-gray-700">Compare</a>
                <a href="/simulator" class="block py-2 text-gray-700">Calculator</a>
                <a href="/about" class="block py-2 text-gray-700">About</a>
            </div>
        </div>
    </nav>
  `;
}

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
                        <li><a href="/reviews/fp-markets" class="hover:text-white">FP Markets</a></li>
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
                        <li><a href="mailto:contact@brokeranalysis.com" class="hover:text-white">Contact</a></li>
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

export { pageRoutes };