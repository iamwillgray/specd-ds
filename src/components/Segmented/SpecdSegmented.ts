import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SegmentOption } from './SpecdSegmented.types.js';

/**
 * Specd DS — Segmented
 *
 * A segmented toggle control for switching between a small set of options.
 *
 * @element specd-segmented
 *
 * @attr {string} options - JSON array of SegmentOption objects
 * @attr {string} value   - Currently selected value
 * @attr {boolean} dark   - If true, adds dark class for navy background variant
 *
 * @fires specd-change - Dispatched when selection changes, detail: { value: string }
 *
 * @example
 * <specd-segmented options='[{"value":"a","label":"A"},{"value":"b","label":"B"}]' value="a"></specd-segmented>
 */
@customElement('specd-segmented')
export class SpecdSegmented extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) options: string = '[]';
  @property({ type: String }) value: string = '';
  @property({ type: Boolean }) dark: boolean = false;

  override render() {
    const opts: SegmentOption[] = (() => { try { return JSON.parse(this.options); } catch { return []; } })();
    return html`
      <div class="segmented-toggle ${this.dark ? 'dark' : ''}">
        ${opts.map(o => html`
          <button
            class="seg-btn ${this.value === o.value ? 'active' : ''}"
            @click=${() => {
              this.value = o.value;
              this.dispatchEvent(new CustomEvent('specd-change', { detail: { value: o.value }, bubbles: true, composed: true }));
            }}
          >${o.label}</button>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-segmented': SpecdSegmented;
  }
}
