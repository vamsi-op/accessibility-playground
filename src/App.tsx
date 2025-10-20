import './App.css'
import AccessibleDropdown from './components/AccessibleDropdown/AccessibleDropdown'
import AccessibleModal from './components/AccessibleModal/AccessibleModal'
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
          <h2>Accessible Modal Example</h2>
          <p>Try opening the modal and navigating with Tab and Escape keys</p>
          
          <button onClick={() => setIsModalOpen(true)}>
            Open Modal
          </button>
          
          <AccessibleModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Accessible Modal Example"
          >
            <p>This is an example of an accessible modal dialog.</p>
            <p>Features:</p>
            <ul>
              <li>Focus trap - focus stays within the modal</li>
              <li>Escape key closes the modal</li>
              <li>Click outside closes the modal</li>
              <li>Proper ARIA attributes for screen readers</li>
              <li>Returns focus to the trigger button when closed</li>
            </ul>
            <button onClick={() => setIsModalOpen(false)}>
              Close Modal
            </button>
          </AccessibleModal>
        </section>

        <section className="info">
          <h3>Features Demonstrated:</h3>
          <ul>
            <li>✓ Keyboard navigation (Tab, Arrows, Enter, Escape)</li>
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
  )
}

export default App
