// Complete footer component with all links and sections
export function generateCompleteFooter(): string {
  return `
    <!-- Modern Footer -->
    <footer class="bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <i class="fas fa-chart-line text-blue-400 text-2xl"></i>
                        <span class="text-xl font-bold">BrokerAnalysis</span>
                    </div>
                    <p class="text-gray-400 mb-4">Find your perfect forex broker with our intelligent recommendation system.</p>
                    <div class="flex space-x-4">
                        <a href="https://twitter.com/brokeranalysis" class="text-gray-400 hover:text-white transition-colors" aria-label="Follow us on Twitter">
                            <i class="fab fa-twitter text-xl"></i>
                        </a>
                        <a href="https://linkedin.com/company/brokeranalysis" class="text-gray-400 hover:text-white transition-colors" aria-label="Connect on LinkedIn">
                            <i class="fab fa-linkedin text-xl"></i>
                        </a>
                        <a href="https://facebook.com/brokeranalysis" class="text-gray-400 hover:text-white transition-colors" aria-label="Follow us on Facebook">
                            <i class="fab fa-facebook text-xl"></i>
                        </a>
                    </div>
                </div>
                <div>
                    <h3 class="font-semibold mb-4">Product</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="/" class="hover:text-white transition-colors">Home</a></li>
                        <li><a href="/reviews" class="hover:text-white transition-colors">Reviews</a></li>
                        <li><a href="/compare" class="hover:text-white transition-colors">Compare</a></li>
                        <li><a href="/calculators" class="hover:text-white transition-colors">Calculators</a></li>
                        <li><a href="/simulator" class="hover:text-white transition-colors">Cost Calculator</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-semibold mb-4">Resources</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="/about" class="hover:text-white transition-colors">About</a></li>
                        <li><a href="/methodology" class="hover:text-white transition-colors">Methodology</a></li>
                        <li><a href="/api-docs" class="hover:text-white transition-colors">API Documentation</a></li>
                        <li><a href="/contact" class="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-semibold mb-4">Popular Brokers</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="/reviews/ic-markets" class="hover:text-white transition-colors">IC Markets</a></li>
                        <li><a href="/reviews/pepperstone" class="hover:text-white transition-colors">Pepperstone</a></li>
                        <li><a href="/reviews/fp-markets" class="hover:text-white transition-colors">FP Markets</a></li>
                        <li><a href="/reviews/avatrade" class="hover:text-white transition-colors">AvaTrade</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; 2025 BrokerAnalysis. All rights reserved.</p>
                    <div class="flex space-x-6 mt-4 md:mt-0">
                        <a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="/terms" class="hover:text-white transition-colors">Terms of Service</a>
                        <a href="/disclaimer" class="hover:text-white transition-colors">Disclaimer</a>
                    </div>
                </div>
                <div class="mt-4 text-sm">
                    <p>Risk Warning: Trading forex involves significant risk and may not be suitable for all investors. 
                    The high degree of leverage can work against you as well as for you. Before deciding to trade forex, 
                    you should carefully consider your investment objectives, level of experience, and risk appetite.</p>
                </div>
            </div>
        </div>
    </footer>
  `;
}