export type ChoiceCardVariant = 'default' | 'gradient';
export type ChoiceCardIconVariant = 'default' | 'gradient';
export type ChoiceCardPillColor = 'mint' | 'blue';

export interface ChoiceCardProps {
  title?: string;
  description?: string;
  variant?: ChoiceCardVariant;
  pill?: string;
  pillcolor?: ChoiceCardPillColor;
  icon?: string;
  iconvariant?: ChoiceCardIconVariant;
  disabled?: boolean;
}
