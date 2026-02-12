// Demo functionality for Bahubhashi Mandi
let currentDemoScreen = 'home';
let selectedUserType = null;
let isAutoPlaying = false;
let autoPlayInterval = null;
let demoProgress = 0;

// Demo screens sequence
const demoSequence = ['home', 'listing', 'detail', 'chat', 'success'];

// Initialize demo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bahubhashi Mandi Demo initialized');
    setupDemoInteractions();
    animateImpactStats();
    updateNavDots();
});

// Setup demo interactions
function setupDemoInteractions() {
    // Add click handlers for feature highlights
    const featureHighlights = document.querySelectorAll('.feature-highlight');
    featureHighlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        highlight.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add hover effects for demo cards
    const demoCards = document.querySelectorAll('.demo-user-card, .demo-product-card');
    demoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Navigate to demo screen
function goToDemoScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen-content').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenName + 'Demo');
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentDemoScreen = screenName;
        
        // Update progress
        demoProgress = demoSequence.indexOf(screenName);
        updateNavDots();
        
        // Add screen-specific animations
        addScreenAnimations(screenName);
        
        console.log(`Demo screen changed to: ${screenName}`);
    }
}

// Update navigation dots
function updateNavDots() {
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach((dot, index) => {
        if (index === demoProgress) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Add screen-specific animations
function addScreenAnimations(screenName) {
    const screen = document.getElementById(screenName + 'Demo');
    if (!screen) return;
    
    // Reset animation
    screen.style.animation = 'none';
    
    // Trigger reflow
    screen.offsetHeight;
    
    // Add animation based on screen type
    switch(screenName) {
        case 'home':
            screen.style.animation = 'slideInFromLeft 0.5s ease-out';
            break;
        case 'listing':
            screen.style.animation = 'slideInFromRight 0.5s ease-out';
            animateProductCards();
            break;
        case 'detail':
            screen.style.animation = 'slideInFromBottom 0.5s ease-out';
            animatePriceBar();
            break;
        case 'chat':
            screen.style.animation = 'slideInFromTop 0.5s ease-out';
            animateChatMessages();
            break;
        case 'success':
            screen.style.animation = 'bounceIn 0.6s ease-out';
            animateSuccessElements();
            break;
    }
}

// Animate product cards
function animateProductCards() {
    const productCards = document.querySelectorAll('.demo-product-card');
    productCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'slideInLeft 0.4s ease-out';
        }, index * 200);
    });
}

// Animate price bar
function animatePriceBar() {
    setTimeout(() => {
        const priceBar = document.querySelector('.price-bar');
        if (priceBar) {
            priceBar.style.animation = 'expandWidth 1s ease-out';
        }
        
        const currentPrice = document.querySelector('.price-current');
        if (currentPrice) {
            setTimeout(() => {
                currentPrice.style.animation = 'bounceIn 0.5s ease-out';
            }, 500);
        }
    }, 300);
}

// Animate chat messages
function animateChatMessages() {
    const messages = document.querySelectorAll('.demo-message, .demo-ai-assistance, .demo-price-analysis');
    messages.forEach((message, index) => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            message.style.transition = 'all 0.4s ease-out';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, index * 800);
    });
}

// Animate success elements
function animateSuccessElements() {
    const successIcon = document.querySelector('.success-icon');
    if (successIcon) {
        successIcon.style.animation = 'bounceIn 0.8s ease-out';
    }
    
    const benefits = document.querySelectorAll('.benefit');
    benefits.forEach((benefit, index) => {
        setTimeout(() => {
            benefit.style.animation = 'slideInUp 0.4s ease-out';
        }, index * 200 + 500);
    });
}

// Select demo user type
function selectDemoUser(userType) {
    selectedUserType = userType;
    
    // Update UI
    document.querySelectorAll('.demo-user-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    event.target.closest('.demo-user-card').classList.add('selected');
    
    // Enable start button
    const startBtn = document.querySelector('.demo-start-btn');
    if (startBtn) {
        startBtn.style.opacity = '1';
        startBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            startBtn.style.transform = 'scale(1)';
        }, 200);
    }
    
    console.log(`Selected user type: ${userType}`);
}

// Start demo flow
function startDemo() {
    if (!selectedUserType) {
        // Auto-select buyer for demo
        selectDemoUser('buyer');
    }
    
    // Navigate to product listing
    goToDemoScreen('listing');
    
    // Track demo start
    trackDemoInteraction('demo_started', { userType: selectedUserType });
}

