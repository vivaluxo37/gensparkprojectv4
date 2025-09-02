// Core API routes for recommendations, search, stats, and chatbot
import { Hono } from 'hono';
import type { Bindings } from '../types';
import { BrokerService } from '../services/brokerService';

const apiRoutes = new Hono<{ Bindings: Bindings }>();

// Recommendations API
apiRoutes.post('/api/recommendations', async (c) => {
  try {
    const body = await c.req.json();
    const { country, experience, strategy, capital, accountType, riskTolerance, socialTrading } = body;
    
    // Check if user is logged in
    const sessionId = c.req.header('Cookie')?.match(/session_id=([^;]+)/)?.[1];
    let userId = null;
    
    if (sessionId) {
      try {
        const { DB } = c.env;
        const session = await DB.prepare(
          'SELECT user_id FROM user_sessions WHERE session_id = ? AND expires_at > datetime("now")'
        ).bind(sessionId).first();
        if (session) {
          userId = session.user_id;
        }
      } catch (error) {
        console.log('Session lookup error:', error);
        // Continue without saving - recommendations still work
      }
    }

    // Use static broker data for now - this provides a working recommendation system
    const staticBrokers = [
      {
        id: 1, name: "IC Markets", slug: "ic-markets", rating: 4.6, logo_url: "/static/logos/icmarkets.png",
        website_url: "https://icmarkets.com", min_deposit_usd: "200", max_leverage: "1:500",
        spread_type: "raw", is_regulated: true, demo_account: true, mobile_app: true,
        copy_trading: false, social_trading: false, headquarters: "Sydney, Australia",
        pros_text: "Raw spreads from 0.0 pips\nFast execution with low latency\nStrong regulation and reputation",
        cons_text: "Higher minimum deposit for Raw account\nNo social trading features"
      },
      {
        id: 2, name: "Pepperstone", slug: "pepperstone", rating: 4.5, logo_url: "/static/logos/pepperstone.png",
        website_url: "https://pepperstone.com", min_deposit_usd: "0", max_leverage: "1:500",
        spread_type: "raw", is_regulated: true, demo_account: true, mobile_app: true,
        copy_trading: false, social_trading: false, headquarters: "Melbourne, Australia",
        pros_text: "Ultra-tight spreads on Raw account\nFast execution speeds\nMultiple platform options",
        cons_text: "No US clients accepted\nHigher commission on Raw accounts"
      },
      {
        id: 3, name: "OANDA", slug: "oanda", rating: 4.5, logo_url: "/static/logos/oanda.png",
        website_url: "https://oanda.com", min_deposit_usd: "0", max_leverage: "1:50",
        spread_type: "fixed", is_regulated: true, demo_account: true, mobile_app: true,
        copy_trading: false, social_trading: false, headquarters: "Toronto, Canada",
        pros_text: "No minimum deposit requirement\nExcellent execution quality\nComprehensive API for algo trading",
        cons_text: "Limited leverage compared to others\nNo MetaTrader 5 platform"
      },
      {
        id: 4, name: "Interactive Brokers", slug: "interactive-brokers", rating: 4.7, logo_url: "/static/logos/ib.png",
        website_url: "https://interactivebrokers.com", min_deposit_usd: "0", max_leverage: "1:40",
        spread_type: "raw", is_regulated: true, demo_account: true, mobile_app: true,
        copy_trading: false, social_trading: false, headquarters: "Connecticut, USA",
        pros_text: "Extremely low commissions and spreads\nAccess to global markets\nProfessional-grade trading tools",
        cons_text: "Complex platform not suitable for beginners\nHigh inactivity fees for small accounts"
      },
      {
        id: 5, name: "Forex.com", slug: "forex-com", rating: 4.6, logo_url: "/static/logos/forex-com.png",
        website_url: "https://forex.com", min_deposit_usd: "100", max_leverage: "1:50",
        spread_type: "fixed", is_regulated: true, demo_account: true, mobile_app: true,
        copy_trading: true, social_trading: false, headquarters: "New York, USA",
        pros_text: "Well-established with strong reputation\nMultiple platform options\nGood educational resources",
        cons_text: "Higher spreads compared to ECN brokers\nLimited cryptocurrency offerings"
      },
      {
        id: 6, name: "TastyFX", slug: "tastyfx", rating: 4.8, logo_url: "/static/logos/tastyfx.png",
        website_url: "https://tastyfx.com", min_deposit_usd: "250", max_leverage: "1:50",
        spread_type: "fixed", is_regulated: true, demo_account: true, mobile_app: true,
        copy_trading: false, social_trading: false, headquarters: "London, UK",
        pros_text: "Excellent mobile trading platform\nStrong regulatory oversight\nCompetitive spreads on major pairs",
        cons_text: "High minimum deposit requirement\nLimited copy trading options"
      }
    ];

    const recommendations: any[] = [];

    for (const broker of staticBrokers) {
      let score = broker.rating * 20; // Base score out of 100
      let reasoning: string[] = [];

      // Capital matching (check minimum deposit)
      if (capital && broker.min_deposit_usd) {
        const minDeposit = parseInt(broker.min_deposit_usd);
        const userCapital = parseInt(capital);
        
        if (userCapital >= minDeposit) {
          if (userCapital >= minDeposit * 3) {
            score += 10;
            reasoning.push(`✓ Your $${capital} capital comfortably exceeds the minimum deposit requirement`);
          } else {
            score += 5;
            reasoning.push(`✓ Your $${capital} capital meets the minimum deposit requirement`);
          }
        } else {
          score -= 20;
          reasoning.push(`✗ Minimum deposit ($${minDeposit}) exceeds your capital ($${capital})`);
        }
      }

      // Regulation bonus
      if (broker.is_regulated) {
        score += 15;
        reasoning.push(`✓ Regulated broker with strong oversight from major authorities`);
      }

      // Experience level matching
      if (experience === 'beginner' && broker.demo_account) {
        score += 10;
        reasoning.push('✓ Offers demo account - perfect for beginners to practice risk-free');
      }

      if (experience === 'advanced' && broker.name === 'Interactive Brokers') {
        score += 15;
        reasoning.push('✓ Professional-grade platform ideal for advanced traders');
      }

      // Strategy matching
      if (strategy === 'scalping' && broker.spread_type === 'raw') {
        score += 15;
        reasoning.push('✓ Raw spreads ideal for scalping strategy');
      }
      
      if (strategy === 'long-term' && broker.is_regulated) {
        score += 10;
        reasoning.push('✓ Regulated brokers provide security for long-term positions');
      }

      if (strategy === 'day-trading' && (broker.spread_type === 'raw' || broker.name === 'IC Markets' || broker.name === 'Pepperstone')) {
        score += 12;
        reasoning.push('✓ Excellent execution speeds for day trading strategies');
      }

      // Social trading preference
      if (socialTrading === 'yes' && broker.copy_trading) {
        score += 20;
        reasoning.push('✓ Excellent copy trading features available');
      } else if (socialTrading === 'no' && !broker.copy_trading) {
        score += 5;
        reasoning.push('✓ Focused on individual trading without social features');
      }

      // Account type matching
      if (accountType === 'islamic' && broker.name.toLowerCase().includes('islamic')) {
        score += 15;
        reasoning.push('✓ Offers Islamic/Halal trading accounts');
      }

      // Risk tolerance
      if (riskTolerance === 'low' && broker.is_regulated && broker.max_leverage) {
        const leverageNum = parseInt(broker.max_leverage.replace(/[^\d]/g, ''));
        if (leverageNum <= 50) {
          score += 10;
          reasoning.push('✓ Conservative leverage and strong regulation suitable for low-risk preference');
        }
      }

      // Capital-based recommendations
      if (capital) {
        const userCapital = parseInt(capital);
        if (userCapital < 500 && broker.min_deposit_usd === "0") {
          score += 8;
          reasoning.push('✓ No minimum deposit requirement - perfect for small accounts');
        }
      }

      // Ensure score stays within bounds
      score = Math.max(0, Math.min(100, Math.round(score)));

      recommendations.push({
        broker: {
          id: broker.id,
          name: broker.name,
          slug: broker.slug,
          rating: broker.rating,
          logo_url: broker.logo_url,
          website_url: broker.website_url,
          min_deposit_usd: broker.min_deposit_usd,
          max_leverage: broker.max_leverage,
          spread_type: broker.spread_type,
          is_regulated: broker.is_regulated,
          headquarters: broker.headquarters,
          pros: broker.pros_text ? broker.pros_text.split('\n').filter(Boolean) : [],
          cons: broker.cons_text ? broker.cons_text.split('\n').filter(Boolean) : []
        },
        matchScore: score,
        reasoning: reasoning
      });
    }

    // Sort by match score and return top recommendations
    recommendations.sort((a, b) => b.matchScore - a.matchScore);
    const topRecommendations = recommendations.slice(0, 6);

    // Save match for logged-in users
    if (userId) {
      try {
        const { DB } = c.env;
        
        // Create broker match record
        const matchResult = await DB.prepare(`
          INSERT INTO broker_matches (user_id, user_profile, created_at)
          VALUES (?, ?, datetime('now'))
        `).bind(
          userId,
          JSON.stringify({ country, experience, strategy, capital, accountType, riskTolerance, socialTrading })
        ).run();
        
        if (matchResult.meta.last_row_id) {
          // Save individual recommendations
          for (const rec of topRecommendations.slice(0, 3)) {
            await DB.prepare(`
              INSERT INTO broker_recommendations (match_id, broker_id, score, reasoning, created_at)
              VALUES (?, ?, ?, ?, datetime('now'))
            `).bind(
              matchResult.meta.last_row_id,
              rec.broker.id,
              rec.matchScore,
              rec.reasoning.join('\n')
            ).run();
          }
        }
      } catch (saveError) {
        console.log('Error saving match:', saveError);
        // Continue - don't fail the recommendation response
      }
    }

    return c.json({
      success: true,
      recommendations: topRecommendations,
      total: recommendations.length,
      criteria: { country, experience, strategy, capital, accountType, riskTolerance, socialTrading }
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    return c.json({ success: false, error: 'Failed to generate recommendations' }, 500);
  }
});

// Enhanced search API
apiRoutes.get('/api/search', async (c) => {
  try {
    const url = new URL(c.req.url);
    const query = url.searchParams.get('q')?.toLowerCase() || '';
    
    if (!query) {
      return c.json({ results: [] });
    }

    const { DB } = c.env;
    
    const results = await DB.prepare(`
      SELECT id, name, slug, rating, logo_url, min_deposit_usd, max_leverage, spread_type
      FROM brokers
      WHERE LOWER(name) LIKE ? 
         OR LOWER(headquarters) LIKE ?
         OR LOWER(spread_type) LIKE ?
      ORDER BY 
        CASE 
          WHEN LOWER(name) LIKE ? THEN 1
          WHEN LOWER(name) LIKE ? THEN 2
          ELSE 3
        END,
        rating DESC
      LIMIT 10
    `).bind(
      `%${query}%`,
      `%${query}%`, 
      `%${query}%`,
      `${query}%`, // starts with query
      `%${query}%` // contains query
    ).all();

    return c.json({
      success: true,
      results: results.results,
      query
    });
  } catch (error) {
    console.error('Search error:', error);
    return c.json({ success: false, error: 'Search failed' }, 500);
  }
});

// Platform statistics
apiRoutes.get('/api/stats', async (c) => {
  try {
    const { DB } = c.env;
    
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

    return c.json({
      success: true,
      stats: {
        totalBrokers: stats?.total_brokers || 0,
        totalRegulations: stats?.total_regulations || 0,
        averageRating: parseFloat((stats?.avg_rating || 0).toFixed(1)),
        minDeposit: stats?.min_deposit || 0,
        maxDeposit: stats?.max_deposit || 0,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    return c.json({ success: false, error: 'Failed to get statistics' }, 500);
  }
});

// Enhanced Chatbot API with Database Integration
apiRoutes.post('/api/chatbot', async (c) => {
  try {
    const { DB } = c.env;
    const body = await c.req.json();
    const { message, context } = body;

    if (!message || message.trim().length === 0) {
      return c.json({ 
        success: false, 
        error: 'Message is required' 
      }, 400);
    }

    const lowerMessage = message.toLowerCase();
    let response = '';
    let suggestions: string[] = [];
    let internalLinks: Array<{title: string, url: string, description: string}> = [];

    // Database-powered responses with real broker data
    if (lowerMessage.includes('spread') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
      // Get actual spread data from database
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
        
        internalLinks.push({
          title: "Compare Brokers",
          url: "/compare",
          description: "Side-by-side comparison of spreads and fees"
        });
      }
      
      suggestions = [
        'Show ECN account types',
        'Calculate my exact trading costs',
        'Compare commission vs spread accounts'
      ];
      
    } else if (lowerMessage.includes('regulation') || lowerMessage.includes('safe') || lowerMessage.includes('license')) {
      // Get regulated brokers from database
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
      }
      
      suggestions = [
        'Show ASIC vs FCA regulation differences',
        'What is investor compensation?',
        'Find brokers in my country'
      ];
      
    } else if (lowerMessage.includes('beginner') || lowerMessage.includes('new') || lowerMessage.includes('start')) {
      // Get beginner-friendly brokers
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
      
    } else if (lowerMessage.includes('scalping') || lowerMessage.includes('fast') || lowerMessage.includes('ecn')) {
      // Get ECN/Raw account brokers
      const scalpingBrokers = await DB.prepare(`
        SELECT DISTINCT b.name, b.slug, b.rating, s.eur_usd_spread, s.account_type
        FROM brokers b 
        JOIN spreads s ON b.id = s.broker_id 
        WHERE s.account_type LIKE '%RAW%' OR s.account_type LIKE '%ECN%'
        AND s.eur_usd_spread <= 0.5
        ORDER BY s.eur_usd_spread ASC, b.rating DESC 
        LIMIT 5
      `).all();

      response = `**Best brokers for scalping:**\n\n`;
      if (scalpingBrokers.results && scalpingBrokers.results.length > 0) {
        scalpingBrokers.results.forEach((broker: any, index: number) => {
          response += `**${index + 1}. ${broker.name}** (${broker.rating}⭐)\n`;
          response += `• ${broker.account_type}: ${broker.eur_usd_spread} pips\n`;
          response += `• Fast execution & no scalping restrictions\n\n`;
          
          internalLinks.push({
            title: `${broker.name} ECN Account`,
            url: `/reviews/${broker.slug}#accounts`,
            description: `${broker.account_type} details and scalping conditions`
          });
        });
      }
      
      response += `⚡ **Scalping Requirements:**\n`;
      response += `• Raw spreads (0.0-0.5 pips) + commission\n`;
      response += `• Ultra-fast execution (<50ms)\n`;
      response += `• No restrictions on trading style\n`;
      
      suggestions = [
        'Compare execution speeds',
        'Show commission structures',
        'What is the difference between RAW and Standard accounts?'
      ];
      
    } else if (lowerMessage.includes('deposit') || lowerMessage.includes('money') || lowerMessage.includes('fund')) {
      // Get brokers by minimum deposit
      const depositBrokers = await DB.prepare(`
        SELECT name, slug, rating, min_deposit_usd
        FROM brokers 
        WHERE min_deposit_usd IS NOT NULL 
        ORDER BY min_deposit_usd ASC, rating DESC 
        LIMIT 6
      `).all();

      response = `**Brokers by minimum deposit:**\n\n`;
      if (depositBrokers.results && depositBrokers.results.length > 0) {
        depositBrokers.results.forEach((broker: any) => {
          response += `• **${broker.name}**: $${broker.min_deposit_usd} (${broker.rating}⭐)\n`;
          
          internalLinks.push({
            title: `${broker.name} Account Types`,
            url: `/reviews/${broker.slug}#accounts`,
            description: `Deposit requirements and account options`
          });
        });
      }
      
      response += `\n💰 **Funding Tips:**\n`;
      response += `• Start small with what you can afford to lose\n`;
      response += `• Many brokers offer demo accounts with virtual funds\n`;
      response += `• Consider deposit bonuses but read terms carefully\n`;
      
      suggestions = [
        'Show deposit methods',
        'Compare account types',
        'What about deposit bonuses?'
      ];
      
    } else if (lowerMessage.includes('copy trading') || lowerMessage.includes('social trading') || lowerMessage.includes('copy')) {
      // Get brokers with copy trading features
      const copyTradingBrokers = await DB.prepare(`
        SELECT name, slug, rating, copy_trading, social_trading, min_deposit_usd
        FROM brokers 
        WHERE copy_trading = 1 OR social_trading = 1
        ORDER BY rating DESC 
        LIMIT 6
      `).all();

      response = `**Brokers with Copy Trading:**\n\n`;
      if (copyTradingBrokers.results && copyTradingBrokers.results.length > 0) {
        copyTradingBrokers.results.forEach((broker: any, index: number) => {
          const features = [];
          if (broker.copy_trading) features.push('Copy Trading');
          if (broker.social_trading) features.push('Social Trading');
          
          response += `**${index + 1}. ${broker.name}** (${broker.rating}⭐)\n`;
          response += `• Features: ${features.join(', ')}\n`;
          response += `• Min Deposit: $${broker.min_deposit_usd}\n\n`;
          
          internalLinks.push({
            title: `${broker.name} Copy Trading Features`,
            url: `/reviews/${broker.slug}#social-trading`,
            description: `Social and copy trading options at ${broker.name}`
          });
        });
        
        response += `📈 **Copy Trading Benefits:**\n`;
        response += `• Follow successful traders automatically\n`;
        response += `• Learn from experienced professionals\n`;
        response += `• Diversify your trading strategies\n`;
        
      } else {
        response = `Currently, our database shows limited copy trading options. However, many brokers are adding these features. Check individual broker reviews for the latest information.\n\n`;
      }
      
      suggestions = [
        'Show social trading platforms',
        'What are the risks of copy trading?',
        'Compare copy trading fees'
      ];
      
    } else if (lowerMessage.includes('platform') || lowerMessage.includes('mt4') || lowerMessage.includes('mt5') || lowerMessage.includes('metatrader')) {
      // Get brokers by trading platform preferences
      const platformBrokers = await DB.prepare(`
        SELECT DISTINCT b.name, b.slug, b.rating, b.min_deposit_usd, p.platform_name
        FROM brokers b
        LEFT JOIN platforms p ON b.id = p.broker_id
        WHERE p.platform_name LIKE '%MetaTrader%' OR p.platform_name LIKE '%MT%'
        ORDER BY b.rating DESC 
        LIMIT 8
      `).all();

      response = `**MetaTrader Platform Brokers:**\n\n`;
      if (platformBrokers.results && platformBrokers.results.length > 0) {
        platformBrokers.results.forEach((broker: any, index: number) => {
          response += `**${index + 1}. ${broker.name}** (${broker.rating}⭐)\n`;
          response += `• Platform: ${broker.platform_name || 'MetaTrader 4/5'}\n`;
          response += `• Min Deposit: $${broker.min_deposit_usd}\n\n`;
          
          internalLinks.push({
            title: `${broker.name} Platform Details`,
            url: `/reviews/${broker.slug}#platforms`,
            description: `Trading platform options at ${broker.name}`
          });
        });
        
        response += `💻 **Platform Features:**\n`;
        response += `• Advanced charting and analysis tools\n`;
        response += `• Expert Advisors (EAs) support\n`;
        response += `• Mobile and desktop versions\n`;
        
      } else {
        response = `Most major forex brokers support MetaTrader 4 and 5 platforms. Here are our top-rated brokers:\n\n`;
        
        const fallbackBrokers = await DB.prepare(`
          SELECT name, slug, rating, min_deposit_usd
          FROM brokers 
          ORDER BY rating DESC 
          LIMIT 5
        `).all();
        
        if (fallbackBrokers.results) {
          fallbackBrokers.results.forEach((broker: any, index: number) => {
            response += `• **${broker.name}** (${broker.rating}⭐) - Min: $${broker.min_deposit_usd}\n`;
          });
        }
      }
      
      suggestions = [
        'Show mobile trading apps',
        'Compare trading platforms',
        'What about proprietary platforms?'
      ];
      
    } else if (lowerMessage.includes('leverage') || lowerMessage.includes('high leverage') || lowerMessage.includes('1:500')) {
      // Get brokers by leverage offerings
      const leverageBrokers = await DB.prepare(`
        SELECT name, slug, rating, max_leverage, min_deposit_usd, headquarters
        FROM brokers 
        WHERE max_leverage IS NOT NULL
        ORDER BY CAST(max_leverage AS INTEGER) DESC, rating DESC
        LIMIT 8
      `).all();

      response = `**High Leverage Forex Brokers:**\n\n`;
      if (leverageBrokers.results && leverageBrokers.results.length > 0) {
        leverageBrokers.results.forEach((broker: any, index: number) => {
          response += `**${index + 1}. ${broker.name}** (${broker.rating}⭐)\n`;
          response += `• Max Leverage: 1:${broker.max_leverage}\n`;
          response += `• Min Deposit: $${broker.min_deposit_usd} | Based in: ${broker.headquarters}\n\n`;
          
          internalLinks.push({
            title: `${broker.name} Leverage Details`,
            url: `/reviews/${broker.slug}#leverage`,
            description: `Leverage options and margin requirements`
          });
        });
        
        response += `⚠️ **Leverage Warning:**\n`;
        response += `• High leverage increases both profits and losses\n`;
        response += `• Regulated brokers may have leverage limits\n`;
        response += `• Always use proper risk management\n`;
      }
      
      suggestions = [
        'Show leverage by regulation',
        'What are margin requirements?',
        'Compare regulated vs unregulated leverage'
      ];
      
    } else if (lowerMessage.includes('country') || lowerMessage.includes('usa') || lowerMessage.includes('uk') || lowerMessage.includes('australia') || lowerMessage.includes('europe')) {
      // Get brokers by country/region
      let countryFilter = '';
      let regionName = '';
      
      if (lowerMessage.includes('usa') || lowerMessage.includes('united states')) {
        countryFilter = `WHERE headquarters LIKE '%USA%' OR headquarters LIKE '%United States%'`;
        regionName = 'USA';
      } else if (lowerMessage.includes('uk') || lowerMessage.includes('britain') || lowerMessage.includes('england')) {
        countryFilter = `WHERE headquarters LIKE '%UK%' OR headquarters LIKE '%London%' OR headquarters LIKE '%Britain%'`;
        regionName = 'UK';
      } else if (lowerMessage.includes('australia') || lowerMessage.includes('aussie')) {
        countryFilter = `WHERE headquarters LIKE '%Australia%' OR headquarters LIKE '%Sydney%' OR headquarters LIKE '%Melbourne%'`;
        regionName = 'Australia';
      } else if (lowerMessage.includes('europe') || lowerMessage.includes('eu')) {
        countryFilter = `WHERE headquarters LIKE '%Cyprus%' OR headquarters LIKE '%Germany%' OR headquarters LIKE '%Netherlands%' OR headquarters LIKE '%Switzerland%'`;
        regionName = 'Europe';
      }
      
      if (countryFilter) {
        const regionBrokers = await DB.prepare(`
          SELECT name, slug, rating, headquarters, min_deposit_usd, is_regulated
          FROM brokers 
          ${countryFilter}
          ORDER BY rating DESC 
          LIMIT 6
        `).all();

        response = `**${regionName} Based Forex Brokers:**\n\n`;
        if (regionBrokers.results && regionBrokers.results.length > 0) {
          regionBrokers.results.forEach((broker: any, index: number) => {
            const regulated = broker.is_regulated ? '🛡️ Regulated' : '⚠️ Check regulation';
            response += `**${index + 1}. ${broker.name}** (${broker.rating}⭐)\n`;
            response += `• Location: ${broker.headquarters}\n`;
            response += `• Status: ${regulated} | Min Deposit: $${broker.min_deposit_usd}\n\n`;
            
            internalLinks.push({
              title: `${broker.name} Regional Info`,
              url: `/reviews/${broker.slug}#regulation`,
              description: `Regulation and regional details for ${regionName}`
            });
          });
        } else {
          response = `I couldn't find specific brokers based in ${regionName}. However, many international brokers serve ${regionName} clients. Check our regulated brokers section.\n\n`;
        }
        
        suggestions = [
          'Show regulated brokers in ' + regionName,
          'What about client protection?',
          'Compare international vs local brokers'
        ];
      } else {
        response = `I can help you find brokers by region! Try asking about:\n\n`;
        response += `• "Show me USA brokers"\n`;
        response += `• "UK regulated brokers"\n`;
        response += `• "Australian forex brokers"\n`;
        response += `• "European brokers"\n`;
        
        suggestions = [
          'Show USA brokers',
          'Find UK regulated brokers',
          'Australian forex brokers'
        ];
      }
      
    } else if (lowerMessage.includes('compare') || lowerMessage.includes('vs') || lowerMessage.includes('difference')) {
      // Get top brokers for comparison
      const topBrokers = await DB.prepare(`
        SELECT name, slug, rating, min_deposit_usd, max_leverage, headquarters
        FROM brokers 
        ORDER BY rating DESC 
        LIMIT 5
      `).all();

      response = `**Top Forex Brokers Comparison:**\n\n`;
      if (topBrokers.results && topBrokers.results.length > 0) {
        topBrokers.results.forEach((broker: any, index: number) => {
          response += `**${index + 1}. ${broker.name}** (${broker.rating}⭐)\n`;
          response += `• Min Deposit: $${broker.min_deposit_usd} | Max Leverage: 1:${broker.max_leverage}\n`;
          response += `• Headquarters: ${broker.headquarters}\n\n`;
          
          internalLinks.push({
            title: `${broker.name} Full Review`,
            url: `/reviews/${broker.slug}`,
            description: `Complete analysis of ${broker.name}`
          });
        });
      }
      
      internalLinks.push({
        title: "Detailed Broker Comparison",
        url: "/compare",
        description: "Side-by-side comparison of all features"
      });
      
      suggestions = [
        'Compare specific brokers',
        'Show detailed feature comparison',
        'Which broker is best for my needs?'
      ];
      
    } else {
      // Default welcome response with database stats
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

    return c.json({
      success: true,
      response,
      suggestions,
      internalLinks,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to process message',
      response: 'Sorry, I encountered an error. Please try asking your question again.',
      suggestions: [
        'Show me top brokers',
        'Find regulated brokers',
        'Help with broker comparison'
      ]
    }, 500);
  }
});

// Legacy chat endpoint (alias)
apiRoutes.post('/api/chat', async (c) => {
  return apiRoutes.fetch(new Request(c.req.url.replace('/api/chat', '/api/chatbot'), {
    method: c.req.method,
    headers: c.req.headers,
    body: c.req.body
  }), c.env);
});

// Trading cost calculator
apiRoutes.post('/api/calculate-costs', async (c) => {
  try {
    const body = await c.req.json();
    const { brokerIds, strategy, volume, leverage, instrument = 'EURUSD' } = body;

    if (!brokerIds || !Array.isArray(brokerIds) || brokerIds.length === 0) {
      return c.json({ success: false, error: 'Broker IDs required' }, 400);
    }

    const { DB } = c.env;
    
    const results = [];
    
    for (const brokerId of brokerIds) {
      // Get broker and spread data
      const broker = await DB.prepare(`
        SELECT b.*, s.currency_pair, s.spread_pip, s.commission_per_lot
        FROM brokers b
        LEFT JOIN spreads s ON b.id = s.broker_id AND s.currency_pair = ?
        WHERE b.id = ?
      `).bind(instrument, brokerId).first();

      if (!broker) continue;

      const spreadPips = broker.spread_pip || 1.0;
      const commission = broker.commission_per_lot || 0;
      const lotSize = 100000; // Standard lot
      const pipValue = 10; // For EURUSD
      
      // Calculate costs based on strategy
      let tradesPerMonth = 20;
      let avgHoldingHours = 24;
      
      switch (strategy) {
        case 'scalping':
          tradesPerMonth = 200;
          avgHoldingHours = 0.5;
          break;
        case 'day-trading':
          tradesPerMonth = 100;
          avgHoldingHours = 8;
          break;
        case 'swing-trading':
          tradesPerMonth = 40;
          avgHoldingHours = 72;
          break;
        case 'position-trading':
          tradesPerMonth = 10;
          avgHoldingHours = 720; // 30 days
          break;
      }

      const lots = volume / 100000;
      const spreadCostPerTrade = spreadPips * pipValue * lots;
      const commissionPerTrade = commission * lots;
      const totalCostPerTrade = spreadCostPerTrade + commissionPerTrade;
      const monthlyCost = totalCostPerTrade * tradesPerMonth;

      results.push({
        broker: {
          id: broker.id,
          name: broker.name,
          slug: broker.slug
        },
        costs: {
          spreadCostPerTrade: spreadCostPerTrade.toFixed(2),
          commissionPerTrade: commissionPerTrade.toFixed(2),
          totalCostPerTrade: totalCostPerTrade.toFixed(2),
          monthlyCost: monthlyCost.toFixed(2),
          annualCost: (monthlyCost * 12).toFixed(2)
        },
        details: {
          spreadPips,
          commission,
          tradesPerMonth,
          volume: lots,
          instrument
        }
      });
    }

    // Sort by lowest cost
    results.sort((a, b) => parseFloat(a.costs.totalCostPerTrade) - parseFloat(b.costs.totalCostPerTrade));

    return c.json({
      success: true,
      results,
      strategy,
      calculations: {
        lotSize,
        pipValue,
        instrument
      }
    });
  } catch (error) {
    console.error('Cost calculation error:', error);
    return c.json({ success: false, error: 'Failed to calculate costs' }, 500);
  }
});

// Enhanced Broker Comparison API
apiRoutes.get('/api/compare', async (c) => {
  try {
    const brokerIds = c.req.query('brokers')?.split(',').filter(Boolean);
    
    if (!brokerIds || brokerIds.length === 0) {
      return c.json({ success: false, error: 'Broker IDs required' }, 400);
    }

    if (brokerIds.length > 4) {
      return c.json({ success: false, error: 'Maximum 4 brokers allowed for comparison' }, 400);
    }

    const { DB } = c.env;
    const brokerService = new BrokerService(DB);
    
    // Get detailed broker data for comparison
    const brokers = [];
    
    for (const brokerId of brokerIds) {
      const broker = await brokerService.getBrokerBySlug(brokerId);
      if (broker) {
        // Get additional details
        const details = await DB.prepare(`
          SELECT 
            bd.pros_text,
            bd.cons_text,
            bd.overview_text,
            GROUP_CONCAT(DISTINCT r.regulator_name) as regulators,
            GROUP_CONCAT(DISTINCT r.country_name) as regulated_countries,
            GROUP_CONCAT(DISTINCT s.currency_pair || ':' || s.spread_pip) as spreads_data
          FROM broker_details bd
          LEFT JOIN regulations r ON bd.broker_id = r.broker_id  
          LEFT JOIN spreads s ON bd.broker_id = s.broker_id
          WHERE bd.broker_id = ?
          GROUP BY bd.broker_id
        `).bind(broker.id).first();

        // Parse spreads data
        const spreadsMap = {};
        if (details?.spreads_data) {
          details.spreads_data.split(',').forEach(spread => {
            const [pair, pip] = spread.split(':');
            if (pair && pip) spreadsMap[pair] = parseFloat(pip);
          });
        }

        brokers.push({
          ...broker,
          details: details || {},
          spreads: spreadsMap
        });
      }
    }

    if (brokers.length === 0) {
      return c.json({ success: false, error: 'No valid brokers found' }, 404);
    }

    // Generate comparison matrix
    const comparisonMatrix = generateComparisonMatrix(brokers);
    
    return c.json({
      success: true,
      brokers,
      comparison: comparisonMatrix,
      count: brokers.length
    });

  } catch (error) {
    console.error('Comparison API error:', error);
    return c.json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    }, 500);
  }
});

function generateComparisonMatrix(brokers) {
  const features = [
    { key: 'rating', label: 'Overall Rating', type: 'rating' },
    { key: 'min_deposit_usd', label: 'Min Deposit', type: 'currency', unit: 'USD' },
    { key: 'max_leverage', label: 'Max Leverage', type: 'text' },
    { key: 'is_regulated', label: 'Regulated', type: 'boolean' },
    { key: 'demo_account', label: 'Demo Account', type: 'boolean' },
    { key: 'mobile_app', label: 'Mobile App', type: 'boolean' },
    { key: 'copy_trading', label: 'Copy Trading', type: 'boolean' },
    { key: 'social_trading', label: 'Social Trading', type: 'boolean' },
    { key: 'spread_type', label: 'Spread Type', type: 'text' },
    { key: 'headquarters', label: 'Headquarters', type: 'text' }
  ];

  const matrix = features.map(feature => {
    const row = {
      feature: feature.label,
      type: feature.type,
      unit: feature.unit,
      values: brokers.map(broker => {
        let value = broker[feature.key];
        
        if (feature.type === 'boolean') {
          return value ? 'Yes' : 'No';
        }
        
        if (feature.type === 'currency' && value) {
          return `$${value}`;
        }
        
        if (feature.type === 'rating' && value) {
          return `${value}/5`;
        }
        
        return value || 'N/A';
      }),
      winner: null
    };

    // Determine winner for this feature
    if (feature.type === 'rating') {
      const maxRating = Math.max(...brokers.map(b => parseFloat(b[feature.key]) || 0));
      row.winner = brokers.findIndex(b => parseFloat(b[feature.key]) === maxRating);
    } else if (feature.key === 'min_deposit_usd') {
      const minDeposit = Math.min(...brokers.map(b => parseFloat(b[feature.key]) || Infinity));
      row.winner = brokers.findIndex(b => parseFloat(b[feature.key]) === minDeposit);
    } else if (feature.type === 'boolean') {
      const hasFeature = brokers.some(b => b[feature.key]);
      if (hasFeature) {
        row.winner = brokers.findIndex(b => b[feature.key]);
      }
    }

    return row;
  });

  return matrix;
}

export { apiRoutes };