export type SkeletonVariant = 'text' | 'rect' | 'circle';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
  lines?: number;
}
