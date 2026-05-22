import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { StatTileColor, TrendDir } from './SpecdStatTileLg.types.js';

const DEFAULT_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`;

@customElement('specd-stat-tile-lg')
export class SpecdStatTileLg extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) num: string = '0';
  @property({ type: String }) title: string = '';
  @property({ type: String }) subtitle?: string;
  @property({ type: String }) trend?: string;
  @property({ type: String }) trenddir: TrendDir = 'flat';
  @property({ type: String }) color: StatTileColor = 'default';
  @property({ type: String }) icon?: string;

  override render() {
    const arrowSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    const trendArrow = this.trenddir === 'up'
      ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`
      : this.trenddir === 'down'
      ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`
      : '';
    const iconSvg = this.icon ?? DEFAULT_ICON;
    return html`
      <button class="stat-tile-lg ${this.color !== 'default' ? this.color : ''}">
        <div class="stat-tile-header">
          <div class="stat-tile-icon">${unsafeHTML(iconSvg)}</div>
          <span class="stat-tile-title">${this.title}</span>
          <span class="stat-tile-arrow">${unsafeHTML(arrowSvg)}</span>
        </div>
        <div class="stat-tile-lg-num">${this.num}</div>
        ${this.subtitle ? html`<div class="stat-tile-subtitle">${this.subtitle}</div>` : nothing}
        ${this.trend ? html`<div class="stat-trend-pill ${this.trenddir}">${unsafeHTML(trendArrow)} ${this.trend}</div>` : nothing}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-stat-tile-lg': SpecdStatTileLg;
  }
}
