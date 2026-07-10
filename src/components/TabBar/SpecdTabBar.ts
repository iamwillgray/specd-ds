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
    // Build a flat string of data-* attributes per tab so callers can route
    // tabs to existing selectors via `data: { panel: 'panel-overview' }`.
    const dataAttrStr = (data?: Record<string, string>): string => {
      if (!data) return '';
      return Object.entries(data)
        .map(([k, v]) => `data-${k}="${String(v).replace(/"/g, '&quot;')}"`)
        .join(' ');
    };
    return html`
      <nav class="tab-bar-v2" style=${gridStyle}>
        ${tabs.map(t => {
          const cls = `tab-v2 ${this.active === t.id ? 'active' : ''}`;
          const dataPart = dataAttrStr(t.data);
          // Always render a badge span (hidden when no value) so the host can
          // address it via `[data-badge-for="${id}"]` even before a count is
          // known. This restores the addressable pattern the original Pulse
          // plugin relied on (`#badge-issues`, `#badge-components`, etc).
          const hasBadge = t.badge !== undefined && t.badge !== null && t.badge !== 0;
          const badgeText = hasBadge ? String(t.badge) : '';
          const badgeHidden = hasBadge ? '' : ' hidden';
          const badgeHtml = `<span class="tab-badge${badgeHidden}" data-badge-for="${t.id}">${badgeText}</span>`;
          const buttonHtml = `<button class="${cls}" data-tab-id="${t.id}" ${dataPart}>${t.icon ?? ''}${t.label}${badgeHtml}</button>`;
          return html`${unsafeHTML(buttonHtml)}`;
        })}
      </nav>
    `;
  }

  override firstUpdated() { this._wireClicks(); }
  override updated() { this._wireClicks(); }

  private _wireClicks() {
    // Wire clicks via DOM since `unsafeHTML` doesn't support Lit @click bindings.
    this.querySelectorAll<HTMLButtonElement>('.tab-v2[data-tab-id]').forEach(btn => {
      if ((btn as HTMLButtonElement & { _wired?: boolean })._wired) return;
      (btn as HTMLButtonElement & { _wired?: boolean })._wired = true;
      btn.addEventListener('click', () => this._handleClick(btn.dataset.tabId || ''));
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-tab-bar': SpecdTabBar;
  }
}
