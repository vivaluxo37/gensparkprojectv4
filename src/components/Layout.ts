import { generateCompleteNavigation } from './Navigation.js';
import { generateCompleteFooter } from './Footer.js';
import { renderChatbot } from './Chatbot.js';
import { renderJavaScriptIncludes } from './JavaScriptIncludes.js';
import { generateMetaTags, getCurrentDomain } from '../utils/index.js';
import { getCriticalCSS } from './CriticalCSS.js';

// Cache for complete CSS to avoid repeated file reads - CLEARED FOR FRESH START
let completeCSS: string | null = null;

async function getInlineCompleteCSS(): Promise<string> {
  if (completeCSS) {
    return completeCSS;
  }
  
  try {
    // Use fetch to get CSS from our own inline CSS route instead of fs.readFile
    // This works in Cloudflare Workers environment
    const currentDomain = getCurrentDomain();
    const response = await fetch(`${currentDomain}/inline-css`);
    if (response.ok) {
      const cssContent = await response.text();
      completeCSS = `<style id="complete-tailwind">${cssContent}</style>`;
      console.log('✅ Successfully loaded complete Tailwind CSS inline');
      return completeCSS;
    } else {
      throw new Error(`Failed to fetch CSS: ${response.status}`);
    }
  } catch (error) {
    console.error('Error reading complete CSS file:', error);
    // Comprehensive fallback CSS with more Tailwind classes
    const fallback = `<style id="complete-tailwind-fallback">
      /* Comprehensive Tailwind CSS fallback */
      *,:before,:after{box-sizing:border-box;border:0 solid #e5e7eb}*,:before,:after{--tw-content:''}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif}body{margin:0;line-height:inherit}
      .bg-blue-50{background-color:#eff6ff}
      .bg-white{background-color:#fff}
      .bg-gray-50{background-color:#f9fafb}
      .bg-blue-600{background-color:#2563eb}
      .bg-blue-700{background-color:#1d4ed8}
      .bg-blue-100{background-color:#dbeafe}
      .text-blue-900{color:#1e3a8a}
      .text-white{color:#fff}
      .text-gray-900{color:#111827}
      .text-gray-700{color:#374151}
      .text-gray-600{color:#4b5563}
      .text-blue-600{color:#2563eb}
      .text-blue-800{color:#1e40af}
      .shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -4px rgba(0,0,0,0.1)}
      .border-b{border-bottom-width:1px}
      .border-gray-200{border-color:#e5e7eb}
      .max-w-7xl{max-width:80rem}
      .max-w-6xl{max-width:72rem}
      .mx-auto{margin-left:auto;margin-right:auto}
      .px-4{padding-left:1rem;padding-right:1rem}
      .px-6{padding-left:1.5rem;padding-right:1.5rem}
      .py-2{padding-top:0.5rem;padding-bottom:0.5rem}
      .py-3{padding-top:0.75rem;padding-bottom:0.75rem}
      .py-4{padding-top:1rem;padding-bottom:1rem}
      .py-12{padding-top:3rem;padding-bottom:3rem}
      .min-h-screen{min-height:100vh}
      .h-16{height:4rem}
      .flex{display:flex}
      .inline-flex{display:inline-flex}
      .grid{display:grid}
      .hidden{display:none}
      .items-center{align-items:center}
      .items-start{align-items:flex-start}
      .justify-between{justify-content:space-between}
      .justify-center{justify-content:center}
      .space-x-1>:not([hidden])~:not([hidden]){margin-right:0.25rem}
      .space-x-2>:not([hidden])~:not([hidden]){margin-right:0.5rem}
      .space-x-3>:not([hidden])~:not([hidden]){margin-right:0.75rem}
      .space-x-8>:not([hidden])~:not([hidden]){margin-right:2rem}
      .space-y-4>:not([hidden])~:not([hidden]){margin-top:1rem}
      .rounded{border-radius:0.25rem}
      .rounded-lg{border-radius:0.5rem}
      .font-bold{font-weight:700}
      .font-semibold{font-weight:600}
      .text-xl{font-size:1.25rem;line-height:1.75rem}
      .text-2xl{font-size:1.5rem;line-height:2rem}
      .hover\\:text-blue-600:hover{color:#2563eb}
      .hover\\:bg-blue-700:hover{background-color:#1d4ed8}
      .hover\\:bg-blue-100:hover{background-color:#dbeafe}
      .hover\\:opacity-80:hover{opacity:0.8}
      .focus\\:text-blue-600:focus{color:#2563eb}
      .focus\\:bg-blue-100:focus{background-color:#dbeafe}
      .focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}
      .focus\\:ring-4:focus{box-shadow:0 0 0 4px rgba(59,130,246,0.5)}
      .transition-colors{transition:color,background-color,border-color,text-decoration-color,fill,stroke 150ms cubic-bezier(0.4,0,0.2,1)}
      .transition-opacity{transition:opacity 150ms cubic-bezier(0.4,0,0.2,1)}
      .transition-transform{transition:transform 150ms cubic-bezier(0.4,0,0.2,1)}
      .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}
      .focus\\:not-sr-only:focus{position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal}
      .absolute{position:absolute}
      .relative{position:relative}
      .top-4{top:1rem}
      .left-4{left:1rem}
      .z-50{z-index:50}
      .flex-col{flex-direction:column}
      .group:hover .group-hover\\:scale-110{transform:scale(1.1)}
      .mb-4{margin-bottom:1rem}
      .mb-8{margin-bottom:2rem}
      .mt-8{margin-top:2rem}
      .w-full{width:100%}
      .grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
      .grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
      .grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
      .gap-4{gap:1rem}
      .gap-6{gap:1.5rem}
      .gap-8{gap:2rem}
      @media (min-width: 640px){.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media (min-width: 768px){.md\\:flex{display:flex}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}
      @media (min-width: 1024px){.lg\\:px-8{padding-left:2rem;padding-right:2rem}.lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}}
    </style>`;
    completeCSS = fallback;
    return completeCSS;
  }
}

