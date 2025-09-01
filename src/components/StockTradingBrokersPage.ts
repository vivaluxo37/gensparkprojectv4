import { generateStructuredData } from '../utils.js';

interface StockTradingBroker {
  name: string;
  slug: string;
  stockMarkets: string[];
  stockCFDs: number;
  commissionStructure: string;
  fractionalShares: boolean;
  dividendPayouts: boolean;
  shortSelling: boolean;
  platforms: string[];
  researchTools: string[];
  regulation: string[];
  minDeposit: string;
  stockRating: number;
  pros: string[];
  cons: string[];
  specialFeature: string;
}

const stockTradingBrokers: StockTradingBroker[] = [
  {
    name: "IG Markets",
    slug: "ig-markets",
    stockMarkets: ["US", "UK", "EU", "Australia", "Asia"],
    stockCFDs: 17000,
    commissionStructure: "From $10 per trade",
    fractionalShares: true,
    dividendPayouts: true,
    shortSelling: true,
    platforms: ["IG Platform", "MT4", "ProRealTime", "L2 Dealer"],
    researchTools: [
      "Reuters news",
      "Morningstar research",
      "Trading Central",
      "Market screeners",
      "Fundamental analysis",
      "Technical analysis tools"
    ],
    regulation: ["FCA", "ASIC", "MAS"],
    minDeposit: "$300",
    stockRating: 9.4,
    pros: [
      "17,000+ stock CFDs available",
      "Access to global stock markets",
      "Professional research tools",
      "Fractional share trading",
      "DMA (Direct Market Access) available"
    ],
    cons: [
      "Higher minimum deposit",
      "Commission-based pricing",
      "Complex fee structure"
    ],
    specialFeature: "17,000+ global stock CFDs with professional research"
  },
  {
    name: "Interactive Brokers",
    slug: "interactive-brokers",
    stockMarkets: ["US", "Canada", "Europe", "Asia", "Australia"],
    stockCFDs: 0,
    commissionStructure: "From $1 per trade (IBKR Lite: $0)",
    fractionalShares: true,
    dividendPayouts: true,
    shortSelling: true,
    platforms: ["TWS", "IBKR Mobile", "WebTrader", "API"],
    researchTools: [
      "Fundamental Explorer",
      "Technical Analyst",
      "Market Scanner",
      "Risk Navigator",
      "Portfolio Analyst",
      "Options Analytics"
    ],
    regulation: ["SEC/FINRA", "FCA", "ASIC", "CIRO"],
    minDeposit: "$0",
    stockRating: 9.5,
    pros: [
      "Access to 150+ global markets",
      "Lowest commission rates",
      "Professional trading tools",
      "Direct stock ownership (not CFDs)",
      "Advanced order types"
    ],
    cons: [
      "Complex platform for beginners",
      "Inactivity fees under $100k",
      "US-focused service"
    ],
    specialFeature: "Direct access to 150+ global stock markets"
  },
  {
    name: "Plus500",
    slug: "plus500",
    stockMarkets: ["US", "UK", "Germany", "France", "Spain"],
    stockCFDs: 2800,
    commissionStructure: "Spread-only (no commission)",
    fractionalShares: true,
    dividendPayouts: true,
    shortSelling: true,
    platforms: ["Plus500 Platform", "Mobile App", "WebTrader"],
    researchTools: [
      "Economic calendar",
      "Price alerts",
      "Market sentiment",
      "Technical indicators",
      "Risk management tools",
      "News feed"
    ],
    regulation: ["FCA", "CySEC", "ASIC", "MAS"],
    minDeposit: "$100",
    stockRating: 8.8,
    pros: [
      "No commission trading (spread-only)",
      "User-friendly platform",
      "Strong regulatory framework",
      "Mobile-first design",
      "Guaranteed stop losses"
    ],
    cons: [
      "CFDs only (no direct stock ownership)",
      "Limited research tools",
      "Higher spreads than competitors"
    ],
    specialFeature: "Commission-free stock CFD trading with guaranteed stops"
  },
  {
    name: "eToro",
    slug: "etoro",
    stockMarkets: ["US", "UK", "Germany", "Europe"],
    stockCFDs: 3000,
    commissionStructure: "$0 commission on stocks (CFDs: spread)",
    fractionalShares: true,
    dividendPayouts: true,
    shortSelling: true,
    platforms: ["eToro Platform", "Mobile App"],
    researchTools: [
      "Social trading feed",
      "CopyTrader system",
      "Popular Investor program",
      "Market insights",
      "Economic calendar",
      "Technical analysis"
    ],
    regulation: ["CySEC", "FCA", "ASIC"],
    minDeposit: "$200",
    stockRating: 8.9,
    pros: [
      "Zero commission stock trading",
      "Social trading and copy trading",
      "Real stocks and stock CFDs",
      "Fractional shares available",
      "User-friendly interface"
    ],
    cons: [
      "Limited advanced trading tools",
      "Withdrawal fees apply",
      "US stocks only for real ownership"
    ],
    specialFeature: "Zero commission stocks with social trading features"
  },
  {
    name: "XTB",
    slug: "xtb",
    stockMarkets: ["US", "UK", "Germany", "France", "Poland"],
    stockCFDs: 5500,
    commissionStructure: "0% on stocks up to €100k/month",
    fractionalShares: false,
    dividendPayouts: true,
    shortSelling: true,
    platforms: ["xStation 5", "MT4", "Mobile App"],
    researchTools: [
      "Trading Academy",
      "Market analysis",
      "Economic calendar",
      "Trading calculator",
      "News and insights",
      "Premium analytics"
    ],
    regulation: ["FCA", "CySEC", "KNF"],
    minDeposit: "$0",
    stockRating: 8.7,
    pros: [
      "0% commission on stocks (up to €100k)",
      "Excellent educational resources",
      "Professional xStation 5 platform",
      "Strong European regulation",
      "Real-time market data"
    ],
    cons: [
      "No fractional shares",
      "Limited to European investors",
      "Commission above €100k threshold"
    ],
    specialFeature: "0% commission stock trading with premium education"
  },
  {
    name: "OANDA",
    slug: "oanda",
    stockMarkets: ["US", "UK", "Germany", "France", "Japan"],
    stockCFDs: 4200,
    commissionStructure: "Spread-only pricing",
    fractionalShares: true,
    dividendPayouts: true,
    shortSelling: true,
    platforms: ["OANDA Trade", "MT4", "TradingView", "API"],
    researchTools: [
      "OANDA Academy",
      "Market analysis",
      "Currency tools",
      "Position calculator",
      "Economic calendar",
      "Autochartist"
    ],
    regulation: ["CFTC/NFA", "FCA", "ASIC", "MAS"],
    minDeposit: "$0",
    stockRating: 8.5,
    pros: [
      "Strong regulatory framework",
      "No minimum deposit",
      "Professional research tools",
      "TradingView integration",
      "Flexible position sizing"
    ],
    cons: [
      "CFDs only (no direct ownership)",
      "Higher spreads than some competitors",
      "Limited stock selection vs specialists"
    ],
    specialFeature: "Zero minimum deposit with strong US regulation"
  },
  {
    name: "Saxo Bank",
    slug: "saxo-bank",
    stockMarkets: ["Global - 36 countries"],
    stockCFDs: 23000,
    commissionStructure: "From $3 per trade",
    fractionalShares: true,
    dividendPayouts: true,
    shortSelling: true,
    platforms: ["SaxoTraderGO", "SaxoTraderPRO", "Mobile Apps"],
    researchTools: [
      "Saxo Research",
      "TradingFloor.com",
      "Autochartist",
      "Market screeners",
      "Fundamental data",
      "Options analytics"
    ],
    regulation: ["DFSA", "FCA", "ASIC", "MAS"],
    minDeposit: "$2,000",
    stockRating: 9.0,
    pros: [
      "Access to 36+ global markets",
      "23,000+ stocks and ETFs",
      "Professional trading platforms",
      "Excellent research capabilities",
      "Direct stock ownership available"
    ],
    cons: [
      "High minimum deposit",
      "Complex fee structure",
      "Platform complexity for beginners"
    ],
    specialFeature: "Professional access to 36+ global stock markets"
  },
  {
    name: "CMC Markets",
    slug: "cmc-markets",
    stockMarkets: ["US", "UK", "Australia", "Germany", "France"],
    stockCFDs: 9000,
    commissionStructure: "From $9.90 per trade",
    fractionalShares: false,
    dividendPayouts: true,
    shortSelling: true,
    platforms: ["CMC Markets Platform", "MT4", "Mobile App"],
    researchTools: [
      "Reuters news",
      "Morningstar research",
      "Trading Central",
      "Technical analysis",
      "Market screeners",
      "Charting tools"
    ],
    regulation: ["FCA", "ASIC", "CIRO"],
    minDeposit: "$0",
    stockRating: 8.6,
    pros: [
      "Comprehensive market coverage",
      "Professional charting tools",
      "Strong regulatory oversight",
      "No minimum deposit",
      "Advanced order types"
    ],
    cons: [
      "Higher commission rates",
      "No fractional shares",
      "CFD focus rather than direct stocks"
    ],
    specialFeature: "Professional charting with comprehensive market access"
  }
];

