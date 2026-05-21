import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { ProgressIntent } from './SpecdProgress.types.js';

/**
 * Specd DS — Progress
 *
 * Linear progress bar with optional intent colour and indeterminate state.
 *
 * @element specd-progress
 *
 * @attr {number}  value      - 0–100 percentage; omit for indeterminate
 * @attr {string}  intent     - Colour: positive | warning | negative
 * @attr {number}  height     - Bar height in px (default 8)
 * @attr {string}  aria-label - Accessible label
 */
@customElement('specd-progress')
export class SpecdProgress extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Number }) value?: number;
  @property({ type: String }) intent?: ProgressIntent;
  @property({ type: Number }) height: number = 8;
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string = '';

  override render() {
    const isIndeterminate = this.value === undefined || this.value === null;
    const clamped = isIndeterminate ? 0 : Math.min(100, Math.max(0, this.value!));
    const fillClass = [
      'progress-bar-fill',
      this.intent === 'positive' ? 'positive' : '',
      this.intent === 'warning'  ? 'warning'  : '',
      this.intent === 'negative' ? 'negative' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div
        class="progress-bar${isIndeterminate ? ' indeterminate' : ''}"
        role="progressbar"
        aria-valuenow=${isIndeterminate ? nothing : clamped}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.ariaLabel || nothing}
        style=${styleMap({ height: `${this.height}px` })}
      >
        <div class=${fillClass} style=${styleMap({ width: `${clamped}%` })}></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-progress': SpecdProgress; }
}
