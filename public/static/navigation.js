// Enhanced Navigation System for BrokerAnalysis
// Creates a comprehensive dropdown menu system with 5 main menus

class NavigationSystem {
    constructor() {
        this.init();
    }

    init() {
        // Initialize navigation when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupNavigation());
        } else {
            this.setupNavigation();
        }
    }

    setupNavigation() {
        // Update all existing navigation instances
        this.updateNavigationMenus();
        // Setup event listeners for dropdowns
        this.setupDropdownListeners();
        // Setup mobile menu
        this.setupMobileMenu();
    }

    getNavigationStructure() {
        return {
            "Best Brokers": {
                icon: "fas fa-trophy",
                items: {
                    "Top 100 Forex Brokers": "/brokers/top-100",
                    "By Country": {
                        "Australia": "/brokers/australia",
                        "Canada": "/brokers/canada", 
                        "UK": "/brokers/uk",
                        "South Africa": "/brokers/south-africa",
                        "Pakistan": "/brokers/pakistan",
                        "Philippines": "/brokers/philippines",
                        "India": "/brokers/india",
                        "Malaysia": "/brokers/malaysia",
                        "Dubai": "/brokers/dubai",
                        "Qatar": "/brokers/qatar",
                        "Indonesia": "/brokers/indonesia",
                        "USA": "/brokers/usa"
                    }
                }
            },
            "Trading Types": {
                icon: "fas fa-chart-bar",
                items: {
                    "Gold (XAUUSD) Trading": "/brokers/gold-trading",
                    "Islamic Halal Trading": "/brokers/islamic-halal",
                    "Automated Forex Trading": "/brokers/automated",
                    "High Leverage Brokers": "/brokers/high-leverage",
                    "Oil Trading Platform": "/brokers/oil-trading",
                    "Copy Trading Platform": "/brokers/copy-trading",
                    "ECN Brokers": "/brokers/ecn",
                    "Scalping Forex Brokers": "/brokers/scalping",
                    "Forex Demo Accounts": "/brokers/demo-accounts",
                    "MT4 Brokers": "/brokers/mt4",
                    "Stocks Trading Platform": "/brokers/stocks",
                    "Forex Brokers For Beginners": "/brokers/beginners"
                }
            },
            "Reviews": {
                icon: "fas fa-star",
                items: {
                    "All Reviews": "/reviews",
                    "Trading Platforms": "/reviews/platforms", 
                    "Types of Forex Brokers": "/reviews/types",
                    "separator": true,
                    "Top Brokers": {
                        "FP Markets": "/reviews/fp-markets",
                        "FXTM": "/reviews/fxtm",
                        "Blackbull Markets": "/reviews/blackbull-markets",
                        "Eightcap": "/reviews/eightcap",
                        "Octa": "/reviews/octa",
                        "Plus500": "/reviews/plus500",
                        "Avatrade": "/reviews/avatrade",
                        "CFI": "/reviews/cfi",
                        "XM": "/reviews/xm",
                        "Pepperstone": "/reviews/pepperstone",
                        "PrimeXBT": "/reviews/primexbt"
                    }
                }
            },
            "Tools": {
                icon: "fas fa-tools",
                items: {
                    "Compare Brokers": "/compare",
                    "Trading Simulator": "/simulator",
                    "Broker Matcher": "/",
                    "separator": true,
                    "Calculators": {
                        "Profit Calculator": "/tools/profit-calculator",
                        "Margin Calculator": "/tools/margin-calculator", 
                        "Pip Calculator": "/tools/pip-calculator"
                    }
                }
            },
            "About": {
                icon: "fas fa-info-circle",
                items: {
                    "About Us": "/about",
                    "Methodology": "/methodology",
                    "Contact": "/contact",
                    "API": "/api-docs"
                }
            }
        };
    }

    generateNavigationHTML() {
        const structure = this.getNavigationStructure();
        let html = '';

        Object.entries(structure).forEach(([mainMenu, config]) => {
            const hasDropdown = Object.keys(config.items).length > 0;
            
            html += `
                <div class="relative group">
                    <button class="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors py-2 px-3 rounded-md nav-menu-button" 
                            data-menu="${mainMenu.toLowerCase().replace(/\s+/g, '-')}">
                        <i class="${config.icon} text-sm"></i>
                        <span class="font-medium">${mainMenu}</span>
                        ${hasDropdown ? '<i class="fas fa-chevron-down text-xs ml-1"></i>' : ''}
                    </button>
                    
                    ${hasDropdown ? this.generateDropdownHTML(config.items, mainMenu) : ''}
                </div>
            `;
        });

        return html;
    }

    generateDropdownHTML(items, parentMenu) {
        let html = `
            <div class="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
        `;

        Object.entries(items).forEach(([key, value]) => {
            if (key === 'separator') {
                html += '<hr class="my-1 border-gray-200">';
                return;
            }

            if (typeof value === 'string') {
                // Simple link
                html += `
                    <a href="${value}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors">
                        ${key}
                    </a>
                `;
            } else if (typeof value === 'object') {
                // Submenu
                html += `
                    <div class="relative submenu-container">
                        <div class="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-50 border-b border-gray-200">
                            ${key}
                        </div>
                        <div class="max-h-48 overflow-y-auto">
                `;
                
                Object.entries(value).forEach(([subKey, subValue]) => {
                    html += `
                        <a href="${subValue}" class="block px-6 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-primary transition-colors">
                            ${subKey}
                        </a>
                    `;
                });
                
                html += `
                        </div>
                    </div>
                `;
            }
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    updateNavigationMenus() {
        // Find all navigation containers and update them
        const navContainers = document.querySelectorAll('.hidden.md\\:flex.items-center.justify-center.flex-1');
        
        navContainers.forEach(container => {
            if (container.querySelector('a[href="/"]')) {
                // This is a main navigation container
                container.innerHTML = `
                    <div class="flex items-center space-x-2">
                        ${this.generateNavigationHTML()}
                    </div>
                `;
            }
        });

        // Also update mobile menu if it exists
        this.updateMobileMenu();
    }

    updateMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            const structure = this.getNavigationStructure();
            let html = '';

            Object.entries(structure).forEach(([mainMenu, config]) => {
                html += `
                    <div class="border-b border-gray-200 last:border-b-0">
                        <button class="w-full flex items-center justify-between py-3 px-4 text-left text-gray-700 hover:text-primary mobile-menu-toggle" 
                                data-menu="${mainMenu.toLowerCase().replace(/\s+/g, '-')}">
                            <div class="flex items-center space-x-2">
                                <i class="${config.icon} text-sm"></i>
                                <span class="font-medium">${mainMenu}</span>
                            </div>
                            <i class="fas fa-chevron-down text-xs transition-transform mobile-chevron"></i>
                        </button>
                        
                        <div class="mobile-submenu hidden bg-gray-50 pb-2">
                            ${this.generateMobileSubmenuHTML(config.items)}
                        </div>
                    </div>
                `;
            });

            mobileMenu.innerHTML = `<div class="px-2 py-2">${html}</div>`;
        }
    }

    generateMobileSubmenuHTML(items) {
        let html = '';

        Object.entries(items).forEach(([key, value]) => {
            if (key === 'separator') {
                html += '<hr class="my-2 border-gray-300">';
                return;
            }

            if (typeof value === 'string') {
                html += `
                    <a href="${value}" class="block py-2 px-6 text-sm text-gray-600 hover:text-primary">
                        ${key}
                    </a>
                `;
            } else if (typeof value === 'object') {
                html += `
                    <div class="px-6 py-1 text-xs font-semibold text-gray-500 uppercase">
                        ${key}
                    </div>
                `;
                Object.entries(value).forEach(([subKey, subValue]) => {
                    html += `
                        <a href="${subValue}" class="block py-2 px-8 text-sm text-gray-600 hover:text-primary">
                            ${subKey}
                        </a>
                    `;
                });
            }
        });

        return html;
    }

    setupDropdownListeners() {
        // Handle mobile menu toggles
        document.addEventListener('click', (e) => {
            if (e.target.matches('.mobile-menu-toggle') || e.target.closest('.mobile-menu-toggle')) {
                e.preventDefault();
                const button = e.target.matches('.mobile-menu-toggle') ? e.target : e.target.closest('.mobile-menu-toggle');
                const submenu = button.nextElementSibling;
                const chevron = button.querySelector('.mobile-chevron');
                
                if (submenu && chevron) {
                    submenu.classList.toggle('hidden');
                    chevron.classList.toggle('rotate-180');
                    
                    // Close other submenus
                    const allSubmenus = document.querySelectorAll('.mobile-submenu');
                    const allChevrons = document.querySelectorAll('.mobile-chevron');
                    
                    allSubmenus.forEach((menu, index) => {
                        if (menu !== submenu) {
                            menu.classList.add('hidden');
                            if (allChevrons[index]) {
                                allChevrons[index].classList.remove('rotate-180');
                            }
                        }
                    });
                }
            }
        });

        // Handle mobile menu button
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                mobileMenu.classList.toggle('hidden');
                
                // Reset all submenus when closing mobile menu
                if (mobileMenu.classList.contains('hidden')) {
                    const allSubmenus = document.querySelectorAll('.mobile-submenu');
                    const allChevrons = document.querySelectorAll('.mobile-chevron');
                    
                    allSubmenus.forEach((menu) => menu.classList.add('hidden'));
                    allChevrons.forEach((chevron) => chevron.classList.remove('rotate-180'));
                }
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            
            if (mobileMenu && mobileMenuBtn) {
                const isClickInsideMenu = mobileMenu.contains(e.target);
                const isClickOnMenuBtn = mobileMenuBtn.contains(e.target);
                
                if (!isClickInsideMenu && !isClickOnMenuBtn && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    
                    // Reset all submenus when closing mobile menu
                    const allSubmenus = document.querySelectorAll('.mobile-submenu');
                    const allChevrons = document.querySelectorAll('.mobile-chevron');
                    
                    allSubmenus.forEach((menu) => menu.classList.add('hidden'));
                    allChevrons.forEach((chevron) => chevron.classList.remove('rotate-180'));
                }
            }
        });
    }

    setupMobileMenu() {
        // Mobile menu is handled in setupDropdownListeners
        // This method can be extended for additional mobile-specific functionality
    }

    // Method to refresh navigation (useful for dynamic updates)
    refresh() {
        this.setupNavigation();
    }
}

// Initialize navigation system
window.navigationSystem = new NavigationSystem();

// Export for use in other scripts
window.NavigationSystem = NavigationSystem;