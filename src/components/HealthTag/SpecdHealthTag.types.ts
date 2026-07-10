export type HealthTagTier = 'good' | 'med' | 'poor' | 'excellent';
export type HealthTagSize = 'xs' | 'sm' | 'md';

export interface HealthTagProps {
  tier?: HealthTagTier;
  label?: string;
  size?: HealthTagSize;
  /** Hide the leading dot indicator */
  nodot?: boolean;
}
