import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../Sparkline/SpecdSparkline.js';
import type { TrendDirection } from './SpecdScoreTrend.types.js';

/**
 * Specd DS — ScoreTrend
 *
 * Displays a score trend delta with directional colouring and optional meta text.
 * Can render an inline sparkline when `values` is provided.
 *
 * @element specd-score-trend
 *
 * @attr {string} delta     - Delta value string, e.g. "+4.2"
 * @attr {string} direction - Trend direction: up | down | flat
 * @attr {string} meta      - Optional meta label, e.g. "vs last scan"
 * @attr {string} values    - Optional JSON array of numbers; renders an inline sparkline
 * @attr {number} sparkwidth  - Sparkline width in px (default 60)
 * @attr {number} sparkheight - Sparkline height in px (default 16)
 *
 * @example
 * <specd-score-trend delta="+4.2" direction="up" meta="vs last scan"></specd-score-trend>
 * <specd-score-trend delta="+4.2" direction="up" values="[12,18,17,22,24,28]"></specd-score-trend>
 */
@customElement('specd-score-trend')
export class SpecdScoreTrend extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) delta: string = '';
  @property({ type: String }) direction: TrendDirection = 'flat';
  @property({ type: String }) meta?: string;
  @property({ type: String }) values?: string;
  @property({ type: Number }) sparkwidth: number = 60;
  @property({ type: Number }) sparkheight: number = 16;

  private _arrow() {
    if (this.direction === 'up')   return html`<svg class="score-trend-arrow" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 15 12 9 18 15"/></svg>`;
    if (this.direction === 'down') return html`<svg class="score-trend-arrow" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
    return html`<svg class="score-trend-arrow" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
  }

  private _sparkIntent(): 'positive' | 'negative' | 'default' {
    if (this.direction === 'up')   return 'positive';
    if (this.direction === 'down') return 'negative';
    return 'default';
  }

  override render() {
    return html`
      <div class="score-trend">
        <span class="score-trend-delta ${this.direction}">
          ${this._arrow()}
          ${this.delta}
        </span>
        ${this.values ? html`
          <specd-sparkline
            class="score-trend-spark"
            .values=${this.values}
            width=${this.sparkwidth}
            height=${this.sparkheight}
            intent=${this._sparkIntent()}
          ></specd-sparkline>
        ` : nothing}
        ${this.meta ? html`<span class="score-trend-meta">${this.meta}</span>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-score-trend': SpecdScoreTrend;
  }
}
