// Chat functionality for Bahubhashi Mandi
let isTranslationEnabled = true;
let currentLanguagePair = { from: 'hi', to: 'gu' };
let chatMessages = [];
let isTyping = false;

// Initialize chat
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chat initialized');
    setupChatEventListeners();
    scrollToBottom();
});

// Setup event listeners
function setupChatEventListeners() {
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        messageInput.addEventListener('input', function() {
            // Show typing indicator to other user
            showTypingIndicator();
        });
    }
}

// Toggle translation
function toggleTranslation() {
    isTranslationEnabled = !isTranslationEnabled;
    
    const toggleBtn = document.querySelector('.language-toggle');
    if (toggleBtn) {
        if (isTranslationEnabled) {
            toggleBtn.style.background = 'rgba(255,255,255,0.2)';
            console.log('Translation enabled');
        } else {
            toggleBtn.style.background = 'rgba(255,0,0,0.3)';
            console.log('Translation disabled');
        }
    }
    
    // Update all message translations
    updateMessageTranslations();
}

// Update message translations
function updateMessageTranslations() {
    const translatedTexts = document.querySelectorAll('.translated-text');
    translatedTexts.forEach(text => {
        if (isTranslationEnabled) {
            text.style.display = 'block';
        } else {
            text.style.display = 'none';
        }
    });
}

// Send message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    
    if (!messageText) return;
    
    // Create message object
    const message = {
        id: Date.now(),
        text: messageText,
        sender: 'buyer',
        timestamp: new Date(),
        language: currentLanguagePair.to,
        translated: translateMessage(messageText, currentLanguagePair.to, currentLanguagePair.from)
    };
    
    // Add message to chat
    addMessageToChat(message);
    
    // Clear input
    messageInput.value = '';
    
    // Simulate vendor response after delay
    setTimeout(() => {
        simulateVendorResponse(message);
    }, 2000);
    
    // Scroll to bottom
    scrollToBottom();
}

// Add message to chat
function addMessageToChat(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageGroup = document.createElement('div');
    messageGroup.className = `message-group ${message.sender}`;
    
    const messageBubble = document.createElement('div');
    messageBubble.className = `message-bubble ${message.sender}-msg`;
    
    messageBubble.innerHTML = `
        <div class="message-header">
            <span class="sender-name">${message.sender === 'buyer' ? 'आप' : 'राम किसान'}</span>
            <span class="message-time">अभी</span>
            <span class="original-lang">${getLanguageCode(message.language)}</span>
        </div>
        <div class="message-content">
            <p class="original-text">${message.text}</p>
            ${isTranslationEnabled ? `
                <div class="translated-text">
                    <span class="translate-label">${getLanguageName(message.sender === 'buyer' ? currentLanguagePair.from : currentLanguagePair.to)}:</span>
                    <p>${message.translated}</p>
                </div>
            ` : ''}
        </div>
    `;
    
    messageGroup.appendChild(messageBubble);
    chatMessages.appendChild(messageGroup);
    
    // Add to messages array
    chatMessages.push(message);
}

// Simulate vendor response
function simulateVendorResponse(buyerMessage) {
    // Show typing indicator
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        
        // Generate appropriate response based on buyer message
        const response = generateVendorResponse(buyerMessage.text);
        
        const vendorMessage = {
            id: Date.now(),
            text: response.text,
            sender: 'vendor',
            timestamp: new Date(),
            language: currentLanguagePair.from,
            translated: response.translated
        };
        
        addMessageToChat(vendorMessage);
        
        // Add AI assistance if needed
        if (response.needsAssistance) {
            setTimeout(() => {
                addAIAssistance(response.assistanceType, response.context);
            }, 1000);
        }
        
        scrollToBottom();
    }, 1500);
}

// Generate vendor response
function generateVendorResponse(buyerText) {
    const responses = {
        'price': {
            text: 'भाई, यह बहुत अच्छी क्वालिटी है। थोड़ा सा भाव और दे दो।',
            translated: 'ભાઈ, આ ખૂબ સારી ક્વોલિટી છે. થોડો વધુ ભાવ આપો.',
            needsAssistance: true,
            assistanceType: 'negotiation',
            context: { currentPrice: 27, suggestedRange: [25, 28] }
        },
        'quality': {
            text: 'A ग्रेड का माल है। आज ही खेत से तोड़ा है।',
            translated: 'A ગ્રેડનો માલ છે. આજે જ ખેતરમાંથી તોડ્યો છે.',
            needsAssistance: false
        },
        'delivery': {
            text: 'कल सुबह 8 बजे तक पहुंचा दूंगा। पैकिंग भी अच्छी करूंगा।',
            translated: 'કાલે સવારે 8 વાગ્યા સુધીમાં પહોંચાડી દઈશ. પેકિંગ પણ સારી કરીશ.',
            needsAssistance: false
        },
        'default': {
            text: 'हां भाई, बताइए क्या चाहिए?',
            translated: 'હા ભાઈ, કહો શું જોઈએ છે?',
            needsAssistance: false
        }
    };
    
    // Simple keyword matching
    if (buyerText.includes('કિંમત') || buyerText.includes('price') || buyerText.includes('₹')) {
        return responses.price;
    } else if (buyerText.includes('ક્વોલિટી') || buyerText.includes('quality')) {
        return responses.quality;
    } else if (buyerText.includes('ડિલિવરી') || buyerText.includes('delivery')) {
        return responses.delivery;
    } else {
        return responses.default;
    }
}

