import { generateStructuredData, getCurrentDomain } from '../utils';

interface ScalpingBroker {
  name: string;
  slug: string;
  executionSpeed: string;
  rawSpread: string;
  commission: string;
  scalpingFeatures: string[];
  platforms: string[];
  regulation: string[];
  minDeposit: string;
  maxLeverage: string;
  vpsOffered: boolean;
  eaSupport: boolean;
  scalpingRating: number;
  pros: string[];
  cons: string[];
  specialFeature: string;
}

const scalpingBrokers: ScalpingBroker[] = [
  {
    name: "BlackBull Markets",
    slug: "blackbull-markets",
    executionSpeed: "72ms",
    rawSpread: "0.14 pips",
    commission: "$3.00/side",
    scalpingFeatures: [
      "Fastest execution speeds",
      "ECN Prime account",
      "No minimum deposit",
      "VPS hosting available",
      "Freeze level 0"
    ],
    platforms: ["MT4", "MT5", "TradingView"],
    regulation: ["FSA (Seychelles)", "FSCL (New Zealand)"],
    minDeposit: "$0",
    maxLeverage: "1:500",
    vpsOffered: true,
    eaSupport: true,
    scalpingRating: 9.2,
    pros: [
      "Ultra-fast execution at 72ms average",
      "ECN pricing with tight raw spreads",
      "No minimum deposit requirement",
      "Professional VPS service",
      "Zero restrictions on scalping"
    ],
    cons: [
      "Limited regulatory oversight",
      "Higher spreads on major pairs",
      "Limited educational resources"
    ],
    specialFeature: "Fastest execution speeds in the industry"
  },
  {
    name: "FP Markets",
    slug: "fp-markets",
    executionSpeed: "225ms",
    rawSpread: "0.10 pips",
    commission: "$3.00/side",
    scalpingFeatures: [
      "Ultra-low raw spreads",
      "Equinix data centers",
      "Freeze level 0",
      "No minimum order distance",
      "STP/ECN execution"
    ],
    platforms: ["MT4", "MT5", "cTrader", "IRESS"],
    regulation: ["ASIC", "CySEC", "FSCA"],
    minDeposit: "$100",
    maxLeverage: "1:500",
    vpsOffered: true,
    eaSupport: true,
    scalpingRating: 9.1,
    pros: [
      "Consistently tight raw spreads",
      "Strong regulatory framework",
      "Professional trading infrastructure",
      "Multiple platform options",
      "Excellent order execution"
    ],
    cons: [
      "Higher minimum deposit",
      "Complex pricing structure",
      "Limited social features"
    ],
    specialFeature: "Ultra-low raw spreads with institutional-grade infrastructure"
  },
  {
    name: "IC Markets",
    slug: "ic-markets",
    executionSpeed: "134ms",
    rawSpread: "0.02 pips",
    commission: "$3.50/side",
    scalpingFeatures: [
      "Industry-lowest raw spreads",
      "True ECN environment",
      "VPS hosting",
      "Depth of Market",
      "Advanced order types"
    ],
    platforms: ["MT4", "MT5", "cTrader", "TradingView"],
    regulation: ["ASIC", "CySEC", "FSA", "FSCA"],
    minDeposit: "$200",
    maxLeverage: "1:500",
    vpsOffered: true,
    eaSupport: true,
    scalpingRating: 9.3,
    pros: [
      "Tightest raw spreads (0.02 pips EUR/USD)",
      "True ECN with transparency",
      "Multiple regulatory licenses",
      "Professional VPS service",
      "Advanced trading platforms"
    ],
    cons: [
      "Higher commission rates",
      "Minimum deposit requirement",
      "Complex account types"
    ],
    specialFeature: "Industry's tightest raw spreads on major pairs"
  },
  {
    name: "Pepperstone",
    slug: "pepperstone",
    executionSpeed: "77ms",
    rawSpread: "0.10 pips",
    commission: "$3.50/side",
    scalpingFeatures: [
      "Smart Trader Tools",
      "28 MT4 enhancements",
      "AutoChartist integration",
      "VPS hosting",
      "Zero-distance orders"
    ],
    platforms: ["MT4", "MT5", "cTrader", "TradingView"],
    regulation: ["ASIC", "FCA", "CySEC", "DFSA", "SCB"],
    minDeposit: "$200",
    maxLeverage: "1:400",
    vpsOffered: true,
    eaSupport: true,
    scalpingRating: 9.0,
    pros: [
      "Enhanced MT4 with Smart Trader Tools",
      "Excellent automated trading support",
      "Strong regulatory coverage",
      "Professional research tools",
      "Reliable VPS hosting"
    ],
    cons: [
      "Higher spreads than competitors",
      "Account verification delays",
      "Limited customer support hours"
    ],
    specialFeature: "Smart Trader Tools suite for enhanced MT4 scalping"
  },
  {
    name: "Eightcap",
    slug: "eightcap",
    executionSpeed: "143ms",
    rawSpread: "0.06 pips",
    commission: "$3.50/side",
    scalpingFeatures: [
      "TradingView integration",
      "Raw ECN pricing",
      "Crypto scalping",
      "Social copy trading",
      "Advanced charting"
    ],
    platforms: ["MT4", "MT5", "TradingView", "WebTrader"],
    regulation: ["ASIC", "FCA", "CySEC", "SCB"],
    minDeposit: "$100",
    maxLeverage: "1:500",
    vpsOffered: false,
    eaSupport: true,
    scalpingRating: 8.8,
    pros: [
      "Excellent TradingView integration",
      "Low raw spreads on majors",
      "Cryptocurrency scalping available",
      "Modern trading interface",
      "Social trading features"
    ],
    cons: [
      "No VPS service offered",
      "Limited advanced tools",
      "Newer broker with shorter track record"
    ],
    specialFeature: "Superior TradingView integration with social trading"
  },
  {
    name: "FXTM",
    slug: "fxtm",
    executionSpeed: "160ms",
    rawSpread: "0.10 pips",
    commission: "$4.00/side",
    scalpingFeatures: [
      "High leverage options",
      "ECN execution",
      "Professional analytics",
      "VPS hosting",
      "Copy trading"
    ],
    platforms: ["MT4", "MT5", "FXTM Trader"],
    regulation: ["CySEC", "FCA", "FSCA"],
    minDeposit: "$10",
    maxLeverage: "1:1000",
    vpsOffered: true,
    eaSupport: true,
    scalpingRating: 8.7,
    pros: [
      "Very high leverage up to 1:1000",
      "Low minimum deposit",
      "Strong regulatory framework",
      "Professional market analysis",
      "VPS hosting available"
    ],
    cons: [
      "Higher commission rates",
      "Variable spread quality",
      "Complex fee structure"
    ],
    specialFeature: "Ultra-high leverage for amplified scalping returns"
  },
  {
    name: "HF Markets",
    slug: "hf-markets",
    executionSpeed: "~150ms",
    rawSpread: "0.10 pips",
    commission: "$3.00/side",
    scalpingFeatures: [
      "AI-powered tools",
      "Sentiment analysis",
      "Volatility protection",
      "Cent accounts",
      "Copy trading"
    ],
    platforms: ["MT4", "MT5", "HFCopy"],
    regulation: ["CySEC", "FSCA", "FCA", "DFSA"],
    minDeposit: "$5",
    maxLeverage: "1:1000",
    vpsOffered: true,
    eaSupport: true,
    scalpingRating: 8.5,
    pros: [
      "Advanced AI trading tools",
      "Very low minimum deposit",
      "Multiple account types",
      "Strong copy trading platform",
      "Comprehensive market analysis"
    ],
    cons: [
      "Execution speeds not the fastest",
      "Complex platform interface",
      "Limited scalping education"
    ],
    specialFeature: "AI-powered sentiment and volatility analysis tools"
  },
  {
    name: "AvaTrade",
    slug: "avatrade",
    executionSpeed: "160ms",
    rawSpread: "0.9 pips",
    commission: "Commission-free",
    scalpingFeatures: [
      "Fixed spreads",
      "No commission model",
      "AvaProtect hedging",
      "Copy trading",
      "DupliTrade platform"
    ],
    platforms: ["MT4", "MT5", "AvaTradeGO", "WebTrader"],
    regulation: ["CySEC", "ASIC", "FSA", "ADGM"],
    minDeposit: "$100",
    maxLeverage: "1:400",
    vpsOffered: false,
    eaSupport: true,
    scalpingRating: 8.3,
    pros: [
      "Predictable fixed spreads",
      "No commission charges",
      "AvaProtect risk management",
      "Strong regulatory coverage",
      "Multiple trading platforms"
    ],
    cons: [
      "Higher fixed spreads",
      "No VPS service offered",
      "Limited scalping optimization"
    ],
    specialFeature: "Commission-free fixed spreads for predictable costs"
  }
];

