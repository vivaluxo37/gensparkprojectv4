/**
 * Professional Footer Component
 * Streamlined 4-column layout with essential sections only
 * Professional color scheme matching the header
 */

export function renderProfessionalFooter(): string {
  const currentYear = new Date().getFullYear();
  
  return `
    <!-- Professional Footer -->
    <footer class="bg-gray-900 text-gray-300 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Main Footer Content - 4 Columns -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          <!-- Company Info -->
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-xl">BA</span>
              </div>
              <span class="text-xl font-bold text-white">BrokerAnalysis</span>
            </div>
            <p class="text-sm text-gray-400 mb-4">
              Your trusted partner in finding the perfect forex broker. Compare, analyze, and choose with confidence.
            </p>
            <div class="flex space-x-4">
              <a href="https://twitter.com/brokeranalysis" target="_blank" rel="noopener noreferrer" 
                 class="text-gray-400 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/brokeranalysis" target="_blank" rel="noopener noreferrer"
                 class="text-gray-400 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Platform -->
          <div>
            <h3 class="text-white font-semibold mb-4">Platform</h3>
            <ul class="space-y-2">
              <li><a href="/brokers" class="text-sm hover:text-white transition-colors">Browse Brokers</a></li>
              <li><a href="/compare" class="text-sm hover:text-white transition-colors">Compare Brokers</a></li>
              <li><a href="/simulator" class="text-sm hover:text-white transition-colors">Trading Simulator</a></li>
              <li><a href="/calculators" class="text-sm hover:text-white transition-colors">Trading Calculators</a></li>
              <li><a href="/#recommendation-widget" class="text-sm hover:text-white transition-colors">Broker Finder</a></li>
              <li><a href="/countries" class="text-sm hover:text-white transition-colors">Brokers by Country</a></li>
            </ul>
          </div>

          <!-- Resources -->
          <div>
            <h3 class="text-white font-semibold mb-4">Resources</h3>
            <ul class="space-y-2">
              <li><a href="/about" class="text-sm hover:text-white transition-colors">About Us</a></li>
              <li><a href="/methodology" class="text-sm hover:text-white transition-colors">Our Methodology</a></li>
              <li><a href="/blog" class="text-sm hover:text-white transition-colors">Blog & News</a></li>
              <li><a href="/education" class="text-sm hover:text-white transition-colors">Education Center</a></li>
              <li><a href="/glossary" class="text-sm hover:text-white transition-colors">Trading Glossary</a></li>
              <li><a href="/contact" class="text-sm hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

          <!-- Legal & Compliance -->
          <div>
            <h3 class="text-white font-semibold mb-4">Legal</h3>
            <ul class="space-y-2">
              <li><a href="/privacy" class="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" class="text-sm hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/disclaimer" class="text-sm hover:text-white transition-colors">Risk Disclaimer</a></li>
              <li><a href="/cookies" class="text-sm hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="/affiliate-disclosure" class="text-sm hover:text-white transition-colors">Affiliate Disclosure</a></li>
              <li><a href="/sitemap.xml" class="text-sm hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>

        <!-- Risk Warning -->
        <div class="border-t border-gray-800 py-6">
          <div class="bg-gray-800 rounded-lg p-4">
            <p class="text-xs text-gray-400 leading-relaxed">
              <strong class="text-gray-300">Risk Warning:</strong> Trading foreign exchange on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade foreign exchange, you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose. You should be aware of all the risks associated with foreign exchange trading and seek advice from an independent financial advisor if you have any doubts.
            </p>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-800 py-6">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-sm text-gray-400">
              © ${currentYear} BrokerAnalysis. All rights reserved.
            </p>
            <div class="flex items-center space-x-4 mt-4 md:mt-0">
              <span class="text-xs text-gray-500">Industry Partners:</span>
              <img src="/static/images/partners/asic-logo.svg" alt="ASIC" class="h-6 opacity-50 hover:opacity-75 transition-opacity" />
              <img src="/static/images/partners/fca-logo.svg" alt="FCA" class="h-6 opacity-50 hover:opacity-75 transition-opacity" />
              <img src="/static/images/partners/cysec-logo.svg" alt="CySEC" class="h-6 opacity-50 hover:opacity-75 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- Back to Top Button -->
    <button id="back-to-top" class="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all opacity-0 invisible">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
      </svg>
    </button>

    <script>
      // Back to top button functionality
      document.addEventListener('DOMContentLoaded', function() {
        const backToTopButton = document.getElementById('back-to-top');
        
        if (backToTopButton) {
          // Show/hide button based on scroll position
          window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
              backToTopButton.classList.remove('opacity-0', 'invisible');
              backToTopButton.classList.add('opacity-100', 'visible');
            } else {
              backToTopButton.classList.add('opacity-0', 'invisible');
              backToTopButton.classList.remove('opacity-100', 'visible');
            }
          });

          // Scroll to top when clicked
          backToTopButton.addEventListener('click', function() {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          });
        }
      });
    </script>

    <style>
      /* Additional footer styles for smooth transitions */
      #back-to-top {
        transition: opacity 0.3s ease, visibility 0.3s ease, background-color 0.3s ease;
      }
      #back-to-top.visible {
        opacity: 1;
        visibility: visible;
      }
    </style>
  `;
}