import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const SPARKLE = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 L13.5 9 L20 10.5 L13.5 12 L12 19 L10.5 12 L4 10.5 L10.5 9 Z"/></svg>`;

/**
 * Specd DS — AiGradientBtn
 *
 * AI-branded gradient button with sparkle icon.
 *
 * @element specd-ai-gradient-btn
 *
 * @attr {string}  label    - Button label text (default "Fix with AI")
 * @attr {boolean} disabled - Disabled state
 *
 * @fires click - Native click event
 */
@customElement('specd-ai-gradient-btn')
export class SpecdAiGradientBtn extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = 'Fix with AI';
  @property({ type: Boolean }) disabled: boolean = false;

  override render() {
    return html`
      <button class="btn-ai-gradient" type="button" ?disabled=${this.disabled}>
        ${unsafeHTML(SPARKLE)}
        <span class="ai-text">${this.label}</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-ai-gradient-btn': SpecdAiGradientBtn; }
}
