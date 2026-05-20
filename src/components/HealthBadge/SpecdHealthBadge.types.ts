export type HealthBadgeTier = 'good' | 'med' | 'poor';

/**
 * Props for the SpecdHealthBadge (`<specd-health-badge>`) component.
 *
 * @example
 * <specd-health-badge tier="good" label="Healthy"></specd-health-badge>
 * <specd-health-badge tier="poor" label="Needs work"></specd-health-badge>
 */
export interface HealthBadgeProps {
  /** Health tier that controls colour: good (lime), med (amber), poor (red). @default 'good' */
  tier?: HealthBadgeTier;
  /** Text label displayed inside the badge. */
  label?: string;
}
