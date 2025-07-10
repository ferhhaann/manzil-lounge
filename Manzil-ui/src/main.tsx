import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';

// Performance monitoring
if (import.meta.env.PROD) {
  // Log performance metrics
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart);
    console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.fetchStart);
  });
}

const container = document.getElementById("root");
if (!container) throw new Error('Root element not found');

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
