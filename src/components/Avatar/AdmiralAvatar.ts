import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { AvatarProps, AvatarSize } from './AdmiralAvatar.types.js';

/**
 * Admiral DS — Avatar
 *
 * A user avatar showing an image or falling back to computed initials.
 * Renders into light DOM.
 *
 * @element admiral-avatar
 *
 * @attr {string} src  - Image URL
 * @attr {string} name - Display name (used for initials)
 * @attr {string} size - Size variant: sm | md | lg
 * @attr {string} alt  - Alt text for image
 *
 * @example
 * <admiral-avatar name="Will Gray" size="md"></admiral-avatar>
 */
@customElement('admiral-avatar')
export class AdmiralAvatar extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) src: string = '';
  @property({ type: String }) name: string = '';
  @property({ type: String }) size: AvatarSize = 'md';
  @property({ type: String }) alt: string = '';

  @state() private _imgError: boolean = false;

  private _initials(): string {
    if (!this.name) return '';
    const words = this.name.trim().split(/\s+/);
    const first  = words[0]?.[0] ?? '';
    const second = words[1]?.[0] ?? '';
    return (first + second).toUpperCase();
  }

  private _classes(): string {
    return [
      'avatar',
      `avatar-${this.size}`,
    ].join(' ');
  }

  private _handleError() {
    this._imgError = true;
  }

  override render() {
    const showImg = this.src && !this._imgError;
    return html`
      <span class=${this._classes()} aria-label=${this.alt || this.name || nothing}>
        ${showImg
          ? html`<img
              class="avatar-img"
              src=${this.src}
              alt=${this.alt || this.name || ''}
              @error=${this._handleError}
            />`
          : html`<span class="avatar-initials">${this._initials()}</span>`}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admiral-avatar': AdmiralAvatar;
  }
}
