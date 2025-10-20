import { Story, Meta } from '@storybook/react';
import type { ComponentProps } from 'react';
import { AccessibleTabs } from './AccessibleTabs.tsx';
import './AccessibleTabs.css';

export default {
  title: 'Components/AccessibleTabs',
  component: AccessibleTabs,
} as Meta;

const Template: Story<ComponentProps<typeof AccessibleTabs>> = (args) => <AccessibleTabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabs: [
    { id: '1', label: 'Tab 1', content: 'Content for Tab 1' },
    { id: '2', label: 'Tab 2', content: 'Content for Tab 2' },
    { id: '3', label: 'Tab 3', content: 'Content for Tab 3' },
  ],
};
