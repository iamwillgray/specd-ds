/** Figma component-property kinds a prop row can represent. */
export type PropRowType = 'VARIANT' | 'BOOLEAN' | 'TEXT' | 'INSTANCE_SWAP';

export interface PropRowProps {
  /** Canonical prop name shown as the row title. */
  name: string;
  /** Prop type — drives the leading badge colour + label. */
  ptype: PropRowType;
  /** Muted one-line summary (e.g. expected values or aliases). */
  summary?: string;
}
