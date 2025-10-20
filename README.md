# 🎨 Tiny Accessibility Playground

![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-blueviolet)
![React](https://img.shields.io/badge/React-18.2-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6)
![License](https://img.shields.io/badge/License-MIT-green)

An interactive playground for learning and building accessible React components. Perfect for developers who want to practice creating WCAG-compliant UI components with real-time accessibility testing.

## 🌟 Features

- **Interactive Components**: Pre-built accessible components with live examples
- **Storybook Integration**: Isolated component development and documentation
- **Automated A11y Testing**: Built-in axe-core testing for WCAG compliance
- **Keyboard Navigation**: Full keyboard support demonstrations
- **Screen Reader Friendly**: Proper ARIA attributes and semantic HTML
- **TypeScript Support**: Full type safety for better DX

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/02-accessibility-playground.git
cd 02-accessibility-playground

# Install dependencies
npm install

# Start development server
npm run dev

# Or run Storybook
npm run storybook
```

## 📚 Available Components

### AccessibleDropdown

A fully accessible dropdown component with keyboard navigation.

**Features:**
- ✅ Full keyboard navigation (Arrow keys, Enter, Escape, Home, End)
- ✅ ARIA attributes (role, aria-expanded, aria-selected)
- ✅ Screen reader support
- ✅ Focus management
- ✅ Click-outside to close

**Usage:**

```tsx
import AccessibleDropdown from './components/AccessibleDropdown'

const options = [
  { id: '1', label: 'Apple' },
  { id: '2', label: 'Banana' },
  { id: '3', label: 'Cherry' },
]

function App() {
  return (
    <AccessibleDropdown
      label="Choose a fruit"
      options={options}
      onSelect={(option) => console.log(option)}
    />
  )
}
```

## 🧪 Testing

Run all tests with accessibility checks:

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📖 Storybook

View all components with interactive examples:

```bash
npm run storybook
```

Browse to `http://localhost:6006` to see:
- Component variations
- Interactive controls
- Accessibility audit results
- Usage documentation

## 🎯 Project Structure

```
src/
├── components/
│   └── AccessibleDropdown/
│       ├── AccessibleDropdown.tsx      # Component implementation
│       ├── AccessibleDropdown.css      # Component styles
│       ├── AccessibleDropdown.test.tsx # Component tests
│       └── AccessibleDropdown.stories.tsx # Storybook stories
├── test/
│   └── setup.ts                        # Test configuration
├── App.tsx                             # Main application
└── main.tsx                            # Entry point
```

## 🤝 Contributing

We love contributions! Check out our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Good First Issues

Looking for your first contribution? Check out issues labeled `good-first-issue`:

- Add new accessible components (Button, Modal, Tabs)
- Improve existing component tests
- Add more Storybook stories
- Fix accessibility violations
- Improve documentation

## 📋 Component Wishlist

Want to add a new component? Here are some ideas:

- [ ] AccessibleModal (dialog with focus trap)
- [ ] AccessibleTabs (keyboard navigation)
- [ ] AccessibleButton (with loading states)
- [ ] AccessibleForm (with error handling)
- [ ] AccessibleTooltip (hover & focus)
- [ ] AccessibleAccordion (expand/collapse)
- [ ] AccessibleCarousel (with announcements)
- [ ] AccessibleTable (sortable & filterable)

## 🔍 Accessibility Standards

This project follows:

- [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [React Accessibility Guidelines](https://react.dev/learn/accessibility)

## 🛠️ Built With

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Vitest** - Testing framework
- **Storybook** - Component documentation
- **axe-core** - Accessibility testing
- **@testing-library/react** - Component testing utilities

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- Inspired by [Reach UI](https://reach.tech/)
- Testing patterns from [@testing-library](https://testing-library.com/)
- Accessibility guidelines from [W3C WAI](https://www.w3.org/WAI/)

## 📞 Support

- 🐛 [Report a bug](https://github.com/YOUR_USERNAME/02-accessibility-playground/issues)
- 💡 [Request a feature](https://github.com/YOUR_USERNAME/02-accessibility-playground/issues)
- 📖 [Read the docs](https://github.com/YOUR_USERNAME/02-accessibility-playground/wiki)

---

**Happy Hacking! 🎃 #Hacktoberfest2025**
