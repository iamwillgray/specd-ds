import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Specd DS — Pagination
 *
 * @element specd-pagination
 * @attr {number} page     - Current page (1-based)
 * @attr {number} total    - Total number of items
 * @attr {number} pagesize - Items per page (default 20)
 * @fires specd-page-change - Emitted on page change, detail: { page }
 */
@customElement('specd-pagination')
export class SpecdPagination extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Number }) page: number = 1;
  @property({ type: Number }) total: number = 0;
  @property({ type: Number }) pagesize: number = 20;

  override render() {
    const pageSize = this.pagesize || 20;
    const totalPages = Math.max(1, Math.ceil(this.total / pageSize));
    const current = Math.min(Math.max(1, this.page), totalPages);

    const pages: (number | '...')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push('...');
      for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) pages.push(i);
      if (current < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    const go = (p: number) => {
      this.page = p;
      this.dispatchEvent(new CustomEvent('specd-page-change', { detail: { page: p }, bubbles: true, composed: true }));
    };

    return html`
      <div class="pagination">
        <button class="page-btn" ?disabled=${current === 1} @click=${() => go(current - 1)}>←</button>
        ${pages.map(p => p === '...'
          ? html`<span class="page-btn" style="cursor:default;border:none">…</span>`
          : html`<button class="page-btn ${p === current ? 'active' : ''}" @click=${() => go(p as number)}>${p}</button>`
        )}
        <button class="page-btn" ?disabled=${current === totalPages} @click=${() => go(current + 1)}>→</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-pagination': SpecdPagination;
  }
}
