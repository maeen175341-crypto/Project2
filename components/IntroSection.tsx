
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
    <div className="flex flex-col items-center justify-center text-center space-y-12 animate-slow-fade">
      <h1 className="text-4xl md:text-5xl font-light text-slate-200 tracking-tight leading-relaxed">
        اكتب ما أثقل فكرك... <br />
        <span className="text-slate-500 text-3xl">ودع الحكمة تجيبك.</span>
      </h1>
      
      <div className="w-full max-w-lg relative group">
        <textarea
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="عبّر عن حالتك هنا..."
          className="w-full bg-transparent border-b border-slate-700 p-4 text-2xl text-center text-slate-100 focus:outline-none focus:border-slate-400 transition-all placeholder:text-slate-800 placeholder:italic resize-none min-h-[120px]"
        />
        <div className="absolute -bottom-10 left-0 right-0 text-slate-600 text-sm opacity-0 group-focus-within:opacity-100 transition-opacity flex justify-center items-center gap-2">
          اضغط 
          <kbd className="px-2 py-1 bg-slate-800 rounded text-xs border border-slate-700">Enter</kbd>
          للاستحضار
        </div>
      </div>
    </div>
  );
};
