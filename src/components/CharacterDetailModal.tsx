import React from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { CreativeType } from '../types';
import { CharacterAvatar } from '../assets/characters/CharacterAvatar';

interface CharacterDetailModalProps {
  type: CreativeType | null;
  isOpen: boolean;
  onClose: () => void;
  onViewAsResult?: (type: CreativeType) => void;
}

export const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({
  type,
  isOpen,
  onClose,
  onViewAsResult,
}) => {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative max-w-2xl w-full bg-white text-[#121212] rounded-[32px] p-6 sm:p-10 shadow-2xl border border-zinc-200 my-8">
        
        {/* Top bar with close button */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
            <span className="font-bold text-black">{type.number}</span>
            <span>/</span>
            <span>{type.mbtiCode}</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700">
              {type.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Character Title & Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <div className="w-36 h-48 sm:w-44 sm:h-56 bg-white rounded-2xl border border-zinc-200/80 flex items-center justify-center flex-shrink-0">
            <CharacterAvatar id={type.id} size="md" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              {type.title}
            </h2>
            <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase mt-0.5 mb-3">
              {type.enTitle}
            </p>
            <p className="text-sm font-medium text-zinc-700 leading-relaxed italic bg-zinc-50 p-3 rounded-xl border border-zinc-100 mb-4">
              “{type.tagline}”
            </p>

            {/* Keyword pills */}
            <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
              {type.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-100 font-medium text-zinc-700"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="space-y-4 pt-4 border-t border-zinc-200 text-sm">
          <div>
            <span className="font-mono text-xs font-bold text-zinc-400 block mb-1">01 / 创作状态</span>
            <p className="text-zinc-700">{type.sections.status01}</p>
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-zinc-400 block mb-1">02 / 核心优势</span>
            <p className="text-zinc-700">{type.sections.advantage02}</p>
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-zinc-400 block mb-1">05 / Deadline 下的你</span>
            <p className="text-zinc-700">{type.sections.deadline05}</p>
          </div>
        </div>

        {/* Modal footer action */}
        <div className="mt-8 pt-4 border-t border-zinc-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-medium text-zinc-500 hover:text-black cursor-pointer"
          >
            关闭预览
          </button>

          {onViewAsResult && (
            <button
              onClick={() => {
                onViewAsResult(type);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 bg-[#121212] hover:bg-black text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full transition-all cursor-pointer"
            >
              <span>查看该类型完整档案与海报</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
