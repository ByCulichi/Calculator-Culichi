# Calculator Culichi 🧮

![Calculator Screenshot](https://github.com/user-attachments/assets/eeff208a-3c70-46ac-9c38-169f5b9db105)

> A sophisticated iOS-inspired calculator web application with multiple calculation modes and advanced features.

## ✨ Features

### 🔢 **Three Calculation Modes**
- **Basic Mode**: Standard arithmetic operations for everyday calculations
- **Scientific Mode**: Advanced mathematical functions for complex calculations  
- **Conversion Mode**: Unit conversions for practical applications

### 🧮 **Basic Operations**
- ➕ **Addition, Subtraction, Multiplication, Division** - All standard arithmetic operations
- 🔢 **Decimal Point Support** - Handle floating point numbers with precision
- ➕➖ **Plus/Minus Toggle** - Quickly switch between positive and negative numbers
- 📊 **Percentage Calculations** - Convert numbers to percentages instantly
- ↩️ **Backspace Function** - Delete individual digits for easy correction

### 🔬 **Scientific Functions**
- 📐 **Trigonometric Functions**: `sin`, `cos`, `tan` (input in degrees)
- 📈 **Logarithmic Functions**: `log` (base 10), `ln` (natural logarithm)
- √ **Root Functions**: Square root (`√`) and power functions (`x²`)
- 🔢 **Mathematical Constants**: π (Pi) and e (Euler's number)

### 🔄 **Unit Conversions**
- 🌡️ **Temperature**: Celsius to Fahrenheit (`°C→°F`)
- 📏 **Distance**: Kilometers to Miles (`km→mi`), Meters to Feet (`m→ft`)
- ⚖️ **Weight**: Kilograms to Pounds (`kg→lb`)

### 💾 **History & Memory**
- 📋 **Calculation History** - Automatic storage of all calculations
- ✏️ **Edit Previous Calculations** - Reload last calculation for editing
- 🗑️ **Clear History** - Remove all stored calculations with confirmation
- 📅 **Time-based Filtering** - View calculations from last 7 days or 30 days

### ⌨️ **Keyboard Support**
Full keyboard navigation and input support:
- **Numbers**: `0-9` for digit input
- **Operations**: `+`, `-`, `*`, `/` for mathematical operations
- **Functions**: `Enter` or `=` for equals, `Escape` for clear, `Backspace` for delete
- **Special**: `.` for decimal point, `%` for percentage

### 🎨 **Modern UI/UX**
- 📱 **iOS-Inspired Design** - Familiar calculator interface with modern aesthetics
- 🌑 **Dark Theme** - Easy on the eyes with high contrast for visibility
- 🟠 **Orange Accent Colors** - Distinctive operator buttons following iOS design
- ↗️ **Smooth Animations** - Fluid transitions and responsive feedback
- 📲 **Responsive Layout** - Adapts to different screen sizes and devices
- ♿ **Accessibility** - Proper ARIA labels and keyboard navigation

## 🚀 Quick Start

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/ByCulichi/Calculator-Culichi.git
   cd Calculator-Culichi
   ```

2. **Open in browser**:
   - Simply open `index.html` in any modern web browser
   - Or use a local server for optimal performance:
   ```bash
   # Using Python
   python -m http.server 8000
   # Then visit http://localhost:8000
   
   # Using Node.js
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```

### Usage

1. **Basic Calculations**: Use the numeric keypad and operator buttons for standard math
2. **Mode Switching**: Tap the mode selector at the bottom to switch between Basic, Scientific, and Conversion modes
3. **History Access**: Click the hamburger menu (☰) in the top-left to view calculation history
4. **Keyboard Input**: Use your physical keyboard for faster input
5. **Unit Conversion**: Switch to Conversion mode and input a value, then tap the conversion button

## 🎯 Keyboard Shortcuts

| Key | Function |
|-----|----------|
| `0-9` | Number input |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `=` or `Enter` | Calculate result |
| `Escape` | Clear (AC) |
| `Backspace` | Delete last digit |
| `.` | Decimal point |
| `%` | Percentage |

## 🛠️ Technical Specifications

### Technologies Used
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with custom properties (CSS variables), Grid layout, and animations
- **Vanilla JavaScript**: Pure JavaScript (ES6+) with no external dependencies

### Browser Compatibility
- ✅ **Chrome/Edge**: 88+ (Full support)
- ✅ **Firefox**: 78+ (Full support) 
- ✅ **Safari**: 14+ (Full support)
- ✅ **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 88+

### Performance Features
- 🚀 **Zero Dependencies** - No external libraries, loads instantly
- 💾 **Local Storage** - History persisted in browser storage
- ⚡ **Lightweight** - Total size < 50KB for all assets
- 📱 **PWA Ready** - Can be installed as a mobile app

## 📁 Project Structure

```
Calculator-Culichi/
├── index.html          # Main HTML structure with comprehensive comments
├── style.css           # Complete styling with CSS variables and responsive design
├── script.js           # Calculator logic with detailed JSDoc documentation  
├── iconoCalaculadora.jpg # Calculator icon for branding
├── Animation.gif       # Demo animation for README
└── README.md          # This documentation file
```

## 🔧 Code Architecture

### JavaScript Modules
- **Global State Management**: `buffer`, `runningTotal`, `previousOperator`, `calculatorHistory`
- **Core Functions**: Calculation logic, screen updates, operation handling
- **UI Controllers**: Sidebar management, mode switching, history operations
- **Event Handlers**: Button clicks, keyboard input, splash screen management
- **Utility Functions**: Message display, validation, format conversion

### CSS Organization  
- **CSS Custom Properties**: Centralized theming and color management
- **Component Styling**: Modular styles for calculator, sidebar, buttons
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Animations**: Smooth transitions and hover effects

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Christian (ByCulichi)**
- GitHub: [@ByCulichi](https://github.com/ByCulichi)

---

*Built with ❤️ and modern web technologies*
