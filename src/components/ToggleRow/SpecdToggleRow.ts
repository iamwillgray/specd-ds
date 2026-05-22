import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../Toggle/SpecdToggle.js';

/**
 * Specd DS — ToggleRow
 *
 * A labelled toggle switch row with optional hint text.
 *
 * @element specd-toggle-row
 *
 * @attr {string}  label   - Label text
 * @attr {string}  hint    - Optional hint text
 * @attr {boolean} checked - Whether the toggle is on (default false)
 *
 * @fires specd-change - Dispatched when toggle is clicked, detail: { checked: boolean }
 *
 * @example
 * <specd-toggle-row label="Ignore hidden layers" checked></specd-toggle-row>
 */
@customElement('specd-toggle-row')
export class SpecdToggleRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: String }) hint?: string;
  @property({ type: Boolean }) checked: boolean = false;

  override render() {
    return html`
      <div class="toggle-row">
        <div class="toggle-row-text">
          <div class="toggle-row-label">${this.label}</div>
          ${this.hint ? html`<div class="toggle-row-hint">${this.hint}</div>` : nothing}
        </div>
        <specd-toggle
          .checked=${this.checked}
          @change=${(e: Event) => {
            e.stopPropagation();
            const input = (e.target as HTMLElement).querySelector('input[type="checkbox"]') as HTMLInputElement | null;
            this.checked = input ? input.checked : !this.checked;
            this.dispatchEvent(new CustomEvent('specd-change', { detail: { checked: this.checked }, bubbles: true, composed: true }));
          }}
        ></specd-toggle>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-toggle-row': SpecdToggleRow;
  }
}