interface PageOptions {
  canonicalUrl: string;
  request: Request;
}

export function renderStockTradingBrokersPage(options: PageOptions): string {
  const currentDate = new Date().toISOString().split('T')[0];

  return `
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-green-50 via-white to-blue-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex justify-center items-center mb-6">
            <div class="p-3 bg-green-100 rounded-full">
              <i class="fas fa-chart-bar text-3xl text-green-600"></i>
            </div>
          </div>
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Best Stock Trading Brokers <span class="text-green-600">2025</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Compare the top stock trading brokers offering access to global markets, 
            commission-free trading, and professional research tools for equity investors.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div class="text-2xl font-bold text-green-600 mb-2">23K+</div>
              <div class="text-sm text-gray-600">Global Stocks</div>
            </div>
            <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div class="text-2xl font-bold text-blue-600 mb-2">$0</div>
              <div class="text-sm text-gray-600">Commission Options</div>
            </div>
            <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div class="text-2xl font-bold text-purple-600 mb-2">150+</div>
              <div class="text-sm text-gray-600">Global Markets</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stock Broker Comparison -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
          <i class="fas fa-building text-green-600 mr-2"></i>
          Stock Trading Broker Comparison
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-gray-100">
                <th class="text-left py-3 px-2 font-semibold text-gray-900">Broker</th>
                <th class="text-center py-3 px-2 font-semibold text-gray-900">Stocks Available</th>
                <th class="text-center py-3 px-2 font-semibold text-gray-900">Commission</th>
                <th class="text-center py-3 px-2 font-semibold text-gray-900">Markets</th>
                <th class="text-center py-3 px-2 font-semibold text-gray-900">Min Deposit</th>
                <th class="text-center py-3 px-2 font-semibold text-gray-900">Rating</th>
              </tr>
            </thead>
            <tbody>
              ${stockTradingBrokers.slice(0, 6).map((broker, index) => `
                <tr class="border-b border-gray-50 hover:bg-gray-50">
                  <td class="py-4 px-2">
                    <div class="flex items-center">
                      <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span class="text-green-600 font-bold text-sm">${index + 1}</span>
                      </div>
                      <div>
                        <div class="font-semibold text-gray-900">${broker.name}</div>
                        <div class="text-xs text-gray-500">${broker.specialFeature}</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-2 text-center font-semibold text-blue-600">
                    ${broker.stockCFDs > 0 ? `${broker.stockCFDs.toLocaleString()}+` : 'Direct Access'}
                  </td>
                  <td class="py-4 px-2 text-center text-sm">
                    <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      ${broker.commissionStructure.includes('$0') || broker.commissionStructure.includes('0%') ? 'Free*' : 'Low Cost'}
                    </span>
                  </td>
                  <td class="py-4 px-2 text-center text-sm">${broker.stockMarkets.length} regions</td>
                  <td class="py-4 px-2 text-center text-gray-700">${broker.minDeposit}</td>
                  <td class="py-4 px-2 text-center">
                    <div class="flex items-center justify-center">
                      <span class="text-yellow-400 mr-1">★</span>
                      <span class="font-semibold">${broker.stockRating}</span>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Stock Trading Benefits -->
    <div class="bg-gradient-to-r from-gray-50 to-green-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Why Trade Stocks Online?
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Online stock trading offers access to global markets, lower costs, and professional tools for individual investors.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <i class="fas fa-globe text-green-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Global Markets</h3>
            <p class="text-gray-600 text-sm">
              Access stocks from 150+ global markets including US, Europe, Asia, and emerging markets.
            </p>
          </div>
          
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <i class="fas fa-dollar-sign text-blue-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Low Costs</h3>
            <p class="text-gray-600 text-sm">
              Commission-free trading on many platforms, with competitive rates for professional features.
            </p>
          </div>
          
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <i class="fas fa-chart-line text-purple-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Research Tools</h3>
            <p class="text-gray-600 text-sm">
              Professional research, fundamental analysis, technical indicators, and market screeners.
            </p>
          </div>
          
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <i class="fas fa-mobile-alt text-orange-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-3">Mobile Trading</h3>
            <p class="text-gray-600 text-sm">
              Trade stocks anywhere with professional mobile apps offering full platform functionality.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Reviews -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Best Stock Trading Brokers Detailed Reviews
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive analysis of stock trading features, costs, and market access for each broker.
        </p>
      </div>

      <div class="space-y-8">
        ${stockTradingBrokers.map((broker, index) => `
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="p-8">
              <div class="flex items-start justify-between mb-6">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <span class="text-white font-bold text-lg">${index + 1}</span>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-1">${broker.name}</h3>
                    <div class="flex items-center mb-2">
                      <div class="flex items-center mr-4">
                        <span class="text-yellow-400 mr-1">★</span>
                        <span class="font-semibold text-gray-900">${broker.stockRating}</span>
                        <span class="text-gray-500 text-sm ml-1">/10</span>
                      </div>
                      <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        ${broker.specialFeature}
                      </span>
                    </div>
                    <div class="flex items-center text-sm text-gray-600">
                      <span class="mr-4">
                        <i class="fas fa-building text-green-600 mr-1"></i>
                        ${broker.stockCFDs > 0 ? `${broker.stockCFDs.toLocaleString()}+ stocks` : 'Direct access'}
                      </span>
                      <span class="mr-4">
                        <i class="fas fa-dollar-sign text-blue-600 mr-1"></i>
                        ${broker.minDeposit} min
                      </span>
                      <span>
                        <i class="fas fa-globe text-purple-600 mr-1"></i>
                        ${broker.stockMarkets.length} markets
                      </span>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <a href="/reviews/${broker.slug}" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Full Review
                  </a>
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2">
                  <div class="mb-6">
                    <h4 class="font-semibold text-gray-900 mb-3">
                      <i class="fas fa-search text-blue-600 mr-2"></i>
                      Research Tools & Features
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      ${broker.researchTools.map(tool => `
                        <span class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                          ${tool}
                        </span>
                      `).join('')}
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                <div class="bg-gray-50 rounded-xl p-6">
                  <h4 class="font-semibold text-gray-900 mb-4">Trading Details</h4>
                  <div class="space-y-3">
                    <div class="flex justify-between items-center py-2 border-b border-gray-200">
                      <span class="text-sm text-gray-600">Commission</span>
                      <span class="font-semibold text-gray-900 text-xs text-right">${broker.commissionStructure}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200">
                      <span class="text-sm text-gray-600">Markets</span>
                      <span class="font-semibold text-gray-900 text-xs">${broker.stockMarkets.join(', ')}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200">
                      <span class="text-sm text-gray-600">Fractional Shares</span>
                      <span class="font-semibold text-gray-900">
                        ${broker.fractionalShares ? '✓ Yes' : '✗ No'}
                      </span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200">
                      <span class="text-sm text-gray-600">Dividend Payouts</span>
                      <span class="font-semibold text-gray-900">
                        ${broker.dividendPayouts ? '✓ Yes' : '✗ No'}
                      </span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200">
                      <span class="text-sm text-gray-600">Short Selling</span>
                      <span class="font-semibold text-gray-900">
                        ${broker.shortSelling ? '✓ Yes' : '✗ No'}
                      </span>
                    </div>
                    <div class="flex justify-between items-center py-2">
                      <span class="text-sm text-gray-600">Platforms</span>
                      <span class="font-semibold text-gray-900 text-xs text-right">${broker.platforms.slice(0,2).join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Stock Trading FAQ
        </h2>
        <p class="text-lg text-gray-600">
          Common questions about online stock trading and broker selection
        </p>
      </div>

      <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            <i class="fas fa-question-circle text-green-600 mr-2"></i>
            What's the difference between stock CFDs and real stocks?
          </h3>
          <p class="text-gray-600 mb-4">
            Real stocks give you actual ownership of company shares with voting rights and direct dividend payments. 
            Stock CFDs are derivative contracts that track stock prices but don't provide ownership - you're trading 
            the price difference with leverage and may pay overnight fees.
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            <i class="fas fa-question-circle text-green-600 mr-2"></i>
            Which broker offers the lowest stock trading costs?
          </h3>
          <p class="text-gray-600 mb-4">
            eToro and XTB offer zero-commission stock trading with some conditions. Interactive Brokers IBKR Lite offers 
            $0 commissions on US stocks, while traditional brokers like IG Markets charge from $10 per trade but offer 
            access to more global markets and professional tools.
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            <i class="fas fa-question-circle text-green-600 mr-2"></i>
            Can I trade stocks from different countries?
          </h3>
          <p class="text-gray-600 mb-4">
            Yes, many brokers offer access to global stock markets. Interactive Brokers provides access to 150+ markets, 
            while Saxo Bank covers 36+ countries. However, tax implications and regulations vary by your country of residence 
            and the markets you trade.
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            <i class="fas fa-question-circle text-green-600 mr-2"></i>
            What are fractional shares and which brokers offer them?
          </h3>
          <p class="text-gray-600 mb-4">
            Fractional shares allow you to buy portions of expensive stocks (like Berkshire Hathaway or Amazon) with smaller amounts. 
            This makes diversification easier with limited capital. Most modern brokers including eToro, Interactive Brokers, 
            and IG Markets now offer fractional share trading.
          </p>
        </div>
      </div>
    </div>

    ${generateStructuredData({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Best Stock Trading Brokers 2025",
      "description": "Compare the top stock trading brokers offering access to global markets, commission-free trading, and professional research tools",
      "url": "https://brokeranalysis.com/brokers/stock-trading",
      "datePublished": currentDate,
      "dateModified": currentDate,
      "mainEntity": {
        "@type": "ItemList",
        "name": "Stock Trading Brokers",
        "numberOfItems": stockTradingBrokers.length,
        "itemListElement": stockTradingBrokers.map((broker, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "FinancialProduct",
            "name": `${broker.name} Stock Trading`,
            "description": `${broker.name} - ${broker.specialFeature}`,
            "url": `https://brokeranalysis.com/reviews/${broker.slug}`,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": broker.stockRating,
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