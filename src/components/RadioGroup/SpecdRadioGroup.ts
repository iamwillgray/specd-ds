import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { RadioOption } from './SpecdRadioGroup.types.js';

/**
 * Specd DS — RadioGroup
 *
 * A group of radio buttons with labels and optional hints. Supports vertical and inline layouts.
 *
 * @element specd-radio-group
 *
 * @attr {string}  options - JSON array of RadioOption objects
 * @attr {string}  value   - Currently selected value
 * @attr {string}  name    - HTML name attribute for the radio inputs
 * @attr {boolean} inline  - Display options inline (default false)
 *
 * @fires specd-change - Dispatched when selection changes, detail: { value: string }
 *
 * @example
 * <specd-radio-group options='[{"value":"a","label":"A"}]' value="a" name="group1"></specd-radio-group>
 */
@customElement('specd-radio-group')
export class SpecdRadioGroup extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) options: string = '[]';
  @property({ type: String }) value: string = '';
  @property({ type: String }) name: string = '';
  @property({ type: Boolean }) inline: boolean = false;

  override render() {
    const opts: RadioOption[] = (() => { try { return JSON.parse(this.options); } catch { return []; } })();
    return html`
      <div class="radio-group ${this.inline ? 'inline' : ''}" role="radiogroup">
        ${opts.map(o => html`
          <label class="radio-item">
            <input type="radio" name=${this.name} value=${o.value} .checked=${this.value === o.value}
              @change=${() => {
                this.value = o.value;
                this.dispatchEvent(new CustomEvent('specd-change', { detail: { value: o.value }, bubbles: true, composed: true }));
              }} />
            <div>
              <div class="radio-item-label">${o.label}</div>
              ${o.hint ? html`<div class="radio-item-hint">${o.hint}</div>` : nothing}
            </div>
          </label>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-radio-group': SpecdRadioGroup;
  }
}
