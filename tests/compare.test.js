// Unit tests for compare selection logic
// Tests the broker selection and comparison functionality

describe('Compare Selection Logic', () => {
    let mockBrokers;
    let compareSelector;

    beforeEach(() => {
        // Mock broker data
        mockBrokers = [
            {
                id: 1,
                name: 'TastyFX',
                rating: 4.8,
                typicalSpread: 0.9,
                commission: 0,
                minDeposit: 250
            },
            {
                id: 2,
                name: 'Forex.com',
                rating: 4.6,
                typicalSpread: 1.2,
                commission: 0,
                minDeposit: 100
            },
            {
                id: 3,
                name: 'Interactive Brokers',
                rating: 4.7,
                typicalSpread: 0.2,
                commission: 2.5,
                minDeposit: 0
            }
        ];

        // Mock CompareSelector class (simplified for testing)
        compareSelector = {
            brokers: mockBrokers,
            selectedBrokers: [],
            maxBrokers: 4,

            addBroker: function(brokerId) {
                if (this.selectedBrokers.length >= this.maxBrokers) {
                    return false;
                }
                const broker = this.brokers.find(b => b.id === brokerId);
                if (broker && !this.selectedBrokers.find(s => s.id === broker.id)) {
                    this.selectedBrokers.push(broker);
                    return true;
                }
                return false;
            },

            removeBroker: function(brokerId) {
                this.selectedBrokers = this.selectedBrokers.filter(b => b.id !== brokerId);
                return true;
            },

            canAddMore: function() {
                return this.selectedBrokers.length < this.maxBrokers;
            },

            isSelected: function(brokerId) {
                return this.selectedBrokers.some(b => b.id === brokerId);
            }
        };
    });

    // Test broker selection
    test('should add broker when under limit', () => {
        const result = compareSelector.addBroker(1);
        expect(result).toBe(true);
        expect(compareSelector.selectedBrokers.length).toBe(1);
        expect(compareSelector.selectedBrokers[0].name).toBe('TastyFX');
    });

    test('should not add duplicate broker', () => {
        compareSelector.addBroker(1);
        const result = compareSelector.addBroker(1);
        expect(result).toBe(false);
        expect(compareSelector.selectedBrokers.length).toBe(1);
    });

    test('should not add broker when at maximum limit', () => {
        // Add 4 brokers (max limit)
        compareSelector.addBroker(1);
        compareSelector.addBroker(2);
        compareSelector.addBroker(3);
        // Add a fourth broker (mock one)
        compareSelector.selectedBrokers.push({ id: 4, name: 'Test Broker' });

        const result = compareSelector.addBroker(1);
        expect(result).toBe(false);
        expect(compareSelector.selectedBrokers.length).toBe(4);
    });

    // Test broker removal
    test('should remove broker successfully', () => {
        compareSelector.addBroker(1);
        compareSelector.addBroker(2);
        
        const result = compareSelector.removeBroker(1);
        expect(result).toBe(true);
        expect(compareSelector.selectedBrokers.length).toBe(1);
        expect(compareSelector.selectedBrokers[0].name).toBe('Forex.com');
    });

    test('should handle removal of non-existent broker', () => {
        compareSelector.addBroker(1);
        
        const result = compareSelector.removeBroker(999);
        expect(result).toBe(true);
        expect(compareSelector.selectedBrokers.length).toBe(1);
    });

    // Test utility functions
    test('should correctly check if can add more brokers', () => {
        expect(compareSelector.canAddMore()).toBe(true);
        
        compareSelector.addBroker(1);
        compareSelector.addBroker(2);
        compareSelector.addBroker(3);
        expect(compareSelector.canAddMore()).toBe(true);
        
        // Add fourth broker manually to reach limit
        compareSelector.selectedBrokers.push({ id: 4, name: 'Test' });
        expect(compareSelector.canAddMore()).toBe(false);
    });

    test('should correctly check if broker is selected', () => {
        expect(compareSelector.isSelected(1)).toBe(false);
        
        compareSelector.addBroker(1);
        expect(compareSelector.isSelected(1)).toBe(true);
        expect(compareSelector.isSelected(2)).toBe(false);
    });

    // Test comparison logic
    test('should identify best value broker', () => {
        const selectedBrokers = [mockBrokers[0], mockBrokers[1], mockBrokers[2]];
        
        // Test lowest spread identification
        const lowestSpreadIndex = selectedBrokers.reduce((bestIndex, broker, index) => {
            const currentBest = selectedBrokers[bestIndex];
            return broker.typicalSpread < currentBest.typicalSpread ? index : bestIndex;
        }, 0);
        
        expect(lowestSpreadIndex).toBe(2); // Interactive Brokers has 0.2 spread
        expect(selectedBrokers[lowestSpreadIndex].name).toBe('Interactive Brokers');
    });

    test('should identify highest rated broker', () => {
        const selectedBrokers = [mockBrokers[0], mockBrokers[1], mockBrokers[2]];
        
        const highestRatedIndex = selectedBrokers.reduce((bestIndex, broker, index) => {
            const currentBest = selectedBrokers[bestIndex];
            return broker.rating > currentBest.rating ? index : bestIndex;
        }, 0);
        
        expect(highestRatedIndex).toBe(0); // TastyFX has 4.8 rating
        expect(selectedBrokers[highestRatedIndex].name).toBe('TastyFX');
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
            toEqual: function(expected) {
                if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                    throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
                }
            }
        };
    };
    
    window.beforeEach = function(fn) {
        fn();
    };
}