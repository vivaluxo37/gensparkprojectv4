// Page routes for static pages, country pages, and main user interface
import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import type { Bindings } from '../types';

// CSS inlining helper to fix CSS serving issues in development
let cachedCSS: string | null = null;

const getInlineCSS = async (): Promise<string> => {
  if (cachedCSS) {
    return cachedCSS;
  }
  
  try {
    const { readFile } = await import('fs/promises');
    const cssContent = await readFile('./dist/static/styles.css', 'utf-8');
    cachedCSS = `<style>${cssContent}</style>`;
    return cachedCSS;
  } catch (error) {
    console.error('Error reading CSS file:', error);
    const fallbackCSS = `<style>
      /* Fallback CSS when file cannot be read */
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; }
      .bg-gray-50 { background-color: #f9fafb; }
      .bg-white { background-color: white; }
      .text-gray-900 { color: #111827; }
      .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
      .max-w-6xl { max-width: 72rem; }
      .mx-auto { margin-left: auto; margin-right: auto; }
      .px-4 { padding-left: 1rem; padding-right: 1rem; }
      .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
    </style>`;
    cachedCSS = fallbackCSS;
    return cachedCSS;
  }
};

const replaceExternalCSSWithInline = async (html: string): Promise<string> => {
  const inlineCSS = await getInlineCSS();
  // Replace CSS link tags with inline styles
  return html
    .replace(/<link[^>]*href=["']\/static\/styles\.css["'][^>]*>/g, inlineCSS)
    .replace(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']\/static\/styles\.css["'][^>]*>/g, inlineCSS);
};
import { BrokerService } from '../services/brokerService';
import { generateMetaTags, generateStructuredData, getCurrentDomain } from '../utils';
import { renderLayout } from '../components/Layout.js';
import { renderHomePage } from '../components/HomePage.js';
import { renderFAQ } from '../components/FAQ.js';
import { renderBrokersDirectoryPage } from '../components/BrokersDirectoryPage.js';
import { renderCountriesDirectoryPage } from '../components/CountriesDirectoryPage.js';
import { renderRegulatorPage } from '../components/RegulatorPage.js';
import { renderUSACountryPage } from '../components/USACountryPage.js';
import { renderSingaporeCountryPage } from '../components/SingaporeCountryPage.js';
import { renderDubaiCountryPage } from '../components/DubaiCountryPage.js';
import { renderSouthAfricaCountryPage } from '../components/SouthAfricaCountryPage.js';
import { renderPhilippinesCountryPage } from '../components/PhilippinesCountryPage.js';
import { renderPakistanCountryPage } from '../components/PakistanCountryPage.js';
import { renderIndiaCountryPage } from '../components/IndiaCountryPage.js';
import { renderCanadaCountryPage } from '../components/CanadaCountryPage.js';
import { renderAustraliaCountryPage } from '../components/AustraliaCountryPage.js';
import { renderBelgiumCountryPage } from '../components/BelgiumCountryPage.js';
import { renderNepalCountryPage } from '../components/NepalCountryPage.js';
import { renderMalaysiaCountryPage } from '../components/MalaysiaCountryPage.js';
import { renderEthiopiaCountryPage } from '../components/EthiopiaCountryPage.js';
import { renderBangladeshCountryPage } from '../components/BangladeshCountryPage.js';
import { renderTradingSimulatorPage } from '../components/TradingSimulatorPage.js';
import { renderTradingCalculatorsPage } from '../components/TradingCalculatorsPage.js';
import { renderGoldTradingBrokersPage } from '../components/GoldTradingBrokersPage.js';
import { renderIslamicAccountBrokersPage } from '../components/IslamicAccountBrokersPage.js';
import { renderAutomatedTradingBrokersPage } from '../components/AutomatedTradingBrokersPage.js';
import { renderHighLeverageBrokersPage } from '../components/HighLeverageBrokersPage.js';
import { renderOilTradingBrokersPage } from '../components/OilTradingBrokersPage.js';
import { renderCopyTradingBrokersPage } from '../components/CopyTradingBrokersPage.js';
import { renderECNBrokersPage } from '../components/ECNBrokersPage.js';
import { renderScalpingBrokersPage } from '../components/ScalpingBrokersPage.js';
import { renderDemoAccountBrokersPage } from '../components/DemoAccountBrokersPage.js';
import { renderMT4BrokersPage } from '../components/MT4BrokersPage.js';
import { renderStockTradingBrokersPage } from '../components/StockTradingBrokersPage.js';
import { renderBeginnersBrokersPage } from '../components/BeginnersBrokersPage.js';
import { renderDemoAccountsBrokersPage } from '../components/DemoAccountsBrokersPage.js';
import { generateComprehensiveBrokerReviewHTML } from '../components/EnhancedBrokerReview.js';
import { generateCompleteNavigation } from '../components/Navigation.js';

const pageRoutes = new Hono<{ Bindings: Bindings }>();

// Homepage - Complete migrated version with all features
pageRoutes.get('/', async (c) => {
  const homeContent = `
    ${renderHomePage()}
    ${renderFAQ()}
  `;

  return c.html(await renderLayout(homeContent, {
    title: 'Best Forex Brokers 2025 - Compare Top 6 Regulated Brokers | BrokerAnalysis',
    description: 'Find the perfect forex broker with our intelligent matching system. Compare spreads, regulation, and features of 6 top-rated brokers including IC Markets, Pepperstone, OANDA & more.',
    keywords: 'forex brokers, best forex brokers 2025, regulated forex brokers, forex broker comparison, forex trading, broker reviews, forex spreads, trading platforms',
    canonicalUrl: '/',
    request: c.req.raw,
    additionalHead: `
      <!-- Static CSS preload disabled for development -->
      <link rel="preconnect" href="https://fonts.googleapis.com">

      <!-- Website Schema -->
      ${generateStructuredData({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "BrokerAnalysis",
        "url": "https://brokeranalysis.com",
        "description": "Find and compare the best forex brokers with our intelligent recommendation system. Detailed reviews, ratings, and personalized broker matching.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://brokeranalysis.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      })}
      
      <!-- Organization Schema -->
      ${generateStructuredData({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "BrokerAnalysis",
        "url": "https://brokeranalysis.com",
        "logo": "https://brokeranalysis.com/static/images/brokeranalysis-logo.png",
        "description": "Leading forex broker comparison and review platform",
        "sameAs": [
          "https://twitter.com/brokeranalysis",
          "https://linkedin.com/company/brokeranalysis"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Service",
          "email": "support@brokeranalysis.com"
        }
      })}
      
      <!-- Service Schema -->
      ${generateStructuredData({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Forex Broker Comparison",
        "description": "Compare top forex brokers, read reviews, and find the perfect trading platform for your needs",
        "provider": {
          "@type": "Organization",
          "name": "BrokerAnalysis"
        },
        "serviceType": "Financial Comparison Service",
        "areaServed": "Worldwide",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "50000",
          "bestRating": "5",
          "worstRating": "1"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Broker Reviews",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Broker Reviews",
                "description": "Comprehensive forex broker reviews and ratings"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Broker Comparison",
                "description": "Side-by-side broker comparison tools"
              }
            }
          ]
        }
      })}
      
      <!-- Broker Listing Schema -->
      ${generateStructuredData({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Top Forex Brokers 2025",
        "description": "Curated list of the best forex brokers based on comprehensive analysis",
        "numberOfItems": 100,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "FinancialService",
              "name": "IC Markets",
              "description": "Raw spreads from 0.0 pips with lightning-fast execution",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "15000",
                "bestRating": "5"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "FinancialService",
              "name": "Pepperstone",
              "description": "Advanced Smart Trader Tools & TradingView integration",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "reviewCount": "12000",
                "bestRating": "5"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "FinancialService",
              "name": "OANDA",
              "description": "25+ years, CFTC/NFA oversight, impeccable reputation",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.6",
                "reviewCount": "18000",
                "bestRating": "5"
              }
            }
          }
        ]
      })}
    `
  }));
});

// Main brokers directory page - comprehensive listing with SEO optimization
pageRoutes.get('/brokers', async (c) => {
  try {
    const { DB } = c.env;
    const brokerService = new BrokerService(DB);
    
    // Get pagination parameters
    const page = parseInt(c.req.query('page') || '1');
    const limit = 12; // 12 brokers per page
    const sort = c.req.query('sort') || 'rating';
    
    // Get brokers with pagination
    const result = await brokerService.getAllBrokers(page, limit, sort);
    
    if (!result || !result.brokers) {
      throw new Error('Failed to fetch brokers');
    }
    
    return c.html(renderBrokersDirectoryPage(result.brokers, {
      canonicalUrl: '/brokers',
      request: c.req.raw,
      currentPage: page,
      totalPages: result.totalPages || 1,
      totalBrokers: result.total || result.brokers.length
    }));
    
  } catch (error) {
    console.error('Error loading brokers directory:', error);
    
    // Fallback with empty state
    return c.html(renderBrokersDirectoryPage([], {
      canonicalUrl: '/brokers',
      request: c.req.raw,
      currentPage: 1,
      totalPages: 1,
      totalBrokers: 0
    }));
  }
});

// Countries directory page - comprehensive listing of countries with regulated brokers
pageRoutes.get('/countries', async (c) => {
  // Define countries with enhanced information
  const countries = [
    { slug: 'australia', name: 'Australia', regulator: 'ASIC', brokerCount: 15, 
      description: 'Australia offers world-class forex regulation through ASIC with strict capital requirements and comprehensive trader protection.' },
    { slug: 'uk', name: 'United Kingdom', regulator: 'FCA', brokerCount: 22,
      description: 'The UK\'s FCA provides gold-standard regulation with rigorous oversight and strong consumer protection measures.' },
    { slug: 'canada', name: 'Canada', regulator: 'IIROC', brokerCount: 8,
      description: 'Canadian regulation through IIROC ensures high standards of investor protection and market integrity.' },
    { slug: 'usa', name: 'United States', regulator: 'CFTC/NFA', brokerCount: 6,
      description: 'US regulation through CFTC and NFA offers the highest level of oversight with substantial capital requirements.' },
    { slug: 'south-africa', name: 'South Africa', regulator: 'FSCA', brokerCount: 12,
      description: 'South Africa\'s FSCA provides robust regulation for the African continent with growing international recognition.' },
    { slug: 'pakistan', name: 'Pakistan', regulator: 'SECP', brokerCount: 5,
      description: 'Pakistan\'s SECP oversees forex markets with developing regulatory framework and increasing market participation.' },
    { slug: 'philippines', name: 'Philippines', regulator: 'BSP', brokerCount: 7,
      description: 'The Philippines\' BSP regulates forex trading through central bank oversight ensuring market stability.' },
    { slug: 'india', name: 'India', regulator: 'SEBI', brokerCount: 9,
      description: 'India\'s SEBI provides comprehensive financial market regulation with strong emphasis on investor protection.' },
    { slug: 'malaysia', name: 'Malaysia', regulator: 'SC', brokerCount: 8,
      description: 'Malaysia\'s SC offers Islamic finance-compliant regulation alongside conventional forex market oversight.' },
    { slug: 'dubai', name: 'Dubai/UAE', regulator: 'DFSA', brokerCount: 11,
      description: 'Dubai\'s DFSA serves as the Middle East financial hub with international standards and sophisticated regulation.' },
    { slug: 'qatar', name: 'Qatar', regulator: 'QFCRA', brokerCount: 4,
      description: 'Qatar\'s QFCRA provides Gulf region financial oversight with focus on institutional and retail market development.' },
    { slug: 'indonesia', name: 'Indonesia', regulator: 'Bappebti', brokerCount: 6,
      description: 'Indonesia\'s Bappebti regulates commodity and forex trading with emphasis on market development and protection.' },
    { slug: 'nepal', name: 'Nepal', regulator: 'NRB', brokerCount: 6,
      description: 'Nepal\'s forex market operates with Nepal Rastra Bank oversight. International brokers serve Nepali traders with ultra-low deposits and high leverage access.' },
    { slug: 'ethiopia', name: 'Ethiopia', regulator: 'NBE', brokerCount: 6,
      description: 'Ethiopia\'s growing economy offers forex trading opportunities through international brokers with NBE awareness and ETB currency support for African traders.' },
    { slug: 'bangladesh', name: 'Bangladesh', regulator: 'BB', brokerCount: 6,
      description: 'Bangladesh\'s advanced digital payment ecosystem supports forex trading through international brokers with BDT support and mobile banking integration.' }
  ];

  return c.html(renderCountriesDirectoryPage(countries, {
    canonicalUrl: '/countries',
    request: c.req.raw
  }));
});

// Regulator-specific pages for SEO
const regulatorRoutes = [
  {
    slug: 'asic',
    info: {
      name: 'ASIC',
      fullName: 'Australian Securities and Investments Commission',
      country: 'Australia',
      website: 'https://asic.gov.au',
      established: 2001,
      description: 'ASIC is Australia\'s corporate, markets and financial services regulator. It ensures fair, orderly and transparent markets and provides consumer protection for retail clients.',
      keyFeatures: [
        'Strict capital adequacy requirements',
        'Segregated client fund protection',
        'Regular financial reporting',
        'Professional indemnity insurance',
        'Market maker oversight',
        'Retail client protections'
      ],
      protections: [
        'Australian Financial Complaints Authority',
        'Compensation scheme of last resort',
        'Negative balance protection',
        'Professional dispute resolution',
        'Regular compliance audits',
        'Client money segregation'
      ],
      capitalRequirements: 'AUD $1 million minimum',
      compensationScheme: 'Australian Financial Complaints Authority',
      brokerCount: 15
    }
  },
  {
    slug: 'fca',
    info: {
      name: 'FCA',
      fullName: 'Financial Conduct Authority',
      country: 'United Kingdom',
      website: 'https://fca.org.uk',
      established: 2013,
      description: 'The FCA regulates the financial services industry in the UK. Its role includes protecting consumers, ensuring industry competition, and promoting market integrity.',
      keyFeatures: [
        'Prudential regulation standards',
        'Consumer protection focus',
        'Market conduct supervision',
        'Senior Managers Regime',
        'Treating Customers Fairly',
        'Product intervention powers'
      ],
      protections: [
        'Financial Services Compensation Scheme',
        'Financial Ombudsman Service',
        'Client money protection rules',
        'Professional indemnity requirements',
        'Regular stress testing',
        'Enhanced due diligence'
      ],
      capitalRequirements: '£730,000 minimum (€1 million)',
      compensationScheme: 'FSCS up to £85,000',
      brokerCount: 22
    }
  },
  {
    slug: 'cysec',
    info: {
      name: 'CySEC',
      fullName: 'Cyprus Securities and Exchange Commission',
      country: 'Cyprus',
      website: 'https://cysec.gov.cy',
      established: 2001,
      description: 'CySEC supervises the investment services market in Cyprus and ensures MiFID II compliance throughout the European Union.',
      keyFeatures: [
        'MiFID II compliance',
        'EU passporting rights',
        'Investor compensation fund',
        'Best execution requirements',
        'Product governance rules',
        'Conduct of business standards'
      ],
      protections: [
        'Investor Compensation Fund',
        'MiFID II investor protections',
        'Client categorization rules',
        'Appropriateness assessments',
        'Negative balance protection',
        'Segregated client funds'
      ],
      capitalRequirements: '€730,000 minimum',
      compensationScheme: 'ICF up to €20,000',
      brokerCount: 18
    }
  },
  {
    slug: 'cftc-nfa',
    info: {
      name: 'CFTC/NFA',
      fullName: 'Commodity Futures Trading Commission / National Futures Association',
      country: 'United States',
      website: 'https://cftc.gov',
      established: 1974,
      description: 'The CFTC regulates commodity futures and option markets in the US, while the NFA provides industry-wide self-regulatory programs.',
      keyFeatures: [
        'Dodd-Frank Act compliance',
        'Substantial capital requirements',
        'Daily financial reporting',
        'Risk management standards',
        'Customer protection rules',
        'Anti-fraud enforcement'
      ],
      protections: [
        'Customer segregated funds',
        'NFA arbitration program',
        'Minimum capital requirements',
        'Regular examinations',
        'SIPC protection available',
        'Whistleblower programs'
      ],
      capitalRequirements: '$20 million adjusted net capital',
      compensationScheme: 'NFA arbitration up to $500,000',
      brokerCount: 6
    }
  }
];

regulatorRoutes.forEach(regulator => {
  pageRoutes.get(`/regulators/${regulator.slug}`, async (c) => {
    return c.html(renderRegulatorPage(regulator.info, {
      canonicalUrl: `/regulators/${regulator.slug}`,
      request: c.req.raw
    }));
  });
});

// Individual Country Pages - USA
pageRoutes.get('/countries/usa', async (c) => {
  return c.html(await renderLayout(renderUSACountryPage({
    canonicalUrl: '/countries/usa',
    request: c.req.raw
  }), {
    title: 'Best Forex Brokers in USA 2025 - CFTC/NFA Regulated | BrokerAnalysis',
    description: 'Compare top US forex brokers with CFTC/NFA regulation. Find the best spreads, platforms, and trading conditions for American forex traders. Updated 2025.',
    keywords: 'USA forex brokers, US forex trading, CFTC regulated brokers, NFA forex brokers, American forex brokers, Interactive Brokers, TD Ameritrade, Charles Schwab, E*TRADE, Forex.com, OANDA',
    canonicalUrl: '/countries/usa',
    request: c.req.raw,
    additionalHead: `
      <link rel="preconnect" href="https://fonts.googleapis.com">

      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="article:publisher" content="https://www.facebook.com/brokeranalysis" />
      <link rel="alternate" hreflang="en" href="${getCurrentDomain(c.req.raw)}/countries/usa" />
    `
  }));
});

// Individual Country Pages - India
pageRoutes.get('/countries/india', async (c) => {
  return c.html(await renderLayout(renderIndiaCountryPage({
    canonicalUrl: '/countries/india',
    request: c.req.raw
  }), {
    title: 'Best Forex Brokers in India 2025 - SEBI Regulated | BrokerAnalysis',
    description: 'Compare the best forex brokers for Indian traders in 2025. Find top-rated brokers with SEBI oversight, competitive spreads, UPI payments, and advanced platforms.',
    keywords: 'forex brokers India, SEBI regulated, Indian traders, MetaTrader, forex trading India, UPI payments, XM Group, Exness, OctaFX, FXCM, AvaTrade, Pepperstone, IC Markets',
    canonicalUrl: '/countries/india',
    request: c.req.raw,
    additionalHead: `
      <link rel="preconnect" href="https://fonts.googleapis.com">

      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content="website" />
      <link rel="alternate" hreflang="en" href="${getCurrentDomain(c.req.raw)}/countries/india" />
      <link rel="alternate" hreflang="hi" href="${getCurrentDomain(c.req.raw)}/countries/india" />
    `
  }));
});

// Individual Country Pages - Canada
pageRoutes.get('/countries/canada', async (c) => {
  return c.html(await renderLayout(renderCanadaCountryPage({
    canonicalUrl: '/countries/canada',
    request: c.req.raw
  }), {
    title: 'Best Forex Brokers in Canada 2025 - CIRO Regulated | BrokerAnalysis',
    description: 'Compare the best forex brokers for Canadian traders in 2025. Find top-rated brokers with CIRO regulation, CIPF protection, competitive spreads, and CAD support.',
    keywords: 'forex brokers Canada, CIRO regulated, Canadian traders, MetaTrader, forex trading Canada, CAD trading, Interactive Brokers, OANDA, Questrade, XM Group, Pepperstone',
    canonicalUrl: '/countries/canada',
    request: c.req.raw,
    additionalHead: `
      <link rel="preconnect" href="https://fonts.googleapis.com">

      <meta name="geo.region" content="CA" />
      <meta name="geo.placename" content="Canada" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:type" content="website" />
      <link rel="alternate" hreflang="en" href="${getCurrentDomain(c.req.raw)}/countries/canada" />
      <link rel="alternate" hreflang="fr" href="${getCurrentDomain(c.req.raw)}/countries/canada" />
    `
  }));
});

// Individual Country Pages - Australia
pageRoutes.get('/countries/australia', async (c) => {
  return c.html(await renderLayout(renderAustraliaCountryPage({
    canonicalUrl: '/countries/australia',
    request: c.req.raw
  }), {
    title: 'Best Forex Brokers in Australia 2025 - ASIC Regulated | BrokerAnalysis',
    description: 'Compare the best ASIC regulated forex brokers for Australian traders in 2025. Find top-rated brokers with competitive spreads from 0.0 pips, advanced platforms, and AUD support.',
    keywords: 'forex brokers Australia, ASIC regulated, Australian traders, MetaTrader, forex trading Australia, AUD trading, IC Markets, Pepperstone, IG Markets, CMC Markets, Vantage FX',
    canonicalUrl: '/countries/australia',
    request: c.req.raw,
    additionalHead: `
      <link rel="preconnect" href="https://fonts.googleapis.com">

      <meta name="geo.region" content="AU" />
      <meta name="geo.placename" content="Australia" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:locale" content="en_AU" />
      <meta property="og:type" content="website" />
      <link rel="alternate" hreflang="en" href="${getCurrentDomain(c.req.raw)}/countries/australia" />
    `
  }));
});

// Individual Country Pages - Belgium
pageRoutes.get('/countries/belgium', async (c) => {
  return c.html(await renderLayout(renderBelgiumCountryPage({
    canonicalUrl: '/countries/belgium',
    request: c.req.raw
  }), {
    title: 'Best Forex Brokers in Belgium 2025 - FSMA Regulated | BrokerAnalysis',
    description: 'Compare the best forex brokers for Belgian traders in 2025. Find top-rated FSMA regulated brokers with competitive spreads, EUR support, and MiFID II compliance.',
    keywords: 'forex brokers Belgium, FSMA regulated, Belgian traders, MetaTrader, forex trading Belgium, EUR trading, XTB, IG Markets, Saxo Bank, Plus500, Pepperstone',
    canonicalUrl: '/countries/belgium',
    request: c.req.raw,
    additionalHead: `
      <link rel="preconnect" href="https://fonts.googleapis.com">

      <meta name="geo.region" content="BE" />
      <meta name="geo.placename" content="Belgium" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:locale" content="en_BE" />
      <meta property="og:type" content="website" />
      <link rel="alternate" hreflang="en" href="${getCurrentDomain(c.req.raw)}/countries/belgium" />
      <link rel="alternate" hreflang="nl" href="${getCurrentDomain(c.req.raw)}/countries/belgium" />
      <link rel="alternate" hreflang="fr" href="${getCurrentDomain(c.req.raw)}/countries/belgium" />
      <link rel="alternate" hreflang="de" href="${getCurrentDomain(c.req.raw)}/countries/belgium" />
    `
  }));
});

// Individual Country Pages - Singapore
pageRoutes.get('/countries/singapore', async (c) => {
  return c.html(await renderLayout(renderSingaporeCountryPage({
    canonicalUrl: '/countries/singapore',
    request: c.req.raw
  }), {
    title: 'Best Forex Brokers in Singapore 2025 - MAS Regulated | BrokerAnalysis',
    description: 'Compare top Singapore forex brokers with MAS regulation. Find the best spreads, platforms, and trading conditions for Singaporean forex traders.',
    keywords: 'Singapore forex brokers, MAS regulated brokers, Singapore forex trading, IC Markets, Pepperstone, Vantage FX, IG Markets, CMC Markets, Saxo Bank',
    canonicalUrl: '/countries/singapore',
    request: c.req.raw
  }));
});

// Individual Country Pages - Dubai/UAE
pageRoutes.get('/countries/dubai', async (c) => {
  return c.html(await renderLayout(renderDubaiCountryPage({
    canonicalUrl: '/countries/dubai',
    request: c.req.raw
  }), {
    title: 'Best Forex Brokers in Dubai 2025 - DFSA Regulated | BrokerAnalysis',
    description: 'Compare top Dubai forex brokers with DFSA regulation. Find the best spreads, platforms, and trading conditions for UAE forex traders.',
    keywords: 'Dubai forex brokers, UAE forex trading, DFSA regulated brokers, IG Markets, Swissquote, Saxo Bank, ADSS, ThinkMarkets, XTB',
    canonicalUrl: '/countries/dubai',
    request: c.req.raw
  }));
});

// Individual Country Pages - South Africa
pageRoutes.get('/countries/south-africa', async (c) => {
  return c.html(await renderLayout(renderSouthAfricaCountryPage({
    canonicalUrl: '/countries/south-africa',
    request: c.req.raw
  }), {
    title: 'Best Forex Brokers in South Africa 2025 - FSCA Regulated | BrokerAnalysis',
    description: 'Compare top South African forex brokers with FSCA regulation. Find the best spreads, platforms, and trading conditions for South African traders.',
    keywords: 'South Africa forex brokers, FSCA regulated brokers, AvaTrade, FXCM, IG Markets, Pepperstone, XM Group, Exness',
    canonicalUrl: '/countries/south-africa',
    request: c.req.raw
  }));
});

// Individual Country Pages - Philippines
pageRoutes.get('/countries/philippines', async (c) => {
  return c.html(await renderLayout(renderPhilippinesCountryPage({
    canonicalUrl: '/countries/philippines',
    request: c.req.raw
  }), {
    title: 'Best Forex Brokers in Philippines 2025 - BSP Regulated | BrokerAnalysis',
    description: 'Compare top Philippines forex brokers with BSP oversight. Find the best spreads, platforms, and trading conditions for Filipino traders.',
    keywords: 'Philippines forex brokers, BSP regulated brokers, Filipino forex trading, XM Group, FXCM, RoboForex, Exness, Pepperstone',
    canonicalUrl: '/countries/philippines',
    request: c.req.raw
  }));
});

// Individual Country Pages - Pakistan
pageRoutes.get('/countries/pakistan', async (c) => {
  return c.html(await renderLayout(renderPakistanCountryPage({
    canonicalUrl: '/countries/pakistan',
    request: c.req.raw
  }), {
    title: 'Best Forex Brokers in Pakistan 2025 - SECP Regulated | BrokerAnalysis',
    description: 'Compare top Pakistan forex brokers with SECP oversight. Find Islamic accounts, competitive spreads, and trading platforms for Pakistani traders.',
    keywords: 'Pakistan forex brokers, SECP regulated brokers, Islamic forex accounts, OctaFX, Exness, FBS, XM Group, InstaForex',
    canonicalUrl: '/countries/pakistan',
    request: c.req.raw
  }));
});

// Individual Country Pages - Nepal
pageRoutes.get('/countries/nepal', async (c) => {
  return c.html(await renderLayout(renderNepalCountryPage({
    canonicalUrl: '/countries/nepal',
    request: c.req.raw
  }), {
    title: 'Best Forex Brokers in Nepal 2025 - International Trading | BrokerAnalysis',
    description: 'Compare the best international forex brokers for Nepali traders in 2025. Find ultra-low deposits, high leverage, and NPR support with comprehensive regulatory insights.',
    keywords: 'Nepal forex brokers, Nepali traders, international forex trading, XM Group, Exness, FBS, OctaFX, IC Markets, Pepperstone, NPR trading, Nepal Rastra Bank',
    canonicalUrl: '/countries/nepal',
    request: c.req.raw,
    additionalHead: `
      <link rel="preconnect" href="https://fonts.googleapis.com">

      <meta name="geo.region" content="NP" />
      <meta name="geo.placename" content="Nepal" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:locale" content="en_NP" />
      <meta property="og:type" content="website" />
      <link rel="alternate" hreflang="en" href="${getCurrentDomain(c.req.raw)}/countries/nepal" />
      <link rel="alternate" hreflang="ne" href="${getCurrentDomain(c.req.raw)}/countries/nepal" />
    `
  }));
});

// Individual Country Pages - Malaysia
pageRoutes.get('/countries/malaysia', async (c) => {
  return c.html(await renderLayout(renderMalaysiaCountryPage({
    canonicalUrl: '/countries/malaysia',
    request: c.req.raw
  }), {
    title: 'Best Forex Brokers in Malaysia 2025 - SC Compliant Trading | BrokerAnalysis',
    description: 'Compare top international forex brokers for Malaysian traders in 2025. Find MYR support, Islamic accounts, and SC-compliant brokers with local bank integration.',
    keywords: 'Malaysia forex brokers, Malaysian traders, SC Malaysia, Islamic forex accounts, MYR trading, XM Group, Exness, OctaFX, FBS, IC Markets, Pepperstone, Shariah compliant',
    canonicalUrl: '/countries/malaysia',
    request: c.req.raw,
    additionalHead: `
      <link rel="preconnect" href="https://fonts.googleapis.com">

      <meta name="geo.region" content="MY" />
      <meta name="geo.placename" content="Malaysia" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:locale" content="en_MY" />
      <meta property="og:type" content="website" />
      <link rel="alternate" hreflang="en" href="${getCurrentDomain(c.req.raw)}/countries/malaysia" />
      <link rel="alternate" hreflang="ms" href="${getCurrentDomain(c.req.raw)}/countries/malaysia" />
    `
  }));
});

// Individual Country Pages - Ethiopia
pageRoutes.get('/countries/ethiopia', async (c) => {
  return c.html(await renderLayout(renderEthiopiaCountryPage({
    canonicalUrl: '/countries/ethiopia',
    request: c.req.raw
  }), {
    title: 'Best Forex Brokers in Ethiopia 2025 - International Trading Access | BrokerAnalysis',
    description: 'Compare top international forex brokers for Ethiopian traders in 2025. Find ETB support, Islamic accounts, and NBE-aware brokers with African market expertise.',
    keywords: 'Ethiopia forex brokers, Ethiopian traders, ETB trading, National Bank of Ethiopia, NBE, Islamic forex accounts, XM Group, Exness, OctaFX, FBS, IC Markets, Ethiopian Birr',
    canonicalUrl: '/countries/ethiopia',
    request: c.req.raw,
    additionalHead: `
      <link rel="preconnect" href="https://fonts.googleapis.com">

      <meta name="geo.region" content="ET" />
      <meta name="geo.placename" content="Ethiopia" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:locale" content="en_ET" />
      <meta property="og:type" content="website" />
      <link rel="alternate" hreflang="en" href="${getCurrentDomain(c.req.raw)}/countries/ethiopia" />
      <link rel="alternate" hreflang="am" href="${getCurrentDomain(c.req.raw)}/countries/ethiopia" />
    `
  }));
});

// Individual Country Pages - Bangladesh
pageRoutes.get('/countries/bangladesh', async (c) => {
  return c.html(await renderLayout(renderBangladeshCountryPage({
    canonicalUrl: '/countries/bangladesh',
    request: c.req.raw
  }), {
    title: 'Best Forex Brokers in Bangladesh 2025 - BB Compliant Trading | BrokerAnalysis',
    description: 'Compare top international forex brokers for Bangladeshi traders in 2025. Find BDT support, mobile banking integration, Islamic accounts, and BB-compliant brokers.',
    keywords: 'Bangladesh forex brokers, Bangladeshi traders, BDT trading, Bangladesh Bank, BB regulation, mobile banking, bKash, Rocket, Nagad, Islamic forex accounts, Bengali support',
    canonicalUrl: '/countries/bangladesh',
    request: c.req.raw,
    additionalHead: `
      <link rel="preconnect" href="https://fonts.googleapis.com">

      <meta name="geo.region" content="BD" />
      <meta name="geo.placename" content="Bangladesh" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:locale" content="en_BD" />
      <meta property="og:type" content="website" />
      <link rel="alternate" hreflang="en" href="${getCurrentDomain(c.req.raw)}/countries/bangladesh" />
      <link rel="alternate" hreflang="bn" href="${getCurrentDomain(c.req.raw)}/countries/bangladesh" />
    `
  }));
});

// Reviews listing page
pageRoutes.get('/reviews', async (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${generateMetaTags(
          'Forex Broker Reviews 2025 - In-Depth Analysis & Ratings | BrokerAnalysis',
          'Comprehensive reviews of 12+ top forex brokers. Read detailed analysis of spreads, regulation, platforms, and features. Updated for 2025.',
          'forex broker reviews, IC Markets review, Pepperstone review, broker ratings, forex broker comparison',
          '/reviews',
          undefined,
          c.req.raw
        )}
        
        <link rel="stylesheet" href="/static/styles.css">
        <link rel="stylesheet" href="/static/styles.css">
    </head>
    <body class="bg-gray-50">
        ${generateNavigation()}
        
        <main class="max-w-6xl mx-auto py-12 px-4">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">Forex Broker Reviews</h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Comprehensive reviews and ratings of the world's top forex brokers. 
                    Each review includes detailed analysis of spreads, regulation, platforms, and more.
                </p>
            </div>

            <!-- Search and Filter -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="broker-search" placeholder="Search brokers..." 
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>
                    <select id="filter-regulation" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">All Regulations</option>
                        <option value="ASIC">ASIC (Australia)</option>
                        <option value="FCA">FCA (UK)</option>
                        <option value="CySEC">CySEC (Cyprus)</option>
                        <option value="CFTC">CFTC (USA)</option>
                    </select>
                    <select id="filter-min-deposit" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Any Deposit</option>
                        <option value="0">$0 - $100</option>
                        <option value="100">$100 - $500</option>
                        <option value="500">$500+</option>
                    </select>
                </div>
            </div>

            <!-- Brokers Grid -->
            <div id="brokers-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Broker cards will be loaded here -->
            </div>

            <!-- Pagination -->
            <div id="pagination" class="mt-12">
                <!-- Pagination will be loaded here -->
            </div>
        </main>

        ${generateFooter()}
        
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                loadBrokers();
                setupFilters();
            });
        </script>
    </body>
    </html>
  `);
});

// Compare brokers page
pageRoutes.get('/compare', async (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${generateMetaTags(
          'Compare Forex Brokers 2025 - Side-by-Side Comparison Tool | BrokerAnalysis',
          'Compare forex brokers side-by-side. Analyze spreads, regulation, platforms, fees, and features to find the perfect broker for your trading needs.',
          'compare forex brokers, broker comparison tool, forex broker analysis, side by side comparison, trading costs',
          '/compare',
          undefined,
          c.req.raw
        )}
        
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        ${generateNavigation()}
        
        <main class="max-w-7xl mx-auto py-12 px-4">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">Compare Forex Brokers</h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Compare up to 4 forex brokers side-by-side. Analyze spreads, regulation, platforms, 
                    and features to make an informed decision.
                </p>
            </div>

            <!-- Enhanced Compare Interface -->
            <div id="compare-interface">
                <!-- Interface will be rendered by enhanced-compare.js -->
            </div>

            <!-- Broker Selection -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 class="text-xl font-semibold mb-4">Select Brokers to Compare</h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4" id="broker-selection">
                    <!-- Broker selection dropdowns will be loaded here -->
                </div>
                <div class="mt-4">
                    <button id="compare-button" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <i class="fas fa-balance-scale mr-2"></i>
                        Compare Selected Brokers
                    </button>
                </div>
            </div>

            <!-- Comparison Results -->
            <div id="comparison-results" class="bg-white rounded-lg shadow-sm p-6 mb-8 hidden">
                <h2 class="text-xl font-semibold mb-6">Broker Comparison Results</h2>
                <div id="comparison-table">
                    <!-- Comparison table will be loaded here -->
                </div>
            </div>

            <!-- Quick Compare Popular Brokers -->
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h2 class="text-xl font-semibold mb-6">Popular Comparisons</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer" onclick="loadComparison(['ic-markets', 'pepperstone'])">
                        <h3 class="font-semibold text-gray-900 mb-2">IC Markets vs Pepperstone</h3>
                        <p class="text-sm text-gray-600">Compare Australia's top two ECN brokers</p>
                        <div class="mt-2 text-xs text-blue-600">Click to compare →</div>
                    </div>
                    <div class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer" onclick="loadComparison(['fp-markets', 'ic-markets'])">
                        <h3 class="font-semibold text-gray-900 mb-2">FP Markets vs IC Markets</h3>
                        <p class="text-sm text-gray-600">ASIC-regulated brokers head-to-head</p>
                        <div class="mt-2 text-xs text-blue-600">Click to compare →</div>
                    </div>
                    <div class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer" onclick="loadComparison(['exness', 'xm'])">
                        <h3 class="font-semibold text-gray-900 mb-2">Exness vs XM</h3>
                        <p class="text-sm text-gray-600">Popular international brokers comparison</p>
                        <div class="mt-2 text-xs text-blue-600">Click to compare →</div>
                    </div>
                </div>
            </div>

            <!-- SEO Content -->
            <div class="mt-16 prose max-w-none">
                <h2 class="text-3xl font-bold text-gray-900 mb-6">How to Compare Forex Brokers</h2>
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Key Comparison Factors</h3>
                        <ul class="space-y-2 text-gray-700">
                            <li><strong>Regulation:</strong> Check for FCA, ASIC, CySEC, or CFTC oversight</li>
                            <li><strong>Spreads & Costs:</strong> Compare EUR/USD spreads and commission structures</li>
                            <li><strong>Trading Platforms:</strong> MT4, MT5, or proprietary platform features</li>
                            <li><strong>Execution:</strong> Market vs ECN execution models</li>
                            <li><strong>Leverage:</strong> Maximum leverage offered for your region</li>
                            <li><strong>Deposit Requirements:</strong> Minimum deposit amounts</li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Advanced Features</h3>
                        <ul class="space-y-2 text-gray-700">
                            <li><strong>Asset Classes:</strong> Forex, indices, commodities, cryptocurrencies</li>
                            <li><strong>Research Tools:</strong> Market analysis and trading signals</li>
                            <li><strong>Education:</strong> Webinars, tutorials, and learning resources</li>
                            <li><strong>Customer Support:</strong> 24/7 availability and response quality</li>
                            <li><strong>Mobile Trading:</strong> App features and usability</li>
                            <li><strong>Payment Methods:</strong> Deposit and withdrawal options</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>

        ${generateFooter()}
        
        <script>
            class ComparisonTool {
                constructor() {
                    this.brokers = [];
                    this.selectedBrokers = [];
                    this.init();
                }

                async init() {
                    await this.loadBrokers();
                    this.setupSelectors();
                    this.setupEventListeners();
                }

                async loadBrokers() {
                    try {
                        const response = await fetch('/api/brokers?limit=100');
                        const data = await response.json();
                        this.brokers = data.brokers || [];
                        console.log('Loaded brokers:', this.brokers.length);
                    } catch (error) {
                        console.error('Failed to load brokers:', error);
                    }
                }

                setupSelectors() {
                    const container = document.getElementById('broker-selection');
                    container.innerHTML = '';
                    
                    for (let i = 1; i <= 4; i++) {
                        const selectorDiv = document.createElement('div');
                        selectorDiv.className = 'bg-gray-50 p-4 rounded-lg';
                        selectorDiv.innerHTML = \`
                            <label class="block text-sm font-medium text-gray-700 mb-2">Broker \${i}</label>
                            <select id="broker-\${i}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                                <option value="">Select a broker</option>
                                \${this.brokers.map(broker => 
                                    \`<option value="\${broker.id}">\${broker.name}</option>\`
                                ).join('')}
                            </select>
                        \`;
                        container.appendChild(selectorDiv);
                    }
                }

                setupEventListeners() {
                    const compareButton = document.getElementById('compare-button');
                    compareButton.addEventListener('click', () => this.compareBrokers());

                    // Add change listeners to selectors
                    for (let i = 1; i <= 4; i++) {
                        const selector = document.getElementById(\`broker-\${i}\`);
                        selector.addEventListener('change', () => this.updateCompareButton());
                    }
                }

                updateCompareButton() {
                    const selectedIds = [];
                    for (let i = 1; i <= 4; i++) {
                        const selector = document.getElementById(\`broker-\${i}\`);
                        if (selector.value) {
                            selectedIds.push(selector.value);
                        }
                    }

                    const compareButton = document.getElementById('compare-button');
                    compareButton.disabled = selectedIds.length < 2;
                    compareButton.textContent = \`Compare \${selectedIds.length} Brokers\`;
                }

                async compareBrokers() {
                    const selectedIds = [];
                    for (let i = 1; i <= 4; i++) {
                        const selector = document.getElementById(\`broker-\${i}\`);
                        if (selector.value) {
                            selectedIds.push(selector.value);
                        }
                    }

                    if (selectedIds.length < 2) {
                        alert('Please select at least 2 brokers to compare');
                        return;
                    }

                    try {
                        const response = await fetch(\`/api/compare?brokers=\${selectedIds.join(',')}\`);
                        const data = await response.json();
                        this.displayComparison(data.brokers);
                    } catch (error) {
                        console.error('Comparison failed:', error);
                        alert('Failed to load comparison data');
                    }
                }

                displayComparison(brokers) {
                    const resultsContainer = document.getElementById('comparison-results');
                    const tableContainer = document.getElementById('comparison-table');
                    
                    if (!brokers || brokers.length === 0) {
                        tableContainer.innerHTML = '<p>No comparison data available</p>';
                        return;
                    }

                    // Create comparison table
                    let tableHTML = \`
                        <div class="overflow-x-auto">
                            <table class="min-w-full border border-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-4 py-2 text-left">Criteria</th>
                                        \${brokers.map(broker => 
                                            \`<th class="px-4 py-2 text-center">\${broker.name}</th>\`
                                        ).join('')}
                                    </tr>
                                </thead>
                                <tbody>
                    \`;

                    // Add comparison rows
                    const criteria = [
                        {label: 'Overall Rating', key: 'rating', formatter: (v) => \`\${v}/5 ⭐\`},
                        {label: 'Min Deposit', key: 'min_deposit_usd', formatter: (v) => \`$\${v}\`},
                        {label: 'Max Leverage', key: 'max_leverage', formatter: (v) => v},
                        {label: 'Spread Type', key: 'spread_type', formatter: (v) => v},
                        {label: 'Regulation Score', key: 'regulation_trust_score', formatter: (v) => \`\${v}/10\`},
                        {label: 'Fees Score', key: 'fees_score', formatter: (v) => \`\${v}/10\`}
                    ];

                    criteria.forEach(criterion => {
                        tableHTML += \`
                            <tr class="border-t">
                                <td class="px-4 py-2 font-medium">\${criterion.label}</td>
                                \${brokers.map(broker => 
                                    \`<td class="px-4 py-2 text-center">\${criterion.formatter(broker[criterion.key] || 'N/A')}</td>\`
                                ).join('')}
                            </tr>
                        \`;
                    });

                    tableHTML += \`
                                </tbody>
                            </table>
                        </div>
                    \`;

                    tableContainer.innerHTML = tableHTML;
                    resultsContainer.classList.remove('hidden');
                }
            }

            function loadComparison(brokerSlugs) {
                // This would need to be implemented for predefined comparisons
                console.log('Loading comparison for:', brokerSlugs);
                // For now, we'll skip this functionality
            }

            document.addEventListener('DOMContentLoaded', function() {
                new ComparisonTool();
            });
        </script>

        <!-- Enhanced Compare System -->
        <script src="/static/enhanced-compare.js"></script>
    </body>
    </html>
  `);
});

