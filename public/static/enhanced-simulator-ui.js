// Enhanced Trading Simulator UI Components
// ADDITIVE MODULE - Enhances existing simulator with modern fintech UI
// Preserves all existing functionality while adding professional features

class EnhancedSimulatorUI {
    constructor() {
        this.engine = null;
        this.selectedBrokers = [];
        this.currentStrategy = 'scalping';
        this.currentParams = {
            tradeSize: 1.0,
            tradesPerMonth: 100,
            instrument: 'EURUSD',
            holdingPeriodDays: 1
        };
        this.results = [];
        this.insights = null;
        this.init();
    }

    async init() {
        // Initialize engine
        this.engine = new EnhancedSimulatorEngine();
        await this.engine.init();
        
        // Setup enhanced UI
        this.setupEnhancedUI();
        this.setupEventListeners();
    }

    setupEnhancedUI() {
        // Check if enhanced UI already exists
        if (document.getElementById('enhanced-simulator-container')) {
            return;
        }

        // Find the existing simulator inputs container
        const existingContainer = document.querySelector('.max-w-4xl.mx-auto.px-4.sm\\:px-6.lg\\:px-8.py-8');
        if (!existingContainer) return;

        // Create enhanced UI container
        const enhancedContainer = document.createElement('div');
        enhancedContainer.id = 'enhanced-simulator-container';
        enhancedContainer.className = 'mt-8';
        enhancedContainer.innerHTML = this.generateEnhancedUI();

        // Insert after existing container
        existingContainer.parentNode.insertBefore(enhancedContainer, existingContainer.nextSibling);

        // Hide existing container by default (can be toggled)
        existingContainer.style.display = 'none';

        // Add toggle button
        this.addToggleButton(existingContainer);
    }

    generateEnhancedUI() {
        return `
            <!-- Enhanced Simulator Header -->
            <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900">Professional Cost Analysis</h2>
                        <p class="text-gray-600">Advanced strategy-aware broker comparison with real-time insights</p>
                    </div>
                    <div class="flex space-x-2">
                        <button id="toggle-classic-view" class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 transition-colors">
                            <i class="fas fa-exchange-alt mr-2"></i>Classic View
                        </button>
                        <button id="export-enhanced-results" class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" disabled>
                            <i class="fas fa-download mr-2"></i>Export PDF
                        </button>
                    </div>
                </div>

                <!-- Enhanced Input Grid -->
                <div class="grid lg:grid-cols-3 gap-6">
                    <!-- Strategy Selection -->
                    <div class="lg:col-span-1">
                        <div class="space-y-6">
                            ${this.generateStrategySelector()}
                            ${this.generateBrokerSelector()}
                        </div>
                    </div>

                    <!-- Trading Parameters -->
                    <div class="lg:col-span-1">
                        ${this.generateTradingParametersForm()}
                    </div>

                    <!-- Market Conditions & Quick Stats -->
                    <div class="lg:col-span-1">
                        ${this.generateMarketConditionsPanel()}
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-center mt-8">
                    <button id="run-enhanced-simulation" class="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg">
                        <i class="fas fa-calculator mr-2"></i>
                        Analyze Trading Costs
                    </button>
                </div>
            </div>

            <!-- Enhanced Results Container -->
            <div id="enhanced-results-container" class="hidden space-y-6">
                ${this.generateResultsSummaryCards()}
                ${this.generateBrokerComparisonTable()}
                ${this.generateInsightsPanel()}
                ${this.generateCostBreakdownChart()}
            </div>

            <!-- Loading State -->
            <div id="enhanced-loading" class="hidden text-center py-12">
                <div class="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-lg">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mr-3"></div>
                    <span class="text-gray-700">Calculating advanced cost analysis...</span>
                </div>
            </div>
        `;
    }

