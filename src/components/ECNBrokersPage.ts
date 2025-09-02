import { generateStructuredData, getCurrentDomain } from '../utils';

interface ECNBroker {
  name: string;
  slug: string;
  ecnCredentials: string;
  rawSpreads: string;
  commission: string;
  executionSpeed: string;
  minDeposit: string;
  regulation: string[];
  tradingPlatforms: string[];
  keyFeatures: string[];
  uniqueTechnology: string[];
  liquidityProviders: string;
  accountTypes: string[];
  suitability: string;
  specialization: string;
  ecnType: 'True ECN' | 'STP/NDD' | 'Hybrid ECN';
}

const ecnBrokers: ECNBroker[] = [
  {
    name: "IC Markets",
    slug: "ic-markets",
    ecnCredentials: "True ECN with direct market access",
    rawSpreads: "From 0.0 pips (EUR/USD)",
    commission: "$7.00 per lot (round turn)",
    executionSpeed: "Ultra-fast execution, institutional grade",
    minDeposit: "$200",
    regulation: ["ASIC (Australia)", "CySEC (Cyprus)", "FSA (Seychelles)", "SCB (Bahamas)"],
    tradingPlatforms: ["cTrader", "MetaTrader 4", "MetaTrader 5", "TradingView"],
    keyFeatures: [
      "Raw Spread account with 0.0 pip spreads",
      "No dealing desk intervention",
      "Direct market access (DMA)",
      "Algorithmic trading support"
    ],
    uniqueTechnology: ["True ECN infrastructure", "Multiple liquidity pools", "High-frequency trading support", "Advanced order types"],
    liquidityProviders: "Multiple top-tier banks and institutions",
    accountTypes: ["Standard Account", "Raw Spread Account", "cTrader Account", "Islamic Account"],
    suitability: "Best for professional and algorithmic traders",
    specialization: "True ECN execution with institutional-grade technology",
    ecnType: "True ECN"
  },
  {
    name: "FP Markets",
    slug: "fp-markets",
    ecnCredentials: "True ECN Raw Account with DMA",
    rawSpreads: "From 0.0 pips + commission",
    commission: "Equivalent to 0.3 pips per trade",
    executionSpeed: "40ms latency via Equinix NY4",
    minDeposit: "$100",
    regulation: ["CySEC (Cyprus)", "ASIC (Australia)", "FSA (Seychelles)", "FSCA (South Africa)"],
    tradingPlatforms: ["MetaTrader 4", "MetaTrader 5", "cTrader", "IRESS", "TradingView"],
    keyFeatures: [
      "Hybrid ECN/STP execution choice",
      "Equinix colocated servers",
      "IRESS DMA for share trading",
      "Ultra-low latency execution"
    ],
    uniqueTechnology: ["Equinix NY4 server colocation", "Hybrid execution model", "IRESS Level 2 data", "Professional DMA access"],
    liquidityProviders: "Top-tier institutional liquidity providers",
    accountTypes: ["Standard Account", "Raw Account", "IRESS Account", "Islamic Account"],
    suitability: "Best for both retail and professional traders",
    specialization: "Low-latency execution with multiple platform options",
    ecnType: "True ECN"
  },
  {
    name: "Pepperstone",
    slug: "pepperstone",
    ecnCredentials: "NDD/STP with ECN-style execution",
    rawSpreads: "From 0.0 pips (Razor Account)",
    commission: "$7.00 per lot (Razor Account)",
    executionSpeed: "Fast execution, deep liquidity access",
    minDeposit: "$0",
    regulation: ["ASIC (Australia)", "FCA (UK)", "DFSA (Dubai)", "CySEC (Cyprus)", "BaFin (Germany)"],
    tradingPlatforms: ["MetaTrader 4", "MetaTrader 5", "cTrader", "TradingView", "Pepperstone Platform"],
    keyFeatures: [
      "Razor Account with raw spreads",
      "No dealing desk model",
      "Deep liquidity pools access",
      "Volume-based rebate program"
    ],
    uniqueTechnology: ["Enhanced MT4/MT5 package", "AutoChartist integration", "API trading support", "TradingView integration"],
    liquidityProviders: "Deep liquidity pools from tier-1 providers",
    accountTypes: ["Standard Account", "Razor Account", "Islamic Account", "Professional Account"],
    suitability: "Best for scalpers and high-volume traders",
    specialization: "ECN-style execution with comprehensive platform support",
    ecnType: "STP/NDD"
  },
  {
    name: "BlackBull Markets",
    slug: "blackbull-markets",
    ecnCredentials: "True ECN with direct market access",
    rawSpreads: "Ultra-tight raw spreads",
    commission: "Variable by account type",
    executionSpeed: "Ultra-low latency via Equinix colocation",
    minDeposit: "$0 (Standard), $2,000 (Prime)",
    regulation: ["FMA (New Zealand)", "FSA (Seychelles)"],
    tradingPlatforms: ["MetaTrader 4", "MetaTrader 5", "cTrader", "TradingView"],
    keyFeatures: [
      "ECN Standard (no commission)",
      "ECN Prime (commission-based)",
      "Institutional-grade pricing",
      "Proprietary price aggregation"
    ],
    uniqueTechnology: ["Equinix NY4/LD5/TY3 connectivity", "Proprietary price aggregation", "High-frequency trading support", "24/7 support"],
    liquidityProviders: "Multiple institutional liquidity providers",
    accountTypes: ["ECN Standard", "ECN Prime", "Institutional Account"],
    suitability: "Best for experienced and HFT traders",
    specialization: "Institutional pricing for retail via proprietary technology",
    ecnType: "True ECN"
  },
  {
    name: "FXTM (ForexTime)",
    slug: "fxtm",
    ecnCredentials: "ECN execution via Advantage accounts",
    rawSpreads: "From 0.0 pips (major pairs)",
    commission: "Commission per lot (Advantage Account)",
    executionSpeed: "Market execution with minimal slippage",
    minDeposit: "$200",
    regulation: ["FCA (UK)", "FSCA (South Africa)", "FSC (Mauritius)", "CMA (Kenya)"],
    tradingPlatforms: ["MetaTrader 4", "MetaTrader 5", "FXTM Trader"],
    keyFeatures: [
      "Advantage Account ECN option",
      "Market execution model",
      "Direct market access",
      "Educational resources included"
    ],
    uniqueTechnology: ["Market execution system", "Educational platform", "Advanced analytics", "Mobile trading app"],
    liquidityProviders: "Top-tier institutional liquidity providers",
    accountTypes: ["Standard Account", "Advantage Account", "Advantage Plus", "ECN Zero"],
    suitability: "Best for educated ECN traders",
    specialization: "ECN execution with comprehensive education",
    ecnType: "Hybrid ECN"
  },
  {
    name: "RoboForex",
    slug: "roboforex",
    ecnCredentials: "True ECN via ECN and Prime accounts",
    rawSpreads: "From 0.0 pips (Prime Account)",
    commission: "Lower commission on Prime vs ECN",
    executionSpeed: "Fast market execution",
    minDeposit: "$10 (ECN), Higher (Prime)",
    regulation: ["Multiple jurisdictions", "Established 2009"],
    tradingPlatforms: ["MetaTrader 4", "MetaTrader 5", "R Trader", "cTrader"],
    keyFeatures: [
      "Direct interbank liquidity access",
      "Demo ECN mirroring Prime conditions",
      "Market execution model",
      "Advanced trading tools"
    ],
    uniqueTechnology: ["Demo ECN accounts", "R Trader platform", "Advanced analytics", "Educational tools"],
    liquidityProviders: "Direct interbank liquidity access",
    accountTypes: ["ECN Account", "Prime Account", "Demo ECN", "Standard Account"],
    suitability: "Best for professional traders and testing",
    specialization: "Low-cost ECN access with testing capabilities",
    ecnType: "True ECN"
  },
  {
    name: "Dukascopy",
    slug: "dukascopy",
    ecnCredentials: "Swiss ECN with bank-level execution",
    rawSpreads: "From 0.1 pips (institutional)",
    commission: "$2.50-$5.00 per lot",
    executionSpeed: "20-25ms average execution",
    minDeposit: "$1,000",
    regulation: ["FINMA (Switzerland)", "FCA (UK)", "JFSA (Japan)"],
    tradingPlatforms: ["JForex", "MetaTrader 4", "Dukascopy Connect"],
    keyFeatures: [
      "Swiss banking standards",
      "SWFX marketplace access",
      "Bank-level ECN execution",
      "Regulatory transparency"
    ],
    uniqueTechnology: ["SWFX Swiss marketplace", "JForex platform", "Bank-grade infrastructure", "Regulatory reporting"],
    liquidityProviders: "Major banks and financial institutions",
    accountTypes: ["Standard Account", "JForex Account", "Professional Account"],
    suitability: "Best for institutional-grade ECN execution",
    specialization: "Swiss banking standards with ECN transparency",
    ecnType: "True ECN"
  },
  {
    name: "Interactive Brokers",
    slug: "interactive-brokers",
    ecnCredentials: "DMA and ECN access to global exchanges",
    rawSpreads: "Variable by market and liquidity",
    commission: "$0.20-$1.00 per lot (FX)",
    executionSpeed: "Direct market access speed",
    minDeposit: "$0",
    regulation: ["SEC (USA)", "FCA (UK)", "IIROC (Canada)", "MAS (Singapore)"],
    tradingPlatforms: ["Trader Workstation", "IBKR Mobile", "Client Portal"],
    keyFeatures: [
      "Direct market access (DMA)",
      "Global exchange connectivity",
      "Institutional-grade execution",
      "Advanced order types"
    ],
    uniqueTechnology: ["Trader Workstation", "SmartRouting technology", "Global market access", "Advanced analytics"],
    liquidityProviders: "Direct exchange access and market makers",
    accountTypes: ["Individual Account", "Professional Account", "Institutional Account"],
    suitability: "Best for sophisticated institutional trading",
    specialization: "Global DMA access with institutional technology",
    ecnType: "True ECN"
  }
];