// Contact page
pageRoutes.get('/contact', async (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${generateMetaTags(
          'Contact BrokerAnalysis - Get in Touch | Forex Broker Reviews',
          'Contact our team for questions about forex brokers, reviews, or website features. We\'re here to help you find the perfect trading partner.',
          'contact broker analysis, forex broker questions, support, help',
          '/contact',
          undefined,
          c.req.raw
        )}
        
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        ${generateNavigation()}
        
        <main class="max-w-4xl mx-auto py-12 px-4">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Have questions about forex brokers or our platform? We're here to help you make informed trading decisions.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <!-- Contact Form -->
                <div class="bg-white rounded-lg shadow-sm p-8">
                    <h2 class="text-2xl font-semibold mb-6">Send us a Message</h2>
                    <form id="contact-form" class="space-y-6">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input type="text" id="name" name="name" required
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        </div>
                        
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input type="email" id="email" name="email" required
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        </div>
                        
                        <div>
                            <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                            <select id="subject" name="subject" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="">Select a topic</option>
                                <option value="broker-inquiry">Broker Inquiry</option>
                                <option value="review-question">Review Question</option>
                                <option value="technical-support">Technical Support</option>
                                <option value="partnership">Partnership Inquiry</option>
                                <option value="general">General Question</option>
                                <option value="feedback">Feedback</option>
                            </select>
                        </div>
                        
                        <div>
                            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea id="message" name="message" rows="5" required
                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                        </div>
                        
                        <button type="submit" class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                            <i class="fas fa-paper-plane mr-2"></i>
                            Send Message
                        </button>
                    </form>
                </div>

                <!-- Contact Information -->
                <div>
                    <div class="bg-white rounded-lg shadow-sm p-8 mb-8">
                        <h2 class="text-2xl font-semibold mb-6">Get in Touch</h2>
                        
                        <div class="space-y-6">
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-envelope text-blue-600"></i>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-semibold text-gray-900">Email Support</h3>
                                    <p class="text-gray-600">contact@brokeranalysis.com</p>
                                    <p class="text-sm text-gray-500">We typically respond within 24 hours</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-clock text-green-600"></i>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-semibold text-gray-900">Response Time</h3>
                                    <p class="text-gray-600">Mon-Fri: Within 24 hours</p>
                                    <p class="text-gray-600">Weekends: Within 48 hours</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-question-circle text-purple-600"></i>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-semibold text-gray-900">FAQ</h3>
                                    <p class="text-gray-600">Check our FAQ section for quick answers</p>
                                    <a href="/#faq" class="text-blue-600 hover:underline text-sm">View FAQ →</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Common Questions -->
                    <div class="bg-blue-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                            Common Questions
                        </h3>
                        <div class="space-y-3 text-sm">
                            <div>
                                <p class="font-medium text-gray-900">How do you rate brokers?</p>
                                <p class="text-gray-600">We use a comprehensive 6-category scoring system based on regulation, costs, platforms, and more.</p>
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">Are your reviews independent?</p>
                                <p class="text-gray-600">Yes, all reviews are based on our objective methodology with no pay-for-placement policies.</p>
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">How often are reviews updated?</p>
                                <p class="text-gray-600">We update broker information and ratings quarterly to ensure accuracy.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        ${generateFooter()}
        
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                setupContactForm();
            });
            
            function setupContactForm() {
                const form = document.getElementById('contact-form');
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Basic form validation
                    const name = document.getElementById('name').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const subject = document.getElementById('subject').value;
                    const message = document.getElementById('message').value.trim();
                    
                    if (!name || !email || !subject || !message) {
                        alert('Please fill in all required fields');
                        return;
                    }
                    
                    // Email validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        alert('Please enter a valid email address');
                        return;
                    }
                    
                    // Show success message (in real implementation, send to backend)
                    const button = form.querySelector('button[type="submit"]');
                    const originalText = button.innerHTML;
                    
                    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
                    button.disabled = true;
                    
                    // Simulate API call
                    setTimeout(() => {
                        button.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
                        button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                        button.classList.add('bg-green-600');
                        
                        // Show success message
                        const successMsg = document.createElement('div');
                        successMsg.className = 'mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded';
                        successMsg.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Thank you! Your message has been sent. We\'ll get back to you within 24 hours.';
                        form.appendChild(successMsg);
                        
                        setTimeout(() => {
                            button.innerHTML = originalText;
                            button.disabled = false;
                            button.classList.remove('bg-green-600');
                            button.classList.add('bg-blue-600', 'hover:bg-blue-700');
                            form.reset();
                            successMsg.remove();
                        }, 5000);
                    }, 1500);
                });
            }
        </script>
    </body>
    </html>
  `);
});

// About page
pageRoutes.get('/about', async (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${generateMetaTags(
          'About BrokerAnalysis - Our Methodology & Team | Forex Broker Reviews',
          'Learn about our rigorous broker review methodology, rating system, and commitment to helping traders find the best forex brokers.',
          'about broker analysis, forex broker methodology, rating system, broker reviews',
          '/about',
          undefined,
          c.req.raw
        )}
        
        <link rel="stylesheet" href="/static/styles.css">
        <link rel="stylesheet" href="/static/styles.css">
    </head>
    <body class="bg-gray-50">
        ${generateNavigation()}
        
        <main class="max-w-4xl mx-auto py-12 px-4">
            <div class="bg-white rounded-lg shadow-sm p-8">
                <h1 class="text-4xl font-bold text-gray-900 mb-6">About BrokerAnalysis</h1>
                
                <div class="prose prose-lg max-w-none">
                    <p class="text-xl text-gray-600 mb-8">
                        BrokerAnalysis is dedicated to helping forex traders find the perfect broker through 
                        comprehensive reviews, intelligent recommendations, and transparent analysis.
                    </p>

                    <h2 class="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
                    <p>
                        We believe every trader deserves access to accurate, unbiased information about forex brokers. 
                        Our mission is to democratize broker selection by providing data-driven insights and 
                        AI-powered recommendations that match traders with brokers suited to their specific needs.
                    </p>

                    <h2 class="text-2xl font-bold mt-8 mb-4">Review Methodology</h2>
                    <p>Our comprehensive review process evaluates brokers across multiple dimensions:</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                        <div class="bg-blue-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-3">
                                <i class="fas fa-shield-alt text-blue-600 mr-2"></i>
                                Regulation & Safety (25%)
                            </h3>
                            <ul class="text-sm space-y-1">
                                <li>• Regulatory oversight quality</li>
                                <li>• Capital adequacy requirements</li>
                                <li>• Investor protection schemes</li>
                                <li>• Corporate transparency</li>
                            </ul>
                        </div>
                        
                        <div class="bg-green-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-3">
                                <i class="fas fa-chart-line text-green-600 mr-2"></i>
                                Trading Costs (25%)
                            </h3>
                            <ul class="text-sm space-y-1">
                                <li>• Spread competitiveness</li>
                                <li>• Commission structures</li>
                                <li>• Swap/rollover rates</li>
                                <li>• Hidden fees analysis</li>
                            </ul>
                        </div>
                        
                        <div class="bg-purple-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-3">
                                <i class="fas fa-desktop text-purple-600 mr-2"></i>
                                Trading Platforms (20%)
                            </h3>
                            <ul class="text-sm space-y-1">
                                <li>• Platform reliability & speed</li>
                                <li>• Available features & tools</li>
                                <li>• Mobile app quality</li>
                                <li>• Third-party integration</li>
                            </ul>
                        </div>
                        
                        <div class="bg-orange-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-3">
                                <i class="fas fa-headset text-orange-600 mr-2"></i>
                                Service & Support (15%)
                            </h3>
                            <ul class="text-sm space-y-1">
                                <li>• Customer support quality</li>
                                <li>• Educational resources</li>
                                <li>• Account management</li>
                                <li>• Market research & analysis</li>
                            </ul>
                        </div>
                        
                        <div class="bg-red-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-3">
                                <i class="fas fa-coins text-red-600 mr-2"></i>
                                Market Access (10%)
                            </h3>
                            <ul class="text-sm space-y-1">
                                <li>• Available instruments</li>
                                <li>• Market depth & liquidity</li>
                                <li>• Execution quality</li>
                                <li>• Market hours coverage</li>
                            </ul>
                        </div>
                        
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-3">
                                <i class="fas fa-user-friends text-gray-600 mr-2"></i>
                                User Experience (5%)
                            </h3>
                            <ul class="text-sm space-y-1">
                                <li>• Account opening process</li>
                                <li>• Deposit/withdrawal ease</li>
                                <li>• Website usability</li>
                                <li>• Overall user satisfaction</li>
                            </ul>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold mt-8 mb-4">Data Sources</h2>
                    <p>
                        We gather data from multiple authoritative sources to ensure accuracy and completeness:
                    </p>
                    <ul class="list-disc list-inside mt-4 space-y-2">
                        <li>Direct testing of broker platforms and services</li>
                        <li>Official regulatory filings and disclosures</li>
                        <li>Real-time spread monitoring and execution analysis</li>
                        <li>Customer feedback and industry surveys</li>
                        <li>Third-party auditing reports and certifications</li>
                    </ul>

                    <h2 class="text-2xl font-bold mt-8 mb-4">Transparency & Ethics</h2>
                    <p>
                        We maintain strict editorial independence and transparency in our review process:
                    </p>
                    <ul class="list-disc list-inside mt-4 space-y-2">
                        <li><strong>No pay-for-placement:</strong> Rankings are based solely on our objective scoring methodology</li>
                        <li><strong>Regular updates:</strong> Reviews are updated quarterly to reflect current market conditions</li>
                        <li><strong>Conflict disclosure:</strong> Any potential conflicts of interest are clearly disclosed</li>
                        <li><strong>Open methodology:</strong> Our rating criteria and weightings are publicly available</li>
                    </ul>

                    <div class="bg-blue-50 p-6 rounded-lg mt-8">
                        <h3 class="text-xl font-bold mb-2">
                            <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                            Risk Disclosure
                        </h3>
                        <p class="text-sm text-gray-700">
                            Trading forex involves significant risk and may not be suitable for all investors. 
                            The high degree of leverage can work against you as well as for you. Before deciding 
                            to trade forex, you should carefully consider your investment objectives, level of 
                            experience, and risk appetite. You should be aware of all the risks associated with 
                            trading and seek advice from an independent financial advisor if you have any doubts.
                        </p>
                    </div>
                </div>
            </div>
        </main>

        ${generateFooter()}
    </body>
    </html>
  `);
});



