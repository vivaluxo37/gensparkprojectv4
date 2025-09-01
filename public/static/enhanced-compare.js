// Enhanced Broker Comparison System
// Industry-leading detailed broker comparison with SEO optimization

class EnhancedBrokerCompare {
    constructor() {
        this.brokers = [];
        this.selectedBrokers = [];
        this.comparisonData = null;
        this.isLoading = false;
        this.maxCompare = 4;
        this.init();
    }

    async init() {
        await this.loadBrokers();
        this.setupEventListeners();
        this.loadURLParameters();
        this.renderInterface();
        console.log('✅ Enhanced Broker Comparison System initialized');
    }

    async loadBrokers() {
        try {
            // Try to get brokers from API
            const response = await fetch('/api/brokers');
            if (response.ok) {
                const data = await response.json();
                this.brokers = data.brokers || [];
            } else {
                // Fallback brokers
                this.brokers = [
                    { id: 'ic-markets', name: 'IC Markets', slug: 'ic-markets' },
                    { id: 'pepperstone', name: 'Pepperstone', slug: 'pepperstone' },
                    { id: 'oanda', name: 'OANDA', slug: 'oanda' },
                    { id: 'interactive-brokers', name: 'Interactive Brokers', slug: 'interactive-brokers' },
                    { id: 'forex-com', name: 'Forex.com', slug: 'forex-com' },
                    { id: 'tastyfx', name: 'TastyFX', slug: 'tastyfx' }
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
            
            if (this.selectedBrokers.length > 0) {
                this.performComparison();
            }
        }
    }

    setupEventListeners() {
        // Add broker buttons
        document.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'add-broker') {
                const brokerId = e.target.dataset.brokerId;
                this.addBroker(brokerId);
            }
            if (e.target.dataset.action === 'remove-broker') {
                const brokerId = e.target.dataset.brokerId;
                this.removeBroker(brokerId);
            }
            if (e.target.dataset.action === 'compare-now') {
                this.performComparison();
            }
            if (e.target.dataset.action === 'reset-comparison') {
                this.resetComparison();
            }
        });

