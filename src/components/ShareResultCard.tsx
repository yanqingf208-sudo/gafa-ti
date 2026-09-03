import React, { useRef, useState } from 'react';
import { X, Download, Copy, Check, AlertCircle, Share2, Sparkles } from 'lucide-react';
import { toPng } from 'html-to-image';
import { CreativeType } from '../types';
import { CharacterAvatar } from '../assets/characters/CharacterAvatar';
import { getCharacterImage } from '../assets/characters/characterImages';

interface ShareResultCardProps {
  type: CreativeType;
  isOpen: boolean;
  onClose: () => void;
}

// 检测是否为移动端、平板或 iOS / iPadOS 设备
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

// 辅助绘制圆角矩形
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}

// 移动端专用：Canvas 2D 直接绘制 1080 x 1440 真实高清 PNG (彻底杜绝 DOM 截图与 ForeignObject 空白问题)
async function generateCanvasPosterBlob(type: CreativeType, characterImageSrc: string): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D context from canvas');

  // 等待字体加载
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // 忽略字体报错
    }
  }

  // 1. 加载人物立绘图片
  const charImg = new Image();
  charImg.crossOrigin = 'anonymous';
  const imgLoadPromise = new Promise<void>((resolve, reject) => {
    charImg.onload = () => resolve();
    charImg.onerror = (e) => reject(new Error(`Failed to load character image for Canvas: ${e}`));
  });
  charImg.src = characterImageSrc;
  await imgLoadPromise;
  if (typeof charImg.decode === 'function') {
    try {
      await charImg.decode();
    } catch {
      // ignore
    }
  }

  // 2. 纯白背景 (#FFFFFF)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 1080, 1440);

  const padX = 72;
  const contentWidth = 1080 - padX * 2; // 936px

  // 3. 顶部 Header
  // Logo 圆形 Badge
  const badgeX = padX + 24;
  const badgeY = 76;
  ctx.fillStyle = '#D4FF00';
  ctx.beginPath();
  ctx.arc(badgeX, badgeY, 24, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('G', badgeX, badgeY + 1);

  // Logo 文字 GAFA-TI
  ctx.fillStyle = '#121212';
  ctx.font = '900 28px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('GAFA-TI', padX + 58, badgeY);

  // 右侧 CAMPUS ORIENTATION 2026
  ctx.fillStyle = '#71717A';
  ctx.font = 'bold 18px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText('CAMPUS ORIENTATION 2026', 1080 - padX, badgeY);

  // 顶部细分割线
  ctx.strokeStyle = '#E4E4E7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padX, 116);
  ctx.lineTo(1080 - padX, 116);
  ctx.stroke();

  // 4. 标题区
  // GT编号 / MBTI代码
  ctx.fillStyle = '#9CA3AF';
  ctx.font = 'bold 22px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`${type.number} / ${type.mbtiCode}`, padX, 150);

  // 中文大标题
  ctx.fillStyle = '#000000';
  ctx.font = '900 50px system-ui, -apple-system, sans-serif';
  ctx.fillText(type.title, padX, 186);

  // 英文副标题
  ctx.fillStyle = '#71717A';
  ctx.font = 'bold 20px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
  ctx.fillText(type.enTitle.toUpperCase(), padX, 252);

  // 右侧分类标签 Pill
  ctx.font = 'bold 19px system-ui, sans-serif';
  const categoryText = type.category;
  const catWidth = ctx.measureText(categoryText).width;
  const catPillW = catWidth + 32;
  const catPillH = 38;
  const catPillX = 1080 - padX - catPillW;
  const catPillY = 160;

  ctx.fillStyle = '#F4F4F5';
  drawRoundedRect(ctx, catPillX, catPillY, catPillW, catPillH, 19);
  ctx.fill();

  ctx.fillStyle = '#3F3F46';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(categoryText, catPillX + catPillW / 2, catPillY + catPillH / 2);

  // 5. 中间人物立绘区 (高度 500px, 居中底部靠齐于 y=830)
  const maxImgW = 560;
  const maxImgH = 490;
  const imgAspect = charImg.naturalWidth / charImg.naturalHeight;
  let drawW = maxImgW;
  let drawH = maxImgW / imgAspect;
  if (drawH > maxImgH) {
    drawH = maxImgH;
    drawW = maxImgH * imgAspect;
  }
  const drawX = 540 - drawW / 2;
  const drawY = 830 - drawH;

  ctx.drawImage(charImg, drawX, drawY, drawW, drawH);

  // 宣言 Tagline Quote
  ctx.fillStyle = '#3F3F46';
  ctx.font = '500 24px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(`“${type.tagline}”`, 540, 856);

  // 6. 底部模块
  // 上分割线
  ctx.strokeStyle = '#E4E4E7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padX, 908);
  ctx.lineTo(1080 - padX, 908);
  ctx.stroke();

  // 关键词 Pills
  const pillHeight = 36;
  const pillGap = 12;
  ctx.font = '500 18px system-ui, -apple-system, sans-serif';

  const pillWidths = type.keywords.map((kw) => ctx.measureText(kw).width + 30);
  const totalPillsWidth = pillWidths.reduce((a, b) => a + b, 0) + (type.keywords.length - 1) * pillGap;
  let currPillX = 540 - totalPillsWidth / 2;
  const pillY = 932;

  type.keywords.forEach((kw, idx) => {
    const pW = pillWidths[idx];
    ctx.fillStyle = '#FAFAFA';
    drawRoundedRect(ctx, currPillX, pillY, pW, pillHeight, 18);
    ctx.fill();

    ctx.strokeStyle = '#E4E4E7';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#3F3F46';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(kw, currPillX + pW / 2, pillY + pillHeight / 2);

    currPillX += pW + pillGap;
  });

  // 四维创作光谱 (2x2 网格)
  const gridY1 = 1000;
  const gridY2 = 1076;
  const colW = (contentWidth - 48) / 2; // ~444px
  const col1X = padX;
  const col2X = padX + colW + 48;

  const renderSpectrumBar = (x: number, y: number, leftLabel: string, rightLabel: string, leftScore: number) => {
    ctx.fillStyle = '#71717A';
    ctx.font = '17px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(leftLabel, x, y);

    ctx.textAlign = 'right';
    ctx.fillText(rightLabel, x + colW, y);

    // 槽背景
    const barY = y + 26;
    const barH = 8;
    ctx.fillStyle = '#E4E4E7';
    drawRoundedRect(ctx, x, barY, colW, barH, 4);
    ctx.fill();

    // 黑色进度条
    const progressW = Math.max(8, colW * (leftScore / 100));
    ctx.fillStyle = '#000000';
    drawRoundedRect(ctx, x, barY, progressW, barH, 4);
    ctx.fill();
  };

  renderSpectrumBar(col1X, gridY1, '向内沉浸', '向外共振', type.dimensions.ie.leftScore);
  renderSpectrumBar(col2X, gridY1, '概念构想', '实感观察', type.dimensions.ns.leftScore);
  renderSpectrumBar(col1X, gridY2, '结构推演', '感性表达', type.dimensions.tf.leftScore);
  renderSpectrumBar(col2X, gridY2, '计划构建', '即兴探索', type.dimensions.jp.leftScore);

  // 底部虚线分割线
  ctx.save();
  ctx.strokeStyle = '#D4D4D8';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(padX, 1156);
  ctx.lineTo(1080 - padX, 1156);
  ctx.stroke();
  ctx.restore();

  // 底部印鉴信息
  ctx.fillStyle = '#9CA3AF';
  ctx.font = 'bold 17px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('GUANGZHOU ACADEMY OF FINE ARTS', padX, 1184);
  ctx.fillText('MY GAFA CREATIVE ARCHIVE · 2026', padX, 1210);

  ctx.fillStyle = '#71717A';
  ctx.font = 'bold 18px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'top';
  ctx.fillText('GAFA-TI · 2026', 1080 - padX, 1198);

  // 导出为 Blob
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob && blob.size > 10000) {
        resolve(blob);
      } else {
        reject(new Error('Canvas generated blob is too small or null'));
      }
    }, 'image/png');
  });
}

