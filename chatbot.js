// Chatbot JavaScript functionality
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.responses = {
            // Greeting responses
            'hello': ['Hello! How can I help you today?', 'Hi there! What can I do for you?', 'Hey! How may I assist you?'],
            'hi': ['Hello! How can I help you today?', 'Hi there! What can I do for you?', 'Hey! How may I assist you?'],
            'hey': ['Hello! How can I help you today?', 'Hi there! What can I do for you?', 'Hey! How may I assist you?'],
            
            // Business hours
            'hours': ['Our business hours are Monday-Friday 9AM-6PM EST.', 'We\'re open Monday through Friday, 9 AM to 6 PM Eastern Time.'],
            'open': ['Our business hours are Monday-Friday 9AM-6PM EST.', 'We\'re open Monday through Friday, 9 AM to 6 PM Eastern Time.'],
            'time': ['Our business hours are Monday-Friday 9AM-6PM EST.', 'We\'re open Monday through Friday, 9 AM to 6 PM Eastern Time.'],
            
            // Contact information
            'contact': ['You can reach us at support@yourcompany.com or call (555) 123-4567.', 'Feel free to email us at support@yourcompany.com or give us a call at (555) 123-4567.'],
            'email': ['You can reach us at support@yourcompany.com or call (555) 123-4567.', 'Feel free to email us at support@yourcompany.com or give us a call at (555) 123-4567.'],
            'phone': ['You can reach us at support@yourcompany.com or call (555) 123-4567.', 'Feel free to email us at support@yourcompany.com or give us a call at (555) 123-4567.'],
            'support': ['You can reach us at support@yourcompany.com or call (555) 123-4567.', 'Feel free to email us at support@yourcompany.com or give us a call at (555) 123-4567.'],
            
            // Services
            'services': ['We offer web development, mobile apps, and digital marketing services.', 'Our main services include custom web development, mobile application development, and comprehensive digital marketing solutions.'],
            'service': ['We offer web development, mobile apps, and digital marketing services.', 'Our main services include custom web development, mobile application development, and comprehensive digital marketing solutions.'],
            'what do you do': ['We offer web development, mobile apps, and digital marketing services.', 'Our main services include custom web development, mobile application development, and comprehensive digital marketing solutions.'],
            
            // Pricing
            'price': ['Pricing varies by project. Please contact us for a custom quote!', 'Our pricing depends on your specific needs. Let\'s discuss your project - contact us for a personalized quote.'],
            'cost': ['Pricing varies by project. Please contact us for a custom quote!', 'Our pricing depends on your specific needs. Let\'s discuss your project - contact us for a personalized quote.'],
            'pricing': ['Pricing varies by project. Please contact us for a custom quote!', 'Our pricing depends on your specific needs. Let\'s discuss your project - contact us for a personalized quote.'],
            
            // Help
            'help': ['I can help you with information about our services, business hours, contact details, and pricing. What would you like to know?', 'I\'m here to assist with questions about our company, services, and how to get in touch. How can I help?'],
            
            // Goodbye
            'bye': ['Goodbye! Feel free to reach out anytime.', 'Thanks for chatting! Have a great day!', 'See you later! Don\'t hesitate to contact us if you need anything.'],
            'goodbye': ['Goodbye! Feel free to reach out anytime.', 'Thanks for chatting! Have a great day!', 'See you later! Don\'t hesitate to contact us if you need anything.'],
            'thanks': ['You\'re welcome! Is there anything else I can help you with?', 'Happy to help! Let me know if you have any other questions.'],
            'thank you': ['You\'re welcome! Is there anything else I can help you with?', 'Happy to help! Let me know if you have any other questions.'],
            
            // Default fallback
            'default': [
                'I\'m not sure I understand. Could you please rephrase that?',
                'I don\'t have information about that topic. Would you like to speak with a human agent?',
                'That\'s a great question! For detailed information, please contact our support team.',
                'I\'m still learning! Could you try asking in a different way?'
            ]
        };
        
        this.init();
    }

    init() {
        // Get DOM elements
        this.chatToggle = document.getElementById('chat-toggle');
        this.chatWindow = document.getElementById('chat-window');
        this.minimizeBtn = document.getElementById('minimize-chat');
        this.chatInput = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-btn');
        this.chatMessages = document.getElementById('chat-messages');
        this.typingIndicator = document.getElementById('typing-indicator');
        this.quickButtons = document.querySelectorAll('.quick-btn');

        // Bind events
        this.bindEvents();
        
        // Set initial timestamp
        this.updateMessageTime();
    }

    bindEvents() {
        // Toggle chat window
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.minimizeBtn.addEventListener('click', () => this.toggleChat());

        // Send message events
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Input events
        this.chatInput.addEventListener('input', () => {
            this.sendBtn.disabled = this.chatInput.value.trim() === '';
        });

        // Quick action buttons
        this.quickButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.getAttribute('data-message');
                this.sendMessage(message);
            });
        });

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.chatToggle.contains(e.target) && !this.chatWindow.contains(e.target)) {
                // Optional: uncomment to close on outside click
                // this.toggleChat();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatToggle.classList.toggle('active', this.isOpen);
        this.chatWindow.classList.toggle('active', this.isOpen);
        
        if (this.isOpen) {
            this.chatInput.focus();
        }
    }

    sendMessage(message = null) {
        const text = message || this.chatInput.value.trim();
        if (!text) return;

        // Add user message
        this.addMessage(text, 'user');
        
        // Clear input
        if (!message) {
            this.chatInput.value = '';
            this.sendBtn.disabled = true;
        }

        // Show typing indicator
        this.showTyping();

        // Generate bot response after delay
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(text);
            this.addMessage(response, 'bot');
        }, Math.random() * 1000 + 500); // Random delay between 500-1500ms
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = text;
        
        const timestamp = document.createElement('span');
        timestamp.className = 'message-time';
        timestamp.textContent = this.getCurrentTime();
        
        content.appendChild(messageText);
        content.appendChild(timestamp);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    generateResponse(message) {
        const lowercaseMessage = message.toLowerCase();
        
        // Check for keyword matches
        for (const [keyword, responses] of Object.entries(this.responses)) {
            if (keyword !== 'default' && lowercaseMessage.includes(keyword)) {
                return this.getRandomResponse(responses);
            }
        }
        
        // Check for question patterns
        if (lowercaseMessage.includes('what are your hours') || lowercaseMessage.includes('when are you open')) {
            return this.getRandomResponse(this.responses.hours);
        }
        
        if (lowercaseMessage.includes('how can i contact') || lowercaseMessage.includes('contact support')) {
            return this.getRandomResponse(this.responses.contact);
        }
        
        if (lowercaseMessage.includes('tell me about your services') || lowercaseMessage.includes('what services')) {
            return this.getRandomResponse(this.responses.services);
        }
        
        // Default response
        return this.getRandomResponse(this.responses.default);
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    showTyping() {
        this.typingIndicator.classList.add('active');
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.classList.remove('active');
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    updateMessageTime() {
        const initialMessage = this.chatMessages.querySelector('.message-time');
        if (initialMessage) {
            initialMessage.textContent = this.getCurrentTime();
        }
    }

    // Public API methods for customization
    addCustomResponse(keyword, responses) {
        this.responses[keyword.toLowerCase()] = Array.isArray(responses) ? responses : [responses];
    }

    setWelcomeMessage(message) {
        const welcomeMessage = this.chatMessages.querySelector('.bot-message .message-content p');
        if (welcomeMessage) {
            welcomeMessage.textContent = message;
        }
    }

    setBotName(name) {
        const botNameElement = document.querySelector('.bot-info h3');
        if (botNameElement) {
            botNameElement.textContent = name;
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new Chatbot();
    
    // Example of customization (uncomment to use):
    // window.chatbot.setBotName('Customer Support');
    // window.chatbot.setWelcomeMessage('Welcome! How can we help you today?');
    // window.chatbot.addCustomResponse('demo', ['This is a demo response!', 'Here\'s another demo response.']);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Chatbot;
}