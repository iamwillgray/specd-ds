export type InputType = 'text' | 'number' | 'password' | 'url' | 'email' | 'date' | 'search';

/**
 * Props for the AdmiralInput (`<admiral-input>`) component.
 *
 * @example
 * <admiral-input placeholder="Search components…" search></admiral-input>
 */
export interface InputProps {
  /** HTML input type. @default 'text' */
  type?: InputType;
  /** HTML id attribute on the inner input. */
  id?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Current value. */
  value?: string;
  /** Disabled state. @default false */
  disabled?: boolean;
  /** Adds table-search style class. @default false */
  search?: boolean;
  /** Extra CSS classes on the inner input. */
  cls?: string;
}
