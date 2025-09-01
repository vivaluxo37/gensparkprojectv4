import { generateStructuredData, getCurrentDomain } from '../utils';

interface OilTradingBroker {
  name: string;
  slug: string;
  oilInstruments: string[];
  avgSpreads: string;
  minDeposit: string;
  regulation: string[];
  platforms: string[];
  keyFeatures: string[];
  leverageOil: string;
  accountTypes: string[];
  uniqueFeatures: string[];
  suitability: string;
  specialization: string;
}

const oilTradingBrokers: OilTradingBroker[] = [
  {
    name: "FXTM (ForexTime)",
    slug: "fxtm",
    oilInstruments: ["WTI Crude Oil CFD", "Brent Crude Oil CFD", "Energy CFDs"],
    avgSpreads: "0.4 pips (avg)",
    minDeposit: "$200",
    regulation: ["FCA (UK)", "FSCA (South Africa)", "FSC (Mauritius)", "CMA (Kenya)"],
    platforms: ["MetaTrader 4", "MetaTrader 5", "FXTM Trader"],
    keyFeatures: [
      "Lowest average spreads on oil CFDs",
      "£1M Lloyd's of London insurance",
      "Multiple account types",
      "Educational resources"
    ],
    leverageOil: "1:200 (oil specific)",
    accountTypes: ["Standard Account", "Cent Account", "ECN Zero", "Advantage Account"],
    uniqueFeatures: ["Oil-specific leverage limits", "Professional education", "Multiple entities for global access", "Copy trading available"],
    suitability: "Best for beginners and cost-conscious traders",
    specialization: "Tight oil spreads and educational support"
  },
  {
    name: "Axi (AxiTrader)",
    slug: "axi",
    oilInstruments: ["WTI Crude Oil CFD", "Brent Crude Oil CFD", "Energy CFDs"],
    avgSpreads: "0.1 pips (raw spreads from 0.0)",
    minDeposit: "$0",
    regulation: ["ASIC (Australia)", "FCA (UK)", "DFSA (Dubai)", "CySEC (Cyprus)"],
    platforms: ["MetaTrader 4", "Axi Copy Trading", "Axi Mobile"],
    keyFeatures: [
      "Tightest raw spreads on oil",
      "Fast execution (sub-50ms)",
      "Zero minimum deposit",
      "Funded trader program"
    ],
    leverageOil: "Up to 1:500",
    accountTypes: ["Standard Account", "Pro Account", "Elite Account"],
    uniqueFeatures: ["Axi Select funded program (up to $1M)", "Raw ECN pricing", "Professional trader support", "Advanced execution"],
    suitability: "Best for professional oil traders",
    specialization: "Ultra-tight spreads and professional execution"
  },
  {
    name: "ActivTrades",
    slug: "activtrades",
    oilInstruments: ["WTI Crude Oil CFD", "Brent Crude Oil CFD", "Energy CFDs", "Commodity CFDs"],
    avgSpreads: "0.5 pips (avg)",
    minDeposit: "$0",
    regulation: ["FCA (UK)", "CONSOB (Italy)", "SCB (Bahamas)", "CMVM (Portugal)"],
    platforms: ["MetaTrader 4", "MetaTrader 5", "ActivTrader", "TradingView"],
    keyFeatures: [
      "Strong European regulation",
      "Award-winning service",
      "Multiple oil instruments",
      "Professional platforms"
    ],
    leverageOil: "Up to 1:400",
    accountTypes: ["Individual Account", "Professional Account", "Corporate Account"],
    uniqueFeatures: ["European focus", "Award-winning broker", "Multi-jurisdictional licenses", "Strong customer service"],
    suitability: "Best for European oil traders",
    specialization: "Regulatory strength and European market focus"
  },
  {
    name: "IC Markets",
    slug: "ic-markets",
    oilInstruments: ["WTI Crude Oil CFD", "Brent Crude Oil CFD", "Energy CFDs", "2,200+ markets"],
    avgSpreads: "0.82 pips (avg)",
    minDeposit: "$200",
    regulation: ["ASIC (Australia)", "CySEC (Cyprus)", "FSA (Seychelles)", "SCB (Bahamas)"],
    platforms: ["cTrader", "MetaTrader 4", "MetaTrader 5", "IC Social", "ZuluTrade"],
    keyFeatures: [
      "Largest market selection",
      "ECN execution",
      "Perfect for scalping/day trading",
      "Advanced platforms"
    ],
    leverageOil: "Up to 1:500 (varies by jurisdiction)",
    accountTypes: ["Standard Account", "Raw Spread Account", "cTrader Account"],
    uniqueFeatures: ["2,200+ tradeable markets", "True ECN execution", "Scalping-friendly", "Social trading integration"],
    suitability: "Best for active oil day traders",
    specialization: "High-frequency trading and market diversity"
  },
  {
    name: "FP Markets",
    slug: "fp-markets",
    oilInstruments: ["WTI Crude Oil CFD", "Brent Crude Oil CFD", "Energy CFDs", "Commodity CFDs"],
    avgSpreads: "1.2 pips (avg)",
    minDeposit: "$100",
    regulation: ["CySEC (Cyprus)", "ASIC (Australia)", "FSA (Seychelles)", "FSCA (South Africa)"],
    platforms: ["cTrader", "IRESS", "TradingView", "MetaTrader 4", "MetaTrader 5"],
    keyFeatures: [
      "Professional IRESS platform",
      "Energy CFD specialist",
      "Multiple platform options",
      "Highest Trustpilot rating"
    ],
    leverageOil: "Up to 1:500",
    accountTypes: ["Standard Account", "RAW Account", "IRESS Account"],
    uniqueFeatures: ["IRESS professional platform", "Energy CFD focus", "Top customer ratings", "Institutional-grade tools"],
    suitability: "Best for institutional oil trading",
    specialization: "Professional platforms and energy focus"
  },
  {
    name: "IG Group",
    slug: "ig",
    oilInstruments: ["WTI Crude Oil CFD", "Brent Crude Oil CFD", "Energy Futures", "Energy Options", "Commodity Futures"],
    avgSpreads: "1.13 pips (avg)",
    minDeposit: "$50",
    regulation: ["FCA (UK)", "CFTC (USA)", "ASIC (Australia)", "BaFin (Germany)", "MAS (Singapore)"],
    platforms: ["IG Trading Platform", "MetaTrader 4", "ProRealTime", "TradingView"],
    keyFeatures: [
      "Oil futures and options",
      "DMA accounts available",
      "Global regulatory coverage",
      "Multiple product types"
    ],
    leverageOil: "Varies by product and jurisdiction",
    accountTypes: ["CFD Account", "Share Dealing Account", "DMA Account"],
    uniqueFeatures: ["Futures and options access", "DMA trading", "Global reach", "Multi-product platform"],
    suitability: "Best for comprehensive oil market access",
    specialization: "Exchange-traded oil products and global access"
  },
  {
    name: "Pepperstone",
    slug: "pepperstone",
    oilInstruments: ["WTI Crude Oil CFD", "Brent Crude Oil CFD", "Energy CFDs"],
    avgSpreads: "Variable (ECN pricing)",
    minDeposit: "$0",
    regulation: ["ASIC (Australia)", "FCA (UK)", "DFSA (Dubai)", "CySEC (Cyprus)"],
    platforms: ["MetaTrader 4", "MetaTrader 5", "cTrader", "TradingView"],
    keyFeatures: [
      "True ECN execution",
      "Multiple copy trading options",
      "Fast execution",
      "AutoChartist integration"
    ],
    leverageOil: "Up to 1:400",
    accountTypes: ["Standard Account", "Razor Account", "Islamic Account"],
    uniqueFeatures: ["ECN execution model", "Advanced copy trading", "AutoChartist analysis", "Multiple platforms"],
    suitability: "Best for oil trading automation",
    specialization: "ECN execution and trading automation"
  },
  {
    name: "AvaTrade",
    slug: "avatrade",
    oilInstruments: ["5 Oil & Energy CFDs", "Oil Options Contracts", "WTI Crude", "Brent Crude"],
    avgSpreads: "0.3 points markup on oil",
    minDeposit: "$100",
    regulation: ["ASIC (Australia)", "FSCA (South Africa)", "BVIFSC (BVI)", "FSRA (UAE)"],
    platforms: ["AvaTradeGO", "MetaTrader 4", "MetaTrader 5", "WebTrader"],
    keyFeatures: [
      "Oil options contracts",
      "Fixed and floating spreads",
      "AvaAcademy education",
      "Multiple oil products"
    ],
    leverageOil: "Up to 1:200 (oil specific)",
    accountTypes: ["Demo Account", "Real Account", "Professional Account"],
    uniqueFeatures: ["Oil options trading", "Educational focus", "Fixed/floating spread choice", "Social trading providers"],
    suitability: "Best for oil options trading",
    specialization: "Oil derivatives and educational resources"
  }
];

