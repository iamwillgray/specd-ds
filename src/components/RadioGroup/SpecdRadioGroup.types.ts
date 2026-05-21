export interface RadioOption {
  value: string;
  label: string;
  hint?: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  name: string;
  inline?: boolean;
}
