// Enhanced Trading Cost Simulator
// Industry-leading trading cost analysis with multiple broker comparison

class EnhancedTradingSimulator {
    constructor() {
        this.brokers = [];
        this.selectedBrokers = [];
        this.simulationResults = null;
        this.currentSimulation = {
            strategy: 'day-trading',
            volume: 1.0, // Standard lots
            leverage: 100,
            instrument: 'EURUSD',
            tradesPerMonth: 50,
            timeframe: '1-month',
            accountSize: 10000
        };
        this.currencyPairs = [
            { symbol: 'EURUSD', name: 'EUR/USD', pipValue: 10 },
            { symbol: 'GBPUSD', name: 'GBP/USD', pipValue: 10 },
            { symbol: 'USDJPY', name: 'USD/JPY', pipValue: 9.09 },
            { symbol: 'USDCHF', name: 'USD/CHF', pipValue: 10.87 },
            { symbol: 'AUDUSD', name: 'AUD/USD', pipValue: 10 },
            { symbol: 'NZDUSD', name: 'NZD/USD', pipValue: 10 },
            { symbol: 'USDCAD', name: 'USD/CAD', pipValue: 7.58 }
        ];
        this.init();
    }

    async init() {
        await this.loadBrokers();
        this.setupEventListeners();
        this.loadURLParameters();
        this.renderInterface();
        console.log('✅ Enhanced Trading Simulator initialized');
    }

    async loadBrokers() {
        try {
            const response = await fetch('/api/brokers');
            if (response.ok) {
                const data = await response.json();
                this.brokers = (data.brokers || []).map(broker => ({
                    ...broker,
                    // Default spread and commission data if not provided
                    spread_eur_usd: 0.8,
                    spread_gbp_usd: 1.2,
                    spread_usd_jpy: 0.9,
                    commission_per_lot: broker.spread_type === 'raw' ? 7 : 0
                }));
            } else {
                // Enhanced fallback with realistic data
                this.brokers = [
                    { 
                        id: 'ic-markets', name: 'IC Markets', slug: 'ic-markets',
                        spread_eur_usd: 0.1, spread_gbp_usd: 0.4, spread_usd_jpy: 0.2,
                        commission_per_lot: 7, spread_type: 'raw', rating: 4.8
                    },
                    { 
                        id: 'pepperstone', name: 'Pepperstone', slug: 'pepperstone',
                        spread_eur_usd: 0.2, spread_gbp_usd: 0.5, spread_usd_jpy: 0.3,
                        commission_per_lot: 7, spread_type: 'raw', rating: 4.7
                    },
                    { 
                        id: 'oanda', name: 'OANDA', slug: 'oanda',
                        spread_eur_usd: 1.2, spread_gbp_usd: 1.8, spread_usd_jpy: 1.4,
                        commission_per_lot: 0, spread_type: 'variable', rating: 4.5
                    },
                    { 
                        id: 'interactive-brokers', name: 'Interactive Brokers', slug: 'interactive-brokers',
                        spread_eur_usd: 0.1, spread_gbp_usd: 0.3, spread_usd_jpy: 0.2,
                        commission_per_lot: 2.5, spread_type: 'raw', rating: 4.6
                    },
                    { 
                        id: 'forex-com', name: 'Forex.com', slug: 'forex-com',
                        spread_eur_usd: 1.4, spread_gbp_usd: 2.1, spread_usd_jpy: 1.6,
                        commission_per_lot: 0, spread_type: 'variable', rating: 4.3
                    },
                    { 
                        id: 'tastyfx', name: 'TastyFX', slug: 'tastyfx',
                        spread_eur_usd: 1.0, spread_gbp_usd: 1.5, spread_usd_jpy: 1.2,
                        commission_per_lot: 0, spread_type: 'variable', rating: 4.2
                    }
                ];
            }
        } catch (error) {
            console.error('Error loading brokers:', error);
            this.brokers = [];
        }
    }

    loadURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const brokerParam = urlParams.get('brokers');
        
        if (brokerParam) {
            const brokerSlugs = brokerParam.split(',').filter(Boolean);
            this.selectedBrokers = this.brokers.filter(broker => 
                brokerSlugs.includes(broker.slug)
            );
        }

        // Load other parameters
        const strategy = urlParams.get('strategy');
        if (strategy) this.currentSimulation.strategy = strategy;

        const volume = urlParams.get('volume');
        if (volume) this.currentSimulation.volume = parseFloat(volume);
    }

    setupEventListeners() {
        document.addEventListener('change', (e) => {
            if (e.target.name && e.target.name.startsWith('sim-')) {
                this.updateSimulationParameter(e.target);
            }
        });

        document.addEventListener('input', (e) => {
            if (e.target.name && e.target.name.startsWith('sim-')) {
                this.updateSimulationParameter(e.target);
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'add-broker-sim') {
                const brokerId = e.target.dataset.brokerId;
                this.addBrokerToSimulation(brokerId);
            }
            if (e.target.dataset.action === 'remove-broker-sim') {
                const brokerId = e.target.dataset.brokerId;
                this.removeBrokerFromSimulation(brokerId);
            }
            if (e.target.dataset.action === 'run-simulation') {
                this.runSimulation();
            }
            if (e.target.dataset.action === 'reset-simulation') {
                this.resetSimulation();
            }
        });
    }

    renderInterface() {
        const container = document.getElementById('simulator-interface');
        if (!container) return;

        container.innerHTML = `
            <div class="grid lg:grid-cols-3 gap-8">
                <!-- Simulation Parameters -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                        <h2 class="text-xl font-bold mb-6">Simulation Parameters</h2>
                        
                        <!-- Trading Strategy -->
                        <div class="mb-6">
                            <label class="block font-medium text-gray-700 mb-3">Trading Strategy</label>
                            <select name="sim-strategy" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="scalping" ${this.currentSimulation.strategy === 'scalping' ? 'selected' : ''}>Scalping (100+ trades/month)</option>
                                <option value="day-trading" ${this.currentSimulation.strategy === 'day-trading' ? 'selected' : ''}>Day Trading (50-100 trades/month)</option>
                                <option value="swing-trading" ${this.currentSimulation.strategy === 'swing-trading' ? 'selected' : ''}>Swing Trading (10-30 trades/month)</option>
                                <option value="position-trading" ${this.currentSimulation.strategy === 'position-trading' ? 'selected' : ''}>Position Trading (1-10 trades/month)</option>
                            </select>
                        </div>

                        <!-- Volume per Trade -->
                        <div class="mb-6">
                            <label class="block font-medium text-gray-700 mb-3">Volume per Trade (Lots)</label>
                            <input type="number" name="sim-volume" value="${this.currentSimulation.volume}" 
                                   min="0.01" max="100" step="0.01" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <div class="text-sm text-gray-500 mt-1">1.0 = $100,000 position size</div>
                        </div>

                        <!-- Currency Pair -->
                        <div class="mb-6">
                            <label class="block font-medium text-gray-700 mb-3">Currency Pair</label>
                            <select name="sim-instrument" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                ${this.currencyPairs.map(pair => `
                                    <option value="${pair.symbol}" ${this.currentSimulation.instrument === pair.symbol ? 'selected' : ''}>
                                        ${pair.name}
                                    </option>
                                `).join('')}
                            </select>
                        </div>

                        <!-- Account Size -->
                        <div class="mb-6">
                            <label class="block font-medium text-gray-700 mb-3">Account Size (USD)</label>
                            <input type="number" name="sim-accountSize" value="${this.currentSimulation.accountSize}" 
                                   min="100" max="1000000" step="100" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>

                        <!-- Trades per Month -->
                        <div class="mb-6">
                            <label class="block font-medium text-gray-700 mb-3">Trades per Month</label>
                            <input type="number" name="sim-tradesPerMonth" value="${this.currentSimulation.tradesPerMonth}" 
                                   min="1" max="1000" step="1" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>

                        <!-- Leverage -->
                        <div class="mb-6">
                            <label class="block font-medium text-gray-700 mb-3">Leverage</label>
                            <select name="sim-leverage" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="30" ${this.currentSimulation.leverage === 30 ? 'selected' : ''}>1:30</option>
                                <option value="50" ${this.currentSimulation.leverage === 50 ? 'selected' : ''}>1:50</option>
                                <option value="100" ${this.currentSimulation.leverage === 100 ? 'selected' : ''}>1:100</option>
                                <option value="200" ${this.currentSimulation.leverage === 200 ? 'selected' : ''}>1:200</option>
                                <option value="500" ${this.currentSimulation.leverage === 500 ? 'selected' : ''}>1:500</option>
                            </select>
                        </div>

                        <button data-action="run-simulation" 
                                class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-semibold">
                            <i class="fas fa-calculator mr-2"></i>Calculate Costs
                        </button>
                    </div>
                </div>

                <!-- Broker Selection and Results -->
                <div class="lg:col-span-2">
                    <!-- Selected Brokers -->
                    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <h3 class="text-lg font-bold mb-4">Selected Brokers for Comparison (${this.selectedBrokers.length})</h3>
                        ${this.selectedBrokers.length === 0 ? `
                            <div class="text-center py-8 text-gray-500">
                                <i class="fas fa-info-circle text-2xl mb-3"></i>
                                <p>Select brokers below to compare trading costs</p>
                            </div>
                        ` : `
                            <div class="grid md:grid-cols-2 gap-4 mb-4">
                                ${this.selectedBrokers.map(broker => `
                                    <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                        <div class="flex items-center">
                                            <div class="w-8 h-8 bg-white rounded mr-3 flex items-center justify-center">
                                                <img src="/static/images/brokers/${broker.slug}.png" 
                                                     alt="${broker.name}" 
                                                     class="w-6 h-6 object-contain"
                                                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                                <div class="w-6 h-6 bg-blue-100 rounded hidden items-center justify-center text-blue-600 font-bold text-xs">
                                                    ${broker.name.charAt(0)}
                                                </div>
                                            </div>
                                            <span class="font-medium text-blue-900">${broker.name}</span>
                                        </div>
                                        <button data-action="remove-broker-sim" 
                                                data-broker-id="${broker.slug}"
                                                class="text-blue-600 hover:text-blue-800">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        `}
                    </div>

                    <!-- Available Brokers -->
                    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <h3 class="text-lg font-bold mb-4">Available Brokers</h3>
                        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            ${this.brokers.map(broker => {
                                const isSelected = this.selectedBrokers.some(selected => selected.slug === broker.slug);
                                return `
                                    <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div class="flex items-center justify-between mb-3">
                                            <div class="flex items-center">
                                                <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                                    <img src="/static/images/brokers/${broker.slug}.png" 
                                                         alt="${broker.name}" 
                                                         class="w-8 h-8 object-contain"
                                                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                                    <div class="w-8 h-8 bg-blue-100 rounded hidden items-center justify-center text-blue-600 font-bold text-sm">
                                                        ${broker.name.charAt(0)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 class="font-semibold text-gray-900 text-sm">${broker.name}</h4>
                                                    <div class="text-xs text-gray-600">${broker.rating}/5 ★</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="text-xs text-gray-600 mb-3">
                                            <div>EUR/USD: ${broker.spread_eur_usd} pips</div>
                                            <div>Commission: $${broker.commission_per_lot}/lot</div>
                                        </div>
                                        
                                        ${!isSelected ? `
                                            <button data-action="add-broker-sim" 
                                                    data-broker-id="${broker.slug}"
                                                    class="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">
                                                <i class="fas fa-plus mr-1"></i>Add to Comparison
                                            </button>
                                        ` : `
                                            <button class="w-full bg-green-100 text-green-800 px-3 py-2 rounded text-sm cursor-not-allowed">
                                                <i class="fas fa-check mr-1"></i>Added
                                            </button>
                                        `}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Simulation Results -->
                    <div id="simulation-results" class="hidden">
                        <!-- Results will be rendered here -->
                    </div>
                </div>
            </div>
        `;
    }

    updateSimulationParameter(input) {
        const paramName = input.name.replace('sim-', '');
        let value = input.value;

        // Convert to appropriate types
        if (['volume', 'leverage', 'tradesPerMonth', 'accountSize'].includes(paramName)) {
            value = parseFloat(value);
        }

        this.currentSimulation[paramName] = value;
        
        // Auto-adjust trades per month based on strategy
        if (paramName === 'strategy') {
            const tradesPerMonthInput = document.querySelector('[name="sim-tradesPerMonth"]');
            if (tradesPerMonthInput) {
                let suggestedTrades = 50;
                switch (value) {
                    case 'scalping': suggestedTrades = 200; break;
                    case 'day-trading': suggestedTrades = 75; break;
                    case 'swing-trading': suggestedTrades = 20; break;
                    case 'position-trading': suggestedTrades = 5; break;
                }
                tradesPerMonthInput.value = suggestedTrades;
                this.currentSimulation.tradesPerMonth = suggestedTrades;
            }
        }
    }

    addBrokerToSimulation(brokerId) {
        const broker = this.brokers.find(b => b.slug === brokerId);
        if (broker && !this.selectedBrokers.some(selected => selected.slug === brokerId)) {
            this.selectedBrokers.push(broker);
            this.renderInterface();
            
            if (this.selectedBrokers.length >= 2) {
                this.runSimulation();
            }
        }
    }

    removeBrokerFromSimulation(brokerId) {
        this.selectedBrokers = this.selectedBrokers.filter(broker => broker.slug !== brokerId);
        this.renderInterface();
        
        // Re-run simulation if we still have brokers selected
        if (this.selectedBrokers.length >= 1) {
            this.runSimulation();
        }
    }

    async runSimulation() {
        if (this.selectedBrokers.length === 0) {
            this.showNotification('Please select at least one broker for cost calculation', 'error');
            return;
        }

        const resultsContainer = document.getElementById('simulation-results');
        if (!resultsContainer) return;

        // Show loading state
        resultsContainer.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-8">
                <div class="text-center">
                    <div class="loading-spinner w-16 h-16 mx-auto mb-4"></div>
                    <h3 class="text-xl font-semibold mb-2">Calculating Trading Costs...</h3>
                    <p class="text-gray-600">Analyzing ${this.selectedBrokers.length} broker(s) for your strategy</p>
                </div>
            </div>
        `;
        resultsContainer.classList.remove('hidden');

        try {
            // Prepare simulation request
            const requestData = {
                brokerIds: this.selectedBrokers.map(b => b.slug),
                strategy: this.currentSimulation.strategy,
                volume: this.currentSimulation.volume,
                leverage: this.currentSimulation.leverage,
                instrument: this.currentSimulation.instrument
            };

            const response = await fetch('/api/calculate-costs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Failed to calculate costs');
            }

            const data = await response.json();
            this.simulationResults = data.results || [];
            
            // If API doesn't return results, calculate locally
            if (this.simulationResults.length === 0) {
                this.simulationResults = this.calculateCostsLocally();
            }
            
            this.renderSimulationResults();
            
        } catch (error) {
            console.error('Simulation error:', error);
            // Fallback to local calculation
            this.simulationResults = this.calculateCostsLocally();
            this.renderSimulationResults();
        }
    }

    calculateCostsLocally() {
        return this.selectedBrokers.map(broker => {
            const pair = this.currencyPairs.find(p => p.symbol === this.currentSimulation.instrument);
            const pipValue = pair ? pair.pipValue : 10;
            
            // Get spread for the selected instrument
            let spread = 1.0; // default
            switch (this.currentSimulation.instrument) {
                case 'EURUSD': spread = broker.spread_eur_usd || 1.0; break;
                case 'GBPUSD': spread = broker.spread_gbp_usd || 1.2; break;
                case 'USDJPY': spread = broker.spread_usd_jpy || 1.0; break;
                default: spread = 1.0;
            }

            const volume = this.currentSimulation.volume;
            const tradesPerMonth = this.currentSimulation.tradesPerMonth;
            const commission = broker.commission_per_lot || 0;

            // Calculate costs
            const spreadCostPerTrade = spread * pipValue * volume;
            const commissionCostPerTrade = commission * volume;
            const totalCostPerTrade = spreadCostPerTrade + commissionCostPerTrade;
            
            const monthlyCost = totalCostPerTrade * tradesPerMonth;
            const yearlyCost = monthlyCost * 12;

            // Calculate as percentage of account
            const costPercentageMonthly = (monthlyCost / this.currentSimulation.accountSize) * 100;

            return {
                broker: broker,
                spreadCost: spreadCostPerTrade,
                commissionCost: commissionCostPerTrade,
                totalCostPerTrade: totalCostPerTrade,
                monthlyCost: monthlyCost,
                yearlyCost: yearlyCost,
                costPercentageMonthly: costPercentageMonthly,
                spread: spread,
                commission: commission
            };
        }).sort((a, b) => a.totalCostPerTrade - b.totalCostPerTrade);
    }

    renderSimulationResults() {
        const resultsContainer = document.getElementById('simulation-results');
        if (!resultsContainer || !this.simulationResults) return;

        const bestBroker = this.simulationResults[0];
        const worstBroker = this.simulationResults[this.simulationResults.length - 1];
        const savings = worstBroker ? worstBroker.monthlyCost - bestBroker.monthlyCost : 0;

        resultsContainer.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <!-- Header -->
                <div class="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-2xl font-bold mb-2">Trading Cost Analysis</h2>
                            <p class="text-green-100">
                                ${this.currentSimulation.strategy} • ${this.currentSimulation.volume} lots • 
                                ${this.currentSimulation.tradesPerMonth} trades/month
                            </p>
                        </div>
                        <div class="text-right">
                            ${savings > 0 ? `
                                <div class="text-2xl font-bold">$${savings.toFixed(2)}</div>
                                <div class="text-green-100">Monthly Savings</div>
                            ` : ''}
                        </div>
                    </div>
                </div>

                <!-- Cost Comparison Table -->
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broker</th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Spread</th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Cost/Trade</th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Cost</th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Cost</th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">% of Account</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${this.simulationResults.map((result, index) => `
                                <tr class="${index === 0 ? 'bg-green-50' : ''} hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            ${index === 0 ? '<i class="fas fa-trophy text-yellow-500 mr-2"></i>' : ''}
                                            <div class="w-8 h-8 bg-gray-100 rounded mr-3 flex items-center justify-center">
                                                <img src="/static/images/brokers/${result.broker.slug}.png" 
                                                     alt="${result.broker.name}" 
                                                     class="w-6 h-6 object-contain"
                                                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                                <div class="w-6 h-6 bg-blue-100 rounded hidden items-center justify-center text-blue-600 font-bold text-xs">
                                                    ${result.broker.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div>
                                                <div class="text-sm font-medium text-gray-900">${result.broker.name}</div>
                                                <div class="text-sm text-gray-500">${result.broker.rating}/5 ★</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                        ${result.spread} pips
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                        $${result.commission}/lot
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium ${index === 0 ? 'text-green-600' : 'text-gray-900'}">
                                        $${result.totalCostPerTrade.toFixed(2)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium ${index === 0 ? 'text-green-600' : 'text-gray-900'}">
                                        $${result.monthlyCost.toFixed(2)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                        $${result.yearlyCost.toFixed(2)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm ${result.costPercentageMonthly > 5 ? 'text-red-600' : result.costPercentageMonthly > 2 ? 'text-yellow-600' : 'text-green-600'}">
                                        ${result.costPercentageMonthly.toFixed(2)}%
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Analysis Summary -->
                <div class="p-6 bg-gray-50 border-t">
                    <h3 class="font-bold text-lg mb-4">Cost Analysis Summary</h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold text-green-600 mb-2">🏆 Best Choice: ${bestBroker.broker.name}</h4>
                            <ul class="text-sm text-gray-700 space-y-1">
                                <li>• Lowest cost per trade: $${bestBroker.totalCostPerTrade.toFixed(2)}</li>
                                <li>• Monthly trading cost: $${bestBroker.monthlyCost.toFixed(2)}</li>
                                <li>• Annual cost impact: ${bestBroker.costPercentageMonthly.toFixed(2)}% of account monthly</li>
                            </ul>
                        </div>
                        ${savings > 0 ? `
                            <div>
                                <h4 class="font-semibold text-blue-600 mb-2">💰 Potential Savings</h4>
                                <ul class="text-sm text-gray-700 space-y-1">
                                    <li>• Save $${savings.toFixed(2)} per month</li>
                                    <li>• Save $${(savings * 12).toFixed(2)} per year</li>
                                    <li>• ${((savings / worstBroker.monthlyCost) * 100).toFixed(1)}% cost reduction</li>
                                </ul>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Action Buttons -->
                    <div class="mt-6 grid md:grid-cols-${this.simulationResults.length} gap-4">
                        ${this.simulationResults.map(result => `
                            <div class="text-center">
                                <h5 class="font-medium mb-2">${result.broker.name}</h5>
                                <div class="space-y-2">
                                    <a href="/reviews/${result.broker.slug}" 
                                       class="block bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">
                                        <i class="fas fa-star mr-1"></i>Full Review
                                    </a>
                                    <a href="${result.broker.website_url || '#'}" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       class="block bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700">
                                        <i class="fas fa-external-link-alt mr-1"></i>Open Account
                                    </a>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Methodology -->
                <div class="p-6 border-t">
                    <details class="cursor-pointer">
                        <summary class="font-semibold text-gray-700 mb-3">Calculation Methodology</summary>
                        <div class="text-sm text-gray-600 space-y-2">
                            <p><strong>Spread Cost:</strong> Spread (pips) × Pip Value × Volume per trade</p>
                            <p><strong>Commission Cost:</strong> Commission per lot × Volume per trade</p>
                            <p><strong>Total Cost:</strong> Spread Cost + Commission Cost per trade</p>
                            <p><strong>Monthly/Annual:</strong> Cost per trade × Number of trades per period</p>
                            <p><strong>Assumptions:</strong> ${this.currentSimulation.instrument} pip value ≈ $${this.currencyPairs.find(p => p.symbol === this.currentSimulation.instrument)?.pipValue || 10} per standard lot</p>
                        </div>
                    </details>
                </div>
            </div>
        `;

        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    resetSimulation() {
        this.selectedBrokers = [];
        this.simulationResults = null;
        this.currentSimulation = {
            strategy: 'day-trading',
            volume: 1.0,
            leverage: 100,
            instrument: 'EURUSD',
            tradesPerMonth: 50,
            timeframe: '1-month',
            accountSize: 10000
        };
        
        this.renderInterface();
        
        const resultsContainer = document.getElementById('simulation-results');
        if (resultsContainer) {
            resultsContainer.classList.add('hidden');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg z-50 ${
            type === 'success' ? 'bg-green-600' :
            type === 'error' ? 'bg-red-600' :
            type === 'warning' ? 'bg-yellow-600' :
            'bg-blue-600'
        } text-white shadow-lg`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${
                    type === 'success' ? 'check' :
                    type === 'error' ? 'exclamation-triangle' :
                    type === 'warning' ? 'exclamation' :
                    'info-circle'
                } mr-2"></i>
                ${message}
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('simulator-interface')) {
        window.enhancedSimulator = new EnhancedTradingSimulator();
    }
});