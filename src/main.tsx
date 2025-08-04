import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error boundary for initialization
const handleError = (error: Error) => {
  console.error('Application initialization error:', error);
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: #0f172a;
        color: white;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
      ">
        <h1 style="color: #ef4444; margin-bottom: 20px;">Application Error</h1>
        <p style="margin-bottom: 20px;">Something went wrong while loading the application.</p>
        <button 
          onclick="window.location.reload()" 
          style="
            background: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          "
        >
          Reload Page
        </button>
      </div>
    `;
  }
};

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  handleError(event.error || new Error('Unknown error'));
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  handleError(new Error(event.reason));
});

const rootElement = document.getElementById("root")
if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  } catch (error) {
    console.error('React initialization error:', error);
    handleError(error as Error);
  }
} else {
  console.error('Root element not found');
  handleError(new Error('Root element not found'));
}
