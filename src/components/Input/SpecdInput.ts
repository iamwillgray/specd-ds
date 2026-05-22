import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { InputType } from './SpecdInput.types.js';

const EYE_OFF = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
const EYE_ON  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;

/**
 * Specd DS — Input
 *
 * Text input with optional search styling and password reveal toggle.
 *
 * @element specd-input
 *
 * @attr {string}  type        - HTML input type: text | number | password | url | email | date | search
 * @attr {string}  id          - HTML id on the inner input
 * @attr {string}  placeholder - Placeholder text
 * @attr {string}  value       - Current value
 * @attr {boolean} disabled    - Disabled state
 * @attr {boolean} search      - Apply table-search style class
 * @attr {string}  cls         - Extra CSS classes
 *
 * @fires input  - Forwarded from the inner <input>
 * @fires change - Forwarded from the inner <input>
 */
@customElement('specd-input')
export class SpecdInput extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) type: InputType = 'text';
  @property({ type: String }) id: string = '';
  @property({ type: String }) placeholder: string = '';
  @property({ type: String }) value: string = '';
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) search: boolean = false;
  @property({ type: String }) cls: string = '';
  @property({ type: String }) name: string = '';
  @property({ type: String }) form: string = '';
  @property({ type: String }) autocomplete: string = '';
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string = '';
  @property({ type: String, attribute: 'aria-describedby' }) ariaDescribedBy: string = '';
  @property({ type: String }) min: string = '';
  @property({ type: String }) max: string = '';
  @property({ type: String }) step: string = '';
  @property({ type: String }) pattern: string = '';
  @property({ type: String }) inputmode: string = '';
  @state() private _revealed: boolean = false;

  private _inputClasses(): string {
    return ['input', this.search ? 'table-search' : '', this.cls].filter(Boolean).join(' ');
  }

  private _toggleReveal() { this._revealed = !this._revealed; }

  override render() {
    const effectiveType = this.type === 'password' && this._revealed ? 'text' : this.type;
    const inputEl = html`
      <input
        class=${this._inputClasses()}
        type=${effectiveType}
        id=${this.id || nothing}
        placeholder=${this.placeholder || nothing}
        .value=${this.value}
        ?disabled=${this.disabled}
        name=${this.name || nothing}
        form=${this.form || nothing}
        autocomplete=${this.autocomplete || nothing}
        aria-label=${this.ariaLabel || nothing}
        aria-describedby=${this.ariaDescribedBy || nothing}
        min=${this.min || nothing}
        max=${this.max || nothing}
        step=${this.step || nothing}
        pattern=${this.pattern || nothing}
        inputmode=${this.inputmode || nothing}
        @input=${() => this.dispatchEvent(new Event('input', { bubbles: true }))}
        @change=${() => this.dispatchEvent(new Event('change', { bubbles: true }))}
      />
    `;

    if (this.type !== 'password') return inputEl;

    return html`
      <div class="input-group">
        ${inputEl}
        <button
          type="button"
          class="input-reveal"
          aria-label=${this._revealed ? 'Hide password' : 'Show password'}
          @click=${this._toggleReveal}
        >${unsafeHTML(this._revealed ? EYE_OFF : EYE_ON)}</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-input': SpecdInput; }
}
