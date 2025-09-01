// Islamic Account Brokers Page Component - 2025 SEO Optimized
import { generateStructuredData, getCurrentDomain } from '../utils';

interface IslamicAccountPageOptions {
  canonicalUrl: string;
  request: Request;
}

export function renderIslamicAccountBrokersPage(options: IslamicAccountPageOptions): string {
  const { canonicalUrl, request } = options;
  const domain = getCurrentDomain(request);

  // Islamic account brokers data from DailyForex analysis
  const islamicAccountBrokers = [
    {
      name: "FXTM",
      description: "Highly regulated broker with FCA oversight and comprehensive Islamic accounts",
      keyFeatures: [
        "Swap-free mode available for eligible MT4 accounts",
        "Upgraded MT4/MT5 platforms with 6 add-ons",
        "Proprietary mobile trading app",
        "Quality market research and education"
      ],
      islamicSpecifics: {
        swapFreeCondition: "Available for eligible account types (MT5 excluded)",
        timeLimit: "No specified time limit",
        eligibility: "Residents of certain countries only",
        restrictions: "Exotic currencies cannot be traded"
      },
      regulation: {
        primary: "FCA (UK)",
        protection: "£85,000 FSCS protection",
        additional: ["CySEC (Cyprus)", "FSC (Mauritius)"]
      },
      highlights: ["Tier-1 regulated", "Commission-based ECN pricing", "No time limits on swap-free"],
      category: "Most Regulated",
      rating: "⭐⭐⭐⭐⭐",
      pros: ["Strong regulation", "No swap-free time limits", "Quality education"],
      cons: ["Geographic restrictions", "MT5 not eligible", "Exotic pairs excluded"]
    },
    {
      name: "Pepperstone",
      description: "ECN execution specialist with 5-day swap-free period for eligible countries",
      keyFeatures: [
        "Available on commission-free Standard accounts",
        "MT4/MT5, cTrader, TradingView platforms",
        "Smart Trader Tools with 28 plugins",
        "Social trading and copy trading support"
      ],
      islamicSpecifics: {
        swapFreeCondition: "5 days swap-free, then $100 admin fee applies",
        timeLimit: "5 days before admin fees",
        eligibility: "Specific countries list (Albania, Bangladesh, Bahrain, etc.)",
        adminFee: "$100 after 5 days for Forex and precious metals"
      },
      regulation: {
        primary: "Multiple jurisdictions",
        protection: "Jurisdiction-dependent",
        additional: ["ASIC compliant execution"]
      },
      highlights: ["Great ECN execution", "Micro lot trading", "Advanced platforms"],
      category: "Best Execution",
      rating: "⭐⭐⭐⭐⭐",
      pros: ["Excellent execution", "Advanced platforms", "Social trading"],
      cons: ["5-day limit", "$100 admin fee", "Geographic restrictions"],
      eligibleCountries: ["Albania", "Bangladesh", "Bahrain", "Brunei", "Algeria", "Egypt", "Indonesia", "Jordan", "Kuwait", "Malaysia", "Pakistan", "Qatar", "Turkey", "Uzbekistan"]
    },
    {
      name: "FP Markets",
      description: "ASIC regulated ECN broker with competitive Islamic account offerings",
      keyFeatures: [
        "ECN trading model with NDD execution",
        "MT4/MT5, Web, and Iress platforms",
        "Very competitive cost structure",
        "Leverage up to 1:500 (ASIC rules)"
      ],
      islamicSpecifics: {
        swapFreeCondition: "Islamic accounts available for Muslim traders",
        timeLimit: "No specified time limit in source",
        eligibility: "Muslim traders",
        restrictions: "Geographic platform restrictions (Iress)"
      },
      regulation: {
        primary: "ASIC (Australia)",
        protection: "Australian client protections",
        additional: ["CySEC (Cyprus)", "FSA St. Vincent & Grenadines"]
      },
      highlights: ["Low minimum deposit", "ECN model", "Multiple regulators"],
      category: "Best Value",
      rating: "⭐⭐⭐⭐",
      pros: ["Competitive costs", "Strong regulation", "Platform choice"],
      cons: ["Platform restrictions", "Limited details on Islamic terms"]
    },
    {
      name: "AvaTrade",
      description: "Globally regulated broker with Islamic versions of all account types",
      keyFeatures: [
        "Islamic version of any standard account type",
        "Global regulatory coverage across 9 jurisdictions",
        "AvaAcademy educational platform",
        "Broad cross-asset selection"
      ],
      islamicSpecifics: {
        swapFreeCondition: "Islamic version of existing account types",
        timeLimit: "No specified limits",
        eligibility: "Available globally",
        structure: "Not a separate account, but Islamic version"
      },
      regulation: {
        primary: "Bank of Ireland",
        protection: "Multiple jurisdiction protections",
        additional: ["ASIC", "FSA Japan", "FSCA South Africa", "IIROC Canada", "Abu Dhabi FSRA"]
      },
      highlights: ["Global regulation", "High-quality education", "Broad platform choice"],
      category: "Most Global",
      rating: "⭐⭐⭐⭐",
      pros: ["Global coverage", "Strong education", "Multiple platforms"],
      cons: ["Costs not exceptional", "Limited Islamic-specific details"]
    },
    {
      name: "IFC Markets",
      description: "Innovative broker with NetTradeX platform and 14-day swap-free limit",
      keyFeatures: [
        "Proprietary NetTradeX platform with PQM technology",
        "14-day swap-free Islamic accounts",
        "Outstanding asset selection including synthetics",
        "Commission-free cost structure"
      ],
      islamicSpecifics: {
        swapFreeCondition: "14-day swap-free limit, automatic closure after",
        timeLimit: "14 days maximum",
        eligibility: "Available on request",
        warning: "Account cancellation for improper usage"
      },
      regulation: {
        primary: "Strong regulatory track record",
        protection: "Secure trading environment",
        additional: ["Not specified in source"]
      },
      highlights: ["Patented PQM technology", "Short-term friendly", "Competitive costs"],
      category: "Best Innovation",
      rating: "⭐⭐⭐",
      pros: ["Innovative platform", "Low costs", "Good for short-term"],
      cons: ["14-day limit only", "Forced position closure", "Usage restrictions"]
    }
  ];

  return `
        <!-- Structured Data for Islamic Account Brokers -->
        ${generateStructuredData({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Best Islamic Forex Brokers 2025",
          "description": "Comprehensive comparison of the top Halal forex brokers offering swap-free Islamic accounts for Muslim traders.",
          "url": `${domain}${canonicalUrl}`,
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": islamicAccountBrokers.length,
            "itemListElement": islamicAccountBrokers.map((broker, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "FinancialProduct",
                "name": broker.name,
                "description": broker.description,
                "category": "Islamic Forex Broker",
                "provider": {
                  "@type": "Organization",
                  "name": broker.name
                }
              }
            }))
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${domain}/`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Brokers",
                "item": `${domain}/brokers`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Best Islamic Account Brokers"
              }
            ]
          }
        })}

        <!-- Breadcrumb -->
        <div class="bg-gray-50 border-b border-gray-200">
            <div class="max-w-6xl mx-auto px-4 py-3">
                <nav class="text-sm">
                    <a href="/" class="text-blue-600 hover:text-blue-800">Home</a>
                    <span class="mx-2 text-gray-400">/</span>
                    <a href="/brokers" class="text-blue-600 hover:text-blue-800">Brokers</a>
                    <span class="mx-2 text-gray-400">/</span>
                    <span class="text-gray-600">Best Islamic Account Brokers</span>
                </nav>
            </div>
        </div>

        <main class="max-w-6xl mx-auto py-8 px-4">
            <!-- Header Section -->
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Best Islamic Forex Brokers 2025
                </h1>
                <p class="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
                    Compare the top 5 Halal forex brokers offering swap-free Islamic accounts compliant with Sharia law. 
                    Find regulated brokers with transparent conditions for Muslim traders.
                </p>
                <div class="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                    <div class="flex items-center">
                        <i class="fas fa-mosque text-green-500 mr-2"></i>
                        <span>5 Sharia-Compliant Brokers</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-hand-holding-heart text-blue-500 mr-2"></i>
                        <span>Swap-Free Accounts</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-shield-alt text-purple-500 mr-2"></i>
                        <span>Regulated & Trusted</span>
                    </div>
                </div>
            </div>

            <!-- Islamic Trading Overview -->
            <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <i class="fas fa-info-circle text-green-600 text-xl mt-1"></i>
                    </div>
                    <div class="ml-4">
                        <h2 class="text-lg font-semibold text-green-800 mb-2">What are Islamic Forex Accounts?</h2>
                        <p class="text-green-700 mb-3">
                            Islamic forex accounts (also called swap-free or Halal accounts) comply with Sharia law by eliminating 
                            interest-based overnight swap charges. Instead of earning or paying interest on leveraged positions held 
                            overnight, these accounts maintain neutral swap rates.
                        </p>
                        <div class="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <h3 class="font-medium text-green-800 mb-1">✓ Sharia Compliant Features:</h3>
                                <ul class="text-green-600 space-y-1">
                                    <li>• No interest-based swap charges</li>
                                    <li>• Immediate settlement of trades</li>
                                    <li>• Transparent fee structures</li>
                                    <li>• Available to Muslim traders globally</li>
                                </ul>
                            </div>
                            <div>
                                <h3 class="font-medium text-green-800 mb-1">⚠ Important Considerations:</h3>
                                <ul class="text-green-600 space-y-1">
                                    <li>• Time limits may apply (varies by broker)</li>
                                    <li>• Administrative fees after grace periods</li>
                                    <li>• Documentation may be required</li>
                                    <li>• Geographic restrictions possible</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Comparison Table -->
            <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div class="px-6 py-4 bg-gray-50 border-b">
                    <h2 class="text-xl font-semibold text-gray-900">
                        <i class="fas fa-table text-blue-600 mr-2"></i>
                        Islamic Account Comparison
                    </h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broker</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Swap-Free Limit</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Fees</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regulation</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="text-sm font-medium text-gray-900">FXTM</div>
                                        <div class="ml-2 text-yellow-400">⭐⭐⭐⭐⭐</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Most Regulated</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">No limit</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">None</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">FCA, CySEC</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="text-sm font-medium text-gray-900">Pepperstone</div>
                                        <div class="ml-2 text-yellow-400">⭐⭐⭐⭐⭐</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Best Execution</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5 days</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$100 after 5 days</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Multi-jurisdiction</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="text-sm font-medium text-gray-900">FP Markets</div>
                                        <div class="ml-2 text-yellow-400">⭐⭐⭐⭐</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Best Value</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Not specified</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Not specified</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ASIC, CySEC</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="text-sm font-medium text-gray-900">AvaTrade</div>
                                        <div class="ml-2 text-yellow-400">⭐⭐⭐⭐</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Most Global</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Not specified</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Not specified</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9 Jurisdictions</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="text-sm font-medium text-gray-900">IFC Markets</div>
                                        <div class="ml-2 text-yellow-400">⭐⭐⭐</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Best Innovation</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">14 days</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Auto-closure</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Strong record</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Detailed Broker Reviews -->
            <div class="space-y-8">
                ${islamicAccountBrokers.map((broker, index) => `
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-6">
                            <!-- Broker Header -->
                            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div class="flex items-center mb-2 md:mb-0">
                                    <div class="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                                        <span class="text-green-600 font-bold text-lg">${index + 1}</span>
                                    </div>
                                    <div>
                                        <h3 class="text-2xl font-bold text-gray-900">${broker.name}</h3>
                                        <div class="flex items-center">
                                            <span class="text-yellow-400 mr-2">${broker.rating}</span>
                                            <span class="text-sm text-green-600 font-medium">${broker.category}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <a href="#" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium">
                                        Open Islamic Account
                                    </a>
                                    <a href="/reviews/${broker.name.toLowerCase().replace(/\s+/g, '-')}" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm font-medium">
                                        Read Review
                                    </a>
                                </div>
                            </div>

                            <p class="text-gray-600 mb-4">${broker.description}</p>

                            <!-- Islamic Account Specifics -->
                            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                <h4 class="font-semibold text-green-800 mb-2">
                                    <i class="fas fa-mosque text-green-600 mr-2"></i>
                                    Islamic Account Terms
                                </h4>
                                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <span class="font-medium">Swap-free condition:</span>
                                        <span class="text-green-700 ml-1">${broker.islamicSpecifics.swapFreeCondition}</span>
                                    </div>
                                    <div>
                                        <span class="font-medium">Time limit:</span>
                                        <span class="text-green-700 ml-1">${broker.islamicSpecifics.timeLimit}</span>
                                    </div>
                                    <div>
                                        <span class="font-medium">Eligibility:</span>
                                        <span class="text-green-700 ml-1">${broker.islamicSpecifics.eligibility}</span>
                                    </div>
                                    ${broker.islamicSpecifics.restrictions ? `
                                    <div>
                                        <span class="font-medium">Restrictions:</span>
                                        <span class="text-green-700 ml-1">${broker.islamicSpecifics.restrictions}</span>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>

                            <!-- Regulation Info -->
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <h4 class="font-semibold text-blue-800 mb-2">
                                    <i class="fas fa-shield-alt text-blue-600 mr-2"></i>
                                    Regulation & Protection
                                </h4>
                                <div class="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span class="font-medium">Primary Regulator:</span>
                                        <span class="text-blue-700 ml-1">${broker.regulation.primary}</span>
                                    </div>
                                    <div>
                                        <span class="font-medium">Protection:</span>
                                        <span class="text-blue-700 ml-1">${broker.regulation.protection}</span>
                                    </div>
                                    ${broker.regulation.additional.length > 0 ? `
                                        <div class="md:col-span-2">
                                            <span class="font-medium">Additional:</span>
                                            <span class="text-blue-700 ml-1">${broker.regulation.additional.join(', ')}</span>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>

                            <!-- Key Features and Pros/Cons -->
                            <div class="grid md:grid-cols-3 gap-6">
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-3">Key Features</h4>
                                    <ul class="space-y-2">
                                        ${broker.keyFeatures.map(feature => `
                                            <li class="flex items-start">
                                                <i class="fas fa-check text-green-500 mr-2 mt-1 text-sm"></i>
                                                <span class="text-sm text-gray-700">${feature}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-3">Advantages</h4>
                                    <ul class="space-y-2">
                                        ${broker.pros.map(pro => `
                                            <li class="flex items-start">
                                                <i class="fas fa-plus text-green-500 mr-2 mt-1 text-sm"></i>
                                                <span class="text-sm text-gray-700">${pro}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-3">Considerations</h4>
                                    <ul class="space-y-2">
                                        ${broker.cons.map(con => `
                                            <li class="flex items-start">
                                                <i class="fas fa-minus text-orange-500 mr-2 mt-1 text-sm"></i>
                                                <span class="text-sm text-gray-700">${con}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>

                            ${broker.eligibleCountries ? `
                                <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                    <h5 class="font-medium text-yellow-800 mb-1">Eligible Countries:</h5>
                                    <p class="text-sm text-yellow-700">${broker.eligibleCountries.slice(0, 10).join(', ')}${broker.eligibleCountries.length > 10 ? ' and more...' : ''}</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Islamic Trading Guide -->
            <div class="mt-12 bg-white rounded-lg shadow-sm p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">
                    <i class="fas fa-book text-green-600 mr-2"></i>
                    Islamic Forex Trading Guide
                </h2>
                
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Sharia Compliance in Forex</h3>
                        <div class="space-y-4 text-gray-700">
                            <div class="border-l-4 border-green-500 pl-4">
                                <h4 class="font-semibold text-gray-900">Permissible Aspects</h4>
                                <ul class="mt-2 space-y-1 text-sm">
                                    <li>• Currency exchange (Sarf) is permitted</li>
                                    <li>• Immediate settlement of transactions</li>
                                    <li>• Transparent fee structures</li>
                                    <li>• Risk sharing rather than interest</li>
                                </ul>
                            </div>
                            <div class="border-l-4 border-red-500 pl-4">
                                <h4 class="font-semibold text-gray-900">Prohibited Elements</h4>
                                <ul class="mt-2 space-y-1 text-sm">
                                    <li>• Interest (Riba) in any form</li>
                                    <li>• Excessive uncertainty (Gharar)</li>
                                    <li>• Gambling (Maysir)</li>
                                    <li>• Overnight interest charges</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Choosing an Islamic Broker</h3>
                        <div class="space-y-3 text-gray-700">
                            <div class="flex items-start">
                                <i class="fas fa-hand-holding-heart text-green-500 mr-3 mt-1"></i>
                                <div>
                                    <h4 class="font-semibold">Swap-Free Conditions</h4>
                                    <p class="text-sm">Check time limits and any administrative fees that apply after grace periods.</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <i class="fas fa-certificate text-blue-500 mr-3 mt-1"></i>
                                <div>
                                    <h4 class="font-semibold">Sharia Certification</h4>
                                    <p class="text-sm">Look for brokers with Islamic finance scholars' certification or endorsement.</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <i class="fas fa-shield-check text-purple-500 mr-3 mt-1"></i>
                                <div>
                                    <h4 class="font-semibold">Regulation & Protection</h4>
                                    <p class="text-sm">Ensure the broker is regulated by reputable financial authorities.</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <i class="fas fa-eye text-orange-500 mr-3 mt-1"></i>
                                <div>
                                    <h4 class="font-semibold">Transparency</h4>
                                    <p class="text-sm">All fees and conditions should be clearly disclosed upfront.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- FAQ Section -->
            <div class="mt-12 bg-white rounded-lg shadow-sm p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">
                    <i class="fas fa-question-circle text-blue-600 mr-2"></i>
                    Islamic Account FAQ
                </h2>
                
                <div class="space-y-6">
                    <div class="border-l-4 border-green-500 pl-6">
                        <h3 class="font-semibold text-gray-900 mb-2">Are Islamic forex accounts truly Sharia compliant?</h3>
                        <p class="text-gray-700">Most Islamic accounts eliminate interest-based swaps, making them compliant with the prohibition of Riba. However, some scholars recommend additional verification of the broker's overall business practices.</p>
                    </div>
                    
                    <div class="border-l-4 border-blue-500 pl-6">
                        <h3 class="font-semibold text-gray-900 mb-2">Do Islamic accounts have higher costs?</h3>
                        <p class="text-gray-700">Some brokers may impose administrative fees or wider spreads on Islamic accounts. FXTM and AvaTrade offer competitive terms, while others like Pepperstone charge $100 after 5 days.</p>
                    </div>
                    
                    <div class="border-l-4 border-purple-500 pl-6">
                        <h3 class="font-semibold text-gray-900 mb-2">Can I hold positions overnight in Islamic accounts?</h3>
                        <p class="text-gray-700">Yes, but terms vary. FXTM allows unlimited holding, Pepperstone gives 5 days free, and IFC Markets automatically closes positions after 14 days. Check specific broker conditions.</p>
                    </div>
                    
                    <div class="border-l-4 border-orange-500 pl-6">
                        <h3 class="font-semibold text-gray-900 mb-2">What documentation is required for Islamic accounts?</h3>
                        <p class="text-gray-700">Requirements vary by broker. Some may request proof of faith or residency in eligible countries. FXTM and Pepperstone have geographic restrictions, while others are more open.</p>
                    </div>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="mt-12 text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white">
                <h2 class="text-2xl font-bold mb-4">Ready for Halal Forex Trading?</h2>
                <p class="text-green-100 mb-6 max-w-2xl mx-auto">
                    Choose a Sharia-compliant broker that aligns with your Islamic values. 
                    Start trading with confidence knowing your account adheres to Islamic principles.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/compare" class="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Compare Islamic Accounts
                    </a>
                    <a href="#" class="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors">
                        Learn About Islamic Trading
                    </a>
                </div>
            </div>
        </main>
  `;
}