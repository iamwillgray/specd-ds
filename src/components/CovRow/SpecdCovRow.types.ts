export type CovTier = 'excellent' | 'good' | 'med' | 'poor';
export interface CovRowProps {
  label: string;
  pct: number;
  tier?: CovTier;
  icon?: string;
  /** Explains why this metric is scored the way it is — "Show your work" (DESIGN.md).
   * Renders an info-trigger next to the label; consuming apps should listen for the
   * `specd-info` event to show a full tooltip/popover, per the InfoTrigger component. */
  hint?: string;
}
