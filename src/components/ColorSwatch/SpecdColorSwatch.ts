import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

export type ColorSwatchVariant = 'square' | 'chip' | 'typography';

/**
 * Specd DS — ColorSwatch
 *
 * Colour preview component. Three display modes:
 * - `square` (default): small colour square used in variable suggestion rows
 * - `chip`: horizontal pill with dot + name + hex value
 * - `typography`: box showing "Aa" sample text in the given color
 *
 * @element specd-color-swatch
 *
 * @attr {string} color   - CSS color value (hex, rgb, var, etc.)
 * @attr {string} label   - Name label shown in chip variant (also used as aria-label)
 * @attr {string} variant - Display mode: square | chip | typography
 */
@customElement('specd-color-swatch')
export class SpecdColorSwatch extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) color: string = '';
  @property({ type: String }) label: string = '';
  @property({ type: String }) variant: ColorSwatchVariant = 'square';

  override render() {
    const bg = this.color || 'transparent';

    if (this.variant === 'chip') {
      return html`
        <span class="color-swatch" aria-label=${this.label || this.color}>
          <span
            class="color-swatch-dot"
            style=${styleMap({ background: bg })}
          ></span>
          <span class="color-swatch-label">
            ${this.label ? html`<span class="color-swatch-name">${this.label}</span>` : nothing}
            <span class="color-swatch-hex">${this.color}</span>
          </span>
        </span>
      `;
    }

    if (this.variant === 'typography') {
      return html`
        <span
          class="color-swatch-typography"
          style=${styleMap({ color: bg })}
          aria-label=${this.label || this.color}
        >Aa</span>
      `;
    }

    // Default: square
    return html`
      <span
        class="qf-replace-swatch"
        style=${styleMap({ background: bg })}
        aria-label=${this.label || this.color}
        role="img"
      ></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-color-swatch': SpecdColorSwatch; }
}
