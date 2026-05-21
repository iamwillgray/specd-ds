import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Specd DS — IgnoreFooter
 *
 * Action footer for ignore workflows: Ignore all / Ignore selected / Cancel.
 *
 * @element specd-ignore-footer
 *
 * @attr {boolean} showselected - Show the "Ignore selected" button (when checkboxes are enabled)
 *
 * @fires specd-ignore-all      - User clicked Ignore all
 * @fires specd-ignore-selected - User clicked Ignore selected
 * @fires specd-ignore-cancel   - User clicked Cancel
 */
@customElement('specd-ignore-footer')
export class SpecdIgnoreFooter extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Boolean }) showselected: boolean = false;

  private _fire(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="ignore-footer">
        <button class="btn-ignore-all"      type="button" @click=${() => this._fire('specd-ignore-all')}>Ignore all</button>
        ${this.showselected ? html`
          <button class="btn-ignore-selected" type="button" @click=${() => this._fire('specd-ignore-selected')}>Ignore selected</button>
        ` : ''}
        <button class="btn-ignore-cancel"   type="button" @click=${() => this._fire('specd-ignore-cancel')}>Cancel</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-ignore-footer': SpecdIgnoreFooter; }
}
