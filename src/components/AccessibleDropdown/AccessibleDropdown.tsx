import { useState, useRef, useEffect } from 'react'
import './AccessibleDropdown.css'

export interface DropdownOption {
  id: string
  label: string
}

export interface AccessibleDropdownProps {
  label: string
  options: DropdownOption[]
  onSelect?: (option: DropdownOption) => void
  defaultValue?: string
}

/**
 * Accessible Dropdown Component
 * 
 * Features:
 * - Full keyboard navigation (Tab, Arrow keys, Enter, Escape)
 * - ARIA attributes for screen readers
 * - Focus management
 * - Visual focus indicators
 */
export function AccessibleDropdown({
  label,
  options,
  onSelect,
  defaultValue,
}: AccessibleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    options.find(opt => opt.id === defaultValue) || null
  )
  
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const dropdownId = useRef(`dropdown-${Math.random().toString(36).substr(2, 9)}`)

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'Escape':
          event.preventDefault()
          setIsOpen(false)
          buttonRef.current?.focus()
          break

        case 'ArrowDown':
          event.preventDefault()
          setActiveIndex(prev =>
            prev === null ? 0 : Math.min(options.length - 1, prev + 1)
          )
          break

        case 'ArrowUp':
          event.preventDefault()
          setActiveIndex(prev =>
            prev === null ? options.length - 1 : Math.max(0, prev - 1)
          )
          break

        case 'Enter':
          event.preventDefault()
          if (activeIndex !== null) {
            handleSelect(options[activeIndex])
          }
          break

        case 'Home':
          event.preventDefault()
          setActiveIndex(0)
          break

        case 'End':
          event.preventDefault()
          setActiveIndex(options.length - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, activeIndex, options])

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex !== null && listRef.current) {
      const activeItem = listRef.current.querySelector(
        `[data-index="${activeIndex}"]`
      ) as HTMLElement
      activeItem?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Set active index to selected item or first item
      const selectedIndex = selectedOption
        ? options.findIndex(opt => opt.id === selectedOption.id)
        : 0
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
    }
  }

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option)
    setIsOpen(false)
    buttonRef.current?.focus()
    onSelect?.(option)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node) &&
      listRef.current &&
      !listRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="accessible-dropdown">
      <button
        ref={buttonRef}
        id={`${dropdownId.current}-button`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${dropdownId.current}-label ${dropdownId.current}-button`}
        onClick={handleToggle}
        className="dropdown-button"
      >
        <span id={`${dropdownId.current}-label`} className="dropdown-label">
          {label}:
        </span>
        <span className="dropdown-value">
          {selectedOption ? selectedOption.label : 'Select an option'}
        </span>
        <span className="dropdown-arrow" aria-hidden="true">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby={`${dropdownId.current}-label`}
          className="dropdown-list"
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              key={option.id}
              role="option"
              aria-selected={activeIndex === index}
              data-index={index}
              className={`dropdown-option ${
                activeIndex === index ? 'active' : ''
              } ${selectedOption?.id === option.id ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {option.label}
              {selectedOption?.id === option.id && (
                <span className="check-mark" aria-hidden="true">
                  ✓
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AccessibleDropdown
