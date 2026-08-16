import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CoinResult } from '../types';
import { Translations } from '../i18n';
import { CoinSvg } from './CoinSvg';

interface CoinFlipperProps {
  currentResult: CoinResult;
  isFlipping: boolean;
  t: Translations;
}

export const CoinFlipper: React.FC<CoinFlipperProps> = ({
  currentResult,
  isFlipping,
  t,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full my-2">
      {/* Instructions above the coin */}
      <div className="w-full max-w-sm mb-4 text-center select-none">
        <ol className="text-sm sm:text-base text-[#1b1b3a]/90 font-normal leading-relaxed space-y-0.5 lowercase">
          <li>{t.instructions.step1}</li>
          <li>{t.instructions.step2}</li>
          <li>{t.instructions.step3}</li>
          <li>{t.instructions.step4}</li>
        </ol>
      </div>

      {/* 3D Perspective Stage */}
      <div className="perspective-1000 relative flex flex-col items-center justify-center">
        {/* 3D Flipping Coin */}
        <motion.div
          animate={
            isFlipping
              ? {
                  y: [0, -110, -140, -90, -10, 0],
                  rotateY: [0, 720, 1440, 1800, 2160],
                  rotateX: [0, 45, -30, 15, 0],
                  scale: [1, 1.12, 1.18, 1.08, 0.96, 1],
                }
              : {
                  y: 0,
                  rotateY: 0,
                  rotateX: 0,
                  scale: 1,
                }
          }
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-52 h-52 sm:w-60 sm:h-60 relative select-none preserve-3d"
        >
          <CoinSvg type={currentResult} className="w-full h-full" />
        </motion.div>
      </div>

      {/* Subtitle text below coin: ONLY visible when NOT flipping AND outcome is 'question' */}
      <div className="h-9 mt-4 flex items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          {!isFlipping && currentResult === 'question' && (
            <motion.p
              key="question-text"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-base sm:text-lg font-normal text-[#1b1b3a] tracking-wide lowercase"
            >
              {t.questionOutcomeSubtitle}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
