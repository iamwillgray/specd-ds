import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { InputProps, InputType } from './SpecdInput.types.js';

/**
 * Specd DS — Input
 *
 * A text input wrapper with optional search styling. Renders into light DOM.
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
 *
 * @example
 * <specd-input placeholder="Search…" search></specd-input>
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

  private _classes(): string {
    return [
      'input',
      this.search ? 'table-search' : '',
      this.cls,
    ].filter(Boolean).join(' ');
  }

  override render() {
    return html`
      <input
        class=${this._classes()}
        type=${this.type}
        id=${this.id || nothing}
        placeholder=${this.placeholder || nothing}
        .value=${this.value}
        ?disabled=${this.disabled}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-input': SpecdInput;
  }
}
