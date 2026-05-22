import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../IssueRowActions/SpecdIssueRowActions.js';
import '../IgnoreFooter/SpecdIgnoreFooter.js';

export type IssueRowState = 'default' | 'actions' | 'ignore';
export type IssueRowSeverity = 'crit' | 'warn' | 'info';

/**
 * Specd DS — IssueRow
 *
 * A single issue row with expandable action tray and ignore flow.
 * State machine: default → actions → ignore → default
 *
 * @element specd-issue-row
 *
 * @attr {string} title     - Issue title / description
 * @attr {string} severity  - crit | warn | info
 * @attr {string} type      - Issue type tag label
 * @attr {string} component - Component name
 * @attr {string} rowstate  - Initial state: default | actions | ignore
 *
 * @fires specd-jump         - Jump to canvas
 * @fires specd-fixes        - View fixes
 * @fires specd-ignore-all   - Ignore all issues of this type
 * @fires specd-ignore-cancel - Ignore cancelled
 */
@customElement('specd-issue-row')
export class SpecdIssueRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = '';
  @property({ type: String }) severity: IssueRowSeverity = 'info';
  @property({ type: String }) type: string = '';
  @property({ type: String }) component: string = '';
  @property({ type: String }) rowstate: IssueRowState = 'default';
  @state() private _state: IssueRowState = 'default';

  override connectedCallback() {
    super.connectedCallback();
    this._state = this.rowstate;
    this._syncAttr();
  }

  private _syncAttr() {
    this.setAttribute('data-row-state', this._state);
  }

  private _setState(s: IssueRowState) {
    this._state = s;
    this._syncAttr();
  }

  private _severityClass() {
    return this.severity === 'crit' ? 'sev-crit'
         : this.severity === 'warn' ? 'sev-warn'
         : 'sev-info';
  }

  private _chipClass() {
    return this.severity === 'crit' ? 'chip-v2 negative'
         : this.severity === 'warn' ? 'chip-v2 warning'
         : 'chip-v2';
  }

  override render() {
    const isExpanded = this._state !== 'default';
    return html`
      <div
        class="issue-row ${this._severityClass()} ${isExpanded ? 'is-expanded' : ''}"
        data-row-state=${this._state}
        @click=${() => this._state === 'default' && this._setState('actions')}
      >
        <div class="issue-row-main">
          <div class="issue-row-top-line">
            <span class="issue-row-title">${this.title}</span>
            ${this.type ? html`<span class="${this._chipClass()}">${this.type}</span>` : nothing}
            ${this._state === 'default' ? html`
              <span class="issue-row-chevron" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            ` : nothing}
          </div>
          ${this.component ? html`<div class="issue-row-comp">${this.component}</div>` : nothing}
        </div>

        ${this._state === 'actions' ? html`
          <specd-issue-row-actions
            @specd-jump=${(e: Event)   => { e.stopPropagation(); this.dispatchEvent(new CustomEvent('specd-jump',  { bubbles: true, composed: true })); }}
            @specd-fixes=${(e: Event)  => { e.stopPropagation(); this.dispatchEvent(new CustomEvent('specd-fixes', { bubbles: true, composed: true })); }}
            @specd-ignore=${(e: Event) => { e.stopPropagation(); this._setState('ignore'); }}
          ></specd-issue-row-actions>
        ` : nothing}

        ${this._state === 'ignore' ? html`
          <specd-ignore-footer
            @specd-ignore-all=${(e: Event)    => { e.stopPropagation(); this.dispatchEvent(new CustomEvent('specd-ignore-all',    { bubbles: true, composed: true })); this._setState('default'); }}
            @specd-ignore-cancel=${(e: Event) => { e.stopPropagation(); this.dispatchEvent(new CustomEvent('specd-ignore-cancel', { bubbles: true, composed: true })); this._setState('default'); }}
          ></specd-ignore-footer>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-issue-row': SpecdIssueRow; }
}
