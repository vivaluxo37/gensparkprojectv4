// Unit tests for simulator cost calculation function
// Tests the trading cost calculation logic

describe('Trading Cost Calculator', () => {
    let calculator;

    beforeEach(() => {
        // Use the global calculator functions
        calculator = window.TradingCostCalculator || {
            calculateSpreadCost: (spread, pipValue, tradeSize, trades) => {
                return spread * pipValue * tradeSize * trades;
            },
            
            calculateCommissionCost: (commission, tradeSize, trades) => {
                return commission * tradeSize * trades;
            },
            
            calculateSlippageCost: (slippage, pipValue, tradeSize, trades) => {
                return slippage * pipValue * tradeSize * trades;
            },
            
            calculateTotalCost: (spreadCost, commissionCost, slippageCost) => {
                return spreadCost + commissionCost + slippageCost;
            }
        };
    });

    // Test spread cost calculation
    test('should calculate spread cost correctly', () => {
        const result = calculator.calculateSpreadCost(1.0, 10, 1, 100);
        expect(result).toBe(1000); // 1 pip * $10 * 1 lot * 100 trades
    });

    test('should calculate spread cost for fractional values', () => {
        const result = calculator.calculateSpreadCost(0.5, 10, 0.1, 50);
        expect(result).toBe(25); // 0.5 pips * $10 * 0.1 lots * 50 trades
    });

    test('should handle zero spread', () => {
        const result = calculator.calculateSpreadCost(0, 10, 1, 100);
        expect(result).toBe(0);
    });

    // Test commission cost calculation
    test('should calculate commission cost correctly', () => {
        const result = calculator.calculateCommissionCost(7, 1, 100);
        expect(result).toBe(700); // $7 * 1 lot * 100 trades
    });

    test('should calculate commission for fractional lots', () => {
        const result = calculator.calculateCommissionCost(5, 0.1, 50);
        expect(result).toBe(25); // $5 * 0.1 lots * 50 trades
    });

    test('should handle zero commission', () => {
        const result = calculator.calculateCommissionCost(0, 1, 100);
        expect(result).toBe(0);
    });

    // Test slippage cost calculation
    test('should calculate slippage cost correctly', () => {
        const result = calculator.calculateSlippageCost(0.2, 10, 1, 100);
        expect(result).toBe(200); // 0.2 pips * $10 * 1 lot * 100 trades
    });

    test('should calculate slippage for different pip values', () => {
        const result = calculator.calculateSlippageCost(0.3, 8, 2, 25);
        expect(result).toBe(120); // 0.3 pips * $8 * 2 lots * 25 trades
    });

    // Test total cost calculation
    test('should calculate total cost correctly', () => {
        const spreadCost = 1000;
        const commissionCost = 700;
        const slippageCost = 200;
        
        const result = calculator.calculateTotalCost(spreadCost, commissionCost, slippageCost);
        expect(result).toBe(1900);
    });

    test('should handle all zero costs', () => {
        const result = calculator.calculateTotalCost(0, 0, 0);
        expect(result).toBe(0);
    });

    // Test realistic trading scenarios
    test('should calculate costs for scalping scenario', () => {
        // Scalping: tight spreads, high frequency, low slippage
        const spread = 0.1; // 0.1 pip spread
        const commission = 7; // $7 per lot
        const slippage = 0.3; // 0.3 pip slippage
        const pipValue = 10; // $10 per pip
        const tradeSize = 1; // 1 lot
        const trades = 200; // 200 trades per month

        const spreadCost = calculator.calculateSpreadCost(spread, pipValue, tradeSize, trades);
        const commissionCost = calculator.calculateCommissionCost(commission, tradeSize, trades);
        const slippageCost = calculator.calculateSlippageCost(slippage, pipValue, tradeSize, trades);
        const totalCost = calculator.calculateTotalCost(spreadCost, commissionCost, slippageCost);

        expect(spreadCost).toBe(200); // 0.1 * 10 * 1 * 200
        expect(commissionCost).toBe(1400); // 7 * 1 * 200
        expect(slippageCost).toBe(600); // 0.3 * 10 * 1 * 200
        expect(totalCost).toBe(2200);
    });

    test('should calculate costs for swing trading scenario', () => {
        // Swing trading: wider spreads acceptable, lower frequency, minimal slippage
        const spread = 1.5; // 1.5 pip spread
        const commission = 0; // No commission
        const slippage = 0.1; // 0.1 pip slippage
        const pipValue = 10; // $10 per pip
        const tradeSize = 2; // 2 lots
        const trades = 20; // 20 trades per month

        const spreadCost = calculator.calculateSpreadCost(spread, pipValue, tradeSize, trades);
        const commissionCost = calculator.calculateCommissionCost(commission, tradeSize, trades);
        const slippageCost = calculator.calculateSlippageCost(slippage, pipValue, tradeSize, trades);
        const totalCost = calculator.calculateTotalCost(spreadCost, commissionCost, slippageCost);

        expect(spreadCost).toBe(600); // 1.5 * 10 * 2 * 20
        expect(commissionCost).toBe(0); // 0 * 2 * 20
        expect(slippageCost).toBe(40); // 0.1 * 10 * 2 * 20
        expect(totalCost).toBe(640);
    });

    // Test edge cases
    test('should handle very large numbers', () => {
        const result = calculator.calculateSpreadCost(10, 100, 100, 1000);
        expect(result).toBe(10000000); // 10 * 100 * 100 * 1000
    });

    test('should handle very small numbers', () => {
        const result = calculator.calculateSpreadCost(0.01, 0.1, 0.01, 1);
        expect(result).toBe(0.00001); // 0.01 * 0.1 * 0.01 * 1
    });

    // Test parameter validation (if applicable)
    test('should handle negative inputs gracefully', () => {
        // Negative inputs don't make sense in real trading but should not break calculation
        const result = calculator.calculateSpreadCost(-1, 10, 1, 100);
        expect(result).toBe(-1000); // Mathematical result, even if not realistic
    });
});

