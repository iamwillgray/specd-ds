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

  override render() {
    if (!this.open) return nothing;
    return html`
      <div class="modal-backdrop" @click=${(e: Event) => { if (e.target === e.currentTarget) this._close(); }}>
        <div class="modal-card" @click=${(e: Event) => e.stopPropagation()}>
          <div class="modal-header">
            <div class="modal-title">${this.title}</div>
            <button class="modal-close-btn" @click=${() => this._close()}>${unsafeHTML(CLOSE_SVG)}</button>
          </div>
          <div class="modal-body"><slot></slot></div>
          <div class="modal-footer"><slot name="footer"></slot></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-modal': SpecdModal;
  }
}
