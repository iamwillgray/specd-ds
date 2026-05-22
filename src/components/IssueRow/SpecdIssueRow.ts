import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type IssueRowFieldType =
  | 'doc-link'
  | 'description'
  | 'dev-ready'
  | 'mark-complete'
  | 'hard-coded';

export type IssueRowState = 'initial' | 'editing' | 'applied';

const ICON_LINK    = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
const ICON_TEXT    = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>`;
const ICON_CHECK   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
const ICON_CODE    = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
const SPARKLE_SVG  = `<svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path d="M15.75 12C15.9498 12 16.1308 12.1186 16.209 12.3027L16.8809 13.8691L18.4473 14.541C18.6314 14.6192 18.75 14.8002 18.75 15C18.75 15.1998 18.6314 15.3808 18.4473 15.459L16.8809 16.1309L16.209 17.6973C16.1308 17.8814 15.9498 18 15.75 18C15.5502 18 15.3692 17.8814 15.291 17.6973L14.6191 16.1309L13.0527 15.459C12.8686 15.3808 12.75 15.1998 12.75 15C12.75 14.8002 12.8686 14.6192 13.0527 14.541L14.6191 13.8691L15.291 12.3027C15.3692 12.1186 15.5502 12 15.75 12Z"/></svg>`;
const CHECK_SVG    = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

function iconFor(ft: IssueRowFieldType): string {
  if (ft === 'doc-link')    return ICON_LINK;
  if (ft === 'description') return ICON_TEXT;
  if (ft === 'hard-coded')  return ICON_CODE;
  return ICON_CHECK;
}

/** Direct-apply field types — no edit state, CTA jumps straight to applied */
const DIRECT_APPLY: IssueRowFieldType[] = ['dev-ready', 'mark-complete'];
/** External-action types — no state change, just fires an event */
const EXTERNAL_ACTION: IssueRowFieldType[] = ['hard-coded'];

/**
 * Specd DS — IssueRow
 *
 * An action row for a single issue field. Implements a three-state machine:
 * initial → editing → applied. State is tracked on the `data-row-state`
 * host attribute so CSS visibility rules in components.css apply automatically.
 *
 * @element specd-issue-row
 *
 * @attr {string} fieldtype   - doc-link | description | dev-ready | mark-complete | hard-coded
 * @attr {string} title       - Row heading text
 * @attr {string} description - Sub-text shown below the title
 * @attr {string} value       - Current field value (URL, text, etc.)
 * @attr {string} rowstate    - Initial state: initial | editing | applied
 *
 * @fires specd-save       - Save pill clicked or direct-apply CTA clicked; detail: { fieldtype, value }
 * @fires specd-cancel     - Cancel pill clicked
 * @fires specd-ai-write   - AI gradient button clicked (description fieldtype)
 * @fires specd-quick-fix  - "View in Quick Fix" clicked (hard-coded fieldtype)
 * @fires specd-edit       - Edit pill clicked in applied state
 */
@customElement('specd-issue-row')
export class SpecdIssueRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) fieldtype: IssueRowFieldType = 'doc-link';
  @property({ type: String }) title: string = '';
  @property({ type: String }) description: string = '';
  @property({ type: String }) value: string = '';
  @property({ type: String }) rowstate: IssueRowState = 'initial';

  @state() private _state: IssueRowState = 'initial';
  @state() private _editValue: string = '';

  override connectedCallback() {
    super.connectedCallback();
    this._state = this.rowstate;
    this._editValue = this.value;
    this._syncAttr();
  }

  private _syncAttr() { this.setAttribute('data-row-state', this._state); }

  private _setState(s: IssueRowState) { this._state = s; this._syncAttr(); }

  private _fire(name: string, detail?: Record<string, unknown>) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _handleCta() {
    if (EXTERNAL_ACTION.includes(this.fieldtype)) {
      this._fire('specd-quick-fix');
      return;
    }
    if (DIRECT_APPLY.includes(this.fieldtype)) {
      this._setState('applied');
      this._fire('specd-save', { fieldtype: this.fieldtype, value: this._editValue });
      return;
    }
    if (this.fieldtype === 'description') {
      this._setState('editing');
      this._fire('specd-ai-write');
      return;
    }
    this._setState('editing');
  }

  private _handleSave() {
    this._setState('applied');
    this._fire('specd-save', { fieldtype: this.fieldtype, value: this._editValue });
  }

  private _handleCancel() {
    this._editValue = this.value;
    this._setState('initial');
    this._fire('specd-cancel');
  }

  private _renderEditCluster() {
    return html`
      <div class="row-edit-cluster">
        <button class="btn-save-pill" type="button"
          @click=${(e: Event) => { e.stopPropagation(); this._handleSave(); }}>Save</button>
        <button class="btn-cancel-pill" type="button"
          @click=${(e: Event) => { e.stopPropagation(); this._handleCancel(); }}>Cancel</button>
      </div>
    `;
  }

  private _renderInitialCta() {
    if (this.fieldtype === 'description') {
      return html`
        <button class="btn-ai-gradient" type="button"
          @click=${(e: Event) => { e.stopPropagation(); this._handleCta(); }}>
          ${unsafeHTML(SPARKLE_SVG)}
          <span class="ai-text">Write with AI</span>
        </button>
      `;
    }
    if (this.fieldtype === 'hard-coded') {
      return html`
        <button class="btn-row-primary btn-hc-ghost" type="button"
          @click=${(e: Event) => { e.stopPropagation(); this._handleCta(); }}>
          View in Quick Fix
        </button>
      `;
    }
    const labels: Record<IssueRowFieldType, string> = {
      'doc-link':      'Add doc link',
      'description':   'Write with AI',
      'dev-ready':     'Mark dev ready',
      'mark-complete': 'Mark complete',
      'hard-coded':    'View in Quick Fix',
    };
    return html`
      <button class="btn-row-primary" type="button"
        @click=${(e: Event) => { e.stopPropagation(); this._handleCta(); }}>
        ${labels[this.fieldtype]}
      </button>
    `;
  }

  private _renderEditingContent() {
    if (this.fieldtype === 'doc-link') {
      return html`
        <div class="row-link-field is-editing">
          <input
            type="url"
            placeholder="https://…"
            .value=${this._editValue}
            @input=${(e: Event) => { this._editValue = (e.target as HTMLInputElement).value; }}
          />
          ${this._renderEditCluster()}
        </div>
      `;
    }
    if (this.fieldtype === 'description') {
      return html`
        <div class="row-textarea-field is-editing is-gradient">
          <textarea
            placeholder="Describe this component…"
            .value=${this._editValue}
            @input=${(e: Event) => { this._editValue = (e.target as HTMLTextAreaElement).value; }}
          ></textarea>
          ${this._renderEditCluster()}
        </div>
      `;
    }
    return nothing;
  }

  override render() {
    return html`
      <div class="issue-row" data-row-state=${this._state}>

        <!-- Top row: always visible -->
        <div class="issue-row-top">
          <div class="issue-row-body">
            <div class="issue-row-title">
              ${unsafeHTML(iconFor(this.fieldtype))}
              ${this.title}
            </div>
            ${this.description ? html`<div class="issue-row-desc">${this.description}</div>` : nothing}
          </div>

          <!-- Initial CTA (hidden in editing/applied via CSS) -->
          <div class="row-state-initial">
            ${this._renderInitialCta()}
          </div>

          <!-- Applied: show applied button + edit pill -->
          <div class="row-state-applied" style="display:flex;align-items:center;gap:6px;">
            <button class="btn-row-applied" type="button" disabled>
              ${unsafeHTML(CHECK_SVG)}
              Applied
            </button>
            <button class="btn-edit-pill" type="button"
              @click=${(e: Event) => { e.stopPropagation(); this._setState('initial'); this._fire('specd-edit'); }}>
              Edit
            </button>
          </div>
        </div>

        <!-- Editing content (hidden in initial/applied via CSS) -->
        <div class="row-state-editing">
          ${this._renderEditingContent()}
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-issue-row': SpecdIssueRow; }
}
