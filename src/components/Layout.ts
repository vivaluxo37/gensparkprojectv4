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
        
        <!-- Critical CSS - inline for faster rendering -->
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Font optimization for better LCP -->
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" onload="this.onload=null;this.rel='stylesheet'">
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"></noscript>
        
        <!-- Preload critical above-the-fold resources -->
        <link rel="preload" href="/static/styles.css" as="style">
        
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