/**
 * GAFA-TI (GAFA Creative Type Indicator) 唯一官方人格数据模型与类型定义
 * 
 * 广州美术学院迎新活动 - 16种原生艺术创作状态
 * 严禁私自修改、推断或新增未定义人格名称。
 */

export const GAFA_TYPE_MAP = {
  INTJ: {
    id: "GT-01",
    name: "精准构建型",
    englishName: "PRECISION BUILDER"
  },
  INTP: {
    id: "GT-02",
    name: "理性推演型",
    englishName: "LOGICAL EXPLORER"
  },
  ENTJ: {
    id: "GT-03",
    name: "全局掌控型",
    englishName: "SYSTEM DIRECTOR"
  },
  ENTP: {
    id: "GT-04",
    name: "创意破局型",
    englishName: "CREATIVE DISRUPTOR"
  },
  INFJ: {
    id: "GT-05",
    name: "沉浸创想型",
    englishName: "IMMERSIVE VISIONARY"
  },
  INFP: {
    id: "GT-06",
    name: "感性表达型",
    englishName: "EMOTIVE CREATOR"
  },
  ENFJ: {
    id: "GT-07",
    name: "共创引领型",
    englishName: "COLLABORATIVE LEADER"
  },
  ENFP: {
    id: "GT-08",
    name: "灵感迸发型",
    englishName: "IDEA SPARKER"
  },
  ISFJ: {
    id: "GT-09",
    name: "专注描绘型",
    englishName: "FOCUSED OBSERVER"
  },
  ISTJ: {
    id: "GT-10",
    name: "规范执行型",
    englishName: "STRUCTURED MAKER"
  },
  ESTJ: {
    id: "GT-11",
    name: "统筹落实型",
    englishName: "PROJECT ORGANIZER"
  },
  ESFJ: {
    id: "GT-12",
    name: "协同沟通型",
    englishName: "COLLABORATIVE CONNECTOR"
  },
  ISTP: {
    id: "GT-13",
    name: "动手验证型",
    englishName: "HANDS-ON TESTER"
  },
  ISFP: {
    id: "GT-14",
    name: "细腻感知型",
    englishName: "SENSITIVE OBSERVER"
  },
  ESTP: {
    id: "GT-15",
    name: "即兴实作型",
    englishName: "SPONTANEOUS MAKER"
  },
  ESFP: {
    id: "GT-16",
    name: "鲜活表现型",
    englishName: "VIVID PERFORMER"
  }
} as const;

export type GafaMbtiCode = keyof typeof GAFA_TYPE_MAP;

export const ALLOWED_GAFA_NAMES = [
  "精准构建型",
  "理性推演型",
  "全局掌控型",
  "创意破局型",
  "沉浸创想型",
  "感性表达型",
  "共创引领型",
  "灵感迸发型",
  "专注描绘型",
  "规范执行型",
  "统筹落实型",
  "协同沟通型",
  "动手验证型",
  "细腻感知型",
  "即兴实作型",
  "鲜活表现型"
] as const;

export type AllowedGafaName = (typeof ALLOWED_GAFA_NAMES)[number];

export type DimensionKey = 'ie' | 'ns' | 'tf' | 'jp';

export interface DimensionSpectrum {
  leftLabel: string;
  rightLabel: string;
  leftScore: number; // 0 - 100 percentage
  rightScore: number; // 0 - 100 percentage
}

/**
 * 完整 GAFA-TI 人格创作画像数据结构 (符合第二阶段规范)
 */
export interface GafaCreativeType {
  code: GafaMbtiCode;
  mbtiCode?: GafaMbtiCode; // 兼容性别名
  id: string; // 'GT-01' ~ 'GT-16'
  name: AllowedGafaName;
  englishName: string;

  slogan: string;
  keywords: string[];

  dimensions: {
    energy: string; // e.g. "向内沉浸 78% · 22% 向外共振"
    perception: string; // e.g. "概念构想 84% · 16% 实感观察"
    judgement: string; // e.g. "结构推演 82% · 18% 感性表达"
    process: string; // e.g. "计划构建 74% · 26% 即兴探索"
    ie?: DimensionSpectrum;
    ns?: DimensionSpectrum;
    tf?: DimensionSpectrum;
    jp?: DimensionSpectrum;
  };

  /** 约350–500字正式艺术创作行为深度解读 */
  fullAnalysis: string;

  /** 创作优势 (3-4项) */
  strengths: string[];

  /** 容易卡住的地方 (2-3项) */
  challenges: string[];

  /** 灵感启动方式 */
  inspirationMode: string;

  /** Deadline 下的你 */
  deadlineMode: string;

  /** 小组作业里的你 */
  teamworkMode: string;

  /** 创作建议 */
  creativeAdvice: string;

  // ===== 以下字段保持与既有组件和视觉渲染兼容 =====
  number: string; // alias to id, e.g. 'GT-01'
  title: string; // alias to name
  enTitle: string; // alias to englishName
  category: string; // e.g. '概念架构系' | '实操材料系' | '感知表现系' | '现场统筹系'
  tagline: string; // alias to slogan
  color: {
    accent: string;
    soft: string;
    border: string;
    text: string;
  };
  spectrum: {
    ie: DimensionSpectrum;
    ns: DimensionSpectrum;
    tf: DimensionSpectrum;
    jp: DimensionSpectrum;
  };
  sections: {
    status01: string; // 01 你的创作状态
    advantage02: string; // 02 你的创作优势
    block03: string; // 03 容易卡住的地方
    spark04: string; // 04 你的灵感启动方式
    deadline05: string; // 05 Deadline 下的你
    teamwork06: string; // 06 小组作业里的你
    keywords07: string[]; // 07 你的创作关键词
  };
}

/** 兼容旧代码的类型别名 */
export type CreativeType = GafaCreativeType;

export interface Question {
  id: number;
  dimension: DimensionKey;
  direction: 'I' | 'E' | 'N' | 'S' | 'T' | 'F' | 'J' | 'P';
  directionSign: 1 | -1; // +1 for I/N/T/J; -1 for E/S/F/P
  weight: number; // 1 或 0.75
  scene: string;
  text: string;
  subtext?: string;
}

export interface AnswerChoice {
  value: 1 | 2 | 3 | 4 | 5;
  label: string;
  secondary: string;
}
