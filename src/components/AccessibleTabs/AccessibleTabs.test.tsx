import { render, screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { AccessibleTabs, Tab } from './AccessibleTabs'

expect.extend(toHaveNoViolations)

const mockTabs: Tab[] = [
  {
    id: 'tab1',
    label: 'Tab 1',
    content: <div>Content 1</div>,
  },
  {
    id: 'tab2',
    label: 'Tab 2',
    content: <div>Content 2</div>,
  },
  {
    id: 'tab3',
    label: 'Tab 3',
    content: <div>Content 3</div>,
  },
]

describe('AccessibleTabs', () => {
  describe('Tab Selection', () => {
    it('renders all tabs', () => {
      render(<AccessibleTabs tabs={mockTabs} />)
      
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument()
    })

    it('selects first tab by default', () => {
      render(<AccessibleTabs tabs={mockTabs} />)
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      expect(tab1).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByText('Content 1')).toBeVisible()
    })

    it('respects defaultActiveId prop', () => {
      render(<AccessibleTabs tabs={mockTabs} defaultActiveId="tab2" />)
      
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
      expect(tab2).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByText('Content 2')).toBeVisible()
    })

    it('switches tabs on mouse click', async () => {
      const user = userEvent.setup()
      render(<AccessibleTabs tabs={mockTabs} />)
      
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
      await user.click(tab2)
      
      expect(tab2).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByText('Content 2')).toBeVisible()
      expect(screen.queryByText('Content 1')).not.toBeVisible()
    })

    it('shows only active tab panel content', () => {
      render(<AccessibleTabs tabs={mockTabs} />)

const panel1 = screen.getByRole('tabpanel', { name: 'Tab 1' })
const panel2 = screen.getByRole('tab', { name: 'Tab 2', hidden: true })
const panel3 = screen.getByRole('tab', { name: 'Tab 3', hidden: true })
      
      expect(panel1).toHaveStyle({ display: 'block' })
      expect(panel2).toHaveStyle({ display: 'inline-block' })
      expect(panel3).toHaveStyle({ display: 'inline-block' })
    })
  })

  describe('Keyboard Navigation', () => {
    it('navigates to next tab with ArrowRight', async () => {
      const user = userEvent.setup()
      render(<AccessibleTabs tabs={mockTabs} />)
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      tab1.focus()
      
      await user.keyboard('{ArrowRight}')
      
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
      expect(tab2).toHaveFocus()
      expect(tab2).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByText('Content 2')).toBeVisible()
    })

    it('navigates to previous tab with ArrowLeft', async () => {
      const user = userEvent.setup()
      render(<AccessibleTabs tabs={mockTabs} defaultActiveId="tab2" />)
      
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
      tab2.focus()
      
      await user.keyboard('{ArrowLeft}')
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      expect(tab1).toHaveFocus()
      expect(tab1).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByText('Content 1')).toBeVisible()
    })

    it('does not navigate past first tab with ArrowLeft', async () => {
      const user = userEvent.setup()
      render(<AccessibleTabs tabs={mockTabs} />)
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      tab1.focus()
      
      await user.keyboard('{ArrowLeft}')
      
      expect(tab1).toHaveFocus()
      expect(tab1).toHaveAttribute('aria-selected', 'true')
    })

    it('does not navigate past last tab with ArrowRight', async () => {
      const user = userEvent.setup()
      render(<AccessibleTabs tabs={mockTabs} defaultActiveId="tab3" />)
      
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' })
      tab3.focus()
      
      await user.keyboard('{ArrowRight}')
      
      expect(tab3).toHaveFocus()
      expect(tab3).toHaveAttribute('aria-selected', 'true')
    })

    it('jumps to first tab with Home key', async () => {
      const user = userEvent.setup()
      render(<AccessibleTabs tabs={mockTabs} defaultActiveId="tab3" />)
      
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' })
      tab3.focus()
      
      await user.keyboard('{Home}')
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      expect(tab1).toHaveFocus()
      expect(tab1).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByText('Content 1')).toBeVisible()
    })

    it('jumps to last tab with End key', async () => {
      const user = userEvent.setup()
      render(<AccessibleTabs tabs={mockTabs} />)
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      tab1.focus()
      
      await user.keyboard('{End}')
      
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' })
      expect(tab3).toHaveFocus()
      expect(tab3).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByText('Content 3')).toBeVisible()
    })

    it('does not respond to keyboard when focus is outside tablist', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <button>Outside Button</button>
          <AccessibleTabs tabs={mockTabs} />
        </div>
      )
      
      const outsideButton = screen.getByRole('button', { name: 'Outside Button' })
      outsideButton.focus()
      
      await user.keyboard('{ArrowRight}')
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      expect(tab1).toHaveAttribute('aria-selected', 'true')
      expect(outsideButton).toHaveFocus()
    })
  })

  describe('ARIA Attributes', () => {
    it('has correct role attributes', () => {
      render(<AccessibleTabs tabs={mockTabs} />)
      
      expect(screen.getByRole('tablist')).toBeInTheDocument()
      expect(screen.getAllByRole('tab', { hidden: true })).toHaveLength(3)
      expect(screen.getAllByRole('tabpanel', { hidden: true })).toHaveLength(3)
    })

    it('has aria-selected on active tab only', () => {
      render(<AccessibleTabs tabs={mockTabs} defaultActiveId="tab2" />)
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' })
      
      expect(tab1).toHaveAttribute('aria-selected', 'false')
      expect(tab2).toHaveAttribute('aria-selected', 'true')
      expect(tab3).toHaveAttribute('aria-selected', 'false')
    })

    it('has aria-controls linking tabs to panels', () => {
      render(<AccessibleTabs tabs={mockTabs} />)
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      const panel1 = screen.getByRole('tabpanel', { name: 'Tab 1' })
      
      const controlsId = tab1.getAttribute('aria-controls')
      expect(controlsId).toBeTruthy()
      expect(panel1.id).toBe(controlsId)
    })

    it('has aria-labelledby linking panels to tabs', () => {
      render(<AccessibleTabs tabs={mockTabs} />)
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      const panel1 = screen.getByRole('tabpanel', { name: 'Tab 1' })
      
      const labelledById = panel1.getAttribute('aria-labelledby')
      expect(labelledById).toBeTruthy()
      expect(tab1.id).toBe(labelledById)
    })

    it('has tabindex=0 only on active tab', () => {
      render(<AccessibleTabs tabs={mockTabs} defaultActiveId="tab2" />)
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' })
      
      expect(tab1).toHaveAttribute('tabindex', '-1')
      expect(tab2).toHaveAttribute('tabindex', '0')
      expect(tab3).toHaveAttribute('tabindex', '-1')
    })

    it('updates tabindex when active tab changes', async () => {
      const user = userEvent.setup()
      render(<AccessibleTabs tabs={mockTabs} />)
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
      
      expect(tab1).toHaveAttribute('tabindex', '0')
      expect(tab2).toHaveAttribute('tabindex', '-1')
      
      await user.click(tab2)
      
      expect(tab1).toHaveAttribute('tabindex', '-1')
      expect(tab2).toHaveAttribute('tabindex', '0')
    })
  })

  describe('Axe Accessibility Tests', () => {
    it('should not have any accessibility violations', async () => {
      const { container } = render(<AccessibleTabs tabs={mockTabs} />)
      const results = await axe(container)
      
      expect(results).toHaveNoViolations()
    })

    it('should not have violations when tab is selected', async () => {
      const user = userEvent.setup()
      const { container } = render(<AccessibleTabs tabs={mockTabs} />)
      
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
      await user.click(tab2)
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with custom defaultActiveId', async () => {
      const { container } = render(
        <AccessibleTabs tabs={mockTabs} defaultActiveId="tab3" />
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty tabs array gracefully', () => {
      const { container } = render(<AccessibleTabs tabs={[]} />)
      expect(container.firstChild).toBeNull()
    })

    it('handles single tab', () => {
      const singleTab: Tab[] = [
        { id: 'only', label: 'Only Tab', content: <div>Only Content</div> }
      ]
      render(<AccessibleTabs tabs={singleTab} />)
      
      const tabs = screen.getAllByRole('tab')
      expect(tabs).toHaveLength(1)
      
      const tab = screen.getByRole('tab', { name: 'Only Tab' })
      expect(tab).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByText('Only Content')).toBeVisible()
    })

    it('handles invalid defaultActiveId by selecting first tab', () => {
      render(<AccessibleTabs tabs={mockTabs} defaultActiveId="invalid" />)
      
      const tabs = screen.getAllByRole('tab')
        expect(tabs).toHaveLength(3)
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
      expect(tab1).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByText('Content 1')).toBeVisible()
    })
  })
})