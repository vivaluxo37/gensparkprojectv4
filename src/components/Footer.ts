// Comprehensive Footer Component - 2025 Redesign with Complete Site Accessibility
export function generateCompleteFooter(): string {
  return `
    <!-- Enhanced Comprehensive Footer -->
    <footer class="bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <!-- Main Footer Content -->
            <div class="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-8">
                
                <!-- Column 1: Company & Brand -->
                <div class="lg:col-span-1">
                    <div class="flex items-center space-x-2 mb-6">
                        <i class="fas fa-chart-line text-blue-400 text-3xl"></i>
                        <div>
                            <div class="text-xl font-bold">BrokerAnalysis</div>
                            <div class="text-xs text-blue-400">Find Your Perfect Broker</div>
                        </div>
                    </div>
                    <p class="text-gray-400 mb-6 text-sm leading-relaxed">
                        The world's most comprehensive forex broker comparison platform. 
                        Powered by AI, trusted by 50,000+ traders worldwide.
                    </p>
                    
                    <div class="mb-6">
                        <h4 class="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-3">Company</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="/about" class="text-gray-400 hover:text-blue-400 transition-colors">About BrokerAnalysis</a></li>
                            <li><a href="/about#methodology" class="text-gray-400 hover:text-blue-400 transition-colors">Our Methodology</a></li>
                            <li><a href="/about#team" class="text-gray-400 hover:text-blue-400 transition-colors">Expert Team</a></li>
                            <li><a href="/contact" class="text-gray-400 hover:text-blue-400 transition-colors">Contact Us</a></li>
                            <li><a href="/careers" class="text-gray-400 hover:text-blue-400 transition-colors">Careers</a></li>
                            <li><a href="/press" class="text-gray-400 hover:text-blue-400 transition-colors">Press Kit</a></li>
                        </ul>
                    </div>
                </div>
                
                <!-- Column 2: Find Brokers -->
                <div class="lg:col-span-1">
                    <h3 class="font-bold text-lg mb-6 text-blue-400">🏢 Find Brokers</h3>
                    
                    <div class="mb-6">
                        <h4 class="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-3">Browse & Reviews</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="/reviews" class="text-gray-400 hover:text-white transition-colors">⭐ All Broker Reviews</a></li>
                            <li><a href="/brokers" class="text-gray-400 hover:text-white transition-colors">📋 Brokers Directory</a></li>
                            <li><a href="/brokers/beginners" class="text-gray-400 hover:text-white transition-colors">🎓 Beginner Brokers</a></li>
                            <li><a href="/brokers/ecn" class="text-gray-400 hover:text-white transition-colors">🏦 ECN Brokers</a></li>
                            <li><a href="/brokers/islamic-accounts" class="text-gray-400 hover:text-white transition-colors">🕌 Islamic Accounts</a></li>
                            <li><a href="/brokers/high-leverage" class="text-gray-400 hover:text-white transition-colors">📈 High Leverage</a></li>
                        </ul>
                    </div>
                    
                    <div class="mb-6">
                        <h4 class="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-3">Trading Styles</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="/brokers/scalping" class="text-gray-400 hover:text-white transition-colors">⚡ Scalping Brokers</a></li>
                            <li><a href="/brokers/copy-trading" class="text-gray-400 hover:text-white transition-colors">👥 Copy Trading</a></li>
                            <li><a href="/brokers/automated-trading" class="text-gray-400 hover:text-white transition-colors">🤖 Automated Trading</a></li>
                            <li><a href="/brokers/gold-trading" class="text-gray-400 hover:text-white transition-colors">🥇 Gold Trading</a></li>
                            <li><a href="/brokers/oil-trading" class="text-gray-400 hover:text-white transition-colors">🛢️ Oil Trading</a></li>
                            <li><a href="/brokers/stock-trading" class="text-gray-400 hover:text-white transition-colors">📊 Stock Trading</a></li>
                        </ul>
                    </div>
                </div>
                
                <!-- Column 3: Compare & Tools -->
                <div class="lg:col-span-1">
                    <h3 class="font-bold text-lg mb-6 text-green-400">📊 Compare & Tools</h3>
                    
                    <div class="mb-6">
                        <h4 class="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-3">Smart Tools</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="/" class="text-gray-400 hover:text-white transition-colors font-medium">🧠 AI Broker Matcher</a></li>
                            <li><a href="/compare" class="text-gray-400 hover:text-white transition-colors font-medium">⚖️ Broker Comparison</a></li>
                            <li><a href="/simulator" class="text-gray-400 hover:text-white transition-colors font-medium">💰 Cost Calculator</a></li>
                            <li><a href="/brokers/demo-accounts" class="text-gray-400 hover:text-white transition-colors">🎮 Demo Accounts</a></li>
                            <li><a href="/brokers/mt4" class="text-gray-400 hover:text-white transition-colors">💻 MT4 Brokers</a></li>
                        </ul>
                    </div>
                    
                    <div class="mb-6">
                        <h4 class="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-3">Calculators</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="/calculators#profit" class="text-gray-400 hover:text-white transition-colors">📈 Profit Calculator</a></li>
                            <li><a href="/calculators#margin" class="text-gray-400 hover:text-white transition-colors">📊 Margin Calculator</a></li>
                            <li><a href="/calculators#pip" class="text-gray-400 hover:text-white transition-colors">📏 Pip Calculator</a></li>
                            <li><a href="/calculators#position" class="text-gray-400 hover:text-white transition-colors">⚖️ Position Size</a></li>
                            <li><a href="/api-docs" class="text-gray-400 hover:text-white transition-colors">🔗 API Documentation</a></li>
                        </ul>
                    </div>
                </div>
                
                <!-- Column 4: Resources & Learning -->
                <div class="lg:col-span-1">
                    <h3 class="font-bold text-lg mb-6 text-purple-400">📚 Resources</h3>
                    
                    <div class="mb-6">
                        <h4 class="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-3">Education Hub</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="/about#choosing-brokers" class="text-gray-400 hover:text-white transition-colors">🧭 Broker Selection Guide</a></li>
                            <li><a href="/about#regulation-guide" class="text-gray-400 hover:text-white transition-colors">🛡️ Regulation Explained</a></li>
                            <li><a href="/about#trading-costs" class="text-gray-400 hover:text-white transition-colors">💰 Understanding Costs</a></li>
                            <li><a href="/trading-guides" class="text-gray-400 hover:text-white transition-colors">📖 Trading Guides</a></li>
                            <li><a href="/market-analysis" class="text-gray-400 hover:text-white transition-colors">📊 Market Analysis</a></li>
                            <li><a href="/glossary" class="text-gray-400 hover:text-white transition-colors">📝 Forex Glossary</a></li>
                        </ul>
                    </div>
                    
                    <div class="mb-6">
                        <h4 class="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-3">Support & FAQ</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="/#faq" class="text-gray-400 hover:text-white transition-colors">❓ FAQ</a></li>
                            <li><a href="/contact" class="text-gray-400 hover:text-white transition-colors">📧 Contact Support</a></li>
                            <li><a href="/help" class="text-gray-400 hover:text-white transition-colors">🆘 Help Center</a></li>
                            <li><a href="/feedback" class="text-gray-400 hover:text-white transition-colors">💬 Send Feedback</a></li>
                            <li><a href="/sitemap.xml" class="text-gray-400 hover:text-white transition-colors">🗺️ Sitemap</a></li>
                        </ul>
                    </div>
                </div>
                
                <!-- Column 5: Countries & Popular -->
                <div class="lg:col-span-1">
                    <h3 class="font-bold text-lg mb-6 text-orange-400">🌍 By Country</h3>
                    
                    <div class="mb-6">
                        <h4 class="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-3">Popular Countries</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="/countries/usa" class="text-gray-400 hover:text-white transition-colors">🇺🇸 USA (CFTC/NFA)</a></li>
                            <li><a href="/countries/uk" class="text-gray-400 hover:text-white transition-colors">🇬🇧 UK (FCA)</a></li>
                            <li><a href="/countries/australia" class="text-gray-400 hover:text-white transition-colors">🇦🇺 Australia (ASIC)</a></li>
                            <li><a href="/countries/canada" class="text-gray-400 hover:text-white transition-colors">🇨🇦 Canada (CIRO)</a></li>
                            <li><a href="/countries/singapore" class="text-gray-400 hover:text-white transition-colors">🇸🇬 Singapore (MAS)</a></li>
                            <li><a href="/countries/dubai" class="text-gray-400 hover:text-white transition-colors">🇦🇪 Dubai (DFSA)</a></li>
                            <li><a href="/countries/south-africa" class="text-gray-400 hover:text-white transition-colors">🇿🇦 South Africa (FSCA)</a></li>
                            <li><a href="/countries/india" class="text-gray-400 hover:text-white transition-colors">🇮🇳 India (SEBI)</a></li>
                            <li><a href="/countries/malaysia" class="text-gray-400 hover:text-white transition-colors">🇲🇾 Malaysia (SC)</a></li>
                            <li><a href="/countries/pakistan" class="text-gray-400 hover:text-white transition-colors">🇵🇰 Pakistan (SECP)</a></li>
                            <li><a href="/countries/philippines" class="text-gray-400 hover:text-white transition-colors">🇵🇭 Philippines (BSP)</a></li>
                            <li><a href="/countries" class="text-gray-400 hover:text-orange-400 transition-colors font-medium">📍 View All Countries →</a></li>
                        </ul>
                    </div>
                </div>
                
                <!-- Column 6: Quick Access & Popular -->
                <div class="lg:col-span-1">
                    <h3 class="font-bold text-lg mb-6 text-yellow-400">⚡ Quick Access</h3>
                    
                    <div class="mb-6">
                        <h4 class="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-3">Top Actions</h4>
                        <ul class="space-y-2 text-sm">
                            <li>
                                <button data-action="broker-match" class="text-left text-gray-400 hover:text-yellow-400 transition-colors font-medium">
                                    🚀 Start Broker Match
                                </button>
                            </li>
                            <li><a href="/compare?top=ic-markets,pepperstone,oanda" class="text-gray-400 hover:text-yellow-400 transition-colors">🥊 Compare Top 3</a></li>
                            <li><a href="/simulator" class="text-gray-400 hover:text-yellow-400 transition-colors">🧮 Calculate Costs</a></li>
                            <li><a href="/reviews?sort=rating" class="text-gray-400 hover:text-yellow-400 transition-colors">⭐ View Top Rated</a></li>
                        </ul>
                    </div>
                    
                    <div class="mb-6">
                        <h4 class="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-3">Top Brokers</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="/reviews/ic-markets" class="text-gray-400 hover:text-white transition-colors">🥇 IC Markets (4.8/5)</a></li>
                            <li><a href="/reviews/pepperstone" class="text-gray-400 hover:text-white transition-colors">🥈 Pepperstone (4.7/5)</a></li>
                            <li><a href="/reviews/oanda" class="text-gray-400 hover:text-white transition-colors">🥉 OANDA (4.6/5)</a></li>
                            <li><a href="/reviews/interactive-brokers" class="text-gray-400 hover:text-white transition-colors">🏆 Interactive Brokers</a></li>
                            <li><a href="/reviews/xm-group" class="text-gray-400 hover:text-white transition-colors">⭐ XM Group</a></li>
                        </ul>
                    </div>
                    
                    <div class="mb-6">
                        <h4 class="font-semibold text-sm uppercase tracking-wide text-gray-300 mb-3">Trending Now</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="/trending/best-brokers-2025" class="text-gray-400 hover:text-white transition-colors">🔥 Best Brokers 2025</a></li>
                            <li><a href="/trending/new-reviews" class="text-gray-400 hover:text-white transition-colors">📰 New Reviews</a></li>
                            <li><a href="/trending/regulation-updates" class="text-gray-400 hover:text-white transition-colors">📋 Regulation Updates</a></li>
                        </ul>
                    </div>
                    
                    <!-- Newsletter Signup with Enhanced Accessibility -->
                    <div class="bg-gradient-to-br from-blue-800/30 to-purple-800/30 rounded-lg p-4 border border-blue-700/30" role="form" aria-labelledby="newsletter-title">
                        <h4 id="newsletter-title" class="font-semibold text-sm mb-2 text-blue-300">📧 Stay Updated</h4>
                        <p class="text-xs text-gray-400 mb-3" id="newsletter-description">Get weekly broker insights & market updates</p>
                        <form class="flex flex-col space-y-2" onsubmit="handleNewsletterSubscription(event)" novalidate>
                            <label for="newsletter-email" class="sr-only">Email address for newsletter subscription</label>
                            <input 
                                type="email" 
                                id="newsletter-email"
                                name="email"
                                placeholder="Your email" 
                                class="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50" 
                                aria-describedby="newsletter-description newsletter-error"
                                required
                                autocomplete="email">
                            <div id="newsletter-error" class="hidden text-xs text-red-400" role="alert" aria-live="polite"></div>
                            <button 
                                type="submit" 
                                class="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white text-sm font-medium py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                aria-describedby="newsletter-description">
                                <span class="flex items-center justify-center">
                                    <i class="fas fa-envelope mr-2" aria-hidden="true"></i>
                                    Subscribe
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            <!-- Social Media & Connect -->
            <div class="border-t border-gray-800 mt-12 pt-8">
                <div class="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div>
                        <h4 class="font-semibold mb-4 text-gray-300">Connect With Us</h4>
                        <div class="flex space-x-4">
                            <a href="https://twitter.com/brokeranalysis" class="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors" aria-label="Follow us on Twitter">
                                <i class="fab fa-twitter text-xl text-white"></i>
                            </a>
                            <a href="https://linkedin.com/company/brokeranalysis" class="w-12 h-12 bg-blue-800 hover:bg-blue-900 rounded-full flex items-center justify-center transition-colors" aria-label="Connect on LinkedIn">
                                <i class="fab fa-linkedin text-xl text-white"></i>
                            </a>
                            <a href="https://facebook.com/brokeranalysis" class="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors" aria-label="Follow us on Facebook">
                                <i class="fab fa-facebook text-xl text-white"></i>
                            </a>
                            <a href="https://youtube.com/brokeranalysis" class="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors" aria-label="Subscribe on YouTube">
                                <i class="fab fa-youtube text-xl text-white"></i>
                            </a>
                            <a href="https://telegram.me/brokeranalysis" class="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors" aria-label="Join our Telegram">
                                <i class="fab fa-telegram text-xl text-white"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div class="text-right mt-6 md:mt-0">
                        <div class="text-sm text-gray-400 mb-2">🌟 Trusted by traders worldwide</div>
                        <div class="flex items-center space-x-4 text-sm">
                            <span class="text-yellow-400">⭐⭐⭐⭐⭐</span>
                            <span class="text-gray-300">4.9/5 from 12,000+ reviews</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Bottom Footer Bar -->
            <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
                <div class="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div class="mb-4 md:mb-0">
                        <p class="text-sm">
                            &copy; 2025 BrokerAnalysis. All rights reserved. | 
                            <span class="text-blue-400 font-medium">Leading Forex Broker Comparison Platform Since 2023</span>
                        </p>
                    </div>
                    <div class="flex flex-wrap justify-center space-x-6 text-sm">
                        <a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="/terms" class="hover:text-white transition-colors">Terms of Service</a>
                        <a href="/disclaimer" class="hover:text-white transition-colors">Risk Disclaimer</a>
                        <a href="/cookies" class="hover:text-white transition-colors">Cookie Policy</a>
                        <a href="/sitemap" class="hover:text-white transition-colors">Sitemap</a>
                    </div>
                </div>
                
                <!-- Comprehensive Risk Warning -->
                <div class="bg-gray-800/50 rounded-lg p-6 text-left">
                    <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0">
                            <i class="fas fa-exclamation-triangle text-orange-400 text-xl mt-1"></i>
                        </div>
                        <div>
                            <h5 class="font-semibold text-orange-400 mb-2">Important Risk Warning</h5>
                            <p class="text-sm leading-relaxed text-gray-300">
                                <strong>Trading forex and CFDs involves significant risk and may not be suitable for all investors.</strong> 
                                The high degree of leverage can work against you as well as for you. Before deciding to trade forex, 
                                you should carefully consider your investment objectives, level of experience, and risk appetite. 
                                You should be aware of all the risks associated with trading and seek advice from an independent 
                                financial advisor if you have any doubts. Past performance is not indicative of future results.
                            </p>
                            <p class="text-xs text-gray-400 mt-2">
                                <strong>Disclaimer:</strong> BrokerAnalysis provides information and reviews for educational purposes only. 
                                We do not provide investment advice. All reviews are independent and based on our methodology. 
                                Some links may be affiliate links, but this does not affect our editorial independence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  `;
}