    generateStrategySelector() {
        const strategies = this.engine ? this.engine.getStrategies() : [];
        
        return `
            <div class="strategy-selector">
                <h3 class="text-lg font-semibold mb-3">Trading Strategy</h3>
                <div class="space-y-3" id="strategy-options">
                    ${strategies.map(strategy => `
                        <div class="strategy-option p-4 border rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all ${strategy.id === this.currentStrategy ? 'border-green-500 bg-green-50' : 'border-gray-200'}"
                             data-strategy="${strategy.id}">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="font-medium text-gray-900">${strategy.name}</div>
                                    <div class="text-sm text-gray-600 mt-1">${strategy.description}</div>
                                    <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                        <span><i class="fas fa-clock mr-1"></i>${strategy.typicalHoldTime}</span>
                                        <span class="px-2 py-1 rounded-full ${this.getRiskBadgeClass(strategy.riskProfile)}">${strategy.riskProfile} risk</span>
                                    </div>
                                </div>
                                <button class="strategy-info-btn text-gray-400 hover:text-gray-600" data-strategy="${strategy.id}">
                                    <i class="fas fa-info-circle"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    generateBrokerSelector() {
        const brokers = this.engine ? this.engine.getBrokers() : [];
        
        return `
            <div class="broker-selector">
                <h3 class="text-lg font-semibold mb-3">Select Brokers (up to 4)</h3>
                <div class="space-y-2" id="broker-options">
                    ${brokers.map(broker => `
                        <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input type="checkbox" 
                                   class="broker-checkbox mr-3" 
                                   data-broker="${broker.id}" 
                                   ${this.selectedBrokers.includes(broker.id) ? 'checked' : ''}>
                            <div class="flex-1">
                                <div class="font-medium">${broker.name}</div>
                                <div class="text-sm text-gray-500">
                                    ${broker.regulation.slice(0, 2).join(', ')} • Min: $${broker.minimumDeposit}
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-sm font-medium">${broker.executionModel.toUpperCase()}</div>
                                <div class="text-xs text-gray-500">${broker.orderExecution.average_speed_ms}ms</div>
                            </div>
                        </label>
                    `).join('')}
                </div>
                <div class="text-xs text-gray-500 mt-2">
                    <i class="fas fa-info-circle mr-1"></i>
                    Select multiple brokers to compare side-by-side
                </div>
            </div>
        `;
    }

    generateTradingParametersForm() {
        return `
            <div class="trading-parameters">
                <h3 class="text-lg font-semibold mb-4">Trading Parameters</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Position Size</label>
                        <div class="relative">
                            <input type="number" 
                                   id="enhanced-trade-size" 
                                   value="${this.currentParams.tradeSize}" 
                                   min="0.01" 
                                   step="0.01" 
                                   class="w-full border rounded-lg px-3 py-2 pr-12">
                            <span class="absolute right-3 top-2 text-gray-500 text-sm">lots</span>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">Standard lot = 100,000 units</div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Monthly Trade Volume</label>
                        <input type="number" 
                               id="enhanced-trades-count" 
                               value="${this.currentParams.tradesPerMonth}" 
                               min="1" 
                               class="w-full border rounded-lg px-3 py-2">
                        <div class="text-xs text-gray-500 mt-1">Number of trades per month</div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Primary Currency Pair</label>
                        <select id="enhanced-instrument" class="w-full border rounded-lg px-3 py-2">
                            <optgroup label="Major Pairs">
                                <option value="EURUSD" ${this.currentParams.instrument === 'EURUSD' ? 'selected' : ''}>EUR/USD</option>
                                <option value="GBPUSD" ${this.currentParams.instrument === 'GBPUSD' ? 'selected' : ''}>GBP/USD</option>
                                <option value="USDJPY" ${this.currentParams.instrument === 'USDJPY' ? 'selected' : ''}>USD/JPY</option>
                                <option value="AUDUSD" ${this.currentParams.instrument === 'AUDUSD' ? 'selected' : ''}>AUD/USD</option>
                                <option value="USDCAD" ${this.currentParams.instrument === 'USDCAD' ? 'selected' : ''}>USD/CAD</option>
                                <option value="USDCHF" ${this.currentParams.instrument === 'USDCHF' ? 'selected' : ''}>USD/CHF</option>
                            </optgroup>
                            <optgroup label="Minor Pairs">
                                <option value="EURJPY" ${this.currentParams.instrument === 'EURJPY' ? 'selected' : ''}>EUR/JPY</option>
                                <option value="EURGBP" ${this.currentParams.instrument === 'EURGBP' ? 'selected' : ''}>EUR/GBP</option>
                                <option value="GBPJPY" ${this.currentParams.instrument === 'GBPJPY' ? 'selected' : ''}>GBP/JPY</option>
                            </optgroup>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Average Holding Period</label>
                        <select id="enhanced-holding-period" class="w-full border rounded-lg px-3 py-2">
                            <option value="0.02" ${this.currentParams.holdingPeriodDays === 0.02 ? 'selected' : ''}>30 minutes (intraday)</option>
                            <option value="0.25" ${this.currentParams.holdingPeriodDays === 0.25 ? 'selected' : ''}>6 hours (day trade)</option>
                            <option value="1" ${this.currentParams.holdingPeriodDays === 1 ? 'selected' : ''}>1 day</option>
                            <option value="3" ${this.currentParams.holdingPeriodDays === 3 ? 'selected' : ''}>3 days</option>
                            <option value="7" ${this.currentParams.holdingPeriodDays === 7 ? 'selected' : ''}>1 week</option>
                            <option value="30" ${this.currentParams.holdingPeriodDays === 30 ? 'selected' : ''}>1 month</option>
                        </select>
                        <div class="text-xs text-gray-500 mt-1">Affects swap/rollover costs</div>
                    </div>
                </div>
            </div>
        `;
    }

    generateMarketConditionsPanel() {
        return `
            <div class="market-conditions">
                <h3 class="text-lg font-semibold mb-4">Market Conditions</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Market Environment</label>
                        <select id="market-condition" class="w-full border rounded-lg px-3 py-2">
                            <option value="normal">Normal Market</option>
                            <option value="volatile">High Volatility</option>
                            <option value="news_event">News/Event Driven</option>
                        </select>
                    </div>

                    <!-- Quick Stats Preview -->
                    <div class="bg-gray-50 rounded-lg p-4">
                        <h4 class="text-sm font-semibold mb-3 text-gray-700">Quick Preview</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Monthly Volume:</span>
                                <span class="font-medium" id="preview-volume">100 lots</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Est. Total Value:</span>
                                <span class="font-medium" id="preview-value">$10M</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Strategy Risk:</span>
                                <span class="font-medium" id="preview-risk">High</span>
                            </div>
                        </div>
                    </div>

                    <!-- Strategy Info Panel -->
                    <div id="strategy-info-panel" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="text-sm font-semibold text-blue-800 mb-2">Strategy Insights</h4>
                        <div id="strategy-details" class="text-sm text-blue-700">
                            Select a strategy to see detailed information and recommendations.
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateResultsSummaryCards() {
        return `
            <div class="results-summary">
                <h2 class="text-2xl font-bold mb-6">Cost Analysis Results</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" id="summary-metrics">
                    <!-- Metrics cards will be populated here -->
                </div>
            </div>
        `;
    }

    generateBrokerComparisonTable() {
        return `
            <div class="broker-comparison bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-semibold">Detailed Broker Comparison</h3>
                    <div class="flex space-x-2">
                        <button id="sort-by-cost" class="px-3 py-1 text-sm border rounded hover:bg-gray-50">Sort by Cost</button>
                        <button id="sort-by-quality" class="px-3 py-1 text-sm border rounded hover:bg-gray-50">Sort by Quality</button>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full" id="enhanced-comparison-table">
                        <!-- Table will be populated dynamically -->
                    </table>
                </div>
            </div>
        `;
    }

    generateInsightsPanel() {
        return `
            <div class="insights-panel bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-4 flex items-center">
                    <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                    Smart Insights & Recommendations
                </h3>
                <div id="insights-content">
                    <!-- Insights will be populated after calculation -->
                </div>
            </div>
        `;
    }

    generateCostBreakdownChart() {
        return `
            <div class="cost-breakdown bg-white rounded-lg shadow-lg p-6">
                <h3 class="text-xl font-semibold mb-4">Cost Breakdown Analysis</h3>
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-sm font-medium text-gray-700 mb-3">Cost Distribution</h4>
                        <div id="cost-breakdown-chart" class="h-64">
                            <!-- Chart will be rendered here -->
                        </div>
                    </div>
                    <div>
                        <h4 class="text-sm font-medium text-gray-700 mb-3">Broker Performance</h4>
                        <div id="broker-performance-chart" class="h-64">
                            <!-- Chart will be rendered here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Strategy selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.strategy-option')) {
                const strategyId = e.target.closest('.strategy-option').dataset.strategy;
                this.selectStrategy(strategyId);
            }
        });

        // Strategy info buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.strategy-info-btn')) {
                e.stopPropagation();
                const strategyId = e.target.closest('.strategy-info-btn').dataset.strategy;
                this.showStrategyInfo(strategyId);
            }
        });

        // Broker selection
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('broker-checkbox')) {
                this.handleBrokerSelection(e.target);
            }
        });

        // Parameter inputs
        ['enhanced-trade-size', 'enhanced-trades-count', 'enhanced-instrument', 'enhanced-holding-period', 'market-condition'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => this.updateParameters());
            }
        });

        // Run simulation
        document.addEventListener('click', (e) => {
            if (e.target.id === 'run-enhanced-simulation' || e.target.closest('#run-enhanced-simulation')) {
                this.runEnhancedSimulation();
            }
        });

        // Toggle classic view
        document.addEventListener('click', (e) => {
            if (e.target.id === 'toggle-classic-view' || e.target.closest('#toggle-classic-view')) {
                this.toggleClassicView();
            }
        });

        // Export results
        document.addEventListener('click', (e) => {
            if (e.target.id === 'export-enhanced-results' || e.target.closest('#export-enhanced-results')) {
                this.exportEnhancedResults();
            }
        });

        // Sorting
        document.addEventListener('click', (e) => {
            if (e.target.id === 'sort-by-cost') {
                this.sortResults('cost');
            } else if (e.target.id === 'sort-by-quality') {
                this.sortResults('quality');
            }
        });

        // Initialize default selections
        setTimeout(() => {
            this.selectStrategy(this.currentStrategy);
            this.selectDefaultBrokers();
            this.updateParameters();
        }, 100);
    }

    selectStrategy(strategyId) {
        this.currentStrategy = strategyId;
        
        // Update UI
        document.querySelectorAll('.strategy-option').forEach(option => {
            option.classList.remove('border-green-500', 'bg-green-50');
            option.classList.add('border-gray-200');
        });
        
        const selectedOption = document.querySelector(`[data-strategy="${strategyId}"]`);
        if (selectedOption) {
            selectedOption.classList.add('border-green-500', 'bg-green-50');
            selectedOption.classList.remove('border-gray-200');
        }
        
        this.updateStrategyInfo(strategyId);
        this.updateQuickPreview();
    }

    selectDefaultBrokers() {
        // Select top 3 brokers by default
        const defaultBrokers = ['ic-markets', 'pepperstone', 'etoro'];
        defaultBrokers.forEach(brokerId => {
            const checkbox = document.querySelector(`[data-broker="${brokerId}"]`);
            if (checkbox && !checkbox.checked) {
                checkbox.checked = true;
                this.selectedBrokers.push(brokerId);
            }
        });
    }

    handleBrokerSelection(checkbox) {
        const brokerId = checkbox.dataset.broker;
        
        if (checkbox.checked) {
            if (this.selectedBrokers.length >= 4) {
                checkbox.checked = false;
                this.showNotification('Maximum 4 brokers can be selected for comparison', 'warning');
                return;
            }
            this.selectedBrokers.push(brokerId);
        } else {
            this.selectedBrokers = this.selectedBrokers.filter(id => id !== brokerId);
        }
        
        this.updateQuickPreview();
    }

    updateParameters() {
        const tradeSizeEl = document.getElementById('enhanced-trade-size');
        const tradesCountEl = document.getElementById('enhanced-trades-count');
        const instrumentEl = document.getElementById('enhanced-instrument');
        const holdingPeriodEl = document.getElementById('enhanced-holding-period');
        
        if (tradeSizeEl) this.currentParams.tradeSize = parseFloat(tradeSizeEl.value) || 1.0;
        if (tradesCountEl) this.currentParams.tradesPerMonth = parseInt(tradesCountEl.value) || 100;
        if (instrumentEl) this.currentParams.instrument = instrumentEl.value;
        if (holdingPeriodEl) this.currentParams.holdingPeriodDays = parseFloat(holdingPeriodEl.value) || 1;
        
        this.updateQuickPreview();
    }

    updateStrategyInfo(strategyId) {
        const strategy = this.engine.getStrategy(strategyId);
        if (!strategy) return;
        
        const detailsEl = document.getElementById('strategy-details');
        if (detailsEl) {
            detailsEl.innerHTML = `
                <div class="space-y-2">
                    <div><strong>Typical Holding:</strong> ${strategy.typicalHoldTime}</div>
                    <div><strong>Risk Level:</strong> ${strategy.riskProfile}</div>
                    <div><strong>Trades/Day:</strong> ~${strategy.typicalTradesPerDay}</div>
                    <div><strong>Required Capital:</strong> ${strategy.requiredCapital}</div>
                    <div class="text-xs mt-2 text-blue-600">${strategy.description}</div>
                </div>
            `;
        }
    }

    updateQuickPreview() {
        const volumeEl = document.getElementById('preview-volume');
        const valueEl = document.getElementById('preview-value');
        const riskEl = document.getElementById('preview-risk');
        
        if (volumeEl) {
            const totalLots = this.currentParams.tradeSize * this.currentParams.tradesPerMonth;
            volumeEl.textContent = `${totalLots} lots`;
        }
        
        if (valueEl) {
            const totalValue = this.currentParams.tradeSize * this.currentParams.tradesPerMonth * 100000; // Assuming 100k per lot
            valueEl.textContent = `$${(totalValue / 1000000).toFixed(1)}M`;
        }
        
        if (riskEl) {
            const strategy = this.engine.getStrategy(this.currentStrategy);
            if (strategy) {
                riskEl.textContent = strategy.riskProfile;
            }
        }
    }

    async runEnhancedSimulation() {
        if (this.selectedBrokers.length === 0) {
            this.showNotification('Please select at least one broker to compare', 'error');
            return;
        }

        // Show loading state
        document.getElementById('enhanced-loading').classList.remove('hidden');
        document.getElementById('enhanced-results-container').classList.add('hidden');

        try {
            // Get market condition
            const marketCondition = document.getElementById('market-condition')?.value || 'normal';
            
            // Run comparison
            this.results = this.engine.compareAcrossBrokers(
                this.selectedBrokers,
                this.currentStrategy,
                this.currentParams,
                marketCondition
            );

            // Generate insights
            this.insights = this.engine.generateInsights(
                this.results,
                this.currentStrategy,
                this.currentParams
            );

            // Display results
            await this.displayEnhancedResults();
            
            // Enable export button
            document.getElementById('export-enhanced-results').disabled = false;

        } catch (error) {
            console.error('Simulation error:', error);
            this.showNotification('Error running simulation. Please try again.', 'error');
        } finally {
            // Hide loading state
            document.getElementById('enhanced-loading').classList.add('hidden');
        }
    }

    async displayEnhancedResults() {
        // Show results container
        document.getElementById('enhanced-results-container').classList.remove('hidden');
        
        // Display summary metrics
        this.displaySummaryMetrics();
        
        // Display comparison table
        this.displayComparisonTable();
        
        // Display insights
        this.displayInsights();
        
        // Display charts
        this.displayCharts();
        
        // Scroll to results
        document.getElementById('enhanced-results-container').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    displaySummaryMetrics() {
        const container = document.getElementById('summary-metrics');
        if (!container || !this.results.length) return;

        const bestResult = this.results[0];
        const worstResult = this.results[this.results.length - 1];
        const avgCost = this.results.reduce((sum, r) => sum + r.costs.totalCost, 0) / this.results.length;

        container.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-2xl font-bold text-green-600">$${bestResult.costs.totalCost}</div>
                        <div class="text-sm text-gray-600">Lowest Monthly Cost</div>
                        <div class="text-xs text-gray-500 mt-1">${bestResult.brokerName}</div>
                    </div>
                    <div class="text-green-500">
                        <i class="fas fa-trophy text-2xl"></i>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-2xl font-bold text-blue-600">$${this.insights.summary.totalMonthlySavings.toFixed(2)}</div>
                        <div class="text-sm text-gray-600">Potential Savings</div>
                        <div class="text-xs text-gray-500 mt-1">vs highest cost broker</div>
                    </div>
                    <div class="text-blue-500">
                        <i class="fas fa-piggy-bank text-2xl"></i>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-2xl font-bold text-orange-600">$${bestResult.costs.costPerTrade}</div>
                        <div class="text-sm text-gray-600">Cost Per Trade</div>
                        <div class="text-xs text-gray-500 mt-1">Best broker average</div>
                    </div>
                    <div class="text-orange-500">
                        <i class="fas fa-exchange-alt text-2xl"></i>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-2xl font-bold text-purple-600">${bestResult.qualityMetrics.suitabilityScore}</div>
                        <div class="text-sm text-gray-600">Strategy Match Score</div>
                        <div class="text-xs text-gray-500 mt-1">Best broker compatibility</div>
                    </div>
                    <div class="text-purple-500">
                        <i class="fas fa-target text-2xl"></i>
                    </div>
                </div>
            </div>
        `;
    }

    displayComparisonTable() {
        const table = document.getElementById('enhanced-comparison-table');
        if (!table || !this.results.length) return;

        table.innerHTML = `
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Broker</th>
                    <th class="px-4 py-3 text-center text-sm font-medium text-gray-700">Total Cost</th>
                    <th class="px-4 py-3 text-center text-sm font-medium text-gray-700">Spread</th>
                    <th class="px-4 py-3 text-center text-sm font-medium text-gray-700">Commission</th>
                    <th class="px-4 py-3 text-center text-sm font-medium text-gray-700">Execution</th>
                    <th class="px-4 py-3 text-center text-sm font-medium text-gray-700">Suitability</th>
                    <th class="px-4 py-3 text-center text-sm font-medium text-gray-700">Savings</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                ${this.results.map((result, index) => {
                    const isWinner = index === 0;
                    const rowClass = isWinner ? 'bg-green-50' : 'hover:bg-gray-50';
                    
                    return `
                        <tr class="${rowClass}">
                            <td class="px-4 py-4">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 w-8 h-8">
                                        <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <i class="fas fa-building text-gray-600 text-sm"></i>
                                        </div>
                                    </div>
                                    <div class="ml-3">
                                        <div class="font-medium text-gray-900">${result.brokerName}</div>
                                        <div class="text-sm text-gray-500">Rank #${result.ranking}</div>
                                    </div>
                                    ${isWinner ? '<span class="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><i class="fas fa-crown mr-1"></i>Best Value</span>' : ''}
                                </div>
                            </td>
                            <td class="px-4 py-4 text-center">
                                <div class="text-lg font-bold ${isWinner ? 'text-green-600' : 'text-gray-900'}">$${result.costs.totalCost}</div>
                                <div class="text-sm text-gray-500">$${result.costs.costPerTrade}/trade</div>
                            </td>
                            <td class="px-4 py-4 text-center">
                                <div class="font-medium">$${result.costs.spreadCost}</div>
                                <div class="text-sm text-gray-500">${result.breakdown.spreadContribution}%</div>
                            </td>
                            <td class="px-4 py-4 text-center">
                                <div class="font-medium">$${result.costs.commissionCost}</div>
                                <div class="text-sm text-gray-500">${result.breakdown.commissionContribution}%</div>
                            </td>
                            <td class="px-4 py-4 text-center">
                                <div class="flex items-center justify-center space-x-1">
                                    <div class="w-2 h-2 rounded-full ${this.getExecutionQualityColor(result.qualityMetrics.executionSpeed)}"></div>
                                    <span class="text-sm">${result.qualityMetrics.executionSpeed}ms</span>
                                </div>
                                <div class="text-xs text-gray-500">${result.qualityMetrics.fillRate}% fill</div>
                            </td>
                            <td class="px-4 py-4 text-center">
                                <div class="font-medium">${result.qualityMetrics.suitabilityScore}/100</div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-blue-600 h-2 rounded-full" style="width: ${result.qualityMetrics.suitabilityScore}%"></div>
                                </div>
                            </td>
                            <td class="px-4 py-4 text-center">
                                ${result.additionalCostVsBest > 0 ? 
                                    `<div class="text-red-600 font-medium">+$${result.additionalCostVsBest}</div>
                                     <div class="text-sm text-red-500">+${result.percentageMoreExpensive}%</div>` :
                                    `<div class="text-green-600 font-medium">Best</div>
                                     <div class="text-sm text-green-500">Baseline</div>`
                                }
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        `;
    }

    displayInsights() {
        const container = document.getElementById('insights-content');
        if (!container || !this.insights) return;

        const { summary, recommendations, warnings, optimizations } = this.insights;

        container.innerHTML = `
            <!-- Summary Insights -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 class="font-semibold text-blue-800 mb-2">Key Findings</h4>
                <ul class="text-blue-700 space-y-1">
                    <li>• <strong>${summary.bestBroker}</strong> offers the lowest monthly trading costs at <strong>$${summary.costRange.lowest}</strong></li>
                    <li>• You could save up to <strong>$${summary.totalMonthlySavings.toFixed(2)} (${summary.percentageSavings}%)</strong> by choosing the optimal broker</li>
                    <li>• Cost difference between best and worst: <strong>$${(summary.costRange.highest - summary.costRange.lowest).toFixed(2)}</strong></li>
                </ul>
            </div>

            <!-- Recommendations -->
            ${recommendations.length > 0 ? `
                <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <h4 class="font-semibold text-green-800 mb-2 flex items-center">
                        <i class="fas fa-thumbs-up mr-2"></i>Recommendations
                    </h4>
                    <div class="space-y-2">
                        ${recommendations.map(rec => `
                            <div class="text-green-700">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                                    ${rec.importance || 'medium'}
                                </span>
                                ${rec.message}
                                ${rec.savings ? `<strong class="ml-2 text-green-800">(Save $${rec.savings.toFixed(2)})</strong>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Warnings -->
            ${warnings.length > 0 ? `
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <h4 class="font-semibold text-yellow-800 mb-2 flex items-center">
                        <i class="fas fa-exclamation-triangle mr-2"></i>Considerations
                    </h4>
                    <div class="space-y-2">
                        ${warnings.map(warning => `
                            <div class="text-yellow-700">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                                    ${warning.severity || 'medium'}
                                </span>
                                ${warning.message}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Optimizations -->
            ${optimizations.length > 0 ? `
                <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 class="font-semibold text-purple-800 mb-2 flex items-center">
                        <i class="fas fa-cogs mr-2"></i>Optimization Opportunities
                    </h4>
                    <div class="space-y-2">
                        ${optimizations.map(opt => `
                            <div class="text-purple-700">
                                <div>${opt.message}</div>
                                ${opt.potentialSavings ? `<div class="text-sm text-purple-600 mt-1">Potential additional savings: $${opt.potentialSavings.toFixed(2)}/month</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }

    displayCharts() {
        // Simple text-based charts for now (could be enhanced with actual charting library)
        this.displayCostBreakdownChart();
        this.displayBrokerPerformanceChart();
    }

    displayCostBreakdownChart() {
        const container = document.getElementById('cost-breakdown-chart');
        if (!container || !this.results.length) return;

        const bestResult = this.results[0];
        const breakdown = bestResult.breakdown;

        container.innerHTML = `
            <div class="space-y-3">
                <div class="text-center font-medium text-gray-800 mb-4">${bestResult.brokerName} Cost Structure</div>
                
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Spreads</span>
                        <span class="text-sm font-medium">${breakdown.spreadContribution}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-blue-500 h-2 rounded-full" style="width: ${breakdown.spreadContribution}%"></div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Commission</span>
                        <span class="text-sm font-medium">${breakdown.commissionContribution}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: ${breakdown.commissionContribution}%"></div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Slippage</span>
                        <span class="text-sm font-medium">${breakdown.slippageContribution}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-yellow-500 h-2 rounded-full" style="width: ${breakdown.slippageContribution}%"></div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Swaps</span>
                        <span class="text-sm font-medium">${breakdown.swapContribution}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-red-500 h-2 rounded-full" style="width: ${breakdown.swapContribution}%"></div>
                    </div>
                </div>
            </div>
        `;
    }

    displayBrokerPerformanceChart() {
        const container = document.getElementById('broker-performance-chart');
        if (!container || !this.results.length) return;

        const maxCost = Math.max(...this.results.map(r => r.costs.totalCost));

        container.innerHTML = `
            <div class="space-y-3">
                <div class="text-center font-medium text-gray-800 mb-4">Monthly Cost Comparison</div>
                
                ${this.results.map((result, index) => `
                    <div class="space-y-1">
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600">${result.brokerName}</span>
                            <span class="text-sm font-medium">$${result.costs.totalCost}</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="${index === 0 ? 'bg-green-500' : 'bg-gray-400'} h-3 rounded-full" 
                                 style="width: ${(result.costs.totalCost / maxCost) * 100}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Utility methods
    getRiskBadgeClass(riskProfile) {
        switch (riskProfile) {
            case 'low': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'high': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    getExecutionQualityColor(speed) {
        if (speed <= 15) return 'bg-green-500';
        if (speed <= 25) return 'bg-yellow-500';
        return 'bg-red-500';
    }

    showStrategyInfo(strategyId) {
        const strategy = this.engine.getStrategy(strategyId);
        if (!strategy) return;

        // Simple alert for now - could be enhanced with modal
        alert(`${strategy.name}\n\n${strategy.description}\n\nHolding Time: ${strategy.typicalHoldTime}\nRisk: ${strategy.riskProfile}\nDifficulty: ${strategy.difficultyLevel}`);
    }

    showNotification(message, type = 'info') {
        // Simple notification - could be enhanced with toast library
        const colors = {
            info: 'bg-blue-500',
            warning: 'bg-yellow-500',
            error: 'bg-red-500',
            success: 'bg-green-500'
        };

        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    addToggleButton(existingContainer) {
        const header = document.querySelector('.bg-gradient-to-r.from-green-600.to-green-800');
        if (!header) return;

        const toggleButton = document.createElement('div');
        toggleButton.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-t border-green-700';
        toggleButton.innerHTML = `
            <button id="toggle-to-enhanced" class="text-green-100 hover:text-white transition-colors text-sm">
                <i class="fas fa-rocket mr-2"></i>Switch to Enhanced Professional View
            </button>
        `;
        header.appendChild(toggleButton);

        document.getElementById('toggle-to-enhanced').addEventListener('click', () => {
            this.toggleClassicView();
        });
    }

    toggleClassicView() {
        const existingContainer = document.querySelector('.max-w-4xl.mx-auto.px-4.sm\\:px-6.lg\\:px-8.py-8');
        const enhancedContainer = document.getElementById('enhanced-simulator-container');
        
        if (existingContainer.style.display === 'none') {
            existingContainer.style.display = 'block';
            enhancedContainer.style.display = 'none';
        } else {
            existingContainer.style.display = 'none';
            enhancedContainer.style.display = 'block';
        }
    }

    sortResults(criteria) {
        if (!this.results.length) return;

        if (criteria === 'cost') {
            this.results.sort((a, b) => a.costs.totalCost - b.costs.totalCost);
        } else if (criteria === 'quality') {
            this.results.sort((a, b) => b.qualityMetrics.suitabilityScore - a.qualityMetrics.suitabilityScore);
        }

        this.displayComparisonTable();
    }

    async exportEnhancedResults() {
        if (!this.results.length) return;

        // Generate CSV content
        const csvContent = this.generateEnhancedCSV();
        this.downloadCSV(csvContent, `enhanced-trading-cost-analysis-${new Date().toISOString().split('T')[0]}.csv`);
        
        this.showNotification('Results exported successfully!', 'success');
    }

    generateEnhancedCSV() {
        const headers = [
            'Rank', 'Broker', 'Total Cost', 'Cost Per Trade', 'Spread Cost', 'Commission Cost', 
            'Slippage Cost', 'Swap Cost', 'Execution Speed (ms)', 'Fill Rate (%)', 
            'Suitability Score', 'Additional Cost vs Best', 'Percentage More Expensive'
        ];
        
        const rows = this.results.map(result => [
            result.ranking,
            result.brokerName,
            result.costs.totalCost,
            result.costs.costPerTrade,
            result.costs.spreadCost,
            result.costs.commissionCost,
            result.costs.slippageCost,
            result.costs.swapCost,
            result.qualityMetrics.executionSpeed,
            result.qualityMetrics.fillRate,
            result.qualityMetrics.suitabilityScore,
            result.additionalCostVsBest,
            result.percentageMoreExpensive
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

// Initialize enhanced simulator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for existing simulator to load first
    setTimeout(() => {
        if (window.location.pathname === '/simulator') {
            window.enhancedSimulatorUI = new EnhancedSimulatorUI();
        }
    }, 1000);
});

// Export for global access
window.EnhancedSimulatorUI = EnhancedSimulatorUI;