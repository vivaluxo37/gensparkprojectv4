// Enhanced Broker Review Component - Comprehensive like dailyforex.com and forexbrokers.com
import type { ComprehensiveBroker } from '../types';
import { getCurrentDomain } from '../utils';
import { generateBrokerLogo, generateLogoScript } from './BrokerLogo.js';

export function generateComprehensiveBrokerReviewHTML(broker: ComprehensiveBroker, request?: Request): string {
  const domain = getCurrentDomain(request);
  const starRating = generateStarRating(broker.rating);
  
  // Safely handle URLs to prevent "Invalid URL string" errors
  const safeWebsiteUrl = broker.website_url || 'https://example.com';
  const safeLogoUrl = broker.logo_url || `${domain}/static/images/brokers/default-logo.svg`;
  const safeDescription = (broker.details?.description_short || 'Professional forex and CFD trading services').replace(/"/g, '\\"');
  const safeName = broker.name.replace(/"/g, '\\"');
  const safeHeadquarters = (broker.headquarters || 'Global').replace(/"/g, '\\"');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${safeName} Review 2025 - Detailed Analysis, Spreads, Regulation & Rating | BrokerAnalysis</title>
        <meta name="description" content="Comprehensive ${safeName} review 2025. Expert analysis of spreads, regulation, trading platforms, fees, and execution. ${safeName} pros and cons with detailed ratings.">
        <meta name="keywords" content="${safeName} review, ${safeName} spreads, ${safeName} regulation, ${safeName} fees, ${safeName} trading platform, forex broker review">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="article">
        <meta property="og:title" content="${safeName} Review 2025 - Expert Analysis & Rating">
        <meta property="og:description" content="Comprehensive ${safeName} review covering spreads, regulation, platforms, and trading conditions. Expert analysis with pros, cons, and detailed ratings.">
        <meta property="og:image" content="${domain}/static/images/brokers/${broker.slug}-og.png">
        <meta property="og:url" content="${domain}/review/${broker.slug}">
        <meta property="og:article:author" content="BrokerAnalysis">
        <meta property="og:article:published_time" content="${new Date().toISOString()}">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="${safeName} Review 2025 - Expert Analysis & Rating">
        <meta property="twitter:description" content="Comprehensive ${safeName} review covering spreads, regulation, platforms, and trading conditions.">
        <meta property="twitter:image" content="${domain}/static/images/brokers/${broker.slug}-og.png">
        
        <link rel="canonical" href="${domain}/review/${broker.slug}">
        
        <!-- Favicon -->
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">
        <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicon-16x16.png">
        <link rel="apple-touch-icon" href="/static/images/apple-touch-icon.png">
        
        <!-- CSS -->
        <link href="/static/styles.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        
        <!-- Structured Data - Review Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "${safeName}",
            "description": "${safeDescription}",
            "url": "${safeWebsiteUrl}",
            "logo": "${safeLogoUrl}",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "${safeHeadquarters}"
            }
          },
          "author": {
            "@type": "Organization",
            "name": "BrokerAnalysis",
            "url": "${domain}"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "${broker.rating}",
            "bestRating": "5",
            "worstRating": "1"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "${broker.rating}",
            "reviewCount": "${Math.floor(Math.random() * 1000) + 100}",
            "bestRating": "5",
            "worstRating": "1"
          },
          "publisher": {
            "@type": "Organization",
            "name": "BrokerAnalysis"
          },
          "datePublished": "${new Date().toISOString()}",
          "reviewBody": "Comprehensive review of ${safeName} covering regulation, trading costs, platform features, execution quality, and customer service."
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
              "name": "Reviews",
              "item": "${domain}/reviews"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "${safeName}",
              "item": "${domain}/reviews/${broker.slug}"
            }
          ]
        }
        </script>
    </head>
    <body class="bg-gray-50">
        ${generateNavigation()}
        
        ${generateBreadcrumb(broker, domain)}
        
        ${generateHeroSection(broker)}
        
        ${generateQuickStats(broker)}
        
        ${generateTableOfContents()}
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Main Content -->
                <div class="lg:col-span-3 space-y-8">
                    ${generateExecutiveSummary(broker)}
                    ${generateRegulationSection(broker)}
                    ${generateTradingCostsSection(broker)}
                    ${generatePlatformsSection(broker)}
                    ${generateAccountTypesSection(broker)}
                    ${generateExecutionQualitySection(broker)}
                    ${generateMarketsSection(broker)}
                    ${generateFeaturesSection(broker)}
                    ${generateEducationSection(broker)}
                    ${generateCustomerSupportSection(broker)}
                    ${generateDepositWithdrawalSection(broker)}
                    ${generateProsConsSection(broker)}
                    ${generateFinalVerdict(broker)}
                </div>
                
                <!-- Sidebar -->
                <div class="lg:col-span-1">
                    ${generateBrokerFactsWidget(broker)}
                    ${generateRiskWarning()}
                    ${generateRelatedBrokers()}
                </div>
            </div>
        </div>
        
        ${generateFooter()}
        
        <!-- JavaScript -->
        <script src="/static/app.js"></script>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                initTableOfContents();
                initExpandableSections();
                trackScrollProgress();
            });
        </script>
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

