import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('specd-impact-row')
export class SpecdImpactRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Number }) rank = 0;
  @property({ type: String }) name = '';
  @property({ type: Number }) delta = 0;
  @property({ type: String }) sub?: string;
  @property({ type: String, attribute: 'component-id' }) componentId?: string;
  /** CTA button label. Rendered as the row's action button (light DOM has no
   *  working <slot>, so the component renders its own button). Clicking it
   *  emits the same `open` event as the name. */
  @property({ type: String }) cta?: string;

  private _open() {
    this.dispatchEvent(new CustomEvent('open', { detail: this.componentId, bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="impact-row">
        <div class="impact-rank">${this.rank}</div>
        <div class="impact-main">
          <a class="impact-name" @click=${this._open}>${this.name}<span class="arrow">&rarr;</span></a>
          ${this.sub ? html`<div class="impact-sub">${unsafeHTML(this.sub)}</div>` : nothing}
        </div>
        <div class="impact-cta">
          <span class="impact-delta">+${this.delta} pts</span>
          ${this.cta ? html`<button class="btn btn-primary btn-sm" @click=${this._open}>${this.cta}</button>` : html`<slot></slot>`}
        </div>
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'specd-impact-row': SpecdImpactRow; } }
