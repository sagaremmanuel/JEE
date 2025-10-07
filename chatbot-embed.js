/**
 * Embeddable Chatbot Widget
 * Easy integration script for any website
 * 
 * Usage:
 * <script src="path/to/chatbot-embed.js"></script>
 * <script>
 *   ChatbotEmbed.init({
 *     botName: 'Support Bot',
 *     welcomeMessage: 'Hi! How can I help you?',
 *     companyName: 'Your Company',
 *     primaryColor: '#667eea',
 *     position: 'bottom-right'
 *   });
 * </script>
 */

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.ChatbotEmbed) {
        return;
    }

    const ChatbotEmbed = {
        config: {
            botName: 'Support Bot',
            welcomeMessage: 'Hi! I\'m your support bot. How can I help you today?',
            companyName: 'Your Company',
            primaryColor: '#667eea',
            secondaryColor: '#764ba2',
            position: 'bottom-right', // bottom-right, bottom-left
            theme: 'light', // light, dark, auto
            zIndex: 10000,
            responses: {}
        },

        init: function(options = {}) {
            // Merge user options with defaults
            this.config = Object.assign(this.config, options);
            
            // Create and inject styles
            this.injectStyles();
            
            // Create and inject HTML
            this.injectHTML();
            
            // Initialize chatbot functionality
            this.initializeChatbot();
        },

        injectStyles: function() {
            const styleId = 'chatbot-embed-styles';
            
            // Don't inject if already exists
            if (document.getElementById(styleId)) {
                return;
            }

            const styles = `
                /* Embedded Chatbot Styles */
                .chatbot-embed-widget {
                    position: fixed;
                    ${this.config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
                    ${this.config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
                    z-index: ${this.config.zIndex};
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .chatbot-embed-toggle {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, ${this.config.primaryColor} 0%, ${this.config.secondaryColor} 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    transition: all 0.3s ease;
                    position: relative;
                    border: none;
                }

                .chatbot-embed-toggle:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
                }

                .chatbot-embed-toggle svg {
                    width: 24px;
                    height: 24px;
                    color: white;
                    transition: all 0.3s ease;
                }

                .chatbot-embed-toggle .close-icon {
                    position: absolute;
                    opacity: 0;
                    transform: rotate(90deg);
                }

                .chatbot-embed-toggle.active .chat-icon {
                    opacity: 0;
                    transform: rotate(-90deg);
                }

                .chatbot-embed-toggle.active .close-icon {
                    opacity: 1;
                    transform: rotate(0deg);
                }

                .chatbot-embed-window {
                    position: absolute;
                    ${this.config.position.includes('bottom') ? 'bottom: 80px;' : 'top: 80px;'}
                    ${this.config.position.includes('right') ? 'right: 0;' : 'left: 0;'}
                    width: 350px;
                    height: 500px;
                    background: ${this.config.theme === 'dark' ? '#2d2d2d' : 'white'};
                    color: ${this.config.theme === 'dark' ? 'white' : 'black'};
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    animation: slideUp 0.3s ease;
                }

                .chatbot-embed-window.active {
                    display: flex;
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .chatbot-embed-header {
                    background: linear-gradient(135deg, ${this.config.primaryColor} 0%, ${this.config.secondaryColor} 100%);
                    color: white;
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .chatbot-embed-header-info {
                    display: flex;
                    align-items: center;
                }

                .chatbot-embed-avatar {
                    font-size: 24px;
                    margin-right: 12px;
                }

                .chatbot-embed-bot-info h3 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 600;
                }

                .chatbot-embed-status {
                    font-size: 12px;
                    opacity: 0.9;
                }

                .chatbot-embed-minimize {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                }

                .chatbot-embed-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .chatbot-embed-message {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .chatbot-embed-user-message {
                    flex-direction: row-reverse;
                }

                .chatbot-embed-message-content {
                    max-width: 70%;
                    background: ${this.config.theme === 'dark' ? '#404040' : '#f5f5f5'};
                    padding: 12px 16px;
                    border-radius: 18px;
                }

                .chatbot-embed-user-message .chatbot-embed-message-content {
                    background: linear-gradient(135deg, ${this.config.primaryColor} 0%, ${this.config.secondaryColor} 100%);
                    color: white;
                }

                .chatbot-embed-message-content p {
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.4;
                }

                .chatbot-embed-input-area {
                    border-top: 1px solid ${this.config.theme === 'dark' ? '#555' : '#eee'};
                    padding: 16px;
                }

                .chatbot-embed-input-container {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: ${this.config.theme === 'dark' ? '#404040' : '#f5f5f5'};
                    border-radius: 24px;
                    padding: 4px;
                }

                .chatbot-embed-input {
                    flex: 1;
                    border: none;
                    background: none;
                    padding: 12px 16px;
                    font-size: 14px;
                    outline: none;
                    color: ${this.config.theme === 'dark' ? 'white' : 'black'};
                }

                .chatbot-embed-send-btn {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, ${this.config.primaryColor} 0%, ${this.config.secondaryColor} 100%);
                    border: none;
                    border-radius: 50%;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .chatbot-embed-footer {
                    text-align: center;
                    margin-top: 8px;
                }

                .chatbot-embed-footer small {
                    color: ${this.config.theme === 'dark' ? '#999' : '#666'};
                    font-size: 11px;
                }

                @media (max-width: 480px) {
                    .chatbot-embed-widget {
                        bottom: 10px;
                        right: 10px;
                        left: 10px;
                    }
                    
                    .chatbot-embed-window {
                        width: 100%;
                        height: 70vh;
                        max-height: 500px;
                    }
                }
            `;

            const styleElement = document.createElement('style');
            styleElement.id = styleId;
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        },

        injectHTML: function() {
            const widgetId = 'chatbot-embed-widget';
            
            // Don't inject if already exists
            if (document.getElementById(widgetId)) {
                return;
            }

            const html = `
                <div id="${widgetId}" class="chatbot-embed-widget">
                    <button id="chatbot-embed-toggle" class="chatbot-embed-toggle">
                        <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    <div id="chatbot-embed-window" class="chatbot-embed-window">
                        <div class="chatbot-embed-header">
                            <div class="chatbot-embed-header-info">
                                <div class="chatbot-embed-avatar">🤖</div>
                                <div class="chatbot-embed-bot-info">
                                    <h3>${this.config.botName}</h3>
                                    <span class="chatbot-embed-status">Online</span>
                                </div>
                            </div>
                            <button id="chatbot-embed-minimize" class="chatbot-embed-minimize">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                        </div>

                        <div id="chatbot-embed-messages" class="chatbot-embed-messages">
                            <div class="chatbot-embed-message">
                                <div class="chatbot-embed-avatar">🤖</div>
                                <div class="chatbot-embed-message-content">
                                    <p>${this.config.welcomeMessage}</p>
                                </div>
                            </div>
                        </div>

                        <div class="chatbot-embed-input-area">
                            <div class="chatbot-embed-input-container">
                                <input type="text" id="chatbot-embed-input" class="chatbot-embed-input" placeholder="Type your message..." maxlength="500">
                                <button id="chatbot-embed-send" class="chatbot-embed-send-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                                    </svg>
                                </button>
                            </div>
                            <div class="chatbot-embed-footer">
                                <small>Powered by ${this.config.companyName}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', html);
        },

        initializeChatbot: function() {
            const toggle = document.getElementById('chatbot-embed-toggle');
            const window = document.getElementById('chatbot-embed-window');
            const minimize = document.getElementById('chatbot-embed-minimize');
            const input = document.getElementById('chatbot-embed-input');
            const sendBtn = document.getElementById('chatbot-embed-send');
            const messages = document.getElementById('chatbot-embed-messages');

            let isOpen = false;

            // Toggle functionality
            const toggleChat = () => {
                isOpen = !isOpen;
                toggle.classList.toggle('active', isOpen);
                window.classList.toggle('active', isOpen);
            };

            toggle.addEventListener('click', toggleChat);
            minimize.addEventListener('click', toggleChat);

            // Send message functionality
            const sendMessage = () => {
                const text = input.value.trim();
                if (!text) return;

                // Add user message
                this.addMessage(text, 'user', messages);
                input.value = '';

                // Bot response
                setTimeout(() => {
                    const response = this.generateResponse(text);
                    this.addMessage(response, 'bot', messages);
                }, 500 + Math.random() * 1000);
            };

            sendBtn.addEventListener('click', sendMessage);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        },

        addMessage: function(text, sender, container) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chatbot-embed-message ${sender === 'user' ? 'chatbot-embed-user-message' : ''}`;
            
            messageDiv.innerHTML = `
                <div class="chatbot-embed-avatar">${sender === 'user' ? '👤' : '🤖'}</div>
                <div class="chatbot-embed-message-content">
                    <p>${text}</p>
                </div>
            `;
            
            container.appendChild(messageDiv);
            container.scrollTop = container.scrollHeight;
        },

        generateResponse: function(message) {
            const responses = {
                'hello': 'Hello! How can I help you today?',
                'hi': 'Hi there! What can I do for you?',
                'help': 'I\'m here to help! What do you need assistance with?',
                'hours': 'Our business hours are Monday-Friday 9AM-6PM.',
                'contact': 'You can reach us at support@yourcompany.com',
                'services': 'We offer web development, mobile apps, and digital marketing.',
                'bye': 'Goodbye! Feel free to reach out anytime.',
                'thanks': 'You\'re welcome! Is there anything else I can help with?'
            };

            // Custom responses from config
            const allResponses = Object.assign(responses, this.config.responses);
            
            const lowerMessage = message.toLowerCase();
            for (const [key, response] of Object.entries(allResponses)) {
                if (lowerMessage.includes(key)) {
                    return response;
                }
            }

            return 'I\'m not sure about that. Could you please rephrase or contact our support team?';
        },

        // Public API
        addResponse: function(keyword, response) {
            this.config.responses[keyword] = response;
        },

        setTheme: function(theme) {
            this.config.theme = theme;
            // Re-inject styles with new theme
            const existingStyles = document.getElementById('chatbot-embed-styles');
            if (existingStyles) {
                existingStyles.remove();
            }
            this.injectStyles();
        }
    };

    // Make available globally
    window.ChatbotEmbed = ChatbotEmbed;

    // Auto-initialize if config is provided
    if (window.chatbotConfig) {
        ChatbotEmbed.init(window.chatbotConfig);
    }

})();