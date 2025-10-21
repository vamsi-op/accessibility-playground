import type { Meta, StoryObj } from '@storybook/react'
import { AccessibleButton } from './AccessibleButton'
import './AccessibleButton.stories.css'

// Mock function for stories
const fn = () => () => console.log('Button clicked')

const meta = {
  title: 'Components/AccessibleButton',
  component: AccessibleButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# AccessibleButton

A fully accessible button component that supports multiple variants, sizes, loading states, and icons.

## Features

- ✅ **WCAG 2.1 AA compliant** with proper color contrast ratios
- ✅ **Full keyboard navigation** (Tab, Enter, Space)
- ✅ **Loading states** with spinner and ARIA announcements
- ✅ **Disabled states** with proper ARIA attributes
- ✅ **Multiple variants** (primary, secondary, danger)
- ✅ **Flexible sizes** (small, medium, large)
- ✅ **Icon support** with left/right positioning
- ✅ **Screen reader friendly** with live region announcements
- ✅ **Focus management** with visible focus indicators
- ✅ **Reduced motion support** for accessibility preferences

## Usage

\`\`\`tsx
import { AccessibleButton } from './AccessibleButton'

// Basic button
<AccessibleButton onClick={handleClick}>
  Click me
</AccessibleButton>

// Loading button
<AccessibleButton isLoading onClick={handleSubmit}>
  Submit Form
</AccessibleButton>

// Button with icon
<AccessibleButton 
  icon={<SaveIcon />} 
  variant="primary" 
  size="large"
>
  Save Document
</AccessibleButton>
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button content (text, elements, etc.)',
      defaultValue: 'Button',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Visual style variant of the button',
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
      defaultValue: 'medium',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading spinner and prevents interaction',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
      defaultValue: false,
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon relative to text',
      defaultValue: 'left',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type attribute',
      defaultValue: 'button',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when button is clicked',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
} satisfies Meta<typeof AccessibleButton>

export default meta
type Story = StoryObj<typeof meta>

// Sample icons for stories
const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 12l-4-4h2.5V2h3v6H12l-4 4zM2 13h12v1H2v-1z"/>
  </svg>
)

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 10l-4-4h2V2h4v4h2l-4 4zM2 12h12v2H2v-2z"/>
  </svg>
)

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6 2h4v1H6V2zM3 4v9a2 2 0 002 2h6a2 2 0 002-2V4H3zm3 2v5H5V6h1zm3 0v5H8V6h1z"/>
    <path d="M2 3v1h12V3H2z"/>
  </svg>
)

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
    onClick: fn(),
  },
}

// Variants
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    onClick: fn(),
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    onClick: fn(),
  },
}

export const Danger: Story = {
  args: {
    children: 'Delete Item',
    variant: 'danger',
    onClick: fn(),
  },
}

// Sizes
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
    onClick: fn(),
  },
}

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'medium',
    onClick: fn(),
  },
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large',
    onClick: fn(),
  },
}

// States
export const Loading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
    onClick: fn(),
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
    onClick: fn(),
  },
}

export const LoadingAndDisabled: Story = {
  args: {
    children: 'Processing...',
    isLoading: true,
    disabled: true,
    onClick: fn(),
  },
}

// Icons
export const WithLeftIcon: Story = {
  args: {
    children: 'Save Document',
    icon: <SaveIcon />,
    iconPosition: 'left',
    onClick: fn(),
  },
}

export const WithRightIcon: Story = {
  args: {
    children: 'Download File',
    icon: <DownloadIcon />,
    iconPosition: 'right',
    onClick: fn(),
  },
}

export const IconOnly: Story = {
  args: {
    children: '',
    icon: <PlusIcon />,
    'aria-label': 'Add new item',
    size: 'small',
    onClick: fn(),
  },
}

// Complex Examples
export const FormSubmit: Story = {
  args: {
    children: 'Submit Form',
    type: 'submit',
    variant: 'primary',
    size: 'large',
    onClick: fn(),
  },
}

export const DangerWithIcon: Story = {
  args: {
    children: 'Delete Account',
    variant: 'danger',
    icon: <DeleteIcon />,
    onClick: fn(),
  },
}

export const LoadingWithIcon: Story = {
  args: {
    children: 'Saving Changes',
    icon: <SaveIcon />,
    isLoading: true,
    variant: 'primary',
    onClick: fn(),
  },
}

// Accessibility Examples
export const WithAriaLabel: Story = {
  args: {
    children: '❤️',
    'aria-label': 'Add to favorites',
    variant: 'secondary',
    size: 'small',
    onClick: fn(),
  },
}

export const WithAriaDescribedBy: Story = {
  args: {
    children: 'Delete',
    variant: 'danger',
    'aria-describedby': 'delete-description',
    onClick: fn(),
  },
  render: (args: Story['args']) => (
    <div>
      <AccessibleButton {...args} />
      <div id="delete-description" className="story-demo-description">
        This action cannot be undone
      </div>
    </div>
  ),
}

// Interactive Playground
export const Playground: Story = {
  args: {
    children: 'Interactive Button',
    variant: 'primary',
    size: 'medium',
    isLoading: false,
    disabled: false,
    icon: <SaveIcon />,
    iconPosition: 'left',
    onClick: fn(),
  },
}

// All Variants Showcase
export const AllVariants: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div className="story-demo-grid">
      <AccessibleButton variant="primary" onClick={fn()}>
        Primary
      </AccessibleButton>
      <AccessibleButton variant="secondary" onClick={fn()}>
        Secondary
      </AccessibleButton>
      <AccessibleButton variant="danger" onClick={fn()}>
        Danger
      </AccessibleButton>
      <AccessibleButton disabled onClick={fn()}>
        Disabled
      </AccessibleButton>
      <AccessibleButton isLoading onClick={fn()}>
        Loading
      </AccessibleButton>
    </div>
  ),
}

// All Sizes Showcase
export const AllSizes: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div className="story-demo-row">
      <AccessibleButton size="small" onClick={fn()}>
        Small
      </AccessibleButton>
      <AccessibleButton size="medium" onClick={fn()}>
        Medium
      </AccessibleButton>
      <AccessibleButton size="large" onClick={fn()}>
        Large
      </AccessibleButton>
    </div>
  ),
}

// Real-world Examples
export const RealWorldExamples: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div className="story-demo-column">
      <h3>Common Button Patterns</h3>
      
      <div className="story-demo-buttons">
        <AccessibleButton variant="primary" size="small" onClick={fn()}>
          Save
        </AccessibleButton>
        <AccessibleButton variant="secondary" size="small" onClick={fn()}>
          Cancel
        </AccessibleButton>
      </div>

      <AccessibleButton 
        variant="primary" 
        icon={<DownloadIcon />} 
        onClick={fn()}
      >
        Download Report
      </AccessibleButton>

      <AccessibleButton 
        variant="danger" 
        icon={<DeleteIcon />}
        size="small"
        onClick={fn()}
      >
        Delete Item
      </AccessibleButton>

      <AccessibleButton 
        isLoading 
        variant="primary" 
        size="large"
        onClick={fn()}
      >
        Processing Payment...
      </AccessibleButton>

      <AccessibleButton 
        variant="secondary"
        icon={<PlusIcon />}
        iconPosition="right"
        onClick={fn()}
      >
        Add New Item
      </AccessibleButton>
    </div>
  ),
}

// Keyboard Navigation Demo
export const KeyboardNavigationDemo: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div className="story-demo-interactive">
      <p className="story-demo-text">
        Try navigating with Tab, Enter, and Space keys:
      </p>
      <div className="story-demo-button-grid">
        <AccessibleButton onClick={fn()}>
          Button 1
        </AccessibleButton>
        <AccessibleButton variant="secondary" onClick={fn()}>
          Button 2
        </AccessibleButton>
        <AccessibleButton variant="danger" size="small" onClick={fn()}>
          Button 3
        </AccessibleButton>
        <AccessibleButton disabled onClick={fn()}>
          Disabled
        </AccessibleButton>
        <AccessibleButton isLoading onClick={fn()}>
          Loading
        </AccessibleButton>
      </div>
    </div>
  ),
}