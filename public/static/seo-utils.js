/**
 * SEO Utilities for BrokerAnalysis
 * Handles dynamic SEO elements, structured data, and optimization
 */

class SEOManager {
    constructor() {
        this.baseUrl = window.location.origin;
        this.siteName = 'BrokerAnalysis';
        this.defaultImage = `${this.baseUrl}/static/images/brokeranalysis-og-image.png`;
        this.organizationSchema = this.getOrganizationSchema();
    }

    /**
     * Update page meta tags dynamically
     */
    updatePageMeta(config) {
        const {
            title,
            description,
            keywords,
            canonicalUrl,
            ogImage,
            ogType = 'website',
            twitterCard = 'summary_large_image'
        } = config;

        // Update title
        document.title = title;

        // Update or create meta tags
        this.setMetaTag('description', description);
        this.setMetaTag('keywords', keywords);
        
        // Canonical URL
        this.setLinkTag('canonical', canonicalUrl || window.location.href);
        
        // Open Graph tags
        this.setMetaProperty('og:title', title);
        this.setMetaProperty('og:description', description);
        this.setMetaProperty('og:image', ogImage || this.defaultImage);
        this.setMetaProperty('og:url', canonicalUrl || window.location.href);
        this.setMetaProperty('og:type', ogType);
        this.setMetaProperty('og:site_name', this.siteName);
        
        // Twitter Card tags
        this.setMetaProperty('twitter:card', twitterCard);
        this.setMetaProperty('twitter:title', title);
        this.setMetaProperty('twitter:description', description);
        this.setMetaProperty('twitter:image', ogImage || this.defaultImage);
    }

