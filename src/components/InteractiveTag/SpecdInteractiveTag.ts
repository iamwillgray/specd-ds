import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type InteractiveTagVariant = 'matched' | 'missing' | 'muted';

/**
 * Specd DS — InteractiveTag
 *
 * A small status pill used for Storybook match indicators.
 * Variants: matched (green), missing (red), muted (neutral).
 *
 * @element specd-interactive-tag
 *
 * @attr {string} variant - matched | missing | muted
 * @attr {string} label   - Display text
 */
@customElement('specd-interactive-tag')
export class SpecdInteractiveTag extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) variant: InteractiveTagVariant = 'matched';
  @property({ type: String }) label: string = '';

  private _variantClass(): string {
    const map: Record<InteractiveTagVariant, string> = {
      matched: 'btn-sb-good',
      missing: 'btn-sb-bad',
      muted:   'btn-sb-muted',
    };
    return map[this.variant] ?? 'btn-sb-muted';
  }

  override render() {
    return html`<span class=${this._variantClass()}>${this.label}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-interactive-tag': SpecdInteractiveTag; }
}
