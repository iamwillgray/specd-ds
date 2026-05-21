export type SeverityIntent = 'critical' | 'warning' | 'info';
export interface SeverityHeaderProps {
  intent: SeverityIntent;
  label: string;
  count?: number;
}
