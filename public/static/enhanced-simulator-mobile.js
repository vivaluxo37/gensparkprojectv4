// Enhanced Trading Simulator Mobile Optimizations
// ADDITIVE MODULE - Adds mobile-responsive behavior and touch-friendly controls
// Preserves all existing functionality while enhancing mobile experience

class SimulatorMobileOptimizer {
    constructor() {
        this.isMobile = window.innerWidth < 768;
        this.isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        this.touchStartPos = null;
        this.init();
    }

    init() {
        this.setupMobileOptimizations();
        this.setupTouchGestures();
        this.setupResponsiveLayoutHandler();
        this.setupMobileMenus();
    }

    setupMobileOptimizations() {
        // Add mobile-specific CSS classes
        this.addMobileStyles();
        
        // Optimize input elements for mobile
        this.optimizeMobileInputs();
        
        // Add mobile-friendly tooltips
        this.addMobileTooltips();
        
        // Setup mobile scroll behavior
        this.setupMobileScroll();
    }

    addMobileStyles() {
        if (document.getElementById('mobile-simulator-styles')) return;

        const mobileStyles = document.createElement('style');
        mobileStyles.id = 'mobile-simulator-styles';
        mobileStyles.textContent = `
            /* Mobile-Specific Simulator Styles */
            @media (max-width: 768px) {
                /* Enhanced touch targets */
                .enhanced-simulator-ui button {
                    min-height: 44px !important;
                    min-width: 44px !important;
                }
                
                .enhanced-simulator-ui input,
                .enhanced-simulator-ui select {
                    min-height: 44px !important;
                    font-size: 16px !important; /* Prevents zoom on iOS */
                }
                
                /* Improved spacing for mobile */
                .enhanced-simulator-ui .strategy-option {
                    padding: 16px !important;
                    margin-bottom: 12px !important;
                }
                
                .enhanced-simulator-ui .broker-selector label {
                    padding: 16px 12px !important;
                }
                
                /* Mobile-friendly table */
                .enhanced-simulator-ui table {
                    font-size: 14px !important;
                }
                
                .enhanced-simulator-ui td,
                .enhanced-simulator-ui th {
                    padding: 8px 4px !important;
                }
                
                /* Stackable grid layout */
                .enhanced-simulator-ui .grid.lg\\:grid-cols-3 {
                    grid-template-columns: 1fr !important;
                    gap: 20px !important;
                }
                
                .enhanced-simulator-ui .grid.md\\:grid-cols-2 {
                    grid-template-columns: 1fr !important;
                }
                
                /* Mobile sticky action buttons */
                .mobile-sticky-actions {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: white;
                    padding: 16px;
                    border-top: 1px solid #e5e7eb;
                    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
                    z-index: 50;
                }
                
                .mobile-sticky-actions button {
                    width: 100% !important;
                    margin-bottom: 8px !important;
                }
                
                /* Mobile modal overlays */
                .mobile-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 100;
                    display: flex;
                    align-items: flex-end;
                }
                
                .mobile-modal-content {
                    background: white;
                    width: 100%;
                    max-height: 80vh;
                    border-radius: 16px 16px 0 0;
                    overflow-y: auto;
                    padding: 20px;
                }
                
                /* Swipe indicator for tables */
                .mobile-swipe-indicator {
                    text-align: center;
                    padding: 8px;
                    background: #f9fafb;
                    border-radius: 6px;
                    margin-bottom: 16px;
                    font-size: 12px;
                    color: #6b7280;
                }
                
                .mobile-swipe-indicator::after {
                    content: "← Swipe to see more →";
                }
            }
            
            @media (max-width: 480px) {
                /* Extra small screen optimizations */
                .enhanced-simulator-ui .text-2xl {
                    font-size: 1.5rem !important;
                }
                
                .enhanced-simulator-ui .px-6 {
                    padding-left: 16px !important;
                    padding-right: 16px !important;
                }
                
                /* Compact metric cards */
                .enhanced-simulator-ui .summary-metrics .bg-white {
                    padding: 16px !important;
                }
                
                .enhanced-simulator-ui .summary-metrics .text-2xl {
                    font-size: 1.25rem !important;
                }
            }
        `;
        
        document.head.appendChild(mobileStyles);
    }

