import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SbPillProps, SbPillIntent } from './SpecdSbPill.types.js';

/**
 * Specd DS — SbPill
 *
 * A Storybook status pill with good/bad/muted intent variants.
 *
 * @element specd-sb-pill
 *
 * @attr {string} intent - Colour intent: good | bad | muted
 * @attr {string} label  - Text label displayed inside the pill
 *
 * @example
 * <specd-sb-pill intent="good" label="Matched"></specd-sb-pill>
 */
@customElement('specd-sb-pill')
export class SpecdSbPill extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) intent: SbPillIntent = 'muted';
  @property({ type: String }) label: string = '';

  private _classes(): string {
    return [
      'sb-pill',
      `sb-pill-${this.intent}`,
    ].join(' ');
  }

  override render() {
    return html`
      <span class=${this._classes()}>${this.label}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-sb-pill': SpecdSbPill;
  }
}
