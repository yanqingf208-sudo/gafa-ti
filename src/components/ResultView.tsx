import React, { useEffect, useState } from 'react';
import { ArrowUpRight, RotateCcw, Share2, Sparkles, Grid } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CreativeType } from '../types';
import { CharacterAvatar } from '../assets/characters/CharacterAvatar';
import { ShareResultCard } from './ShareResultCard';

interface ResultViewProps {
  type: CreativeType;
  onRetake: () => void;
  onExploreAll: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  type,
  onRetake,
  onExploreAll,
}) => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Confetti on result display
  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4FF00', '#121212', '#7C3AED', '#2563EB'],
      });
    } catch {
      // Ignore if iframe canvas blocked
    }
  }, []);

  return (
    <div className="w-full min-h-screen pb-24 pt-4 sm:pt-8 px-4 sm:px-8 max-w-6xl mx-auto">
      
      {/* Top Generous Whitespace & Editorial Tag (Section 13) */}
      <div className="flex items-center justify-between py-3 border-b border-zinc-300 text-xs font-mono text-zinc-500 mb-8 sm:mb-12">
        <div className="flex items-center gap-2">
          <span className="font-bold text-black">GAFA-TI ARCHIVE</span>
          <span>/</span>
          <span>FILE NO. {type.number}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4FF00]"></span>
          <span>CREATIVE PROFILE RESOLVED</span>
        </div>
      </div>

      {/* Main Hero Exhibition Card (Reference 1 & 2 aesthetic) */}
      <div className="bg-white rounded-[32px] sm:rounded-[48px] p-6 sm:p-12 md:p-16 border border-zinc-200 shadow-sm mb-12 relative overflow-hidden">
        
        {/* Editorial Index Numbering & Category */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-mono font-extrabold text-black">
              {type.number}
            </span>
            <span className="text-sm font-mono px-3 py-1 rounded-full bg-zinc-100 text-zinc-700">
              {type.mbtiCode}
            </span>
          </div>
          <span className="text-xs font-mono tracking-wider px-3 py-1 rounded-full border border-zinc-300 text-zinc-600 uppercase">
            {type.category}
          </span>
        </div>

        {/* Hero Title & Character Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Titles, Tagline & Keywords (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-900 leading-tight mb-2">
              {type.title}
            </h1>
            <p className="text-sm sm:text-base font-mono tracking-widest text-zinc-400 uppercase mb-6">
              {type.enTitle}
            </p>

            {/* Signature Manifesto Tagline */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 mb-6">
              <p className="text-base sm:text-lg font-medium text-zinc-800 leading-relaxed italic">
                “{type.tagline}”
              </p>
            </div>

            {/* 5 Core Keyword Pills */}
            <div className="flex flex-wrap gap-2">
              {type.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full bg-[#121212] text-white"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Character Visual Hero (5 cols, pure white, no CSS shadow) */}
          <div className="lg:col-span-5 flex items-center justify-center p-4 sm:p-6 bg-[#FFFFFF] rounded-[28px] border border-black/[0.06]">
            <CharacterAvatar id={type.id} size="hero" />
          </div>
        </div>

        {/* 4 Creative Dimensions Spectrum (Section 13 Swiss Grid) */}
        <div className="mt-12 pt-10 border-t border-zinc-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest">
              00 / CREATIVE DIMENSION SPECTRUM · 四维创作光谱
            </h3>
            <span className="text-xs font-mono text-zinc-400">GAFA-TI MATRIX</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* IE Dimension */}
            <div>
              <div className="flex justify-between items-baseline text-xs sm:text-sm font-medium mb-2 font-mono">
                <span className="font-bold text-black">{type.dimensions.ie.leftLabel} {type.dimensions.ie.leftScore}%</span>
                <span className="text-zinc-400">{type.dimensions.ie.rightScore}% {type.dimensions.ie.rightLabel}</span>
              </div>
              <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
                <div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${type.dimensions.ie.leftScore}%` }}
                />
              </div>
            </div>

            {/* NS Dimension */}
            <div>
              <div className="flex justify-between items-baseline text-xs sm:text-sm font-medium mb-2 font-mono">
                <span className="font-bold text-black">{type.dimensions.ns.leftLabel} {type.dimensions.ns.leftScore}%</span>
                <span className="text-zinc-400">{type.dimensions.ns.rightScore}% {type.dimensions.ns.rightLabel}</span>
              </div>
              <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
                <div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${type.dimensions.ns.leftScore}%` }}
                />
              </div>
            </div>

            {/* TF Dimension */}
            <div>
              <div className="flex justify-between items-baseline text-xs sm:text-sm font-medium mb-2 font-mono">
                <span className="font-bold text-black">{type.dimensions.tf.leftLabel} {type.dimensions.tf.leftScore}%</span>
                <span className="text-zinc-400">{type.dimensions.tf.rightScore}% {type.dimensions.tf.rightLabel}</span>
              </div>
              <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
                <div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${type.dimensions.tf.leftScore}%` }}
                />
              </div>
            </div>

            {/* JP Dimension */}
            <div>
              <div className="flex justify-between items-baseline text-xs sm:text-sm font-medium mb-2 font-mono">
                <span className="font-bold text-black">{type.dimensions.jp.leftLabel} {type.dimensions.jp.leftScore}%</span>
                <span className="text-zinc-400">{type.dimensions.jp.rightScore}% {type.dimensions.jp.rightLabel}</span>
              </div>
              <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
                <div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${type.dimensions.jp.leftScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Numbered Editorial Modules (Visual Research / Creative Archive Structure) */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-300">
          <div>
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
              DEEP ARCHIVE DOSSIER
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              深度创作画像档案
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
            6 EDITORIAL RESEARCH MODULES
          </span>
        </div>

        {/* Responsive Swiss Editorial Grid for the 6 Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 01 你的创作状态 (Full ~400 words comprehensive analysis spanning full width) */}
          <div className="md:col-span-2 bg-white rounded-[28px] p-6 sm:p-10 border border-zinc-200 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  01 / CREATIVE STATE DOSSIER · 深度行为全貌解读
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">约400字行为全貌画像</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-black tracking-tight mb-4">
              你的艺术创作深度画像
            </h4>
            <p className="text-base sm:text-[17px] text-zinc-800 leading-relaxed sm:leading-[1.9] tracking-normal font-normal text-justify">
              {type.fullAnalysis || type.sections.status01}
            </p>
          </div>

          {/* 02 你的创作优势 */}
          <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-zinc-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-zinc-400 block mb-2">02 / ADVANTAGES</span>
              <h4 className="text-lg font-bold text-black mb-3">你的创作优势</h4>
              {type.strengths && type.strengths.length > 0 ? (
                <ul className="space-y-2 text-sm text-zinc-700 leading-relaxed">
                  {type.strengths.map((st, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-700 leading-relaxed">{type.sections.advantage02}</p>
              )}
            </div>
          </div>

          {/* 03 容易卡住的地方 */}
          <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-zinc-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-zinc-400 block mb-2">03 / BLOCKS</span>
              <h4 className="text-lg font-bold text-black mb-3">容易卡住的地方</h4>
              {type.challenges && type.challenges.length > 0 ? (
                <ul className="space-y-2 text-sm text-zinc-700 leading-relaxed">
                  {type.challenges.map((ch, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-700 leading-relaxed">{type.sections.block03}</p>
              )}
            </div>
          </div>

          {/* 04 你的灵感启动方式 */}
          <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-zinc-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-zinc-400 block mb-2">04 / INSPIRATION SPARK</span>
              <h4 className="text-lg font-bold text-black mb-3">你的灵感启动方式</h4>
              <p className="text-sm text-zinc-700 leading-relaxed">{type.inspirationMode || type.sections.spark04}</p>
            </div>
          </div>

          {/* 05 Deadline 下的你 */}
          <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-zinc-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-zinc-400 block mb-2">05 / DEADLINE BEHAVIOR</span>
              <h4 className="text-lg font-bold text-black mb-3">Deadline 下的你</h4>
              <p className="text-sm text-zinc-700 leading-relaxed">{type.deadlineMode || type.sections.deadline05}</p>
            </div>
          </div>

          {/* 06 专属创作建议与关键词 (Span across columns on desktop) */}
          <div className="md:col-span-2 bg-white rounded-[28px] p-6 sm:p-8 border border-zinc-200 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7">
                <span className="font-mono text-xs font-bold text-zinc-400 block mb-1">06 / CREATIVE ADVICE & KEYWORDS</span>
                <h4 className="text-lg sm:text-xl font-bold text-black mb-2">给你的广美创作锦囊</h4>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  {type.creativeAdvice || '在保持独特创作敏锐度的同时，勇于跨出舒适圈，在材料、场域与观念的碰撞中发现新的可能。'}
                </p>
              </div>
              <div className="lg:col-span-5 flex flex-wrap gap-2 justify-start lg:justify-end">
                {type.keywords.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs sm:text-sm font-mono px-3.5 py-1.5 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200/80 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Controls (Section 14 Mandate) */}
      <div className="sticky bottom-6 z-30 max-w-2xl mx-auto bg-white/95 backdrop-blur-md p-3 rounded-full border border-zinc-300 shadow-xl flex items-center justify-between gap-2">
        {/* 1. 生成创作身份海报 */}
        <button
          onClick={() => setIsShareOpen(true)}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#D4FF00] hover:bg-[#c2ea00] text-black font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all cursor-pointer shadow-xs"
        >
          <Share2 className="w-4 h-4" />
          <span>生成创作身份海报</span>
        </button>

        {/* 2. 重新测试 */}
        <button
          onClick={onRetake}
          className="inline-flex items-center justify-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium text-xs sm:text-sm px-4 py-3 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">重新测试</span>
        </button>

        {/* 3. 浏览全部16种状态 */}
        <button
          onClick={onExploreAll}
          className="inline-flex items-center justify-center gap-1.5 bg-black hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm px-4 py-3 rounded-full transition-colors cursor-pointer"
        >
          <Grid className="w-3.5 h-3.5" />
          <span>全部16种</span>
        </button>
      </div>

      {/* Standalone 3:4 Share Poster Modal */}
      <ShareResultCard
        type={type}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
};
