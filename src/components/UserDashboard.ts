import { html } from 'hono/html';

interface User {
    id: string;
    name: string;
    email: string;
}

interface BrokerMatch {
    id: string;
    userProfile: any;
    recommendations: any[];
    timestamp: string;
}

interface DashboardData {
    user: User;
    latestMatch?: BrokerMatch;
    brokerMatches: BrokerMatch[];
}

export function UserDashboard({ user, latestMatch, brokerMatches }: DashboardData) {
    const currentYear = new Date().getFullYear();
    
    // SEO-friendly structured data for dashboard
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Trading Dashboard - Best Trading Brokers",
        "applicationCategory": "FinanceApplication",
        "description": "Personalized trading dashboard with broker recommendations, cost calculators, and comprehensive trading resources for traders worldwide.",
        "url": "https://besttradingbrokers.com/dashboard",
        "provider": {
            "@type": "Organization", 
            "name": "Best Trading Brokers",
            "url": "https://besttradingbrokers.com"
        },
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free personalized trading broker recommendations and analysis tools"
        }
    };

    return html`
<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary SEO Meta Tags -->
    <title>Trading Dashboard - ${user.name} | Best Trading Brokers ${currentYear}</title>
    <meta name="title" content="Trading Dashboard - ${user.name} | Best Trading Brokers ${currentYear}">
    <meta name="description" content="Your personalized trading dashboard with broker recommendations, cost calculators, market analysis tools, and comprehensive trading resources. Updated for ${currentYear}.">
    <meta name="keywords" content="trading dashboard, broker recommendations, trading tools, cost calculator, forex analysis, ${currentYear} brokers">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Trading Dashboard - ${user.name} | Best Trading Brokers ${currentYear}">
    <meta property="og:description" content="Your personalized trading dashboard with broker recommendations, cost calculators, and comprehensive trading resources.">
    <meta property="og:image" content="/static/images/dashboard-og.png">
    <meta property="og:url" content="https://besttradingbrokers.com/dashboard">
    <meta property="og:site_name" content="Best Trading Brokers">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Trading Dashboard - ${user.name} | Best Trading Brokers ${currentYear}">
    <meta name="twitter:description" content="Your personalized trading dashboard with broker recommendations and trading tools.">
    <meta name="twitter:image" content="/static/images/dashboard-twitter.png">
    
    <!-- Additional SEO -->
    <link rel="canonical" href="https://besttradingbrokers.com/dashboard">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Best Trading Brokers">
    <meta name="revisit-after" content="7 days">
    
    <!-- Structured Data -->
    <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
    
    <!-- CSS -->
    <link rel="stylesheet" href="/static/css/tailwind-compiled.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    
    <!-- Additional Dashboard Styles -->
    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .card-hover {
            transition: all 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .stat-card {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .tool-card {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        .resource-card {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }
    </style>
</head>
<body class="h-full bg-gray-50">
    <!-- Breadcrumb Navigation -->
    <nav class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <a href="/" class="flex items-center">
                        <img src="/static/images/logo.png" alt="Best Trading Brokers" class="h-8 w-auto mr-3"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="h-8 w-8 bg-blue-600 rounded hidden items-center justify-center text-white font-bold text-sm mr-3">BTB</div>
                        <span class="font-bold text-xl text-gray-900">Best Trading Brokers</span>
                    </a>
                </div>
                
                <div class="flex items-center space-x-4">
                    <span class="text-gray-700">Welcome, ${user.name}</span>
                    <a href="/api/auth/logout" class="text-blue-600 hover:text-blue-700">
                        <i class="fas fa-sign-out-alt mr-1"></i>Logout
                    </a>
                </div>
            </div>
            
            <!-- Breadcrumb -->
            <div class="py-2">
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="flex items-center space-x-1 text-sm text-gray-500">
                        <li>
                            <a href="/" class="hover:text-gray-700">Home</a>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-chevron-right mx-2 text-xs"></i>
                            <span class="text-gray-900 font-medium">Dashboard</span>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header Section -->
        <div class="mb-8">
            <div class="gradient-bg rounded-2xl p-8 text-white">
                <h1 class="text-4xl font-bold mb-4">
                    <i class="fas fa-tachometer-alt mr-3"></i>Your Trading Dashboard
                </h1>
                <p class="text-xl opacity-90 mb-6">
                    Comprehensive trading tools and personalized broker recommendations for ${currentYear}
                </p>
                
                ${latestMatch ? html`
                    <div class="bg-white/20 rounded-lg p-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-semibold mb-1">Latest Broker Match</h3>
                                <p class="text-sm opacity-90">
                                    ${latestMatch.recommendations.length} perfect brokers found on ${new Date(latestMatch.timestamp).toLocaleDateString()}
                                </p>
                            </div>
                            <a href="#recommendations" class="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                View Results
                            </a>
                        </div>
                    </div>
                ` : html`
                    <div class="bg-white/20 rounded-lg p-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-semibold mb-1">Get Started</h3>
                                <p class="text-sm opacity-90">Take our intelligent questionnaire to find your perfect brokers</p>
                            </div>
                            <a href="/#recommendation-widget" class="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                Find My Brokers
                            </a>
                        </div>
                    </div>
                `}
            </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="stat-card rounded-xl p-6 text-white card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-semibold">Broker Matches</h3>
                        <p class="text-3xl font-bold">${brokerMatches.length}</p>
                    </div>
                    <i class="fas fa-chart-line text-3xl opacity-80"></i>
                </div>
            </div>
            
            <div class="tool-card rounded-xl p-6 text-white card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-semibold">Available Tools</h3>
                        <p class="text-3xl font-bold">12</p>
                    </div>
                    <i class="fas fa-tools text-3xl opacity-80"></i>
                </div>
            </div>
            
            <div class="resource-card rounded-xl p-6 text-white card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-semibold">Resources</h3>
                        <p class="text-3xl font-bold">50+</p>
                    </div>
                    <i class="fas fa-book text-3xl opacity-80"></i>
                </div>
            </div>
            
            <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white card-hover">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-semibold">Market Status</h3>
                        <p class="text-lg font-medium">Live</p>
                    </div>
                    <i class="fas fa-globe text-3xl opacity-80"></i>
                </div>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Recommendations & Tools -->
            <div class="lg:col-span-2 space-y-8">
                <!-- Broker Recommendations -->
                <div id="recommendations" class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-2xl font-bold mb-6 flex items-center">
                        <i class="fas fa-star text-yellow-500 mr-3"></i>Your Broker Recommendations
                    </h2>
                    
                    ${latestMatch && latestMatch.recommendations.length > 0 ? 
                        this.renderRecommendations(latestMatch.recommendations) : 
                        html`
                            <div class="text-center py-12">
                                <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                                <h3 class="text-xl font-semibold text-gray-600 mb-2">No Recommendations Yet</h3>
                                <p class="text-gray-500 mb-6">Take our intelligent questionnaire to get personalized broker recommendations</p>
                                <a href="/#recommendation-widget" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                    <i class="fas fa-rocket mr-2"></i>Get My Recommendations
                                </a>
                            </div>
                        `
                    }
                </div>

                <!-- Trading Tools -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-2xl font-bold mb-6 flex items-center">
                        <i class="fas fa-calculator text-blue-500 mr-3"></i>Trading Tools
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a href="/compare" class="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all card-hover">
                            <div class="flex items-center mb-3">
                                <i class="fas fa-balance-scale text-2xl text-blue-600 mr-3"></i>
                                <h3 class="font-semibold">Broker Comparison</h3>
                            </div>
                            <p class="text-gray-600 text-sm">Compare up to 4 brokers side-by-side</p>
                        </a>
                        
                        <a href="/simulator" class="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all card-hover">
                            <div class="flex items-center mb-3">
                                <i class="fas fa-calculator text-2xl text-green-600 mr-3"></i>
                                <h3 class="font-semibold">Cost Calculator</h3>
                            </div>
                            <p class="text-gray-600 text-sm">Calculate trading costs and savings</p>
                        </a>
                        
                        <div class="block p-4 border border-gray-200 rounded-lg card-hover">
                            <div class="flex items-center mb-3">
                                <i class="fas fa-chart-line text-2xl text-purple-600 mr-3"></i>
                                <h3 class="font-semibold">Market Analysis</h3>
                            </div>
                            <p class="text-gray-600 text-sm">Real-time market insights</p>
                            <span class="text-xs text-orange-600 font-medium">Coming Soon</span>
                        </div>
                        
                        <div class="block p-4 border border-gray-200 rounded-lg card-hover">
                            <div class="flex items-center mb-3">
                                <i class="fas fa-robot text-2xl text-indigo-600 mr-3"></i>
                                <h3 class="font-semibold">AI Trading Assistant</h3>
                            </div>
                            <p class="text-gray-600 text-sm">AI-powered trading insights</p>
                            <span class="text-xs text-orange-600 font-medium">Coming Soon</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column - Resources & Quick Links -->
            <div class="space-y-8">
                <!-- Quick Actions -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-bold mb-4 flex items-center">
                        <i class="fas fa-bolt text-yellow-500 mr-2"></i>Quick Actions
                    </h2>
                    
                    <div class="space-y-3">
                        <a href="/#recommendation-widget" class="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            <i class="fas fa-search mr-2"></i>Find New Brokers
                        </a>
                        
                        <a href="/brokers" class="block w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                            <i class="fas fa-list mr-2"></i>Browse All Brokers
                        </a>
                        
                        <a href="/reviews" class="block w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                            <i class="fas fa-star mr-2"></i>Read Reviews
                        </a>
                    </div>
                </div>

                <!-- External Resources -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-bold mb-4 flex items-center">
                        <i class="fas fa-external-link-alt text-green-500 mr-2"></i>Trading Resources
                    </h2>
                    
                    <div class="space-y-4">
                        <div>
                            <h3 class="font-semibold mb-2">Market Data & News</h3>
                            <div class="space-y-2 text-sm">
                                <a href="https://finance.yahoo.com" target="_blank" rel="noopener" class="block text-blue-600 hover:text-blue-700">
                                    <i class="fas fa-chart-line mr-1"></i>Yahoo Finance
                                </a>
                                <a href="https://www.bloomberg.com" target="_blank" rel="noopener" class="block text-blue-600 hover:text-blue-700">
                                    <i class="fas fa-newspaper mr-1"></i>Bloomberg Markets
                                </a>
                                <a href="https://www.marketwatch.com" target="_blank" rel="noopener" class="block text-blue-600 hover:text-blue-700">
                                    <i class="fas fa-globe mr-1"></i>MarketWatch
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h3 class="font-semibold mb-2">Education</h3>
                            <div class="space-y-2 text-sm">
                                <a href="https://www.investopedia.com" target="_blank" rel="noopener" class="block text-blue-600 hover:text-blue-700">
                                    <i class="fas fa-book mr-1"></i>Investopedia
                                </a>
                                <a href="https://www.babypips.com" target="_blank" rel="noopener" class="block text-blue-600 hover:text-blue-700">
                                    <i class="fas fa-graduation-cap mr-1"></i>BabyPips Forex Course
                                </a>
                                <a href="https://www.tradingview.com/ideas/" target="_blank" rel="noopener" class="block text-blue-600 hover:text-blue-700">
                                    <i class="fas fa-lightbulb mr-1"></i>TradingView Ideas
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h3 class="font-semibold mb-2">Analysis Tools</h3>
                            <div class="space-y-2 text-sm">
                                <a href="https://www.tradingview.com" target="_blank" rel="noopener" class="block text-blue-600 hover:text-blue-700">
                                    <i class="fas fa-chart-area mr-1"></i>TradingView Charts
                                </a>
                                <a href="https://www.myfxbook.com" target="_blank" rel="noopener" class="block text-blue-600 hover:text-blue-700">
                                    <i class="fas fa-calculator mr-1"></i>Myfxbook Calculator
                                </a>
                                <a href="https://www.forexfactory.com" target="_blank" rel="noopener" class="block text-blue-600 hover:text-blue-700">
                                    <i class="fas fa-calendar mr-1"></i>Forex Factory Calendar
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h3 class="font-semibold mb-2">Regulation & Safety</h3>
                            <div class="space-y-2 text-sm">
                                <a href="https://www.cftc.gov" target="_blank" rel="noopener" class="block text-blue-600 hover:text-blue-700">
                                    <i class="fas fa-shield-alt mr-1"></i>CFTC (US)
                                </a>
                                <a href="https://www.fca.org.uk" target="_blank" rel="noopener" class="block text-blue-600 hover:text-blue-700">
                                    <i class="fas fa-shield-alt mr-1"></i>FCA (UK)
                                </a>
                                <a href="https://www.esma.europa.eu" target="_blank" rel="noopener" class="block text-blue-600 hover:text-blue-700">
                                    <i class="fas fa-shield-alt mr-1"></i>ESMA (EU)
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-bold mb-4 flex items-center">
                        <i class="fas fa-history text-gray-500 mr-2"></i>Recent Activity
                    </h2>
                    
                    <div class="space-y-3">
                        ${brokerMatches.slice(0, 3).map(match => html`
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p class="font-medium text-sm">Broker Match</p>
                                    <p class="text-xs text-gray-500">${new Date(match.timestamp).toLocaleDateString()}</p>
                                </div>
                                <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                    ${match.recommendations.length} found
                                </span>
                            </div>
                        `)}
                        
                        ${brokerMatches.length === 0 ? html`
                            <p class="text-gray-500 text-sm text-center py-4">No recent activity</p>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="text-center">
                <p class="text-gray-400">
                    © ${currentYear} Best Trading Brokers. Your trusted source for broker comparisons and trading tools.
                </p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="/static/smart-recommendation.js"></script>
    
    <!-- Dashboard Analytics -->
    <script>
        // Track dashboard page view
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: 'Trading Dashboard',
                page_location: window.location.href
            });
        }
        
        // Initialize dashboard features
        document.addEventListener('DOMContentLoaded', function() {
            console.log('✅ Trading Dashboard loaded for user: ${user.name}');
        });
    </script>
