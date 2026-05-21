import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { StepItem } from './SpecdStepper.types.js';

const CHECK_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

/**
 * Specd DS — Stepper
 *
 * @element specd-stepper
 * @attr {string} steps   - JSON array of { label } step objects
 * @attr {number} current - 0-based index of current step
 */
@customElement('specd-stepper')
export class SpecdStepper extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) steps: string = '[]';
  @property({ type: Number }) current: number = 0;

  override render() {
    const steps: StepItem[] = (() => { try { return JSON.parse(this.steps); } catch { return []; } })();
    return html`
      <div class="stepper">
        ${steps.map((step, i) => {
          const isDone = i < this.current;
          const isActive = i === this.current;
          const cls = isDone ? 'done' : isActive ? 'active' : '';
          return html`
            <div class="step ${cls}">
              <div class="step-dot">
                ${isDone ? unsafeHTML(CHECK_SVG) : i + 1}
              </div>
              <div class="step-label">${step.label}</div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-stepper': SpecdStepper;
  }
}
