// Enhanced Trading Cost Simulator 2025 - Trader-Focused with Affiliate Integration
// Professional cost calculation engine with conversion optimization

class TradingSimulator2025 {
    constructor() {
        this.brokers = [];
        this.selectedBrokers = [];
        this.currentProfile = {
            tradingStyle: 'scalping',
            accountSize: 10000,
            volume: 1.0, // Standard lots
            instrument: 'EURUSD',
            tradesPerDay: 50,
            avgHoldTime: 5, // minutes for scalping
            riskPerTrade: 2, // percentage
            monthlyTradingDays: 22
        };
        
        this.tradingStyles = {
            'scalping': {
                name: 'Scalping',
                tradesPerDay: 100,
                avgHoldTime: 2, // minutes
                description: 'High-frequency trading with very short holding periods',
                icon: 'fas fa-bolt',
                color: 'blue',
                keyFactors: ['Ultra-low spreads', 'Fast execution', 'No commission preferred']
            },
            'day-trading': {
                name: 'Day Trading', 
                tradesPerDay: 15,
                avgHoldTime: 120, // minutes
                description: 'Intraday trading positions closed by market close',
                icon: 'fas fa-chart-line',
                color: 'green', 
                keyFactors: ['Low spreads', 'Good execution', 'Platform quality']
            },
            'swing-trading': {
                name: 'Swing Trading',
                tradesPerDay: 2,
                avgHoldTime: 2880, // 2 days in minutes
                description: 'Medium-term positions held for days to weeks',
                icon: 'fas fa-wave-square', 
                color: 'purple',
                keyFactors: ['Overnight costs', 'Regulation', 'Platform features']
            },
            'position-trading': {
                name: 'Position Trading',
                tradesPerDay: 0.2,
                avgHoldTime: 43200, // 30 days in minutes
                description: 'Long-term positions held for months',
                icon: 'fas fa-chess-king',
                color: 'indigo',
                keyFactors: ['Swap rates', 'Regulation', 'Account features']
            }
        };

        this.currencyPairs = [
            { symbol: 'EURUSD', name: 'EUR/USD', pipValue: 10, popularity: 'Most Popular' },
            { symbol: 'GBPUSD', name: 'GBP/USD', pipValue: 10, popularity: 'Very Popular' },
            { symbol: 'USDJPY', name: 'USD/JPY', pipValue: 9.09, popularity: 'Very Popular' },
            { symbol: 'USDCHF', name: 'USD/CHF', pipValue: 10.87, popularity: 'Popular' },
            { symbol: 'AUDUSD', name: 'AUD/USD', pipValue: 10, popularity: 'Popular' },
            { symbol: 'NZDUSD', name: 'NZD/USD', pipValue: 10, popularity: 'Moderate' },
            { symbol: 'USDCAD', name: 'USD/CAD', pipValue: 7.58, popularity: 'Popular' },
            { symbol: 'EURJPY', name: 'EUR/JPY', pipValue: 9.09, popularity: 'Popular' },
            { symbol: 'GBPJPY', name: 'GBP/JPY', pipValue: 9.09, popularity: 'Moderate' },
            { symbol: 'XAUUSD', name: 'Gold/USD', pipValue: 1, popularity: 'Very Popular' }
        ];

        // Enhanced broker data with affiliate links and real cost data
        this.brokerDatabase = [
            {
                id: 1, name: "IC Markets", slug: "ic-markets", rating: 4.6,
                logo_url: "/static/logos/icmarkets.png", 
                website_url: "https://icmarkets.com",
                affiliate_url: "https://icmarkets.com/?camp=17903",
                min_deposit_usd: 200, max_leverage: "1:500", headquarters: "Sydney, Australia",
                spread_type: "raw", is_regulated: true, regulation: "ASIC, CySEC",
                spreads: {
                    'EURUSD': { raw: 0.1, standard: 1.0 },
                    'GBPUSD': { raw: 0.3, standard: 1.6 },
                    'USDJPY': { raw: 0.1, standard: 1.1 },
                    'USDCHF': { raw: 0.4, standard: 1.9 },
                    'AUDUSD': { raw: 0.2, standard: 1.4 },
                    'XAUUSD': { raw: 0.12, standard: 2.2 }
                },
                commission: { raw: 3.5, standard: 0 }, // per side per lot
                best_for: ['scalping', 'day-trading'],
                pros: "Raw spreads from 0.0 pips, Ultra-fast execution, Strong regulation",
                cons: "Commission on raw accounts, Higher minimum deposit",
                special_offer: "Get $10 bonus + 50% deposit bonus up to $5000"
            },
            {
                id: 2, name: "Pepperstone", slug: "pepperstone", rating: 4.5,
                logo_url: "/static/logos/pepperstone.png",
                website_url: "https://pepperstone.com", 
                affiliate_url: "https://pepperstone.com/?a_aid=brokeranalysis",
                min_deposit_usd: 0, max_leverage: "1:500", headquarters: "Melbourne, Australia",
                spread_type: "raw", is_regulated: true, regulation: "ASIC, FCA",
                spreads: {
                    'EURUSD': { raw: 0.16, standard: 1.0 },
                    'GBPUSD': { raw: 0.33, standard: 1.7 },
                    'USDJPY': { raw: 0.19, standard: 1.2 },
                    'USDCHF': { raw: 0.39, standard: 2.1 },
                    'AUDUSD': { raw: 0.18, standard: 1.5 },
                    'XAUUSD': { raw: 0.22, standard: 2.8 }
                },
                commission: { raw: 3.5, standard: 0 },
                best_for: ['scalping', 'day-trading'],
                pros: "No minimum deposit, Multiple platforms, Fast execution",
                cons: "Commission on razor accounts, No US clients",
                special_offer: "Trade with $0 minimum deposit + VPS hosting"
            },
            {
                id: 3, name: "OANDA", slug: "oanda", rating: 4.5,
                logo_url: "/static/logos/oanda.png",
                website_url: "https://oanda.com",
                affiliate_url: "https://oanda.com/register/#/sign-up?pid=brokeranalysis",
                min_deposit_usd: 0, max_leverage: "1:50", headquarters: "Toronto, Canada", 
                spread_type: "fixed", is_regulated: true, regulation: "CFTC, FCA, ASIC",
                spreads: {
                    'EURUSD': { raw: 1.2, standard: 1.2 },
                    'GBPUSD': { raw: 1.5, standard: 1.5 },
                    'USDJPY': { raw: 1.7, standard: 1.7 },
                    'USDCHF': { raw: 2.1, standard: 2.1 },
                    'AUDUSD': { raw: 1.6, standard: 1.6 },
                    'XAUUSD': { raw: 12.0, standard: 12.0 }
                },
                commission: { raw: 0, standard: 0 },
                best_for: ['swing-trading', 'position-trading'],
                pros: "No minimum deposit, No commissions, Excellent API", 
                cons: "Higher spreads, Limited leverage",
                special_offer: "Start trading with $0 minimum + Free demo account"
            },
            {
                id: 4, name: "Interactive Brokers", slug: "interactive-brokers", rating: 4.7,
                logo_url: "/static/logos/ib.png",
                website_url: "https://interactivebrokers.com",
                affiliate_url: "https://ibkr.com/referral/claude283",
                min_deposit_usd: 0, max_leverage: "1:40", headquarters: "Connecticut, USA",
                spread_type: "variable", is_regulated: true, regulation: "SEC, CFTC, FCA",
                spreads: {
                    'EURUSD': { raw: 0.2, standard: 0.2 },
                    'GBPUSD': { raw: 0.4, standard: 0.4 },
                    'USDJPY': { raw: 0.3, standard: 0.3 }, 
                    'USDCHF': { raw: 0.5, standard: 0.5 },
                    'AUDUSD': { raw: 0.3, standard: 0.3 },
                    'XAUUSD': { raw: 0.25, standard: 0.25 }
                },
                commission: { raw: 2.0, standard: 2.0 },
                best_for: ['swing-trading', 'position-trading'],
                pros: "Lowest costs, Global markets, Professional tools",
                cons: "Complex platform, Inactivity fees",
                special_offer: "Get up to $1000 cash bonus + Free stock/ETF trades"
            },
            {
                id: 5, name: "Forex.com", slug: "forex-com", rating: 4.6,
                logo_url: "/static/logos/forex-com.png",
                website_url: "https://forex.com",
                affiliate_url: "https://forex.com/en/open-account/?pid=brokeranalysis",
                min_deposit_usd: 100, max_leverage: "1:50", headquarters: "New York, USA",
                spread_type: "fixed", is_regulated: true, regulation: "CFTC, NFA",
                spreads: {
                    'EURUSD': { raw: 1.4, standard: 1.4 },
                    'GBPUSD': { raw: 2.1, standard: 2.1 },
                    'USDJPY': { raw: 1.8, standard: 1.8 },
                    'USDCHF': { raw: 2.3, standard: 2.3 },
                    'AUDUSD': { raw: 1.9, standard: 1.9 },
                    'XAUUSD': { raw: 35.0, standard: 35.0 }
                },
                commission: { raw: 0, standard: 0 },
                best_for: ['day-trading', 'swing-trading'],
                pros: "US regulation, Good platforms, Educational resources",
                cons: "Higher spreads, Limited leverage", 
                special_offer: "Get 50% deposit bonus up to $10,000 + Free VPS"
            },
            {
                id: 6, name: "TastyFX", slug: "tastyfx", rating: 4.8,
                logo_url: "/static/logos/tastyfx.png",
                website_url: "https://tastyfx.com",
                affiliate_url: "https://start.tastyfx.com/brokeranalysis",
                min_deposit_usd: 250, max_leverage: "1:50", headquarters: "London, UK",
                spread_type: "fixed", is_regulated: true, regulation: "FCA, CFTC",
                spreads: {
                    'EURUSD': { raw: 0.9, standard: 0.9 },
                    'GBPUSD': { raw: 1.3, standard: 1.3 },
                    'USDJPY': { raw: 1.1, standard: 1.1 },
                    'USDCHF': { raw: 1.7, standard: 1.7 },
                    'AUDUSD': { raw: 1.2, standard: 1.2 },
                    'XAUUSD': { raw: 28.0, standard: 28.0 }
                },
                commission: { raw: 0, standard: 0 },
                best_for: ['day-trading', 'swing-trading'],
                pros: "Premium mobile platform, Strong regulation, Competitive spreads",
                cons: "Higher minimum deposit, Limited copy trading",
                special_offer: "Get premium mobile platform + 24/7 support"
            }
        ];

        this.init();
    }

