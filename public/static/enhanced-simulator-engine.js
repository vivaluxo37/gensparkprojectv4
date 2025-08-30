// Enhanced Trading Cost Simulator Engine
// ADDITIVE MODULE - Does not replace existing functionality
// Provides advanced calculation engine for professional-grade cost analysis

class EnhancedSimulatorEngine {
    constructor() {
        this.enhancedBrokerData = null;
        this.tradingStrategies = null;
        this.marketConditions = null;
        this.init();
    }

    async init() {
        await this.loadEnhancedData();
    }

    async loadEnhancedData() {
        try {
            // Enhanced broker data with detailed cost structures
            this.enhancedBrokerData = {
                "ic-markets": {
                    id: "ic-markets",
                    name: "IC Markets",
                    spreads: {
                        major_pairs: { min: 0.0, avg: 0.1, max: 0.3 },
                        minor_pairs: { min: 0.2, avg: 0.5, max: 1.2 },
                        exotic_pairs: { min: 0.8, avg: 1.5, max: 3.0 }
                    },
                    commission: {
                        type: 'fixed',
                        value: 7.0,
                        currency: 'USD'
                    },
                    swapRates: {
                        long: -2.5,
                        short: 0.5
                    },
                    executionModel: 'ecn',
                    slippageProfile: {
                        normal_market: 0.1,
                        volatile_market: 0.5
                    },
                    minimumDeposit: 200,
                    regulation: ['ASIC', 'CySEC', 'FSA'],
                    platforms: ['MetaTrader 4', 'MetaTrader 5', 'cTrader'],
                    orderExecution: {
                        average_speed_ms: 12,
                        fill_rate: 99.8,
                        requotes: 0.2
                    }
                },
                "pepperstone": {
                    id: "pepperstone",
                    name: "Pepperstone", 
                    spreads: {
                        major_pairs: { min: 0.0, avg: 0.2, max: 0.4 },
                        minor_pairs: { min: 0.3, avg: 0.6, max: 1.5 },
                        exotic_pairs: { min: 1.0, avg: 1.8, max: 3.5 }
                    },
                    commission: {
                        type: 'fixed',
                        value: 7.0,
                        currency: 'USD'
                    },
                    swapRates: {
                        long: -2.2,
                        short: 0.3
                    },
                    executionModel: 'ecn',
                    slippageProfile: {
                        normal_market: 0.15,
                        volatile_market: 0.6
                    },
                    minimumDeposit: 200,
                    regulation: ['ASIC', 'CySEC', 'FCA'],
                    platforms: ['MetaTrader 4', 'MetaTrader 5', 'cTrader'],
                    orderExecution: {
                        average_speed_ms: 15,
                        fill_rate: 99.6,
                        requotes: 0.3
                    }
                },
                "etoro": {
                    id: "etoro",
                    name: "eToro",
                    spreads: {
                        major_pairs: { min: 1.0, avg: 1.5, max: 3.0 },
                        minor_pairs: { min: 2.0, avg: 3.5, max: 6.0 },
                        exotic_pairs: { min: 4.0, avg: 8.0, max: 15.0 }
                    },
                    commission: {
                        type: 'spread_only',
                        value: 0.0,
                        currency: 'USD'
                    },
                    swapRates: {
                        long: -3.5,
                        short: 0.8
                    },
                    executionModel: 'market_maker',
                    slippageProfile: {
                        normal_market: 0.3,
                        volatile_market: 1.2
                    },
                    minimumDeposit: 50,
                    regulation: ['CySEC', 'FCA', 'ASIC'],
                    platforms: ['eToro Platform', 'eToro Mobile'],
                    orderExecution: {
                        average_speed_ms: 25,
                        fill_rate: 99.2,
                        requotes: 1.0
                    }
                },
                "tastyfx": {
                    id: "tastyfx",
                    name: "TastyFX",
                    spreads: {
                        major_pairs: { min: 0.8, avg: 1.2, max: 2.0 },
                        minor_pairs: { min: 1.5, avg: 2.5, max: 4.0 },
                        exotic_pairs: { min: 3.0, avg: 5.5, max: 10.0 }
                    },
                    commission: {
                        type: 'fixed',
                        value: 1.0,
                        currency: 'USD'
                    },
                    swapRates: {
                        long: -2.8,
                        short: 0.4
                    },
                    executionModel: 'stp',
                    slippageProfile: {
                        normal_market: 0.2,
                        volatile_market: 0.8
                    },
                    minimumDeposit: 250,
                    regulation: ['FCA', 'CFTC'],
                    platforms: ['TastyFX Platform', 'MetaTrader 4'],
                    orderExecution: {
                        average_speed_ms: 18,
                        fill_rate: 99.5,
                        requotes: 0.4
                    }
                },
                "oanda": {
                    id: "oanda",
                    name: "OANDA",
                    spreads: {
                        major_pairs: { min: 1.2, avg: 1.8, max: 3.5 },
                        minor_pairs: { min: 2.5, avg: 4.0, max: 7.0 },
                        exotic_pairs: { min: 5.0, avg: 10.0, max: 20.0 }
                    },
                    commission: {
                        type: 'spread_only',
                        value: 0.0,
                        currency: 'USD'
                    },
                    swapRates: {
                        long: -3.2,
                        short: 0.6
                    },
                    executionModel: 'market_maker',
                    slippageProfile: {
                        normal_market: 0.25,
                        volatile_market: 1.0
                    },
                    minimumDeposit: 1,
                    regulation: ['CFTC', 'NFA', 'ASIC'],
                    platforms: ['OANDA Trade', 'MetaTrader 4', 'TradingView'],
                    orderExecution: {
                        average_speed_ms: 22,
                        fill_rate: 99.3,
                        requotes: 0.8
                    }
                },
                "forex-com": {
                    id: "forex-com",
                    name: "Forex.com",
                    spreads: {
                        major_pairs: { min: 1.5, avg: 2.2, max: 4.0 },
                        minor_pairs: { min: 3.0, avg: 4.5, max: 8.0 },
                        exotic_pairs: { min: 6.0, avg: 12.0, max: 25.0 }
                    },
                    commission: {
                        type: 'spread_only',
                        value: 0.0,
                        currency: 'USD'
                    },
                    swapRates: {
                        long: -3.8,
                        short: 0.9
                    },
                    executionModel: 'market_maker',
                    slippageProfile: {
                        normal_market: 0.35,
                        volatile_market: 1.5
                    },
                    minimumDeposit: 100,
                    regulation: ['CFTC', 'NFA', 'ASIC'],
                    platforms: ['Forex.com Platform', 'MetaTrader 4', 'TradingView'],
                    orderExecution: {
                        average_speed_ms: 28,
                        fill_rate: 98.9,
                        requotes: 1.2
                    }
                }
            };

            // Enhanced trading strategies with detailed parameters
            this.tradingStrategies = {
                scalping: {
                    id: 'scalping',
                    name: 'Scalping',
                    description: 'High-frequency trading with very short holding periods (seconds to minutes)',
                    typicalHoldTime: '30 seconds - 5 minutes',
                    riskProfile: 'high',
                    requiredSpreadType: 'raw',
                    orderTypes: ['Market Orders', 'Limit Orders'],
                    costSensitivity: {
                        spread: 0.9, // Very sensitive to spreads
                        commission: 0.3,
                        slippage: 0.8
                    },
                    tradingHours: 'Major market sessions',
                    typicalTradesPerDay: 50,
                    averageRiskReward: 0.8,
                    requiredCapital: 'Medium-High',
                    difficultyLevel: 'Advanced'
                },
                daytrading: {
                    id: 'daytrading',
                    name: 'Day Trading', 
                    description: 'Intraday trading with positions closed within the same trading day',
                    typicalHoldTime: '30 minutes - 8 hours',
                    riskProfile: 'medium',
                    requiredSpreadType: 'any',
                    orderTypes: ['Market Orders', 'Limit Orders', 'Stop Orders'],
                    costSensitivity: {
                        spread: 0.6,
                        commission: 0.5,
                        slippage: 0.4
                    },
                    tradingHours: 'Active market sessions',
                    typicalTradesPerDay: 10,
                    averageRiskReward: 1.2,
                    requiredCapital: 'Medium',
                    difficultyLevel: 'Intermediate'
                },
                swing: {
                    id: 'swing',
                    name: 'Swing Trading',
                    description: 'Medium-term trading holding positions for days to weeks',
                    typicalHoldTime: '2 days - 2 weeks',
                    riskProfile: 'medium',
                    requiredSpreadType: 'any',
                    orderTypes: ['Limit Orders', 'Stop Orders', 'Trailing Stops'],
                    costSensitivity: {
                        spread: 0.3,
                        commission: 0.4,
                        slippage: 0.2
                    },
                    tradingHours: 'Flexible',
                    typicalTradesPerDay: 2,
                    averageRiskReward: 1.5,
                    requiredCapital: 'Low-Medium',
                    difficultyLevel: 'Beginner-Intermediate'
                },
                position: {
                    id: 'position',
                    name: 'Position Trading',
                    description: 'Long-term trading with positions held for weeks to months',
                    typicalHoldTime: '2 weeks - 6 months',
                    riskProfile: 'low',
                    requiredSpreadType: 'any',
                    orderTypes: ['Limit Orders', 'Stop Orders'],
                    costSensitivity: {
                        spread: 0.1,
                        commission: 0.2,
                        slippage: 0.1
                    },
                    tradingHours: 'Very flexible',
                    typicalTradesPerDay: 0.2,
                    averageRiskReward: 2.0,
                    requiredCapital: 'High',
                    difficultyLevel: 'Beginner'
                },
                algo: {
                    id: 'algo',
                    name: 'Algorithmic Trading',
                    description: 'Automated trading using algorithmic systems and EAs',
                    typicalHoldTime: 'Variable (seconds to hours)',
                    riskProfile: 'medium',
                    requiredSpreadType: 'raw',
                    orderTypes: ['All Order Types', 'Advanced Order Types'],
                    costSensitivity: {
                        spread: 0.8,
                        commission: 0.6,
                        slippage: 0.9
                    },
                    tradingHours: '24/5 automated',
                    typicalTradesPerDay: 25,
                    averageRiskReward: 1.1,
                    requiredCapital: 'High',
                    difficultyLevel: 'Expert'
                }
            };

            // Market condition factors
            this.marketConditions = {
                normal: {
                    volatilityMultiplier: 1.0,
                    liquidityFactor: 1.0,
                    spreadWidening: 1.0
                },
                volatile: {
                    volatilityMultiplier: 2.5,
                    liquidityFactor: 0.7,
                    spreadWidening: 2.0
                },
                news_event: {
                    volatilityMultiplier: 3.0,
                    liquidityFactor: 0.5,
                    spreadWidening: 3.5
                }
            };

        } catch (error) {
            console.error('Error loading enhanced data:', error);
        }
    }

