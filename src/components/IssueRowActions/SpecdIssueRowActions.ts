import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const JUMP_SVG    = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
const FIXES_SVG   = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
const IGNORE_SVG  = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`;

/**
 * Specd DS — IssueRowActions
 *
 * Action button bar: Jump to canvas, View Fixes, Ignore.
 *
 * @element specd-issue-row-actions
 *
 * @attr {boolean} showjump    - Show Jump button (default true)
 * @attr {boolean} showfixes   - Show View Fixes button (default true)
 * @attr {boolean} showignore  - Show Ignore button (default true)
 *
 * @fires specd-jump   - Jump button clicked
 * @fires specd-fixes  - View Fixes button clicked
 * @fires specd-ignore - Ignore button clicked
 */
@customElement('specd-issue-row-actions')
export class SpecdIssueRowActions extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Boolean }) showjump:   boolean = true;
  @property({ type: Boolean }) showfixes:  boolean = true;
  @property({ type: Boolean }) showignore: boolean = true;

  private _fire(name: string, e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="issue-tag-row">
        ${this.showjump   ? html`<button class="btn-jump"       type="button" @click=${(e: Event) => this._fire('specd-jump',   e)}>${unsafeHTML(JUMP_SVG)} Jump</button>`       : nothing}
        ${this.showfixes  ? html`<button class="btn-view-fixes"  type="button" @click=${(e: Event) => this._fire('specd-fixes',  e)}>${unsafeHTML(FIXES_SVG)} View Fixes</button>` : nothing}
        ${this.showignore ? html`<button class="btn-ghost"       type="button" @click=${(e: Event) => this._fire('specd-ignore', e)}>${unsafeHTML(IGNORE_SVG)} Ignore…</button>`   : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-issue-row-actions': SpecdIssueRowActions; }
}
