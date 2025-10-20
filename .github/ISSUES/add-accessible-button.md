# Add Accessible Button Component

## 📋 Description
Create an `AccessibleButton` component with loading states, disabled states, and proper ARIA attributes.

## 🎯 Goal
Build a flexible button component that handles common UI patterns accessibly.

## 📂 Files to Create
- `src/components/AccessibleButton/AccessibleButton.tsx`
- `src/components/AccessibleButton/AccessibleButton.css`
- `src/components/AccessibleButton/AccessibleButton.test.tsx`
- `src/components/AccessibleButton/AccessibleButton.stories.tsx`

## ✅ Requirements

### Functionality
- [ ] Support `primary`, `secondary`, `danger` variants
- [ ] Support `small`, `medium`, `large` sizes
- [ ] Loading state with spinner
- [ ] Disabled state
- [ ] Optional icon support (left/right)

### Accessibility
- [ ] Use semantic `<button>` element
- [ ] Add `aria-busy="true"` when loading
- [ ] Add `aria-disabled` when disabled
- [ ] Proper focus visible styles
- [ ] Screen reader announcements for state changes

### Testing
- [ ] Test all variants render correctly
- [ ] Test loading state prevents clicks
- [ ] Test disabled state
- [ ] Keyboard navigation tests
- [ ] Axe accessibility tests

### Documentation
- [ ] Storybook stories for all variants
- [ ] Interactive controls in Storybook
- [ ] Usage examples

## 💡 Implementation Hints

```tsx
interface AccessibleButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  isLoading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  children: React.ReactNode
}

// Loading state: Show spinner, disable interaction
// Disabled: opacity + cursor + aria-disabled
// Variants: CSS classes with proper contrast ratios
```

## 📚 Resources
- [ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [Button Accessibility](https://www.a11yproject.com/posts/how-to-create-accessible-buttons/)
- [WCAG Color Contrast](https://webaim.org/resources/contrastchecker/)

## 🏷️ Labels
`good-first-issue` `hacktoberfest` `component` `accessibility`

## ⏱️ Estimated Time
3-4 hours

## 🤝 Getting Started
Comment below to claim this issue!
