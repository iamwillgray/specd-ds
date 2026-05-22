import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HealthTagProps, HealthTagTier, HealthTagSize } from './SpecdHealthTag.types.js';

/**
 * Specd DS — HealthTag
 *
 * A pill with a dot pseudo-element indicating design system health tier.
 * Supports two sizes:
 * - `md` (default): lime brand label badge (e.g. "Healthy", "Needs work")
 * - `sm`: compact score pill
 *
 * @element specd-health-tag
 *
 * @attr {string} tier  - Health tier: good | med | poor
 * @attr {string} label - Text label displayed inside the badge
 * @attr {string} size  - Size variant: md (default) | sm
 *
 * @example
 * <specd-health-tag tier="good" label="Healthy"></specd-health-tag>
 * <specd-health-tag size="sm" tier="good" label="87"></specd-health-tag>
 */
@customElement('specd-health-tag')
export class SpecdHealthTag extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) tier: HealthTagTier = 'good';
  @property({ type: String }) label: string = '';
  @property({ type: String }) size: HealthTagSize = 'md';

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
    'specd-health-tag': SpecdHealthTag;
  }
}
