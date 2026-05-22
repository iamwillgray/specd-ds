import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { AlertIntent, AlertProps } from './SpecdAlert.types.js';

/**
 * Specd DS — Alert
 *
 * @element specd-alert
 * @attr {string} intent      - neutral | positive | warning | negative
 * @attr {string} title       - Alert title
 * @attr {string} description - Alert description text
 */
@customElement('specd-alert')
export class SpecdAlert extends LitElement implements AlertProps {
  override createRenderRoot() { return this; }

  @property({ type: String }) intent: AlertIntent = 'neutral';
  @property({ type: String }) title: string = '';
  @property({ type: String }) description?: string;

  override render() {
    const icons: Record<AlertIntent, string> = {
      neutral: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>`,
      positive: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
      warning: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      negative: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>`,
    };
    const role = (this.intent === 'negative' || this.intent === 'warning') ? 'alert' : 'status';
    return html`
      <div class="alert alert-${this.intent}" role="${role}">
        <span class="alert-icon">${unsafeHTML(icons[this.intent])}</span>
        <div class="alert-body">
          ${this.title ? html`<div class="alert-title">${this.title}</div>` : nothing}
          ${this.description ? html`<div class="alert-desc">${this.description}</div>` : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-alert': SpecdAlert;
  }
}
