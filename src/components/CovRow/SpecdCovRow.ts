import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { CovTier } from './SpecdCovRow.types.js';

@customElement('specd-cov-row')
export class SpecdCovRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: Number }) pct: number = 0;
  @property({ type: String }) tier?: CovTier;
  @property({ type: String }) icon?: string;

  private _derivedTier(): CovTier {
    if (this.tier) return this.tier;
    if (this.pct >= 80) return 'excellent';
    if (this.pct >= 60) return 'good';
    if (this.pct >= 40) return 'med';
    return 'poor';
  }

  override render() {
    const t = this._derivedTier();
    const fillClass = t === 'excellent' ? 'cov-excellent' : t === 'good' ? 'cov-good' : t === 'med' ? 'cov-med' : 'cov-poor';
    const chipLabel = t === 'excellent' ? 'EXC' : t === 'good' ? 'GOOD' : t === 'med' ? 'MED' : 'POOR';
    return html`
      <div class="cov-row-v2">
        <div class="cov-details">
          ${this.icon ? html`<span class="cov-icon">${unsafeHTML(this.icon)}</span>` : nothing}
          <span class="cov-label">${this.label}</span>
        </div>
        <div class="cov-scoring">
          <span class="cov-status-chip tier-${t}">${chipLabel}</span>
          <div class="cov-bar-track">
            <div class="cov-fill ${fillClass}" style=${styleMap({ width: `${this.pct}%` })}></div>
          </div>
          <span class="cov-pct">${this.pct}%</span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-cov-row': SpecdCovRow;
  }
}
