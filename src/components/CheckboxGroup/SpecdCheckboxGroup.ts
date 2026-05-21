import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { CheckboxOption } from './SpecdCheckboxGroup.types.js';

/**
 * Specd DS — CheckboxGroup
 *
 * A group of checkboxes with labels and optional hints. Supports vertical and inline layouts.
 *
 * @element specd-checkbox-group
 *
 * @attr {string}  options - JSON array of CheckboxOption objects
 * @attr {string}  values  - JSON array of selected values
 * @attr {boolean} inline  - Display options inline (default false)
 *
 * @fires specd-change - Dispatched when selection changes, detail: { values: string[] }
 *
 * @example
 * <specd-checkbox-group options='[{"value":"a","label":"A"}]' values='["a"]'></specd-checkbox-group>
 */
@customElement('specd-checkbox-group')
export class SpecdCheckboxGroup extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) options: string = '[]';
  @property({ type: String }) values: string = '[]';
  @property({ type: Boolean }) inline: boolean = false;

  private _parsedValues(): string[] {
    try { return JSON.parse(this.values); } catch { return []; }
  }

  override render() {
    const opts: CheckboxOption[] = (() => { try { return JSON.parse(this.options); } catch { return []; } })();
    const selected = this._parsedValues();
    return html`
      <div class="checkbox-group ${this.inline ? 'inline' : ''}">
        ${opts.map(o => html`
          <label class="checkbox-item">
            <input type="checkbox" value=${o.value} .checked=${selected.includes(o.value)}
              @change=${() => {
                const current = this._parsedValues();
                const updated = current.includes(o.value)
                  ? current.filter(v => v !== o.value)
                  : [...current, o.value];
                this.values = JSON.stringify(updated);
                this.dispatchEvent(new CustomEvent('specd-change', { detail: { values: updated }, bubbles: true, composed: true }));
              }} />
            <div>
              <div class="checkbox-item-label">${o.label}</div>
              ${o.hint ? html`<div class="checkbox-item-hint">${o.hint}</div>` : nothing}
            </div>
          </label>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-checkbox-group': SpecdCheckboxGroup;
  }
}
