import React, { useRef, useState } from 'react';
import { X, Download, Copy, Check, AlertCircle, Share2, Sparkles } from 'lucide-react';
import { CreativeType } from '../types';
import { CharacterAvatar } from '../assets/characters/CharacterAvatar';
import { getCharacterImage } from '../assets/characters/characterImages';
import { generateLongPosterCanvasBlob } from '../utils/generateLongPosterCanvas';
import { ExportLongPoster } from './ExportLongPoster';

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

  // 生成并下载长图海报处理流程 (导出包含全部结束页模块的 1080px 宽竖向长图)
  const handleDownload = async () => {
    if (isExporting) return;

    setErrorMessage(null);
    const isMobileOrTablet = checkIsMobileOrTablet();
    console.log(`[GAFA-TI Long Poster] Starting export. isMobileOrTablet: ${isMobileOrTablet}`);

    try {
      setIsExporting(true);

      if (!charImageRecord?.src) {
        throw new Error(`Character image record missing for ${type.id}`);
      }

      // 使用 Canvas 2D 导出专用引擎直接生成 1080px 宽度高精度竖向长图 PNG
      const blob = await generateLongPosterCanvasBlob(type, charImageRecord.src);
      console.log(`[GAFA-TI Long Poster] PNG blob ready, size: ${blob.size}`);

      const fileName = `GAFA-TI-${type.number}-${type.title}-完整档案长图.png`;
      const objectUrl = URL.createObjectURL(blob);

      // ==========================================
      // 方案 A：手机和平板（弹出全屏高清图片预览层，支持长按保存与系统分享）
      // ==========================================
      if (isMobileOrTablet) {
        setMobilePosterBlob(blob);
        setMobilePosterUrl(objectUrl);
        setShowMobilePreviewModal(true);

        // 如果支持 Web Share API 直接拉起系统分享
        if (typeof navigator !== 'undefined' && navigator.canShare) {
          try {
            const file = new File([blob], fileName, { type: 'image/png' });
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({
                files: [file],
                title: `GAFA-TI 创作状态长图档案 · ${type.title}`,
                text: `我的广美创作状态是：${type.number} ${type.title} (${type.mbtiCode})`,
              });
            }
          } catch {
            // 用户取消分享或环境限制，留在全屏长图预览层供长按保存
          }
        }
        return;
      }

      // ==========================================
      // 方案 B：桌面端（直接触发文件下载）
      // ==========================================
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(objectUrl);
      }, 2000);
    } catch (err) {
      console.error('[GAFA-TI Long Poster] Failed to generate GAFA-TI long poster:', err);
      setErrorMessage('长图海报生成失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  // 移动端全屏弹窗内：点击【分享长图】
  const handleMobileShare = async () => {
    if (!mobilePosterBlob) return;
    const fileName = `GAFA-TI-${type.number}-${type.title}-完整档案长图.png`;
    const file = new File([mobilePosterBlob], fileName, { type: 'image/png' });

    if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `GAFA-TI 创作状态长图档案 · ${type.title}`,
          text: `我的广美创作状态是：${type.number} ${type.title} (${type.mbtiCode})`,
        });
      } catch {
        // 用户取消
      }
    } else {
      // 降级触发直接下载
      handleMobileSave();
    }
  };

  // 移动端全屏弹窗内：点击【保存长图】
  const handleMobileSave = () => {
    if (!mobilePosterUrl) return;
    const fileName = `GAFA-TI-${type.number}-${type.title}-完整档案长图.png`;
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
      
      {/* 隐藏的导出专用长图 DOM 组件 (确保 DOM 结构与样式完整可用) */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none opacity-0" aria-hidden="true">
        <ExportLongPoster type={type} id="export-long-poster-dom" />
      </div>

      <div className="relative max-w-lg w-full flex flex-col items-center my-auto py-6">
        
        {/* Modal Controls Header */}
        <div className="w-full flex items-center justify-between text-white mb-3 px-1">
          <span className="text-xs font-mono tracking-widest text-zinc-300">
            GAFA CREATIVE ARCHIVE · POSTER EXPORT
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3:4 Standalone Poster Card (屏幕交互预览卡片保持原样，方便直观预览) */}
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
                    style={{ width: `${type.dimensions.ie?.leftScore || 50}%` }}
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
                    style={{ width: `${type.dimensions.ns?.leftScore || 50}%` }}
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
                    style={{ width: `${type.dimensions.tf?.leftScore || 50}%` }}
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
                    style={{ width: `${type.dimensions.jp?.leftScore || 50}%` }}
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

        {/* 提示文案：告知将导出完整结果长图 */}
        <div className="w-full mt-2 text-center">
          <span className="text-[11px] font-mono text-zinc-400">
            点击将导出包含全部 6 大深度画像模块的 1080px 完整长图
          </span>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="w-full mt-3 px-4 py-2 bg-rose-500/90 text-white text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Buttons below card */}
        <div className="w-full mt-3 flex items-center justify-center gap-3">
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
            <span>{isExporting ? '正在生成长图海报...' : '下载完整结果长图'}</span>
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
      {/* 移动端专属：已生成的 1080px 竖向长图真实 PNG 全屏图片预览层 */}
      {/* ========================================================= */}
      {showMobilePreviewModal && mobilePosterUrl && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 overflow-y-auto animate-in fade-in duration-200">
          {/* Header */}
          <div className="w-full max-w-sm flex items-center justify-between text-white pt-2 pb-1">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#D4FF00]">
              <Sparkles className="w-4 h-4" />
              <span>长图海报生成成功 (1080px 高清)</span>
            </div>
            <button
              onClick={() => setShowMobilePreviewModal(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 真实生成的 1080px 宽竖向长图 PNG 渲染 */}
          <div className="my-auto py-2 flex flex-col items-center justify-center max-w-sm w-full">
            <div className="relative rounded-2xl overflow-y-auto max-h-[62vh] shadow-2xl border border-white/20 bg-white">
              <img
                src={mobilePosterUrl}
                alt="GAFA-TI Generated Long Poster"
                className="w-full h-auto object-contain block"
              />
            </div>

            {/* 友好提示 */}
            <p className="text-zinc-400 text-xs font-mono mt-3 text-center">
              💡 提示：长按长图即可直接保存图片到相册
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
                <span>保存长图</span>
              </button>

              <button
                onClick={handleMobileShare}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold text-sm py-3 px-4 rounded-full backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>分享长图</span>
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
