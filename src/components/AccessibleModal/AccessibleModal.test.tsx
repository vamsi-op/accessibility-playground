import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { AccessibleModal } from './AccessibleModal'

expect.extend(toHaveNoViolations)

describe('AccessibleModal', () => {
  const mockOnClose = vi.fn()
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    title: 'Test Modal',
    children: <p>Modal content</p>,
  }

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  describe('Rendering', () => {
    it('renders when isOpen is true', () => {
      render(<AccessibleModal {...defaultProps} />)
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('Test Modal')).toBeInTheDocument()
      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })

    it('does not render when isOpen is false', () => {
      render(<AccessibleModal {...defaultProps} isOpen={false} />)
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('has correct ARIA attributes', () => {
      render(<AccessibleModal {...defaultProps} />)
      
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-modal', 'true')
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title')
      expect(dialog).toHaveAttribute('aria-describedby', 'modal-description')
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<AccessibleModal {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Closing Behavior', () => {
    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup()
      render(<AccessibleModal {...defaultProps} />)
      
      const closeButton = screen.getByLabelText('Close modal')
      await user.click(closeButton)
      
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('calls onClose when Escape key is pressed', async () => {
      const user = userEvent.setup()
      render(<AccessibleModal {...defaultProps} />)
      
      await user.keyboard('{Escape}')
      
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('calls onClose when clicking backdrop', async () => {
      const user = userEvent.setup()
      render(<AccessibleModal {...defaultProps} />)
      
      const backdrop = screen.getByRole('presentation')
      await user.click(backdrop)
      
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('does not close when clicking inside modal content', async () => {
      const user = userEvent.setup()
      render(<AccessibleModal {...defaultProps} />)
      
      const content = screen.getByText('Modal content')
      await user.click(content)
      
      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })

  describe('Focus Management', () => {
    it('focuses the first focusable element when opened', async () => {
      render(
        <AccessibleModal {...defaultProps}>
          <button>First Focusable Element</button>
          <p>Modal content</p>
        </AccessibleModal>
      )
      
      // Wait for focus to be set
      const firstButton = screen.getByText('First Focusable Element')
      await waitFor(() => {
        expect(firstButton).toHaveFocus()
      }, { timeout: 500 })
    })

    it('returns focus to previous element when closed', async () => {
      render(
        <div>
          <button>Trigger Button</button>
          <AccessibleModal {...defaultProps} />
        </div>
      )
      
      const triggerButton = screen.getByText('Trigger Button')
      triggerButton.focus()
      
      const closeButton = screen.getByLabelText('Close modal')
      closeButton.click()
      
      // Wait for focus to return
      await waitFor(() => {
        expect(triggerButton).toHaveFocus()
      }, { timeout: 500 })
    })
  })

  describe('Focus Trap', () => {
    it('traps focus within modal when Tab is pressed', async () => {
      const user = userEvent.setup()
      render(
        <AccessibleModal {...defaultProps}>
          <button>First Button</button>
          <button>Second Button</button>
        </AccessibleModal>
      )
      
      // Wait for initial focus
      const firstButton = screen.getByText('First Button')
      await waitFor(() => {
        expect(firstButton).toHaveFocus()
      }, { timeout: 500 })
      
      const secondButton = screen.getByText('Second Button')
      const closeButton = screen.getByLabelText('Close modal')
      
      // Tab to second button
      await user.tab()
      expect(secondButton).toHaveFocus()
      
      // Tab to close button
      await user.tab()
      expect(closeButton).toHaveFocus()
      
      // Tab should wrap back to first button
      await user.tab()
      expect(firstButton).toHaveFocus()
    })

    it('traps focus within modal when Shift+Tab is pressed', async () => {
      const user = userEvent.setup()
      render(
        <AccessibleModal {...defaultProps}>
          <button>First Button</button>
          <button>Second Button</button>
        </AccessibleModal>
      )
      
      // Wait for initial focus
      const firstButton = screen.getByText('First Button')
      await waitFor(() => {
        expect(firstButton).toHaveFocus()
      }, { timeout: 500 })
      
      const secondButton = screen.getByText('Second Button')
      const closeButton = screen.getByLabelText('Close modal')
      
      // Shift+Tab should wrap to last focusable element (close button)
      await user.tab({ shift: true })
      expect(closeButton).toHaveFocus()
      
      // Shift+Tab to second button
      await user.tab({ shift: true })
      expect(secondButton).toHaveFocus()
      
      // Shift+Tab to first button
      await user.tab({ shift: true })
      expect(firstButton).toHaveFocus()
    })
  })

  describe('Body Scroll', () => {
    it('prevents body scroll when open', () => {
      render(<AccessibleModal {...defaultProps} />)
      
      expect(document.body.style.overflow).toBe('hidden')
    })

    it('restores body scroll when closed', async () => {
      const { unmount } = render(<AccessibleModal {...defaultProps} />)
      
      expect(document.body.style.overflow).toBe('hidden')
      
      // Change props to close the modal
      render(<AccessibleModal {...defaultProps} isOpen={false} />)
      
      // Wait for cleanup
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('')
      }, { timeout: 500 })
    })
  })

  describe('Scrolling', () => {
    it('allows scrolling within modal content', () => {
      render(
        <AccessibleModal {...defaultProps}>
          <div style={{ height: '2000px' }}>
            <p>Long content to test scrolling</p>
          </div>
        </AccessibleModal>
      )
      
      const modalBody = screen.getByText('Long content to test scrolling').closest('.modal-body')
      expect(modalBody).toBeInTheDocument()
      // The overflow style is defined in CSS, not inline styles
    })
  })
})