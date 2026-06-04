import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const CHEVRON_LEFT = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';

@customElement('specd-drill-header')
export class SpecdDrillHeader extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String, attribute: 'back-label' }) backLabel = 'Back';
  @property({ type: String }) parent?: string;
  @property({ type: String }) crumb = '';

  private _back() {
    this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="dd-bar">
        <button class="dd-back" @click=${this._back}>
          ${unsafeHTML(CHEVRON_LEFT)} ${this.backLabel}
        </button>
        <div class="dd-crumb">
          ${this.parent ? html`<span>${this.parent}</span> <span class="sep">&#9656;</span> ` : nothing}
          <b>${this.crumb}</b>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-drill-header': SpecdDrillHeader; }
}
