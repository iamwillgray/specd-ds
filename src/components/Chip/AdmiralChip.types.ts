export type ChipSeverity = 'crit' | 'warn';

/**
 * Props for the AdmiralChip (`<admiral-chip>`) component.
 *
 * @example
 * <admiral-chip label="Critical" count="3" severity="crit" active></admiral-chip>
 */
export interface ChipProps {
  /** Display label text. */
  label: string;
  /** Optional count badge shown after label. */
  count?: number;
  /** Whether the chip is in the active/selected state. @default false */
  active?: boolean;
  /** Severity tint applied to the count badge. */
  severity?: ChipSeverity;
  /** Value for data-filter attribute (filter wiring). */
  dataFilter?: string;
  /** Extra CSS class(es) on the root element. */
  cls?: string;
}
