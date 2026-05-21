export interface CheckboxOption {
  value: string;
  label: string;
  hint?: string;
}

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  values: string[];
  inline?: boolean;
}
