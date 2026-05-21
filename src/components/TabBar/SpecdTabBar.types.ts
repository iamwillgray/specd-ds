export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
}

export interface TabBarProps {
  tabs: TabItem[];
  active: string;
  columns?: number;
}
