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

    async startRecommendation() {
        // Check authentication status first
        const isAuthenticated = await this.checkAuthentication();
        
        if (!isAuthenticated) {
            this.createAuthModal();
            return;
        }

        // User is authenticated, proceed with questionnaire
        this.proceedToQuestionnaire();
    }

    proceedToQuestionnaire() {
        const widget = document.getElementById('recommendation-widget');
        if (!widget) return;

        widget.classList.remove('hidden');
        widget.scrollIntoView({ behavior: 'smooth' });
        
        this.currentStep = 0;
        this.userProfile = {};
        this.renderStep();
    }

    async checkAuthentication() {
        try {
            const response = await fetch('/api/auth/me', {
                method: 'GET',
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Auth check result:', data);
                return data.authenticated === true;
            }
            return false;
        } catch (error) {
            console.error('Auth check failed:', error);
            return false;
        }
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
                <div class="grid md:grid-cols-4 gap-4">
                    <a href="/dashboard" 
                       class="block p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-md transition-all text-center">
                        <i class="fas fa-tachometer-alt text-2xl mb-2"></i>
                        <div class="font-medium">View Dashboard</div>
                        <div class="text-sm opacity-90">Save & manage recommendations</div>
                    </a>
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

    // ====== AUTHENTICATION METHODS ======

    createAuthModal() {
        // Remove existing modal if any
        const existingModal = document.getElementById('auth-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal overlay
        const modal = document.createElement('div');
        modal.id = 'auth-modal';
        modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50';
        
        modal.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full m-4 max-h-screen overflow-y-auto">
                <div class="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 class="text-xl font-bold text-gray-900">Sign In Required</h2>
                    <button onclick="window.smartRecommendation.closeAuthModal()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div id="auth-modal-content" class="p-6">
                    ${this.getAuthPromptContent()}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeAuthModal();
            }
        });

        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('auth-modal')) {
                this.closeAuthModal();
            }
        });
    }

    closeAuthModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.remove();
        }
    }

    getAuthPromptContent() {
        return `
            <div class="text-center py-8">
                <div class="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-user-shield text-3xl text-blue-600"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h3>
                <p class="text-gray-600 mb-8 max-w-md mx-auto">
                    To get your personalized broker recommendations and save them to your dashboard, 
                    please sign in or create a free account.
                </p>
                
                <div class="space-y-4 max-w-sm mx-auto">
                    <button onclick="window.smartRecommendation.showSignInForm()" 
                            class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        <i class="fas fa-sign-in-alt mr-2"></i>Sign In
                    </button>
                    
                    <button onclick="window.smartRecommendation.showSignUpForm()" 
                            class="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                        <i class="fas fa-user-plus mr-2"></i>Create Free Account
                    </button>
                    
                    <div class="relative my-6">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    
                    <button onclick="window.smartRecommendation.signInWithGoogle()" 
                            class="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
                        <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign in with Google
                    </button>
                </div>
                
                <p class="text-sm text-gray-500 mt-6">
                    Free account includes personalized dashboard, saved recommendations, and trading tools.
                </p>
            </div>
        `;
    }

    showSignInForm() {
        const modalContent = document.getElementById('auth-modal-content');
        if (!modalContent) return;

        modalContent.innerHTML = `
            <div class="py-4">
                <div class="text-center mb-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Welcome Back</h3>
                    <p class="text-gray-600">Sign in to continue to your broker recommendations</p>
                </div>

                <form id="signin-form" onsubmit="window.smartRecommendation.handleSignIn(event)">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" id="signin-email" required 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" id="signin-password" required 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        </div>
                    </div>

                    <button type="submit" class="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        <i class="fas fa-sign-in-alt mr-2"></i>Sign In
                    </button>
                </form>

                <div class="mt-4 text-center">
                    <button onclick="window.smartRecommendation.showSignUpForm()" class="text-blue-600 hover:text-blue-700 text-sm">
                        Don't have an account? Sign up here
                    </button>
                </div>

                <div class="relative my-6">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>
                
                <button onclick="window.smartRecommendation.signInWithGoogle()" 
                        class="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
                    <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                </button>
            </div>
        `;
    }

    showSignUpForm() {
        const modalContent = document.getElementById('auth-modal-content');
        if (!modalContent) return;

        modalContent.innerHTML = `
            <div class="py-4">
                <div class="text-center mb-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Create Account</h3>
                    <p class="text-gray-600">Get personalized broker recommendations</p>
                </div>

                <form id="signup-form" onsubmit="window.smartRecommendation.handleSignUp(event)">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" id="signup-name" required 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                   placeholder="Enter your full name">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" id="signup-email" required 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                   placeholder="Enter your email">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" id="signup-password" required 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                   placeholder="Minimum 8 characters, 1 uppercase">
                            <p class="text-xs text-gray-500 mt-1">Minimum 8 characters with at least 1 uppercase letter</p>
                        </div>
                    </div>

                    <button type="submit" class="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        <i class="fas fa-user-plus mr-2"></i>Create Account
                    </button>
                </form>

                <div class="mt-4 text-center">
                    <button onclick="window.smartRecommendation.showSignInForm()" class="text-blue-600 hover:text-blue-700 text-sm">
                        Already have an account? Sign in here
                    </button>
                </div>

                <div class="relative my-6">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>
                
                <button onclick="window.smartRecommendation.signInWithGoogle()" 
                        class="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
                    <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign up with Google
                </button>

                <p class="text-xs text-gray-500 mt-4 text-center">
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        `;
    }

    async handleSignIn(event) {
        event.preventDefault();
        
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        
        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Close modal and proceed to questionnaire
                this.closeAuthModal();
                this.proceedToQuestionnaire();
                
                // Update navigation if available
                if (window.checkAuthAndUpdateNav) {
                    setTimeout(window.checkAuthAndUpdateNav, 100);
                }
            } else {
                this.showAuthError(data.error || 'Sign in failed. Please try again.');
            }
        } catch (error) {
            console.error('Sign in error:', error);
            this.showAuthError('Network error. Please try again.');
        }
    }

    async handleSignUp(event) {
        event.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name, email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Close modal and proceed to questionnaire
                this.closeAuthModal();
                this.proceedToQuestionnaire();
                
                // Update navigation if available
                if (window.checkAuthAndUpdateNav) {
                    setTimeout(window.checkAuthAndUpdateNav, 100);
                }
            } else {
                this.showAuthError(data.error || 'Account creation failed. Please try again.');
            }
        } catch (error) {
            console.error('Sign up error:', error);
            this.showAuthError('Network error. Please try again.');
        }
    }

    async signInWithGoogle() {
        try {
            // Redirect to Google OAuth
            window.location.href = '/api/auth/google';
        } catch (error) {
            console.error('Google sign in error:', error);
            this.showAuthError('Google sign in failed. Please try again.');
        }
    }

    showAuthError(message) {
        const modalContent = document.getElementById('auth-modal-content');
        if (!modalContent) return;

        // Remove existing error
        const existingError = modalContent.querySelector('.auth-error');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'auth-error bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4';
        errorDiv.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        modalContent.insertBefore(errorDiv, modalContent.firstChild);
        
        // Auto-remove error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.smartRecommendation = new SmartBrokerRecommendation();
});