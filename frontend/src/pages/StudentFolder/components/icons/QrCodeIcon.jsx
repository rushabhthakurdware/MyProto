import React from "react";

const QrCodeIcon = ({ className = "w-10 h-10" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="5" height="5" x="3" y="3" rx="1" />
    <rect width="5" height="5" x="16" y="3" rx="1" />
    <rect width="5" height="5" x="3" y="16" rx="1" />
    <path d="M12 21h.01" />
    <path d="M16 21h.01" />
    <path d="M21 21h.01" />
    <path d="M12 16h.01" />
    <path d="M16 16h.01" />
    <path d="M21 16h.01" />
    <path d="M21 12h.01" />
  </svg>
);

export default QrCodeIcon;
