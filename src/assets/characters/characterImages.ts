/**
 * GAFA-TI Character Images Registry
 * 广州美术学院 16 种创作状态正式原创人物立绘静态统一管理模块
 * 
 * 严格绑定 16 种人格代码、立绘文件与人格名称
 */
import { GAFA_TYPE_MAP, GafaMbtiCode } from '../../data/types';

// 静态导入 16 张正式立绘图片 (src/assets/characters/gafa-*.PNG)
import gafaIntj from './gafa-intj.PNG';
import gafaIntp from './gafa-intp.PNG';
import gafaEntj from './gafa-entj.PNG';
import gafaEntp from './gafa-entp.PNG';

import gafaInfj from './gafa-infj.PNG';
import gafaInfp from './gafa-infp.PNG';
import gafaEnfj from './gafa-enfj.PNG';
import gafaEnfp from './gafa-enfp.PNG';

import gafaIsfj from './gafa-isfj.PNG';
import gafaIstj from './gafa-istj.PNG';
import gafaEstj from './gafa-estj.PNG';
import gafaEsfj from './gafa-esfj.PNG';

import gafaIstp from './gafa-istp.PNG';
import gafaIsfp from './gafa-isfp.PNG';
import gafaEstp from './gafa-estp.PNG';
import gafaEsfp from './gafa-esfp.PNG';

export interface CharacterImageRecord {
  id: string; // 'gt-01' ~ 'gt-16'
  code: GafaMbtiCode;
  name: string;
  englishName: string;
  fileName: string;
  src: string; // 本地静态图片路径
  altText: string;
}

