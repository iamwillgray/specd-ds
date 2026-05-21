export type SparklineIntent = 'default' | 'positive' | 'negative';

export interface SparklineProps {
  values: number[];
  width?: number;
  height?: number;
  intent?: SparklineIntent;
}
