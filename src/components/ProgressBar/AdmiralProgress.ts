import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { ProgressBarProps, ProgressIntent } from './AdmiralProgress.types.js';

/**
 * Admiral DS — ProgressBar
 *
 * A horizontal progress indicator supporting determinate and indeterminate states.
 * Renders into light DOM.
 *
 * @element admiral-progress
 *
 * @attr {number} value      - Progress 0–100. Omit for indeterminate.
 * @attr {string} intent     - Fill colour: positive | warning | negative
 * @attr {number} height     - Track height in px (default 8)
 * @attr {string} aria-label - Accessible label
 *
 * @example
 * <admiral-progress value="65" intent="positive" aria-label="Health score"></admiral-progress>
 */
@customElement('admiral-progress')
export class AdmiralProgress extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Number }) value?: number;
  @property({ type: String }) intent?: ProgressIntent;
  @property({ type: Number }) height: number = 8;
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string = '';

  private _fillClasses(): string {
    return [
      'progress-fill',
      this.intent ? `progress-${this.intent}` : '',
    ].filter(Boolean).join(' ');
  }

  override render() {
    const isIndeterminate = this.value === undefined || this.value === null;
    const clampedValue = isIndeterminate ? 0 : Math.min(100, Math.max(0, this.value!));

    return html`
      <div
        class="progress-track"
        role="progressbar"
        aria-valuenow=${isIndeterminate ? nothing : clampedValue}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.ariaLabel || nothing}
        style=${styleMap({ height: `${this.height}px` })}
      >
        <div
          class=${this._fillClasses()}
          style=${styleMap({ width: isIndeterminate ? '100%' : `${clampedValue}%` })}
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admiral-progress': AdmiralProgress;
  }
}
