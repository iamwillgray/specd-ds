export type StatTileColor = 'default' | 'green' | 'red' | 'blue' | 'amber';
export type TrendDir = 'up' | 'down' | 'flat';
export interface StatTileLgProps {
  num: string;
  title: string;
  subtitle?: string;
  trend?: string;
  trenddir?: TrendDir;
  color?: StatTileColor;
  icon?: string;
}
