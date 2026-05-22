import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../Button/SpecdButton.js';

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
        <specd-button data-action="ignore-all"    variant="danger" size="sm" label="Ignore all"      @click=${() => this._fire('specd-ignore-all')}></specd-button>
        ${this.showselected ? html`
          <specd-button data-action="ignore-selected" variant="primary" size="sm" label="Ignore selected" @click=${() => this._fire('specd-ignore-selected')}></specd-button>
        ` : ''}
        <specd-button data-action="ignore-cancel" variant="ghost"   size="sm" label="Cancel"         @click=${() => this._fire('specd-ignore-cancel')}></specd-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-ignore-footer': SpecdIgnoreFooter; }
}
