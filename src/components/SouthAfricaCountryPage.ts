import { generateBrokerLogo } from './BrokerLogo.js';

interface SouthAfricaBroker {
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

export function renderSouthAfricaCountryPage(options: {
  canonicalUrl?: string;
  request?: Request;
} = {}): string {
  const southAfricaBrokers: SouthAfricaBroker[] = [
    {
      name: 'AvaTrade',
      slug: 'avatrade',
      rating: 4.5,
      minDeposit: 'R1,500',
      regulators: ['FSCA', 'CBI', 'ASIC', 'FSA'],
      spreads: '0.9 pips',
      platforms: ['AvaTradeGO', 'MT4', 'MT5'],
      features: ['Copy Trading', 'Educational Resources', 'Trading Central', 'Multiple Accounts'],
      trustScore: 93,
      yearEstablished: 2006,
      instruments: '250+ Instruments',
      maxLeverage: '400:1',
      commission: 'Spread-only pricing',
      accountTypes: ['Demo', 'Standard', 'Professional'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'Skrill', 'Neteller'],
      customerSupport: '24/5 Multilingual Support',
      bonusOffer: 'Welcome bonus up to R10,000',
      website: 'https://www.avatrade.com/za',
      riskWarning: 'CFDs are complex instruments with high risk of losing money rapidly.'
    },
    {
      name: 'FXCM',
      slug: 'fxcm',
      rating: 4.4,
      minDeposit: 'R750',
      regulators: ['FCA', 'ASIC', 'CYSEC'],
      spreads: '1.2 pips',
      platforms: ['Trading Station', 'MT4', 'TradingView'],
      features: ['Advanced Charting', 'Trading Signals', 'Market Research', 'Risk Management'],
      trustScore: 91,
      yearEstablished: 1999,
      instruments: '50+ Currency Pairs',
      maxLeverage: '30:1',
      commission: 'Commission-free',
      accountTypes: ['Standard', 'Active Trader', 'Professional'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'PayPal'],
      customerSupport: '24/7 Live Support',
      website: 'https://www.fxcm.com/za',
      riskWarning: 'Leveraged trading involves substantial risk and may result in loss.'
    },
    {
      name: 'IG Markets',
      slug: 'ig-markets',
      rating: 4.6,
      minDeposit: 'R1,000',
      regulators: ['FCA', 'ASIC', 'MAS'],
      spreads: '0.6 pips',
      platforms: ['IG Platform', 'MT4', 'ProRealTime'],
      features: ['17,000+ Markets', 'DMA Trading', 'Advanced Analytics', 'Mobile Trading'],
      trustScore: 94,
      yearEstablished: 1974,
      instruments: '17,000+ Markets',
      maxLeverage: '200:1',
      commission: 'Variable commission',
      accountTypes: ['CFD', 'Share Trading', 'Options'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'PayPal'],
      customerSupport: '24/5 Expert Support',
      website: 'https://www.ig.com/za',
      riskWarning: 'CFDs are complex instruments and come with high risk of losing money.'
    },
    {
      name: 'Pepperstone',
      slug: 'pepperstone',
      rating: 4.7,
      minDeposit: 'R1,500',
      regulators: ['ASIC', 'FCA', 'CySEC', 'BaFin'],
      spreads: '0.0 pips',
      platforms: ['MT4', 'MT5', 'cTrader', 'TradingView'],
      features: ['Razor Spreads', 'AutoChartist', 'VPS Hosting', 'Copy Trading'],
      trustScore: 95,
      yearEstablished: 2010,
      instruments: '1000+ Markets',
      maxLeverage: '500:1',
      commission: 'R70 per lot (Razor)',
      accountTypes: ['Standard', 'Razor'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'Skrill', 'Neteller'],
      customerSupport: '24/5 Award-winning Support',
      website: 'https://www.pepperstone.com/za',
      riskWarning: 'CFDs are leveraged products and carry significant risk of loss.'
    },
    {
      name: 'XM Group',
      slug: 'xm-group',
      rating: 4.3,
      minDeposit: 'R100',
      regulators: ['CySEC', 'ASIC', 'IFSC'],
      spreads: '1.0 pips',
      platforms: ['MT4', 'MT5', 'XM WebTrader'],
      features: ['No Requotes', 'Expert Advisors', 'Educational Webinars', 'Loyalty Program'],
      trustScore: 90,
      yearEstablished: 2009,
      instruments: '1000+ Instruments',
      maxLeverage: '888:1',
      commission: 'Commission-free',
      accountTypes: ['Micro', 'Standard', 'XM Zero'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'Skrill', 'Neteller'],
      customerSupport: '24/7 Multilingual Support',
      bonusOffer: '100% deposit bonus up to R5,000',
      website: 'https://www.xm.com/za',
      riskWarning: 'Trading involves significant risk and may not be suitable for all investors.'
    },
    {
      name: 'Exness',
      slug: 'exness',
      rating: 4.4,
      minDeposit: 'R200',
      regulators: ['FCA', 'CySEC', 'FSA'],
      spreads: '0.3 pips',
      platforms: ['MT4', 'MT5', 'Exness Terminal'],
      features: ['Unlimited Leverage', 'Instant Withdrawals', 'Professional Tools', 'Social Trading'],
      trustScore: 92,
      yearEstablished: 2008,
      instruments: '200+ Instruments',
      maxLeverage: 'Unlimited',
      commission: 'Ultra-low commission',
      accountTypes: ['Standard', 'Pro', 'Zero', 'Raw Spread'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'Perfect Money', 'Crypto'],
      customerSupport: '24/7 Premium Support',
      website: 'https://www.exness.com/za',
      riskWarning: 'CFDs are complex instruments with high risk of rapid money loss.'
    }
  ];

  const currentDomain = options.request ? new URL(options.request.url).origin : '';

  return `
    <!-- Enhanced South Africa Country Page -->
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-yellow-100">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-green-700 via-yellow-600 to-blue-600 text-white">
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-4xl mx-auto text-center">
            <div class="flex items-center justify-center mb-6">
              <div class="w-16 h-12 mr-4 bg-white rounded border flex items-center justify-center">
                <span class="text-green-600 font-bold text-xs">🇿🇦</span>
              </div>
              <h1 class="text-4xl md:text-6xl font-bold">
                Best Forex Brokers in 
                <span class="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">South Africa</span>
              </h1>
            </div>
            <p class="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
              Discover top-regulated South African forex brokers with FSCA oversight, competitive spreads, and advanced trading platforms
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div class="bg-white/10 backdrop-blur rounded-lg p-4">
                <div class="text-3xl font-bold text-yellow-200">6</div>
                <div class="text-green-100">Top Brokers</div>
              </div>
              <div class="bg-white/10 backdrop-blur rounded-lg p-4">
                <div class="text-3xl font-bold text-yellow-200">888:1</div>
                <div class="text-green-100">Max Leverage</div>
              </div>
              <div class="bg-white/10 backdrop-blur rounded-lg p-4">
                <div class="text-3xl font-bold text-yellow-200">FSCA</div>
                <div class="text-green-100">Regulation</div>
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
                South Africa Forex Market Regulation
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 class="font-semibold text-green-800 mb-2">FSCA (Financial Sector Conduct Authority)</h3>
                  <p class="text-green-700">South Africa's financial regulator ensuring market conduct and consumer protection in the forex industry with comprehensive oversight and licensing requirements.</p>
                </div>
                <div>
                  <h3 class="font-semibold text-green-800 mb-2">African Financial Leader</h3>
                  <p class="text-green-700">South Africa leads African financial markets with sophisticated regulatory framework and serves as gateway to the continent's growing forex market.</p>
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
            Compare Top South African Forex Brokers
          </h2>

          <!-- Desktop Table -->
          <div class="hidden lg:block bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gradient-to-r from-green-600 to-blue-600 text-white">
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
                  ${southAfricaBrokers.map((broker, index) => `
                    <tr class="${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-green-50 transition-colors">
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
                          <a href="/review/${broker.slug}" class="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                            Read Review
                          </a>
                          <a href="${broker.website}" target="_blank" rel="noopener" class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
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
            ${southAfricaBrokers.map(broker => `
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
                      <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">${feature}</span>
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
                  <a href="/review/${broker.slug}" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors">
                    Read Review
                  </a>
                  <a href="${broker.website}" target="_blank" rel="noopener" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors">
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

      <!-- FAQ Section -->
      <div class="bg-white py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">
              Frequently Asked Questions
            </h2>
            
            <div class="space-y-6">
              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-3 text-gray-900">Is forex trading legal in South Africa?</h3>
                <p class="text-gray-700">Yes, forex trading is legal in South Africa. The Financial Sector Conduct Authority (FSCA) regulates financial services and allows residents to trade with both local and international brokers.</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-3 text-gray-900">What is the maximum leverage for South African traders?</h3>
                <p class="text-gray-700">South African traders can access leverage up to 888:1 with international brokers. FSCA is implementing regulations to limit leverage for retail clients to protect traders.</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-3 text-gray-900">Are forex profits taxable in South Africa?</h3>
                <p class="text-gray-700">Forex trading profits may be subject to capital gains tax or income tax depending on your trading frequency and circumstances. Consult with a South African tax professional for specific advice.</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-3 text-gray-900">Can South Africans trade with international brokers?</h3>
                <p class="text-gray-700">Yes, South African residents can trade with international brokers. Many choose brokers regulated by FCA, ASIC, or CySEC for access to higher leverage and diverse trading instruments.</p>
              </div>

              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-xl font-bold mb-3 text-gray-900">What protection do South African forex traders have?</h3>
                <p class="text-gray-700">FSCA-regulated brokers must comply with local regulations including client fund segregation. International brokers provide additional protection through their respective compensation schemes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Risk Warning -->
      <div class="bg-yellow-50 border-t border-yellow-200 py-8">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <div class="flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/>
              </svg>
              <h3 class="text-xl font-bold text-yellow-800">Risk Warning</h3>
            </div>
            <p class="text-yellow-700 text-sm leading-relaxed">
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
      "name": "Best Forex Brokers in South Africa - FSCA Regulated",
      "description": "Compare top South African forex brokers with FSCA regulation. Find the best spreads, platforms, and trading conditions for South African forex traders.",
      "url": "${currentDomain}/countries/south-africa",
      "mainEntity": {
        "@type": "ItemList",
        "name": "South Africa Forex Brokers",
        "numberOfItems": ${southAfricaBrokers.length},
        "itemListElement": [
          ${southAfricaBrokers.map((broker, index) => `
            {
              "@type": "ListItem",
              "position": ${index + 1},
              "item": {
                "@type": "FinancialService",
                "name": "${broker.name}",
                "description": "South African forex broker with ${broker.regulators.join(', ')} regulation",
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
                  "priceCurrency": "ZAR"
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
            "name": "South Africa Forex Brokers",
            "item": "${currentDomain}/countries/south-africa"
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
            <div class="w-full h-full bg-gradient-to-br from-green-500 to-yellow-600 rounded-lg flex items-center justify-center">
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