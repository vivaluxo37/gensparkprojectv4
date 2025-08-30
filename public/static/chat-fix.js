// PATCH: Chat composer visibility fixes
// Ensures chat composer never disappears and handles mobile keyboard resize events

class ChatComposerFix {
    constructor() {
        this.chatWindow = null;
        this.chatMessages = null;
        this.chatInput = null;
        this.originalViewportHeight = window.innerHeight;
        this.isKeyboardOpen = false;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupChatFixes());
        } else {
            this.setupChatFixes();
        }
    }

    setupChatFixes() {
        this.chatWindow = document.getElementById('chatbot-window');
        this.chatMessages = document.getElementById('chatbot-messages');
        this.chatInput = document.getElementById('chatbot-input');

        if (!this.chatWindow || !this.chatMessages || !this.chatInput) {
            // Elements not found, retry after a short delay
            setTimeout(() => this.setupChatFixes(), 500);
            return;
        }

        this.applyChatFixes();
        this.setupEventListeners();
    }

    applyChatFixes() {
        // Make composer sticky to bottom
        const chatFooter = this.chatInput.closest('.p-4.border-t');
        if (chatFooter) {
            chatFooter.style.position = 'sticky';
            chatFooter.style.bottom = '0';
            chatFooter.style.backgroundColor = 'white';
            chatFooter.style.zIndex = '10';
        }

        // Ensure messages container has proper scrolling
        this.chatMessages.style.overflowY = 'auto';
        this.chatMessages.style.maxHeight = '16rem'; // h-64 equivalent
        this.chatMessages.style.paddingBottom = '0.5rem';

        // Improve mobile experience
        if (this.isMobile()) {
            this.setupMobileFixes();
        }
    }

    setupMobileFixes() {
        // Adjust chat window for mobile
        if (this.chatWindow) {
            this.chatWindow.style.position = 'fixed';
            this.chatWindow.style.bottom = '5rem';
            this.chatWindow.style.right = '1rem';
            this.chatWindow.style.maxHeight = '70vh';
            this.chatWindow.style.width = 'calc(100vw - 2rem)';
            this.chatWindow.style.maxWidth = '20rem';
        }

        // Make input area more touch-friendly
        if (this.chatInput) {
            this.chatInput.style.fontSize = '16px'; // Prevents zoom on iOS
            this.chatInput.style.minHeight = '44px'; // Better touch target
        }
    }

    setupEventListeners() {
        // Handle viewport resize (mobile keyboard)
        window.addEventListener('resize', () => this.handleViewportChange());
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleViewportChange(), 500);
        });

        // Auto-scroll to bottom when new messages are added
        this.observeMessageChanges();

        // Handle focus/blur for better UX
        if (this.chatInput) {
            this.chatInput.addEventListener('focus', () => this.handleInputFocus());
            this.chatInput.addEventListener('blur', () => this.handleInputBlur());
        }

        // Prevent form submission from breaking focus
        const chatSend = document.getElementById('chatbot-send');
        if (chatSend) {
            chatSend.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSendMessage();
            });
        }

        // Handle Enter key
        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSendMessage();
                }
            });
        }
    }

    handleViewportChange() {
        const currentHeight = window.innerHeight;
        const heightDiff = this.originalViewportHeight - currentHeight;
        
        // Detect if keyboard is open (significant height change on mobile)
        if (this.isMobile() && heightDiff > 150) {
            this.isKeyboardOpen = true;
            this.adjustForKeyboard(true);
        } else if (this.isKeyboardOpen && heightDiff < 50) {
            this.isKeyboardOpen = false;
            this.adjustForKeyboard(false);
        }
    }

    adjustForKeyboard(keyboardOpen) {
        if (!this.chatWindow) return;

        if (keyboardOpen) {
            // Keyboard is open - adjust chat position
            this.chatWindow.style.maxHeight = '50vh';
            this.chatMessages.style.maxHeight = '8rem';
            
            // Ensure composer is visible
            setTimeout(() => {
                if (this.chatInput) {
                    this.chatInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        } else {
            // Keyboard closed - restore normal size
            this.chatWindow.style.maxHeight = '70vh';
            this.chatMessages.style.maxHeight = '16rem';
        }
    }

    handleInputFocus() {
        // Keep focus on input and ensure visibility
        if (this.isMobile()) {
            setTimeout(() => {
                if (this.chatInput) {
                    this.chatInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 300); // Wait for keyboard animation
        }
    }

    handleInputBlur() {
        // Don't restore focus automatically on mobile as it can be annoying
        // Just ensure the composer remains visible
    }

    handleSendMessage() {
        const message = this.chatInput?.value.trim();
        if (!message) return;

        // Call existing send functionality if it exists
        if (window.app && typeof window.app.sendChatMessage === 'function') {
            window.app.sendChatMessage();
        } else {
            // Fallback - trigger existing handlers
            const sendButton = document.getElementById('chatbot-send');
            if (sendButton) {
                sendButton.click();
            }
        }

        // Keep focus on input after sending
        setTimeout(() => {
            if (this.chatInput && document.activeElement !== this.chatInput) {
                this.chatInput.focus();
            }
        }, 100);
    }

    observeMessageChanges() {
        if (!this.chatMessages) return;

        // Use MutationObserver to detect new messages
        const observer = new MutationObserver(() => {
            this.scrollToBottom();
        });

        observer.observe(this.chatMessages, {
            childList: true,
            subtree: true
        });
    }

    scrollToBottom() {
        if (this.chatMessages) {
            // Smooth scroll to bottom
            this.chatMessages.scrollTo({
                top: this.chatMessages.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (window.innerWidth <= 768);
    }

    // Simulate resize event for testing
    simulateKeyboardToggle() {
        const originalHeight = window.innerHeight;
        
        // Simulate keyboard opening
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: originalHeight - 300
        });
        
        this.handleViewportChange();
        
        // Reset after test
        setTimeout(() => {
            Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: originalHeight
            });
            this.handleViewportChange();
        }, 1000);
    }
}

// Apply chat fixes immediately
const chatFix = new ChatComposerFix();

// Make available globally for testing
window.ChatComposerFix = ChatComposerFix;
window.chatFixInstance = chatFix;