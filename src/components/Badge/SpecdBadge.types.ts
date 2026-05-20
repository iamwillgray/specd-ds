export type BadgeIntent = 'positive' | 'negative' | 'warning' | 'neutral';

/**
 * Props for the SpecdBadge (`<specd-badge>`) component.
 *
 * @example
 * <specd-badge value="3" intent="negative"></specd-badge>
 * <specd-badge dot intent="positive"></specd-badge>
 */
export interface BadgeProps {
  /** Text or numeric value displayed in the badge. */
  value?: string | number;
  /** Colour intent. @default 'neutral' */
  intent?: BadgeIntent;
  /** Render as a dot (no text). @default false */
  dot?: boolean;
  /** Position badge as an anchored overlay (top-right of nearest relative parent). @default false */
  anchored?: boolean;
}
