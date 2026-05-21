import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ChoiceCardVariant } from './SpecdChoiceCard.types.js';

/**
 * Specd DS — ChoiceCard
 *
 * A selectable card for presenting options, supporting default and gradient variants.
 *
 * @element specd-choice-card
 *
 * @attr {string} title       - Card heading text
 * @attr {string} description - Optional description text
 * @attr {string} variant     - Visual variant: default | gradient
 * @attr {string} pill        - Optional pill label text
 */
@customElement('specd-choice-card')
export class SpecdChoiceCard extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = '';
  @property({ type: String }) description?: string;
  @property({ type: String }) variant: ChoiceCardVariant = 'default';
  @property({ type: String }) pill?: string;

  override render() {
    return html`
      <div class="choice-card ${this.variant === 'gradient' ? 'gradient' : ''}">
        <div class="choice-card-title">${this.title}</div>
        ${this.description ? html`<div class="choice-card-desc">${this.description}</div>` : nothing}
        ${this.pill ? html`<div class="choice-card-pill"><span class="chip-v2">${this.pill}</span></div>` : nothing}
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
