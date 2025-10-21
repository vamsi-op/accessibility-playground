import { useState, useEffect, useRef } from 'react'
import './AccessibleButton.css'

export interface AccessibleButtonProps {
  /** Button text content */
  children: React.ReactNode
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'danger'
  /** Size of the button */
  size?: 'small' | 'medium' | 'large'
  /** Whether the button is in loading state */
  isLoading?: boolean
  /** Whether the button is disabled */
  disabled?: boolean
  /** Optional icon to display */
  icon?: React.ReactNode
  /** Position of the icon relative to text */
  iconPosition?: 'left' | 'right'
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset'
  /** Click handler function */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Additional CSS classes */
  className?: string
  /** ARIA label for accessibility */
  'aria-label'?: string
  /** ARIA described by for additional context */
  'aria-describedby'?: string
  /** Test ID for testing */
  'data-testid'?: string
}

/**
 * Accessible Button Component
 * 
 * Features:
 * - Multiple variants (primary, secondary, danger)
 * - Size options (small, medium, large) 
 * - Loading state with spinner and ARIA announcements
 * - Disabled state with proper ARIA attributes
 * - Icon support with flexible positioning
 * - Full keyboard navigation support
 * - Screen reader friendly
 * - WCAG 2.1 AA compliant colors
 */
export function AccessibleButton({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  type = 'button',
  onClick,
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'data-testid': testId,
  ...rest
}: AccessibleButtonProps) {
  const [announcement, setAnnouncement] = useState('')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const previousLoadingState = useRef(isLoading)

  // Announce loading state changes to screen readers
  useEffect(() => {
    if (isLoading) {
      setAnnouncement('Loading, please wait')
    } else if (previousLoadingState.current) {
      setAnnouncement('Loading complete')
    }
    previousLoadingState.current = isLoading
  }, [isLoading])

  // Clear announcement after it's been announced
  useEffect(() => {
    if (announcement) {
      const timer = setTimeout(() => setAnnouncement(''), 1000)
      return () => clearTimeout(timer)
    }
  }, [announcement])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent clicks when loading or disabled
    if (isLoading || disabled) {
      event.preventDefault()
      return
    }
    
    onClick?.(event)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Prevent space/enter when loading or disabled
    if ((event.key === ' ' || event.key === 'Enter') && (isLoading || disabled)) {
      event.preventDefault()
    }
  }

  // Generate CSS classes
  const buttonClasses = [
    'accessible-button',
    `accessible-button--${variant}`,
    `accessible-button--${size}`,
    isLoading && 'accessible-button--loading',
    disabled && 'accessible-button--disabled',
    icon && 'accessible-button--with-icon',
    className
  ].filter(Boolean).join(' ')

  // Loading spinner component
  const LoadingSpinner = () => (
    <span 
      className="accessible-button__spinner" 
      aria-hidden="true"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="2"
        />
        <path
          d="M15 8a7 7 0 01-7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )

  return (
    <>
      <button
        ref={buttonRef}
        type={type}
        className={buttonClasses}
        disabled={disabled}
        aria-busy={isLoading ? 'true' : 'false'}
        aria-disabled={disabled || isLoading ? 'true' : 'false'}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-testid={testId}
        {...rest}
      >
        {/* Left icon */}
        {icon && iconPosition === 'left' && !isLoading && (
          <span className="accessible-button__icon accessible-button__icon--left" aria-hidden="true">
            {icon}
          </span>
        )}
        
        {/* Loading spinner (replaces left icon when loading) */}
        {isLoading && (
          <LoadingSpinner />
        )}

        {/* Button text */}
        <span className="accessible-button__text">
          {children}
        </span>

        {/* Right icon */}
        {icon && iconPosition === 'right' && !isLoading && (
          <span className="accessible-button__icon accessible-button__icon--right" aria-hidden="true">
            {icon}
          </span>
        )}
      </button>

      {/* Screen reader announcements for state changes */}
      {announcement && (
        <div
          aria-live="polite"
          aria-atomic="true"
          className="visually-hidden"
        >
          {announcement}
        </div>
      )}
    </>
  )
}

export default AccessibleButton