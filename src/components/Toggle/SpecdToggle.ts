import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ToggleProps } from './SpecdToggle.types.js';

/**
 * Specd DS — Toggle
 *
 * A styled toggle switch built on a hidden checkbox. Renders into light DOM.
 *
 * @element specd-toggle
 *
 * @attr {string}  id         - HTML id on the inner checkbox (required)
 * @attr {boolean} checked    - Checked/on state
 * @attr {boolean} disabled   - Disabled state
 * @attr {string}  aria-label - Accessible label on the wrapper label element
 *
 * @fires change - Forwarded from the inner checkbox
 *
 * @example
 * <specd-toggle id="toggle-1" checked></specd-toggle>
 */
@customElement('specd-toggle')
export class SpecdToggle extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) id: string = '';
  @property({ type: Boolean }) checked: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string = '';

  override render() {
    return html`
      <label
        class="toggle"
        aria-label=${this.ariaLabel || nothing}
      >
        <input
          type="checkbox"
          id=${this.id || nothing}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          style="position:absolute;opacity:0;width:0;height:0;"
        />
        <span class="toggle-track">
          <span class="toggle-thumb"></span>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-toggle': SpecdToggle;
  }
}
