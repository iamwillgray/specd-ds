import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HealthBadgeProps, HealthBadgeTier, HealthBadgeSize } from './SpecdHealthBadge.types.js';

/**
 * Specd DS — HealthBadge
 *
 * A pill with a dot pseudo-element indicating design system health tier.
 * Supports two sizes:
 * - `md` (default): lime brand label badge (e.g. "Healthy", "Needs work")
 * - `sm`: compact score pill — replaces the deprecated `specd-nav-score` use-case
 *
 * @element specd-health-badge
 *
 * @attr {string} tier  - Health tier: good | med | poor
 * @attr {string} label - Text label displayed inside the badge
 * @attr {string} size  - Size variant: md (default) | sm
 *
 * @example
 * <specd-health-badge tier="good" label="Healthy"></specd-health-badge>
 * <specd-health-badge size="sm" tier="good" label="87"></specd-health-badge>
 */
@customElement('specd-health-badge')
export class SpecdHealthBadge extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) tier: HealthBadgeTier = 'good';
  @property({ type: String }) label: string = '';
  @property({ type: String }) size: HealthBadgeSize = 'md';

  private _classes(): string {
    return ['health-badge', `sz-${this.size}`, `tier-${this.tier}`].join(' ');
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
