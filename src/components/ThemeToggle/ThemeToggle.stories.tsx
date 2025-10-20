import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';
import '../../index.css'; // Import global styles to apply theme variables

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ 
        padding: '3rem', 
        backgroundColor: 'var(--color-background)', 
        color: 'var(--color-text)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        width: '300px',
        textAlign: 'center',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>
        <p>Theme changes will apply here.</p>
        <p>Click the toggle button to switch themes.</p>
        {/* The ThemeToggle is positioned 'fixed', so it will appear in the top right of the canvas */}
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// The default story renders the component.
// It doesn't require any arguments as it manages its own state.
export const Default: Story = {
  render: () => <ThemeToggle />,
};