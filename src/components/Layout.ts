import { generateCompleteNavigation } from './Navigation.js';
import { generateCompleteFooter } from './Footer.js';
import { renderChatbot } from './Chatbot.js';
import { renderJavaScriptIncludes } from './JavaScriptIncludes.js';
import { generateMetaTags } from '../utils/index.js';

interface LayoutOptions {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  additionalHead?: string;
  bodyClass?: string;
}

export function renderLayout(content: string, options: LayoutOptions = {}): string {
  const {
    title = 'Best Forex Brokers 2025 - Compare 67+ Regulated Brokers | BrokerAnalysis',
    description = 'Find the perfect forex broker with our intelligent matching system. Compare spreads, regulation, and features of 67+ top-rated brokers. Get personalized recommendations now.',
    keywords = 'forex brokers, best forex brokers 2025, regulated forex brokers, forex broker comparison, forex trading, broker reviews, forex spreads, trading platforms',
    canonicalUrl = 'https://brokeranalysis.com/',
    ogImage = 'https://brokeranalysis.com/static/images/brokeranalysis-og-image.png',
    additionalHead = '',
    bodyClass = 'bg-blue-50 text-blue-900'
  } = options;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <meta name="description" content="${description}">
        <meta name="keywords" content="${keywords}">
        <meta name="author" content="BrokerAnalysis">
        
        <!-- Canonical URL -->
        <link rel="canonical" href="${canonicalUrl}">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="${canonicalUrl}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${ogImage}">
        <meta property="og:site_name" content="BrokerAnalysis">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="${canonicalUrl}">
        <meta property="twitter:title" content="${title}">
        <meta property="twitter:description" content="${description}">
        <meta property="twitter:image" content="${ogImage}">
        
        <!-- Favicon and App Icons -->
        <link rel="icon" type="image/x-icon" href="/static/images/favicon.ico">
        <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicon-16x16.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/static/images/apple-touch-icon.png">
        
        <!-- Preconnect to external domains -->
        <link href="/static/styles.css" rel="stylesheet">
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com">
        
        <!-- CSS -->
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Structured Data - Organization -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BrokerAnalysis",
          "url": "https://brokeranalysis.com",
          "logo": "https://brokeranalysis.com/static/images/brokeranalysis-logo.png",
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