// Test strategy-specific calculations
describe('Strategy-Specific Cost Analysis', () => {
    test('should show scalping is more expensive with commission brokers', () => {
        const scenarios = [
            { strategy: 'scalping', spread: 0.1, commission: 7, trades: 200 },
            { strategy: 'swing', spread: 1.5, commission: 0, trades: 20 }
        ];

        const calculator = window.TradingCostCalculator || {
            calculateSpreadCost: (spread, pipValue, tradeSize, trades) => spread * pipValue * tradeSize * trades,
            calculateCommissionCost: (commission, tradeSize, trades) => commission * tradeSize * trades,
            calculateSlippageCost: (slippage, pipValue, tradeSize, trades) => slippage * pipValue * tradeSize * trades,
            calculateTotalCost: (spreadCost, commissionCost, slippageCost) => spreadCost + commissionCost + slippageCost
        };

        const pipValue = 10;
        const tradeSize = 1;
        const slippage = 0.2;

        scenarios.forEach(scenario => {
            const spreadCost = calculator.calculateSpreadCost(scenario.spread, pipValue, tradeSize, scenario.trades);
            const commissionCost = calculator.calculateCommissionCost(scenario.commission, tradeSize, scenario.trades);
            const slippageCost = calculator.calculateSlippageCost(slippage, pipValue, tradeSize, scenario.trades);
            const totalCost = calculator.calculateTotalCost(spreadCost, commissionCost, slippageCost);

            if (scenario.strategy === 'scalping') {
                // High commission cost due to high frequency
                expect(commissionCost).toBe(1400);
                expect(totalCost).toBeGreaterThan(1000);
            } else {
                // No commission but higher spread cost per pip
                expect(commissionCost).toBe(0);
                expect(spreadCost).toBe(300);
            }
        });
    });
});

// Mock Jest functions for browser environment
if (typeof window !== 'undefined' && typeof expect === 'undefined') {
    window.describe = function(name, fn) {
        console.log('Testing:', name);
        fn();
    };
    
    window.test = function(name, fn) {
        console.log(' - Test:', name);
        try {
            fn();
            console.log('   ✓ Passed');
        } catch (error) {
            console.error('   ✗ Failed:', error.message);
        }
    };
    
    window.expect = function(actual) {
        return {
            toBe: function(expected) {
                if (actual !== expected) {
                    throw new Error(`Expected ${expected}, got ${actual}`);
                }
            },
            toBeGreaterThan: function(expected) {
                if (actual <= expected) {
                    throw new Error(`Expected ${actual} to be greater than ${expected}`);
                }
            }
        };
    };
    
    window.beforeEach = function(fn) {
        fn();
    };
}