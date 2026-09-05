import { GAFA_TYPES } from '../data/characters';
import { GafaMbtiCode, CreativeType, DimensionSpectrum } from '../types';

const STORAGE_KEY = 'gafa_ti_saved_result';

export interface SerializedResultData {
  code: GafaMbtiCode;
  scores: {
    ie: number;
    ns: number;
    tf: number;
    jp: number;
  };
  timestamp: number;
}

/**
 * 根据 MBTI 代码与四维得分动态重建完整的 CreativeType 结果对象
 */
export function reconstructCreativeType(
  code: string | null | undefined,
  scores?: { ie?: number; ns?: number; tf?: number; jp?: number }
): CreativeType | null {
  if (!code) return null;
  const upperCode = code.trim().toUpperCase() as GafaMbtiCode;
  const baseType = GAFA_TYPES[upperCode];
  if (!baseType) return null;

  // 获取各维度左侧得分 (4% ~ 96%)
  const ieLeft = typeof scores?.ie === 'number' && !isNaN(scores.ie)
    ? Math.min(96, Math.max(4, Math.round(scores.ie)))
    : (baseType.dimensions.ie?.leftScore ?? 50);

  const nsLeft = typeof scores?.ns === 'number' && !isNaN(scores.ns)
    ? Math.min(96, Math.max(4, Math.round(scores.ns)))
    : (baseType.dimensions.ns?.leftScore ?? 50);

  const tfLeft = typeof scores?.tf === 'number' && !isNaN(scores.tf)
    ? Math.min(96, Math.max(4, Math.round(scores.tf)))
    : (baseType.dimensions.tf?.leftScore ?? 50);

  const jpLeft = typeof scores?.jp === 'number' && !isNaN(scores.jp)
    ? Math.min(96, Math.max(4, Math.round(scores.jp)))
    : (baseType.dimensions.jp?.leftScore ?? 50);

  const ieSpec: DimensionSpectrum = {
    leftLabel: '向内沉浸',
    rightLabel: '向外共振',
    leftScore: ieLeft,
    rightScore: 100 - ieLeft,
  };

  const nsSpec: DimensionSpectrum = {
    leftLabel: '概念构想',
    rightLabel: '实感观察',
    leftScore: nsLeft,
    rightScore: 100 - nsLeft,
  };

  const tfSpec: DimensionSpectrum = {
    leftLabel: '结构推演',
    rightLabel: '感性表达',
    leftScore: tfLeft,
    rightScore: 100 - tfLeft,
  };

  const jpSpec: DimensionSpectrum = {
    leftLabel: '计划构建',
    rightLabel: '即兴探索',
    leftScore: jpLeft,
    rightScore: 100 - jpLeft,
  };

  return {
    ...baseType,
    dimensions: {
      ...baseType.dimensions,
      energy: `${ieSpec.leftLabel} ${ieSpec.leftScore}% · ${ieSpec.rightScore}% ${ieSpec.rightLabel}`,
      perception: `${nsSpec.leftLabel} ${nsSpec.leftScore}% · ${nsSpec.rightScore}% ${nsSpec.rightLabel}`,
      judgement: `${tfSpec.leftLabel} ${tfSpec.leftScore}% · ${tfSpec.rightScore}% ${tfSpec.rightLabel}`,
      process: `${jpSpec.leftLabel} ${jpSpec.leftScore}% · ${jpSpec.rightScore}% ${jpSpec.rightLabel}`,
      ie: ieSpec,
      ns: nsSpec,
      tf: tfSpec,
      jp: jpSpec,
    },
    spectrum: {
      ie: ieSpec,
      ns: nsSpec,
      tf: tfSpec,
      jp: jpSpec,
    },
  };
}

/**
 * 将测试结果保存到 localStorage
 */
