import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const BOLT = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';

@customElement('specd-automation-banner')
export class SpecdAutomationBanner extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title = '';
  @property({ type: String }) sub = '';

  override render() {
    return html`
      <div class="auto-banner">
        <div class="ico">${unsafeHTML(BOLT)}</div>
        <div class="txt"><b>${this.title}</b><span>${this.sub}</span></div>
        <slot></slot>
      </div>`;
  }
}

declare global { interface HTMLElementTagNameMap { 'specd-automation-banner': SpecdAutomationBanner; } }