    // Advanced cost calculation with strategy awareness
    calculateAdvancedCosts(brokerId, strategyId, params, marketCondition = 'normal') {
        const broker = this.enhancedBrokerData[brokerId];
        const strategy = this.tradingStrategies[strategyId];
        const market = this.marketConditions[marketCondition];

        if (!broker || !strategy) {
            throw new Error('Invalid broker or strategy ID');
        }

        const {
            tradeSize = 1.0,
            tradesPerMonth = 100,
            instrument = 'EURUSD',
            holdingPeriodDays = 1
        } = params;

        // Determine pair category
        const pairCategory = this.getPairCategory(instrument);
        
        // Get base spread for the pair category
        const baseSpread = broker.spreads[pairCategory].avg;
        
        // Apply market condition adjustments
        const adjustedSpread = baseSpread * market.spreadWidening;
        
        // Calculate strategy-specific costs
        const spreadCost = this.calculateSpreadCost(
            adjustedSpread, 
            tradeSize, 
            tradesPerMonth,
            instrument
        );

        const commissionCost = this.calculateCommissionCost(
            broker.commission,
            tradeSize,
            tradesPerMonth
        );

        const slippageCost = this.calculateSlippageCost(
            broker.slippageProfile,
            strategy.costSensitivity.slippage,
            market.volatilityMultiplier,
            tradeSize,
            tradesPerMonth,
            instrument
        );

        const swapCost = this.calculateSwapCost(
            broker.swapRates,
            tradeSize,
            tradesPerMonth,
            holdingPeriodDays
        );

        // Calculate execution quality impact
        const executionCost = this.calculateExecutionCost(
            broker.orderExecution,
            strategy,
            tradeSize,
            tradesPerMonth
        );

        const totalCost = spreadCost + commissionCost + slippageCost + swapCost + executionCost;
        const costPerTrade = totalCost / tradesPerMonth;
        const costPerLot = totalCost / (tradeSize * tradesPerMonth);

        return {
            brokerId,
            brokerName: broker.name,
            strategyName: strategy.name,
            costs: {
                spreadCost: Math.round(spreadCost * 100) / 100,
                commissionCost: Math.round(commissionCost * 100) / 100,
                slippageCost: Math.round(slippageCost * 100) / 100,
                swapCost: Math.round(swapCost * 100) / 100,
                executionCost: Math.round(executionCost * 100) / 100,
                totalCost: Math.round(totalCost * 100) / 100,
                costPerTrade: Math.round(costPerTrade * 100) / 100,
                costPerLot: Math.round(costPerLot * 100) / 100
            },
            breakdown: {
                adjustedSpread: Math.round(adjustedSpread * 100) / 100,
                spreadContribution: Math.round((spreadCost / totalCost) * 100),
                commissionContribution: Math.round((commissionCost / totalCost) * 100),
                slippageContribution: Math.round((slippageCost / totalCost) * 100),
                swapContribution: Math.round((swapCost / totalCost) * 100),
                executionContribution: Math.round((executionCost / totalCost) * 100)
            },
            qualityMetrics: {
                executionSpeed: broker.orderExecution.average_speed_ms,
                fillRate: broker.orderExecution.fill_rate,
                requoteRate: broker.orderExecution.requotes,
                suitabilityScore: this.calculateSuitabilityScore(broker, strategy)
            },
            marketCondition
        };
    }