// Country-specific broker pages
const countryPages = [
  { slug: 'australia', name: 'Australia', regulator: 'ASIC' },
  { slug: 'uk', name: 'United Kingdom', regulator: 'FCA' },
  { slug: 'canada', name: 'Canada', regulator: 'IIROC' },
  { slug: 'usa', name: 'United States', regulator: 'CFTC/NFA' },
  { slug: 'south-africa', name: 'South Africa', regulator: 'FSCA' },
  { slug: 'pakistan', name: 'Pakistan', regulator: 'SECP' },
  { slug: 'philippines', name: 'Philippines', regulator: 'BSP' },
  { slug: 'india', name: 'India', regulator: 'SEBI' },
  { slug: 'malaysia', name: 'Malaysia', regulator: 'SC' },
  { slug: 'dubai', name: 'Dubai/UAE', regulator: 'DFSA' },
  { slug: 'qatar', name: 'Qatar', regulator: 'QFCRA' },
  { slug: 'indonesia', name: 'Indonesia', regulator: 'Bappebti' }
];

// ========================
// SPECIFIC BROKER CATEGORY ROUTES
// CRITICAL: These MUST be defined BEFORE the dynamic country routes to avoid conflicts
// ========================

// Gold Trading Brokers Page
pageRoutes.get('/brokers/gold-trading', async (c) => {
  try {
    const content = renderGoldTradingBrokersPage({
      canonicalUrl: '/brokers/gold-trading',
      request: c.req.raw
    });
    
    return c.html(await renderLayout(content, {
      title: 'Best Gold Trading Brokers 2025 - XAU/USD Specialists | BrokerAnalysis',
      description: 'Compare the top 7 gold trading brokers for 2025. Find brokers with tight XAU/USD spreads, multiple gold instruments, and advanced precious metals trading platforms.',
      keywords: 'gold trading brokers, XAU/USD brokers, gold CFD trading, precious metals brokers, gold forex trading, FXTM, Pepperstone, FP Markets, AvaTrade, gold trading platforms',
      canonicalUrl: '/brokers/gold-trading',
      request: c.req.raw,
      additionalHead: `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        
        <!-- Gold Trading Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Best Gold Trading Brokers 2025",
          "description": "Compare top forex brokers for gold trading with XAU/USD specialization",
          "url": "${getCurrentDomain(c.req.raw)}/brokers/gold-trading",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Gold Trading Brokers",
            "numberOfItems": 7
          }
        }
        </script>

        <!-- FAQ Schema for Gold Trading -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What are the best brokers for gold trading?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The best gold trading brokers include FXTM, Pepperstone, FP Markets, and XM, offering tight spreads, multiple gold instruments, and advanced trading platforms."
              }
            },
            {
              "@type": "Question",
              "name": "What is XAU/USD in gold trading?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "XAU/USD is the most popular gold trading pair representing 1 troy ounce of gold priced in US Dollars. It's the standard for gold CFD trading."
              }
            }
          ]
        }
        </script>
      `
    }));
  } catch (error) {
    console.error('Gold trading page error:', error);
    return c.html(`<h1>Error: ${error.message}</h1>`, 500);
  }
});

