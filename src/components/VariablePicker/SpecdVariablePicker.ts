import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../RadioRow/SpecdRadioRow.js';

export interface VariableOption {
  id: string;
  name: string;
  collection?: string;
  color?: string;
  hex?: string;
}

/**
 * Specd DS — VariablePicker
 *
 * Modal overlay for picking a design token variable.
 * Supports search filtering and two-section layout (Suggested / All Variables).
 *
 * @element specd-variable-picker
 *
 * @attr {string}  title       - Modal header title (default "Pick a variable")
 * @attr {string}  options     - JSON array of VariableOption objects (all candidates)
 * @attr {string}  suggestions - JSON array of VariableOption (subset to show as "Suggested")
 * @attr {string}  value       - Currently selected variable id
 * @attr {boolean} open        - Whether the modal is visible
 *
 * @fires specd-pick   - User selected a variable; detail: { id, name }
 * @fires specd-close  - User closed the modal
 */
@customElement('specd-variable-picker')
export class SpecdVariablePicker extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = 'Pick a variable';
  @property({ type: String }) options: string = '[]';
  @property({ type: String }) suggestions: string = '[]';
  @property({ type: String }) value: string = '';
  @property({ type: Boolean }) open: boolean = false;

  @state() private _selected: string = '';
  @state() private _query: string = '';

  override connectedCallback() {
    super.connectedCallback();
    this._selected = this.value;
  }

  private _opts(): VariableOption[] {
    try { return JSON.parse(this.options) as VariableOption[]; } catch { return []; }
  }

  private _sugg(): VariableOption[] {
    try { return JSON.parse(this.suggestions) as VariableOption[]; } catch { return []; }
  }

  private _filter(opts: VariableOption[]): VariableOption[] {
    if (!this._query) return opts;
    const q = this._query.toLowerCase();
    return opts.filter(o => o.name.toLowerCase().includes(q));
  }

  private _pick(opt: VariableOption) {
    this._selected = opt.id;
    this.dispatchEvent(new CustomEvent('specd-pick', {
      detail: { id: opt.id, name: opt.name },
      bubbles: true,
      composed: true,
    }));
  }

  private _metaLabel(count: number): string {
    return count === 1 ? '1 result' : `${count} results`;
  }

  private _renderRows(opts: VariableOption[]) {
    return opts.map(opt => html`
      <specd-radio-row
        value=${opt.id}
        label=${opt.name}
        collection=${opt.collection ?? ''}
        color=${opt.color ?? ''}
        hex=${opt.hex ?? ''}
        ?checked=${this._selected === opt.id}
        @specd-change=${() => this._pick(opt)}
      ></specd-radio-row>
    `);
  }

  private _renderBody() {
    const sugg = this._sugg();
    const all  = this._opts();

    // Searching: flat filtered list
    if (this._query) {
      const filtered = this._filter(all);
      return html`
        ${filtered.length === 0
          ? html`<div class="vp-empty">No results for "${this._query}"</div>`
          : html`${this._renderRows(filtered)}`
        }
      `;
    }

    // No suggestions prop: flat list (backward-compatible)
    if (sugg.length === 0) {
      return all.length === 0
        ? html`<div class="vp-empty">No variables found</div>`
        : html`${this._renderRows(all)}`;
    }

    // Two-section layout
    return html`
      <div>
        <div class="vp-section-header">
          <span class="vp-section-title">Suggested</span>
          <span class="vp-section-meta">${this._metaLabel(sugg.length)}</span>
        </div>
        <div class="vp-section-list">${this._renderRows(sugg)}</div>
      </div>
      <div style="margin-top:12px;">
        <div class="vp-section-header">
          <span class="vp-section-title">All Variables</span>
          <span class="vp-section-meta">${this._metaLabel(all.length)}</span>
        </div>
        <div class="vp-section-list">${this._renderRows(all)}</div>
      </div>
    `;
  }

  override render() {
    if (!this.open) return nothing;

    return html`
      <div class="variable-picker-modal">
        <div class="vp-header">
          <span class="vp-title">${this.title}</span>
          <button class="btn-ghost vp-close" type="button"
            @click=${() => this.dispatchEvent(new CustomEvent('specd-close', { bubbles: true, composed: true }))}>
            ✕
          </button>
        </div>
        <div class="vp-body">
          <input
            class="vp-search"
            type="search"
            placeholder="Search variables…"
            .value=${this._query}
            @input=${(e: Event) => { this._query = (e.target as HTMLInputElement).value; }}
          />
          ${this._renderBody()}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-variable-picker': SpecdVariablePicker; }
}
