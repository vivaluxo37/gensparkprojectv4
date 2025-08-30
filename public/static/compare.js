// Compare page JavaScript functionality
// Implements broker comparison with up to 4 brokers

class CompareSelector {
    constructor() {
        this.brokers = [];
        this.selectedBrokers = [];
        this.availableBrokers = [];
        this.init();
    }

    async init() {
        await this.loadBrokers();
        this.loadSavedComparison();
        this.setupEventListeners();
        this.updateDisplay();
    }

    async loadBrokers() {
        try {
            const response = await fetch('/data/brokers.json');
            const data = await response.json();
            this.brokers = data.brokers;
            this.availableBrokers = [...this.brokers];
        } catch (error) {
            console.error('Error loading brokers:', error);
            this.brokers = [];
            this.availableBrokers = [];
        }
    }

    loadSavedComparison() {
        // Load from localStorage if exists
        const saved = JSON.parse(localStorage.getItem('comparisonList') || '[]');
        this.selectedBrokers = this.brokers.filter(broker => 
            saved.includes(broker.id.toString())
        );
    }

    setupEventListeners() {
        const searchInput = document.getElementById('broker-search');
        const resetButton = document.getElementById('reset-comparison');
        const printButton = document.getElementById('print-comparison');

        if (searchInput) {
            // Setup search dropdown
            this.setupSearchDropdown(searchInput);
        }

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.resetComparison();
            });
        }

        if (printButton) {
            printButton.addEventListener('click', () => {
                window.print();
            });
        }
    }

    setupSearchDropdown(input) {
        let dropdown = null;

        input.addEventListener('focus', () => {
            this.showDropdown(input);
        });

        input.addEventListener('input', (e) => {
            this.filterDropdown(e.target.value);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && dropdown && !dropdown.contains(e.target)) {
                this.hideDropdown();
            }
        });
    }

    showDropdown(input) {
        this.hideDropdown(); // Remove existing dropdown

        const dropdown = document.createElement('div');
        dropdown.id = 'broker-dropdown';
        dropdown.className = 'absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg shadow-lg z-10 max-h-60 overflow-y-auto';
        
        // Position relative to input
        const inputRect = input.getBoundingClientRect();
        dropdown.style.width = inputRect.width + 'px';
        
        this.updateDropdownContent(dropdown, '');
        
        input.parentNode.style.position = 'relative';
        input.parentNode.appendChild(dropdown);
    }

    hideDropdown() {
        const existing = document.getElementById('broker-dropdown');
        if (existing) {
            existing.remove();
        }
    }

    filterDropdown(query) {
        const dropdown = document.getElementById('broker-dropdown');
        if (dropdown) {
            this.updateDropdownContent(dropdown, query);
        }
    }

    updateDropdownContent(dropdown, query) {
        const available = this.availableBrokers.filter(broker => 
            !this.selectedBrokers.find(selected => selected.id === broker.id) &&
            broker.name.toLowerCase().includes(query.toLowerCase())
        );

        if (available.length === 0) {
            dropdown.innerHTML = '<div class="p-3 text-gray-500 text-center">No brokers found</div>';
            return;
        }

        dropdown.innerHTML = available.map(broker => `
            <div class="broker-option p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0" data-broker-id="${broker.id}">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <i class="fas fa-building text-gray-600 text-sm"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-medium">${broker.name}</div>
                        <div class="text-sm text-gray-500">Rating: ${broker.rating}/5.0</div>
                    </div>
                </div>
            </div>
        `).join('');

        // Add click handlers
        dropdown.querySelectorAll('.broker-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const brokerId = parseInt(e.currentTarget.dataset.brokerId);
                this.addBroker(brokerId);
                this.hideDropdown();
                document.getElementById('broker-search').value = '';
            });
        });
    }

    addBroker(brokerId) {
        if (this.selectedBrokers.length >= 4) {
            this.showNotification('Maximum 4 brokers can be compared');
            return;
        }

        const broker = this.brokers.find(b => b.id === brokerId);
        if (broker && !this.selectedBrokers.find(selected => selected.id === broker.id)) {
            this.selectedBrokers.push(broker);
            this.updateDisplay();
            this.saveComparison();
        }
    }

    removeBroker(brokerId) {
        this.selectedBrokers = this.selectedBrokers.filter(broker => broker.id !== brokerId);
        this.updateDisplay();
        this.saveComparison();
    }

    resetComparison() {
        this.selectedBrokers = [];
        localStorage.removeItem('comparisonList');
        this.updateDisplay();
    }

    saveComparison() {
        const brokerIds = this.selectedBrokers.map(broker => broker.id.toString());
        localStorage.setItem('comparisonList', JSON.stringify(brokerIds));
    }

    updateDisplay() {
        this.renderSelectedBrokers();
        this.renderComparison();
    }

    renderSelectedBrokers() {
        const container = document.getElementById('selected-brokers');
        if (!container) return;

        if (this.selectedBrokers.length === 0) {
            container.innerHTML = '<p class="text-gray-500">No brokers selected</p>';
            return;
        }

        container.innerHTML = this.selectedBrokers.map(broker => `
            <div class="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
                <span class="font-medium">${broker.name}</span>
                <button onclick="compareInstance.removeBroker(${broker.id})" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    renderComparison() {
        const container = document.getElementById('comparison-container');
        const emptyState = document.getElementById('empty-state');

        if (this.selectedBrokers.length < 2) {
            container.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
        }

        container.classList.remove('hidden');
        emptyState.classList.add('hidden');

        this.renderComparisonTable();
    }

    renderComparisonTable() {
        const header = document.getElementById('comparison-header');
        const body = document.getElementById('comparison-body');

        if (!header || !body) return;

        // Generate header
        header.innerHTML = `
            <tr>
                <th class="px-4 py-3 text-left bg-gray-50">Criteria</th>
                ${this.selectedBrokers.map(broker => `
                    <th class="px-4 py-3 text-center bg-gray-50 min-w-48">
                        <div class="flex flex-col items-center space-y-2">
                            <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center border">
                                <i class="fas fa-building text-gray-600"></i>
                            </div>
                            <div class="font-bold">${broker.name}</div>
                            <div class="text-sm text-gray-600">${broker.rating}/5.0 ★</div>
                        </div>
                    </th>
                `).join('')}
            </tr>
        `;

        // Generate comparison rows
        const rows = [
            {
                label: 'Overall Rating',
                getValue: (broker) => `${broker.rating}/5.0 ★`,
                sortValue: (broker) => broker.rating
            },
            {
                label: 'Typical Spread (EUR/USD)',
                getValue: (broker) => broker.typicalSpread ? `${broker.typicalSpread} pips` : 'N/A',
                sortValue: (broker) => broker.typicalSpread || 999
            },
            {
                label: 'Commission (per lot)',
                getValue: (broker) => broker.commission ? `$${broker.commission}` : 'No commission',
                sortValue: (broker) => broker.commission || 0
            },
            {
                label: 'Estimated Slippage',
                getValue: (broker) => broker.estimatedSlippage ? `${broker.estimatedSlippage} pips` : 'N/A',
                sortValue: (broker) => broker.estimatedSlippage || 999
            },
            {
                label: 'Minimum Deposit',
                getValue: (broker) => broker.minDeposit ? `$${broker.minDeposit}` : 'No minimum',
                sortValue: (broker) => broker.minDeposit || 0
            },
            {
                label: 'Max Leverage',
                getValue: (broker) => broker.maxLeverage || 'N/A'
            },
            {
                label: 'Instruments',
                getValue: (broker) => broker.instruments ? broker.instruments.join(', ') : 'N/A'
            },
            {
                label: 'Platforms',
                getValue: (broker) => broker.platforms ? `${broker.platforms.length} platforms` : 'N/A'
            },
            {
                label: 'Regulation',
                getValue: (broker) => broker.regulation ? broker.regulation.map(r => r.name).join(', ') : 'N/A'
            }
        ];

        body.innerHTML = rows.map(row => {
            let bestIndex = -1;
            if (row.sortValue) {
                const values = this.selectedBrokers.map(row.sortValue);
                const isLowerBetter = row.label.toLowerCase().includes('spread') || 
                                    row.label.toLowerCase().includes('slippage') || 
                                    row.label.toLowerCase().includes('commission');
                
                if (isLowerBetter) {
                    const minValue = Math.min(...values.filter(v => v !== 999));
                    bestIndex = values.indexOf(minValue);
                } else if (row.label.includes('Rating')) {
                    const maxValue = Math.max(...values);
                    bestIndex = values.indexOf(maxValue);
                }
            }

            return `
                <tr class="border-b border-gray-200 hover:bg-gray-50">
                    <td class="px-4 py-3 font-medium bg-gray-50">${row.label}</td>
                    ${this.selectedBrokers.map((broker, index) => {
                        const value = row.getValue(broker);
                        const isBest = bestIndex === index && bestIndex !== -1;
                        return `
                            <td class="px-4 py-3 text-center ${isBest ? 'bg-green-50 font-bold text-green-800 best-value' : ''}">
                                ${value}
                                ${isBest ? '<div class="text-xs text-green-600 mt-1">Best Value</div>' : ''}
                            </td>
                        `;
                    }).join('')}
                </tr>
            `;
        }).join('');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize the compare page
let compareInstance;
document.addEventListener('DOMContentLoaded', () => {
    compareInstance = new CompareSelector();
});

// Print styles
const printStyles = `
<style media="print">
    .no-print { display: none !important; }
    .comparison-table { font-size: 12px; }
    .comparison-table th, .comparison-table td { padding: 8px 4px; }
    nav, .bg-gradient-to-r { display: none !important; }
</style>
`;
document.head.insertAdjacentHTML('beforeend', printStyles);