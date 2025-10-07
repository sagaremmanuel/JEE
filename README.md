# 🤖 Website Chatbot Widget

A beautiful, customizable, and lightweight chatbot widget that you can easily integrate into any website. Perfect for customer support, lead generation, and user engagement.

![Chatbot Demo](https://img.shields.io/badge/Status-Ready-brightgreen) ![Version](https://img.shields.io/badge/Version-1.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎨 **Fully Customizable** - Colors, messages, position, and responses
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- ⚡ **Easy Integration** - Just 2 lines of code to get started
- 🌙 **Theme Support** - Light, dark, and auto themes
- 💬 **Smart Responses** - Keyword-based conversation flows
- 🚀 **Lightweight** - Minimal footprint with smooth animations
- 🔒 **Privacy Focused** - No external API calls, data stays on your site
- ♿ **Accessible** - Keyboard navigation and screen reader support

## 🚀 Quick Start

### Method 1: Standalone Version

1. Download the files and host them on your server
2. Add to your HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Your website content -->
    
    <!-- Chatbot widget will be injected here -->
    <script src="chatbot.js"></script>
</body>
</html>
```

### Method 2: Embeddable Version (Recommended)

1. Include the embed script:

```html
<script src="chatbot-embed.js"></script>
```

2. Initialize with your configuration:

```html
<script>
ChatbotEmbed.init({
    botName: 'Support Bot',
    welcomeMessage: 'Hi! How can I help you today?',
    companyName: 'Your Company',
    primaryColor: '#007bff',
    position: 'bottom-right'
});
</script>
```

That's it! Your chatbot is now live.

## ⚙️ Configuration Options

### Basic Configuration

```javascript
ChatbotEmbed.init({
    botName: 'Support Bot',                    // Bot display name
    welcomeMessage: 'How can I help you?',     // First message
    companyName: 'Your Company',               // Footer branding
    primaryColor: '#667eea',                   // Main theme color
    secondaryColor: '#764ba2',                 // Secondary theme color
    position: 'bottom-right',                  // Widget position
    theme: 'light',                            // Theme: light, dark, auto
    zIndex: 10000                              // CSS z-index for overlay
});
```

### Advanced Configuration

```javascript
ChatbotEmbed.init({
    // Appearance
    botName: 'AI Assistant',
    welcomeMessage: 'Welcome! I\'m here to help you.',
    companyName: 'Your Brand',
    
    // Colors (supports hex, rgb, hsl)
    primaryColor: '#6c5ce7',
    secondaryColor: '#a29bfe',
    
    // Position: 'bottom-right', 'bottom-left'
    position: 'bottom-right',
    
    // Theme: 'light', 'dark', 'auto'
    theme: 'auto',
    
    // Custom responses
    responses: {
        'pricing': 'Our plans start at $29/month. Contact sales for details!',
        'demo': 'Book a demo at demo@yourcompany.com',
        'hours': 'We\'re open Monday-Friday, 9 AM to 6 PM EST',
        'support': 'For technical support, email help@yourcompany.com',
        'sales': 'Interested in our services? Call (555) 123-4567'
    }
});
```

## 🎨 Customization

### Adding Custom Responses

```javascript
// Method 1: During initialization
ChatbotEmbed.init({
    responses: {
        'keyword': 'Your response here',
        'pricing': 'Check our pricing page for details',
        'refund': 'We offer 30-day money-back guarantee'
    }
});

// Method 2: After initialization
ChatbotEmbed.addResponse('new-keyword', 'New response message');
```

### Changing Themes

```javascript
// Set theme after initialization
ChatbotEmbed.setTheme('dark');

// Available themes: 'light', 'dark', 'auto'
```

### Custom Styling

You can override the default styles by adding your own CSS:

```css
/* Custom chatbot styles */
.chatbot-embed-widget {
    /* Your custom styles */
}

.chatbot-embed-toggle {
    background: linear-gradient(45deg, #your-color1, #your-color2) !important;
}

.chatbot-embed-window {
    border-radius: 20px !important;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3) !important;
}
```

## 💬 Built-in Keywords

The chatbot recognizes these keywords by default:

| Keyword | Response Type |
|---------|---------------|
| `hello`, `hi`, `hey` | Greeting |
| `help` | Help information |
| `hours`, `time`, `open` | Business hours |
| `contact`, `email`, `phone`, `support` | Contact information |
| `services`, `service`, `what do you do` | Services offered |
| `price`, `cost`, `pricing` | Pricing information |
| `bye`, `goodbye` | Farewell |
| `thanks`, `thank you` | Acknowledgment |

## 📱 Mobile Responsiveness

The chatbot automatically adapts to mobile devices:

- Responsive design for all screen sizes
- Touch-friendly interface
- Optimized for mobile browsers
- Maintains functionality on tablets and phones

## 🌐 Browser Support

- ✅ Chrome (60+)
- ✅ Firefox (55+)
- ✅ Safari (12+)
- ✅ Edge (79+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📁 File Structure

```
chatbot/
├── index.html              # Standalone demo
├── styles.css              # Chatbot styles
├── chatbot.js              # Main chatbot logic
├── chatbot-embed.js        # Embeddable version
├── demo.html               # Integration examples
└── README.md               # This file
```

## 🛠️ Development

### Local Development

1. Clone or download the files
2. Open `index.html` in your browser for the standalone version
3. Open `demo.html` for integration examples
4. Modify the JavaScript and CSS files as needed

### Testing Integration

1. Create a test HTML file
2. Include the embed script
3. Initialize with test configuration
4. Open in browser to test

## 🚀 Deployment

### Self-Hosted

1. Upload all files to your web server
2. Update file paths in your HTML
3. Test the integration

### CDN Integration

Host the files on a CDN and reference them:

```html
<script src="https://your-cdn.com/chatbot-embed.js"></script>
```

## 🔧 API Reference

### ChatbotEmbed Methods

```javascript
// Initialize chatbot
ChatbotEmbed.init(config)

// Add custom response
ChatbotEmbed.addResponse(keyword, response)

// Change theme
ChatbotEmbed.setTheme(theme)
```

### Configuration Object

```typescript
interface ChatbotConfig {
    botName?: string;           // Default: 'Support Bot'
    welcomeMessage?: string;    // Default: greeting message
    companyName?: string;       // Default: 'Your Company'
    primaryColor?: string;      // Default: '#667eea'
    secondaryColor?: string;    // Default: '#764ba2'
    position?: string;          // Default: 'bottom-right'
    theme?: string;             // Default: 'light'
    zIndex?: number;            // Default: 10000
    responses?: object;         // Custom keyword responses
}
```

## 🎯 Use Cases

- **Customer Support** - Answer common questions automatically
- **Lead Generation** - Capture visitor information and interests
- **Product Information** - Provide details about services/products
- **Business Hours** - Share opening hours and contact information
- **FAQ Automation** - Handle frequently asked questions
- **Sales Assistance** - Guide users through sales process

## 📊 Analytics Integration

Track chatbot interactions:

```javascript
// Custom event tracking
ChatbotEmbed.init({
    onMessageSent: function(message) {
        // Track user messages
        gtag('event', 'chatbot_user_message', {
            'message': message
        });
    },
    onBotResponse: function(response) {
        // Track bot responses
        gtag('event', 'chatbot_bot_response', {
            'response': response
        });
    }
});
```

## 🔒 Security & Privacy

- No data is sent to external servers
- All conversations stay on your website
- No cookies or tracking by default
- GDPR compliant out of the box
- Can be used offline

## 🐛 Troubleshooting

### Common Issues

**Chatbot not appearing:**
- Check if JavaScript is enabled
- Verify file paths are correct
- Check browser console for errors

**Styling issues:**
- Check for CSS conflicts
- Verify z-index settings
- Test in different browsers

**Mobile problems:**
- Check viewport meta tag
- Test responsive breakpoints
- Verify touch events work

### Debug Mode

Enable debug logging:

```javascript
ChatbotEmbed.init({
    debug: true,  // Enable console logging
    // ... other options
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use in personal and commercial projects.

## 🆘 Support

- Create an issue for bug reports
- Check existing issues for solutions
- Submit feature requests
- Contact: support@yourcompany.com

## 🎉 Changelog

### v1.0.0
- Initial release
- Basic chatbot functionality
- Embeddable widget
- Theme support
- Mobile responsive design
- Custom responses

---

Made with ❤️ for better customer engagement. Star ⭐ this project if you find it useful!