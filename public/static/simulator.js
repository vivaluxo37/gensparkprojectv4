// Trading Cost Simulator JavaScript
// Strategy-aware cost calculator for different brokers

class TradingSimulator {
    constructor() {
        this.brokers = [];
        this.results = [];
        this.init();
    }

    async init() {
        await this.loadBrokers();
        this.setupEventListeners();
    }

    async loadBrokers() {
        try {
            const response = await fetch('/data/brokers.json');
            const data = await response.json();
            this.brokers = data.brokers;
        } catch (error) {
            console.error('Error loading brokers:', error);
            this.brokers = [];
        }
    }

    setupEventListeners() {
        const calculateButton = document.getElementById('calculate-costs');
        const inputs = ['strategy-select', 'trade-size', 'trades-count', 'instrument-select'];

        // Real-time calculation on input change
        inputs.forEach(inputId => {
            const element = document.getElementById(inputId);
            if (element) {
                element.addEventListener('change', () => {
                    if (this.results.length > 0) {
                        this.calculateCosts();
                    }
                });
            }
        });

        if (calculateButton) {
            calculateButton.addEventListener('click', () => {
                this.calculateCosts();
            });
        }
    }

    calculateCosts() {
        const strategy = document.getElementById('strategy-select')?.value || 'swing';
        const tradeSize = parseFloat(document.getElementById('trade-size')?.value) || 1;
        const tradesCount = parseInt(document.getElementById('trades-count')?.value) || 100;
        const instrument = document.getElementById('instrument-select')?.value || 'EURUSD';

        // Calculate costs for each broker
        this.results = this.brokers.map(broker => {
            const costs = this.calculateBrokerCosts(broker, strategy, tradeSize, tradesCount, instrument);
            return {
                broker,
                ...costs
            };
        });

        // Sort by total cost (lowest first)
        this.results.sort((a, b) => a.totalCost - b.totalCost);

        this.displayResults(strategy, tradeSize, tradesCount, instrument);
    }

    calculateBrokerCosts(broker, strategy, tradeSize, tradesCount, instrument) {
        // Base pip value (for standard lot)
        const pipValue = this.getPipValue(instrument);
        
        // Get spread based on strategy
        let spread = broker.typicalSpread || 1.0;
        if (strategy === 'scalping') {
            spread = Math.max(0.1, spread * 0.7); // Scalpers get better spreads usually
        }

        // Get commission
        const commission = broker.commission || 0;

        // Calculate slippage based on strategy
        let slippage = this.getSlippageEstimate(strategy);

        // Calculate individual costs
        const spreadCost = spread * pipValue * tradeSize * tradesCount;
        const commissionCost = commission * tradeSize * tradesCount;
        const slippageCost = slippage * pipValue * tradeSize * tradesCount;

        const totalCost = spreadCost + commissionCost + slippageCost;
        const costPerTrade = totalCost / tradesCount;

        return {
            spread,
            spreadCost: Math.round(spreadCost * 100) / 100,
            commissionCost: Math.round(commissionCost * 100) / 100,
            slippageCost: Math.round(slippageCost * 100) / 100,
            totalCost: Math.round(totalCost * 100) / 100,
            costPerTrade: Math.round(costPerTrade * 100) / 100
        };
    }

    getPipValue(instrument) {
        // Standard pip values for $10,000 (1 lot) position
        const pipValues = {
            'EURUSD': 10,
            'GBPUSD': 10,
            'USDJPY': 10,
            'AUDUSD': 10
        };
        return pipValues[instrument] || 10;
    }

    getSlippageEstimate(strategy) {
        // Estimated slippage in pips based on strategy
        const slippageEstimates = {
            'scalping': 0.3,
            'daytrading': 0.2,
            'swing': 0.1,
            'algo': 0.15
        };
        return slippageEstimates[strategy] || 0.2;
    }

