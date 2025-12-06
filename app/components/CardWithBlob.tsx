"use client";

import React, { useState, useEffect } from 'react';

interface CardWithBlobProps {
  children: React.ReactNode;
  className?: string;
}

export const CardWithBlob: React.FC<CardWithBlobProps> = ({ children, className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Désactiver sur mobile
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseEnter={!isMobile ? () => setIsHovered(true) : undefined}
      onMouseLeave={!isMobile ? () => setIsHovered(false) : undefined}
    >
      {/* Blob qui suit la souris - désactivé sur mobile */}
      {!isMobile && isHovered && (
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
