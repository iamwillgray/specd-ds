import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ChipSeverity, ChipIntent } from './SpecdChip.types.js';

/**
 * Specd DS — Chip
 *
 * Filter chip / tag with optional count badge. Supports active state,
 * severity colouring on the badge, and intent colouring on the chip itself.
 *
 * @element specd-chip
 *
 * @attr {string}  label      - Chip label text
 * @attr {number}  count      - Optional numeric badge
 * @attr {boolean} active     - Active/selected state
 * @attr {string}  severity   - Badge severity: crit | warn
 * @attr {string}  intent     - Chip colour intent: positive | negative | warning | dark
 * @attr {string}  data-filter - Forwarded data-filter attribute for delegation
 * @attr {string}  cls        - Extra CSS classes
 */
@customElement('specd-chip')
export class SpecdChip extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) label: string = '';
  @property({ type: Number }) count?: number;
  @property({ type: Boolean }) active: boolean = false;
  @property({ type: String }) severity?: ChipSeverity;
  @property({ type: String }) intent?: ChipIntent;
  @property({ type: String, attribute: 'data-filter' }) dataFilter: string = '';
  @property({ type: String }) cls: string = '';
  @property({ type: Boolean }) clickable: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;

  private _classes(): string {
    return [
      'chip-v2',
      this.active ? 'active' : '',
      this.intent ? this.intent : '',
      this.cls,
    ].filter(Boolean).join(' ');
  }

  private _countClasses(): string {
    return [
      'chip-count',
      this.severity === 'crit' ? 'chip-crit' : '',
      this.severity === 'warn' ? 'chip-warn' : '',
    ].filter(Boolean).join(' ');
  }

  override render() {
    const inner = html`
      ${this.label}
      ${this.count !== undefined
        ? html`<span class=${this._countClasses()}>${this.count}</span>`
        : nothing}
    `;

    if (this.clickable) {
      return html`
        <button
          class=${this._classes()}
          type="button"
          ?disabled=${this.disabled}
          aria-pressed=${this.active ? 'true' : nothing}
          data-filter=${this.dataFilter || nothing}
        >${inner}</button>
      `;
    }

    return html`
      <span class=${this._classes()} data-filter=${this.dataFilter || nothing}>
        ${inner}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-chip': SpecdChip; }
}