    /**
     * Add structured data to page
     */
    addStructuredData(schema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    /**
     * Get organization schema markup
     */
    getOrganizationSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BrokerAnalysis",
            "url": this.baseUrl,
            "logo": `${this.baseUrl}/static/images/brokeranalysis-logo.png`,
            "description": "Find and compare the best forex brokers with our intelligent recommendation system. Detailed reviews, ratings, and personalized broker matching.",
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "hello@brokeranalysis.com"
            },
            "sameAs": [
                "https://twitter.com/brokeranalysis",
                "https://linkedin.com/company/brokeranalysis"
            ]
        };
    }

    /**
     * Generate broker review schema
     */
    getBrokerReviewSchema(broker) {
        return {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
                "@type": "FinancialService",
                "name": broker.name,
                "image": broker.logo || `${this.baseUrl}/static/images/brokers/${broker.id}.png`,
                "url": `${this.baseUrl}/broker/${broker.slug || broker.id}`,
                "description": broker.description || `${broker.name} forex broker review and analysis`
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": broker.rating,
                "bestRating": "5",
                "worstRating": "1"
            },
            "author": {
                "@type": "Organization",
                "name": "BrokerAnalysis"
            },
            "publisher": {
                "@type": "Organization",
                "name": "BrokerAnalysis"
            },
            "datePublished": broker.reviewDate || new Date().toISOString(),
            "reviewBody": broker.reviewSummary || broker.verdict
        };
    }

    /**
     * Generate FAQ schema
     */
    getFAQSchema(faqs) {
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
    }

    /**
     * Generate breadcrumb schema
     */
    getBreadcrumbSchema(breadcrumbs) {
        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.url
            }))
        };
    }

    /**
     * Utility methods
     */
    setMetaTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    setMetaProperty(property, content) {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    setLinkTag(rel, href) {
        let link = document.querySelector(`link[rel="${rel}"]`);
        if (!link) {
            link = document.createElement('link');
            link.rel = rel;
            document.head.appendChild(link);
        }
        link.href = href;
    }

    /**
     * Initialize SEO for current page
     */
    initializePage() {
        // Add organization schema to all pages
        this.addStructuredData(this.organizationSchema);

        // Add skip navigation for accessibility
        this.addSkipNavigation();

        // Initialize based on current page
        const path = window.location.pathname;
        
        switch(path) {
            case '/':
                this.initializeHomepage();
                break;
            case '/reviews':
                this.initializeReviewsPage();
                break;
            case '/compare':
                this.initializeComparePage();
                break;
            case '/simulator':
                this.initializeSimulatorPage();
                break;
            case '/about':
                this.initializeAboutPage();
                break;
            default:
                if (path.startsWith('/broker/')) {
                    this.initializeBrokerPage();
                }
        }
    }

    /**
     * Add skip navigation for accessibility
     */
    addSkipNavigation() {
        const skipNav = document.createElement('a');
        skipNav.href = '#main-content';
        skipNav.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded';
        skipNav.textContent = 'Skip to main content';
        document.body.insertBefore(skipNav, document.body.firstChild);

        // Add main-content id to main section
        const mainContent = document.querySelector('#app') || document.querySelector('main');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
    }

    /**
     * Page-specific SEO initialization
     */
    initializeHomepage() {
        this.updatePageMeta({
            title: 'Best Forex Brokers 2025 - Compare 67+ Regulated Brokers | BrokerAnalysis',
            description: 'Find the perfect forex broker with our intelligent matching system. Compare spreads, regulation, and features of 67+ top-rated brokers. Get personalized recommendations now.',
            keywords: 'forex brokers, best forex brokers 2025, regulated forex brokers, forex broker comparison, forex trading, broker reviews'
        });

        // Add FAQ schema after DOM is loaded
        setTimeout(() => this.addHomepageFAQ(), 1000);
    }

    initializeReviewsPage() {
        this.updatePageMeta({
            title: 'Forex Broker Reviews 2025 - Detailed Analysis & Ratings | BrokerAnalysis',
            description: 'Read comprehensive reviews of top forex brokers. Detailed analysis of spreads, regulation, platforms, and trading conditions. Find the best broker for your needs.',
            keywords: 'forex broker reviews, broker ratings, forex broker analysis, trading platform reviews, regulated brokers'
        });
    }

    initializeComparePage() {
        this.updatePageMeta({
            title: 'Compare Forex Brokers Side-by-Side - Spreads, Fees & Features | BrokerAnalysis',
            description: 'Compare up to 4 forex brokers side-by-side. Analyze spreads, commissions, regulation, and trading features to make informed decisions.',
            keywords: 'compare forex brokers, broker comparison, forex spreads comparison, trading costs comparison'
        });
    }

    initializeSimulatorPage() {
        this.updatePageMeta({
            title: 'Forex Trading Cost Calculator - Compare Real Trading Costs | BrokerAnalysis',
            description: 'Calculate real forex trading costs with our advanced simulator. Compare spreads, commissions, and slippage across multiple brokers based on your trading strategy.',
            keywords: 'forex cost calculator, trading cost simulator, spread calculator, commission calculator, forex trading costs'
        });
    }

    initializeAboutPage() {
        this.updatePageMeta({
            title: 'About BrokerAnalysis - Our Methodology & Mission | BrokerAnalysis',
            description: 'Learn about our transparent methodology for rating forex brokers. Discover our mission to help traders make informed decisions with unbiased broker analysis.',
            keywords: 'about brokeranalysis, broker rating methodology, forex broker analysis, trading platform reviews'
        });
    }

    /**
     * Add FAQ section to homepage
     */
    addHomepageFAQ() {
        const faqs = [
            {
                question: "What makes a forex broker trustworthy?",
                answer: "A trustworthy forex broker is regulated by reputable financial authorities (FCA, ASIC, CFTC), offers transparent pricing, provides client fund protection, and has a proven track record of reliable operations."
            },
            {
                question: "How do I choose the best forex broker for my needs?",
                answer: "Consider your trading style, capital requirements, preferred platforms, and regulatory preferences. Use our broker matching tool to get personalized recommendations based on your specific needs."
            },
            {
                question: "What are the typical costs of forex trading?",
                answer: "Forex trading costs include spreads, commissions, overnight fees (swap), and potential slippage. Use our cost calculator to estimate your trading expenses with different brokers."
            },
            {
                question: "Are all forex brokers regulated?",
                answer: "No, not all forex brokers are regulated. Always verify a broker's regulatory status before opening an account. We only feature regulated brokers with proper oversight from financial authorities."
            },
            {
                question: "How often do you update broker information?",
                answer: "We update broker data weekly, including spreads, terms, and conditions. Regulatory information is verified monthly, and any significant changes are updated immediately."
            }
        ];

        // Add FAQ schema
        this.addStructuredData(this.getFAQSchema(faqs));

        // Add FAQ section to DOM if it doesn't exist
        if (!document.querySelector('.faq-section')) {
            const faqSection = this.createFAQSection(faqs);
            const featuresSection = document.querySelector('#app section:nth-child(3)');
            if (featuresSection) {
                featuresSection.insertAdjacentHTML('afterend', faqSection);
            }
        }
    }

    /**
     * Create FAQ section HTML
     */
    createFAQSection(faqs) {
        return `
        <section class="faq-section py-16 bg-white">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold mb-4 text-blue-900">Frequently Asked Questions</h2>
                    <p class="text-blue-600 max-w-2xl mx-auto">
                        Get answers to common questions about forex brokers and our recommendation process.
                    </p>
                </div>
                <div class="space-y-6">
                    ${faqs.map((faq, index) => `
                        <div class="bg-blue-50 border border-blue-200 rounded-lg">
                            <button class="faq-toggle w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-600" 
                                    data-faq="${index}" 
                                    aria-expanded="false"
                                    aria-controls="faq-answer-${index}">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-lg font-semibold text-blue-900">${faq.question}</h3>
                                    <i class="fas fa-chevron-down text-blue-600 transition-transform faq-chevron"></i>
                                </div>
                            </button>
                            <div id="faq-answer-${index}" class="faq-answer hidden px-6 pb-6" aria-labelledby="faq-toggle-${index}">
                                <p class="text-blue-700">${faq.answer}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>`;
    }
}

// Initialize SEO Manager
window.SEOManager = new SEOManager();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.SEOManager.initializePage();
    
    // Add FAQ toggle functionality
    document.addEventListener('click', (e) => {
        if (e.target.closest('.faq-toggle')) {
            const button = e.target.closest('.faq-toggle');
            const index = button.dataset.faq;
            const answer = document.getElementById(`faq-answer-${index}`);
            const chevron = button.querySelector('.faq-chevron');
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            // Toggle visibility
            if (isExpanded) {
                answer.classList.add('hidden');
                button.setAttribute('aria-expanded', 'false');
                chevron.style.transform = 'rotate(0deg)';
            } else {
                answer.classList.remove('hidden');
                button.setAttribute('aria-expanded', 'true');
                chevron.style.transform = 'rotate(180deg)';
            }
        }
    });
});