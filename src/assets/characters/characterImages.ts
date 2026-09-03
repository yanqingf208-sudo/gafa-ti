/**
 * GAFA-TI Character Images Registry
 * 广州美术学院 16 种创作状态人物立绘静态统一管理模块
 * 
 * 当后续提供正式的 16 张 PNG 原创立绘时，
 * 只需放入 src/assets/characters/ 并在下方配置相应路径即可。
 */
import { GAFA_TYPE_MAP, GafaMbtiCode } from '../../data/types';

export interface CharacterImageRecord {
  id: string; // 'gt-01' ~ 'gt-16'
  code: GafaMbtiCode;
  name: string;
  englishName: string;
  src: string | null; // 本地静态图片路径 (存在时优先渲染)
  hasLocalImage: boolean;
  altText: string;
}

// 自动由官方唯一映射表生成，杜绝任何名称或代号漂移
export const CHARACTER_IMAGES: Record<string, CharacterImageRecord> = {
  'gt-01': {
    id: 'gt-01',
    code: 'INTJ',
    name: GAFA_TYPE_MAP.INTJ.name,
    englishName: GAFA_TYPE_MAP.INTJ.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-01 ${GAFA_TYPE_MAP.INTJ.name} ${GAFA_TYPE_MAP.INTJ.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-02': {
    id: 'gt-02',
    code: 'INTP',
    name: GAFA_TYPE_MAP.INTP.name,
    englishName: GAFA_TYPE_MAP.INTP.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-02 ${GAFA_TYPE_MAP.INTP.name} ${GAFA_TYPE_MAP.INTP.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-03': {
    id: 'gt-03',
    code: 'ENTJ',
    name: GAFA_TYPE_MAP.ENTJ.name,
    englishName: GAFA_TYPE_MAP.ENTJ.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-03 ${GAFA_TYPE_MAP.ENTJ.name} ${GAFA_TYPE_MAP.ENTJ.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-04': {
    id: 'gt-04',
    code: 'ENTP',
    name: GAFA_TYPE_MAP.ENTP.name,
    englishName: GAFA_TYPE_MAP.ENTP.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-04 ${GAFA_TYPE_MAP.ENTP.name} ${GAFA_TYPE_MAP.ENTP.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-05': {
    id: 'gt-05',
    code: 'INFJ',
    name: GAFA_TYPE_MAP.INFJ.name,
    englishName: GAFA_TYPE_MAP.INFJ.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-05 ${GAFA_TYPE_MAP.INFJ.name} ${GAFA_TYPE_MAP.INFJ.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-06': {
    id: 'gt-06',
    code: 'INFP',
    name: GAFA_TYPE_MAP.INFP.name,
    englishName: GAFA_TYPE_MAP.INFP.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-06 ${GAFA_TYPE_MAP.INFP.name} ${GAFA_TYPE_MAP.INFP.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-07': {
    id: 'gt-07',
    code: 'ENFJ',
    name: GAFA_TYPE_MAP.ENFJ.name,
    englishName: GAFA_TYPE_MAP.ENFJ.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-07 ${GAFA_TYPE_MAP.ENFJ.name} ${GAFA_TYPE_MAP.ENFJ.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-08': {
    id: 'gt-08',
    code: 'ENFP',
    name: GAFA_TYPE_MAP.ENFP.name,
    englishName: GAFA_TYPE_MAP.ENFP.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-08 ${GAFA_TYPE_MAP.ENFP.name} ${GAFA_TYPE_MAP.ENFP.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-09': {
    id: 'gt-09',
    code: 'ISFJ',
    name: GAFA_TYPE_MAP.ISFJ.name,
    englishName: GAFA_TYPE_MAP.ISFJ.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-09 ${GAFA_TYPE_MAP.ISFJ.name} ${GAFA_TYPE_MAP.ISFJ.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-10': {
    id: 'gt-10',
    code: 'ISTJ',
    name: GAFA_TYPE_MAP.ISTJ.name,
    englishName: GAFA_TYPE_MAP.ISTJ.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-10 ${GAFA_TYPE_MAP.ISTJ.name} ${GAFA_TYPE_MAP.ISTJ.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-11': {
    id: 'gt-11',
    code: 'ESTJ',
    name: GAFA_TYPE_MAP.ESTJ.name,
    englishName: GAFA_TYPE_MAP.ESTJ.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-11 ${GAFA_TYPE_MAP.ESTJ.name} ${GAFA_TYPE_MAP.ESTJ.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-12': {
    id: 'gt-12',
    code: 'ESFJ',
    name: GAFA_TYPE_MAP.ESFJ.name,
    englishName: GAFA_TYPE_MAP.ESFJ.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-12 ${GAFA_TYPE_MAP.ESFJ.name} ${GAFA_TYPE_MAP.ESFJ.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-13': {
    id: 'gt-13',
    code: 'ISTP',
    name: GAFA_TYPE_MAP.ISTP.name,
    englishName: GAFA_TYPE_MAP.ISTP.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-13 ${GAFA_TYPE_MAP.ISTP.name} ${GAFA_TYPE_MAP.ISTP.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-14': {
    id: 'gt-14',
    code: 'ISFP',
    name: GAFA_TYPE_MAP.ISFP.name,
    englishName: GAFA_TYPE_MAP.ISFP.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-14 ${GAFA_TYPE_MAP.ISFP.name} ${GAFA_TYPE_MAP.ISFP.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-15': {
    id: 'gt-15',
    code: 'ESTP',
    name: GAFA_TYPE_MAP.ESTP.name,
    englishName: GAFA_TYPE_MAP.ESTP.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-15 ${GAFA_TYPE_MAP.ESTP.name} ${GAFA_TYPE_MAP.ESTP.englishName} - 广州美术学院原创人物立绘`,
  },
  'gt-16': {
    id: 'gt-16',
    code: 'ESFP',
    name: GAFA_TYPE_MAP.ESFP.name,
    englishName: GAFA_TYPE_MAP.ESFP.englishName,
    src: null,
    hasLocalImage: false,
    altText: `GT-16 ${GAFA_TYPE_MAP.ESFP.name} ${GAFA_TYPE_MAP.ESFP.englishName} - 广州美术学院原创人物立绘`,
  },
};

/**
 * 获取角色立绘信息，若当前未放置实际 PNG，则平滑回退至高精度矢量立绘容器
 */
export function getCharacterImage(id: string): CharacterImageRecord {
  const normalized = id.toLowerCase();
  return CHARACTER_IMAGES[normalized] || CHARACTER_IMAGES['gt-01'];
}
