import React from 'react';

/**
 * GlobalGradients defines SVG definitions that are used throughout the application via CSS.
 * For example, dashboard icons use the #dashboard-icon-gradient defined here.
 */
const GlobalGradients: React.FC = () => {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true" style={{ visibility: 'hidden' }}>
      <defs>
        {/* Primary Industrial Gradient for Dashboard Icons */}
        <linearGradient id="dashboard-icon-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
          <stop offset="3.34%" stopColor="#2A4292" />
          <stop offset="45.18%" stopColor="#6291DE" />
          <stop offset="73.7%" stopColor="#800068" />
          <stop offset="102.22%" stopColor="#FF5900" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GlobalGradients;
