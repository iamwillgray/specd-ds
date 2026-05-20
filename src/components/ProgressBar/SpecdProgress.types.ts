export type ProgressIntent = 'positive' | 'warning' | 'negative';

/**
 * Props for the SpecdProgress (`<specd-progress>`) component.
 *
 * @example
 * <specd-progress value="72" intent="positive"></specd-progress>
 * <specd-progress aria-label="Loading…"></specd-progress>  <!-- indeterminate -->
 */
export interface ProgressBarProps {
  /** Progress value 0–100. Omit for indeterminate. */
  value?: number;
  /** Colour intent applied to the fill bar. */
  intent?: ProgressIntent;
  /** Height of the track in pixels. @default 8 */
  height?: number;
  /** Accessible label for the progress bar. */
  ariaLabel?: string;
}
