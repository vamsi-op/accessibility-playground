# Add Accessible Tabs Component

## 📋 Description
Create an `AccessibleTabs` component with proper ARIA attributes and keyboard navigation.

## 🎯 Goal
Build a tab component following the ARIA tabs pattern with arrow key navigation.

## 📂 Files to Create
- `src/components/AccessibleTabs/AccessibleTabs.tsx`
- `src/components/AccessibleTabs/AccessibleTabs.css`
- `src/components/AccessibleTabs/AccessibleTabs.test.tsx`
- `src/components/AccessibleTabs/AccessibleTabs.stories.tsx`

## ✅ Requirements

### Functionality
- [ ] Switch tabs with mouse click
- [ ] Navigate tabs with Left/Right arrow keys
- [ ] Go to first tab with Home key
- [ ] Go to last tab with End key
- [ ] Show/hide tab panels based on selection

### Accessibility
- [ ] Use `role="tablist"`, `role="tab"`, `role="tabpanel"`
- [ ] Add `aria-selected` to active tab
- [ ] Add `aria-controls` linking tabs to panels
- [ ] Add `aria-labelledby` linking panels to tabs
- [ ] Only active tab is in tab order (tabindex=0)
- [ ] Focus visible styles

### Testing
- [ ] Tab selection tests
- [ ] Keyboard navigation tests
- [ ] ARIA attributes tests
- [ ] Axe accessibility tests

## 💡 Implementation Hints

```tsx
interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface AccessibleTabsProps {
  tabs: Tab[]
  defaultActiveId?: string
}

// Arrow keys: Move focus between tabs
// Home/End: Jump to first/last tab
// Tab panels: Hidden with display:none when not active
```

## 📚 Resources
- [ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [Inclusive Components: Tabbed Interfaces](https://inclusive-components.design/tabbed-interfaces/)

## 🏷️ Labels
`good-first-issue` `hacktoberfest` `component` `accessibility`

## ⏱️ Estimated Time
4-5 hours
