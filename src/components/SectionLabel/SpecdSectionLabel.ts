import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Specd DS — SectionLabel
 *
 * A section heading with optional hint text.
 *
 * @element specd-section-label
 *
 * @attr {string} label - Section heading text
 * @attr {string} hint  - Optional hint text displayed below the label
 *
 * @example
 * <specd-section-label label="Token Coverage" hint="Bound vs hard-coded"></specd-section-label>
 */
@customElement('specd-section-label')
export class SpecdSectionLabel extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: String }) hint?: string;

  override render() {
    return html`
      <div class="section-label">${this.label}</div>
      ${this.hint ? html`<div class="section-label-hint">${this.hint}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-section-label': SpecdSectionLabel;
  }
}
