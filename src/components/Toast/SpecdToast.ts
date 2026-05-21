import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ToastIntent, ToastProps } from './SpecdToast.types.js';

/**
 * Specd DS — Toast
 *
 * @element specd-toast
 * @attr {string}  title       - Toast title (required)
 * @attr {string}  description - Optional description text
 * @attr {string}  intent      - default | positive | warning | negative
 * @attr {number}  duration    - Auto-dismiss delay in ms (0 = persistent)
 * @fires specd-dismiss - Emitted when toast is dismissed
 */
@customElement('specd-toast')
export class SpecdToast extends LitElement implements ToastProps {
  override createRenderRoot() { return this; }

  @property({ type: String }) title: string = '';
  @property({ type: String }) description?: string;
  @property({ type: String }) intent: ToastIntent = 'default';
  @property({ type: Number }) duration: number = 4000;

  private _timer?: ReturnType<typeof setTimeout>;

  override connectedCallback() {
    super.connectedCallback();
    if (this.duration > 0) {
      this._timer = setTimeout(() => this._dismiss(), this.duration);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) clearTimeout(this._timer);
  }

  private _dismiss() {
    this.dispatchEvent(new CustomEvent('specd-dismiss', { bubbles: true, composed: true }));
    this.remove();
  }

  override render() {
    const intentClass = this.intent !== 'default' ? `toast-${this.intent}` : '';
    return html`
      <div class="toast ${intentClass}">
        <div class="toast-body">
          <div class="toast-title">${this.title}</div>
          ${this.description ? html`<div class="toast-desc">${this.description}</div>` : nothing}
        </div>
        <button class="toast-close" @click=${() => this._dismiss()}>×</button>
      </div>
    `;
  }
}

export function toast(opts: { title: string; description?: string; intent?: ToastIntent; duration?: number }): SpecdToast {
  const el = document.createElement('specd-toast') as SpecdToast;
  el.title = opts.title;
  if (opts.description) el.description = opts.description;
  if (opts.intent) el.intent = opts.intent;
  if (opts.duration !== undefined) el.duration = opts.duration;
  document.body.appendChild(el);
  return el;
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-toast': SpecdToast;
  }
}
