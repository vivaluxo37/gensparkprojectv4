// Ethiopia Country Page - Comprehensive broker analysis for Ethiopian traders
import { renderLayout } from './Layout.js';

export interface EthiopiaBroker {
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
  etbSupport: boolean;
  localSupport: boolean;
  islamicAccounts: boolean;
  features: string[];
  promoOffer?: string;
  accountTypes: string[];
  tradingInstruments: string[];
  depositMethods: string[];
}

const ethiopiaBrokers: EthiopiaBroker[] = [
  {
    name: 'XM Group',
    slug: 'xm-group',
    logo: '/static/images/brokers/xm-logo.svg',
    rating: 4.4,
    regulators: ['CySEC', 'ASIC', 'IFSC'],
    minDeposit: 'ETB 1,100',
    maxLeverage: '888:1',
    spreadFrom: '1.0 pips',
    commissionFrom: 'No commission',
    platforms: ['MT4', 'MT5', 'XM WebTrader'],
    etbSupport: true,
    localSupport: true,
    islamicAccounts: true,
    features: ['Ethiopian Birr Support', 'Islamic Accounts', 'Educational Resources', 'Multi-language Support'],
    promoOffer: '30% Deposit Bonus up to ETB 137,500',
    accountTypes: ['Micro', 'Standard', 'Zero Spread', 'Islamic'],
    tradingInstruments: ['Forex', 'Indices', 'Commodities', 'Energies', 'Cryptocurrencies'],
    depositMethods: ['Bank Wire', 'Credit Cards', 'Skrill', 'Neteller', 'Perfect Money']
  },
  {
    name: 'Exness',
    slug: 'exness',
    logo: '/static/images/brokers/exness-logo.svg',
    rating: 4.3,
    regulators: ['CySEC', 'FCA', 'SCB'],
    minDeposit: 'ETB 220',
    maxLeverage: 'Unlimited',
    spreadFrom: '0.3 pips',
    commissionFrom: 'ETB 770/lot',
    platforms: ['MT4', 'MT5', 'Exness Terminal'],
    etbSupport: true,
    localSupport: true,
    islamicAccounts: true,
    features: ['Unlimited Leverage', 'Instant Withdrawals', 'Copy Trading', 'Ethiopian Support'],
    promoOffer: 'Zero Deposit Fees + Cashback Program',
    accountTypes: ['Standard', 'Pro', 'Raw Spread', 'Zero', 'Islamic'],
    tradingInstruments: ['Forex', 'Metals', 'Cryptocurrencies', 'Energies', 'Indices', 'Stocks'],
    depositMethods: ['Ethiopian Banks', 'Perfect Money', 'Skrill', 'Neteller', 'Cryptocurrency']
  },
  {
    name: 'OctaFX',
    slug: 'octafx',
    logo: '/static/images/brokers/octafx-logo.svg',
    rating: 4.2,
    regulators: ['CySEC', 'SVG FSA'],
    minDeposit: 'ETB 2,200',
    maxLeverage: '500:1',
    spreadFrom: '0.6 pips',
    commissionFrom: 'No commission',
    platforms: ['MT4', 'MT5', 'OctaFX Trading'],
    etbSupport: true,
    localSupport: true,
    islamicAccounts: true,
    features: ['Copy Trading', 'Cashback Program', 'Educational Resources', 'African Market Focus'],
    promoOffer: '50% Deposit Bonus + 15% Cashback',
    accountTypes: ['Standard', 'ECN', 'Islamic'],
    tradingInstruments: ['Forex', 'Metals', 'Energies', 'Indices', 'Cryptocurrencies'],
    depositMethods: ['Ethiopian Banks', 'Credit Cards', 'E-wallets', 'Local Payment Methods']
  },
  {
    name: 'FBS',
    slug: 'fbs',
    logo: '/static/images/brokers/fbs-logo.svg',
    rating: 4.1,
    regulators: ['CySEC', 'ASIC', 'IFSC'],
    minDeposit: 'ETB 220',
    maxLeverage: '3000:1',
    spreadFrom: '0.5 pips',
    commissionFrom: 'ETB 1,320/lot',
    platforms: ['MT4', 'MT5', 'FBS Trader'],
    etbSupport: true,
    localSupport: true,
    islamicAccounts: true,
    features: ['High Leverage', 'Bonus Programs', 'Copy Trading', 'Ethiopian Partnership'],
    promoOffer: '100% Deposit Bonus up to ETB 330,000',
    accountTypes: ['Cent', 'Micro', 'Standard', 'Zero Spread', 'Islamic'],
    tradingInstruments: ['Forex', 'Stocks', 'Indices', 'Metals', 'Energies', 'Cryptocurrencies'],
    depositMethods: ['Ethiopian Banks', 'Perfect Money', 'Skrill', 'Neteller', 'Cryptocurrency']
  },
  {
    name: 'IC Markets',
    slug: 'ic-markets',
    logo: '/static/images/brokers/ic-markets-logo.svg',
    rating: 4.5,
    regulators: ['ASIC', 'CySEC', 'SCB'],
    minDeposit: 'ETB 46,200',
    maxLeverage: '500:1',
    spreadFrom: '0.0 pips',
    commissionFrom: 'ETB 1,540/lot',
    platforms: ['MT4', 'MT5', 'cTrader'],
    etbSupport: true,
    localSupport: true,
    islamicAccounts: true,
    features: ['ECN Trading', 'Raw Spreads', 'VPS Hosting', 'African Market Access'],
    promoOffer: 'Up to 50% Deposit Bonus',
    accountTypes: ['Standard', 'Raw Spread', 'Islamic'],
    tradingInstruments: ['Forex', 'Indices', 'Commodities', 'Stocks', 'Cryptocurrencies', 'Bonds'],
    depositMethods: ['Bank Transfer', 'Credit Cards', 'Skrill', 'Neteller', 'Perfect Money']
  },
  {
    name: 'Pepperstone',
    slug: 'pepperstone',
    logo: '/static/images/brokers/pepperstone-logo.svg',
    rating: 4.4,
    regulators: ['ASIC', 'FCA', 'CySEC', 'SCB'],
    minDeposit: 'ETB 46,200',
    maxLeverage: '400:1',
    spreadFrom: '0.0 pips',
    commissionFrom: 'ETB 1,540/lot',
    platforms: ['MT4', 'MT5', 'cTrader', 'DupliTrade'],
    etbSupport: true,
    localSupport: true,
    islamicAccounts: true,
    features: ['Razor Account', 'AutoChartist', 'VPS', 'Ethiopian Support'],
    promoOffer: 'Deposit Bonus up to ETB 115,500',
    accountTypes: ['Standard', 'Razor', 'Islamic'],
    tradingInstruments: ['Forex', 'Indices', 'Commodities', 'Stocks', 'Cryptocurrencies'],
    depositMethods: ['Bank Wire', 'Credit Cards', 'Skrill', 'Neteller', 'Perfect Money']
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

export function renderEthiopiaCountryPage(options: { canonicalUrl?: string; request?: Request } = {}): string {
  const { canonicalUrl = '/countries/ethiopia' } = options;

  return `
    <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      <!-- Hero Section with Ethiopia Theme -->
      <div class="relative bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white overflow-hidden">
        <div class="absolute inset-0 bg-black opacity-10"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="text-center">
            <div class="flex justify-center mb-6">
              <div class="w-16 h-12 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 rounded-lg flex items-center justify-center">
                <span class="text-2xl font-bold text-white">ET</span>
              </div>
            </div>
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              Best Forex Brokers in <span class="text-yellow-300">Ethiopia</span> 2025
            </h1>
            <p class="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Discover top-rated international forex brokers serving Ethiopian traders. Access global markets with 
              <span class="font-semibold text-yellow-300">ETB support</span>, Islamic accounts, and low minimum deposits.
            </p>
            <div class="flex flex-wrap justify-center gap-6 text-sm md:text-base">
              <div class="flex items-center bg-white/20 rounded-full px-4 py-2">
                <svg class="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                NBE Awareness
              </div>
              <div class="flex items-center bg-white/20 rounded-full px-4 py-2">
                <svg class="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                  <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"/>
                </svg>
                ETB Base Currency
              </div>
              <div class="flex items-center bg-white/20 rounded-full px-4 py-2">
                <svg class="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                </svg>
                Islamic Accounts
              </div>
              <div class="flex items-center bg-white/20 rounded-full px-4 py-2">
                <svg class="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
                Low as ETB 220
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
              <div class="text-3xl font-bold text-gray-900">${ethiopiaBrokers.length}</div>
              <div class="text-sm text-gray-600">Top Brokers</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-green-600">ETB 220</div>
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
          <div class="px-6 py-4 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white">
            <h2 class="text-2xl font-bold">Ethiopia Forex Brokers Comparison 2025</h2>
            <p class="text-green-100 mt-2">Compare top international brokers serving Ethiopian traders with ETB support</p>
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
                ${ethiopiaBrokers.map((broker, index) => `
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
                      <a href="/reviews/${broker.slug}" class="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:via-yellow-600 hover:to-red-700 transition-all duration-200 text-sm font-medium">
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
          ${ethiopiaBrokers.map(broker => `
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
                  <div class="bg-gradient-to-r from-green-50 to-yellow-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div class="text-xs text-green-700 font-medium uppercase tracking-wider">Special Offer</div>
                    <div class="text-sm text-green-800 font-medium">${broker.promoOffer}</div>
                  </div>
                ` : ''}
                
                <div class="flex space-x-3">
                  <a href="/reviews/${broker.slug}" class="flex-1 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:via-yellow-600 hover:to-red-700 transition-all duration-200 text-sm font-medium text-center">
                    View Review
                  </a>
                  <button class="flex-1 bg-white border-2 border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-all duration-200 text-sm font-medium">
                    Compare
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Ethiopia Forex Regulation Section -->
        <div class="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-gray-900">Ethiopia Forex Trading Environment</h2>
              <p class="text-gray-600 mt-2">National Bank of Ethiopia (NBE) oversight and international broker access</p>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">National Bank of Ethiopia (NBE)</h3>
              <div class="space-y-4 text-gray-700">
                <p>The National Bank of Ethiopia serves as the country's central bank and primary financial regulator, overseeing monetary policy and financial sector stability in Ethiopia.</p>
                
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 class="font-semibold text-blue-900 mb-2">NBE Regulatory Focus:</h4>
                  <ul class="space-y-2 text-sm text-blue-800">
                    <li>• Ethiopian Birr (ETB) exchange rate management</li>
                    <li>• Domestic banking and financial institution oversight</li>
                    <li>• Foreign exchange controls and monitoring</li>
                    <li>• Financial system stability and risk management</li>
                    <li>• Anti-money laundering compliance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">International Forex Access</h3>
              <div class="space-y-4 text-gray-700">
                <p>Ethiopian traders can access international forex brokers while being mindful of local regulations and foreign exchange controls managed by the NBE.</p>
                
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 class="font-semibold text-green-900 mb-2">Trading Advantages:</h4>
                  <ul class="space-y-2 text-sm text-green-800">
                    <li>• Access to global financial markets</li>
                    <li>• Ethiopian Birr (ETB) base currency support</li>
                    <li>• Islamic finance-compliant trading options</li>
                    <li>• Educational resources in local languages</li>
                    <li>• Growing African market focus from brokers</li>
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
                <h4 class="text-lg font-semibold text-yellow-900 mb-2">Important Notice for Ethiopian Traders</h4>
                <p class="text-yellow-800 text-sm leading-relaxed">
                  Ethiopian residents should be aware of NBE foreign exchange regulations and ensure compliance with local laws when engaging in 
                  international forex trading. Consider consulting with local financial advisors regarding currency controls and tax implications. 
                  All international trading should be conducted through reputable, well-regulated brokers.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Ethiopia Market Insights -->
        <div class="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 rounded-xl shadow-lg text-white p-8 mb-12">
          <h2 class="text-3xl font-bold mb-6">Ethiopia Forex Trading Insights</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div>
              <div class="bg-white/20 rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-4">Emerging Market Opportunity</h3>
                <p class="text-green-100 text-sm leading-relaxed">
                  Ethiopia represents one of Africa's fastest-growing economies with increasing interest in international 
                  trading. Many brokers now offer specific support and resources for Ethiopian traders.
                </p>
              </div>
            </div>
            <div>
              <div class="bg-white/20 rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-4">ETB Currency Support</h3>
                <p class="text-green-100 text-sm leading-relaxed">
                  Several international brokers now support Ethiopian Birr (ETB) as a base currency, making it easier 
                  for Ethiopian traders to manage their accounts and understand their trading performance.
                </p>
              </div>
            </div>
            <div>
              <div class="bg-white/20 rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-4">Islamic Finance Compatibility</h3>
                <p class="text-green-100 text-sm leading-relaxed">
                  Given Ethiopia's significant Muslim population, most major brokers offer Islamic (Shariah-compliant) 
                  accounts that align with religious principles while providing access to global markets.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Comprehensive FAQ Section -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions - Ethiopia Forex Trading</h2>
          <div class="space-y-6">
            
            <div class="border border-gray-200 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Is forex trading legal in Ethiopia?</h3>
              <div class="text-gray-700 space-y-3">
                <p>The legal status of retail forex trading in Ethiopia operates in a regulatory gray area. While the National Bank of Ethiopia (NBE) has strict foreign exchange controls, there are no specific laws that explicitly prohibit Ethiopian residents from trading with international forex brokers.</p>
                <p>However, traders should be aware of NBE regulations regarding foreign currency transactions and should ensure compliance with all applicable local laws. It's advisable to consult with local legal and financial experts before engaging in international forex trading.</p>
              </div>
            </div>

            <div class="border border-gray-200 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Which brokers support Ethiopian Birr (ETB)?</h3>
              <div class="text-gray-700 space-y-3">
                <p>Several international brokers now offer Ethiopian Birr (ETB) as a base currency option, including XM Group, Exness, OctaFX, and FBS. This provides Ethiopian traders with several benefits:</p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>Direct account funding in Ethiopian Birr</li>
                  <li>Easier understanding of account balance and P&L</li>
                  <li>Reduced currency conversion complexities</li>
                  <li>Better alignment with local financial planning</li>
                </ul>
                <p>Even brokers without direct ETB support often provide competitive exchange rates and transparent conversion processes for Ethiopian traders.</p>
              </div>
            </div>

            <div class="border border-gray-200 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Are Islamic trading accounts available for Ethiopian traders?</h3>
              <div class="text-gray-700 space-y-3">
                <p>Yes, all major international brokers serving Ethiopian traders offer Islamic (swap-free) accounts that comply with Shariah principles. These accounts feature:</p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>No overnight interest charges (swap-free trading)</li>
                  <li>Shariah-compliant trading structure</li>
                  <li>Same competitive spreads and trading conditions</li>
                  <li>Full access to major currency pairs and instruments</li>
                  <li>Dedicated Islamic account managers in many cases</li>
                </ul>
                <p>Given Ethiopia's significant Muslim population, brokers ensure their Islamic accounts meet strict Shariah compliance standards.</p>
              </div>
            </div>

            <div class="border border-gray-200 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3">What deposit methods work for Ethiopian traders?</h3>
              <div class="text-gray-700 space-y-3">
                <p>Ethiopian traders have access to several deposit methods, though options may be more limited than in other markets:</p>
                <div class="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">International Methods:</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>International bank wire transfers</li>
                      <li>Credit/debit cards (where available)</li>
                      <li>Skrill and Neteller e-wallets</li>
                      <li>Perfect Money</li>
                      <li>Cryptocurrency (selected brokers)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Local Solutions:</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>Ethiopian bank transfers (growing availability)</li>
                      <li>Local payment processors</li>
                      <li>Mobile money solutions (emerging)</li>
                      <li>Regional payment networks</li>
                      <li>Agent banking services</li>
                    </ul>
                  </div>
                </div>
                <p class="text-sm bg-blue-50 border border-blue-200 rounded p-3 mt-4">
                  Note: Deposit methods may vary by broker and are subject to Ethiopian banking regulations and NBE foreign exchange controls.
                </p>
              </div>
            </div>

            <div class="border border-gray-200 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3">What should Ethiopian traders know about taxes?</h3>
              <div class="text-gray-700 space-y-3">
                <p>Ethiopian tax implications for forex trading can be complex and may include:</p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Capital Gains:</strong> Profits from trading may be subject to capital gains tax</li>
                  <li><strong>Business Income:</strong> Regular trading activity might be considered business income</li>
                  <li><strong>Foreign Exchange:</strong> NBE regulations may apply to foreign currency transactions</li>
                  <li><strong>Record Keeping:</strong> Maintain detailed records of all trading activities</li>
                  <li><strong>Declaration:</strong> Consider declaring foreign investments as required by law</li>
                </ul>
                <p class="text-sm bg-yellow-50 border border-yellow-200 rounded p-3 mt-4">
                  <strong>Important:</strong> Ethiopian tax law is complex and evolving. Always consult with qualified Ethiopian tax professionals 
                  and legal advisors to understand your specific obligations and ensure compliance with all applicable laws.
                </p>
              </div>
            </div>

            <div class="border border-gray-200 rounded-lg p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3">How to choose the best forex broker for Ethiopia?</h3>
              <div class="text-gray-700 space-y-3">
                <p>When selecting a forex broker as an Ethiopian trader, prioritize these factors:</p>
                <div class="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Regulatory Safety:</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>Strong international regulation (ASIC, FCA, CySEC)</li>
                      <li>Segregated client funds protection</li>
                      <li>Transparent fee structures</li>
                      <li>Compensation schemes where available</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Ethiopia-Specific Features:</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>Ethiopian Birr (ETB) base currency support</li>
                      <li>Islamic account availability</li>
                      <li>Low minimum deposit requirements</li>
                      <li>Ethiopian customer support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Trading Conditions:</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>Competitive spreads and commissions</li>
                      <li>Reliable trading platforms</li>
                      <li>Good execution quality</li>
                      <li>Diverse trading instruments</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Support Services:</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>Educational resources</li>
                      <li>Multilingual support</li>
                      <li>Mobile trading applications</li>
                      <li>African market expertise</li>
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