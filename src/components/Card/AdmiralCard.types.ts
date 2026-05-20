export type CardElevation = 'elevated' | 'flat' | 'inset';

/**
 * Props for the AdmiralCard (`<admiral-card>`) component.
 *
 * @example
 * <admiral-card elevation="elevated">
 *   <p>Card content via slot</p>
 * </admiral-card>
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
