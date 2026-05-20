import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { JumpBtnProps } from './SpecdJumpBtn.types.js';

/**
 * Specd DS — JumpBtn
 *
 * A ghost small button with an arrow-up-right icon for jumping to a layer in Figma.
 * Fires a native click event.
 *
 * @element specd-jump-btn
 *
 * @attr {string} label - Button label text
 *
 * @example
 * <specd-jump-btn label="Jump to layer"></specd-jump-btn>
 */
@customElement('specd-jump-btn')
export class SpecdJumpBtn extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = 'Jump to layer';

  override render() {
    return html`
      <button class="btn-jump">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 17L17 7M8 7h9v9"/>
        </svg>
        ${this.label}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-jump-btn': SpecdJumpBtn;
  }
}
