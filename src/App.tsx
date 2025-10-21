import './App.css'
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle'
import AccessibleDropdown from './components/AccessibleDropdown/AccessibleDropdown'
import AccessibleModal from './components/AccessibleModal/AccessibleModal'
import AccessibleButton from './components/AccessibleButton/AccessibleButton'
import { AccessibleTabs } from './components/AccessibleTabs/AccessibleTabs'
import { AccessibleTooltip } from './components/AccessibleTooltip/AccessibleTooltip'
import { useState } from 'react'

function App() {
  const fruitOptions = [
    { id: '1', label: 'Apple' },
    { id: '2', label: 'Banana' },
    { id: '3', label: 'Cherry' },
    { id: '4', label: 'Date' },
    { id: '5', label: 'Elderberry' },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)

  const tabsData = [
    { id: 'tab1', label: 'Overview', content: <div><p>Welcome to the Accessibility Playground! This project demonstrates various accessible React components.</p></div> },
    { id: 'tab2', label: 'Features', content: <div><ul><li>Keyboard Navigation</li><li>Screen Reader Support</li><li>ARIA Attributes</li></ul></div> },
    { id: 'tab3', label: 'Testing', content: <div><p>All components include comprehensive tests with axe-core accessibility validation.</p></div> },
  ]

  return (
    <>
      <ThemeToggle />
      <div className="App">
        <header>
          <h1>♿ Accessibility Playground</h1>
          <p>Interactive accessible component examples</p>
        </header>

        <main>
          <section>
            <h2>Accessible Dropdown Example</h2>
            <p>Try using keyboard navigation: Tab, Arrow keys, Enter, Escape</p>
            
            <AccessibleDropdown
              label="Choose a fruit"
              options={fruitOptions}
              onSelect={(option) => console.log('Selected:', option)}
            />
          </section>

          <section>
            <h2>Accessible Button Examples</h2>
            <p>Interactive buttons with loading states, variants, and icons</p>
            
            <div className="button-demo-grid">
              <AccessibleButton 
                variant="primary"
                onClick={() => console.log('Primary clicked')}
              >
                Primary Button
              </AccessibleButton>
              
              <AccessibleButton 
                variant="secondary"
                onClick={() => console.log('Secondary clicked')}
              >
                Secondary Button
              </AccessibleButton>
              
              <AccessibleButton 
                variant="danger"
                size="small"
                onClick={() => console.log('Danger clicked')}
              >
                Delete Item
              </AccessibleButton>
              
              <AccessibleButton 
                isLoading
                onClick={() => console.log('Loading clicked')}
              >
                Loading...
              </AccessibleButton>
              
              <AccessibleButton 
                disabled
                onClick={() => console.log('Disabled clicked')}
              >
                Disabled
              </AccessibleButton>
            </div>
          </section>

          <section>
            <h2>Accessible Modal Example</h2>
            <p>Try opening the modal and navigating with Tab and Escape keys</p>
            
            <AccessibleButton 
              variant="primary"
              onClick={() => setIsModalOpen(true)}
            >
              Open Modal
            </AccessibleButton>
            
            <AccessibleModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Accessible Modal Example"
            >
              <p>This is an example of an accessible modal dialog.</p>
              <p>Features:</p>
              <ul>
                <li>✓ Focus trap - focus stays within the modal</li>
                <li>✓ Escape key closes the modal</li>
                <li>✓ Click outside closes the modal</li>
                <li>✓ Proper ARIA attributes for screen readers</li>
                <li>✓ Returns focus to the trigger button when closed</li>
              </ul>
              <AccessibleButton 
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Close Modal
              </AccessibleButton>
            </AccessibleModal>
          </section>

          <section>
            <h2>Accessible Tabs Example</h2>
            <p>Use Arrow keys (Left/Right) to navigate tabs, Home/End to jump</p>
            
            <AccessibleTabs tabs={tabsData} defaultActiveId="tab1" />
          </section>

          <section>
            <h2>Accessible Tooltip Example</h2>
            <p>Hover over or focus on the buttons to see tooltips</p>
            
            <div className="tooltip-demo">
              <AccessibleTooltip content="This is a tooltip on the top">
                <AccessibleButton>Top Tooltip</AccessibleButton>
              </AccessibleTooltip>
              
              <AccessibleTooltip content="This tooltip appears on the bottom" position="bottom">
                <AccessibleButton>Bottom Tooltip</AccessibleButton>
              </AccessibleTooltip>
              
              <AccessibleTooltip content="This tooltip appears on the left" position="left">
                <AccessibleButton>Left Tooltip</AccessibleButton>
              </AccessibleTooltip>
              
              <AccessibleTooltip content="This tooltip appears on the right" position="right">
                <AccessibleButton>Right Tooltip</AccessibleButton>
              </AccessibleTooltip>
              
              <AccessibleTooltip 
                content={
                  <div>
                    <p><strong>Rich Content Tooltip</strong></p>
                    <p>This tooltip contains HTML content:</p>
                    <ul>
                      <li>Bold text</li>
                      <li>Lists</li>
                      <li>Multiple paragraphs</li>
                    </ul>
                  </div>
                }
              >
                <AccessibleButton>Rich Content</AccessibleButton>
              </AccessibleTooltip>
            </div>
          </section>

          <section className="info">
            <h3>Features Demonstrated:</h3>
            <ul>
              <li>✓ Accessible Button (variants, loading, disabled states)</li>
              <li>✓ Accessible Dropdown (keyboard navigation & ARIA)</li>
              <li>✓ Accessible Modal (focus trap & announcements)</li>
              <li>✓ Accessible Tooltip (hover/focus, positioning, rich content)</li>
              <li>✓ Theme Toggle (system preference detection)</li>
              <li>✓ WCAG 2.1 AA compliance</li>
              <li>✓ Keyboard navigation (Tab, Arrows, Enter, Escape, Home, End)</li>
              <li>✓ ARIA attributes (role, aria-expanded, aria-selected)</li>
              <li>✓ Focus management</li>
              <li>✓ Screen reader support</li>
            </ul>
          </section>
        </main>

        <footer>
          <p>Built with React + TypeScript • <a href="https://github.com">View on GitHub</a></p>
        </footer>
      </div>
    </>
  )
}

export default App