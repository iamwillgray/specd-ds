import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { NavScoreProps } from './SpecdNavScore.types.js';

/**
 * Specd DS — NavScore
 *
 * A green pill with a dot pseudo-element displaying a health score number.
 *
 * @element specd-nav-score
 *
 * @attr {string} score - Numeric score string (e.g. "87")
 *
 * @example
 * <specd-nav-score score="87"></specd-nav-score>
 */
@customElement('specd-nav-score')
export class SpecdNavScore extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) score: string = '';

  override render() {
    return html`
      <span class="nav-score-badge">${this.score}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-nav-score': SpecdNavScore;
  }
}
