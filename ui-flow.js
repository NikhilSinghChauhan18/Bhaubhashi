// UI Flow Documentation functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('UI Flow documentation initialized');
    setupFlowInteractions();
    animateFlowElements();
});

// Setup interactive elements
function setupFlowInteractions() {
    // Add click handlers for journey steps
    const journeySteps = document.querySelectorAll('.journey-step');
    journeySteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            highlightStep(step, index);
        });
    });

    // Add hover effects for action flows
    const actionFlows = document.querySelectorAll('.action-flow');
    actionFlows.forEach(flow => {
        flow.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.background = '#e8f4fd';
        });
        
        flow.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.background = '#f8f9fa';
        });
    });

    // Add click handlers for navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            showNavDetails(this);
        });
    });
}

// Highlight selected step
function highlightStep(step, index) {
    // Remove previous highlights
    document.querySelectorAll('.journey-step').forEach(s => {
        s.classList.remove('highlighted');
    });
    
    // Add highlight to selected step
    step.classList.add('highlighted');
    
    // Log interaction
    console.log(`Journey step ${index + 1} selected`);
    
    // Show step details in a modal or expanded view
    showStepDetails(step, index);
}

// Show step details
function showStepDetails(step, index) {
    const stepTitle = step.querySelector('h4').textContent;
    const stepType = step.querySelector('.step-type').textContent;
    
    // Create details overlay
    const overlay = document.createElement('div');
    overlay.className = 'step-details-overlay';
    overlay.innerHTML = `
        <div class="step-details-modal">
            <div class="modal-header">
                <h3>Step ${index + 1}: ${stepTitle}</h3>
                <button class="close-modal" onclick="closeStepDetails()">×</button>
            </div>
            <div class="modal-content">
                <div class="step-type-badge">${stepType}</div>
                <p>This step represents a key interaction point in the user journey.</p>
                <div class="step-navigation">
                    <button class="nav-btn prev" onclick="navigateStep(${index - 1})" ${index === 0 ? 'disabled' : ''}>
                        ← Previous Step
                    </button>
                    <button class="nav-btn next" onclick="navigateStep(${index + 1})">
                        Next Step →
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add styles for the overlay
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    `;
}

// Close step details
function closeStepDetails() {
    const overlay = document.querySelector('.step-details-overlay');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// Navigate between steps
function navigateStep(stepIndex) {
    const steps = document.querySelectorAll('.journey-step');
    if (stepIndex >= 0 && stepIndex < steps.length) {
        closeStepDetails();
        setTimeout(() => {
            highlightStep(steps[stepIndex], stepIndex);
            steps[stepIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}

// Show navigation details
function showNavDetails(navItem) {
    const navLabel = navItem.querySelector('.nav-label').textContent;
    const navDesc = navItem.querySelector('.nav-desc').textContent;
    
    // Highlight the nav item temporarily
    navItem.style.background = '#e8f4fd';
    navItem.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        navItem.style.background = '#f8f9fa';
        navItem.style.transform = 'scale(1)';
    }, 500);
    
    console.log(`Navigation: ${navLabel} - ${navDesc}`);
}

// Animate flow elements on scroll
function animateFlowElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate step numbers
                if (entry.target.classList.contains('journey-step')) {
                    const stepNumber = entry.target.querySelector('.step-number');
                    if (stepNumber) {
                        stepNumber.style.animation = 'bounceIn 0.6s ease-out';
                    }
                }
                
                // Animate feature items
                const featureItems = entry.target.querySelectorAll('.feature-item');
                featureItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = 'slideInLeft 0.4s ease-out';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all journey steps and major sections
    const elementsToObserve = document.querySelectorAll('.journey-step, .navigation-flow, .design-principles, .technical-architecture, .success-metrics');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Share flow functionality
function shareFlow() {
    const flowSummary = `🚀 Bahubhashi Mandi - Mobile-First UI Flow

📱 Complete user journey designed for Indian local markets
🗣️ AI-powered multilingual experience across 8 languages
🤝 Transparent negotiation with fair pricing

Key Screens:
1. 🏠 Home - User type selection
2. 🏪 Product Listing - Browse mandi goods
3. 📋 Product Detail - AI price recommendations
4. 💬 Chat - Multilingual negotiation
5. 📊 Dashboard - Analytics & insights
6. 🌟 Impact - Community benefits

Built with mobile-first principles for rural connectivity and cultural adaptation.

#BahubhashiMandi #MobileFirst #UIFlow #LocalTrade`;

    if (navigator.share) {
        navigator.share({
            title: 'Bahubhashi Mandi - UI Flow',
            text: flowSummary,
            url: window.location.href
        }).then(() => {
            console.log('UI Flow shared successfully');
        }).catch((error) => {
            console.log('Error sharing UI flow:', error);
            fallbackShareFlow(flowSummary);
        });
    } else {
        fallbackShareFlow(flowSummary);
    }
}

// Fallback share function
function fallbackShareFlow(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showFlowToast('UI Flow copied to clipboard!');
        });
    } else {
        // Create temporary textarea for copying
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showFlowToast('UI Flow copied to clipboard!');
    }
}

// Show toast notification
function showFlowToast(message) {
    const toast = document.createElement('div');
    toast.className = 'flow-toast';
    toast.textContent = message;
    
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

// Add CSS animations
const flowAnimations = document.createElement('style');
flowAnimations.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
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
    
    @keyframes toastSlideUp {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    
    .journey-step.highlighted {
        border-left-width: 8px;
        box-shadow: 0 8px 30px rgba(52, 152, 219, 0.3);
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
    
    .step-details-modal {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #ecf0f1;
    }
    
    .close-modal {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #7f8c8d;
    }
    
    .step-type-badge {
        background: #3498db;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        display: inline-block;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        font-weight: 600;
    }
    
    .step-navigation {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
    }
    
    .nav-btn {
        flex: 1;
        padding: 0.75rem 1rem;
        border: 2px solid #3498db;
        background: white;
        color: #3498db;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .nav-btn:hover:not(:disabled) {
        background: #3498db;
        color: white;
    }
    
    .nav-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

document.head.appendChild(flowAnimations);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeStepDetails();
    }
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const currentHighlighted = document.querySelector('.journey-step.highlighted');
        if (currentHighlighted) {
            const steps = Array.from(document.querySelectorAll('.journey-step'));
            const currentIndex = steps.indexOf(currentHighlighted);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                navigateStep(currentIndex - 1);
            } else if (e.key === 'ArrowRight' && currentIndex < steps.length - 1) {
                navigateStep(currentIndex + 1);
            }
        }
    }
});

// Performance monitoring for flow interactions
function trackFlowInteraction(action, element) {
    const interaction = {
        action: action,
        element: element,
        timestamp: new Date().toISOString(),
        viewport: `${window.innerWidth}x${window.innerHeight}`
    };
    
    console.log('Flow interaction:', interaction);
    
    // In real app, send to analytics
    // analytics.track('ui_flow_interaction', interaction);
}

// Export functions for external use
window.uiFlowFunctions = {
    shareFlow,
    highlightStep,
    navigateStep,
    trackFlowInteraction
};