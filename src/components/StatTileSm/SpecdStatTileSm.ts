import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { StatIntent } from './SpecdStatTileSm.types.js';

@customElement('specd-stat-tile-sm')
export class SpecdStatTileSm extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) num: string = '';
  @property({ type: String }) label: string = '';
  @property({ type: String }) intent: StatIntent = 'default';

  override render() {
    const extraClass = this.intent !== 'default' ? ` ${this.intent}` : '';
    return html`
      <div class="stat-tile-sm${extraClass}">
        <div class="stat-tile-sm-num">${this.num}</div>
        <div class="stat-tile-sm-label">${this.label}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-stat-tile-sm': SpecdStatTileSm;
  }
}
