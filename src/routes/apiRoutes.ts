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

    const { DB } = c.env;
    const brokerService = new BrokerService(DB);
    
    // Get all brokers with their details
    const brokersResult = await DB.prepare(`
      SELECT b.*, bd.pros_text, bd.cons_text,
             GROUP_CONCAT(DISTINCT r.regulator_name) as regulators,
             GROUP_CONCAT(DISTINCT r.country_name) as regulated_countries
      FROM brokers b
      LEFT JOIN broker_details bd ON b.id = bd.broker_id
      LEFT JOIN regulations r ON b.id = r.broker_id
      GROUP BY b.id
      ORDER BY b.rating DESC
    `).all();

    const brokers = brokersResult.results;
    const recommendations: any[] = [];

    for (const broker of brokers) {
      let score = broker.rating * 20; // Base score out of 100
      let reasoning: string[] = [];

      // Capital matching (check minimum deposit)
      if (capital && broker.min_deposit_usd) {
        const minDeposit = parseInt(broker.min_deposit_usd);
        const userCapital = parseInt(capital);
        
        if (userCapital >= minDeposit) {
          if (userCapital >= minDeposit * 3) {
            score += 10;
            reasoning.push(`✓ Your ${capital} capital comfortably exceeds the minimum deposit requirement`);
          } else {
            score += 5;
            reasoning.push(`✓ Your ${capital} capital meets the minimum deposit requirement`);
          }
        } else {
          score -= 20;
          reasoning.push(`✗ Minimum deposit ($${minDeposit}) exceeds your capital (${capital})`);
        }
      }

      // Regulation bonus
      if (broker.is_regulated) {
        score += 15;
        reasoning.push(`✓ Regulated broker with oversight from: ${broker.regulators || 'various authorities'}`);
      }

      // Experience level matching
      if (experience === 'beginner' && broker.demo_account) {
        score += 10;
        reasoning.push('✓ Offers demo account - perfect for beginners to practice');
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

      // Social trading preference
      if (socialTrading === 'yes' && (broker.social_trading || broker.copy_trading)) {
        score += 20;
        reasoning.push('✓ Excellent social/copy trading features available');
      } else if (socialTrading === 'no' && (!broker.social_trading && !broker.copy_trading)) {
        score += 5;
        reasoning.push('✓ Focused on individual trading without social features');
      }

      // Account type matching
      if (accountType === 'islamic' && broker.name.toLowerCase().includes('islamic')) {
        score += 15;
        reasoning.push('✓ Offers Islamic/Halal trading accounts');
      }

      // Risk tolerance
      if (riskTolerance === 'low' && broker.is_regulated && broker.max_leverage && parseInt(broker.max_leverage.replace(/[^\d]/g, '')) <= 50) {
        score += 10;
        reasoning.push('✓ Conservative leverage and strong regulation suitable for low-risk preference');
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
          regulators: broker.regulators,
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

// Chatbot API
apiRoutes.post('/api/chatbot', async (c) => {
  try {
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

    // Simple rule-based responses (in production, integrate with AI service)
    if (lowerMessage.includes('spread') || lowerMessage.includes('cost')) {
      response = `Trading spreads vary significantly between brokers. For example:
      • IC Markets offers RAW spreads from 0.0 pips + $3.50 commission
      • Pepperstone provides Razor spreads from 0.0 pips + $3.50 commission  
      • OANDA has fixed spreads starting from 0.8 pips on EUR/USD
      
      Would you like me to compare specific brokers or help you calculate trading costs?`;
      
      suggestions = [
        'Compare IC Markets vs Pepperstone spreads',
        'Calculate my trading costs',
        'Show me the lowest spread brokers'
      ];
    } else if (lowerMessage.includes('regulation') || lowerMessage.includes('safe')) {
      response = `Broker regulation is crucial for trader safety. Here are key regulators:
      • **ASIC** (Australia) - Very strong consumer protection
      • **FCA** (UK) - Strict capital requirements  
      • **CySEC** (Cyprus) - EU-wide protections
      • **CFTC/NFA** (USA) - Highest capital requirements
      
      All our top-rated brokers are regulated by at least one major authority.`;
      
      suggestions = [
        'Show ASIC regulated brokers',
        'Compare FCA vs ASIC regulation',
        'What is investor compensation?'
      ];
    } else if (lowerMessage.includes('beginner') || lowerMessage.includes('new')) {
      response = `For beginners, I recommend focusing on:
      1. **Regulated brokers** for safety
      2. **Demo accounts** to practice risk-free
      3. **Educational resources** and webinars
      4. **Lower minimum deposits** to start small
      5. **User-friendly platforms** like MetaTrader 4
      
      Top beginner-friendly brokers: IC Markets, Pepperstone, and AvaTrade.`;
      
      suggestions = [
        'Show beginner-friendly brokers',
        'How do I start forex trading?',
        'What is a demo account?'
      ];
    } else if (lowerMessage.includes('scalping')) {
      response = `For scalping, you need:
      • **Raw/ECN spreads** (lowest possible)
      • **Fast execution** (under 50ms)
      • **No restrictions** on scalping
      • **Professional platforms** with advanced tools
      
      Best scalping brokers: IC Markets, Pepperstone, and FP Markets with their RAW account types.`;
      
      suggestions = [
        'Compare RAW spread accounts',
        'Show execution speeds',
        'What is ECN trading?'
      ];
    } else if (lowerMessage.includes('minimum deposit') || lowerMessage.includes('how much')) {
      response = `Minimum deposits vary widely:
      • **$0-50**: XM Group, Exness, FBS
      • **$100-200**: Pepperstone, IC Markets  
      • **$500+**: Interactive Brokers, Saxo Bank
      
      Remember: start with what you can afford to lose, and many brokers offer demo accounts to practice first.`;
      
      suggestions = [
        'Show low deposit brokers',
        'Compare account types',
        'How much should I start with?'
      ];
    } else {
      response = `I'm here to help you find the perfect forex broker! I can assist with:
      
      🔍 **Broker Comparisons** - Side-by-side analysis
      📊 **Cost Calculations** - Trading cost estimates  
      🛡️ **Regulation Info** - Safety and compliance
      📚 **Trading Education** - Guides for all levels
      
      What specific aspect of forex trading interests you most?`;
      
      suggestions = [
        'Compare top 3 brokers',
        'Find regulated brokers',
        'Calculate trading costs',
        'Best brokers for beginners'
      ];
    }

    return c.json({
      success: true,
      response,
      suggestions,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to process message' 
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