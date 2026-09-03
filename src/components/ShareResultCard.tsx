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
  const [showExportOverlay, setShowExportOverlay] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const charImageRecord = getCharacterImage(type.id);

  // 等待容器内所有图片加载完成、解码并确保 naturalWidth > 0
  const waitForImages = async (container: HTMLElement) => {
    const images = Array.from(container.querySelectorAll('img'));
    console.log(`[GAFA-TI Poster] image count: ${images.length}`);

    await Promise.all(
      images.map(async (img) => {
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

        if (typeof img.decode === 'function') {
          try {
            await img.decode();
          } catch (decodeErr) {
            console.warn('[GAFA-TI Poster] Image decode warning (non-fatal):', decodeErr);
          }
        }

        console.log(
          `[GAFA-TI Poster] character img complete: ${img.complete}, naturalWidth: ${img.naturalWidth}, naturalHeight: ${img.naturalHeight}`
        );

        if (!img.complete || img.naturalWidth === 0) {
          console.error(
            `[GAFA-TI Poster] Image failed to render: src=${img.src.slice(0, 60)}..., complete=${img.complete}, naturalWidth=${img.naturalWidth}`
          );
        }
      })
    );
  };

  const handleDownload = async () => {
    if (isExporting) return;

    setErrorMessage(null);
    const isMobileOrTablet = checkIsMobileOrTablet();
    console.log(`[GAFA-TI Poster] viewport width: ${window.innerWidth}, isMobileOrTablet: ${isMobileOrTablet}`);

    try {
      setIsExporting(true);

      // 1. 获取当前人物立绘图片并转换为 Base64 Data URL
      if (!charImageRecord?.src) {
        throw new Error(`Character image record missing for ${type.id}`);
      }
      console.log(`[GAFA-TI Poster] original character URL: ${charImageRecord.src}`);

      let dataUrlString = characterDataUrl;
      if (!dataUrlString) {
        dataUrlString = await imageUrlToDataUrl(charImageRecord.src);
        setCharacterDataUrl(dataUrlString);
      }
      console.log(`[GAFA-TI Poster] character data URL ready: true, length: ${dataUrlString.length}`);

      // 2. 开启真实在当前视口内部渲染的导出层
      setShowExportOverlay(true);

      // 3. 等待 React 挂载并渲染 exportCard
      await new Promise((resolve) => setTimeout(resolve, 60));
      await document.fonts.ready;
      console.log('[GAFA-TI Poster] fonts ready: true');

      const targetExportDom = exportCardRef.current;
      if (!targetExportDom) {
        throw new Error('Export card DOM ref is null after mounting in viewport');
      }

      // 4. 等待导出专用卡片内所有图片完成加载与 decode
      await waitForImages(targetExportDom);

      // 5. 校验 DOM 渲染尺寸与位置（确保在视口内真实渲染，width > 0, height > 0）
      const rect = targetExportDom.getBoundingClientRect();
      console.log(`[GAFA-TI Poster] card width: ${rect.width}, card height: ${rect.height}, card x: ${rect.left}, card y: ${rect.top}`);

      if (rect.width === 0 || rect.height === 0) {
        throw new Error(`Export card DOM has invalid bounding dimensions: ${rect.width}x${rect.height}`);
      }

      const exportImg = targetExportDom.querySelector('img');
      if (!exportImg || !exportImg.complete || exportImg.naturalWidth === 0) {
        throw new Error('Export character image not rendered or naturalWidth is 0');
      }
      console.log(`[GAFA-TI Poster] character naturalWidth: ${exportImg.naturalWidth}`);

      // 等待至少 2 帧稳定
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await new Promise((resolve) => requestAnimationFrame(resolve));
      console.log('[GAFA-TI Poster] DOM rendered: true');

      // 540x720 节点配合 pixelRatio: 2 可稳定输出 1080x1440 高清海报
      const pixelRatio = 2;
      console.log(`[GAFA-TI Poster] toPng start, pixelRatio: ${pixelRatio}`);

      const exportOptions = {
        cacheBust: true,
        backgroundColor: '#FFFFFF',
        pixelRatio,
      };

      const finalDataUrl = await toPng(targetExportDom, exportOptions);

      if (!finalDataUrl || !finalDataUrl.startsWith('data:image/png')) {
        throw new Error('Invalid dataUrl produced by toPng');
      }
      console.log('[GAFA-TI Poster] toPng success: true');

      // 6. 转换为标准 PNG Blob 并验证大小（必须 > 10000 字节，防止空白海报）
      const response = await fetch(finalDataUrl);
      const blob = await response.blob();

      if (!blob || blob.type !== 'image/png' || blob.size < 10000) {
        throw new Error(`Generated PNG blob is abnormally small or invalid (blank poster prevention): size=${blob?.size}`);
      }
      console.log(`[GAFA-TI Poster] blob size: ${blob.size}`);

      const fileName = `GAFA-TI-${type.number}-${type.title}.png`;

      // 7. 移动端优先尝试 Web Share API（可直接调用系统面板保存到照片或分享）
      let sharedSuccessfully = false;
      if (isMobileOrTablet && typeof navigator !== 'undefined' && navigator.canShare) {
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
            console.log('[GAFA-TI Poster] download/share complete: Web Share succeeded');
          }
        } catch (shareErr) {
          console.log('[GAFA-TI Poster] Web share canceled or fallback:', shareErr);
        }
      }

      // 8. 桌面端或 Web Share 降级：标准 <a> 标签下载触发
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

        console.log('[GAFA-TI Poster] download/share complete: File download triggered');
      }
    } catch (err) {
      console.error('[GAFA-TI Poster] Failed to generate GAFA-TI poster:', err);
      setErrorMessage('海报生成失败，请重试');
    } finally {
      setShowExportOverlay(false);
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

        {/* 导出专用生成层（点击生成后真实渲染在当前视口内，严禁 left: -10000px 离屏，尺寸严格 540x720 配合 pixelRatio: 2） */}
        {showExportOverlay && (
          <div
            id="share-poster-export-overlay"
            className="fixed inset-0 z-[9999] bg-black/80 flex flex-col items-center justify-center p-4"
          >
            <div className="text-white text-sm font-bold mb-3 flex items-center gap-2">
              <Download className="w-4 h-4 animate-bounce text-[#D4FF00]" />
              <span>正在生成高清海报...</span>
            </div>

            {/* 真实处于视口内的 540x720 导出 DOM */}
            <div
              ref={exportCardRef}
              id="share-poster-card-export"
              style={{
                width: '540px',
                height: '720px',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              className="p-8 text-[#121212] rounded-none shadow-2xl relative overflow-hidden select-none"
            >
              {renderPosterInner(characterDataUrl || charImageRecord?.src)}
            </div>
          </div>
        )}

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

