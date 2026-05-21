import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { TrendDirection } from './SpecdScoreTrend.types.js';

/**
 * Specd DS — ScoreTrend
 *
 * Displays a score trend delta with directional colouring and optional meta text.
 *
 * @element specd-score-trend
 *
 * @attr {string} delta     - Delta value string, e.g. "+4.2"
 * @attr {string} direction - Trend direction: up | down | flat
 * @attr {string} meta      - Optional meta label, e.g. "vs last scan"
 *
 * @example
 * <specd-score-trend delta="+4.2" direction="up" meta="vs last scan"></specd-score-trend>
 */
@customElement('specd-score-trend')
export class SpecdScoreTrend extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) delta: string = '';
  @property({ type: String }) direction: TrendDirection = 'flat';
  @property({ type: String }) meta?: string;

  override render() {
    return html`
      <div class="score-trend">
        <span class="score-trend-delta ${this.direction}">${this.delta}</span>
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
