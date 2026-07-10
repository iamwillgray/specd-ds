import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HealthTagTier, HealthTagSize } from './SpecdHealthTag.types.js';

/**
 * Specd DS — HealthTag
 *
 * A pill with an optional dot indicator showing design system health tier.
 * Supports three sizes:
 * - `md` (default): standard pill label (e.g. "Healthy")
 * - `sm`: compact pill for tile cells
 * - `xs`: micro pill for coverage rows / inline status chips
 *
 * @element specd-health-tag
 *
 * @attr {string}  tier  - Health tier: excellent | good | med | poor
 * @attr {string}  label - Text label displayed inside the badge
 * @attr {string}  size  - Size variant: xs | sm | md (default)
 * @attr {boolean} nodot - Hide the leading dot indicator
 *
 * @example
 * <specd-health-tag tier="good" label="Healthy"></specd-health-tag>
 * <specd-health-tag size="sm" tier="good" label="GOOD"></specd-health-tag>
 * <specd-health-tag size="xs" tier="good" label="GOOD" nodot></specd-health-tag>
 */
@customElement('specd-health-tag')
export class SpecdHealthTag extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) tier: HealthTagTier = 'good';
  @property({ type: String }) label: string = '';
  @property({ type: String }) size: HealthTagSize = 'md';
  @property({ type: Boolean }) nodot: boolean = false;

  private _classes(): string {
    return [
      'health-badge',
      `sz-${this.size}`,
      `tier-${this.tier}`,
      this.nodot ? 'no-dot' : '',
    ].filter(Boolean).join(' ');
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