export const ShareResultCard: React.FC<ShareResultCardProps> = ({
  type,
  isOpen,
  onClose,
}) => {
  const previewCardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 移动端真实 PNG 图片预览层状态
  const [mobilePosterBlob, setMobilePosterBlob] = useState<Blob | null>(null);
  const [mobilePosterUrl, setMobilePosterUrl] = useState<string | null>(null);
  const [showMobilePreviewModal, setShowMobilePreviewModal] = useState(false);

  if (!isOpen) return null;

  const charImageRecord = getCharacterImage(type.id);

  // 生成或下载海报处理流程
  const handleDownload = async () => {
    if (isExporting) return;

    setErrorMessage(null);
    const isMobileOrTablet = checkIsMobileOrTablet();
    console.log(`[GAFA-TI Poster] Starting generation. isMobileOrTablet: ${isMobileOrTablet}`);

    try {
      setIsExporting(true);

      if (!charImageRecord?.src) {
        throw new Error(`Character image record missing for ${type.id}`);
      }

      // ==========================================
      // 方案 A：手机和平板（Canvas 2D 直接生成 1080x1440 真实 PNG + 弹出真图预览层）
      // ==========================================
      if (isMobileOrTablet) {
        console.log('[GAFA-TI Mobile] Using Canvas 2D direct rendering for 1080x1440 PNG...');
        const blob = await generateCanvasPosterBlob(type, charImageRecord.src);
        console.log(`[GAFA-TI Mobile] Canvas PNG blob ready, size: ${blob.size}`);

        const objectUrl = URL.createObjectURL(blob);
        setMobilePosterBlob(blob);
        setMobilePosterUrl(objectUrl);
        setShowMobilePreviewModal(true);

        // 如果支持 Web Share API 直接拉起系统分享尝试
        if (typeof navigator !== 'undefined' && navigator.canShare) {
          try {
            const fileName = `GAFA-TI-${type.number}-${type.title}.png`;
            const file = new File([blob], fileName, { type: 'image/png' });
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({
                files: [file],
                title: `GAFA-TI 创作状态档案 · ${type.title}`,
                text: `我的广美创作状态是：${type.number} ${type.title} (${type.mbtiCode})`,
              });
            }
          } catch {
            // 用户取消分享或环境限制，留在全屏图片预览层供长按保存
          }
        }
        return;
      }

      // ==========================================
      // 方案 B：桌面端（保留原 html-to-image 正常流程）
      // ==========================================
      if (!previewCardRef.current) {
        throw new Error('Preview card DOM ref is null');
      }

      await document.fonts.ready;
      const dataUrl = await toPng(previewCardRef.current, {
        cacheBust: true,
        backgroundColor: '#FFFFFF',
        pixelRatio: 2,
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      if (!blob || blob.size < 10000) {
        throw new Error('Generated blob size is invalid');
      }

      const fileName = `GAFA-TI-${type.number}-${type.title}.png`;
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
    } catch (err) {
      console.error('[GAFA-TI Poster] Failed to generate GAFA-TI poster:', err);
      setErrorMessage('海报生成失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  // 移动端全屏弹窗内：点击【分享海报】
  const handleMobileShare = async () => {
    if (!mobilePosterBlob) return;
    const fileName = `GAFA-TI-${type.number}-${type.title}.png`;
    const file = new File([mobilePosterBlob], fileName, { type: 'image/png' });

    if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `GAFA-TI 创作状态档案 · ${type.title}`,
          text: `我的广美创作状态是：${type.number} ${type.title} (${type.mbtiCode})`,
        });
      } catch {
        // 用户取消
      }
    } else {
      // 降级触发下载
      handleMobileSave();
    }
  };

  // 移动端全屏弹窗内：点击【保存图片】
  const handleMobileSave = () => {
    if (!mobilePosterUrl) return;
    const fileName = `GAFA-TI-${type.number}-${type.title}.png`;
    const link = document.createElement('a');
    link.href = mobilePosterUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 1000);
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

        {/* 3:4 Standalone Poster Card (屏幕交互预览) */}
        <div
          ref={previewCardRef}
          id="share-poster-card-preview"
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

          {/* Center: Large Character Illustration */}
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
            {/* Keywords Pills */}
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
            <span>{isExporting ? '正在生成海报...' : '生成我的 GAFA-TI 海报'}</span>
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

      {/* ========================================================= */}
      {/* 移动端专属：已生成的 1080x1440 真实 PNG 全屏图片预览层 */}
      {/* ========================================================= */}
      {showMobilePreviewModal && mobilePosterUrl && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 overflow-y-auto animate-in fade-in duration-200">
          {/* Header */}
          <div className="w-full max-w-sm flex items-center justify-between text-white pt-2 pb-1">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#D4FF00]">
              <Sparkles className="w-4 h-4" />
              <span>海报生成成功 (1080×1440)</span>
            </div>
            <button
              onClick={() => setShowMobilePreviewModal(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 真实生成的 1080x1440 PNG 图片渲染 */}
          <div className="my-auto py-2 flex flex-col items-center justify-center max-w-sm w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white">
              <img
                src={mobilePosterUrl}
                alt="GAFA-TI Generated Poster"
                className="w-full max-h-[62vh] object-contain block"
              />
            </div>

            {/* 友好提示 */}
            <p className="text-zinc-400 text-xs font-mono mt-3 text-center">
              💡 提示：长按海报即可直接保存图片到相册
            </p>
          </div>

          {/* 底部按钮栏 */}
          <div className="w-full max-w-sm pb-4 flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <button
                onClick={handleMobileSave}
                className="flex-1 bg-[#D4FF00] hover:bg-[#bce000] text-black font-bold text-sm py-3 px-4 rounded-full shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>保存图片</span>
              </button>

              <button
                onClick={handleMobileShare}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold text-sm py-3 px-4 rounded-full backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>分享海报</span>
              </button>
            </div>

            <button
              onClick={() => setShowMobilePreviewModal(false)}
              className="w-full text-zinc-400 hover:text-white text-xs py-1.5 transition-colors font-mono cursor-pointer"
            >
              返回测试结果
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


