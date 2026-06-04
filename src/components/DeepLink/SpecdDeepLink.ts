import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const SEARCH = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>';

@customElement('specd-deep-link')
export class SpecdDeepLink extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: String }) name = '';
  @property({ type: String }) sub = '';
  @property({ type: String }) value?: string;
  @property({ type: String }) to?: string;
  @property({ type: String }) icon?: string;

  private _tier(v: number) { return v >= 85 ? 'good' : v >= 60 ? 'med' : 'poor'; }
  private _nav() { this.dispatchEvent(new CustomEvent('navigate', { detail: this.to, bubbles: true, composed: true })); }

  override render() {
    const n = this.value !== undefined ? Number(this.value) : NaN;
    return html`
      <button class="deep-link" @click=${this._nav}>
        <span class="di">${unsafeHTML(this.icon || SEARCH)}</span>
        <span><span class="dl-name">${this.name}</span><span class="dl-sub">${this.sub}</span></span>
        ${this.value !== undefined ? html`<span class="dl-pct ${this._tier(n)}">${this.value}</span>` : nothing}
      </button>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-deep-link': SpecdDeepLink; } }
