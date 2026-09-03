import React, { useRef, useState } from 'react';
import { X, Download, Copy, Check, AlertCircle } from 'lucide-react';
import { toPng } from 'html-to-image';
import { CreativeType } from '../types';
import { CharacterAvatar } from '../assets/characters/CharacterAvatar';
import { getCharacterImage } from '../assets/characters/characterImages';

interface ShareResultCardProps {
  type: CreativeType;
  isOpen: boolean;
  onClose: () => void;
}

// 将图片 URL (含 Vite 打包后的本地资源路径) 转换为 base64 Data URL
async function imageUrlToDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image for data URL conversion: ${response.status} ${response.statusText}`);
  }
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('FileReader result is not a string'));
      }
    };
    reader.onerror = () => reject(new Error('FileReader failed to read image blob'));
    reader.readAsDataURL(blob);
  });
}

// 检测是否为移动端、平板或 iOS / iPadOS 设备 (含 iPadOS 汇报为 Macintosh 的触控环境)
function checkIsMobileOrTablet(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const userAgent = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const maxTouchPoints = navigator.maxTouchPoints || 0;

  const isIOS = /iPhone|iPod|iPad/i.test(userAgent) || (platform === 'MacIntel' && maxTouchPoints > 1);
  const isMobileUA = /Android|webOS|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(userAgent);
  const isTouchDevice = maxTouchPoints > 0;

  return isIOS || isMobileUA || (isTouchDevice && window.innerWidth <= 1024);
}

// 检测是否为 iOS / iPadOS / WebKit 移动端环境
function checkIsIOSWebKit(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const userAgent = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const maxTouchPoints = navigator.maxTouchPoints || 0;

  const isIOS = /iPhone|iPod|iPad/i.test(userAgent) || (platform === 'MacIntel' && maxTouchPoints > 1);
  return isIOS || (/WebKit/i.test(userAgent) && /Mobile/i.test(userAgent));
}

export const ShareResultCard: React.FC<ShareResultCardProps> = ({
  type,
  isOpen,
  onClose,
}) => {
  const previewCardRef = useRef<HTMLDivElement>(null);
  const exportCardRef = useRef<HTMLDivElement>(null);
  const [characterDataUrl, setCharacterDataUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const charImageRecord = getCharacterImage(type.id);

  // 等待容器内所有图片加载完成、解码并确保 naturalWidth > 0
  const waitForImages = async (container: HTMLElement) => {
    const images = Array.from(container.querySelectorAll('img'));
    console.log(`[GAFA-TI Mobile Poster] image count: ${images.length}`);

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
            console.warn('[GAFA-TI Mobile Poster] Image decode warning (non-fatal):', decodeErr);
          }
        }

        console.log(
          `[GAFA-TI Mobile Poster] img complete: ${img.complete}, naturalWidth: ${img.naturalWidth}, naturalHeight: ${img.naturalHeight}, isDataUrl: ${img.src.startsWith('data:image/')}`
        );

        if (!img.complete || img.naturalWidth === 0) {
          console.error(
            `[GAFA-TI Mobile Poster] Image failed to render: src=${img.src.slice(0, 60)}..., complete=${img.complete}, naturalWidth=${img.naturalWidth}`
          );
        }
      })
    );
  };

  const handleDownload = async () => {
    if (isExporting) return;

    setErrorMessage(null);
    const isMobileOrTablet = checkIsMobileOrTablet();
    const isIOSWebKit = checkIsIOSWebKit();

    console.log(`[GAFA-TI Mobile Poster] device: mobileOrTablet=${isMobileOrTablet}, iOSWebKit=${isIOSWebKit}`);

    try {
      setIsExporting(true);

      // 1. 等待字体加载就绪
      await document.fonts.ready;
      console.log('[GAFA-TI Mobile Poster] fonts ready');

      // 2. 获取当前人物立绘图片并转换为 Base64 Data URL
      if (!charImageRecord?.src) {
        throw new Error(`Character image record missing for ${type.id}`);
      }
      console.log(`[GAFA-TI Mobile Poster] original character URL: ${charImageRecord.src}`);

      let dataUrlString = characterDataUrl;
      if (!dataUrlString) {
        dataUrlString = await imageUrlToDataUrl(charImageRecord.src);
        setCharacterDataUrl(dataUrlString);
      }
      console.log(`[GAFA-TI Mobile Poster] data URL ready: true, data URL length: ${dataUrlString.length}`);

      // 3. 等待 React state 将 Data URL 应用到 exportCard DOM 并完成双帧渲染
      await new Promise((resolve) => setTimeout(resolve, 50));
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const targetExportDom = exportCardRef.current || previewCardRef.current;
      if (!targetExportDom) {
        throw new Error('Export card DOM ref is null');
      }

      // 4. 等待导出专用卡片内所有图片 decode 就绪
      await waitForImages(targetExportDom);

      // 验证人物图片是否已为 Data URL 且尺寸有效
      const exportImg = targetExportDom.querySelector('img');
      if (exportImg) {
        if (!exportImg.complete || exportImg.naturalWidth === 0) {
          throw new Error('Export character image not fully decoded or naturalWidth is 0');
        }
        if (!exportImg.src.startsWith('data:image/')) {
          console.warn('[GAFA-TI Mobile Poster] Warning: Export img src is not data URL, forcing inline reload');
        }
      }

      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
      console.log('[GAFA-TI Mobile Poster] DOM ready');

      const pixelRatio = isMobileOrTablet ? 1 : 2;
      console.log(`[GAFA-TI Mobile Poster] pixelRatio: ${pixelRatio}`);

      const exportOptions = {
        cacheBust: true,
        backgroundColor: '#FFFFFF',
        pixelRatio,
      };

      // 5. iOS / iPadOS WebKit 预热生成（第一次调用唤醒图形管线，结果丢弃）
      if (isIOSWebKit) {
        try {
          await toPng(targetExportDom, exportOptions);
          await new Promise((resolve) => requestAnimationFrame(resolve));
          await new Promise((resolve) => requestAnimationFrame(resolve));
          console.log('[GAFA-TI Mobile Poster] warmup complete');
        } catch (warmupErr) {
          console.warn('[GAFA-TI Mobile Poster] Warmup pass ignored error:', warmupErr);
        }
      }

      // 6. 正式生成 PNG Data URL
      const finalDataUrl = await toPng(targetExportDom, exportOptions);

      if (!finalDataUrl || !finalDataUrl.startsWith('data:image/png')) {
        throw new Error('Invalid dataUrl produced by toPng');
      }
      console.log('[GAFA-TI Mobile Poster] final PNG generated');

      // 7. 转换为标准 PNG Blob
      const response = await fetch(finalDataUrl);
      const blob = await response.blob();

      if (!blob || blob.type !== 'image/png' || blob.size === 0) {
        throw new Error(`Invalid blob produced: type=${blob?.type}, size=${blob?.size}`);
      }
      console.log(`[GAFA-TI Mobile Poster] blob size: ${blob.size}`);

      const fileName = `GAFA-TI-${type.number}-${type.title}.png`;

      // 8. 移动端优先尝试 Web Share API（可直接调用系统面板保存到照片或分享）
      let sharedSuccessfully = false;
      if (isMobileOrTablet && typeof navigator !== 'undefined' && navigator.canShare) {
        try {
          const file = new File([blob], fileName, { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            console.log('[GAFA-TI Mobile Poster] Attempting Web Share API with image file...');
            await navigator.share({
              files: [file],
              title: `GAFA-TI 创作状态档案 · ${type.title}`,
              text: `我的广美创作状态是：${type.number} ${type.title} (${type.mbtiCode})`,
            });
            sharedSuccessfully = true;
            console.log('[GAFA-TI Mobile Poster] download/share complete: Web Share succeeded');
          }
        } catch (shareErr) {
          console.log('[GAFA-TI Mobile Poster] Web share canceled or fallback:', shareErr);
        }
      }

      // 9. 桌面端或 Web Share 降级：标准 <a> 标签下载触发
      if (!sharedSuccessfully) {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl);
        }, 1500);

        console.log('[GAFA-TI Mobile Poster] download/share complete: File download triggered');
      }
    } catch (err) {
      console.error('[GAFA-TI Mobile Poster] Failed to generate GAFA-TI poster:', err);
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

  // 海报内部复用内容模版（用于屏幕预览与导出专用离屏渲染）
  const renderPosterInner = (characterSrcToUse?: string) => (
    <>
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
          {characterSrcToUse ? (
            <div className="relative flex items-end justify-center select-none overflow-hidden w-full h-48 sm:h-56 max-w-[260px]">
              <img
                src={characterSrcToUse}
                alt={type.title}
                loading="eager"
                crossOrigin="anonymous"
                className="w-full h-full pointer-events-none"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center bottom',
                  filter: 'none',
                  boxShadow: 'none',
                }}
              />
            </div>
          ) : (
            <CharacterAvatar id={type.id} size="poster" />
          )}
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

        {/* Footer Art Academy Stamp */}
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
    </>
  );

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

        {/* 3:4 Standalone Poster Card (Normal Interactive Screen Preview) */}
        <div
          ref={previewCardRef}
          id="share-poster-card-preview"
          className="w-full aspect-[3/4] bg-[#FFFFFF] text-[#121212] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-2xl border border-zinc-200 relative overflow-hidden select-none"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          {renderPosterInner()}
        </div>

        {/* 导出专用离屏渲染节点 (固定逻辑尺寸、绝不 display:none、使用 Base64 Data URL 内联立绘) */}
        <div
          ref={exportCardRef}
          id="share-poster-card-export"
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: '-10000px',
            top: 0,
            width: '540px',
            height: '720px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            visibility: 'visible',
            pointerEvents: 'none',
            zIndex: -9999,
          }}
          className="p-8 text-[#121212] relative overflow-hidden select-none"
        >
          {renderPosterInner(characterDataUrl || charImageRecord?.src)}
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

