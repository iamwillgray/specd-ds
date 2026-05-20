import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { CardProps, CardElevation } from './AdmiralCard.types.js';

/**
 * Admiral DS — Card
 *
 * A surface container with optional elevation modifier and inner padding wrapper.
 * Renders into light DOM.
 *
 * @element admiral-card
 *
 * @attr {string}  content   - Raw HTML to render inside the card
 * @attr {string}  elevation - Surface style: elevated | flat | inset
 * @attr {boolean} inner     - Wrap content in .card-inner (default true)
 * @attr {string}  cls       - Extra CSS classes on the root element
 *
 * @slot - Default slot (used when content attribute is omitted)
 *
 * @example
 * <admiral-card elevation="flat">
 *   <p>Hello world</p>
 * </admiral-card>
 */
@customElement('admiral-card')
export class AdmiralCard extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) content: string = '';
  @property({ type: String }) elevation: CardElevation = 'elevated';
  @property({ type: Boolean }) inner: boolean = true;
  @property({ type: String }) cls: string = '';

  private _classes(): string {
    return [
      'card',
      `card--${this.elevation}`,
      this.cls,
    ].filter(Boolean).join(' ');
  }

  override render() {
    const body = this.content
      ? unsafeHTML(this.content)
      : html`<slot></slot>`;

    return html`
      <div class=${this._classes()}>
        ${this.inner
          ? html`<div class="card-inner">${body}</div>`
          : body}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admiral-card': AdmiralCard;
  }
}
