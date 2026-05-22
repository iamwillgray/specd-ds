import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { ModalProps } from './SpecdModal.types.js';

const CLOSE_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;

/**
 * Specd DS — Modal
 *
 * @element specd-modal
 * @attr {boolean} open  - Whether the modal is visible
 * @attr {string}  title - Modal header title
 * @fires specd-close - Emitted when the modal is closed
 */
@customElement('specd-modal')
export class SpecdModal extends LitElement implements ModalProps {
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
        class="modal-dialog"
        aria-modal="true"
        aria-labelledby=${this.title ? 'modal-title' : nothing}
        @click=${(e: MouseEvent) => { if (e.target === e.currentTarget) this._close(); }}
        @cancel=${(e: Event) => { e.preventDefault(); this._close(); }}
      >
        <div class="modal-card">
          <div class="modal-header">
            <div class="modal-title" id="modal-title">${this.title}</div>
            <button class="modal-close-btn" @click=${() => this._close()}>${unsafeHTML(CLOSE_SVG)}</button>
          </div>
          <div class="modal-body"><slot></slot></div>
          <div class="modal-footer"><slot name="footer"></slot></div>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-modal': SpecdModal;
  }
}