interface ECNBrokersPageProps {
  canonicalUrl: string;
  request: Request;
}

export function renderECNBrokersPage({ canonicalUrl, request }: ECNBrokersPageProps): string {
  const currentDomain = getCurrentDomain(request);

  return `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div class="max-w-6xl mx-auto px-4">
          <div class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              Best ECN Forex Brokers 2025
            </h1>
            <p class="text-xl md:text-2xl text-green-100 mb-6">
              Electronic Communication Network brokers with raw spreads and institutional access
            </p>
            <div class="flex flex-wrap justify-center gap-4 text-sm">
              <span class="bg-green-500 px-3 py-1 rounded-full">⚡ Raw Spreads</span>
              <span class="bg-teal-500 px-3 py-1 rounded-full">🏦 Direct Market Access</span>
              <span class="bg-cyan-500 px-3 py-1 rounded-full">🔄 No Dealing Desk</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ECN Explanation -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">What is ECN Trading?</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <p class="text-gray-700 mb-4">
                Electronic Communication Network (ECN) brokers provide direct access to the interbank forex market through automated systems that match buy and sell orders from multiple participants including banks, hedge funds, and traders.
              </p>
              <h4 class="font-semibold text-gray-900 mb-2">ECN Advantages:</h4>
              <ul class="list-disc list-inside text-gray-700 space-y-1">
                <li>Raw spreads starting from 0.0 pips</li>
                <li>Direct market access (DMA)</li>
                <li>No dealing desk intervention</li>
                <li>Transparent price discovery</li>
                <li>Fast execution speeds</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">How ECN Works:</h4>
              <ol class="list-decimal list-inside text-gray-700 space-y-1">
                <li>Your orders are sent directly to the ECN</li>
                <li>ECN matches orders with other participants</li>
                <li>Best available prices are provided</li>
                <li>Execution occurs without broker intervention</li>
                <li>You pay raw spreads plus commission</li>
              </ol>
              <div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400">
                <p class="text-sm text-green-700">
                  <strong>True ECN:</strong> Provides Level II pricing, order book depth, and direct market access without dealing desk intervention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-lg shadow-sm p-6 text-center">
            <div class="text-2xl font-bold text-green-600">8</div>
            <div class="text-sm text-gray-600">Top ECN Brokers</div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-6 text-center">
            <div class="text-2xl font-bold text-teal-600">0.0</div>
            <div class="text-sm text-gray-600">Raw Spreads (pips)</div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-6 text-center">
            <div class="text-2xl font-bold text-cyan-600">20ms</div>
            <div class="text-sm text-gray-600">Fastest Execution</div>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-6 text-center">
            <div class="text-2xl font-bold text-blue-600">$0</div>
            <div class="text-sm text-gray-600">Min Deposit (Some)</div>
          </div>
        </div>
      </div>

      <!-- Broker Comparison Table -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div class="bg-gray-50 px-6 py-4 border-b">
            <h2 class="text-2xl font-bold text-gray-900">ECN Brokers Comparison</h2>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broker</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ECN Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Raw Spreads</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Deposit</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                ${ecnBrokers.map(broker => `
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">${broker.name}</div>
                      <div class="text-sm text-gray-500">${broker.regulation[0]}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        broker.ecnType === 'True ECN' ? 'bg-green-100 text-green-800' :
                        broker.ecnType === 'STP/NDD' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }">
                        ${broker.ecnType}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-sm font-bold text-green-600">${broker.rawSpreads}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${broker.commission}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${broker.minDeposit}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Detailed Broker Reviews -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Detailed ECN Broker Reviews</h2>
        
        <div class="grid gap-8">
          ${ecnBrokers.map((broker, index) => `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-xl font-bold">${index + 1}. ${broker.name}</h3>
                  <div class="flex items-center space-x-4">
                    <span class="text-sm font-bold text-green-300">${broker.rawSpreads}</span>
                    <span class="px-3 py-1 rounded-full text-sm ${
                      broker.ecnType === 'True ECN' ? 'bg-green-500' :
                      broker.ecnType === 'STP/NDD' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }">
                      ${broker.ecnType}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="p-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <!-- Key Information -->
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-3">ECN Trading Details</h4>
                    <div class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Raw Spreads:</span>
                        <span class="font-semibold text-green-600">${broker.rawSpreads}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Commission:</span>
                        <span class="font-semibold text-blue-600">${broker.commission}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Execution Speed:</span>
                        <span class="font-semibold text-teal-600">${broker.executionSpeed}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Min Deposit:</span>
                        <span class="font-semibold text-gray-900">${broker.minDeposit}</span>
                      </div>
                    </div>
                    
                    <h4 class="font-semibold text-gray-900 mb-3 mt-6">ECN Credentials</h4>
                    <p class="text-sm text-gray-700">${broker.ecnCredentials}</p>
                  </div>
                  
                  <!-- Features and Platforms -->
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-3">Trading Platforms</h4>
                    <div class="flex flex-wrap gap-2 mb-4">
                      ${broker.tradingPlatforms.map(platform => `
                        <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">${platform}</span>
                      `).join('')}
                    </div>
                    
                    <h4 class="font-semibold text-gray-900 mb-3">Key ECN Features</h4>
                    <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                      ${broker.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                  </div>
                </div>
                
                <!-- Suitability -->
                <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-400">
                  <h4 class="font-semibold text-gray-900 mb-2">${broker.suitability}</h4>
                  <p class="text-sm text-gray-700">${broker.specialization}</p>
                </div>
                
                <!-- Account Types -->
                <div class="mt-4">
                  <h4 class="font-semibold text-gray-900 mb-3">Account Types</h4>
                  <div class="grid md:grid-cols-4 gap-4">
                    ${broker.accountTypes.map(accountType => `
                      <div class="p-3 border border-gray-200 rounded-lg">
                        <span class="text-sm font-medium text-gray-900">${accountType}</span>
                      </div>
                    `).join('')}
                  </div>
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
                
                <!-- Unique Technology -->
                <div class="mt-4">
                  <h4 class="font-semibold text-gray-900 mb-3">Unique ECN Technology</h4>
                  <div class="grid md:grid-cols-2 gap-2">
                    ${broker.uniqueTechnology.map(tech => `
                      <div class="flex items-center text-sm text-gray-700">
                        <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                        ${tech}
                      </div>
                    `).join('')}
                  </div>
                </div>
                
                <!-- Liquidity Providers -->
                <div class="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h5 class="font-medium text-gray-900 mb-1">Liquidity Providers</h5>
                  <p class="text-sm text-gray-600">${broker.liquidityProviders}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ECN vs STP Comparison -->
      <div class="max-w-6xl mx-auto px-4 py-12">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">ECN vs STP vs Market Maker</h2>
          
          <div class="grid md:grid-cols-3 gap-6">
            <div class="p-6 border border-green-200 rounded-lg">
              <h3 class="text-xl font-semibold text-green-800 mb-4">ECN (Electronic Communication Network)</h3>
              <div class="space-y-3">
                <div class="flex items-start">
                  <span class="text-green-600 mr-2">✅</span>
                  <span class="text-sm">Raw spreads from 0.0 pips</span>
                </div>
                <div class="flex items-start">
                  <span class="text-green-600 mr-2">✅</span>
                  <span class="text-sm">Direct market access</span>
                </div>
                <div class="flex items-start">
                  <span class="text-green-600 mr-2">✅</span>
                  <span class="text-sm">No dealing desk</span>
                </div>
                <div class="flex items-start">
                  <span class="text-green-600 mr-2">✅</span>
                  <span class="text-sm">Level II pricing</span>
                </div>
                <div class="flex items-start">
                  <span class="text-red-600 mr-2">❌</span>
                  <span class="text-sm">Commission per trade</span>
                </div>
              </div>
              <div class="mt-4 p-3 bg-green-50 rounded">
                <p class="text-sm text-green-700"><strong>Best for:</strong> Professional traders, scalpers, high-volume traders</p>
              </div>
            </div>

            <div class="p-6 border border-blue-200 rounded-lg">
              <h3 class="text-xl font-semibold text-blue-800 mb-4">STP (Straight Through Processing)</h3>
              <div class="space-y-3">
                <div class="flex items-start">
                  <span class="text-blue-600 mr-2">✅</span>
                  <span class="text-sm">No dealing desk</span>
                </div>
                <div class="flex items-start">
                  <span class="text-blue-600 mr-2">✅</span>
                  <span class="text-sm">Orders sent to liquidity providers</span>
                </div>
                <div class="flex items-start">
                  <span class="text-blue-600 mr-2">✅</span>
                  <span class="text-sm">No commission (usually)</span>
                </div>
                <div class="flex items-start">
                  <span class="text-red-600 mr-2">⚠️</span>
                  <span class="text-sm">Wider spreads vs ECN</span>
                </div>
                <div class="flex items-start">
                  <span class="text-red-600 mr-2">⚠️</span>
                  <span class="text-sm">Less transparency</span>
                </div>
              </div>
              <div class="mt-4 p-3 bg-blue-50 rounded">
                <p class="text-sm text-blue-700"><strong>Best for:</strong> Retail traders, swing traders, beginners</p>
              </div>
            </div>

            <div class="p-6 border border-gray-200 rounded-lg">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">Market Maker</h3>
              <div class="space-y-3">
                <div class="flex items-start">
                  <span class="text-green-600 mr-2">✅</span>
                  <span class="text-sm">Fixed spreads</span>
                </div>
                <div class="flex items-start">
                  <span class="text-green-600 mr-2">✅</span>
                  <span class="text-sm">No commission</span>
                </div>
                <div class="flex items-start">
                  <span class="text-green-600 mr-2">✅</span>
                  <span class="text-sm">Guaranteed liquidity</span>
                </div>
                <div class="flex items-start">
                  <span class="text-red-600 mr-2">❌</span>
                  <span class="text-sm">Dealing desk model</span>
                </div>
                <div class="flex items-start">
                  <span class="text-red-600 mr-2">❌</span>
                  <span class="text-sm">Potential conflicts of interest</span>
                </div>
              </div>
              <div class="mt-4 p-3 bg-gray-50 rounded">
                <p class="text-sm text-gray-700"><strong>Best for:</strong> Small accounts, news trading, guaranteed execution</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trading Costs Comparison -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">ECN Trading Costs Example</h2>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Standard Account vs ECN Account</h3>
              <div class="space-y-4">
                <div class="p-4 bg-gray-50 rounded-lg">
                  <h4 class="font-medium text-gray-900 mb-2">Standard Account (STP)</h4>
                  <div class="text-sm text-gray-700">
                    <div>EUR/USD Spread: 1.2 pips</div>
                    <div>Commission: $0</div>
                    <div class="font-semibold mt-2">Total Cost: 1.2 pips</div>
                  </div>
                </div>
                
                <div class="p-4 bg-green-50 rounded-lg">
                  <h4 class="font-medium text-gray-900 mb-2">ECN Account</h4>
                  <div class="text-sm text-gray-700">
                    <div>EUR/USD Spread: 0.1 pips</div>
                    <div>Commission: $7 per lot (≈ 0.7 pips)</div>
                    <div class="font-semibold mt-2">Total Cost: 0.8 pips</div>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
                <p class="text-sm text-green-800">
                  <strong>ECN Savings:</strong> 0.4 pips per trade (33% cost reduction)
                </p>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Volume-Based Savings</h3>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>1 lot/month:</span>
                  <span class="text-green-600">$4 saved</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>10 lots/month:</span>
                  <span class="text-green-600">$40 saved</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>50 lots/month:</span>
                  <span class="text-green-600">$200 saved</span>
                </div>
                <div class="flex justify-between text-sm font-semibold">
                  <span>100 lots/month:</span>
                  <span class="text-green-600">$400 saved</span>
                </div>
              </div>
              
              <div class="mt-4 p-3 bg-blue-50 rounded">
                <p class="text-xs text-blue-700">
                  *Calculations based on 0.4 pip savings per EUR/USD trade. Actual savings vary by currency pair and market conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">ECN Trading FAQ</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">What makes a broker "True ECN"?</h3>
              <p class="text-gray-700">True ECN brokers provide direct market access with Level II pricing, order book depth visibility, and automatic order matching without dealing desk intervention. They profit only from commissions, not spreads.</p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Which ECN broker has the lowest costs?</h3>
              <p class="text-gray-700">IC Markets and FP Markets offer competitive all-in costs starting around 0.7-0.8 pips total (spread + commission) for EUR/USD. Interactive Brokers offers the lowest commissions at $0.20 per micro lot.</p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Do ECN brokers allow scalping?</h3>
              <p class="text-gray-700">Yes, ECN brokers typically allow and encourage scalping due to their direct market access model. Fast execution and tight spreads make ECN ideal for scalping strategies.</p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">What's the difference between ECN and STP?</h3>
              <p class="text-gray-700">ECN provides direct access to an electronic network where orders are matched automatically, while STP simply routes orders to liquidity providers. ECN offers more transparency and typically better pricing.</p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Are ECN accounts worth the commission?</h3>
              <p class="text-gray-700">For traders doing 10+ lots per month, ECN accounts typically provide significant cost savings despite commission charges. The tighter spreads usually more than offset the commission costs.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
        <div class="max-w-4xl mx-auto text-center px-4">
          <h2 class="text-3xl font-bold mb-4">Start ECN Trading Today</h2>
          <p class="text-xl mb-8">Experience institutional-grade execution with raw spreads and direct market access</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/compare" class="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Compare ECN Brokers
            </a>
            <a href="/simulator" class="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors">
              Calculate ECN Costs
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}