    optimizeMobileInputs() {
        // Add input mode attributes for better mobile keyboards
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.setAttribute('inputmode', 'decimal');
            input.setAttribute('pattern', '[0-9]*');
        });

        // Add autocomplete attributes
        const tradeSizeInput = document.getElementById('enhanced-trade-size');
        if (tradeSizeInput) {
            tradeSizeInput.setAttribute('autocomplete', 'off');
            tradeSizeInput.setAttribute('autocorrect', 'off');
            tradeSizeInput.setAttribute('spellcheck', 'false');
        }

        // Improve select dropdowns for mobile
        document.querySelectorAll('select').forEach(select => {
            if (this.isMobile) {
                // Add native mobile styling
                select.style.WebkitAppearance = 'none';
                select.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")';
                select.style.backgroundRepeat = 'no-repeat';
                select.style.backgroundPosition = 'right 8px center';
                select.style.backgroundSize = '16px';
                select.style.paddingRight = '32px';
            }
        });
    }

    addMobileTooltips() {
        // Convert hover tooltips to tap-based tooltips on mobile
        document.querySelectorAll('[title]').forEach(element => {
            if (this.isMobile) {
                const title = element.getAttribute('title');
                element.removeAttribute('title');
                
                element.addEventListener('click', (e) => {
                    if (e.target.closest('.strategy-info-btn') || e.target.closest('[data-tooltip]')) {
                        e.preventDefault();
                        this.showMobileTooltip(title, element);
                    }
                });
            }
        });

        // Add info buttons for mobile tooltip access
        document.querySelectorAll('.strategy-option').forEach(option => {
            if (this.isMobile && !option.querySelector('.mobile-info-btn')) {
                const infoBtn = document.createElement('button');
                infoBtn.className = 'mobile-info-btn absolute top-2 right-2 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200';
                infoBtn.innerHTML = '<i class="fas fa-info text-sm"></i>';
                infoBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showStrategyInfoModal(option.dataset.strategy);
                });
                
                option.style.position = 'relative';
                option.appendChild(infoBtn);
            }
        });
    }

    setupMobileScroll() {
        // Smooth scroll behavior for mobile
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Add scroll indicators for horizontal scrollable content
        document.querySelectorAll('.overflow-x-auto').forEach(container => {
            if (this.isMobile) {
                this.addScrollIndicator(container);
            }
        });

        // Prevent body scroll when modal is open
        this.preventBodyScroll = (prevent) => {
            if (prevent) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            } else {
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        };
    }

    addScrollIndicator(container) {
        const indicator = document.createElement('div');
        indicator.className = 'mobile-swipe-indicator';
        container.parentNode.insertBefore(indicator, container);

        // Hide indicator after first interaction
        let hasScrolled = false;
        container.addEventListener('scroll', () => {
            if (!hasScrolled) {
                indicator.style.display = 'none';
                hasScrolled = true;
            }
        }, { once: true });
    }

    setupTouchGestures() {
        if (!this.isMobile) return;

        // Add swipe gestures for broker comparison
        document.addEventListener('touchstart', (e) => {
            this.touchStartPos = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        });

        document.addEventListener('touchend', (e) => {
            if (!this.touchStartPos) return;

            const touchEndPos = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY
            };

            const deltaX = touchEndPos.x - this.touchStartPos.x;
            const deltaY = touchEndPos.y - this.touchStartPos.y;

            // Only handle horizontal swipes
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                const target = e.target.closest('.strategy-option');
                if (target) {
                    if (deltaX > 0) {
                        // Swipe right - show more info
                        this.showStrategyInfoModal(target.dataset.strategy);
                    }
                }
            }

            this.touchStartPos = null;
        });

        // Add pull-to-refresh gesture (disabled by default to prevent conflicts)
        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0 && e.touches[0].clientY > 50) {
                // Could add pull-to-refresh functionality here
            }
        });
    }

    setupResponsiveLayoutHandler() {
        // Handle window resize and orientation change
        const handleResize = () => {
            const wasDesktop = !this.isMobile && !this.isTablet;
            this.isMobile = window.innerWidth < 768;
            this.isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
            
            if (wasDesktop && (this.isMobile || this.isTablet)) {
                // Switched to mobile/tablet
                this.enableMobileLayout();
            } else if ((this.isMobile || this.isTablet) && window.innerWidth >= 1024) {
                // Switched to desktop
                this.enableDesktopLayout();
            }
            
            this.adjustLayoutForScreenSize();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', () => {
            setTimeout(handleResize, 100); // Delay to get correct dimensions
        });

        // Initial layout adjustment
        setTimeout(() => {
            this.adjustLayoutForScreenSize();
        }, 100);
    }

    setupMobileMenus() {
        if (!this.isMobile) return;

        // Add mobile navigation enhancements
        this.createMobileActionBar();
        this.enhanceMobileNavigation();
    }

    createMobileActionBar() {
        // Check if action bar already exists
        if (document.querySelector('.mobile-sticky-actions')) return;

        const actionBar = document.createElement('div');
        actionBar.className = 'mobile-sticky-actions hidden';
        actionBar.innerHTML = `
            <button id="mobile-run-simulation" class="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold w-full mb-2">
                <i class="fas fa-calculator mr-2"></i>Calculate Costs
            </button>
            <div class="flex space-x-2">
                <button id="mobile-export-results" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm" disabled>
                    <i class="fas fa-download mr-1"></i>Export
                </button>
                <button id="mobile-share-results" class="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm" disabled>
                    <i class="fas fa-share mr-1"></i>Share
                </button>
            </div>
        `;

        document.body.appendChild(actionBar);

        // Show action bar when enhanced UI is active
        const observer = new MutationObserver((mutations) => {
            const enhancedContainer = document.getElementById('enhanced-simulator-container');
            if (enhancedContainer && enhancedContainer.style.display !== 'none') {
                actionBar.classList.remove('hidden');
                // Add bottom padding to prevent content being hidden behind action bar
                document.body.style.paddingBottom = '100px';
            } else {
                actionBar.classList.add('hidden');
                document.body.style.paddingBottom = '';
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style']
        });

        // Connect mobile action buttons to existing functionality
        document.getElementById('mobile-run-simulation').addEventListener('click', () => {
            document.getElementById('run-enhanced-simulation')?.click();
        });

        document.getElementById('mobile-export-results').addEventListener('click', () => {
            document.getElementById('export-enhanced-results')?.click();
        });

        document.getElementById('mobile-share-results').addEventListener('click', () => {
            this.shareResults();
        });
    }

    enhanceMobileNavigation() {
        // Add breadcrumb navigation for mobile
        const nav = document.querySelector('nav');
        if (nav && this.isMobile) {
            const breadcrumb = document.createElement('div');
            breadcrumb.className = 'bg-gray-50 border-b px-4 py-2 text-sm text-gray-600';
            breadcrumb.innerHTML = `
                <div class="flex items-center space-x-2">
                    <a href="/" class="hover:text-blue-600">Home</a>
                    <i class="fas fa-chevron-right text-xs"></i>
                    <span class="font-medium">Trading Cost Simulator</span>
                </div>
            `;
            nav.after(breadcrumb);
        }
    }

    adjustLayoutForScreenSize() {
        const enhancedContainer = document.getElementById('enhanced-simulator-container');
        if (!enhancedContainer) return;

        if (this.isMobile) {
            // Mobile-specific adjustments
            this.adjustMobileLayout(enhancedContainer);
        } else if (this.isTablet) {
            // Tablet-specific adjustments
            this.adjustTabletLayout(enhancedContainer);
        } else {
            // Desktop layout
            this.adjustDesktopLayout(enhancedContainer);
        }
    }

    adjustMobileLayout(container) {
        // Stack all columns vertically
        const gridContainers = container.querySelectorAll('.grid');
        gridContainers.forEach(grid => {
            grid.style.gridTemplateColumns = '1fr';
            grid.style.gap = '16px';
        });

        // Make tables horizontally scrollable
        const tables = container.querySelectorAll('table');
        tables.forEach(table => {
            if (!table.parentElement.classList.contains('overflow-x-auto')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'overflow-x-auto';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
                
                // Add scroll indicator
                this.addScrollIndicator(wrapper);
            }
        });

        // Compact metric cards
        const metricCards = container.querySelectorAll('.summary-metrics .bg-white');
        metricCards.forEach(card => {
            card.style.padding = '16px';
        });

        // Enable sticky action bar
        const actionBar = document.querySelector('.mobile-sticky-actions');
        if (actionBar) {
            actionBar.classList.remove('hidden');
        }
    }

    adjustTabletLayout(container) {
        // Use 2-column layout for tablets
        const mainGrid = container.querySelector('.grid.lg\\:grid-cols-3');
        if (mainGrid) {
            mainGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        }

        // Allow horizontal scrolling for tables but with larger touch targets
        const tables = container.querySelectorAll('table');
        tables.forEach(table => {
            table.style.fontSize = '14px';
        });
    }

    adjustDesktopLayout(container) {
        // Reset to original desktop layout
        const gridContainers = container.querySelectorAll('.grid');
        gridContainers.forEach(grid => {
            grid.style.gridTemplateColumns = '';
            grid.style.gap = '';
        });

        // Hide mobile action bar
        const actionBar = document.querySelector('.mobile-sticky-actions');
        if (actionBar) {
            actionBar.classList.add('hidden');
        }

        document.body.style.paddingBottom = '';
    }

    enableMobileLayout() {
        document.body.classList.add('mobile-layout');
        this.addMobileStyles();
        this.createMobileActionBar();
    }

    enableDesktopLayout() {
        document.body.classList.remove('mobile-layout');
        const actionBar = document.querySelector('.mobile-sticky-actions');
        if (actionBar) {
            actionBar.classList.add('hidden');
        }
    }

    showMobileTooltip(content, element) {
        // Remove existing tooltips
        document.querySelectorAll('.mobile-tooltip').forEach(tooltip => tooltip.remove());

        const tooltip = document.createElement('div');
        tooltip.className = 'mobile-tooltip fixed bg-black text-white text-sm rounded-lg p-3 z-50 max-w-xs';
        tooltip.textContent = content;
        
        document.body.appendChild(tooltip);

        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.left = Math.max(10, rect.left - tooltip.offsetWidth / 2 + rect.width / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';

        // Auto-hide after 3 seconds
        setTimeout(() => {
            tooltip.remove();
        }, 3000);

        // Hide on tap outside
        const hideTooltip = (e) => {
            if (!tooltip.contains(e.target)) {
                tooltip.remove();
                document.removeEventListener('click', hideTooltip);
            }
        };
        document.addEventListener('click', hideTooltip);
    }

    showStrategyInfoModal(strategyId) {
        const engine = window.enhancedSimulatorUI?.engine;
        if (!engine) return;

        const strategy = engine.getStrategy(strategyId);
        if (!strategy) return;

        // Remove existing modals
        document.querySelectorAll('.mobile-modal').forEach(modal => modal.remove());

        const modal = document.createElement('div');
        modal.className = 'mobile-modal';
        modal.innerHTML = `
            <div class="mobile-modal-content">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold">${strategy.name}</h3>
                    <button class="close-modal text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <h4 class="font-semibold text-gray-700 mb-2">Description</h4>
                        <p class="text-gray-600">${strategy.description}</p>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-2">Key Details</h4>
                            <ul class="space-y-1 text-sm text-gray-600">
                                <li><strong>Holding Time:</strong> ${strategy.typicalHoldTime}</li>
                                <li><strong>Risk Level:</strong> ${strategy.riskProfile}</li>
                                <li><strong>Difficulty:</strong> ${strategy.difficultyLevel}</li>
                                <li><strong>Avg Trades/Day:</strong> ${strategy.typicalTradesPerDay}</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-2">Requirements</h4>
                            <ul class="space-y-1 text-sm text-gray-600">
                                <li><strong>Capital:</strong> ${strategy.requiredCapital}</li>
                                <li><strong>Spread Type:</strong> ${strategy.requiredSpreadType}</li>
                                <li><strong>Risk/Reward:</strong> ${strategy.averageRiskReward}</li>
                                <li><strong>Hours:</strong> ${strategy.tradingHours}</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-gray-700 mb-2">Cost Sensitivity</h4>
                        <div class="space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="text-sm">Spreads</span>
                                <div class="w-20 bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${strategy.costSensitivity.spread * 100}%"></div>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm">Commission</span>
                                <div class="w-20 bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-500 h-2 rounded-full" style="width: ${strategy.costSensitivity.commission * 100}%"></div>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm">Slippage</span>
                                <div class="w-20 bg-gray-200 rounded-full h-2">
                                    <div class="bg-yellow-500 h-2 rounded-full" style="width: ${strategy.costSensitivity.slippage * 100}%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 pt-4 border-t">
                    <button class="select-strategy-btn w-full bg-green-600 text-white py-3 rounded-lg font-semibold" data-strategy="${strategy.id}">
                        Select This Strategy
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.preventBodyScroll(true);

        // Event listeners
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
            this.preventBodyScroll(false);
        });

        modal.querySelector('.select-strategy-btn').addEventListener('click', () => {
            window.enhancedSimulatorUI.selectStrategy(strategyId);
            modal.remove();
            this.preventBodyScroll(false);
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                this.preventBodyScroll(false);
            }
        });
    }

    shareResults() {
        if (!navigator.share) {
            // Fallback for browsers without Web Share API
            this.copyResultsToClipboard();
            return;
        }

        const results = window.enhancedSimulatorUI?.results;
        if (!results || !results.length) {
            this.showMobileNotification('No results to share', 'error');
            return;
        }

        const bestBroker = results[0];
        const shareData = {
            title: 'Trading Cost Analysis Results',
            text: `Best broker: ${bestBroker.brokerName} with ${bestBroker.costs.totalCost}/month total cost. Compare brokers on BrokerAnalysis.`,
            url: window.location.href
        };

        navigator.share(shareData).catch(err => {
            console.error('Error sharing:', err);
            this.copyResultsToClipboard();
        });
    }

    copyResultsToClipboard() {
        const results = window.enhancedSimulatorUI?.results;
        if (!results || !results.length) return;

        const bestBroker = results[0];
        const textToShare = `Trading Cost Analysis Results:
        
Best Broker: ${bestBroker.brokerName}
Monthly Cost: $${bestBroker.costs.totalCost}
Cost per Trade: $${bestBroker.costs.costPerTrade}

Analyze your trading costs at: ${window.location.href}`;

        navigator.clipboard.writeText(textToShare).then(() => {
            this.showMobileNotification('Results copied to clipboard!', 'success');
        }).catch(() => {
            this.showMobileNotification('Unable to copy results', 'error');
        });
    }

    showMobileNotification(message, type = 'info') {
        const colors = {
            info: 'bg-blue-500',
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500'
        };

        const notification = document.createElement('div');
        notification.className = `fixed top-4 left-4 right-4 ${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg z-50 text-center`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateY(-100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize mobile optimizer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/simulator') {
        window.simulatorMobileOptimizer = new SimulatorMobileOptimizer();
    }
});

// Export for global access
window.SimulatorMobileOptimizer = SimulatorMobileOptimizer;