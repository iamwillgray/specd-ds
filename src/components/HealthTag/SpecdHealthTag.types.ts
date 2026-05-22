export type HealthTagTier = 'good' | 'med' | 'poor';
export type HealthTagSize = 'sm' | 'md';

export interface HealthTagProps {
  tier?: HealthTagTier;
  label?: string;
  size?: HealthTagSize;
}