// Add AI assistance
function addAIAssistance(type, context) {
    const chatMessages = document.getElementById('chatMessages');
    const assistanceGroup = document.createElement('div');
    assistanceGroup.className = 'message-group ai-assist';
    
    let assistanceHTML = '';
    
    switch (type) {
        case 'negotiation':
            assistanceHTML = `
                <div class="ai-assistance price-analysis">
                    <div class="assist-header">
                        <span class="ai-icon">🤖</span>
                        <span class="assist-title">बातचीत सहायता</span>
                    </div>
                    <div class="price-analysis-content">
                        <div class="price-status good">
                            <span class="status-icon">✅</span>
                            <span class="status-text">विक्रेता उचित कीमत पर बातचीत कर रहा है</span>
                        </div>
                        <div class="negotiation-tips">
                            <div class="tip-item">
                                <span class="tip-icon">💰</span>
                                <span class="tip-text">₹${context.currentPrice}/किलो उचित कीमत है</span>
                            </div>
                            <div class="tip-item">
                                <span class="tip-icon">📊</span>
                                <span class="tip-text">बाजार सीमा: ₹${context.suggestedRange[0]}-${context.suggestedRange[1]}/किलो</span>
                            </div>
                        </div>
                        <div class="suggested-responses">
                            <p class="suggest-label">सुझावित जवाब:</p>
                            <button class="quick-reply" onclick="sendQuickReply('accept-price')">
                                "ठीक है, ₹${context.currentPrice} में दे दो"
                            </button>
                            <button class="quick-reply" onclick="sendQuickReply('final-offer')">
                                "₹${context.currentPrice - 1} अंतिम भाव"
                            </button>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'quality-check':
            assistanceHTML = `
                <div class="ai-assistance buyer-assist">
                    <div class="assist-header">
                        <span class="ai-icon">🤖</span>
                        <span class="assist-title">गुणवत्ता जांच</span>
                    </div>
                    <div class="assist-content">
                        <div class="assist-item">
                            <span class="assist-icon">✅</span>
                            <span class="assist-text">विक्रेता की रेटिंग अच्छी है (4.8⭐)</span>
                        </div>
                        <div class="assist-item">
                            <span class="assist-icon">🏆</span>
                            <span class="assist-text">A ग्रेड प्रमाणित उत्पाद</span>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    
    assistanceGroup.innerHTML = assistanceHTML;
    chatMessages.appendChild(assistanceGroup);
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    if (isTyping) return;
    
    isTyping = true;
    const chatMessages = document.getElementById('chatMessages');
    const typingGroup = document.createElement('div');
    typingGroup.className = 'message-group vendor';
    typingGroup.id = 'typing-indicator';
    
    typingGroup.innerHTML = `
        <div class="typing-indicator">
            <div class="user-avatar">👨‍🌾</div>
            <div class="typing-text">
                <span>राम किसान लिख रहे हैं</span>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingGroup);
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
    isTyping = false;
}

// Send quick reply
function sendQuickReply(type) {
    const quickReplies = {
        'yes': 'हां / હા',
        'no': 'नहीं / ના',
        'price': 'कीमत क्या है? / કિંમત શું છે?',
        'quality': 'क्वालिटी कैसी है? / ક્વોલિટી કેવી છે?',
        'delivery': 'डिलीवरी कब होगी? / ડિલિવરી ક્યારે થશે?',
        'thanks': 'धन्यवाद / આભાર',
        'negotiate': '₹25/किलो में दे सकते हैं? / ₹25/કિલોમાં આપી શકો છો?',
        'bulk-discount': '50 किलो में कुछ छूट मिलेगी? / 50 કિલોમાં કંઈ છૂટ મળશે?',
        'accept-price': 'ठीक है, इस कीमत में दे दो / ઠીક છે, આ કિંમતમાં આપો',
        'final-offer': '₹26 अंतिम भाव / ₹26 અંતિમ ભાવ'
    };
    
    const messageInput = document.getElementById('messageInput');
    if (messageInput && quickReplies[type]) {
        messageInput.value = quickReplies[type];
        sendMessage();
    }
    
    hideQuickReplies();
}

// Show/hide quick replies
function showQuickReplies() {
    const panel = document.getElementById('quickRepliesPanel');
    if (panel) {
        panel.classList.add('active');
    }
}

function hideQuickReplies() {
    const panel = document.getElementById('quickRepliesPanel');
    if (panel) {
        panel.classList.remove('active');
    }
}

// Voice input (placeholder)
function toggleVoiceInput() {
    console.log('Voice input activated');
    // Placeholder for voice input functionality
    alert('वॉइस इनपुट जल्द ही उपलब्ध होगा!\nVoice input coming soon!');
}

// Camera (placeholder)
function openCamera() {
    console.log('Camera opened');
    // Placeholder for camera functionality
    alert('कैमरा फीचर जल्द ही उपलब्ध होगा!\nCamera feature coming soon!');
}

// Make call
function makeCall() {
    console.log('Making call to vendor');
    alert('राम किसान को कॉल कर रहे हैं...\nCalling Ram Kisan...\n📞 +91 98765 43210');
}

// Accept deal
function acceptDeal() {
    console.log('Deal accepted');
    
    // Add confirmation message
    const chatMessages = document.getElementById('chatMessages');
    const confirmationGroup = document.createElement('div');
    confirmationGroup.className = 'message-group system';
    
    confirmationGroup.innerHTML = `
        <div class="deal-confirmed">
            <div class="confirmation-header">
                <span class="confirm-icon">🎉</span>
                <h3>सौदा पक्का हो गया!</h3>
            </div>
            <div class="deal-summary">
                <div class="summary-item">
                    <span class="summary-label">उत्पाद:</span>
                    <span class="summary-value">टमाटर - A ग्रेड</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">मात्रा:</span>
                    <span class="summary-value">50 किलो</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">कीमत:</span>
                    <span class="summary-value">₹27/किलो</span>
                </div>
                <div class="summary-item total">
                    <span class="summary-label">कुल राशि:</span>
                    <span class="summary-value">₹1,350</span>
                </div>
            </div>
            <div class="next-steps">
                <button class="btn-primary" onclick="proceedToPayment()">
                    <span class="btn-icon">💳</span>
                    भुगतान करें
                </button>
                <button class="btn-secondary" onclick="saveForLater()">
                    <span class="btn-icon">📋</span>
                    बाद में
                </button>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(confirmationGroup);
    scrollToBottom();
}

// Continue negotiation
function continueNegotiation() {
    console.log('Continuing negotiation');
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.focus();
    }
}

