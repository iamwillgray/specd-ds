import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { IssueSeverity } from './SpecdIssueCard.types.js';

const JUMP_SVG = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
const FIXES_SVG = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
const CHEVRON_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`;

/**
 * Specd DS — IssueCard
 *
 * Collapsible card for displaying a single audit issue.
 *
 * @element specd-issue-card
 *
 * @attr {string}  title        - Issue title
 * @attr {string}  severity     - crit | warn | info
 * @attr {string}  type         - Issue type label
 * @attr {string}  component    - Component name
 * @attr {boolean} open         - Initial open state
 *
 * @fires specd-jump       - User clicked Jump button
 * @fires specd-view-fixes - User clicked View Fixes button
 */
@customElement('specd-issue-card')
export class SpecdIssueCard extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = '';
  @property({ type: String }) severity: IssueSeverity = 'info';
  @property({ type: String }) type: string = '';
  @property({ type: String }) component: string = '';
  @property({ type: Boolean }) open: boolean = false;
  @state() private _open: boolean = false;

  override connectedCallback() {
    super.connectedCallback();
    this._open = this.open;
  }

  private _toggle() {
    this._open = !this._open;
    if (this._open) {
      this.setAttribute('data-open', 'true');
    } else {
      this.removeAttribute('data-open');
    }
  }

  private _jump(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('specd-jump', { bubbles: true, composed: true }));
  }

  private _viewFixes(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('specd-view-fixes', { bubbles: true, composed: true }));
  }

  override render() {
    const severityClass = this.severity === 'crit' ? 'issue-crit'
                        : this.severity === 'warn' ? 'issue-warn'
                        : 'issue-info';

    return html`
      <div class="issue-card-top ${severityClass}" @click=${this._toggle}>
        <div class="issue-card-icon">
          ${unsafeHTML(CHEVRON_SVG)}
        </div>
        <div class="issue-card-body">
          <div class="issue-card-title">${this.title}</div>
          ${this.component ? html`<div class="issue-card-component">${this.component}</div>` : nothing}
        </div>
        ${this.type ? html`<span class="chip-v2 dark issue-type-chip">${this.type}</span>` : nothing}
      </div>
      ${this._open ? html`
        <div class="issue-card-detail">
          <slot></slot>
          <div class="issue-card-footer">
            <slot name="footer">
              <button class="btn-jump" @click=${this._jump}>
                ${unsafeHTML(JUMP_SVG)} Jump
              </button>
              <button class="btn-view-fixes" @click=${this._viewFixes}>
                ${unsafeHTML(FIXES_SVG)} View Fixes
              </button>
            </slot>
          </div>
        </div>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-issue-card': SpecdIssueCard; }
}
