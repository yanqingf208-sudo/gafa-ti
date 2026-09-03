import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'quiz' | 'result';
  onNavigate: (view: 'home' | 'quiz') => void;
  onScrollToStates?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onScrollToStates,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 backdrop-blur-md bg-[#ECECED]/85 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo / Monogram */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#D4FF00] text-black flex items-center justify-center font-bold text-sm tracking-tighter transition-transform group-hover:scale-105 shadow-xs">
            G
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-base sm:text-lg block leading-none">
              GAFA-TI
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-mono mt-0.5">
              CREATIVE TYPE INDICATOR
            </span>
          </div>
        </button>

        {/* Center Tag - Art Academy Orientation */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-zinc-200/80 text-[11px] font-mono text-zinc-600">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse"></span>
          <span>广州美术学院 · 2026迎新创作档案测试</span>
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentView === 'home' && (
            <button
              onClick={onScrollToStates}
              className="text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full hover:bg-white/80 text-zinc-700 transition-colors cursor-pointer"
            >
              16种创作状态
            </button>
          )}

          {currentView !== 'quiz' && (
            <button
              onClick={() => onNavigate('quiz')}
              className="flex items-center gap-1.5 bg-[#121212] text-white text-xs sm:text-sm font-medium px-4 py-1.5 sm:py-2 rounded-full hover:bg-[#D4FF00] hover:text-black transition-all group shadow-sm cursor-pointer"
            >
              <span>开始测试</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}

          {currentView === 'quiz' && (
            <button
              onClick={() => onNavigate('home')}
              className="text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-zinc-800 transition-colors cursor-pointer"
            >
              退出测试
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
