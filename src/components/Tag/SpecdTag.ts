import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type TagIntent = 'crit' | 'warn' | 'info' | 'neutral';

/**
 * Specd DS — Tag
 *
 * Coloured pill label for issue type tagging. Maps to `.issue-tag` CSS class.
 *
 * @element specd-tag
 *
 * @attr {string} label  - Tag text
 * @attr {string} intent - crit | warn | info | neutral
 * @attr {string} sub    - Optional sub-label (smaller text below main label)
 *
 * @example
 * <specd-tag label="No description" intent="crit"></specd-tag>
 * <specd-tag label="Published" intent="neutral"></specd-tag>
 */
@customElement('specd-tag')
export class SpecdTag extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string     = '';
  @property({ type: String }) intent: TagIntent = 'info';
  @property({ type: String }) sub: string       = '';

  override render() {
    return html`
      <span class="issue-tag ${this.intent}">
        ${this.label}
        ${this.sub ? html`<span class="issue-tag-sub">${this.sub}</span>` : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-tag': SpecdTag; }
}
