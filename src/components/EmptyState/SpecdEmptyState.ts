import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { EmptyStateProps } from './SpecdEmptyState.types.js';

/**
 * Specd DS — EmptyState
 *
 * @element specd-empty-state
 * @attr {string} title       - Main heading text
 * @attr {string} description - Optional description text
 * @attr {string} icon        - Optional raw SVG string
 */
@customElement('specd-empty-state')
export class SpecdEmptyState extends LitElement implements EmptyStateProps {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = '';
  @property({ type: String }) description?: string;
  @property({ type: String }) icon?: string;

  override render() {
    return html`
      <div class="empty-state">
        ${this.icon ? html`<div class="empty-state-icon">${unsafeHTML(this.icon)}</div>` : nothing}
        <p class="empty-state-title">${this.title}</p>
        ${this.description ? html`<p class="empty-state-desc">${this.description}</p>` : nothing}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-empty-state': SpecdEmptyState;
  }
}
