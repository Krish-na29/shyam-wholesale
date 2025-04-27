import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = () => {
  ReactGA.initialize('G-C9W23LREBY');
};

// Track page views
export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
};

// Track events
export const logEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value
  });
};
