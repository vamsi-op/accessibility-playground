import { useState, useRef, useEffect } from 'react'
import './AccessibleTabs.css'

export interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

export interface AccessibleTabsProps {
  tabs: Tab[]
  defaultActiveId?: string
}

/**
 * Accessible Tabs Component
 * 
 * Features:
 * - Mouse click to switch tabs
 * - Arrow keys (Left/Right) to navigate tabs
 * - Home/End keys to jump to first/last tab
 * - ARIA attributes for screen readers
 * - Focus management with visible focus styles
 * - Tab panels hidden with display:none when inactive
 */
export function AccessibleTabs({
  tabs,
  defaultActiveId,
}: AccessibleTabsProps) {
  const [activeTabId, setActiveTabId] = useState<string>(() => {
    // If defaultActiveId is provided and valid, use it
    if (defaultActiveId && tabs.some(tab => tab.id === defaultActiveId)) {
      return defaultActiveId
    }
    // Otherwise, fall back to first tab
    return tabs[0]?.id || ''
  })
  
  const tabListRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const tabsId = useRef(`tabs-${Math.random().toString(36).substr(2, 9)}`)

  // Get current active index
  const getActiveIndex = () => tabs.findIndex(tab => tab.id === activeTabId)

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Only handle keyboard events when focus is within the tab list
      if (!tabListRef.current?.contains(document.activeElement)) {
        return
      }

      const currentIndex = getActiveIndex()

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault()
          const nextIndex = Math.min(tabs.length - 1, currentIndex + 1)
          setActiveTabId(tabs[nextIndex].id)
          tabRefs.current[nextIndex]?.focus()
          break

        case 'ArrowLeft':
          event.preventDefault()
          const prevIndex = Math.max(0, currentIndex - 1)
          setActiveTabId(tabs[prevIndex].id)
          tabRefs.current[prevIndex]?.focus()
          break

        case 'Home':
          event.preventDefault()
          setActiveTabId(tabs[0].id)
          tabRefs.current[0]?.focus()
          break

        case 'End':
          event.preventDefault()
          const lastIndex = tabs.length - 1
          setActiveTabId(tabs[lastIndex].id)
          tabRefs.current[lastIndex]?.focus()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeTabId, tabs])

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId)
  }

  if (tabs.length === 0) {
    return null
  }

  return (
    <div className="accessible-tabs">
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Content tabs"
        className="tab-list"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTabId
          return (
            <button
              key={tab.id}
              ref={el => (tabRefs.current[index] = el)}
              id={`${tabsId.current}-tab-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tabsId.current}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleTabClick(tab.id)}
              className={`tab ${isActive ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {tabs.map(tab => {
        const isActive = tab.id === activeTabId
        return (
          <div
            key={tab.id}
            id={`${tabsId.current}-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`${tabsId.current}-tab-${tab.id}`}
            tabIndex={0}
            style={{ display: isActive ? 'block' : 'none' }}
            className="tab-panel"
          >
            {tab.content}
          </div>
        )
      })}
    </div>
  )
}

export default AccessibleTabs