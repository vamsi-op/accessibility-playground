import type { Meta, StoryObj } from '@storybook/react'
import { AccessibleTabs, Tab } from './AccessibleTabs'

const meta = {
  title: 'Components/AccessibleTabs',
  component: AccessibleTabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
An accessible tabs component that follows WAI-ARIA authoring practices.

## Features
- ✅ Keyboard navigation (Arrow keys, Home, End)
- ✅ ARIA attributes for screen readers
- ✅ Focus management
- ✅ Visual focus indicators
- ✅ Mouse click support

## Keyboard Support
- **Left Arrow**: Move focus to previous tab
- **Right Arrow**: Move focus to next tab
- **Home**: Move focus to first tab
- **End**: Move focus to last tab
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      description: 'Array of tab objects with id, label, and content',
      control: { type: 'object' },
    },
    defaultActiveId: {
      description: 'ID of the tab that should be active by default',
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof AccessibleTabs>

export default meta
type Story = StoryObj<typeof meta>

// Default tabs for stories
const defaultTabs: Tab[] = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <div>
        <h3 style={{ marginTop: 0 }}>Overview</h3>
        <p>
          This is an accessible tabs component with full keyboard navigation support.
        </p>
        <p>
          Use the arrow keys to navigate between tabs, or press Home/End to jump to the
          first or last tab.
        </p>
      </div>
    ),
  },
  {
    id: 'features',
    label: 'Features',
    content: (
      <div>
        <h3 style={{ marginTop: 0 }}>Features</h3>
        <ul>
          <li>Arrow key navigation (Left/Right)</li>
          <li>Home/End key support</li>
          <li>ARIA attributes for screen readers</li>
          <li>Visual focus indicators</li>
          <li>Automatic tab activation on focus</li>
          <li>Click to select tabs</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    content: (
      <div>
        <h3 style={{ marginTop: 0 }}>Accessibility</h3>
        <p>
          This component follows WAI-ARIA authoring practices for tabs:
        </p>
        <ul>
          <li>
            <code>role="tablist"</code> for the tab container
          </li>
          <li>
            <code>role="tab"</code> for each tab button
          </li>
          <li>
            <code>role="tabpanel"</code> for each content panel
          </li>
          <li>
            <code>aria-selected</code> to indicate active tab
          </li>
          <li>
            <code>aria-controls</code> linking tabs to panels
          </li>
          <li>
            <code>aria-labelledby</code> linking panels to tabs
          </li>
        </ul>
      </div>
    ),
  },
]

// Basic story - Default behavior
export const Default: Story = {
  args: {
    tabs: defaultTabs,
  },
}

// Story with custom default tab
export const WithDefaultTab: Story = {
  args: {
    tabs: defaultTabs,
    defaultActiveId: 'features',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the `defaultActiveId` prop to set which tab is active on mount.',
      },
    },
  },
}

// Story with many tabs
export const ManyTabs: Story = {
  args: {
    tabs: [
      { id: 'tab1', label: 'Tab 1', content: <div>Content for Tab 1</div> },
      { id: 'tab2', label: 'Tab 2', content: <div>Content for Tab 2</div> },
      { id: 'tab3', label: 'Tab 3', content: <div>Content for Tab 3</div> },
      { id: 'tab4', label: 'Tab 4', content: <div>Content for Tab 4</div> },
      { id: 'tab5', label: 'Tab 5', content: <div>Content for Tab 5</div> },
      { id: 'tab6', label: 'Tab 6', content: <div>Content for Tab 6</div> },
      { id: 'tab7', label: 'Tab 7', content: <div>Content for Tab 7</div> },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with many tabs to demonstrate scrolling and navigation.',
      },
    },
  },
}

// Story with two tabs
export const TwoTabs: Story = {
  args: {
    tabs: [
      {
        id: 'login',
        label: 'Login',
        content: (
          <div>
            <h3 style={{ marginTop: 0 }}>Login</h3>
            <form>
              <div style={{ marginBottom: '12px' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '4px' }}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label htmlFor="password" style={{ display: 'block', marginBottom: '4px' }}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
                />
              </div>
              <button type="submit" style={{ padding: '8px 16px' }}>
                Login
              </button>
            </form>
          </div>
        ),
      },
      {
        id: 'signup',
        label: 'Sign Up',
        content: (
          <div>
            <h3 style={{ marginTop: 0 }}>Sign Up</h3>
            <form>
              <div style={{ marginBottom: '12px' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '4px' }}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label htmlFor="signup-email" style={{ display: 'block', marginBottom: '4px' }}>
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label htmlFor="signup-password" style={{ display: 'block', marginBottom: '4px' }}>
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
                />
              </div>
              <button type="submit" style={{ padding: '8px 16px' }}>
                Sign Up
              </button>
            </form>
          </div>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Common use case: Login/Signup tabs.',
      },
    },
  },
}

// Story with rich content
export const WithRichContent: Story = {
  args: {
    tabs: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        content: (
          <div>
            <h3 style={{ marginTop: 0 }}>Dashboard</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#0066cc' }}>Total Users</h4>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>1,234</p>
              </div>
              <div style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#0066cc' }}>Active Sessions</h4>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>456</p>
              </div>
              <div style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#0066cc' }}>Revenue</h4>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>$12,345</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'analytics',
        label: 'Analytics',
        content: (
          <div>
            <h3 style={{ marginTop: 0 }}>Analytics</h3>
            <p>Charts and graphs would go here...</p>
            <div
              style={{
                height: '200px',
                background: 'linear-gradient(to right, #667eea 0%, #764ba2 100%)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
              }}
            >
              Chart Placeholder
            </div>
          </div>
        ),
      },
      {
        id: 'settings',
        label: 'Settings',
        content: (
          <div>
            <h3 style={{ marginTop: 0 }}>Settings</h3>
            <div style={{ maxWidth: '400px' }}>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <input type="checkbox" defaultChecked style={{ marginRight: '8px' }} />
                Enable notifications
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                Dark mode
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <input type="checkbox" defaultChecked style={{ marginRight: '8px' }} />
                Auto-save
              </label>
              <button style={{ padding: '8px 16px', marginTop: '16px' }}>Save Changes</button>
            </div>
          </div>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with rich content including stats cards, charts, and forms.',
      },
    },
  },
}

// Story with long labels
export const LongLabels: Story = {
  args: {
    tabs: [
      {
        id: 'long1',
        label: 'Very Long Tab Label One',
        content: <div>Content for the first tab with a long label.</div>,
      },
      {
        id: 'long2',
        label: 'Another Extremely Long Tab Label',
        content: <div>Content for the second tab with a long label.</div>,
      },
      {
        id: 'long3',
        label: 'Short',
        content: <div>Content for the third tab with a short label.</div>,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Test tabs with varying label lengths.',
      },
    },
  },
}