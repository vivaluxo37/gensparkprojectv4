export function renderJavaScriptIncludes(): string {
  return `
    <!-- External JavaScript Libraries - Optimized Loading -->
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js" defer></script>
    
    <!-- Core JavaScript Files - Non-blocking -->
    <script src="/static/smart-recommendation.js" defer></script>
    <script src="/static/chatbot.js" defer></script>
    
    <!-- FontAwesome - Optimized Loading -->
    <script src="https://kit.fontawesome.com/your-kit-id.js" crossorigin="anonymous" defer></script>
    
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

        // Chatbot is now handled by the external chatbot.js script
        // The enhanced chatbot provides database-driven responses and internal links

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

        // Broker Match Button Functionality - Handled by smart-recommendation.js
        // The Smart Broker Recommendation System now handles authentication-gated access

        // Load featured brokers
        loadFeaturedBrokers();

        // Update total brokers count
        updateBrokerCount();
        
        // Check authentication status and update navigation
        checkAuthAndUpdateNav();
        
        // Initialize loading states and lazy loading
        initializeLoadingStates();
        initializeLazyLoading();
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

    // Enhanced Navigation Accessibility Functions
    function handleMenuKeydown(event, menuType) {
        const key = event.key;
        const menuButton = event.target;
        const menu = menuButton.nextElementSibling;
        
        switch(key) {
            case 'Enter':
            case ' ':
                event.preventDefault();
                toggleMenu(menuButton, menu);
                break;
            case 'ArrowDown':
                event.preventDefault();
                openMenu(menuButton, menu);
                focusFirstMenuItem(menu);
                break;
            case 'Escape':
                closeMenu(menuButton, menu);
                menuButton.focus();
                break;
        }
    }
    
    function handleMenuFocus(menuType) {
        // Optional: Add focus handling logic if needed
    }
    
    function handleMenuBlur(menuType) {
        // Delay to allow focus to move to menu items
        setTimeout(() => {
            const activeElement = document.activeElement;
            const menuButton = document.querySelector('[onfocus="handleMenuFocus(\\'' + menuType + '\\')"]');
            const menu = menuButton?.nextElementSibling;
            
            if (menu && !menu.contains(activeElement) && activeElement !== menuButton) {
                closeMenu(menuButton, menu);
            }
        }, 100);
    }
    
    function toggleMenu(button, menu) {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            closeMenu(button, menu);
        } else {
            openMenu(button, menu);
        }
    }
    
    function openMenu(button, menu) {
        button.setAttribute('aria-expanded', 'true');
        menu.classList.remove('opacity-0', 'invisible');
        menu.classList.add('opacity-100', 'visible');
    }
    
    function closeMenu(button, menu) {
        button.setAttribute('aria-expanded', 'false');
        menu.classList.remove('opacity-100', 'visible');
        menu.classList.add('opacity-0', 'invisible');
    }
    
    function focusFirstMenuItem(menu) {
        const firstMenuItem = menu.querySelector('a, button');
        if (firstMenuItem) {
            firstMenuItem.focus();
        }
    }
    
    // Newsletter subscription form handler with accessibility
    function handleNewsletterSubscription(event) {
        event.preventDefault();
        
        const form = event.target;
        const emailInput = form.querySelector('#newsletter-email');
        const errorDiv = form.querySelector('#newsletter-error');
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Clear previous errors
        errorDiv.classList.add('hidden');
        emailInput.setAttribute('aria-invalid', 'false');
        
        // Validate email
        const email = emailInput.value.trim();
        if (!email) {
            showNewsletterError(errorDiv, emailInput, 'Please enter your email address');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNewsletterError(errorDiv, emailInput, 'Please enter a valid email address');
            return;
        }
        
        // Show loading state
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i>Subscribing...';
        submitButton.disabled = true;
        
        // Simulate subscription (replace with actual API call)
        setTimeout(() => {
            showNewsletterSuccess(errorDiv, form, submitButton, originalText);
        }, 2000);
    }
    
    function showNewsletterError(errorDiv, emailInput, message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        emailInput.setAttribute('aria-invalid', 'true');
        emailInput.focus();
    }
    
    function showNewsletterSuccess(errorDiv, form, submitButton, originalText) {
        errorDiv.textContent = '✅ Successfully subscribed! Check your email for confirmation.';
        errorDiv.className = 'text-xs text-green-400';
        errorDiv.classList.remove('hidden');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            errorDiv.classList.add('hidden');
            errorDiv.className = 'hidden text-xs text-red-400';
        }, 5000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Progressive Enhancement and Loading States
    function initializeLoadingStates() {
        // Add loading states to buttons that trigger async operations
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', function() {
                if (this.disabled) return;
                
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i>Loading...';
                this.disabled = true;
                
                // Reset after 5 seconds if no other reset occurs
                setTimeout(() => {
                    if (this.disabled) {
                        this.innerHTML = originalText;
                        this.disabled = false;
                    }
                }, 5000);
            });
        });
    }
    
    function initializeLazyLoading() {
        // Intersection Observer for lazy loading
        const observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Lazy load images
                    if (element.tagName === 'IMG' && element.dataset.src) {
                        element.src = element.dataset.src;
                        element.classList.add('loaded');
                        observer.unobserve(element);
                    }
                    
                    // Animate in sections
                    if (element.classList.contains('lazy-load')) {
                        element.classList.add('loaded');
                        observer.unobserve(element);
                    }
                }
            });
        }, observerOptions);
        
        // Observe lazy load elements
        document.querySelectorAll('.lazy-load, img[data-src]').forEach(el => {
            observer.observe(el);
        });
    }
    
    function enhanceAccessibility() {
        // Add keyboard navigation for custom elements
        document.querySelectorAll('[role="button"]:not(button)').forEach(element => {
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
            
            // Add tabindex if not present
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
        });
        
        // Enhance focus management
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    // Global functions for navigation accessibility
    window.handleMenuKeydown = handleMenuKeydown;
    window.handleMenuFocus = handleMenuFocus;
    window.handleMenuBlur = handleMenuBlur;
    window.handleNewsletterSubscription = handleNewsletterSubscription;
    window.initializeLoadingStates = initializeLoadingStates;
    window.initializeLazyLoading = initializeLazyLoading;
    window.enhanceAccessibility = enhanceAccessibility;

    // Check authentication status and update navigation
    async function checkAuthAndUpdateNav() {
        try {
            const response = await fetch('/api/auth/me', {
                method: 'GET',
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                
                const signinContainer = document.getElementById('nav-auth-signin');
                const userContainer = document.getElementById('nav-auth-user');
                const userNameElement = document.getElementById('nav-user-name');
                
                if (data.authenticated && data.user) {
                    // User is authenticated - show user menu
                    if (signinContainer) signinContainer.classList.add('hidden');
                    if (userContainer) userContainer.classList.remove('hidden');
                    if (userNameElement) userNameElement.textContent = data.user.name || 'User';
                } else {
                    // User is not authenticated - show sign-in buttons
                    if (signinContainer) signinContainer.classList.remove('hidden');
                    if (userContainer) userContainer.classList.add('hidden');
                }
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
            // On error, show sign-in buttons
            const signinContainer = document.getElementById('nav-auth-signin');
            const userContainer = document.getElementById('nav-auth-user');
            if (signinContainer) signinContainer.classList.remove('hidden');
            if (userContainer) userContainer.classList.add('hidden');
        }
    }
    </script>
  `;
}