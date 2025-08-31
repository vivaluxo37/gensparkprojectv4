// Countries Directory Page - Main countries listing with SEO optimization
import { getCurrentDomain } from '../utils';

interface Country {
  slug: string;
  name: string;
  regulator: string;
  brokerCount?: number;
  description?: string;
  flagIcon?: string;
}

export function renderCountriesDirectoryPage(countries: Country[], options: {
  canonicalUrl?: string;
  request?: Request;
} = {}): string {
  const { canonicalUrl = '/countries', request } = options;
  const domain = getCurrentDomain(request);
  
  const title = `Forex Brokers by Country 2025 - ${countries.length} Countries & Regulators | BrokerAnalysis`;
  const description = `Find forex brokers by country and regulatory jurisdiction. Compare ${countries.length} countries with ASIC, FCA, CySEC, and other regulated brokers worldwide.`;
  
  // Generate country cards HTML
  const countryCardsHTML = countries.map(country => `
    <div class="bg-white rounded-lg shadow-md border hover:shadow-lg transition-all duration-300 p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center">
          <div class="w-12 h-8 bg-gray-200 rounded border mr-4 flex items-center justify-center text-xs font-medium">
            ${country.flagIcon || country.slug.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-1">
              <a href="${['usa', 'singapore', 'dubai', 'south-africa', 'philippines', 'pakistan'].includes(country.slug) ? '/countries/' + country.slug : '/brokers/' + country.slug}" class="hover:text-blue-600 transition-colors">
                ${country.name}
              </a>
            </h3>
            <div class="text-sm text-gray-600">
              Regulated by <span class="font-medium text-blue-600">${country.regulator}</span>
            </div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500 mb-1">Brokers Available</div>
          <div class="font-semibold text-lg text-green-600">${country.brokerCount || '12+'}</div>
        </div>
      </div>
      
      <div class="mb-4">
        <p class="text-gray-700 text-sm">
          ${country.description || `Find the best ${country.regulator}-regulated forex brokers for traders in ${country.name}. Compare spreads, platforms, and trading conditions from top-rated brokers.`}
        </p>
      </div>
      
      <div class="flex gap-2">
        <a href="${['usa', 'singapore', 'dubai', 'south-africa', 'philippines', 'pakistan'].includes(country.slug) ? '/countries/' + country.slug : '/brokers/' + country.slug}" 
           class="flex-1 bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700 transition-colors font-medium text-sm">
          View Brokers
        </a>
        <a href="/regulators/${country.regulator.toLowerCase().replace('/', '-')}" 
           class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded text-center hover:bg-gray-200 transition-colors font-medium text-sm">
          ${country.regulator} Info
        </a>
      </div>
    </div>
  `).join('');

  // Generate regulatory information
  const regulatorInfo = {
    'ASIC': 'Australian Securities and Investments Commission - Strict capital requirements and investor protection',
    'FCA': 'Financial Conduct Authority (UK) - World-class regulation with comprehensive oversight',
    'CySEC': 'Cyprus Securities and Exchange Commission - EU MiFID II compliance and protection',
    'CFTC/NFA': 'US Commodity Futures Trading Commission - Rigorous oversight for US traders',
    'FSCA': 'Financial Sector Conduct Authority (South Africa) - Emerging market leader in regulation',
    'SECP': 'Securities and Exchange Commission of Pakistan - Growing regulatory framework',
    'BSP': 'Bangko Sentral ng Pilipinas - Central bank oversight in the Philippines',
    'SEBI': 'Securities and Exchange Board of India - Comprehensive financial market regulation',
    'SC': 'Securities Commission Malaysia - Islamic finance compliant regulation',
    'DFSA': 'Dubai Financial Services Authority - Middle East financial hub regulation',
    'QFCRA': 'Qatar Financial Centre Regulatory Authority - Gulf region financial oversight',
    'Bappebti': 'Commodity Futures Trading Regulatory Agency (Indonesia) - Southeast Asian regulation'
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <meta name="description" content="${description}">
        <meta name="keywords" content="forex brokers by country, regulated forex brokers, ASIC brokers, FCA brokers, CySEC brokers, international forex brokers">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${domain}/static/images/countries-directory-og.png">
        <meta property="og:url" content="${domain}/countries">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="${title}">
        <meta property="twitter:description" content="${description}">
        <meta property="twitter:image" content="${domain}/static/images/countries-directory-og.png">
        
        <link rel="canonical" href="${domain}/countries">
        
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
          "name": "Forex Brokers by Country Directory",
          "description": "Complete directory of countries with regulated forex brokers and regulatory information",
          "numberOfItems": ${countries.length},
          "itemListElement": [
            ${countries.slice(0, 10).map((country, index) => `
            {
              "@type": "ListItem",
              "position": ${index + 1},
              "item": {
                "@type": "Place",
                "name": "${country.name}",
                "url": "${domain}/brokers/${country.slug}",
                "description": "Forex brokers regulated by ${country.regulator} in ${country.name}"
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
              "name": "Countries Directory",
              "item": "${domain}/countries"
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
                            <img class="h-8 w-auto" src="/static/images/brokeranalysis-logo.svg" alt="BrokerAnalysis">
                            <span class="ml-2 text-xl font-bold text-gray-900">BrokerAnalysis</span>
                        </a>
                    </div>
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="/" class="text-gray-700 hover:text-blue-600">Home</a>
                        <a href="/brokers" class="text-gray-700 hover:text-blue-600">Brokers</a>
                        <a href="/countries" class="text-blue-600 font-medium">Countries</a>
                        <a href="/compare" class="text-gray-700 hover:text-blue-600">Compare</a>
                        <a href="/about" class="text-gray-700 hover:text-blue-600">About</a>
                        <a href="/contact" class="text-gray-700 hover:text-blue-600">Contact</a>
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
                            <span class="text-gray-900 font-medium">Countries Directory</span>
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
                    Forex Brokers by Country & Regulation
                </h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                    Find regulated forex brokers in ${countries.length} countries worldwide. Compare brokers by regulatory jurisdiction, 
                    trading conditions, and local requirements for traders in your region.
                </p>
                <div class="flex justify-center space-x-6 text-sm text-gray-500">
                    <span><i class="fas fa-globe text-blue-600 mr-1"></i> ${countries.length} Countries</span>
                    <span><i class="fas fa-shield-alt text-green-600 mr-1"></i> All Regulated</span>
                    <span><i class="fas fa-balance-scale text-purple-600 mr-1"></i> Multiple Jurisdictions</span>
                </div>
            </div>

            <!-- Filter/Sort Bar -->
            <div class="bg-white p-6 rounded-lg shadow-sm border mb-8">
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="flex items-center space-x-4">
                        <label class="text-sm font-medium text-gray-700">Filter by Regulator:</label>
                        <select class="border border-gray-300 rounded px-3 py-1 text-sm" onchange="filterByRegulator(this.value)">
                            <option value="">All Regulators</option>
                            <option value="ASIC">ASIC (Australia)</option>
                            <option value="FCA">FCA (UK)</option>
                            <option value="CySEC">CySEC (Cyprus)</option>
                            <option value="CFTC">CFTC/NFA (USA)</option>
                            <option value="FSCA">FSCA (South Africa)</option>
                            <option value="Other">Other Regulators</option>
                        </select>
                    </div>
                    <div class="text-sm text-gray-600">
                        Showing ${countries.length} countries with regulated brokers
                    </div>
                </div>
            </div>

            <!-- Countries Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                ${countryCardsHTML}
            </div>

            <!-- Regulatory Information Section -->
            <div class="mt-16 bg-white rounded-lg shadow-sm p-8">
                <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Understanding Global Forex Regulation</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${Object.entries(regulatorInfo).slice(0, 6).map(([regulator, info]) => `
                        <div class="border border-gray-200 rounded-lg p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-3">
                                <i class="fas fa-shield-alt text-blue-600 mr-2"></i>
                                ${regulator}
                            </h3>
                            <p class="text-gray-700 text-sm leading-relaxed">${info}</p>
                            <a href="/regulators/${regulator.toLowerCase().replace('/', '-')}" 
                               class="mt-3 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Learn More →
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- SEO Content Section -->
            <div class="mt-16 prose max-w-none">
                <h2 class="text-3xl font-bold text-gray-900 mb-6">How to Choose Brokers by Country & Regulation</h2>
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Regulatory Considerations</h3>
                        <ul class="space-y-3 text-gray-700">
                            <li><strong>Tier 1 Regulators:</strong> FCA (UK), ASIC (Australia), CFTC (USA) - Highest protection levels</li>
                            <li><strong>EU Regulators:</strong> CySEC (Cyprus), BaFin (Germany) - MiFID II compliance</li>
                            <li><strong>Emerging Markets:</strong> FSCA (South Africa), SEBI (India) - Growing oversight</li>
                            <li><strong>Offshore Jurisdictions:</strong> Lower capital requirements, fewer restrictions</li>
                            <li><strong>Multiple Licenses:</strong> Better protection through diversified regulation</li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Country-Specific Benefits</h3>
                        <ul class="space-y-3 text-gray-700">
                            <li><strong>Local Support:</strong> Customer service in your timezone and language</li>
                            <li><strong>Tax Implications:</strong> Understanding local tax treatment of forex trading</li>
                            <li><strong>Banking Integration:</strong> Easier deposits and withdrawals with local banks</li>
                            <li><strong>Legal Recourse:</strong> Access to local dispute resolution mechanisms</li>
                            <li><strong>Cultural Fit:</strong> Platforms and services adapted to local preferences</li>
                        </ul>
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
                            Your trusted source for forex broker reviews by country and regulation. 
                            Helping traders worldwide find compliant brokers since 2024.
                        </p>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-4">By Region</h4>
                        <div class="space-y-2 text-sm">
                            <a href="/brokers/australia" class="block text-gray-400 hover:text-white">Australia (ASIC)</a>
                            <a href="/brokers/uk" class="block text-gray-400 hover:text-white">United Kingdom (FCA)</a>
                            <a href="/brokers/usa" class="block text-gray-400 hover:text-white">United States (CFTC)</a>
                            <a href="/countries" class="block text-gray-400 hover:text-white">All Countries</a>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-4">Regulators</h4>
                        <div class="space-y-2 text-sm">
                            <a href="/regulators/asic" class="block text-gray-400 hover:text-white">ASIC Australia</a>
                            <a href="/regulators/fca" class="block text-gray-400 hover:text-white">FCA United Kingdom</a>
                            <a href="/regulators/cysec" class="block text-gray-400 hover:text-white">CySEC Cyprus</a>
                            <a href="/regulators/cftc-nfa" class="block text-gray-400 hover:text-white">CFTC/NFA USA</a>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-4">Resources</h4>
                        <div class="space-y-2 text-sm">
                            <a href="/about" class="block text-gray-400 hover:text-white">About Us</a>
                            <a href="/compare" class="block text-gray-400 hover:text-white">Compare Brokers</a>
                            <a href="/contact" class="block text-gray-400 hover:text-white">Contact</a>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; 2025 BrokerAnalysis. All rights reserved. Trading involves significant risk of loss.</p>
                </div>
            </div>
        </footer>

        <script>
            function filterByRegulator(regulator) {
                // Simple filter functionality - in production, this would be more sophisticated
                const cards = document.querySelectorAll('[data-regulator]');
                cards.forEach(card => {
                    if (!regulator || card.dataset.regulator === regulator) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        </script>
    </body>
    </html>
  `;
}