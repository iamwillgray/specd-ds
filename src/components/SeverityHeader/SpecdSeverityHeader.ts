import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SeverityIntent } from './SpecdSeverityHeader.types.js';

/**
 * Specd DS — SeverityHeader
 *
 * A section header for grouping issues by severity, with a coloured dot, label, and optional count.
 *
 * @element specd-severity-header
 *
 * @attr {string} intent - Severity intent: critical | warning | info
 * @attr {string} label  - Header label text
 * @attr {number} count  - Optional issue count
 *
 * @example
 * <specd-severity-header intent="critical" label="Critical Issues" count="3"></specd-severity-header>
 */
@customElement('specd-severity-header')
export class SpecdSeverityHeader extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) intent: SeverityIntent = 'info';
  @property({ type: String }) label: string = '';
  @property({ type: Number }) count?: number;

  override render() {
    return html`
      <div class="severity-header">
        <span class="severity-dot ${this.intent}"></span>
        <span class="severity-title">${this.label}</span>
        ${this.count !== undefined
          ? html`<span class="severity-count ${this.intent}">${this.count}</span>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-severity-header': SpecdSeverityHeader;
  }
}
