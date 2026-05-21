import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { BreadcrumbItem } from './SpecdBreadcrumb.types.js';

/**
 * Specd DS — Breadcrumb
 *
 * @element specd-breadcrumb
 * @attr {string} items - JSON array of { label, href? } objects
 */
@customElement('specd-breadcrumb')
export class SpecdBreadcrumb extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) items: string = '[]';

  override render() {
    const items: BreadcrumbItem[] = (() => { try { return JSON.parse(this.items); } catch { return []; } })();
    return html`
      <nav class="breadcrumb" aria-label="breadcrumb">
        ${items.map((item, i) => {
          const isLast = i === items.length - 1;
          return html`
            ${i > 0 ? html`<span class="breadcrumb-sep">/</span>` : nothing}
            ${isLast
              ? html`<span class="breadcrumb-current">${item.label}</span>`
              : html`<a class="breadcrumb-link" href=${item.href ?? '#'}>${item.label}</a>`}
          `;
        })}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-breadcrumb': SpecdBreadcrumb;
  }
}
