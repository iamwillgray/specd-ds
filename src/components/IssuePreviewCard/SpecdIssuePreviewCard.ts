import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../IgnoreFooter/SpecdIgnoreFooter.js';
import '../Tag/SpecdTag.js';
import '../JumpBtn/SpecdJumpBtn.js';

export type IssuePreviewCardState    = 'default' | 'ignore';
export type IssuePreviewCardSeverity = 'crit' | 'warn' | 'info';

interface IssueTag { label: string; sev?: 'crit' | 'warn' | 'info' | 'neutral'; }

const DIAMOND_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" style="width:14px;height:14px;flex-shrink:0;color:var(--icon-secondary)"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>`;

/**
 * Specd DS — IssuePreviewCard
 *
 * A component-level issue card matching the Specd DS reference design.
 * Shows: component name + severity badge, issue tags, footer actions.
 *
 * @element specd-issue-preview-card
 *
 * @attr {string}  component  - Component name (e.g. "Button/Primary")
 * @attr {string}  type       - Badge label (e.g. "Missing desc", "Hard-coded", "No link")
 * @attr {string}  count      - Badge count value ("!" for crit, number for others)
 * @attr {string}  severity   - crit | warn | info
 * @attr {string}  tags       - JSON: [{label, sev}] where sev is crit|warn|info|neutral
 * @attr {boolean} showfixes  - Show the "View Fixes" button in the footer
 * @attr {string}  rowstate   - Initial state: default | ignore
 *
 * @fires specd-jump          - Jump to canvas
 * @fires specd-fixes         - View Fixes clicked
 * @fires specd-ignore-all    - Ignore confirmed
 * @fires specd-ignore-cancel - Ignore cancelled
 */
@customElement('specd-issue-preview-card')
export class SpecdIssuePreviewCard extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) component: string                    = '';
  @property({ type: String }) type: string                         = '';
  @property({ type: String }) count: string                        = '';
  @property({ type: String }) severity: IssuePreviewCardSeverity   = 'info';
  @property({ type: String }) tags: string                         = '[]';
  @property({ type: Boolean }) showfixes: boolean                  = false;
  @property({ type: String }) rowstate: IssuePreviewCardState      = 'default';

  @state() private _state: IssuePreviewCardState = 'default';

  override connectedCallback() {
    super.connectedCallback();
    this._state = this.rowstate;
    this._syncAttr();
  }

  private _syncAttr() { this.setAttribute('data-row-state', this._state); }

  private _setState(s: IssuePreviewCardState) { this._state = s; this._syncAttr(); }

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

        <!-- Content area -->
        <div class="issue-content">

          <!-- Header: component name + severity badge -->
          <div class="issue-card-top">
            <span class="issue-comp-tag">
              ${unsafeHTML(DIAMOND_SVG)}
              ${this.component || 'Unknown component'}
            </span>
            ${this.type ? html`
              <span class="issue-card-count ${this.severity}">
                ${this.type}
                ${badgeCount ? html`<span class="issue-card-count-badge">${badgeCount}</span>` : nothing}
              </span>
            ` : nothing}
          </div>

          <!-- Issue tags -->
          ${parsedTags.length ? html`
            <div class="issue-tag-row">
              ${parsedTags.map(t => html`
                <specd-tag label=${t.label} intent=${t.sev ?? this.severity}></specd-tag>
              `)}
            </div>
          ` : nothing}

        </div>

        <!-- Footer (default state) -->
        ${this._state === 'default' ? html`
          <div class="issue-card-footer">
            <specd-jump-btn
              label="Jump to component"
              @click=${(e: Event) => { e.stopPropagation(); this._fire('specd-jump'); }}
            ></specd-jump-btn>

            ${this.showfixes ? html`
              <button class="btn-view-fixes" type="button"
                @click=${(e: Event) => { e.stopPropagation(); this._fire('specd-fixes'); }}>
                View Fixes
                ${badgeCount && badgeCount !== '!' ? html`<span class="view-fixes-count">${badgeCount}</span>` : nothing}
              </button>
            ` : nothing}

            <button class="btn-ghost" type="button"
              style="margin-left:${this.showfixes ? '0' : 'auto'}"
              @click=${(e: Event) => { e.stopPropagation(); this._setState('ignore'); }}>
              Ignore…
            </button>
          </div>
        ` : nothing}

        <!-- Ignore footer -->
        ${this._state === 'ignore' ? html`
          <specd-ignore-footer
            @specd-ignore-all=${(e: Event) => {
              e.stopPropagation();
              this._fire('specd-ignore-all');
              this._setState('default');
            }}
            @specd-ignore-cancel=${(e: Event) => {
              e.stopPropagation();
              this._fire('specd-ignore-cancel');
              this._setState('default');
            }}
          ></specd-ignore-footer>
        ` : nothing}

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-issue-preview-card': SpecdIssuePreviewCard; }
}
