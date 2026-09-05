import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CharacterCarousel } from './components/CharacterCarousel';
import { QuizView } from './components/QuizView';
import { AnalysingTransition } from './components/AnalysingTransition';
import { ResultView } from './components/ResultView';
import { CharacterDetailModal } from './components/CharacterDetailModal';
import { GAFA_QUESTIONS } from './data/questions';
import { calculateScores } from './data/scoring';
import {
  CREATIVE_TYPES,
  GAFA_TYPES,
  getCreativeTypeByCode,
  getCreativeTypeById,
  validateGafaTypes,
} from './data/characters';
import { CreativeType, DimensionKey } from './types';
import {
  saveResultToStorage,
  getSavedResultFromStorage,
  getResultFromUrl,
  clearSavedResult,
  generateResultShareUrl,
} from './utils/resultPersistence';

type ViewMode = 'home' | 'quiz' | 'analysing' | 'result';

export default function App() {
  const [view, setView] = useState<ViewMode>('home');
  const [activeResultType, setActiveResultType] = useState<CreativeType>(CREATIVE_TYPES[0]);
  const [inspectModalType, setInspectModalType] = useState<CreativeType | null>(null);

  // 1. 完整性校验与结果持久化恢复
  useEffect(() => {
    const check = validateGafaTypes();
    if (!check.valid) {
      console.error('[GAFA-TI FATAL INTEGRITY ERROR]', check.errors);
    } else {
      console.log('[GAFA-TI] 16 Official Creative Types Validated Successfully.');
    }

    // 优先 1：从 URL 参数/Hash 恢复结果（支持跨设备、跨浏览器与分享链接恢复）
    const urlResult = getResultFromUrl();
    if (urlResult) {
      console.log('[GAFA-TI] Restored result state from URL:', urlResult.mbtiCode);
      setActiveResultType(urlResult);
      setView('result');
      return;
    }

    // 优先 2：从 localStorage 恢复上一次测试结果（防止刷新或意外退出导致数据丢失）
    const savedResult = getSavedResultFromStorage();
    if (savedResult) {
      console.log('[GAFA-TI] Restored result state from localStorage:', savedResult.mbtiCode);
      setActiveResultType(savedResult);
      setView('result');
      return;
    }
  }, []);

  // Scroll to top whenever view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  // Navigate to quiz (用户点击开始/重新测试时，清空旧缓存以进行全新答题)
  const handleStartQuiz = () => {
    clearSavedResult();
    setView('quiz');
  };

  // When all 30 quiz questions (and any tie-break) are answered
  const handleQuizComplete = (
    answers: Record<number, number>,
    tieBreaks?: Partial<Record<DimensionKey, 'I' | 'E' | 'N' | 'S' | 'T' | 'F' | 'J' | 'P'>>
  ) => {
    // 1. Enter brief analysing transition state (0.8 - 1.5s)
    setView('analysing');

    // 2. Precise mathematical scoring: (answer - 3) * directionValue * weight
    const scoringResult = calculateScores(answers, tieBreaks);
    const matchedType = GAFA_TYPES[scoringResult.code] || CREATIVE_TYPES[0];

    // 3. Construct the personalized dynamic type instance with calculated spectrum percentages
    const dynamicType: CreativeType = {
      ...matchedType,
      dimensions: {
        ...matchedType.dimensions,
        energy: `${scoringResult.percentages.ie.leftLabel} ${scoringResult.percentages.ie.leftScore}% · ${scoringResult.percentages.ie.rightScore}% ${scoringResult.percentages.ie.rightLabel}`,
        perception: `${scoringResult.percentages.ns.leftLabel} ${scoringResult.percentages.ns.leftScore}% · ${scoringResult.percentages.ns.rightScore}% ${scoringResult.percentages.ns.rightLabel}`,
        judgement: `${scoringResult.percentages.tf.leftLabel} ${scoringResult.percentages.tf.leftScore}% · ${scoringResult.percentages.tf.rightScore}% ${scoringResult.percentages.tf.rightLabel}`,
        process: `${scoringResult.percentages.jp.leftLabel} ${scoringResult.percentages.jp.leftScore}% · ${scoringResult.percentages.jp.rightScore}% ${scoringResult.percentages.jp.rightLabel}`,
        ie: scoringResult.percentages.ie,
        ns: scoringResult.percentages.ns,
        tf: scoringResult.percentages.tf,
        jp: scoringResult.percentages.jp,
      },
      spectrum: scoringResult.percentages,
    };

    // 4. 持久化存储结果，并更新当前 URL Hash 方便分享与刷新保留
    saveResultToStorage(dynamicType);
    try {
      const shareUrl = generateResultShareUrl(dynamicType);
      if (shareUrl && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', shareUrl);
      }
    } catch (e) {
      console.warn('[GAFA-TI] Failed to update history state:', e);
    }

    setActiveResultType(dynamicType);
  };

  // Called after AnalysingTransition completes
  const handleTransitionFinished = () => {
    setView('result');
  };

  // Scroll to states section on home
  const handleScrollToStates = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById('creative-states');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('creative-states');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Inspect character from carousel
  const handleSelectCharacter = (character: CreativeType) => {
    setInspectModalType(character);
  };

  // View as full result page from modal or explore
  const handleViewAsResult = (character: CreativeType) => {
    setActiveResultType(character);
    setView('result');
  };

  return (
    <div className="min-h-screen bg-[#ECECED] text-[#121212] flex flex-col justify-between selection:bg-[#D4FF00] selection:text-black">
      
      {/* Top Universal Navbar */}
      <Navbar
        currentView={view}
        onNavigate={(newView) => setView(newView)}
        onScrollToStates={handleScrollToStates}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col justify-center">
        {view === 'home' && (
          <>
            <HeroSection
              onStartQuiz={handleStartQuiz}
              onExploreStates={handleScrollToStates}
            />
            <CharacterCarousel onSelectCharacter={handleSelectCharacter} />
          </>
        )}

        {view === 'quiz' && (
          <QuizView
            questions={GAFA_QUESTIONS}
            onComplete={handleQuizComplete}
            onExit={() => setView('home')}
          />
        )}

        {view === 'analysing' && (
          <AnalysingTransition onFinished={handleTransitionFinished} />
        )}

        {view === 'result' && (
          <ResultView
            type={activeResultType}
            onRetake={handleStartQuiz}
            onExploreAll={() => {
              setView('home');
              setTimeout(handleScrollToStates, 100);
            }}
          />
        )}
      </main>

      {/* Editorial Footer (Only on Home & Result) */}
      {view !== 'quiz' && view !== 'analysing' && (
        <footer className="w-full border-t border-zinc-300/80 py-8 px-4 sm:px-8 mt-12 bg-[#E6E6E8]/70">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-black">GAFA-TI</span>
              <span>·</span>
              <span>GAFA CREATIVE TYPE INDICATOR</span>
              <span>·</span>
              <span>2026 CAMPUS ARCHIVE</span>
            </div>

            <p className="text-center sm:text-right text-[11px] text-zinc-400 max-w-md">
              本测试为广州美术学院迎新活动原创艺术创作状态探索工具，非心理学临床诊断，亦非官方 MBTI 测试。
            </p>
          </div>
        </footer>
      )}

      {/* Character Quick Inspection Modal */}
      <CharacterDetailModal
        type={inspectModalType}
        isOpen={Boolean(inspectModalType)}
        onClose={() => setInspectModalType(null)}
        onViewAsResult={handleViewAsResult}
      />
    </div>
  );
}
