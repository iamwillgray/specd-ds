import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { TabItem } from './SpecdTabBar.types.js';

/**
 * Specd DS — TabBar
 *
 * A grid-based tab navigation bar supporting icons, badges, and configurable column count.
 *
 * @element specd-tab-bar
 *
 * @attr {string} tabs    - JSON array of TabItem objects
 * @attr {string} active  - ID of the active tab
 * @attr {number} columns - Number of columns in the grid (default 6)
 *
 * @fires specd-tab-change - Dispatched when a tab is clicked, detail: { id: string }
 *
 * @example
 * <specd-tab-bar tabs='[{"id":"a","label":"A"}]' active="a"></specd-tab-bar>
 */
@customElement('specd-tab-bar')
export class SpecdTabBar extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) tabs: string = '[]';
  @property({ type: String }) active: string = '';
  @property({ type: Number }) columns: number = 6;

  private _parsedTabs(): TabItem[] {
    try { return JSON.parse(this.tabs); } catch { return []; }
  }

  private _handleClick(id: string) {
    this.active = id;
    this.dispatchEvent(new CustomEvent('specd-tab-change', { detail: { id }, bubbles: true, composed: true }));
  }

  override render() {
    const tabs = this._parsedTabs();
    const gridStyle = styleMap({ gridTemplateColumns: `repeat(${this.columns}, 1fr)` });
    return html`
      <nav class="tab-bar-v2" style=${gridStyle}>
        ${tabs.map(t => html`
          <button
            class="tab-v2 ${this.active === t.id ? 'active' : ''}"
            @click=${() => this._handleClick(t.id)}
          >
            ${t.icon ? unsafeHTML(t.icon) : nothing}
            ${t.label}
            ${t.badge ? html`<span class="tab-badge">${t.badge}</span>` : nothing}
          </button>
        `)}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-tab-bar': SpecdTabBar;
  }
}
