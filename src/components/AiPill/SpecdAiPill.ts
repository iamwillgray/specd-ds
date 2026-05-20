import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { AiPillProps } from './SpecdAiPill.types.js';

/**
 * Specd DS — AiPill
 *
 * A glassmorphism ghost pill with a sparkle icon for AI-powered actions.
 *
 * @element specd-ai-pill
 *
 * @attr {string} label - Text label displayed next to the sparkle icon
 *
 * @example
 * <specd-ai-pill label="Fix with AI"></specd-ai-pill>
 */
@customElement('specd-ai-pill')
export class SpecdAiPill extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = 'Fix with AI';

  override render() {
    return html`
      <span class="ai-pill">
        <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2l1.8 4.2L16 8l-4.2 1.8L10 14 8.2 9.8 4 8l4.2-1.8L10 2zM16 13l.9 2.1L19 16l-2.1.9L16 19l-.9-2.1L13 16l2.1-.9L16 13z"/>
        </svg>
        ${this.label}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-ai-pill': SpecdAiPill;
  }
}
