export type CardElevation = 'elevated' | 'flat' | 'inset';

/**
 * Props for the SpecdCard (`<specd-card>`) component.
 *
 * @example
 * <specd-card elevation="elevated">
 *   <p>Card content via slot</p>
 * </specd-card>
 */
export interface CardProps {
  /** Raw HTML string rendered inside the card. When omitted, slot content is used. */
  content?: string;
  /** Visual elevation style. @default 'elevated' */
  elevation?: CardElevation;
  /** Wrap content in a .card-inner div. @default true */
  inner?: boolean;
  /** Extra CSS classes on the root .card element. */
  cls?: string;
}
