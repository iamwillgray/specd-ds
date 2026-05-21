export type ChoiceCardVariant = 'default' | 'gradient';

export interface ChoiceCardProps {
  title: string;
  description?: string;
  variant?: ChoiceCardVariant;
  pill?: string;
}
