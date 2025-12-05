"use client";

import React from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

export const BackgroundBlob = () => {
  const { x, y } = useMousePosition();

  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none">

      {/* Blob principal qui suit la souris */}
      <div
        className="absolute rounded-full bg-blue-500/25 blur-[100px]"
        style={{
          width: '350px',
          height: '350px',
          left: -175, // On décale de la moitié de la largeur pour centrer sur la souris
          top: -175,  // On décale de la moitié de la hauteur
          transform: `translate(${x}px, ${y}px)`,
          // L'ajout de transition crée cet effet de "retard" fluide et agréable
          transition: 'transform 0.2s ease-out',
        }}
      />

      {/* Blob secondaire statique en bas à droite */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/15 blur-[100px] rounded-full" />

    </div>
  );
};
