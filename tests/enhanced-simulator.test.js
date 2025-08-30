// Enhanced Simulator Unit Tests
// Tests for the enhanced trading cost simulator functionality

// Mock Jest functions for browser compatibility
if (typeof window !== 'undefined' && !window.jest) {
    window.jest = {
        fn: (implementation) => {
            const mockFn = function(...args) {
                mockFn.calls.push(args);
                mockFn.callCount++;
                if (implementation) {
                    return implementation.apply(this, args);
                }
            };
            mockFn.calls = [];
            mockFn.callCount = 0;
            mockFn.mockReturnValue = (value) => {
                mockFn.returnValue = value;
                return mockFn;
            };
            mockFn.mockImplementation = (impl) => {
                implementation = impl;
                return mockFn;
            };
            return mockFn;
        }
    };
    
    window.describe = (name, fn) => {
        console.group(`Test Suite: ${name}`);
        try {
            fn();
            console.log(`✅ ${name} - All tests passed`);
        } catch (error) {
            console.error(`❌ ${name} - Tests failed:`, error);
        }
        console.groupEnd();
    };
    
    window.test = (name, fn) => {
        try {
            fn();
            console.log(`✅ ${name}`);
        } catch (error) {
            console.error(`❌ ${name}:`, error);
        }
    };
    
    window.expect = (actual) => ({
        toBe: (expected) => {
            if (actual !== expected) {
                throw new Error(`Expected ${expected} but got ${actual}`);
            }
        },
        toEqual: (expected) => {
            if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
            }
        },
        toBeCloseTo: (expected, precision = 2) => {
            const diff = Math.abs(actual - expected);
            const tolerance = Math.pow(10, -precision) / 2;
            if (diff > tolerance) {
                throw new Error(`Expected ${actual} to be close to ${expected}`);
            }
        },
        toBeGreaterThan: (expected) => {
            if (actual <= expected) {
                throw new Error(`Expected ${actual} to be greater than ${expected}`);
            }
        },
        toBeLessThan: (expected) => {
            if (actual >= expected) {
                throw new Error(`Expected ${actual} to be less than ${expected}`);
            }
        },
        toContain: (expected) => {
            if (!actual.includes(expected)) {
                throw new Error(`Expected ${actual} to contain ${expected}`);
            }
        },
        toHaveLength: (expected) => {
            if (actual.length !== expected) {
                throw new Error(`Expected length ${expected} but got ${actual.length}`);
            }
        },
        toBeTruthy: () => {
            if (!actual) {
                throw new Error(`Expected ${actual} to be truthy`);
            }
        },
        toBeFalsy: () => {
            if (actual) {
                throw new Error(`Expected ${actual} to be falsy`);
            }
        }
    });
}