// Show feature demo
function showFeatureDemo(featureType) {
    // Hide all feature demos
    document.querySelectorAll('.feature-demo-content').forEach(demo => {
        demo.classList.remove('active');
    });
    
    // Show selected feature demo
    const targetDemo = document.getElementById(featureType + 'Demo');
    if (targetDemo) {
        targetDemo.classList.add('active');
        
        // Scroll to feature demo section
        document.getElementById('featureDemo').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add specific animations for each feature
        addFeatureAnimations(featureType);
    }
    
    console.log(`Showing feature demo: ${featureType}`);
}

// Add feature-specific animations
function addFeatureAnimations(featureType) {
    switch(featureType) {
        case 'multilingual':
            animateLanguageExample();
            break;
        case 'ai-pricing':
            animatePricingAnalysis();
            break;
        case 'trust':
            animateTrustIndicators();
            break;
    }
}

// Animate language example
function animateLanguageExample() {
    const langInput = document.querySelector('.lang-input');
    const translationArrow = document.querySelector('.translation-arrow');
    const langOutput = document.querySelector('.lang-output');
    
    if (langInput && translationArrow && langOutput) {
        // Reset states
        langInput.style.opacity = '0';
        translationArrow.style.opacity = '0';
        langOutput.style.opacity = '0';
        
        // Animate sequence
        setTimeout(() => {
            langInput.style.transition = 'opacity 0.5s ease-out';
            langInput.style.opacity = '1';
        }, 200);
        
        setTimeout(() => {
            translationArrow.style.transition = 'opacity 0.5s ease-out';
            translationArrow.style.opacity = '1';
            translationArrow.style.animation = 'pulse 1s ease-out';
        }, 800);
        
        setTimeout(() => {
            langOutput.style.transition = 'opacity 0.5s ease-out';
            langOutput.style.opacity = '1';
        }, 1400);
    }
}

// Animate pricing analysis
function animatePricingAnalysis() {
    const dataPoints = document.querySelectorAll('.data-point');
    dataPoints.forEach((point, index) => {
        point.style.opacity = '0';
        point.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            point.style.transition = 'all 0.4s ease-out';
            point.style.opacity = '1';
            point.style.transform = 'translateX(0)';
        }, index * 150);
    });
    
    // Animate price scale
    setTimeout(() => {
        const fairRange = document.querySelector('.fair-range');
        if (fairRange) {
            fairRange.style.animation = 'expandWidth 1s ease-out';
        }
    }, 800);
}

// Animate trust indicators
function animateTrustIndicators() {
    const trustCards = document.querySelectorAll('.trust-card');
    trustCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Show negotiation success
function showNegotiationSuccess() {
    // Add success animation to the quick reply button
    const quickReply = event.target;
    quickReply.style.background = '#27ae60';
    quickReply.textContent = '✅ सौदा हो गया!';
    
    // Navigate to success screen after delay
    setTimeout(() => {
        goToDemoScreen('success');
    }, 1500);
}

// Restart demo
function restartDemo() {
    selectedUserType = null;
    demoProgress = 0;
    
    // Reset user selection
    document.querySelectorAll('.demo-user-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Go back to home
    goToDemoScreen('home');
    
    // Reset start button
    const startBtn = document.querySelector('.demo-start-btn');
    if (startBtn) {
        startBtn.style.opacity = '0.7';
    }
    
    console.log('Demo restarted');
}

// Toggle auto play
function toggleAutoPlay() {
    const autoPlayBtn = document.getElementById('autoPlayBtn');
    
    if (isAutoPlaying) {
        // Stop auto play
        clearInterval(autoPlayInterval);
        isAutoPlaying = false;
        autoPlayBtn.innerHTML = `
            <span class="control-icon">▶️</span>
            <span class="control-label">Auto Play</span>
        `;
    } else {
        // Start auto play
        isAutoPlaying = true;
        autoPlayBtn.innerHTML = `
            <span class="control-icon">⏸️</span>
            <span class="control-label">Pause</span>
        `;
        
        autoPlayInterval = setInterval(() => {
            const nextIndex = (demoProgress + 1) % demoSequence.length;
            goToDemoScreen(demoSequence[nextIndex]);
        }, 4000); // Change screen every 4 seconds
    }
}

// Reset demo
function resetDemo() {
    // Stop auto play if running
    if (isAutoPlaying) {
        toggleAutoPlay();
    }
    
    // Reset to home screen
    restartDemo();
    
    // Hide feature demos
    document.querySelectorAll('.feature-demo-content').forEach(demo => {
        demo.classList.remove('active');
    });
    
    console.log('Demo reset');
}

// Share demo
function shareDemo() {
    const demoSummary = `🚀 Bahubhashi Mandi - AI-Powered Local Trade

Experience the future of Indian local markets:

📱 Mobile-first design for rural connectivity
🗣️ 8 Indian languages with real-time translation  
🤖 AI-powered fair pricing recommendations
🤝 Trust system with verified vendors
⚡ 5-minute average deal completion
💰 15% better prices for farmers

Breaking language barriers, creating fair opportunities!

Try the interactive demo: ${window.location.href}

#BahubhashiMandi #LocalTrade #AI #Multilingual`;

    if (navigator.share) {
        navigator.share({
            title: 'Bahubhashi Mandi - Interactive Demo',
            text: demoSummary,
            url: window.location.href
        }).then(() => {
            console.log('Demo shared successfully');
            showDemoToast('Demo shared successfully!');
        }).catch((error) => {
            console.log('Error sharing demo:', error);
            fallbackShareDemo(demoSummary);
        });
    } else {
        fallbackShareDemo(demoSummary);
    }
}

// Fallback share function
function fallbackShareDemo(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showDemoToast('Demo link copied to clipboard!');
        });
    } else {
        // Create temporary textarea for copying
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showDemoToast('Demo link copied!');
    }
}

