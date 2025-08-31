export function renderJavaScriptIncludes(): string {
  return `
    <!-- External JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    
    <!-- Custom JavaScript Files -->
    <script src="/static/enhanced-broker-database.js"></script>
    <script src="/static/auth.js"></script>
    <script src="/static/navigation.js"></script>
    <script src="/static/broker-matches.js"></script>
    <script src="/static/chatbot.js"></script>
    <script src="/static/faq.js"></script>
    <script src="/static/featured-brokers.js"></script>
    
    <!-- Inline JavaScript for immediate functionality -->
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // FAQ Toggle Functionality
        document.querySelectorAll('.faq-toggle').forEach(button => {
            button.addEventListener('click', function() {
                const faqId = this.getAttribute('data-faq');
                const answer = document.getElementById('faq-answer-' + faqId);
                const chevron = this.querySelector('.faq-chevron');
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Toggle answer visibility
                if (isExpanded) {
                    answer.classList.add('hidden');
                    this.setAttribute('aria-expanded', 'false');
                    chevron.style.transform = 'rotate(0deg)';
                } else {
                    answer.classList.remove('hidden');
                    this.setAttribute('aria-expanded', 'true');
                    chevron.style.transform = 'rotate(180deg)';
                }
            });
        });

        // Chatbot Functionality
        const chatbotToggle = document.getElementById('chatbot-toggle');
        const chatbotWindow = document.getElementById('chatbot-window');
        const chatbotClose = document.getElementById('chatbot-close');
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotSend = document.getElementById('chatbot-send');
        const chatbotMessages = document.getElementById('chatbot-messages');

        if (chatbotToggle && chatbotWindow) {
            chatbotToggle.addEventListener('click', function() {
                const isHidden = chatbotWindow.classList.contains('hidden');
                if (isHidden) {
                    chatbotWindow.classList.remove('hidden');
                    this.setAttribute('aria-expanded', 'true');
                } else {
                    chatbotWindow.classList.add('hidden');
                    this.setAttribute('aria-expanded', 'false');
                }
            });

            if (chatbotClose) {
                chatbotClose.addEventListener('click', function() {
                    chatbotWindow.classList.add('hidden');
                    chatbotToggle.setAttribute('aria-expanded', 'false');
                });
            }

            // Send message functionality
            function sendMessage() {
                const message = chatbotInput?.value.trim();
                if (!message || !chatbotMessages) return;

                // Add user message
                const userMessageDiv = document.createElement('div');
                userMessageDiv.className = 'flex items-start space-x-2 justify-end';
                userMessageDiv.innerHTML = \`
                    <div class="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                        <p class="text-sm">\${message}</p>
                    </div>
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-gray-600 text-sm"></i>
                    </div>
                \`;
                chatbotMessages.appendChild(userMessageDiv);

                // Clear input
                chatbotInput.value = '';

                // Scroll to bottom
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

                // Simulate bot response (in real implementation, this would call an API)
                setTimeout(() => {
                    const botMessageDiv = document.createElement('div');
                    botMessageDiv.className = 'flex items-start space-x-2';
                    botMessageDiv.innerHTML = \`
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-robot text-blue-600 text-sm"></i>
                        </div>
                        <div class="bg-blue-50 p-3 rounded-lg max-w-xs">
                            <p class="text-sm">I'd be happy to help you find the right broker! Let me search our database for recommendations based on your query.</p>
                        </div>
                    \`;
                    chatbotMessages.appendChild(botMessageDiv);
                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                }, 1000);
            }

            if (chatbotSend) {
                chatbotSend.addEventListener('click', sendMessage);
            }

            if (chatbotInput) {
                chatbotInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                });
            }
        }

        // Mobile Menu Functionality
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', function() {
                const isHidden = mobileMenu.classList.contains('hidden');
                if (isHidden) {
                    mobileMenu.classList.remove('hidden');
                    this.setAttribute('aria-expanded', 'true');
                    this.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
                } else {
                    mobileMenu.classList.add('hidden');
                    this.setAttribute('aria-expanded', 'false');
                    this.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
                }
            });
        }

        // Mobile Submenu Toggles
        document.querySelectorAll('.mobile-menu-toggle').forEach(button => {
            button.addEventListener('click', function() {
                const menuId = this.getAttribute('data-menu');
                const submenu = this.nextElementSibling;
                const chevron = this.querySelector('.mobile-chevron');
                
                if (submenu && submenu.classList.contains('mobile-submenu')) {
                    const isHidden = submenu.classList.contains('hidden');
                    if (isHidden) {
                        submenu.classList.remove('hidden');
                        chevron.style.transform = 'rotate(180deg)';
                    } else {
                        submenu.classList.add('hidden');
                        chevron.style.transform = 'rotate(0deg)';
                    }
                }
            });
        });

        // Broker Match Button Functionality
        document.querySelectorAll('[data-action="broker-match"]').forEach(button => {
            button.addEventListener('click', function() {
                const recommendationWidget = document.getElementById('recommendation-widget');
                if (recommendationWidget) {
                    recommendationWidget.classList.remove('hidden');
                    recommendationWidget.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Load featured brokers
        loadFeaturedBrokers();

        // Update total brokers count
        updateBrokerCount();
    });

    // Quick message function for chatbot
    function sendQuickMessage(message) {
        const chatbotInput = document.getElementById('chatbot-input');
        if (chatbotInput) {
            chatbotInput.value = message;
            document.getElementById('chatbot-send')?.click();
        }
    }

    // Load featured brokers function
    async function loadFeaturedBrokers() {
        try {
            const response = await fetch('/api/brokers/featured');
            if (response.ok) {
                const brokers = await response.json();
                const container = document.getElementById('featured-brokers');
                if (container && brokers.length > 0) {
                    container.innerHTML = brokers.map(broker => \`
                        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div class="flex items-center justify-between mb-4">
                                <img src="\${broker.logo || '/static/images/broker-placeholder.png'}" 
                                     alt="\${broker.name}" class="h-8 w-auto">
                                <div class="flex items-center space-x-1">
                                    <span class="text-yellow-400 text-sm">★</span>
                                    <span class="font-medium">\${broker.rating || 'N/A'}</span>
                                </div>
                            </div>
                            <h3 class="font-semibold mb-2">\${broker.name}</h3>
                            <p class="text-blue-600 text-sm mb-4">\${broker.description || 'Professional trading services'}</p>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span>Min Deposit:</span>
                                    <span class="font-medium">\${broker.min_deposit || 'N/A'}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Spread from:</span>
                                    <span class="font-medium">\${broker.spread_from || 'N/A'}</span>
                                </div>
                            </div>
                            <div class="mt-4 pt-4 border-t">
                                <a href="/reviews/\${broker.slug}" 
                                   class="block bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    View Review
                                </a>
                            </div>
                        </div>
                    \`).join('');
                }
            }
        } catch (error) {
            console.error('Error loading featured brokers:', error);
            // Fallback content
            const container = document.getElementById('featured-brokers');
            if (container) {
                container.innerHTML = \`
                    <div class="col-span-full text-center py-8">
                        <p class="text-blue-600">Featured brokers will be loaded here.</p>
                        <a href="/reviews" class="text-blue-600 underline hover:text-blue-800">View all brokers</a>
                    </div>
                \`;
            }
        }
    }

    // Update broker count
    async function updateBrokerCount() {
        try {
            const response = await fetch('/api/brokers/count');
            if (response.ok) {
                const data = await response.json();
                const countElement = document.getElementById('total-brokers');
                if (countElement && data.count) {
                    countElement.textContent = data.count + '+';
                }
            }
        } catch (error) {
            console.error('Error updating broker count:', error);
        }
    }
    </script>
  `;
}