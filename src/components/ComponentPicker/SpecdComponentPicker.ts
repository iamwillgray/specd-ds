import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../RadioRow/SpecdRadioRow.js';

export interface ComponentOption {
  id: string;
  name: string;
  library?: string;
}

/**
 * Specd DS — ComponentPicker
 *
 * Modal overlay for picking a library component to swap/restore to.
 * Mirrors <specd-variable-picker>'s structure and event API exactly —
 * same search filtering, same two-section (Suggested / All Components)
 * layout, same <specd-radio-row> reuse. The only difference is the
 * option shape: a component has a name and source library, not a
 * colour/hex value, so SpecdRadioRow's optional `color`/`hex` attrs are
 * simply left unset here.
 *
 * @element specd-component-picker
 *
 * @attr {string}  title       - Modal header title (default "Pick a component")
 * @attr {string}  options     - JSON array of ComponentOption objects (all candidates)
 * @attr {string}  suggestions - JSON array of ComponentOption (subset to show as "Suggested")
 * @attr {string}  value       - Currently selected component id
 * @attr {boolean} open        - Whether the modal is visible
 *
 * @fires specd-pick   - User selected a component; detail: { id, name }
 * @fires specd-close  - User closed the modal
 */
@customElement('specd-component-picker')
export class SpecdComponentPicker extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = 'Pick a component';
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

  private _opts(): ComponentOption[] {
    try { return JSON.parse(this.options) as ComponentOption[]; } catch { return []; }
  }

  private _sugg(): ComponentOption[] {
    try { return JSON.parse(this.suggestions) as ComponentOption[]; } catch { return []; }
  }

  private _filter(opts: ComponentOption[]): ComponentOption[] {
    if (!this._query) return opts;
    const q = this._query.toLowerCase();
    return opts.filter(o => o.name.toLowerCase().includes(q));
  }

  private _pick(opt: ComponentOption) {
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

  private _renderRows(opts: ComponentOption[]) {
    return opts.map(opt => html`
      <specd-radio-row
        value=${opt.id}
        label=${opt.name}
        collection=${opt.library ?? ''}
        ?checked=${this._selected === opt.id}
        @specd-change=${() => this._pick(opt)}
      ></specd-radio-row>
    `);
  }

  private _renderBody() {
    const sugg = this._sugg();
    const all  = this._opts();

    if (this._query) {
      const filtered = this._filter(all);
      return html`
        ${filtered.length === 0
          ? html`<div class="vp-empty">No results for "${this._query}"</div>`
          : html`${this._renderRows(filtered)}`
        }
      `;
    }

    if (sugg.length === 0) {
      return all.length === 0
        ? html`<div class="vp-empty">No components found</div>`
        : html`${this._renderRows(all)}`;
    }

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
          <span class="vp-section-title">All Components</span>
          <span class="vp-section-meta">${this._metaLabel(all.length)}</span>
        </div>
        <div class="vp-section-list">${this._renderRows(all)}</div>
      </div>
    `;
  }

  override render() {
    if (!this.open) return nothing;

    return html`
      <div class="picker-modal">
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
            placeholder="Search components…"
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
  interface HTMLElementTagNameMap { 'specd-component-picker': SpecdComponentPicker; }
}
