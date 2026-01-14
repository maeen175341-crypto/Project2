
import React from 'react';
import { Atmosphere } from './Atmosphere';

interface LayoutProps {
  children: React.ReactNode;
  dynamicColor?: string;
  uiTheme?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, dynamicColor, uiTheme }) => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 animated-gradient overflow-hidden selection:bg-wisdom-gold/30">
      
      {/* نظام السكون الحي في الخلفية */}
      <Atmosphere uiTheme={uiTheme || (dynamicColor ? 'active' : undefined)} dynamicColor={dynamicColor} />

      {/* توهج مركزي ثابت للتوازن البصري */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-[4000ms] ease-in-out opacity-30 blur-[150px] z-0"
        style={{ 
          background: dynamicColor 
            ? `radial-gradient(circle at 50% 50%, ${dynamicColor} 0%, transparent 85%)` 
            : 'transparent' 
        }}
      />
      
      <main className="w-full max-w-5xl z-10 flex flex-col items-center">
        {children}
      </main>

      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 text-slate-600 text-[10px] font-light tracking-[0.6em] uppercase flex gap-6 opacity-30 hover:opacity-100 transition-opacity duration-1000 cursor-default">
        <span>منبر الحكمة</span>
        <span className="opacity-50">/</span>
        <span>Al-Manbar</span>
      </footer>
    </div>
  );
};
