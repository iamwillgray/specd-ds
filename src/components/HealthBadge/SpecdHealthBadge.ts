import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HealthBadgeProps, HealthBadgeTier } from './SpecdHealthBadge.types.js';

/**
 * Specd DS — HealthBadge
 *
 * A lime brand pill with a dot pseudo-element indicating design system health tier.
 *
 * @element specd-health-badge
 *
 * @attr {string} tier  - Health tier: good | med | poor
 * @attr {string} label - Text label displayed inside the badge
 *
 * @example
 * <specd-health-badge tier="good" label="Healthy"></specd-health-badge>
 */
@customElement('specd-health-badge')
export class SpecdHealthBadge extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) tier: HealthBadgeTier = 'good';
  @property({ type: String }) label: string = '';

  private _classes(): string {
    return [
      'health-badge',
      `tier-${this.tier}`,
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
    'specd-health-badge': SpecdHealthBadge;
  }
}
