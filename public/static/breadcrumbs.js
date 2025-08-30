/**
 * Breadcrumb Navigation Component
 * Automatically generates breadcrumbs based on current page
 */

class BreadcrumbManager {
    constructor() {
        this.baseUrl = window.location.origin;
        this.init();
    }

    init() {
        this.createBreadcrumbs();
        this.addBreadcrumbSchema();
    }

    getBreadcrumbData() {
        const path = window.location.pathname;
        const pathSegments = path.split('/').filter(segment => segment);
        
        const breadcrumbs = [
            { name: 'Home', url: this.baseUrl }
        ];

        // Define page mappings
        const pageMap = {
            'reviews': 'Broker Reviews',
            'compare': 'Compare Brokers', 
            'simulator': 'Trading Calculator',
            'about': 'About Us',
            'dashboard': 'Dashboard',
            'broker': 'Broker Details'
        };

        // Build breadcrumb path
        let currentPath = '';
        pathSegments.forEach((segment, index) => {
            currentPath += `/${segment}`;
            
            if (pageMap[segment]) {
                breadcrumbs.push({
                    name: pageMap[segment],
                    url: `${this.baseUrl}${currentPath}`
                });
            } else if (segment.startsWith('broker-') || (pathSegments[index - 1] === 'broker')) {
                // Individual broker page
                const brokerName = this.formatBrokerName(segment);
                breadcrumbs.push({
                    name: `${brokerName} Review`,
                    url: `${this.baseUrl}${currentPath}`
                });
            }
        });

        return breadcrumbs;
    }

    formatBrokerName(slug) {
        return slug.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    createBreadcrumbs() {
        const breadcrumbs = this.getBreadcrumbData();
        
        // Don't show breadcrumbs on homepage
        if (breadcrumbs.length <= 1) return;

        const breadcrumbHtml = `
            <nav aria-label="Breadcrumb" class="breadcrumb-nav bg-blue-50 border-b border-blue-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <ol class="flex items-center space-x-2 text-sm">
                        ${breadcrumbs.map((crumb, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return `
                                <li class="flex items-center">
                                    ${index > 0 ? '<i class="fas fa-chevron-right text-blue-400 text-xs mx-2" aria-hidden="true"></i>' : ''}
                                    ${isLast 
                                        ? `<span class="text-blue-900 font-medium" aria-current="page">${crumb.name}</span>`
                                        : `<a href="${crumb.url}" class="text-blue-600 hover:text-blue-800 transition-colors">${crumb.name}</a>`
                                    }
                                </li>
                            `;
                        }).join('')}
                    </ol>
                </div>
            </nav>
        `;

        // Insert breadcrumb after navigation
        const nav = document.querySelector('nav[role="navigation"]');
        if (nav) {
            nav.insertAdjacentHTML('afterend', breadcrumbHtml);
        }
    }

    addBreadcrumbSchema() {
        const breadcrumbs = this.getBreadcrumbData();
        
        if (breadcrumbs.length <= 1) return;

        const schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": crumb.url
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }
}

// Initialize breadcrumbs when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BreadcrumbManager();
});