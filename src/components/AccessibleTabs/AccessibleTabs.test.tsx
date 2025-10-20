import { render, fireEvent, screen } from '@testing-library/react';
import { AccessibleTabs } from './AccessibleTabs';
import './AccessibleTabs.css';

describe('AccessibleTabs', () => {
  const tabs = [
    { id: '1', label: 'Tab 1', content: 'Content 1' },
    { id: '2', label: 'Tab 2', content: 'Content 2' },
    { id: '3', label: 'Tab 3', content: 'Content 3' },
  ];

  it('renders tabs and panels correctly', () => {
    render(<AccessibleTabs tabs={tabs} />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.getByText('Content 2')).not.toBeVisible();
  });

  it('switches tabs on click', () => {
    render(<AccessibleTabs tabs={tabs} />);
    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Content 2')).toBeVisible();
    expect(screen.getByText('Content 1')).not.toBeVisible();
  });

  it('navigates tabs with arrow keys', () => {
    render(<AccessibleTabs tabs={tabs} />);
    const tab1 = screen.getByText('Tab 1');
    tab1.focus();

    fireEvent.keyDown(tab1, { key: 'ArrowRight' });
    expect(screen.getByText('Tab 2')).toHaveFocus();

    fireEvent.keyDown(screen.getByText('Tab 2'), { key: 'ArrowLeft' });
    expect(screen.getByText('Tab 1')).toHaveFocus();
  });
});
