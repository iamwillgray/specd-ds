export type InteractiveTagVariant = 'matched' | 'missing' | 'muted';

export interface InteractiveTagProps {
  variant: InteractiveTagVariant;
  label: string;
}
