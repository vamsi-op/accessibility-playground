import './App.css'
import AccessibleDropdown from './components/AccessibleDropdown/AccessibleDropdown'
import { AccessibleTabs } from './components/AccessibleDropdown/AccessibleTabs'

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
        <section>
          <h2>Accessible Tabs Example</h2>
          <p>Try using keyboard navigation: Tab, Arrow keys, Home, End</p>
          <AccessibleTabs
            tabs={[
              { id: 'tab1', label: 'Tab 1', content: <p>Content for Tab 1</p> },
              { id: 'tab2', label: 'Tab 2', content: <p>Content for Tab 2</p> },
              { id: 'tab3', label: 'Tab 3', content: <p>Content for Tab 3</p> },
            ]}
            defaultActiveId="tab1"
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
