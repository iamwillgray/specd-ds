export type AlertIntent = 'neutral' | 'positive' | 'warning' | 'negative';

export interface AlertProps {
  intent?: AlertIntent;
  title?: string;
  description?: string;
}
