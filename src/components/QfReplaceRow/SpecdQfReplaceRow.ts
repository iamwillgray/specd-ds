import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Specd DS — QfReplaceRow
 *
 * A selectable replacement option row in the Quick Fix wizard.
 *
 * @element specd-qf-replace-row
 *
 * @attr {string}  name      - Radio group name
 * @attr {string}  value     - Radio value
 * @attr {boolean} checked   - Selected state
 * @attr {string}  label     - Variable/token name
 * @attr {string}  color     - Colour preview hex/rgb value
 * @attr {string}  type      - Type tag text (e.g. "semantic", "primitive")
 * @attr {string}  collection - Collection name
 *
 * @fires specd-change - Dispatched when selected, detail: { value: string }
 */
@customElement('specd-qf-replace-row')
export class SpecdQfReplaceRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) name: string = '';
  @property({ type: String }) value: string = '';
  @property({ type: Boolean }) checked: boolean = false;
  @property({ type: String }) label: string = '';
  @property({ type: String }) color: string = '';
  @property({ type: String }) type: string = '';
  @property({ type: String }) collection: string = '';

  override render() {
    return html`
      <label class="qf-replace-row${this.checked ? ' selected' : ''}">
        <input
          class="qf-replace-radio"
          type="radio"
          name=${this.name || nothing}
          value=${this.value}
          .checked=${this.checked}
          @change=${() => {
            this.checked = true;
            this.dispatchEvent(new CustomEvent('specd-change', { detail: { value: this.value }, bubbles: true, composed: true }));
          }}
        />
        <div class="qf-replace-body">
          ${this.color ? html`<span class="qf-replace-swatch" style=${styleMap({ background: this.color })}></span>` : nothing}
          <span class="qf-replace-label">${this.label}</span>
          ${this.collection ? html`<span class="qf-replace-collection">${this.collection}</span>` : nothing}
        </div>
        ${this.type ? html`<span class="qf-type-tag">${this.type}</span>` : nothing}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-qf-replace-row': SpecdQfReplaceRow; }
}
