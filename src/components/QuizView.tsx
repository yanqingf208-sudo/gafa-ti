import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Check, Sparkles, HelpCircle } from 'lucide-react';
import { Question, DimensionKey } from '../types';
import { ANSWER_OPTIONS, TIE_BREAK_QUESTIONS } from '../data/questions';
import { calculateScores } from '../data/scoring';

interface QuizViewProps {
  questions: Question[];
  onComplete: (
    answers: Record<number, number>,
    tieBreaks?: Partial<Record<DimensionKey, 'I' | 'E' | 'N' | 'S' | 'T' | 'F' | 'J' | 'P'>>
  ) => void;
  onExit: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  onComplete,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedAnimOption, setSelectedAnimOption] = useState<number | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);

  // Tie-break state if any dimension hits exactly score === 0 (50:50)
  const [tiedDimensions, setTiedDimensions] = useState<DimensionKey[]>([]);
  const [tieBreakIndex, setTieBreakIndex] = useState<number | null>(null);
  const [tieBreaks, setTieBreaks] = useState<
    Partial<Record<DimensionKey, 'I' | 'E' | 'N' | 'S' | 'T' | 'F' | 'J' | 'P'>>
  >({});

  const currentQuestion = questions[currentIndex] || questions[0];
  const totalQuestions = questions.length;
  const currentAnswer = answers[currentQuestion.id] ?? null;

  // Format index with leading zero (e.g. 01 / 30)
  const currentNumberStr = String(currentIndex + 1).padStart(2, '0');
  const totalNumberStr = String(totalQuestions).padStart(2, '0');
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  // Final check after 30 questions
  const finishQuizOrTieBreak = useCallback(
    (finalAnswers: Record<number, number>) => {
      const preliminary = calculateScores(finalAnswers);
      if (preliminary.tiedDimensions.length > 0) {
        setTiedDimensions(preliminary.tiedDimensions);
        setTieBreakIndex(0);
      } else {
        onComplete(finalAnswers, {});
      }
    },
    [onComplete]
  );

  // Handle selecting an answer in 30 main questions
  const handleSelectOption = useCallback(
    (value: 1 | 2 | 3 | 4 | 5) => {
      if (isAdvancing || tieBreakIndex !== null) return;

      const updatedAnswers = {
        ...answers,
        [currentQuestion.id]: value,
      };

      setAnswers(updatedAnswers);
      setSelectedAnimOption(value);
      setIsAdvancing(true);

      // Dwell for 350ms so user sees verified selected state
      setTimeout(() => {
        if (currentIndex < totalQuestions - 1) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedAnimOption(null);
          setIsAdvancing(false);
        } else {
          // Final question completed -> Check for ties or transition
          finishQuizOrTieBreak(updatedAnswers);
        }
      }, 350);
    },
    [currentIndex, totalQuestions, currentQuestion.id, isAdvancing, answers, tieBreakIndex, finishQuizOrTieBreak]
  );

  // Handle selecting tie-break option
  const handleSelectTieBreak = (letter: 'I' | 'E' | 'N' | 'S' | 'T' | 'F' | 'J' | 'P') => {
    if (tieBreakIndex === null) return;
    const dim = tiedDimensions[tieBreakIndex];
    const nextTieBreaks = { ...tieBreaks, [dim]: letter };
    setTieBreaks(nextTieBreaks);

    if (tieBreakIndex < tiedDimensions.length - 1) {
      setTieBreakIndex((prev) => (prev ?? 0) + 1);
    } else {
      // All ties broken
      onComplete(answers, nextTieBreaks);
    }
  };

  // Keyboard navigation: 1, 2, 3, 4, 5 keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (tieBreakIndex !== null) return; // In tie break mode, keyboard is disabled or handled separately
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        const val = parseInt(e.key, 10) as 1 | 2 | 3 | 4 | 5;
        handleSelectOption(val);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelectOption, tieBreakIndex]);

  const handlePrev = () => {
    if (currentIndex > 0 && !isAdvancing && tieBreakIndex === null) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedAnimOption(null);
    }
  };

  // ================= TIE BREAK SCREEN (Only appears if exactly score === 0) =================
  if (tieBreakIndex !== null && tiedDimensions[tieBreakIndex]) {
    const currentTiedDim = tiedDimensions[tieBreakIndex];
    const tbQuestion = TIE_BREAK_QUESTIONS[currentTiedDim];

    return (
      <div className="w-full min-h-[calc(100vh-64px)] flex flex-col justify-between px-4 sm:px-8 py-6 max-w-4xl mx-auto animate-in fade-in duration-300">
        {/* Top Header */}
        <div className="w-full flex items-center justify-between py-2 text-xs font-mono tracking-wider text-zinc-500 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-black">GAFA-TI</span>
            <span>/</span>
            <span>TIE-BREAK RESOLUTION</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            <span>加试平衡题</span>
            <span>({tieBreakIndex + 1} / {tiedDimensions.length})</span>
          </div>
        </div>

        {/* Tie-Break Center Card */}
        <div className="my-auto py-8 sm:py-12 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-[11px] font-mono mb-4">
            <Sparkles className="w-3 h-3 text-[#D4FF00]" />
            <span>{tbQuestion.prompt}</span>
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight max-w-2xl leading-snug mb-3">
            {tbQuestion.subPrompt}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-lg mb-8">
            你在该维度的测评得分恰好完全对等（50% : 50%），请凭借第一直觉选择更贴近你真实创作习惯的一项：
          </p>

          {/* Two Large Choice Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl">
            {/* Option A */}
            <button
              onClick={() => handleSelectTieBreak(tbQuestion.optionA.letter)}
              className="p-6 sm:p-8 rounded-[24px] bg-white hover:bg-zinc-50 border-2 border-zinc-200 hover:border-black text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer group flex flex-col justify-between min-h-[180px]"
            >
              <div>
                <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-black uppercase block mb-2">
                  OPTION A
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-black mb-3">
                  {tbQuestion.optionA.label}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {tbQuestion.optionA.description}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-mono font-bold text-black border-t border-zinc-100 pt-3">
                <span>选择倾向</span>
                <span>→</span>
              </div>
            </button>

            {/* Option B */}
            <button
              onClick={() => handleSelectTieBreak(tbQuestion.optionB.letter)}
              className="p-6 sm:p-8 rounded-[24px] bg-white hover:bg-zinc-50 border-2 border-zinc-200 hover:border-black text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer group flex flex-col justify-between min-h-[180px]"
            >
              <div>
                <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-black uppercase block mb-2">
                  OPTION B
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-black mb-3">
                  {tbQuestion.optionB.label}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {tbQuestion.optionB.description}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-mono font-bold text-black border-t border-zinc-100 pt-3">
                <span>选择倾向</span>
                <span>→</span>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom abort */}
        <div className="flex items-center justify-center pb-4">
          <button
            onClick={onExit}
            className="text-xs text-zinc-400 hover:text-zinc-600 px-3 py-1.5 transition-colors cursor-pointer"
          >
            退出测试
          </button>
        </div>
      </div>
    );
  }

  // ================= MAIN 30-QUESTION QUIZ SCREEN =================
  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col justify-between px-4 sm:px-8 py-6 max-w-5xl mx-auto">
      
      {/* Top Header Row & Slim Progress Bar (Mandatory Rule: 01 / 30) */}
      <div className="w-full">
        <div className="flex items-center justify-between py-2 text-xs sm:text-sm font-mono tracking-wider text-zinc-600">
          {/* Top Left: Brand */}
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-black">GAFA-TI</span>
            <span className="text-zinc-400 hidden sm:inline">/</span>
            <span className="text-zinc-400 hidden sm:inline">CREATIVE ARCHIVE</span>
          </div>

          {/* Top Right: Progress Count formatted strictly as 01 / 30 */}
          <div className="flex items-center gap-1.5 font-bold">
            <span className="text-black text-base">{currentNumberStr}</span>
            <span className="text-zinc-400">/</span>
            <span className="text-zinc-400">{totalNumberStr}</span>
          </div>
        </div>

        {/* Ultra-fine progress line */}
        <div className="w-full h-[2px] bg-zinc-200 mt-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Center Main Question Area (Generous Whitespace, Large Typography) */}
      <div className="my-auto py-8 sm:py-14 w-full flex flex-col items-center text-center">
        
        {/* Question Counter Pill */}
        <div className="mb-4 sm:mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-[11px] font-mono text-zinc-600 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
            <span>QUESTION {currentNumberStr}</span>
            <span className="text-zinc-400">·</span>
            <span>{currentQuestion.scene}</span>
          </span>
        </div>

        {/* Big Question Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-zinc-900 leading-[1.3] sm:leading-[1.35] max-w-3xl tracking-tight mb-4 sm:mb-6 select-none">
          {currentQuestion.text}
        </h2>

        {/* Question context indicator */}
        {currentQuestion.subtext && (
          <p className="text-xs sm:text-sm font-mono text-zinc-400 tracking-wider">
            {currentQuestion.subtext}
          </p>
        )}
      </div>

      {/* 5-Option Interactive Scale System */}
      <div className="w-full max-w-4xl mx-auto pb-4">
        {/* Mobile: Vertical list; Desktop: Responsive 5-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 sm:gap-3.5">
          {ANSWER_OPTIONS.map((opt) => {
            const isCurrentlySelected =
              selectedAnimOption === opt.value ||
              (currentAnswer === opt.value && selectedAnimOption === null);

            return (
              <button
                key={opt.value}
                id={`quiz-opt-${opt.value}`}
                onClick={() => handleSelectOption(opt.value)}
                disabled={isAdvancing}
                className={`relative flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-[18px] sm:rounded-[22px] transition-all duration-200 select-none cursor-pointer border ${
                  isCurrentlySelected
                    ? 'bg-[#D4FF00] border-black text-black scale-[1.03] shadow-[0_8px_20px_rgba(212,255,0,0.35)] font-bold ring-2 ring-black/10'
                    : 'bg-white hover:bg-zinc-50 border-zinc-200/80 hover:border-zinc-300 text-zinc-800 hover:-translate-y-1 shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
                }`}
              >
                {/* Visual Keyboard Number & Indicator */}
                <div className="flex items-center justify-between w-full mb-1 sm:mb-2 text-[10px] font-mono">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                      isCurrentlySelected
                        ? 'bg-black text-white'
                        : 'bg-zinc-100 text-zinc-500'
                    }`}
                  >
                    {opt.value}
                  </span>

                  {/* Accessibility Checkmark indicator */}
                  {isCurrentlySelected && (
                    <span className="flex items-center gap-1 font-sans text-black font-bold text-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* Primary Chinese Label */}
                <span
                  className={`text-sm sm:text-[15px] leading-snug tracking-tight text-center ${
                    isCurrentlySelected ? 'font-black text-black' : 'font-medium'
                  }`}
                >
                  {opt.label}
                </span>

                {/* Secondary English Subtext */}
                <span
                  className={`text-[9px] font-mono tracking-wider mt-1 hidden sm:block ${
                    isCurrentlySelected ? 'text-black/80 font-bold' : 'text-zinc-400'
                  }`}
                >
                  {opt.secondary}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Navigation & Controls */}
        <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-200/60">
          {/* Previous Question Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0 || isAdvancing}
            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-4 py-2 rounded-full transition-colors cursor-pointer ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed text-zinc-400'
                : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← 上一题</span>
          </button>

          {/* Desktop Keyboard Shortcut Prompt */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-zinc-400">
            <span>键盘提示：按</span>
            <span className="px-1.5 py-0.5 rounded bg-white border border-zinc-300 text-zinc-700 font-bold">1</span>
            <span>-</span>
            <span className="px-1.5 py-0.5 rounded bg-white border border-zinc-300 text-zinc-700 font-bold">5</span>
            <span>键直接作答</span>
          </div>

          {/* Exit / Abort */}
          <button
            onClick={onExit}
            className="text-xs text-zinc-400 hover:text-zinc-600 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            退出测试
          </button>
        </div>
      </div>
    </div>
  );
};
