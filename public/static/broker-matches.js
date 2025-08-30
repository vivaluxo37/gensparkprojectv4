// Broker Matches Page JavaScript
// ADDITIVE MODULE - Detailed view of all user broker matches

class BrokerMatches {
    constructor() {
        this.matches = [];
        this.selectedMatch = null;
        this.init();
    }

    async init() {
        // Wait for auth system to load
        await this.waitForAuth();
        
        // Check authentication
        if (!window.authSystem.isAuthenticated()) {
            window.location.href = '/';
            return;
        }

        // Load matches data
        await this.loadMatches();
        
        // Check for specific match in URL
        const urlParams = new URLSearchParams(window.location.search);
        const matchId = urlParams.get('match');
        if (matchId) {
            this.showMatchDetails(parseInt(matchId));
        }
    }

    async waitForAuth() {
        // Wait for auth system to be available
        while (!window.authSystem) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Wait for auth system to initialize
        let attempts = 0;
        while (!window.authSystem.isAuthenticated() && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
    }

    async loadMatches() {
        try {
            const response = await fetch('/api/auth/broker-matches', {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to load broker matches');
            }

            const data = await response.json();
            this.matches = data.matches || [];

            this.updateMatchesCount();
            this.displayMatches();

        } catch (error) {
            console.error('Error loading broker matches:', error);
            this.showErrorState();
        }
    }

    updateMatchesCount() {
        const countElement = document.getElementById('matches-count');
        if (this.matches.length === 0) {
            countElement.textContent = 'No matches found';
        } else if (this.matches.length === 1) {
            countElement.textContent = '1 broker match saved';
        } else {
            countElement.textContent = `${this.matches.length} broker matches saved`;
        }
    }

    displayMatches() {
        const container = document.getElementById('matches-container');
        const emptyState = document.getElementById('empty-state');

        if (this.matches.length === 0) {
            container.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
        }

        container.classList.remove('hidden');
        emptyState.classList.add('hidden');

        container.innerHTML = `
            <div class="space-y-6">
                ${this.matches.map(match => this.createMatchCard(match)).join('')}
            </div>
        `;
    }

    createMatchCard(match) {
        const matchDate = new Date(match.created_at);
        const topBrokers = match.recommended_brokers.slice(0, 5);
        
        return `
            <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <!-- Match Header -->
                <div class="flex items-start justify-between mb-6">
                    <div>
                        <div class="flex items-center space-x-3 mb-2">
                            <h3 class="text-xl font-bold text-gray-900">
                                Broker Match #${match.id}
                            </h3>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                ${Math.round(match.match_score)}% match
                            </span>
                        </div>
                        <p class="text-gray-600">
                            <i class="fas fa-calendar mr-1"></i>
                            ${this.formatDate(matchDate)}
                        </p>
                    </div>
                    <button onclick="brokerMatches.showMatchDetails(${match.id})" 
                            class="text-blue-600 hover:text-blue-700 font-medium">
                        View Details
                        <i class="fas fa-chevron-right ml-1"></i>
                    </button>
                </div>

                <!-- Trading Profile Summary -->
                <div class="grid md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                        <p class="text-sm font-medium text-gray-700">Trading Strategy</p>
                        <p class="text-gray-900">${match.match_data.trading_strategy || 'Not specified'}</p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-700">Experience Level</p>
                        <p class="text-gray-900">${match.match_data.experience_level || 'Not specified'}</p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-700">Capital Amount</p>
                        <p class="text-gray-900">${this.formatCapital(match.match_data.capital_amount)}</p>
                    </div>
                </div>

                <!-- Top Recommended Brokers -->
                <div class="mb-4">
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">Top Recommended Brokers</h4>
                    <div class="space-y-3">
                        ${topBrokers.map((broker, index) => `
                            <div class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-bold flex items-center justify-center">
                                        ${index + 1}
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-900">${broker.name}</p>
                                        <p class="text-sm text-gray-600">${broker.regulation?.join(', ') || 'Regulated'}</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="font-medium text-gray-900">${Math.round(broker.match_score)}% match</p>
                                    <a href="/broker/${broker.id}" class="text-sm text-blue-600 hover:text-blue-700">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div class="text-sm text-gray-600">
                        ${topBrokers.length} brokers recommended • Based on ${Object.keys(match.match_data).length} criteria
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="brokerMatches.retakeMatch(${match.id})" 
                                class="text-gray-600 hover:text-gray-700 text-sm font-medium">
                            Retake Quiz
                        </button>
                        <button onclick="brokerMatches.compareMatch(${match.id})" 
                                class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                            Compare Brokers
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    showMatchDetails(matchId) {
        const match = this.matches.find(m => m.id === matchId);
        if (!match) return;

        // Create detailed match modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h2 class="text-2xl font-bold text-gray-900">Broker Match #${match.id}</h2>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <p class="text-gray-600 mt-1">
                        Created on ${this.formatDate(new Date(match.created_at))} • ${Math.round(match.match_score)}% overall match
                    </p>
                </div>
                
                <div class="p-6">
                    <!-- Your Trading Profile -->
                    <div class="mb-8">
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Your Trading Profile</h3>
                        <div class="grid md:grid-cols-2 gap-4">
                            ${Object.entries(match.match_data).map(([key, value]) => `
                                <div class="p-3 bg-gray-50 rounded-lg">
                                    <p class="text-sm font-medium text-gray-700 capitalize">${key.replace(/_/g, ' ')}</p>
                                    <p class="text-gray-900">${Array.isArray(value) ? value.join(', ') : value || 'Not specified'}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- All Recommended Brokers -->
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">All Recommended Brokers (${match.recommended_brokers.length})</h3>
                        <div class="space-y-4">
                            ${match.recommended_brokers.map((broker, index) => `
                                <div class="p-4 border rounded-lg hover:bg-gray-50">
                                    <div class="flex items-start justify-between">
                                        <div class="flex items-start space-x-3">
                                            <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-full text-sm font-bold flex items-center justify-center">
                                                ${index + 1}
                                            </div>
                                            <div class="flex-1">
                                                <h4 class="font-bold text-gray-900">${broker.name}</h4>
                                                <p class="text-sm text-gray-600 mb-2">${broker.regulation?.join(', ') || 'Regulated'}</p>
                                                <p class="text-sm text-gray-700">${broker.reasoning}</p>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <div class="text-lg font-bold text-blue-600">${Math.round(broker.match_score)}%</div>
                                            <a href="/broker/${broker.id}" class="text-sm text-blue-600 hover:text-blue-700">
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="p-6 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                    <button onclick="this.closest('.fixed').remove()" 
                            class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                        Close
                    </button>
                    <button onclick="brokerMatches.compareMatch(${match.id}); this.closest('.fixed').remove();" 
                            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Compare Top Brokers
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    retakeMatch(matchId) {
        // Redirect to broker match flow
        window.authSystem.startBrokerMatch();
    }

    compareMatch(matchId) {
        const match = this.matches.find(m => m.id === matchId);
        if (!match) return;

        // Get top 4 brokers for comparison
        const topBrokers = match.recommended_brokers.slice(0, 4);
        const brokerIds = topBrokers.map(b => b.id);
        
        // Redirect to comparison page with broker IDs
        window.location.href = `/compare?brokers=${brokerIds.join(',')}`;
    }

    showErrorState() {
        const container = document.getElementById('matches-container');
        container.innerHTML = `
            <div class="text-center py-16">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Unable to Load Matches</h3>
                <p class="text-gray-600 mb-6">There was an error loading your broker matches.</p>
                <button onclick="brokerMatches.loadMatches()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Try Again
                </button>
            </div>
        `;
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        }).format(date);
    }

    formatCapital(amount) {
        if (!amount) return 'Not specified';
        if (typeof amount === 'string') {
            return amount.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
        return `$${parseInt(amount).toLocaleString()}`;
    }
}

// Initialize broker matches page
document.addEventListener('DOMContentLoaded', () => {
    window.brokerMatches = new BrokerMatches();
});