// Start full demo experience
function startFullDemo() {
    // Navigate to actual app
    window.location.href = 'index.html';
}

// Learn more function
function learnMore() {
    // Navigate to impact page
    window.location.href = 'impact.html';
}

// Animate impact statistics
function animateImpactStats() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
            }
        });
    }, { threshold: 0.5 });

    const impactSection = document.querySelector('.demo-impact');
    if (impactSection) {
        observer.observe(impactSection);
    }
}

// Animate counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number based on target
        if (target >= 100000) {
            element.textContent = (current / 100000).toFixed(1) + ' लाख+';
        } else if (target >= 50) {
            element.textContent = '₹' + Math.round(current) + ' करोड़+';
        } else {
            element.textContent = Math.round(current) + (target === 8 ? '' : '%');
        }
    }, 16);
}

// Show demo toast
function showDemoToast(message) {
    const toast = document.createElement('div');
    toast.className = 'demo-toast';
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
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
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastSlideUp 0.3s ease-out reverse';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Track demo interactions
function trackDemoInteraction(action, data = {}) {
    const interaction = {
        action: action,
        data: data,
        timestamp: new Date().toISOString(),
        screen: currentDemoScreen,
        userType: selectedUserType,
        viewport: `${window.innerWidth}x${window.innerHeight}`
    };
    
    console.log('Demo interaction:', interaction);
    
    // In real app, send to analytics
    // analytics.track('demo_interaction', interaction);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (demoProgress > 0) {
                goToDemoScreen(demoSequence[demoProgress - 1]);
            }
            break;
        case 'ArrowRight':
            if (demoProgress < demoSequence.length - 1) {
                goToDemoScreen(demoSequence[demoProgress + 1]);
            }
            break;
        case 'Home':
            goToDemoScreen('home');
            break;
        case 'End':
            goToDemoScreen('success');
            break;
        case ' ':
            e.preventDefault();
            toggleAutoPlay();
            break;
        case 'r':
        case 'R':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                resetDemo();
            }
            break;
    }
});

// Add CSS animations for demo
const demoAnimations = document.createElement('style');
demoAnimations.textContent = `
    @keyframes slideInFromLeft {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideInFromRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideInFromTop {
        from { transform: translateY(-100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideInFromBottom {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes slideInLeft {
        from { transform: translateX(-30px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideInUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes expandWidth {
        from { width: 0; }
        to { width: 60%; }
    }
    
    @keyframes toastSlideUp {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;

document.head.appendChild(demoAnimations);

// Touch gesture support
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    if (!touchStartX || !touchStartY) return;
    
    let touchEndX = e.changedTouches[0].clientX;
    let touchEndY = e.changedTouches[0].clientY;
    
    let diffX = touchStartX - touchEndX;
    let diffY = touchStartY - touchEndY;
    
    // Horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0 && demoProgress < demoSequence.length - 1) {
            // Swipe left - next screen
            goToDemoScreen(demoSequence[demoProgress + 1]);
        } else if (diffX < 0 && demoProgress > 0) {
            // Swipe right - previous screen
            goToDemoScreen(demoSequence[demoProgress - 1]);
        }
    }
    
    // Reset values
    touchStartX = 0;
    touchStartY = 0;
});

// Export functions for external use
window.demoFunctions = {
    goToDemoScreen,
    showFeatureDemo,
    selectDemoUser,
    startDemo,
    restartDemo,
    toggleAutoPlay,
    shareDemo,
    trackDemoInteraction
};