import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

export type PropFixMatchType = 'exact' | 'closest' | 'none' | '';

/**
 * Specd DS — PropFixSlot
 *
 * A single token-suggestion row inside a PropFixRow.
 * Layout: [current value] → [suggested variable + match badge + chevron] [Apply button]
 *
 * @element specd-prop-fix-slot
 *
 * @attr {string}  current      - Current raw value text (e.g. "#3b82f6", "12px")
 * @attr {string}  currentcolor - Hex/CSS color for the current value swatch (optional)
 * @attr {string}  varname      - Suggested variable name
 * @attr {string}  color        - Hex/CSS color for the suggestion swatch (optional)
 * @attr {string}  matchtype    - Match quality: exact | closest | none | '' (no badge)
 * @attr {boolean} applied      - Applied/selected state — shows green Applied button
 * @attr {string}  count        - Optional count badge on Apply button
 *
 * @fires specd-apply - User clicked Apply; detail: { varname: string }
 * @fires specd-jump  - User clicked the variable name link
 */
@customElement('specd-prop-fix-slot')
export class SpecdPropFixSlot extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) current: string = '';
  @property({ type: String }) currentcolor: string = '';
  @property({ type: String }) varname: string = '';
  @property({ type: String }) color: string = '';
  @property({ type: String }) matchtype: PropFixMatchType = '';
  @property({ type: Boolean }) applied: boolean = false;
  @property({ type: String }) count: string = '';

  override render() {
    return html`
      <div class="prop-fix-slot${this.applied ? ' applied' : ''}">

        ${this.current ? html`
          <span class="prop-fix-current">
            ${this.currentcolor ? html`
              <span style=${styleMap({ background: this.currentcolor, width: '10px', height: '10px', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.1)', flexShrink: '0', display: 'inline-block' })}></span>
            ` : nothing}
            <span style="font-family:var(--font-mono);font-size:10px;color:#0c1f3f;">${this.current}</span>
          </span>
          <span class="prop-fix-arrow">→</span>
        ` : nothing}

        <span class="prop-fix-suggest">
          ${this.color ? html`
            <span style=${styleMap({ background: this.color, width: '10px', height: '10px', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.1)', flexShrink: '0', display: 'inline-block' })}></span>
          ` : nothing}
          <button
            class="prop-fix-layer-link"
            type="button"
            @click=${(e: Event) => {
              e.stopPropagation();
              this.dispatchEvent(new CustomEvent('specd-jump', { bubbles: true, composed: true }));
            }}
          >${this.varname}</button>
          ${this.matchtype ? html`
            <span class="prop-fix-match-tag ${this.matchtype}">${this.matchtype.toUpperCase()}</span>
          ` : nothing}
          <span class="prop-fix-chevron">›</span>
        </span>

        ${this.applied
          ? html`<button class="prop-fix-btn applied" type="button" disabled>Applied</button>`
          : html`
            <button
              class="prop-fix-btn"
              type="button"
              @click=${(e: Event) => {
                e.stopPropagation();
                this.dispatchEvent(new CustomEvent('specd-apply', {
                  detail: { varname: this.varname },
                  bubbles: true,
                  composed: true,
                }));
              }}
            >Apply${this.count ? html` <span class="prop-fix-btn-badge">${this.count}</span>` : nothing}</button>
          `
        }

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-prop-fix-slot': SpecdPropFixSlot; }
}
