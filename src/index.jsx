import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('React root created, rendering App...');
try {
  root.render(<React.StrictMode><App /></React.StrictMode>);
} catch (e) {
  console.error('Render error:', e);
}
