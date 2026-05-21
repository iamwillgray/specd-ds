import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Specd DS — FormRow
 *
 * A labelled form row with a slot for the control and optional hint text.
 *
 * @element specd-form-row
 *
 * @attr {string} label - Label text
 * @attr {string} hint  - Optional hint text
 *
 * @slot - The form control (input, select, etc.)
 *
 * @example
 * <specd-form-row label="API Token" hint="Found in account settings">
 *   <input type="text" />
 * </specd-form-row>
 */
@customElement('specd-form-row')
export class SpecdFormRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: String }) hint?: string;

  override render() {
    return html`
      <div class="form-row">
        <label class="form-label">${this.label}</label>
        <slot></slot>
        ${this.hint ? html`<span class="form-hint">${this.hint}</span>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-form-row': SpecdFormRow;
  }
}
