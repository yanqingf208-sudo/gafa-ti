import React from 'react';

interface CharacterAvatarProps {
  id: string; // 'gt-01' ~ 'gt-16'
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'poster';
  className?: string;
  isHovered?: boolean;
}

// 16 GAFA discipline visual icons and palettes for each character
const CHARACTER_META: Record<string, {
  color: string;
  bgGrad: string;
  tool: string;
  discipline: string;
  accessory: string;
  symbol: string;
}> = {
  'gt-01': {
    color: '#7C3AED',
    bgGrad: 'from-violet-500/15 to-purple-500/5',
    tool: '游标卡尺与几何构件',
    discipline: '建筑空间 / 参数化设计',
    accessory: '蓝图夹板 · 测量仪',
    symbol: '📐',
  },
  'gt-02': {
    color: '#6366F1',
    bgGrad: 'from-indigo-500/15 to-blue-500/5',
    tool: '概念草图与计算模型',
    discipline: '数码媒体 / 实验艺术',
    accessory: 'Figma框架 · 逻辑网格',
    symbol: '💠',
  },
  'gt-03': {
    color: '#6D28D9',
    bgGrad: 'from-purple-600/15 to-indigo-500/5',
    tool: '数位屏与矢量界面',
    discipline: '视觉传达 / 跨媒介统筹',
    accessory: '手提电脑 · 提案图表',
    symbol: '📊',
  },
  'gt-04': {
    color: '#8B5CF6',
    bgGrad: 'from-violet-400/15 to-fuchsia-500/5',
    tool: '雕塑石膏与工锤',
    discipline: '雕塑与公共艺术 / 装置',
    accessory: '石工围裙 · 破拆锤',
    symbol: '🔨',
  },
  'gt-05': {
    color: '#0D9488',
    bgGrad: 'from-teal-500/15 to-emerald-500/5',
    tool: '巨幅油画刷与调色板',
    discipline: '壁画与当代架上艺术',
    accessory: '青碧袍服 · 矿物色盘',
    symbol: '🎨',
  },
  'gt-06': {
    color: '#059669',
    bgGrad: 'from-emerald-500/15 to-teal-500/5',
    tool: '毛笔、端砚与宣纸长卷',
    discipline: '中国画与传统水墨',
    accessory: '水墨案台 · 竹韵长卷',
    symbol: '🖌️',
  },
  'gt-07': {
    color: '#047857',
    bgGrad: 'from-emerald-600/15 to-green-500/5',
    tool: '共创圆桌与策展册',
    discipline: '艺术管理 / 社区艺术',
    accessory: '作品样册 · 提案沙盘',
    symbol: '🏛️',
  },
  'gt-08': {
    color: '#10B981',
    bgGrad: 'from-green-500/15 to-emerald-500/5',
    tool: '涂鸦马克笔与地面画卷',
    discipline: '实验插画 / 潮流涂鸦',
    accessory: '连帽卫衣 · 荧光手稿',
    symbol: '⚡',
  },
  'gt-09': {
    color: '#2563EB',
    bgGrad: 'from-blue-600/15 to-indigo-500/5',
    tool: '严密制图板与色标卡',
    discipline: '工业设计 / 结构工程',
    accessory: '黑框眼镜 · 2026年鉴',
    symbol: '📏',
  },
  'gt-10': {
    color: '#1D4ED8',
    bgGrad: 'from-blue-500/15 to-sky-500/5',
    tool: '工艺色票与质检手册',
    discipline: '染织与工艺美术',
    accessory: '工装围裙 · 标本板',
    symbol: '🧵',
  },
  'gt-11': {
    color: '#1E40AF',
    bgGrad: 'from-blue-700/15 to-slate-500/5',
    tool: '排期日程与执行清单',
    discipline: '展示设计 / 展览总控',
    accessory: '便签白板 · 黑色高跟',
    symbol: '📋',
  },
  'gt-12': {
    color: '#0284C7',
    bgGrad: 'from-sky-500/15 to-blue-500/5',
    tool: '现场画笔与布展帆布包',
    discipline: '艺术教育 / 综合材料',
    accessory: 'GAFA手袋 · 运动板鞋',
    symbol: '🏷️',
  },
  'gt-13': {
    color: '#D97706',
    bgGrad: 'from-amber-500/15 to-orange-500/5',
    tool: '陶泥塑刀与实体微缩模型',
    discipline: '陶瓷工艺 / 空间构件',
    accessory: '手工木桌 · 塑形工具',
    symbol: '🏺',
  },
  'gt-14': {
    color: '#EA580C',
    bgGrad: 'from-orange-500/15 to-amber-500/5',
    tool: '油画画架与贝雷帽',
    discipline: '油画系 / 具象写生',
    accessory: '木质画架 · 油彩画笔',
    symbol: '🖼️',
  },
  'gt-15': {
    color: '#C2410C',
    bgGrad: 'from-orange-600/15 to-red-500/5',
    tool: '酷黑墨镜与几何切削刀',
    discipline: '重型雕塑 / 动力装置',
    accessory: '防尘墨镜 · 工具箱',
    symbol: '🗿',
  },
  'gt-16': {
    color: '#D97706',
    bgGrad: 'from-amber-500/15 to-yellow-500/5',
    tool: '展台聚光灯与画作展架',
    discipline: '策展叙事 / 视觉剧场',
    accessory: '展台基座 · 讲解手势',
    symbol: '✨',
  },
};

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  id,
  size = 'md',
  className = '',
  isHovered = false,
}) => {
  const meta = CHARACTER_META[id] || CHARACTER_META['gt-01'];

  const sizeClasses = {
    sm: 'w-16 h-20 text-xs',
    md: 'w-36 h-48 sm:w-44 sm:h-56',
    lg: 'w-56 h-72 sm:w-64 sm:h-80',
    hero: 'w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[420px]',
    poster: 'w-64 h-80 sm:w-72 sm:h-92',
  };

  return (
    <div
      className={`relative flex items-center justify-center select-none ${sizeClasses[size]} ${className}`}
    >
      {/* Dynamic faceted geometric character SVG illustration with GAFA emblem */}
      <svg
        viewBox="0 0 320 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full object-contain transition-transform duration-300 ${
          isHovered ? 'scale-105 -translate-y-2' : ''
        }`}
      >
        <defs>
          <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={meta.color} stopOpacity="0.85" />
            <stop offset="100%" stopColor={meta.color} stopOpacity="0.35" />
          </linearGradient>
          <filter id={`shadow-${id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor={meta.color} floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Studio Drafting Backdrop Grid / Easel / Blueprint */}
        <g opacity="0.45">
          <rect x="36" y="24" width="248" height="240" rx="8" fill="#F4F4F5" stroke="#E4E4E7" strokeWidth="1.5" />
          {/* Subtle grid lines */}
          <line x1="36" y1="84" x2="284" y2="84" stroke="#E4E4E7" strokeDasharray="3 3" />
          <line x1="36" y1="144" x2="284" y2="144" stroke="#E4E4E7" strokeDasharray="3 3" />
          <line x1="36" y1="204" x2="284" y2="204" stroke="#E4E4E7" strokeDasharray="3 3" />
          <line x1="98" y1="24" x2="98" y2="264" stroke="#E4E4E7" strokeDasharray="3 3" />
          <line x1="160" y1="24" x2="160" y2="264" stroke="#E4E4E7" strokeDasharray="3 3" />
          <line x1="222" y1="24" x2="222" y2="264" stroke="#E4E4E7" strokeDasharray="3 3" />

          {/* Minimal GAFA Badge Stamp in studio background */}
          <rect x="48" y="38" width="56" height="22" rx="4" fill="#FFFFFF" stroke="#E4E4E7" />
          <text x="54" y="53" fill="#71717A" fontSize="9" fontFamily="monospace" fontWeight="600">GAFA 2026</text>
        </g>

        {/* Floor cast shadow */}
        <ellipse cx="160" cy="365" rx="88" ry="14" fill="#121212" fillOpacity="0.07" />

        {/* Stylized Low-Poly / Editorial Figure */}
        {/* Legs & Shoes */}
        <g>
          <path d="M136 270 L146 350 L120 354 L114 340 L130 270 Z" fill="#27272A" />
          <path d="M184 270 L174 350 L200 354 L206 340 L190 270 Z" fill="#3F3F46" />
          {/* Shoes */}
          <rect x="110" y="348" width="38" height="12" rx="4" fill={meta.color} />
          <rect x="172" y="348" width="38" height="12" rx="4" fill={meta.color} />
        </g>

        {/* Torso / Studio Jumpsuit / Smock */}
        <g filter={`url(#shadow-${id})`}>
          {/* Main Body */}
          <polygon points="120,130 200,130 216,270 104,270" fill={`url(#grad-${id})`} />
          <polygon points="120,130 160,165 104,270" fill={meta.color} fillOpacity="0.75" />
          <polygon points="200,130 160,165 216,270" fill={meta.color} fillOpacity="0.9" />

          {/* Belt & Studio Pouch */}
          <rect x="108" y="210" width="104" height="14" rx="2" fill="#18181B" />
          <rect x="150" y="207" width="20" height="20" rx="3" fill="#E4E4E7" />
          {/* GAFA Emblem Button on pocket */}
          <circle cx="132" cy="180" r="11" fill="#FFFFFF" />
          <text x="127" y="185" fill={meta.color} fontSize="12" fontWeight="900" fontFamily="sans-serif">G</text>

          {/* Collar / Lapel */}
          <polygon points="135,130 160,158 145,130" fill="#FAFAFA" />
          <polygon points="185,130 160,158 175,130" fill="#E4E4E7" />
        </g>

        {/* Arms & Hands holding characteristic creative tool */}
        <g>
          {/* Left Arm */}
          <polygon points="120,135 88,185 104,195 130,150" fill={meta.color} fillOpacity="0.8" />
          {/* Left Hand holding board/tool */}
          <polygon points="86,182 72,215 96,215 102,192" fill="#FBCFE8" />

          {/* Right Arm */}
          <polygon points="200,135 232,185 216,195 190,150" fill={meta.color} fillOpacity="0.95" />
          {/* Right Hand */}
          <polygon points="234,182 248,215 224,215 218,192" fill="#FBCFE8" />

          {/* Characteristic discipline tool in hands */}
          <g transform="translate(110, 190)">
            <rect x="0" y="0" width="100" height="60" rx="5" fill="#FFFFFF" stroke={meta.color} strokeWidth="2" />
            <line x1="12" y1="18" x2="88" y2="18" stroke={meta.color} strokeWidth="2" strokeDasharray="4 2" />
            <line x1="12" y1="32" x2="68" y2="32" stroke="#A1A1AA" strokeWidth="1.5" />
            <line x1="12" y1="44" x2="52" y2="44" stroke="#D4D4D8" strokeWidth="1.5" />
            {/* Small icon on canvas */}
            <circle cx="78" cy="38" r="10" fill={meta.color} fillOpacity="0.2" />
            <text x="74" y="42" fill={meta.color} fontSize="11" fontWeight="bold">✦</text>
          </g>
        </g>

        {/* Neck & Head */}
        <g>
          {/* Neck */}
          <polygon points="150,118 170,118 168,135 152,135" fill="#FBCFE8" />

          {/* Head faceted polygon */}
          <polygon points="132,60 188,60 196,104 160,126 124,104" fill="#FED7AA" />
          <polygon points="124,104 160,126 160,60 132,60" fill="#FDBA74" />

          {/* Sculpted Hair */}
          <polygon points="120,62 160,28 200,62 196,44 160,20 124,44" fill="#27272A" />
          <polygon points="118,60 130,86 122,86" fill="#18181B" />
          <polygon points="202,60 190,86 198,86" fill="#27272A" />

          {/* Minimalist Glasses or Facial features */}
          <circle cx="145" cy="80" r="3" fill="#18181B" />
          <circle cx="175" cy="80" r="3" fill="#18181B" />
          <path d="M154 98 Q160 103 166 98" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* GT Badge Tag floating at top-right */}
        <g transform="translate(210, 36)">
          <rect x="0" y="0" width="76" height="28" rx="14" fill="#121212" />
          <text x="14" y="19" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="monospace">
            {id.toUpperCase()}
          </text>
          <circle cx="62" cy="14" r="4" fill={meta.color} />
        </g>
      </svg>
    </div>
  );
};
