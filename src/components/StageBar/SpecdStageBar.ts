import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('specd-stage-bar')
export class SpecdStageBar extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: Number }) count = 0;
  @property({ type: String }) hint = 'Walk the fixes or edit below';
  @property({ type: String, attribute: 'apply-label' }) applyLabel = 'Apply all';

  private _apply() { this.dispatchEvent(new CustomEvent('apply', { bubbles: true, composed: true })); }
  private _discard() { this.dispatchEvent(new CustomEvent('discard', { bubbles: true, composed: true })); }

  override render() {
    const n = this.count;
    return html`
      <div class="stage-bar ${n === 0 ? 'empty' : ''}">
        <div class="count">
          <span class="num">${n}</span>
          <span class="lbl">staged change${n === 1 ? '' : 's'}<small>${this.hint}</small></span>
        </div>
        <button class="ghost-link" data-discard @click=${this._discard}>Discard</button>
        <button class="btn btn-primary btn-sm" data-apply @click=${this._apply}>${this.applyLabel}</button>
      </div>`;
  }
}

declare global { interface HTMLElementTagNameMap { 'specd-stage-bar': SpecdStageBar; } }
