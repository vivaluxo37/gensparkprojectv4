export function renderHomePage(): string {
  return `
    <!-- Hero Section -->
    <section id="home" class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
                Find the Best <span class="text-yellow-400">Forex Brokers</span> in 2025
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Get personalized broker recommendations with our intelligent matching system. 
                Compare spreads, regulation, and features to make informed decisions.
            </p>
            <button data-action="broker-match" class="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors">
                <i class="fas fa-rocket mr-2"></i>
                Get My Broker Match
            </button>
        </div>
    </section>

    <!-- Broker Recommender Section -->
    <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div id="recommendation-widget" class="hidden">
                <div class="bg-blue-50 rounded-xl p-8 shadow-lg">
                    <h2 class="text-2xl font-bold mb-6 text-center">Smart Broker Recommendation</h2>
                    <div id="questionnaire-form">
                        <!-- Dynamic questionnaire will be loaded here -->
                    </div>
                    <div id="recommendations-results" class="hidden mt-8">
                        <!-- Recommendations will be displayed here -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-blue-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold mb-4">Why Choose BrokerAnalysis?</h2>
                <p class="text-blue-600 max-w-2xl mx-auto">
                    Our comprehensive platform provides everything you need to make informed broker selection decisions.
                </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-xl shadow-md text-center">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-brain text-2xl text-blue-600"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Smart Matching</h3>
                    <p class="text-blue-600">
                        AI-powered recommendation engine that matches you with brokers based on your specific needs and preferences.
                    </p>
                </div>
                
                <div class="bg-white p-6 rounded-xl shadow-md text-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-shield-alt text-2xl text-blue-800"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Verified Data</h3>
                    <p class="text-blue-600">
                        Comprehensive database of regulated brokers with verified ratings, spreads, and regulatory information.
                    </p>
                </div>
                
                <div class="bg-white p-6 rounded-xl shadow-md text-center">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-calculator text-2xl text-purple-600"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Cost Calculator</h3>
                    <p class="text-blue-600">
                        Strategy-aware cost calculator to estimate your real trading expenses with different brokers.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Brokers Section -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold mb-4">Featured Forex Brokers</h2>
                <p class="text-blue-600 max-w-2xl mx-auto">
                    Discover top-rated brokers with exclusive bonuses and competitive trading conditions.
                </p>
            </div>
            
            <div id="featured-brokers" class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <!-- Featured broker cards will be loaded here -->
            </div>
            
            <div class="text-center mt-8">
                <a href="/reviews" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    View All Brokers
                </a>
            </div>
        </div>
    </section>

    <!-- Quick Stats -->
    <section class="py-12 bg-blue-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <div class="text-3xl font-bold mb-2" id="total-brokers">12+</div>
                    <div class="text-blue-200">Brokers Analyzed</div>
                </div>
                <div>
                    <div class="text-3xl font-bold mb-2">100%</div>
                    <div class="text-blue-200">Regulated Brokers</div>
                </div>
                <div>
                    <div class="text-3xl font-bold mb-2">24/7</div>
                    <div class="text-blue-200">Analysis Available</div>
                </div>
                <div>
                    <div class="text-3xl font-bold mb-2">Free</div>
                    <div class="text-blue-200">Always Free</div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-bold mb-4">Ready to Find Your Perfect Broker?</h2>
            <p class="text-xl mb-8 text-green-100">
                Join thousands of traders who've found their ideal broker with BrokerAnalysis
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button data-action="broker-match" class="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Get Recommendations
                </button>
                <a href="/reviews" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors">
                    Browse All Brokers
                </a>
            </div>
        </div>
    </section>

    <!-- Smart Recommendation JavaScript -->
    <script src="/static/smart-recommendation.js"></script>
  `;
}