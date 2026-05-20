export type SbPillIntent = 'good' | 'bad' | 'muted';

/**
 * Props for the SpecdSbPill (`<specd-sb-pill>`) component.
 *
 * @example
 * <specd-sb-pill intent="good" label="Matched"></specd-sb-pill>
 * <specd-sb-pill intent="bad" label="Missing"></specd-sb-pill>
 */
export interface SbPillProps {
  /** Intent variant controlling colour. @default 'muted' */
  intent?: SbPillIntent;
  /** Text label displayed inside the pill. */
  label?: string;
}
