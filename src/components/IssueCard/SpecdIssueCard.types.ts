export type IssueSeverity = 'crit' | 'warn' | 'info';

export interface IssueTag {
  label: string;
  sub?: string;
  severity: IssueSeverity;
}

export interface IssueCardProps {
  name: string;
  count: number;
  severity: IssueSeverity;
  tags?: IssueTag[];
  icon?: string;
}
