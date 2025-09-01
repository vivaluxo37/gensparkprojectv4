// Broker Review Component
import type { ComprehensiveBroker } from '../types';

export function generateBrokerReviewHTML(broker: ComprehensiveBroker): string {
  const starRating = '★'.repeat(Math.floor(broker.rating)) + 
    (broker.rating % 1 !== 0 ? '☆' : '') + 
    '☆'.repeat(5 - Math.ceil(broker.rating));

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${broker.name} Review 2025 - Detailed Analysis & Rating | BrokerAnalysis</title>
        <meta name="description" content="Comprehensive ${broker.name} review covering spreads, regulation, platforms, and trading conditions. Expert analysis with pros, cons, and detailed ratings.">
        <meta name="keywords" content="${broker.name} review, ${broker.name} spreads, ${broker.name} regulation, forex broker review, ${broker.slug}">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="article">
        <meta property="og:title" content="${broker.name} Review 2025 - Detailed Analysis & Rating">
        <meta property="og:description" content="Comprehensive ${broker.name} review covering spreads, regulation, platforms, and trading conditions.">
        <meta property="og:image" content="https://brokeranalysis.com/static/images/brokers/${broker.slug}-og.png">
        <meta property="og:url" content="https://brokeranalysis.com/reviews/${broker.slug}">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="${broker.name} Review 2025 - Detailed Analysis & Rating">
        <meta property="twitter:description" content="Comprehensive ${broker.name} review covering spreads, regulation, platforms, and trading conditions.">
        <meta property="twitter:image" content="https://brokeranalysis.com/static/images/brokers/${broker.slug}-og.png">
        
        <link rel="canonical" href="https://brokeranalysis.com/reviews/${broker.slug}">
        <link href="/static/styles.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data - Review Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "FinancialService",
            "name": "${broker.name}",
            "description": "${broker.description_short || broker.details?.description_short || 'Forex and CFD broker'}",
            "url": "${broker.website_url}",
            "logo": "${broker.logo_url}"
          },
          "author": {
            "@type": "Organization",
            "name": "BrokerAnalysis"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "${broker.rating}",
            "bestRating": "5",
            "worstRating": "1"
          },
          "publisher": {
            "@type": "Organization",
            "name": "BrokerAnalysis"
          },
          "datePublished": "${new Date().toISOString()}"
        }
        </script>
    </head>
    <body class="bg-blue-50 text-blue-900">
        ${generateNavigation()}
        
        ${generateBreadcrumb(broker)}
        
        ${generateHeroSection(broker)}
        
        ${generateQuickFacts(broker)}
        
        ${generateMainContent(broker)}
        
        ${generateFooterCTA(broker)}
        
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    </body>
    </html>
  `;
}

function generateNavigation(): string {
  return `
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                    <a href="/" class="text-xl font-bold text-blue-900">BrokerAnalysis</a>
                </div>
                <div class="hidden md:flex items-center space-x-6">
                    <a href="/reviews" class="text-blue-800 hover:text-blue-600 transition-colors">Reviews</a>
                    <a href="/compare" class="text-blue-800 hover:text-blue-600 transition-colors">Compare</a>
                    <a href="/simulator" class="text-blue-800 hover:text-blue-600 transition-colors">Simulator</a>
                    <a href="/about" class="text-blue-800 hover:text-blue-600 transition-colors">About</a>
                </div>
            </div>
        </div>
    </nav>
  `;
}

function generateBreadcrumb(broker: ComprehensiveBroker): string {
  return `
    <!-- Breadcrumb -->
    <div class="bg-white border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li><a href="/" class="text-blue-600 hover:text-primary">Home</a></li>
                    <li class="flex items-center">
                        <i class="fas fa-chevron-right text-gray-400 mx-2 text-sm"></i>
                        <a href="/reviews" class="text-blue-600 hover:text-primary">Reviews</a>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-chevron-right text-gray-400 mx-2 text-sm"></i>
                        <span class="text-gray-500">${broker.name}</span>
                    </li>
                </ol>
            </nav>
        </div>
    </div>
  `;
}

function generateHeroSection(broker: ComprehensiveBroker): string {
  const starRating = '★'.repeat(Math.floor(broker.rating)) + 
    (broker.rating % 1 !== 0 ? '☆' : '') + 
    '☆'.repeat(5 - Math.ceil(broker.rating));

  return `
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row items-center gap-6">
                <div class="bg-white rounded-lg p-4 flex-shrink-0">
                    <img src="${broker.logo_url}" alt="${broker.name} logo" class="h-16 w-auto" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzEwNzNkYyIvPgo8dGV4dCB4PSIzMiIgeT0iMzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPiR7YnJva2VyLm5hbWUuc3Vic3RyaW5nKDAsIDIpfTwvdGV4dD4KPC9zdmc+Cg=='">
                </div>
                <div class="flex-1 text-center md:text-left">
                    <h1 class="text-4xl font-bold mb-2">${broker.name} Review 2025</h1>
                    <p class="text-xl text-blue-100 mb-4">${broker.details?.description_short || 'Professional forex and CFD broker review'}</p>
                    <div class="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                        <div class="flex items-center gap-2">
                            <div class="flex text-yellow-400 text-xl">
                                ${starRating}
                            </div>
                            <span class="text-xl font-semibold">${broker.rating}/${broker.rating_scale}</span>
                        </div>
                        <div class="text-blue-100">
                            <i class="fas fa-shield-alt mr-2"></i>
                            ${broker.is_regulated ? 'Regulated Broker' : 'Unregulated'}
                        </div>
                    </div>
                </div>
                <div class="flex-shrink-0">
                    <a href="${broker.website_url}" target="_blank" rel="noopener" 
                       class="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                        Visit ${broker.name}
                    </a>
                </div>
            </div>
        </div>
    </div>
  `;
}

function generateQuickFacts(broker: ComprehensiveBroker): string {
  return `
    <!-- Quick Facts -->
    <div class="bg-white py-6 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600">${broker.min_deposit_usd === 0 ? 'No Min' : '$' + broker.min_deposit_usd}</div>
                    <div class="text-sm text-gray-600">Min Deposit</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600">${broker.max_leverage}</div>
                    <div class="text-sm text-gray-600">Max Leverage</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600">${broker.spread_type}</div>
                    <div class="text-sm text-gray-600">Spread Type</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600">${broker.established}</div>
                    <div class="text-sm text-gray-600">Founded</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600">${broker.headquarters?.split(',')[0] || 'N/A'}</div>
                    <div class="text-sm text-gray-600">Headquarters</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600">${broker.demo_account ? 'Yes' : 'No'}</div>
                    <div class="text-sm text-gray-600">Demo Account</div>
                </div>
            </div>
        </div>
    </div>
  `;
}

function generateMainContent(broker: ComprehensiveBroker): string {
  return `
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid lg:grid-cols-3 gap-8">
            <!-- Review Content -->
            <div class="lg:col-span-2">
                ${generateExecutiveSummary(broker)}
                ${generateProsAndCons(broker)}
                ${generateSpreadsTable(broker)}
                ${generateTradingPlatforms(broker)}
                ${generateRegulationInfo(broker)}
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-1">
                ${generateBrokerDetails(broker)}
                ${generateCTABox(broker)}
            </div>
        </div>
    </div>
  `;
}

function generateExecutiveSummary(broker: ComprehensiveBroker): string {
  return `
    <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-bold mb-4">Executive Summary</h2>
        <div class="prose max-w-none">
            <p class="text-lg leading-relaxed mb-4">
                ${broker.details?.description_long || `${broker.name} is a professional forex and CFD broker offering competitive trading conditions to clients worldwide. Established in ${broker.established}, the broker has built a reputation for reliable service and competitive pricing.`}
            </p>
        </div>
    </section>
  `;
}

function generateProsAndCons(broker: ComprehensiveBroker): string {
  if (!broker.details?.pros_text || !broker.details?.cons_text) return '';

  const pros = broker.details.pros_text.split('|');
  const cons = broker.details.cons_text.split('|');

  return `
    <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-bold mb-6">Pros and Cons</h2>
        <div class="grid md:grid-cols-2 gap-6">
            <div>
                <h3 class="text-lg font-semibold text-green-700 mb-3 flex items-center">
                    <i class="fas fa-check-circle mr-2"></i>Pros
                </h3>
                <ul class="space-y-2">
                    ${pros.map(pro => `
                    <li class="flex items-start">
                        <i class="fas fa-plus text-green-500 mt-1 mr-2 text-sm"></i>
                        <span class="text-gray-700">${pro.trim()}</span>
                    </li>
                    `).join('')}
                </ul>
            </div>
            <div>
                <h3 class="text-lg font-semibold text-red-700 mb-3 flex items-center">
                    <i class="fas fa-times-circle mr-2"></i>Cons
                </h3>
                <ul class="space-y-2">
                    ${cons.map(con => `
                    <li class="flex items-start">
                        <i class="fas fa-minus text-red-500 mt-1 mr-2 text-sm"></i>
                        <span class="text-gray-700">${con.trim()}</span>
                    </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    </section>
  `;
}

function generateSpreadsTable(broker: ComprehensiveBroker): string {
  if (!broker.spreads || broker.spreads.length === 0) return '';

  return `
    <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-bold mb-6">Spreads & Trading Costs</h2>
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="border-b">
                        <th class="text-left py-2">Currency Pair</th>
                        <th class="text-left py-2">Account Type</th>
                        <th class="text-left py-2">Avg Spread</th>
                        <th class="text-left py-2">Commission</th>
                    </tr>
                </thead>
                <tbody>
                    ${broker.spreads.map(spread => `
                    <tr class="border-b">
                        <td class="py-2 font-semibold">${spread.currency_pair}</td>
                        <td class="py-2">${spread.account_type}</td>
                        <td class="py-2">${spread.spread_avg} pips</td>
                        <td class="py-2">$${spread.commission_per_lot}/lot</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </section>
  `;
}

function generateTradingPlatforms(broker: ComprehensiveBroker): string {
  if (!broker.platforms || broker.platforms.length === 0) return '';

  return `
    <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-bold mb-6">Trading Platforms</h2>
        <div class="grid gap-4">
            ${broker.platforms.map((platform: any) => `
            <div class="border rounded-lg p-4 ${platform.primary_platform ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="font-semibold text-lg">${platform.name}</h3>
                    ${platform.primary_platform ? '<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Primary</span>' : ''}
                </div>
                <p class="text-gray-600 text-sm mb-3">${platform.description || ''}</p>
                <div class="flex flex-wrap gap-2">
                    ${platform.mobile_available ? '<span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Mobile</span>' : ''}
                    ${platform.api_available ? '<span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">API</span>' : ''}
                    ${platform.algo_trading ? '<span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Algo Trading</span>' : ''}
                </div>
            </div>
            `).join('')}
        </div>
    </section>
  `;
}

function generateRegulationInfo(broker: ComprehensiveBroker): string {
  if (!broker.regulations || broker.regulations.length === 0) return '';

  return `
    <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-bold mb-6">Regulation & Safety</h2>
        <div class="space-y-4">
            ${broker.regulations.map(reg => `
            <div class="border-l-4 border-green-500 bg-green-50 p-4">
                <h3 class="font-semibold text-green-800">${reg.regulator_name}</h3>
                <p class="text-green-700">License: ${reg.license_number}</p>
                <p class="text-green-700">Jurisdiction: ${reg.jurisdiction}</p>
                ${reg.regulatory_url ? `<a href="${reg.regulatory_url}" target="_blank" class="text-green-600 hover:underline text-sm">View License</a>` : ''}
            </div>
            `).join('')}
        </div>
    </section>
  `;
}

function generateBrokerDetails(broker: ComprehensiveBroker): string {
  return `
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 class="text-lg font-semibold mb-4">Broker Details</h3>
        <dl class="space-y-3">
            <div>
                <dt class="text-sm font-medium text-gray-500">Website</dt>
                <dd class="text-sm">
                    <a href="${broker.website_url}" target="_blank" rel="noopener" class="text-blue-600 hover:underline">
                        ${broker.website_url}
                    </a>
                </dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">Founded</dt>
                <dd class="text-sm">${broker.established}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">Headquarters</dt>
                <dd class="text-sm">${broker.headquarters}</dd>
            </div>
            ${broker.details?.client_count ? `
            <div>
                <dt class="text-sm font-medium text-gray-500">Clients</dt>
                <dd class="text-sm">${broker.details.client_count.toLocaleString()}+</dd>
            </div>
            ` : ''}
            ${broker.details?.company_type ? `
            <div>
                <dt class="text-sm font-medium text-gray-500">Company Type</dt>
                <dd class="text-sm">${broker.details.company_type}</dd>
            </div>
            ` : ''}
        </dl>
    </div>
  `;
}

function generateCTABox(broker: ComprehensiveBroker): string {
  return `
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white text-center">
        <h3 class="text-xl font-bold mb-2">Ready to Trade?</h3>
        <p class="text-blue-100 mb-4">Join thousands of traders with ${broker.name}</p>
        <a href="${broker.website_url}" target="_blank" rel="noopener" 
           class="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors inline-block">
            Open Account with ${broker.name}
        </a>
    </div>
  `;
}

function generateFooterCTA(broker: ComprehensiveBroker): string {
  return `
    <!-- Call to Action -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 py-12">
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-white mb-4">Ready to Start Trading with ${broker.name}?</h2>
            <p class="text-xl text-blue-100 mb-8">Join thousands of traders who have chosen ${broker.name} for their forex trading needs.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="${broker.website_url}" target="_blank" rel="noopener" 
                   class="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                    Open Account with ${broker.name}
                </a>
                <a href="/compare" 
                   class="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                    Compare More Brokers
                </a>
            </div>
        </div>
    </div>
  `;
}