        // Search functionality
        const searchInput = document.getElementById('broker-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterBrokers(e.target.value);
            });
        }
    }

    renderInterface() {
        const container = document.getElementById('compare-interface');
        if (!container) return;

        container.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                        <h2 class="text-2xl font-bold mb-2">Compare Brokers</h2>
                        <p class="text-gray-600">Select up to ${this.maxCompare} brokers for detailed comparison</p>
                    </div>
                    <div class="mt-4 md:mt-0">
                        <input type="text" 
                               id="broker-search" 
                               placeholder="Search brokers..." 
                               class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                </div>

                <!-- Selected Brokers Bar -->
                <div class="mb-6">
                    <h3 class="font-semibold mb-3">Selected for Comparison (${this.selectedBrokers.length}/${this.maxCompare})</h3>
                    <div class="flex flex-wrap gap-3 mb-4">
                        ${this.selectedBrokers.map(broker => `
                            <div class="flex items-center bg-blue-100 px-3 py-2 rounded-lg">
                                <span class="text-blue-900 font-medium mr-2">${broker.name}</span>
                                <button data-action="remove-broker" 
                                        data-broker-id="${broker.slug}"
                                        class="text-blue-600 hover:text-blue-800">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        `).join('')}
                        ${this.selectedBrokers.length === 0 ? '<p class="text-gray-500 italic">No brokers selected yet</p>' : ''}
                    </div>
                    <div class="flex space-x-3">
                        <button data-action="compare-now" 
                                class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                ${this.selectedBrokers.length < 2 ? 'disabled' : ''}>
                            <i class="fas fa-balance-scale mr-2"></i>Compare Selected (${this.selectedBrokers.length})
                        </button>
                        <button data-action="reset-comparison" 
                                class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                                ${this.selectedBrokers.length === 0 ? 'disabled' : ''}>
                            <i class="fas fa-redo mr-2"></i>Reset
                        </button>
                    </div>
                </div>

                <!-- Available Brokers -->
                <div>
                    <h3 class="font-semibold mb-3">Available Brokers</h3>
                    <div id="broker-list" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${this.renderBrokerList()}
                    </div>
                </div>
            </div>

            <!-- Comparison Results -->
            <div id="comparison-results" class="hidden">
                <!-- Results will be rendered here -->
            </div>
        `;
    }

    renderBrokerList() {
        return this.brokers.map(broker => {
            const isSelected = this.selectedBrokers.some(selected => selected.slug === broker.slug);
            const canAdd = this.selectedBrokers.length < this.maxCompare && !isSelected;

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
                                <h4 class="font-semibold text-gray-900">${broker.name}</h4>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex space-x-2">
                        ${canAdd ? `
                            <button data-action="add-broker" 
                                    data-broker-id="${broker.slug}"
                                    class="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">
                                <i class="fas fa-plus mr-1"></i>Add
                            </button>
                        ` : isSelected ? `
                            <button class="flex-1 bg-green-100 text-green-800 px-3 py-2 rounded text-sm cursor-not-allowed">
                                <i class="fas fa-check mr-1"></i>Added
                            </button>
                        ` : `
                            <button class="flex-1 bg-gray-100 text-gray-500 px-3 py-2 rounded text-sm cursor-not-allowed">
                                <i class="fas fa-lock mr-1"></i>Max ${this.maxCompare}
                            </button>
                        `}
                        <a href="/reviews/${broker.slug}" 
                           class="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-200">
                            <i class="fas fa-info-circle"></i>
                        </a>
                    </div>
                </div>
            `;
        }).join('');
    }

    addBroker(brokerId) {
        if (this.selectedBrokers.length >= this.maxCompare) {
            this.showNotification(`Maximum ${this.maxCompare} brokers allowed for comparison`, 'error');
            return;
        }

        const broker = this.brokers.find(b => b.slug === brokerId);
        if (broker && !this.selectedBrokers.some(selected => selected.slug === brokerId)) {
            this.selectedBrokers.push(broker);
            this.renderInterface();
            this.showNotification(`${broker.name} added to comparison`, 'success');
        }
    }

    removeBroker(brokerId) {
        this.selectedBrokers = this.selectedBrokers.filter(broker => broker.slug !== brokerId);
        this.renderInterface();
        
        // Hide comparison results if less than 2 brokers
        if (this.selectedBrokers.length < 2) {
            const resultsContainer = document.getElementById('comparison-results');
            if (resultsContainer) {
                resultsContainer.classList.add('hidden');
            }
        }
        
        this.showNotification('Broker removed from comparison', 'info');
    }

    async performComparison() {
        if (this.selectedBrokers.length < 2) {
            this.showNotification('Please select at least 2 brokers to compare', 'error');
            return;
        }

        this.isLoading = true;
        const resultsContainer = document.getElementById('comparison-results');
        
        if (!resultsContainer) return;

        // Show loading state
        resultsContainer.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-8">
                <div class="text-center">
                    <div class="loading-spinner w-16 h-16 mx-auto mb-4"></div>
                    <h3 class="text-xl font-semibold mb-2">Comparing Brokers...</h3>
                    <p class="text-gray-600">Analyzing ${this.selectedBrokers.length} brokers in detail</p>
                </div>
            </div>
        `;
        resultsContainer.classList.remove('hidden');

        try {
            const brokerSlugs = this.selectedBrokers.map(b => b.slug).join(',');
            const response = await fetch(`/api/compare?brokers=${brokerSlugs}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch comparison data');
            }

            const data = await response.json();
            this.comparisonData = data;
            
            this.renderComparisonResults();
            
            // Update URL with current comparison
            const newUrl = `${window.location.pathname}?brokers=${brokerSlugs}`;
            window.history.replaceState({}, '', newUrl);
            
        } catch (error) {
            console.error('Comparison error:', error);
            resultsContainer.innerHTML = `
                <div class="bg-white rounded-xl shadow-lg p-8 text-center">
                    <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                    <h3 class="text-xl font-semibold text-red-600 mb-2">Comparison Failed</h3>
                    <p class="text-gray-600 mb-4">Unable to load comparison data. Please try again.</p>
                    <button data-action="compare-now" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        <i class="fas fa-redo mr-2"></i>Retry Comparison
                    </button>
                </div>
            `;
        } finally {
            this.isLoading = false;
        }
    }

    renderComparisonResults() {
        const resultsContainer = document.getElementById('comparison-results');
        if (!resultsContainer || !this.comparisonData) return;

        const { brokers, comparison } = this.comparisonData;

        resultsContainer.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-2xl font-bold mb-2">Detailed Broker Comparison</h2>
                            <p class="text-blue-100">Comparing ${brokers.length} brokers across key features</p>
                        </div>
                        <div class="flex space-x-3">
                            <button onclick="window.print()" class="bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30">
                                <i class="fas fa-print mr-2"></i>Print
                            </button>
                            <button data-action="reset-comparison" class="bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30">
                                <i class="fas fa-redo mr-2"></i>New Comparison
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Broker Headers -->
                <div class="p-6 border-b">
                    <div class="grid grid-cols-${brokers.length + 1} gap-4">
                        <div class="font-semibold">Features</div>
                        ${brokers.map(broker => `
                            <div class="text-center">
                                <div class="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                                    <img src="/static/images/brokers/${broker.slug}.png" 
                                         alt="${broker.name}" 
                                         class="w-12 h-12 object-contain"
                                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                    <div class="w-12 h-12 bg-blue-100 rounded-lg hidden items-center justify-center text-blue-600 font-bold">
                                        ${broker.name.charAt(0)}
                                    </div>
                                </div>
                                <h3 class="font-bold text-lg">${broker.name}</h3>
                                <div class="text-sm text-gray-600">${broker.rating}/5 ★</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Comparison Matrix -->
                <div class="divide-y">
                    ${comparison.map((row, index) => `
                        <div class="grid grid-cols-${brokers.length + 1} gap-4 p-4 hover:bg-gray-50">
                            <div class="font-medium text-gray-900 flex items-center">
                                ${row.feature}
                            </div>
                            ${row.values.map((value, brokerIndex) => `
                                <div class="text-center flex items-center justify-center ${row.winner === brokerIndex ? 'bg-green-100 text-green-800 font-bold rounded-lg py-2' : 'text-gray-700'}">
                                    ${row.winner === brokerIndex ? '🏆 ' : ''}${value}
                                </div>
                            `).join('')}
                        </div>
                    `).join('')}
                </div>

                <!-- Action Buttons -->
                <div class="p-6 bg-gray-50 border-t">
                    <div class="grid md:grid-cols-${brokers.length} gap-4">
                        ${brokers.map(broker => `
                            <div class="text-center">
                                <h4 class="font-bold mb-2">${broker.name}</h4>
                                <div class="space-y-2">
                                    <a href="/reviews/${broker.slug}" 
                                       class="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                        <i class="fas fa-star mr-2"></i>Full Review
                                    </a>
                                    <a href="${broker.website_url || '#'}" 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       class="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                        <i class="fas fa-external-link-alt mr-2"></i>Visit Broker
                                    </a>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- SEO Content -->
                <div class="p-6 border-t bg-blue-50">
                    <h3 class="font-bold text-lg mb-3">Comparison Summary</h3>
                    <p class="text-gray-700 mb-4">
                        This detailed comparison covers ${brokers.length} top-rated forex brokers: ${brokers.map(b => b.name).join(', ')}. 
                        Each broker has been evaluated across key metrics including regulation, spreads, platform features, and account requirements.
                    </p>
                    <div class="grid md:grid-cols-3 gap-4">
                        <a href="/simulator?brokers=${brokers.map(b => b.slug).join(',')}" 
                           class="block p-4 bg-white rounded-lg hover:shadow-md">
                            <i class="fas fa-calculator text-2xl text-purple-600 mb-2"></i>
                            <div class="font-medium">Cost Calculator</div>
                            <div class="text-sm text-gray-600">Calculate trading costs</div>
                        </a>
                        <a href="/reviews" 
                           class="block p-4 bg-white rounded-lg hover:shadow-md">
                            <i class="fas fa-list text-2xl text-blue-600 mb-2"></i>
                            <div class="font-medium">More Reviews</div>
                            <div class="text-sm text-gray-600">Browse all broker reviews</div>
                        </a>
                        <a href="/" 
                           class="block p-4 bg-white rounded-lg hover:shadow-md">
                            <i class="fas fa-magic text-2xl text-green-600 mb-2"></i>
                            <div class="font-medium">Get Recommendations</div>
                            <div class="text-sm text-gray-600">Smart broker matching</div>
                        </a>
                    </div>
                </div>
            </div>
        `;

        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    resetComparison() {
        this.selectedBrokers = [];
        this.comparisonData = null;
        this.renderInterface();
        
        const resultsContainer = document.getElementById('comparison-results');
        if (resultsContainer) {
            resultsContainer.classList.add('hidden');
        }

        // Clear URL parameters
        window.history.replaceState({}, '', window.location.pathname);
        
        this.showNotification('Comparison reset', 'info');
    }

    filterBrokers(query) {
        const brokerList = document.getElementById('broker-list');
        if (!brokerList) return;

        const filteredBrokers = this.brokers.filter(broker =>
            broker.name.toLowerCase().includes(query.toLowerCase())
        );

        this.brokers = filteredBrokers;
        brokerList.innerHTML = this.renderBrokerList();
    }

    showNotification(message, type = 'info') {
        // Create and show notification
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
    // Only initialize on compare page
    if (document.getElementById('compare-interface')) {
        window.enhancedCompare = new EnhancedBrokerCompare();
    }
});