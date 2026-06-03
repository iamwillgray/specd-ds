import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { StepScoreTier } from './SpecdStepScore.types.js';

const TIERS: StepScoreTier[] = ['bad', 'poor', 'ok', 'good', 'great'];

/**
 * Specd DS — StepScore
 *
 * A 5-segment rating bar (bad → great) sized to occupy the same footprint as a
 * coverage progress bar. The number of filled segments equals the tier's
 * 1-based position (bad = 1 … great = 5) and the fill is tinted by tier. An
 * optional trailing label shows the tier word.
 *
 * Used for non-percentage scores like Description Quality where a stepped
 * rating reads more clearly than a bar + %.
 *
 * @element specd-step-score
 *
 * @attr {string}  tier    - bad | poor | ok | good | great
 * @attr {boolean} nolabel - Hide the trailing tier-word label
 *
 * @example
 * <specd-step-score tier="good"></specd-step-score>
 * <specd-step-score tier="great" nolabel></specd-step-score>
 */
@customElement('specd-step-score')
export class SpecdStepScore extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) tier: StepScoreTier = 'ok';
  @property({ type: Boolean }) nolabel: boolean = false;

  override render() {
    const filled = TIERS.indexOf(this.tier) + 1; // bad=1 … great=5
    const segs = TIERS.map((_, i) =>
      html`<span class="step-seg ${i < filled ? 'on' : ''}"></span>`);
    return html`
      <span class="step-score tier-${this.tier}">${segs}</span>
      ${this.nolabel
        ? nothing
        : html`<span class="step-score-label tier-${this.tier}">${this.tier}</span>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-step-score': SpecdStepScore;
  }
}
