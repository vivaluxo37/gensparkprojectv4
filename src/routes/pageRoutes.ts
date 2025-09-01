// Page routes for static pages, country pages, and main user interface
import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import type { Bindings } from '../types';
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

const pageRoutes = new Hono<{ Bindings: Bindings }>();

// Homepage - Complete migrated version with all features
pageRoutes.get('/', (c) => {
  const homeContent = `
    ${renderHomePage()}
    ${renderFAQ()}
  `;

  return c.html(renderLayout(homeContent, {
    title: 'Best Forex Brokers 2025 - Compare 67+ Regulated Brokers | BrokerAnalysis',
    description: 'Find the perfect forex broker with our intelligent matching system. Compare spreads, regulation, and features of 67+ top-rated brokers. Get personalized recommendations now.',
    keywords: 'forex brokers, best forex brokers 2025, regulated forex brokers, forex broker comparison, forex trading, broker reviews, forex spreads, trading platforms',
    canonicalUrl: '/',
    request: c.req.raw,
    additionalHead: `
      <!-- Static CSS preload disabled for development -->
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://cdnjs.cloudflare.com">
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
pageRoutes.get('/countries', (c) => {
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
  pageRoutes.get(`/regulators/${regulator.slug}`, (c) => {
    return c.html(renderRegulatorPage(regulator.info, {
      canonicalUrl: `/regulators/${regulator.slug}`,
      request: c.req.raw
    }));
  });
});

// Individual Country Pages - USA
pageRoutes.get('/countries/usa', (c) => {
  return c.html(renderLayout(renderUSACountryPage({
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
      <link rel="preconnect" href="https://cdnjs.cloudflare.com">
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
pageRoutes.get('/countries/india', (c) => {
  return c.html(renderLayout(renderIndiaCountryPage({
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
      <link rel="preconnect" href="https://cdnjs.cloudflare.com">
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
pageRoutes.get('/countries/canada', (c) => {
  return c.html(renderLayout(renderCanadaCountryPage({
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
      <link rel="preconnect" href="https://cdnjs.cloudflare.com">
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
pageRoutes.get('/countries/australia', (c) => {
  return c.html(renderLayout(renderAustraliaCountryPage({
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
      <link rel="preconnect" href="https://cdnjs.cloudflare.com">
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
pageRoutes.get('/countries/belgium', (c) => {
  return c.html(renderLayout(renderBelgiumCountryPage({
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
      <link rel="preconnect" href="https://cdnjs.cloudflare.com">
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
pageRoutes.get('/countries/singapore', (c) => {
  return c.html(renderLayout(renderSingaporeCountryPage({
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
pageRoutes.get('/countries/dubai', (c) => {
  return c.html(renderLayout(renderDubaiCountryPage({
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
pageRoutes.get('/countries/south-africa', (c) => {
  return c.html(renderLayout(renderSouthAfricaCountryPage({
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
pageRoutes.get('/countries/philippines', (c) => {
  return c.html(renderLayout(renderPhilippinesCountryPage({
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
pageRoutes.get('/countries/pakistan', (c) => {
  return c.html(renderLayout(renderPakistanCountryPage({
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
pageRoutes.get('/countries/nepal', (c) => {
  return c.html(renderLayout(renderNepalCountryPage({
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
      <link rel="preconnect" href="https://cdnjs.cloudflare.com">
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
pageRoutes.get('/countries/malaysia', (c) => {
  return c.html(renderLayout(renderMalaysiaCountryPage({
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
      <link rel="preconnect" href="https://cdnjs.cloudflare.com">
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
pageRoutes.get('/countries/ethiopia', (c) => {
  return c.html(renderLayout(renderEthiopiaCountryPage({
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
      <link rel="preconnect" href="https://cdnjs.cloudflare.com">
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
pageRoutes.get('/countries/bangladesh', (c) => {
  return c.html(renderLayout(renderBangladeshCountryPage({
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
      <link rel="preconnect" href="https://cdnjs.cloudflare.com">
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
pageRoutes.get('/reviews', (c) => {
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
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
pageRoutes.get('/compare', (c) => {
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
        
        <link rel="stylesheet" href="/static/styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <script src="https://cdn.tailwindcss.com"></script>
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
    </body>
    </html>
  `);
});

// Contact page
pageRoutes.get('/contact', (c) => {
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
        
        <link rel="stylesheet" href="/static/styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <script src="https://cdn.tailwindcss.com"></script>
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
pageRoutes.get('/about', (c) => {
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
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

// Simulator page
pageRoutes.get('/simulator', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${generateMetaTags(
          'Trading Cost Calculator - Compare Forex Broker Fees & Spreads | BrokerAnalysis',
          'Calculate real trading costs across multiple brokers. Compare spreads, commissions, and total costs based on your trading strategy and volume.',
          'trading cost calculator, forex fees calculator, spread comparison, broker costs, trading simulator',
          '/simulator',
          undefined,
          c.req.raw
        )}
        
        <link rel="stylesheet" href="/static/styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body class="bg-gray-50">
        ${generateNavigation()}
        
        <main class="max-w-6xl mx-auto py-12 px-4">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">Trading Cost Calculator</h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Calculate and compare real trading costs across multiple forex brokers. 
                    Factor in your trading strategy, volume, and preferred instruments.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Calculator Input Panel -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                        <h2 class="text-xl font-semibold mb-6">Calculator Settings</h2>
                        
                        <div class="space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Trading Strategy</label>
                                <select id="strategy-select" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                                    <option value="scalping">Scalping (200+ trades/month)</option>
                                    <option value="day-trading">Day Trading (100 trades/month)</option>
                                    <option value="swing-trading" selected>Swing Trading (40 trades/month)</option>
                                    <option value="position-trading">Position Trading (10 trades/month)</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Trade Volume (USD)</label>
                                <input type="number" id="volume-input" value="100000" min="1000" max="10000000" step="1000"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                                <p class="text-xs text-gray-500 mt-1">Standard lot = $100,000</p>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Currency Pair</label>
                                <select id="instrument-select" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                                    <option value="EURUSD" selected>EUR/USD</option>
                                    <option value="GBPUSD">GBP/USD</option>
                                    <option value="USDJPY">USD/JPY</option>
                                    <option value="AUDUSD">AUD/USD</option>
                                    <option value="USDCAD">USD/CAD</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Select Brokers to Compare</label>
                                <div id="broker-checkboxes" class="space-y-2">
                                    <!-- Broker checkboxes will be loaded here -->
                                </div>
                            </div>

                            <button id="calculate-costs" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                                <i class="fas fa-calculator mr-2"></i>
                                Calculate Costs
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Results Panel -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <h2 class="text-xl font-semibold mb-6">Cost Comparison Results</h2>
                        
                        <div id="cost-results">
                            <div class="text-center py-12 text-gray-500">
                                <i class="fas fa-chart-bar text-4xl mb-4"></i>
                                <p>Configure your settings and click "Calculate Costs" to see results</p>
                            </div>
                        </div>
                    </div>

                    <!-- Strategy Information -->
                    <div class="bg-blue-50 rounded-lg p-6 mt-6">
                        <h3 class="font-semibold text-lg mb-3">
                            <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                            Understanding Trading Costs
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <h4 class="font-medium mb-2">Spreads</h4>
                                <p class="text-gray-700">The difference between bid and ask prices. Lower spreads reduce your trading costs.</p>
                            </div>
                            <div>
                                <h4 class="font-medium mb-2">Commissions</h4>
                                <p class="text-gray-700">Fixed fees charged per lot traded. Common in ECN/Raw spread accounts.</p>
                            </div>
                            <div>
                                <h4 class="font-medium mb-2">Slippage</h4>
                                <p class="text-gray-700">Price difference between expected and actual execution, especially during volatility.</p>
                            </div>
                            <div>
                                <h4 class="font-medium mb-2">Swap Rates</h4>
                                <p class="text-gray-700">Interest charges or credits for positions held overnight.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        ${generateFooter()}
        
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                initializeCalculator();
                loadBrokerOptions();
            });
        </script>
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

countryPages.forEach(country => {
  pageRoutes.get(`/brokers/${country.slug}`, (c) => {
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
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
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
    return c.redirect('/');
  }

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard - BrokerAnalysis</title>
        <link rel="stylesheet" href="/static/styles.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body class="bg-gray-50">
        ${generateNavigation()}
        
        <main class="max-w-6xl mx-auto py-12 px-4">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-star text-2xl text-yellow-500"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500">Saved Matches</p>
                            <p id="saved-matches-count" class="text-2xl font-bold text-gray-900">--</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-eye text-2xl text-blue-500"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500">Brokers Viewed</p>
                            <p class="text-2xl font-bold text-gray-900">12+</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-calculator text-2xl text-green-500"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500">Cost Calculations</p>
                            <p class="text-2xl font-bold text-gray-900">∞</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6">
                <h2 class="text-xl font-semibold mb-6">Your Broker Matches</h2>
                <div id="user-matches">
                    <!-- User matches will be loaded here -->
                </div>
            </div>
        </main>

        ${generateFooter()}
        
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                loadUserDashboard();
            });
        </script>
    </body>
    </html>
  `);
});

// SEO pages (robots.txt, sitemap.xml)
pageRoutes.get('/robots.txt', (c) => {
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
pageRoutes.get('/test-simulator', (c) => {
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
  return `
    <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-6xl mx-auto px-4">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center">
                    <a href="/" class="text-2xl font-bold text-gray-900">
                        <i class="fas fa-chart-line text-blue-600 mr-2"></i>
                        BrokerAnalysis
                    </a>
                </div>
                
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/brokers" class="text-gray-700 hover:text-blue-600 transition-colors">Brokers</a>
                    <a href="/countries" class="text-gray-700 hover:text-blue-600 transition-colors">Countries</a>
                    <a href="/reviews" class="text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
                    <a href="/compare" class="text-gray-700 hover:text-blue-600 transition-colors">Compare</a>
                    <a href="/simulator" class="text-gray-700 hover:text-blue-600 transition-colors">Calculator</a>
                    <a href="/about" class="text-gray-700 hover:text-blue-600 transition-colors">About</a>
                    <a href="/contact" class="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
                </div>

                <div class="flex items-center space-x-4">
                    <div id="auth-section">
                        <!-- Auth buttons will be loaded here -->
                    </div>
                    <button id="mobile-menu-toggle" class="md:hidden text-gray-700">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-200">
            <div class="px-4 py-2 space-y-2">
                <a href="/brokers" class="block py-2 text-gray-700">Brokers</a>
                <a href="/countries" class="block py-2 text-gray-700">Countries</a>
                <a href="/reviews" class="block py-2 text-gray-700">Reviews</a>
                <a href="/compare" class="block py-2 text-gray-700">Compare</a>
                <a href="/simulator" class="block py-2 text-gray-700">Calculator</a>
                <a href="/about" class="block py-2 text-gray-700">About</a>
                <a href="/contact" class="block py-2 text-gray-700">Contact</a>
            </div>
        </div>
    </nav>
  `;
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

export { pageRoutes };