import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface VariableOption {
  id: string;
  name: string;
  collection?: string;
  color?: string;
  type?: string;
}

/**
 * Specd DS — VariablePicker
 *
 * Modal overlay for picking a design token variable.
 * Renders inside a `.variable-picker-modal` container.
 *
 * @element specd-variable-picker
 *
 * @attr {string}  title   - Modal header title (default "Pick a variable")
 * @attr {string}  options - JSON array of VariableOption objects
 * @attr {string}  value   - Currently selected variable id
 * @attr {boolean} open    - Whether the modal is visible
 *
 * @fires specd-pick   - User selected a variable, detail: { id, name }
 * @fires specd-close  - User closed the modal
 */
@customElement('specd-variable-picker')
export class SpecdVariablePicker extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = 'Pick a variable';
  @property({ type: String }) options: string = '[]';
  @property({ type: String }) value: string = '';
  @property({ type: Boolean }) open: boolean = false;
  @state() private _selected: string = '';

  override connectedCallback() {
    super.connectedCallback();
    this._selected = this.value;
  }

  private _opts(): VariableOption[] {
    try { return JSON.parse(this.options); } catch { return []; }
  }

  private _pick(opt: VariableOption) {
    this._selected = opt.id;
    this.dispatchEvent(new CustomEvent('specd-pick', { detail: { id: opt.id, name: opt.name }, bubbles: true, composed: true }));
  }

  override render() {
    if (!this.open) return nothing;
    const opts = this._opts();

    return html`
      <div class="variable-picker-modal">
        <div class="vp-header">
          <span class="vp-title">${this.title}</span>
          <button class="btn-ghost vp-close" type="button" @click=${() => this.dispatchEvent(new CustomEvent('specd-close', { bubbles: true, composed: true }))}>✕</button>
        </div>
        <div class="vp-body">
          ${opts.length === 0
            ? html`<div class="vp-empty">No variables found</div>`
            : opts.map(opt => html`
              <label class="vp-radio-row${this._selected === opt.id ? ' selected' : ''}">
                <input
                  type="radio"
                  name="vp-pick"
                  value=${opt.id}
                  .checked=${this._selected === opt.id}
                  @change=${() => this._pick(opt)}
                />
                <span class="vp-var-name">${opt.name}</span>
                ${opt.collection ? html`<span class="vp-collection">${opt.collection}</span>` : nothing}
                ${opt.type ? html`<span class="qf-type-tag">${opt.type}</span>` : nothing}
              </label>
            `)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-variable-picker': SpecdVariablePicker; }
}
