import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { BadgeProps, BadgeIntent } from './AdmiralBadge.types.js';

/**
 * Admiral DS — Badge
 *
 * A small status indicator supporting intent colours, dot mode, and anchored overlay positioning.
 *
 * @element admiral-badge
 *
 * @attr {string}  value    - Text or numeric value
 * @attr {string}  intent   - Colour intent: positive | negative | warning | neutral
 * @attr {boolean} dot      - Render as dot (no text)
 * @attr {boolean} anchored - Position as anchored overlay
 *
 * @example
 * <admiral-badge value="5" intent="negative"></admiral-badge>
 */
@customElement('admiral-badge')
export class AdmiralBadge extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) value?: string | number;
  @property({ type: String }) intent: BadgeIntent = 'neutral';
  @property({ type: Boolean }) dot: boolean = false;
  @property({ type: Boolean }) anchored: boolean = false;

  private _classes(): string {
    return [
      'badge',
      this.dot ? 'badge-dot' : '',
      `badge-${this.intent}`,
      this.anchored ? 'badge-anchored' : '',
    ].filter(Boolean).join(' ');
  }

  override render() {
    return html`
      <span class=${this._classes()}>
        ${!this.dot && this.value !== undefined ? this.value : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admiral-badge': AdmiralBadge;
  }
}
