export type BadgeIntent = 'positive' | 'negative' | 'warning' | 'neutral';

/**
 * Props for the AdmiralBadge (`<admiral-badge>`) component.
 *
 * @example
 * <admiral-badge value="3" intent="negative"></admiral-badge>
 * <admiral-badge dot intent="positive"></admiral-badge>
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
