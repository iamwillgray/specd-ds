import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type FieldMessageType = 'hint' | 'error' | 'success';

/**
 * Specd DS — FieldMessage
 *
 * Helper/error text displayed below a form field.
 *
 * @element specd-field-message
 *
 * @attr {string} type    - hint | error | success (default hint)
 * @attr {string} message - Text to display
 */
@customElement('specd-field-message')
export class SpecdFieldMessage extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) type: FieldMessageType = 'hint';
  @property({ type: String }) message: string = '';

  override render() {
    const cls = [
      'form-hint',
      this.type === 'error'   ? 'error'   : '',
      this.type === 'success' ? 'success' : '',
    ].filter(Boolean).join(' ');

    return html`<div class=${cls}>${this.message}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-field-message': SpecdFieldMessage; }
}
