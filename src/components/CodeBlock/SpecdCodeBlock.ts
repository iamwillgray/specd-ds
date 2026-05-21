import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { CodeBlockProps } from './SpecdCodeBlock.types.js';

/**
 * Specd DS — CodeBlock
 *
 * @element specd-code-block
 * @attr {string} code     - Code string to display
 * @attr {string} language - Language hint (e.g. 'css', 'ts', 'json')
 * @fires specd-copy - Emitted when the copy button is clicked, detail: { code }
 */
@customElement('specd-code-block')
export class SpecdCodeBlock extends LitElement implements CodeBlockProps {
  override createRenderRoot() { return this; }

  @property({ type: String }) code: string = '';
  @property({ type: String }) language?: string;

  private async _copy() {
    try {
      await navigator.clipboard.writeText(this.code);
    } catch {
      // clipboard not available in test env — ignore
    }
    this.dispatchEvent(new CustomEvent('specd-copy', { detail: { code: this.code }, bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="code-block">
        <button class="code-block-copy" @click=${() => this._copy()}>Copy</button>
        <code>${this.code}</code>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-code-block': SpecdCodeBlock;
  }
}
