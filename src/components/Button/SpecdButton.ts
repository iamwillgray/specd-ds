import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { ButtonProps, ButtonVariant, ButtonSize, ButtonType } from './SpecdButton.types.js';

/**
 * Specd DS — Button
 *
 * A multi-variant button component. Renders into the light DOM so global
 * Specd CSS (tokens + components.css) applies without Shadow DOM piercing.
 *
 * @element specd-button
 *
 * @attr {string}  label    - Button label text (or use slot content)
 * @attr {string}  variant  - Visual style: primary | ghost | accent | danger
 * @attr {string}  size     - Size: sm | md | lg
 * @attr {boolean} full     - Stretch to full container width
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} loading  - Loading state (shows spinner, disables button)
 * @attr {string}  type     - HTML button type: button | submit | reset
 * @attr {string}  icon     - Raw SVG string shown before label
 * @attr {string}  cls      - Extra CSS classes on the inner <button>
 *
 * @slot - Default slot used when label attribute is not set
 *
 * @example
 * <specd-button variant="primary" label="Scan now"></specd-button>
 * <specd-button variant="ghost" size="sm">Cancel</specd-button>
 */
@customElement('specd-button')
export class SpecdButton extends LitElement {
  /** Light DOM — no shadow root so specd-ds.css applies globally */
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: String }) variant: ButtonVariant = 'primary';
  @property({ type: String }) size: ButtonSize = 'md';
  @property({ type: Boolean }) full: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: String }) type: ButtonType = 'button';
  @property({ type: String }) icon: string = '';
  @property({ type: String }) cls: string = '';

  private _classes(): string {
    return [
      `btn-${this.variant}`,
      this.size === 'sm' ? 'btn-sm' : this.size === 'lg' ? 'btn-lg' : '',
      this.full    ? 'btn-full'    : '',
      this.loading ? 'is-loading'  : '',
      this.cls,
    ].filter(Boolean).join(' ');
  }

  override render() {
    const isDisabled = this.disabled || this.loading;
    return html`
      <button
        class=${this._classes()}
        type=${this.type}
        ?disabled=${isDisabled}
        aria-disabled=${isDisabled ? 'true' : 'false'}
      >
        ${this.icon ? html`<span class="btn-icon" aria-hidden="true">${unsafeHTML(this.icon)}</span>` : nothing}
        <span class="btn-label">
          ${this.label ? this.label : html`<slot></slot>`}
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-button': SpecdButton;
  }
}
