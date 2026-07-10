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

  /** Initial children captured before Lit replaces them with the render template */
  private _capturedSlot: Node[] = [];

  override connectedCallback() {
    super.connectedCallback();
    // Capture original children so we can re-insert them into .issue-fixes-panel
    if (!this._capturedSlot.length) {
      this._capturedSlot = Array.from(this.childNodes).filter(n => {
        if (n.nodeType === Node.TEXT_NODE) return (n.textContent || '').trim().length > 0;
        return n.nodeType === Node.ELEMENT_NODE;
      });
    }
  }

  override updated() {
    // Move captured children into the .issue-fixes-panel when expanded.
    // Also remove any stray captured nodes that ended up outside the card
    // (Lit light-DOM doesn't project <slot> automatically).
    const panel = this.querySelector(':scope > .issue-card > .issue-fixes-panel') as HTMLElement | null;
    if (this.expanded && panel) {
      this._capturedSlot.forEach(node => {
        if (node.parentNode !== panel) panel.appendChild(node);
      });
    } else {
      // Detach so they don't appear as floating siblings
      this._capturedSlot.forEach(node => {
        if (node.parentNode && node.parentNode !== this) {
          // already in a parent (panel removed when collapsed), nothing to do
        } else if (node.parentNode === this) {
          // direct child of host — remove from view by detaching
          this.removeChild(node);
        }
      });
    }
  }

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

        <div class="issue-content">
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
        </div>

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
            ${this.expanded ? 'Hide Fixes' : 'View Fixes'}
            ${badgeCount && badgeCount !== '!' ? html`<span class="view-fixes-count">${badgeCount}</span>` : nothing}
          </button>
        </div>

        <!-- Expandable fixes panel — children injected via updated() since light DOM has no <slot> -->
        ${this.expanded ? html`
          <div class="issue-fixes-panel"></div>
        ` : nothing}

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-issue-preview-card': SpecdIssuePreviewCard; }
}
