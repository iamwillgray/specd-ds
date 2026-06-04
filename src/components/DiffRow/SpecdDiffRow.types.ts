export interface DiffRowProps {
  field: string;
  before?: string;
  beforeEmpty?: string;
  after: string;
  multiline?: boolean;
  staged?: boolean;
  committed?: boolean;
}
