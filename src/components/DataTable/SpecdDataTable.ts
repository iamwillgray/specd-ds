import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../Input/SpecdInput.js';

export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

/**
 * Specd DS — DataTable
 *
 * Searchable, sortable data table.
 *
 * @element specd-data-table
 *
 * @attr {string} columns - JSON array of DataTableColumn
 * @attr {string} rows    - JSON array of row objects (keyed by column.key)
 * @attr {string} search  - Searchable column key (searches all columns if omitted)
 */
@customElement('specd-data-table')
export class SpecdDataTable extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) columns: string = '[]';
  @property({ type: String }) rows: string = '[]';
  @property({ type: String }) search: string = '';
  @state() private _query: string = '';
  @state() private _sortKey: string = '';
  @state() private _sortAsc: boolean = true;

  private _cols(): DataTableColumn[] {
    try { return JSON.parse(this.columns); } catch { return []; }
  }

  private _rows(): Record<string, unknown>[] {
    try { return JSON.parse(this.rows); } catch { return []; }
  }

  private _filtered() {
    let rows = this._rows();
    const q = this._query.trim().toLowerCase();
    if (q) {
      rows = rows.filter(row =>
        Object.values(row).some(v => String(v).toLowerCase().includes(q))
      );
    }
    if (this._sortKey) {
      rows = [...rows].sort((a, b) => {
        const av = String(a[this._sortKey] ?? '');
        const bv = String(b[this._sortKey] ?? '');
        return this._sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return rows;
  }

  private _sort(key: string) {
    if (this._sortKey === key) { this._sortAsc = !this._sortAsc; }
    else { this._sortKey = key; this._sortAsc = true; }
  }

  override render() {
    const cols = this._cols();
    const rows = this._filtered();

    return html`
      <div class="comp-table">
        <div class="comp-toolbar">
          <specd-input
            search
            placeholder="Search…"
            .value=${this._query}
            @input=${(e: Event) => { this._query = (e.target as HTMLInputElement).value; }}
          ></specd-input>
        </div>
        <div class="comp-table-wrap">
          <table>
            <thead>
              <tr>
                ${cols.map(col => html`
                  <th
                    class=${col.sortable ? 'sortable' : ''}
                    @click=${col.sortable ? () => this._sort(col.key) : nothing}
                  >
                    ${col.label}
                    ${col.sortable && this._sortKey === col.key
                      ? html`<span class="sort-icon">${this._sortAsc ? '↑' : '↓'}</span>`
                      : nothing}
                  </th>
                `)}
              </tr>
            </thead>
            <tbody>
              ${rows.length === 0
                ? html`<tr><td colspan=${cols.length} class="table-empty">No results</td></tr>`
                : rows.map(row => html`
                  <tr>
                    ${cols.map(col => html`<td>${row[col.key] ?? ''}</td>`)}
                  </tr>
                `)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-data-table': SpecdDataTable; }
}
