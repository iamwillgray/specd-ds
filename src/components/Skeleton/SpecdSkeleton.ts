import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { SkeletonVariant, SkeletonProps } from './SpecdSkeleton.types.js';

/**
 * Specd DS — Skeleton
 *
 * Loading placeholder in text, rect, or circle variants.
 *
 * @element specd-skeleton
 * @attr {string} variant - text | rect | circle
 * @attr {string} width   - CSS width (for rect/circle)
 * @attr {string} height  - CSS height (for rect)
 * @attr {number} lines   - Number of text skeleton lines
 */
@customElement('specd-skeleton')
export class SpecdSkeleton extends LitElement implements SkeletonProps {
  override createRenderRoot() { return this; }

  @property({ type: String }) variant: SkeletonVariant = 'text';
  @property({ type: String }) width?: string;
  @property({ type: String }) height?: string;
  @property({ type: Number }) lines: number = 1;

  override render() {
    if (this.variant === 'text') {
      const count = this.lines > 0 ? this.lines : 1;
      const lines = Array.from({ length: count }, (_, i) => html`
        <div class="skeleton skeleton-text" style=${i === count - 1 && count > 1 ? 'width:60%' : ''}></div>
      `);
      return html`<div>${lines}</div>`;
    }
    const cls = this.variant === 'circle' ? 'skeleton skeleton-circle' : 'skeleton skeleton-rect';
    const styles: Record<string, string> = {};
    if (this.width) styles['width'] = this.width;
    if (this.height) styles['height'] = this.height;
    if (this.variant === 'circle' && this.width) styles['height'] = this.width;
    return html`<div class=${cls} style=${styleMap(styles)}></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-skeleton': SpecdSkeleton;
  }
}
