import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('specd-micro-score')
export class SpecdMicroScore extends LitElement {
  override createRenderRoot() { return this; }
  @property({ type: Number }) passed = 0;
  @property({ type: Number }) total = 0;
  @property({ type: String }) caption = 'checks passing';

  override render() {
    const pct = this.total > 0 ? Math.round((this.passed / this.total) * 1000) / 10 : 0;
    const tier = pct >= 85 ? 'good' : pct >= 60 ? 'med' : 'poor';
    return html`
      <div class="micro-score">
        <div class="micro-ring ${tier}" style=${styleMap({ '--p': String(pct) })}>
          <div class="inner"><span class="frac">${this.passed}<small>/${this.total}</small></span></div>
        </div>
        <div class="micro-cap">${this.caption}</div>
      </div>`;
  }
}
declare global { interface HTMLElementTagNameMap { 'specd-micro-score': SpecdMicroScore; } }
