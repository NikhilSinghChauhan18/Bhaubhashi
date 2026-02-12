// Impact screen functionality for Bahubhashi Mandi
let impactData = {
    totalUsers: 250000,
    totalTrade: 5000000000, // 50 crores in paisa
    languages: 8,
    successfulNegotiations: 95,
    averageRating: 4.8,
    secureTransactions: 99.5,
    averageDealTime: 5,
    firstTimeSuccess: 80,
    priceImprovement: 15,
    fairDeals: 90
};

// Initialize impact screen
document.addEventListener('DOMContentLoaded', function() {
    console.log('Impact screen initialized');
    animateCounters();
    setupProgressCircles();
});

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .metric-number, .stat-count');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent.replace(/[^\d.]/g, ''));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number based on original text
            const originalText = counter.textContent;
            if (originalText.includes('लाख')) {
                counter.textContent = (current / 100000).toFixed(1) + ' लाख+';
            } else if (originalText.includes('करोड़')) {
                counter.textContent = '₹' + (current / 10000000).toFixed(0) + ' करोड़+';
            } else if (originalText.includes('%')) {
                counter.textContent = current.toFixed(1) + '%';
            } else if (originalText.includes('/')) {
                counter.textContent = current.toFixed(1) + '/5';
            } else if (originalText.includes('मिनट')) {
                counter.textContent = Math.round(current) + ' मिनट';
            } else {
                counter.textContent = Math.round(current).toLocaleString('hi-IN');
            }
        }, 16);
    });
}

// Setup progress circles
function setupProgressCircles() {
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    progressCircles.forEach(circle => {
        const progressText = circle.querySelector('.progress-text');
        const percentage = parseInt(progressText.textContent);
        const degrees = (percentage / 100) * 360;
        
        // Animate the progress circle
        setTimeout(() => {
            circle.style.background = `conic-gradient(#e67e22 0deg, #e67e22 ${degrees}deg, #ecf0f1 ${degrees}deg)`;
        }, 500);
    });
}

// Share impact functionality
function shareImpact() {
    const impactSummary = `🌟 बहुभाषी मंडी का प्रभाव:

📊 2.5 लाख+ खुश किसान और व्यापारी
💰 ₹50 करोड़+ निष्पक्ष व्यापार
🗣️ 8 भारतीय भाषाओं में संवाद
⚡ 5 मिनट में तेज़ सौदे
🤝 4.8/5 विश्वसनीयता रेटिंग

स्थानीय व्यापार में AI के साथ भाषाओं को जोड़ने का जादू!

#BahubhashiMandi #LocalTrade #AITranslation #FairPrice`;

    if (navigator.share) {
        navigator.share({
            title: 'बहुभाषी मंडी - हमारा प्रभाव',
            text: impactSummary,
            url: window.location.href
        }).then(() => {
            console.log('Impact shared successfully');
        }).catch((error) => {
            console.log('Error sharing impact:', error);
            fallbackShare(impactSummary);
        });
    } else {
        fallbackShare(impactSummary);
    }
}

// Fallback share function
function fallbackShare(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('प्रभाव की जानकारी कॉपी हो गई!');
        });
    } else {
        // Create temporary textarea for copying
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('प्रभाव की जानकारी कॉपी हो गई!');
    }
}

// Join community function
function joinCommunity() {
    console.log('Joining community');
    
    // Show community join options
    const options = [
        'WhatsApp समुदाय में शामिल हों',
        'Telegram चैनल फॉलो करें',
        'Facebook ग्रुप ज्वाइन करें',
        'YouTube चैनल सब्सक्राइब करें'
    ];
    
    const optionsList = options.map((option, index) => 
        `${index + 1}. ${option}`
    ).join('\n');
    
    alert(`समुदाय में शामिल होने के तरीके:\n\n${optionsList}\n\nजल्द ही लिंक उपलब्ध होंगे!`);
}

// Share success story
function shareSuccess() {
    console.log('Sharing success story');
    
    const successForm = `
अपनी सफलता की कहानी साझा करें:

📝 आपका नाम:
📍 आपका शहर/गांव:
🏪 आप क्या बेचते/खरीदते हैं:
💰 कितना फायदा हुआ:
📱 ऐप कैसे मदद की:

हमें भेजें: success@bahubhashimandi.com
या WhatsApp करें: +91 98765 43210
    `;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(successForm).then(() => {
            showToast('सफलता फॉर्म कॉपी हो गया! अब भरकर भेजें।');
        });
    } else {
        alert(successForm);
    }
}

// Show toast notification
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    
    // Style the toast
    toast.style.cssText = `
        position: fixed;
        bottom: 120px;
        left: 50%;
        transform: translateX(-50%);
        background: #2c3e50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 25px;
        font-size: 0.9rem;
        z-index: 1000;
        animation: toastSlideUp 0.3s ease-out;
    `;
    
    // Add toast styles to document
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes toastSlideUp {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to document
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'toastSlideUp 0.3s ease-out reverse';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Update impact data (for real-time updates)
function updateImpactData(newData) {
    impactData = { ...impactData, ...newData };
    
    // Update displayed numbers
    updateDisplayedMetrics();
    
    console.log('Impact data updated:', impactData);
}

// Update displayed metrics
function updateDisplayedMetrics() {
    // Update total users
    const userElements = document.querySelectorAll('[data-metric="users"]');
    userElements.forEach(el => {
        el.textContent = (impactData.totalUsers / 100000).toFixed(1) + ' लाख+';
    });
    
    // Update total trade value
    const tradeElements = document.querySelectorAll('[data-metric="trade"]');
    tradeElements.forEach(el => {
        el.textContent = '₹' + (impactData.totalTrade / 10000000).toFixed(0) + ' करोड़+';
    });
    
    // Update other metrics as needed
    console.log('Display metrics updated');
}

// Track user interactions for analytics
function trackImpactInteraction(action, category) {
    const interaction = {
        action: action,
        category: category,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenSize: `${window.screen.width}x${window.screen.height}`
    };
    
    console.log('Impact interaction tracked:', interaction);
    
    // In real app, send to analytics service
    // analytics.track('impact_interaction', interaction);
}

// Add click tracking to impact elements
document.addEventListener('DOMContentLoaded', function() {
    // Track category views
    const categories = document.querySelectorAll('.impact-category');
    categories.forEach((category, index) => {
        category.addEventListener('click', () => {
            const categoryName = category.querySelector('h3').textContent;
            trackImpactInteraction('category_view', categoryName);
        });
    });
    
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.cta-buttons button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();
            trackImpactInteraction('cta_click', buttonText);
        });
    });
    
    // Track share clicks
    const shareButton = document.querySelector('.share-impact-btn');
    if (shareButton) {
        shareButton.addEventListener('click', () => {
            trackImpactInteraction('share_click', 'impact_summary');
        });
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger specific animations based on element type
            if (entry.target.classList.contains('impact-category')) {
                // Animate metrics in this category
                const metrics = entry.target.querySelectorAll('.metric-item');
                metrics.forEach((metric, index) => {
                    setTimeout(() => {
                        metric.style.animation = 'impactFadeIn 0.5s ease-out';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe impact elements
document.addEventListener('DOMContentLoaded', function() {
    const impactElements = document.querySelectorAll('.impact-category, .community-impact, .regional-impact, .future-goals');
    impactElements.forEach(element => {
        observer.observe(element);
    });
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Recalculate progress circles if needed
    setupProgressCircles();
});

// Export functions for use in other scripts
window.impactFunctions = {
    shareImpact,
    joinCommunity,
    shareSuccess,
    updateImpactData,
    trackImpactInteraction
};