// Islamic Account Brokers Page
pageRoutes.get('/brokers/islamic-accounts', async (c) => {
  try {
    const content = renderIslamicAccountBrokersPage({
      canonicalUrl: '/brokers/islamic-accounts',
      request: c.req.raw
    });
    
    return c.html(await renderLayout(content, {
      title: 'Best Islamic Forex Brokers 2025 - Halal & Swap-Free Accounts | BrokerAnalysis',
      description: 'Compare the top 6 Islamic (Halal) forex brokers offering Shariah-compliant swap-free accounts. Find trusted brokers with no overnight interest charges for Muslim traders.',
      keywords: 'Islamic forex brokers, halal forex trading, swap-free accounts, Shariah compliant brokers, Muslim forex trading, FXTM Islamic, Pepperstone swap-free, Islamic trading accounts',
      canonicalUrl: '/brokers/islamic-accounts',
      request: c.req.raw
    }));
  } catch (error) {
    console.error('Islamic accounts page error:', error);
    return c.html(`<h1>Error loading Islamic accounts page: ${error.message}</h1>`, 500);
  }
});

// Automated Trading Brokers Page
pageRoutes.get('/brokers/automated-trading', async (c) => {
  try {
    const content = renderAutomatedTradingBrokersPage({
      canonicalUrl: '/brokers/automated-trading',
      request: c.req.raw
    });
    
    return c.html(await renderLayout(content, {
      title: 'Best Automated Forex Trading Brokers 2025 - EA & API Support | BrokerAnalysis',
      description: 'Compare the top 5 forex brokers for automated trading, Expert Advisors (EAs), and algorithmic strategies. Find platforms with fast execution, API access, and VPS hosting.',
      keywords: 'automated forex trading, Expert Advisors, EA brokers, algorithmic trading, forex APIs, MT4 EA, MT5 EA, Alpari, Pepperstone automated trading, forex robots',
      canonicalUrl: '/brokers/automated-trading',
      request: c.req.raw
    }));
  } catch (error) {
    console.error('Automated trading page error:', error);
    return c.html(`<h1>Error loading automated trading page: ${error.message}</h1>`, 500);
  }
});

