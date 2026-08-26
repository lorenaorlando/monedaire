import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Translations } from '../i18n';

interface ReflectionTimerProps {
  onFinish?: () => void;
  t: Translations;
}

export const ReflectionTimer: React.FC<ReflectionTimerProps> = ({ onFinish, t }) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [questionIndex, setQuestionIndex] = useState(0);

  const reflectionQuestions = t.reflection.questions;

  // Timer countdown
  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      setIsActive(false);
      if (onFinish) onFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onFinish]);

  // Question rotation every 15 seconds (60s / 4 questions)
  useEffect(() => {
    if (!isActive) return;

    // Calculate question based on time elapsed: 0-14s (Q0), 15-29s (Q1), 30-44s (Q2), 45-59s (Q3)
    const elapsed = 60 - timeLeft;
    const index = Math.min(
      Math.floor(elapsed / 15),
      reflectionQuestions.length - 1
    );
    setQuestionIndex(index);
  }, [isActive, timeLeft, reflectionQuestions.length]);

  const handleStart = () => {
    setTimeLeft(60);
    setQuestionIndex(0);
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(60);
    setQuestionIndex(0);
  };

  // Format mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {!isActive ? (
        <motion.button
          onClick={handleStart}
          whileTap={{ scale: 0.998 }}
          className="w-full bg-[#bae9ee] text-black border-t border-black py-2.5 px-4 cursor-pointer hover:brightness-95 active:brightness-90 transition-all select-none text-center block focus:outline-none"
        >
          <div className="w-full max-w-md mx-auto px-4 sm:px-6">
            <span className="font-viaoda text-lg sm:text-xl tracking-wide lowercase font-normal text-black block">
              {t.reflection.startBtn}
            </span>
          </div>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full border-t border-black py-6 sm:py-8 bg-[#bae9ee]"
        >
          <div className="w-full max-w-md mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center">
            {/* Timer countdown with DM Sans */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
              <span className="text-3xl sm:text-4xl font-normal tracking-widest text-black">
                {formattedTime}
              </span>
            </div>

            {/* Subtle progress indicator */}
            <div className="w-full max-w-xs bg-black/15 h-1 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-black"
                initial={{ width: '100%' }}
                animate={{ width: `${(timeLeft / 60) * 100}%` }}
                transition={{ duration: 1, ease: 'linear' }}
              />
            </div>

            {/* Rotating Question with smooth transition in DM Sans */}
            <div className="min-h-[4rem] flex items-center justify-center px-2 py-1">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${questionIndex}-${t.reflection.startBtn}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                  className="text-lg sm:text-xl text-black font-normal leading-relaxed lowercase"
                >
                  {reflectionQuestions[questionIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Close button */}
            <button
              onClick={handleReset}
              className="mt-3 text-xs sm:text-sm text-black/70 hover:text-black underline underline-offset-2 transition-colors lowercase cursor-pointer"
            >
              {t.reflection.closeBtn}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
