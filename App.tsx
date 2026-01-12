
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { IntroSection } from './components/IntroSection';
import { PoeticLoader } from './components/PoeticLoader';
import { WisdomCard } from './components/WisdomCard';
import { ContemplationView } from './components/ContemplationView';
import { LegacySection } from './components/LegacySection';
import { AppState, Wisdom, Contemplation } from './types';
import { summonWisdom, contemplateWisdom } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.INTRO);
  const [wisdom, setWisdom] = useState<Wisdom | null>(null);
  const [contemplation, setContemplation] = useState<Contemplation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSummon = async (input: string) => {
    setError(null);
    setState(AppState.SUMMONING);
    
    try {
      // استدعاء الخدمة التي أصبحت الآن تدعم البحث المحلي السريع
      const result = await summonWisdom(input);
      setWisdom(result);
      setState(AppState.REVELATION);
    } catch (err: any) {
      setError(err.message || 'عذراً، وقع خطأ ما.');
      setState(AppState.INTRO);
    }
  };

  const handleContemplate = async () => {
    if (!wisdom) return;
    setState(AppState.SUMMONING);
    try {
      const result = await contemplateWisdom(wisdom);
      setContemplation(result);
      setState(AppState.CONTEMPLATION);
    } catch (err: any) {
      setError(err.message);
      setState(AppState.REVELATION);
    }
  };

  const reset = () => {
    setWisdom(null);
    setContemplation(null);
    setError(null);
    setState(AppState.INTRO);
  };

  return (
    <Layout dynamicColor={wisdom?.moodColor}>
      {error && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-red-900/40 text-red-200 border border-red-800 rounded-full text-sm animate-slow-fade z-[100]">
          {error}
        </div>
      )}

      {state === AppState.INTRO && (
        <IntroSection onSubmit={handleSummon} />
      )}

      {state === AppState.SUMMONING && (
        <PoeticLoader />
      )}

      {state === AppState.REVELATION && wisdom && (
        <WisdomCard 
          wisdom={wisdom} 
          onContemplate={handleContemplate} 
          onReset={reset}
        />
      )}

      {state === AppState.CONTEMPLATION && wisdom && contemplation && (
        <ContemplationView 
          wisdom={wisdom} 
          contemplation={contemplation} 
          onBack={() => setState(AppState.REVELATION)} 
        />
      )}

      {state === AppState.LEGACY && (
        <LegacySection onComplete={reset} />
      )}

      {(state === AppState.INTRO || state === AppState.REVELATION) && (
        <button
          onClick={() => setState(AppState.LEGACY)}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-400 text-sm font-light transition-colors"
        >
          أريد تخليد أثر...
        </button>
      )}
    </Layout>
  );
};

export default App;
