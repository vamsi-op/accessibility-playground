# Add Dark/Light Theme Toggle

## 📋 Description
Add a theme toggle component with system preference detection and persistent storage.

## 🎯 Goal
Create an accessible theme switcher that respects user preferences.

## 📂 Files to Create/Modify
- `src/components/ThemeToggle/ThemeToggle.tsx` (new)
- `src/components/ThemeToggle/ThemeToggle.css` (new)
- `src/components/ThemeToggle/ThemeToggle.test.tsx` (new)
- `src/App.tsx` (modify to add toggle)
- `src/index.css` (modify for theme variables)

## ✅ Requirements

### Functionality
- [ ] Toggle between light/dark/system modes
- [ ] Detect system preference with `prefers-color-scheme`
- [ ] Persist preference to localStorage
- [ ] Apply theme on initial load
- [ ] Smooth transition between themes

### Accessibility
- [ ] Button with clear label (e.g., "Toggle dark mode")
- [ ] Announce state changes to screen readers
- [ ] Keyboard accessible
- [ ] High contrast icons for both themes
- [ ] Focus visible styles

### Styling
- [ ] Define CSS custom properties for colors
- [ ] Update all components to use theme variables
- [ ] Ensure WCAG AA color contrast in both themes

### Testing
- [ ] Test theme switching
- [ ] Test localStorage persistence
- [ ] Test system preference detection
- [ ] Accessibility tests

## 💡 Implementation Hints

```tsx
// Theme context
const ThemeContext = React.createContext()

// Detect system preference
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light'

// CSS variables in index.css
:root {
  --color-background: #ffffff;
  --color-text: #213547;
}

[data-theme='dark'] {
  --color-background: #242424;
  --color-text: rgba(255, 255, 255, 0.87);
}
```

## 📚 Resources
- [Theme Switching Best Practices](https://web.dev/prefers-color-scheme/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

## 🏷️ Labels
`good-first-issue` `hacktoberfest` `enhancement` `accessibility`

## ⏱️ Estimated Time
3-4 hours
