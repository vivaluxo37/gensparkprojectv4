// Reviews page JavaScript functionality
// Preserves existing app functionality while adding review features

class ReviewsPage {
    constructor() {
        this.brokers = [];
        this.filteredBrokers = [];
        this.init();
    }

    async init() {
        await this.loadBrokers();
        this.setupEventListeners();
        this.renderBrokers();
    }

    async loadBrokers() {
        try {
            const response = await fetch('/data/brokers.json');
            const data = await response.json();
            this.brokers = data.brokers;
            this.filteredBrokers = [...this.brokers];
        } catch (error) {
            console.error('Error loading brokers:', error);
            this.brokers = [];
            this.filteredBrokers = [];
        }
    }

    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Filter dropdowns
        const regionFilter = document.getElementById('region-filter');
        const ratingFilter = document.getElementById('rating-filter');

        if (regionFilter) {
            regionFilter.addEventListener('change', () => this.applyFilters());
        }

        if (ratingFilter) {
            ratingFilter.addEventListener('change', () => this.applyFilters());
        }
    }

    handleSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        if (!searchTerm) {
            this.filteredBrokers = [...this.brokers];
        } else {
            this.filteredBrokers = this.brokers.filter(broker =>
                broker.name.toLowerCase().includes(searchTerm) ||
                broker.headquarters.toLowerCase().includes(searchTerm)
            );
        }
        this.applyFilters();
    }

    applyFilters() {
        const regionFilter = document.getElementById('region-filter')?.value;
        const ratingFilter = document.getElementById('rating-filter')?.value;

        let filtered = [...this.filteredBrokers];

        // Apply region filter
        if (regionFilter) {
            filtered = filtered.filter(broker => {
                const jurisdiction = broker.regulation?.find(reg => 
                    reg.jurisdiction.includes(regionFilter)
                );
                return jurisdiction !== undefined;
            });
        }

        // Apply rating filter
        if (ratingFilter) {
            const minRating = parseFloat(ratingFilter);
            filtered = filtered.filter(broker => broker.rating >= minRating);
        }

        this.filteredBrokers = filtered;
        this.renderBrokers();
    }

    renderBrokers() {
        const container = document.getElementById('reviews-list');
        if (!container) return;

        if (this.filteredBrokers.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-16">
                    <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-600 mb-2">No brokers found</h3>
                    <p class="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredBrokers.map(broker => this.renderBrokerCard(broker)).join('');
    }

    renderBrokerCard(broker) {
        return `
            <div class="broker-card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-building text-gray-600"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-lg">${broker.name}</h3>
                            <p class="text-sm text-gray-600">${broker.headquarters}</p>
                        </div>
                    </div>
                    ${broker.verified ? '<span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">Verified</span>' : ''}
                </div>

                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-2">
                        <div class="rating-stars text-yellow-400">
                            ${this.renderStars(broker.rating)}
                        </div>
                        <span class="font-semibold">${broker.rating}</span>
                        <span class="text-gray-500 text-sm">(${broker.reviewsCount} reviews)</span>
                    </div>
                </div>

                <div class="space-y-2 mb-4 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Min Deposit:</span>
                        <span class="font-semibold">${broker.minDeposit ? '$' + broker.minDeposit : 'No minimum'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Spread from:</span>
                        <span class="font-semibold">${broker.typicalSpread || 'N/A'} pips</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Regulation:</span>
                        <span class="font-semibold">${broker.regulation ? broker.regulation[0]?.name : 'N/A'}</span>
                    </div>
                </div>

                <p class="text-gray-600 text-sm mb-4">${broker.verdict}</p>

                <div class="flex space-x-2">
                    <a href="/broker/${broker.slug}" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
                        View Review
                    </a>
                    <button onclick="addToComparison('${broker.id}')" class="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        return [
            ...Array(fullStars).fill('<i class="fas fa-star"></i>'),
            ...(halfStar ? ['<i class="fas fa-star-half-alt"></i>'] : []),
            ...Array(emptyStars).fill('<i class="far fa-star"></i>')
        ].join('');
    }
}

// Global function for adding to comparison
function addToComparison(brokerId) {
    // Get existing comparison list from localStorage
    let comparisonList = JSON.parse(localStorage.getItem('comparisonList') || '[]');
    
    // Add broker if not already in list and limit to 4
    if (!comparisonList.includes(brokerId) && comparisonList.length < 4) {
        comparisonList.push(brokerId);
        localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
        
        // Show notification
        showNotification(`Broker added to comparison (${comparisonList.length}/4)`);
        
        // If we have brokers to compare, show compare button
        if (comparisonList.length > 1) {
            showCompareButton(comparisonList.length);
        }
    } else if (comparisonList.includes(brokerId)) {
        showNotification('Broker already in comparison list');
    } else {
        showNotification('Maximum 4 brokers can be compared at once');
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 fade-in';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showCompareButton(count) {
    // Remove existing button if any
    const existingButton = document.getElementById('floating-compare-btn');
    if (existingButton) {
        existingButton.remove();
    }
    
    // Create floating compare button
    const button = document.createElement('a');
    button.id = 'floating-compare-btn';
    button.href = '/compare';
    button.className = 'fixed bottom-20 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors z-40';
    button.innerHTML = `<i class="fas fa-balance-scale mr-2"></i>Compare (${count})`;
    
    document.body.appendChild(button);
}

// Initialize the reviews page
document.addEventListener('DOMContentLoaded', () => {
    new ReviewsPage();
    
    // Show existing comparison button if items exist
    const comparisonList = JSON.parse(localStorage.getItem('comparisonList') || '[]');
    if (comparisonList.length > 1) {
        showCompareButton(comparisonList.length);
    }
});