</body>
</html>
    `;
}

UserDashboard.prototype.renderRecommendations = function(recommendations: any[]) {
    const topRecommendations = recommendations.slice(0, 3);
    
    return html`
        <div class="space-y-4">
            ${topRecommendations.map((rec: any, index: number) => {
                const { broker, score, reasoning } = rec;
                const matchPercentage = Math.min(Math.round(score), 100);
                
                const getMatchLevel = (score: number) => {
                    if (score >= 90) return { level: 'Excellent', color: 'green' };
                    if (score >= 80) return { level: 'Very Good', color: 'blue' };  
                    if (score >= 70) return { level: 'Good', color: 'yellow' };
                    return { level: 'Fair', color: 'gray' };
                };

                const match = getMatchLevel(matchPercentage);
                const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
                
                return html`
                    <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all card-hover ${index === 0 ? 'border-yellow-400 bg-yellow-50' : ''}">
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
                                    <h3 class="text-xl font-bold text-gray-900 flex items-center">
                                        ${medal} ${broker.name}
                                        ${index === 0 ? html`<span class="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">BEST MATCH</span>` : ''}
                                    </h3>
                                    <div class="flex items-center mt-2">
                                        <span class="text-${match.color}-600 font-semibold">${match.level} Match</span>
                                        <span class="ml-3 text-2xl font-bold text-${match.color}-600">${matchPercentage}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <p class="text-gray-700">${reasoning}</p>
                        </div>

                        <div class="flex flex-wrap gap-2 mb-4">
                            ${broker.regulatedBy?.map((reg: string) => html`
                                <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">${reg}</span>
                            `)}
                        </div>

                        <div class="flex space-x-3">
                            <a href="/brokers/${broker.slug}" 
                               class="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                <i class="fas fa-info-circle mr-1"></i>Full Review
                            </a>
                            <a href="${broker.website}" target="_blank" rel="noopener" 
                               class="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                                <i class="fas fa-external-link-alt mr-1"></i>Visit Broker
                            </a>
                        </div>
                    </div>
                `;
            })}
        </div>
        
        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 class="font-semibold text-blue-900 mb-3">Next Steps:</h4>
            <div class="grid md:grid-cols-3 gap-3">
                <a href="/compare?brokers=${topRecommendations.map(r => r.broker.id).join(',')}" 
                   class="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow text-center">
                    <i class="fas fa-balance-scale text-xl text-blue-600 mb-1"></i>
                    <div class="font-medium text-sm">Compare Details</div>
                </a>
                <a href="/simulator?brokers=${topRecommendations.map(r => r.broker.id).join(',')}" 
                   class="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow text-center">
                    <i class="fas fa-calculator text-xl text-green-600 mb-1"></i>
                    <div class="font-medium text-sm">Calculate Costs</div>
                </a>
                <a href="/brokers" 
                   class="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow text-center">
                    <i class="fas fa-list text-xl text-purple-600 mb-1"></i>
                    <div class="font-medium text-sm">Browse All</div>
                </a>
            </div>
        </div>
    `;
};