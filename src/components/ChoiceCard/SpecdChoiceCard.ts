import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { ChoiceCardVariant, ChoiceCardIconVariant, ChoiceCardPillColor } from './SpecdChoiceCard.types.js';

/**
 * Specd DS — ChoiceCard
 *
 * Selectable card for presenting options.
 *
 * @element specd-choice-card
 *
 * @attr {string} title       - Card heading text
 * @attr {string} description - Optional description text
 * @attr {string} variant     - Visual variant: default | gradient
 * @attr {string} pill        - Optional pill label text
 * @attr {string} pillcolor   - Pill colour: mint | blue (default mint)
 * @attr {string} icon        - Optional SVG string for the card icon
 * @attr {string} iconvariant - Icon variant: default | gradient
 */
@customElement('specd-choice-card')
export class SpecdChoiceCard extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = '';
  @property({ type: String }) description?: string;
  @property({ type: String }) variant: ChoiceCardVariant = 'default';
  @property({ type: String }) pill?: string;
  @property({ type: String }) pillcolor: ChoiceCardPillColor = 'mint';
  @property({ type: String }) icon?: string;
  @property({ type: String }) iconvariant: ChoiceCardIconVariant = 'default';

  override render() {
    const iconClass = [
      'choice-card-icon',
      this.iconvariant === 'gradient' ? 'gradient' : '',
    ].filter(Boolean).join(' ');

    const pillClass = [
      'choice-card-pill',
      this.pillcolor === 'blue' ? 'blue' : 'mint',
    ].filter(Boolean).join(' ');

    return html`
      <div class="choice-card ${this.variant === 'gradient' ? 'gradient' : ''}">
        ${this.icon ? html`<div class=${iconClass}>${unsafeHTML(this.icon)}</div>` : nothing}
        <div class="choice-card-title">${this.title}</div>
        ${this.description ? html`<div class="choice-card-desc">${this.description}</div>` : nothing}
        ${this.pill ? html`<div class=${pillClass}>${this.pill}</div>` : nothing}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-choice-card': SpecdChoiceCard;
  }
}
