import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8 w-auto" }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dark Blue part of the U */}
      <path 
        d="M60 40V120C60 142.091 77.9086 160 100 160H110V140H100C88.9543 140 80 131.046 80 120V40H60Z" 
        fill="#0f2947" 
      />
      {/* Light Blue part of the U */}
      <path 
        d="M110 40V160H130V40H110Z" 
        fill="#0a6fa0" 
      />
      {/* Green Plug */}
      <path 
        d="M60 40H80V30C80 27.2386 77.7614 25 75 25H65C62.2386 25 60 27.2386 60 30V40Z" 
        fill="#94c57c" 
      />
      <rect x="63" y="15" width="4" height="10" fill="#94c57c" />
      <rect x="73" y="15" width="4" height="10" fill="#94c57c" />
    </svg>
  );
}
