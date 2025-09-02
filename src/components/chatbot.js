// Enhanced Chatbot Functionality with Database Integration
class BrokerAnalysisChatbot {
    constructor() {
        this.isInitialized = false;
        this.messageHistory = [];
        this.isTyping = false;
        this.currentContext = {};
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        if (this.isInitialized) return;
        
        try {
            // Get DOM elements
            this.elements = {
                widget: document.getElementById('chatbot-widget'),
                toggle: document.getElementById('chatbot-toggle'),
                window: document.getElementById('chatbot-window'),
                close: document.getElementById('chatbot-close'),
                messages: document.getElementById('chatbot-messages'),
                input: document.getElementById('chatbot-input'),
                send: document.getElementById('chatbot-send')
            };

            // Verify all elements exist
            const missingElements = Object.keys(this.elements).filter(key => !this.elements[key]);
            if (missingElements.length > 0) {
                console.warn('Chatbot: Missing elements:', missingElements);
                return;
            }

            this.bindEvents();
            this.loadMessageHistory();
            this.isInitialized = true;
            console.log('BrokerAnalysis Chatbot initialized successfully');
            
        } catch (error) {
            console.error('Chatbot initialization error:', error);
        }
    }

    bindEvents() {
        // Toggle chatbot window
        this.elements.toggle.addEventListener('click', () => this.toggleChatWindow());
        this.elements.close.addEventListener('click', () => this.closeChatWindow());
        
        // Send message events
        this.elements.send.addEventListener('click', () => this.handleSendMessage());
        this.elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });

        // Auto-resize input
        this.elements.input.addEventListener('input', () => this.autoResizeInput());

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (!this.elements.widget.contains(e.target)) {
                this.closeChatWindow();
            }
        });
    }

    toggleChatWindow() {
        const isHidden = this.elements.window.classList.contains('hidden');
        
        if (isHidden) {
            this.elements.window.classList.remove('hidden');
            this.elements.toggle.setAttribute('aria-expanded', 'true');
            this.elements.input.focus();
            this.scrollToBottom();
        } else {
            this.closeChatWindow();
        }
    }

    closeChatWindow() {
        this.elements.window.classList.add('hidden');
        this.elements.toggle.setAttribute('aria-expanded', 'false');
    }

    async handleSendMessage() {
        const message = this.elements.input.value.trim();
        if (!message || this.isTyping) return;

        try {
            // Add user message to chat
            this.addMessage(message, 'user');
            this.elements.input.value = '';
            this.autoResizeInput();

            // Show typing indicator
            this.showTypingIndicator();
            
            // Send to API
            await this.sendMessageToAPI(message);
            
        } catch (error) {
            console.error('Send message error:', error);
            this.hideTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'assistant', [], []);
        }
    }

    async sendMessageToAPI(message) {
        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    context: this.currentContext
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            this.hideTypingIndicator();

            if (data.success) {
                // Add bot response with suggestions and internal links
                this.addMessage(
                    data.response, 
                    'assistant', 
                    data.suggestions || [], 
                    data.internalLinks || []
                );
                
                // Update context for follow-up questions
                this.currentContext = {
                    lastQuery: message,
                    lastResponse: data.response,
                    timestamp: data.timestamp
                };
                
            } else {
                this.addMessage(
                    data.response || 'Sorry, I couldn\'t process your request. Please try again.',
                    'assistant',
                    data.suggestions || ['Show me top brokers', 'Find regulated brokers'],
                    []
                );
            }

        } catch (error) {
            console.error('API request error:', error);
            this.hideTypingIndicator();
            
            // Show fallback response
            this.addMessage(
                'I\'m having trouble connecting right now. Here are some things you can try:',
                'assistant',
                [
                    'Browse all broker reviews',
                    'Use the comparison tool',
                    'Check out beginner guides'
                ],
                [
                    { title: 'All Broker Reviews', url: '/reviews', description: 'Browse our complete database' },
                    { title: 'Broker Comparison', url: '/compare', description: 'Compare brokers side-by-side' }
                ]
            );
        }
    }

    addMessage(content, type, suggestions = [], internalLinks = []) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex items-start space-x-2 animate-fadeIn';

        if (type === 'user') {
            messageDiv.innerHTML = `
                <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center ml-auto">
                    <i class="fas fa-user text-gray-600 text-sm"></i>
                </div>
                <div class="bg-blue-600 text-white p-3 rounded-lg max-w-xs ml-auto">
                    <p class="text-sm">${this.escapeHtml(content)}</p>
                </div>
            `;
        } else {
            // Process markdown-style formatting for bot responses
            const formattedContent = this.formatBotMessage(content);
            
            messageDiv.innerHTML = `
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-robot text-blue-600 text-sm"></i>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg max-w-xs flex-1">
                    <div class="text-sm">${formattedContent}</div>
                    ${this.renderInternalLinks(internalLinks)}
                    ${this.renderSuggestions(suggestions)}
                </div>
            `;
        }

        this.elements.messages.appendChild(messageDiv);
        
        // Store in history
        this.messageHistory.push({
            content,
            type,
            timestamp: new Date().toISOString(),
            suggestions,
            internalLinks
        });
        
        this.saveMessageHistory();
        this.scrollToBottom();
    }

    formatBotMessage(content) {
        return content
            // Bold text: **text** -> <strong>text</strong>
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Code/emphasis: `text` -> <code>text</code>
            .replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-1 rounded">$1</code>')
            // Internal links: [text](/url) -> <a href="/url">text</a>
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
            // Line breaks
            .replace(/\n/g, '<br>')
            // Bullet points: • text -> <li>text</li>
            .replace(/^• (.+)$/gm, '<li class="ml-4">$1</li>')
            // Numbered lists: 1. text -> <li>text</li>
            .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>');
    }

    renderInternalLinks(links) {
        if (!links || links.length === 0) return '';
        
        const linksHtml = links.map(link => `
            <a href="${link.url}" 
               class="block p-2 mt-2 bg-blue-50 border border-blue-200 rounded text-xs hover:bg-blue-100 transition-colors"
               title="${this.escapeHtml(link.description)}">
                <i class="fas fa-link text-blue-600 mr-1"></i>
                <strong>${this.escapeHtml(link.title)}</strong>
                <br>
                <span class="text-gray-600">${this.escapeHtml(link.description)}</span>
            </a>
        `).join('');
        
        return `<div class="mt-3">${linksHtml}</div>`;
    }

    renderSuggestions(suggestions) {
        if (!suggestions || suggestions.length === 0) return '';
        
        const suggestionsHtml = suggestions.map(suggestion => `
            <button onclick="window.chatbot.sendQuickMessage('${this.escapeHtml(suggestion)}')" 
                    class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 mb-1 hover:bg-blue-200 transition-colors">
                ${this.escapeHtml(suggestion)}
            </button>
        `).join('');
        
        return `
            <div class="mt-3 pt-2 border-t border-gray-200">
                <div class="text-xs text-gray-600 mb-1">💡 Try asking:</div>
                <div class="flex flex-wrap">${suggestionsHtml}</div>
            </div>
        `;
    }

    sendQuickMessage(message) {
        this.elements.input.value = message;
        this.handleSendMessage();
    }

    showTypingIndicator() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex items-start space-x-2 animate-pulse';
        typingDiv.innerHTML = `
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="fas fa-robot text-blue-600 text-sm"></i>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
            </div>
        `;
        
        this.elements.messages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }

    autoResizeInput() {
        const input = this.elements.input;
        input.style.height = 'auto';
        input.style.height = `${Math.min(input.scrollHeight, 100)}px`;
    }

    scrollToBottom() {
        setTimeout(() => {
            this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
        }, 100);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveMessageHistory() {
        try {
            localStorage.setItem('brokerAnalysisChatHistory', JSON.stringify(this.messageHistory.slice(-20))); // Keep last 20 messages
        } catch (error) {
            console.warn('Could not save chat history:', error);
        }
    }

    loadMessageHistory() {
        try {
            const history = localStorage.getItem('brokerAnalysisChatHistory');
            if (history) {
                const messages = JSON.parse(history);
                // Only load messages from last 24 hours
                const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
                
                messages.forEach(msg => {
                    if (new Date(msg.timestamp) > oneDayAgo) {
                        this.addMessage(msg.content, msg.type, msg.suggestions || [], msg.internalLinks || []);
                    }
                });
            }
        } catch (error) {
            console.warn('Could not load chat history:', error);
        }
    }

    clearHistory() {
        this.messageHistory = [];
        this.elements.messages.innerHTML = `
            <div class="flex items-start space-x-2">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-robot text-blue-600 text-sm"></i>
                </div>
                <div class="bg-blue-50 p-3 rounded-lg max-w-xs">
                    <p class="text-sm">Hello! I'm your broker analysis assistant. How can I help you find the perfect forex broker today?</p>
                </div>
            </div>
        `;
        localStorage.removeItem('brokerAnalysisChatHistory');
    }
}

// Global function for quick message buttons (backwards compatibility)
function sendQuickMessage(message) {
    if (window.chatbot) {
        window.chatbot.sendQuickMessage(message);
    }
}

// Initialize chatbot when script loads
window.chatbot = new BrokerAnalysisChatbot();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
    }
    
    #chatbot-input {
        resize: none;
        transition: height 0.2s ease;
    }
    
    #chatbot-messages {
        scrollbar-width: thin;
        scrollbar-color: #cbd5e0 #f7fafc;
    }
    
    #chatbot-messages::-webkit-scrollbar {
        width: 6px;
    }
    
    #chatbot-messages::-webkit-scrollbar-track {
        background: #f7fafc;
    }
    
    #chatbot-messages::-webkit-scrollbar-thumb {
        background-color: #cbd5e0;
        border-radius: 3px;
    }
    
    #chatbot-messages::-webkit-scrollbar-thumb:hover {
        background-color: #a0aec0;
    }
    
    @media (max-width: 640px) {
        #chatbot-window {
            position: fixed !important;
            bottom: 80px !important;
            right: 10px !important;
            left: 10px !important;
            width: auto !important;
        }
    }
`;
document.head.appendChild(style);

console.log('BrokerAnalysis Chatbot script loaded successfully');