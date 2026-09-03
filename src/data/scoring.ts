import { GAFA_QUESTIONS } from './questions';
import { GAFA_TYPE_MAP, GafaMbtiCode, DimensionKey, DimensionSpectrum } from './types';

export interface DimensionScores {
  ieScore: number;
  nsScore: number;
  tfScore: number;
  jpScore: number;
}

export interface DimensionPercentages {
  ie: DimensionSpectrum;
  ns: DimensionSpectrum;
  tf: DimensionSpectrum;
  jp: DimensionSpectrum;
}

export interface ScoringResult {
  code: GafaMbtiCode;
  id: string; // 'GT-01' ~ 'GT-16'
  name: string; // '精准构建型'
  englishName: string; // 'PRECISION BUILDER'
  scores: DimensionScores;
  percentages: DimensionPercentages;
  tiedDimensions: DimensionKey[];
}

export const MAX_DIMENSION_SCORES = {
  ie: 16,
  ns: 16,
  tf: 12,
  jp: 12,
} as const;

/**
 * 核心固定计分算法 (严格依据 Prompt 规范)
 * 
 * 1. centeredScore = answer - 3 (1=-2, 2=-1, 3=0, 4=+1, 5=+2)
 * 2. directionValue: I / N / T / J = +1; E / S / F / P = -1
 * 3. questionScore = (answer - 3) * directionValue * weight
 * 4. 累加 IE, NS, TF, JP
 * 5. 判断最终字母 (若为0，则参考 tieBreaks)
 */
export function calculateScores(
  answers: Record<number, number>,
  tieBreaks?: Partial<Record<DimensionKey, 'I' | 'E' | 'N' | 'S' | 'T' | 'F' | 'J' | 'P'>>
): ScoringResult {
  let ieScore = 0;
  let nsScore = 0;
  let tfScore = 0;
  let jpScore = 0;

  GAFA_QUESTIONS.forEach((q) => {
    const rawAnswer = answers[q.id] ?? 3; // 默认中立 3
    const centeredScore = rawAnswer - 3;
    const directionValue = q.directionSign; // +1 for I/N/T/J; -1 for E/S/F/P
    const questionScore = centeredScore * directionValue * q.weight;

    if (q.dimension === 'ie') ieScore += questionScore;
    if (q.dimension === 'ns') nsScore += questionScore;
    if (q.dimension === 'tf') tfScore += questionScore;
    if (q.dimension === 'jp') jpScore += questionScore;
  });

  // 检测完全对等的维度 (score === 0)
  const tiedDimensions: DimensionKey[] = [];
  if (ieScore === 0) tiedDimensions.push('ie');
  if (nsScore === 0) tiedDimensions.push('ns');
  if (tfScore === 0) tiedDimensions.push('tf');
  if (jpScore === 0) tiedDimensions.push('jp');

  // 判断四字母
  const letterIorE =
    ieScore > 0
      ? 'I'
      : ieScore < 0
      ? 'E'
      : (tieBreaks?.ie === 'E' ? 'E' : 'I');

  const letterNorS =
    nsScore > 0
      ? 'N'
      : nsScore < 0
      ? 'S'
      : (tieBreaks?.ns === 'S' ? 'S' : 'N');

  const letterTorF =
    tfScore > 0
      ? 'T'
      : tfScore < 0
      ? 'F'
      : (tieBreaks?.tf === 'F' ? 'F' : 'T');

  const letterJorP =
    jpScore > 0
      ? 'J'
      : jpScore < 0
      ? 'P'
      : (tieBreaks?.jp === 'P' ? 'P' : 'J');

  const code = `${letterIorE}${letterNorS}${letterTorF}${letterJorP}` as GafaMbtiCode;
  const meta = GAFA_TYPE_MAP[code];

  // 四维百分比计算 (Math.round(50 + (rawScore / maxScore) * 50))
  // 确保范围在 10% ~ 90% 保持视觉排版平衡，若满分则可达到 98% ~ 2%
  const calcPct = (raw: number, max: number) => {
    const rawPct = 50 + (raw / max) * 50;
    const rounded = Math.round(rawPct);
    return Math.min(96, Math.max(4, rounded));
  };

  const ieLeft = calcPct(ieScore, MAX_DIMENSION_SCORES.ie);
  const nsLeft = calcPct(nsScore, MAX_DIMENSION_SCORES.ns);
  const tfLeft = calcPct(tfScore, MAX_DIMENSION_SCORES.tf);
  const jpLeft = calcPct(jpScore, MAX_DIMENSION_SCORES.jp);

  const percentages: DimensionPercentages = {
    ie: {
      leftLabel: '向内沉浸',
      rightLabel: '向外共振',
      leftScore: ieLeft,
      rightScore: 100 - ieLeft,
    },
    ns: {
      leftLabel: '概念构想',
      rightLabel: '实感观察',
      leftScore: nsLeft,
      rightScore: 100 - nsLeft,
    },
    tf: {
      leftLabel: '结构推演',
      rightLabel: '感性表达',
      leftScore: tfLeft,
      rightScore: 100 - tfLeft,
    },
    jp: {
      leftLabel: '计划构建',
      rightLabel: '即兴探索',
      leftScore: jpLeft,
      rightScore: 100 - jpLeft,
    },
  };

  return {
    code,
    id: meta.id,
    name: meta.name,
    englishName: meta.englishName,
    scores: { ieScore, nsScore, tfScore, jpScore },
    percentages,
    tiedDimensions,
  };
}

