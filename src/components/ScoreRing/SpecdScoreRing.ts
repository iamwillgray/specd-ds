import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { ScoreTier } from './SpecdScoreRing.types.js';

/**
 * Specd DS — ScoreRing
 *
 * A conic-gradient score ring displaying a numeric score with tier colouring.
 *
 * @element specd-score-ring
 *
 * @attr {number} score - Score value 0–100
 * @attr {string} tier  - Score tier: excellent | good | med | poor
 * @attr {number} size  - Ring diameter in px (default 104)
 *
 * @example
 * <specd-score-ring score="74" tier="good"></specd-score-ring>
 */
@customElement('specd-score-ring')
export class SpecdScoreRing extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Number }) score: number = 0;
  @property({ type: String }) tier: ScoreTier = 'good';
  @property({ type: Number }) size: number = 104;

  override render() {
    const styles = {
      '--score-percentage': String(this.score),
      '--w': `${this.size}px`,
    };
    const numSize = Math.round(42 * (this.size / 104));
    const denomSize = Math.round(12 * (this.size / 104));
    return html`
      <div class="score-circle tier-${this.tier}" style=${styleMap(styles)}>
        <span class="score-number-lg" style=${styleMap({ fontSize: `${numSize}px` })}>${this.score}</span>
        <span class="score-denom-new" style=${styleMap({ fontSize: `${denomSize}px` })}>/100</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-score-ring': SpecdScoreRing;
  }
}
