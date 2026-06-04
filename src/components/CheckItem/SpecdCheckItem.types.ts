export type CheckState = 'pass' | 'fail' | 'warn';
export interface CheckItemProps { label: string; sub?: string; state: CheckState; }
