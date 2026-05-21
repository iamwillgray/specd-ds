export type CovTier = 'excellent' | 'good' | 'med' | 'poor';
export interface CovRowProps {
  label: string;
  pct: number;
  tier?: CovTier;
  icon?: string;
}
