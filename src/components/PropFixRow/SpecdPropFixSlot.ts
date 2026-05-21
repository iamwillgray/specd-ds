import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Specd DS — PropFixSlot
 *
 * A variable suggestion entry in the prop fix row.
 * Shows a colour swatch, variable name, and an Apply button.
 *
 * @element specd-prop-fix-slot
 *
 * @attr {string} varname    - Variable name to display
 * @attr {string} color      - Colour value for swatch (optional)
 * @attr {boolean} selected  - Currently applied/selected state
 *
 * @fires specd-apply - User clicked Apply, detail: { varname: string }
 */
@customElement('specd-prop-fix-slot')
export class SpecdPropFixSlot extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) varname: string = '';
  @property({ type: String }) color: string = '';
  @property({ type: Boolean }) selected: boolean = false;

  override render() {
    return html`
      <div class="prop-fix-slot${this.selected ? ' applied' : ''}">
        ${this.color ? html`<span class="qf-replace-swatch" style=${styleMap({ background: this.color })}></span>` : ''}
        <span class="prop-fix-suggest">${this.varname}</span>
        <button
          class="prop-fix-btn"
          type="button"
          @click=${() => this.dispatchEvent(new CustomEvent('specd-apply', { detail: { varname: this.varname }, bubbles: true, composed: true }))}
        >${this.selected ? 'Applied' : 'Apply'}</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-prop-fix-slot': SpecdPropFixSlot; }
}
