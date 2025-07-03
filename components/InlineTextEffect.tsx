"use client"
import React from 'react';
import './inline-text-effect.css';

interface InlineTextEffectProps {
  children: React.ReactNode;
  hoverText: string;
}

const InlineTextEffect: React.FC<InlineTextEffectProps> = ({ children, hoverText }) => {
  return (
    <span className="inline-text-effect">
      {children}
      <span className="inline-text-effect-span">{hoverText}</span>
    </span>
  );
};


export default InlineTextEffect; 