    displayResults(strategy, tradeSize, tradesCount, instrument) {
        const container = document.getElementById('results-container');
        const table = document.getElementById('results-table');

        if (!container || !table) return;

        container.classList.remove('hidden');

        // Generate table rows
        table.innerHTML = this.results.map((result, index) => {
            const isBest = index === 0;
            const rowClass = isBest ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50';
            
            return `
                <tr class="${rowClass}">
                    <td class="px-4 py-3">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                <i class="fas fa-building text-gray-600 text-sm"></i>
                            </div>
                            <div>
                                <div class="font-medium">${result.broker.name}</div>
                                <div class="text-sm text-gray-500">Rating: ${result.broker.rating}/5.0</div>
                            </div>
                        </div>
                        ${isBest ? '<div class="text-xs text-green-600 font-semibold mt-1">💡 Best Value</div>' : ''}
                    </td>
                    <td class="px-4 py-3 text-center">
                        <div class="font-medium">$${result.spreadCost}</div>
                        <div class="text-xs text-gray-500">${result.spread} pips</div>
                    </td>
                    <td class="px-4 py-3 text-center">
                        <div class="font-medium">$${result.commissionCost}</div>
                        <div class="text-xs text-gray-500">${result.broker.commission || 0}/lot</div>
                    </td>
                    <td class="px-4 py-3 text-center">
                        <div class="font-medium">$${result.slippageCost}</div>
                        <div class="text-xs text-gray-500">${this.getSlippageEstimate(strategy)} pips</div>
                    </td>
                    <td class="px-4 py-3 text-center">
                        <div class="font-bold text-lg ${isBest ? 'text-green-600' : ''}">$${result.totalCost}</div>
                        <div class="text-xs text-gray-500">$${result.costPerTrade}/trade</div>
                        ${isBest ? '<div class="text-xs text-green-600 font-semibold">Lowest Cost</div>' : ''}
                    </td>
                </tr>
            `;
        }).join('');

        // Scroll to results
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update methodology with current parameters
        this.updateMethodology(strategy, tradeSize, tradesCount, instrument);
    }

    updateMethodology(strategy, tradeSize, tradesCount, instrument) {
        const pipValue = this.getPipValue(instrument);
        const slippage = this.getSlippageEstimate(strategy);
        
        // Find the methodology section and update it with current parameters
        const methodologySection = document.querySelector('.prose');
        if (methodologySection) {
            const formulaDiv = methodologySection.querySelector('code');
            if (formulaDiv) {
                formulaDiv.innerHTML = `
                    Total Monthly Cost = (Spread × $${pipValue} × ${tradeSize} lots × ${tradesCount} trades) + 
                    (Commission × ${tradeSize} lots × ${tradesCount} trades) + 
                    (${slippage} pips slippage × $${pipValue} × ${tradeSize} lots × ${tradesCount} trades)
                `;
            }
        }
    }

    // Export results for further analysis
    exportResults() {
        if (this.results.length === 0) {
            alert('Please calculate costs first');
            return;
        }

        const csvContent = this.generateCSV();
        this.downloadCSV(csvContent, 'trading-cost-analysis.csv');
    }

    generateCSV() {
        const headers = ['Broker', 'Rating', 'Spread Cost', 'Commission Cost', 'Slippage Cost', 'Total Cost', 'Cost Per Trade'];
        const rows = this.results.map(result => [
            result.broker.name,
            result.broker.rating,
            result.spreadCost,
            result.commissionCost,
            result.slippageCost,
            result.totalCost,
            result.costPerTrade
        ]);

        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }

    downloadCSV(content, filename) {
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

// Add export functionality
function addExportButton() {
    const container = document.getElementById('results-container');
    if (container && !document.getElementById('export-button')) {
        const exportButton = document.createElement('button');
        exportButton.id = 'export-button';
        exportButton.className = 'mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors';
        exportButton.innerHTML = '<i class="fas fa-download mr-2"></i>Export Results (CSV)';
        exportButton.onclick = () => simulatorInstance.exportResults();
        
        const methodologyDiv = container.querySelector('.bg-white.rounded-lg.shadow-lg.p-6');
        if (methodologyDiv) {
            methodologyDiv.appendChild(exportButton);
        }
    }
}

// Cost calculation functions for unit testing
window.TradingCostCalculator = {
    calculateSpreadCost: (spread, pipValue, tradeSize, trades) => {
        return spread * pipValue * tradeSize * trades;
    },
    
    calculateCommissionCost: (commission, tradeSize, trades) => {
        return commission * tradeSize * trades;
    },
    
    calculateSlippageCost: (slippage, pipValue, tradeSize, trades) => {
        return slippage * pipValue * tradeSize * trades;
    },
    
    calculateTotalCost: (spreadCost, commissionCost, slippageCost) => {
        return spreadCost + commissionCost + slippageCost;
    }
};

// Initialize simulator
let simulatorInstance;
document.addEventListener('DOMContentLoaded', () => {
    simulatorInstance = new TradingSimulator();
});