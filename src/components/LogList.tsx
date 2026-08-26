import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogEntry } from '../types';
import { Translations } from '../i18n';
import { CoinSvg } from './CoinSvg';

interface LogListProps {
  logs: LogEntry[];
  onUpdateTopic: (id: string, newTopic: string) => void;
  t: Translations;
}

const formatDate = (timestamp?: number) => {
  if (!timestamp) return '';
  const d = new Date(timestamp);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export const LogList: React.FC<LogListProps> = ({ logs, onUpdateTopic, t }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Section Header with full screen width border and #bae9ee background */}
      <div className="w-full border-b border-black py-2 bg-[#bae9ee]">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          <h2 className="font-viaoda text-lg sm:text-xl tracking-wide text-black font-normal lowercase select-none">
            {t.logs.header}
          </h2>
        </div>
      </div>

      {/* Log Items List (max 10 items) */}
      <div className="w-full">
        <AnimatePresence initial={false}>
          {logs.length === 0 ? (
            <div className="w-full border-b border-black">
              <div className="w-full max-w-md mx-auto py-8 text-center text-black/50 text-base italic px-4 lowercase">
                {t.logs.empty}
              </div>
            </div>
          ) : (
            logs.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full border-b border-black hover:bg-black/[0.02] transition-colors"
              >
                <div className="w-full max-w-md mx-auto flex items-center justify-between py-4 px-4 sm:px-6 gap-3">
                  {/* Left Side: Date + Topic Input Field */}
                  <div className="flex-1 flex items-center gap-3 min-w-0">
                    <span className="text-sm text-black/65 select-none whitespace-nowrap tracking-wide font-normal">
                      {formatDate(entry.timestamp)}
                    </span>

                    <input
                      type="text"
                      value={entry.topic}
                      onChange={(e) => onUpdateTopic(entry.id, e.target.value)}
                      placeholder={t.logs.placeholder}
                      className="w-full bg-transparent text-black placeholder-black/45 text-base sm:text-lg focus:outline-none focus:border-b focus:border-black/40 transition-colors py-1 lowercase"
                    />
                  </div>

                  {/* Right Side: Coin Icon Result ONLY */}
                  <div className="flex-shrink-0 flex items-center justify-center pl-1">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-sm">
                      <CoinSvg type={entry.result} className="w-full h-full" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