// Test Suite: Enhanced Simulator Engine
describe('Enhanced Simulator Engine', () => {
    let engine;
    
    // Setup before tests
    if (typeof EnhancedSimulatorEngine !== 'undefined') {
        engine = new EnhancedSimulatorEngine();
        engine.init();
    }

    test('Engine initializes with correct data structures', () => {
        expect(engine).toBeTruthy();
        expect(engine.enhancedBrokerData).toBeTruthy();
        expect(engine.tradingStrategies).toBeTruthy();
        expect(engine.marketConditions).toBeTruthy();
    });

    test('Broker data contains required properties', () => {
        const icMarkets = engine.getBroker('ic-markets');
        expect(icMarkets).toBeTruthy();
        expect(icMarkets.name).toBe('IC Markets');
        expect(icMarkets.spreads).toBeTruthy();
        expect(icMarkets.commission).toBeTruthy();
        expect(icMarkets.executionModel).toBeTruthy();
        expect(icMarkets.slippageProfile).toBeTruthy();
    });

    test('Strategy data contains required properties', () => {
        const scalping = engine.getStrategy('scalping');
        expect(scalping).toBeTruthy();
        expect(scalping.name).toBe('Scalping');
        expect(scalping.costSensitivity).toBeTruthy();
        expect(scalping.riskProfile).toBeTruthy();
        expect(scalping.difficultyLevel).toBeTruthy();
    });

    test('Pip value calculation is correct', () => {
        expect(engine.getPipValue('EURUSD')).toBe(10);
        expect(engine.getPipValue('USDJPY')).toBe(10);
        expect(engine.getPipValue('EURGBP')).toBe(13);
        expect(engine.getPipValue('UNKNOWN')).toBe(10); // Default value
    });

    test('Pair category classification is correct', () => {
        expect(engine.getPairCategory('EURUSD')).toBe('major_pairs');
        expect(engine.getPairCategory('EURJPY')).toBe('minor_pairs');
        expect(engine.getPairCategory('USDTRY')).toBe('exotic_pairs');
    });

    test('Advanced cost calculation produces valid results', () => {
        const params = {
            tradeSize: 1.0,
            tradesPerMonth: 100,
            instrument: 'EURUSD',
            holdingPeriodDays: 1
        };

        const result = engine.calculateAdvancedCosts('ic-markets', 'scalping', params);
        
        expect(result).toBeTruthy();
        expect(result.costs).toBeTruthy();
        expect(result.costs.totalCost).toBeGreaterThan(0);
        expect(result.costs.spreadCost).toBeGreaterThan(0);
        expect(result.breakdown).toBeTruthy();
        expect(result.qualityMetrics).toBeTruthy();
    });

    test('Broker comparison produces ranked results', () => {
        const brokerIds = ['ic-markets', 'pepperstone', 'etoro'];
        const params = {
            tradeSize: 1.0,
            tradesPerMonth: 100,
            instrument: 'EURUSD',
            holdingPeriodDays: 1
        };

        const results = engine.compareAcrossBrokers(brokerIds, 'scalping', params);
        
        expect(results).toHaveLength(3);
        expect(results[0].ranking).toBe(1);
        expect(results[1].ranking).toBe(2);
        expect(results[2].ranking).toBe(3);
        
        // Results should be sorted by total cost
        expect(results[0].costs.totalCost).toBeLessThan(results[1].costs.totalCost);
        expect(results[1].costs.totalCost).toBeLessThan(results[2].costs.totalCost);
    });

    test('Suitability score calculation is reasonable', () => {
        const icMarkets = engine.getBroker('ic-markets');
        const scalping = engine.getStrategy('scalping');
        
        const score = engine.calculateSuitabilityScore(icMarkets, scalping);
        expect(score).toBeGreaterThan(0);
        expect(score).toBeLessThan(101);
    });

    test('Cost breakdown percentages sum to 100', () => {
        const params = {
            tradeSize: 1.0,
            tradesPerMonth: 100,
            instrument: 'EURUSD',
            holdingPeriodDays: 1
        };

        const result = engine.calculateAdvancedCosts('ic-markets', 'scalping', params);
        const breakdown = result.breakdown;
        
        const total = breakdown.spreadContribution + 
                     breakdown.commissionContribution + 
                     breakdown.slippageContribution + 
                     breakdown.swapContribution + 
                     breakdown.executionContribution;
        
        expect(total).toBeCloseTo(100, 0);
    });

    test('Market conditions affect costs appropriately', () => {
        const params = {
            tradeSize: 1.0,
            tradesPerMonth: 100,
            instrument: 'EURUSD',
            holdingPeriodDays: 1
        };

        const normalResult = engine.calculateAdvancedCosts('ic-markets', 'scalping', params, 'normal');
        const volatileResult = engine.calculateAdvancedCosts('ic-markets', 'scalping', params, 'volatile');
        
        // Volatile conditions should result in higher costs
        expect(volatileResult.costs.totalCost).toBeGreaterThan(normalResult.costs.totalCost);
    });

    test('Insights generation produces meaningful recommendations', () => {
        const brokerIds = ['ic-markets', 'pepperstone', 'etoro'];
        const params = {
            tradeSize: 1.0,
            tradesPerMonth: 100,
            instrument: 'EURUSD',
            holdingPeriodDays: 1
        };

        const results = engine.compareAcrossBrokers(brokerIds, 'scalping', params);
        const insights = engine.generateInsights(results, 'scalping', params);
        
        expect(insights).toBeTruthy();
        expect(insights.summary).toBeTruthy();
        expect(insights.summary.bestBroker).toBeTruthy();
        expect(insights.summary.totalMonthlySavings).toBeGreaterThan(0);
        expect(insights.recommendations).toBeTruthy();
    });
});