// High Leverage Brokers Page
pageRoutes.get('/brokers/high-leverage', async (c) => {
  try {
    const content = renderHighLeverageBrokersPage({
      canonicalUrl: '/brokers/high-leverage',
      request: c.req.raw
    });
    
    return c.html(await renderLayout(content, {
      title: 'Best High Leverage Forex Brokers 2025 - Up to 1:2000 Leverage | BrokerAnalysis',
      description: 'Compare the top high leverage forex brokers offering 1:500, 1:1000, and 1:2000+ leverage. Find brokers with professional accounts, tight spreads, and advanced risk management.',
      keywords: 'high leverage forex brokers, 1:500 leverage, 1:1000 leverage, 1:2000 leverage, professional forex accounts, FXTM, BlackBull Markets, Pepperstone, high leverage trading',
      canonicalUrl: '/brokers/high-leverage',
      request: c.req.raw,
      additionalHead: `
        <!-- High Leverage Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Best High Leverage Forex Brokers 2025",
          "description": "Compare top forex brokers offering high leverage up to 1:2000",
          "url": "${getCurrentDomain(c.req.raw)}/brokers/high-leverage",
          "mainEntity": {
            "@type": "ItemList",
            "name": "High Leverage Forex Brokers",
            "numberOfItems": 6
          }
        }
        </script>

        <!-- FAQ Schema for High Leverage -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the highest leverage available in forex?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Some offshore brokers offer leverage up to 1:3000, but common high leverage ratios are 1:500 to 1:2000. FXTM offers up to 1:2000 through offshore entities."
              }
            },
            {
              "@type": "Question",
              "name": "Is high leverage trading safe?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "High leverage trading carries significant risk and amplifies both profits and losses. Only experienced traders with proper risk management should consider high leverage."
              }
            }
          ]
        }
        </script>
      `
    }));
  } catch (error) {
    console.error('High leverage page error:', error);
    return c.html(`<h1>Error loading high leverage page: ${error.message}</h1>`, 500);
  }
});

// Oil Trading Brokers Page
pageRoutes.get('/brokers/oil-trading', async (c) => {
  try {
    const content = renderOilTradingBrokersPage({
      canonicalUrl: '/brokers/oil-trading',
      request: c.req.raw
    });
    
    return c.html(await renderLayout(content, {
      title: 'Best Oil Trading Brokers 2025 - WTI & Brent Crude Oil CFDs | BrokerAnalysis',
      description: 'Compare the top 8 oil trading brokers for WTI and Brent crude oil CFDs. Find brokers with tight spreads, professional platforms, and energy market specialization.',
      keywords: 'oil trading brokers, crude oil CFD, WTI trading, Brent crude trading, energy CFDs, commodity brokers, oil futures, FXTM oil, Axi oil trading, IG oil',
      canonicalUrl: '/brokers/oil-trading',
      request: c.req.raw,
      additionalHead: `
        <!-- Oil Trading Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Best Oil Trading Brokers 2025",
          "description": "Compare top forex brokers for WTI and Brent crude oil CFD trading",
          "url": "${getCurrentDomain(c.req.raw)}/brokers/oil-trading",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Oil Trading Brokers",
            "numberOfItems": 8
          }
        }
        </script>

        <!-- FAQ Schema for Oil Trading -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the difference between WTI and Brent crude oil?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "WTI (West Texas Intermediate) is the US benchmark for crude oil, while Brent Crude is the international benchmark. Brent is typically priced $2-5 higher than WTI due to different quality characteristics and transportation costs."
              }
            },
            {
              "@type": "Question",
              "name": "Which broker offers the tightest oil trading spreads?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Axi offers the tightest spreads with raw spreads starting from 0.0 pips, followed by FXTM with 0.4 pips average. However, always check current live spreads as they vary with market conditions."
              }
            }
          ]
        }
        </script>
      `
    }));
  } catch (error) {
    console.error('Oil trading page error:', error);
    return c.html(`<h1>Error loading oil trading page: ${error.message}</h1>`, 500);
  }
});

// Copy Trading Brokers Page
pageRoutes.get('/brokers/copy-trading', async (c) => {
  try {
    const content = renderCopyTradingBrokersPage({
      canonicalUrl: '/brokers/copy-trading',
      request: c.req.raw
    });
    
    return c.html(await renderLayout(content, {
      title: 'Best Copy Trading Brokers 2025 - Social Trading Platforms | BrokerAnalysis',
      description: 'Compare the top 8 copy trading brokers and social trading platforms. Find brokers with advanced signal copying, large communities, and proven performance tracking.',
      keywords: 'copy trading brokers, social trading platforms, signal providers, eToro copy trading, ZuluTrade, mirror trading, automated copying, social forex trading',
      canonicalUrl: '/brokers/copy-trading',
      request: c.req.raw,
      additionalHead: `
        <!-- Copy Trading Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Best Copy Trading Brokers 2025",
          "description": "Compare top copy trading brokers and social trading platforms for automated signal copying",
          "url": "${getCurrentDomain(c.req.raw)}/brokers/copy-trading",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Copy Trading Brokers",
            "numberOfItems": 8
          }
        }
        </script>

        <!-- FAQ Schema for Copy Trading -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is copy trading profitable?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Copy trading can be profitable if you choose skilled signal providers and manage risk properly. However, past performance doesn't guarantee future results, and all trading involves risk of loss."
              }
            },
            {
              "@type": "Question",
              "name": "Which broker is best for copy trading beginners?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "eToro is ideal for beginners with its user-friendly interface, social features, and CopyTrader™ system designed specifically for copy trading with extensive educational resources."
              }
            }
          ]
        }
        </script>
      `
    }));
  } catch (error) {
    console.error('Copy trading page error:', error);
    return c.html(`<h1>Error loading copy trading page: ${error.message}</h1>`, 500);
  }
});

// ECN Brokers Page
pageRoutes.get('/brokers/ecn', async (c) => {
  try {
    const content = renderECNBrokersPage({
      canonicalUrl: '/brokers/ecn',
      request: c.req.raw
    });
    
    return c.html(await renderLayout(content, {
      title: 'Best ECN Forex Brokers 2025 - True ECN & Raw Spreads | BrokerAnalysis',
      description: 'Compare the top 8 ECN (Electronic Communication Network) forex brokers offering raw spreads from 0.0 pips, DMA execution, and professional trading conditions.',
      keywords: 'ECN forex brokers, raw spreads, DMA execution, electronic communication network, ECN vs STP, IC Markets ECN, FP Markets ECN, Pepperstone ECN, BlackBull ECN',
      canonicalUrl: '/brokers/ecn',
      request: c.req.raw,
      additionalHead: `
        <!-- ECN Brokers Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Best ECN Forex Brokers 2025",
          "description": "Compare top ECN forex brokers with raw spreads and direct market access execution",
          "url": "${getCurrentDomain(c.req.raw)}/brokers/ecn",
          "mainEntity": {
            "@type": "ItemList",
            "name": "ECN Forex Brokers",
            "numberOfItems": 8
          }
        }
        </script>

        <!-- FAQ Schema for ECN -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is an ECN broker?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "An ECN (Electronic Communication Network) broker provides direct market access where trades are executed directly with liquidity providers, banks, and other traders, offering raw spreads with commission-based pricing."
              }
            },
            {
              "@type": "Question",
              "name": "What's the difference between ECN and STP brokers?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "ECN brokers offer direct access to the interbank market with raw spreads plus commission, while STP brokers route orders to liquidity providers but may mark up spreads instead of charging commission."
              }
            },
            {
              "@type": "Question",
              "name": "Which ECN broker has the lowest spreads?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "IC Markets offers the tightest ECN spreads starting from 0.0 pips on EUR/USD with $3.50 commission per lot, followed by FP Markets and Pepperstone with similar raw spread offerings."
              }
            }
          ]
        }
        </script>
      `
    }));
  } catch (error) {
    console.error('ECN page error:', error);
    return c.html(`<h1>Error loading ECN page: ${error.message}</h1>`, 500);
  }
});

