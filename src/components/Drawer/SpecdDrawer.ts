import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { DrawerProps } from './SpecdDrawer.types.js';

const CLOSE_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;

/**
 * Specd DS — Drawer
 *
 * @element specd-drawer
 * @attr {boolean} open  - Whether the drawer is visible
 * @attr {string}  title - Drawer header title
 * @fires specd-close - Emitted when the drawer is closed
 */
@customElement('specd-drawer')
export class SpecdDrawer extends LitElement implements DrawerProps {
  override createRenderRoot() { return this; }

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: String }) title: string = '';

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('specd-close', { bubbles: true, composed: true }));
  }

  override updated(changed: Map<string, unknown>) {
    if (!changed.has('open')) return;
    const dialog = this.querySelector('dialog') as HTMLDialogElement | null;
    if (!dialog) return;
    if (this.open) {
      try { dialog.showModal(); } catch { /* happy-dom may not support showModal */ }
    } else {
      try { dialog.close(); } catch { /* already closed */ }
    }
  }

  override render() {
    if (!this.open) return nothing;
    return html`
      <dialog
        class="drawer-dialog"
        aria-modal="true"
        aria-labelledby=${this.title ? 'drawer-title' : nothing}
        @cancel=${(e: Event) => { e.preventDefault(); this._close(); }}
      >
        <div class="drawer-panel">
          <div class="drawer-header">
            <div class="drawer-title" id="drawer-title">${this.title}</div>
            <button class="modal-close-btn" @click=${() => this._close()}>${unsafeHTML(CLOSE_SVG)}</button>
          </div>
          <div class="drawer-body"><slot></slot></div>
          <div class="drawer-footer"><slot name="footer"></slot></div>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-drawer': SpecdDrawer;
  }
}
