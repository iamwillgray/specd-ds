import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const ARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
const SPARKLE = '<svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor"><path d="M10.5 2a.75.75 0 0 1 .74.62l.62 3.44 3.44.62a.75.75 0 0 1 0 1.48l-3.44.62-.62 3.44a.75.75 0 0 1-1.48 0l-.62-3.44-3.44-.62a.75.75 0 0 1 0-1.48l3.44-.62.62-3.44A.75.75 0 0 1 10.5 2Z"/></svg>';

@customElement('specd-diff-row')
export class SpecdDiffRow extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: String }) field = '';
  @property({ type: String, attribute: 'before' }) beforeVal = '';
  @property({ type: String, attribute: 'before-empty' }) beforeEmpty = '';
  @property({ type: String, attribute: 'after' }) afterVal = '';
  @property({ type: Boolean }) multiline = false;
  @property({ type: Boolean }) staged = false;
  @property({ type: Boolean }) committed = false;
  @property({ type: Boolean }) generatable = false;

  private _edit(e: Event) {
    const v = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.dispatchEvent(new CustomEvent('edit', { detail: v, bubbles: true, composed: true }));
  }

  private _generate() {
    this.dispatchEvent(new CustomEvent('generate', { bubbles: true, composed: true }));
  }

  override render() {
    const isStaged = this.staged || this.committed;
    const emptyBefore = !this.beforeVal;
    const tag = this.committed ? html`&#10003; applied` : html`&#10003; staged`;

    /* Empty-state layout: nothing to diff against yet, so the two-column
     * before/after comparison is pure clutter — there's no "before" worth
     * showing. One highlighted, actionable field instead: a dashed accent
     * outline (not a filled violet background — DESIGN.md reserves violet
     * fills for real interactive moments, and a dashed outline specifically
     * signals "an empty slot waiting for your input" the same way file
     * pickers / "add card" tiles do elsewhere) plus an inline Generate
     * action where it's plausible (never for a URL — only a human knows
     * the right link). */
    if (emptyBefore) {
      const afterField = this.multiline
        ? html`<textarea rows="3" placeholder=${this.beforeEmpty || 'Not set'} .value=${this.afterVal} @input=${this._edit}></textarea>`
        : html`<input type="text" placeholder=${this.beforeEmpty || 'Not set'} .value=${this.afterVal} @input=${this._edit} />`;
      /* Flag only while genuinely untouched — once staged/committed the
       * user has already acted, so "Missing" would contradict the
       * staged-tag sitting right next to it instead of explaining the
       * dashed outline's meaning. This is what makes the empty-state
       * header self-explanatory instead of relying on the dashed border
       * alone to communicate "this is flagged". */
      const showMissingFlag = !isStaged;
      return html`
        <div class="diff-row diff-row-empty ${isStaged ? 'staged' : ''}">
          <div class="diff-row-head">
            <span class="field">${this.field}</span>
            ${showMissingFlag ? html`<span class="diff-row-flag"><span class="diff-row-flag-dot"></span>Missing</span>` : ''}
            <span class="staged-tag">${tag}</span>
          </div>
          <div class="diff-empty-body">
            ${afterField}
            ${this.generatable
              ? html`<button class="diff-generate-btn" @click=${this._generate}>${unsafeHTML(SPARKLE)} Generate</button>`
              : ''}
          </div>
        </div>`;
    }

    const afterField = this.multiline
      ? html`<textarea rows="3" .value=${this.afterVal} @input=${this._edit}></textarea>`
      : html`<input type="text" .value=${this.afterVal} @input=${this._edit} />`;
    return html`
      <div class="diff-row ${isStaged ? 'staged' : ''}">
        <div class="diff-row-head"><span class="field">${this.field}</span><span class="staged-tag">${tag}</span></div>
        <div class="diff-cols">
          <div class="diff-cell before"><div class="lbl">Before</div><div class="val">${this.beforeVal}</div></div>
          <div class="diff-arrow">${unsafeHTML(ARROW)}</div>
          <div class="diff-cell after"><div class="lbl">After</div>${afterField}</div>
        </div>
      </div>`;
  }
}

declare global { interface HTMLElementTagNameMap { 'specd-diff-row': SpecdDiffRow; } }
