export type StatIntent = 'default' | 'positive' | 'negative' | 'warning' | 'neutral';
export interface StatTileSmProps {
  num: string;
  label: string;
  intent?: StatIntent;
}
