export type TrendDirection = 'up' | 'down' | 'flat';
export interface ScoreTrendProps {
  delta: string;
  direction: TrendDirection;
  meta?: string;
}
