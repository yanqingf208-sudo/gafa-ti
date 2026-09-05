import React from 'react';
import { CreativeType } from '../types';
import { CharacterAvatar } from '../assets/characters/CharacterAvatar';

interface ExportLongPosterProps {
  type: CreativeType;
  id?: string;
}

/**
 * 导出专用长图组件 (1080px 宽度高精度竖向长图排版)
 * 外层背景为网站浅灰底色 (#ECECED)，卡片内部均为纯白底色 (#FFFFFF)
 * 宣言文字与人物立绘均不套独立框，直接自然融合于白底主卡中
 */
export const ExportLongPoster: React.FC<ExportLongPosterProps> = ({
  type,
  id = 'export-long-poster-dom',
}) => {
  return (
    <div
      id={id}
      style={{
        width: '1080px',
        backgroundColor: '#ECECED',
        color: '#121212',
      }}
      className="p-16 flex flex-col justify-start select-none font-sans text-left"
    >
      {/* 顶部 Header：GAFA-TI 归档标识 */}
      <div className="flex items-center justify-between pb-6 border-b-2 border-zinc-300 mb-9">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#D4FF00] text-black flex items-center justify-center font-black text-lg shadow-xs">
            G
          </div>
          <span className="font-black text-2xl tracking-tight text-black">GAFA-TI ARCHIVE</span>
          <span className="text-zinc-400 font-mono text-lg">/</span>
          <span className="text-zinc-600 font-mono text-lg font-bold">FILE NO. {type.number}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00]"></span>
          <span className="font-mono text-sm tracking-widest text-zinc-600 uppercase font-bold">
            CAMPUS ORIENTATION 2026
          </span>
        </div>
      </div>

      {/* 第一部分：Hero 核心结果卡片 (纯白背景底色，统一圆角，与外层浅灰背景形成分明层级) */}
      <div className="bg-white rounded-[32px] p-10 border border-zinc-200/90 mb-9 shadow-sm">
        {/* 编号与右上角系别分类标签 (底色统一为 #D4FF00 荧光绿) */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3.5">
            <span className="text-4xl font-mono font-black text-black tracking-tight">
              {type.number}
            </span>
            <span className="text-base font-mono px-3.5 py-1 rounded-full bg-zinc-100 text-zinc-800 font-bold border border-zinc-200">
              {type.mbtiCode}
            </span>
          </div>
          {/* 右上角分类标签：统一使用 #D4FF00 荧光绿底色与黑色粗体 */}
          <span className="text-sm font-mono tracking-wider px-4 py-1.5 rounded-full bg-[#D4FF00] text-black uppercase font-bold shadow-xs">
            {type.category}
          </span>
        </div>

        {/* 标题、宣言与立绘 (宣言与立绘均去除外框，直接自然融合于白底主卡) */}
        <div className="grid grid-cols-12 gap-8 items-center mb-8">
          {/* 左侧文字与关键词区域 (60% 宽度，直接排版，无多余嵌套框) */}
          <div className="col-span-7 flex flex-col justify-center">
            <h1 className="text-5xl sm:text-[54px] font-black tracking-tight text-black leading-[1.15] mb-2">
              {type.title}
            </h1>
            <p className="text-base font-mono tracking-widest text-zinc-400 uppercase mb-5 font-bold">
              {type.enTitle}
            </p>

            {/* 签名宣言 Tagline：直接排版，不套独立外框 */}
            <p className="text-xl font-medium text-zinc-800 leading-[1.65] italic mb-6 break-words">
              “{type.tagline}”
            </p>

            {/* 5 个核心关键词胶囊 */}
            <div className="flex flex-wrap gap-2">
              {type.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-sm font-bold px-3.5 py-1.5 rounded-full bg-[#121212] text-white tracking-wide shadow-2xs"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* 右侧人物立绘 (去除外框，直接与白底主卡融合，微调放大) */}
          <div className="col-span-5 flex items-center justify-center h-[360px] p-2">
            <CharacterAvatar id={type.id} size="hero" className="w-full h-full" />
          </div>
        </div>

        {/* 00 / 四维创作光谱 */}
        <div className="pt-7 border-t border-zinc-200">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest">
              00 / CREATIVE DIMENSION SPECTRUM · 四维创作光谱
            </h3>
            <span className="text-xs font-mono text-zinc-400 font-medium">GAFA-TI MATRIX</span>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            {/* IE */}
            <div>
              <div className="flex justify-between items-baseline text-sm font-medium mb-1.5 font-mono">
                <span className="font-bold text-black">{type.dimensions.ie?.leftLabel || '向内沉浸'} {type.dimensions.ie?.leftScore}%</span>
                <span className="text-zinc-500">{type.dimensions.ie?.rightScore}% {type.dimensions.ie?.rightLabel || '向外共振'}</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${type.dimensions.ie?.leftScore}%` }}
                />
              </div>
            </div>

            {/* NS */}
            <div>
              <div className="flex justify-between items-baseline text-sm font-medium mb-1.5 font-mono">
                <span className="font-bold text-black">{type.dimensions.ns?.leftLabel || '概念构想'} {type.dimensions.ns?.leftScore}%</span>
                <span className="text-zinc-500">{type.dimensions.ns?.rightScore}% {type.dimensions.ns?.rightLabel || '实感观察'}</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${type.dimensions.ns?.leftScore}%` }}
                />
              </div>
            </div>

            {/* TF */}
            <div>
              <div className="flex justify-between items-baseline text-sm font-medium mb-1.5 font-mono">
                <span className="font-bold text-black">{type.dimensions.tf?.leftLabel || '结构推演'} {type.dimensions.tf?.leftScore}%</span>
                <span className="text-zinc-500">{type.dimensions.tf?.rightScore}% {type.dimensions.tf?.rightLabel || '感性表达'}</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${type.dimensions.tf?.leftScore}%` }}
                />
              </div>
            </div>

            {/* JP */}
            <div>
              <div className="flex justify-between items-baseline text-sm font-medium mb-1.5 font-mono">
                <span className="font-bold text-black">{type.dimensions.jp?.leftLabel || '计划构建'} {type.dimensions.jp?.leftScore}%</span>
                <span className="text-zinc-500">{type.dimensions.jp?.rightScore}% {type.dimensions.jp?.rightLabel || '即兴探索'}</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${type.dimensions.jp?.leftScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 第二部分：深度创作画像档案 6 大模块 (纯白卡片，统一圆角与边距) */}
      <div className="mb-9">
        <div className="flex items-center justify-between mb-7 pb-3.5 border-b-2 border-zinc-300">
          <div>
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
              DEEP ARCHIVE DOSSIER
            </span>
            <h2 className="text-3xl font-black text-black tracking-tight">
              深度创作画像档案
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500 font-medium">
            6 EDITORIAL RESEARCH MODULES
          </span>
        </div>

        {/* 01 你的艺术创作深度画像 (纯白底色卡片) */}
        <div className="bg-white rounded-[24px] p-8 border border-zinc-200/90 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest">
                01 / CREATIVE STATE DOSSIER · 深度行为全貌解读
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-400">行为全貌画像</span>
          </div>
          <h4 className="text-2xl font-black text-black tracking-tight mb-4">
            你的艺术创作深度画像
          </h4>
          <p className="text-[17.5px] text-zinc-800 leading-[1.85] font-normal text-justify tracking-normal">
            {type.fullAnalysis || type.sections.status01}
          </p>
        </div>

        {/* 02 创作优势 & 03 容易卡住的地方 (纯白底色卡片，2 列等高) */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* 02 你的创作优势 */}
          <div className="bg-white rounded-[24px] p-7 border border-zinc-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-zinc-400 block mb-1.5">02 / ADVANTAGES</span>
              <h4 className="text-xl font-black text-black mb-3.5">你的创作优势</h4>
              {type.strengths && type.strengths.length > 0 ? (
                <ul className="space-y-2.5 text-[15.5px] text-zinc-700 leading-relaxed">
                  {type.strengths.map((st, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-black mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{st}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[15.5px] text-zinc-700 leading-relaxed">{type.sections.advantage02}</p>
              )}
            </div>
          </div>

          {/* 03 容易卡住的地方 */}
          <div className="bg-white rounded-[24px] p-7 border border-zinc-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-zinc-400 block mb-1.5">03 / BLOCKS</span>
              <h4 className="text-xl font-black text-black mb-3.5">容易卡住的地方</h4>
              {type.challenges && type.challenges.length > 0 ? (
                <ul className="space-y-2.5 text-[15.5px] text-zinc-700 leading-relaxed">
                  {type.challenges.map((ch, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{ch}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[15.5px] text-zinc-700 leading-relaxed">{type.sections.block03}</p>
              )}
            </div>
          </div>
        </div>

        {/* 04 灵感启动方式 & 05 Deadline 下的你 (纯白底色卡片，2 列等高) */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* 04 你的灵感启动方式 */}
          <div className="bg-white rounded-[24px] p-7 border border-zinc-200/90 shadow-sm">
            <span className="font-mono text-xs font-bold text-zinc-400 block mb-1.5">04 / INSPIRATION SPARK</span>
            <h4 className="text-xl font-black text-black mb-3">你的灵感启动方式</h4>
            <p className="text-[15.5px] text-zinc-700 leading-relaxed">
              {type.inspirationMode || type.sections.spark04}
            </p>
          </div>

          {/* 05 Deadline 下的你 */}
          <div className="bg-white rounded-[24px] p-7 border border-zinc-200/90 shadow-sm">
            <span className="font-mono text-xs font-bold text-zinc-400 block mb-1.5">05 / DEADLINE BEHAVIOR</span>
            <h4 className="text-xl font-black text-black mb-3">Deadline 下的你</h4>
            <p className="text-[15.5px] text-zinc-700 leading-relaxed">
              {type.deadlineMode || type.sections.deadline05}
            </p>
          </div>
        </div>

        {/* 06 专属创作建议与关键词 (纯白底色卡片) */}
        <div className="bg-white rounded-[24px] p-7 sm:p-8 border border-zinc-200/90 shadow-sm">
          <div className="grid grid-cols-12 gap-6 items-center">
            <div className="col-span-7">
              <span className="font-mono text-xs font-bold text-zinc-400 block mb-1">06 / CREATIVE ADVICE & KEYWORDS</span>
              <h4 className="text-xl font-black text-black mb-2">给你的广美创作锦囊</h4>
              <p className="text-[15.5px] text-zinc-700 leading-relaxed">
                {type.creativeAdvice || '在保持独特创作敏锐度的同时，勇于跨出舒适圈，在材料、场域与观念的碰撞中发现新的可能。'}
              </p>
            </div>
            <div className="col-span-5 flex flex-wrap gap-2 justify-end">
              {type.keywords.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-sm font-mono px-3.5 py-1.5 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-300/80 font-bold shadow-2xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 底部 Stamp 与版权 */}
      <div className="pt-7 border-t-2 border-dashed border-zinc-400/80 flex items-center justify-between text-zinc-500 font-mono text-sm">
        <div>
          <div className="font-bold text-zinc-700">GUANGZHOU ACADEMY OF FINE ARTS</div>
          <div>MY GAFA CREATIVE ARCHIVE · 2026</div>
        </div>
        <div className="font-extrabold text-zinc-700 tracking-wider text-base">
          GAFA-TI · 2026
        </div>
      </div>
    </div>
  );
};
