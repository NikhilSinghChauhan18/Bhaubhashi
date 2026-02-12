# Bahubhashi Mandi - बहुभाषी मंडी

**Bridging Languages in Local Trade with AI**

A mobile-first web application designed for Indian local markets (mandis) that helps vendors and buyers communicate across language barriers using AI-powered translation and fair pricing recommendations.

## Features

### 🏪 Core Functionality
- **Dual User Interface**: Separate flows for vendors and buyers
- **Multi-language Support**: Hindi, English, Punjabi, Gujarati, Marathi, Tamil, Telugu, Bengali
- **AI Price Recommendations**: Smart pricing suggestions based on market data
- **Trust Indicators**: Vendor verification and rating system
- **Product Catalog**: Local mandi goods with quality grades

### 📱 Mobile-First Design
- **Low Bandwidth Optimized**: Minimal data usage for rural connectivity
- **Large Touch Targets**: Easy navigation for all age groups
- **Simple Icons**: Universal symbols for better understanding
- **Offline Support**: Basic functionality without internet

### 🎨 Bharat-Centric Design
- **Indian Language Fonts**: Noto Sans Devanagari for proper script rendering
- **Cultural Colors**: Saffron and green color scheme
- **Local Context**: Familiar terminology and measurement units
- **Accessibility**: High contrast mode and screen reader support

## File Structure

```
bahubhashi-mandi/
├── .kiro/                 # Kiro generation metadata (mandatory)
├── index.html             # Home screen with user type selection
├── product-listing.html   # Product catalog with search and filters
├── product-detail.html    # Detailed product view with AI pricing
├── dashboard.html         # User dashboard with analytics
├── styles.css             # Complete styling with mobile-first approach
├── script.js              # JavaScript functionality and navigation
└── README.md              # This documentation
```

## Screens Overview

### 1. Home Screen (`index.html`)
- **User Type Selection**: Choose between Vendor (विक्रेता) or Buyer (खरीदार)
- **Language Selector**: Access to 8 Indian languages
- **Clean Branding**: App logo and tagline

### 2. Product Listing (`product-listing.html`)
- **Search Bar**: Find products by name or vendor
- **Category Filters**: Vegetables, Fruits, Grains, Spices
- **Product Cards**: Price, quality grade, vendor info, trust score
- **Price Trends**: Visual indicators for price changes

### 3. Product Detail (`product-detail.html`)
- **AI Price Recommendation**: Smart pricing range with market insights
- **Product Information**: Quality, origin, harvest date, availability
- **Trust Indicators**: Verified vendor, quality certification, secure payment
- **Customer Reviews**: Recent feedback from buyers
- **Action Buttons**: Contact vendor, add to cart

### 4. Language Selection
- **8 Indian Languages**: Complete localization support
- **Flag Icons**: Visual language identification
- **Easy Navigation**: Simple grid layout

### 5. Dashboard (`dashboard.html`)
- **User Profile**: Vendor/buyer information and statistics
- **Fair Price Indicators**: Today's recommended prices
- **Trust Score**: Detailed breakdown of vendor ratings
- **Recent Activity**: Transaction history and reviews
- **Market Trends**: Price movements and demand patterns
- **Quick Actions**: Common tasks and settings

## Technical Features

### 🔧 Performance Optimizations
- **Minimal CSS**: Efficient styling without frameworks
- **Optimized Images**: Emoji icons for zero bandwidth
- **Service Worker**: Offline functionality
- **Touch Gestures**: Swipe navigation support

### 🌐 Accessibility
- **Screen Reader Support**: Proper ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast Mode**: Better visibility for users with visual impairments
- **Large Text**: Readable fonts for all age groups

### 📊 AI Features
- **Price Recommendations**: Market-based pricing suggestions
- **Quality Assessment**: Automated product grading
- **Market Insights**: Weather, transport, and demand analysis
- **Trust Scoring**: Vendor reliability algorithms

## Usage Instructions

### For Vendors (विक्रेता)
1. Select "विक्रेता" on home screen
2. Browse product listings to see market prices
3. Add your products with competitive pricing
4. Monitor dashboard for sales analytics
5. Respond to buyer inquiries through chat

### For Buyers (खरीदार)
1. Select "खरीदार" on home screen
2. Search for products using filters
3. Check AI price recommendations
4. Review vendor trust scores
5. Contact vendors or add items to cart

### Language Support
- Tap "भाषा बदलें" to change interface language
- All 8 languages maintain consistent functionality
- Text input supports local scripts

## Development Notes

### Design Principles
- **Mobile-First**: All layouts optimized for small screens
- **Low-Bandwidth**: Minimal external resources
- **Cultural Sensitivity**: Appropriate colors, fonts, and terminology
- **Simplicity**: Clear navigation and large touch targets

### Browser Support
- Modern mobile browsers (Chrome, Firefox, Safari)
- Progressive Web App capabilities
- Offline functionality through service workers

### Future Enhancements
- Voice input in local languages
- Image recognition for product quality
- Integration with payment gateways
- GPS-based vendor location
- Bulk order management
- Seasonal price predictions

## Installation

1. Clone or download the project files
2. Open `index.html` in a web browser
3. For development, use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```
4. Access at `http://localhost:8000`

## Contributing

This project is designed to serve Indian farmers and local traders. Contributions should focus on:
- Language accuracy and cultural appropriateness
- Mobile performance optimization
- Accessibility improvements
- AI algorithm enhancements

---

**Built by Team: Bit-Storm with ❤️ for Indian farmers and traders**


*Supporting digital inclusion in rural markets through technology*