// Scalping Brokers Page
pageRoutes.get('/brokers/scalping', async (c) => {
  try {
    const content = renderScalpingBrokersPage({
      canonicalUrl: '/brokers/scalping',
      request: c.req.raw
    });
    
    return c.html(await renderLayout(content, {
      title: 'Best Scalping Forex Brokers 2025 - Ultra-Fast Execution & Low Spreads | BrokerAnalysis',
      description: 'Compare the top 8 scalping forex brokers with ultra-fast execution speeds, raw spreads from 0.02 pips, VPS hosting, and professional trading infrastructure for scalpers.',
      keywords: 'scalping forex brokers, fast execution brokers, ultra low spreads, VPS hosting, ECN scalping, BlackBull Markets, IC Markets scalping, Pepperstone scalping',
      canonicalUrl: '/brokers/scalping',
      request: c.req.raw,
      additionalHead: `
        <!-- Scalping Brokers Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Best Scalping Forex Brokers 2025",
          "description": "Compare top forex brokers for scalping with ultra-fast execution, raw spreads, and professional trading infrastructure",
          "url": "${getCurrentDomain(c.req.raw)}/brokers/scalping",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Scalping Forex Brokers",
            "numberOfItems": 8
          }
        }
        </script>

        <!-- FAQ Schema for Scalping -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is forex scalping?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Forex scalping is a high-frequency trading strategy where traders make numerous small trades throughout the day, typically holding positions for seconds to minutes, aiming to profit from small price movements."
              }
            },
            {
              "@type": "Question",
              "name": "Which broker has the fastest execution for scalping?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "BlackBull Markets offers the fastest execution speeds at 72ms average, followed by Pepperstone at 77ms and IC Markets at 134ms, making them ideal for scalping strategies."
              }
            },
            {
              "@type": "Question",
              "name": "Is scalping profitable?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Scalping can be profitable for experienced traders with proper risk management, but it requires discipline, fast execution, and low trading costs. Most scalpers need significant capital and professional tools to succeed."
              }
            }
          ]
        }
        </script>
      `
    }));
  } catch (error) {
    console.error('Scalping page error:', error);
    return c.html(`<h1>Error loading scalping page: ${error.message}</h1>`, 500);
  }
});

// Demo Account Brokers Page
pageRoutes.get('/brokers/demo-accounts', async (c) => {
  try {
    const content = renderDemoAccountBrokersPage({
      canonicalUrl: '/brokers/demo-accounts',
      request: c.req.raw
    });
    
    return c.html(await renderLayout(content, {
      title: 'Best Forex Demo Accounts 2025 - Risk-Free Practice Trading | BrokerAnalysis',
      description: 'Compare the top 8 forex demo accounts for risk-free practice trading. Find brokers with unlimited demos, real market data, and comprehensive educational resources.',
      keywords: 'forex demo accounts, practice trading, risk-free forex, demo trading platforms, XM demo, eToro demo, IG Markets demo, OANDA demo',
      canonicalUrl: '/brokers/demo-accounts',
      request: c.req.raw
    }));
  } catch (error) {
    console.error('Demo accounts page error:', error);
    return c.html(`<h1>Error loading demo accounts page: ${error.message}</h1>`, 500);
  }
});

// MT4 Brokers Page
pageRoutes.get('/brokers/mt4', async (c) => {
  try {
    const content = renderMT4BrokersPage({
      canonicalUrl: '/brokers/mt4',
      request: c.req.raw
    });
    
    return c.html(await renderLayout(content, {
      title: 'Best MT4 Forex Brokers 2025 - MetaTrader 4 Specialists | BrokerAnalysis',
      description: 'Compare the top 8 MetaTrader 4 forex brokers with advanced tools, Expert Advisor support, and enhanced MT4 features for professional trading.',
      keywords: 'MT4 forex brokers, MetaTrader 4, Expert Advisors, MT4 tools, Pepperstone Smart Trader Tools, IC Markets MT4, automated trading',
      canonicalUrl: '/brokers/mt4',
      request: c.req.raw
    }));
  } catch (error) {
    console.error('MT4 page error:', error);
    return c.html(`<h1>Error loading MT4 page: ${error.message}</h1>`, 500);
  }
});

// Stock Trading Brokers Page
pageRoutes.get('/brokers/stock-trading', async (c) => {
  try {
    const content = renderStockTradingBrokersPage({
      canonicalUrl: '/brokers/stock-trading',
      request: c.req.raw
    });
    
    return c.html(await renderLayout(content, {
      title: 'Best Stock Trading Brokers 2025 - Global Equity Markets | BrokerAnalysis',
      description: 'Compare the top 8 stock trading brokers offering access to global markets, commission-free trading, and professional research tools for equity investors.',
      keywords: 'stock trading brokers, equity trading, global stock markets, commission-free stocks, Interactive Brokers, eToro stocks, IG Markets stocks',
      canonicalUrl: '/brokers/stock-trading',
      request: c.req.raw
    }));
  } catch (error) {
    console.error('Stock trading page error:', error);
    return c.html(`<h1>Error loading stock trading page: ${error.message}</h1>`, 500);
  }
});

// Beginners Brokers Page
pageRoutes.get('/brokers/beginners', async (c) => {
  try {
    const content = renderBeginnersBrokersPage({
      canonicalUrl: '/brokers/beginners',
      request: c.req.raw
    });
    
    return c.html(await renderLayout(content, {
      title: 'Best Forex Brokers for Beginners 2025 - Start Trading Safely | BrokerAnalysis',
      description: 'Compare the top 8 beginner-friendly forex brokers offering comprehensive education, demo accounts, low deposits, and user-friendly platforms for new traders.',
      keywords: 'forex brokers beginners, beginner forex trading, forex education, demo accounts, low minimum deposit, eToro beginners, XM beginners',
      canonicalUrl: '/brokers/beginners',
      request: c.req.raw
    }));
  } catch (error) {
    console.error('Beginners page error:', error);
    return c.html(`<h1>Error loading beginners page: ${error.message}</h1>`, 500);
  }
});

// Scalping Brokers Page
pageRoutes.get('/brokers/scalping', async (c) => {
  try {
    const content = renderScalpingBrokersPage({
      canonicalUrl: '/brokers/scalping',
      request: c.req.raw
    });
    
    return c.html(await renderLayout(content, {
      title: 'Best Scalping Forex Brokers 2025 - Ultra-Fast Execution | BrokerAnalysis',
      description: 'Compare the top 8 scalping forex brokers with ultra-fast execution speeds, raw spreads from 0.02 pips, VPS hosting, and professional trading infrastructure for high-frequency strategies.',
      keywords: 'scalping forex brokers, fast execution, ultra-low spreads, high frequency trading, scalping strategies, BlackBull Markets, IC Markets, Pepperstone scalping, raw spreads',
      canonicalUrl: '/brokers/scalping',
      request: c.req.raw,
      additionalHead: `
        <!-- Scalping Brokers Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Best Scalping Forex Brokers 2025",
          "description": "Compare top forex brokers for scalping with ultra-fast execution speeds and raw spreads",
          "url": "${getCurrentDomain(c.req.raw)}/brokers/scalping",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Scalping Forex Brokers",
            "numberOfItems": 8
          }
        }
        </script>

        <!-- FAQ Schema for Scalping -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is forex scalping?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Forex scalping is a high-frequency trading strategy where traders make numerous small trades throughout the day, typically holding positions for seconds to minutes to profit from small price movements."
              }
            },
            {
              "@type": "Question",
              "name": "Which broker has the fastest execution for scalping?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "BlackBull Markets offers the fastest execution speeds at 72ms average, followed by Pepperstone at 77ms and IC Markets at 134ms, making them ideal choices for scalping strategies."
              }
            },
            {
              "@type": "Question",
              "name": "Are raw spreads better for scalping?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, raw spreads with commission typically offer lower total trading costs for scalpers compared to standard accounts, as they provide transparent interbank pricing without markup."
              }
            }
          ]
        }
        </script>
      `
    }));
  } catch (error) {
    console.error('Scalping page error:', error);
    return c.html(`<h1>Error loading scalping page: ${error.message}</h1>`, 500);
  }
});

// Demo Accounts Brokers Page
pageRoutes.get('/brokers/demo-accounts', async (c) => {
  try {
    const content = renderDemoAccountsBrokersPage({
      canonicalUrl: '/brokers/demo-accounts',
      request: c.req.raw
    });
    
    return c.html(await renderLayout(content, {
      title: 'Best Demo Account Forex Brokers 2025 - Free Practice Trading | BrokerAnalysis',
      description: 'Compare the top 8 forex brokers with unlimited demo accounts, virtual funds up to $100K+, and real market conditions for risk-free practice trading and strategy testing.',
      keywords: 'demo account forex brokers, free demo trading, practice forex trading, unlimited demo accounts, virtual trading, IC Markets demo, Pepperstone demo, XM demo',
      canonicalUrl: '/brokers/demo-accounts',
      request: c.req.raw,
      additionalHead: `
        <!-- Demo Account Brokers Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Best Demo Account Forex Brokers 2025",
          "description": "Compare top forex brokers offering unlimited demo accounts with virtual funds and real market conditions",
          "url": "${getCurrentDomain(c.req.raw)}/brokers/demo-accounts",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Demo Account Forex Brokers",
            "numberOfItems": 8
          }
        }
        </script>

        <!-- FAQ Schema for Demo Accounts -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Are demo accounts completely free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all reputable forex brokers offer completely free demo accounts with no deposits or fees required. The virtual funds are for practice only and cannot be withdrawn."
              }
            },
            {
              "@type": "Question",
              "name": "How accurate are demo account conditions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Quality demo accounts provide real-time market data and similar execution conditions to live trading, though there can be slight differences in execution speed and slippage."
              }
            },
            {
              "@type": "Question",
              "name": "When should I switch to a live account?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Switch to live trading after demonstrating consistent profitability for 3+ months in demo, developing proper risk management skills, and having adequate trading capital."
              }
            }
          ]
        }
        </script>
      `
    }));
  } catch (error) {
    console.error('Demo accounts page error:', error);
    return c.html(`<h1>Error loading demo accounts page: ${error.message}</h1>`, 500);
  }
});

// ========================
// DYNAMIC COUNTRY ROUTES
// These must come AFTER specific routes to avoid conflicts
// ========================

