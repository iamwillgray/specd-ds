export type ScoreTier = 'excellent' | 'good' | 'med' | 'poor';
export interface ScoreRingProps {
  score: number;
  tier: ScoreTier;
  size?: number;
}
