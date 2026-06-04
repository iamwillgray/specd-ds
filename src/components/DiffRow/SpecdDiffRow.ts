import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const ARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

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

  private _edit(e: Event) {
    const v = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.dispatchEvent(new CustomEvent('edit', { detail: v, bubbles: true, composed: true }));
  }

  override render() {
    const isStaged = this.staged || this.committed;
    const emptyBefore = !this.beforeVal;
    const tag = this.committed ? html`&#10003; applied` : html`&#10003; staged`;
    const afterField = this.multiline
      ? html`<textarea rows="3" .value=${this.afterVal} @input=${this._edit}></textarea>`
      : html`<input type="text" .value=${this.afterVal} @input=${this._edit} />`;
    return html`
      <div class="diff-row ${isStaged ? 'staged' : ''}">
        <div class="diff-row-head"><span class="field">${this.field}</span><span class="staged-tag">${tag}</span></div>
        <div class="diff-cols">
          <div class="diff-cell before ${emptyBefore ? 'empty' : ''}"><div class="lbl">Before</div><div class="val">${emptyBefore ? this.beforeEmpty : this.beforeVal}</div></div>
          <div class="diff-arrow">${unsafeHTML(ARROW)}</div>
          <div class="diff-cell after"><div class="lbl">After</div>${afterField}</div>
        </div>
      </div>`;
  }
}

declare global { interface HTMLElementTagNameMap { 'specd-diff-row': SpecdDiffRow; } }
