import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { WizardShellMode } from './SpecdWizardShell.types.js';

const SPARKLE_SVG = `<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l1.8 4.2L16 8l-4.2 1.8L10 14 8.2 9.8 4 8l4.2-1.8L10 2zM16 13l.9 2.1L19 16l-2.1.9L16 19l-.9-2.1L13 16l2.1-.9L16 13z"/></svg>`;
const BULK_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;

/**
 * Specd DS — WizardShell
 *
 * Fullscreen navy overlay used by the Quick-Fix and Bulk-Fix wizards. Provides
 * a consistent top bar (close button + brand mark + title + mode toggle) and
 * a slotted body. Renders nothing when `open` is false.
 *
 * The shell intentionally lives in light DOM so the existing global CSS for
 * `.qf-wizard` / `.qf-topbar` applies without further work.
 *
 * @element specd-wizard-shell
 *
 * @attr {boolean} open        - Show / hide the overlay (default false)
 * @attr {string}  title       - Title text shown next to the sparkle brand mark
 * @attr {string}  mode        - "single" or "bulk" — drives the right action button label
 * @attr {boolean} hidetoggle  - Hide the mode-toggle button on the right
 * @attr {boolean} hideclose   - Hide the close (X) button on the left
 *
 * @slot       — wizard body (filter chips, content card, footer, etc.)
 * @slot extra — additional fixed-position content rendered inside the overlay
 *               but outside the topbar (e.g. a sticky banner)
 *
 * @fires specd-close       - Close button clicked
 * @fires specd-mode-toggle - Mode toggle button clicked, detail: { mode: 'single' | 'bulk' }
 *
 * @example
 * <specd-wizard-shell open title="Quick-Fix Issues" mode="single">
 *   <div class="qf-filter-chips">…chips…</div>
 *   <div class="qf-body">…body…</div>
 * </specd-wizard-shell>
 */
@customElement('specd-wizard-shell')
export class SpecdWizardShell extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: String })  title: string = '';
  @property({ type: String })  mode: WizardShellMode = 'single';
  @property({ type: Boolean }) hidetoggle: boolean = false;
  @property({ type: Boolean }) hideclose: boolean = false;

  private _onClose = () => {
    this.dispatchEvent(new CustomEvent('specd-close', { bubbles: true, composed: true }));
  };

  private _onToggle = () => {
    const nextMode: WizardShellMode = this.mode === 'single' ? 'bulk' : 'single';
    this.dispatchEvent(new CustomEvent('specd-mode-toggle', {
      detail: { mode: nextMode },
      bubbles: true,
      composed: true,
    }));
  };

  override render() {
    if (!this.open) return nothing;
    const toggleLabel = this.mode === 'single' ? 'Bulk' : 'Single';
    const toggleIcon  = this.mode === 'single' ? BULK_SVG : SPARKLE_SVG;
    return html`
      <div
        class="qf-wizard ${this.mode === 'bulk' ? 'qf-bulk-mode' : ''}"
        role="dialog"
        aria-modal="true"
      >
        <div class="qf-topbar">
          ${this.hideclose ? html`<span></span>` : html`
            <button class="qf-btn-close" type="button" @click=${this._onClose}>Close</button>
          `}
          <div class="qf-topbar-brand">
            <span class="qf-topbar-logo">${unsafeHTML(SPARKLE_SVG)}</span>
            ${this.title ? html`<h2 class="qf-topbar-title">${this.title}</h2>` : nothing}
          </div>
          ${this.hidetoggle ? html`<span></span>` : html`
            <button class="qf-btn-bulk" type="button" @click=${this._onToggle}>
              ${unsafeHTML(toggleIcon)}
              ${toggleLabel}
            </button>
          `}
        </div>

        <slot></slot>
        <slot name="extra"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-wizard-shell': SpecdWizardShell;
  }
}
