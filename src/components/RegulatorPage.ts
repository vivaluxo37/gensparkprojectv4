// Regulator-specific page component for SEO optimization
import { getCurrentDomain } from '../utils';

interface RegulatorInfo {
  name: string;
  fullName: string;
  country: string;
  website: string;
  established: number;
  description: string;
  keyFeatures: string[];
  protections: string[];
  capitalRequirements: string;
  compensationScheme: string;
  brokerCount: number;
}

export function renderRegulatorPage(regulatorInfo: RegulatorInfo, options: {
  canonicalUrl: string;
  request?: Request;
}): string {
  const { canonicalUrl, request } = options;
  const domain = getCurrentDomain(request);
  
  const title = `${regulatorInfo.name} Regulated Forex Brokers 2025 - ${regulatorInfo.country} | BrokerAnalysis`;
  const description = `Find the best ${regulatorInfo.name}-regulated forex brokers in ${regulatorInfo.country}. Compare ${regulatorInfo.brokerCount}+ ${regulatorInfo.name} licensed brokers with comprehensive analysis.`;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <meta name="description" content="${description}">
        <meta name="keywords" content="${regulatorInfo.name} forex brokers, ${regulatorInfo.name} regulated, ${regulatorInfo.country} forex brokers, ${regulatorInfo.fullName}">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${domain}/static/images/regulators/${regulatorInfo.name.toLowerCase()}-og.png">
        <meta property="og:url" content="${domain}${canonicalUrl}">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="${title}">
        <meta property="twitter:description" content="${description}">
        <meta property="twitter:image" content="${domain}/static/images/regulators/${regulatorInfo.name.toLowerCase()}-og.png">
        
        <link rel="canonical" href="${domain}${canonicalUrl}">
        
        <!-- Favicon -->
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">
        <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon-32x32.png">
        <link rel="apple-touch-icon" href="/static/images/apple-touch-icon.png">
        
        <!-- CSS -->
        <link href="/static/styles.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data - Organization Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "GovernmentOrganization",
          "name": "${regulatorInfo.fullName}",
          "alternateName": "${regulatorInfo.name}",
          "url": "${regulatorInfo.website}",
          "areaServed": {
            "@type": "Country",
            "name": "${regulatorInfo.country}"
          },
          "foundingDate": "${regulatorInfo.established}",
          "description": "${regulatorInfo.description}",
          "sameAs": [
            "${regulatorInfo.website}",
            "${domain}${canonicalUrl}"
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
              "name": "Countries",
              "item": "${domain}/countries"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "${regulatorInfo.name} (${regulatorInfo.country})",
              "item": "${domain}${canonicalUrl}"
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
                        <a href="/countries" class="text-gray-700 hover:text-blue-600">Countries</a>
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
                            <a href="/countries" class="text-gray-500 hover:text-gray-700">Countries</a>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-chevron-right text-gray-400 mx-2"></i>
                            <span class="text-gray-900 font-medium">${regulatorInfo.name} (${regulatorInfo.country})</span>
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
                    ${regulatorInfo.name} Regulated Forex Brokers
                </h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                    ${regulatorInfo.description}
                </p>
                <div class="flex justify-center space-x-6 text-sm text-gray-500">
                    <span><i class="fas fa-shield-alt text-green-600 mr-1"></i> ${regulatorInfo.brokerCount}+ Licensed Brokers</span>
                    <span><i class="fas fa-calendar text-blue-600 mr-1"></i> Est. ${regulatorInfo.established}</span>
                    <span><i class="fas fa-globe text-purple-600 mr-1"></i> ${regulatorInfo.country}</span>
                </div>
            </div>

            <!-- Regulator Information -->
            <div class="grid lg:grid-cols-3 gap-8 mb-12">
                <!-- Main Info -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-lg shadow-sm border p-8">
                        <h2 class="text-2xl font-semibold text-gray-900 mb-6">
                            About ${regulatorInfo.fullName} (${regulatorInfo.name})
                        </h2>
                        
                        <div class="prose max-w-none text-gray-700 mb-8">
                            <p>${regulatorInfo.description}</p>
                        </div>

                        <h3 class="text-xl font-semibold text-gray-900 mb-4">Key Regulatory Features</h3>
                        <div class="grid md:grid-cols-2 gap-4 mb-8">
                            ${regulatorInfo.keyFeatures.map(feature => `
                                <div class="flex items-center text-gray-700">
                                    <i class="fas fa-check-circle text-green-600 mr-3"></i>
                                    <span>${feature}</span>
                                </div>
                            `).join('')}
                        </div>

                        <h3 class="text-xl font-semibold text-gray-900 mb-4">Investor Protections</h3>
                        <div class="grid md:grid-cols-2 gap-4">
                            ${regulatorInfo.protections.map(protection => `
                                <div class="flex items-center text-gray-700">
                                    <i class="fas fa-shield-alt text-blue-600 mr-3"></i>
                                    <span>${protection}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="space-y-6">
                    <!-- Quick Facts -->
                    <div class="bg-white rounded-lg shadow-sm border p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
                        <div class="space-y-3">
                            <div>
                                <div class="text-sm text-gray-500">Full Name</div>
                                <div class="font-medium">${regulatorInfo.fullName}</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500">Established</div>
                                <div class="font-medium">${regulatorInfo.established}</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500">Capital Requirements</div>
                                <div class="font-medium">${regulatorInfo.capitalRequirements}</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500">Compensation Scheme</div>
                                <div class="font-medium">${regulatorInfo.compensationScheme}</div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500">Licensed Brokers</div>
                                <div class="font-medium text-green-600">${regulatorInfo.brokerCount}+</div>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="bg-blue-50 rounded-lg border border-blue-200 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Find ${regulatorInfo.name} Brokers</h3>
                        <div class="space-y-3">
                            <a href="/brokers?regulator=${regulatorInfo.name}" 
                               class="w-full bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700 transition-colors font-medium block">
                                View All ${regulatorInfo.name} Brokers
                            </a>
                            <a href="/compare?regulator=${regulatorInfo.name}" 
                               class="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded text-center hover:bg-gray-200 transition-colors font-medium block">
                                Compare ${regulatorInfo.name} Brokers
                            </a>
                            <a href="${regulatorInfo.website}" target="_blank" rel="noopener"
                               class="w-full bg-white text-gray-700 py-2 px-4 rounded text-center hover:bg-gray-50 transition-colors font-medium border block">
                                <i class="fas fa-external-link-alt mr-2"></i>
                                Official Website
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SEO Content -->
            <div class="mt-16 prose max-w-none">
                <h2 class="text-3xl font-bold text-gray-900 mb-6">Why Choose ${regulatorInfo.name} Regulated Brokers?</h2>
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Regulatory Advantages</h3>
                        <p class="text-gray-700 mb-4">
                            ${regulatorInfo.name} regulation provides traders with comprehensive protection through strict oversight, 
                            capital adequacy requirements, and robust dispute resolution mechanisms.
                        </p>
                        <ul class="space-y-2 text-gray-700">
                            <li>• Segregated client funds protection</li>
                            <li>• Regular financial audits and reporting</li>
                            <li>• Professional indemnity insurance requirements</li>
                            <li>• Fair dealing and market conduct rules</li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Trader Benefits</h3>
                        <p class="text-gray-700 mb-4">
                            Trading with ${regulatorInfo.name}-licensed brokers ensures access to compensation schemes, 
                            professional dispute resolution, and adherence to international best practices.
                        </p>
                        <ul class="space-y-2 text-gray-700">
                            <li>• Access to compensation funds if broker fails</li>
                            <li>• Transparent pricing and execution standards</li>
                            <li>• Regular compliance monitoring</li>
                            <li>• Professional customer service standards</li>
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
                            Your trusted source for regulatory information and broker analysis. 
                            Understanding global forex regulation since 2024.
                        </p>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-4">By Regulator</h4>
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
                            <a href="/countries" class="block text-gray-400 hover:text-white">All Countries</a>
                            <a href="/compare" class="block text-gray-400 hover:text-white">Compare Brokers</a>
                            <a href="/about" class="block text-gray-400 hover:text-white">About Us</a>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-4">Contact</h4>
                        <div class="space-y-2 text-sm">
                            <a href="/contact" class="block text-gray-400 hover:text-white">Contact Us</a>
                            <span class="block text-gray-400">support@brokeranalysis.com</span>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; 2025 BrokerAnalysis. All rights reserved. Trading involves significant risk of loss.</p>
                </div>
            </div>
        </footer>
    </body>
    </html>
  `;
}