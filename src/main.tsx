import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import Vercel Analytics and Speed Insights
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Import Google Analytics
import ReactGA from 'react-ga4';
import { useEffect } from 'react';

// Initialize Google Analytics
ReactGA.initialize('G-C9W23LREBY');

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Analytics />
    <SpeedInsights />
  </>
);
