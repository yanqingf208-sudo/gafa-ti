import React from 'react';
import { ArrowUpRight, Sparkles, ChevronDown } from 'lucide-react';
import { CharacterAvatar } from '../assets/characters/CharacterAvatar';

interface HeroSectionProps {
  onStartQuiz: () => void;
  onExploreStates: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartQuiz,
  onExploreStates,
}) => {
  return (
    <section className="relative w-full px-3 sm:px-6 lg:px-10 pt-2 pb-12 sm:pb-20">
      {/* Central Giant White Rounded Content Container (Reference 1 Inspiration) */}
      <div className="relative max-w-6xl mx-auto bg-white rounded-[28px] sm:rounded-[44px] md:rounded-[56px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-zinc-200/70 overflow-hidden flex flex-col items-center justify-between min-h-[640px] sm:min-h-[760px] md:min-h-[840px] px-6 sm:px-12 pt-10 sm:pt-16 pb-0">
        
        {/* Top Minimalist Header Tag */}
        <div className="flex flex-col items-center text-center space-y-1.5 z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100/90 text-zinc-600 text-[11px] font-mono tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#121212]"></span>
            <span>GAFA Creative Type Indicator</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
            广美创作状态测试 · 迎新特别企划
          </span>
        </div>

        {/* Center Typography & CTA Block with Generous Whitespace */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto my-auto z-20 pt-6 sm:pt-10">
          {/* Central Main Headline */}
          <h1 className="font-extrabold tracking-[-0.04em] text-[#121212] leading-[0.95] text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-5 sm:mb-6 select-none">
            <span className="block">WHAT'S YOUR</span>
            <span className="block text-black">GAFA-TI?</span>
          </h1>

          {/* Chinese Main Question */}
          <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 mb-3 sm:mb-4">
            你的创作，会以怎样的方式发生？
          </p>

          {/* Secondary Editorial Explanatory Text */}
          <p className="text-zinc-500 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed mb-8 sm:mb-10">
            30个关于灵感、观察、表达、合作与落地的情境问题，
            <br className="hidden sm:inline" />
            探索属于你的 16 种广州美术学院原生创作状态。
          </p>

          {/* Primary CTA - Black Capsule Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onStartQuiz}
              className="group relative inline-flex items-center justify-center gap-3 bg-[#121212] hover:bg-black text-white text-base sm:text-lg font-medium px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] cursor-pointer"
            >
              <span>开始测试</span>
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
                START TEST
              </span>
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-[#D4FF00] group-hover:text-black transition-all duration-200">
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>

            <button
              onClick={onExploreStates}
              className="text-xs sm:text-sm font-medium text-zinc-600 hover:text-black px-4 py-2 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>浏览16种创作状态</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Emerging GAFA Characters Composition (Reference 1 Staggered & Cropped) */}
        {/* Staggered overlapping characters emerging from the bottom edge */}
        <div className="relative w-full h-44 sm:h-56 md:h-72 lg:h-80 overflow-hidden flex items-end justify-center pointer-events-none select-none mt-6 sm:mt-10">
          {/* Subtle bottom gradient veil */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>

          {/* Left Wing Character: GT-06 Emotive Creator (Partially Cropped Left) */}
          <div className="absolute -left-10 sm:left-4 md:left-8 -bottom-10 sm:-bottom-8 transform scale-75 sm:scale-90 md:scale-100 -rotate-3 transition-transform duration-500 hover:rotate-0">
            <div className="p-3 bg-white/90 rounded-2xl shadow-sm border border-zinc-200/70">
              <span className="text-[10px] font-mono text-zinc-500 block mb-1">GT-06 感性表达型</span>
              <CharacterAvatar id="gt-06" size="md" />
            </div>
          </div>

          {/* Center-Left Character: GT-01 Precision Builder (Slightly behind center) */}
          <div className="absolute left-[20%] sm:left-[22%] -bottom-6 sm:-bottom-4 transform scale-85 sm:scale-95 md:scale-105 z-0">
            <div className="p-3 bg-white/95 rounded-2xl shadow-sm border border-zinc-200/80">
              <span className="text-[10px] font-mono text-zinc-500 block mb-1">GT-01 精准构建型</span>
              <CharacterAvatar id="gt-01" size="md" />
            </div>
          </div>

          {/* Center Character: GT-14 Sensitive Observer (Easel Painter, Focal Anchor) */}
          <div className="relative -bottom-2 sm:-bottom-1 transform scale-95 sm:scale-105 md:scale-115 z-10">
            <div className="p-3.5 bg-white rounded-3xl shadow-md border border-zinc-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-zinc-700">GT-14 细腻感知型</span>
                <span className="w-2 h-2 rounded-full bg-[#EA580C]"></span>
              </div>
              <CharacterAvatar id="gt-14" size="md" />
            </div>
          </div>

          {/* Center-Right Character: GT-08 Idea Sparker (Graffiti Sketcher) */}
          <div className="absolute right-[20%] sm:right-[22%] -bottom-8 sm:-bottom-5 transform scale-85 sm:scale-95 md:scale-105 z-0">
            <div className="p-3 bg-white/95 rounded-2xl shadow-sm border border-zinc-200/80">
              <span className="text-[10px] font-mono text-zinc-500 block mb-1">GT-08 灵感迸发型</span>
              <CharacterAvatar id="gt-08" size="md" />
            </div>
          </div>

          {/* Right Wing Character: GT-13 Hands-on Tester (Partially Cropped Right) */}
          <div className="absolute -right-10 sm:right-4 md:right-8 -bottom-10 sm:-bottom-8 transform scale-75 sm:scale-90 md:scale-100 rotate-3 transition-transform duration-500 hover:rotate-0">
            <div className="p-3 bg-white/90 rounded-2xl shadow-sm border border-zinc-200/70">
              <span className="text-[10px] font-mono text-zinc-500 block mb-1">GT-13 动手验证型</span>
              <CharacterAvatar id="gt-13" size="md" />
            </div>
          </div>
        </div>

        {/* Subtle Decorative Editorial Coordinates & Metadata */}
        <div className="absolute bottom-3 left-6 sm:left-10 z-20 hidden md:flex items-center gap-2 text-[10px] font-mono text-zinc-400">
          <span>GUANGZHOU ACADEMY OF FINE ARTS</span>
          <span>·</span>
          <span>CAMPUS ARCHIVE</span>
        </div>

        <div className="absolute bottom-3 right-6 sm:right-10 z-20 hidden md:flex items-center gap-2 text-[10px] font-mono text-zinc-400">
          <span>16 CREATIVE PROFILES</span>
          <span>·</span>
          <span>INDEX 01-16</span>
        </div>
      </div>
    </section>
  );
};
