import { useState, useRef, useEffect } from 'react'
import './AccessibleTooltip.css'

export interface AccessibleTooltipProps {
  /** Content to show in the tooltip */
  content: React.ReactNode
  /** Element that triggers the tooltip */
  children: React.ReactNode
  /** Position of the tooltip relative to the trigger */
  position?: 'top' | 'bottom' | 'left' | 'right'
  /** Whether the tooltip is visible */
  isVisible?: boolean
  /** Callback when tooltip visibility changes */
  onVisibilityChange?: (visible: boolean) => void
  /** Unique ID for the tooltip */
  id?: string
  /** Additional CSS classes */
  className?: string
  /** Test ID for testing */
  'data-testid'?: string
}

/**
 * Accessible Tooltip Component
 * 
 * Features:
 * - Show on hover and keyboard focus
 * - Hide on blur and mouse out
 * - Support dynamic content via props
 * - Intelligent positioning (top, bottom, left, right)
 * - No overlap with trigger element
 * - Uses role=tooltip and aria-describedby
 * - Keyboard accessible
 * - ESC key to dismiss
 * - WCAG 2.1 compliant
 */
export function AccessibleTooltip({
  content,
  children,
  position = 'top',
  isVisible: controlledVisible,
  onVisibilityChange,
  id,
  className = '',
  'data-testid': testId,
}: AccessibleTooltipProps) {
  const [internalVisible, setInternalVisible] = useState(false)
  const isVisible = controlledVisible ?? internalVisible
  const setVisible = (visible: boolean) => {
    if (controlledVisible === undefined) {
      setInternalVisible(visible)
    }
    onVisibilityChange?.(visible)
  }

  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle ESC key to dismiss tooltip
  useEffect(() => {
    if (!isVisible) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setVisible(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isVisible])

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
    setVisible(true)
  }

  const handleMouseLeave = () => {
    // Delay hiding to allow moving mouse to tooltip
    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false)
      hideTimeoutRef.current = null
    }, 100)
  }

  const handleFocus = () => {
    setVisible(true)
  }

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    // Don't hide if focus is moving to the tooltip itself
    if (tooltipRef.current?.contains(e.relatedTarget as Node)) {
      return
    }
    
    // Small delay to handle focus transitions
    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false)
      hideTimeoutRef.current = null
    }, 100)
  }

  // Generate CSS classes
  const tooltipClasses = [
    'accessible-tooltip',
    `accessible-tooltip--${position}`,
    isVisible && 'accessible-tooltip--visible',
    className
  ].filter(Boolean).join(' ')

  // Unique ID for accessibility
  const tooltipId = id || `accessible-tooltip-${Math.random().toString(36).substr(2, 9)}`

  // Test ID for tooltip
  const tooltipTestId = testId || 'accessible-tooltip'

  return (
    <span className="accessible-tooltip-wrapper">
      <button
        ref={triggerRef}
        className="accessible-tooltip-trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-describedby={isVisible ? tooltipId : undefined}
        type="button"
        data-testid={`${tooltipTestId}-trigger`}
      >
        {children}
      </button>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          className={tooltipClasses}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-testid={tooltipTestId}
        >
          <div className="accessible-tooltip__content">
            {content}
          </div>
          <div className="accessible-tooltip__arrow" />
        </div>
      )}
    </span>
  )
}

export default AccessibleTooltip