/**
 * Professional Hero Section Component
 * Clean, modern hero with subtle graphics representing forex trading
 */

export function renderProfessionalHero(): string {
  return `
    <!-- Professional Hero Section -->
    <section class="relative bg-gradient-to-br from-blue-50 via-white to-gray-50 overflow-hidden">
      <!-- Subtle Background Graphics -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <!-- Currency Symbol Pattern -->
        <div class="absolute top-10 left-10 text-blue-100 opacity-20 transform rotate-12">
          <svg class="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.81.45 1.61 1.67 1.61 1.16 0 1.6-.64 1.6-1.46 0-.84-.68-1.22-1.88-1.54-1.76-.43-3.08-1.15-3.08-3.07 0-1.64 1.16-2.82 2.94-3.18V5h2.67v2.06c1.58.35 2.59 1.38 2.72 3.04h-1.96c-.07-.72-.46-1.42-1.43-1.42-1.02 0-1.54.49-1.54 1.29 0 .77.5 1.07 1.79 1.36 1.79.45 3.23 1.07 3.23 3.21 0 1.88-1.38 2.93-3.25 3.28z"/>
          </svg>
        </div>
        <div class="absolute bottom-20 right-20 text-gray-200 opacity-15 transform -rotate-12">
          <svg class="w-40 h-40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm7 14l5-7-5-7v4H8v6h4v4z"/>
          </svg>
        </div>
        <!-- Chart Lines -->
        <svg class="absolute top-1/2 left-1/4 transform -translate-y-1/2 opacity-5" width="400" height="200" viewBox="0 0 400 200">
          <polyline points="0,100 50,80 100,90 150,40 200,70 250,30 300,60 350,20 400,50" 
                    stroke="currentColor" stroke-width="2" fill="none" class="text-blue-600"/>
          <polyline points="0,150 50,140 100,145 150,120 200,130 250,110 300,125 350,100 400,115" 
                    stroke="currentColor" stroke-width="2" fill="none" class="text-green-600"/>
        </svg>
      </div>

      <!-- Hero Content -->
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Column - Text Content -->
          <div>
            <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Find Your Perfect
              <span class="text-blue-600 block">Forex Broker</span>
            </h1>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed">
              Compare top-rated forex brokers with our intelligent matching system. 
              Get personalized recommendations based on your trading style, experience, and goals.
            </p>
            
            <!-- Key Benefits -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div class="flex items-center space-x-2">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">100+ Verified Brokers</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">Real-Time Spreads</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">AI-Powered Matching</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <a href="#recommendation-widget" class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Start Broker Search
                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </a>
              <a href="/compare" class="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors">
                Compare Brokers
                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- Right Column - Interactive Visual -->
          <div class="relative">
            <div class="bg-white rounded-2xl shadow-2xl p-8 transform lg:rotate-1 hover:rotate-0 transition-transform duration-300">
              <!-- Mini Dashboard Preview -->
              <div class="space-y-4">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-lg font-semibold text-gray-900">Top Brokers Today</h3>
                  <span class="text-sm text-gray-500">Live Data</span>
                </div>
                
                <!-- Broker Cards -->
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span class="text-blue-600 font-bold">IC</span>
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">IC Markets</p>
                        <p class="text-xs text-gray-500">EUR/USD: 0.1 pips</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="flex items-center text-yellow-500">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span class="ml-1 text-sm font-medium">4.8</span>
                      </div>
                      <p class="text-xs text-green-600">ASIC</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span class="text-green-600 font-bold">PP</span>
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">Pepperstone</p>
                        <p class="text-xs text-gray-500">EUR/USD: 0.09 pips</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="flex items-center text-yellow-500">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span class="ml-1 text-sm font-medium">4.7</span>
                      </div>
                      <p class="text-xs text-green-600">FCA</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span class="text-purple-600 font-bold">XM</span>
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">XM Group</p>
                        <p class="text-xs text-gray-500">EUR/USD: 0.6 pips</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="flex items-center text-yellow-500">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span class="ml-1 text-sm font-medium">4.5</span>
                      </div>
                      <p class="text-xs text-green-600">CySEC</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Floating Elements -->
            <div class="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
              Live Updates
            </div>
            <div class="absolute -bottom-4 -left-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
              50,000+ Active Traders
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}