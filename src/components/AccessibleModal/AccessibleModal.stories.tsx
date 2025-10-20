import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AccessibleModal } from './AccessibleModal'

const meta = {
  title: 'Components/AccessibleModal',
  component: AccessibleModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the modal is open or closed',
    },
    onClose: {
      action: 'closed',
      description: 'Callback function triggered when modal is closed',
    },
    title: {
      control: 'text',
      description: 'Title of the modal dialog',
    },
  },
} satisfies Meta<typeof AccessibleModal>

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component to demonstrate controlled open/close behavior
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleClose = () => {
    setIsOpen(false)
    args.onClose()
  }
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <AccessibleModal
        {...args}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </div>
  )
}

export const Default: Story = {
  args: {
    isOpen: false,
    title: 'Example Modal',
    children: (
      <div>
        <p>This is an example modal with some content.</p>
        <p>It demonstrates the accessible modal component with proper focus management and keyboard controls.</p>
        <button>Sample Button</button>
      </div>
    ),
  },
  render: (args) => <ModalWrapper {...args} />,
}

export const WithLongContent: Story = {
  args: {
    isOpen: false,
    title: 'Modal with Long Content',
    children: (
      <div>
        <p>This modal has longer content to demonstrate scrolling behavior.</p>
        {[...Array(20)].map((_, i) => (
          <p key={i}>This is paragraph {i + 1} of the modal content.</p>
        ))}
        <button>Submit</button>
        <button>Cancel</button>
      </div>
    ),
  },
  render: (args) => <ModalWrapper {...args} />,
}

export const WithForm: Story = {
  args: {
    isOpen: false,
    title: 'Form Modal',
    children: (
      <form>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Name
          </label>
          <input 
            id="name" 
            type="text" 
            style={{ width: '100%', padding: '0.5rem' }} 
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Email
          </label>
          <input 
            id="email" 
            type="email" 
            style={{ width: '100%', padding: '0.5rem' }} 
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button type="button" onClick={() => {}}>
            Cancel
          </button>
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    ),
  },
  render: (args) => <ModalWrapper {...args} />,
}