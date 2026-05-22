import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type PropFixRowProp = 'fill' | 'typography' | 'spacing' | 'stroke';

const ICON_FILL     = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" fill-opacity="0.15"/><rect x="3" y="3" width="18" height="18" rx="3"/></svg>`;
const ICON_STROKE   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="7" y="7" width="10" height="10" rx="1" stroke-dasharray="2 2"/></svg>`;
const ICON_SPACING  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="5 8 2 12 5 16"/><polyline points="19 8 22 12 19 16"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`;
const ICON_TYPO     = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`;

function iconFor(prop: PropFixRowProp): string {
  if (prop === 'spacing')    return ICON_SPACING;
  if (prop === 'typography') return ICON_TYPO;
  if (prop === 'stroke')     return ICON_STROKE;
  return ICON_FILL;
}

/**
 * Specd DS — PropFixRow
 *
 * Header row for a hard-coded value fix. Shows: property icon, layer path,
 * attribute type, and instance count. Slot accepts PropFixSlot / PropFixCreate children.
 *
 * @element specd-prop-fix-row
 *
 * @attr {string} prop  - Property type: fill | typography | spacing | stroke
 * @attr {string} layer - Layer path shown as a clickable button (e.g. "Button/Primary/Default")
 * @attr {string} attr  - Attribute label (e.g. "background fill", "border stroke")
 * @attr {string} count - Instance count label (e.g. "1 layer", "3 layers")
 *
 * @fires specd-layer-jump - User clicked the layer path button
 */
@customElement('specd-prop-fix-row')
export class SpecdPropFixRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) prop: PropFixRowProp = 'fill';
  @property({ type: String }) layer: string = '';
  @property({ type: String }) attr: string = '';
  @property({ type: String }) count: string = '';

  override render() {
    return html`
      <div class="prop-fix-row">
        <div class="prop-fix-content">
          <div class="prop-fix-hdr">
            <span class="prop-fix-icon">${unsafeHTML(iconFor(this.prop))}</span>
            ${this.layer ? html`
              <button
                class="prop-fix-layer"
                type="button"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this.dispatchEvent(new CustomEvent('specd-layer-jump', { bubbles: true, composed: true }));
                }}
              >${this.layer}</button>
              <span class="prop-fix-arrow">›</span>
            ` : nothing}
            ${this.attr ? html`<span class="prop-fix-attr">${this.attr}</span>` : nothing}
            ${this.count ? html`<span class="prop-fix-count">${this.count}</span>` : nothing}
          </div>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-prop-fix-row': SpecdPropFixRow; }
}
