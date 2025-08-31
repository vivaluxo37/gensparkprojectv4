// Broker Logo Management System
// This script helps manage and update broker logos throughout the website

interface BrokerLogo {
  brokerName: string;
  slug: string;
  logoFileName: string;
  logoUrl: string;
  status: 'exists' | 'missing' | 'placeholder';
}

/**
 * Comprehensive list of major forex brokers with their expected logo filenames
 * You can update the logo URLs after downloading from Google Drive
 */
export const BROKER_LOGOS: BrokerLogo[] = [
  // Major International Brokers
  { brokerName: 'IG Markets', slug: 'ig-markets', logoFileName: 'ig-markets.png', logoUrl: '/static/images/brokers/ig-markets.png', status: 'missing' },
  { brokerName: 'Pepperstone', slug: 'pepperstone', logoFileName: 'pepperstone.png', logoUrl: '/static/images/brokers/pepperstone.png', status: 'missing' },
  { brokerName: 'IC Markets', slug: 'ic-markets', logoFileName: 'ic-markets.png', logoUrl: '/static/images/brokers/ic-markets.png', status: 'missing' },
  { brokerName: 'XM Group', slug: 'xm-group', logoFileName: 'xm.png', logoUrl: '/static/images/brokers/xm.png', status: 'missing' },
  { brokerName: 'OANDA', slug: 'oanda', logoFileName: 'oanda.png', logoUrl: '/static/images/brokers/oanda.png', status: 'missing' },
  { brokerName: 'Plus500', slug: 'plus500', logoFileName: 'plus500.png', logoUrl: '/static/images/brokers/plus500.png', status: 'missing' },
  { brokerName: 'FP Markets', slug: 'fp-markets', logoFileName: 'fp-markets.png', logoUrl: '/static/images/brokers/fp-markets.png', status: 'missing' },
  { brokerName: 'Exness', slug: 'exness', logoFileName: 'exness.png', logoUrl: '/static/images/brokers/exness.png', status: 'missing' },
  { brokerName: 'HotForex', slug: 'hotforex', logoFileName: 'hotforex.png', logoUrl: '/static/images/brokers/hotforex.png', status: 'missing' },
  { brokerName: 'FXTM', slug: 'fxtm', logoFileName: 'fxtm.png', logoUrl: '/static/images/brokers/fxtm.png', status: 'missing' },
  { brokerName: 'AvaTrade', slug: 'avatrade', logoFileName: 'avatrade.png', logoUrl: '/static/images/brokers/avatrade.png', status: 'missing' },
  { brokerName: 'FxPro', slug: 'fxpro', logoFileName: 'fxpro.png', logoUrl: '/static/images/brokers/fxpro.png', status: 'missing' },
  { brokerName: 'ThinkMarkets', slug: 'thinkmarkets', logoFileName: 'thinkmarkets.png', logoUrl: '/static/images/brokers/thinkmarkets.png', status: 'missing' },
  { brokerName: 'Admirals', slug: 'admirals', logoFileName: 'admirals.png', logoUrl: '/static/images/brokers/admirals.png', status: 'missing' },
  
  // Additional Popular Brokers
  { brokerName: 'Forex.com', slug: 'forex-com', logoFileName: 'forex-com.png', logoUrl: '/static/images/brokers/forex-com.png', status: 'missing' },
  { brokerName: 'CMC Markets', slug: 'cmc-markets', logoFileName: 'cmc-markets.png', logoUrl: '/static/images/brokers/cmc-markets.png', status: 'missing' },
  { brokerName: 'City Index', slug: 'city-index', logoFileName: 'city-index.png', logoUrl: '/static/images/brokers/city-index.png', status: 'missing' },
  { brokerName: 'Saxo Bank', slug: 'saxo-bank', logoFileName: 'saxo-bank.png', logoUrl: '/static/images/brokers/saxo-bank.png', status: 'missing' },
  { brokerName: 'Interactive Brokers', slug: 'interactive-brokers', logoFileName: 'interactive-brokers.png', logoUrl: '/static/images/brokers/interactive-brokers.png', status: 'missing' },
  { brokerName: 'Charles Schwab', slug: 'charles-schwab', logoFileName: 'charles-schwab.png', logoUrl: '/static/images/brokers/charles-schwab.png', status: 'missing' },
  { brokerName: 'TD Ameritrade', slug: 'td-ameritrade', logoFileName: 'td-ameritrade.png', logoUrl: '/static/images/brokers/td-ameritrade.png', status: 'missing' },
  { brokerName: 'E*TRADE', slug: 'etrade', logoFileName: 'etrade.png', logoUrl: '/static/images/brokers/etrade.png', status: 'missing' },
  
  // Regional Brokers
  { brokerName: 'FBS', slug: 'fbs', logoFileName: 'fbs.png', logoUrl: '/static/images/brokers/fbs.png', status: 'missing' },
  { brokerName: 'Tickmill', slug: 'tickmill', logoFileName: 'tickmill.png', logoUrl: '/static/images/brokers/tickmill.png', status: 'missing' },
  { brokerName: 'XTB', slug: 'xtb', logoFileName: 'xtb.png', logoUrl: '/static/images/brokers/xtb.png', status: 'missing' },
  { brokerName: 'Libertex', slug: 'libertex', logoFileName: 'libertex.png', logoUrl: '/static/images/brokers/libertex.png', status: 'missing' },
  { brokerName: 'IQ Option', slug: 'iq-option', logoFileName: 'iq-option.png', logoUrl: '/static/images/brokers/iq-option.png', status: 'missing' },
  { brokerName: 'OctaFX', slug: 'octafx', logoFileName: 'octafx.png', logoUrl: '/static/images/brokers/octafx.png', status: 'missing' },
  { brokerName: 'InstaForex', slug: 'instaforex', logoFileName: 'instaforex.png', logoUrl: '/static/images/brokers/instaforex.png', status: 'missing' },
  { brokerName: 'Alpari', slug: 'alpari', logoFileName: 'alpari.png', logoUrl: '/static/images/brokers/alpari.png', status: 'missing' },
  { brokerName: 'RoboForex', slug: 'roboforex', logoFileName: 'roboforex.png', logoUrl: '/static/images/brokers/roboforex.png', status: 'missing' }
];

