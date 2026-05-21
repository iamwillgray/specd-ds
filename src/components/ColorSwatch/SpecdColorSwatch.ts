import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Specd DS — ColorSwatch
 *
 * Small colour preview square, used in variable suggestion rows.
 *
 * @element specd-color-swatch
 *
 * @attr {string} color - CSS color value (hex, rgb, var, etc.)
 * @attr {string} label - Accessible label
 */
@customElement('specd-color-swatch')
export class SpecdColorSwatch extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) color: string = '';
  @property({ type: String }) label: string = '';

  override render() {
    return html`
      <span
        class="qf-replace-swatch"
        style=${styleMap({ background: this.color || 'transparent' })}
        aria-label=${this.label || this.color}
        role="img"
      ></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-color-swatch': SpecdColorSwatch; }
}
