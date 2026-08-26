import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Translations } from '../i18n';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex flex-col justify-start"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-white text-black border-b border-black shadow-xl overflow-y-auto max-h-[92vh] flex flex-col"
      >
        {/* Header inside Info Panel with generous horizontal padding */}
        <div className="w-full bg-[#bae9ee] border-b border-black py-4 px-4 sm:px-8 flex items-center justify-between">
          <span className="font-viaoda text-xl sm:text-2xl font-normal tracking-tight lowercase select-none">
            {t.infoModal.header}
          </span>
          <button
            onClick={onClose}
            className="font-viaoda px-4 py-1.5 bg-[#ffff0f] text-black border border-black rounded-[40px] text-sm sm:text-base font-normal tracking-wide lowercase cursor-pointer hover:brightness-95 active:brightness-90 transition-all shadow-sm focus:outline-none flex items-center gap-1.5"
          >
            <span>{t.infoModal.author.length ? t.closeButton : 'cerrar'}</span>
            <X size={16} />
          </button>
        </div>

        {/* Info Content with DM Sans */}
        <div className="w-full max-w-xl mx-auto px-6 py-8 sm:py-10 space-y-6 text-base sm:text-lg leading-relaxed text-black/90 font-normal">
          <p className="font-normal text-lg sm:text-xl text-black">
            {t.infoModal.title}
          </p>

          <p>{t.infoModal.p1}</p>

          <p>{t.infoModal.p2}</p>

          <p>{t.infoModal.p3}</p>

          <p>{t.infoModal.p4}</p>

          <div className="pt-4 space-y-1">
            <p className="italic">{t.infoModal.withLove}</p>
            <div className="flex items-center gap-2">
              <span className="font-normal">{t.infoModal.author}</span>
              <a
                href="https://lorenaorlando.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:opacity-80 transition-opacity cursor-pointer"
                title="Lorena Orlando"
              >
                <img
                  src="https://lorenalandia.fun/wp-content/uploads/2026/02/ME_ISLAND_TINY.png"
                  alt="Lorena Orlando"
                  width={25}
                  height={25}
                  referrerPolicy="no-referrer"
                  className="w-[25px] h-[25px] inline-block object-contain"
                  loading="eager"
                />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
