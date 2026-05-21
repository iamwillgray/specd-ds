import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { KvRowProps } from './SpecdKvRow.types.js';

/**
 * Specd DS — KvRow
 *
 * Key-value row for displaying label/value pairs.
 *
 * @element specd-kv-row
 * @attr {string}  label - Label text
 * @attr {string}  value - Value text
 * @attr {boolean} mono  - Render value in monospace font
 */
@customElement('specd-kv-row')
export class SpecdKvRow extends LitElement implements KvRowProps {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: String }) value: string = '';
  @property({ type: Boolean }) mono: boolean = false;

  override render() {
    return html`
      <div class="kv-row">
        <span class="kv-label">${this.label}</span>
        <span class="kv-value ${this.mono ? 'mono' : ''}">${this.value}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-kv-row': SpecdKvRow;
  }
}
