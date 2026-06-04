import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const BOLT = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';

@customElement('specd-automation-banner')
export class SpecdAutomationBanner extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title = '';
  @property({ type: String }) sub = '';
  /** CTA button label. Rendered as the banner's action button (light DOM has no
   *  working <slot>, so the component renders its own button). Clicking it
   *  emits a `run` event. */
  @property({ type: String }) cta?: string;

  private _run() {
    this.dispatchEvent(new CustomEvent('run', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="auto-banner">
        <div class="ico">${unsafeHTML(BOLT)}</div>
        <div class="txt"><b>${this.title}</b><span>${this.sub}</span></div>
        ${this.cta ? html`<button class="btn btn-primary" @click=${this._run}>${this.cta}</button>` : html`<slot></slot>`}
      </div>`;
  }
}

declare global { interface HTMLElementTagNameMap { 'specd-automation-banner': SpecdAutomationBanner; } }
