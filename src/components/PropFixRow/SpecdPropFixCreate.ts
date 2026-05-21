import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Specd DS — PropFixCreate
 *
 * Action row for creating a new variable from an existing hard-coded value.
 *
 * @element specd-prop-fix-create
 *
 * @attr {string} value - The raw value to be converted into a variable
 *
 * @fires specd-create - User clicked Create Variable, detail: { value: string }
 */
@customElement('specd-prop-fix-create')
export class SpecdPropFixCreate extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) value: string = '';

  override render() {
    return html`
      <div class="prop-fix-create">
        <span class="prop-fix-create-label">Create variable from ${this.value}</span>
        <button
          class="prop-fix-btn"
          type="button"
          @click=${() => this.dispatchEvent(new CustomEvent('specd-create', { detail: { value: this.value }, bubbles: true, composed: true }))}
        >Create Variable</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-prop-fix-create': SpecdPropFixCreate; }
}
