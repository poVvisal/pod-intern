import { StrictMode } from 'react' // StrictMode helps identify potential problems in an application.
import { createRoot } from 'react-dom/client' // createRoot is used to create a root to display React components inside a browser DOM node.
import './index.css' // Imports global CSS styles
import App from './App.jsx' // Imports the main App component from App.jsx

// Find the HTML element with the id 'root' in index.html and initialize a React root there
createRoot(document.getElementById('root')).render(
  // StrictMode wraps the App component to enable extra checks and warnings
  <StrictMode>
    {/* This is the App component being rendered onto the screen */}
    <App />
  </StrictMode>,
)
