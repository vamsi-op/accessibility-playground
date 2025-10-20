# Contributing to Tiny Accessibility Playground

Thank you for your interest in contributing! 🎉 This project is part of Hacktoberfest 2024 and welcomes contributions from developers of all skill levels.

## 🎯 How to Contribute

### 1. Find an Issue

- Browse [open issues](https://github.com/YOUR_USERNAME/02-accessibility-playground/issues)
- Look for `good-first-issue` or `hacktoberfest` labels
- Comment on the issue to let others know you're working on it

### 2. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/02-accessibility-playground.git
cd 02-accessibility-playground
npm install
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Make Your Changes

Follow our code standards:

- Write TypeScript (no `any` types)
- Follow existing code style
- Add tests for new features
- Run accessibility audits
- Update documentation

### 5. Test Your Changes

```bash
# Run all tests
npm test

# Run specific test file
npm test AccessibleDropdown

# Run Storybook
npm run storybook

# Build the project
npm run build
```

### 6. Commit Your Changes

Use clear commit messages:

```bash
git add .
git commit -m "feat: add accessible modal component"
# or
git commit -m "fix: resolve keyboard navigation bug in dropdown"
```

**Commit message format:**
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `test:` for tests
- `style:` for formatting
- `refactor:` for code refactoring

### 7. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title describing the change
- Description of what you changed and why
- Link to related issue (e.g., "Closes #123")
- Screenshots if UI changes

## 📝 Adding a New Component

### Step 1: Create Component Files

```bash
src/components/YourComponent/
├── YourComponent.tsx         # Component implementation
├── YourComponent.css         # Component styles
├── YourComponent.test.tsx    # Tests
└── YourComponent.stories.tsx # Storybook stories
```

### Step 2: Component Template

```tsx
import React, { useState } from 'react'
import './YourComponent.css'

export interface YourComponentProps {
  // Define props with TypeScript
  label: string
  onChange?: (value: string) => void
}

export function YourComponent({ label, onChange }: YourComponentProps) {
  return (
    <div className="your-component">
      {/* Implement your accessible component */}
    </div>
  )
}

export default YourComponent
```

### Step 3: Add Accessibility Features

**Required:**
- ✅ Semantic HTML elements
- ✅ ARIA attributes (role, aria-label, etc.)
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support

**Example:**
```tsx
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>
  Close
</button>
```

### Step 4: Write Tests

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { YourComponent } from './YourComponent'

expect.extend(toHaveNoViolations)

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent label="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<YourComponent label="Test" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<YourComponent label="Test" />)
    
    await user.keyboard('{Enter}')
    // Test keyboard behavior
  })
})
```

### Step 5: Create Storybook Stories

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { YourComponent } from './YourComponent'

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof YourComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Example',
  },
}
```

### Step 6: Update Documentation

Add your component to:
- `README.md` - Component list
- Storybook docs
- Usage examples

## 🧪 Testing Guidelines

### Unit Tests

- Test all user interactions
- Test keyboard navigation
- Test ARIA attributes
- Test edge cases

### Accessibility Tests

```tsx
// Every component MUST pass axe tests
it('should not have accessibility violations', async () => {
  const { container } = render(<Component />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Manual Testing

1. **Keyboard only**: Navigate without a mouse
2. **Screen reader**: Test with NVDA/JAWS (Windows) or VoiceOver (Mac)
3. **Zoom**: Test at 200% browser zoom
4. **Color contrast**: Verify with browser DevTools

## 🎨 Code Style

### TypeScript

```tsx
// ✅ Good
export interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

// ❌ Bad
export interface ButtonProps {
  label: any
  variant: string
  onClick: Function
}
```

### React

```tsx
// ✅ Good - Semantic HTML
<button type="button" aria-label="Close">
  <CloseIcon />
</button>

// ❌ Bad - Div button
<div onClick={handleClose}>
  <CloseIcon />
</div>
```

### CSS

```css
/* ✅ Good - BEM naming */
.dropdown-button {}
.dropdown-button--active {}
.dropdown__list {}

/* ❌ Bad - Generic names */
.btn {}
.active {}
```

## 🚫 Common Mistakes to Avoid

1. **Missing ARIA labels**
   ```tsx
   // ❌ Bad
   <button onClick={handleClick}>
     <Icon />
   </button>
   
   // ✅ Good
   <button onClick={handleClick} aria-label="Delete item">
     <Icon />
   </button>
   ```

2. **Div buttons**
   ```tsx
   // ❌ Bad
   <div onClick={handleClick}>Click me</div>
   
   // ✅ Good
   <button onClick={handleClick}>Click me</button>
   ```

3. **Missing keyboard support**
   ```tsx
   // ❌ Bad
   <div onClick={handleClick}>Click me</div>
   
   // ✅ Good
   <button 
     onClick={handleClick}
     onKeyDown={(e) => e.key === 'Enter' && handleClick()}
   >
     Click me
   </button>
   ```

4. **Low color contrast**
   ```css
   /* ❌ Bad - 2.5:1 ratio */
   color: #999;
   background: #fff;
   
   /* ✅ Good - 4.5:1 ratio (WCAG AA) */
   color: #666;
   background: #fff;
   ```

## 📚 Resources

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)

### Testing
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [Vitest](https://vitest.dev/)

### React
- [React Accessibility Docs](https://react.dev/learn/accessibility)
- [Reach UI](https://reach.tech/) - Accessible component examples

## 🏆 Recognition

Contributors will be:
- Listed in our README
- Credited in release notes
- Given a shoutout on social media

## ❓ Questions?

- 💬 Comment on the issue
- 📧 Email: your-email@example.com
- 🐦 Twitter: @yourhandle

## 📜 Code of Conduct

Please read our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

---

**Thank you for making the web more accessible! 🌟**
