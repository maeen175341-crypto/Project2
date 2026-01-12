
import React, { useState } from 'react';

export const LegacySection: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !author) return;
    setSubmitted(true);
    // In a real app, we would write to Firebase Firestore here
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
        <h3 className="text-2xl text-slate-200">أثرك قيد الموازنة...</h3>
        <p className="text-slate-500">ستعرض حكمتك في سحابة الحكمة بعد مراجعة جوهرها.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-8 animate-slow-fade">
      <div className="text-center space-y-2">
        <h2 className="text-3xl text-slate-200 font-light">تخليد الأثر</h2>
        <p className="text-slate-500">أضف حكمة تؤمن بها ليقرأها السائرون من بعدك.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="اكتب هنا جوهر فكرك..."
            className="w-full glass rounded-2xl p-6 text-xl text-slate-100 min-h-[150px] focus:outline-none focus:ring-1 ring-slate-700 transition-all resize-none"
          />
        </div>
        <div className="space-y-2">
          <input
            required
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="اسمك أو توقيعك الفلسفي"
            className="w-full glass rounded-full px-6 py-4 text-slate-100 focus:outline-none focus:ring-1 ring-slate-700 transition-all"
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-slate-100 text-slate-900 rounded-full font-bold hover:bg-white transition-all shadow-xl shadow-white/5 active:scale-95"
        >
          نقش الأثر
        </button>
      </form>
    </div>
  );
};
