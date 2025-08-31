export function renderFAQ(): string {
  return `
    <!-- FAQ Section with Structured Data -->
    <section class="faq-section py-16 bg-blue-50" id="faq">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold mb-4 text-blue-900">Frequently Asked Questions</h2>
                <p class="text-blue-600 max-w-2xl mx-auto">
                    Get answers to common questions about forex brokers and our recommendation process.
                </p>
            </div>
            <div class="space-y-6">
                <div class="bg-white border border-blue-200 rounded-lg">
                    <button class="faq-toggle w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" 
                            data-faq="0" 
                            aria-expanded="false"
                            aria-controls="faq-answer-0">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-blue-900">What makes a forex broker trustworthy?</h3>
                            <i class="fas fa-chevron-down text-blue-600 transition-transform faq-chevron" aria-hidden="true"></i>
                        </div>
                    </button>
                    <div id="faq-answer-0" class="faq-answer hidden px-6 pb-6">
                        <p class="text-blue-700">A trustworthy forex broker is regulated by reputable financial authorities (FCA, ASIC, CFTC), offers transparent pricing, provides client fund protection, and has a proven track record of reliable operations.</p>
                    </div>
                </div>
                
                <div class="bg-white border border-blue-200 rounded-lg">
                    <button class="faq-toggle w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" 
                            data-faq="1" 
                            aria-expanded="false"
                            aria-controls="faq-answer-1">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-blue-900">How do I choose the best forex broker for my needs?</h3>
                            <i class="fas fa-chevron-down text-blue-600 transition-transform faq-chevron" aria-hidden="true"></i>
                        </div>
                    </button>
                    <div id="faq-answer-1" class="faq-answer hidden px-6 pb-6">
                        <p class="text-blue-700">Consider your trading style, capital requirements, preferred platforms, and regulatory preferences. Use our broker matching tool to get personalized recommendations based on your specific needs.</p>
                    </div>
                </div>
                
                <div class="bg-white border border-blue-200 rounded-lg">
                    <button class="faq-toggle w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" 
                            data-faq="2" 
                            aria-expanded="false"
                            aria-controls="faq-answer-2">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-blue-900">What are the typical costs of forex trading?</h3>
                            <i class="fas fa-chevron-down text-blue-600 transition-transform faq-chevron" aria-hidden="true"></i>
                        </div>
                    </button>
                    <div id="faq-answer-2" class="faq-answer hidden px-6 pb-6">
                        <p class="text-blue-700">Forex trading costs include spreads, commissions, overnight fees (swap), and potential slippage. Use our cost calculator to estimate your trading expenses with different brokers.</p>
                    </div>
                </div>
                
                <div class="bg-white border border-blue-200 rounded-lg">
                    <button class="faq-toggle w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" 
                            data-faq="3" 
                            aria-expanded="false"
                            aria-controls="faq-answer-3">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-blue-900">Are all forex brokers regulated?</h3>
                            <i class="fas fa-chevron-down text-blue-600 transition-transform faq-chevron" aria-hidden="true"></i>
                        </div>
                    </button>
                    <div id="faq-answer-3" class="faq-answer hidden px-6 pb-6">
                        <p class="text-blue-700">No, not all forex brokers are regulated. Always verify a broker's regulatory status before opening an account. We only feature regulated brokers with proper oversight from financial authorities.</p>
                    </div>
                </div>
                
                <div class="bg-white border border-blue-200 rounded-lg">
                    <button class="faq-toggle w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" 
                            data-faq="4" 
                            aria-expanded="false"
                            aria-controls="faq-answer-4">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-blue-900">How often do you update broker information?</h3>
                            <i class="fas fa-chevron-down text-blue-600 transition-transform faq-chevron" aria-hidden="true"></i>
                        </div>
                    </button>
                    <div id="faq-answer-4" class="faq-answer hidden px-6 pb-6">
                        <p class="text-blue-700">We update broker data weekly, including spreads, terms, and conditions. Regulatory information is verified monthly, and any significant changes are updated immediately.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- FAQ Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What makes a forex broker trustworthy?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A trustworthy forex broker is regulated by reputable financial authorities (FCA, ASIC, CFTC), offers transparent pricing, provides client fund protection, and has a proven track record of reliable operations."
              }
            },
            {
              "@type": "Question",
              "name": "How do I choose the best forex broker for my needs?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Consider your trading style, capital requirements, preferred platforms, and regulatory preferences. Use our broker matching tool to get personalized recommendations based on your specific needs."
              }
            },
            {
              "@type": "Question",
              "name": "What are the typical costs of forex trading?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Forex trading costs include spreads, commissions, overnight fees (swap), and potential slippage. Use our cost calculator to estimate your trading expenses with different brokers."
              }
            },
            {
              "@type": "Question",
              "name": "Are all forex brokers regulated?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No, not all forex brokers are regulated. Always verify a broker's regulatory status before opening an account. We only feature regulated brokers with proper oversight from financial authorities."
              }
            },
            {
              "@type": "Question",
              "name": "How often do you update broker information?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We update broker data weekly, including spreads, terms, and conditions. Regulatory information is verified monthly, and any significant changes are updated immediately."
              }
            }
          ]
        }
        </script>
    </section>
  `;
}