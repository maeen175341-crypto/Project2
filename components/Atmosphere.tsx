
import React from 'react';

interface AtmosphereProps {
  uiTheme?: string;
  dynamicColor?: string;
}

export const Atmosphere: React.FC<AtmosphereProps> = ({ uiTheme, dynamicColor }) => {
  if (!uiTheme && !dynamicColor) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <style>
        {`
          @keyframes subtle-glow {
            0%, 100% { 
              transform: scale(1) translate(0, 0);
              opacity: 0.07;
            }
            50% { 
              transform: scale(1.05) translate(1%, 1%);
              opacity: 0.12;
            }
          }
          
          .living-glow {
            position: absolute;
            width: 120vw;
            height: 120vw;
            border-radius: 50%;
            filter: blur(140px);
            mix-blend-mode: plus-lighter;
            will-change: transform, opacity;
            animation: subtle-glow 60s ease-in-out infinite;
          }

          .orb-1 {
            top: -20%;
            left: -10%;
            background: radial-gradient(circle, ${dynamicColor || '#1e1b4b'} 0%, transparent 70%);
          }

          .orb-2 {
            bottom: -30%;
            right: -10%;
            background: radial-gradient(circle, #0f172a 0%, transparent 70%);
            animation-delay: -30s;
          }
        `}
      </style>
      
      <div className="living-glow orb-1" />
      <div className="living-glow orb-2" />
      
      {/* طبقة عزل لضمان وضوح النص فوق الإضاءة المتحركة */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />
    </div>
  );
};
