import { generateBrokerLogo } from './BrokerLogo.js';

export function renderPakistanCountryPage(options: {
  canonicalUrl?: string;
  request?: Request;
} = {}): string {
  const pakistanBrokers = [
    {
      name: 'OctaFX', slug: 'octafx', rating: 4.3, minDeposit: 'Rs 2,000', 
      regulators: ['CySEC', 'FCA', 'SVG'], spreads: '0.6 pips', 
      platforms: ['MT4', 'MT5', 'OctaFX'], trustScore: 90, yearEstablished: 2011,
      maxLeverage: '500:1', commission: 'Commission-free', website: 'https://www.octafx.com/pk',
      bonusOffer: '50% deposit bonus up to Rs 50,000'
    },
    {
      name: 'Exness', slug: 'exness', rating: 4.4, minDeposit: 'Rs 1,000',
      regulators: ['FCA', 'CySEC', 'FSA'], spreads: '0.3 pips',
      platforms: ['MT4', 'MT5'], trustScore: 92, yearEstablished: 2008,
      maxLeverage: 'Unlimited', commission: 'Ultra-low', website: 'https://www.exness.com/pk'
    },
    {
      name: 'FBS', slug: 'fbs', rating: 4.2, minDeposit: 'Rs 200',
      regulators: ['CySEC', 'IFSC'], spreads: '0.5 pips',
      platforms: ['MT4', 'MT5', 'FBS Trader'], trustScore: 88, yearEstablished: 2009,
      maxLeverage: '3000:1', commission: 'Commission-free', website: 'https://www.fbs.com/pk'
    },
    {
      name: 'XM Group', slug: 'xm-group', rating: 4.1, minDeposit: 'Rs 1,000',
      regulators: ['CySEC', 'ASIC', 'IFSC'], spreads: '1.0 pips',
      platforms: ['MT4', 'MT5'], trustScore: 87, yearEstablished: 2009,
      maxLeverage: '888:1', commission: 'Commission-free', website: 'https://www.xm.com/pk'
    },
    {
      name: 'InstaForex', slug: 'instaforex', rating: 4.0, minDeposit: 'Rs 100',
      regulators: ['BVI', 'Regional'], spreads: '3.0 pips',
      platforms: ['MT4', 'MT5'], trustScore: 85, yearEstablished: 2007,
      maxLeverage: '1000:1', commission: 'Commission-free', website: 'https://www.instaforex.com/pk'
    }
  ];

  const currentDomain = options.request ? new URL(options.request.url).origin : '';

  return `
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div class="bg-gradient-to-r from-green-600 via-white to-green-600 text-gray-900">
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-4xl mx-auto text-center">
            <div class="flex items-center justify-center mb-6">
              <div class="w-16 h-12 mr-4 bg-white rounded border flex items-center justify-center">
                <span class="text-green-600 font-bold text-xs">🇵🇰</span>
              </div>
              <h1 class="text-4xl md:text-6xl font-bold">
                Best Forex Brokers in 
                <span class="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Pakistan</span>
              </h1>
            </div>
            <p class="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Discover top forex brokers serving Pakistani traders with SECP oversight, competitive spreads, and Islamic accounts
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div class="bg-green-100 rounded-lg p-4">
                <div class="text-3xl font-bold text-green-700">5</div>
                <div class="text-gray-600">Top Brokers</div>
              </div>
              <div class="bg-green-100 rounded-lg p-4">
                <div class="text-3xl font-bold text-green-700">3000:1</div>
                <div class="text-gray-600">Max Leverage</div>
              </div>
              <div class="bg-green-100 rounded-lg p-4">
                <div class="text-3xl font-bold text-green-700">SECP</div>
                <div class="text-gray-600">Oversight</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-12">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">
            Compare Top Forex Brokers for Pakistani Traders
          </h2>
          
          <div class="space-y-6">
            ${pakistanBrokers.map(broker => `
              <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center">
                    ${generateBrokerLogo({
                      brokerName: broker.name,
                      slug: broker.slug,
                      size: 'lg',
                      className: 'mr-4'
                    })}
                    <div>
                      <h3 class="font-bold text-xl text-gray-900">${broker.name}</h3>
                      <p class="text-gray-600">Est. ${broker.yearEstablished}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="flex items-center mb-1">
                      ${Array.from({length: 5}, (_, i) => 
                        `<svg class="w-4 h-4 ${i < Math.floor(broker.rating) ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>`
                      ).join('')}
                    </div>
                    <div class="text-sm font-medium">${broker.rating}/5</div>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div class="text-sm text-gray-600">Min Deposit</div>
                    <div class="font-bold text-green-600">${broker.minDeposit}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Spreads</div>
                    <div class="font-medium text-blue-600">${broker.spreads}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Max Leverage</div>
                    <div class="font-medium">${broker.maxLeverage}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Trust Score</div>
                    <div class="font-medium">${broker.trustScore}%</div>
                  </div>
                </div>

                ${broker.bonusOffer ? `
                  <div class="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div class="text-sm font-medium text-green-800">Special Offer</div>
                    <div class="text-green-700">${broker.bonusOffer}</div>
                  </div>
                ` : ''}

                <div class="flex space-x-3">
                  <a href="/review/${broker.slug}" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors">
                    Read Review
                  </a>
                  <a href="${broker.website}" target="_blank" rel="noopener" class="flex-1 bg-white hover:bg-gray-50 text-green-600 border border-green-600 font-medium py-3 px-4 rounded-lg text-center transition-colors">
                    Visit Broker
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <script>
      function handleLogoError(img, fallbackUrl, initials, brokerName) {
        if (img.dataset.retried !== 'true' && fallbackUrl && fallbackUrl !== img.src) {
          img.dataset.retried = 'true';
          img.src = fallbackUrl;
          return;
        }
        
        const container = img.parentElement;
        if (container && container.classList.contains('broker-logo-container')) {
          container.innerHTML = \`
            <div class="w-full h-full bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">\${initials}</span>
            </div>
          \`;
          container.setAttribute('title', brokerName + ' Logo');
        }
      }

      function handleLogoSuccess(img) {
        const container = img.closest('.broker-logo-container');
        const fallback = container?.querySelector('.logo-fallback');
        if (fallback) {
          fallback.classList.add('hidden');
        }
        img.style.display = 'block';
      }
    </script>
  `;
}