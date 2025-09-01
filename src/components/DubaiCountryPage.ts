import { generateBrokerLogo } from './BrokerLogo.js';

interface DubaiBroker {
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

export function renderDubaiCountryPage(options: {
  canonicalUrl?: string;
  request?: Request;
} = {}): string {
  const dubaiBrokers: DubaiBroker[] = [
    {
      name: 'IG Markets',
      slug: 'ig-markets',
      rating: 4.7,
      minDeposit: 'AED 250',
      regulators: ['DFSA', 'FCA', 'ASIC'],
      spreads: '0.6 pips',
      platforms: ['IG Platform', 'MT4', 'ProRealTime'],
      features: ['17,000+ Markets', 'DMA Trading', 'Advanced Charts', 'Risk Management'],
      trustScore: 95,
      yearEstablished: 1974,
      instruments: '17,000+ Markets',
      maxLeverage: '200:1',
      commission: 'Spread-only or Commission',
      accountTypes: ['CFD', 'Share Trading', 'Options'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'Online Banking'],
      customerSupport: '24/5 Arabic & English Support',
      website: 'https://www.ig.com/ae',
      riskWarning: 'CFDs are complex instruments and come with high risk of losing money.'
    },
    {
      name: 'Swissquote',
      slug: 'swissquote',
      rating: 4.6,
      minDeposit: 'AED 1,000',
      regulators: ['DFSA', 'FINMA', 'FCA'],
      spreads: '0.8 pips',
      platforms: ['Advanced Trader', 'MT4', 'MT5'],
      features: ['Swiss Banking', 'Multi-Asset', 'Research', 'Portfolio Management'],
      trustScore: 94,
      yearEstablished: 1996,
      instruments: '3,000+ Instruments',
      maxLeverage: '100:1',
      commission: 'Variable commission',
      accountTypes: ['Standard', 'Premium', 'Private'],
      paymentMethods: ['Bank Transfer', 'Credit Card', 'Online Banking'],
      customerSupport: '24/5 Premium Support',
      website: 'https://www.swissquote.com/mea',
      riskWarning: 'Trading involves significant risk and may result in loss of capital.'
    },
    {
      name: 'Saxo Bank',
      slug: 'saxo-bank',
      rating: 4.8,
      minDeposit: 'AED 2,000',
      regulators: ['DFSA', 'FSA', 'FINRA'],
      spreads: '0.4 pips',
      platforms: ['SaxoTraderGO', 'SaxoTraderPRO'],
      features: ['40,000+ Instruments', 'Advanced Analytics', 'Research', 'Multi-Asset'],
      trustScore: 96,
      yearEstablished: 1992,
      instruments: '40,000+ Instruments',
      maxLeverage: '200:1',
      commission: 'Competitive commission',
      accountTypes: ['Classic', 'Platinum', 'VIP'],
      paymentMethods: ['Bank Transfer', 'Credit Card', 'Online Banking'],
      customerSupport: '24/5 Premium Support',
      website: 'https://www.saxo.com/mea',
      riskWarning: 'Trading in leveraged products involves significant risk.'
    },
    {
      name: 'ADSS',
      slug: 'adss',
      rating: 4.4,
      minDeposit: 'AED 500',
      regulators: ['DFSA', 'FSA'],
      spreads: '0.5 pips',
      platforms: ['ADSS Platform', 'MT4'],
      features: ['Regional Expertise', 'Arabic Support', 'Local Banking', 'Islamic Accounts'],
      trustScore: 91,
      yearEstablished: 2010,
      instruments: '1,000+ CFDs',
      maxLeverage: '200:1',
      commission: 'Spread-based pricing',
      accountTypes: ['Standard', 'VIP', 'Islamic'],
      paymentMethods: ['Local Bank Transfer', 'Credit Card', 'Online Banking'],
      customerSupport: '24/7 Arabic & English Support',
      bonusOffer: 'Welcome bonus up to AED 1,000',
      website: 'https://www.adss.com',
      riskWarning: 'CFD trading involves high risk and is not suitable for everyone.'
    },
    {
      name: 'ThinkMarkets',
      slug: 'thinkmarkets',
      rating: 4.5,
      minDeposit: 'AED 0',
      regulators: ['FCA', 'ASIC', 'FSA'],
      spreads: '0.4 pips',
      platforms: ['ThinkTrader', 'MT4', 'MT5'],
      features: ['Zero Commission', 'Advanced Tools', 'Copy Trading', 'Education'],
      trustScore: 92,
      yearEstablished: 2010,
      instruments: '4,000+ Markets',
      maxLeverage: '500:1',
      commission: 'Zero commission on major pairs',
      accountTypes: ['Standard', 'ThinkZero'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'E-wallets'],
      customerSupport: '24/5 Multilingual Support',
      website: 'https://www.thinkmarkets.com/mea',
      riskWarning: 'Leveraged trading is high risk and may not be suitable for all.'
    },
    {
      name: 'XTB',
      slug: 'xtb',
      rating: 4.3,
      minDeposit: 'AED 0',
      regulators: ['FCA', 'CySEC', 'KNF'],
      spreads: '0.8 pips',
      platforms: ['xStation 5', 'MT4'],
      features: ['Award-Winning Platform', 'Research', 'Education', 'Mobile Trading'],
      trustScore: 89,
      yearEstablished: 2002,
      instruments: '5,500+ Instruments',
      maxLeverage: '30:1',
      commission: 'Zero commission on shares',
      accountTypes: ['Standard', 'Pro'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'PayPal'],
      customerSupport: '24/5 Expert Support',
      website: 'https://www.xtb.com/ae',
      riskWarning: 'CFDs are complex instruments with high risk of losing money rapidly.'
    }
  ];

  const currentDomain = options.request ? new URL(options.request.url).origin : '';

  return `
    <!-- Enhanced Dubai Country Page -->
    <div class="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white">
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-4xl mx-auto text-center">
            <div class="flex items-center justify-center mb-6">
              <div class="w-16 h-12 mr-4 bg-white rounded border flex items-center justify-center">
                <span class="text-red-600 font-bold text-xs">🇦🇪</span>
              </div>
              <h1 class="text-4xl md:text-6xl font-bold">
                Best Forex Brokers in 
                <span class="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">Dubai</span>
              </h1>
            </div>
            <p class="text-xl md:text-2xl text-orange-100 mb-8 leading-relaxed">
              Discover top-regulated Dubai forex brokers with DFSA oversight, competitive spreads, and advanced trading platforms in the Middle East financial hub
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div class="bg-white/10 backdrop-blur rounded-lg p-4">
                <div class="text-3xl font-bold text-yellow-200">6</div>
                <div class="text-orange-100">Top Brokers</div>
              </div>
              <div class="bg-white/10 backdrop-blur rounded-lg p-4">
                <div class="text-3xl font-bold text-yellow-200">500:1</div>
                <div class="text-orange-100">Max Leverage</div>
              </div>
              <div class="bg-white/10 backdrop-blur rounded-lg p-4">
                <div class="text-3xl font-bold text-yellow-200">DFSA</div>
                <div class="text-orange-100">Regulation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Regulatory Overview -->
      <div class="bg-white py-12">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <h2 class="text-2xl font-bold text-green-900 mb-4 flex items-center">
                <svg class="w-8 h-8 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                Dubai Forex Market Regulation
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 class="font-semibold text-green-800 mb-2">DFSA (Dubai Financial Services Authority)</h3>
                  <p class="text-green-700">The independent regulator of financial services in the Dubai International Financial Centre (DIFC), providing world-class oversight and investor protection.</p>
                </div>
                <div>
                  <h3 class="font-semibold text-green-800 mb-2">Regional Financial Hub</h3>
                  <p class="text-green-700">Dubai serves as the Middle East's premier financial center, offering sophisticated regulatory framework and access to regional and global markets.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Brokers Comparison Table -->
      <div class="container mx-auto px-4 py-12">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">
            Compare Top Dubai Forex Brokers
          </h2>

          <!-- Desktop Table -->
          <div class="hidden lg:block bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                  <tr>
                    <th class="px-6 py-4 text-left font-semibold">Broker</th>
                    <th class="px-4 py-4 text-center font-semibold">Rating</th>
                    <th class="px-4 py-4 text-center font-semibold">Min Deposit</th>
                    <th class="px-4 py-4 text-center font-semibold">Spreads</th>
                    <th class="px-4 py-4 text-center font-semibold">Regulation</th>
                    <th class="px-4 py-4 text-center font-semibold">Platforms</th>
                    <th class="px-4 py-4 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${dubaiBrokers.map((broker, index) => `
                    <tr class="${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-orange-50 transition-colors">
                      <td class="px-6 py-6">
                        <div class="flex items-center">
                          ${generateBrokerLogo({
                            brokerName: broker.name,
                            slug: broker.slug,
                            size: 'md',
                            className: 'mr-4 flex-shrink-0'
                          })}
                          <div>
                            <div class="font-bold text-lg text-gray-900">${broker.name}</div>
                            <div class="text-sm text-gray-600">Est. ${broker.yearEstablished}</div>
                            ${broker.bonusOffer ? `<div class="text-xs text-green-600 font-medium mt-1">${broker.bonusOffer}</div>` : ''}
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-6 text-center">
                        <div class="flex flex-col items-center">
                          <div class="flex items-center mb-1">
                            ${Array.from({length: 5}, (_, i) => 
                              `<svg class="w-4 h-4 ${i < Math.floor(broker.rating) ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>`
                            ).join('')}
                          </div>
                          <div class="text-sm font-medium text-gray-900">${broker.rating}</div>
                          <div class="text-xs text-gray-500">Trust: ${broker.trustScore}%</div>
                        </div>
                      </td>
                      <td class="px-4 py-6 text-center">
                        <div class="font-bold text-lg text-green-600">${broker.minDeposit}</div>
                      </td>
                      <td class="px-4 py-6 text-center">
                        <div class="font-medium text-blue-600">${broker.spreads}</div>
                        <div class="text-xs text-gray-500">${broker.commission}</div>
                      </td>
                      <td class="px-4 py-6 text-center">
                        <div class="space-y-1">
                          ${broker.regulators.map(reg => `
                            <span class="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">${reg}</span>
                          `).join('')}
                        </div>
                      </td>
                      <td class="px-4 py-6 text-center">
                        <div class="text-sm">
                          ${broker.platforms.slice(0, 2).map(platform => `
                            <div class="text-gray-700">${platform}</div>
                          `).join('')}
                          ${broker.platforms.length > 2 ? `<div class="text-gray-500 text-xs">+${broker.platforms.length - 2} more</div>` : ''}
                        </div>
                      </td>
                      <td class="px-4 py-6 text-center">
                        <div class="space-y-2">
                          <a href="/review/${broker.slug}" class="block w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                            Read Review
                          </a>
                          <a href="${broker.website}" target="_blank" rel="noopener" class="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                            Visit Broker
                          </a>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Mobile Cards -->
          <div class="lg:hidden space-y-6">
            ${dubaiBrokers.map(broker => `
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
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div class="text-sm text-gray-600">Min Deposit</div>
                    <div class="font-bold text-green-600">${broker.minDeposit}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Spreads</div>
                    <div class="font-medium text-blue-600">${broker.spreads}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Max Leverage</div>
                    <div class="font-medium">${broker.maxLeverage}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Trust Score</div>
                    <div class="font-medium">${broker.trustScore}%</div>
                  </div>
                </div>

                <div class="mb-4">
                  <div class="text-sm text-gray-600 mb-2">Regulation</div>
                  <div class="flex flex-wrap gap-1">
                    ${broker.regulators.map(reg => `
                      <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">${reg}</span>
                    `).join('')}
                  </div>
                </div>

                <div class="mb-4">
                  <div class="text-sm text-gray-600 mb-2">Key Features</div>
                  <div class="flex flex-wrap gap-1">
                    ${broker.features.map(feature => `
                      <span class="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">${feature}</span>
                    `).join('')}
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

                <div class="mt-4 text-xs text-gray-500 italic">
                  ${broker.riskWarning}
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
              Dubai Forex Market Insights
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="bg-white rounded-xl p-6 shadow-lg">
                <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold mb-2">Financial Hub Status</h3>
                <p class="text-gray-600">Dubai International Financial Centre (DIFC) serves as the Middle East's premier financial hub with world-class infrastructure and regulatory framework.</p>
              </div>

              <div class="bg-white rounded-xl p-6 shadow-lg">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold mb-2">DFSA Regulation</h3>
                <p class="text-gray-600">Dubai Financial Services Authority provides sophisticated regulation based on international best practices, ensuring high standards of investor protection.</p>
              </div>

              <div class="bg-white rounded-xl p-6 shadow-lg">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold mb-2">Tax Efficiency</h3>
                <p class="text-gray-600">Dubai offers attractive tax environment with no personal income tax or capital gains tax, making it favorable for forex trading activities.</p>
              </div>

              <div class="bg-white rounded-xl p-6 shadow-lg">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold mb-2">Islamic Finance</h3>
                <p class="text-gray-600">Dubai brokers offer Sharia-compliant trading accounts, catering to Islamic finance principles with swap-free trading and ethical investment options.</p>
              </div>

              <div class="bg-white rounded-xl p-6 shadow-lg">
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold mb-2">Strong AED</h3>
                <p class="text-gray-600">The UAE Dirham's stability, pegged to the US Dollar, provides predictable base currency for regional traders and international forex activities.</p>
              </div>

              <div class="bg-white rounded-xl p-6 shadow-lg">
                <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold mb-2">Global Gateway</h3>
                <p class="text-gray-600">Strategic location bridging Asia, Europe, and Africa provides optimal trading hours and access to global markets during peak liquidity periods.</p>
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
              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-3 text-gray-900">Is forex trading legal in Dubai/UAE?</h3>
                <p class="text-gray-700">Yes, forex trading is legal in Dubai and the UAE. The Dubai Financial Services Authority (DFSA) regulates financial services in the DIFC, while other emirates have their own regulatory frameworks.</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-3 text-gray-900">What is the maximum leverage available in Dubai?</h3>
                <p class="text-gray-700">DFSA-regulated brokers typically offer leverage up to 200:1 for retail clients. International brokers serving UAE residents may offer higher leverage ratios up to 500:1.</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-3 text-gray-900">Are there Islamic trading accounts available?</h3>
                <p class="text-gray-700">Yes, most Dubai-based brokers offer Islamic (swap-free) accounts that comply with Sharia law principles, eliminating interest charges on overnight positions.</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-3 text-gray-900">What are the tax implications of forex trading in UAE?</h3>
                <p class="text-gray-700">The UAE generally does not impose personal income tax or capital gains tax, making it tax-efficient for forex trading. However, consult local tax advisors for specific circumstances.</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-3 text-gray-900">Can UAE residents trade with international brokers?</h3>
                <p class="text-gray-700">Yes, UAE residents can trade with international brokers. Many choose brokers regulated by FCA, ASIC, or CySEC for additional options and potentially higher leverage.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Risk Warning -->
      <div class="bg-orange-50 border-t border-orange-200 py-8">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <div class="flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/>
              </svg>
              <h3 class="text-xl font-bold text-orange-800">Risk Warning</h3>
            </div>
            <p class="text-orange-700 text-sm leading-relaxed">
              Forex and CFD trading involves significant risk of loss and is not suitable for all investors. Past performance is not indicative of future results. 
              The high degree of leverage can work against you as well as for you. Before deciding to trade forex, you should carefully consider your investment 
              objectives, level of experience, and risk appetite. You should be aware of all the risks associated with forex trading and seek advice from an 
              independent financial advisor if you have any doubts.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced SEO Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Best Forex Brokers in Dubai - DFSA Regulated",
      "description": "Compare top Dubai forex brokers with DFSA regulation. Find the best spreads, platforms, and trading conditions for UAE forex traders.",
      "url": "${currentDomain}/countries/dubai",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Dubai Forex Brokers",
        "numberOfItems": ${dubaiBrokers.length},
        "itemListElement": [
          ${dubaiBrokers.map((broker, index) => `
            {
              "@type": "ListItem",
              "position": ${index + 1},
              "item": {
                "@type": "FinancialService",
                "name": "${broker.name}",
                "description": "Dubai forex broker with ${broker.regulators.join(', ')} regulation",
                "url": "${currentDomain}/review/${broker.slug}",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "${broker.rating}",
                  "bestRating": "5",
                  "ratingCount": "500"
                },
                "offers": {
                  "@type": "Offer",
                  "description": "Forex trading services",
                  "price": "${broker.minDeposit}",
                  "priceCurrency": "AED"
                }
              }
            }
          `).join(',')}
        ]
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "${currentDomain}/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Countries",
            "item": "${currentDomain}/countries"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Dubai Forex Brokers",
            "item": "${currentDomain}/countries/dubai"
          }
        ]
      }
    }
    </script>

    <!-- Logo Handlers -->
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
            <div class="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
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