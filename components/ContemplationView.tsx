
import React from 'react';
import { Contemplation, Wisdom } from '../types';

interface ContemplationViewProps {
  wisdom: Wisdom;
  contemplation: Contemplation;
  onBack: () => void;
}

export const ContemplationView: React.FC<ContemplationViewProps> = ({ wisdom, contemplation, onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center p-6 animate-slow-fade overflow-y-auto">
      <div className="max-w-3xl w-full space-y-16 py-12">
        <div className="text-center space-y-6">
          <p className="quote-font text-3xl md:text-5xl font-bold text-slate-400 italic leading-relaxed">
            « {wisdom.text} »
          </p>
          <div className="h-px w-24 bg-slate-800 mx-auto" />
        </div>

        <div className="space-y-12">
          <section className="space-y-3 animate-slow-fade" style={{ animationDelay: '200ms' }}>
            <h4 className="text-xs uppercase tracking-[0.2em] text-blue-400 font-bold">المعنى الظاهر</h4>
            <p className="text-xl text-slate-200 leading-relaxed font-light">
              {contemplation.surfaceMeaning}
            </p>
          </section>

          <section className="space-y-3 animate-slow-fade" style={{ animationDelay: '400ms' }}>
            <h4 className="text-xs uppercase tracking-[0.2em] text-purple-400 font-bold">المعنى العميق</h4>
            <p className="text-xl text-slate-200 leading-relaxed font-light">
              {contemplation.deepMeaning}
            </p>
          </section>

          <section className="space-y-3 animate-slow-fade" style={{ animationDelay: '600ms' }}>
            <h4 className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-bold">تطبيق حياتي</h4>
            <p className="text-xl text-slate-200 leading-relaxed font-light italic">
              {contemplation.practicalApplication}
            </p>
          </section>
        </div>

        <button
          onClick={onBack}
          className="mx-auto block px-12 py-4 glass rounded-full text-slate-400 hover:text-white transition-all shadow-lg"
        >
          عودة
        </button>
      </div>
    </div>
  );
};
