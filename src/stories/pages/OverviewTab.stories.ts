import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TemplateResult } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/ScoreRing/SpecdScoreRing.js';
import '../../components/HealthTag/SpecdHealthTag.js';
import '../../components/ScoreTrend/SpecdScoreTrend.js';
import '../../components/CovRow/SpecdCovRow.js';
import '../../components/StatTileLg/SpecdStatTileLg.js';
import '../../components/SectionLabel/SpecdSectionLabel.js';
import '../../components/Button/SpecdButton.js';

const LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 48 48" fill="none"><rect x="17" y="24.2427" width="10.2426" height="10.2426" rx="2" transform="rotate(-45 17 24.2427)" fill="white"/><rect x="12.7071" y="24.101" width="16.1133" height="16.1133" rx="4.5" transform="rotate(-45 12.7071 24.101)" stroke="white" stroke-width="1.2"/><rect x="7.70711" y="23.9664" width="22.9942" height="23.0891" rx="7.5" transform="rotate(-45 7.70711 23.9664)" stroke="white" stroke-width="1.2"/></svg>`;

const meta: Meta = {
  title: 'Pages/OverviewTab',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const TABS_JSON = JSON.stringify([
  { id: 'overview',    label: 'Overview',    icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>` },
  { id: 'issues',      label: 'Issues',      badge: 47, icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>` },
  { id: 'components',  label: 'Components',  icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` },
  { id: 'variables',   label: 'Variables',   icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>` },
  { id: 'storybook',   label: 'Storybook',   icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>` },
  { id: 'library',     label: 'Library',     icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>` },
]);

/** Raw CSS reference shell (app header + tab bar via CSS classes) */
const pluginShell = () => html`
  <header class="app-header-v2">
    <div class="logo-mark">${unsafeSVG(LOGO_SVG)}</div>
    <div class="header-text"><div class="header-name">Pulse</div></div>
    <button class="header-icon-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-3.51-7.13"/><polyline points="21 4 21 10 15 10"/></svg>
    </button>
    <button class="header-icon-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    </button>
  </header>
  <nav class="tab-bar-v2" role="tablist">
    <button class="tab-v2 active">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>Overview
    </button>
    <button class="tab-v2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/></svg>
      Issues <span class="tab-badge">47</span>
    </button>
    <button class="tab-v2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>Components
    </button>
    <button class="tab-v2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 7h16M4 12h16M4 17h10"/></svg>Variables
    </button>
    <button class="tab-v2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>Storybook
    </button>
    <button class="tab-v2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>Library
    </button>
  </nav>
`;

/** Live web component shell (specd-app-header + specd-tab-bar) */
const componentShell = () => html`
  <specd-app-header name="Pulse" showrefresh showsettings></specd-app-header>
  <specd-tab-bar tabs=${TABS_JSON} active="overview"></specd-tab-bar>
`;

/** Overview page content — raw CSS classes only (reference) */
const overviewRawContent = () => html`
  <div class="plugin-scroll">

    <!-- Score hero -->
    <div class="score-section">
      <div class="score-hero-top">
        <div class="score-circle tier-good" style="--p:72; width:104px; height:104px; flex-shrink:0;">
          <div class="score-number-lg" style="font-size:36px; line-height:1;">72</div>
          <div class="score-denom-new">/ 100</div>
        </div>
        <div class="score-info">
          <div class="score-tier-label">Acme DS</div>
          <div class="score-meta-line">152 components · 47 issues</div>
          <span class="health-badge tier-good" style="margin-top:8px; display:inline-flex;">Good</span>
          <div style="display:flex; align-items:center; gap:6px; margin-top:8px; font-family:'IBM Plex Mono',monospace; font-size:10px;">
            <span style="color:#008531; font-weight:700;">↑ +4</span>
            <span style="color:#6B7280;">vs last scan · May 7</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero stats -->
    <div class="score-hero-stats">
      <div class="hero-stat"><span class="hero-stat-num">152</span><span class="hero-stat-lbl">Components</span></div>
      <div class="hero-stat"><span class="hero-stat-num">18</span><span class="hero-stat-lbl">Sets</span></div>
      <div class="hero-stat"><span class="hero-stat-num">6</span><span class="hero-stat-lbl">Pages</span></div>
      <div class="hero-stat"><span class="hero-stat-num" style="color:#cd1d1d;">47</span><span class="hero-stat-lbl">Issues</span></div>
    </div>

    <!-- Coverage table -->
    <div class="coverage-wrap">
      <div class="coverage-table">
        <div class="section-mono-lbl">Overview Report</div>
        <div class="cov-row-v2">
          <div class="cov-details">
            <span class="cov-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h16M4 10h16M4 14h10"/></svg></span>
            <span class="cov-label">Descriptions</span>
          </div>
          <div class="cov-scoring">
            <span class="cov-status-chip tier-good">GOOD</span>
            <div class="cov-track"><div class="cov-fill good" style="width:78%;"></div></div>
            <span class="cov-pct-v2">78%</span>
          </div>
        </div>
        <div class="cov-row-v2">
          <div class="cov-details">
            <span class="cov-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span>
            <span class="cov-label">Doc Links</span>
          </div>
          <div class="cov-scoring">
            <span class="cov-status-chip tier-poor">POOR</span>
            <div class="cov-track"><div class="cov-fill poor" style="width:45%;"></div></div>
            <span class="cov-pct-v2">45%</span>
          </div>
        </div>
        <div class="cov-row-v2">
          <div class="cov-details">
            <span class="cov-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg></span>
            <span class="cov-label">Variable Coverage</span>
          </div>
          <div class="cov-scoring">
            <span class="cov-status-chip tier-med">MED</span>
            <div class="cov-track"><div class="cov-fill medium" style="width:63%;"></div></div>
            <span class="cov-pct-v2">63%</span>
          </div>
        </div>
        <div class="cov-row-v2">
          <div class="cov-details">
            <span class="cov-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-3.51-7.13"/><polyline points="21 4 21 10 15 10"/></svg></span>
            <span class="cov-label">Untracked Changes</span>
          </div>
          <div class="cov-scoring">
            <span class="cov-status-chip tier-good">GOOD</span>
            <div class="cov-track"><div class="cov-fill good" style="width:12%;"></div></div>
            <span class="cov-pct-v2">12%</span>
          </div>
        </div>
        <div class="cov-row-v2">
          <div class="cov-details">
            <span class="cov-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></span>
            <span class="cov-label">Ready for Dev</span>
          </div>
          <div class="cov-scoring">
            <span class="cov-status-chip tier-med">MED</span>
            <div class="cov-track"><div class="cov-fill medium" style="width:71%;"></div></div>
            <span class="cov-pct-v2">71%</span>
          </div>
        </div>
        <div class="cov-row-v2">
          <div class="cov-details">
            <span class="cov-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></span>
            <span class="cov-label">Storybook Sync</span>
          </div>
          <div class="cov-scoring">
            <span class="cov-status-chip tier-poor">POOR</span>
            <div class="cov-track"><div class="cov-fill poor" style="width:32%;"></div></div>
            <span class="cov-pct-v2">32%</span>
          </div>
        </div>
        <div class="cov-row-v2">
          <div class="cov-details">
            <span class="cov-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></span>
            <span class="cov-label">Code Links</span>
          </div>
          <div class="cov-scoring">
            <span class="cov-status-chip tier-good">GOOD</span>
            <div class="cov-track"><div class="cov-fill good" style="width:88%;"></div></div>
            <span class="cov-pct-v2">88%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Component Readiness 2x2 -->
    <div style="padding:10px 12px;">
      <div class="section-title-lg">Component Readiness</div>
      <div class="stat-tiles-2x2">
        <button class="stat-tile-lg green">
          <div class="stat-tile-header">
            <span class="stat-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h16M4 10h16M4 14h10"/></svg></span>
            <span class="stat-tile-title">Descriptions</span>
            <span class="stat-tile-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </div>
          <div class="stat-tile-lg-num">119</div>
          <div class="stat-tile-subtitle">33 missing</div>
        </button>
        <button class="stat-tile-lg red">
          <div class="stat-tile-header">
            <span class="stat-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span>
            <span class="stat-tile-title">Doc Links</span>
            <span class="stat-tile-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </div>
          <div class="stat-tile-lg-num">84</div>
          <div class="stat-tile-subtitle">68 missing links</div>
        </button>
        <button class="stat-tile-lg amber">
          <div class="stat-tile-header">
            <span class="stat-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg></span>
            <span class="stat-tile-title">Variable Coverage</span>
            <span class="stat-tile-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </div>
          <div class="stat-tile-lg-num">96</div>
          <div class="stat-tile-subtitle">56 hard-coded values</div>
        </button>
        <button class="stat-tile-lg amber">
          <div class="stat-tile-header">
            <span class="stat-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></span>
            <span class="stat-tile-title">Dev Status</span>
            <span class="stat-tile-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </div>
          <div class="stat-tile-lg-num">108</div>
          <div class="stat-tile-subtitle">44 without status</div>
        </button>
      </div>
    </div>

    <!-- Dev Readiness 3col -->
    <div style="padding:0 12px 10px;">
      <div class="section-title-lg">Dev Readiness</div>
      <div class="stat-tiles-3col">
        <button class="stat-tile-lg green">
          <div class="stat-tile-header">
            <span class="stat-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></span>
            <span class="stat-tile-title">Code Links</span>
            <span class="stat-tile-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </div>
          <div class="stat-tile-lg-num">134</div>
          <div class="stat-tile-subtitle">linked</div>
        </button>
        <button class="stat-tile-lg green">
          <div class="stat-tile-header">
            <span class="stat-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
            <span class="stat-tile-title">Published</span>
            <span class="stat-tile-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </div>
          <div class="stat-tile-lg-num">141</div>
          <div class="stat-tile-subtitle">current</div>
        </button>
        <button class="stat-tile-lg amber">
          <div class="stat-tile-header">
            <span class="stat-tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-3.51-7.13"/><polyline points="21 4 21 10 15 10"/></svg></span>
            <span class="stat-tile-title">Untracked</span>
            <span class="stat-tile-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
          </div>
          <div class="stat-tile-lg-num">18</div>
          <div class="stat-tile-subtitle">changed locally</div>
        </button>
      </div>
    </div>

    <!-- Health Map -->
    <div style="padding:10px 12px 14px;">
      <div class="ov-health-top">
        <span class="ov-health-title">Component Health Map</span>
        <div class="ov-health-legend">
          <span class="ov-health-legend-item"><span class="ov-health-legend-dot excellent"></span>Excellent</span>
          <span class="ov-health-legend-item"><span class="ov-health-legend-dot good"></span>Good</span>
          <span class="ov-health-legend-item"><span class="ov-health-legend-dot warn"></span>Warn</span>
          <span class="ov-health-legend-item"><span class="ov-health-legend-dot poor"></span>Poor</span>
        </div>
      </div>
      <div class="ov-health-grid">
        <div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot warn"></div><div class="hm-dot poor"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div>
        <div class="hm-dot excellent"></div><div class="hm-dot poor"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot poor"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div>
        <div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot na"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot poor"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot good"></div>
        <div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot poor"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div>
        <div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot poor"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div>
        <div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot na"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div>
        <div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot poor"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div>
      </div>
    </div>

    <!-- Action bar -->
    <div class="action-bar">
      <button class="btn-primary btn-sm">↺ Re-scan</button>
      <span style="flex:1;"></span>
      <button class="btn-ghost btn-sm">Report</button>
      <button class="btn-ghost btn-sm">CSV</button>
      <button class="btn-ghost btn-sm">JSON</button>
    </div>

    <div style="height:16px;"></div>
  </div>
`;

/** Overview page content — specd-* web components */
const overviewComponentContent = () => html`
  <div class="plugin-scroll">

    <!-- Score hero -->
    <div class="score-section">
      <div class="score-hero-top" style="gap:16px;">
        <specd-score-ring score="72" tier="good" size="104" style="flex-shrink:0;"></specd-score-ring>
        <div class="score-info">
          <div class="score-tier-label">Acme DS</div>
          <div class="score-meta-line">152 components · 47 issues</div>
          <specd-health-tag tier="good" label="Good" style="margin-top:8px; display:inline-flex;"></specd-health-tag>
          <specd-score-trend delta="+4" direction="up" meta="vs last scan · May 7" style="margin-top:8px;"></specd-score-trend>
        </div>
      </div>
    </div>

    <!-- Hero stats -->
    <div class="score-hero-stats">
      <div class="hero-stat"><span class="hero-stat-num">152</span><span class="hero-stat-lbl">Components</span></div>
      <div class="hero-stat"><span class="hero-stat-num">18</span><span class="hero-stat-lbl">Sets</span></div>
      <div class="hero-stat"><span class="hero-stat-num">6</span><span class="hero-stat-lbl">Pages</span></div>
      <div class="hero-stat"><span class="hero-stat-num" style="color:#cd1d1d;">47</span><span class="hero-stat-lbl">Issues</span></div>
    </div>

    <!-- Coverage table -->
    <div class="coverage-wrap">
      <div class="coverage-table">
        <specd-section-label label="Overview Report"></specd-section-label>
        <specd-cov-row label="Descriptions" pct="78" .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h16M4 10h16M4 14h10"/></svg>'}></specd-cov-row>
        <specd-cov-row label="Doc Links" pct="45" .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'}></specd-cov-row>
        <specd-cov-row label="Variable Coverage" pct="63" .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>'}></specd-cov-row>
        <specd-cov-row label="Untracked Changes" pct="12" .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-3.51-7.13"/><polyline points="21 4 21 10 15 10"/></svg>'}></specd-cov-row>
        <specd-cov-row label="Ready for Dev" pct="71" .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'}></specd-cov-row>
        <specd-cov-row label="Storybook Sync" pct="32" .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'}></specd-cov-row>
        <specd-cov-row label="Code Links" pct="88" .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'}></specd-cov-row>
      </div>
    </div>

    <!-- Component Readiness 2x2 -->
    <div style="padding:10px 12px;">
      <specd-section-label label="Component Readiness"></specd-section-label>
      <div class="stat-tiles-2x2">
        <specd-stat-tile-lg color="green" num="119" title="Descriptions" subtitle="33 missing"></specd-stat-tile-lg>
        <specd-stat-tile-lg color="red" num="84" title="Doc Links" subtitle="68 missing links"></specd-stat-tile-lg>
        <specd-stat-tile-lg color="amber" num="96" title="Variable Coverage" subtitle="56 hard-coded values"></specd-stat-tile-lg>
        <specd-stat-tile-lg color="amber" num="108" title="Dev Status" subtitle="44 without status"></specd-stat-tile-lg>
      </div>
    </div>

    <!-- Dev Readiness 3col -->
    <div style="padding:0 12px 10px;">
      <specd-section-label label="Dev Readiness"></specd-section-label>
      <div class="stat-tiles-3col">
        <specd-stat-tile-lg color="green" num="134" title="Code Links" subtitle="linked"></specd-stat-tile-lg>
        <specd-stat-tile-lg color="green" num="141" title="Published" subtitle="current"></specd-stat-tile-lg>
        <specd-stat-tile-lg color="amber" num="18" title="Untracked" subtitle="changed locally"></specd-stat-tile-lg>
      </div>
    </div>

    <!-- Health Map -->
    <div style="padding:10px 12px 14px;">
      <div class="ov-health-top">
        <span class="ov-health-title">Component Health Map</span>
        <div class="ov-health-legend">
          <span class="ov-health-legend-item"><span class="ov-health-legend-dot excellent"></span>Excellent</span>
          <span class="ov-health-legend-item"><span class="ov-health-legend-dot good"></span>Good</span>
          <span class="ov-health-legend-item"><span class="ov-health-legend-dot warn"></span>Warn</span>
          <span class="ov-health-legend-item"><span class="ov-health-legend-dot poor"></span>Poor</span>
        </div>
      </div>
      <div class="ov-health-grid">
        <div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot warn"></div><div class="hm-dot poor"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div>
        <div class="hm-dot excellent"></div><div class="hm-dot poor"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot poor"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div>
        <div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot na"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot poor"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot good"></div>
        <div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot poor"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div>
        <div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot poor"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div>
        <div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot na"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot excellent"></div>
        <div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot warn"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div><div class="hm-dot excellent"></div><div class="hm-dot poor"></div><div class="hm-dot excellent"></div><div class="hm-dot good"></div><div class="hm-dot excellent"></div>
      </div>
    </div>

    <!-- Action bar -->
    <div class="action-bar">
      <specd-button variant="primary" size="sm" label="↺ Re-scan"></specd-button>
      <span style="flex:1;"></span>
      <specd-button variant="ghost" size="sm" label="Report"></specd-button>
      <specd-button variant="ghost" size="sm" label="CSV"></specd-button>
      <specd-button variant="ghost" size="sm" label="JSON"></specd-button>
    </div>

    <div style="height:16px;"></div>
  </div>
`;

const sectionBlock = (name: string, content: TemplateResult) => html`
  <div style="display:flex; flex-direction:column; gap:8px;">
    <div style="font:600 11px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; padding:0 2px;">${name}</div>
    <div style="background:#fff; border:1px solid #e5e7eb; border-radius:10px; padding:12px 14px; display:flex; flex-wrap:wrap; gap:10px; align-items:center;">
      ${content}
    </div>
  </div>
`;

export const PluginView: Story = {
  name: 'Plugin View',
  parameters: { layout: 'padded' },
  render: () => html`
    <div style="padding:16px; background:#e8eef5; min-height:100vh; display:flex; align-items:flex-start;">
      <div class="plugin-wrap">
        ${componentShell()}
        ${overviewComponentContent()}
      </div>
    </div>
  `,
};

export const Compare: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => html`
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0; min-height:100vh;">
      <div style="border-right:2px solid #dbeafe; background:#e8eef5; padding:16px;">
        <p style="font:700 10px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">Reference HTML</p>
        <div class="plugin-wrap">
          ${pluginShell()}
          ${overviewRawContent()}
        </div>
      </div>
      <div style="background:#e8eef5; padding:16px;">
        <p style="font:700 10px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">Component Build</p>
        <div class="plugin-wrap">
          ${componentShell()}
          ${overviewComponentContent()}
        </div>
      </div>
    </div>
  `,
};