    calculateSpreadCost(spread, tradeSize, tradesPerMonth, instrument) {
        const pipValue = this.getPipValue(instrument);
        return spread * pipValue * tradeSize * tradesPerMonth;
    }

    calculateCommissionCost(commission, tradeSize, tradesPerMonth) {
        if (commission.type === 'spread_only') {
            return 0;
        }
        return commission.value * tradeSize * tradesPerMonth;
    }

    calculateSlippageCost(slippageProfile, strategySensitivity, volatilityMultiplier, tradeSize, tradesPerMonth, instrument) {
        const baseSlippage = slippageProfile.normal_market * volatilityMultiplier * strategySensitivity;
        const pipValue = this.getPipValue(instrument);
        return baseSlippage * pipValue * tradeSize * tradesPerMonth;
    }

    calculateSwapCost(swapRates, tradeSize, tradesPerMonth, holdingPeriodDays) {
        if (holdingPeriodDays < 1) return 0;
        
        // Assume 50/50 long/short positions
        const averageSwap = (swapRates.long + swapRates.short) / 2;
        const swapDays = Math.max(1, holdingPeriodDays);
        
        return Math.abs(averageSwap) * tradeSize * tradesPerMonth * swapDays / 365;
    }

    calculateExecutionCost(orderExecution, strategy, tradeSize, tradesPerMonth) {
        // Factor in execution quality based on strategy requirements
        const speedPenalty = Math.max(0, (orderExecution.average_speed_ms - 20) * 0.01);
        const requotePenalty = orderExecution.requotes * 0.1;
        const fillPenalty = Math.max(0, (100 - orderExecution.fill_rate) * 0.5);
        
        const totalPenalty = (speedPenalty + requotePenalty + fillPenalty) * strategy.costSensitivity.slippage;
        
        return totalPenalty * tradeSize * tradesPerMonth;
    }

