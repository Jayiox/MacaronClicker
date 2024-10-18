import React from 'react';

function Tooltip({ children, positionClass }) {
  return (
    <div className={`absolute bg-pink-800 text-white p-4 rounded shadow-lg z-20 ${positionClass}`}  style={{ width: '351px' }}>
      {children}
    </div>
  );
}

export default Tooltip;