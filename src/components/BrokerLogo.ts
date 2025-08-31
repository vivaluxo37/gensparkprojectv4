// Enhanced Broker Logo Component with Fallback System
export interface BrokerLogoOptions {
  brokerName: string;
  logoUrl?: string;
  slug: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showFallback?: boolean;
  lazy?: boolean;
}

/**
 * Generates optimized broker logo HTML with fallback system
 */
export function generateBrokerLogo(options: BrokerLogoOptions): string {
  const {
    brokerName,
    logoUrl,
    slug,
    size = 'md',
    className = '',
    showFallback = true,
    lazy = true
  } = options;

  // Size configurations
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16', 
    xl: 'w-24 h-24'
  };

  const sizeClass = sizeClasses[size];
  const fallbackUrl = '/static/images/brokers/default-logo.svg';
  const primaryLogoUrl = logoUrl || `/static/images/brokers/${slug}.png`;

  // Generate initials fallback
  const initials = brokerName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  const baseClasses = `${sizeClass} object-contain rounded border border-gray-200 ${className}`;

  return `
    <div class="relative ${sizeClass} broker-logo-container" data-broker="${slug}">
      <img 
        src="${primaryLogoUrl}"
        alt="${brokerName} logo"
        class="${baseClasses}"
        ${lazy ? 'loading="lazy"' : ''}
        onerror="handleLogoError(this, '${fallbackUrl}', '${initials}', '${brokerName}')"
        onload="handleLogoSuccess(this)"
      />
      ${showFallback ? `
        <div class="absolute inset-0 ${baseClasses} bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-xs logo-fallback hidden">
          <span>${initials}</span>
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * Generates the JavaScript for logo error handling
 */
export function generateLogoScript(): string {
  return `
    <script>
      // Logo error handling and fallback system
      function handleLogoError(img, fallbackUrl, initials, brokerName) {
        const container = img.closest('.broker-logo-container');
        const fallback = container?.querySelector('.logo-fallback');
        
        // Try fallback SVG first
        if (img.src !== fallbackUrl && fallbackUrl) {
          img.src = fallbackUrl;
          return;
        }
        
        // If fallback also fails, show initials
        if (fallback) {
          img.style.display = 'none';
          fallback.classList.remove('hidden');
          fallback.title = brokerName + ' logo';
        }
        
        // Log for debugging
        console.warn('Logo failed to load for:', brokerName, 'Tried:', img.src);
      }
      
      function handleLogoSuccess(img) {
        // Hide fallback if logo loads successfully
        const container = img.closest('.broker-logo-container');
        const fallback = container?.querySelector('.logo-fallback');
        if (fallback) {
          fallback.classList.add('hidden');
        }
        img.style.display = 'block';
      }
      
      // Optimize logo loading
      document.addEventListener('DOMContentLoaded', function() {
        // Add intersection observer for lazy loading
        if ('IntersectionObserver' in window) {
          const logoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target.querySelector('img[loading="lazy"]');
                if (img && !img.src.startsWith('data:')) {
                  // Image will load automatically due to lazy loading
                  logoObserver.unobserve(entry.target);
                }
              }
            });
          });
          
          document.querySelectorAll('.broker-logo-container').forEach(container => {
            logoObserver.observe(container);
          });
        }
      });
    </script>
  `;
}

/**
 * Common broker logo mappings for quick reference
 */
export const LOGO_MAPPINGS = {
  'ig-markets': '/static/images/brokers/ig-markets.png',
  'pepperstone': '/static/images/brokers/pepperstone.png',
  'ic-markets': '/static/images/brokers/ic-markets.png',
  'xm-group': '/static/images/brokers/xm.png',
  'oanda': '/static/images/brokers/oanda.png',
  'plus500': '/static/images/brokers/plus500.png',
  'fp-markets': '/static/images/brokers/fp-markets.png',
  'exness': '/static/images/brokers/exness.png',
  'hotforex': '/static/images/brokers/hotforex.png',
  'fxtm': '/static/images/brokers/fxtm.png',
  'avatrade': '/static/images/brokers/avatrade.png',
  'fxpro': '/static/images/brokers/fxpro.png'
};

/**
 * Gets the appropriate logo URL for a broker
 */
export function getBrokerLogoUrl(slug: string, name?: string): string {
  // Check mapping first
  if (LOGO_MAPPINGS[slug as keyof typeof LOGO_MAPPINGS]) {
    return LOGO_MAPPINGS[slug as keyof typeof LOGO_MAPPINGS];
  }
  
  // Generate URL from slug
  return `/static/images/brokers/${slug}.png`;
}

// Functions are already exported inline above