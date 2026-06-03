/** 5-tier rating from worst to best, mirroring the plugin's DescriptionTier. */
export type StepScoreTier = 'bad' | 'poor' | 'ok' | 'good' | 'great';

export interface StepScoreProps {
  /** Which tier the score falls on. Determines fill count + colour. */
  tier: StepScoreTier;
  /** Hide the trailing tier-word label (show segments only). */
  nolabel?: boolean;
}