countryPages.forEach(country => {
  pageRoutes.get(`/brokers/${country.slug}`, async (c) => {
    return c.html(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${generateMetaTags(
            `Best Forex Brokers in ${country.name} 2025 - ${country.regulator} Regulated | BrokerAnalysis`,
            `Find the best ${country.regulator}-regulated forex brokers for traders in ${country.name}. Compare spreads, features, and regulations from top-rated brokers.`,
            `forex brokers ${country.name}, ${country.regulator} regulated brokers, best forex broker ${country.name}`,
            `/brokers/${country.slug}`,
            undefined,
            c.req.raw
          )}
          
          <link rel="stylesheet" href="/static/styles.css">
          <link rel="stylesheet" href="/static/styles.css">
      </head>
      <body class="bg-gray-50">
          ${generateNavigation()}
          
          <main class="max-w-6xl mx-auto py-12 px-4">
              <div class="text-center mb-12">
                  <h1 class="text-4xl font-bold text-gray-900 mb-4">
                      Best Forex Brokers in ${country.name}
                  </h1>
                  <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                      Discover ${country.regulator}-regulated forex brokers offering the best trading conditions 
                      for traders in ${country.name}. All brokers are thoroughly vetted for safety and reliability.
                  </p>
              </div>

              <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <div class="flex items-center mb-4">
                      <i class="fas fa-shield-alt text-green-600 text-xl mr-3"></i>
                      <h2 class="text-xl font-semibold">About ${country.regulator} Regulation</h2>
                  </div>
                  <div class="text-gray-700">
                      <p class="mb-4">
                          The ${country.regulator} regulates forex and financial services in ${country.name}, 
                          ensuring strict compliance standards and comprehensive investor protection measures.
                      </p>
                      <div class="grid md:grid-cols-2 gap-6">
                          <div>
                              <h3 class="font-semibold mb-2">Key Benefits:</h3>
                              <ul class="text-sm space-y-1">
                                  <li>• Segregated client fund protection</li>
                                  <li>• Compensation scheme coverage</li>
                                  <li>• Regular financial audits</li>
                                  <li>• Professional dispute resolution</li>
                              </ul>
                          </div>
                          <div>
                              <h3 class="font-semibold mb-2">Trader Protection:</h3>
                              <ul class="text-sm space-y-1">
                                  <li>• Negative balance protection</li>
                                  <li>• Transparent fee structures</li>
                                  <li>• Best execution standards</li>
                                  <li>• Market conduct oversight</li>
                              </ul>
                          </div>
                      </div>
                      <div class="mt-4">
                          <a href="/regulators/${country.regulator.toLowerCase().replace('/', '-')}" 
                             class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                              Learn more about ${country.regulator} regulation →
                          </a>
                      </div>
                  </div>
              </div>

              <div id="country-brokers-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <!-- Country-specific broker cards will be loaded here -->
              </div>
          </main>

          ${generateFooter()}
          
          <script>
              document.addEventListener('DOMContentLoaded', function() {
                  loadCountryBrokers('${country.slug}', '${country.regulator}');
              });
          </script>
      </body>
      </html>
    `);
  });
});

// Dashboard pages (require authentication)
pageRoutes.get('/dashboard', async (c) => {
  const sessionId = getCookie(c, 'session_id');
  if (!sessionId) {
    return c.redirect('/auth/login?redirect=/dashboard');
  }

  try {
    const { DB } = c.env;
    
    // Get user from session
    const sessionResult = await DB.prepare(
      'SELECT user_id, user_email, user_name FROM user_sessions WHERE session_id = ? AND expires_at > datetime("now")'
    ).bind(sessionId).first();

    if (!sessionResult) {
      // Session expired or invalid
      return c.redirect('/auth/login?redirect=/dashboard');
    }

    const user = {
      id: sessionResult.user_id,
      email: sessionResult.user_email,
      name: sessionResult.user_name || sessionResult.user_email.split('@')[0]
    };

    // Get user's broker matches
    const brokerMatches = await DB.prepare(`
      SELECT 
        bm.*,
        COUNT(br.id) as recommendation_count
      FROM broker_matches bm
      LEFT JOIN broker_recommendations br ON bm.id = br.match_id
      WHERE bm.user_id = ?
      GROUP BY bm.id
      ORDER BY bm.created_at DESC
      LIMIT 10
    `).bind(user.id).all();

    // Parse the latest match if exists
    let latestMatch = null;
    if (brokerMatches.results && brokerMatches.results.length > 0) {
      const latest = brokerMatches.results[0];
      
      // Get recommendations for the latest match
      const recommendations = await DB.prepare(`
        SELECT 
          br.*,
          b.name as broker_name,
          b.slug as broker_slug,
          b.logo_url,
          b.website_url,
          b.rating,
          b.min_deposit_usd,
          b.max_leverage,
          b.spread_type,
          b.is_regulated
        FROM broker_recommendations br
        JOIN brokers b ON br.broker_id = b.id
        WHERE br.match_id = ?
        ORDER BY br.score DESC
        LIMIT 3
      `).bind(latest.id).all();

      latestMatch = {
        id: latest.id,
        userProfile: JSON.parse(latest.user_profile || '{}'),
        recommendations: recommendations.results?.map(r => ({
          broker: {
            id: r.broker_id,
            name: r.broker_name,
            slug: r.broker_slug,
            logo_url: r.logo_url,
            website_url: r.website_url,
            rating: r.rating,
            min_deposit_usd: r.min_deposit_usd,
            max_leverage: r.max_leverage,
            spread_type: r.spread_type,
            is_regulated: r.is_regulated
          },
          score: r.score,
          reasoning: r.reasoning
        })) || [],
        timestamp: latest.created_at,
        created_at: latest.created_at
      };
    }

    // Import and use the UserDashboard component
    const { UserDashboard } = await import('../components/UserDashboard.js');
    
    return c.html(UserDashboard({
      user,
      latestMatch,
      brokerMatches: brokerMatches.results || []
    }));

  } catch (error) {
    console.error('Dashboard error:', error);
    
    // Fallback to simple dashboard if there's an error
    return c.html(renderLayout({
      title: 'Dashboard - BrokerAnalysis',
      content: `
        <div class="min-h-screen bg-gray-50 py-8">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white rounded-lg shadow p-6">
              <h1 class="text-2xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h1>
              
              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p class="text-yellow-800">
                  <i class="fas fa-info-circle mr-2"></i>
                  We're currently updating your dashboard. Some features may be temporarily unavailable.
                </p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <a href="/#recommendation-widget" class="block bg-blue-50 rounded-lg p-6 hover:bg-blue-100 transition-colors">
                  <i class="fas fa-search text-3xl text-blue-600 mb-3"></i>
                  <h3 class="font-semibold text-gray-900">Find Brokers</h3>
                  <p class="text-sm text-gray-600 mt-1">Get personalized recommendations</p>
                </a>
                
                <a href="/compare" class="block bg-green-50 rounded-lg p-6 hover:bg-green-100 transition-colors">
                  <i class="fas fa-balance-scale text-3xl text-green-600 mb-3"></i>
                  <h3 class="font-semibold text-gray-900">Compare Brokers</h3>
                  <p class="text-sm text-gray-600 mt-1">Side-by-side comparisons</p>
                </a>
                
                <a href="/simulator" class="block bg-purple-50 rounded-lg p-6 hover:bg-purple-100 transition-colors">
                  <i class="fas fa-calculator text-3xl text-purple-600 mb-3"></i>
                  <h3 class="font-semibold text-gray-900">Cost Calculator</h3>
                  <p class="text-sm text-gray-600 mt-1">Calculate trading costs</p>
                </a>
              </div>
              
              <div class="text-center">
                <a href="/" class="text-blue-600 hover:text-blue-700">
                  <i class="fas fa-arrow-left mr-2"></i>Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      `,
      request: c.req.raw
    }));
  }
});

// SEO pages (robots.txt, sitemap.xml)
pageRoutes.get('/robots.txt', async (c) => {
  const domain = getCurrentDomain(c.req.raw);
  return c.text(`User-agent: *
Allow: /

# Sitemaps
Sitemap: ${domain}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /api/auth/
Disallow: /dashboard/

# Allow all public pages
Allow: /
Allow: /reviews/
Allow: /compare
Allow: /simulator
Allow: /about
Allow: /brokers/
Allow: /api/brokers
Allow: /api/stats
`, { headers: { 'Content-Type': 'text/plain' } });
});

pageRoutes.get('/sitemap.xml', async (c) => {
  try {
    const { DB } = c.env;
    const brokerService = new BrokerService(DB);
    
    // Get all brokers for dynamic URLs
    const brokersResult = await brokerService.getAllBrokers(1, 100);
    const brokers = brokersResult.brokers;
    
    const baseUrl = getCurrentDomain(c.req.raw);
    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/reviews</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/compare</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/simulator</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;

    // Add broker review pages
    brokers.forEach(broker => {
      sitemap += `
  <url>
    <loc>${baseUrl}/reviews/${broker.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
    
    // Add country pages
    countryPages.forEach(country => {
      sitemap += `
  <url>
    <loc>${baseUrl}/brokers/${country.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    return c.text(sitemap, { 
      headers: { 
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      } 
    });
  } catch (error) {
    console.error('Sitemap error:', error);
    return c.text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: { 'Content-Type': 'application/xml' }
    });
  }
});

// Test routes
pageRoutes.get('/test-simulator', async (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Simulator Test - BrokerAnalysis</title>
        <link rel="stylesheet" href="/static/styles.css">
    </head>
    <body class="bg-gray-100 p-8">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold mb-6">Trading Cost Simulator Test</h1>
            <div class="bg-white rounded-lg p-6 shadow-sm">
                <p class="mb-4">Testing the enhanced trading cost calculator with real broker data.</p>
                <a href="/simulator" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Go to Simulator
                </a>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Helper functions for generating common HTML components
function generateNavigation(): string {
  // Use enhanced navigation component for consistency
  return generateCompleteNavigation();
}

function generateFooter(): string {
  return `
    <footer class="bg-gray-900 text-white py-12 mt-16">
        <div class="max-w-6xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-lg font-semibold mb-4">BrokerAnalysis</h3>
                    <p class="text-gray-400 text-sm">
                        Helping traders find the perfect forex broker through intelligent recommendations and transparent analysis.
                    </p>
                </div>
                
                <div>
                    <h4 class="text-md font-semibold mb-4">Brokers</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="/reviews/ic-markets" class="hover:text-white">IC Markets</a></li>
                        <li><a href="/reviews/pepperstone" class="hover:text-white">Pepperstone</a></li>
                        <li><a href="/reviews/fp-markets" class="hover:text-white">FP Markets</a></li>
                        <li><a href="/reviews" class="hover:text-white">All Reviews</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-md font-semibold mb-4">Tools</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="/compare" class="hover:text-white">Broker Comparison</a></li>
                        <li><a href="/simulator" class="hover:text-white">Cost Calculator</a></li>
                        <li><a href="/" class="hover:text-white">Smart Recommendations</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-md font-semibold mb-4">Company</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="/about" class="hover:text-white">About Us</a></li>
                        <li><a href="/about#methodology" class="hover:text-white">Methodology</a></li>
                        <li><a href="mailto:contact@brokeranalysis.com" class="hover:text-white">Contact</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                <p>&copy; 2025 BrokerAnalysis. All rights reserved. 
                   Trading involves significant risk and may not be suitable for all investors.</p>
            </div>
        </div>
    </footer>
  `;
}

// CRITICAL SEO FIX: Individual Broker Review Pages
// These routes were moved from brokerRoutes.ts due to mounting issues
// This ensures the most important SEO pages (individual broker reviews) work properly

pageRoutes.get('/reviews/ic-markets', async (c) => {
  const { DB } = c.env;
  const brokerService = new BrokerService(DB);
  
  try {
    const broker = await brokerService.getBrokerBySlug('ic-markets');
    if (!broker) {
      return c.html('<div style="padding:2rem;text-align:center;"><h1>IC Markets not found</h1><p>Broker data not available.</p><a href="/brokers">← Back to Brokers</a></div>', 404);
    }
    
    return c.html(generateComprehensiveBrokerReviewHTML(broker, c.req.raw));
  } catch (error) {
    console.error('IC Markets review error:', error);
    return c.html(`<div style="padding:2rem;text-align:center;"><h1>Error</h1><p>Database error: ${error.message}</p><a href="/brokers">← Back to Brokers</a></div>`, 500);
  }
});

pageRoutes.get('/reviews/pepperstone', async (c) => {
  const { DB } = c.env;
  const brokerService = new BrokerService(DB);
  
  try {
    const broker = await brokerService.getBrokerBySlug('pepperstone');
    if (!broker) {
      return c.html('<div style="padding:2rem;text-align:center;"><h1>Pepperstone not found</h1><p>Broker data not available.</p><a href="/brokers">← Back to Brokers</a></div>', 404);
    }
    
    return c.html(generateComprehensiveBrokerReviewHTML(broker, c.req.raw));
  } catch (error) {
    console.error('Pepperstone review error:', error);
    return c.html(`<div style="padding:2rem;text-align:center;"><h1>Error</h1><p>Database error: ${error.message}</p><a href="/brokers">← Back to Brokers</a></div>`, 500);
  }
});

pageRoutes.get('/reviews/xm-group', async (c) => {
  const { DB } = c.env;
  const brokerService = new BrokerService(DB);
  
  try {
    const broker = await brokerService.getBrokerBySlug('xm-group');
    if (!broker) {
      return c.html('<div style="padding:2rem;text-align:center;"><h1>XM Group not found</h1><p>Broker data not available.</p><a href="/brokers">← Back to Brokers</a></div>', 404);
    }
    
    return c.html(generateComprehensiveBrokerReviewHTML(broker, c.req.raw));
  } catch (error) {
    console.error('XM Group review error:', error);
    return c.html(`<div style="padding:2rem;text-align:center;"><h1>Error</h1><p>Database error: ${error.message}</p><a href="/brokers">← Back to Brokers</a></div>`, 500);
  }
});

pageRoutes.get('/reviews/oanda', async (c) => {
  const { DB } = c.env;
  const brokerService = new BrokerService(DB);
  
  try {
    const broker = await brokerService.getBrokerBySlug('oanda');
    if (!broker) {
      return c.html('<div style="padding:2rem;text-align:center;"><h1>OANDA not found</h1><p>Broker data not available.</p><a href="/brokers">← Back to Brokers</a></div>', 404);
    }
    
    return c.html(generateComprehensiveBrokerReviewHTML(broker, c.req.raw));
  } catch (error) {
    console.error('OANDA review error:', error);
    return c.html(`<div style="padding:2rem;text-align:center;"><h1>Error</h1><p>Database error: ${error.message}</p><a href="/brokers">← Back to Brokers</a></div>`, 500);
  }
});

pageRoutes.get('/reviews/interactive-brokers', async (c) => {
  const { DB } = c.env;
  const brokerService = new BrokerService(DB);
  
  try {
    const broker = await brokerService.getBrokerBySlug('interactive-brokers');
    if (!broker) {
      return c.html('<div style="padding:2rem;text-align:center;"><h1>Interactive Brokers not found</h1><p>Broker data not available.</p><a href="/brokers">← Back to Brokers</a></div>', 404);
    }
    
    return c.html(generateComprehensiveBrokerReviewHTML(broker, c.req.raw));
  } catch (error) {
    console.error('Interactive Brokers review error:', error);
    return c.html(`<div style="padding:2rem;text-align:center;"><h1>Error</h1><p>Database error: ${error.message}</p><a href="/brokers">← Back to Brokers</a></div>`, 500);
  }
});

// Generic dynamic broker review route (catch-all for other brokers)
pageRoutes.get('/reviews/:brokerSlug', async (c) => {
  const { DB } = c.env;
  const brokerService = new BrokerService(DB);
  const brokerSlug = c.req.param('brokerSlug');
  
  // Skip the static routes we've already handled
  const handledRoutes = ['ic-markets', 'pepperstone', 'xm-group', 'oanda', 'interactive-brokers'];
  if (handledRoutes.includes(brokerSlug)) {
    return c.notFound(); // Let the static routes handle these
  }
  
  try {
    const broker = await brokerService.getBrokerBySlug(brokerSlug);
    if (!broker) {
      return c.html(`
        <div style="padding:2rem;text-align:center;">
          <h1>Broker "${brokerSlug}" not found</h1>
          <p>This broker is not available in our database.</p>
          <p><strong>Available reviews:</strong> <a href="/reviews/ic-markets">IC Markets</a>, <a href="/reviews/pepperstone">Pepperstone</a>, <a href="/reviews/xm-group">XM Group</a></p>
          <p><a href="/brokers">← View all brokers</a></p>
        </div>
      `, 404);
    }
    
    return c.html(generateComprehensiveBrokerReviewHTML(broker, c.req.raw));
  } catch (error) {
    console.error(`Broker review error for ${brokerSlug}:`, error);
    return c.html(`<div style="padding:2rem;text-align:center;"><h1>Error</h1><p>Database error: ${error.message}</p><a href="/brokers">← Back to Brokers</a></div>`, 500);
  }
});

// SEO Enhancement: Dynamic Sitemap
pageRoutes.get('/sitemap.xml', async (c) => {
  try {
    const { DB } = c.env;
    const brokerService = new BrokerService(DB);
    const brokers = await brokerService.getAllBrokers();
    
    const domain = getCurrentDomain(c.req.raw);
    const now = new Date().toISOString();
    
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${domain}/brokers</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/countries</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${domain}/compare</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${domain}/contact</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  ${brokers.map(broker => `
  <url>
    <loc>${domain}/reviews/${broker.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
  ${['australia', 'usa', 'canada', 'singapore', 'dubai', 'south-africa', 'philippines', 'pakistan', 'india', 'belgium', 'nepal', 'malaysia', 'ethiopia', 'bangladesh'].map(country => `
  <url>
    <loc>${domain}/brokers/${country}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

    c.header('Content-Type', 'application/xml');
    c.header('Cache-Control', 'public, max-age=3600');
    return c.text(sitemapXml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return c.text('Error generating sitemap', 500);
  }
});

// SEO Enhancement: Robots.txt
pageRoutes.get('/robots.txt', async (c) => {
  const domain = getCurrentDomain(c.req.raw);
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${domain}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /static/styles.css
Allow: /static/images/
Allow: /static/webfonts/`;

  c.header('Content-Type', 'text/plain');
  c.header('Cache-Control', 'public, max-age=86400');
  return c.text(robotsTxt);
});

// SEO Enhancement: Comprehensive Broker vs Broker Comparison Pages
const popularComparisons = [
  // Top-tier brokers comparisons
  { slug: 'ic-markets-vs-pepperstone', title: 'IC Markets vs Pepperstone', brokers: ['ic-markets', 'pepperstone'] },
  { slug: 'ic-markets-vs-oanda', title: 'IC Markets vs OANDA', brokers: ['ic-markets', 'oanda'] },
  { slug: 'pepperstone-vs-oanda', title: 'Pepperstone vs OANDA', brokers: ['pepperstone', 'oanda'] },
  { slug: 'interactive-brokers-vs-ic-markets', title: 'Interactive Brokers vs IC Markets', brokers: ['interactive-brokers', 'ic-markets'] },
  
  // Interactive Brokers comparisons
  { slug: 'interactive-brokers-vs-pepperstone', title: 'Interactive Brokers vs Pepperstone', brokers: ['interactive-brokers', 'pepperstone'] },
  { slug: 'interactive-brokers-vs-oanda', title: 'Interactive Brokers vs OANDA', brokers: ['interactive-brokers', 'oanda'] },
  { slug: 'interactive-brokers-vs-forex-com', title: 'Interactive Brokers vs Forex.com', brokers: ['interactive-brokers', 'forex-com'] },
  
  // Forex.com comparisons  
  { slug: 'forex-com-vs-ic-markets', title: 'Forex.com vs IC Markets', brokers: ['forex-com', 'ic-markets'] },
  { slug: 'forex-com-vs-pepperstone', title: 'Forex.com vs Pepperstone', brokers: ['forex-com', 'pepperstone'] },
  { slug: 'forex-com-vs-oanda', title: 'Forex.com vs OANDA', brokers: ['forex-com', 'oanda'] },
  
  // TastyFX comparisons
  { slug: 'tastyfx-vs-ic-markets', title: 'TastyFX vs IC Markets', brokers: ['tastyfx', 'ic-markets'] },
  { slug: 'tastyfx-vs-pepperstone', title: 'TastyFX vs Pepperstone', brokers: ['tastyfx', 'pepperstone'] },
  { slug: 'tastyfx-vs-oanda', title: 'TastyFX vs OANDA', brokers: ['tastyfx', 'oanda'] },
  { slug: 'tastyfx-vs-interactive-brokers', title: 'TastyFX vs Interactive Brokers', brokers: ['tastyfx', 'interactive-brokers'] },
  { slug: 'tastyfx-vs-forex-com', title: 'TastyFX vs Forex.com', brokers: ['tastyfx', 'forex-com'] },
  
  // Cross comparisons for competitive terms
  { slug: 'pepperstone-vs-forex-com', title: 'Pepperstone vs Forex.com', brokers: ['pepperstone', 'forex-com'] },
  { slug: 'oanda-vs-forex-com', title: 'OANDA vs Forex.com', brokers: ['oanda', 'forex-com'] }
];

popularComparisons.forEach(comparison => {
  pageRoutes.get(`/compare/${comparison.slug}`, async (c) => {
    const { DB } = c.env;
    const brokerService = new BrokerService(DB);
    
    try {
      const [broker1, broker2] = await Promise.all([
        brokerService.getBrokerBySlug(comparison.brokers[0]),
        brokerService.getBrokerBySlug(comparison.brokers[1])
      ]);

      if (!broker1 || !broker2) {
        return c.html('Brokers not found', 404);
      }

      const domain = getCurrentDomain(c.req.raw);
      const title = `${comparison.title} Comparison 2025 - Which is Better?`;
      const description = `Compare ${broker1.name} vs ${broker2.name}. Detailed side-by-side analysis of spreads, regulation, platforms, and fees to help you choose the better broker.`;

      return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${generateMetaTags(title, description, `broker comparison, ${comparison.brokers[0]}, ${comparison.brokers[1]}, forex broker`, `/compare/${comparison.slug}`, undefined, c.req.raw)}
    <link href="/static/styles.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center mb-8">${comparison.title} Comparison</h1>
        
        <div class="grid md:grid-cols-2 gap-8 mb-8">
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-2xl font-bold mb-4">\${broker1.name}</h2>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="font-medium">Rating:</span>
                        <span>\${broker1.rating}/5</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Min Deposit:</span>
                        <span>$\${broker1.min_deposit_usd || 'N/A'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Max Leverage:</span>
                        <span>\${broker1.max_leverage || 'N/A'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Regulated:</span>
                        <span>\${broker1.is_regulated ? 'Yes' : 'No'}</span>
                    </div>
                </div>
                <a href="/reviews/\${broker1.slug}" class="mt-4 block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700">Read Full Review</a>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-2xl font-bold mb-4">\${broker2.name}</h2>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="font-medium">Rating:</span>
                        <span>\${broker2.rating}/5</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Min Deposit:</span>
                        <span>$\${broker2.min_deposit_usd || 'N/A'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Max Leverage:</span>
                        <span>\${broker2.max_leverage || 'N/A'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium">Regulated:</span>
                        <span>\${broker2.is_regulated ? 'Yes' : 'No'}</span>
                    </div>
                </div>
                <a href="/reviews/\${broker2.slug}" class="mt-4 block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700">Read Full Review</a>
            </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-bold mb-4">Quick Comparison Summary</h3>
            <p class="text-gray-700 mb-4">
                Both \${broker1.name} and \${broker2.name} are \${broker1.is_regulated && broker2.is_regulated ? 'regulated' : 'established'} brokers offering competitive trading conditions. 
                \${broker1.rating > broker2.rating ? broker1.name + ' has a higher overall rating' : broker2.rating > broker1.rating ? broker2.name + ' has a higher overall rating' : 'Both brokers have similar ratings'}.
            </p>
            <div class="grid md:grid-cols-3 gap-4">
                <a href="/compare" class="text-center bg-gray-100 p-4 rounded hover:bg-gray-200">Compare More Brokers</a>
                <a href="/brokers" class="text-center bg-blue-100 p-4 rounded hover:bg-blue-200">Browse All Brokers</a>
                <a href="/" class="text-center bg-green-100 p-4 rounded hover:bg-green-200">Find My Broker</a>
            </div>
        </div>
    </div>
</body>
</html>`);
    } catch (error) {
      console.error('Comparison page error:', error);
      return c.html('Error loading comparison', 500);
    }
  });
});

// SEO Enhancement: Regulatory Authority Pages
const regulatoryAuthorities = [
  { slug: 'asic', name: 'ASIC (Australian Securities and Investments Commission)', country: 'Australia', description: 'Australia\'s financial services regulator' },
  { slug: 'fca', name: 'FCA (Financial Conduct Authority)', country: 'United Kingdom', description: 'UK\'s financial services regulator' },
  { slug: 'cysec', name: 'CySEC (Cyprus Securities and Exchange Commission)', country: 'Cyprus', description: 'Cyprus financial regulator' },
  { slug: 'cftc', name: 'CFTC (Commodity Futures Trading Commission)', country: 'United States', description: 'US derivatives regulator' },
  { slug: 'finma', name: 'FINMA (Swiss Financial Market Supervisory Authority)', country: 'Switzerland', description: 'Switzerland\'s financial regulator' }
];

regulatoryAuthorities.forEach(regulator => {
  pageRoutes.get(`/regulation/${regulator.slug}`, async (c) => {
    const { DB } = c.env;
    const brokerService = new BrokerService(DB);
    
    try {
      const brokers = await brokerService.getAllBrokers();
      const domain = getCurrentDomain(c.req.raw);
      
      const title = `${regulator.name} Regulated Forex Brokers 2025`;
      const description = `Find ${regulator.name} regulated forex brokers. Compare spreads, platforms, and features of brokers supervised by ${regulator.country}'s financial regulator.`;

      return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${generateMetaTags(title, description, `${regulator.slug}, regulated brokers, ${regulator.country.toLowerCase()} brokers`, `/regulation/${regulator.slug}`, undefined, c.req.raw)}
    <link href="/static/styles.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center mb-8">${regulator.name} Regulated Brokers</h1>
        
        <div class="bg-white rounded-lg shadow p-6 mb-8">
            <h2 class="text-2xl font-bold mb-4">About ${regulator.name}</h2>
            <p class="text-gray-700 mb-4">
                ${regulator.description}. Brokers regulated by ${regulator.name} must comply with strict financial standards, 
                client fund protection requirements, and operational transparency rules.
            </p>
            <div class="grid md:grid-cols-3 gap-4">
                <div class="text-center p-4 bg-blue-50 rounded">
                    <h3 class="font-semibold text-blue-800">Client Protection</h3>
                    <p class="text-sm text-blue-600">Segregated client funds</p>
                </div>
                <div class="text-center p-4 bg-green-50 rounded">
                    <h3 class="font-semibold text-green-800">Financial Standards</h3>
                    <p class="text-sm text-green-600">Strict capital requirements</p>
                </div>
                <div class="text-center p-4 bg-purple-50 rounded">
                    <h3 class="font-semibold text-purple-800">Transparency</h3>
                    <p class="text-sm text-purple-600">Regular reporting & audits</p>
                </div>
            </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-bold mb-4">${regulator.name} Regulated Brokers</h3>
            <div class="text-center py-8">
                <p class="text-gray-600 mb-4">Our database is being updated with regulatory information.</p>
                <div class="space-y-2">
                    <a href="/brokers" class="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mr-4">Browse All Brokers</a>
                    <a href="/countries" class="inline-block bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">View by Country</a>
                </div>
            </div>
        </div>
        
        <div class="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 class="font-semibold text-yellow-800 mb-2">Important Notice</h4>
            <p class="text-yellow-700 text-sm">
                Regulation status can change. Always verify a broker's current regulatory status directly with the relevant authority before trading.
            </p>
        </div>
    </div>
</body>
</html>`);
    } catch (error) {
      console.error('Regulatory page error:', error);
      return c.html('Error loading regulatory information', 500);
    }
  });
});

// Trading Calculators Page - Profit, Margin & Pip Calculators
pageRoutes.get('/calculators', async (c) => {
  return c.html(renderTradingCalculatorsPage({
    canonicalUrl: '/calculators',
    request: c.req.raw
  }));
});

// Enhanced Trading Cost Simulator Page with 2025 SEO Best Practices
pageRoutes.get('/simulator', async (c) => {
  return c.html(renderTradingSimulatorPage({
    canonicalUrl: '/simulator',
    request: c.req.raw
  }));
});

export { pageRoutes };