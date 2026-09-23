import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { ScoreTier } from './SpecdScoreRing.types.js';

/**
 * Specd DS — ScoreRing
 *
 * A conic-gradient score ring displaying a numeric score with tier colouring.
 * Animates in on mount/change: the ring sweeps from 0 to the target score
 * (CSS transition on the registered `--score-percentage` custom property,
 * see components.css) while the numeral counts up in sync, finishing with
 * a small spring "pop" — the one place `--easing-spring` is used per
 * DESIGN.md's motion guidance.
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

  /** Currently-displayed value, distinct from the target `score` — this is
   * what actually drives the ring/number so we can animate from 0 → score. */
  @state() private _displayed = 0;

  private _raf?: number;

  override connectedCallback(): void {
    super.connectedCallback();
    // Start the ring empty, then animate to the real score on the next
    // frame so the browser has a "from" value to transition/count from.
    this._displayed = 0;
    requestAnimationFrame(() => this._animateTo(this.score));
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('score') && changed.get('score') !== undefined) {
      this._animateTo(this.score);
    }
  }

  private _animateTo(target: number): void {
    if (this._raf) cancelAnimationFrame(this._raf);
    const from = this._displayed;
    const duration = 620; // matches --duration-slow-ish; count-up is JS-driven so it can ease independently of the CSS ring transition
    const start = performance.now();
    // easeOutCubic — quick start, gentle settle; distinct from the ring's
    // own CSS ease-in-out so the number "leads" the ring slightly.
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      this._displayed = Math.round(from + (target - from) * ease(t));
      if (t < 1) {
        this._raf = requestAnimationFrame(step);
      }
    };
    this._raf = requestAnimationFrame(step);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  override render() {
    const ratio = this.size / 104;
    const borderPx = Math.max(3, Math.round(8 * ratio));
    const numSize = Math.round(42 * ratio);
    const denomSize = Math.round(11 * ratio);
    const gapPx = Math.max(0, Math.round(2 * ratio));
    const styles = {
      '--score-percentage': String(this._displayed),
      '--w': `${this.size}px`,
      '--b': `${borderPx}px`,
    };
    return html`
      <div class="score-circle tier-${this.tier}" style=${styleMap(styles)}>
        <span class="score-number-lg" style=${styleMap({ fontSize: `${numSize}px`, lineHeight: '1' })}>${this._displayed}</span>
        <span class="score-denom-new" style=${styleMap({ fontSize: `${denomSize}px`, marginTop: `${gapPx}px` })}>/100</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-score-ring': SpecdScoreRing;
  }
}
