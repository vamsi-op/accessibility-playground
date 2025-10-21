import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { AccessibleTooltip } from './AccessibleTooltip'

expect.extend(toHaveNoViolations)

describe('AccessibleTooltip', () => {
  describe('Rendering', () => {
    it('renders trigger element with children', () => {
      render(
        <AccessibleTooltip content="Tooltip content">
          Hover me
        </AccessibleTooltip>
      )
      
      expect(screen.getByText('Hover me')).toBeInTheDocument()
    })

    it('does not show tooltip by default', () => {
      render(
        <AccessibleTooltip content="Tooltip content">
          Hover me
        </AccessibleTooltip>
      )
      
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })

    it('shows tooltip when visible prop is true', () => {
      render(
        <AccessibleTooltip content="Tooltip content" isVisible>
          Hover me
        </AccessibleTooltip>
      )
      
      expect(screen.getByText('Tooltip content')).toBeInTheDocument()
      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      render(
        <AccessibleTooltip content="Tooltip content" className="custom-class" isVisible>
          Hover me
        </AccessibleTooltip>
      )
      
      const tooltip = screen.getByRole('tooltip')
      expect(tooltip).toHaveClass('custom-class')
    })

    it('renders with test id', () => {
      render(
        <AccessibleTooltip content="Tooltip content" data-testid="test-tooltip" isVisible>
          Hover me
        </AccessibleTooltip>
      )
      
      expect(screen.getByTestId('test-tooltip')).toBeInTheDocument()
      expect(screen.getByTestId('test-tooltip-trigger')).toBeInTheDocument()
    })
  })

  describe('Mouse Events', () => {
    it('shows tooltip on mouse enter', async () => {
      const user = userEvent.setup()
      
      render(
        <AccessibleTooltip content="Tooltip content">
          Hover me
        </AccessibleTooltip>
      )
      
      const trigger = screen.getByTestId('accessible-tooltip-trigger')
      await user.hover(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument()
      })
    })

    it('hides tooltip on mouse leave', async () => {
      const user = userEvent.setup()
      
      render(
        <AccessibleTooltip content="Tooltip content">
          Hover me
        </AccessibleTooltip>
      )
      
      const trigger = screen.getByTestId('accessible-tooltip-trigger')
      await user.hover(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument()
      })
      
      await user.unhover(trigger)
      
      await waitFor(() => {
        expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      }, { timeout: 200 })
    })

    it('allows moving mouse to tooltip without hiding it', async () => {
      const user = userEvent.setup()
      
      render(
        <AccessibleTooltip content="Tooltip content">
          Hover me
        </AccessibleTooltip>
      )
      
      const trigger = screen.getByTestId('accessible-tooltip-trigger')
      await user.hover(trigger)
      
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument()
      })
      
      // Move to tooltip (should not hide)
      const tooltip = screen.getByRole('tooltip')
      await user.hover(tooltip)
      
      // Wait a bit to ensure it doesn't hide
      await new Promise(resolve => setTimeout(resolve, 150))
      
      expect(screen.getByText('Tooltip content')).toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    it('shows tooltip on focus', async () => {
      const user = userEvent.setup()
      
      render(
        <AccessibleTooltip content="Tooltip content">
          Focus me
        </AccessibleTooltip>
      )
      
      const trigger = screen.getByTestId('accessible-tooltip-trigger')
      trigger.focus()
      
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument()
      })
    })

    it('hides tooltip on blur', async () => {
      const user = userEvent.setup()
      
      render(
        <div>
          <AccessibleTooltip content="Tooltip content">
            Focus me
          </AccessibleTooltip>
          <button>Other button</button>
        </div>
      )
      
      const trigger = screen.getByTestId('accessible-tooltip-trigger')
      const otherButton = screen.getByText('Other button')
      
      trigger.focus()
      
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument()
      })
      
      otherButton.focus()
      
      await waitFor(() => {
        expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      }, { timeout: 200 })
    })

    it('can be focused with Tab key', async () => {
      const user = userEvent.setup()
      
      render(
        <div>
          <button>First</button>
          <AccessibleTooltip content="Tooltip content">
            Middle
          </AccessibleTooltip>
          <button>Last</button>
        </div>
      )
      
      await user.tab()
      expect(screen.getByText('First')).toHaveFocus()
      
      await user.tab()
      expect(screen.getByTestId('accessible-tooltip-trigger')).toHaveFocus()
      
      await user.tab()
      expect(screen.getByText('Last')).toHaveFocus()
    })

    it('shows visible focus indicator', () => {
      render(
        <AccessibleTooltip content="Tooltip content">
          Focus me
        </AccessibleTooltip>
      )
      
      const trigger = screen.getByTestId('accessible-tooltip-trigger')
      trigger.focus()
      
      expect(trigger).toHaveFocus()
    })
  })

  describe('Escape Key', () => {
    it('hides tooltip when Escape key is pressed', async () => {
      const user = userEvent.setup()
      
      render(
        <AccessibleTooltip content="Tooltip content">
          Focus me
        </AccessibleTooltip>
      )
      
      const trigger = screen.getByTestId('accessible-tooltip-trigger')
      trigger.focus()
      
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument()
      })
      
      await user.keyboard('{Escape}')
      
      await waitFor(() => {
        expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      })
    })

    it('returns focus to trigger when Escape key is pressed', async () => {
      const user = userEvent.setup()
      
      render(
        <div>
          <AccessibleTooltip content="Tooltip content">
            Focus me
          </AccessibleTooltip>
          <button>Other button</button>
        </div>
      )
      
      const trigger = screen.getByTestId('accessible-tooltip-trigger')
      trigger.focus()
      
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument()
      })
      
      await user.keyboard('{Escape}')
      
      await waitFor(() => {
        expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      })
      
      expect(trigger).toHaveFocus()
    })
  })

  describe('ARIA Attributes', () => {
    it('has correct role attribute', () => {
      render(
        <AccessibleTooltip content="Tooltip content" isVisible>
          Hover me
        </AccessibleTooltip>
      )
      
      const tooltip = screen.getByRole('tooltip')
      expect(tooltip).toBeInTheDocument()
    })

    it('has correct aria-describedby relationship', () => {
      render(
        <AccessibleTooltip content="Tooltip content" isVisible id="test-tooltip">
          Hover me
        </AccessibleTooltip>
      )
      
      const trigger = screen.getByTestId('accessible-tooltip-trigger')
      const tooltip = screen.getByRole('tooltip')
      
      expect(trigger).toHaveAttribute('aria-describedby', 'test-tooltip')
      expect(tooltip).toHaveAttribute('id', 'test-tooltip')
    })

    it('removes aria-describedby when tooltip is hidden', async () => {
      render(
        <AccessibleTooltip content="Tooltip content" id="test-tooltip">
          Hover me
        </AccessibleTooltip>
      )
      
      const trigger = screen.getByTestId('accessible-tooltip-trigger')
      expect(trigger).not.toHaveAttribute('aria-describedby')
      
      fireEvent.mouseEnter(trigger)
      
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-describedby', 'test-tooltip')
      })
      
      fireEvent.mouseLeave(trigger)
      
      await waitFor(() => {
        expect(trigger).not.toHaveAttribute('aria-describedby')
      }, { timeout: 200 })
    })
  })

  describe('Positioning', () => {
    it('applies top position class by default', () => {
      render(
        <AccessibleTooltip content="Tooltip content" isVisible>
          Hover me
        </AccessibleTooltip>
      )
      
      const tooltip = screen.getByRole('tooltip')
      expect(tooltip).toHaveClass('accessible-tooltip--top')
    })

    it('applies correct position class based on prop', () => {
      render(
        <AccessibleTooltip content="Tooltip content" position="bottom" isVisible>
          Hover me
        </AccessibleTooltip>
      )
      
      const tooltip = screen.getByRole('tooltip')
      expect(tooltip).toHaveClass('accessible-tooltip--bottom')
      expect(tooltip).not.toHaveClass('accessible-tooltip--top')
    })

    it('supports all position variants', () => {
      const positions = ['top', 'bottom', 'left', 'right'] as const
      
      positions.forEach(position => {
        const { rerender } = render(
          <AccessibleTooltip content="Tooltip content" position={position} isVisible>
            Hover me
          </AccessibleTooltip>
        )
        
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip).toHaveClass(`accessible-tooltip--${position}`)
        
        // Clean up for next iteration
        rerender(<></>)
      })
    })
  })

  describe('Controlled vs Uncontrolled', () => {
    it('uses internal state when not controlled', () => {
      vi.useFakeTimers()
      
      render(
        <AccessibleTooltip content="Tooltip content">
          Hover me
        </AccessibleTooltip>
      )
      
      const trigger = screen.getByTestId('accessible-tooltip-trigger')
      fireEvent.mouseEnter(trigger)
      
      // Advance timers to ensure the state update
      vi.advanceTimersByTime(10)
      
      expect(screen.getByText('Tooltip content')).toBeInTheDocument()
      
      vi.useRealTimers()
    })

    it('respects controlled visible prop', () => {
      render(
        <AccessibleTooltip content="Tooltip content" isVisible={false}>
          Hover me
        </AccessibleTooltip>
      )
      
      // Even though we hover, tooltip should not show because isVisible is false
      const trigger = screen.getByTestId('accessible-tooltip-trigger')
      fireEvent.mouseEnter(trigger)
      
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })

    it('calls onVisibilityChange when visibility changes', () => {
      const onVisibilityChange = vi.fn()
      vi.useFakeTimers()
      
      render(
        <AccessibleTooltip 
          content="Tooltip content" 
          onVisibilityChange={onVisibilityChange}
        >
          Hover me
        </AccessibleTooltip>
      )
      
      const trigger = screen.getByTestId('accessible-tooltip-trigger')
      fireEvent.mouseEnter(trigger)
      
      vi.advanceTimersByTime(10)
      
      expect(onVisibilityChange).toHaveBeenCalledWith(true)
      
      fireEvent.mouseLeave(trigger)
      vi.advanceTimersByTime(150)
      
      expect(onVisibilityChange).toHaveBeenCalledWith(false)
      
      vi.useRealTimers()
    })
  })

  describe('Edge Cases', () => {
    it('handles complex content', () => {
      render(
        <AccessibleTooltip 
          content={
            <div>
              <h4>Complex Tooltip</h4>
              <p>This tooltip has <strong>rich content</strong></p>
            </div>
          } 
          isVisible
        >
          Hover me
        </AccessibleTooltip>
      )
      
      expect(screen.getByText('Complex Tooltip')).toBeInTheDocument()
      expect(screen.getByText('rich content')).toBeInTheDocument()
    })

    it('generates unique IDs when not provided', () => {
      render(
        <div>
          <AccessibleTooltip content="Tooltip 1" isVisible>
            Trigger 1
          </AccessibleTooltip>
          <AccessibleTooltip content="Tooltip 2" isVisible>
            Trigger 2
          </AccessibleTooltip>
        </div>
      )
      
      const tooltips = screen.getAllByRole('tooltip')
      const ids = tooltips.map(tooltip => tooltip.getAttribute('id'))
      
      // Both should have IDs and they should be different
      expect(ids[0]).toBeTruthy()
      expect(ids[1]).toBeTruthy()
      expect(ids[0]).not.toBe(ids[1])
    })

    it('uses provided ID when available', () => {
      render(
        <AccessibleTooltip content="Tooltip content" id="custom-id" isVisible>
          Hover me
        </AccessibleTooltip>
      )
      
      const tooltip = screen.getByRole('tooltip')
      expect(tooltip).toHaveAttribute('id', 'custom-id')
    })
  })

  describe('Accessibility Compliance', () => {
    it('should not have accessibility violations (default state)', async () => {
      const { container } = render(
        <AccessibleTooltip content="Tooltip content">
          Hover me
        </AccessibleTooltip>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations when visible', async () => {
      const { container } = render(
        <AccessibleTooltip content="Tooltip content" isVisible>
          Hover me
        </AccessibleTooltip>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with all positions', async () => {
      const positions = ['top', 'bottom', 'left', 'right'] as const
      
      for (const position of positions) {
        const { container, rerender } = render(
          <AccessibleTooltip content="Tooltip content" position={position} isVisible>
            Hover me
          </AccessibleTooltip>
        )
        
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        
        // Clean up for next iteration
        rerender(<></>)
      }
    })

    it('maintains proper focus management', async () => {
      const user = userEvent.setup()
      
      render(
        <div>
          <button>Before</button>
          <AccessibleTooltip content="Tooltip content">
            Trigger
          </AccessibleTooltip>
          <button>After</button>
        </div>
      )
      
      const trigger = screen.getByTestId('accessible-tooltip-trigger')
      trigger.focus()
      
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument()
      })
      
      await user.keyboard('{Escape}')
      
      await waitFor(() => {
        expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
      })
      
      expect(trigger).toHaveFocus()
    })
  })

  describe('Performance', () => {
    it('renders quickly with many props', () => {
      const start = performance.now()
      
      render(
        <AccessibleTooltip
          content="Tooltip content"
          position="top"
          isVisible
          onVisibilityChange={() => {}}
          id="test-id"
          className="test-class"
          data-testid="perf-test"
        >
          Hover me
        </AccessibleTooltip>
      )
      
      const end = performance.now()
      const renderTime = end - start
      
      expect(renderTime).toBeLessThan(50) // Should render in under 50ms
      expect(screen.getByTestId('perf-test')).toBeInTheDocument()
    })
  })
})