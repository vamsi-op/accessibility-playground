# Add Accessible Modal Component

## 📋 Description
Create a new `AccessibleModal` component with proper dialog semantics, focus trap, and keyboard controls.

## 🎯 Goal
Build a modal dialog component that follows WCAG 2.1 guidelines and ARIA best practices.

## 📂 Files to Create
- `src/components/AccessibleModal/AccessibleModal.tsx`
- `src/components/AccessibleModal/AccessibleModal.css`
- `src/components/AccessibleModal/AccessibleModal.test.tsx`
- `src/components/AccessibleModal/AccessibleModal.stories.tsx`

## ✅ Requirements

### Functionality
- [ ] Open/close modal with button click
- [ ] Close on Escape key
- [ ] Close when clicking backdrop
- [ ] Trap focus inside modal when open
- [ ] Return focus to trigger element when closed

### Accessibility
- [ ] Use `role="dialog"` and `aria-modal="true"`
- [ ] Add `aria-labelledby` for modal title
- [ ] Add `aria-describedby` for modal description
- [ ] Prevent body scroll when modal is open
- [ ] Focus first focusable element on open

### Testing
- [ ] Unit tests for open/close behavior
- [ ] Keyboard navigation tests
- [ ] Focus trap tests
- [ ] Axe accessibility tests (no violations)

### Documentation
- [ ] Add Storybook stories with examples
- [ ] Document props in component JSDoc
- [ ] Add usage example to README

## 💡 Implementation Hints

```tsx
interface AccessibleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

// Use React Portal to render outside DOM hierarchy
// Focus trap: useEffect with tabindex manipulation
// Escape key: window.addEventListener('keydown')
```

## 📚 Resources
- [ARIA Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Focus Trap React](https://github.com/focus-trap/focus-trap-react)
- [MDN Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)

## 🏷️ Labels
`good-first-issue` `hacktoberfest` `component` `accessibility`

## ⏱️ Estimated Time
4-6 hours

## 🤝 Getting Started
1. Comment on this issue to claim it
2. Fork the repository
3. Create a branch: `git checkout -b feat/accessible-modal`
4. Follow the CONTRIBUTING.md guide
5. Submit a PR when ready!
