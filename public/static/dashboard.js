// Dashboard JavaScript for BrokerAnalysis
// ADDITIVE MODULE - User dashboard with saved broker matches

class Dashboard {
    constructor() {
        this.matches = [];
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

        // Load dashboard data
        await this.loadDashboardData();
        
        // Setup event listeners
        this.setupEventListeners();
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

    async loadDashboardData() {
        try {
            // Show loading state
            this.showLoadingState();

            // Load broker matches
            const response = await fetch('/api/auth/broker-matches', {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to load broker matches');
            }

            const data = await response.json();
            this.matches = data.matches || [];

            // Update dashboard stats
            this.updateDashboardStats();

            // Display recent matches
            this.displayRecentMatches();

        } catch (error) {
            console.error('Error loading dashboard data:', error);
            this.showErrorState();
        }
    }

    updateDashboardStats() {
        const user = window.authSystem.getCurrentUser();
        
        // Update welcome message
        const welcomeMsg = document.getElementById('welcome-message');
        if (welcomeMsg && user) {
            const firstName = user.first_name || user.email.split('@')[0];
            welcomeMsg.textContent = `Welcome back, ${firstName}! Here's your broker analysis overview.`;
        }

        // Update stats
        document.getElementById('saved-matches-count').textContent = this.matches.length;
        
        if (this.matches.length > 0) {
            // Find highest match score
            const topScore = Math.max(...this.matches.map(m => m.match_score));
            document.getElementById('top-match-score').textContent = Math.round(topScore) + '%';

            // Format last match date
            const lastMatch = new Date(this.matches[0].created_at);
            document.getElementById('last-match-date').textContent = this.formatDateShort(lastMatch);
        } else {
            document.getElementById('top-match-score').textContent = '-';
            document.getElementById('last-match-date').textContent = '-';
        }
    }

    displayRecentMatches() {
        const container = document.getElementById('recent-matches');
        
        if (this.matches.length === 0) {
            container.innerHTML = this.getEmptyStateHTML();
            return;
        }

        // Show up to 3 recent matches
        const recentMatches = this.matches.slice(0, 3);
        
        container.innerHTML = `
            <div class="space-y-4">
                ${recentMatches.map(match => this.createMatchCard(match)).join('')}
            </div>
        `;
    }

    createMatchCard(match) {
        const matchDate = new Date(match.created_at);
        const topBrokers = match.recommended_brokers.slice(0, 3);
        
        return `
            <div class="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                <div class="flex items-start justify-between mb-4">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-1">
                            Broker Match #${match.id}
                        </h3>
                        <p class="text-sm text-gray-600">
                            ${this.formatDate(matchDate)} • Match Score: ${Math.round(match.match_score)}%
                        </p>
                    </div>
                    <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        ${topBrokers.length} brokers
                    </span>
                </div>

                <div class="mb-4">
                    <h4 class="text-sm font-medium text-gray-700 mb-2">Top Recommended Brokers:</h4>
                    <div class="flex flex-wrap gap-2">
                        ${topBrokers.map((broker, index) => `
                            <div class="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border">
                                <span class="w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-bold flex items-center justify-center">
                                    ${index + 1}
                                </span>
                                <span class="text-sm font-medium">${broker.name}</span>
                                <span class="text-xs text-gray-500">${Math.round(broker.match_score)}%</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-600">
                        <span class="font-medium">Strategy:</span> ${match.match_data.trading_strategy || 'Not specified'}
                        <span class="mx-2">•</span>
                        <span class="font-medium">Experience:</span> ${match.match_data.experience_level || 'Not specified'}
                    </div>
                    <button onclick="dashboard.viewMatchDetails(${match.id})" 
                            class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Details
                    </button>
                </div>
            </div>
        `;
    }

    getEmptyStateHTML() {
        return `
            <div class="text-center py-12">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-heart text-blue-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">No Broker Matches Yet</h3>
                <p class="text-gray-600 mb-6">
                    Get personalized broker recommendations by taking our quick questionnaire.
                </p>
                <button data-action="broker-match" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    <i class="fas fa-plus mr-2"></i>
                    Create Your First Match
                </button>
            </div>
        `;
    }

    viewMatchDetails(matchId) {
        // Navigate to detailed match view
        window.location.href = `/dashboard/matches?match=${matchId}`;
    }

    showLoadingState() {
        const container = document.getElementById('recent-matches');
        container.innerHTML = `
            <div class="text-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p class="text-gray-600">Loading your broker matches...</p>
            </div>
        `;
    }

    showErrorState() {
        const container = document.getElementById('recent-matches');
        container.innerHTML = `
            <div class="text-center py-8">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Unable to Load Data</h3>
                <p class="text-gray-600 mb-4">There was an error loading your broker matches.</p>
                <button onclick="dashboard.loadDashboardData()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Try Again
                </button>
            </div>
        `;
    }

    setupEventListeners() {
        // Event listeners are handled by auth system for broker match buttons
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

    formatDateShort(date) {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays}d ago`;
        } else {
            return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
        }
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
});