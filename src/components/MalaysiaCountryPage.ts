// Malaysia Country Page - Comprehensive broker analysis for Malaysian traders
import { renderLayout } from './Layout.js';

export interface MalaysiaBroker {
  name: string;
  slug: string;
  logo: string;
  rating: number;
  regulators: string[];
  minDeposit: string;
  maxLeverage: string;
  spreadFrom: string;
  commissionFrom: string;
  platforms: string[];
  islamicAccounts: boolean;
  localSupport: boolean;
  myrSupport: boolean;
  features: string[];
  promoOffer?: string;
  accountTypes: string[];
  tradingInstruments: string[];
  depositMethods: string[];
}

const malaysiaBrokers: MalaysiaBroker[] = [
  {
    name: 'XM Group',
    slug: 'xm-group',
    logo: '/static/images/brokers/xm-logo.svg',
    rating: 4.4,
    regulators: ['CySEC', 'ASIC', 'IFSC'],
    minDeposit: 'MYR 20',
    maxLeverage: '888:1',
    spreadFrom: '1.0 pips',
    commissionFrom: 'No commission',
    platforms: ['MT4', 'MT5', 'XM WebTrader'],
    islamicAccounts: true,
    localSupport: true,
    myrSupport: true,
    features: ['Islamic Accounts', 'MYR Base Currency', 'Local Bank Support', 'Maybank2u Support'],
    promoOffer: '30% Deposit Bonus up to MYR 2,500',
    accountTypes: ['Micro', 'Standard', 'Zero Spread', 'Islamic'],
    tradingInstruments: ['Forex', 'Indices', 'Commodities', 'Energies', 'Cryptocurrencies'],
    depositMethods: ['Maybank2u', 'Public Bank', 'CIMB Bank', 'Credit Cards', 'Skrill', 'Neteller']
  },
  {
    name: 'Exness',
    slug: 'exness',
    logo: '/static/images/brokers/exness-logo.svg',
    rating: 4.3,
    regulators: ['CySEC', 'FCA', 'SCB'],
    minDeposit: 'MYR 4',
    maxLeverage: 'Unlimited',
    spreadFrom: '0.3 pips',
    commissionFrom: 'MYR 14/lot',
    platforms: ['MT4', 'MT5', 'Exness Terminal'],
    islamicAccounts: true,
    localSupport: true,
    myrSupport: true,
    features: ['Unlimited Leverage', 'Instant Withdrawals', 'Copy Trading', 'Social Trading'],
    promoOffer: 'Zero Deposit Fees + Cashback Program',
    accountTypes: ['Standard', 'Pro', 'Raw Spread', 'Zero', 'Islamic'],
    tradingInstruments: ['Forex', 'Metals', 'Cryptocurrencies', 'Energies', 'Indices', 'Stocks'],
    depositMethods: ['Malaysian Banks', 'Perfect Money', 'Skrill', 'Neteller', 'Cryptocurrency']
  },
  {
    name: 'OctaFX',
    slug: 'octafx',
    logo: '/static/images/brokers/octafx-logo.svg',
    rating: 4.2,
    regulators: ['CySEC', 'SVG FSA'],
    minDeposit: 'MYR 40',
    maxLeverage: '500:1',
    spreadFrom: '0.6 pips',
    commissionFrom: 'No commission',
    platforms: ['MT4', 'MT5', 'OctaFX Trading'],
    islamicAccounts: true,
    localSupport: true,
    myrSupport: true,
    features: ['Copy Trading', 'Cashback Program', 'Educational Resources', 'Malaysian Support'],
    promoOffer: '50% Deposit Bonus + 15% Cashback',
    accountTypes: ['Standard', 'ECN', 'Islamic'],
    tradingInstruments: ['Forex', 'Metals', 'Energies', 'Indices', 'Cryptocurrencies'],
    depositMethods: ['Malaysian Banks', 'Credit Cards', 'E-wallets', 'Local Payment Methods']
  },
  {
    name: 'FBS',
    slug: 'fbs',
    logo: '/static/images/brokers/fbs-logo.svg',
    rating: 4.1,
    regulators: ['CySEC', 'ASIC', 'IFSC'],
    minDeposit: 'MYR 4',
    maxLeverage: '3000:1',
    spreadFrom: '0.5 pips',
    commissionFrom: 'MYR 24/lot',
    platforms: ['MT4', 'MT5', 'FBS Trader'],
    islamicAccounts: true,
    localSupport: true,
    myrSupport: true,
    features: ['High Leverage', 'Bonus Programs', 'Copy Trading', 'Local Partnership'],
    promoOffer: '100% Deposit Bonus up to MYR 6,000',
    accountTypes: ['Cent', 'Micro', 'Standard', 'Zero Spread', 'Islamic'],
    tradingInstruments: ['Forex', 'Stocks', 'Indices', 'Metals', 'Energies', 'Cryptocurrencies'],
    depositMethods: ['Malaysian Banks', 'Perfect Money', 'Skrill', 'Neteller', 'Cryptocurrency']
  },
  {
    name: 'IC Markets',
    slug: 'ic-markets',
    logo: '/static/images/brokers/ic-markets-logo.svg',
    rating: 4.5,
    regulators: ['ASIC', 'CySEC', 'SCB'],
    minDeposit: 'MYR 840',
    maxLeverage: '500:1',
    spreadFrom: '0.0 pips',
    commissionFrom: 'MYR 28/lot',
    platforms: ['MT4', 'MT5', 'cTrader'],
    islamicAccounts: true,
    localSupport: true,
    myrSupport: true,
    features: ['ECN Trading', 'Raw Spreads', 'VPS Hosting', 'Copy Trading'],
    promoOffer: 'Up to 50% Deposit Bonus',
    accountTypes: ['Standard', 'Raw Spread', 'Islamic'],
    tradingInstruments: ['Forex', 'Indices', 'Commodities', 'Stocks', 'Cryptocurrencies', 'Bonds'],
    depositMethods: ['Bank Transfer', 'Credit Cards', 'POLi', 'Skrill', 'Neteller']
  },
  {
    name: 'Pepperstone',
    slug: 'pepperstone',
    logo: '/static/images/brokers/pepperstone-logo.svg',
    rating: 4.4,
    regulators: ['ASIC', 'FCA', 'CySEC', 'SCB'],
    minDeposit: 'MYR 840',
    maxLeverage: '400:1',
    spreadFrom: '0.0 pips',
    commissionFrom: 'MYR 28/lot',
    platforms: ['MT4', 'MT5', 'cTrader', 'DupliTrade'],
    islamicAccounts: true,
    localSupport: true,
    myrSupport: true,
    features: ['Razor Account', 'AutoChartist', 'VPS', 'Copy Trading'],
    promoOffer: 'Deposit Bonus up to MYR 2,100',
    accountTypes: ['Standard', 'Razor', 'Islamic'],
    tradingInstruments: ['Forex', 'Indices', 'Commodities', 'Stocks', 'Cryptocurrencies'],
    depositMethods: ['Bank Wire', 'Credit Cards', 'Skrill', 'Neteller', 'POLi']
  }
];