// 严格绑定的 16 种人格立绘静态映射表
export const CHARACTER_IMAGES: Record<string, CharacterImageRecord> = {
  'gt-01': {
    id: 'gt-01',
    code: 'INTJ',
    name: GAFA_TYPE_MAP.INTJ.name,
    englishName: GAFA_TYPE_MAP.INTJ.englishName,
    fileName: 'gafa-intj.PNG',
    src: gafaIntj,
    altText: `GT-01 ${GAFA_TYPE_MAP.INTJ.name} (${GAFA_TYPE_MAP.INTJ.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-02': {
    id: 'gt-02',
    code: 'INTP',
    name: GAFA_TYPE_MAP.INTP.name,
    englishName: GAFA_TYPE_MAP.INTP.englishName,
    fileName: 'gafa-intp.PNG',
    src: gafaIntp,
    altText: `GT-02 ${GAFA_TYPE_MAP.INTP.name} (${GAFA_TYPE_MAP.INTP.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-03': {
    id: 'gt-03',
    code: 'ENTJ',
    name: GAFA_TYPE_MAP.ENTJ.name,
    englishName: GAFA_TYPE_MAP.ENTJ.englishName,
    fileName: 'gafa-entj.PNG',
    src: gafaEntj,
    altText: `GT-03 ${GAFA_TYPE_MAP.ENTJ.name} (${GAFA_TYPE_MAP.ENTJ.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-04': {
    id: 'gt-04',
    code: 'ENTP',
    name: GAFA_TYPE_MAP.ENTP.name,
    englishName: GAFA_TYPE_MAP.ENTP.englishName,
    fileName: 'gafa-entp.PNG',
    src: gafaEntp,
    altText: `GT-04 ${GAFA_TYPE_MAP.ENTP.name} (${GAFA_TYPE_MAP.ENTP.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-05': {
    id: 'gt-05',
    code: 'INFJ',
    name: GAFA_TYPE_MAP.INFJ.name,
    englishName: GAFA_TYPE_MAP.INFJ.englishName,
    fileName: 'gafa-infj.PNG',
    src: gafaInfj,
    altText: `GT-05 ${GAFA_TYPE_MAP.INFJ.name} (${GAFA_TYPE_MAP.INFJ.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-06': {
    id: 'gt-06',
    code: 'INFP',
    name: GAFA_TYPE_MAP.INFP.name,
    englishName: GAFA_TYPE_MAP.INFP.englishName,
    fileName: 'gafa-infp.PNG',
    src: gafaInfp,
    altText: `GT-06 ${GAFA_TYPE_MAP.INFP.name} (${GAFA_TYPE_MAP.INFP.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-07': {
    id: 'gt-07',
    code: 'ENFJ',
    name: GAFA_TYPE_MAP.ENFJ.name,
    englishName: GAFA_TYPE_MAP.ENFJ.englishName,
    fileName: 'gafa-enfj.PNG',
    src: gafaEnfj,
    altText: `GT-07 ${GAFA_TYPE_MAP.ENFJ.name} (${GAFA_TYPE_MAP.ENFJ.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-08': {
    id: 'gt-08',
    code: 'ENFP',
    name: GAFA_TYPE_MAP.ENFP.name,
    englishName: GAFA_TYPE_MAP.ENFP.englishName,
    fileName: 'gafa-enfp.PNG',
    src: gafaEnfp,
    altText: `GT-08 ${GAFA_TYPE_MAP.ENFP.name} (${GAFA_TYPE_MAP.ENFP.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-09': {
    id: 'gt-09',
    code: 'ISFJ',
    name: GAFA_TYPE_MAP.ISFJ.name,
    englishName: GAFA_TYPE_MAP.ISFJ.englishName,
    fileName: 'gafa-isfj.PNG',
    src: gafaIsfj,
    altText: `GT-09 ${GAFA_TYPE_MAP.ISFJ.name} (${GAFA_TYPE_MAP.ISFJ.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-10': {
    id: 'gt-10',
    code: 'ISTJ',
    name: GAFA_TYPE_MAP.ISTJ.name,
    englishName: GAFA_TYPE_MAP.ISTJ.englishName,
    fileName: 'gafa-istj.PNG',
    src: gafaIstj,
    altText: `GT-10 ${GAFA_TYPE_MAP.ISTJ.name} (${GAFA_TYPE_MAP.ISTJ.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-11': {
    id: 'gt-11',
    code: 'ESTJ',
    name: GAFA_TYPE_MAP.ESTJ.name,
    englishName: GAFA_TYPE_MAP.ESTJ.englishName,
    fileName: 'gafa-estj.PNG',
    src: gafaEstj,
    altText: `GT-11 ${GAFA_TYPE_MAP.ESTJ.name} (${GAFA_TYPE_MAP.ESTJ.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-12': {
    id: 'gt-12',
    code: 'ESFJ',
    name: GAFA_TYPE_MAP.ESFJ.name,
    englishName: GAFA_TYPE_MAP.ESFJ.englishName,
    fileName: 'gafa-esfj.PNG',
    src: gafaEsfj,
    altText: `GT-12 ${GAFA_TYPE_MAP.ESFJ.name} (${GAFA_TYPE_MAP.ESFJ.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-13': {
    id: 'gt-13',
    code: 'ISTP',
    name: GAFA_TYPE_MAP.ISTP.name,
    englishName: GAFA_TYPE_MAP.ISTP.englishName,
    fileName: 'gafa-istp.PNG',
    src: gafaIstp,
    altText: `GT-13 ${GAFA_TYPE_MAP.ISTP.name} (${GAFA_TYPE_MAP.ISTP.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-14': {
    id: 'gt-14',
    code: 'ISFP',
    name: GAFA_TYPE_MAP.ISFP.name,
    englishName: GAFA_TYPE_MAP.ISFP.englishName,
    fileName: 'gafa-isfp.PNG',
    src: gafaIsfp,
    altText: `GT-14 ${GAFA_TYPE_MAP.ISFP.name} (${GAFA_TYPE_MAP.ISFP.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-15': {
    id: 'gt-15',
    code: 'ESTP',
    name: GAFA_TYPE_MAP.ESTP.name,
    englishName: GAFA_TYPE_MAP.ESTP.englishName,
    fileName: 'gafa-estp.PNG',
    src: gafaEstp,
    altText: `GT-15 ${GAFA_TYPE_MAP.ESTP.name} (${GAFA_TYPE_MAP.ESTP.englishName}) - 广州美术学院原创人物立绘`,
  },
  'gt-16': {
    id: 'gt-16',
    code: 'ESFP',
    name: GAFA_TYPE_MAP.ESFP.name,
    englishName: GAFA_TYPE_MAP.ESFP.englishName,
    fileName: 'gafa-esfp.PNG',
    src: gafaEsfp,
    altText: `GT-16 ${GAFA_TYPE_MAP.ESFP.name} (${GAFA_TYPE_MAP.ESFP.englishName}) - 广州美术学院原创人物立绘`,
  },
};

// MBTI 代码反向索引映射
const MBTI_TO_ID: Record<string, string> = {
  INTJ: 'gt-01',
  INTP: 'gt-02',
  ENTJ: 'gt-03',
  ENTP: 'gt-04',
  INFJ: 'gt-05',
  INFP: 'gt-06',
  ENFJ: 'gt-07',
  ENFP: 'gt-08',
  ISFJ: 'gt-09',
  ISTJ: 'gt-10',
  ESTJ: 'gt-11',
  ESFJ: 'gt-12',
  ISTP: 'gt-13',
  ISFP: 'gt-14',
  ESTP: 'gt-15',
  ESFP: 'gt-16',
};

/**
 * 统一获取角色立绘信息，支持按 'GT-01' / 'gt-01' 或 'INTJ' / 'intj' 查询
 */
export function getCharacterImage(idOrCode: string): CharacterImageRecord | null {
  if (!idOrCode) return null;
  const key = idOrCode.toLowerCase().trim();
  if (CHARACTER_IMAGES[key]) {
    return CHARACTER_IMAGES[key];
  }
  const upperKey = idOrCode.toUpperCase().trim();
  const idFromMbti = MBTI_TO_ID[upperKey];
  if (idFromMbti && CHARACTER_IMAGES[idFromMbti]) {
    return CHARACTER_IMAGES[idFromMbti];
  }
  return null;
}
