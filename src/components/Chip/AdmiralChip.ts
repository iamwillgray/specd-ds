import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ChipProps, ChipSeverity } from './AdmiralChip.types.js';

/**
 * Admiral DS — Chip
 *
 * A filter/tag chip with optional count badge and severity tinting.
 * Renders into the light DOM so global Admiral CSS applies without Shadow DOM piercing.
 *
 * @element admiral-chip
 *
 * @attr {string}  label       - Chip label text
 * @attr {number}  count       - Optional numeric count badge
 * @attr {boolean} active      - Active/selected state
 * @attr {string}  severity    - Severity tint on count: crit | warn
 * @attr {string}  data-filter - Value wired to filter delegation
 * @attr {string}  cls         - Extra CSS classes on the root element
 *
 * @example
 * <admiral-chip label="Critical" count="3" severity="crit" active></admiral-chip>
 */
@customElement('admiral-chip')
export class AdmiralChip extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: Number }) count?: number;
  @property({ type: Boolean }) active: boolean = false;
  @property({ type: String }) severity?: ChipSeverity;
  @property({ type: String, attribute: 'data-filter' }) dataFilter: string = '';
  @property({ type: String }) cls: string = '';

  private _classes(): string {
    return [
      'chip-v2',
      this.active ? 'active' : '',
      this.cls,
    ].filter(Boolean).join(' ');
  }

  private _countClasses(): string {
    return [
      'chip-count',
      this.severity === 'crit' ? 'is-crit' : '',
      this.severity === 'warn' ? 'is-warn' : '',
    ].filter(Boolean).join(' ');
  }

  override render() {
    return html`
      <span
        class=${this._classes()}
        data-filter=${this.dataFilter || nothing}
      >
        ${this.label}
        ${this.count !== undefined
          ? html`<span class=${this._countClasses()}>${this.count}</span>`
          : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'admiral-chip': AdmiralChip;
  }
}
