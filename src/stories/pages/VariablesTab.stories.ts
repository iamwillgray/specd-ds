import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TemplateResult } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/SectionLabel/SpecdSectionLabel.js';
import '../../components/Chip/SpecdChip.js';
import '../../components/Button/SpecdButton.js';
import '../../components/HealthTag/SpecdHealthTag.js';
import '../../components/ColorSwatch/SpecdColorSwatch.js';
import '../../components/Tag/SpecdTag.js';

const LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 48 48" fill="none"><rect x="17" y="24.2427" width="10.2426" height="10.2426" rx="2" transform="rotate(-45 17 24.2427)" fill="white"/><rect x="12.7071" y="24.101" width="16.1133" height="16.1133" rx="4.5" transform="rotate(-45 12.7071 24.101)" stroke="white" stroke-width="1.2"/><rect x="7.70711" y="23.9664" width="22.9942" height="23.0891" rx="7.5" transform="rotate(-45 7.70711 23.9664)" stroke="white" stroke-width="1.2"/></svg>`;

const meta: Meta = {
  title: 'Pages/VariablesTab',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const TABS_JSON = JSON.stringify([
  { id: 'overview',    label: 'Overview',   icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>` },
  { id: 'issues',      label: 'Issues',     badge: 47, icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>` },
  { id: 'components',  label: 'Components', icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` },
  { id: 'variables',   label: 'Variables',  icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 7h16M4 12h16M4 17h10"/></svg>` },
  { id: 'storybook',   label: 'Storybook',  icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>` },
  { id: 'library',     label: 'Library',    icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>` },
]);

const componentShell = () => html`
  <specd-app-header name="Pulse" showrefresh showexport showsettings></specd-app-header>
  <specd-tab-bar tabs=${TABS_JSON} active="variables"></specd-tab-bar>
`;

const pluginShell = () => html`
  <header class="app-header-v2">
    <div class="logo-mark">${unsafeSVG(LOGO_SVG)}</div>
    <div class="header-text"><div class="header-name">Pulse</div></div>
    <button class="header-icon-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-3.51-7.13"/><polyline points="21 4 21 10 15 10"/></svg>
    </button>
    <button class="header-icon-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </button>
    <button class="header-icon-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    </button>
  </header>
  <nav class="tab-bar-v2" role="tablist">
    <button class="tab-v2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>Overview
    </button>
    <button class="tab-v2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      Issues <span class="tab-badge">47</span>
    </button>
    <button class="tab-v2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>Components
    </button>
    <button class="tab-v2 active">
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

const variablesRawContent = () => html`
  <div class="plugin-scroll">

    <!-- Coverage summary -->
    <div class="vcov-section-hdr">Token Coverage by Type</div>
    <div class="vcov-section-sub">1,847 layers scanned · 63% overall bound</div>
    <div class="vcov-grid">
      <div class="vcov-cell">
        <div class="vcov-type">Fill <span class="vcov-badge good">GOOD</span></div>
        <div class="vcov-pct" style="color:#16a34a;">81%</div>
        <div class="vcov-bar"><div class="vcov-fill" style="width:81%;background:#22c55e;"></div></div>
        <div class="vcov-count">340/421 mapped</div>
      </div>
      <div class="vcov-cell">
        <div class="vcov-type">Stroke <span class="vcov-badge med">MED</span></div>
        <div class="vcov-pct" style="color:#d97706;">54%</div>
        <div class="vcov-bar"><div class="vcov-fill" style="width:54%;background:#f59e0b;"></div></div>
        <div class="vcov-count">96/178 mapped</div>
      </div>
      <div class="vcov-cell">
        <div class="vcov-type">Spacing <span class="vcov-badge poor">POOR</span></div>
        <div class="vcov-pct" style="color:#dc2626;">38%</div>
        <div class="vcov-bar"><div class="vcov-fill" style="width:38%;background:#ef4444;"></div></div>
        <div class="vcov-count">216/568 mapped</div>
      </div>
      <div class="vcov-cell">
        <div class="vcov-type">Typography <span class="vcov-badge med">MED</span></div>
        <div class="vcov-pct" style="color:#d97706;">61%</div>
        <div class="vcov-bar"><div class="vcov-fill" style="width:61%;background:#f59e0b;"></div></div>
        <div class="vcov-count">206/338 mapped</div>
      </div>
      <div class="vcov-cell">
        <div class="vcov-type">Radius <span class="vcov-badge good">GOOD</span></div>
        <div class="vcov-pct" style="color:#16a34a;">74%</div>
        <div class="vcov-bar"><div class="vcov-fill" style="width:74%;background:#22c55e;"></div></div>
        <div class="vcov-count">254/344 mapped</div>
      </div>
    </div>

    <!-- Note: Variable Rules moved to the Settings tab (see ui.html comment:
         "Coverage-only view; variable mapping rules now live on the Settings
         panel"). See SettingsTab.stories.ts for the rules editor. -->

    <!-- Hard-coded Hotspots (Variables' own bulk-fix view — #vars-bulk-fix-view) -->
    <div class="section-header-row" style="margin-top:4px;">
      <span class="section-heading">Hard-coded Hotspots</span>
    </div>
    <p class="section-hint">Frequent values with no variable binding — apply, override or create new tokens.</p>

    <div style="background:#fff; border:1px solid #dbeafe; border-radius:12px; margin:0 12px 12px; overflow:hidden;">

      <!-- Hotspot 1: navy fill -->
      <div class="hc-bulk-row" style="padding:8px 12px; border-bottom:1px solid #eef3fb;">
        <div style="flex:1; min-width:0;">
          <div class="hc-property-header" style="margin-bottom:6px;">
            <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg></span>
            <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; font-weight:600; color:#0c1f3f;">#0c1f3f</span>
            <span class="hc-prop-arrow">·</span>
            <span class="hc-prop-attr">fill</span>
            <span class="hc-instance-count">24×</span>
          </div>
          <div class="bulk-fix-row" style="padding:0; gap:6px;">
            <div class="bulk-current">
              <span style="width:10px;height:10px;border-radius:3px;background:#0c1f3f;border:1px solid rgba(0,0,0,0.12);flex-shrink:0;display:inline-block;"></span>
              <span class="raw-value">#0c1f3f</span>
            </div>
            <span style="color:#6b7280;font-size:10px;flex-shrink:0;">→</span>
            <div class="bulk-suggestion">
              <span style="width:10px;height:10px;border-radius:3px;background:#0c1f3f;border:1px solid rgba(0,0,0,0.12);flex-shrink:0;display:inline-block;"></span>
              <span class="bulk-var-name">color/brand/navy</span>
              <span class="bulk-match-chip partial">PARTIAL</span>
            </div>
            <button class="btn-row-primary" style="min-width:60px;justify-content:center;">Apply</button>
            <button class="btn-row-primary btn-hc-ghost" style="min-width:68px;justify-content:center;">+ New var</button>
          </div>
        </div>
      </div>

      <!-- Hotspot 2: blue-tint fill -->
      <div class="hc-bulk-row" style="padding:8px 12px; border-bottom:1px solid #eef3fb;">
        <div style="flex:1; min-width:0;">
          <div class="hc-property-header" style="margin-bottom:6px;">
            <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg></span>
            <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:600;color:#0c1f3f;">#dbeafe</span>
            <span class="hc-prop-arrow">·</span>
            <span class="hc-prop-attr">fill</span>
            <span class="hc-instance-count">18×</span>
          </div>
          <div class="bulk-fix-row" style="padding:0; gap:6px;">
            <div class="bulk-current">
              <span style="width:10px;height:10px;border-radius:3px;background:#dbeafe;border:1px solid rgba(0,0,0,0.12);flex-shrink:0;display:inline-block;"></span>
              <span class="raw-value">#dbeafe</span>
            </div>
            <span style="color:#6b7280;font-size:10px;flex-shrink:0;">→</span>
            <div class="bulk-suggestion">
              <span style="width:10px;height:10px;border-radius:3px;background:#dbeafe;border:1px solid rgba(0,0,0,0.12);flex-shrink:0;display:inline-block;"></span>
              <span class="bulk-var-name">color/blue-tint</span>
              <span class="bulk-match-chip exact">EXACT</span>
            </div>
            <button class="btn-row-primary" style="min-width:60px;justify-content:center;">Apply</button>
            <button class="btn-row-primary btn-hc-ghost" style="min-width:68px;justify-content:center;">+ New var</button>
          </div>
        </div>
      </div>

      <!-- Hotspot 3: padding -->
      <div class="hc-bulk-row" style="padding:8px 12px; border-bottom:1px solid #eef3fb;">
        <div style="flex:1; min-width:0;">
          <div class="hc-property-header" style="margin-bottom:6px;">
            <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 6H3M21 18H3"/></svg></span>
            <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:600;color:#0c1f3f;">16px</span>
            <span class="hc-prop-arrow">·</span>
            <span class="hc-prop-attr">padding</span>
            <span class="hc-instance-count">12×</span>
          </div>
          <div class="bulk-fix-row" style="padding:0; gap:6px;">
            <div class="bulk-current">
              <span class="raw-value">16</span>
              <button class="btn-bulk-set-zero">Set to 0</button>
            </div>
            <span style="color:#6b7280;font-size:10px;flex-shrink:0;">→</span>
            <div class="bulk-suggestion">
              <span class="bulk-var-name">spacing/md</span>
              <span class="bulk-match-chip partial">PARTIAL</span>
            </div>
            <button class="btn-row-primary" style="min-width:60px;justify-content:center;">Apply</button>
            <button class="btn-row-primary btn-hc-ghost" style="min-width:68px;justify-content:center;">+ New var</button>
          </div>
        </div>
      </div>

      <!-- Hotspot 4: error red -->
      <div class="hc-bulk-row" style="padding:8px 12px;">
        <div style="flex:1; min-width:0;">
          <div class="hc-property-header" style="margin-bottom:6px;">
            <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg></span>
            <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:600;color:#0c1f3f;">#f00013</span>
            <span class="hc-prop-arrow">·</span>
            <span class="hc-prop-attr">fill</span>
            <span class="hc-instance-count">9×</span>
          </div>
          <div class="bulk-fix-row" style="padding:0; gap:6px;">
            <div class="bulk-current">
              <span style="width:10px;height:10px;border-radius:3px;background:#f00013;border:1px solid rgba(0,0,0,0.12);flex-shrink:0;display:inline-block;"></span>
              <span class="raw-value">#f00013</span>
            </div>
            <span style="color:#6b7280;font-size:10px;flex-shrink:0;">→</span>
            <div class="bulk-suggestion">
              <span style="width:10px;height:10px;border-radius:3px;background:#f00013;border:1px solid rgba(0,0,0,0.12);flex-shrink:0;display:inline-block;"></span>
              <span class="bulk-var-name">color/feedback/error</span>
              <span class="bulk-match-chip exact">EXACT</span>
            </div>
            <button class="btn-row-primary" style="min-width:60px;justify-content:center;">Apply</button>
            <button class="btn-row-primary btn-hc-ghost" style="min-width:68px;justify-content:center;">+ New var</button>
          </div>
        </div>
      </div>

    </div>

    <div style="height:16px;"></div>
  </div>
`;

const variablesComponentContent = () => html`
  <div class="plugin-scroll">

    <!-- Coverage summary -->
    <div class="vcov-section-hdr">Token Coverage by Type</div>
    <div class="vcov-section-sub">1,847 layers scanned · 63% overall bound</div>
    <div class="vcov-grid">
      <div class="vcov-cell">
        <div class="vcov-type">Fill <specd-health-tag tier="good" label="GOOD" size="xs" nodot></specd-health-tag></div>
        <div class="vcov-pct" style="color:#16a34a;">81%</div>
        <div class="vcov-bar"><div class="vcov-fill" style="width:81%;background:#22c55e;"></div></div>
        <div class="vcov-count">340/421 mapped</div>
      </div>
      <div class="vcov-cell">
        <div class="vcov-type">Stroke <specd-health-tag tier="med" label="MED" size="xs" nodot></specd-health-tag></div>
        <div class="vcov-pct" style="color:#d97706;">54%</div>
        <div class="vcov-bar"><div class="vcov-fill" style="width:54%;background:#f59e0b;"></div></div>
        <div class="vcov-count">96/178 mapped</div>
      </div>
      <div class="vcov-cell">
        <div class="vcov-type">Spacing <specd-health-tag tier="poor" label="POOR" size="xs" nodot></specd-health-tag></div>
        <div class="vcov-pct" style="color:#dc2626;">38%</div>
        <div class="vcov-bar"><div class="vcov-fill" style="width:38%;background:#ef4444;"></div></div>
        <div class="vcov-count">216/568 mapped</div>
      </div>
      <div class="vcov-cell">
        <div class="vcov-type">Typography <specd-health-tag tier="med" label="MED" size="xs" nodot></specd-health-tag></div>
        <div class="vcov-pct" style="color:#d97706;">61%</div>
        <div class="vcov-bar"><div class="vcov-fill" style="width:61%;background:#f59e0b;"></div></div>
        <div class="vcov-count">206/338 mapped</div>
      </div>
      <div class="vcov-cell">
        <div class="vcov-type">Radius <specd-health-tag tier="good" label="GOOD" size="xs" nodot></specd-health-tag></div>
        <div class="vcov-pct" style="color:#16a34a;">74%</div>
        <div class="vcov-bar"><div class="vcov-fill" style="width:74%;background:#22c55e;"></div></div>
        <div class="vcov-count">254/344 mapped</div>
      </div>
    </div>

    <!-- Note: Variable Rules moved to the Settings tab (see ui.html comment:
         "Coverage-only view; variable mapping rules now live on the Settings
         panel"). See SettingsTab.stories.ts for the rules editor. -->

    <!-- Hard-coded Hotspots (Variables' own bulk-fix view — #vars-bulk-fix-view) -->
    <div class="section-header-row" style="margin-top:4px;">
      <specd-section-label label="Hard-coded Hotspots"></specd-section-label>
    </div>
    <p class="section-hint">Frequent values with no variable binding — apply, override or create new tokens.</p>

    <div style="background:#fff; border:1px solid #dbeafe; border-radius:12px; margin:0 12px 12px; overflow:hidden;">

      <!-- Hotspot 1: navy fill -->
      <div class="hc-bulk-row" style="padding:8px 12px; border-bottom:1px solid #eef3fb;">
        <div style="flex:1; min-width:0;">
          <div class="hc-property-header" style="margin-bottom:6px;">
            <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg></span>
            <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; font-weight:600; color:#0c1f3f;">#0c1f3f</span>
            <span class="hc-prop-arrow">·</span>
            <span class="hc-prop-attr">fill</span>
            <span class="hc-instance-count">24×</span>
          </div>
          <div class="bulk-fix-row" style="padding:0; gap:6px;">
            <div class="bulk-current">
              <specd-color-swatch color="#0c1f3f" sm></specd-color-swatch>
              <span class="raw-value">#0c1f3f</span>
            </div>
            <span style="color:#6b7280;font-size:10px;flex-shrink:0;">→</span>
            <div class="bulk-suggestion">
              <specd-color-swatch color="#0c1f3f" sm></specd-color-swatch>
              <span class="bulk-var-name">color/brand/navy</span>
              <span class="bulk-match-chip partial">PARTIAL</span>
            </div>
            <specd-button variant="primary" size="sm" label="Apply"></specd-button>
            <specd-button variant="ghost" size="sm" label="+ New var"></specd-button>
          </div>
        </div>
      </div>

      <!-- Hotspot 2: blue-tint fill -->
      <div class="hc-bulk-row" style="padding:8px 12px; border-bottom:1px solid #eef3fb;">
        <div style="flex:1; min-width:0;">
          <div class="hc-property-header" style="margin-bottom:6px;">
            <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg></span>
            <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:600;color:#0c1f3f;">#dbeafe</span>
            <span class="hc-prop-arrow">·</span>
            <span class="hc-prop-attr">fill</span>
            <span class="hc-instance-count">18×</span>
          </div>
          <div class="bulk-fix-row" style="padding:0; gap:6px;">
            <div class="bulk-current">
              <specd-color-swatch color="#dbeafe" sm></specd-color-swatch>
              <span class="raw-value">#dbeafe</span>
            </div>
            <span style="color:#6b7280;font-size:10px;flex-shrink:0;">→</span>
            <div class="bulk-suggestion">
              <specd-color-swatch color="#dbeafe" sm></specd-color-swatch>
              <span class="bulk-var-name">color/blue-tint</span>
              <span class="bulk-match-chip exact">EXACT</span>
            </div>
            <specd-button variant="primary" size="sm" label="Apply"></specd-button>
            <specd-button variant="ghost" size="sm" label="+ New var"></specd-button>
          </div>
        </div>
      </div>

      <!-- Hotspot 3: padding -->
      <div class="hc-bulk-row" style="padding:8px 12px; border-bottom:1px solid #eef3fb;">
        <div style="flex:1; min-width:0;">
          <div class="hc-property-header" style="margin-bottom:6px;">
            <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 6H3M21 18H3"/></svg></span>
            <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:600;color:#0c1f3f;">16px</span>
            <span class="hc-prop-arrow">·</span>
            <span class="hc-prop-attr">padding</span>
            <span class="hc-instance-count">12×</span>
          </div>
          <div class="bulk-fix-row" style="padding:0; gap:6px;">
            <div class="bulk-current">
              <span class="raw-value">16</span>
              <button class="btn-bulk-set-zero">Set to 0</button>
            </div>
            <span style="color:#6b7280;font-size:10px;flex-shrink:0;">→</span>
            <div class="bulk-suggestion">
              <span class="bulk-var-name">spacing/md</span>
              <span class="bulk-match-chip partial">PARTIAL</span>
            </div>
            <specd-button variant="primary" size="sm" label="Apply"></specd-button>
            <specd-button variant="ghost" size="sm" label="+ New var"></specd-button>
          </div>
        </div>
      </div>

      <!-- Hotspot 4: error red -->
      <div class="hc-bulk-row" style="padding:8px 12px;">
        <div style="flex:1; min-width:0;">
          <div class="hc-property-header" style="margin-bottom:6px;">
            <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg></span>
            <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:600;color:#0c1f3f;">#f00013</span>
            <span class="hc-prop-arrow">·</span>
            <span class="hc-prop-attr">fill</span>
            <span class="hc-instance-count">9×</span>
          </div>
          <div class="bulk-fix-row" style="padding:0; gap:6px;">
            <div class="bulk-current">
              <specd-color-swatch color="#f00013" sm></specd-color-swatch>
              <span class="raw-value">#f00013</span>
            </div>
            <span style="color:#6b7280;font-size:10px;flex-shrink:0;">→</span>
            <div class="bulk-suggestion">
              <specd-color-swatch color="#f00013" sm></specd-color-swatch>
              <span class="bulk-var-name">color/feedback/error</span>
              <span class="bulk-match-chip exact">EXACT</span>
            </div>
            <specd-button variant="primary" size="sm" label="Apply"></specd-button>
            <specd-button variant="ghost" size="sm" label="+ New var"></specd-button>
          </div>
        </div>
      </div>

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
    <div style="padding:0; display:flex; flex-direction:column; align-items:flex-start;">
      <div class="plugin-wrap">
        ${componentShell()}
        ${variablesComponentContent()}
      </div>
    </div>
  `,
};

export const Compare: Story = {
  render: () => html`
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0; min-height:100vh;">
      <div style="border-right:2px solid #dbeafe; background:#e8eef5; padding:16px;">
        <p style="font:700 10px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">Reference HTML</p>
        <div class="plugin-wrap">
          ${pluginShell()}
          ${variablesRawContent()}
        </div>
      </div>
      <div style="background:#e8eef5; padding:16px;">
        <p style="font:700 10px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">Component Build</p>
        <div class="plugin-wrap">
          ${componentShell()}
          ${variablesComponentContent()}
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
        VariablesTab — Components Used
      </h2>
      <div style="display:flex; flex-direction:column; gap:24px;">

        ${sectionBlock('specd-app-header', html`
          <specd-app-header name="Pulse" showrefresh showexport showsettings></specd-app-header>
        `)}

        ${sectionBlock('specd-health-tag (tier variants, xs nodot)', html`
          <specd-health-tag tier="good" label="GOOD" size="xs" nodot></specd-health-tag>
          <specd-health-tag tier="med" label="MED" size="xs" nodot></specd-health-tag>
          <specd-health-tag tier="poor" label="POOR" size="xs" nodot></specd-health-tag>
        `)}

        ${sectionBlock('specd-color-swatch (sm)', html`
          <specd-color-swatch color="#0c1f3f" sm></specd-color-swatch>
          <specd-color-swatch color="#dbeafe" sm></specd-color-swatch>
          <specd-color-swatch color="#f00013" sm></specd-color-swatch>
          <specd-color-swatch color="#3b82f6" sm></specd-color-swatch>
          <specd-color-swatch color="#22c55e" sm></specd-color-swatch>
        `)}

        ${sectionBlock('specd-tag (rule type)', html`
          <specd-tag label="Color" intent="info"></specd-tag>
          <specd-tag label="Spacing" intent="neutral"></specd-tag>
          <specd-tag label="Typography" intent="neutral"></specd-tag>
        `)}

        ${sectionBlock('specd-button', html`
          <specd-button variant="primary" size="sm" label="+ Add Rule"></specd-button>
          <specd-button variant="ghost" size="sm" label="Presets"></specd-button>
          <specd-button variant="primary" size="sm" label="Apply"></specd-button>
          <specd-button variant="ghost" size="sm" label="+ New var"></specd-button>
        `)}

        ${sectionBlock('specd-section-label', html`
          <specd-section-label label="Variable Rules"></specd-section-label>
          <specd-section-label label="Hard-coded Hotspots"></specd-section-label>
        `)}

      </div>
    </div>
  `,
};
