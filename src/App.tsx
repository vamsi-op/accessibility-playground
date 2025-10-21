import './App.css'
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle'
import AccessibleDropdown from './components/AccessibleDropdown/AccessibleDropdown'
import AccessibleModal from './components/AccessibleModal/AccessibleModal'
import AccessibleButton from './components/AccessibleButton/AccessibleButton'
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

          <section className="info">
            <h3>Features Demonstrated:</h3>
            <ul>
              <li>✓ Accessible Button (variants, loading, disabled states)</li>
              <li>✓ Accessible Dropdown (keyboard navigation & ARIA)</li>
              <li>✓ Accessible Modal (focus trap & announcements)</li>
              <li>✓ Theme Toggle (system preference detection)</li>
              <li>✓ WCAG 2.1 AA compliance</li>
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
