import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { CheckState } from './SpecdCheckItem.types.js';

const ICONS: Record<CheckState, string> = {
  pass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  fail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="7" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>',
};

@customElement('specd-check-item')
export class SpecdCheckItem extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: String }) label = '';
  @property({ type: String }) sub?: string;
  @property({ type: String }) state: CheckState = 'pass';
  override render() {
    return html`
      <div class="check ${this.state}">
        <span class="badge">${unsafeHTML(ICONS[this.state])}</span>${this.label}
        ${this.sub ? html`<span class="ck-sub">${this.sub}</span>` : nothing}
      </div>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-check-item': SpecdCheckItem; } }
