import { generateStructuredData, getCurrentDomain } from '../utils';

interface HighLeverageBroker {
  name: string;
  slug: string;
  maxLeverage: string;
  minDeposit: string;
  regulation: string[];
  platforms: string[];
  keyFeatures: string[];
  leverageConditions: string;
  accountTypes: string[];
  uniqueFeatures: string[];
  riskLevel: 'High' | 'Very High' | 'Extremely High';
  professionalAccountRequired: boolean;
}

const highLeverageBrokers: HighLeverageBroker[] = [
  {
    name: "FXTM (ForexTime)",
    slug: "fxtm",
    maxLeverage: "1:2000",
    minDeposit: "$10",
    regulation: ["FSCA (South Africa)", "FCA (UK)", "CySEC (Cyprus)", "FSC (Mauritius)"],
    platforms: ["MetaTrader 4", "MetaTrader 5", "FXTM Trader"],
    keyFeatures: [
      "Ultra-high leverage up to 1:2000",
      "Scaled leverage by trade size",
      "Multiple account types",
      "Copy trading (FXTM Invest)"
    ],
    leverageConditions: "Offshore entity: 1:2000 (0-50k), 1:1000 (50k-200k), 1:500 (200k+). Regulated entities: 1:30 (retail)",
    accountTypes: ["Advantage Account", "Advantage Plus Account", "ECN Zero Account"],
    uniqueFeatures: ["Social copy trading", "Depth of Market", "Educational resources", "Multiple entity options"],
    riskLevel: "Extremely High",
    professionalAccountRequired: false
  },
  {
    name: "BlackBull Markets",
    slug: "blackbull-markets",
    maxLeverage: "1:500",
    minDeposit: "$0",
    regulation: ["FMA (New Zealand)", "FSA (Seychelles)"],
    platforms: ["MetaTrader 4", "MetaTrader 5", "cTrader", "TradingView"],
    keyFeatures: [
      "High leverage up to 1:500",
      "Fast execution (72ms)",
      "Zero minimum deposit",
      "Copy trading integrations"
    ],
    leverageConditions: "Available via NZ FMA and Seychelles entities for retail clients",
    accountTypes: ["Standard Account", "ECN Prime Account"],
    uniqueFeatures: ["ZuluTrade integration", "Myfxbook AutoTrade", "BlackBull Social", "No minimum deposit"],
    riskLevel: "Very High",
    professionalAccountRequired: false
  },
  {
    name: "Pepperstone",
    slug: "pepperstone",
    maxLeverage: "1:500",
    minDeposit: "$0",
    regulation: ["ASIC (Australia)", "FCA (UK)", "DFSA (Dubai)", "CySEC (Cyprus)"],
    platforms: ["MetaTrader 4", "MetaTrader 5", "cTrader", "TradingView"],
    keyFeatures: [
      "Professional leverage up to 1:500",
      "Ultra-tight RAW spreads from 0.0 pips",
      "Fast execution (77ms average)",
      "Multiple top-tier regulators"
    ],
    leverageConditions: "Retail: 1:30 (major regulators). Professional: 1:500 (requires qualification)",
    accountTypes: ["Standard Account", "Razor Account (RAW)", "Professional Account"],
    uniqueFeatures: ["Consistent 0.0 pip spreads", "Excellent automation support", "Professional client options", "Award-winning platforms"],
    riskLevel: "High",
    professionalAccountRequired: true
  },
  {
    name: "ThinkMarkets",
    slug: "thinkmarkets",
    maxLeverage: "1:500",
    minDeposit: "$0",
    regulation: ["FCA (UK)", "FSCA (South Africa)", "ASIC (Australia)", "CySEC (Cyprus)"],
    platforms: ["MetaTrader 4", "MetaTrader 5", "ThinkTrader", "TradingView"],
    keyFeatures: [
      "Professional leverage up to 1:500",
      "ThinkZero RAW spreads from 0.0 pips",
      "Free VPS hosting",
      "Multiple regulated entities"
    ],
    leverageConditions: "Retail: 1:30 (FCA cap). Professional: 1:500 (requires qualification)",
    accountTypes: ["Standard Account", "ThinkZero Account", "Professional Account"],
    uniqueFeatures: ["Free VPS for automation", "ThinkTrader proprietary platform", "Professional qualification program", "Excellent customer support"],
    riskLevel: "High",
    professionalAccountRequired: true
  },
  {
    name: "Axi (AxiTrader)",
    slug: "axi",
    maxLeverage: "1:400",
    minDeposit: "$0",
    regulation: ["DFSA (Dubai)", "ASIC (Australia)", "FCA (UK)", "FMA (New Zealand)"],
    platforms: ["MetaTrader 4"],
    keyFeatures: [
      "High leverage up to 1:400",
      "ECN-style execution",
      "Fast limit order execution (90ms)",
      "72 forex pairs"
    ],
    leverageConditions: "Retail: 1:30 (top-tier regulators). Professional: 1:400 (where offered)",
    accountTypes: ["Standard Account", "Pro Account", "Professional Account"],
    uniqueFeatures: ["Pre-installed Expert Advisors", "Market sentiment tools", "No dealing desk", "MT4 specialist"],
    riskLevel: "Very High",
    professionalAccountRequired: true
  },
  {
    name: "FP Markets",
    slug: "fp-markets",
    maxLeverage: "1:500",
    minDeposit: "$100",
    regulation: ["CySEC (Cyprus)", "ASIC (Australia)", "FSA (Seychelles)", "FSCA (South Africa)"],
    platforms: ["MetaTrader 4", "MetaTrader 5", "cTrader", "TradingView", "IRESS"],
    keyFeatures: [
      "Professional leverage up to 1:500",
      "RAW spreads from 0.1 pips",
      "10,000+ instruments",
      "Multiple platform options"
    ],
    leverageConditions: "Retail: 1:30 (EU/UK regulators). Professional: 1:500 (requires qualification)",
    accountTypes: ["Standard Account", "RAW Account", "Professional Account"],
    uniqueFeatures: ["Massive instrument selection", "Trading Central analysis", "AutoChartist", "24/7 live chat support"],
    riskLevel: "High",
    professionalAccountRequired: true
  }
];

