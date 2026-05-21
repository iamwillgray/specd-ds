import { LitElement, html, svg, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SparklineIntent } from './SpecdSparkline.types.js';

/**
 * Specd DS — Sparkline
 *
 * Renders an SVG polyline + area fill from a JSON values array.
 *
 * @element specd-sparkline
 *
 * @attr {string} values - JSON array of numbers
 * @attr {number} width  - SVG width in px (default: 80)
 * @attr {number} height - SVG height in px (default: 28)
 * @attr {string} intent - Colour intent: default | positive | negative
 */
@customElement('specd-sparkline')
export class SpecdSparkline extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) values: string = '[]';
  @property({ type: Number }) width: number = 80;
  @property({ type: Number }) height: number = 28;
  @property({ type: String }) intent: SparklineIntent = 'default';

  private _computePath(): { line: string; area: string } {
    let vals: number[];
    try { vals = JSON.parse(this.values); } catch { vals = []; }
    if (vals.length < 2) return { line: '', area: '' };

    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;
    const pad = 2;
    const w = this.width;
    const h = this.height;

    const points = vals.map((v, i) => {
      const x = (i / (vals.length - 1)) * (w - pad * 2) + pad;
      const y = h - pad - ((v - min) / range) * (h - pad * 2);
      return [x, y] as [number, number];
    });

    const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
    const area = `${line} L${points[points.length - 1][0].toFixed(1)},${h} L${points[0][0].toFixed(1)},${h} Z`;
    return { line, area };
  }

  override render() {
    const { line, area } = this._computePath();
    const intentClass = this.intent !== 'default' ? this.intent : '';
    return html`
      <svg class="sparkline" width=${this.width} height=${this.height} viewBox="0 0 ${this.width} ${this.height}">
        ${area ? svg`<path class="sparkline-area ${intentClass}" d=${area}/>` : nothing}
        ${line ? svg`<path class="sparkline-path ${intentClass}" d=${line}/>` : nothing}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-sparkline': SpecdSparkline;
  }
}
