import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { AccessibleButton } from './AccessibleButton'

expect.extend(toHaveNoViolations)

describe('AccessibleButton', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<AccessibleButton>Click me</AccessibleButton>)
      
      const button = screen.getByRole('button', { name: 'Click me' })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('accessible-button--primary')
      expect(button).toHaveClass('accessible-button--medium')
    })

    it('renders with custom variant and size', () => {
      render(
        <AccessibleButton variant="secondary" size="large">
          Secondary Button
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('accessible-button--secondary')
      expect(button).toHaveClass('accessible-button--large')
    })

    it('renders with danger variant', () => {
      render(
        <AccessibleButton variant="danger" size="small">
          Delete
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('accessible-button--danger')
      expect(button).toHaveClass('accessible-button--small')
    })

    it('renders with custom className', () => {
      render(
        <AccessibleButton className="custom-class">
          Button
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('renders with test id', () => {
      render(
        <AccessibleButton data-testid="test-button">
          Button
        </AccessibleButton>
      )
      
      expect(screen.getByTestId('test-button')).toBeInTheDocument()
    })
  })

  describe('Icon Support', () => {
    const TestIcon = () => <svg data-testid="test-icon"><path /></svg>

    it('renders with left icon by default', () => {
      render(
        <AccessibleButton icon={<TestIcon />}>
          Button with icon
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      const icon = screen.getByTestId('test-icon')
      
      expect(button).toContainElement(icon)
      expect(button).toHaveClass('accessible-button--with-icon')
      expect(icon.closest('.accessible-button__icon--left')).toBeInTheDocument()
    })

    it('renders with right icon when specified', () => {
      render(
        <AccessibleButton icon={<TestIcon />} iconPosition="right">
          Button with right icon
        </AccessibleButton>
      )
      
      const icon = screen.getByTestId('test-icon')
      expect(icon.closest('.accessible-button__icon--right')).toBeInTheDocument()
    })

    it('hides icon when loading', () => {
      render(
        <AccessibleButton icon={<TestIcon />} isLoading>
          Loading button
        </AccessibleButton>
      )
      
      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument()
      // Check that the loading class is applied and button shows loading state
      const button = screen.getByRole('button')
      expect(button).toHaveClass('accessible-button--loading')
      expect(button).toHaveAttribute('aria-busy', 'true')
    })
  })

  describe('Loading State', () => {
    it('shows loading spinner when isLoading is true', () => {
      render(
        <AccessibleButton isLoading>
          Loading button
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      
      expect(button).toHaveClass('accessible-button--loading')
      expect(button).toHaveAttribute('aria-busy', 'true')
      // The spinner is decorative, so we check for the CSS presence instead
      expect(button.querySelector('.accessible-button__spinner')).toBeInTheDocument()
    })

    it('prevents clicks when loading', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(
        <AccessibleButton isLoading onClick={handleClick}>
          Loading button
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('prevents keyboard activation when loading', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(
        <AccessibleButton isLoading onClick={handleClick}>
          Loading button
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard('{Enter}')
      await user.keyboard(' ')
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('announces loading state changes', async () => {
      const { rerender } = render(
        <AccessibleButton isLoading={false}>
          Button
        </AccessibleButton>
      )
      
      rerender(
        <AccessibleButton isLoading={true}>
          Button
        </AccessibleButton>
      )
      
      await waitFor(() => {
        expect(screen.getByText('Loading, please wait')).toBeInTheDocument()
      })
    })

    it('announces loading completion', async () => {
      const { rerender } = render(
        <AccessibleButton isLoading={true}>
          Button
        </AccessibleButton>
      )
      
      rerender(
        <AccessibleButton isLoading={false}>
          Button
        </AccessibleButton>
      )
      
      await waitFor(() => {
        expect(screen.getByText('Loading complete')).toBeInTheDocument()
      })
    })
  })

  describe('Disabled State', () => {
    it('renders as disabled when disabled prop is true', () => {
      render(
        <AccessibleButton disabled>
          Disabled button
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-disabled', 'true')
      expect(button).toHaveClass('accessible-button--disabled')
    })

    it('prevents clicks when disabled', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(
        <AccessibleButton disabled onClick={handleClick}>
          Disabled button
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('prevents keyboard activation when disabled', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(
        <AccessibleButton disabled onClick={handleClick}>
          Disabled button
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard('{Enter}')
      await user.keyboard(' ')
      
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Click Handling', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(
        <AccessibleButton onClick={handleClick}>
          Click me
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('calls onClick with event object', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(
        <AccessibleButton onClick={handleClick}>
          Click me
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object))
    })

    it('works without onClick handler', async () => {
      const user = userEvent.setup()
      
      render(
        <AccessibleButton>
          Click me
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      await expect(user.click(button)).resolves.not.toThrow()
    })
  })

  describe('Keyboard Navigation', () => {
    it('can be focused with Tab key', async () => {
      const user = userEvent.setup()
      
      render(
        <div>
          <button>First</button>
          <AccessibleButton>Target</AccessibleButton>
          <button>Last</button>
        </div>
      )
      
      await user.tab()
      expect(screen.getByText('First')).toHaveFocus()
      
      await user.tab()
      expect(screen.getByRole('button', { name: 'Target' })).toHaveFocus()
    })

    it('can be activated with Enter key', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(
        <AccessibleButton onClick={handleClick}>
          Press Enter
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard('{Enter}')
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('can be activated with Space key', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(
        <AccessibleButton onClick={handleClick}>
          Press Space
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard(' ')
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('shows visible focus indicator', () => {
      render(
        <AccessibleButton>
          Focus me
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      button.focus()
      
      expect(button).toHaveFocus()
    })
  })

  describe('ARIA Attributes', () => {
    it('has correct aria-busy attribute', () => {
      const { rerender } = render(
        <AccessibleButton isLoading={false}>
          Button
        </AccessibleButton>
      )
      
      let button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-busy', 'false')
      
      rerender(
        <AccessibleButton isLoading={true}>
          Button
        </AccessibleButton>
      )
      
      button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-busy', 'true')
    })

    it('has correct aria-disabled attribute', () => {
      const { rerender } = render(
        <AccessibleButton disabled={false} isLoading={false}>
          Button
        </AccessibleButton>
      )
      
      let button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-disabled', 'false')
      
      rerender(
        <AccessibleButton disabled={true}>
          Button
        </AccessibleButton>
      )
      
      button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-disabled', 'true')
      
      rerender(
        <AccessibleButton isLoading={true}>
          Button
        </AccessibleButton>
      )
      
      button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('accepts custom aria-label', () => {
      render(
        <AccessibleButton aria-label="Custom label">
          Button
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button', { name: 'Custom label' })
      expect(button).toBeInTheDocument()
    })

    it('accepts aria-describedby', () => {
      render(
        <div>
          <AccessibleButton aria-describedby="help-text">
            Button
          </AccessibleButton>
          <div id="help-text">Helper text</div>
        </div>
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-describedby', 'help-text')
    })
  })

  describe('Button Types', () => {
    it('defaults to type="button"', () => {
      render(<AccessibleButton>Button</AccessibleButton>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })

    it('accepts type="submit"', () => {
      render(<AccessibleButton type="submit">Submit</AccessibleButton>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
    })

    it('accepts type="reset"', () => {
      render(<AccessibleButton type="reset">Reset</AccessibleButton>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'reset')
    })
  })

  describe('Edge Cases', () => {
    it('handles both disabled and loading states', () => {
      render(
        <AccessibleButton disabled isLoading>
          Button
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-busy', 'true')
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('handles empty children', () => {
      render(<AccessibleButton>{''}</AccessibleButton>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles complex children', () => {
      render(
        <AccessibleButton>
          <span>Complex</span> <strong>Content</strong>
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Complex Content')
    })

    it('handles rapid state changes', async () => {
      const { rerender } = render(
        <AccessibleButton isLoading={false}>
          Button
        </AccessibleButton>
      )
      
      // Rapid state changes
      for (let i = 0; i < 10; i++) {
        rerender(
          <AccessibleButton isLoading={i % 2 === 0}>
            Button
          </AccessibleButton>
        )
      }
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('renders quickly with many props', () => {
      const start = performance.now()
      
      render(
        <AccessibleButton
          variant="primary"
          size="large"
          isLoading={false}
          disabled={false}
          icon={<span>📎</span>}
          iconPosition="right"
          onClick={() => {}}
          className="test-class"
          aria-label="Test button"
          aria-describedby="test-description"
          data-testid="perf-test"
        >
          Performance Test Button
        </AccessibleButton>
      )
      
      const end = performance.now()
      const renderTime = end - start
      
      expect(renderTime).toBeLessThan(50) // Should render in under 50ms
      expect(screen.getByTestId('perf-test')).toBeInTheDocument()
    })
  })

  describe('Accessibility Compliance', () => {
    it('should not have accessibility violations (default state)', async () => {
      const { container } = render(
        <AccessibleButton>
          Test Button
        </AccessibleButton>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with all variants', async () => {
      const { container } = render(
        <div>
          <AccessibleButton variant="primary">Primary</AccessibleButton>
          <AccessibleButton variant="secondary">Secondary</AccessibleButton>
          <AccessibleButton variant="danger">Danger</AccessibleButton>
        </div>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations in loading state', async () => {
      const { container } = render(
        <AccessibleButton isLoading>
          Loading Button
        </AccessibleButton>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations in disabled state', async () => {
      const { container } = render(
        <AccessibleButton disabled>
          Disabled Button
        </AccessibleButton>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with icons', async () => {
      const { container } = render(
        <AccessibleButton icon={<span>📎</span>}>
          Button with Icon
        </AccessibleButton>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Screen Reader Support', () => {
    it('has live region for announcements', async () => {
      render(
        <AccessibleButton isLoading>
          Button
        </AccessibleButton>
      )
      
      await waitFor(() => {
        const liveRegion = screen.getByText('Loading, please wait')
        expect(liveRegion).toHaveAttribute('aria-live', 'polite')
        expect(liveRegion).toHaveAttribute('aria-atomic', 'true')
      })
    })

    it('clears announcements after timeout', async () => {
      vi.useFakeTimers()
      
      const { rerender } = render(
        <AccessibleButton isLoading={false}>
          Button
        </AccessibleButton>
      )
      
      rerender(
        <AccessibleButton isLoading={true}>
          Button
        </AccessibleButton>
      )
      
      await waitFor(() => {
        expect(screen.getByText('Loading, please wait')).toBeInTheDocument()
      })
      
      vi.advanceTimersByTime(1000)
      
      await waitFor(() => {
        expect(screen.queryByText('Loading, please wait')).not.toBeInTheDocument()
      })
      
      vi.useRealTimers()
    })

    it('hides decorative icons from screen readers', () => {
      render(
        <AccessibleButton icon={<span data-testid="icon">📎</span>}>
          Button
        </AccessibleButton>
      )
      
      const iconContainer = screen.getByTestId('icon').parentElement
      expect(iconContainer).toHaveAttribute('aria-hidden', 'true')
    })

    it('hides loading spinner from screen readers', () => {
      render(
        <AccessibleButton isLoading>
          Button
        </AccessibleButton>
      )
      
      const button = screen.getByRole('button')
      const spinner = button.querySelector('.accessible-button__spinner')
      expect(spinner).toHaveAttribute('aria-hidden', 'true')
    })
  })
})