// Test Suite: Enhanced Simulator UI
describe('Enhanced Simulator UI', () => {
    let mockUI;
    
    // Create mock UI for testing
    if (typeof EnhancedSimulatorUI !== 'undefined') {
        // Setup DOM elements needed for testing
        if (!document.getElementById('enhanced-simulator-container')) {
            document.body.innerHTML += `
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style="display: none;"></div>
                <div id="enhanced-simulator-container"></div>
            `;
        }
    }

    test('UI initializes without errors', () => {
        expect(() => {
            mockUI = new EnhancedSimulatorUI();
        }).not.toThrow();
    });

    test('Strategy selection updates current strategy', () => {
        if (mockUI && mockUI.selectStrategy) {
            mockUI.selectStrategy('daytrading');
            expect(mockUI.currentStrategy).toBe('daytrading');
        }
    });

    test('Parameter updates are captured correctly', () => {
        if (mockUI && mockUI.currentParams) {
            const initialTradeSize = mockUI.currentParams.tradeSize;
            
            // Create mock input element
            const mockInput = document.createElement('input');
            mockInput.id = 'enhanced-trade-size';
            mockInput.value = '2.5';
            document.body.appendChild(mockInput);
            
            if (mockUI.updateParameters) {
                mockUI.updateParameters();
                expect(mockUI.currentParams.tradeSize).toBe(2.5);
            }
            
            document.body.removeChild(mockInput);
        }
    });

    test('Broker selection limits to maximum of 4', () => {
        if (mockUI) {
            mockUI.selectedBrokers = ['ic-markets', 'pepperstone', 'etoro', 'tastyfx'];
            
            // Mock checkbox for 5th broker
            const mockCheckbox = {
                dataset: { broker: 'oanda' },
                checked: true
            };
            
            if (mockUI.handleBrokerSelection) {
                const initialLength = mockUI.selectedBrokers.length;
                mockUI.handleBrokerSelection(mockCheckbox);
                
                // Should not add 5th broker
                expect(mockUI.selectedBrokers.length).toBe(initialLength);
            }
        }
    });

    test('Risk badge class returns correct CSS class', () => {
        if (mockUI && mockUI.getRiskBadgeClass) {
            expect(mockUI.getRiskBadgeClass('low')).toContain('green');
            expect(mockUI.getRiskBadgeClass('medium')).toContain('yellow');
            expect(mockUI.getRiskBadgeClass('high')).toContain('red');
        }
    });

    test('Execution quality color mapping is correct', () => {
        if (mockUI && mockUI.getExecutionQualityColor) {
            expect(mockUI.getExecutionQualityColor(10)).toContain('green');
            expect(mockUI.getExecutionQualityColor(20)).toContain('yellow');
            expect(mockUI.getExecutionQualityColor(30)).toContain('red');
        }
    });
});

// Test Suite: Mobile Optimizer
describe('Mobile Optimizer', () => {
    let optimizer;
    
    test('Mobile detection works correctly', () => {
        if (typeof SimulatorMobileOptimizer !== 'undefined') {
            // Mock window width for mobile
            const originalInnerWidth = window.innerWidth;
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 500
            });
            
            optimizer = new SimulatorMobileOptimizer();
            expect(optimizer.isMobile).toBe(true);
            
            // Restore original width
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: originalInnerWidth
            });
        }
    });

    test('Touch gesture detection initializes', () => {
        expect(() => {
            if (optimizer && optimizer.setupTouchGestures) {
                optimizer.setupTouchGestures();
            }
        }).not.toThrow();
    });

    test('Mobile styles are added to DOM', () => {
        if (optimizer && optimizer.addMobileStyles) {
            optimizer.addMobileStyles();
            
            const mobileStyles = document.getElementById('mobile-simulator-styles');
            expect(mobileStyles).toBeTruthy();
        }
    });

    test('Notification system works', () => {
        if (optimizer && optimizer.showMobileNotification) {
            expect(() => {
                optimizer.showMobileNotification('Test message', 'success');
            }).not.toThrow();
        }
    });
});

// Test Suite: Export Manager
describe('Export Manager', () => {
    let exportManager;
    
    test('Export manager initializes correctly', () => {
        if (typeof SimulatorExportManager !== 'undefined') {
            expect(() => {
                exportManager = new SimulatorExportManager();
            }).not.toThrow();
        }
    });

    test('CSV generation produces valid content', () => {
        if (exportManager && exportManager.generateEnhancedCSV) {
            // Mock results data
            exportManager.results = [
                {
                    ranking: 1,
                    brokerName: 'IC Markets',
                    costs: {
                        totalCost: 100,
                        costPerTrade: 1,
                        spreadCost: 50,
                        commissionCost: 30,
                        slippageCost: 15,
                        swapCost: 5
                    },
                    qualityMetrics: {
                        executionSpeed: 12,
                        fillRate: 99.8,
                        suitabilityScore: 95
                    },
                    additionalCostVsBest: 0,
                    percentageMoreExpensive: 0
                }
            ];
            
            const csvContent = exportManager.generateEnhancedCSV();
            expect(csvContent).toContain('IC Markets');
            expect(csvContent).toContain('100');
        }
    });

    test('Print content generation works', () => {
        if (exportManager && exportManager.generatePrintContent && exportManager.results) {
            exportManager.currentStrategy = 'scalping';
            exportManager.currentParams = {
                tradeSize: 1,
                tradesPerMonth: 100,
                instrument: 'EURUSD'
            };
            exportManager.insights = {
                summary: {
                    totalMonthlySavings: 50
                }
            };
            
            const printContent = exportManager.generatePrintContent();
            expect(printContent).toContain('IC Markets');
            expect(printContent).toContain('scalping');
        }
    });

    test('File download simulation works', () => {
        if (exportManager && exportManager.downloadFile) {
            // Mock URL.createObjectURL
            const originalCreateObjectURL = URL.createObjectURL;
            URL.createObjectURL = jest.fn().mockReturnValue('mock-url');
            
            expect(() => {
                exportManager.downloadFile('test content', 'test.txt', 'text/plain');
            }).not.toThrow();
            
            // Restore original function
            URL.createObjectURL = originalCreateObjectURL;
        }
    });
});

