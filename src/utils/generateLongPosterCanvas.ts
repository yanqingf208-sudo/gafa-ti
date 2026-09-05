import { CreativeType } from '../types';

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}

function wrapTextLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  if (!text) return [];
  const chars = text.split('');
  const lines: string[] = [];
  let currentLine = '';

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (char === '\n') {
      lines.push(currentLine);
      currentLine = '';
      continue;
    }
    const testLine = currentLine + char;
    const width = ctx.measureText(testLine).width;
    if (width > maxWidth && currentLine.length > 0) {
      lines.push(currentLine);
      currentLine = char;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  return lines;
}

/**
 * 直接使用 Canvas 2D 绘制 1080px 宽度高精度长图海报
 * 最外层为网站浅灰底色 (#ECECED)，内部各卡片均为纯白底色 (#FFFFFF)
 * 宣言文字与立绘均去除独立外框，自然融合于主卡纯白底色中
 */
export async function generateLongPosterCanvasBlob(
  type: CreativeType,
  characterImageSrc: string
): Promise<Blob> {
  // 等待字体就绪
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // ignore
    }
  }

  // 1. 预加载人物立绘
  const charImg = new Image();
  charImg.crossOrigin = 'anonymous';
  await new Promise<void>((resolve, reject) => {
    charImg.onload = () => resolve();
    charImg.onerror = (e) => reject(new Error(`Failed to load character image for Canvas: ${e}`));
    charImg.src = characterImageSrc;
  });
  if (typeof charImg.decode === 'function') {
    try {
      await charImg.decode();
    } catch {
      // ignore
    }
  }

  // 2. 动态预计算长图尺寸与各区块自适应高度
  const canvasWidth = 1080;
  const padX = 64;
  const contentWidth = canvasWidth - padX * 2; // 952px
  const colWidth = (contentWidth - 24) / 2; // 464px

  // 创建临时测算 canvas
  const measureCanvas = document.createElement('canvas');
  const mCtx = measureCanvas.getContext('2d')!;

  // 测算 Hero 卡片内的 Tagline 宣言高度 (直接排版，不套框)
  const heroLeftWidth = 520;
  mCtx.font = '500 18px system-ui, -apple-system, sans-serif';
  const taglineRaw = type.tagline || '';
  const taglineLines = wrapTextLines(mCtx, `“${taglineRaw}”`, heroLeftWidth);
  const taglineTextHeight = taglineLines.length * 30;

  // 测算关键词胶囊排版
  mCtx.font = 'bold 14px system-ui, sans-serif';
  let kwRowWidth = 0;
  let kwRowsCount = 1;
  type.keywords.forEach((kw) => {
    const pillW = mCtx.measureText(kw).width + 30;
    if (kwRowWidth + pillW > heroLeftWidth && kwRowWidth > 0) {
      kwRowsCount++;
      kwRowWidth = pillW + 10;
    } else {
      kwRowWidth += pillW + 10;
    }
  });
  const kwAreaHeight = kwRowsCount * 36 + (kwRowsCount - 1) * 8;

  // Hero 卡片上半部分动态高度与总高度计算
  const heroTopContentH = Math.max(360, 140 + taglineTextHeight + 20 + kwAreaHeight);
  const heroCardHeight = 44 + 48 + heroTopContentH + 36 + 210 + 36;

  // 测算 01 模块文本高度 (1.85 行高)
  mCtx.font = 'normal 17.5px system-ui, -apple-system, sans-serif';
  const status01Text = type.fullAnalysis || type.sections.status01 || '';
  const status01Lines = wrapTextLines(mCtx, status01Text, contentWidth - 68);
  const status01BoxHeight = 116 + status01Lines.length * 32 + 32;

  // 测算 02 / 03 模块高度 (两列等高对齐)
  const strengthsList = type.strengths && type.strengths.length > 0
    ? type.strengths
    : [type.sections.advantage02 || ''];
  const challengesList = type.challenges && type.challenges.length > 0
    ? type.challenges
    : [type.sections.block03 || ''];

  mCtx.font = 'normal 15.5px system-ui, -apple-system, sans-serif';
  let sTotalLines = 0;
  strengthsList.forEach(s => {
    sTotalLines += wrapTextLines(mCtx, s, colWidth - 68).length;
  });
  let cTotalLines = 0;
  challengesList.forEach(c => {
    cTotalLines += wrapTextLines(mCtx, c, colWidth - 68).length;
  });
  const max0203Lines = Math.max(sTotalLines, cTotalLines, 3);
  const box0203Height = 100 + max0203Lines * 28 + (Math.max(strengthsList.length, challengesList.length) - 1) * 8 + 24;

  // 测算 04 / 05 模块高度 (两列等高对齐)
  const sparkText = type.inspirationMode || type.sections.spark04 || '';
  const deadlineText = type.deadlineMode || type.sections.deadline05 || '';
  const sparkLines = wrapTextLines(mCtx, sparkText, colWidth - 56);
  const deadlineLines = wrapTextLines(mCtx, deadlineText, colWidth - 56);
  const max0405Lines = Math.max(sparkLines.length, deadlineLines.length, 2);
  const box0405Height = 100 + max0405Lines * 28 + 24;

  // 测算 06 模块高度
  const adviceText = type.creativeAdvice || '在保持独特创作敏锐度的同时，勇于跨出舒适圈，在材料、场域与观念的碰撞中发现新的可能。';
  mCtx.font = 'normal 15.5px system-ui, -apple-system, sans-serif';
  const adviceLines = wrapTextLines(mCtx, adviceText, contentWidth * 0.54);
  const box06Height = Math.max(160, 94 + adviceLines.length * 28);

  // 计算总 Canvas 高度
  const headerHeight = 120;
  const archiveDossierHeaderHeight = 84;
  const footerHeight = 140;
  const totalCanvasHeight =
    headerHeight +
    heroCardHeight +
    archiveDossierHeaderHeight +
    status01BoxHeight +
    24 +
    box0203Height +
    24 +
    box0405Height +
    24 +
    box06Height +
    footerHeight;

  // 3. 创建正式 Canvas
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = totalCanvasHeight;
  const ctx = canvas.getContext('2d')!;

  // 1. 最外层页面背景：与网站一致的浅灰色 (#ECECED)
  ctx.fillStyle = '#ECECED';
  ctx.fillRect(0, 0, canvasWidth, totalCanvasHeight);

  // ----------------------------------------------------
  // 顶部 Header: GAFA-TI ARCHIVE
  // ----------------------------------------------------
  let currY = 54;

  // Logo Circle Badge (荧光绿 #D4FF00)
  const badgeX = padX + 18;
  const badgeY = currY + 16;
  ctx.fillStyle = '#D4FF00';
  ctx.beginPath();
  ctx.arc(badgeX, badgeY, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('G', badgeX, badgeY + 1);

  // 'GAFA-TI ARCHIVE'
  ctx.fillStyle = '#121212';
  ctx.font = '900 22px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('GAFA-TI ARCHIVE', padX + 46, badgeY);

  ctx.fillStyle = '#9CA3AF';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('/', padX + 250, badgeY);

  ctx.fillStyle = '#4B5563';
  ctx.font = 'bold 17px monospace';
  ctx.fillText(`FILE NO. ${type.number}`, padX + 270, badgeY);

  // 右侧 'CAMPUS ORIENTATION 2026'
  ctx.fillStyle = '#52525B';
  ctx.font = 'bold 15px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('CAMPUS ORIENTATION 2026', canvasWidth - padX, badgeY);

  // 顶部细横线
  currY += 46;
  ctx.strokeStyle = '#D4D4D8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padX, currY);
  ctx.lineTo(canvasWidth - padX, currY);
  ctx.stroke();

  // ----------------------------------------------------
  // 第一部分：Hero 核心结果卡片 (内部底色为纯白 #FFFFFF)
  // ----------------------------------------------------
  currY += 28;
  const heroCardY = currY;

  // 2. 主卡内部底色为纯白 #FFFFFF
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, padX, heroCardY, contentWidth, heroCardHeight, 32);
  ctx.fill();
  ctx.strokeStyle = '#E5E7EB';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 卡片内边距
  const innerPad = 40;
  const innerLeft = padX + innerPad;
  const innerRight = canvasWidth - padX - innerPad;
  let heroY = heroCardY + innerPad;

  // 顶部编号与 MBTI
  ctx.fillStyle = '#000000';
  ctx.font = '900 38px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(type.number, innerLeft, heroY);

  const mbtiText = type.mbtiCode || '';
  ctx.font = 'bold 16px monospace';
  const mbtiW = ctx.measureText(mbtiText).width + 24;
  ctx.fillStyle = '#F4F4F5';
  drawRoundedRect(ctx, innerLeft + 120, heroY - 14, mbtiW, 28, 14);
  ctx.fill();
  ctx.strokeStyle = '#E4E4E7';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = '#27272A';
  ctx.textAlign = 'center';
  ctx.fillText(mbtiText, innerLeft + 120 + mbtiW / 2, heroY);

  // 6. 右上角分类标签：统一改为与 G 一致的荧光绿 #D4FF00 底色 + 黑色粗体
  const catText = type.category || '';
  ctx.font = 'bold 15px system-ui, sans-serif';
  const catW = ctx.measureText(catText).width + 28;
  ctx.fillStyle = '#D4FF00';
  drawRoundedRect(ctx, innerRight - catW, heroY - 15, catW, 30, 15);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.fillText(catText, innerRight - catW / 2, heroY);

  // 中文大标题
  heroY += 46;
  ctx.fillStyle = '#111827';
  ctx.font = '900 52px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(type.title, innerLeft, heroY);

  // 英文标题
  heroY += 62;
  ctx.fillStyle = '#9CA3AF';
  ctx.font = 'bold 16px monospace';
  ctx.fillText(type.enTitle.toUpperCase(), innerLeft, heroY);

  // ----------------------------------------------------
  // 3. 宣言 Tagline：删除外围独立框，直接排版
  // ----------------------------------------------------
  heroY += 24;
  ctx.fillStyle = '#1F2937';
  ctx.font = '500 18px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  let tagLineY = heroY;
  taglineLines.forEach((line) => {
    ctx.fillText(line, innerLeft, tagLineY);
    tagLineY += 30;
  });

  // 5 个关键词 Pills
  heroY = tagLineY + 16;
  let pillX = innerLeft;
  let pillY = heroY;
  ctx.font = 'bold 14px system-ui, sans-serif';
  type.keywords.forEach((kw) => {
    const kwW = ctx.measureText(kw).width + 28;
    if (pillX + kwW > innerLeft + heroLeftWidth) {
      pillX = innerLeft;
      pillY += 42;
    }
    ctx.fillStyle = '#111827';
    drawRoundedRect(ctx, pillX, pillY, kwW, 34, 17);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(kw, pillX + kwW / 2, pillY + 17);
    pillX += kwW + 10;
  });

  // ----------------------------------------------------
  // 4 & 5. 人物立绘：删除外部圆角框，直接与白底融合，稍微放大且不裁切
  // ----------------------------------------------------
  const charAreaW = 380;
  const charAreaH = 370;
  const charAreaX = innerRight - charAreaW;
  const charAreaY = heroCardY + 80;

  // 绘制人物立绘 (保持原有比例，不裁切，与主卡白底融合)
  const aspect = charImg.naturalWidth / charImg.naturalHeight;
  let drawW = charAreaW;
  let drawH = drawW / aspect;
  if (drawH > charAreaH) {
    drawH = charAreaH;
    drawW = drawH * aspect;
  }
  const drawX = charAreaX + (charAreaW - drawW) / 2;
  const drawY = charAreaY + charAreaH - drawH;
  ctx.drawImage(charImg, drawX, drawY, drawW, drawH);

  // ----------------------------------------------------
  // 四维创作光谱 (2x2 Grid)
  // ----------------------------------------------------
  const specY = heroCardY + 44 + 48 + heroTopContentH + 32;
  ctx.strokeStyle = '#E5E7EB';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(innerLeft, specY);
  ctx.lineTo(innerRight, specY);
  ctx.stroke();

  ctx.fillStyle = '#6B7280';
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('00 / CREATIVE DIMENSION SPECTRUM · 四维创作光谱', innerLeft, specY + 18);

  ctx.fillStyle = '#9CA3AF';
  ctx.textAlign = 'right';
  ctx.fillText('GAFA-TI MATRIX', innerRight, specY + 18);

  const renderBar = (bx: number, by: number, bw: number, leftL: string, rightL: string, lScore: number, rScore: number) => {
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`${leftL} ${lScore}%`, bx, by);

    ctx.fillStyle = '#6B7280';
    ctx.textAlign = 'right';
    ctx.fillText(`${rScore}% ${rightL}`, bx + bw, by);

    const barY = by + 22;
    ctx.fillStyle = '#E5E7EB';
    drawRoundedRect(ctx, bx, barY, bw, 10, 5);
    ctx.fill();

    const pW = Math.max(8, bw * (lScore / 100));
    ctx.fillStyle = '#000000';
    drawRoundedRect(ctx, bx, barY, pW, 10, 5);
    ctx.fill();
  };

  const specColW = (innerRight - innerLeft - 48) / 2;
  const specCol1 = innerLeft;
  const specCol2 = innerLeft + specColW + 48;
  const row1Y = specY + 54;
  const row2Y = specY + 124;

  renderBar(specCol1, row1Y, specColW, type.dimensions.ie?.leftLabel || '向内沉浸', type.dimensions.ie?.rightLabel || '向外共振', type.dimensions.ie?.leftScore || 50, type.dimensions.ie?.rightScore || 50);
  renderBar(specCol2, row1Y, specColW, type.dimensions.ns?.leftLabel || '概念构想', type.dimensions.ns?.rightLabel || '实感观察', type.dimensions.ns?.leftScore || 50, type.dimensions.ns?.rightScore || 50);
  renderBar(specCol1, row2Y, specColW, type.dimensions.tf?.leftLabel || '结构推演', type.dimensions.tf?.rightLabel || '感性表达', type.dimensions.tf?.leftScore || 50, type.dimensions.tf?.rightScore || 50);
  renderBar(specCol2, row2Y, specColW, type.dimensions.jp?.leftLabel || '计划构建', type.dimensions.jp?.rightLabel || '即兴探索', type.dimensions.jp?.leftScore || 50, type.dimensions.jp?.rightScore || 50);

  currY = heroCardY + heroCardHeight + 32;

  // ----------------------------------------------------
  // 第二部分：深度创作画像档案 标题栏
  // ----------------------------------------------------
  ctx.fillStyle = '#6B7280';
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('DEEP ARCHIVE DOSSIER', padX, currY);

  ctx.fillStyle = '#111827';
  ctx.font = '900 30px system-ui, -apple-system, sans-serif';
  ctx.fillText('深度创作画像档案', padX, currY + 20);

  ctx.fillStyle = '#71717A';
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('6 EDITORIAL RESEARCH MODULES', canvasWidth - padX, currY + 24);

  currY += 62;
  ctx.strokeStyle = '#D4D4D8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padX, currY);
  ctx.lineTo(canvasWidth - padX, currY);
  ctx.stroke();

  currY += 24;

  // ----------------------------------------------------
  // 01 / CREATIVE STATE DOSSIER (纯白底色卡片)
  // ----------------------------------------------------
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, padX, currY, contentWidth, status01BoxHeight, 24);
  ctx.fill();
  ctx.strokeStyle = '#E5E7EB';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 01 标签头
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(padX + 34, currY + 34, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#6B7280';
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('01 / CREATIVE STATE DOSSIER · 深度行为全貌解读', padX + 46, currY + 34);

  ctx.fillStyle = '#9CA3AF';
  ctx.textAlign = 'right';
  ctx.fillText('行为全貌画像', canvasWidth - padX - 34, currY + 34);

  // 细分割线
  ctx.strokeStyle = '#F3F4F6';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padX + 34, currY + 54);
  ctx.lineTo(canvasWidth - padX - 34, currY + 54);
  ctx.stroke();

  // 标题
  ctx.fillStyle = '#111827';
  ctx.font = '900 24px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('你的艺术创作深度画像', padX + 34, currY + 70);

  // 文本内容 (1.85 行高舒适度)
  ctx.fillStyle = '#374151';
  ctx.font = 'normal 17.5px system-ui, -apple-system, sans-serif';
  let tY = currY + 114;
  status01Lines.forEach((line) => {
    ctx.fillText(line, padX + 34, tY);
    tY += 32;
  });

  currY += status01BoxHeight + 24;

  // ----------------------------------------------------
  // 02 / ADVANTAGES & 03 / BLOCKS (纯白底色卡片，2 列等高)
  // ----------------------------------------------------
  const box2X = padX;
  const box3X = padX + colWidth + 24;

  // 02 优势
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, box2X, currY, colWidth, box0203Height, 24);
  ctx.fill();
  ctx.strokeStyle = '#E5E7EB';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#9CA3AF';
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('02 / ADVANTAGES', box2X + 28, currY + 24);

  ctx.fillStyle = '#111827';
  ctx.font = '900 20px system-ui, -apple-system, sans-serif';
  ctx.fillText('你的创作优势', box2X + 28, currY + 48);

  ctx.font = 'normal 15.5px system-ui, -apple-system, sans-serif';
  let sY = currY + 88;
  strengthsList.forEach((st) => {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(box2X + 34, sY + 9, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#374151';
    const lines = wrapTextLines(ctx, st, colWidth - 68);
    lines.forEach((l) => {
      ctx.fillText(l, box2X + 46, sY);
      sY += 28;
    });
    sY += 8;
  });

  // 03 卡点
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, box3X, currY, colWidth, box0203Height, 24);
  ctx.fill();
  ctx.strokeStyle = '#E5E7EB';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#9CA3AF';
  ctx.font = 'bold 13px monospace';
  ctx.fillText('03 / BLOCKS', box3X + 28, currY + 24);

  ctx.fillStyle = '#111827';
  ctx.font = '900 20px system-ui, -apple-system, sans-serif';
  ctx.fillText('容易卡住的地方', box3X + 28, currY + 48);

  ctx.font = 'normal 15.5px system-ui, -apple-system, sans-serif';
  let cY = currY + 88;
  challengesList.forEach((ch) => {
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(box3X + 34, cY + 9, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#374151';
    const lines = wrapTextLines(ctx, ch, colWidth - 68);
    lines.forEach((l) => {
      ctx.fillText(l, box3X + 46, cY);
      cY += 28;
    });
    cY += 8;
  });

  currY += box0203Height + 24;

  // ----------------------------------------------------
  // 04 / INSPIRATION & 05 / DEADLINE (纯白底色卡片，2 列等高)
  // ----------------------------------------------------
  // 04 灵感
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, box2X, currY, colWidth, box0405Height, 24);
  ctx.fill();
  ctx.strokeStyle = '#E5E7EB';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#9CA3AF';
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('04 / INSPIRATION SPARK', box2X + 28, currY + 24);

  ctx.fillStyle = '#111827';
  ctx.font = '900 20px system-ui, -apple-system, sans-serif';
  ctx.fillText('你的灵感启动方式', box2X + 28, currY + 48);

  ctx.fillStyle = '#374151';
  ctx.font = 'normal 15.5px system-ui, -apple-system, sans-serif';
  let spY = currY + 88;
  sparkLines.forEach((l) => {
    ctx.fillText(l, box2X + 28, spY);
    spY += 28;
  });

  // 05 Deadline
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, box3X, currY, colWidth, box0405Height, 24);
  ctx.fill();
  ctx.strokeStyle = '#E5E7EB';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#9CA3AF';
  ctx.font = 'bold 13px monospace';
  ctx.fillText('05 / DEADLINE BEHAVIOR', box3X + 28, currY + 24);

  ctx.fillStyle = '#111827';
  ctx.font = '900 20px system-ui, -apple-system, sans-serif';
  ctx.fillText('Deadline 下的你', box3X + 28, currY + 48);

  ctx.fillStyle = '#374151';
  ctx.font = 'normal 15.5px system-ui, -apple-system, sans-serif';
  let dlY = currY + 88;
  deadlineLines.forEach((l) => {
    ctx.fillText(l, box3X + 28, dlY);
    dlY += 28;
  });

  currY += box0405Height + 24;

  // ----------------------------------------------------
  // 06 / CREATIVE ADVICE & KEYWORDS (纯白底色卡片)
  // ----------------------------------------------------
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, padX, currY, contentWidth, box06Height, 24);
  ctx.fill();
  ctx.strokeStyle = '#E5E7EB';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#9CA3AF';
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('06 / CREATIVE ADVICE & KEYWORDS', padX + 32, currY + 24);

  ctx.fillStyle = '#111827';
  ctx.font = '900 22px system-ui, -apple-system, sans-serif';
  ctx.fillText('给你的广美创作锦囊', padX + 32, currY + 48);

  ctx.fillStyle = '#374151';
  ctx.font = 'normal 15.5px system-ui, -apple-system, sans-serif';
  let advY = currY + 86;
  adviceLines.forEach((l) => {
    ctx.fillText(l, padX + 32, advY);
    advY += 28;
  });

  // 右侧关键词标签
  let tagX = canvasWidth - padX - 32;
  let tagY = currY + 48;
  ctx.font = 'bold 13.5px monospace';

  [...type.keywords].reverse().forEach((tag) => {
    const tStr = `#${tag}`;
    const tW = ctx.measureText(tStr).width + 24;
    ctx.fillStyle = '#F4F4F5';
    drawRoundedRect(ctx, tagX - tW, tagY, tW, 32, 16);
    ctx.fill();
    ctx.strokeStyle = '#E4E4E7';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#27272A';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tStr, tagX - tW / 2, tagY + 16);

    tagX -= tW + 10;
    if (tagX < padX + contentWidth * 0.58) {
      tagX = canvasWidth - padX - 32;
      tagY += 40;
    }
  });

  currY += box06Height + 36;

  // ----------------------------------------------------
  // 底部 Stamp 与版权
  // ----------------------------------------------------
  ctx.save();
  ctx.strokeStyle = '#A1A1AA';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(padX, currY);
  ctx.lineTo(canvasWidth - padX, currY);
  ctx.stroke();
  ctx.restore();

  currY += 24;
  ctx.fillStyle = '#52525B';
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('GUANGZHOU ACADEMY OF FINE ARTS', padX, currY);
  ctx.fillText('MY GAFA CREATIVE ARCHIVE · 2026', padX, currY + 24);

  ctx.fillStyle = '#27272A';
  ctx.font = 'bold 18px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('GAFA-TI · 2026', canvasWidth - padX, currY + 12);

  // 4. 导出高质量 PNG Blob
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob && blob.size > 20000) {
        resolve(blob);
      } else {
        reject(new Error('Canvas long poster generated blob is too small or null'));
      }
    }, 'image/png');
  });
}
