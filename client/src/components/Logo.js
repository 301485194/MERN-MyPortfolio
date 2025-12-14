import React from 'react';

export default function Logo() {
  return (
    <div className="logo">
      <svg width="48" height="48" viewBox="0 0 100 100">
        <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" fill="#2b6cb0" />
        <text x="50" y="58" fontSize="22" fill="#fff" fontFamily="sans-serif" textAnchor="middle">MSH</text>
      </svg>
    </div>
  );
}
