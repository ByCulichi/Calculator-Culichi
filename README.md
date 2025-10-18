# Calculator Culichi - React + TypeScript

Modern iOS-inspired calculator application built with React, TypeScript, Vite, and Tailwind CSS. Migrated from vanilla HTML/CSS/JS to a modern stack with improved accessibility, decimal precision, and comprehensive testing.

## 📸 Screenshots

### Initial State
![Calculator Initial State](https://github.com/user-attachments/assets/6114fd21-9761-4dac-b3cc-0dee0dd15ed8)

### Active Operator
![Calculator with Active Operator](https://github.com/user-attachments/assets/59eb5af4-dc1e-480f-a414-52b3cb224c77)

### Calculation Result
![Calculator Showing Result](https://github.com/user-attachments/assets/fc6c95f9-4a78-4f04-9bf1-99b4089f5bc1)

## 🚀 Features

### Core Functionality
- ✅ **Basic Operations**: Addition, subtraction, multiplication, division
- ✅ **Decimal Precision**: Uses `decimal.js-light` to avoid floating-point errors (e.g., 0.1 + 0.2 = 0.3)
- ✅ **Scientific Functions**: sin, cos, tan, log, ln, √, x², π, e
- ✅ **Unit Conversions**: Temperature (°C→°F), Distance (km→mi, m→ft), Weight (kg→lb)
- ✅ **Calculation History**: Automatically stores calculations
- ✅ **Keyboard Support**: Full keyboard navigation and shortcuts

### Accessibility
- ✅ **ARIA Labels**: Proper roles and labels for screen readers
- ✅ **Keyboard Navigation**: Complete keyboard support with intuitive shortcuts
- ✅ **Live Regions**: Screen reader announcements for display updates (`aria-live="polite"`)
- ✅ **Focus States**: Clear visual focus indicators for accessibility

## 🛠️ Tech Stack

- **Framework**: React 19
- **Language**: TypeScript (strict mode)
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **Decimal Math**: decimal.js-light
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier

## 📦 Getting Started

### Prerequisites
- Node.js 18+ or Bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd calculator-culichi

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types
```

## 🎯 Keyboard Shortcuts

| Key | Function |
|-----|----------|
| `0-9` | Number input |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `Enter` or `=` | Calculate result |
| `Escape` | Clear (AC) |
| `Backspace` | Delete last digit |
| `.` | Decimal point |
| `%` | Percentage |

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run all tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm run test:watch
```

### Test Coverage
- **Calculator Engine**: 98.78% (core arithmetic logic)
- **Components**: 95.16% (UI components)
- **Total**: >90% coverage on critical calculation logic

### Test Categories
1. **Unit Tests**: Calculator engine functions (arithmetic, scientific, conversions)
2. **Integration Tests**: useCalculator hook with state management
3. **Component Tests**: User interactions and keyboard inputs

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # React components
│   ├── Calculator.tsx   # Main calculator container
│   ├── Display.tsx      # Display screen
│   ├── Keypad.tsx       # Button grid
│   └── Button.tsx       # Individual button
├── hooks/              # Custom React hooks
│   └── useCalculator.ts # Calculator state management
├── utils/              # Utility functions
│   └── calculator-engine.ts # Pure calculation logic
├── types/              # TypeScript type definitions
│   └── calculator.ts   # Calculator types
└── test/               # Test setup
    └── setup.ts        # Vitest configuration
```

### Key Design Decisions

1. **Decimal Precision**: 
   - Used `decimal.js-light` instead of JavaScript's native floating-point math
   - Ensures accurate calculations (e.g., `0.1 + 0.2 = 0.3`)
   - Handles edge cases like division by zero

2. **State Management**:
   - Used `useReducer` for predictable state updates
   - Pure functions for all calculations
   - Separated UI logic from calculation logic

3. **Accessibility**:
   - Full ARIA support with proper roles and labels
   - Keyboard navigation matches calculator UX expectations
   - Screen reader announcements for display updates

4. **Testing Strategy**:
   - Unit tests for pure calculation functions
   - Integration tests for state management
   - Component tests for user interactions
   - >90% coverage on critical logic

## 🎨 Styling

The calculator uses Tailwind CSS with a custom color palette inspired by iOS:

- **Background**: Light gray (`#F5F5F5`)
- **Panel**: Black (`#000000`)
- **Number Buttons**: Dark gray (`#333333`)
- **Function Buttons**: Light gray (`#A6A6A6`)
- **Operator Buttons**: Orange (`#FF9500`)

Responsive design adapts to mobile, tablet, and desktop screens.

## 📊 Differences from Original Version

### Improvements ✅
1. **Decimal Precision**: No more floating-point errors
2. **Type Safety**: Full TypeScript support with strict mode
3. **Testing**: 53 comprehensive tests with >90% coverage on core logic
4. **Accessibility**: Enhanced ARIA support and keyboard navigation
5. **Modern Build**: Vite for faster development and optimized builds
6. **Code Quality**: ESLint + Prettier for consistent code style
7. **Component Architecture**: Modular, reusable React components

### Changes 🔄
1. **Removed**: Splash screen, sidebar history, FAB menu (simplified initial version)
2. **Simplified**: Focused on core calculator functionality first
3. **Enhanced**: Better keyboard support and accessibility features

### Future Enhancements 🚀
- [ ] Calculation history sidebar
- [ ] Scientific mode toggle
- [ ] Unit conversion mode
- [ ] Theme customization (light/dark)
- [ ] PWA support for offline usage

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Deploy to Replit
The app is configured to run on Replit with:
- Development server on port 5000
- Autoscale deployment for production
- Static asset optimization

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Original Author

**Christian (ByCulichi)**
- GitHub: [@ByCulichi](https://github.com/ByCulichi)
- Original Project: [Calculator-Culichi](https://github.com/ByCulichi/Calculator-Culichi)

## 🙏 Acknowledgments

- Original vanilla version by Christian (ByCulichi)
- iOS calculator design inspiration
- React and TypeScript communities
- Testing best practices from Kent C. Dodds

---

*Migrated to React + TypeScript + Vite with ❤️ for better performance, accessibility, and developer experience*