// Proceed to payment
function proceedToPayment() {
    console.log('Proceeding to payment');
    alert('भुगतान पेज पर जा रहे हैं...\nRedirecting to payment page...');
}

// Save for later
function saveForLater() {
    console.log('Saving deal for later');
    alert('सौदा सेव हो गया!\nDeal saved successfully!');
}

// Utility functions
function translateMessage(text, fromLang, toLang) {
    // Placeholder translation function
    // In real implementation, this would call a translation API
    const translations = {
        'hi_to_gu': {
            'हां': 'હા',
            'नहीं': 'ના',
            'कीमत': 'કિંમત',
            'क्वालिटी': 'ક્વોલિટી',
            'टमाटर': 'ટમેટાં',
            'धन्यवाद': 'આભાર'
        },
        'gu_to_hi': {
            'હા': 'हां',
            'ના': 'नहीं',
            'કિંમત': 'कीमत',
            'ક્વોલિટી': 'क्वालिटी',
            'ટમેટાં': 'टमाटर',
            'આભાર': 'धन्यवाद'
        }
    };
    
    const translationKey = `${fromLang}_to_${toLang}`;
    const translationMap = translations[translationKey] || {};
    
    // Simple word replacement (in real app, use proper translation API)
    let translatedText = text;
    Object.keys(translationMap).forEach(word => {
        const regex = new RegExp(word, 'g');
        translatedText = translatedText.replace(regex, translationMap[word]);
    });
    
    return translatedText;
}

function getLanguageCode(lang) {
    const codes = {
        'hi': 'हिं',
        'gu': 'ગુજ',
        'en': 'Eng',
        'pa': 'ਪੰਜ',
        'mr': 'मरा',
        'ta': 'தமி',
        'te': 'తెల',
        'bn': 'বাং'
    };
    return codes[lang] || 'हिं';
}

function getLanguageName(lang) {
    const names = {
        'hi': 'हिंदी',
        'gu': 'ગુજરાતી',
        'en': 'English',
        'pa': 'ਪੰਜਾਬੀ',
        'mr': 'मराठी',
        'ta': 'தமிழ்',
        'te': 'తెలుగు',
        'bn': 'বাংলা'
    };
    return names[lang] || 'हिंदी';
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }
}

// Auto-scroll on new messages
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            scrollToBottom();
        }
    });
});

// Start observing
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        observer.observe(chatMessages, { childList: true });
    }
});

// Handle online/offline status in chat
window.addEventListener('online', function() {
    console.log('Chat is online');
    // Show online status
    updateConnectionStatus(true);
});

window.addEventListener('offline', function() {
    console.log('Chat is offline');
    // Show offline status and disable sending
    updateConnectionStatus(false);
});

function updateConnectionStatus(isOnline) {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    const sendBtn = document.querySelector('.send-btn');
    
    if (statusDot && statusText) {
        if (isOnline) {
            statusDot.className = 'status-dot online';
            statusText.textContent = 'ऑनलाइन';
        } else {
            statusDot.className = 'status-dot offline';
            statusText.textContent = 'ऑफलाइन';
        }
    }
    
    if (sendBtn) {
        sendBtn.disabled = !isOnline;
        sendBtn.style.opacity = isOnline ? '1' : '0.5';
    }
}