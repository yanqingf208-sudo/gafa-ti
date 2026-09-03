import React, { useRef, useState } from 'react';
import { X, Download, Copy, Check, Sparkles, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { CreativeType } from '../types';
import { CharacterAvatar } from '../assets/characters/CharacterAvatar';

interface ShareResultCardProps {
  type: CreativeType;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareResultCard: React.FC<ShareResultCardProps> = ({
  type,
  isOpen,
  onClose,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!cardRef.current || isExporting) return;
    try {
      setIsExporting(true);
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // High-DPI export
        useCORS: true,
        backgroundColor: '#F8F8F9',
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `GAFA-TI-${type.number}-${type.mbtiCode}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative max-w-lg w-full flex flex-col items-center my-auto py-6">
        
        {/* Modal Controls Header */}
        <div className="w-full flex items-center justify-between text-white mb-3 px-1">
          <span className="text-xs font-mono tracking-widest text-zinc-300">
            GAFA CREATIVE POSTER ARCHIVE · 3:4 FORMAT
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3:4 Standalone Poster Card (Strict Reference to Section 15) */}
        <div
          ref={cardRef}
          id="share-poster-card"
          className="w-full aspect-[3/4] bg-[#FAF9F6] text-[#121212] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-2xl border border-zinc-300 relative overflow-hidden select-none"
        >
          {/* Top Poster Header */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#121212] text-white flex items-center justify-center font-bold text-xs">
                  G
                </div>
                <span className="font-extrabold text-sm tracking-tight">GAFA-TI</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                CAMPUS ORIENTATION 2026
              </span>
            </div>

            {/* Title & Number */}
            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-zinc-400 block">
                  {type.number} / {type.mbtiCode}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mt-0.5">
                  {type.title}
                </h3>
                <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  {type.enTitle}
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-200/80 text-zinc-700">
                {type.category}
              </span>
            </div>
          </div>

          {/* Center: Large Character Illustration */}
          <div className="my-auto py-2 flex flex-col items-center justify-center relative">
            <div className="w-full h-44 sm:h-52 flex items-center justify-center">
              <CharacterAvatar id={type.id} size="poster" />
            </div>

            {/* Tagline quote */}
            <p className="text-center text-xs sm:text-[13px] font-medium text-zinc-700 px-2 mt-2 leading-relaxed max-w-xs">
              “{type.tagline}”
            </p>
          </div>

          {/* Bottom Module: Keywords, Spectrum & QR Stamp */}
          <div className="space-y-3 pt-3 border-t border-zinc-200">
            {/* 4 Keywords Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {type.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-zinc-200 font-medium text-zinc-700"
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Simplified 4-Dimension Spectrum bars */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[9px] font-mono text-zinc-500 pt-1">
              <div>
                <div className="flex justify-between">
                  <span>向内沉浸</span>
                  <span>向外共振</span>
                </div>
                <div className="w-full h-1 bg-zinc-200 rounded-full mt-0.5 overflow-hidden">
                  <div
                    className="h-full bg-black"
                    style={{ width: `${type.dimensions.ie.leftScore}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span>概念构想</span>
                  <span>实感观察</span>
                </div>
                <div className="w-full h-1 bg-zinc-200 rounded-full mt-0.5 overflow-hidden">
                  <div
                    className="h-full bg-black"
                    style={{ width: `${type.dimensions.ns.leftScore}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span>结构推演</span>
                  <span>感性表达</span>
                </div>
                <div className="w-full h-1 bg-zinc-200 rounded-full mt-0.5 overflow-hidden">
                  <div
                    className="h-full bg-black"
                    style={{ width: `${type.dimensions.tf.leftScore}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span>计划构建</span>
                  <span>即兴探索</span>
                </div>
                <div className="w-full h-1 bg-zinc-200 rounded-full mt-0.5 overflow-hidden">
                  <div
                    className="h-full bg-black"
                    style={{ width: `${type.dimensions.jp.leftScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Footer QR Stamp & Art Academy Stamp */}
            <div className="flex items-center justify-between pt-2 border-t border-dashed border-zinc-300">
              <div className="text-[9px] font-mono text-zinc-400 leading-tight">
                <div>GUANGZHOU ACADEMY OF FINE ARTS</div>
                <div>MY GAFA CREATIVE ARCHIVE · 2026</div>
              </div>

              {/* Clean simulated QR code area */}
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 bg-black p-0.5 rounded flex flex-wrap gap-0.5 justify-center items-center">
                  <div className="w-2.5 h-2.5 bg-white"></div>
                  <div className="w-2.5 h-2.5 bg-white"></div>
                  <div className="w-2.5 h-2.5 bg-white"></div>
                  <div className="w-2.5 h-2.5 bg-[#D4FF00]"></div>
                </div>
                <span className="text-[8px] font-mono text-zinc-400">扫码测定</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons below card */}
        <div className="w-full mt-4 flex items-center justify-center gap-3">
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#D4FF00] hover:bg-[#bce000] text-black font-bold text-sm px-5 py-3 rounded-full shadow-md transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? '生成海报中...' : '下载高清海报 PNG'}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-zinc-100 text-zinc-900 font-medium text-sm px-4 py-3 rounded-full transition-colors cursor-pointer"
          >
            {hasCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{hasCopied ? '已复制链接' : '分享'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
