export type HealthBadgeTier = 'good' | 'med' | 'poor';
export type HealthBadgeSize = 'sm' | 'md';

/**
 * Props for the SpecdHealthBadge (`<specd-health-badge>`) component.
 *
 * @example
 * <specd-health-badge tier="good" label="Healthy"></specd-health-badge>
 * <specd-health-badge tier="poor" label="Needs work"></specd-health-badge>
 * <specd-health-badge size="sm" tier="good" label="87"></specd-health-badge>
 */
export interface HealthBadgeProps {
  /** Health tier that controls colour: good (lime/green), med (amber), poor (red). @default 'good' */
  tier?: HealthBadgeTier;
  /** Text label displayed inside the badge. */
  label?: string;
  /**
   * Size variant.
   * - `md` (default): full-width label badge with lime brand background.
   * - `sm`: compact score pill (replaces `specd-nav-score` use-case).
   * @default 'md'
   */
  size?: HealthBadgeSize;
}