    calculateSuitabilityScore(broker, strategy) {
        let score = 80; // Base score

        // Spread type compatibility
        if (strategy.requiredSpreadType === 'raw' && broker.executionModel !== 'ecn') {
            score -= 20;
        }

        // Execution model compatibility
        if (strategy.id === 'scalping' && broker.executionModel === 'market_maker') {
            score -= 15;
        }

        // Platform compatibility
        const hasAdvancedPlatforms = broker.platforms.some(p => 
            ['MetaTrader 4', 'MetaTrader 5', 'cTrader'].includes(p)
        );
        if (strategy.difficultyLevel === 'Expert' && !hasAdvancedPlatforms) {
            score -= 10;
        }

        // Minimum deposit compatibility
        if (strategy.requiredCapital === 'High' && broker.minimumDeposit < 1000) {
            score += 10;
        } else if (strategy.requiredCapital === 'Low-Medium' && broker.minimumDeposit > 500) {
            score -= 10;
        }

        return Math.max(0, Math.min(100, score));
    }

    getPairCategory(instrument) {
        const majorPairs = ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD', 'USDCAD', 'NZDUSD'];
        const minorPairs = ['EURJPY', 'EURGBP', 'EURCHF', 'GBPJPY', 'CHFJPY', 'GBPCHF', 'EURAUD', 'EURNZD', 'GBPAUD', 'GBPCAD'];
        
        if (majorPairs.includes(instrument)) {
            return 'major_pairs';
        } else if (minorPairs.includes(instrument)) {
            return 'minor_pairs';
        } else {
            return 'exotic_pairs';
        }
    }

    getPipValue(instrument) {
        // Pip values for 1 standard lot (100,000 units)
        const pipValues = {
            'EURUSD': 10, 'GBPUSD': 10, 'AUDUSD': 10, 'NZDUSD': 10, 'USDCAD': 10,
            'USDCHF': 10, 'USDJPY': 10, 'EURJPY': 10, 'GBPJPY': 10, 'CHFJPY': 10,
            'EURGBP': 13, 'EURCHF': 10, 'EURAUD': 7, 'EURNZD': 6,
            'GBPCHF': 10, 'GBPAUD': 7, 'GBPCAD': 8
        };
        return pipValues[instrument] || 10;
    }

