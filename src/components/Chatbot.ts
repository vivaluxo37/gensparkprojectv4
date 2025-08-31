export function renderChatbot(): string {
  return `
    <!-- Chatbot Widget -->
    <div id="chatbot-widget" class="fixed bottom-6 right-6 z-50">
        <button id="chatbot-toggle" class="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300" aria-label="Open chatbot assistant" aria-expanded="false">
            <i class="fas fa-comments text-xl" aria-hidden="true"></i>
        </button>
        <div id="chatbot-window" class="hidden absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border">
            <div class="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                <span class="font-semibold">BrokerAnalysis Assistant</span>
                <button id="chatbot-close" class="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600" aria-label="Close chatbot">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
            <div id="chatbot-messages" class="h-64 overflow-y-auto p-4 space-y-3">
                <div class="flex items-start space-x-2">
                    <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-robot text-blue-600 text-sm"></i>
                    </div>
                    <div class="bg-blue-50 p-3 rounded-lg max-w-xs">
                        <p class="text-sm">Hello! I'm your broker analysis assistant. How can I help you find the perfect forex broker today?</p>
                    </div>
                </div>
            </div>
            <div class="p-4 border-t">
                <div class="flex space-x-2">
                    <label for="chatbot-input" class="sr-only">Ask a question about forex brokers</label>
                    <input type="text" id="chatbot-input" placeholder="Ask about brokers..." class="flex-1 p-2 border rounded-lg text-sm" aria-describedby="chatbot-input-help">
                    <div id="chatbot-input-help" class="sr-only">Ask questions about forex brokers, regulations, or trading features</div>
                    <button id="chatbot-send" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Send message">
                        <i class="fas fa-paper-plane" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="mt-2 flex flex-wrap gap-1">
                    <button onclick="sendQuickMessage('Show regulated brokers')" class="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded hover:bg-gray-200">
                        Regulated brokers
                    </button>
                    <button onclick="sendQuickMessage('Best for beginners')" class="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded hover:bg-gray-200">
                        For beginners
                    </button>
                </div>
            </div>
        </div>
    </div>
  `;
}