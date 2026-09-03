import React, { useEffect, useState } from 'react';

interface AnalysingTransitionProps {
  onFinished: () => void;
}

export const AnalysingTransition: React.FC<AnalysingTransitionProps> = ({
  onFinished,
}) => {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinished, 180);
          return 100;
        }
        return prev + Math.floor(Math.random() * 22) + 12;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 text-center select-none">
      <div className="max-w-md w-full bg-white rounded-[32px] p-8 sm:p-12 border border-zinc-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        
        {/* Minimal GAFA Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-[10px] font-mono text-zinc-500 mb-6 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping"></span>
          <span>GAFA ARCHIVE SYSTEM 2026</span>
        </div>

        {/* Large Typography Headline */}
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 mb-2">
          ANALYSING YOUR CREATIVE STATE...
        </h2>

        {/* Chinese Subtitle */}
        <p className="text-sm sm:text-base font-medium text-zinc-500 mb-8">
          正在解构计算并生成你的 GAFA 创作档案
        </p>

        {/* Sleek Minimalist Progress Bar */}
        <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden mb-4 border border-zinc-200/40">
          <div
            className="h-full bg-black transition-all duration-200 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Progress Percentage & Status Ticker */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>DIMENSION MATRIX SYNTHESIS</span>
          <span className="font-bold text-black">{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  );
};
