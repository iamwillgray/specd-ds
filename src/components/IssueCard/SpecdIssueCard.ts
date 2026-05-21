import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { IssueSeverity, IssueTag } from './SpecdIssueCard.types.js';

const DIAMOND_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>`;

/**
 * Specd DS — IssueCard
 *
 * Compound card displaying a component's audit issues with severity tags.
 *
 * @element specd-issue-card
 *
 * @attr {string} name     - Component name
 * @attr {number} count    - Number of issues
 * @attr {string} severity - Severity level: crit | warn | info
 * @attr {string} tags     - JSON array of IssueTag objects
 * @attr {string} icon     - Optional SVG icon HTML string
 */
@customElement('specd-issue-card')
export class SpecdIssueCard extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) name: string = '';
  @property({ type: Number }) count: number = 0;
  @property({ type: String }) severity: IssueSeverity = 'info';
  @property({ type: String }) tags: string = '[]';
  @property({ type: String }) icon?: string;

  private _parsedTags(): IssueTag[] {
    try { return JSON.parse(this.tags); } catch { return []; }
  }

  override render() {
    const tags = this._parsedTags();
    return html`
      <div class="issue-card">
        <div class="issue-content">
          <div class="issue-card-top">
            <div class="issue-comp-tag">
              ${unsafeHTML(this.icon || DIAMOND_SVG)}
              <span>${this.name}</span>
            </div>
            <div class="issue-card-count ${this.severity}">
              ${this.count} issue${this.count !== 1 ? 's' : ''}
            </div>
          </div>
          ${tags.length > 0 ? html`
            <div class="issue-tag-row">
              ${tags.map(t => html`
                <div class="issue-tag ${t.severity}">
                  ${t.label}
                  ${t.sub ? html`<span class="issue-tag-sub">${t.sub}</span>` : nothing}
                </div>
              `)}
            </div>
          ` : nothing}
        </div>
        <div class="issue-card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-issue-card': SpecdIssueCard;
  }
}
