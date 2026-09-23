export interface DiffRowProps {
  field: string;
  before?: string;
  beforeEmpty?: string;
  after: string;
  multiline?: boolean;
  staged?: boolean;
  committed?: boolean;
  /** Shows a "Generate" affordance in the empty state — only for fields an
   * AI/heuristic pass could plausibly fill in (e.g. a description), not a
   * URL or a value only a human can know. */
  generatable?: boolean;
}
