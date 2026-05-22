import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { ButtonProps, ButtonVariant, ButtonSize, ButtonType } from './SpecdButton.types.js';

const SPARKLE_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 L13.5 9 L20 10.5 L13.5 12 L12 19 L10.5 12 L4 10.5 L10.5 9 Z"/></svg>`;

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
  @property({ type: String }) name: string = '';
  @property({ type: String }) value: string = '';
  @property({ type: String }) form: string = '';
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string = '';
  @property({ type: String, attribute: 'aria-describedby' }) ariaDescribedBy: string = '';
  @property({ type: Boolean }) autofocus: boolean = false;

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
    const isAi = this.variant === 'ai-gradient';
    const effectiveIcon = this.icon || (isAi ? SPARKLE_SVG : '');
    return html`
      <button
        class=${this._classes()}
        type=${this.type}
        ?disabled=${isDisabled}
        aria-disabled=${isDisabled ? 'true' : 'false'}
        name=${this.name || nothing}
        value=${this.value || nothing}
        form=${this.form || nothing}
        aria-label=${this.ariaLabel || nothing}
        aria-describedby=${this.ariaDescribedBy || nothing}
        ?autofocus=${this.autofocus}
      >
        ${effectiveIcon ? html`<span class="btn-icon" aria-hidden="true">${unsafeHTML(effectiveIcon)}</span>` : nothing}
        ${isAi
          ? html`<span class="ai-text">${this.label ? this.label : html`<slot></slot>`}</span>`
          : html`<span class="btn-label">${this.label ? this.label : html`<slot></slot>`}</span>`
        }
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-button': SpecdButton;
  }
}
