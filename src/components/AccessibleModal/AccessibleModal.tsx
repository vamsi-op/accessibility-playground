import { useState, useEffect, useRef } from 'react'
import './AccessibleModal.css'

export interface AccessibleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

/**
 * Accessible Modal Component
 * 
 * Features:
 * - Full keyboard navigation (Escape to close)
 * - ARIA attributes for screen readers
 * - Focus trap to contain focus within modal
 * - Returns focus to trigger element when closed
 * - Prevents body scroll when open
 * - Click outside to close
 */
export function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
}: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Handle focus trap and body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
      
      // Focus the first focusable element in the modal, excluding the close button
      const focusTimer = setTimeout(() => {
        if (modalRef.current) {
          // Get all focusable elements except the close button
          const focusableElements = modalRef.current.querySelectorAll(
            'button:not(.modal-close-button), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as NodeListOf<HTMLElement>
          
          // If there are focusable elements in the content, focus the first one
          if (focusableElements.length > 0) {
            focusableElements[0].focus()
          } else {
            // Otherwise, focus the close button
            const closeButton = modalRef.current.querySelector('.modal-close-button') as HTMLElement | null
            if (closeButton) {
              closeButton.focus()
            } else {
              // If no focusable elements at all, focus the modal itself
              modalRef.current.focus()
            }
          }
        }
      }, 100)
      
      return () => {
        clearTimeout(focusTimer)
      }
    } else {
      // Return focus to the element that opened the modal
      if (previousActiveElement.current) {
        const focusTimer = setTimeout(() => {
          previousActiveElement.current?.focus()
          // Restore body scroll after focus is returned
          document.body.style.overflow = ''
        }, 0)
        
        return () => clearTimeout(focusTimer)
      } else {
        // Restore body scroll immediately if no previous element
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  // Handle Escape key press
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Handle clicks outside modal
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === backdropRef.current) {
      onClose()
    }
  }

  // Handle focus trap
  useEffect(() => {
    if (!isOpen) return

    function handleFocusTrap(event: KeyboardEvent) {
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>
        
        if (focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleFocusTrap)
    return () => document.removeEventListener('keydown', handleFocusTrap)
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div
      ref={backdropRef}
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="modal-content"
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {title}
          </h2>
          <button
            aria-label="Close modal"
            className="modal-close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div id="modal-description" className="modal-body" role="document">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AccessibleModal