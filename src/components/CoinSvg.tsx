import React from 'react';
import { CoinResult } from '../types';

interface CoinSvgProps {
  type: CoinResult;
  className?: string;
  size?: number | string;
}

const COIN_IMAGES: Record<CoinResult, string> = {
  empty: 'https://sandboxlandia.online/wp-content/uploads/2026/08/QUESTION.png',
  up: 'https://sandboxlandia.online/wp-content/uploads/2026/08/YES.png',
  down: 'https://sandboxlandia.online/wp-content/uploads/2026/08/NO.png',
  question: 'https://sandboxlandia.online/wp-content/uploads/2026/08/QUESTION.png',
};

export const CoinSvg: React.FC<CoinSvgProps> = ({
  type = 'empty',
  className = '',
  size = '100%',
}) => {
  const imageUrl = COIN_IMAGES[type] || COIN_IMAGES.empty;

  return (
    <img
      src={imageUrl}
      alt={`Moneda ${type}`}
      width={size}
      height={size}
      referrerPolicy="no-referrer"
      className={`select-none object-contain pointer-events-none ${className}`}
      loading="eager"
      decoding="async"
    />
  );
};