/**
 * 计分算法自测试套件 (必须满足规范第十七条)
 */
export function runScoringTests(): { success: boolean; logs: string[] } {
  const logs: string[] = [];

  // 测试1: 明显倾向 I + N + T + J
  const intjAnswers: Record<number, number> = {};
  GAFA_QUESTIONS.forEach((q) => {
    if (['I', 'N', 'T', 'J'].includes(q.direction)) {
      intjAnswers[q.id] = 5; // 非常像我
    } else {
      intjAnswers[q.id] = 1; // 非常不像我
    }
  });
  const resINTJ = calculateScores(intjAnswers);
  if (resINTJ.code === 'INTJ' && resINTJ.name === '精准构建型' && resINTJ.id === 'GT-01') {
    logs.push('✓ Test INTJ passed: INTJ -> GT-01 精准构建型');
  } else {
    logs.push(`✗ Test INTJ failed: expected INTJ / 精准构建型, got ${resINTJ.code} / ${resINTJ.name}`);
    return { success: false, logs };
  }

  // 测试2: 明显倾向 E + N + F + P
  const enfpAnswers: Record<number, number> = {};
  GAFA_QUESTIONS.forEach((q) => {
    if (['E', 'N', 'F', 'P'].includes(q.direction)) {
      enfpAnswers[q.id] = 5;
    } else {
      enfpAnswers[q.id] = 1;
    }
  });
  const resENFP = calculateScores(enfpAnswers);
  if (resENFP.code === 'ENFP' && resENFP.name === '灵感迸发型' && resENFP.id === 'GT-08') {
    logs.push('✓ Test ENFP passed: ENFP -> GT-08 灵感迸发型');
  } else {
    logs.push(`✗ Test ENFP failed: expected ENFP / 灵感迸发型, got ${resENFP.code} / ${resENFP.name}`);
    return { success: false, logs };
  }

  // 测试3: 明显倾向 I + S + F + P
  const isfpAnswers: Record<number, number> = {};
  GAFA_QUESTIONS.forEach((q) => {
    if (['I', 'S', 'F', 'P'].includes(q.direction)) {
      isfpAnswers[q.id] = 5;
    } else {
      isfpAnswers[q.id] = 1;
    }
  });
  const resISFP = calculateScores(isfpAnswers);
  if (resISFP.code === 'ISFP' && resISFP.name === '细腻感知型' && resISFP.id === 'GT-14') {
    logs.push('✓ Test ISFP passed: ISFP -> GT-14 细腻感知型');
  } else {
    logs.push(`✗ Test ISFP failed: expected ISFP / 细腻感知型, got ${resISFP.code} / ${resISFP.name}`);
    return { success: false, logs };
  }

  return { success: true, logs };
}
