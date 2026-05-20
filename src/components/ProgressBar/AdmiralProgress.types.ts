export type ProgressIntent = 'positive' | 'warning' | 'negative';

/**
 * Props for the AdmiralProgress (`<admiral-progress>`) component.
 *
 * @example
 * <admiral-progress value="72" intent="positive"></admiral-progress>
 * <admiral-progress aria-label="Loading…"></admiral-progress>  <!-- indeterminate -->
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
