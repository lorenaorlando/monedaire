import React from 'react';
import { CoinResult } from '../types';

interface CoinSvgProps {
  type: CoinResult;
  className?: string;
  size?: number | string;
}

const COIN_IMAGES: Record<CoinResult, string> = {
  empty: 'https://lorenalandia.fun/wp-content/uploads/2026/08/COIN_EMPTY.png',
  up: 'https://lorenalandia.fun/wp-content/uploads/2026/08/coin.png',
  down: 'https://lorenalandia.fun/wp-content/uploads/2026/08/coindown.png',
  question: 'https://lorenalandia.fun/wp-content/uploads/2026/08/COIN_INT.png',
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
