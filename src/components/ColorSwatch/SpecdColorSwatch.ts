import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Specd DS — ColorSwatch
 *
 * A small colour square used in variable suggestion rows (Quick Fix).
 * Renders an 18×18px rounded square with the given colour.
 *
 * @element specd-color-swatch
 *
 * @attr {string}  color - CSS color value (hex, rgb, etc.)
 * @attr {string}  label - Accessible label (aria-label)
 * @attr {boolean} sm    - Use smaller 16×16 variant (color-swatch-sm)
 */
@customElement('specd-color-swatch')
export class SpecdColorSwatch extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) color: string = '';
  @property({ type: String }) label: string = '';
  @property({ type: Boolean }) sm: boolean = false;

  override render() {
    const bg = this.color || 'transparent';
    const cls = this.sm ? 'color-swatch-sm' : 'qf-replace-swatch';
    return html`
      <span
        class=${cls}
        style=${styleMap({ background: bg })}
        aria-label=${this.label || this.color || 'colour swatch'}
        role="img"
      ></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-color-swatch': SpecdColorSwatch; }
}
