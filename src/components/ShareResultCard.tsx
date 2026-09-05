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

// 严格判断是否为真实移动端或平板设备（iPhone / iPad / iPadOS / Android / HarmonyOS）
// 严禁使用 navigator.share 来判断设备类型，因为 macOS 桌面 Safari 也支持 navigator.share
function checkIsMobileOrTablet(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const maxTouchPoints = navigator.maxTouchPoints || 0;

  // 1. iPhone / iPod 明确移动端
  const isIPhone = /iPhone|iPod/i.test(ua);

  // 2. Android 手机与平板
  const isAndroid = /Android/i.test(ua);

  // 3. 鸿蒙系统手机与平板
  const isHarmonyOS = /HarmonyOS|HuaweiBrowser/i.test(ua);

  // 4. iPad 与 iPadOS：
  // 包含标准 UA 中的 iPad，以及 iOS 13+ iPadOS 默认伪装成 "Macintosh" / "MacIntel" 但具备触控屏 (maxTouchPoints > 1)
  const isIPad =
    /iPad/i.test(ua) ||
    ((/Macintosh|MacIntel/i.test(ua) || platform === 'MacIntel') && maxTouchPoints > 1);

  // 5. 明确的其他移动端 UA
  const isOtherMobileUA = /webOS|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua);

  // 注意：Mac 电脑 (MacBook / iMac) 会命中 /Macintosh/，但其 maxTouchPoints 为 0 或 1，因此不会被误判为 iPad
  return isIPhone || isAndroid || isHarmonyOS || isIPad || isOtherMobileUA;
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

  // =========================================================================
  // 唯一最终资源状态 (Single Source of Truth)
  // 电脑端下载、手机端保存、系统分享、复制链接全部使用同一份 finalPosterBlob 派生的完整高清 PNG
  // 绝不截取当前滚动视口，绝不二次生成，100% 确保所有端使用的是同一张完整 1080px 长图
  // =========================================================================
  const [finalPosterBlob, setFinalPosterBlob] = useState<Blob | null>(null);
  const [finalPosterDataUrl, setFinalPosterDataUrl] = useState<string | null>(null);
  const [finalPosterObjectUrl, setFinalPosterObjectUrl] = useState<string | null>(null);
  const activeObjectUrlRef = useRef<string | null>(null);

  const charImageRecord = getCharacterImage(type.id);
  const fileName = `GAFA-TI-${type.number}-${type.title}-完整创作档案长图.png`;
  const isMobileOrTablet = checkIsMobileOrTablet();

  // 生成唯一高清 1080px 长图 PNG Blob 与 DataURL
  const generatePoster = async () => {
    if (!charImageRecord?.src) {
      setErrorMessage('立绘资源加载中，请稍候重试');
      return;
    }

    try {
      setIsGenerating(true);
      setErrorMessage(null);

      // 1. 生成唯一权威 1080px 宽度高精度竖向长图 PNG Blob (只生成一次)
      const blob = await generateLongPosterCanvasBlob(type, charImageRecord.src);
      console.log(`[GAFA-TI Long Poster] Final poster blob ready, size: ${blob.size}`);

      // 2. 转换为 Base64 DataURL (全端兼容，免除生命周期限制)
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to convert Blob to DataURL'));
          }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
      });

      // 3. 同时派生 Object URL 供桌面端高性能下载
      if (activeObjectUrlRef.current) {
        URL.revokeObjectURL(activeObjectUrlRef.current);
      }
      const objectUrl = URL.createObjectURL(blob);
      activeObjectUrlRef.current = objectUrl;

      setFinalPosterBlob(blob);
      setFinalPosterDataUrl(dataUrl);
      setFinalPosterObjectUrl(objectUrl);
    } catch (err) {
      console.error('[GAFA-TI Long Poster] Failed to generate GAFA-TI long poster:', err);
      setErrorMessage('长图生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  // 当弹窗打开时，触发一次高清长图生成；关闭时安全释放内存
  useEffect(() => {
    if (isOpen) {
      generatePoster();
    } else {
      if (activeObjectUrlRef.current) {
        URL.revokeObjectURL(activeObjectUrlRef.current);
        activeObjectUrlRef.current = null;
      }
      setFinalPosterBlob(null);
      setFinalPosterDataUrl(null);
      setFinalPosterObjectUrl(null);
      setErrorMessage(null);
      setToastMessage(null);
    }

    return () => {
      if (activeObjectUrlRef.current) {
        URL.revokeObjectURL(activeObjectUrlRef.current);
        activeObjectUrlRef.current = null;
      }
    };
  }, [isOpen, type.id]);

  if (!isOpen) return null;

  // =========================================================================
  // 桌面端专用下载函数 (MacBook / iMac / Windows / Linux 电脑)
  // 必须直接执行 <a download> 触发 PNG 文件下载，绝对不调用 navigator.share，绝不弹出隔空投送
  // =========================================================================
  const downloadPosterOnDesktop = () => {
    if (!finalPosterBlob) {
      if (!isGenerating) generatePoster();
      return;
    }

    const url = URL.createObjectURL(finalPosterBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  // =========================================================================
  // 移动端/平板专用保存到相册函数 (iPhone / iPad / Android / 鸿蒙)
  // 调用系统原生 Web Share File 接口唤起系统菜单（保存到照片 / 存储图像 / 微信 / 文件）
  // =========================================================================
  const savePosterOnMobile = async () => {
    if (!finalPosterBlob) {
      if (!isGenerating) generatePoster();
      return;
    }

    const finalPosterFile = new File([finalPosterBlob], fileName, { type: 'image/png' });

    if (
      typeof navigator !== 'undefined' &&
      typeof navigator.share === 'function' &&
      typeof navigator.canShare === 'function'
    ) {
      let canShareFiles = false;
      try {
        canShareFiles = navigator.canShare({ files: [finalPosterFile] });
      } catch {
        canShareFiles = false;
      }

      if (canShareFiles) {
        try {
          await navigator.share({
            files: [finalPosterFile],
            title: `我的 GAFA-TI 创作档案 · ${type.title}`,
            text: `我的广美创作状态是：${type.number} ${type.title} (${type.mbtiCode})`,
          });
          return;
        } catch (err: any) {
          console.log('[GAFA-TI] Native share cancelled or dismissed');
          return;
        }
      }
    }

    // 移动端若环境暂不支持直接调用系统文件分享
    setToastMessage('当前浏览器环境暂不支持直接拉起相册，请点击“复制链接”在系统浏览器中打开');
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 主动作按钮点击路由：电脑端强制走下载，移动端走系统相册保存
  const handleMainAction = () => {
    if (isMobileOrTablet) {
      savePosterOnMobile();
    } else {
      downloadPosterOnDesktop();
    }
  };

  // =========================================================================
  // “分享长图”独立按钮
  // 无论桌面还是移动端，当用户明确点击“分享长图”时才调用 navigator.share
  // =========================================================================
  const handleSharePoster = async () => {
    if (!finalPosterBlob) return;
    const finalPosterFile = new File([finalPosterBlob], fileName, { type: 'image/png' });

    if (
      typeof navigator !== 'undefined' &&
      typeof navigator.share === 'function' &&
      typeof navigator.canShare === 'function'
    ) {
      let canShareFiles = false;
      try {
        canShareFiles = navigator.canShare({ files: [finalPosterFile] });
      } catch {
        canShareFiles = false;
      }

      if (canShareFiles) {
        try {
          await navigator.share({
            files: [finalPosterFile],
            title: `我的 GAFA-TI 创作档案 · ${type.title}`,
            text: `我的广美创作状态是：${type.number} ${type.title} (${type.mbtiCode})`,
          });
          return;
        } catch {
          // 用户取消分享
          return;
        }
      }
    }

    // 若不支持系统分享
    setToastMessage('当前浏览器不支持系统分享，请点击“复制链接”');
    setTimeout(() => setToastMessage(null), 3500);
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
        <div className="w-full flex items-center justify-between text-white mb-3 px-1">
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

        {/* ========================================================= */}
        {/* 核心展示区：真实高清 1080px PNG <img /> 完整档案长图 */}
        {/* ========================================================= */}
        <div className="w-full relative rounded-2xl overflow-y-auto max-h-[64vh] sm:max-h-[68vh] shadow-2xl border border-white/20 bg-[#ECECED] flex flex-col items-center justify-start">
          {isGenerating && (
            <div className="py-24 flex flex-col items-center justify-center gap-3 text-zinc-600">
              <Loader2 className="w-8 h-8 animate-spin text-black" />
              <span className="text-xs font-mono font-bold">正在生成 1080px 高清完整档案长图...</span>
            </div>
          )}

          {!isGenerating && (finalPosterDataUrl || finalPosterObjectUrl) && (
            <img
              src={finalPosterDataUrl || finalPosterObjectUrl || ''}
              alt="GAFA-TI完整创作档案长图"
              className="w-full h-auto block select-none pointer-events-auto"
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                maxHeight: 'none',
                objectFit: 'contain',
              }}
            />
          )}

          {!isGenerating && !finalPosterDataUrl && !finalPosterObjectUrl && errorMessage && (
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

        {/* Action Buttons below card (图片外独立控制按钮组) */}
        <div className="w-full mt-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2.5">
            {/* 1. 主操作按钮：桌面电脑执行强制下载，手机和平板调起系统相册保存 */}
            <button
              onClick={handleMainAction}
              disabled={isGenerating || !finalPosterBlob}
              className={`flex-1 inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm px-4 py-3.5 rounded-full shadow-md transition-all ${
                isGenerating || !finalPosterBlob
                  ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                  : 'bg-[#D4FF00] hover:bg-[#bce000] text-black cursor-pointer'
              }`}
            >
              <Download className={`w-4 h-4 ${isGenerating ? 'animate-bounce' : ''}`} />
              <span>
                {isGenerating
                  ? '长图生成中...'
                  : isMobileOrTablet
                  ? '保存到相册'
                  : '下载完整长图'}
              </span>
            </button>

            {/* 2. 分享长图：独立按钮，仅在支持系统分享的环境显示，用户主动点击触发系统分享 */}
            {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
              <button
                onClick={handleSharePoster}
                disabled={isGenerating || !finalPosterBlob}
                className="inline-flex items-center justify-center gap-1.5 bg-white/20 hover:bg-white/30 text-white font-medium text-xs sm:text-sm px-4 py-3.5 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>分享长图</span>
              </button>
            )}

            {/* 3. 复制链接 */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-zinc-100 text-zinc-900 font-medium text-xs sm:text-sm px-4 py-3.5 rounded-full transition-colors cursor-pointer"
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


