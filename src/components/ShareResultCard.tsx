import React, { useEffect, useState, useRef } from 'react';
import { X, Download, Copy, Check, AlertCircle, Share2, Sparkles, Loader2 } from 'lucide-react';
import { CreativeType } from '../types';
import { getCharacterImage } from '../assets/characters/characterImages';
import { generateLongPosterCanvasBlob } from '../utils/generateLongPosterCanvas';
import { ExportLongPoster } from './ExportLongPoster';
import { generateResultShareUrl } from '../utils/resultPersistence';

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

// 检测是否为微信内置浏览器 (iOS / Android / iPad)
function checkIsWeChat(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return /MicroMessenger/i.test(navigator.userAgent || '');
}

export const ShareResultCard: React.FC<ShareResultCardProps> = ({
  type,
  isOpen,
  onClose,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 唯一权威图片源状态 (所有预览、长按保存、下载、分享均使用同一份 posterBlob)
  const [posterBlob, setPosterBlob] = useState<Blob | null>(null);
  const [posterObjectUrl, setPosterObjectUrl] = useState<string | null>(null);
  const currentUrlRef = useRef<string | null>(null);

  const charImageRecord = getCharacterImage(type.id);
  const fileName = `GAFA-TI-${type.number}-${type.title}-完整档案长图.png`;

  // 生成唯一高清 1080px 长图 PNG Blob
  const generatePoster = async () => {
    if (!charImageRecord?.src) {
      setErrorMessage('立绘资源加载中，请稍候重试');
      return;
    }

    try {
      setIsGenerating(true);
      setErrorMessage(null);

      // 使用 Canvas 2D 引擎生成 1080px 宽度高精度竖向长图 PNG (只生成一次)
      const blob = await generateLongPosterCanvasBlob(type, charImageRecord.src);
      console.log(`[GAFA-TI Long Poster] Unified PNG blob generated successfully, size: ${blob.size}`);

      // 清理旧的 Object URL
      if (currentUrlRef.current) {
        URL.revokeObjectURL(currentUrlRef.current);
      }

      const objectUrl = URL.createObjectURL(blob);
      currentUrlRef.current = objectUrl;

      setPosterBlob(blob);
      setPosterObjectUrl(objectUrl);
    } catch (err) {
      console.error('[GAFA-TI Long Poster] Failed to generate GAFA-TI long poster:', err);
      setErrorMessage('长图生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  // 当弹窗打开时，自动触发一次高清长图生成
  useEffect(() => {
    if (isOpen) {
      generatePoster();
    } else {
      // 弹窗关闭时清理资源
      if (currentUrlRef.current) {
        URL.revokeObjectURL(currentUrlRef.current);
        currentUrlRef.current = null;
      }
      setPosterBlob(null);
      setPosterObjectUrl(null);
      setErrorMessage(null);
      setToastMessage(null);
    }

    return () => {
      if (currentUrlRef.current) {
        URL.revokeObjectURL(currentUrlRef.current);
        currentUrlRef.current = null;
      }
    };
  }, [isOpen, type.id]);

  if (!isOpen) return null;

  // 统一保存长图处理流程 (桌面直接下载，移动端优先系统分享或引导长按保存)
  const handleSavePoster = async () => {
    if (!posterBlob || !posterObjectUrl) {
      if (!isGenerating) generatePoster();
      return;
    }

    const isMobileOrTablet = checkIsMobileOrTablet();
    const isWeChat = checkIsWeChat();

    // 微信内置浏览器：引导长按保存，不强制跳出浏览器
    if (isWeChat) {
      setToastMessage('微信用户请长按上方图片，选择“保存图片”');
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }

    // 移动端 / 平板设备：检测支持 Web Share API 文件分享
    if (isMobileOrTablet) {
      const pngFile = new File([posterBlob], fileName, { type: 'image/png' });

      if (
        typeof navigator !== 'undefined' &&
        typeof navigator.share === 'function' &&
        typeof navigator.canShare === 'function'
      ) {
        let canShareFiles = false;
        try {
          canShareFiles = navigator.canShare({ files: [pngFile] });
        } catch {
          canShareFiles = false;
        }

        if (canShareFiles) {
          try {
            await navigator.share({
              files: [pngFile],
              title: `我的 GAFA-TI 创作人格 · ${type.title}`,
              text: `我的广美创作状态是：${type.number} ${type.title} (${type.mbtiCode})`,
            });
            return;
          } catch (err: any) {
            console.log('[GAFA-TI] Native share cancelled or dismissed');
          }
        }
      }

      // 若不支持系统文件分享或用户取消：友好提示长按保存
      setToastMessage('请长按上方长图，选择“保存图片”到相册');
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }

    // 桌面端：直接触发同一份 posterObjectUrl 下载
    const link = document.createElement('a');
    link.href = posterObjectUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 2000);
  };

  // 统一分享长图 (使用同一份 posterBlob)
  const handleSharePoster = async () => {
    if (!posterBlob) return;
    const file = new File([posterBlob], fileName, { type: 'image/png' });

    if (
      typeof navigator !== 'undefined' &&
      typeof navigator.share === 'function' &&
      typeof navigator.canShare === 'function'
    ) {
      try {
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `我的 GAFA-TI 创作人格 · ${type.title}`,
            text: `我的广美创作状态是：${type.number} ${type.title} (${type.mbtiCode})`,
          });
        }
      } catch {
        // 用户取消分享
      }
    } else {
      setToastMessage('当前浏览器不支持系统分享，请长按图片保存或复制链接');
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  // 复制可恢复结果的分享链接
  const handleCopyLink = () => {
    const shareUrl = generateResultShareUrl(type);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl || window.location.href);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl || window.location.href;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      {/* 隐藏的导出专用长图 DOM 组件 (供必要时 DOM 结构参考与无头测试) */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none opacity-0" aria-hidden="true">
        <ExportLongPoster type={type} id="export-long-poster-dom" />
      </div>

      <div className="relative max-w-lg w-full flex flex-col items-center my-auto py-3 sm:py-4">
        
        {/* Modal Controls Header */}
        <div className="w-full flex items-center justify-between text-white mb-2.5 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00]"></span>
            <span className="text-xs font-mono tracking-widest text-zinc-300 font-bold uppercase">
              GAFA-TI 完整创作档案长图
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="关闭"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 顶部醒目提示条 */}
        <div className="w-full bg-zinc-900/95 rounded-2xl p-3 mb-2.5 border border-zinc-700/80 text-center shadow-lg">
          <p className="text-[#D4FF00] text-xs sm:text-sm font-bold tracking-tight">
            长按图片，选择“保存图片”即可保存到相册
          </p>
          <p className="text-zinc-400 text-[11px] font-mono mt-0.5">
            💡 安卓 / 鸿蒙 / 微信用户：长按下方长图 → 保存图片
          </p>
        </div>

        {/* ========================================================= */}
        {/* 核心展示区：唯一 1080px 高清完整长图 PNG (非 HTML 卡片，非缩略图) */}
        {/* ========================================================= */}
        <div className="w-full relative rounded-2xl overflow-y-auto max-h-[60vh] sm:max-h-[65vh] shadow-2xl border border-white/20 bg-[#ECECED] flex flex-col items-center justify-start">
          {isGenerating && (
            <div className="py-24 flex flex-col items-center justify-center gap-3 text-zinc-600">
              <Loader2 className="w-8 h-8 animate-spin text-black" />
              <span className="text-xs font-mono font-bold">正在生成 1080px 高清完整档案长图...</span>
            </div>
          )}

          {!isGenerating && posterObjectUrl && (
            <img
              src={posterObjectUrl}
              alt="GAFA-TI完整结果长图"
              className="w-full h-auto object-contain block select-none pointer-events-auto"
              style={{ WebkitTouchCallout: 'default' }}
            />
          )}

          {!isGenerating && !posterObjectUrl && errorMessage && (
            <div className="py-16 px-4 flex flex-col items-center justify-center gap-3 text-center">
              <AlertCircle className="w-8 h-8 text-rose-500" />
              <p className="text-sm font-medium text-zinc-800">{errorMessage}</p>
              <button
                onClick={generatePoster}
                className="mt-2 text-xs font-bold font-mono px-4 py-2 rounded-full bg-black text-white hover:bg-zinc-800 cursor-pointer"
              >
                重新生成长图
              </button>
            </div>
          )}
        </div>

        {/* 友好 Toast 提示 */}
        {toastMessage && (
          <div className="w-full mt-2 px-4 py-2 bg-[#D4FF00] text-black text-xs font-bold rounded-xl flex items-center justify-center gap-2 animate-in fade-in shadow-md">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Error message alert */}
        {errorMessage && !toastMessage && (
          <div className="w-full mt-2 px-4 py-2 bg-rose-500/90 text-white text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Buttons below card */}
        <div className="w-full mt-3 flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2.5">
            {/* 1. 保存 / 下载长图 (统一使用同一个 posterBlob) */}
            <button
              onClick={handleSavePoster}
              disabled={isGenerating || !posterBlob}
              className={`flex-1 inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm px-4 py-3 rounded-full shadow-md transition-all ${
                isGenerating || !posterBlob
                  ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                  : 'bg-[#D4FF00] hover:bg-[#bce000] text-black cursor-pointer'
              }`}
            >
              <Download className={`w-4 h-4 ${isGenerating ? 'animate-bounce' : ''}`} />
              <span>{isGenerating ? '长图生成中...' : '保存 / 下载长图'}</span>
            </button>

            {/* 2. 系统分享 (若支持 Web Share API) */}
            {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
              <button
                onClick={handleSharePoster}
                disabled={isGenerating || !posterBlob}
                className="inline-flex items-center justify-center gap-1.5 bg-white/20 hover:bg-white/30 text-white font-medium text-xs sm:text-sm px-4 py-3 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>分享长图</span>
              </button>
            )}

            {/* 3. 复制链接 */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-zinc-100 text-zinc-900 font-medium text-xs sm:text-sm px-4 py-3 rounded-full transition-colors cursor-pointer"
            >
              {hasCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{hasCopied ? '已复制' : '复制链接'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full text-zinc-400 hover:text-white text-xs py-1 transition-colors font-mono cursor-pointer text-center"
          >
            返回测试结果
          </button>
        </div>
      </div>
    </div>
  );
};

