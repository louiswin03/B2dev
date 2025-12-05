"use client";

import React, { useState } from 'react';

interface CardWithBlobProps {
  children: React.ReactNode;
  className?: string;
}

export const CardWithBlob: React.FC<CardWithBlobProps> = ({ children, className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Blob qui suit la souris */}
      {isHovered && (
        <div
          className="absolute rounded-full bg-blue-500/25 blur-[50px] pointer-events-none"
          style={{
            width: '150px',
            height: '150px',
            left: mousePosition.x - 75,
            top: mousePosition.y - 75,
            transition: 'opacity 0.3s ease-out',
          }}
        />
      )}

      {/* Contenu de la carte */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
