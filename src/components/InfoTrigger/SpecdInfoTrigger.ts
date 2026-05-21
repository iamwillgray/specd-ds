import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Specd DS — InfoTrigger
 *
 * Small `?` circle button for triggering help/info content.
 *
 * @element specd-info-trigger
 *
 * @attr {string} label - Accessible aria-label (default "More info")
 *
 * @fires specd-info - Dispatched when the button is clicked
 */
@customElement('specd-info-trigger')
export class SpecdInfoTrigger extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = 'More info';

  override render() {
    return html`
      <button
        class="info-trigger"
        type="button"
        aria-label=${this.label}
        @click=${() => this.dispatchEvent(new CustomEvent('specd-info', { bubbles: true, composed: true }))}
      >?</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-info-trigger': SpecdInfoTrigger; }
}
