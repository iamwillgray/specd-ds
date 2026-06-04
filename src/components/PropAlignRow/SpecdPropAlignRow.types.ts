export interface PropAlignRowProps {
  /** The component prop name (shown bold). */
  propname: string;
  /** Issue description, e.g. "should be Variant" or "has no global definition". */
  detail?: string;
  /** Primary action label, e.g. "Rename → Variant" / "Use preset status". */
  action?: string;
  /** Optional secondary action label, e.g. "Assign to another…". */
  secondary?: string;
  /** Render the primary action in a completed/applied state. */
  done?: boolean;
}
