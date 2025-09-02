// Enhanced API Routes with Database Integration for Cloudflare Pages Functions
export async function onRequest(context: { request: Request; env: any; params: any }) {
  const { request, env, params } = context;
  const { DB } = env;
  const url = new URL(request.url);
  const path = params.path.join('/');

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Enhanced Chatbot API with Database Integration
    if (path === 'chatbot' && request.method === 'POST') {
      const body = await request.json();
      const { message, context } = body;

      if (!message || message.trim().length === 0) {
        return Response.json(
          { success: false, error: 'Message is required' },
          { status: 400, headers: corsHeaders }
        );
      }

      const lowerMessage = message.toLowerCase();
      let response = '';
      let suggestions: string[] = [];
      let internalLinks: Array<{title: string, url: string, description: string}> = [];

      // Database-powered responses with real broker data
      if (lowerMessage.includes('spread') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
        // Get actual spread data from database
        try {
          const lowSpreadBrokers = await DB.prepare(`
            SELECT b.name, b.slug, b.rating, s.eur_usd_spread, s.gbp_usd_spread, s.account_type
            FROM brokers b 
            JOIN spreads s ON b.id = s.broker_id 
            WHERE s.eur_usd_spread < 1.5 
            ORDER BY s.eur_usd_spread ASC, b.rating DESC 
            LIMIT 5
          `).all();

          if (lowSpreadBrokers.results && lowSpreadBrokers.results.length > 0) {
            response = `Here are the **lowest spread brokers** from our database:\n\n`;
            lowSpreadBrokers.results.forEach((broker: any, index: number) => {
              response += `**${index + 1}. ${broker.name}** (${broker.rating}⭐)\n`;
              response += `• EUR/USD: ${broker.eur_usd_spread} pips (${broker.account_type})\n`;
              response += `• GBP/USD: ${broker.gbp_usd_spread} pips\n\n`;
              
              internalLinks.push({
                title: `${broker.name} Review`,
                url: `/reviews/${broker.slug}`,
                description: `Detailed review of ${broker.name} spreads and features`
              });
            });
            
            response += `💡 **Tip**: Raw/ECN accounts typically offer lower spreads but charge commissions.\n\n`;
            
            internalLinks.push({
              title: "Trading Cost Calculator",
              url: "/simulator",
              description: "Calculate your exact trading costs with different brokers"
            });
          } else {
            response = `I can help you find brokers with competitive spreads! Here are some top options:\n\n`;
            response += `• **IC Markets**: Raw spreads from 0.0 pips + commission\n`;
            response += `• **Pepperstone**: Razor account with tight spreads\n`;
            response += `• **OANDA**: Fixed spreads starting from 0.8 pips\n\n`;
          }
        } catch (error) {
          response = `I can help you compare broker spreads! Here are some popular low-spread options:\n\n`;
          response += `• **IC Markets**: Raw spreads from 0.0 pips\n`;
          response += `• **Pepperstone**: Competitive ECN pricing\n`;
          response += `• **OANDA**: Transparent fixed spreads\n\n`;
        }
        
        suggestions = [
          'Show ECN account types',
          'Calculate my exact trading costs',
          'Compare commission vs spread accounts'
        ];
        
      } else if (lowerMessage.includes('regulation') || lowerMessage.includes('safe') || lowerMessage.includes('license')) {
        // Get regulated brokers from database
        try {
          const regulatedBrokers = await DB.prepare(`
            SELECT DISTINCT b.name, b.slug, b.rating, r.authority, r.license_number, r.country
            FROM brokers b 
            JOIN regulations r ON b.id = r.broker_id 
            WHERE r.authority IN ('ASIC', 'FCA', 'CySEC', 'CFTC', 'NFA') 
            AND b.rating >= 4.0
            ORDER BY b.rating DESC, r.authority
            LIMIT 8
          `).all();

          if (regulatedBrokers.results && regulatedBrokers.results.length > 0) {
            response = `Here are our **top-rated regulated brokers**:\n\n`;
            
            const brokersByRegulator: {[key: string]: any[]} = {};
            regulatedBrokers.results.forEach((broker: any) => {
              if (!brokersByRegulator[broker.authority]) {
                brokersByRegulator[broker.authority] = [];
              }
              brokersByRegulator[broker.authority].push(broker);
            });

            Object.keys(brokersByRegulator).forEach(regulator => {
              response += `**${regulator} Regulated:**\n`;
              brokersByRegulator[regulator].slice(0, 2).forEach((broker: any) => {
                response += `• [${broker.name}](/reviews/${broker.slug}) - ${broker.rating}⭐ (License: ${broker.license_number})\n`;
                
                internalLinks.push({
                  title: `${broker.name} Regulation Details`,
                  url: `/reviews/${broker.slug}#regulation`,
                  description: `${broker.authority} regulation and safety information`
                });
              });
              response += '\n';
            });
            
            response += `🛡️ **Safety Tip**: All listed brokers offer investor protection and segregated client funds.\n`;
          } else {
            response = `I recommend looking for brokers regulated by major authorities:\n\n`;
            response += `• **ASIC** (Australia): Strong consumer protection\n`;
            response += `• **FCA** (UK): Strict regulatory standards\n`;
            response += `• **CySEC** (Cyprus): EU-compliant regulation\n`;
            response += `• **CFTC/NFA** (USA): Robust oversight\n\n`;
          }
        } catch (error) {
          response = `Safety first! Look for brokers regulated by:\n\n`;
          response += `• **ASIC** (Australia)\n`;
          response += `• **FCA** (UK)\n`;
          response += `• **CySEC** (Cyprus)\n`;
          response += `• **CFTC/NFA** (USA)\n\n`;
        }
        
        suggestions = [
          'Show ASIC vs FCA regulation differences',
          'What is investor compensation?',
          'Find brokers in my country'
        ];
        
      } else if (lowerMessage.includes('beginner') || lowerMessage.includes('new') || lowerMessage.includes('start')) {
        // Get beginner-friendly brokers
        try {
          const beginnerBrokers = await DB.prepare(`
            SELECT b.name, b.slug, b.rating, b.min_deposit_usd, b.demo_account, b.mobile_app
            FROM brokers b 
            WHERE b.demo_account = 1 
            AND b.mobile_app = 1 
            AND b.min_deposit_usd <= 200 
            AND b.rating >= 4.0
            ORDER BY b.rating DESC, b.min_deposit_usd ASC 
            LIMIT 5
          `).all();

          response = `**Perfect brokers for beginners:**\n\n`;
          if (beginnerBrokers.results && beginnerBrokers.results.length > 0) {
            beginnerBrokers.results.forEach((broker: any, index: number) => {
              response += `**${index + 1}. ${broker.name}** (${broker.rating}⭐)\n`;
              response += `• Minimum deposit: $${broker.min_deposit_usd}\n`;
              response += `• Demo account: ✅ | Mobile app: ✅\n\n`;
              
              internalLinks.push({
                title: `${broker.name} Beginner Guide`,
                url: `/reviews/${broker.slug}#beginners`,
                description: `Why ${broker.name} is perfect for new traders`
              });
            });
          } else {
            response += `**Top beginner-friendly features to look for:**\n\n`;
            response += `• **Demo accounts** - Practice with virtual money\n`;
            response += `• **Educational resources** - Learn trading basics\n`;
            response += `• **Low minimum deposits** - Start small\n`;
            response += `• **User-friendly platforms** - Easy to navigate\n\n`;
          }
        } catch (error) {
          response = `**Great brokers for beginners:**\n\n`;
          response += `• **OANDA** - $0 minimum, excellent education\n`;
          response += `• **IG** - Demo account, comprehensive guides\n`;
          response += `• **Plus500** - Simple platform, low minimums\n\n`;
        }
        
        response += `📚 **Getting Started Tips:**\n`;
        response += `1. Start with a demo account\n`;
        response += `2. Begin with major currency pairs\n`;
        response += `3. Use proper risk management\n`;
        response += `4. Take advantage of educational resources\n`;
        
        internalLinks.push({
          title: "Forex Trading Guide",
          url: "/guides/beginners",
          description: "Complete guide to starting forex trading"
        });
        
        suggestions = [
          'How to open a demo account',
          'What are the best currency pairs for beginners?',
          'Show educational resources'
        ];
        
      } else {
        // Default welcome response with database stats
        try {
          const stats = await DB.prepare(`
            SELECT 
              COUNT(*) as total_brokers,
              COUNT(CASE WHEN is_regulated = 1 THEN 1 END) as regulated_count,
              AVG(rating) as avg_rating
            FROM brokers
          `).first();

          response = `👋 **Welcome to BrokerAnalysis Assistant!**\n\n`;
          response += `I'm here to help you navigate our database of **${stats?.total_brokers || 74} forex brokers** with real data and reviews.\n\n`;
          response += `🔍 **I can help you with:**\n`;
          response += `• Find brokers by spreads, regulation, or features\n`;
          response += `• Compare brokers side-by-side\n`;
          response += `• Calculate trading costs\n`;
          response += `• Get personalized recommendations\n`;
          response += `• Answer questions about forex trading\n\n`;
          response += `💡 **Try asking**: "Show me regulated brokers" or "Which broker has the lowest spreads?"\n`;
        } catch (error) {
          response = `👋 **Welcome to BrokerAnalysis Assistant!**\n\n`;
          response += `I'm here to help you find the perfect forex broker! I can assist with broker comparisons, regulations, spreads, and trading guidance.\n\n`;
          response += `💡 **Try asking**: "Show me regulated brokers" or "Which broker has the lowest spreads?"\n`;
        }
        
        internalLinks.push({
          title: "Browse All Brokers",
          url: "/reviews",
          description: "Complete list of reviewed forex brokers"
        });
        
        internalLinks.push({
          title: "Broker Comparison Tool",
          url: "/compare",
          description: "Compare brokers side-by-side"
        });
        
        suggestions = [
          'Show me the top 5 brokers',
          'Find regulated brokers',
          'Which broker is best for beginners?',
          'Calculate my trading costs'
        ];
      }

      return Response.json({
        success: true,
        response,
        suggestions,
        internalLinks,
        timestamp: new Date().toISOString()
      }, { headers: corsHeaders });
    }

    // Stats API
    if (path === 'stats' && request.method === 'GET') {
      try {
        const stats = await DB.prepare(`
          SELECT 
            COUNT(DISTINCT b.id) as total_brokers,
            COUNT(DISTINCT r.id) as total_regulations,
            AVG(b.rating) as avg_rating,
            MIN(b.min_deposit_usd) as min_deposit,
            MAX(b.min_deposit_usd) as max_deposit
          FROM brokers b
          LEFT JOIN regulations r ON b.id = r.broker_id
        `).first();

        return Response.json({
          success: true,
          stats: {
            totalBrokers: stats?.total_brokers || 0,
            totalRegulations: stats?.total_regulations || 0,
            averageRating: parseFloat((stats?.avg_rating || 0).toFixed(1)),
            minDeposit: stats?.min_deposit || 0,
            maxDeposit: stats?.max_deposit || 0,
            lastUpdated: new Date().toISOString()
          }
        }, { headers: corsHeaders });
      } catch (error) {
        console.error('Stats error:', error);
        return Response.json(
          { success: false, error: 'Failed to get statistics' },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // Fallback for unknown routes
    return Response.json(
      { success: false, error: 'API route not found' },
      { status: 404, headers: corsHeaders }
    );

  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { success: false, error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}