/**
 * Generates SQL commands to update broker logo URLs in the database
 */
export function generateLogoUpdateSQL(): string {
  const sqlCommands = BROKER_LOGOS.map(logo => {
    return `UPDATE brokers SET logo_url = '${logo.logoUrl}' WHERE slug = '${logo.slug}' OR name LIKE '%${logo.brokerName}%';`;
  }).join('\n');

  return `-- Broker Logo Update SQL Commands
-- Run these commands to update broker logos in the database

${sqlCommands}

-- Verify updates
SELECT name, slug, logo_url FROM brokers WHERE logo_url LIKE '/static/images/brokers/%' ORDER BY name;
`;
}

/**
 * Creates a mapping of broker slugs to logo URLs for frontend use
 */
export function generateLogoMapping(): Record<string, string> {
  const mapping: Record<string, string> = {};
  BROKER_LOGOS.forEach(logo => {
    mapping[logo.slug] = logo.logoUrl;
  });
  return mapping;
}

/**
 * Instructions for manual logo upload process
 */
export function getUploadInstructions(): string {
  return `
📋 BROKER LOGO UPLOAD INSTRUCTIONS

1. 📁 Download logos from Google Drive:
   ${BROKER_LOGOS.map(logo => `   • ${logo.logoFileName} → ${logo.brokerName}`).join('\n')}

2. 📂 Upload to server directory:
   /home/user/webapp/public/static/images/brokers/

3. 📝 Run the SQL update script:
   npx wrangler d1 execute brokeranalysis-production --local --file logo-update.sql

4. 🔄 Restart the application:
   npm run build && pm2 restart brokeranalysis

5. ✅ Verify logos are loading:
   Visit /brokers page and check broker cards

📋 Expected logo filenames in Google Drive:
${BROKER_LOGOS.map(logo => `   • ${logo.logoFileName}`).join('\n')}
`;
}

// Export functions for use in other scripts
if (typeof module !== 'undefined') {
  module.exports = {
    BROKER_LOGOS,
    generateLogoUpdateSQL,
    generateLogoMapping,
    getUploadInstructions
  };
}
`;