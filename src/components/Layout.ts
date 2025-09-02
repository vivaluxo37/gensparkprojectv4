import { generateCompleteNavigation } from './Navigation.js';
import { generateCompleteFooter } from './Footer.js';
import { renderChatbot } from './Chatbot.js';
import { renderJavaScriptIncludes } from './JavaScriptIncludes.js';
import { generateMetaTags, getCurrentDomain } from '../utils/index.js';

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

export function renderLayout(content: string, options: LayoutOptions = {}): string {
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
        
        <!-- Performance optimizations for Core Web Vitals -->
        <link rel="dns-prefetch" href="https://fonts.googleapis.com">
        <link rel="dns-prefetch" href="https://fonts.gstatic.com">
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        
        <!-- Critical CSS - inline for faster rendering (fixes development CSS serving issues) -->
        <link href="/static/styles.css" rel="stylesheet">
        <style id="tailwind-fallback">
        /* Critical Tailwind CSS - inline fallback */
        *,:before,:after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}body{margin:0;line-height:inherit}
        .bg-blue-50{--tw-bg-opacity:1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}
        .bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}
        .bg-gray-50{--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity, 1))}
        .bg-blue-600{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity, 1))}
        .text-blue-900{--tw-text-opacity:1;color:rgb(30 58 138 / var(--tw-text-opacity, 1))}
        .text-white{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}
        .text-gray-900{--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity, 1))}
        .text-gray-700{--tw-text-opacity:1;color:rgb(55 65 81 / var(--tw-text-opacity, 1))}
        .text-gray-600{--tw-text-opacity:1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}
        .shadow-lg{--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1),0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}
        .border-b{border-bottom-width:1px}
        .border-gray-200{--tw-border-opacity:1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1))}
        .max-w-7xl{max-width:80rem}
        .max-w-6xl{max-width:72rem}
        .mx-auto{margin-left:auto;margin-right:auto}
        .px-4{padding-left:1rem;padding-right:1rem}
        .px-6{padding-left:1.5rem;padding-right:1.5rem}
        .py-2{padding-top:.5rem;padding-bottom:.5rem}
        .py-4{padding-top:1rem;padding-bottom:1rem}
        .py-12{padding-top:3rem;padding-bottom:3rem}
        .min-h-screen{min-height:100vh}
        .flex{display:flex}
        .items-center{align-items:center}
        .justify-between{justify-content:space-between}
        .space-x-8>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(2rem * var(--tw-space-x-reverse));margin-left:calc(2rem * calc(1 - var(--tw-space-x-reverse)))}
        .rounded{border-radius:.25rem}
        .font-bold{font-weight:700}
        .font-semibold{font-weight:600}
        .text-2xl{font-size:1.5rem;line-height:2rem}
        .hover\:text-blue-600:hover{--tw-text-opacity:1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}
        .hover\:bg-blue-700:hover{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity, 1))}
        .transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}
        .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}
        .focus\:not-sr-only:focus{position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal}
        .absolute{position:absolute}
        .top-4{top:1rem}
        .left-4{left:1rem}
        .z-50{z-index:50}
        .hidden{display:none}
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
    </body>
    </html>
  `;
}