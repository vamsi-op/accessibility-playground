import type { Meta, StoryObj } from '@storybook/react'
import { AccessibleTooltip } from './AccessibleTooltip'
import './AccessibleTooltip.stories.css'

const meta = {
  title: 'Components/AccessibleTooltip',
  component: AccessibleTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `

A fully accessible tooltip component that shows on hover and focus, and hides on blur and mouse out.

## Features

-  **Show on hover and keyboard focus**
-  **Hide on blur and mouse out**
-  **Support dynamic content via props**
-  **Intelligent positioning** (top, bottom, left, right)
-  **No overlap with trigger element**
-  **Uses role=tooltip and aria-describedby**
-  **Keyboard accessible**
-  **ESC key to dismiss**
-  **WCAG 2.1 compliant**
-  **Zero accessibility violations**

## Usage

\`\`\`tsx
import { AccessibleTooltip } from './AccessibleTooltip'

// Basic tooltip
<AccessibleTooltip content="This is helpful information">
  <button>Hover me</button>
</AccessibleTooltip>

// Tooltip with custom position
<AccessibleTooltip content="Information below" position="bottom">
  <button>Hover me</button>
</AccessibleTooltip>
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Content to show in the tooltip',
      defaultValue: 'Tooltip content',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the trigger',
      defaultValue: 'top',
    },
    isVisible: {
      control: 'boolean',
      description: 'Whether the tooltip is visible (controlled mode)',
      defaultValue: undefined,
    },
    children: {
      control: 'text',
      description: 'Element that triggers the tooltip',
    },
  },
} satisfies Meta<typeof AccessibleTooltip>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <button>Hover over me</button>,
  },
}

// Positions
export const Top: Story = {
  args: {
    content: 'This tooltip appears above the trigger',
    position: 'top',
    children: <button>Top Tooltip</button>,
  },
}

export const Bottom: Story = {
  args: {
    content: 'This tooltip appears below the trigger',
    position: 'bottom',
    children: <button>Bottom Tooltip</button>,
  },
}

export const Left: Story = {
  args: {
    content: 'This tooltip appears to the left of the trigger',
    position: 'left',
    children: <button>Left Tooltip</button>,
  },
}

export const Right: Story = {
  args: {
    content: 'This tooltip appears to the right of the trigger',
    position: 'right',
    children: <button>Right Tooltip</button>,
  },
}

// Complex content
export const WithRichContent: Story = {
  args: {
    content: (
      <div>
        <h4>Rich Tooltip Content</h4>
        <p>This tooltip contains <strong>rich HTML content</strong> including:</p>
        <ul>
          <li>Headings</li>
          <li>Lists</li>
          <li><em>Stylized text</em></li>
        </ul>
      </div>
    ),
    children: <button>Rich Content Tooltip</button>,
  },
}

// Long content
export const WithLongContent: Story = {
  args: {
    content: 'This is a tooltip with very long content that should wrap appropriately to ensure good readability and user experience.',
    children: <button>Long Content Tooltip</button>,
  },
}

// Interactive Playground
export const Playground: Story = {
  args: {
    content: 'Playground tooltip content',
    position: 'top',
    children: <button>Playground Tooltip</button>,
  },
}

// All Positions Showcase
export const AllPositions: Story = {
  args: {
    content: '',
    children: <></>,
  },
  render: () => (
    <div className="story-demo-tooltip-grid">
      <div className="story-demo-tooltip-row">
        <AccessibleTooltip content="Top-left tooltip" position="top">
          <button>Top Left</button>
        </AccessibleTooltip>
        <AccessibleTooltip content="Top-center tooltip" position="top">
          <button>Top Center</button>
        </AccessibleTooltip>
        <AccessibleTooltip content="Top-right tooltip" position="top">
          <button>Top Right</button>
        </AccessibleTooltip>
      </div>
      
      <div className="story-demo-tooltip-row">
        <AccessibleTooltip content="Left tooltip" position="left">
          <button>Left</button>
        </AccessibleTooltip>
        <div></div> {/* Spacer */}
        <AccessibleTooltip content="Right tooltip" position="right">
          <button>Right</button>
        </AccessibleTooltip>
      </div>
      
      <div className="story-demo-tooltip-row">
        <AccessibleTooltip content="Bottom-left tooltip" position="bottom">
          <button>Bottom Left</button>
        </AccessibleTooltip>
        <AccessibleTooltip content="Bottom-center tooltip" position="bottom">
          <button>Bottom Center</button>
        </AccessibleTooltip>
        <AccessibleTooltip content="Bottom-right tooltip" position="bottom">
          <button>Bottom Right</button>
        </AccessibleTooltip>
      </div>
    </div>
  ),
}

// Keyboard Navigation Demo
export const KeyboardNavigationDemo: Story = {
  args: {
    content: '',
    children: <></>,
  },
  render: () => (
    <div className="story-demo-interactive">
      <p className="story-demo-text">
        Try navigating with Tab and pressing Escape to dismiss:
      </p>
      <div className="story-demo-tooltip-buttons">
        <AccessibleTooltip content="First tooltip content">
          <button>First Button</button>
        </AccessibleTooltip>
        <AccessibleTooltip content="Second tooltip with longer content for demonstration">
          <button>Second Button</button>
        </AccessibleTooltip>
        <AccessibleTooltip content="Third tooltip content">
          <button>Third Button</button>
        </AccessibleTooltip>
      </div>
    </div>
  ),
}

// Real-world Examples
export const RealWorldExamples: Story = {
  args: {
    content: '',
    children: <></>,
  },
  render: () => (
    <div className="story-demo-column">
      <h3>Common Tooltip Patterns</h3>
      
      <div className="story-demo-examples">
        <AccessibleTooltip content="Save your work frequently">
          <button>💾 Save</button>
        </AccessibleTooltip>
        
        <AccessibleTooltip content="Settings and preferences">
          <button>⚙️ Settings</button>
        </AccessibleTooltip>
        
        <AccessibleTooltip content="Delete this item permanently">
          <button>🗑️ Delete</button>
        </AccessibleTooltip>
        
        <AccessibleTooltip 
          content="Your password must be at least 8 characters long and include a number"
          position="right"
        >
          <button>?</button>
        </AccessibleTooltip>
      </div>
      
      <div className="story-demo-form">
        <label>
          Name:
          <input type="text" />
        </label>
        
        <AccessibleTooltip content="This name will be displayed publicly">
          <span className="story-demo-form-help">ℹ️</span>
        </AccessibleTooltip>
      </div>
    </div>
  ),
}