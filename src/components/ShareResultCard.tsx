import React, { useRef, useState } from 'react';
import { X, Download, Copy, Check, Share2, AlertCircle } from 'lucide-react';
import { toPng } from 'html-to-image';
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // 等待容器内所有图片加载完成、解码并确保 naturalWidth > 0
  const waitForImages = async (container: HTMLElement) => {
    const images = Array.from(container.querySelectorAll('img'));
    console.log(`[GAFA-TI Poster] image count: ${images.length}`);

    await Promise.all(
      images.map(async (img) => {
        // 若图片尚未加载完成或尺寸为 0，等待 onload / onerror
        if (!img.complete || img.naturalWidth === 0) {
          await new Promise<void>((resolve) => {
            const onFinish = () => {
              img.removeEventListener('load', onFinish);
              img.removeEventListener('error', onFinish);
              resolve();
            };
            img.addEventListener('load', onFinish);
            img.addEventListener('error', onFinish);
          });
        }

        // 尝试调用 decode() 确保解码至显存渲染就绪
        if (typeof img.decode === 'function') {
          try {
            await img.decode();
          } catch (decodeErr) {
            console.warn('[GAFA-TI Poster] Image decode warning (non-fatal):', decodeErr);
          }
        }

        if (!img.complete || img.naturalWidth === 0) {
          console.error(
            `[GAFA-TI Poster] Image failed to render properly: src=${img.src}, complete=${img.complete}, naturalWidth=${img.naturalWidth}, naturalHeight=${img.naturalHeight}`
          );
        } else {
          console.log(
            `[GAFA-TI Poster] Image verified: src=${img.src.split('/').pop()}, width=${img.naturalWidth}x${img.naturalHeight}`
          );
        }
      })
    );
  };

  const handleDownload = async () => {
    if (isExporting) return;

    setErrorMessage(null);
    console.log('[GAFA-TI Poster] Starting poster generation...');

    if (!cardRef.current) {
      console.error('[GAFA-TI Poster] ref not found (ShareResultCard ref is null)');
      setErrorMessage('海报生成失败，请重试');
      return;
    }
    console.log('[GAFA-TI Poster] ref found');

    try {
      setIsExporting(true);

      // 1. 等待字体加载就绪
      await document.fonts.ready;
      console.log('[GAFA-TI Poster] fonts ready');

      // 2. 等待所有图片完全加载并解码
      await waitForImages(cardRef.current);
      console.log('[GAFA-TI Poster] images ready');

      // 3. 等待至少两帧 requestAnimationFrame，确保 DOM 绘制完全稳定
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
      console.log('[GAFA-TI Poster] DOM stable');

      // 4. 使用 html-to-image 纯白底高清渲染
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#FFFFFF',
      });

      if (!dataUrl || !dataUrl.startsWith('data:image/png')) {
        throw new Error('Invalid dataUrl produced by toPng');
      }
      console.log('[GAFA-TI Poster] PNG generated');

      // 5. 转换为 PNG Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      if (!blob || blob.type !== 'image/png' || blob.size === 0) {
        throw new Error(`Invalid blob produced: type=${blob?.type}, size=${blob?.size}`);
      }
      console.log(`[GAFA-TI Poster] blob size: ${blob.size}`);

      const fileName = `GAFA-TI-${type.number}-${type.title}.png`;

      // 移动端环境增强：若支持 Web Share API 分享文件，可直接调起系统分享
      let sharedSuccessfully = false;
      if (typeof navigator !== 'undefined' && navigator.canShare) {
        try {
          const file = new File([blob], fileName, { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            console.log('[GAFA-TI Poster] Attempting Web Share API with image file...');
            await navigator.share({
              files: [file],
              title: `GAFA-TI 创作状态档案 · ${type.title}`,
              text: `我的广美创作状态是：${type.number} ${type.title} (${type.mbtiCode})`,
            });
            sharedSuccessfully = true;
            console.log('[GAFA-TI Poster] Web Share completed successfully');
          }
        } catch (shareErr) {
          // 用户取消分享或环境限制，继续降级到标准下载
          console.log('[GAFA-TI Poster] Web share canceled or fallback to download:', shareErr);
        }
      }

      // 6. 标准浏览器直接触发下载
      if (!sharedSuccessfully) {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();

        // 兼容移动端 Safari：若无法直接触发下载链接，保留短暂时间后释放
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl);
        }, 1000);

        console.log('[GAFA-TI Poster] download triggered');
      }
    } catch (err) {
      console.error('[GAFA-TI Poster] Failed to generate GAFA-TI poster:', err);
      setErrorMessage('海报生成失败，请重试');
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

        {/* 3:4 Standalone Poster Card (Pure White #FFFFFF Background, No CSS Shadows on Character) */}
        <div
          ref={cardRef}
          id="share-poster-card"
          className="w-full aspect-[3/4] bg-[#FFFFFF] text-[#121212] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-2xl border border-zinc-200 relative overflow-hidden select-none"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          {/* Top Poster Header */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#D4FF00] text-black flex items-center justify-center font-bold text-xs">
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
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700">
                {type.category}
              </span>
            </div>
          </div>

          {/* Center: Large Character Illustration (No CSS shadows, Pure White Canvas) */}
          <div className="my-auto py-2 flex flex-col items-center justify-center relative">
            <div className="w-full h-48 sm:h-56 flex items-center justify-center">
              <CharacterAvatar id={type.id} size="poster" />
            </div>

            {/* Tagline quote */}
            <p className="text-center text-xs sm:text-[13px] font-medium text-zinc-700 px-2 mt-2 leading-relaxed max-w-xs">
              “{type.tagline}”
            </p>
          </div>

          {/* Bottom Module: Keywords, Spectrum & Footer */}
          <div className="space-y-3 pt-3 border-t border-zinc-200">
            {/* 4 Keywords Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {type.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-50 border border-zinc-200 font-medium text-zinc-700"
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

            {/* Footer Art Academy Stamp without fake QR placeholder */}
            <div className="flex items-center justify-between pt-2 border-t border-dashed border-zinc-300">
              <div className="text-[9px] font-mono text-zinc-400 leading-tight">
                <div>GUANGZHOU ACADEMY OF FINE ARTS</div>
                <div>MY GAFA CREATIVE ARCHIVE · 2026</div>
              </div>
              <div className="text-[9px] font-mono font-bold text-zinc-500 tracking-wider">
                GAFA-TI · 2026
              </div>
            </div>
          </div>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="w-full mt-3 px-4 py-2 bg-rose-500/90 text-white text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Buttons below card */}
        <div className="w-full mt-4 flex items-center justify-center gap-3">
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className={`flex-1 inline-flex items-center justify-center gap-2 font-bold text-sm px-5 py-3 rounded-full shadow-md transition-all ${
              isExporting
                ? 'bg-zinc-300 text-zinc-600 cursor-not-allowed'
                : 'bg-[#D4FF00] hover:bg-[#bce000] text-black cursor-pointer'
            }`}
          >
            <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
            <span>{isExporting ? '正在生成海报...' : '生成PNG海报'}</span>
          </button>

          <button
            onClick={handleCopyLink}
            disabled={isExporting}
            className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-zinc-100 text-zinc-900 font-medium text-sm px-4 py-3 rounded-full transition-colors cursor-pointer"
          >
            {hasCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{hasCopied ? '已复制链接' : '复制链接'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
