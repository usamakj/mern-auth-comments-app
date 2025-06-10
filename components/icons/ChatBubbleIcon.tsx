
import React from 'react';

interface IconProps {
  className?: string;
}

export const ChatBubbleIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={className || "w-6 h-6"}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.543-3.091a9.117 9.117 0 0 1-1.255 0c-5.122 0-9.25-3.119-9.25-7.018V9.608c0-1.135.847-2.099 1.979-2.193.34-.026.678-.051 1.018-.072V3.75a2.25 2.25 0 0 1 .609-1.528c.529-.527 1.258-.809 2.01-.809H14.25a2.25 2.25 0 0 1 2.25 2.25v2.813c.884.283 1.5 1.127 1.5 2.097Z" />
  </svg>
);
    