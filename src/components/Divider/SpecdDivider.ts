import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DividerProps } from './SpecdDivider.types.js';

/**
 * Specd DS — Divider
 *
 * @element specd-divider
 * @attr {string} label - Optional label text shown in the center
 */
@customElement('specd-divider')
export class SpecdDivider extends LitElement implements DividerProps {
  override createRenderRoot() { return this; }

  @property({ type: String }) label?: string;

  override render() {
    return html`
      <div class="divider" style="display:flex;align-items:center;width:100%;">
        <div class="divider-line"></div>
        ${this.label
          ? html`<span class="divider-label">${this.label}</span><div class="divider-line"></div>`
          : html`<div class="divider-line"></div>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-divider': SpecdDivider;
  }
}
