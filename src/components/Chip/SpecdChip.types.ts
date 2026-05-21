export type ChipSeverity = 'crit' | 'warn';
export type ChipIntent = 'positive' | 'negative' | 'warning' | 'dark';

export interface ChipProps {
  label: string;
  count?: number;
  active?: boolean;
  severity?: ChipSeverity;
  intent?: ChipIntent;
  cls?: string;
}
