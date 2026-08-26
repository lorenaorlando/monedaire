/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CoinResult, Language, LogEntry } from './types';
import { translations } from './i18n';
import { CoinFlipper } from './components/CoinFlipper';
import { LogList } from './components/LogList';
import { ReflectionTimer } from './components/ReflectionTimer';
import { InfoModal } from './components/InfoModal';
import { playCoinFlipSound, playCoinLandSound } from './utils/audio';

const STORAGE_KEY = 'moneda_app_logs_v1';
const LANG_STORAGE_KEY = 'moneda_app_lang_v1';

export default function App() {
  // Language toggle state (default 'esp')
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'esp' || saved === 'eng') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'esp';
  });

  // Save language preference
  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const t = translations[lang];

  // Starts with 'empty' coin on initial app load
  const [currentResult, setCurrentResult] = useState<CoinResult>('empty');
  const [hasFlippedOnce, setHasFlippedOnce] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  // Save logs to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    } catch {
      // ignore
    }
  }, [logs]);

  const flipTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleFlip = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    playCoinFlipSound();

    // Randomly pick one of the 3 active outcomes
    const outcomes: Array<'up' | 'down' | 'question'> = ['up', 'down', 'question'];
    const selectedOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];

    // Rapid face shifts during mid-spin for dynamic realism
    let tickCount = 0;
    const interval = setInterval(() => {
      tickCount++;
      const tempOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      setCurrentResult(tempOutcome);
      if (tickCount > 6) {
        clearInterval(interval);
      }
    }, 120);

    // End flip after 1.35 seconds
    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    flipTimerRef.current = setTimeout(() => {
      clearInterval(interval);
      setCurrentResult(selectedOutcome);
      setHasFlippedOnce(true);
      setIsFlipping(false);
      playCoinLandSound();

      // Add new log at top (keeping max 10 records)
      const newEntry: LogEntry = {
        id: Date.now().toString(),
        result: selectedOutcome,
        topic: '',
        timestamp: Date.now(),
      };

      setLogs((prev) => [newEntry, ...prev.slice(0, 9)]);
    }, 1350);
  };

  const handleUpdateTopic = (id: string, newTopic: string) => {
    setLogs((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, topic: newTopic } : entry))
    );
  };

  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col items-center justify-start pb-16 overflow-x-hidden">
      {/* Top Header with spacious horizontal padding, background in #bae9ee */}
      <header className="w-full bg-[#bae9ee] py-3.5 sm:py-4 px-4 sm:px-8 flex items-center justify-between gap-3">
        {/* Title + by logo */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <h1 className="font-viaoda text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-black select-none lowercase truncate">
            {t.title}
          </h1>
          <div className="flex items-center gap-2 select-none pt-1 sm:pt-1.5 flex-shrink-0">
            <span className="font-normal text-sm sm:text-base text-black lowercase">by</span>
            <img
              src="https://sandboxlandia.online/wp-content/uploads/2026/08/PRAGMAGICKA_LOGO-1.png"
              alt="Pragmagicka"
              referrerPolicy="no-referrer"
              className="h-8 sm:h-10 md:h-12 w-auto object-contain inline-block"
              loading="eager"
            />
          </div>
        </div>

        {/* Right side controls: ESP - ENG switch toggle + Info button */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Language Switch Toggle */}
          <div className="font-viaoda flex items-center border border-black rounded-[40px] p-0.5 bg-white select-none">
            <button
              onClick={() => setLang('esp')}
              className={`px-2.5 sm:px-3 py-1 rounded-[40px] text-xs sm:text-sm font-normal tracking-wider transition-all cursor-pointer ${
                lang === 'esp'
                  ? 'bg-black text-white shadow-xs'
                  : 'text-black hover:bg-black/5'
              }`}
            >
              ESP
            </button>
            <button
              onClick={() => setLang('eng')}
              className={`px-2.5 sm:px-3 py-1 rounded-[40px] text-xs sm:text-sm font-normal tracking-wider transition-all cursor-pointer ${
                lang === 'eng'
                  ? 'bg-black text-white shadow-xs'
                  : 'text-black hover:bg-black/5'
              }`}
            >
              ENG
            </button>
          </div>

          {/* Info Button with yellow background (#ffff0f) */}
          <button
            onClick={() => setIsInfoOpen(true)}
            className="font-viaoda px-4 sm:px-5 py-1.5 bg-[#ffff0f] text-black border border-black rounded-[40px] text-sm sm:text-base font-normal tracking-wide lowercase cursor-pointer hover:brightness-95 active:brightness-90 shadow-sm transition-all focus:outline-none"
          >
            {t.infoButton}
          </button>
        </div>
      </header>

      {/* Info Slide-down view */}
      <AnimatePresence>
        {isInfoOpen && (
          <InfoModal
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(false)}
            t={t}
          />
        )}
      </AnimatePresence>

      {/* Header divider line going completely from edge to edge of the screen */}
      <div className="w-full border-b border-black" />

      {/* Central Coin Section */}
      <main className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-6 px-4">
        <CoinFlipper
          currentResult={currentResult}
          isFlipping={isFlipping}
          t={t}
        />
      </main>

      {/* Reflection Section spanning from edge to edge of the screen */}
      <AnimatePresence>
        {hasFlippedOnce && !isFlipping && currentResult !== 'empty' && (
          <section className="w-full my-2">
            <ReflectionTimer key="reflection-timer" t={t} />
          </section>
        )}
      </AnimatePresence>

      {/* Action Strip (LANZAR #ffff0f) directly attached to Log History Section (#bae9ee) */}
      <section className="w-full mt-4 flex flex-col">
        {/* Full-width Yellow Strip (#ffff0f) */}
        <motion.button
          onClick={handleFlip}
          disabled={isFlipping}
          whileTap={{ scale: 0.998 }}
          className="w-full bg-[#ffff0f] text-black border-t border-b border-black py-2.5 px-4 cursor-pointer disabled:opacity-80 hover:brightness-95 active:brightness-90 transition-all select-none text-center block focus:outline-none"
        >
          <div className="w-full max-w-md mx-auto px-4 sm:px-6">
            <span className="font-viaoda text-lg sm:text-xl tracking-widest uppercase font-normal text-black block">
              {isFlipping ? t.flippingButton : t.flipButton}
            </span>
          </div>
        </motion.button>

        {/* Log History Section attached directly below */}
        <LogList logs={logs} onUpdateTopic={handleUpdateTopic} t={t} />
      </section>
    </div>
  );
}
