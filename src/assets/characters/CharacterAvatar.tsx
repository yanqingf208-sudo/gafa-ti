import React, { useState } from 'react';
import { getCharacterImage } from './characterImages';

interface CharacterAvatarProps {
  id: string; // 'gt-01' ~ 'gt-16' 或 'INTJ' 等
  size?: 'sm' | 'md' | 'carousel' | 'lg' | 'hero' | 'poster';
  className?: string;
  isHovered?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  id,
  size = 'md',
  className = '',
  isHovered = false,
}) => {
  const [loadError, setLoadError] = useState(false);
  const charImage = getCharacterImage(id);

  // 尺寸映射：保持原图完整比例，严禁裁切、拉伸与变形
  // carousel: 专用于 16 人格展览区，相比原有 md 视觉放大约 10%
  const sizeClasses = {
    sm: 'w-16 h-20',
    md: 'w-36 h-48 sm:w-40 sm:h-52',
    carousel: 'w-40 h-54 sm:w-44 sm:h-60 max-w-[220px]',
    lg: 'w-56 h-72 sm:w-64 sm:h-80',
    hero: 'w-full h-72 sm:h-88 md:h-[400px] max-w-sm',
    poster: 'w-full h-48 sm:h-56 max-w-[260px]',
  };

  // 若无对应记录或图片加载失败，呈现明确的缺图提示（严禁使用旧模型人物或第三方占位图替代）
  if (!charImage || loadError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-4 border border-dashed border-zinc-300 rounded-xl bg-zinc-50/50 text-zinc-400 font-mono text-center select-none ${sizeClasses[size]} ${className}`}
      >
        <span className="text-[10px] text-amber-600 font-bold mb-1">
          [立绘资源缺失]
        </span>
        <span className="text-xs font-bold text-zinc-700">
          {id?.toUpperCase() || 'UNKNOWN'}
        </span>
        <span className="text-[9px] text-zinc-400 mt-1">
          {charImage ? charImage.fileName : '未找到对应映射'}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-end justify-center select-none overflow-hidden ${sizeClasses[size]} ${className}`}
      style={{
        boxShadow: 'none',
        filter: 'none',
      }}
    >
      <img
        src={charImage.src}
        alt={charImage.altText}
        loading="eager"
        referrerPolicy="no-referrer"
        onError={() => {
          console.error(`[GAFA-TI] Failed to load character image: ${charImage.fileName} (${charImage.id})`);
          setLoadError(true);
        }}
        className={`w-full h-full transition-transform duration-300 pointer-events-none ${
          isHovered ? 'scale-105 -translate-y-1' : ''
        }`}
        style={{
          objectFit: 'contain',
          objectPosition: 'center bottom',
          filter: 'none',
          boxShadow: 'none',
        }}
      />
    </div>
  );
};
