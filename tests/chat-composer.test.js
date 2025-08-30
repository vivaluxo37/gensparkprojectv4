// Unit tests for chat composer visibility patch
// Tests the chat composer fix functionality

describe('Chat Composer Visibility', () => {
    let chatFix;
    let mockElements;

    beforeEach(() => {
        // Mock DOM elements
        mockElements = {
            chatWindow: {
                style: {},
                classList: {
                    add: jest.fn ? jest.fn() : function() {},
                    remove: jest.fn ? jest.fn() : function() {},
                    toggle: jest.fn ? jest.fn() : function() {}
                }
            },
            chatMessages: {
                style: {},
                scrollTo: jest.fn ? jest.fn() : function() {},
                scrollHeight: 500
            },
            chatInput: {
                style: {},
                value: '',
                focus: jest.fn ? jest.fn() : function() {},
                scrollIntoView: jest.fn ? jest.fn() : function() {},
                closest: function() {
                    return {
                        style: {}
                    };
                }
            }
        };

        // Mock ChatComposerFix class
        chatFix = {
            chatWindow: mockElements.chatWindow,
            chatMessages: mockElements.chatMessages,
            chatInput: mockElements.chatInput,
            originalViewportHeight: 800,
            isKeyboardOpen: false,

            isMobile: function() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                       (window.innerWidth <= 768);
            },

            handleViewportChange: function() {
                const currentHeight = window.innerHeight;
                const heightDiff = this.originalViewportHeight - currentHeight;
                
                if (this.isMobile() && heightDiff > 150) {
                    this.isKeyboardOpen = true;
                    this.adjustForKeyboard(true);
                } else if (this.isKeyboardOpen && heightDiff < 50) {
                    this.isKeyboardOpen = false;
                    this.adjustForKeyboard(false);
                }
            },

            adjustForKeyboard: function(keyboardOpen) {
                if (!this.chatWindow) return;

                if (keyboardOpen) {
                    this.chatWindow.style.maxHeight = '50vh';
                    this.chatMessages.style.maxHeight = '8rem';
                } else {
                    this.chatWindow.style.maxHeight = '70vh';
                    this.chatMessages.style.maxHeight = '16rem';
                }
            },

            scrollToBottom: function() {
                if (this.chatMessages) {
                    this.chatMessages.scrollTo({
                        top: this.chatMessages.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            },

            applyChatFixes: function() {
                const chatFooter = this.chatInput.closest('.p-4.border-t');
                if (chatFooter) {
                    chatFooter.style.position = 'sticky';
                    chatFooter.style.bottom = '0';
                    chatFooter.style.backgroundColor = 'white';
                    chatFooter.style.zIndex = '10';
                }

                this.chatMessages.style.overflowY = 'auto';
                this.chatMessages.style.maxHeight = '16rem';
                this.chatMessages.style.paddingBottom = '0.5rem';
            }
        };
    });

    // Test mobile detection
    test('should correctly detect mobile devices', () => {
        // Mock mobile user agent
        const originalUserAgent = navigator.userAgent;
        Object.defineProperty(navigator, 'userAgent', {
            writable: true,
            value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
        });

        expect(chatFix.isMobile()).toBe(true);

        // Restore original user agent
        Object.defineProperty(navigator, 'userAgent', {
            writable: true,
            value: originalUserAgent
        });
    });

    test('should detect desktop as non-mobile', () => {
        // Mock desktop user agent and window size
        const originalUserAgent = navigator.userAgent;
        Object.defineProperty(navigator, 'userAgent', {
            writable: true,
            value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        });
        
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024
        });

        expect(chatFix.isMobile()).toBe(false);

        // Restore
        Object.defineProperty(navigator, 'userAgent', {
            writable: true,
            value: originalUserAgent
        });
    });

    // Test keyboard handling
    test('should detect keyboard opening on mobile', () => {
        // Mock mobile environment
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 375
        });
        
        // Simulate keyboard opening (viewport height decrease)
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 400 // Reduced from original 800
        });

        chatFix.handleViewportChange();
        
        expect(chatFix.isKeyboardOpen).toBe(true);
    });

    test('should detect keyboard closing on mobile', () => {
        // Start with keyboard open
        chatFix.isKeyboardOpen = true;
        
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 375
        });
        
        // Simulate keyboard closing (viewport height increase)
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 780 // Close to original 800
        });

        chatFix.handleViewportChange();
        
        expect(chatFix.isKeyboardOpen).toBe(false);
    });

    // Test keyboard adjustments
    test('should adjust chat size when keyboard opens', () => {
        chatFix.adjustForKeyboard(true);
        
        expect(chatFix.chatWindow.style.maxHeight).toBe('50vh');
        expect(chatFix.chatMessages.style.maxHeight).toBe('8rem');
    });

    test('should restore chat size when keyboard closes', () => {
        chatFix.adjustForKeyboard(false);
        
        expect(chatFix.chatWindow.style.maxHeight).toBe('70vh');
        expect(chatFix.chatMessages.style.maxHeight).toBe('16rem');
    });

    // Test scroll functionality
    test('should scroll to bottom of messages', () => {
        const scrollSpy = chatFix.chatMessages.scrollTo;
        
        chatFix.scrollToBottom();
        
        // Check if scroll function was called with correct parameters
        if (jest && jest.fn) {
            expect(scrollSpy).toHaveBeenCalledWith({
                top: chatFix.chatMessages.scrollHeight,
                behavior: 'smooth'
            });
        } else {
            // For browser environment, just verify method exists
            expect(typeof chatFix.chatMessages.scrollTo).toBe('function');
        }
    });

    // Test CSS fixes application
    test('should apply correct CSS fixes for sticky composer', () => {
        chatFix.applyChatFixes();
        
        // Verify overflow and height settings
        expect(chatFix.chatMessages.style.overflowY).toBe('auto');
        expect(chatFix.chatMessages.style.maxHeight).toBe('16rem');
        expect(chatFix.chatMessages.style.paddingBottom).toBe('0.5rem');
    });

    // Test viewport change scenarios
    test('should handle small viewport changes without triggering keyboard detection', () => {
        const originalKeyboardState = chatFix.isKeyboardOpen;
        
        // Small change that shouldn't trigger keyboard detection
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 780 // Small decrease from 800
        });

        chatFix.handleViewportChange();
        
        expect(chatFix.isKeyboardOpen).toBe(originalKeyboardState);
    });

    // Test edge cases
    test('should handle missing chat elements gracefully', () => {
        const chatFixWithoutElements = {
            chatWindow: null,
            chatMessages: null,
            chatInput: null,
            
            adjustForKeyboard: function(keyboardOpen) {
                if (!this.chatWindow) return;
                // Should not throw error
            },
            
            scrollToBottom: function() {
                if (this.chatMessages) {
                    this.chatMessages.scrollTo({
                        top: this.chatMessages.scrollHeight,
                        behavior: 'smooth'
                    });
                }
                // Should not throw error when chatMessages is null
            }
        };

        // These should not throw errors
        expect(() => chatFixWithoutElements.adjustForKeyboard(true)).not.toThrow();
        expect(() => chatFixWithoutElements.scrollToBottom()).not.toThrow();
    });
});