export const ComponentBreakdown: Story = {
  name: 'Component Breakdown',
  parameters: { layout: 'padded' },
  render: () => html`
    <div style="padding:16px; background:#f0f4f8; min-height:100vh; font-family:Inter,sans-serif;">
      <h2 style="font:700 14px 'IBM Plex Mono',monospace; color:#6b7280; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 20px;">
        OverviewTab — Components Used
      </h2>
      <div style="display:flex; flex-direction:column; gap:24px;">

        ${sectionBlock('specd-app-header', html`
          <specd-app-header name="Pulse" showrefresh showexport showsettings></specd-app-header>
        `)}

        ${sectionBlock('specd-tab-bar', html`
          <specd-tab-bar tabs=${JSON.stringify([
            { id: 'overview', label: 'Overview', icon: '' },
            { id: 'issues', label: 'Issues', badge: 47, icon: '' },
          ])} active="overview" style="width:100%;"></specd-tab-bar>
        `)}

        ${sectionBlock('specd-score-ring', html`
          <specd-score-ring score="72" tier="good" size="80"></specd-score-ring>
          <specd-score-ring score="45" tier="med" size="80"></specd-score-ring>
          <specd-score-ring score="28" tier="poor" size="80"></specd-score-ring>
        `)}

        ${sectionBlock('specd-health-tag', html`
          <specd-health-tag tier="good" label="Good"></specd-health-tag>
          <specd-health-tag tier="med" label="Med"></specd-health-tag>
          <specd-health-tag tier="poor" label="Poor"></specd-health-tag>
        `)}

        ${sectionBlock('specd-score-trend', html`
          <specd-score-trend delta="+4" direction="up" meta="vs last scan"></specd-score-trend>
          <specd-score-trend delta="-2" direction="down" meta="vs last scan"></specd-score-trend>
        `)}

        ${sectionBlock('specd-cov-row (full width)', html`
          <specd-cov-row label="Descriptions" pct="78" .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 6h16M4 10h16M4 14h10"/></svg>'} style="width:100%;"></specd-cov-row>
          <specd-cov-row label="Doc Links" pct="45" .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'} style="width:100%;"></specd-cov-row>
        `)}

        ${sectionBlock('specd-stat-tile-lg', html`
          <specd-stat-tile-lg color="green" num="119" title="Descriptions" subtitle="33 missing"></specd-stat-tile-lg>
          <specd-stat-tile-lg color="red" num="84" title="Doc Links" subtitle="68 missing"></specd-stat-tile-lg>
          <specd-stat-tile-lg color="amber" num="96" title="Variable Coverage" subtitle="56 hard-coded"></specd-stat-tile-lg>
        `)}

        ${sectionBlock('specd-section-label', html`
          <specd-section-label label="Component Readiness"></specd-section-label>
          <specd-section-label label="Dev Readiness"></specd-section-label>
          <specd-section-label label="Overview Report"></specd-section-label>
        `)}

        ${sectionBlock('specd-button', html`
          <specd-button variant="primary" size="sm" label="Re-scan"></specd-button>
          <specd-button variant="ghost" size="sm" label="CSV"></specd-button>
          <specd-button variant="ghost" size="sm" label="Report"></specd-button>
          <specd-button variant="ghost" size="sm" label="JSON"></specd-button>
        `)}

      </div>
    </div>
  `,
};