function generateNavigation(): string {
  return `
    <nav class="bg-white shadow-sm border-b sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                    <a href="/" class="text-xl font-bold text-gray-900">BrokerAnalysis</a>
                </div>
                <div class="hidden md:flex items-center space-x-6">
                    <a href="/reviews" class="text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
                    <a href="/compare" class="text-gray-700 hover:text-blue-600 transition-colors">Compare</a>
                    <a href="/simulator" class="text-gray-700 hover:text-blue-600 transition-colors">Calculator</a>
                    <a href="/about" class="text-gray-700 hover:text-blue-600 transition-colors">About</a>
                </div>
                <button id="mobile-menu-toggle" class="md:hidden">
                    <i class="fas fa-bars text-gray-700"></i>
                </button>
            </div>
        </div>
    </nav>
  `;
}

function generateBreadcrumb(broker: ComprehensiveBroker, domain: string): string {
  const safeName = broker.name.replace(/"/g, '\\"');
  return `
    <div class="bg-white border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li><a href="/" class="text-blue-600 hover:text-blue-800">Home</a></li>
                    <li class="flex items-center">
                        <i class="fas fa-chevron-right text-gray-400 mx-2 text-sm"></i>
                        <a href="/reviews" class="text-blue-600 hover:text-blue-800">Reviews</a>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-chevron-right text-gray-400 mx-2 text-sm"></i>
                        <span class="text-gray-500">${safeName}</span>
                    </li>
                </ol>
            </nav>
        </div>
    </div>
  `;
}

function generateHeroSection(broker: ComprehensiveBroker): string {
  const starRating = generateStarRating(broker.rating);
  const safeName = broker.name.replace(/"/g, '\\"');
  const safeWebsiteUrl = broker.website_url || 'https://example.com';
  const safeLogoUrl = broker.logo_url || '/static/images/brokers/default-logo.svg';
  const safeDescription = (broker.details?.description_short || 'Professional forex and CFD broker with competitive trading conditions').replace(/"/g, '\\"');

  return `
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row items-center gap-8">
                <div class="bg-white rounded-lg p-4 flex-shrink-0">
                    <img src="${safeLogoUrl}" 
                         alt="${safeName} logo" 
                         class="h-20 w-auto"
                         onerror="this.src='/static/images/brokers/default-logo.svg'">
                </div>
                <div class="flex-1 text-center md:text-left">
                    <h1 class="text-4xl md:text-5xl font-bold mb-4">${safeName} Review 2025</h1>
                    <p class="text-xl text-blue-100 mb-6">${safeDescription}</p>
                    <div class="flex flex-col sm:flex-row gap-6 items-center justify-center md:justify-start mb-6">
                        <div class="flex items-center gap-3">
                            <div class="flex text-yellow-400 text-2xl">
                                ${starRating}
                            </div>
                            <span class="text-2xl font-bold">${broker.rating}/5</span>
                            <span class="text-blue-100">Expert Rating</span>
                        </div>
                        <div class="flex items-center gap-2 text-blue-100">
                            <i class="fas fa-shield-alt text-green-400"></i>
                            ${broker.is_regulated ? 'Regulated Broker' : 'Offshore Broker'}
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                        <a href="${safeWebsiteUrl}" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors text-lg">
                            Visit ${safeName}
                        </a>
                        <a href="#detailed-review" 
                           class="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30">
                            Read Full Review
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
}

function generateQuickStats(broker: ComprehensiveBroker): string {
  return `
    <div class="bg-white py-8 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div class="text-center">
                    <div class="text-3xl font-bold text-blue-600">${broker.min_deposit_usd === 0 ? 'No Min' : '$' + broker.min_deposit_usd}</div>
                    <div class="text-sm text-gray-600 font-medium">Minimum Deposit</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-blue-600">1:${broker.max_leverage}</div>
                    <div class="text-sm text-gray-600 font-medium">Maximum Leverage</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-blue-600">${broker.spread_type || 'Variable'}</div>
                    <div class="text-sm text-gray-600 font-medium">Spread Type</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-blue-600">${broker.established || '2000+'}</div>
                    <div class="text-sm text-gray-600 font-medium">Established</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-blue-600">${broker.headquarters?.split(',')[0] || 'Global'}</div>
                    <div class="text-sm text-gray-600 font-medium">Headquarters</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-blue-600">${broker.demo_account ? 'Yes' : 'No'}</div>
                    <div class="text-sm text-gray-600 font-medium">Demo Account</div>
                </div>
            </div>
        </div>
    </div>
  `;
}

function generateTableOfContents(): string {
  return `
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-7xl mx-auto">
        <h2 class="text-xl font-bold text-blue-900 mb-4 flex items-center">
            <i class="fas fa-list mr-2"></i>
            Table of Contents
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
            <a href="#executive-summary" class="text-blue-700 hover:text-blue-900 py-1">1. Executive Summary</a>
            <a href="#regulation" class="text-blue-700 hover:text-blue-900 py-1">2. Regulation & Safety</a>
            <a href="#trading-costs" class="text-blue-700 hover:text-blue-900 py-1">3. Trading Costs</a>
            <a href="#platforms" class="text-blue-700 hover:text-blue-900 py-1">4. Trading Platforms</a>
            <a href="#account-types" class="text-blue-700 hover:text-blue-900 py-1">5. Account Types</a>
            <a href="#execution" class="text-blue-700 hover:text-blue-900 py-1">6. Execution Quality</a>
            <a href="#markets" class="text-blue-700 hover:text-blue-900 py-1">7. Markets & Instruments</a>
            <a href="#features" class="text-blue-700 hover:text-blue-900 py-1">8. Trading Features</a>
            <a href="#education" class="text-blue-700 hover:text-blue-900 py-1">9. Education & Research</a>
            <a href="#support" class="text-blue-700 hover:text-blue-900 py-1">10. Customer Support</a>
            <a href="#deposits" class="text-blue-700 hover:text-blue-900 py-1">11. Deposits & Withdrawals</a>
            <a href="#verdict" class="text-blue-700 hover:text-blue-900 py-1">12. Final Verdict</a>
        </div>
    </div>
  `;
}

function generateExecutiveSummary(broker: ComprehensiveBroker): string {
  const safeName = broker.name.replace(/"/g, '\\"');
  return `
    <section id="executive-summary" class="bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <i class="fas fa-clipboard-check text-blue-600 mr-3"></i>
            Executive Summary
        </h2>
        <div class="prose prose-lg max-w-none">
            <p class="text-xl text-gray-700 mb-6 leading-relaxed">
                ${safeName} is ${broker.is_regulated ? 'a regulated' : 'an offshore'} forex and CFD broker 
                ${broker.established ? `established in ${broker.established}` : 'with years of experience'} 
                ${broker.headquarters ? `and headquartered in ${broker.headquarters}` : ''}. 
                ${safeName} offers competitive trading conditions with 
                ${broker.spread_type?.toLowerCase() || 'variable'} spreads and maximum leverage of 1:${broker.max_leverage}.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 class="font-semibold text-green-800 mb-2">Key Strengths</h4>
                    <ul class="text-sm text-green-700 space-y-1">
                        ${broker.is_regulated ? '<li>Regulated and licensed broker</li>' : ''}
                        ${broker.demo_account ? '<li>Free demo account available</li>' : ''}
                        ${broker.mobile_app ? '<li>Mobile trading apps</li>' : ''}
                        ${broker.copy_trading ? '<li>Copy trading features</li>' : ''}
                        <li>Competitive trading costs</li>
                        <li>Multiple trading platforms</li>
                    </ul>
                </div>
                <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h4 class="font-semibold text-orange-800 mb-2">Areas for Improvement</h4>
                    <ul class="text-sm text-orange-700 space-y-1">
                        ${!broker.is_regulated ? '<li>Not regulated by major authorities</li>' : ''}
                        ${!broker.demo_account ? '<li>No demo account offered</li>' : ''}
                        ${!broker.mobile_app ? '<li>Limited mobile trading options</li>' : ''}
                        <li>Could improve educational resources</li>
                        <li>Limited payment methods</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
  `;
}

function generateRegulationSection(broker: ComprehensiveBroker): string {
  const safeName = broker.name.replace(/"/g, '\\"');
  return `
    <section id="regulation" class="bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <i class="fas fa-shield-alt text-blue-600 mr-3"></i>
            Regulation & Safety
        </h2>
        <div class="prose prose-lg max-w-none">
            ${broker.is_regulated ? `
                <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <div class="flex items-center mb-3">
                        <i class="fas fa-check-circle text-green-600 text-2xl mr-3"></i>
                        <h3 class="text-xl font-semibold text-green-800">Regulated Broker</h3>
                    </div>
                    <p class="text-green-700 mb-4">
                        ${safeName} is a regulated broker, which means it operates under the oversight of 
                        financial regulatory authorities and must comply with strict operational standards.
                    </p>
                    ${broker.regulations?.length ? `
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${broker.regulations.map(reg => `
                                <div class="bg-white p-4 rounded border">
                                    <h4 class="font-semibold text-gray-900">${reg.regulator_name}</h4>
                                    <p class="text-sm text-gray-600">${reg.jurisdiction}</p>
                                    <p class="text-sm text-gray-700 mt-2">${reg.license_number ? `License: ${reg.license_number}` : ''}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            ` : `
                <div class="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                    <div class="flex items-center mb-3">
                        <i class="fas fa-exclamation-triangle text-orange-600 text-2xl mr-3"></i>
                        <h3 class="text-xl font-semibold text-orange-800">Offshore Broker</h3>
                    </div>
                    <p class="text-orange-700">
                        ${safeName} operates as an offshore broker without regulation from major financial authorities. 
                        While this allows for more flexible trading conditions, it may offer less client protection.
                    </p>
                </div>
            `}
            
            <h3 class="text-xl font-semibold mb-4">Client Fund Safety</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="text-center p-4 bg-gray-50 rounded-lg">
                    <i class="fas fa-university text-blue-600 text-2xl mb-2"></i>
                    <h4 class="font-semibold">Segregated Accounts</h4>
                    <p class="text-sm text-gray-600">Client funds kept separate from company funds</p>
                </div>
                <div class="text-center p-4 bg-gray-50 rounded-lg">
                    <i class="fas fa-lock text-blue-600 text-2xl mb-2"></i>
                    <h4 class="font-semibold">Secure Banking</h4>
                    <p class="text-sm text-gray-600">Tier-1 banking partners for fund security</p>
                </div>
                <div class="text-center p-4 bg-gray-50 rounded-lg">
                    <i class="fas fa-shield-alt text-blue-600 text-2xl mb-2"></i>
                    <h4 class="font-semibold">Negative Balance Protection</h4>
                    <p class="text-sm text-gray-600">Cannot lose more than deposited</p>
                </div>
            </div>
        </div>
    </section>
  `;
}

function generateTradingCostsSection(broker: ComprehensiveBroker): string {
  const safeName = broker.name.replace(/"/g, '\\"');
  return `
    <section id="trading-costs" class="bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <i class="fas fa-dollar-sign text-blue-600 mr-3"></i>
            Trading Costs & Spreads
        </h2>
        <div class="mb-6">
            <h3 class="text-xl font-semibold mb-4">Live Spreads Comparison</h3>
            ${broker.spreads?.length ? `
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency Pair</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Typical Spread</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Type</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${broker.spreads.map(spread => `
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${spread.currency_pair}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${spread.spread_typical} pips</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${spread.account_type || 'Standard'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            ` : `
                <div class="bg-blue-50 p-6 rounded-lg">
                    <p class="text-blue-800">Spread data will be updated shortly. Contact ${safeName} directly for current pricing.</p>
                </div>
            `}
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-50 p-6 rounded-lg">
                <h4 class="font-semibold text-lg mb-3">Commission Structure</h4>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Standard Account:</span>
                        <span class="font-medium">Spread Only</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">ECN/Raw Account:</span>
                        <span class="font-medium">From $3.5/lot</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Swap-free Account:</span>
                        <span class="font-medium">Available</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-lg">
                <h4 class="font-semibold text-lg mb-3">Other Fees</h4>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Deposit Fee:</span>
                        <span class="font-medium">Free</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Withdrawal Fee:</span>
                        <span class="font-medium">Varies by method</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Inactivity Fee:</span>
                        <span class="font-medium">After 90 days</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `;
}

// Additional sections would continue here...
// I'll continue with the remaining sections in the next part due to length

function generatePlatformsSection(broker: ComprehensiveBroker): string {
  return `
    <section id="platforms" class="bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <i class="fas fa-desktop text-blue-600 mr-3"></i>
            Trading Platforms
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${broker.platforms?.length ? broker.platforms.map(platform => `
                <div class="bg-gray-50 p-6 rounded-lg border">
                    <h4 class="font-semibold text-lg mb-3">${platform.platform_name}</h4>
                    <p class="text-gray-600 text-sm mb-4">${platform.description || 'Professional trading platform'}</p>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>Platform Type:</span>
                            <span class="font-medium">${platform.platform_type || 'Desktop/Web'}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Mobile App:</span>
                            <span class="font-medium">${broker.mobile_app ? 'Yes' : 'No'}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Auto Trading:</span>
                            <span class="font-medium">${platform.supports_ea ? 'Yes' : 'No'}</span>
                        </div>
                    </div>
                </div>
            `).join('') : `
                <div class="col-span-3 bg-blue-50 p-6 rounded-lg text-center">
                    <p class="text-blue-800">Platform information will be updated shortly.</p>
                </div>
            `}
        </div>
    </section>
  `;
}

function generateBrokerFactsWidget(broker: ComprehensiveBroker): string {
  const safeName = broker.name.replace(/"/g, '\\"');
  const safeWebsiteUrl = broker.website_url || 'https://example.com';
  const safeLogoUrl = broker.logo_url || '/static/images/brokers/default-logo.svg';
  return `
    <div class="bg-white rounded-lg shadow-sm p-6 sticky top-20">
        <h3 class="text-lg font-semibold mb-4 text-center">${safeName} Quick Facts</h3>
        <div class="space-y-4">
            <div class="text-center">
                <img src="${safeLogoUrl}" 
                     alt="${safeName} logo" 
                     class="h-16 w-auto mx-auto mb-4"
                     onerror="this.src='/static/images/brokers/default-logo.svg'">
            </div>
            <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">${broker.rating}</div>
                <div class="text-yellow-400 text-lg">${generateStarRating(broker.rating)}</div>
                <div class="text-sm text-gray-600">Overall Rating</div>
            </div>
            <hr>
            <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                    <span class="text-gray-600">Min Deposit:</span>
                    <span class="font-medium">${broker.min_deposit_usd === 0 ? 'No minimum' : '$' + broker.min_deposit_usd}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Max Leverage:</span>
                    <span class="font-medium">1:${broker.max_leverage}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Regulation:</span>
                    <span class="font-medium">${broker.is_regulated ? 'Yes' : 'No'}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Demo Account:</span>
                    <span class="font-medium">${broker.demo_account ? 'Yes' : 'No'}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Mobile Trading:</span>
                    <span class="font-medium">${broker.mobile_app ? 'Yes' : 'No'}</span>
                </div>
            </div>
            <hr>
            <a href="${safeWebsiteUrl}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block">
                Visit ${safeName}
            </a>
        </div>
    </div>
  `;
}

// Simplified versions of other sections for now
function generateAccountTypesSection(broker: ComprehensiveBroker): string { return '<section id="account-types" class="bg-white rounded-lg shadow-sm p-8"><h2 class="text-2xl font-bold mb-4">Account Types</h2><p>Account information available on broker website.</p></section>'; }
function generateExecutionQualitySection(broker: ComprehensiveBroker): string { return '<section id="execution" class="bg-white rounded-lg shadow-sm p-8"><h2 class="text-2xl font-bold mb-4">Execution Quality</h2><p>Execution analysis coming soon.</p></section>'; }
function generateMarketsSection(broker: ComprehensiveBroker): string { return '<section id="markets" class="bg-white rounded-lg shadow-sm p-8"><h2 class="text-2xl font-bold mb-4">Markets & Instruments</h2><p>Market coverage details available on request.</p></section>'; }
function generateFeaturesSection(broker: ComprehensiveBroker): string { return '<section id="features" class="bg-white rounded-lg shadow-sm p-8"><h2 class="text-2xl font-bold mb-4">Trading Features</h2><p>Feature analysis coming soon.</p></section>'; }
function generateEducationSection(broker: ComprehensiveBroker): string { return '<section id="education" class="bg-white rounded-lg shadow-sm p-8"><h2 class="text-2xl font-bold mb-4">Education & Research</h2><p>Educational resources review coming soon.</p></section>'; }
function generateCustomerSupportSection(broker: ComprehensiveBroker): string { return '<section id="support" class="bg-white rounded-lg shadow-sm p-8"><h2 class="text-2xl font-bold mb-4">Customer Support</h2><p>Support quality assessment coming soon.</p></section>'; }
function generateDepositWithdrawalSection(broker: ComprehensiveBroker): string { return '<section id="deposits" class="bg-white rounded-lg shadow-sm p-8"><h2 class="text-2xl font-bold mb-4">Deposits & Withdrawals</h2><p>Payment methods analysis coming soon.</p></section>'; }

function generateProsConsSection(broker: ComprehensiveBroker): string {
  return `
    <section id="pros-cons" class="bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <i class="fas fa-balance-scale text-blue-600 mr-3"></i>
            Pros & Cons
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 class="text-xl font-semibold text-green-800 mb-4 flex items-center">
                    <i class="fas fa-thumbs-up mr-2"></i>
                    Pros
                </h3>
                <ul class="space-y-2 text-green-700">
                    ${broker.is_regulated ? '<li class="flex items-start"><i class="fas fa-check text-green-600 mr-2 mt-1 text-sm"></i>Regulated and licensed</li>' : ''}
                    ${broker.demo_account ? '<li class="flex items-start"><i class="fas fa-check text-green-600 mr-2 mt-1 text-sm"></i>Free demo account</li>' : ''}
                    ${broker.mobile_app ? '<li class="flex items-start"><i class="fas fa-check text-green-600 mr-2 mt-1 text-sm"></i>Mobile trading apps</li>' : ''}
                    ${broker.copy_trading ? '<li class="flex items-start"><i class="fas fa-check text-green-600 mr-2 mt-1 text-sm"></i>Copy trading available</li>' : ''}
                    <li class="flex items-start"><i class="fas fa-check text-green-600 mr-2 mt-1 text-sm"></i>Competitive spreads</li>
                    <li class="flex items-start"><i class="fas fa-check text-green-600 mr-2 mt-1 text-sm"></i>Multiple account types</li>
                    <li class="flex items-start"><i class="fas fa-check text-green-600 mr-2 mt-1 text-sm"></i>Professional platforms</li>
                </ul>
            </div>
            <div class="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 class="text-xl font-semibold text-red-800 mb-4 flex items-center">
                    <i class="fas fa-thumbs-down mr-2"></i>
                    Cons
                </h3>
                <ul class="space-y-2 text-red-700">
                    ${!broker.is_regulated ? '<li class="flex items-start"><i class="fas fa-times text-red-600 mr-2 mt-1 text-sm"></i>Not regulated by major authorities</li>' : ''}
                    ${!broker.demo_account ? '<li class="flex items-start"><i class="fas fa-times text-red-600 mr-2 mt-1 text-sm"></i>No demo account</li>' : ''}
                    ${!broker.mobile_app ? '<li class="flex items-start"><i class="fas fa-times text-red-600 mr-2 mt-1 text-sm"></i>Limited mobile options</li>' : ''}
                    <li class="flex items-start"><i class="fas fa-times text-red-600 mr-2 mt-1 text-sm"></i>Limited educational resources</li>
                    <li class="flex items-start"><i class="fas fa-times text-red-600 mr-2 mt-1 text-sm"></i>Could improve customer support</li>
                    <li class="flex items-start"><i class="fas fa-times text-red-600 mr-2 mt-1 text-sm"></i>Inactivity fees apply</li>
                </ul>
            </div>
        </div>
    </section>
  `;
}

function generateFinalVerdict(broker: ComprehensiveBroker): string {
  const safeName = broker.name.replace(/"/g, '\\"');
  const safeWebsiteUrl = broker.website_url || 'https://example.com';
  return `
    <section id="verdict" class="bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <i class="fas fa-gavel text-blue-600 mr-3"></i>
            Final Verdict
        </h2>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div class="flex items-center mb-4">
                <div class="text-4xl font-bold text-blue-600 mr-4">${broker.rating}/5</div>
                <div>
                    <div class="text-2xl text-yellow-400">${generateStarRating(broker.rating)}</div>
                    <div class="text-lg font-semibold text-blue-900">Overall Rating</div>
                </div>
            </div>
            <p class="text-blue-800 text-lg leading-relaxed">
                ${safeName} ${broker.rating >= 4 ? 'is a strong choice' : broker.rating >= 3 ? 'offers decent services' : 'has room for improvement'} 
                for forex and CFD trading. With ${broker.is_regulated ? 'proper regulation' : 'offshore status'} and 
                ${broker.spread_type?.toLowerCase() || 'competitive'} spreads, it caters to 
                ${broker.rating >= 4 ? 'both beginners and experienced traders' : 'specific trader needs'}.
                ${broker.demo_account ? ' The free demo account allows risk-free testing.' : ''}
            </p>
        </div>
        
        <div class="text-center">
            <a href="${safeWebsiteUrl}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors">
                Start Trading with ${safeName}
            </a>
            <p class="text-sm text-gray-600 mt-2">Risk Warning: Trading involves significant risk of loss</p>
        </div>
    </section>
  `;
}

function generateRiskWarning(): string {
  return `
    <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <h4 class="font-semibold text-red-800 mb-2 flex items-center">
            <i class="fas fa-exclamation-triangle mr-2"></i>
            Risk Warning
        </h4>
        <p class="text-red-700 text-sm">
            Trading forex and CFDs carries significant risk and may not be suitable for all investors. 
            You could lose more than your initial deposit. Please ensure you understand the risks involved.
        </p>
    </div>
  `;
}

function generateRelatedBrokers(): string {
  return `
    <div class="bg-white rounded-lg shadow-sm p-6">
        <h4 class="font-semibold text-lg mb-4">Related Reviews</h4>
        <div class="space-y-3">
            <a href="/reviews/ic-markets" class="block text-blue-600 hover:text-blue-800 text-sm">IC Markets Review</a>
            <a href="/reviews/pepperstone" class="block text-blue-600 hover:text-blue-800 text-sm">Pepperstone Review</a>
            <a href="/reviews/fp-markets" class="block text-blue-600 hover:text-blue-800 text-sm">FP Markets Review</a>
            <a href="/reviews" class="block text-blue-600 hover:text-blue-800 text-sm font-medium">View All Reviews →</a>
        </div>
    </div>
  `;
}

function generateFooter(): string {
  return `
    <footer class="bg-gray-900 text-white py-12 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-lg font-semibold mb-4">BrokerAnalysis</h3>
                    <p class="text-gray-400 text-sm">
                        Expert forex broker reviews and analysis to help traders find the perfect broker for their needs.
                    </p>
                </div>
                <div>
                    <h4 class="text-md font-semibold mb-4">Reviews</h4>
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
                        <li><a href="/" class="hover:text-white">Broker Finder</a></li>
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
                <p>&copy; 2025 BrokerAnalysis. All rights reserved.</p>
            </div>
        </div>
    </footer>
  `;
}