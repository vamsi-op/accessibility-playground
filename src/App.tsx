import './App.css'
import AccessibleDropdown from './components/AccessibleDropdown/AccessibleDropdown'

function App() {
  const fruitOptions = [
    { id: '1', label: 'Apple' },
    { id: '2', label: 'Banana' },
    { id: '3', label: 'Cherry' },
    { id: '4', label: 'Date' },
    { id: '5', label: 'Elderberry' },
  ]

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
