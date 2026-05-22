import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Specd DS — RadioRow
 *
 * A selectable replacement option row. Used in the Quick Fix wizard and
 * Variable Picker to let the user choose between token candidates.
 *
 * Layout: [radio indicator] [body: name + collection + hex] [color swatch]
 *
 * @element specd-radio-row
 *
 * @attr {string}  value      - Unique value for this option (used in specd-change event)
 * @attr {boolean} checked    - Whether this row is currently selected
 * @attr {string}  label      - Variable / token name (primary text)
 * @attr {string}  collection - Collection name shown below the label
 * @attr {string}  color      - CSS color value for the preview swatch (optional)
 * @attr {string}  hex        - Hex string shown inline in the collection line (optional)
 *
 * @fires specd-change - User clicked the row; detail: { value: string }
 */
@customElement('specd-radio-row')
export class SpecdRadioRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) value: string = '';
  @property({ type: Boolean }) checked: boolean = false;
  @property({ type: String }) label: string = '';
  @property({ type: String }) collection: string = '';
  @property({ type: String }) color: string = '';
  @property({ type: String }) hex: string = '';

  private _handleClick() {
    this.checked = true;
    this.dispatchEvent(new CustomEvent('specd-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`
      <button
        class="qf-replace-row${this.checked ? ' selected' : ''}"
        type="button"
        @click=${this._handleClick}
      >
        <span class="qf-replace-radio"></span>
        <div class="qf-replace-body">
          <div class="qf-replace-name">${this.label}</div>
          ${this.collection ? html`
            <div class="qf-replace-collection">
              ${this.collection}
              ${this.hex ? html`<span class="qf-modal-hex">${this.hex}</span>` : nothing}
            </div>
          ` : nothing}
        </div>
        ${this.color ? html`
          <span class="qf-replace-swatch" style=${styleMap({ background: this.color })}></span>
        ` : nothing}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-radio-row': SpecdRadioRow; }
}
