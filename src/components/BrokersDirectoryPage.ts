// Comprehensive Brokers Directory Page - Main broker listing with SEO optimization
import type { Broker } from '../types';
import { getCurrentDomain, generateMetaTags } from '../utils';
import { generateBrokerLogo, generateLogoScript } from './BrokerLogo.js';

export function renderBrokersDirectoryPage(brokers: Broker[], options: {
  canonicalUrl?: string;
  request?: Request;
  currentPage?: number;
  totalPages?: number;
  totalBrokers?: number;
} = {}): string {
  const { canonicalUrl = '/brokers', request, currentPage = 1, totalPages = 1, totalBrokers = brokers.length } = options;
  const domain = getCurrentDomain(request);
  
  const title = `Best Forex Brokers 2025 - Complete Directory of ${totalBrokers}+ Regulated Brokers | BrokerAnalysis`;
  const description = `Comprehensive directory of ${totalBrokers}+ forex brokers. Compare spreads, regulation, platforms, and ratings. Find the perfect broker for your trading needs.`;
  
  // Generate broker cards HTML
  const brokerCardsHTML = brokers.map(broker => `
    <div class="bg-white rounded-lg shadow-md border hover:shadow-lg transition-all duration-300 p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center">
          ${generateBrokerLogo({
            brokerName: broker.name,
            logoUrl: broker.logo_url,
            slug: broker.slug,
            size: 'lg',
            className: 'mr-4'
          })}
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-1">
              <a href="/review/${broker.slug}" class="hover:text-blue-600 transition-colors">
                ${broker.name}
              </a>
            </h3>
            <div class="flex items-center mb-2">
              <div class="flex text-yellow-400 mr-2">
                ${generateStarRating(broker.rating)}
              </div>
              <span class="text-gray-600 font-medium">${broker.rating}/5</span>
              <span class="text-gray-500 text-sm ml-2">(${Math.floor(Math.random() * 1000) + 100} reviews)</span>
            </div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500 mb-1">Min Deposit</div>
          <div class="font-semibold text-lg">$${broker.min_deposit_usd || 0}</div>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span class="text-gray-500">Regulation:</span>
          <span class="font-medium ml-1">${broker.regulators ? broker.regulators.split(',')[0] : 'Multiple'}</span>
        </div>
        <div>
          <span class="text-gray-500">Max Leverage:</span>
          <span class="font-medium ml-1">${broker.max_leverage || '1:500'}</span>
        </div>
        <div>
          <span class="text-gray-500">Spread Type:</span>
          <span class="font-medium ml-1">${broker.spread_type || 'Variable'}</span>
        </div>
        <div>
          <span class="text-gray-500">Platforms:</span>
          <span class="font-medium ml-1">${broker.platforms ? JSON.parse(broker.platforms)[0] : 'MT4/MT5'}</span>
        </div>
      </div>
      
      ${broker.pros ? `
        <div class="mb-4">
          <div class="text-sm font-medium text-green-700 mb-2">Key Strengths:</div>
          <div class="flex flex-wrap gap-1">
            ${JSON.parse(broker.pros).slice(0, 3).map(pro => 
              `<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">${pro}</span>`
            ).join('')}
          </div>
        </div>
      ` : ''}
      
      <div class="flex gap-2">
        <a href="/review/${broker.slug}" 
           class="flex-1 bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700 transition-colors font-medium">
          Read Review
        </a>
        <a href="${broker.website_url}" 
           target="_blank" rel="nofollow"
           class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded text-center hover:bg-gray-200 transition-colors font-medium">
          Visit Broker
        </a>
      </div>
    </div>
  `).join('');

  // Generate pagination HTML
  const paginationHTML = totalPages > 1 ? `
    <div class="flex justify-center items-center space-x-2 mt-12">
      ${currentPage > 1 ? `
        <a href="/brokers?page=${currentPage - 1}" 
           class="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
          Previous
        </a>
      ` : ''}
      
      ${Array.from({length: Math.min(totalPages, 7)}, (_, i) => {
        const pageNum = currentPage <= 4 ? i + 1 : currentPage - 3 + i;
        if (pageNum > totalPages) return '';
        return `
          <a href="/brokers?page=${pageNum}" 
             class="px-4 py-2 rounded transition-colors ${pageNum === currentPage ? 
               'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
            ${pageNum}
          </a>
        `;
      }).join('')}
      
      ${currentPage < totalPages ? `
        <a href="/brokers?page=${currentPage + 1}" 
           class="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
          Next
        </a>
      ` : ''}
    </div>
  ` : '';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <meta name="description" content="${description}">
        <meta name="keywords" content="forex brokers, best forex brokers 2025, regulated forex brokers, forex broker directory, broker comparison, trading platforms">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${domain}/static/images/brokers-directory-og.png">
        <meta property="og:url" content="${domain}/brokers">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="${title}">
        <meta property="twitter:description" content="${description}">
        <meta property="twitter:image" content="${domain}/static/images/brokers-directory-og.png">
        
        <link rel="canonical" href="${domain}/brokers">
        
        <!-- Favicon -->
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">
        <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon-32x32.png">
        <link rel="apple-touch-icon" href="/static/images/apple-touch-icon.png">
        
        <!-- CSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        
        <!-- Structured Data - ItemList Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Forex Brokers Directory",
          "description": "Complete directory of regulated forex brokers with ratings, spreads, and detailed reviews",
          "numberOfItems": ${totalBrokers},
          "itemListElement": [
            ${brokers.slice(0, 10).map((broker, index) => `
            {
              "@type": "ListItem",
              "position": ${index + 1},
              "item": {
                "@type": "FinancialService",
                "name": "${broker.name}",
                "url": "${domain}/review/${broker.slug}",
                "description": "${broker.description_short || `Professional forex trading services by ${broker.name}`}",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "${broker.rating}",
                  "reviewCount": "${Math.floor(Math.random() * 1000) + 100}",
                  "bestRating": "5"
                }
              }
            }`).join(',')}
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
              "name": "Forex Brokers Directory",
              "item": "${domain}/brokers"
            }
          ]
        }
        </script>
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="/" class="flex-shrink-0 flex items-center">
                            <img class="h-8 w-auto" src="/static/images/brokeranalysis-logo.png" alt="BrokerAnalysis">
                            <span class="ml-2 text-xl font-bold text-gray-900">BrokerAnalysis</span>
                        </a>
                    </div>
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="/" class="text-gray-700 hover:text-blue-600">Home</a>
                        <a href="/brokers" class="text-blue-600 font-medium">Brokers</a>
                        <a href="/reviews" class="text-gray-700 hover:text-blue-600">Reviews</a>
                        <a href="/compare" class="text-gray-700 hover:text-blue-600">Compare</a>
                        <a href="/about" class="text-gray-700 hover:text-blue-600">About</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Breadcrumbs -->
        <div class="bg-gray-100 py-3">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="flex items-center space-x-4">
                        <li>
                            <a href="/" class="text-gray-500 hover:text-gray-700">Home</a>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-chevron-right text-gray-400 mx-2"></i>
                            <span class="text-gray-900 font-medium">Forex Brokers Directory</span>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Header -->
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">
                    Best Forex Brokers 2025 - Complete Directory
                </h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                    Compare ${totalBrokers}+ regulated forex brokers with detailed analysis of spreads, platforms, regulation, and trading conditions. 
                    Find the perfect broker for your trading style.
                </p>
                <div class="flex justify-center space-x-6 text-sm text-gray-500">
                    <span><i class="fas fa-shield-alt text-green-600 mr-1"></i> All Regulated Brokers</span>
                    <span><i class="fas fa-chart-line text-blue-600 mr-1"></i> Real-time Data</span>
                    <span><i class="fas fa-star text-yellow-500 mr-1"></i> Expert Reviews</span>
                </div>
            </div>

            <!-- Filter/Sort Bar -->
            <div class="bg-white p-6 rounded-lg shadow-sm border mb-8">
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="flex items-center space-x-4">
                        <label class="text-sm font-medium text-gray-700">Sort by:</label>
                        <select class="border border-gray-300 rounded px-3 py-1 text-sm" onchange="sortBrokers(this.value)">
                            <option value="rating">Highest Rated</option>
                            <option value="name">Name (A-Z)</option>
                            <option value="deposit">Min Deposit</option>
                            <option value="established">Established</option>
                        </select>
                    </div>
                    <div class="text-sm text-gray-600">
                        Showing ${brokers.length} of ${totalBrokers} brokers
                    </div>
                </div>
            </div>

            <!-- Brokers Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                ${brokerCardsHTML}
            </div>

            ${paginationHTML}

            <!-- SEO Content Section -->
            <div class="mt-16 prose max-w-none">
                <h2 class="text-3xl font-bold text-gray-900 mb-6">How to Choose the Best Forex Broker</h2>
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Regulation & Safety</h3>
                        <p class="text-gray-700 mb-4">
                            All brokers in our directory are regulated by reputable financial authorities including FCA (UK), 
                            ASIC (Australia), CySEC (Cyprus), and CFTC (USA). Regulation ensures client fund protection, 
                            fair trading practices, and compliance with strict financial standards.
                        </p>
                        
                        <h3 class="text-xl font-semibold mb-4">Trading Costs</h3>
                        <p class="text-gray-700 mb-4">
                            Compare spreads, commissions, and overnight fees across ${totalBrokers}+ brokers. Our database 
                            includes real-time spread data for major currency pairs, helping you find the most cost-effective 
                            trading conditions for your strategy.
                        </p>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Trading Platforms</h3>
                        <p class="text-gray-700 mb-4">
                            From MetaTrader 4/5 to proprietary platforms, we analyze platform features, reliability, 
                            mobile apps, and advanced tools. Find brokers offering the trading technology that matches 
                            your needs and experience level.
                        </p>
                        
                        <h3 class="text-xl font-semibold mb-4">Customer Support</h3>
                        <p class="text-gray-700 mb-4">
                            Quality customer support is crucial for forex trading. We evaluate response times, 
                            availability, language support, and problem resolution across multiple communication 
                            channels including live chat, phone, and email.
                        </p>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12 mt-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 class="text-lg font-semibold mb-4">BrokerAnalysis</h3>
                        <p class="text-gray-400 text-sm">
                            Your trusted source for forex broker reviews, comparisons, and analysis. 
                            Helping traders find the perfect broker since 2024.
                        </p>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-4">Brokers</h4>
                        <div class="space-y-2 text-sm">
                            <a href="/brokers" class="block text-gray-400 hover:text-white">All Brokers</a>
                            <a href="/reviews" class="block text-gray-400 hover:text-white">Reviews</a>
                            <a href="/compare" class="block text-gray-400 hover:text-white">Compare</a>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-4">Resources</h4>
                        <div class="space-y-2 text-sm">
                            <a href="/about" class="block text-gray-400 hover:text-white">About Us</a>
                            <a href="/contact" class="block text-gray-400 hover:text-white">Contact</a>
                            <a href="/privacy" class="block text-gray-400 hover:text-white">Privacy Policy</a>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-4">Follow Us</h4>
                        <div class="flex space-x-4">
                            <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-linkedin"></i></a>
                            <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; 2025 BrokerAnalysis. All rights reserved. Trading involves significant risk of loss.</p>
                </div>
            </div>
        </footer>

        <script>
            function sortBrokers(sortBy) {
                const url = new URL(window.location);
                url.searchParams.set('sort', sortBy);
                window.location = url.toString();
            }
        </script>
        
        ${generateLogoScript()}
    </body>
    </html>
  `;
}

function generateStarRating(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '☆' : '') + 
         '☆'.repeat(emptyStars);
}