import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type PropFixRowProp = 'fill' | 'typography' | 'spacing' | 'stroke';

/**
 * Specd DS — PropFixRow
 *
 * A single property row in the token fix panel.
 * Shows property name, current raw value, and a slot for fix actions.
 *
 * @element specd-prop-fix-row
 *
 * @attr {string} prop    - Property type: fill | typography | spacing | stroke
 * @attr {string} current - Current raw value (e.g. "#b8ff57", "16px")
 * @attr {string} label   - Display label override (uses prop if not set)
 */
@customElement('specd-prop-fix-row')
export class SpecdPropFixRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) prop: PropFixRowProp = 'fill';
  @property({ type: String }) current: string = '';
  @property({ type: String }) label: string = '';

  override render() {
    const displayLabel = this.label || this.prop;
    return html`
      <div class="prop-fix-row">
        <div class="prop-fix-hdr">
          <span class="prop-fix-name">${displayLabel}</span>
          ${this.current ? html`<span class="prop-fix-current">${this.current}</span>` : nothing}
        </div>
        <div class="prop-fix-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-prop-fix-row': SpecdPropFixRow; }
}
