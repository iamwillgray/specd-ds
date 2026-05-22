import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../components/HealthTag/SpecdHealthTag.js';
import '../../components/ScoreRing/SpecdScoreRing.js';
import '../../components/StatTileLg/SpecdStatTileLg.js';
import '../../components/CovRow/SpecdCovRow.js';

const meta: Meta = {
  title: 'Pages/OverviewTab',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const ICON_FILE = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`;
const ICON_LINK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
const ICON_TAG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z"/><path d="M7 7h.01"/></svg>`;
const ICON_DEV = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
const ICON_PUBLISH = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`;
const ICON_GRID = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`;
const ICON_INFO = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
const ICON_TREND = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg>`;
const ICON_ZAP = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;

const componentContent = () => html`
  <div style="width:360px; background:var(--bg, #f8f9fc); min-height:400px; overflow-y:auto; font-family:var(--font, Inter, sans-serif);">
    <!-- Score header area -->
    <div style="padding:16px; display:flex; align-items:center; justify-content:space-between;">
      <div>
        <specd-health-tag tier="good" label="Healthy"></specd-health-tag>
        <div style="margin-top:6px; font-size:11px; color:var(--text-muted, #6b7280);">Last scan: 2 hours ago</div>
      </div>
      <specd-score-ring score="87" tier="good" size="88"></specd-score-ring>
    </div>

    <!-- Stat tiles 2×2 grid -->
    <div style="padding:0 12px 12px; display:grid; grid-template-columns:1fr 1fr; gap:8px;">
      <specd-stat-tile-lg
        num="147"
        title="Components"
        subtitle="in library"
        icon=${ICON_GRID}
      ></specd-stat-tile-lg>
      <specd-stat-tile-lg
        num="92%"
        title="Descriptions"
        subtitle="of 147 components"
        color="green"
        trend="+4% vs last scan"
        trenddir="up"
        icon=${ICON_TREND}
      ></specd-stat-tile-lg>
      <specd-stat-tile-lg
        num="74%"
        title="Token Coverage"
        subtitle="bound vs hard-coded"
        icon=${ICON_TAG}
      ></specd-stat-tile-lg>
      <specd-stat-tile-lg
        num="47"
        title="Issues"
        subtitle="across all components"
        color="red"
        trend="-3 vs last scan"
        trenddir="down"
        icon=${ICON_INFO}
      ></specd-stat-tile-lg>
    </div>

    <!-- Coverage rows -->
    <div style="padding:0 12px 16px;">
      <div style="font-family:var(--font-mono, 'IBM Plex Mono', monospace); font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-muted, #6b7280); margin-bottom:8px;">
        Coverage breakdown
      </div>
      <div class="coverage-table">
        <specd-cov-row label="Descriptions" pct="92" icon=${ICON_FILE}></specd-cov-row>
        <specd-cov-row label="Doc Links" pct="48" icon=${ICON_LINK}></specd-cov-row>
        <specd-cov-row label="Token Coverage" pct="74" icon=${ICON_TAG}></specd-cov-row>
        <specd-cov-row label="Dev Status" pct="61" icon=${ICON_DEV}></specd-cov-row>
        <specd-cov-row label="Publish Status" pct="88" icon=${ICON_PUBLISH}></specd-cov-row>
      </div>
    </div>
  </div>
`;

const rawContent = () => html`
  <div style="width:360px; background:var(--bg, #f8f9fc); min-height:400px; overflow-y:auto; font-family:var(--font, Inter, sans-serif);">
    <!-- Score header area -->
    <div style="padding:16px; display:flex; align-items:center; justify-content:space-between;">
      <div>
        <span class="health-badge">Healthy</span>
        <div style="margin-top:6px; font-size:11px; color:var(--text-muted, #6b7280);">Last scan: 2 hours ago</div>
      </div>
      <div class="score-circle tier-good" style="--score-percentage:87; --w:88px;">
        <span class="score-number-lg" style="font-size:36px;">87</span>
        <span class="score-denom-new">/100</span>
      </div>
    </div>

    <!-- Stat tiles 2×2 grid -->
    <div style="padding:0 12px 12px; display:grid; grid-template-columns:1fr 1fr; gap:8px;">
      <button class="stat-tile-lg">
        <div class="stat-tile-header">
          <span class="stat-tile-icon">${ICON_GRID}</span>
          <span class="stat-tile-title">Components</span>
          <span class="stat-tile-arrow"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
        </div>
        <div class="stat-tile-lg-num">147</div>
        <div class="stat-tile-subtitle">in library</div>
      </button>
      <button class="stat-tile-lg green">
        <div class="stat-tile-header">
          <span class="stat-tile-icon">${ICON_TREND}</span>
          <span class="stat-tile-title">Descriptions</span>
          <span class="stat-tile-arrow"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
        </div>
        <div class="stat-tile-lg-num">92%</div>
        <div class="stat-tile-subtitle">of 147 components</div>
        <div class="stat-trend-pill up">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
          +4% vs last scan
        </div>
      </button>
      <button class="stat-tile-lg">
        <div class="stat-tile-header">
          <span class="stat-tile-icon">${ICON_TAG}</span>
          <span class="stat-tile-title">Token Coverage</span>
          <span class="stat-tile-arrow"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
        </div>
        <div class="stat-tile-lg-num">74%</div>
        <div class="stat-tile-subtitle">bound vs hard-coded</div>
      </button>
      <button class="stat-tile-lg red">
        <div class="stat-tile-header">
          <span class="stat-tile-icon">${ICON_INFO}</span>
          <span class="stat-tile-title">Issues</span>
          <span class="stat-tile-arrow"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
        </div>
        <div class="stat-tile-lg-num">47</div>
        <div class="stat-tile-subtitle">across all components</div>
        <div class="stat-trend-pill down">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          -3 vs last scan
        </div>
      </button>
    </div>

    <!-- Coverage rows -->
    <div style="padding:0 12px 16px;">
      <div style="font-family:var(--font-mono, 'IBM Plex Mono', monospace); font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-muted, #6b7280); margin-bottom:8px;">
        Coverage breakdown
      </div>
      <div class="coverage-table">
        <div class="cov-row-v2">
          <div class="cov-details">
            <span class="cov-icon">${ICON_FILE}</span>
            <span class="cov-label">Descriptions</span>
          </div>
          <div class="cov-scoring">
            <span class="cov-status-chip tier-excellent">EXC</span>
            <div class="cov-bar-track"><div class="cov-fill cov-excellent" style="width:92%"></div></div>
            <span class="cov-pct">92%</span>
          </div>
        </div>
        <div class="cov-row-v2">
          <div class="cov-details">
            <span class="cov-icon">${ICON_LINK}</span>
            <span class="cov-label">Doc Links</span>
          </div>
          <div class="cov-scoring">
            <span class="cov-status-chip tier-med">MED</span>
            <div class="cov-bar-track"><div class="cov-fill cov-med" style="width:48%"></div></div>
            <span class="cov-pct">48%</span>
          </div>
        </div>
        <div class="cov-row-v2">
          <div class="cov-details">
            <span class="cov-icon">${ICON_TAG}</span>
            <span class="cov-label">Token Coverage</span>
          </div>
          <div class="cov-scoring">
            <span class="cov-status-chip tier-good">GOOD</span>
            <div class="cov-bar-track"><div class="cov-fill cov-good" style="width:74%"></div></div>
            <span class="cov-pct">74%</span>
          </div>
        </div>
        <div class="cov-row-v2">
          <div class="cov-details">
            <span class="cov-icon">${ICON_DEV}</span>
            <span class="cov-label">Dev Status</span>
          </div>
          <div class="cov-scoring">
            <span class="cov-status-chip tier-good">GOOD</span>
            <div class="cov-bar-track"><div class="cov-fill cov-good" style="width:61%"></div></div>
            <span class="cov-pct">61%</span>
          </div>
        </div>
        <div class="cov-row-v2">
          <div class="cov-details">
            <span class="cov-icon">${ICON_PUBLISH}</span>
            <span class="cov-label">Publish Status</span>
          </div>
          <div class="cov-scoring">
            <span class="cov-status-chip tier-excellent">EXC</span>
            <div class="cov-bar-track"><div class="cov-fill cov-excellent" style="width:88%"></div></div>
            <span class="cov-pct">88%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

export const PluginView: Story = {
  name: 'Plugin View',
  parameters: { layout: 'padded' },
  render: () => html`
    <div style="padding:16px; background:var(--bg, #f8f9fc); min-height:100vh;">
      ${componentContent()}
    </div>
  `,
};

export const Compare: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => html`
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0; min-height:100vh;">
      <div style="border-right:2px solid #dbeafe; padding:16px; background:var(--bg, #f8f9fc);">
        <p style="font:700 10px var(--font-mono, 'IBM Plex Mono', monospace); color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">
          Reference (CSS only)
        </p>
        ${rawContent()}
      </div>
      <div style="padding:16px; background:var(--bg, #f8f9fc);">
        <p style="font:700 10px var(--font-mono, 'IBM Plex Mono', monospace); color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">
          Component build
        </p>
        ${componentContent()}
      </div>
    </div>
  `,
};
