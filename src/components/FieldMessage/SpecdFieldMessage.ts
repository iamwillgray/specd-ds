import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type FieldMessageType = 'hint' | 'error' | 'success';

const ICON_ERROR   = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
const ICON_SUCCESS = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

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
      'field-message',
      this.type === 'error'   ? 'error'   : '',
      this.type === 'success' ? 'success' : '',
    ].filter(Boolean).join(' ');

    const icon = this.type === 'error'
      ? html`${unsafeHTML(ICON_ERROR)}`
      : this.type === 'success'
      ? html`${unsafeHTML(ICON_SUCCESS)}`
      : nothing;

    return html`<div class=${cls}>${icon}${this.message}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-field-message': SpecdFieldMessage; }
}