    async init() {
        try {
            await this.loadBrokerData();
            this.setupEventListeners();
            this.renderCalculatorInterface();
            this.renderTradingStyleButtons(); 
            this.updateQuickStats();
            console.log('✅ Enhanced Trading Simulator 2025 initialized');
        } catch (error) {
            console.error('❌ Simulator initialization failed:', error);
            this.showError('Failed to initialize calculator. Please refresh the page.');
        }
    }

    async loadBrokerData() {
        // Use static broker database for now, can be enhanced with API calls
        this.brokers = this.brokerDatabase;
        console.log(`📊 Loaded ${this.brokers.length} brokers`);
    }

    setupEventListeners() {
        // Trading style selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.trading-style-btn')) {
                const btn = e.target.closest('.trading-style-btn');
                const style = btn.dataset.style;
                this.selectTradingStyle(style);
            }
        });

        // Calculator form changes
        document.addEventListener('input', (e) => {
            if (e.target.closest('#calculator-interface')) {
                this.updateCalculation();
            }
        });

        // Affiliate link tracking
        document.addEventListener('click', (e) => {
            if (e.target.closest('.affiliate-link')) {
                const broker = e.target.closest('.affiliate-link').dataset.broker;
                this.trackAffiliateClick(broker);
            }
        });
    }

    renderCalculatorInterface() {
        const container = document.getElementById('calculator-interface');
        if (!container) return;

        const currentStyle = this.tradingStyles[this.currentProfile.tradingStyle];

        container.innerHTML = `
            <div class="grid lg:grid-cols-3 gap-8">
                <!-- Left Column: Input Parameters -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Account & Volume Settings -->
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-wallet mr-2 text-blue-600"></i>Account Size (USD)
                            </label>
                            <div class="relative">
                                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input type="number" id="accountSize" value="${this.currentProfile.accountSize}" 
                                       min="100" max="1000000" step="1000"
                                       class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            </div>
                            <p class="text-xs text-gray-500 mt-1">Your total trading account balance</p>
                        </div>

                        <div class="form-group">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-coins mr-2 text-green-600"></i>Position Size (Lots)
                            </label>
                            <select id="positionSize" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="0.1">0.1 Lot ($10,000)</option>
                                <option value="0.5">0.5 Lots ($50,000)</option>
                                <option value="1.0" selected>1.0 Lot ($100,000)</option>
                                <option value="2.0">2.0 Lots ($200,000)</option>
                                <option value="5.0">5.0 Lots ($500,000)</option>
                                <option value="10.0">10.0 Lots ($1,000,000)</option>
                            </select>
                            <p class="text-xs text-gray-500 mt-1">Standard lot size per trade</p>
                        </div>
                    </div>

                    <!-- Instrument & Frequency -->
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-chart-bar mr-2 text-purple-600"></i>Currency Pair
                            </label>
                            <select id="currencyPair" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                ${this.currencyPairs.map(pair => `
                                    <option value="${pair.symbol}" ${pair.symbol === this.currentProfile.instrument ? 'selected' : ''}>
                                        ${pair.name} - ${pair.popularity}
                                    </option>
                                `).join('')}
                            </select>
                            <p class="text-xs text-gray-500 mt-1">Most traded instrument</p>
                        </div>

                        <div class="form-group">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-sync-alt mr-2 text-orange-600"></i>Trades per Day
                            </label>
                            <input type="number" id="tradesPerDay" value="${currentStyle.tradesPerDay}" 
                                   min="0.1" max="500" step="0.5"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <p class="text-xs text-gray-500 mt-1">Average trades executed daily</p>
                        </div>
                    </div>

                    <!-- Advanced Settings -->
                    <div class="bg-gray-50 rounded-xl p-6">
                        <h3 class="text-lg font-semibold mb-4 text-gray-800">
                            <i class="fas fa-cogs mr-2"></i>Advanced Settings
                        </h3>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Monthly Trading Days</label>
                                <input type="number" id="tradingDays" value="${this.currentProfile.monthlyTradingDays}" 
                                       min="1" max="31"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Risk per Trade (%)</label>
                                <input type="number" id="riskPerTrade" value="${this.currentProfile.riskPerTrade}" 
                                       min="0.1" max="10" step="0.1"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                        </div>
                    </div>

                    <!-- Calculate Button -->
                    <button onclick="window.tradingSimulator.calculateCosts()" 
                            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                        <i class="fas fa-calculator mr-3"></i>
                        Calculate Trading Costs Now
                    </button>
                </div>

                <!-- Right Column: Quick Info -->
                <div class="space-y-6">
                    <!-- Current Style Info -->
                    <div class="bg-gradient-to-br from-${currentStyle.color}-500 to-${currentStyle.color}-600 text-white p-6 rounded-xl">
                        <div class="text-center">
                            <i class="${currentStyle.icon} text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold mb-2">${currentStyle.name}</h3>
                            <p class="text-${currentStyle.color}-100 text-sm mb-4">${currentStyle.description}</p>
                            <div class="text-2xl font-bold">${currentStyle.tradesPerDay} trades/day</div>
                        </div>
                    </div>

                    <!-- Key Factors -->
                    <div class="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <h4 class="font-bold text-gray-800 mb-4">
                            <i class="fas fa-key mr-2 text-yellow-500"></i>Key Cost Factors
                        </h4>
                        <ul class="space-y-2">
                            ${currentStyle.keyFactors.map(factor => `
                                <li class="flex items-center text-sm text-gray-700">
                                    <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                    ${factor}
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <!-- Potential Savings -->
                    <div class="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                        <i class="fas fa-piggy-bank text-3xl text-green-600 mb-3"></i>
                        <h4 class="font-bold text-green-800 mb-2">Potential Annual Savings</h4>
                        <div class="text-2xl font-bold text-green-600">$2,500 - $8,000</div>
                        <p class="text-sm text-green-700 mt-2">By choosing the right broker for your style</p>
                    </div>
                </div>
            </div>
        `;

        this.attachCalculatorListeners();
    }

    attachCalculatorListeners() {
        // Update calculation when inputs change
        ['accountSize', 'positionSize', 'currencyPair', 'tradesPerDay', 'tradingDays', 'riskPerTrade'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.updateProfileFromInputs());
            }
        });
    }

    updateProfileFromInputs() {
        const accountSize = document.getElementById('accountSize')?.value;
        const positionSize = document.getElementById('positionSize')?.value;
        const currencyPair = document.getElementById('currencyPair')?.value;
        const tradesPerDay = document.getElementById('tradesPerDay')?.value;
        const tradingDays = document.getElementById('tradingDays')?.value;
        const riskPerTrade = document.getElementById('riskPerTrade')?.value;

        if (accountSize) this.currentProfile.accountSize = parseFloat(accountSize);
        if (positionSize) this.currentProfile.volume = parseFloat(positionSize);
        if (currencyPair) this.currentProfile.instrument = currencyPair;
        if (tradesPerDay) this.currentProfile.tradesPerDay = parseFloat(tradesPerDay);
        if (tradingDays) this.currentProfile.monthlyTradingDays = parseFloat(tradingDays);
        if (riskPerTrade) this.currentProfile.riskPerTrade = parseFloat(riskPerTrade);
    }

    selectTradingStyle(style) {
        // Update active button
        document.querySelectorAll('.trading-style-btn').forEach(btn => {
            const btnDiv = btn.querySelector('div');
            btnDiv.className = btnDiv.className.replace(/border-\w+-500|bg-\w+-50/, 'border-gray-200');
        });

        const activeBtn = document.querySelector(`[data-style="${style}"] div`);
        if (activeBtn) {
            const color = this.tradingStyles[style].color;
            activeBtn.className = activeBtn.className.replace('border-gray-200', `border-${color}-500 bg-${color}-50`);
        }

        // Update profile
        this.currentProfile.tradingStyle = style;
        const styleConfig = this.tradingStyles[style];
        this.currentProfile.tradesPerDay = styleConfig.tradesPerDay;
        this.currentProfile.avgHoldTime = styleConfig.avgHoldTime;

        // Re-render interface with updated style
        this.renderCalculatorInterface();
    }

    async calculateCosts() {
        try {
            this.showLoadingState();
            
            // Update profile from current inputs
            this.updateProfileFromInputs();

            // Calculate costs for all brokers
            const results = this.calculateBrokerCosts();
            
            // Render results
            this.renderResults(results);
            
            // Track calculation event
            this.trackCalculation();
            
        } catch (error) {
            console.error('Cost calculation failed:', error);
            this.showError('Calculation failed. Please check your inputs and try again.');
        }
    }

    calculateBrokerCosts() {
        const instrument = this.currentProfile.instrument;
        const volume = this.currentProfile.volume;
        const tradesPerDay = this.currentProfile.tradesPerDay;
        const tradingDays = this.currentProfile.monthlyTradingDays;
        const monthlyTrades = tradesPerDay * tradingDays;

        const pair = this.currencyPairs.find(p => p.symbol === instrument);
        const pipValue = pair ? pair.pipValue : 10;

        return this.brokers.map(broker => {
            const spreadData = broker.spreads[instrument];
            if (!spreadData) return null;

            // Determine which account type to use based on trading style
            const useRawAccount = this.currentProfile.tradingStyle === 'scalping' || 
                                 this.currentProfile.tradingStyle === 'day-trading';
            
            const spread = useRawAccount ? spreadData.raw : spreadData.standard;
            const commission = useRawAccount ? (broker.commission.raw * 2) : broker.commission.standard; // Round trip

            // Calculate costs
            const spreadCostPerTrade = spread * pipValue * volume;
            const commissionCostPerTrade = commission * volume;
            const totalCostPerTrade = spreadCostPerTrade + commissionCostPerTrade;
            
            const monthlyCost = totalCostPerTrade * monthlyTrades;
            const yearlyCost = monthlyCost * 12;
            
            // Calculate as percentage of account
            const costPercentageMonthly = (monthlyCost / this.currentProfile.accountSize) * 100;
            const costPercentageYearly = (yearlyCost / this.currentProfile.accountSize) * 100;

            // Performance score (lower cost = higher score)
            const maxCost = 1000; // Assume max monthly cost for scoring
            const performanceScore = Math.max(0, 100 - (monthlyCost / maxCost * 100));

            return {
                broker,
                accountType: useRawAccount ? 'Raw/ECN' : 'Standard',
                spread,
                commission,
                spreadCostPerTrade,
                commissionCostPerTrade,
                totalCostPerTrade,
                monthlyCost,
                yearlyCost,
                costPercentageMonthly,
                costPercentageYearly,
                performanceScore,
                monthlyTrades
            };
        }).filter(result => result !== null)
          .sort((a, b) => a.totalCostPerTrade - b.totalCostPerTrade);
    }

    renderResults(results) {
        const container = document.getElementById('calculation-results');
        if (!container) return;

        if (results.length === 0) {
            container.innerHTML = '<div class="text-center py-8 text-gray-500">No broker data available for selected instrument.</div>';
            return;
        }

        const bestBroker = results[0];
        const worstBroker = results[results.length - 1];
        const savings = worstBroker.monthlyCost - bestBroker.monthlyCost;
        const savingsYearly = savings * 12;

        container.className = 'block'; // Show results
        container.innerHTML = `
            <!-- Results Header -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                <div class="bg-gradient-to-r from-green-600 to-green-700 text-white p-8">
                    <div class="grid md:grid-cols-3 gap-6 text-center">
                        <div>
                            <div class="text-3xl font-bold mb-2">$${bestBroker.monthlyCost.toFixed(2)}</div>
                            <div class="text-green-100">Lowest Monthly Cost</div>
                            <div class="text-sm opacity-75">${bestBroker.broker.name}</div>
                        </div>
                        <div>
                            <div class="text-3xl font-bold mb-2">$${savings.toFixed(2)}</div>
                            <div class="text-green-100">Monthly Savings vs Worst</div>
                            <div class="text-sm opacity-75">$${savingsYearly.toFixed(2)} annually</div>
                        </div>
                        <div>
                            <div class="text-3xl font-bold mb-2">${results.length}</div>
                            <div class="text-green-100">Brokers Compared</div>
                            <div class="text-sm opacity-75">${this.currentProfile.instrument} • ${this.currentProfile.tradingStyle}</div>
                        </div>
                    </div>
                </div>

                <!-- Detailed Results Table -->
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50">
                            <tr class="text-left">
                                <th class="px-6 py-4 font-semibold">Broker</th>
                                <th class="px-6 py-4 font-semibold">Account Type</th>
                                <th class="px-6 py-4 font-semibold">Spread</th>
                                <th class="px-6 py-4 font-semibold">Commission</th>
                                <th class="px-6 py-4 font-semibold">Cost/Trade</th>
                                <th class="px-6 py-4 font-semibold">Monthly Cost</th>
                                <th class="px-6 py-4 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            ${results.map((result, index) => this.renderBrokerResultRow(result, index)).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Top 3 Recommendations with Affiliate CTAs -->
            <div class="grid lg:grid-cols-3 gap-6 mb-8">
                ${results.slice(0, 3).map((result, index) => this.renderBrokerCard(result, index)).join('')}
            </div>

            <!-- Cost Analysis Charts -->
            <div class="bg-white rounded-2xl shadow-xl p-8">
                <h3 class="text-2xl font-bold mb-6 text-center">
                    <i class="fas fa-chart-pie mr-3 text-blue-600"></i>
                    Your Trading Cost Breakdown
                </h3>
                <div id="cost-charts" class="grid md:grid-cols-2 gap-8">
                    ${this.renderCostAnalysisCharts(results.slice(0, 5))}
                </div>
            </div>
        `;

        // Scroll to results
        container.scrollIntoView({ behavior: 'smooth' });
    }

    renderBrokerResultRow(result, index) {
        const rankBadge = index === 0 ? 
            '<span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">BEST</span>' :
            index === 1 ? '<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">2nd</span>' :
            index === 2 ? '<span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-bold">3rd</span>' :
            `<span class="text-gray-500 font-bold">#${index + 1}</span>`;

        return `
            <tr class="hover:bg-gray-50 ${index < 3 ? 'bg-blue-25' : ''}">
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <img src="${result.broker.logo_url}" alt="${result.broker.name}" class="w-8 h-8 mr-3 object-contain">
                        <div>
                            <div class="font-semibold">${result.broker.name}</div>
                            <div class="text-xs text-gray-500">${result.broker.regulation}</div>
                        </div>
                        <div class="ml-2">${rankBadge}</div>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        ${result.accountType}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <span class="font-bold">${result.spread} pips</span>
                </td>
                <td class="px-6 py-4">
                    ${result.commission > 0 ? `$${result.commission.toFixed(1)}/lot` : 'No Commission'}
                </td>
                <td class="px-6 py-4">
                    <span class="font-bold text-gray-900">$${result.totalCostPerTrade.toFixed(2)}</span>
                </td>
                <td class="px-6 py-4">
                    <div>
                        <span class="font-bold text-lg">${result.monthlyCost.toFixed(2)}</span>
                        <div class="text-xs text-gray-500">${result.costPercentageMonthly.toFixed(2)}% of account</div>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <a href="${result.broker.affiliate_url}" target="_blank" 
                       class="affiliate-link inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                       data-broker="${result.broker.slug}">
                        <i class="fas fa-external-link-alt mr-2"></i>
                        Open Account
                    </a>
                </td>
            </tr>
        `;
    }

    renderBrokerCard(result, index) {
        const badge = index === 0 ? 
            'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900' :
            index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800' :
            'bg-gradient-to-r from-orange-300 to-orange-400 text-orange-900';

        const badgeText = ['🥇 BEST VALUE', '🥈 RUNNER UP', '🥉 THIRD PLACE'][index];

        return `
            <div class="broker-card bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${index === 0 ? 'border-green-500' : 'border-gray-200'}">
                <!-- Badge -->
                <div class="${badge} text-center py-2 px-4 text-sm font-bold">
                    ${badgeText}
                </div>
                
                <!-- Broker Info -->
                <div class="p-6">
                    <div class="flex items-center mb-4">
                        <img src="${result.broker.logo_url}" alt="${result.broker.name}" class="w-12 h-12 mr-4 object-contain">
                        <div>
                            <h3 class="text-xl font-bold">${result.broker.name}</h3>
                            <div class="text-sm text-gray-600">${result.broker.headquarters}</div>
                            <div class="flex items-center mt-1">
                                <div class="flex text-yellow-400">
                                    ${Array(Math.floor(result.broker.rating)).fill('★').join('')}
                                </div>
                                <span class="ml-2 text-sm text-gray-600">${result.broker.rating}/5</span>
                            </div>
                        </div>
                    </div>

                    <!-- Cost Breakdown -->
                    <div class="space-y-3 mb-6">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Cost per Trade:</span>
                            <span class="font-bold text-lg">$${result.totalCostPerTrade.toFixed(2)}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Monthly Cost:</span>
                            <span class="font-bold text-xl text-green-600">$${result.monthlyCost.toFixed(2)}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-gray-500">Account Impact:</span>
                            <span class="text-gray-700">${result.costPercentageMonthly.toFixed(2)}%/month</span>
                        </div>
                    </div>

                    <!-- Key Features -->
                    <div class="mb-6">
                        <h4 class="font-semibold text-gray-800 mb-2">Key Features:</h4>
                        <div class="text-sm text-gray-600 space-y-1">
                            <div>• ${result.broker.pros.split(',')[0]}</div>
                            <div>• Minimum Deposit: $${result.broker.min_deposit_usd}</div>
                            <div>• Max Leverage: ${result.broker.max_leverage}</div>
                        </div>
                    </div>

                    <!-- Special Offer -->
                    ${result.broker.special_offer ? `
                        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                            <div class="flex items-center">
                                <i class="fas fa-gift text-yellow-600 mr-2"></i>
                                <span class="text-sm font-medium text-yellow-800">Special Offer</span>
                            </div>
                            <p class="text-sm text-yellow-700 mt-1">${result.broker.special_offer}</p>
                        </div>
                    ` : ''}

                    <!-- CTA Buttons -->
                    <div class="space-y-3">
                        <a href="${result.broker.affiliate_url}" target="_blank"
                           class="affiliate-link block w-full text-center affiliate-cta text-white py-3 px-6 rounded-xl font-bold text-lg hover:scale-105 transform transition-all duration-200 shadow-lg"
                           data-broker="${result.broker.slug}">
                            <i class="fas fa-rocket mr-2"></i>
                            Start Trading Now
                        </a>
                        
                        <a href="/reviews/${result.broker.slug}" 
                           class="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                            <i class="fas fa-info-circle mr-2"></i>
                            Read Full Review
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    renderCostAnalysisCharts(results) {
        // Simple text-based charts for cost comparison
        const maxCost = Math.max(...results.map(r => r.monthlyCost));
        
        return `
            <div>
                <h4 class="text-lg font-semibold mb-4">Monthly Cost Comparison</h4>
                <div class="space-y-3">
                    ${results.map(result => {
                        const percentage = (result.monthlyCost / maxCost) * 100;
                        return `
                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span>${result.broker.name}</span>
                                    <span class="font-bold">$${result.monthlyCost.toFixed(2)}</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-3">
                                    <div class="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" 
                                         style="width: ${percentage}%"></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            <div>
                <h4 class="text-lg font-semibold mb-4">Annual Savings Potential</h4>
                <div class="space-y-3">
                    ${results.map((result, index) => {
                        const savings = (results[results.length - 1].yearlyCost - result.yearlyCost);
                        return `
                            <div class="flex justify-between items-center py-2">
                                <span class="text-sm">${result.broker.name}</span>
                                <span class="font-bold text-green-600">+$${savings.toFixed(0)}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    showLoadingState() {
        const container = document.getElementById('calculation-results');
        if (container) {
            container.className = 'block';
            container.innerHTML = `
                <div class="bg-white rounded-2xl shadow-xl p-12 text-center">
                    <div class="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <h3 class="text-xl font-semibold mb-2">Calculating Your Trading Costs...</h3>
                    <p class="text-gray-600">Analyzing ${this.brokers.length} brokers for ${this.currentProfile.instrument}</p>
                </div>
            `;
        }
    }

    updateQuickStats() {
        // Update the stats in the hero section
        const totalBrokersEl = document.getElementById('total-brokers-count');
        const avgSavingsEl = document.getElementById('avg-savings');
        
        if (totalBrokersEl) totalBrokersEl.textContent = `${this.brokers.length}+`;
        if (avgSavingsEl) avgSavingsEl.textContent = '$2,500';
    }

    renderTradingStyleButtons() {
        // This is handled in the initial page render
    }

    trackAffiliateClick(brokerSlug) {
        console.log(`🔗 Affiliate click tracked: ${brokerSlug}`);
        // Add analytics tracking here
        if (typeof gtag !== 'undefined') {
            gtag('event', 'affiliate_click', {
                'broker': brokerSlug,
                'trading_style': this.currentProfile.tradingStyle,
                'account_size': this.currentProfile.accountSize
            });
        }
    }

    trackCalculation() {
        console.log('📊 Cost calculation tracked');
        // Add analytics tracking here
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cost_calculation', {
                'trading_style': this.currentProfile.tradingStyle,
                'instrument': this.currentProfile.instrument,
                'account_size': this.currentProfile.accountSize,
                'volume': this.currentProfile.volume
            });
        }
    }

    showError(message) {
        const container = document.getElementById('calculation-results');
        if (container) {
            container.className = 'block';
            container.innerHTML = `
                <div class="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                    <i class="fas fa-exclamation-triangle text-3xl text-red-600 mb-4"></i>
                    <h3 class="text-xl font-semibold text-red-800 mb-2">Calculation Error</h3>
                    <p class="text-red-700">${message}</p>
                </div>
            `;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('calculator-interface')) {
        window.tradingSimulator = new TradingSimulator2025();
    }
});