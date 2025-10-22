# Tiny Accessibility Playground

![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-blueviolet)
![React](https://img.shields.io/badge/React-18.2-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6)
![License](https://img.shields.io/badge/License-MIT-green)

An interactive playground for learning and building accessible React components. Perfect for developers who want to practice creating WCAG-compliant UI components with real-time accessibility testing.

## 🌟 Features

- **Interactive Components**: Pre-built accessible components with live examples
- **Accessible Theme Toggle**: Light/Dark/System modes with persistence
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

### ThemeToggle

An accessible theme switcher that supports light, dark, and system preference modes.

**Features:**
- ✅ Toggles between Light (☀️), Dark (🌙), and System (💻) modes
- ✅ Detects system preference with `prefers-color-scheme`
- ✅ Persists the user's choice to `localStorage`
- ✅ Announces state changes to screen readers
- ✅ Smooth CSS transitions between themes

**Usage:**

```tsx
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle'

function App() {
  return (
    <>
      <ThemeToggle />
      {/* ... your app content ... */}
    </>
  )
}
```

### AccessibleButton

A fully accessible button component with multiple variants, loading states, and icon support.

**Features:**
- ✅ Multiple variants (primary, secondary, danger)
- ✅ Size options (small, medium, large)
- ✅ Loading state with spinner and ARIA announcements
- ✅ Disabled state with proper ARIA attributes
- ✅ Icon support with flexible positioning (left/right)
- ✅ Full keyboard navigation (Tab, Enter, Space)
- ✅ Screen reader friendly with live regions
- ✅ WCAG 2.1 AA compliant colors

**Usage:**

```tsx
import AccessibleButton from './components/AccessibleButton/AccessibleButton'

function App() {
  return (
    <>
      {/* Basic button */}
      <AccessibleButton onClick={() => console.log('Clicked!')}>
        Click Me
      </AccessibleButton>

      {/* With variant and size */}
      <AccessibleButton variant="danger" size="small">
        Delete
      </AccessibleButton>

      {/* With loading state */}
      <AccessibleButton isLoading variant="primary">
        Saving...
      </AccessibleButton>

      {/* With icon */}
      <AccessibleButton 
        icon={<DownloadIcon />} 
        iconPosition="left"
      >
        Download
      </AccessibleButton>

      {/* Disabled */}
      <AccessibleButton disabled>
        Unavailable
      </AccessibleButton>
    </>
  )
}
```

### AccessibleModal

An accessible modal dialog with focus trap and proper ARIA attributes.

**Features:**
- ✅ Focus trap - keeps focus within the modal
- ✅ Escape key to close
- ✅ Click outside backdrop to close
- ✅ Returns focus to trigger element when closed
- ✅ Prevents body scroll when open
- ✅ Proper ARIA attributes (role="dialog", aria-modal)
- ✅ Screen reader announcements

**Usage:**

```tsx
import AccessibleModal from './components/AccessibleModal/AccessibleModal'
import { useState } from 'react'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <AccessibleModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
      >
        <p>Modal content goes here</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </AccessibleModal>
    </>
  )
}
```

### AccessibleTabs

An accessible tabs component with full keyboard navigation and ARIA support.

**Features:**
- ✅ Full keyboard navigation (Arrow keys, Home, End)
- ✅ Mouse click support
- ✅ ARIA attributes (role="tablist", role="tab", role="tabpanel")
- ✅ Focus management and visual indicators
- ✅ Screen reader support with aria-selected
- ✅ Semantic HTML structure

**Usage:**

```tsx
import { AccessibleTabs } from './components/AccessibleTabs/AccessibleTabs'

const tabs = [
  {
    id: 'tab1',
    label: 'Overview',
    content: <div>Overview content</div>
  },
  {
    id: 'tab2',
    label: 'Features',
    content: <div>Features content</div>
  },
  {
    id: 'tab3',
    label: 'Settings',
    content: <div>Settings content</div>
  }
]

function App() {
  return <AccessibleTabs tabs={tabs} />
}
```

### AccessibleTooltip

A fully accessible tooltip component with dynamic positioning.

**Features:**
- ✅ Show on hover and keyboard focus
- ✅ Hide on blur and mouse out
- ✅ Support dynamic content via props
- ✅ Intelligent positioning (top, bottom, left, right)
- ✅ ESC key to dismiss
- ✅ WCAG 2.1 compliant with zero accessibility violations

**Props:**
- `content`: React.ReactNode - Content to show in the tooltip
- `children`: React.ReactNode - Element that triggers the tooltip
- `position`: 'top' | 'bottom' | 'left' | 'right' - Tooltip position (default: 'top')
- `isVisible`: boolean - Controlled visibility
- `onVisibilityChange`: (visible: boolean) => void - Visibility change callback

**Usage:**

```tsx
import { AccessibleTooltip } from './components/AccessibleTooltip/AccessibleTooltip'

function App() {
  return (
    <>
      {/* Basic tooltip */}
      <AccessibleTooltip content="This is helpful information">
        <button>Hover me</button>
      </AccessibleTooltip>

      {/* Tooltip with custom position */}
      <AccessibleTooltip content="Information below" position="bottom">
        <button>Hover me</button>
      </AccessibleTooltip>
    </>
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
│   ├── AccessibleButton/
│   │   ├── AccessibleButton.tsx
│   │   ├── AccessibleButton.css
│   │   ├── AccessibleButton.test.tsx
│   │   ├── AccessibleButton.stories.tsx
│   │   └── AccessibleButton.stories.css
│   ├── AccessibleDropdown/
│   │   ├── AccessibleDropdown.tsx
│   │   ├── AccessibleDropdown.css
│   │   ├── AccessibleDropdown.test.tsx
│   │   └── AccessibleDropdown.stories.tsx
│   ├── AccessibleModal/
│   │   ├── AccessibleModal.tsx
│   │   ├── AccessibleModal.css
│   │   ├── AccessibleModal.test.tsx
│   │   └── AccessibleModal.stories.tsx
│   ├── AccessibleTabs/
│   │   ├── AccessibleTabs.tsx
│   │   ├── AccessibleTabs.css
│   │   ├── AccessibleTabs.test.tsx
│   │   └── AccessibleTabs.stories.tsx
│   ├── AccessibleTooltip/
│   │   ├── AccessibleTooltip.tsx
│   │   ├── AccessibleTooltip.css
│   │   ├── AccessibleTooltip.test.tsx
│   │   └── AccessibleTooltip.stories.tsx
│   └── ThemeToggle/
│       ├── ThemeToggle.tsx
│       ├── ThemeToggle.css
│       ├── ThemeToggle.test.tsx
│       └── ThemeToggle.stories.tsx
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

- [x] AccessibleButton (with loading states) ✅
- [x] AccessibleModal (dialog with focus trap) ✅
- [x] AccessibleTabs (keyboard navigation) ✅
- [ ] AccessibleForm (with error handling)
- [x] AccessibleTooltip (hover & focus) ✅
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