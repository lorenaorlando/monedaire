export type CoinResult = 'up' | 'down' | 'question' | 'empty';

export type Language = 'esp' | 'eng';

export interface LogEntry {
  id: string;
  result: 'up' | 'down' | 'question';
  topic: string;
  timestamp: number;
}
