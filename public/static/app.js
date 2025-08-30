// BrokerAnalysis Frontend JavaScript
class BrokerAnalysis {
    constructor() {
        this.currentStep = 0;
        this.userProfile = {};
        this.chatMessages = [];
        this.sessionId = null;
        this.recommendations = [];
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.loadStats();
        await this.loadEnhancedBrokers();
        this.initChatbot();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.showSection(targetId);
            });
        });

        // Chatbot toggle
        const chatbotToggle = document.getElementById('chatbot-toggle');
        const chatbotWindow = document.getElementById('chatbot-window');
        const chatbotClose = document.getElementById('chatbot-close');

        if (chatbotToggle && chatbotWindow && chatbotClose) {
            chatbotToggle.addEventListener('click', () => {
                chatbotWindow.classList.toggle('hidden');
            });

            chatbotClose.addEventListener('click', () => {
                chatbotWindow.classList.add('hidden');
            });
        }

        // Chatbot input
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotSend = document.getElementById('chatbot-send');

        if (chatbotInput && chatbotSend) {
            chatbotSend.addEventListener('click', () => {
                this.sendChatMessage();
            });

            chatbotInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage();
                }
            });
        }
    }

    async loadStats() {
        try {
            const response = await axios.get('/api/stats');
            const stats = response.data;
            
            if (stats.total_brokers) {
                const totalBrokersElement = document.getElementById('total-brokers');
                if (totalBrokersElement) {
                    totalBrokersElement.textContent = `${stats.total_brokers}+`;
                }
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    async loadEnhancedBrokers() {
        try {
            // Initialize enhanced broker database if available
            if (typeof EnhancedBrokerDatabase !== 'undefined') {
                this.enhancedBrokerDB = new EnhancedBrokerDatabase();
                await this.enhancedBrokerDB.init();
                
                // Update stats with enhanced broker count
                const allBrokers = this.enhancedBrokerDB.getAllEnhancedBrokers();
                const totalBrokersElement = document.getElementById('total-brokers');
                if (totalBrokersElement && allBrokers.length > 0) {
                    totalBrokersElement.textContent = `${allBrokers.length}+`;
                }
                
                console.log(`✅ Enhanced broker database loaded: ${allBrokers.length} brokers`);
                
                // Store enhanced brokers for use by other components
                window.enhancedBrokers = allBrokers;
                
                // Dispatch event to notify other components
                window.dispatchEvent(new CustomEvent('enhancedBrokersLoaded', {
                    detail: { brokers: allBrokers, count: allBrokers.length }
                }));
                
                // Load featured brokers on homepage
                this.loadFeaturedBrokers();
                
            } else {
                console.warn('Enhanced broker database not available, falling back to API data');
            }
        } catch (error) {
            console.error('Error loading enhanced brokers:', error);
        }
    }

    loadFeaturedBrokers() {
        // ADDITIVE: Display featured brokers from images with bonus information
        const featuredBrokersContainer = document.getElementById('featured-brokers');
        if (!featuredBrokersContainer || !this.enhancedBrokerDB) return;

        // Get featured brokers from the images (the ones with bonuses)
        const featuredBrokerIds = ['fxopen', 'roboforex', 'exness', 'xm-global', 'fxtm', 'fbs', 'quotex', 'instaforex'];
        
        const featuredBrokers = featuredBrokerIds.map(id => 
            this.enhancedBrokerDB.getEnhancedBrokerById(id)
        ).filter(broker => broker); // Filter out any null/undefined brokers

        featuredBrokersContainer.innerHTML = '';

        featuredBrokers.forEach(broker => {
            const brokerCard = this.createFeaturedBrokerCard(broker);
            featuredBrokersContainer.appendChild(brokerCard);
        });
    }

    createFeaturedBrokerCard(broker) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer';
        card.onclick = () => window.location.href = `/broker/${broker.id}`;

        const ratingStars = this.generateStars(broker.rating);
        
        card.innerHTML = `
            <div class="p-6">
                <div class="flex items-center space-x-3 mb-4">
                    <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i class="fas fa-building text-gray-600 text-xl"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold text-gray-900">${broker.name}</h3>
                        <div class="flex items-center space-x-2">
                            <div class="text-yellow-400">${ratingStars}</div>
                            <span class="text-sm text-gray-600">${broker.rating}</span>
                        </div>
                    </div>
                </div>
                
                ${broker.bonusType ? `
                    <div class="mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                        <div class="flex items-center space-x-2 mb-1">
                            <i class="fas fa-gift text-green-600 text-sm"></i>
                            <span class="text-sm font-medium text-green-800">${broker.bonusType}</span>
                        </div>
                        <p class="text-sm text-green-700">Up to <strong>${broker.bonusAmount}</strong></p>
                    </div>
                ` : ''}
                
                <div class="space-y-2 text-sm text-gray-600 mb-4">
                    <div class="flex justify-between">
                        <span>Min Deposit:</span>
                        <span class="font-medium">${broker.minimumDeposit ? '$' + broker.minimumDeposit : 'No minimum'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Spreads From:</span>
                        <span class="font-medium">${broker.spreads.major_pairs.min} pips</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Regulation:</span>
                        <span class="font-medium">${broker.regulation[0]}</span>
                    </div>
                </div>
                
                <div class="flex space-x-2">
                    <button onclick="event.stopPropagation(); window.location.href='/broker/${broker.id}'" class="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        View Details
                    </button>
                    <button onclick="event.stopPropagation(); window.open('${broker.websiteUrl}', '_blank')" class="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        Visit
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        let starsHtml = '';
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        if (halfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        
        return starsHtml;
    }

    showSection(sectionId) {
        // Simple scroll to section - in a real SPA, this would handle routing
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }

        // Handle special sections
        if (sectionId === 'reviews') {
            this.showBrokerReviews();
        } else if (sectionId === 'compare') {
            this.showComparison();
        } else if (sectionId === 'simulator') {
            this.showSimulator();
        } else if (sectionId === 'about') {
            this.showAbout();
        }
    }

    startRecommendation() {
        const widget = document.getElementById('recommendation-widget');
        widget.classList.remove('hidden');
        widget.scrollIntoView({ behavior: 'smooth' });
        
        this.currentStep = 0;
        this.userProfile = {};
        this.renderQuestionnaire();
    }

    renderQuestionnaire() {
        const container = document.getElementById('questionnaire-form');
        const steps = [
            {
                id: 'country',
                title: 'What country are you trading from?',
                type: 'select',
                options: [
                    'United States', 'United Kingdom', 'Canada', 'Australia', 
                    'Germany', 'France', 'Netherlands', 'Singapore', 'Other'
                ],
                icon: 'fas fa-globe'
            },
            {
                id: 'experience_level',
                title: 'What is your trading experience level?',
                type: 'radio',
                options: ['Beginner', 'Intermediate', 'Advanced'],
                icon: 'fas fa-user-graduate'
            },
            {
                id: 'trading_strategy',
                title: 'What trading strategy do you prefer?',
                type: 'radio',
                options: ['Scalping', 'Day Trading', 'Swing Trading', 'Long-term Investing'],
                icon: 'fas fa-chart-line'
            },
            {
                id: 'capital_amount',
                title: 'How much capital do you plan to start with?',
                type: 'select',
                options: [
                    'Under $500', '$500 - $1,000', '$1,000 - $5,000', 
                    '$5,000 - $10,000', '$10,000 - $50,000', 'Over $50,000'
                ],
                icon: 'fas fa-dollar-sign'
            },
            {
                id: 'account_type_pref',
                title: 'What type of account features interest you most?',
                type: 'radio',
                options: ['Standard', 'ECN/Raw Spreads', 'Islamic/Swap-Free', 'Social Trading'],
                icon: 'fas fa-cog'
            },
            {
                id: 'risk_tolerance',
                title: 'What is your risk tolerance?',
                type: 'radio',
                options: ['Conservative', 'Moderate', 'Aggressive'],
                icon: 'fas fa-shield-alt'
            }
        ];

        const currentStepData = steps[this.currentStep];
        
        if (!currentStepData) {
            this.submitProfile();
            return;
        }

        let optionsHtml = '';
        
        if (currentStepData.type === 'select') {
            optionsHtml = `
                <select id="step-input" class="form-input custom-select w-full p-3 rounded-lg text-lg">
                    <option value="">Please select...</option>
                    ${currentStepData.options.map(option => 
                        `<option value="${option}">${option}</option>`
                    ).join('')}
                </select>
            `;
        } else if (currentStepData.type === 'radio') {
            optionsHtml = `
                <div class="space-y-3">
                    ${currentStepData.options.map((option, index) => `
                        <label class="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                            <input type="radio" name="step-input" value="${option}" class="mr-3 text-blue-600">
                            <span class="text-lg">${option}</span>
                        </label>
                    `).join('')}
                </div>
            `;
        }

        container.innerHTML = `
            <div class="text-center mb-8">
                <div class="flex justify-center mb-4">
                    ${steps.map((_, index) => `
                        <div class="step-indicator w-8 h-8 rounded-full flex items-center justify-center mx-1 text-sm font-semibold
                            ${index < this.currentStep ? 'completed' : index === this.currentStep ? 'active' : 'bg-gray-200 text-gray-600'}">
                            ${index + 1}
                        </div>
                    `).join('')}
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="progress-bar h-2 rounded-full" style="width: ${(this.currentStep / steps.length) * 100}%"></div>
                </div>
            </div>
            
            <div class="fade-in">
                <div class="text-center mb-6">
                    <i class="${currentStepData.icon} text-4xl text-blue-600 mb-4"></i>
                    <h3 class="text-2xl font-bold mb-2">${currentStepData.title}</h3>
                    <p class="text-gray-600">Step ${this.currentStep + 1} of ${steps.length}</p>
                </div>
                
                <div class="max-w-md mx-auto mb-6">
                    ${optionsHtml}
                </div>
                
                <div class="flex justify-center space-x-4">
                    ${this.currentStep > 0 ? `
                        <button onclick="app.previousStep()" class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors">
                            <i class="fas fa-arrow-left mr-2"></i>Previous
                        </button>
                    ` : ''}
                    <button onclick="app.nextStep()" id="next-button" class="gradient-button text-white px-6 py-3 rounded-lg font-semibold" disabled>
                        ${this.currentStep === steps.length - 1 ? 'Get Recommendations' : 'Next'} 
                        <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        `;

        // Add event listeners for input changes
        const inputs = container.querySelectorAll('input, select');
        const nextButton = container.querySelector('#next-button');
        
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                const value = input.type === 'radio' ? 
                    container.querySelector('input[name="step-input"]:checked')?.value :
                    input.value;
                
                if (value) {
                    nextButton.disabled = false;
                    nextButton.classList.remove('opacity-50');
                    this.userProfile[currentStepData.id] = value;
                } else {
                    nextButton.disabled = true;
                    nextButton.classList.add('opacity-50');
                }
            });
        });
    }

    nextStep() {
        this.currentStep++;
        this.renderQuestionnaire();
    }

    previousStep() {
        this.currentStep--;
        this.renderQuestionnaire();
    }

    async submitProfile() {
        this.showLoading(true);
        
        try {
            this.userProfile.session_id = this.sessionId || `session_${Date.now()}`;
            
            const response = await axios.post('/api/recommendations', this.userProfile);
            const data = response.data;
            
            this.sessionId = data.session_id;
            this.recommendations = data.recommendations;
            
            this.renderRecommendations();
        } catch (error) {
            console.error('Error getting recommendations:', error);
            alert('Sorry, there was an error processing your request. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    renderRecommendations() {
        const container = document.getElementById('questionnaire-form');
        const resultsContainer = document.getElementById('recommendations-results');
        
        container.innerHTML = `
            <div class="text-center">
                <i class="fas fa-check-circle text-6xl text-green-600 mb-4"></i>
                <h3 class="text-2xl font-bold mb-2">Analysis Complete!</h3>
                <p class="text-gray-600 mb-6">Here are your personalized broker recommendations</p>
                <button onclick="app.startRecommendation()" class="text-blue-600 hover:text-blue-800 underline">
                    Start New Analysis
                </button>
            </div>
        `;
        
        const top3 = this.recommendations.slice(0, 3);
        
        resultsContainer.innerHTML = `
            <div class="grid md:grid-cols-3 gap-6">
                ${top3.map((broker, index) => `
                    <div class="broker-card bg-white p-6 rounded-xl shadow-lg ${index === 0 ? 'ring-2 ring-yellow-400' : ''}">
                        ${index === 0 ? '<div class="text-center mb-4"><span class="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">Best Match</span></div>' : ''}
                        
                        <div class="text-center mb-4">
                            <div class="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <i class="fas fa-building text-2xl text-gray-600"></i>
                            </div>
                            <h4 class="text-xl font-bold">${broker.name}</h4>
                            <div class="flex items-center justify-center mt-2">
                                <div class="rating-stars mr-2">
                                    ${this.renderStars(broker.rating)}
                                </div>
                                <span class="text-gray-600">${broker.rating}/5.0</span>
                            </div>
                        </div>
                        
                        <div class="space-y-2 mb-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Match Score:</span>
                                <span class="font-semibold text-blue-600">${Math.round(broker.match_score)}%</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Min Deposit:</span>
                                <span class="font-semibold">$${broker.min_deposit_usd}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Regulated:</span>
                                <span class="font-semibold ${broker.is_regulated ? 'text-green-600' : 'text-red-600'}">
                                    ${broker.is_regulated ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <p class="text-sm text-gray-600">${broker.reasoning}</p>
                        </div>
                        
                        <div class="flex space-x-2">
                            <button onclick="app.viewBrokerDetails('${broker.slug}')" class="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                                View Details
                            </button>
                            <button onclick="app.addToComparison('${broker.id}')" class="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            ${this.recommendations.length > 3 ? `
                <div class="text-center mt-8">
                    <button onclick="app.showAllRecommendations()" class="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                        View All ${this.recommendations.length} Recommendations
                    </button>
                </div>
            ` : ''}
        `;
        
        resultsContainer.classList.remove('hidden');
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

    async showBrokerReviews() {
        // This would load and display the broker reviews section
        console.log('Show broker reviews');
    }

    async showComparison() {
        // This would load and display the comparison tool
        console.log('Show comparison tool');
    }

    async showSimulator() {
        // This would load and display the cost simulator
        console.log('Show cost simulator');
    }

    showAbout() {
        // This would display the about section
        console.log('Show about section');
    }

    async viewBrokerDetails(slug) {
        try {
            const response = await axios.get(`/api/brokers/${slug}`);
            const broker = response.data;
            
            // Create and show modal with detailed broker information
            this.showBrokerModal(broker);
        } catch (error) {
            console.error('Error loading broker details:', error);
        }
    }

    showBrokerModal(broker) {
        const modalHtml = `
            <div class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onclick="app.closeBrokerModal()">
                <div class="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-y-auto m-4" onclick="event.stopPropagation()">
                    <div class="bg-blue-600 text-white p-6 rounded-t-lg flex justify-between items-center">
                        <div>
                            <h2 class="text-2xl font-bold">${broker.name}</h2>
                            <div class="flex items-center mt-2">
                                <div class="rating-stars mr-2">
                                    ${this.renderStars(broker.rating)}
                                </div>
                                <span>${broker.rating}/5.0</span>
                            </div>
                        </div>
                        <button onclick="app.closeBrokerModal()" class="text-white hover:text-gray-200">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                    
                    <div class="p-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 class="text-lg font-semibold mb-3">Key Information</h3>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Established:</span>
                                        <span class="font-semibold">${broker.established || 'N/A'}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Headquarters:</span>
                                        <span class="font-semibold">${broker.headquarters || 'N/A'}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Min Deposit:</span>
                                        <span class="font-semibold">$${broker.min_deposit_usd}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Max Leverage:</span>
                                        <span class="font-semibold">${broker.max_leverage}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 class="text-lg font-semibold mb-3">Regulation</h3>
                                ${broker.regulations && broker.regulations.length > 0 ? `
                                    <div class="space-y-2">
                                        ${broker.regulations.map(reg => `
                                            <div class="flex justify-between text-sm">
                                                <span class="text-gray-600">${reg.regulator_name}:</span>
                                                <span class="font-semibold">${reg.license_number || 'Licensed'}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : '<p class="text-gray-600">Regulation information not available</p>'}
                            </div>
                        </div>
                        
                        ${broker.features && broker.features.length > 0 ? `
                            <div class="mt-6">
                                <h3 class="text-lg font-semibold mb-3">Pros & Cons</h3>
                                <div class="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 class="text-green-600 font-semibold mb-2">Advantages</h4>
                                        <ul class="space-y-1">
                                            ${broker.features.filter(f => f.feature_type === 'Pro').map(f => `
                                                <li class="text-sm flex items-start">
                                                    <i class="fas fa-check text-green-600 mr-2 mt-1"></i>
                                                    ${f.feature_text}
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 class="text-red-600 font-semibold mb-2">Disadvantages</h4>
                                        <ul class="space-y-1">
                                            ${broker.features.filter(f => f.feature_type === 'Con').map(f => `
                                                <li class="text-sm flex items-start">
                                                    <i class="fas fa-times text-red-600 mr-2 mt-1"></i>
                                                    ${f.feature_text}
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                        
                        <div class="mt-6 flex space-x-4">
                            <button class="gradient-button text-white px-6 py-3 rounded-lg font-semibold">
                                <i class="fas fa-external-link-alt mr-2"></i>
                                Visit Website
                            </button>
                            <button onclick="app.addToComparison('${broker.id}')" class="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                <i class="fas fa-plus mr-2"></i>
                                Add to Compare
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    closeBrokerModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }

    addToComparison(brokerId) {
        // Add broker to comparison list
        console.log('Add broker to comparison:', brokerId);
        // Show toast notification
        this.showToast('Broker added to comparison list');
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-semibold ${type === 'success' ? 'bg-green-600' : 'bg-red-600'} fade-in`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Chatbot functionality
    initChatbot() {
        this.chatSessionId = `chat_${Date.now()}`;
    }

    async sendChatMessage(quickMessage = null) {
        const input = document.getElementById('chatbot-input');
        const message = quickMessage || input.value.trim();
        
        if (!message) return;
        
        // Clear input
        if (!quickMessage) {
            input.value = '';
        }
        
        // Add user message to chat
        this.addChatMessage(message, 'user');
        
        try {
            const response = await axios.post('/api/chatbot', {
                message: message,
                session_id: this.chatSessionId,
                context: this.userProfile
            });
            
            const data = response.data;
            this.addChatMessage(data.response, 'bot');
            
        } catch (error) {
            console.error('Chat error:', error);
            this.addChatMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    }

    addChatMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const isBot = sender === 'bot';
        
        const messageHtml = `
            <div class="flex items-start space-x-2 chat-message ${isBot ? '' : 'flex-row-reverse space-x-reverse'}">
                <div class="w-8 h-8 ${isBot ? 'bg-blue-100' : 'bg-gray-100'} rounded-full flex items-center justify-center">
                    <i class="fas ${isBot ? 'fa-robot text-blue-600' : 'fa-user text-gray-600'} text-sm"></i>
                </div>
                <div class="max-w-xs">
                    <div class="${isBot ? 'bg-gray-100' : 'bg-blue-600 text-white'} p-3 rounded-lg">
                        <p class="text-sm">${message}</p>
                    </div>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHtml);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showLoading(show) {
        const indicator = document.getElementById('loading-indicator');
        if (show) {
            indicator.classList.remove('hidden');
        } else {
            indicator.classList.add('hidden');
        }
    }
}

// Global functions for onclick handlers
window.startRecommendation = function() {
    window.app.startRecommendation();
};

window.showSection = function(section) {
    window.app.showSection(section);
};

window.sendQuickMessage = function(message) {
    window.app.sendChatMessage(message);
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BrokerAnalysis();
});