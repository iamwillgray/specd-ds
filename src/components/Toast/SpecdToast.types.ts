export type ToastIntent = 'default' | 'positive' | 'warning' | 'negative';

export interface ToastProps {
  title: string;
  description?: string;
  intent?: ToastIntent;
  duration?: number;
}