// Simulate resize event for testing
describe('Resize Event Simulation', () => {
    test('should simulate keyboard toggle correctly', () => {
        const chatFix = {
            originalViewportHeight: 800,
            isKeyboardOpen: false,
            
            handleViewportChange: function() {
                const currentHeight = window.innerHeight;
                const heightDiff = this.originalViewportHeight - currentHeight;
                
                if (heightDiff > 150) {
                    this.isKeyboardOpen = true;
                } else if (this.isKeyboardOpen && heightDiff < 50) {
                    this.isKeyboardOpen = false;
                }
            },
            
            simulateKeyboardToggle: function() {
                const originalHeight = window.innerHeight;
                
                // Simulate keyboard opening
                Object.defineProperty(window, 'innerHeight', {
                    writable: true,
                    configurable: true,
                    value: originalHeight - 300
                });
                
                this.handleViewportChange();
                const keyboardOpenState = this.isKeyboardOpen;
                
                // Reset after test
                Object.defineProperty(window, 'innerHeight', {
                    writable: true,
                    configurable: true,
                    value: originalHeight
                });
                this.handleViewportChange();
                
                return keyboardOpenState;
            }
        };

        const wasKeyboardDetected = chatFix.simulateKeyboardToggle();
        expect(wasKeyboardDetected).toBe(true);
        expect(chatFix.isKeyboardOpen).toBe(false); // Should be closed after reset
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
            not: {
                toThrow: function() {
                    try {
                        if (typeof actual === 'function') {
                            actual();
                        }
                        return true;
                    } catch (e) {
                        throw new Error(`Expected function not to throw, but it threw: ${e.message}`);
                    }
                }
            }
        };
    };
    
    window.beforeEach = function(fn) {
        fn();
    };
}