    // Compare multiple brokers for a strategy
    compareAcrossBrokers(brokerIds, strategyId, params, marketCondition = 'normal') {
        const results = brokerIds.map(brokerId => {
            try {
                return this.calculateAdvancedCosts(brokerId, strategyId, params, marketCondition);
            } catch (error) {
                console.error(`Error calculating costs for ${brokerId}:`, error);
                return null;
            }
        }).filter(result => result !== null);

        // Sort by total cost (lowest first)
        results.sort((a, b) => a.costs.totalCost - b.costs.totalCost);

        // Add ranking and savings information
        results.forEach((result, index) => {
            result.ranking = index + 1;
            if (index > 0) {
                const bestCost = results[0].costs.totalCost;
                result.additionalCostVsBest = Math.round((result.costs.totalCost - bestCost) * 100) / 100;
                result.percentageMoreExpensive = Math.round(((result.costs.totalCost - bestCost) / bestCost) * 100);
            } else {
                result.additionalCostVsBest = 0;
                result.percentageMoreExpensive = 0;
            }
        });

        return results;
    }

    // Generate insights and recommendations
    generateInsights(comparisonResults, strategyId, params) {
        const strategy = this.tradingStrategies[strategyId];
        const bestResult = comparisonResults[0];
        const worstResult = comparisonResults[comparisonResults.length - 1];
        
        const insights = {
            summary: {
                bestBroker: bestResult.brokerName,
                totalMonthlySavings: worstResult.costs.totalCost - bestResult.costs.totalCost,
                percentageSavings: Math.round(((worstResult.costs.totalCost - bestResult.costs.totalCost) / worstResult.costs.totalCost) * 100),
                costRange: {
                    lowest: bestResult.costs.totalCost,
                    highest: worstResult.costs.totalCost
                }
            },
            recommendations: [],
            warnings: [],
            optimizations: []
        };

        // Generate strategy-specific recommendations
        if (strategy.id === 'scalping') {
            insights.recommendations.push({
                type: 'strategy_optimization',
                message: `For scalping, raw spread accounts can reduce costs by 40-60%. ${bestResult.brokerName} offers excellent execution speed.`,
                importance: 'high'
            });
            
            if (bestResult.qualityMetrics.executionSpeed > 20) {
                insights.warnings.push({
                    type: 'execution_speed',
                    message: 'Execution speed above 20ms may impact scalping performance. Consider brokers with faster execution.',
                    severity: 'medium'
                });
            }
        }

        if (strategy.costSensitivity.spread > 0.7) {
            const spreadDominantBrokers = comparisonResults.filter(r => r.breakdown.spreadContribution > 60);
            if (spreadDominantBrokers.length > 0) {
                insights.optimizations.push({
                    type: 'spread_focus',
                    message: `Your strategy is spread-sensitive. Focus on ${bestResult.brokerName} with the lowest spreads.`,
                    potentialSavings: bestResult.costs.spreadCost - worstResult.costs.spreadCost
                });
            }
        }

        // Commission vs spread analysis
        const commissionBrokers = comparisonResults.filter(r => r.costs.commissionCost > 0);
        const spreadOnlyBrokers = comparisonResults.filter(r => r.costs.commissionCost === 0);
        
        if (commissionBrokers.length > 0 && spreadOnlyBrokers.length > 0) {
            const bestCommission = Math.min(...commissionBrokers.map(r => r.costs.totalCost));
            const bestSpreadOnly = Math.min(...spreadOnlyBrokers.map(r => r.costs.totalCost));
            
            if (bestCommission < bestSpreadOnly) {
                insights.recommendations.push({
                    type: 'cost_structure',
                    message: 'Commission-based brokers offer better value for your trading volume.',
                    savings: Math.round((bestSpreadOnly - bestCommission) * 100) / 100
                });
            }
        }

        return insights;
    }

    // Get all available strategies
    getStrategies() {
        return Object.values(this.tradingStrategies);
    }

    // Get all available brokers
    getBrokers() {
        return Object.values(this.enhancedBrokerData);
    }

    // Get strategy by ID
    getStrategy(strategyId) {
        return this.tradingStrategies[strategyId];
    }

    // Get broker by ID
    getBroker(brokerId) {
        return this.enhancedBrokerData[brokerId];
    }
}

// Export for global access
window.EnhancedSimulatorEngine = EnhancedSimulatorEngine;