interface LayoutOptions {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  additionalHead?: string;
  bodyClass?: string;
  request?: Request;
}

export async function renderLayout(content: string, options: LayoutOptions = {}): Promise<string> {
  const {
    title = 'Best Forex Brokers 2025 - Compare 67+ Regulated Brokers | BrokerAnalysis',
    description = 'Find the perfect forex broker with our intelligent matching system. Compare spreads, regulation, and features of 67+ top-rated brokers. Get personalized recommendations now.',
    keywords = 'forex brokers, best forex brokers 2025, regulated forex brokers, forex broker comparison, forex trading, broker reviews, forex spreads, trading platforms',
    canonicalUrl = '/',
    ogImage,
    additionalHead = '',
    bodyClass = 'bg-blue-50 text-blue-900',
    request
  } = options;

  const domain = getCurrentDomain(request);
  const fullCanonicalUrl = canonicalUrl.startsWith('http') ? canonicalUrl : `${domain}${canonicalUrl}`;
  const fullOgImage = ogImage?.startsWith('http') ? ogImage : `${domain}${ogImage || '/static/images/brokeranalysis-og-image.png'}`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
        <title>${title}</title>
        <meta name="description" content="${description}">
        <meta name="keywords" content="${keywords}">
        <meta name="author" content="BrokerAnalysis">
        
        <!-- Performance and rendering hints -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="theme-color" content="#2563eb">
        <meta name="color-scheme" content="light">
        <meta name="format-detection" content="telephone=no">
        
        <!-- Prefetch critical navigation routes -->
        <link rel="prefetch" href="/reviews">
        <link rel="prefetch" href="/compare">
        <link rel="prefetch" href="/simulator">
        
        <!-- Canonical URL -->
        <link rel="canonical" href="${fullCanonicalUrl}">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="${fullCanonicalUrl}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${fullOgImage}">
        <meta property="og:site_name" content="BrokerAnalysis">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="${fullCanonicalUrl}">
        <meta property="twitter:title" content="${title}">
        <meta property="twitter:description" content="${description}">
        <meta property="twitter:image" content="${fullOgImage}">
        
        <!-- Favicon and App Icons -->
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">
        <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicon-16x16.png">
        <link rel="apple-touch-icon" href="/static/images/apple-touch-icon.png">
        
        <!-- Critical CSS - Loaded Immediately to Prevent FOUC -->
        ${getCriticalCSS()}
        
        <!-- Load Full Tailwind CSS Directly -->
        <link rel="stylesheet" href="/static/styles.css">
        <link rel="stylesheet" href="/static/fontawesome.css">
        
        <!-- Performance optimizations for Core Web Vitals -->
        <link rel="dns-prefetch" href="https://fonts.googleapis.com">
        <link rel="dns-prefetch" href="https://fonts.gstatic.com">
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        
        <!-- Backup: Complete Tailwind CSS - Client-side injection as fallback -->
        <script>
        // Inject complete CSS on client-side as backup if stylesheet fails
        window.addEventListener('DOMContentLoaded', function() {
          // Check if styles are loaded
          const testEl = document.createElement('div');
          testEl.className = 'bg-blue-600';
          document.body.appendChild(testEl);
          const styles = window.getComputedStyle(testEl);
          const bgColor = styles.backgroundColor;
          document.body.removeChild(testEl);
          
          // If styles not loaded (no blue background), load via fetch
          if (bgColor !== 'rgb(37, 99, 235)') {
            fetch('/inline-css').then(response => response.text()).then(css => {
              const style = document.createElement('style');
              style.id = 'complete-tailwind-injected';
              style.textContent = css;
              document.head.appendChild(style);
              console.log('✅ Backup: Complete Tailwind CSS loaded and injected');
            }).catch(error => {
              console.error('Failed to load backup CSS:', error);
            });
          }
        });
        </script>
        
        <!-- Immediate critical styles to prevent FOUC -->
        <style>
        /* Prevent FOUC with immediate basic styles */
        *,:before,:after{box-sizing:border-box;border:0 solid #e5e7eb}*,:before,:after{--tw-content:''}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal}body{margin:0;line-height:inherit}
        .bg-blue-50{background-color:rgb(239 246 255)}
        .bg-white{background-color:rgb(255 255 255)}
        .bg-gray-50{background-color:rgb(249 250 251)}
        .bg-blue-600{background-color:rgb(37 99 235)}
        .text-blue-900{color:rgb(30 58 138)}
        .text-white{color:rgb(255 255 255)}
        .text-gray-900{color:rgb(17 24 39)}
        .text-gray-700{color:rgb(55 65 81)}
        .text-gray-600{color:rgb(75 85 99)}
        .shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -4px rgba(0,0,0,0.1)}
        .border-b{border-bottom-width:1px}
        .border-gray-200{border-color:rgb(229 231 235)}
        .max-w-7xl{max-width:80rem}
        .max-w-6xl{max-width:72rem}
        .mx-auto{margin-left:auto;margin-right:auto}
        .px-4{padding-left:1rem;padding-right:1rem}
        .px-6{padding-left:1.5rem;padding-right:1.5rem}
        .py-2{padding-top:0.5rem;padding-bottom:0.5rem}
        .py-4{padding-top:1rem;padding-bottom:1rem}
        .py-12{padding-top:3rem;padding-bottom:3rem}
        .min-h-screen{min-height:100vh}
        .flex{display:flex}
        .items-center{align-items:center}
        .justify-between{justify-content:space-between}
        .space-x-2>:not([hidden])~:not([hidden]){margin-right:0.5rem}
        .space-x-3>:not([hidden])~:not([hidden]){margin-right:0.75rem}
        .space-x-8>:not([hidden])~:not([hidden]){margin-right:2rem}
        .rounded{border-radius:0.25rem}
        .rounded-lg{border-radius:0.5rem}
        .font-bold{font-weight:700}
        .font-semibold{font-weight:600}
        .text-xl{font-size:1.25rem;line-height:1.75rem}
        .text-2xl{font-size:1.5rem;line-height:2rem}
        .h-16{height:4rem}
        .hover\:text-blue-600:hover{color:rgb(37 99 235)}
        .hover\:bg-blue-700:hover{background-color:rgb(29 78 216)}
        .hover\:opacity-80:hover{opacity:0.8}
        .transition-colors{transition:color,background-color,border-color,text-decoration-color,fill,stroke 150ms cubic-bezier(0.4,0,0.2,1)}
        .transition-opacity{transition:opacity 150ms cubic-bezier(0.4,0,0.2,1)}
        .transition-transform{transition:transform 150ms cubic-bezier(0.4,0,0.2,1)}
        .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}
        .focus\:not-sr-only:focus{position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal}
        .focus\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}
        .focus\:ring-4:focus{box-shadow:0 0 0 4px rgba(59,130,246,0.5)}
        .absolute{position:absolute}
        .top-4{top:1rem}
        .left-4{left:1rem}
        .z-50{z-index:50}
        .hidden{display:none}
        .group:hover .group-hover\:scale-110{transform:scale(1.1)}
        .flex-col{flex-direction:column}
        @media (min-width: 640px){.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}}
        @media (min-width: 768px){.md\:flex{display:flex}}
        @media (min-width: 1024px){.lg\:px-8{padding-left:2rem;padding-right:2rem}}
        </style>
        
        <!-- Font optimization for better LCP -->
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" onload="this.onload=null;this.rel='stylesheet'">
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"></noscript>
        
        <!-- Resource hints for performance -->
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
        <link rel="dns-prefetch" href="https://kit.fontawesome.com">
        
        <!-- Progressive enhancement and loading optimization -->
        <style>
        /* Critical CSS for loading states */
        .loading-skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        .lazy-load {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .lazy-load.loaded {
            opacity: 1;
            transform: translateY(0);
        }
        /* Improved focus styles */
        .focus-visible {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }
        </style>
        
        <!-- Structured Data - Organization -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BrokerAnalysis",
          "url": "${domain}",
          "logo": "${domain}/static/images/brokeranalysis-logo.png",
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
        }
        </script>

        ${additionalHead}
    </head>
    <body class="${bodyClass}">
        <!-- Skip Navigation for Accessibility -->
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded">
            Skip to main content
        </a>
        
        ${generateCompleteNavigation()}
        
        <!-- Main Content -->
        <main id="main-content" class="min-h-screen">
            ${content}
        </main>

        ${renderChatbot()}
        
        ${generateCompleteFooter()}
        
        ${renderJavaScriptIncludes()}
        <script src="/static/dashboard.js" defer></script>
    </body>
    </html>
  `;
}