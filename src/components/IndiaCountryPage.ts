import { generateBrokerLogo } from './BrokerLogo.js';

interface IndiaBroker {
  name: string;
  slug: string;
  rating: number;
  minDeposit: string;
  regulators: string[];
  spreads: string;
  platforms: string[];
  features: string[];
  trustScore: number;
  yearEstablished: number;
  instruments: string;
  maxLeverage: string;
  commission: string;
  accountTypes: string[];
  paymentMethods: string[];
  customerSupport: string;
  bonusOffer?: string;
  website: string;
  riskWarning: string;
}

export function renderIndiaCountryPage(options: {
  canonicalUrl?: string;
  request?: Request;
} = {}): string {
  const indiaBrokers: IndiaBroker[] = [
    {
      name: 'XM Group',
      slug: 'xm-group',
      rating: 4.4,
      minDeposit: '₹1,000',
      regulators: ['CySEC', 'ASIC', 'IFSC'],
      spreads: '1.0 pips',
      platforms: ['MT4', 'MT5', 'XM WebTrader'],
      features: ['Zero Commission', 'No Requotes', 'Expert Advisors', 'Copy Trading'],
      trustScore: 91,
      yearEstablished: 2009,
      instruments: '1000+ Instruments',
      maxLeverage: '888:1',
      commission: 'Commission-free',
      accountTypes: ['Micro', 'Standard', 'XM Zero'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'Skrill', 'Neteller', 'UPI', 'Paytm'],
      customerSupport: '24/5 Multilingual Support',
      bonusOffer: '100% deposit bonus up to ₹50,000',
      website: 'https://www.xm.com/in',
      riskWarning: 'CFDs are complex instruments with high risk of losing money.'
    },
    {
      name: 'Exness',
      slug: 'exness',
      rating: 4.5,
      minDeposit: '₹200',
      regulators: ['FCA', 'CySEC', 'FSA'],
      spreads: '0.3 pips',
      platforms: ['MT4', 'MT5', 'Exness Terminal'],
      features: ['Unlimited Leverage', 'Instant Execution', 'Expert Advisors', 'Social Trading'],
      trustScore: 92,
      yearEstablished: 2008,
      instruments: '200+ Instruments',
      maxLeverage: 'Unlimited',
      commission: 'Ultra-low',
      accountTypes: ['Standard', 'Pro', 'Zero', 'Raw Spread'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'Crypto', 'Perfect Money', 'UPI'],
      customerSupport: '24/7 Multilingual Support',
      website: 'https://www.exness.com/in',
      riskWarning: 'CFDs are leveraged products and involve significant risk.'
    },
    {
      name: 'OctaFX',
      slug: 'octafx',
      rating: 4.3,
      minDeposit: '₹250',
      regulators: ['CySEC', 'FCA', 'SVG FSA'],
      spreads: '0.6 pips',
      platforms: ['MT4', 'MT5', 'OctaFX Trading App'],
      features: ['ECN Execution', 'Copy Trading', 'Cashback Program', 'Free VPS'],
      trustScore: 89,
      yearEstablished: 2011,
      instruments: '300+ Markets',
      maxLeverage: '500:1',
      commission: 'Commission-free',
      accountTypes: ['Micro', 'Pro'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'Neteller', 'Skrill', 'Perfect Money'],
      customerSupport: '24/5 Live Chat Support',
      bonusOffer: '50% deposit bonus up to ₹25,000',
      website: 'https://www.octafx.com/in',
      riskWarning: 'Trading CFDs involves significant risk of losing money.'
    },
    {
      name: 'FXCM',
      slug: 'fxcm',
      rating: 4.3,
      minDeposit: '₹5,000',
      regulators: ['FCA', 'ASIC', 'CySEC'],
      spreads: '1.2 pips',
      platforms: ['Trading Station', 'MT4', 'TradingView'],
      features: ['DMA Execution', 'Advanced Charts', 'Risk Management', 'Market Analysis'],
      trustScore: 90,
      yearEstablished: 1999,
      instruments: '300+ Markets',
      maxLeverage: '30:1',
      commission: 'Commission-free',
      accountTypes: ['Standard', 'Active Trader'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'PayPal', 'Skrill'],
      customerSupport: '24/5 Professional Support',
      website: 'https://www.fxcm.com/in',
      riskWarning: 'Trading involves substantial risk and may result in loss of capital.'
    },
    {
      name: 'AvaTrade',
      slug: 'avatrade',
      rating: 4.2,
      minDeposit: '₹7,500',
      regulators: ['Central Bank of Ireland', 'ASIC', 'FSA'],
      spreads: '0.9 pips',
      platforms: ['MT4', 'MT5', 'AvaTradeGO', 'WebTrader'],
      features: ['DupliTrade', 'ZuluTrade', 'MQL5 Signals', 'AvaProtect'],
      trustScore: 88,
      yearEstablished: 2006,
      instruments: '1250+ Instruments',
      maxLeverage: '400:1',
      commission: 'Commission-free',
      accountTypes: ['Retail', 'Professional', 'Islamic'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'Skrill', 'Neteller', 'WebMoney'],
      customerSupport: '24/5 Multilingual Support',
      bonusOffer: 'Welcome bonus up to ₹75,000',
      website: 'https://www.avatrade.com/in',
      riskWarning: 'CFDs are complex instruments. 71% of retail accounts lose money.'
    },
    {
      name: 'Pepperstone',
      slug: 'pepperstone',
      rating: 4.6,
      minDeposit: '₹15,000',
      regulators: ['ASIC', 'FCA', 'CySEC'],
      spreads: '0.0 pips',
      platforms: ['MT4', 'MT5', 'cTrader', 'TradingView'],
      features: ['Razor Spreads', 'AutoChartist', 'VPS Hosting', 'Smart Trader Tools'],
      trustScore: 94,
      yearEstablished: 2010,
      instruments: '1200+ Markets',
      maxLeverage: '500:1',
      commission: '₹350 per lot',
      accountTypes: ['Standard', 'Razor'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'PayPal', 'Skrill', 'Neteller'],
      customerSupport: '24/5 Award-winning Support',
      website: 'https://www.pepperstone.com/in',
      riskWarning: 'CFDs are leveraged products and carry significant risk.'
    },
    {
      name: 'IC Markets',
      slug: 'ic-markets',
      rating: 4.7,
      minDeposit: '₹15,000',
      regulators: ['ASIC', 'CySEC', 'FSA'],
      spreads: '0.0 pips',
      platforms: ['MT4', 'MT5', 'cTrader'],
      features: ['ECN Trading', 'Raw Spreads', 'Expert Advisors', 'Copy Trading'],
      trustScore: 96,
      yearEstablished: 2007,
      instruments: '232+ Instruments',
      maxLeverage: '500:1',
      commission: '₷7 per lot',
      accountTypes: ['Standard', 'Raw Spread', 'cTrader'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'Skrill', 'Neteller', 'PayPal'],
      customerSupport: '24/5 Live Chat, Phone, Email',
      website: 'https://www.icmarkets.com/global/en',
      riskWarning: 'CFDs are complex instruments with high risk of losing money.'
    }
  ];

  const currentDomain = options.request ? new URL(options.request.url).origin : '';

  return `
    <div class="min-h-screen bg-gradient-to-br from-orange-50 to-green-100">
      <!-- Meta Tags for SEO -->
      <meta name="description" content="Compare the best forex brokers for Indian traders in 2025. Find top-rated brokers with SEBI oversight, competitive spreads from 0.0 pips, leverage up to unlimited, and support for UPI payments.">
      <meta name="keywords" content="forex brokers India, SEBI regulated, Indian traders, MetaTrader, forex trading India, XM Group, Exness, OctaFX, FXCM, UPI payments">
      <meta name="robots" content="index, follow">
      <meta name="author" content="BrokerAnalysis">
      <meta property="og:title" content="Best Forex Brokers in India 2025 - SEBI Regulated">
      <meta property="og:description" content="Discover top forex brokers serving Indian traders with SEBI oversight, competitive spreads, UPI payments, and advanced platforms. Compare ratings and features.">
      <meta property="og:type" content="website">
      <meta property="og:url" content="${currentDomain}/countries/india">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="Best Forex Brokers in India 2025">
      <meta name="twitter:description" content="Compare top forex brokers for Indian traders with SEBI oversight and competitive trading conditions.">
      ${options.canonicalUrl ? `<link rel="canonical" href="${options.canonicalUrl}">` : ''}

      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-orange-600 via-white to-green-600 text-gray-900 hero-section">
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-4xl mx-auto text-center">
            <div class="flex items-center justify-center mb-6">
              <div class="w-16 h-12 mr-4 bg-white rounded border flex items-center justify-center shadow-lg">
                <span class="text-orange-600 font-bold text-xs">🇮🇳</span>
              </div>
              <h1 class="text-4xl md:text-6xl font-bold text-gray-900">
                Best Forex Brokers in 
                <span class="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">India</span>
              </h1>
            </div>
            <p class="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Discover top forex brokers serving Indian traders with SEBI oversight, competitive spreads, UPI payments, and advanced platforms
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div class="bg-white/90 backdrop-blur rounded-lg p-4 shadow-lg border">
                <div class="text-3xl font-bold text-orange-600">7</div>
                <div class="text-gray-700">Top Brokers</div>
              </div>
              <div class="bg-white/90 backdrop-blur rounded-lg p-4 shadow-lg border">
                <div class="text-3xl font-bold text-green-600">Unlimited</div>
                <div class="text-gray-700">Max Leverage</div>
              </div>
              <div class="bg-white/90 backdrop-blur rounded-lg p-4 shadow-lg border">
                <div class="text-3xl font-bold text-orange-600">SEBI</div>
                <div class="text-gray-700">Oversight</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Broker Comparison Section -->
      <div class="container mx-auto px-4 py-12">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">
            Compare Top Forex Brokers for Indian Traders
          </h2>
          
          <!-- Desktop Table View -->
          <div class="hidden lg:block overflow-x-auto bg-white rounded-xl shadow-lg">
            <table class="w-full">
              <thead class="bg-gradient-to-r from-orange-600 to-green-600 text-white">
                <tr>
                  <th class="px-6 py-4 text-left font-semibold">Broker</th>
                  <th class="px-6 py-4 text-center font-semibold">Rating</th>
                  <th class="px-6 py-4 text-center font-semibold">Min Deposit</th>
                  <th class="px-6 py-4 text-center font-semibold">Spreads</th>
                  <th class="px-6 py-4 text-center font-semibold">Leverage</th>
                  <th class="px-6 py-4 text-center font-semibold">Platforms</th>
                  <th class="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                ${indiaBrokers.map((broker, index) => `
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        ${generateBrokerLogo({
                          brokerName: broker.name,
                          slug: broker.slug,
                          size: 'md',
                          className: 'mr-4'
                        })}
                        <div>
                          <div class="font-bold text-gray-900">${broker.name}</div>
                          <div class="text-sm text-gray-600">Est. ${broker.yearEstablished}</div>
                          <div class="text-xs text-orange-600">${broker.regulators.join(', ')}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center justify-center mb-1">
                        ${Array.from({length: 5}, (_, i) => 
                          `<svg class="w-4 h-4 ${i < Math.floor(broker.rating) ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>`
                        ).join('')}
                      </div>
                      <div class="text-sm font-medium text-gray-900">${broker.rating}/5</div>
                      <div class="text-xs text-gray-600">Trust: ${broker.trustScore}%</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="font-bold text-green-600">${broker.minDeposit}</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="font-medium text-orange-600">${broker.spreads}</div>
                      <div class="text-xs text-gray-600">${broker.commission}</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="font-medium">${broker.maxLeverage}</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="text-sm">${broker.platforms.slice(0, 2).join(', ')}</div>
                      ${broker.platforms.length > 2 ? `<div class="text-xs text-gray-600">+${broker.platforms.length - 2} more</div>` : ''}
                    </td>
                    <td class="px-6 py-4 text-center">
                      <div class="space-y-2">
                        <a href="/review/${broker.slug}" class="block bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors">
                          Review
                        </a>
                        <a href="${broker.website}" target="_blank" rel="noopener" class="block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors">
                          Visit
                        </a>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <!-- Mobile Card View -->
          <div class="lg:hidden space-y-6">
            ${indiaBrokers.map(broker => `
              <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center">
                    ${generateBrokerLogo({
                      brokerName: broker.name,
                      slug: broker.slug,
                      size: 'lg',
                      className: 'mr-4'
                    })}
                    <div>
                      <h3 class="font-bold text-xl text-gray-900">${broker.name}</h3>
                      <p class="text-gray-600">Est. ${broker.yearEstablished}</p>
                      <p class="text-xs text-orange-600">${broker.regulators.join(', ')}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="flex items-center mb-1">
                      ${Array.from({length: 5}, (_, i) => 
                        `<svg class="w-4 h-4 ${i < Math.floor(broker.rating) ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>`
                      ).join('')}
                    </div>
                    <div class="text-sm font-medium">${broker.rating}/5</div>
                    <div class="text-xs text-gray-600">Trust: ${broker.trustScore}%</div>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div class="text-sm text-gray-600">Min Deposit</div>
                    <div class="font-bold text-green-600">${broker.minDeposit}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Spreads</div>
                    <div class="font-medium text-orange-600">${broker.spreads}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Max Leverage</div>
                    <div class="font-medium">${broker.maxLeverage}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Commission</div>
                    <div class="font-medium">${broker.commission}</div>
                  </div>
                </div>

                <div class="mb-4">
                  <div class="text-sm text-gray-600 mb-2">Key Features</div>
                  <div class="flex flex-wrap gap-2">
                    ${broker.features.slice(0, 3).map(feature => 
                      `<span class="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">${feature}</span>`
                    ).join('')}
                  </div>
                </div>

                ${broker.bonusOffer ? `
                  <div class="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div class="text-sm font-medium text-green-800">Special Offer</div>
                    <div class="text-green-700">${broker.bonusOffer}</div>
                  </div>
                ` : ''}

                <div class="flex space-x-3">
                  <a href="/review/${broker.slug}" class="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors">
                    Read Review
                  </a>
                  <a href="${broker.website}" target="_blank" rel="noopener" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors">
                    Visit Broker
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Market Insights Section -->
      <div class="bg-gray-50 py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">
              India Forex Market Insights
            </h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div class="bg-white rounded-xl shadow-lg p-8">
                <h3 class="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <div class="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  Regulatory Environment
                </h3>
                <div class="space-y-4">
                  <div class="flex items-start">
                    <div class="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p class="font-medium text-gray-900">SEBI Oversight</p>
                      <p class="text-gray-600 text-sm">Securities and Exchange Board of India monitors financial markets and protects investor interests</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p class="font-medium text-gray-900">RBI Guidelines</p>
                      <p class="text-gray-600 text-sm">Reserve Bank of India sets foreign exchange regulations under FEMA (Foreign Exchange Management Act)</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p class="font-medium text-gray-900">International Brokers</p>
                      <p class="text-gray-600 text-sm">Indian traders access forex through offshore brokers regulated by ASIC, FCA, CySEC, and other authorities</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-xl shadow-lg p-8">
                <h3 class="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                  </div>
                  Trading Advantages
                </h3>
                <div class="space-y-4">
                  <div class="flex items-start">
                    <div class="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p class="font-medium text-gray-900">UPI Payment Support</p>
                      <p class="text-gray-600 text-sm">Many brokers now support UPI, Paytm, and other Indian digital payment methods</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p class="font-medium text-gray-900">High Leverage Access</p>
                      <p class="text-gray-600 text-sm">Indian traders can access leverage up to unlimited with offshore brokers</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p class="font-medium text-gray-900">Competitive Spreads</p>
                      <p class="text-gray-600 text-sm">Access to ECN/STP execution with spreads from 0.0 pips on EUR/USD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-orange-600 to-green-600 rounded-xl text-white p-8">
              <h3 class="text-2xl font-bold mb-4">Why Choose These Brokers for India Trading?</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center">
                  <div class="text-3xl font-bold text-orange-100 mb-2">24/7</div>
                  <div class="text-orange-100">Customer support with Hindi and English language options</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-orange-100 mb-2">₹200+</div>
                  <div class="text-orange-100">Low minimum deposits starting from as low as ₹200 with Exness</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-orange-100 mb-2">UPI</div>
                  <div class="text-orange-100">Support for UPI, Paytm, and other popular Indian payment methods</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="bg-white py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">
              Frequently Asked Questions
            </h2>
            
            <div class="space-y-6">
              <div class="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 class="text-xl font-bold mb-3 text-gray-900">Is forex trading legal in India?</h3>
                <p class="text-gray-700">Forex trading in India is regulated by SEBI and RBI. While trading currency derivatives on exchanges like NSE and BSE is legal, trading with offshore brokers operates in a regulatory grey area. Many Indian traders use international brokers, but it's advisable to understand the legal implications and consult with financial advisors.</p>
              </div>

              <div class="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 class="text-xl font-bold mb-3 text-gray-900">What is the maximum leverage for Indian traders?</h3>
                <p class="text-gray-700">Indian traders can access leverage up to unlimited with some international brokers like Exness, though most offer leverage between 400:1 to 888:1. However, SEBI-regulated domestic brokers typically offer much lower leverage ratios for retail clients.</p>
              </div>

              <div class="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 class="text-xl font-bold mb-3 text-gray-900">Are forex profits taxable in India?</h3>
                <p class="text-gray-700">Yes, forex trading profits are taxable in India under income tax laws. Short-term gains may be taxed as per your income tax slab, while long-term gains may have different rates. Additionally, there may be TDS implications. It's recommended to consult with a chartered accountant familiar with forex taxation.</p>
              </div>

              <div class="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 class="text-xl font-bold mb-3 text-gray-900">Which payment methods work best for Indian traders?</h3>
                <p class="text-gray-700">Popular payment methods include credit/debit cards, bank transfers, UPI, Paytm, Skrill, and Neteller. Many brokers now support UPI for instant deposits. Cryptocurrency deposits are also gaining popularity, though regulations around crypto are evolving in India.</p>
              </div>

              <div class="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 class="text-xl font-bold mb-3 text-gray-900">What are the best trading platforms for Indian traders?</h3>
                <p class="text-gray-700">MetaTrader 4 (MT4) and MetaTrader 5 (MT5) are extremely popular among Indian traders due to their robust features, Hindi language support in some versions, and extensive community resources. cTrader and proprietary platforms like Trading Station (FXCM) are also well-regarded.</p>
              </div>

              <div class="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 class="text-xl font-bold mb-3 text-gray-900">How do I choose the best forex broker for India?</h3>
                <p class="text-gray-700">Consider factors like regulation (prefer ASIC, FCA, CySEC regulated brokers), minimum deposit requirements, spreads and commissions, payment method support (especially UPI), customer support in Hindi/English, trading platforms offered, and educational resources. Always verify regulatory status and read reviews from other Indian traders.</p>
              </div>

              <div class="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 class="text-xl font-bold mb-3 text-gray-900">What should Indian traders know about RBI and FEMA regulations?</h3>
                <p class="text-gray-700">Under FEMA, Indian residents can invest up to $250,000 per financial year under the Liberalized Remittance Scheme (LRS). However, forex trading with overseas brokers may not qualify under LRS. It's crucial to understand these regulations and consider domestic alternatives or consult legal experts before trading with international brokers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Best Forex Brokers in India 2025 - SEBI Regulated Trading",
      "description": "Compare top 7 forex brokers for Indian traders. Find the best spreads, platforms, leverage up to unlimited, UPI payments, and trading conditions in India with SEBI oversight.",
      "url": "${currentDomain}/countries/india",
      "keywords": "forex brokers India, SEBI regulated, Indian traders, MetaTrader, forex trading India, UPI payments",
      "author": {
        "@type": "Organization",
        "name": "BrokerAnalysis"
      },
      "publisher": {
        "@type": "Organization",
        "name": "BrokerAnalysis"
      },
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is forex trading legal in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Forex trading in India is regulated by SEBI and RBI. While trading currency derivatives on exchanges is legal, trading with offshore brokers operates in a regulatory grey area."
            }
          },
          {
            "@type": "Question",
            "name": "What is the maximum leverage for Indian traders?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Indian traders can access leverage up to unlimited with some international brokers like Exness, though most offer leverage between 400:1 to 888:1."
            }
          }
        ]
      }
    }
    </script>

    <script>
      function handleLogoError(img, fallbackUrl, initials, brokerName) {
        if (img.dataset.retried !== 'true' && fallbackUrl && fallbackUrl !== img.src) {
          img.dataset.retried = 'true';
          img.src = fallbackUrl;
          return;
        }
        
        const container = img.parentElement;
        if (container && container.classList.contains('broker-logo-container')) {
          container.innerHTML = \`
            <div class="w-full h-full bg-gradient-to-br from-orange-600 to-green-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">\${initials}</span>
            </div>
          \`;
          container.setAttribute('title', brokerName + ' Logo');
        }
      }

      function handleLogoSuccess(img) {
        const container = img.closest('.broker-logo-container');
        const fallback = container?.querySelector('.logo-fallback');
        if (fallback) {
          fallback.classList.add('hidden');
        }
        img.style.display = 'block';
      }
    </script>
  `;
}