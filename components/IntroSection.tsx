
import React, { useState } from 'react';

interface IntroSectionProps {
  onSubmit: (text: string) => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      onSubmit(input);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-16 animate-slow-fade max-w-2xl w-full">
      <div className="space-y-6">
        <h1 className="quote-font text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight text-glow">
          اكتب شعورك..
        </h1>
        <p className="text-slate-400 text-xl md:text-2xl font-light tracking-wide">
          وخذ حكمة تناسبك
        </p>
      </div>
      
      <div className="w-full relative group px-4">
        <textarea
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ما الذي يفيض به قلبك الآن؟"
          className="w-full bg-transparent border-b border-slate-800/50 py-6 text-2xl md:text-3xl text-center text-white focus:outline-none focus:border-wisdom-gold/50 transition-all duration-700 placeholder:text-slate-800 placeholder:italic resize-none min-h-[100px] font-light"
        />
        
        <div className="mt-8 flex flex-col items-center gap-4 opacity-0 group-focus-within:opacity-100 transition-all duration-1000 delay-300 translate-y-2 group-focus-within:translate-y-0">
          <button 
            onClick={() => input.trim() && onSubmit(input)}
            className="px-10 py-3 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/5 text-slate-400 hover:text-white transition-all text-sm tracking-widest font-light"
          >
            استحضار الحكمة
          </button>
          <span className="text-slate-700 text-[10px] uppercase tracking-[0.2em]">
            أو اضغط Enter
          </span>
        </div>
      </div>
    </div>
  );
};
