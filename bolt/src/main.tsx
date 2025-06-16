import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import TestStagewise from './TestStagewise.tsx';
import './index.css';
import './components/custom-gradients.css';

// Comment out the test component
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <TestStagewise />
//   </StrictMode>
// );

// Use the main App component
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