interface PageOptions {
  canonicalUrl: string;
  request: Request;
}

export function renderScalpingBrokersPage(options: PageOptions): string {
  const currentDate = new Date().toISOString().split('T')[0];

  return `
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex justify-center items-center mb-6">
            <div class="p-3 bg-blue-100 rounded-full">
              <i class="fas fa-bolt text-3xl text-blue-600"></i>
            </div>
          </div>
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Best Scalping Forex Brokers <span class="text-blue-600">2025</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Compare the fastest execution brokers for scalping strategies. Find ultra-low spreads, 
            lightning-fast execution speeds, and professional trading infrastructure.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div class="text-2xl font-bold text-blue-600 mb-2">72ms</div>
              <div class="text-sm text-gray-600">Fastest Execution</div>
            </div>
            <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div class="text-2xl font-bold text-green-600 mb-2">0.02</div>
              <div class="text-sm text-gray-600">Lowest Raw Spreads</div>
            </div>
            <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div class="text-2xl font-bold text-purple-600 mb-2">8</div>
              <div class="text-sm text-gray-600">Scalping Specialists</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Comparison Table -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
          <i class="fas fa-tachometer-alt text-blue-600 mr-2"></i>
          Quick Scalping Comparison
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-gray-100">
                <th class="text-left py-3 px-2 font-semibold text-gray-900">Broker</th>
                <th class="text-center py-3 px-2 font-semibold text-gray-900">Execution Speed</th>
                <th class="text-center py-3 px-2 font-semibold text-gray-900">Raw Spread (EUR/USD)</th>
                <th class="text-center py-3 px-2 font-semibold text-gray-900">Commission</th>
                <th class="text-center py-3 px-2 font-semibold text-gray-900">Rating</th>
                <th class="text-center py-3 px-2 font-semibold text-gray-900">VPS</th>
              </tr>
            </thead>
            <tbody>
              ${scalpingBrokers.slice(0, 6).map((broker, index) => `
                <tr class="border-b border-gray-50 hover:bg-gray-50">
                  <td class="py-4 px-2">
                    <div class="flex items-center">
                      <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span class="text-blue-600 font-bold text-sm">${index + 1}</span>
                      </div>
                      <div>
                        <div class="font-semibold text-gray-900">${broker.name}</div>
                        <div class="text-xs text-gray-500">${broker.specialFeature}</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-2 text-center">
                    <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      ${broker.executionSpeed}
                    </span>
                  </td>
                  <td class="py-4 px-2 text-center font-semibold text-blue-600">${broker.rawSpread}</td>
                  <td class="py-4 px-2 text-center text-gray-700">${broker.commission}</td>
                  <td class="py-4 px-2 text-center">
                    <div class="flex items-center justify-center">
                      <span class="text-yellow-400 mr-1">★</span>
                      <span class="font-semibold">${broker.scalpingRating}</span>
                    </div>
                  </td>
                  <td class="py-4 px-2 text-center">
                    ${broker.vpsOffered 
                      ? '<i class="fas fa-check text-green-500"></i>' 
                      : '<i class="fas fa-times text-red-400"></i>'
                    }
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-500 mb-4">
            Rankings based on execution speed, raw spreads, commission rates, and scalping-specific features
          </p>
          <a href="#detailed-reviews" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <i class="fas fa-arrow-down mr-2"></i>
            View Detailed Reviews
          </a>
        </div>
      </div>
    </div>

    <!-- Scalping Requirements Guide -->
    <div class="bg-gradient-to-r from-gray-50 to-blue-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Essential Scalping Requirements
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Successful scalping requires specific broker characteristics. Here's what professional scalpers need.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <i class="fas fa-rocket text-red-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Ultra-Fast Execution</h3>
            <p class="text-gray-600 text-sm mb-3">
              Execution speeds under 100ms are critical. Every millisecond counts when entering and exiting rapid trades.
            </p>
            <div class="text-xs text-gray-500">
              <strong>Target:</strong> <50ms execution
            </div>
          </div>
          
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <i class="fas fa-chart-line text-green-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Raw Spreads</h3>
            <p class="text-gray-600 text-sm mb-3">
              ECN/STP accounts with raw spreads from 0.0 pips plus commission offer the lowest trading costs.
            </p>
            <div class="text-xs text-gray-500">
              <strong>Target:</strong> <0.5 pips raw
            </div>
          </div>
          
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <i class="fas fa-server text-blue-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">VPS Hosting</h3>
            <p class="text-gray-600 text-sm mb-3">
              Virtual Private Servers reduce latency and enable 24/7 automated scalping strategies and EAs.
            </p>
            <div class="text-xs text-gray-500">
              <strong>Target:</strong> <10ms latency
            </div>
          </div>
          
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <i class="fas fa-cogs text-purple-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Advanced Tools</h3>
            <p class="text-gray-600 text-sm mb-3">
              Depth of Market, one-click trading, advanced order types, and EA support are essential for scalpers.
            </p>
            <div class="text-xs text-gray-500">
              <strong>Platforms:</strong> MT4/MT5/cTrader
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Broker Reviews -->
    <div id="detailed-reviews" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Detailed Scalping Broker Reviews
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          In-depth analysis of each broker's scalping capabilities, execution quality, and trading conditions.
        </p>
      </div>

      <div class="space-y-8">
        ${scalpingBrokers.map((broker, index) => `
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="p-8">
              <div class="flex items-start justify-between mb-6">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <span class="text-white font-bold text-lg">${index + 1}</span>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-1">${broker.name}</h3>
                    <div class="flex items-center mb-2">
                      <div class="flex items-center mr-4">
                        <span class="text-yellow-400 mr-1">★</span>
                        <span class="font-semibold text-gray-900">${broker.scalpingRating}</span>
                        <span class="text-gray-500 text-sm ml-1">/10</span>
                      </div>
                      <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        ${broker.specialFeature}
                      </span>
                    </div>
                    <div class="flex items-center text-sm text-gray-600">
                      <span class="mr-4">
                        <i class="fas fa-tachometer-alt text-green-600 mr-1"></i>
                        ${broker.executionSpeed}
                      </span>
                      <span class="mr-4">
                        <i class="fas fa-chart-line text-blue-600 mr-1"></i>
                        ${broker.rawSpread} spread
                      </span>
                      <span>
                        <i class="fas fa-dollar-sign text-purple-600 mr-1"></i>
                        ${broker.commission}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <a href="/reviews/${broker.slug}" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Full Review
                  </a>
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 class="font-semibold text-gray-900 mb-3">
                        <i class="fas fa-thumbs-up text-green-600 mr-2"></i>
                        Pros
                      </h4>
                      <ul class="space-y-2">
                        ${broker.pros.map(pro => `
                          <li class="text-sm text-gray-600 flex items-start">
                            <i class="fas fa-check text-green-500 mt-1 mr-2 text-xs"></i>
                            <span>${pro}</span>
                          </li>
                        `).join('')}
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900 mb-3">
                        <i class="fas fa-thumbs-down text-red-600 mr-2"></i>
                        Cons
                      </h4>
                      <ul class="space-y-2">
                        ${broker.cons.map(con => `
                          <li class="text-sm text-gray-600 flex items-start">
                            <i class="fas fa-times text-red-400 mt-1 mr-2 text-xs"></i>
                            <span>${con}</span>
                          </li>
                        `).join('')}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 class="font-semibold text-gray-900 mb-3">
                      <i class="fas fa-bolt text-blue-600 mr-2"></i>
                      Scalping Features
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      ${broker.scalpingFeatures.map(feature => `
                        <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          ${feature}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <div class="bg-gray-50 rounded-xl p-6">
                  <h4 class="font-semibold text-gray-900 mb-4">Trading Conditions</h4>
                  <div class="space-y-3">
                    <div class="flex justify-between items-center py-2 border-b border-gray-200">
                      <span class="text-sm text-gray-600">Min Deposit</span>
                      <span class="font-semibold text-gray-900">${broker.minDeposit}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200">
                      <span class="text-sm text-gray-600">Max Leverage</span>
                      <span class="font-semibold text-gray-900">${broker.maxLeverage}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200">
                      <span class="text-sm text-gray-600">Platforms</span>
                      <span class="font-semibold text-gray-900 text-right">${broker.platforms.join(', ')}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200">
                      <span class="text-sm text-gray-600">Regulation</span>
                      <span class="font-semibold text-gray-900 text-right">${broker.regulation.join(', ')}</span>
                    </div>
                    <div class="flex justify-between items-center py-2">
                      <span class="text-sm text-gray-600">EA Support</span>
                      <span class="font-semibold text-gray-900">
                        ${broker.eaSupport ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Trading Cost Calculator -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-4">
            Scalping Cost Calculator
          </h2>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto">
            Calculate your total trading costs based on spreads, commissions, and trade frequency
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-2xl p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-6">Calculator Settings</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Broker Selection
                  </label>
                  <select id="scalping-broker-select" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select a broker</option>
                    ${scalpingBrokers.map(broker => `
                      <option value="${broker.slug}" 
                              data-spread="${parseFloat(broker.rawSpread)}" 
                              data-commission="${parseFloat(broker.commission.replace(/[^0-9.]/g, ''))}">
                        ${broker.name} (${broker.rawSpread}, ${broker.commission})
                      </option>
                    `).join('')}
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Trade Size (Lots)
                  </label>
                  <input type="number" id="trade-size" value="1" step="0.1" min="0.01" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Trades Per Day
                  </label>
                  <input type="number" id="trades-per-day" value="20" step="1" min="1" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Trading Days Per Month
                  </label>
                  <input type="number" id="trading-days" value="20" step="1" min="1" max="31"
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>

                <button onclick="calculateScalpingCosts()" 
                        class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <i class="fas fa-calculator mr-2"></i>
                  Calculate Trading Costs
                </button>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-6">Cost Breakdown</h3>
              <div id="cost-results" class="space-y-4">
                <div class="text-gray-500 text-center py-12">
                  <i class="fas fa-calculator text-4xl mb-4"></i>
                  <p>Select a broker and configure your settings to see cost calculations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Scalping Trading FAQ
        </h2>
        <p class="text-lg text-gray-600">
          Common questions about scalping forex trading and broker requirements
        </p>
      </div>

      <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            <i class="fas fa-question-circle text-blue-600 mr-2"></i>
            What is forex scalping?
          </h3>
          <p class="text-gray-600 mb-4">
            Forex scalping is a high-frequency trading strategy where traders make numerous small trades throughout the day, 
            typically holding positions for seconds to minutes. Scalpers aim to profit from small price movements by entering 
            and exiting trades quickly, often making 50-200+ trades per day.
          </p>
          <div class="bg-blue-50 p-4 rounded-lg">
            <p class="text-sm text-blue-800">
              <strong>Key characteristics:</strong> High trade frequency, small profit targets (2-5 pips), 
              tight stop losses, and requires fast execution speeds.
            </p>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            <i class="fas fa-question-circle text-blue-600 mr-2"></i>
            Which broker has the fastest execution for scalping?
          </h3>
          <p class="text-gray-600 mb-4">
            BlackBull Markets currently offers the fastest execution speeds at 72ms average, making it ideal for scalping strategies. 
            Pepperstone (77ms) and IC Markets (134ms) also provide excellent execution speeds suitable for professional scalpers.
          </p>
          <div class="bg-green-50 p-4 rounded-lg">
            <p class="text-sm text-green-800">
              <strong>Pro tip:</strong> Consider using a VPS service located close to your broker's servers 
              to achieve sub-10ms latency for maximum scalping performance.
            </p>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            <i class="fas fa-question-circle text-blue-600 mr-2"></i>
            What are raw spreads and why are they important for scalpers?
          </h3>
          <p class="text-gray-600 mb-4">
            Raw spreads are the actual interbank spreads without markup, typically offered on ECN accounts. 
            Instead of marked-up spreads, brokers charge a separate commission per trade. This transparency 
            often results in lower total trading costs for high-frequency traders.
          </p>
          <div class="overflow-x-auto mt-4">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-50">
                  <th class="text-left py-2 px-3 font-semibold">Account Type</th>
                  <th class="text-center py-2 px-3 font-semibold">EUR/USD Spread</th>
                  <th class="text-center py-2 px-3 font-semibold">Commission</th>
                  <th class="text-center py-2 px-3 font-semibold">Total Cost*</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-t">
                  <td class="py-2 px-3">Standard Account</td>
                  <td class="py-2 px-3 text-center">1.2 pips</td>
                  <td class="py-2 px-3 text-center">$0</td>
                  <td class="py-2 px-3 text-center">$12.00</td>
                </tr>
                <tr class="border-t">
                  <td class="py-2 px-3">Raw/ECN Account</td>
                  <td class="py-2 px-3 text-center">0.1 pips</td>
                  <td class="py-2 px-3 text-center">$7.00</td>
                  <td class="py-2 px-3 text-center">$8.00</td>
                </tr>
              </tbody>
            </table>
            <p class="text-xs text-gray-500 mt-2">*Per round-turn lot on EUR/USD</p>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            <i class="fas fa-question-circle text-blue-600 mr-2"></i>
            Is scalping profitable and what are the risks?
          </h3>
          <p class="text-gray-600 mb-4">
            Scalping can be profitable for experienced traders with proper risk management, but it's also highly risky. 
            Success requires discipline, fast reflexes, and excellent market timing. The high trade frequency means 
            transaction costs can quickly accumulate.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-2">Potential Benefits</h4>
              <ul class="text-sm text-green-700 space-y-1">
                <li>• Quick profit realization</li>
                <li>• Reduced overnight risk</li>
                <li>• High trade frequency opportunities</li>
                <li>• Less market analysis required</li>
              </ul>
            </div>
            <div class="bg-red-50 p-4 rounded-lg">
              <h4 class="font-semibold text-red-800 mb-2">Key Risks</h4>
              <ul class="text-sm text-red-700 space-y-1">
                <li>• High transaction costs</li>
                <li>• Emotional stress and fatigue</li>
                <li>• Requires significant time commitment</li>
                <li>• Slippage and execution risk</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            <i class="fas fa-question-circle text-blue-600 mr-2"></i>
            Do I need special software or tools for scalping?
          </h3>
          <p class="text-gray-600 mb-4">
            While not mandatory, certain tools can significantly improve scalping performance. Professional scalpers 
            often use advanced platforms, VPS hosting, and specialized indicators for optimal results.
          </p>
          <div class="space-y-3">
            <div class="flex items-start">
              <i class="fas fa-desktop text-blue-600 mt-1 mr-3"></i>
              <div>
                <h4 class="font-semibold text-gray-900">Advanced Platforms</h4>
                <p class="text-sm text-gray-600">MT4/MT5 with Smart Trader Tools, cTrader with DoM, TradingView Pro</p>
              </div>
            </div>
            <div class="flex items-start">
              <i class="fas fa-server text-green-600 mt-1 mr-3"></i>
              <div>
                <h4 class="font-semibold text-gray-900">VPS Hosting</h4>
                <p class="text-sm text-gray-600">Reduces latency and enables 24/7 automated trading execution</p>
              </div>
            </div>
            <div class="flex items-start">
              <i class="fas fa-robot text-purple-600 mt-1 mr-3"></i>
              <div>
                <h4 class="font-semibold text-gray-900">Expert Advisors (EAs)</h4>
                <p class="text-sm text-gray-600">Automated scalping strategies that can execute faster than humans</p>
              </div>
            </div>
            <div class="flex items-start">
              <i class="fas fa-chart-bar text-orange-600 mt-1 mr-3"></i>
              <div>
                <h4 class="font-semibold text-gray-900">Market Analysis Tools</h4>
                <p class="text-sm text-gray-600">Level II data, economic calendars, sentiment indicators</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Risk Warning -->
    <div class="bg-red-50 border-l-4 border-red-400 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <i class="fas fa-exclamation-triangle text-red-400 text-xl mt-1"></i>
          </div>
          <div class="ml-3">
            <h3 class="text-lg font-semibold text-red-800 mb-2">Risk Warning: Scalping Trading</h3>
            <div class="text-red-700 space-y-2 text-sm">
              <p>
                <strong>High-Risk Strategy:</strong> Scalping involves extremely high-frequency trading with significant risks. 
                The majority of scalpers lose money due to transaction costs, emotional stress, and market volatility.
              </p>
              <p>
                <strong>Capital Requirements:</strong> Successful scalping typically requires substantial capital, 
                professional-grade tools, and extensive market experience. Consider practicing with a demo account first.
              </p>
              <p>
                <strong>Regulatory Notice:</strong> Some jurisdictions restrict or prohibit scalping strategies. 
                Ensure your chosen broker explicitly allows scalping and check local regulations before trading.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script>
      function calculateScalpingCosts() {
        const brokerSelect = document.getElementById('scalping-broker-select');
        const selectedOption = brokerSelect.options[brokerSelect.selectedIndex];
        
        if (!selectedOption.value) {
          alert('Please select a broker first');
          return;
        }
        
        const spread = parseFloat(selectedOption.dataset.spread) || 0;
        const commission = parseFloat(selectedOption.dataset.commission) || 0;
        const tradeSize = parseFloat(document.getElementById('trade-size').value) || 1;
        const tradesPerDay = parseInt(document.getElementById('trades-per-day').value) || 20;
        const tradingDays = parseInt(document.getElementById('trading-days').value) || 20;
        
        // Calculate costs (assuming 1 pip = $10 for 1 lot on EUR/USD)
        const spreadCostPerTrade = spread * 10 * tradeSize;
        const commissionCostPerTrade = commission * 2 * tradeSize; // Round-turn commission
        const totalCostPerTrade = spreadCostPerTrade + commissionCostPerTrade;
        
        const dailyCosts = totalCostPerTrade * tradesPerDay;
        const monthlyCosts = dailyCosts * tradingDays;
        const yearlyCosts = monthlyCosts * 12;
        
        const resultsDiv = document.getElementById('cost-results');
        resultsDiv.innerHTML = \`
          <div class="space-y-4">
            <div class="bg-blue-50 rounded-lg p-4">
              <div class="text-center mb-4">
                <h4 class="font-semibold text-gray-900 mb-1">\${selectedOption.text.split('(')[0].trim()}</h4>
                <p class="text-sm text-gray-600">Cost Analysis</p>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Cost Per Trade</span>
                <span class="font-semibold text-gray-900">$\${totalCostPerTrade.toFixed(2)}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Daily Costs</span>
                <span class="font-semibold text-gray-900">$\${dailyCosts.toFixed(2)}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Monthly Costs</span>
                <span class="font-semibold text-red-600">$\${monthlyCosts.toFixed(2)}</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-sm text-gray-600">Yearly Costs</span>
                <span class="font-bold text-red-600 text-lg">$\${yearlyCosts.toFixed(2)}</span>
              </div>
            </div>
            
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <h5 class="font-semibold text-yellow-800 mb-2">Cost Breakdown</h5>
              <div class="text-sm text-yellow-700 space-y-1">
                <div class="flex justify-between">
                  <span>Spread costs:</span>
                  <span>$\${(spreadCostPerTrade * tradesPerDay * tradingDays).toFixed(2)}/month</span>
                </div>
                <div class="flex justify-between">
                  <span>Commission costs:</span>
                  <span>$\${(commissionCostPerTrade * tradesPerDay * tradingDays).toFixed(2)}/month</span>
                </div>
              </div>
            </div>
            
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <p class="text-xs text-red-700">
                <strong>Profitability Note:</strong> To break even, you need to generate 
                $\${monthlyCosts.toFixed(2)} profit per month just to cover trading costs, 
                before considering other expenses and desired profit margins.
              </p>
            </div>
          </div>
        \`;
      }
    </script>

    ${generateStructuredData({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Best Scalping Forex Brokers 2025",
      "description": "Compare the top forex brokers for scalping with ultra-fast execution, raw spreads, and professional trading infrastructure",
      "url": "https://brokeranalysis.com/brokers/scalping",
      "datePublished": currentDate,
      "dateModified": currentDate,
      "mainEntity": {
        "@type": "ItemList",
        "name": "Scalping Forex Brokers",
        "numberOfItems": scalpingBrokers.length,
        "itemListElement": scalpingBrokers.map((broker, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "FinancialProduct",
            "name": broker.name,
            "description": `${broker.name} - ${broker.specialFeature}`,
            "url": `https://brokeranalysis.com/reviews/${broker.slug}`,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": broker.scalpingRating,
              "bestRating": 10,
              "worstRating": 1,
              "ratingCount": 1
            }
          }
        }))
      }
    })}
  `;
}