interface HighLeverageBrokersPageProps {
  canonicalUrl: string;
  request: Request;
}

export function renderHighLeverageBrokersPage({ canonicalUrl, request }: HighLeverageBrokersPageProps): string {
  const currentDomain = getCurrentDomain(request);

  return `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div class="max-w-6xl mx-auto px-4">
          <div class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              Best High Leverage Forex Brokers 2025
            </h1>
            <p class="text-xl md:text-2xl text-red-100 mb-6">
              Compare brokers offering 1:500, 1:1000, and 1:2000+ leverage
            </p>
            <div class="flex flex-wrap justify-center gap-4 text-sm">
              <span class="bg-red-500 px-3 py-1 rounded-full">⚠️ High Risk</span>
              <span class="bg-orange-500 px-3 py-1 rounded-full">💰 High Reward Potential</span>
              <span class="bg-yellow-500 px-3 py-1 rounded-full text-yellow-900">📚 Experience Required</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Risk Warning -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                High Leverage Trading Warning
              </h3>
              <div class="mt-2 text-sm text-red-700">
                <p>High leverage significantly amplifies both potential profits and losses. Leverage of 1:500+ can result in total account loss within minutes. Only experienced traders should use high leverage, and never risk more than you can afford to lose.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Broker Comparison Table -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div class="bg-gray-50 px-6 py-4 border-b">
            <h2 class="text-2xl font-bold text-gray-900">High Leverage Brokers Comparison</h2>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broker</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Leverage</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Deposit</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pro Required</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                ${highLeverageBrokers.map(broker => `
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">${broker.name}</div>
                      <div class="text-sm text-gray-500">${broker.regulation[0]}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-lg font-bold text-red-600">${broker.maxLeverage}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${broker.minDeposit}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        broker.riskLevel === 'Extremely High' ? 'bg-red-100 text-red-800' :
                        broker.riskLevel === 'Very High' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }">
                        ${broker.riskLevel}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${broker.professionalAccountRequired ? '✅ Yes' : '❌ No'}
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
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Detailed High Leverage Broker Reviews</h2>
        
        <div class="grid gap-8">
          ${highLeverageBrokers.map((broker, index) => `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-xl font-bold">${index + 1}. ${broker.name}</h3>
                  <div class="flex items-center space-x-4">
                    <span class="text-2xl font-bold text-red-300">${broker.maxLeverage}</span>
                    <span class="px-3 py-1 rounded-full text-sm ${
                      broker.riskLevel === 'Extremely High' ? 'bg-red-500' :
                      broker.riskLevel === 'Very High' ? 'bg-orange-500' :
                      'bg-yellow-500 text-yellow-900'
                    }">
                      ${broker.riskLevel} Risk
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="p-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <!-- Key Information -->
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-3">Key Information</h4>
                    <div class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Maximum Leverage:</span>
                        <span class="font-semibold text-red-600">${broker.maxLeverage}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Minimum Deposit:</span>
                        <span class="font-semibold text-green-600">${broker.minDeposit}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Professional Account:</span>
                        <span class="font-semibold">${broker.professionalAccountRequired ? 'Required' : 'Not Required'}</span>
                      </div>
                    </div>
                    
                    <h4 class="font-semibold text-gray-900 mb-3 mt-6">Regulation</h4>
                    <div class="flex flex-wrap gap-2">
                      ${broker.regulation.map(reg => `
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">${reg}</span>
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
                
                <!-- Leverage Conditions -->
                <div class="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                  <h4 class="font-semibold text-gray-900 mb-2">Leverage Conditions</h4>
                  <p class="text-sm text-gray-700">${broker.leverageConditions}</p>
                </div>
                
                <!-- Account Types -->
                <div class="mt-4">
                  <h4 class="font-semibold text-gray-900 mb-3">Available Account Types</h4>
                  <div class="grid md:grid-cols-3 gap-4">
                    ${broker.accountTypes.map(accountType => `
                      <div class="p-3 border border-gray-200 rounded-lg">
                        <span class="text-sm font-medium text-gray-900">${accountType}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
                
                <!-- Unique Features -->
                <div class="mt-4">
                  <h4 class="font-semibold text-gray-900 mb-3">Unique Features</h4>
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
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- High Leverage Trading Guide -->
      <div class="max-w-6xl mx-auto px-4 py-12">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">High Leverage Trading Guide</h2>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Understanding High Leverage</h3>
              <div class="space-y-4 text-gray-700">
                <p>High leverage allows traders to control large positions with relatively small amounts of capital. For example, with 1:500 leverage, a $1,000 deposit can control a $500,000 position.</p>
                
                <h4 class="font-semibold text-gray-900">Leverage Ratios Explained:</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li><strong>1:500</strong> - Control $500,000 with $1,000</li>
                  <li><strong>1:1000</strong> - Control $1,000,000 with $1,000</li>
                  <li><strong>1:2000</strong> - Control $2,000,000 with $1,000</li>
                </ul>
                
                <h4 class="font-semibold text-gray-900">Professional vs Retail Accounts:</h4>
                <p>Many brokers offer higher leverage only to professional clients who meet specific criteria such as trading experience, liquid assets, or trading frequency.</p>
              </div>
            </div>
            
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Risk Management</h3>
              <div class="space-y-4 text-gray-700">
                <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                  <h4 class="font-semibold text-red-800 mb-2">Critical Risk Factors:</h4>
                  <ul class="list-disc list-inside space-y-1 text-red-700">
                    <li>Amplified losses can exceed initial deposit</li>
                    <li>Margin calls and forced liquidation</li>
                    <li>High emotional stress and pressure</li>
                    <li>Requires exceptional risk management</li>
                  </ul>
                </div>
                
                <h4 class="font-semibold text-gray-900">Best Practices:</h4>
                <ul class="list-disc list-inside space-y-2">
                  <li>Never risk more than 1-2% per trade</li>
                  <li>Always use stop losses</li>
                  <li>Start with lower leverage and increase gradually</li>
                  <li>Maintain adequate margin levels</li>
                  <li>Keep detailed trading records</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Regulatory Considerations -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Regulatory Landscape for High Leverage</h2>
          
          <div class="grid md:grid-cols-3 gap-6">
            <div class="p-4 border border-gray-200 rounded-lg">
              <h3 class="font-semibold text-gray-900 mb-3">EU/UK Regulators</h3>
              <p class="text-sm text-gray-700 mb-2"><strong>Max Leverage:</strong> 1:30 (retail)</p>
              <p class="text-sm text-gray-700">FCA, CySEC, ASIC, DFSA typically limit retail leverage to 1:30 for major currency pairs.</p>
            </div>
            
            <div class="p-4 border border-gray-200 rounded-lg">
              <h3 class="font-semibold text-gray-900 mb-3">North American</h3>
              <p class="text-sm text-gray-700 mb-2"><strong>Max Leverage:</strong> 1:50 (retail)</p>
              <p class="text-sm text-gray-700">CFTC/NFA (US) and CIRO (Canada) allow higher leverage than EU but still limited compared to offshore.</p>
            </div>
            
            <div class="p-4 border border-gray-200 rounded-lg">
              <h3 class="font-semibold text-gray-900 mb-3">Offshore Jurisdictions</h3>
              <p class="text-sm text-gray-700 mb-2"><strong>Max Leverage:</strong> 1:500-1:2000+</p>
              <p class="text-sm text-gray-700">Mauritius, Seychelles, and other offshore jurisdictions may offer much higher leverage ratios.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">What is the highest leverage available in forex?</h3>
              <p class="text-gray-700">Some offshore brokers offer leverage up to 1:3000, but the most common high leverage ratios are 1:500 to 1:2000. FXTM offers up to 1:2000 through their offshore entities.</p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Is high leverage trading safe?</h3>
              <p class="text-gray-700">High leverage trading carries significant risk and is not suitable for beginners. It can amplify both profits and losses dramatically. Only experienced traders with proper risk management should consider high leverage.</p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Do I need a professional account for high leverage?</h3>
              <p class="text-gray-700">With most regulated brokers (FCA, ASIC, CySEC), yes. Professional accounts require meeting specific criteria but allow access to higher leverage ratios beyond retail limits.</p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Which broker offers the best high leverage conditions?</h3>
              <p class="text-gray-700">FXTM offers the highest leverage (1:2000) through offshore entities, while Pepperstone and ThinkMarkets offer excellent high leverage conditions (1:500) with professional accounts under top-tier regulation.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12">
        <div class="max-w-4xl mx-auto text-center px-4">
          <h2 class="text-3xl font-bold mb-4">Ready to Start High Leverage Trading?</h2>
          <p class="text-xl mb-8">Choose from our top-rated high leverage brokers and start with proper risk management</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/compare" class="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Compare All Brokers
            </a>
            <a href="/simulator" class="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-400 transition-colors">
              Calculate Trading Costs
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}