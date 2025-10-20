import type { Meta, StoryObj } from '@storybook/react'
import { AccessibleDropdown } from './AccessibleDropdown'

const meta = {
  title: 'Components/AccessibleDropdown',
  component: AccessibleDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the dropdown',
    },
    onSelect: {
      action: 'selected',
    },
  },
} satisfies Meta<typeof AccessibleDropdown>

export default meta
type Story = StoryObj<typeof meta>

const fruitOptions = [
  { id: '1', label: 'Apple' },
  { id: '2', label: 'Banana' },
  { id: '3', label: 'Cherry' },
  { id: '4', label: 'Date' },
  { id: '5', label: 'Elderberry' },
]

const colorOptions = [
  { id: 'red', label: 'Red' },
  { id: 'blue', label: 'Blue' },
  { id: 'green', label: 'Green' },
  { id: 'yellow', label: 'Yellow' },
  { id: 'purple', label: 'Purple' },
]

const countryOptions = [
  { id: 'us', label: 'United States' },
  { id: 'ca', label: 'Canada' },
  { id: 'uk', label: 'United Kingdom' },
  { id: 'au', label: 'Australia' },
  { id: 'nz', label: 'New Zealand' },
  { id: 'de', label: 'Germany' },
  { id: 'fr', label: 'France' },
  { id: 'jp', label: 'Japan' },
  { id: 'cn', label: 'China' },
  { id: 'in', label: 'India' },
]

export const Default: Story = {
  args: {
    label: 'Choose a fruit',
    options: fruitOptions,
  },
}

export const WithDefaultValue: Story = {
  args: {
    label: 'Favorite color',
    options: colorOptions,
    defaultValue: 'blue',
  },
}

export const LongList: Story = {
  args: {
    label: 'Select country',
    options: countryOptions,
  },
}

export const SingleOption: Story = {
  args: {
    label: 'Only one choice',
    options: [{ id: '1', label: 'Only Option' }],
  },
}

export const EmptyState: Story = {
  args: {
    label: 'No options',
    options: [],
  },
}