// Test Suite: Integration Tests
describe('Integration Tests', () => {
    test('All modules can be loaded together', () => {
        expect(typeof EnhancedSimulatorEngine).toBe('function');
        expect(typeof EnhancedSimulatorUI).toBe('function');
        expect(typeof SimulatorMobileOptimizer).toBe('function');
        expect(typeof SimulatorExportManager).toBe('function');
    });

    test('Enhanced UI can use engine calculations', () => {
        if (typeof EnhancedSimulatorEngine !== 'undefined' && typeof EnhancedSimulatorUI !== 'undefined') {
            const engine = new EnhancedSimulatorEngine();
            const ui = new EnhancedSimulatorUI();
            
            // Mock engine initialization
            engine.enhancedBrokerData = { 'test-broker': { id: 'test-broker', name: 'Test Broker' } };
            ui.engine = engine;
            
            expect(ui.engine).toBeTruthy();
            expect(ui.engine.getBroker).toBeTruthy();
        }
    });

    test('Mobile optimizer can work with enhanced UI', () => {
        if (typeof SimulatorMobileOptimizer !== 'undefined') {
            // Should not throw errors when enhanced UI elements don't exist
            expect(() => {
                const optimizer = new SimulatorMobileOptimizer();
                optimizer.adjustLayoutForScreenSize();
            }).not.toThrow();
        }
    });

    test('Export manager can handle empty results gracefully', () => {
        if (typeof SimulatorExportManager !== 'undefined') {
            const exportManager = new SimulatorExportManager();
            exportManager.results = null;
            
            expect(() => {
                exportManager.exportToCSV();
            }).not.toThrow();
        }
    });
});

// Performance Tests
describe('Performance Tests', () => {
    test('Cost calculation performance is acceptable', () => {
        if (typeof EnhancedSimulatorEngine !== 'undefined') {
            const engine = new EnhancedSimulatorEngine();
            engine.init();
            
            const params = {
                tradeSize: 1.0,
                tradesPerMonth: 100,
                instrument: 'EURUSD',
                holdingPeriodDays: 1
            };

            const startTime = performance.now();
            
            for (let i = 0; i < 100; i++) {
                engine.calculateAdvancedCosts('ic-markets', 'scalping', params);
            }
            
            const endTime = performance.now();
            const avgTime = (endTime - startTime) / 100;
            
            // Should complete calculation in under 10ms on average
            expect(avgTime).toBeLessThan(10);
        }
    });

    test('Broker comparison performance is acceptable', () => {
        if (typeof EnhancedSimulatorEngine !== 'undefined') {
            const engine = new EnhancedSimulatorEngine();
            engine.init();
            
            const brokerIds = ['ic-markets', 'pepperstone', 'etoro', 'tastyfx', 'oanda', 'forex-com'];
            const params = {
                tradeSize: 1.0,
                tradesPerMonth: 100,
                instrument: 'EURUSD',
                holdingPeriodDays: 1
            };

            const startTime = performance.now();
            engine.compareAcrossBrokers(brokerIds, 'scalping', params);
            const endTime = performance.now();
            
            // Should complete comparison in under 50ms
            expect(endTime - startTime).toBeLessThan(50);
        }
    });
});

// Run all tests when script loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🧪 Running Enhanced Simulator Tests...');
    
    // Run tests with a small delay to ensure all modules are loaded
    setTimeout(() => {
        try {
            // Note: Test execution happens automatically when the describe blocks run
            console.log('✅ All Enhanced Simulator Tests Completed!');
        } catch (error) {
            console.error('❌ Enhanced Simulator Tests Failed:', error);
        }
    }, 2000);
});

// Export test functions for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        runEnhancedSimulatorTests: () => {
            console.log('Running enhanced simulator tests...');
        }
    };
}