// Global state
let currentScreen = 'home-screen';
let selectedLanguage = 'hi';
let userType = null;

// Screen navigation functions
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
    }
}

function goBack() {
    // Simple back navigation logic
    switch(currentScreen) {
        case 'language-screen':
            showScreen('home-screen');
            break;
        case 'product-listing-screen':
            showScreen('home-screen');
            break;
        case 'product-detail-screen':
            showScreen('product-listing-screen');
            break;
        case 'dashboard-screen':
            showScreen('product-listing-screen');
            break;
        default:
            showScreen('home-screen');
    }
}

// User type selection
function selectUserType(type) {
    userType = type;
    console.log(`Selected user type: ${type}`);
    
    // Navigate to product listing
    window.location.href = 'product-listing.html';
}

// Language selection
function showLanguageScreen() {
    showScreen('language-screen');
}

function selectLanguage(langCode) {
    selectedLanguage = langCode;
    console.log(`Selected language: ${langCode}`);
    
    // Update UI text based on selected language
    updateLanguageText(langCode);
    
    // Go back to previous screen
    goBack();
}

// Product filtering
function toggleFilters() {
    const filterChips = document.getElementById('filterChips');
    if (filterChips) {
        filterChips.style.display = filterChips.style.display === 'none' ? 'flex' : 'none';
    }
}

// Filter products by category
document.addEventListener('DOMContentLoaded', function() {
    const filterChips = document.querySelectorAll('.chip');
    const productCards = document.querySelectorAll('.product-card');
    
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active class from all chips
            filterChips.forEach(c => c.classList.remove('active'));
            // Add active class to clicked chip
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter products
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                const vendorName = card.querySelector('.vendor-name').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || vendorName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// Product detail navigation
function showProductDetail(productId) {
    console.log(`Showing product detail for: ${productId}`);
    window.location.href = 'product-detail.html';
}

// Dashboard navigation
function showDashboard() {
    window.location.href = 'dashboard.html';
}

function showProductListing() {
    window.location.href = 'product-listing.html';
}

// Product detail actions
function contactVendor() {
    // Simulate contact action
    alert('विक्रेता से संपर्क कर रहे हैं...\nContact vendor functionality would be implemented here.');
}

function addToCart() {
    // Simulate add to cart action
    alert('कार्ट में जोड़ा गया!\nProduct added to cart successfully.');
}

// Language text updates
function updateLanguageText(langCode) {
    const translations = {
        'hi': {
            'title': 'बहुभाषी मंडी',
            'tagline': 'AI के साथ स्थानीय व्यापार में भाषाओं को जोड़ना',
            'whoAreYou': 'आप कौन हैं?',
            'vendor': 'विक्रेता',
            'buyer': 'खरीदार',
            'sellGoods': 'अपना माल बेचें',
            'buyGoods': 'सामान खरीदें'
        },
        'en': {
            'title': 'Bahubhashi Mandi',
            'tagline': 'Bridging Languages in Local Trade with AI',
            'whoAreYou': 'Who are you?',
            'vendor': 'Vendor',
            'buyer': 'Buyer',
            'sellGoods': 'Sell your goods',
            'buyGoods': 'Buy goods'
        },
        'pa': {
            'title': 'ਬਹੁਭਾਸ਼ੀ ਮੰਡੀ',
            'tagline': 'AI ਨਾਲ ਸਥਾਨਕ ਵਪਾਰ ਵਿੱਚ ਭਾਸ਼ਾਵਾਂ ਨੂੰ ਜੋੜਨਾ',
            'whoAreYou': 'ਤੁਸੀਂ ਕੌਣ ਹੋ?',
            'vendor': 'ਵਿਕਰੇਤਾ',
            'buyer': 'ਖਰੀਦਦਾਰ',
            'sellGoods': 'ਆਪਣਾ ਮਾਲ ਵੇਚੋ',
            'buyGoods': 'ਸਾਮਾਨ ਖਰੀਦੋ'
        }
    };
    
    const texts = translations[langCode] || translations['hi'];
    
    // Update text elements if they exist
    const titleElement = document.querySelector('.logo h1');
    if (titleElement) titleElement.textContent = texts.title;
    
    const taglineElement = document.querySelector('.tagline');
    if (taglineElement) taglineElement.textContent = texts.tagline;
    
    // Update other text elements as needed
    console.log(`Language updated to: ${langCode}`);
}

// Utility functions
function formatPrice(price) {
    return `₹${price.toLocaleString('hi-IN')}`;
}

function formatDate(date) {
    return new Intl.DateTimeFormat('hi-IN').format(date);
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bahubhashi Mandi app initialized');
    
    // Set initial language
    updateLanguageText(selectedLanguage);
    
    // Add click handlers for navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
});

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Handle online/offline status
window.addEventListener('online', function() {
    console.log('App is online');
    // Show online indicator
});

window.addEventListener('offline', function() {
    console.log('App is offline');
    // Show offline indicator and cached content
});

// Touch and gesture support for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    if (!touchStartX || !touchStartY) {
        return;
    }
    
    let touchEndX = e.changedTouches[0].clientX;
    let touchEndY = e.changedTouches[0].clientY;
    
    let diffX = touchStartX - touchEndX;
    let diffY = touchStartY - touchEndY;
    
    // Swipe right to go back
    if (Math.abs(diffX) > Math.abs(diffY) && diffX < -50) {
        goBack();
    }
    
    // Reset values
    touchStartX = 0;
    touchStartY = 0;
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key to go back
    if (e.key === 'Escape') {
        goBack();
    }
    
    // Enter key to activate focused element
    if (e.key === 'Enter' && document.activeElement) {
        document.activeElement.click();
    }
});

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

measurePerformance();
// Chat navigation function
function openChat() {
    window.location.href = 'chat.html';
}

// Enhanced contact vendor function to open chat
function contactVendor() {
    // Navigate to chat instead of showing alert
    window.location.href = 'chat.html';
}
// Impact screen navigation
function showImpact() {
    window.location.href = 'impact.html';
}
// Start Trading function for index page CTA
function startTrading() {
    console.log('Starting trading flow');
    window.location.href = 'product-listing.html';
}