export function saveResultToStorage(type: CreativeType): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const data: SerializedResultData = {
      code: type.mbtiCode as GafaMbtiCode,
      scores: {
        ie: type.dimensions.ie?.leftScore ?? 50,
        ns: type.dimensions.ns?.leftScore ?? 50,
        tf: type.dimensions.tf?.leftScore ?? 50,
        jp: type.dimensions.jp?.leftScore ?? 50,
      },
      timestamp: Date.now(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('[GAFA-TI] Failed to save result to localStorage:', e);
  }
}

/**
 * 从 localStorage 读取并恢复测试结果
 */
export function getSavedResultFromStorage(): CreativeType | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SerializedResultData;
    if (!parsed || !parsed.code) return null;
    return reconstructCreativeType(parsed.code, parsed.scores);
  } catch (e) {
    console.warn('[GAFA-TI] Failed to parse saved result from localStorage:', e);
    return null;
  }
}

/**
 * 清除已持久化的结果 (当用户主动点击“重新测试”时调用)
 */
export function clearSavedResult(): void {
  try {
    if (typeof window !== 'undefined') {
      if (window.localStorage) {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      // 清空 URL 中可能存在的 result hash 或 search 参数
      if (window.location.hash.includes('result=') || window.location.search.includes('result=')) {
        const cleanUrl = window.location.pathname;
        window.history.replaceState(null, '', cleanUrl);
      }
    }
  } catch (e) {
    console.warn('[GAFA-TI] Failed to clear result:', e);
  }
}

/**
 * 生成可分享 / 可恢复结果的完整 URL
 */
export function generateResultShareUrl(type: CreativeType): string {
  if (typeof window === 'undefined') return '';
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  const ie = type.dimensions.ie?.leftScore ?? 50;
  const ns = type.dimensions.ns?.leftScore ?? 50;
  const tf = type.dimensions.tf?.leftScore ?? 50;
  const jp = type.dimensions.jp?.leftScore ?? 50;

  // 使用 URL hash 模式确保在 GitHub Pages / 静态托管和各种浏览器环境无缝支持
  return `${origin}${pathname}#result=${type.mbtiCode}&ie=${ie}&ns=${ns}&tf=${tf}&jp=${jp}`;
}

/**
 * 从当前 URL (Hash 或 SearchParams) 解析并恢复测试结果
 */
export function getResultFromUrl(): CreativeType | null {
  if (typeof window === 'undefined') return null;

  try {
    // 1. 优先尝试解析 URL Hash (如 #result=INTJ&ie=78&ns=84&tf=82&jp=74)
    const hash = window.location.hash.replace(/^#/, '');
    if (hash) {
      const params = new URLSearchParams(hash);
      const code = params.get('result') || params.get('code') || params.get('type');
      if (code) {
        const ie = params.get('ie') ? Number(params.get('ie')) : undefined;
        const ns = params.get('ns') ? Number(params.get('ns')) : undefined;
        const tf = params.get('tf') ? Number(params.get('tf')) : undefined;
        const jp = params.get('jp') ? Number(params.get('jp')) : undefined;
        const reconstructed = reconstructCreativeType(code, { ie, ns, tf, jp });
        if (reconstructed) return reconstructed;
      }
    }

    // 2. 尝试解析 URL Search Params (如 ?result=INTJ&ie=78...)
    const search = window.location.search;
    if (search) {
      const params = new URLSearchParams(search);
      const code = params.get('result') || params.get('code') || params.get('type');
      if (code) {
        const ie = params.get('ie') ? Number(params.get('ie')) : undefined;
        const ns = params.get('ns') ? Number(params.get('ns')) : undefined;
        const tf = params.get('tf') ? Number(params.get('tf')) : undefined;
        const jp = params.get('jp') ? Number(params.get('jp')) : undefined;
        const reconstructed = reconstructCreativeType(code, { ie, ns, tf, jp });
        if (reconstructed) return reconstructed;
      }
    }
  } catch (e) {
    console.warn('[GAFA-TI] Failed to parse result from URL:', e);
  }

  return null;
}
