import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../Tag/SpecdTag.js';
import '../JumpBtn/SpecdJumpBtn.js';

export type IssuePreviewCardSeverity = 'crit' | 'warn' | 'info';

interface IssueTag { label: string; sev?: 'crit' | 'warn' | 'info' | 'neutral'; }

const DIAMOND_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" style="width:12px;height:12px;flex-shrink:0;color:var(--icon-secondary)"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>`;

/**
 * Specd DS — IssuePreviewCard
 *
 * A component-level issue card. Shows component name, severity badge,
 * issue tags, Jump button, and View Fixes action. Supports an expandable
 * fixes panel via the `expanded` prop and default slot.
 *
 * @element specd-issue-preview-card
 *
 * @attr {string}  component - Component name (e.g. "Button/Primary")
 * @attr {string}  type      - Badge label (e.g. "Missing desc")
 * @attr {string}  count     - Badge count ("!" for crit, number for others)
 * @attr {string}  severity  - crit | warn | info
 * @attr {string}  tags      - JSON: [{label, sev}]
 * @attr {boolean} expanded  - Show the fixes panel (slot content)
 *
 * @fires specd-jump  - Jump to canvas
 * @fires specd-fixes - View Fixes clicked
 */
@customElement('specd-issue-preview-card')
export class SpecdIssuePreviewCard extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String })  component: string                  = '';
  @property({ type: String })  type: string                       = '';
  @property({ type: String })  count: string                      = '';
  @property({ type: String })  severity: IssuePreviewCardSeverity = 'info';
  @property({ type: String })  tags: string                       = '[]';
  @property({ type: Boolean }) expanded: boolean                  = false;

  private _parsedTags(): IssueTag[] {
    try { return JSON.parse(this.tags) as IssueTag[]; } catch { return []; }
  }

  private _badgeCount(): string {
    if (this.count) return this.count;
    return this.severity === 'crit' ? '!' : '';
  }

  private _fire(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  override render() {
    const parsedTags = this._parsedTags();
    const badgeCount = this._badgeCount();

    return html`
      <div class="issue-card">

        <!-- Card top: icon + component name + badge -->
        <div class="issue-card-top">
          <div class="issue-card-icon">${unsafeHTML(DIAMOND_SVG)}</div>
          <span class="issue-name">${this.component || 'Unknown component'}</span>
          ${this.type ? html`
            <span class="issue-card-count ${this.severity}">
              ${this.type}
              ${badgeCount ? html`<span class="issue-card-count-badge">${badgeCount}</span>` : nothing}
            </span>
          ` : nothing}
        </div>

        <!-- Issue tags (stacked, each on its own line) -->
        ${parsedTags.length ? html`
          <div class="issue-tag-row stacked">
            ${parsedTags.map(t => html`
              <specd-tag label=${t.label} intent=${t.sev ?? this.severity}></specd-tag>
            `)}
          </div>
        ` : nothing}

        <!-- Footer: Jump + View Fixes -->
        <div class="issue-card-footer">
          <specd-jump-btn
            label="Jump to component"
            @click=${(e: Event) => { e.stopPropagation(); this._fire('specd-jump'); }}
          ></specd-jump-btn>

          <button class="btn-view-fixes" type="button"
            @click=${(e: Event) => {
              e.stopPropagation();
              this.expanded = !this.expanded;
              this._fire('specd-fixes');
            }}>
            View Fixes
            ${badgeCount && badgeCount !== '!' ? html`<span class="view-fixes-count">${badgeCount}</span>` : nothing}
          </button>
        </div>

        <!-- Expandable fixes panel -->
        ${this.expanded ? html`
          <div class="issue-card-fixes">
            <slot></slot>
          </div>
        ` : nothing}

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-issue-preview-card': SpecdIssuePreviewCard; }
}
