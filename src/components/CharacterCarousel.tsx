import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { CREATIVE_TYPES } from '../data/characters';
import { CreativeType } from '../types';
import { CharacterAvatar } from '../assets/characters/CharacterAvatar';

interface CharacterCarouselProps {
  onSelectCharacter: (character: CreativeType) => void;
}

export const CharacterCarousel: React.FC<CharacterCarouselProps> = ({
  onSelectCharacter,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 320;
      const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="creative-states" className="w-full py-12 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-6 border-b border-zinc-300/70 gap-4">
          <div>
            {/* Numbering System in Top Left */}
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-zinc-500 tracking-wider">
              <span className="font-bold text-black">02</span>
              <span>/</span>
              <span>16 CREATIVE STATES</span>
            </div>
            {/* Big Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
              16 种 GAFA 创作状态
            </h2>
          </div>

          {/* Right Side Editorial Subtext & Restrained Arrow Controls */}
          <div className="flex items-center justify-between md:justify-end gap-6">
            <p className="text-xs sm:text-sm text-zinc-500 max-w-xs font-normal leading-relaxed">
              向左或向右滑动探索档案卡片，
              <br className="hidden sm:inline" />
              点击卡片可深入查阅该状态的完整画像。
            </p>

            {/* Restrained Line-based Arrow Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                className="w-10 h-10 rounded-full border border-zinc-300 bg-white/80 hover:bg-white text-zinc-800 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                aria-label="Previous characters"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-10 h-10 rounded-full border border-zinc-300 bg-white/80 hover:bg-white text-zinc-800 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                aria-label="Next characters"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto scrollbar-none pb-6 pt-2 snap-x snap-mandatory -mx-4 sm:-mx-8 px-4 sm:px-8 cursor-grab active:cursor-grabbing"
          style={{ scrollPaddingLeft: '2rem' }}
        >
          {CREATIVE_TYPES.map((type) => {
            const isHovered = hoveredId === type.id;
            return (
              <div
                key={type.id}
                onClick={() => onSelectCharacter(type)}
                onMouseEnter={() => setHoveredId(type.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="flex-shrink-0 w-[270px] sm:w-[300px] md:w-[320px] bg-white rounded-[24px] sm:rounded-[28px] p-6 border border-zinc-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between cursor-pointer group snap-start select-none"
              >
                {/* Card Top: Numbering + Discipline Tag */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-mono font-bold text-sm text-zinc-900 tracking-wider">
                      {type.number}
                    </span>
                    <span className="ml-2 text-[11px] font-mono text-zinc-400">
                      {type.mbtiCode}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/60">
                    {type.category}
                  </span>
                </div>

                {/* Card Titles */}
                <div className="mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-black transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mt-0.5">
                    {type.enTitle}
                  </p>
                </div>

                {/* Card Center: Clean Pure-White Character Artwork Area (No grey sub-card, No CSS shadows, slightly enlarged ~10%) */}
                <div className="relative w-full h-56 sm:h-64 bg-white flex items-end justify-center overflow-hidden my-2">
                  <CharacterAvatar
                    id={type.id}
                    size="carousel"
                    isHovered={isHovered}
                  />

                  {/* Quick Detail Inspection Badge on Hover */}
                  <div className={`absolute bottom-2 right-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono bg-black text-white px-2.5 py-1 rounded-full shadow-sm">
                      <span>查看档案</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Card Bottom: 4 Keywords Reveal on Hover / Default */}
                <div className="mt-4 pt-4 border-t border-zinc-100 min-h-[64px] flex flex-col justify-center">
                  <div className="flex flex-wrap gap-1.5 transition-all duration-300">
                    {type.keywords.slice(0, 4).map((kw, i) => (
                      <span
                        key={i}
                        className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all duration-200 ${
                          isHovered
                            ? 'bg-[#121212] text-white shadow-xs'
                            : 'bg-zinc-100/80 text-zinc-600'
                        }`}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Hint */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-zinc-400">
          <span>← 左右滑动卡片继续探索其余创作状态 →</span>
        </div>
      </div>
    </section>
  );
};
