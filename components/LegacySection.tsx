
import React, { useState } from 'react';

export const LegacySection: React.FC<{ onComplete: () => void; onBack: () => void }> = ({ onComplete, onBack }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !author) return;
    setSubmitted(true);
    // محاكاة حفظ البيانات في مستودع الحكمة
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="text-center space-y-6 animate-slow-fade">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
        </div>
        <h3 className="text-2xl text-white font-light">أثرك قيد الموازنة...</h3>
        <p className="text-slate-400 font-light">ستعرض حكمتك في سحابة الحكمة بعد مراجعة جوهرها من قبل الحكماء.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-8 animate-slow-fade relative group">
      {/* زر العودة في الزاوية العلوية - يظهر بوضوح عند الحاجة */}
      <button
        type="button"
        onClick={onBack}
        className="absolute -top-12 left-0 md:-left-8 p-4 text-slate-500 hover:text-white transition-all duration-500 z-20 group/back flex items-center gap-2"
        title="تراجع - العودة دون إضافة"
      >
        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
          <span className="text-xl group-hover/back:-translate-x-1 transition-transform">←</span>
          <span className="text-xs tracking-widest uppercase font-light">إلغاء</span>
        </div>
      </button>

      <div className="text-center space-y-2 pt-4">
        <h2 className="text-3xl text-white font-light tracking-tight">تخليد الأثر</h2>
        <p className="text-slate-400 font-light">شارك حكمة تؤمن بها لتكون منارة لمن يأتي بعدك.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="اكتب هنا جوهر فكرك..."
            className="w-full glass rounded-3xl p-6 text-xl text-white min-h-[180px] focus:outline-none focus:ring-1 ring-white/20 transition-all resize-none placeholder:text-slate-700 font-light"
          />
        </div>
        <div className="space-y-2">
          <input
            required
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="اسمك أو توقيعك الفلسفي"
            className="w-full glass rounded-full px-6 py-4 text-white focus:outline-none focus:ring-1 ring-white/20 transition-all placeholder:text-slate-700 font-light"
          />
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-5 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-all shadow-xl shadow-white/5 active:scale-95 text-lg"
          >
            نقش الأثر في السحابة
          </button>
        </div>
      </form>
      
      <p className="text-center text-[10px] text-slate-700 tracking-widest uppercase py-4">
        لن يتم نشر أي شيء دون ضغطك على زر النقش
      </p>
    </div>
  );
};