interface OilTradingBrokersPageProps {
  canonicalUrl: string;
  request: Request;
}

export function renderOilTradingBrokersPage({ canonicalUrl, request }: OilTradingBrokersPageProps): string {
  const currentDomain = getCurrentDomain(request);

  return `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div class="max-w-6xl mx-auto px-4">
          <div class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              Best Oil Trading Brokers 2025
            </h1>
            <p class="text-xl md:text-2xl text-orange-100 mb-6">
              Trade WTI & Brent Crude Oil CFDs with top-rated brokers
            </p>
            <div class="flex flex-wrap justify-center gap-4 text-sm">
              <span class="bg-orange-500 px-3 py-1 rounded-full">📈 WTI Crude Oil</span>
              <span class="bg-red-500 px-3 py-1 rounded-full">⚡ Brent Crude Oil</span>
              <span class="bg-yellow-500 px-3 py-1 rounded-full text-yellow-900">🛢️ Energy CFDs</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-lg shadow-sm p-6 text-center">
            <div class="text-2xl font-bold text-orange-600">8</div>
            <div class="text-sm text-gray-600">Top Oil Brokers</div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-6 text-center">
            <div class="text-2xl font-bold text-red-600">0.1</div>
            <div class="text-sm text-gray-600">Lowest Spreads (pips)</div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-6 text-center">
            <div class="text-2xl font-bold text-green-600">$0</div>
            <div class="text-sm text-gray-600">Minimum Deposit</div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-6 text-center">
            <div class="text-2xl font-bold text-blue-600">24/5</div>
            <div class="text-sm text-gray-600">Trading Hours</div>
          </div>
        </div>
      </div>

      <!-- Broker Comparison Table -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div class="bg-gray-50 px-6 py-4 border-b">
            <h2 class="text-2xl font-bold text-gray-900">Oil Trading Brokers Comparison</h2>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broker</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oil Spreads</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Deposit</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best For</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                ${oilTradingBrokers.map(broker => `
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">${broker.name}</div>
                      <div class="text-sm text-gray-500">${broker.regulation[0]}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-sm font-bold text-orange-600">${broker.avgSpreads}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${broker.minDeposit}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-xs text-gray-600">${broker.specialization}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-xs text-blue-600 font-medium">${broker.suitability.replace('Best for ', '')}</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Detailed Broker Reviews -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Detailed Oil Trading Broker Reviews</h2>
        
        <div class="grid gap-8">
          ${oilTradingBrokers.map((broker, index) => `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-xl font-bold">${index + 1}. ${broker.name}</h3>
                  <div class="flex items-center space-x-4">
                    <span class="text-lg font-bold text-orange-300">${broker.avgSpreads}</span>
                    <span class="px-3 py-1 rounded-full text-sm bg-blue-500">
                      Oil Specialist
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="p-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <!-- Key Information -->
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-3">Oil Trading Details</h4>
                    <div class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Average Spreads:</span>
                        <span class="font-semibold text-orange-600">${broker.avgSpreads}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Minimum Deposit:</span>
                        <span class="font-semibold text-green-600">${broker.minDeposit}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Oil Leverage:</span>
                        <span class="font-semibold">${broker.leverageOil}</span>
                      </div>
                    </div>
                    
                    <h4 class="font-semibold text-gray-900 mb-3 mt-6">Oil Instruments</h4>
                    <div class="flex flex-wrap gap-2">
                      ${broker.oilInstruments.map(instrument => `
                        <span class="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">${instrument}</span>
                      `).join('')}
                    </div>
                  </div>
                  
                  <!-- Features and Platforms -->
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-3">Trading Platforms</h4>
                    <div class="flex flex-wrap gap-2 mb-4">
                      ${broker.platforms.map(platform => `
                        <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">${platform}</span>
                      `).join('')}
                    </div>
                    
                    <h4 class="font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                      ${broker.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                  </div>
                </div>
                
                <!-- Suitability -->
                <div class="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
                  <h4 class="font-semibold text-gray-900 mb-2">${broker.suitability}</h4>
                  <p class="text-sm text-gray-700">${broker.specialization}</p>
                </div>
                
                <!-- Regulation -->
                <div class="mt-4">
                  <h4 class="font-semibold text-gray-900 mb-3">Regulation</h4>
                  <div class="flex flex-wrap gap-2">
                    ${broker.regulation.map(reg => `
                      <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">${reg}</span>
                    `).join('')}
                  </div>
                </div>
                
                <!-- Unique Features -->
                <div class="mt-4">
                  <h4 class="font-semibold text-gray-900 mb-3">Unique Oil Trading Features</h4>
                  <div class="grid md:grid-cols-2 gap-2">
                    ${broker.uniqueFeatures.map(feature => `
                      <div class="flex items-center text-sm text-gray-700">
                        <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                        ${feature}
                      </div>
                    `).join('')}
                  </div>
                </div>
                
                <!-- Account Types -->
                <div class="mt-4">
                  <h4 class="font-semibold text-gray-900 mb-3">Account Types</h4>
                  <div class="grid md:grid-cols-3 gap-4">
                    ${broker.accountTypes.map(accountType => `
                      <div class="p-3 border border-gray-200 rounded-lg">
                        <span class="text-sm font-medium text-gray-900">${accountType}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Oil Trading Guide -->
      <div class="max-w-6xl mx-auto px-4 py-12">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Oil Trading Guide</h2>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Understanding Oil Markets</h3>
              <div class="space-y-4 text-gray-700">
                <p>Oil trading involves speculating on the price movements of crude oil, typically through CFDs (Contracts for Difference) that track the underlying oil futures contracts.</p>
                
                <h4 class="font-semibold text-gray-900">Major Oil Benchmarks:</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li><strong>WTI (West Texas Intermediate)</strong> - US crude oil benchmark</li>
                  <li><strong>Brent Crude</strong> - International crude oil benchmark</li>
                  <li><strong>Dubai Crude</strong> - Middle Eastern benchmark</li>
                  <li><strong>Urals Crude</strong> - Russian crude benchmark</li>
                </ul>
                
                <h4 class="font-semibold text-gray-900">Trading Hours:</h4>
                <p>Oil markets typically trade 24/5, from Sunday evening to Friday evening, with brief daily maintenance breaks.</p>
              </div>
            </div>
            
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Oil Trading Strategies</h3>
              <div class="space-y-4 text-gray-700">
                <h4 class="font-semibold text-gray-900">Fundamental Analysis:</h4>
                <ul class="list-disc list-inside space-y-1">
                  <li>OPEC+ production decisions</li>
                  <li>US inventory data (EIA/API reports)</li>
                  <li>Geopolitical events</li>
                  <li>Economic indicators affecting demand</li>
                </ul>
                
                <h4 class="font-semibold text-gray-900">Technical Analysis:</h4>
                <ul class="list-disc list-inside space-y-1">
                  <li>Support and resistance levels</li>
                  <li>Trend analysis and breakouts</li>
                  <li>Moving averages and momentum indicators</li>
                  <li>Volume analysis</li>
                </ul>
                
                <h4 class="font-semibold text-gray-900">Risk Management:</h4>
                <ul class="list-disc list-inside space-y-1">
                  <li>Always use stop losses</li>
                  <li>Monitor correlation with USD</li>
                  <li>Watch for high volatility periods</li>
                  <li>Consider seasonal patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Market Factors -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Key Factors Affecting Oil Prices</h2>
          
          <div class="grid md:grid-cols-3 gap-6">
            <div class="p-4 border border-gray-200 rounded-lg">
              <h3 class="font-semibold text-gray-900 mb-3">Supply Factors</h3>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• OPEC+ production quotas</li>
                <li>• US shale oil production</li>
                <li>• Refinery capacity and maintenance</li>
                <li>• Strategic petroleum reserves</li>
                <li>• Geopolitical disruptions</li>
              </ul>
            </div>
            
            <div class="p-4 border border-gray-200 rounded-lg">
              <h3 class="font-semibold text-gray-900 mb-3">Demand Factors</h3>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Global economic growth</li>
                <li>• Seasonal driving patterns</li>
                <li>• Industrial production levels</li>
                <li>• Transportation sector demand</li>
                <li>• Alternative energy adoption</li>
              </ul>
            </div>
            
            <div class="p-4 border border-gray-200 rounded-lg">
              <h3 class="font-semibold text-gray-900 mb-3">Market Factors</h3>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• US Dollar strength</li>
                <li>• Inventory levels (EIA/API)</li>
                <li>• Futures market positioning</li>
                <li>• Interest rates and inflation</li>
                <li>• Market sentiment and speculation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Oil Trading FAQ</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">What is the difference between WTI and Brent crude oil?</h3>
              <p class="text-gray-700">WTI (West Texas Intermediate) is the US benchmark for crude oil, while Brent Crude is the international benchmark. Brent is typically priced $2-5 higher than WTI due to different quality characteristics and transportation costs.</p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Which broker offers the tightest oil trading spreads?</h3>
              <p class="text-gray-700">Axi offers the tightest spreads with raw spreads starting from 0.0 pips, followed by FXTM with 0.4 pips average. However, always check current live spreads as they vary with market conditions.</p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Can I trade oil with no minimum deposit?</h3>
              <p class="text-gray-700">Yes, several brokers including Axi, Pepperstone, and ActivTrades offer oil trading with zero minimum deposit requirements. This allows you to start trading oil with any amount you're comfortable with.</p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">What are the best times to trade oil?</h3>
              <p class="text-gray-700">Oil is most active during US trading hours (9:30 AM - 4:00 PM ET) and London trading hours (8:00 AM - 4:30 PM GMT). Major economic releases and inventory reports typically occur during these periods, creating higher volatility and liquidity.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
        <div class="max-w-4xl mx-auto text-center px-4">
          <h2 class="text-3xl font-bold mb-4">Start Oil Trading Today</h2>
          <p class="text-xl mb-8">Choose from our top-rated oil trading brokers and start capitalizing on crude oil price movements</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/compare" class="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Compare Oil Brokers
            </a>
            <a href="/simulator" class="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-400 transition-colors">
              Calculate Trading Costs
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}