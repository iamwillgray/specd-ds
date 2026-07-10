import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const LOGO_SVG = `<svg width="28" height="28" viewBox="0 0 48 48" fill="none">
  <rect x="17" y="24.2427" width="10.2426" height="10.2426" rx="2" transform="rotate(-45 17 24.2427)" fill="white"/>
  <rect x="12.7071" y="24.101" width="16.1133" height="16.1133" rx="4.5" transform="rotate(-45 12.7071 24.101)" stroke="white" stroke-width="1.2"/>
  <rect x="7.70711" y="23.9664" width="22.9942" height="23.0891" rx="7.5" transform="rotate(-45 7.70711 23.9664)" stroke="white" stroke-width="1.2"/>
</svg>`;

const REFRESH_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-3.51-7.13"/><polyline points="21 4 21 10 15 10"/></svg>`;
const EXPORT_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
const SETTINGS_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;

/**
 * Specd DS — AppHeader
 *
 * Application header with Specd logo, plugin name, action buttons, and a
 * default slot positioned between the plugin name and the action buttons.
 *
 * Use the slot to inject contextual chips (score badge, status indicator,
 * etc.) that sit inline with the brand bar — e.g. the Pulse score badge:
 *
 * ```html
 * <specd-app-header name="Pulse" showrefresh showsettings>
 *   <span class="nav-score-badge hidden" id="nav-score-badge"></span>
 * </specd-app-header>
 * ```
 *
 * @element specd-app-header
 *
 * @attr {string}  name         - Plugin name displayed in header (default "Pulse")
 * @attr {boolean} showrefresh  - Show the refresh button
 * @attr {boolean} showexport   - Show the export/download button
 * @attr {boolean} showsettings - Show the settings button
 *
 * @slot - Children rendered between the plugin name and the action buttons.
 *
 * @fires specd-refresh  - Dispatched when refresh button is clicked
 * @fires specd-export   - Dispatched when export button is clicked
 * @fires specd-settings - Dispatched when settings button is clicked
 */
@customElement('specd-app-header')
export class SpecdAppHeader extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) name: string = 'Pulse';
  @property({ type: Boolean, attribute: 'showrefresh' }) showrefresh: boolean = false;
  @property({ type: Boolean, attribute: 'showexport' }) showexport: boolean = false;
  @property({ type: Boolean, attribute: 'showsettings' }) showsettings: boolean = false;

  /** Initial children captured before Lit replaces them with the render template. */
  private _capturedSlot: Node[] = [];

  override connectedCallback() {
    super.connectedCallback();
    if (!this._capturedSlot.length) {
      this._capturedSlot = Array.from(this.childNodes).filter(n => {
        if (n.nodeType === Node.TEXT_NODE) return (n.textContent || '').trim().length > 0;
        return n.nodeType === Node.ELEMENT_NODE;
      });
    }
  }

  override updated() {
    // Light-DOM <slot> doesn't auto-project — manually reattach captured
    // children into the placeholder anchor each render cycle.
    const anchor = this.querySelector(':scope > .app-header-v2 > .app-header-slot') as HTMLElement | null;
    if (anchor) {
      this._capturedSlot.forEach(node => {
        if (node.parentNode !== anchor) anchor.appendChild(node);
      });
    }
  }

  override render() {
    return html`
      <header class="app-header-v2">
        <div class="logo-mark">${unsafeHTML(LOGO_SVG)}</div>
        <div class="header-text"><div class="header-name">${this.name}</div></div>
        <span class="app-header-slot"></span>
        ${this.showrefresh ? html`<button class="header-icon-btn" title="Refresh" @click=${() => this.dispatchEvent(new CustomEvent('specd-refresh', { bubbles: true, composed: true }))}>${unsafeHTML(REFRESH_SVG)}</button>` : nothing}
        ${this.showexport ? html`<button class="header-icon-btn" title="Export" @click=${() => this.dispatchEvent(new CustomEvent('specd-export', { bubbles: true, composed: true }))}>${unsafeHTML(EXPORT_SVG)}</button>` : nothing}
        ${this.showsettings ? html`<button class="header-icon-btn" title="Settings" @click=${() => this.dispatchEvent(new CustomEvent('specd-settings', { bubbles: true, composed: true }))}>${unsafeHTML(SETTINGS_SVG)}</button>` : nothing}
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-app-header': SpecdAppHeader;
  }
}