// Generate star ratings
function generateStars(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return [
    ...Array(fullStars).fill('<path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'),
    ...(hasHalfStar ? ['<path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z"/>'] : []),
    ...Array(emptyStars).fill('<path fill="none" stroke="currentColor" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>')
  ].map(path => `<svg class="w-5 h-5 text-yellow-400 inline" viewBox="0 0 24 24">${path}</svg>`).join('');
}

export function renderMalaysiaCountryPage(options: { canonicalUrl?: string; request?: Request } = {}): string {
  const { canonicalUrl = '/countries/malaysia' } = options;

  return `
    <div class="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <!-- Hero Section with Malaysia Theme -->
      <div class="relative bg-gradient-to-r from-red-600 via-red-700 to-blue-800 text-white overflow-hidden">
        <div class="absolute inset-0 bg-black opacity-10"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="text-center">
            <div class="flex justify-center mb-6">
              <div class="w-16 h-12 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-2xl font-bold">MY</span>
              </div>
            </div>
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              Best Forex Brokers in <span class="text-yellow-300">Malaysia</span> 2025
            </h1>
            <p class="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Discover top-rated international forex brokers serving Malaysian traders. Compare SC-compliant brokers with 
              <span class="font-semibold text-yellow-300">MYR support</span>, Islamic accounts, and local banking integration.
            </p>
            <div class="flex flex-wrap justify-center gap-6 text-sm md:text-base">
              <div class="flex items-center bg-white/20 rounded-full px-4 py-2">
                <svg class="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                SC Malaysia Compliant
              </div>
              <div class="flex items-center bg-white/20 rounded-full px-4 py-2">
                <svg class="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                  <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"/>
                </svg>
                MYR Base Currency
              </div>
              <div class="flex items-center bg-white/20 rounded-full px-4 py-2">
                <svg class="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                </svg>
                Islamic Accounts Available
              </div>
              <div class="flex items-center bg-white/20 rounded-full px-4 py-2">
                <svg class="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
                Low as MYR 4 Minimum
              </div>
            </div>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <!-- Quick Stats Bar -->
      <div class="bg-white border-b border-gray-200 py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-3xl font-bold text-gray-900">${malaysiaBrokers.length}</div>
              <div class="text-sm text-gray-600">Top Brokers</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-green-600">MYR 4</div>
              <div class="text-sm text-gray-600">Minimum Deposit</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-blue-600">Unlimited</div>
              <div class="text-sm text-gray-600">Max Leverage</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-purple-600">100%</div>
              <div class="text-sm text-gray-600">Have Islamic Accounts</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <!-- Brokers Comparison Table (Desktop) -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-12 hidden md:block">
          <div class="px-6 py-4 bg-gradient-to-r from-red-600 to-blue-600 text-white">
            <h2 class="text-2xl font-bold">Malaysia Forex Brokers Comparison 2025</h2>
            <p class="text-red-100 mt-2">Compare top international brokers serving Malaysian traders with MYR support</p>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broker</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Deposit</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Leverage</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spread From</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Islamic Account</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                ${malaysiaBrokers.map((broker, index) => `
                  <tr class="${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-12 w-12">
                          <img class="h-12 w-12 rounded-lg object-contain bg-white border border-gray-200" 
                               src="${broker.logo}" 
                               alt="${broker.name} logo"
                               onerror="this.src='/static/images/brokers/default-logo.svg'">
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">${broker.name}</div>
                          <div class="text-sm text-gray-500">${broker.regulators.join(', ')}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="text-sm font-medium text-gray-900 mr-2">${broker.rating}</div>
                        <div class="flex">${generateStars(broker.rating)}</div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-green-600">${broker.minDeposit}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-blue-600">${broker.maxLeverage}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">${broker.spreadFrom}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${broker.islamicAccounts ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${broker.islamicAccounts ? 'Available' : 'Not Available'}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <a href="/reviews/${broker.slug}" class="bg-gradient-to-r from-red-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-blue-700 transition-all duration-200 text-sm font-medium">
                        View Review
                      </a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Brokers Cards (Mobile) -->
        <div class="block md:hidden space-y-6 mb-12">
          ${malaysiaBrokers.map(broker => `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center">
                    <img class="h-12 w-12 rounded-lg object-contain bg-white border border-gray-200" 
                         src="${broker.logo}" 
                         alt="${broker.name} logo"
                         onerror="this.src='/static/images/brokers/default-logo.svg'">
                    <div class="ml-4">
                      <h3 class="text-lg font-semibold text-gray-900">${broker.name}</h3>
                      <div class="flex items-center mt-1">
                        <span class="text-sm font-medium text-gray-900 mr-2">${broker.rating}</span>
                        <div class="flex">${generateStars(broker.rating)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div class="text-xs text-gray-500 uppercase tracking-wider">Min Deposit</div>
                    <div class="text-lg font-semibold text-green-600">${broker.minDeposit}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 uppercase tracking-wider">Max Leverage</div>
                    <div class="text-lg font-semibold text-blue-600">${broker.maxLeverage}</div>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div class="text-xs text-gray-500 uppercase tracking-wider">Spread From</div>
                    <div class="text-sm font-medium text-gray-900">${broker.spreadFrom}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 uppercase tracking-wider">Islamic Account</div>
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${broker.islamicAccounts ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                      ${broker.islamicAccounts ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
                
                <div class="mb-4">
                  <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Regulation</div>
                  <div class="flex flex-wrap gap-1">
                    ${broker.regulators.map(reg => `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${reg}</span>`).join('')}
                  </div>
                </div>
                
                ${broker.promoOffer ? `
                  <div class="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div class="text-xs text-green-700 font-medium uppercase tracking-wider">Special Offer</div>
                    <div class="text-sm text-green-800 font-medium">${broker.promoOffer}</div>
                  </div>
                ` : ''}
                
                <div class="flex space-x-3">
                  <a href="/reviews/${broker.slug}" class="flex-1 bg-gradient-to-r from-red-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-blue-700 transition-all duration-200 text-sm font-medium text-center">
                    View Review
                  </a>
                  <button class="flex-1 bg-white border-2 border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 text-sm font-medium">
                    Compare
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Malaysia Forex Regulation Section -->
        <div class="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-gray-900">Malaysia Forex Trading Regulation</h2>
              <p class="text-gray-600 mt-2">Securities Commission Malaysia (SC) oversight and international broker compliance</p>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Securities Commission Malaysia (SC)</h3>
              <div class="space-y-4 text-gray-700">
                <p>The Securities Commission Malaysia regulates the Malaysian capital market and ensures investor protection through comprehensive oversight of financial services.</p>
                
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 class="font-semibold text-blue-900 mb-2">Key Regulatory Features:</h4>
                  <ul class="space-y-2 text-sm text-blue-800">
                    <li>• Capital Markets and Services Act 2007 compliance</li>
                    <li>• Islamic finance regulation and Shariah compliance</li>
                    <li>• Investor protection fund and dispute resolution</li>
                    <li>• MYR-denominated trading facilitation</li>
                    <li>• Cross-border financial services oversight</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">International Broker Access</h3>
              <div class="space-y-4 text-gray-700">
                <p>Malaysian traders can access international forex brokers while the SC focuses on domestic market regulation and investor education.</p>
                
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 class="font-semibold text-green-900 mb-2">Trading Benefits:</h4>
                  <ul class="space-y-2 text-sm text-green-800">
                    <li>• Access to global liquidity providers</li>
                    <li>• MYR base currency support</li>
                    <li>• Islamic finance-compliant accounts</li>
                    <li>• Local bank deposit/withdrawal support</li>
                    <li>• Bahasa Malaysia customer support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
            <div class="flex items-start">
              <svg class="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <div>
                <h4 class="text-lg font-semibold text-yellow-900 mb-2">Important Notice for Malaysian Traders</h4>
                <p class="text-yellow-800 text-sm leading-relaxed">
                  While international forex trading is accessible to Malaysian residents, traders should ensure compliance with local tax obligations 
                  and understand that SC regulation primarily covers domestic markets. Always verify broker credentials and consider Islamic 
                  finance requirements if applicable to your trading needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Malaysia Market Insights -->
        <div class="bg-gradient-to-r from-red-600 to-blue-600 rounded-xl shadow-lg text-white p-8 mb-12">
          <h2 class="text-3xl font-bold mb-6">Malaysia Forex Trading Insights</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div>
              <div class="bg-white/20 rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-4">Islamic Finance Hub</h3>
                <p class="text-red-100 text-sm leading-relaxed">
                  Malaysia is a global leader in Islamic finance, with all major brokers offering Shariah-compliant 
                  trading accounts that comply with Islamic principles, including swap-free overnight positions.
                </p>
              </div>
            </div>
            <div>
              <div class="bg-white/20 rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-4">MYR Trading Support</h3>
                <p class="text-red-100 text-sm leading-relaxed">
                  Most international brokers support MYR as a base currency, enabling direct deposits from Malaysian 
                  banks including Maybank, CIMB, Public Bank, and offering competitive exchange rates.
                </p>
              </div>
            </div>
            <div>
              <div class="bg-white/20 rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-4">Growing Trader Base</h3>
                <p class="text-red-100 text-sm leading-relaxed">
                  Malaysia has a rapidly growing retail forex trading community with strong educational initiatives 
                  and local support from international brokers establishing regional offices in Kuala Lumpur.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Comprehensive FAQ Section -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions - Malaysia Forex Trading</h2>
          <div class="space-y-6">
            
            <div class="border border-gray-200 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Is forex trading legal in Malaysia?</h3>
              <div class="text-gray-700 space-y-3">
                <p>Yes, forex trading is legal in Malaysia. Malaysian residents can trade forex through international brokers, though domestic forex regulation falls under the Securities Commission Malaysia (SC). The SC focuses on capital market oversight and does not prohibit citizens from accessing international forex markets.</p>
                <p>Most Malaysian traders use offshore brokers that are regulated by reputable authorities like ASIC, FCA, or CySEC, which provide strong investor protection while offering competitive trading conditions.</p>
              </div>
            </div>

            <div class="border border-gray-200 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Which brokers offer MYR base currency accounts?</h3>
              <div class="text-gray-700 space-y-3">
                <p>Many international brokers support MYR base currency accounts, including XM Group, Exness, OctaFX, FBS, IC Markets, and Pepperstone. This allows Malaysian traders to:</p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>Deposit and withdraw in Malaysian Ringgit directly</li>
                  <li>Avoid currency conversion fees for account funding</li>
                  <li>Better understand account balance and P&L in familiar currency</li>
                  <li>Use local bank transfers including Maybank2u and CIMB Clicks</li>
                </ul>
              </div>
            </div>

            <div class="border border-gray-200 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Do Malaysian brokers offer Islamic accounts?</h3>
              <div class="text-gray-700 space-y-3">
                <p>Yes, all major brokers serving Malaysian traders offer Islamic (swap-free) accounts that comply with Shariah principles. These accounts feature:</p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>No overnight swap/rollover charges on positions held after market close</li>
                  <li>Shariah-compliant trading structure avoiding interest (riba)</li>
                  <li>Same trading conditions and spreads as regular accounts</li>
                  <li>Access to all major currency pairs and instruments</li>
                  <li>Certification from Islamic finance authorities where applicable</li>
                </ul>
                <p>Given Malaysia's position as an Islamic finance hub, brokers ensure their Islamic accounts meet strict Shariah compliance standards.</p>
              </div>
            </div>

            <div class="border border-gray-200 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3">What deposit methods work for Malaysian traders?</h3>
              <div class="text-gray-700 space-y-3">
                <p>Malaysian traders have access to multiple convenient deposit methods:</p>
                <div class="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Local Banking:</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>Maybank2u online banking</li>
                      <li>CIMB Clicks</li>
                      <li>Public Bank online</li>
                      <li>Bank wire transfers</li>
                      <li>Local bank cards</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">International Methods:</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>Skrill and Neteller e-wallets</li>
                      <li>International credit/debit cards</li>
                      <li>Perfect Money</li>
                      <li>Cryptocurrency (selected brokers)</li>
                      <li>Union Pay</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="border border-gray-200 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3">What are the tax implications of forex trading in Malaysia?</h3>
              <div class="text-gray-700 space-y-3">
                <p>Forex trading profits in Malaysia may be subject to taxation depending on several factors:</p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Business vs. Investment:</strong> Regular trading may be considered business income (subject to tax)</li>
                  <li><strong>Occasional Trading:</strong> Infrequent trading may be treated as capital gains (generally not taxable in Malaysia)</li>
                  <li><strong>Professional Traders:</strong> Those trading as their primary income source are subject to business tax rates</li>
                  <li><strong>Record Keeping:</strong> Maintain detailed trading records and profit/loss statements</li>
                  <li><strong>Professional Advice:</strong> Consult with a Malaysian tax professional for personalized guidance</li>
                </ul>
                <p class="text-sm bg-yellow-50 border border-yellow-200 rounded p-3 mt-4">
                  <strong>Disclaimer:</strong> Tax laws can be complex and change frequently. This information is general in nature and should not be considered tax advice. Always consult with a qualified Malaysian tax advisor for your specific situation.
                </p>
              </div>
            </div>

            <div class="border border-gray-200 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3">How to choose the best forex broker in Malaysia?</h3>
              <div class="text-gray-700 space-y-3">
                <p>When selecting a forex broker as a Malaysian trader, consider these essential factors:</p>
                <div class="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Regulatory & Safety:</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>Strong regulation (ASIC, FCA, CySEC)</li>
                      <li>Segregated client funds</li>
                      <li>Compensation scheme coverage</li>
                      <li>Transparent fee structure</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Malaysia-Specific Features:</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>MYR base currency support</li>
                      <li>Islamic account availability</li>
                      <li>Local bank deposit methods</li>
                      <li>Bahasa Malaysia support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Trading Conditions:</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>competitive spreads and commissions</li>
                      <li>Suitable leverage levels</li>
                      <li>Diverse trading instruments</li>
                      <li>Quality execution and platform stability</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Additional Services:</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>Educational resources in local language</li>
                      <li>Responsive customer support</li>
                      <li>Mobile trading applications</li>
                      <li>Copy trading and social features</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}