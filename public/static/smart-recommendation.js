// Smart Broker Recommendation System
// Industry-leading intelligent broker matching with SEO optimization

class SmartBrokerRecommendation {
    constructor() {
        this.currentStep = 0;
        this.userProfile = {};
        this.recommendations = [];
        this.isLoading = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        console.log('✅ Smart Broker Recommendation System initialized');
    }

    setupEventListeners() {
        // Listen for "Get My Broker Match" button clicks
        document.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'broker-match' || 
                e.target.closest('[data-action="broker-match"]')) {
                e.preventDefault();
                this.startRecommendation();
            }
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'recommendation-form') {
                e.preventDefault();
                this.processStep();
            }
        });

        // Handle next/back button clicks
        document.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'next-step') {
                e.preventDefault();
                this.processStep();
            }
            if (e.target.dataset.action === 'prev-step') {
                e.preventDefault();
                this.previousStep();
            }
            if (e.target.dataset.action === 'restart-recommendation') {
                e.preventDefault();
                this.restartRecommendation();
            }
        });
    }

    startRecommendation() {
        const widget = document.getElementById('recommendation-widget');
        if (!widget) return;

        widget.classList.remove('hidden');
        widget.scrollIntoView({ behavior: 'smooth' });
        
        this.currentStep = 0;
        this.userProfile = {};
        this.renderStep();
    }

    renderStep() {
        const container = document.getElementById('questionnaire-form');
        if (!container) return;

        const steps = this.getSteps();
        const step = steps[this.currentStep];

        if (!step) {
            this.generateRecommendations();
            return;
        }

        const progressPercentage = Math.round(((this.currentStep + 1) / steps.length) * 100);

        container.innerHTML = `
            <div class="mb-6">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-semibold">${step.title}</h3>
                    <span class="text-sm text-gray-600">Step ${this.currentStep + 1} of ${steps.length}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: ${progressPercentage}%"></div>
                </div>
                <p class="text-gray-700 mb-6">${step.description}</p>
            </div>

            <form id="recommendation-form">
                <div class="space-y-4">
                    ${step.options.map((option, index) => `
                        <label class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                            <input type="${step.type}" name="step-${this.currentStep}" value="${option.value}" class="mr-3 text-blue-600" ${step.type === 'checkbox' ? '' : 'required'}>
                            <div class="flex-1">
                                <div class="font-medium text-gray-900">${option.label}</div>
                                ${option.description ? `<div class="text-sm text-gray-600">${option.description}</div>` : ''}
                            </div>
                        </label>
                    `).join('')}
                </div>

                <div class="flex justify-between mt-8">
                    ${this.currentStep > 0 ? `
                        <button type="button" data-action="prev-step" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            <i class="fas fa-arrow-left mr-2"></i>Back
                        </button>
                    ` : '<div></div>'}
                    
                    <button type="submit" data-action="next-step" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                        ${this.currentStep === steps.length - 1 ? 'Get My Matches' : 'Next'}
                        <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </form>
        `;
    }

    getSteps() {
        return [
            {
                title: "Your Trading Experience",
                description: "Help us understand your experience level to recommend suitable brokers.",
                type: "radio",
                field: "experience",
                options: [
                    { value: "beginner", label: "Complete Beginner", description: "New to forex trading, need educational resources" },
                    { value: "intermediate", label: "Some Experience", description: "6 months to 2 years of trading experience" },
                    { value: "advanced", label: "Experienced Trader", description: "2+ years of active trading" },
                    { value: "professional", label: "Professional Trader", description: "Full-time trader or financial professional" }
                ]
            },
            {
                title: "Your Location & Regulation",
                description: "Where are you located? This helps us recommend brokers available in your region.",
                type: "radio", 
                field: "country",
                options: [
                    { value: "australia", label: "Australia", description: "ASIC regulated brokers" },
                    { value: "uk", label: "United Kingdom", description: "FCA regulated brokers" },
                    { value: "usa", label: "United States", description: "CFTC/NFA regulated brokers" },
                    { value: "canada", label: "Canada", description: "IIROC regulated brokers" },
                    { value: "singapore", label: "Singapore", description: "MAS regulated brokers" },
                    { value: "south-africa", label: "South Africa", description: "FSCA regulated brokers" },
                    { value: "other", label: "Other Country", description: "International brokers available" }
                ]
            },
            {
                title: "Trading Capital",
                description: "What's your initial trading capital? This helps match minimum deposit requirements.",
                type: "radio",
                field: "capital",
                options: [
                    { value: "100", label: "$100 - $500", description: "Micro account suitable" },
                    { value: "500", label: "$500 - $1,000", description: "Mini account recommended" },
                    { value: "1000", label: "$1,000 - $5,000", description: "Standard account access" },
                    { value: "5000", label: "$5,000 - $10,000", description: "Premium account features" },
                    { value: "10000", label: "$10,000+", description: "VIP account with best conditions" }
                ]
            },
            {
                title: "Trading Strategy",
                description: "What trading style matches your approach? This affects spread and platform requirements.",
                type: "radio",
                field: "strategy",
                options: [
                    { value: "scalping", label: "Scalping", description: "Very short-term trades (seconds to minutes)" },
                    { value: "day-trading", label: "Day Trading", description: "Positions closed within the same day" },
                    { value: "swing-trading", label: "Swing Trading", description: "Positions held for days to weeks" },
                    { value: "long-term", label: "Long-term Investment", description: "Positions held for months" }
                ]
            },
            {
                title: "Account Preferences",
                description: "Any specific account requirements?",
                type: "checkbox",
                field: "preferences",
                options: [
                    { value: "demo-account", label: "Demo Account Required", description: "Need practice account first" },
                    { value: "islamic-account", label: "Islamic/Halal Account", description: "Sharia-compliant trading" },
                    { value: "social-trading", label: "Social/Copy Trading", description: "Want to copy other traders" },
                    { value: "mobile-app", label: "Mobile App Priority", description: "Primarily trade on mobile" },
                    { value: "low-spreads", label: "Lowest Spreads", description: "Spread cost is most important" }
                ]
            }
        ];
    }

    processStep() {
        if (this.isLoading) return;

        const form = document.getElementById('recommendation-form');
        if (!form) return;

        const formData = new FormData(form);
        const steps = this.getSteps();
        const currentStepData = steps[this.currentStep];

        // Collect current step data
        if (currentStepData.type === 'radio') {
            const value = formData.get(`step-${this.currentStep}`);
            if (!value) {
                this.showError('Please select an option to continue.');
                return;
            }
            this.userProfile[currentStepData.field] = value;
        } else if (currentStepData.type === 'checkbox') {
            const values = formData.getAll(`step-${this.currentStep}`);
            this.userProfile[currentStepData.field] = values;
        }

        // Move to next step
        this.currentStep++;
        this.renderStep();
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.renderStep();
        }
    }

    async generateRecommendations() {
        this.isLoading = true;
        const container = document.getElementById('questionnaire-form');
        
        // Show loading state
        container.innerHTML = `
            <div class="text-center py-12">
                <div class="loading-spinner w-16 h-16 mx-auto mb-4"></div>
                <h3 class="text-xl font-semibold mb-2">Finding Your Perfect Brokers...</h3>
                <p class="text-gray-600">Analyzing 6+ regulated brokers based on your profile</p>
            </div>
        `;

        try {
            // Prepare recommendation request
            const requestData = {
                country: this.userProfile.country,
                experience: this.userProfile.experience,
                strategy: this.userProfile.strategy,
                capital: this.userProfile.capital,
                accountType: this.userProfile.preferences?.includes('islamic-account') ? 'islamic' : 'standard',
                riskTolerance: this.userProfile.experience === 'beginner' ? 'low' : 'medium',
                socialTrading: this.userProfile.preferences?.includes('social-trading') ? 'yes' : 'no'
            };

            const response = await fetch('/api/recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Failed to get recommendations');
            }

            const data = await response.json();
            this.recommendations = data.recommendations || [];
            
            this.displayRecommendations();
            
        } catch (error) {
            console.error('Recommendation error:', error);
            this.showError('Failed to generate recommendations. Please try again.');
        } finally {
            this.isLoading = false;
        }
    }

    displayRecommendations() {
        const container = document.getElementById('questionnaire-form');
        const resultsContainer = document.getElementById('recommendations-results');
        
        if (this.recommendations.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-xl font-semibold mb-2">No Perfect Matches Found</h3>
                    <p class="text-gray-600 mb-6">Let's broaden the search criteria for you.</p>
                    <button data-action="restart-recommendation" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        Try Different Criteria
                    </button>
                </div>
            `;
            return;
        }

        const topRecommendations = this.recommendations.slice(0, 3);

        container.innerHTML = `
            <div class="mb-8">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-2xl font-bold text-green-600">
                        <i class="fas fa-check-circle mr-2"></i>Your Perfect Matches Found!
                    </h3>
                    <button data-action="restart-recommendation" class="text-blue-600 hover:text-blue-700 text-sm">
                        <i class="fas fa-redo mr-1"></i>Try Again
                    </button>
                </div>
                <p class="text-gray-700 mb-6">
                    Based on your profile, here are the best brokers tailored for your needs:
                </p>
            </div>

            <div class="space-y-6">
                ${topRecommendations.map((rec, index) => this.renderRecommendationCard(rec, index)).join('')}
            </div>

            <div class="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 class="font-semibold text-blue-900 mb-3">Next Steps:</h4>
                <div class="grid md:grid-cols-3 gap-4">
                    <a href="/compare?brokers=${topRecommendations.map(r => r.broker.id).join(',')}" 
                       class="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-center">
                        <i class="fas fa-balance-scale text-2xl text-blue-600 mb-2"></i>
                        <div class="font-medium">Compare Details</div>
                        <div class="text-sm text-gray-600">Side-by-side comparison</div>
                    </a>
                    <a href="/simulator?brokers=${topRecommendations.map(r => r.broker.id).join(',')}" 
                       class="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-center">
                        <i class="fas fa-calculator text-2xl text-green-600 mb-2"></i>
                        <div class="font-medium">Calculate Costs</div>
                        <div class="text-sm text-gray-600">Trading cost analysis</div>
                    </a>
                    <a href="/brokers" 
                       class="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-center">
                        <i class="fas fa-list text-2xl text-purple-600 mb-2"></i>
                        <div class="font-medium">Browse All</div>
                        <div class="text-sm text-gray-600">View complete directory</div>
                    </a>
                </div>
            </div>
        `;

        resultsContainer.classList.remove('hidden');
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    renderRecommendationCard(recommendation, index) {
        const { broker, score, reasoning } = recommendation;
        const matchPercentage = Math.min(Math.round(score), 100);
        
        const getMatchLevel = (score) => {
            if (score >= 90) return { level: 'Excellent', color: 'green' };
            if (score >= 80) return { level: 'Very Good', color: 'blue' };  
            if (score >= 70) return { level: 'Good', color: 'yellow' };
            return { level: 'Fair', color: 'gray' };
        };

        const match = getMatchLevel(matchPercentage);
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';

        return `
            <div class="bg-white border-2 ${index === 0 ? 'border-gold border-yellow-400 shadow-lg' : 'border-gray-200'} rounded-xl p-6">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center">
                        <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                            <img src="/static/images/brokers/${broker.slug}.png" 
                                 alt="${broker.name}" 
                                 class="w-12 h-12 object-contain"
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="w-12 h-12 bg-blue-100 rounded-lg hidden items-center justify-center text-blue-600 font-bold">
                                ${broker.name.charAt(0)}
                            </div>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold">${medal} ${broker.name}</h4>
                            <div class="flex items-center mt-1">
                                <div class="flex text-yellow-400 mr-2">
                                    ${'★'.repeat(Math.floor(broker.rating))}${'☆'.repeat(5-Math.floor(broker.rating))}
                                </div>
                                <span class="text-sm text-gray-600">${broker.rating}/5</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-${match.color}-600">${matchPercentage}%</div>
                        <div class="text-sm text-${match.color}-600">${match.level} Match</div>
                    </div>
                </div>

                <div class="mb-4">
                    <h5 class="font-semibold text-gray-900 mb-2">Why This Broker Matches You:</h5>
                    <div class="space-y-1">
                        ${reasoning.slice(0, 3).map(reason => `
                            <div class="flex items-start text-sm">
                                <i class="fas fa-check text-green-500 mt-1 mr-2 text-xs"></i>
                                <span class="text-gray-700">${reason}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                        <span class="text-gray-600">Min Deposit:</span>
                        <span class="font-medium ml-2">$${broker.min_deposit_usd || 'N/A'}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Max Leverage:</span>
                        <span class="font-medium ml-2">${broker.max_leverage || 'N/A'}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Regulation:</span>
                        <span class="font-medium ml-2">${broker.is_regulated ? 'Yes' : 'No'}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Spreads:</span>
                        <span class="font-medium ml-2">${broker.spread_type || 'Variable'}</span>
                    </div>
                </div>

                <div class="flex space-x-3">
                    <a href="/reviews/${broker.slug}" 
                       class="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        <i class="fas fa-star mr-2"></i>Full Review
                    </a>
                    <a href="${broker.website_url || '#'}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                        <i class="fas fa-external-link-alt mr-2"></i>Visit Broker
                    </a>
                </div>
            </div>
        `;
    }

    showError(message) {
        const container = document.getElementById('questionnaire-form');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle mr-2"></i>${message}`;
        container.insertBefore(errorDiv, container.firstChild);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    restartRecommendation() {
        this.currentStep = 0;
        this.userProfile = {};
        this.recommendations = [];
        
        const resultsContainer = document.getElementById('recommendations-results');
        if (resultsContainer) {
            resultsContainer.classList.add('hidden');
        }
        
        this.renderStep();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.smartRecommendation = new SmartBrokerRecommendation();
});