import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TemplateResult } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/Button/SpecdButton.js';
import '../../components/Tag/SpecdTag.js';
import '../../components/KvRow/SpecdKvRow.js';
import '../../components/SectionLabel/SpecdSectionLabel.js';

const LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 48 48" fill="none"><rect x="17" y="24.2427" width="10.2426" height="10.2426" rx="2" transform="rotate(-45 17 24.2427)" fill="white"/><rect x="12.7071" y="24.101" width="16.1133" height="16.1133" rx="4.5" transform="rotate(-45 12.7071 24.101)" stroke="white" stroke-width="1.2"/><rect x="7.70711" y="23.9664" width="22.9942" height="23.0891" rx="7.5" transform="rotate(-45 7.70711 23.9664)" stroke="white" stroke-width="1.2"/></svg>`;

const meta: Meta = {
  title: 'Pages/LibraryTab',
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
  <specd-tab-bar tabs=${TABS_JSON} active="library"></specd-tab-bar>
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
    <button class="tab-v2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 7h16M4 12h16M4 17h10"/></svg>Variables
    </button>
    <button class="tab-v2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>Storybook
    </button>
    <button class="tab-v2 active">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>Library
    </button>
  </nav>
`;

const libraryRawContent = () => html`
  <div class="plugin-scroll">

    <!-- Connected Libraries -->
    <div class="section-header-row">
      <span class="section-heading">Variable Usage by Library</span>
    </div>

    <!-- Library card 1 -->
    <div class="lib-card">
      <div class="lib-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      </div>
      <div class="lib-info">
        <div class="lib-name">Acme Design Tokens</div>
        <div class="lib-desc">Primary semantic token library — colours, spacing, typography, and shadows.</div>
        <div class="lib-meta-row">
          <span class="lib-purpose-badge">Variables</span>
          <span class="lib-status-dot"></span>
          <span class="lib-status-text">Connected · 124 variables used</span>
        </div>
      </div>
      <button class="btn-disconnect">Disconnect</button>
    </div>

    <!-- Library card 2 -->
    <div class="lib-card">
      <div class="lib-icon" style="background:#ebffe0; color:#008531;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8M12 8v8"/></svg>
      </div>
      <div class="lib-info">
        <div class="lib-name">Brand Primitives</div>
        <div class="lib-desc">Raw colour primitives and scale values from the brand team.</div>
        <div class="lib-meta-row">
          <span class="lib-purpose-badge">Variables</span>
          <span class="lib-status-dot"></span>
          <span class="lib-status-text">Connected · 88 variables used</span>
        </div>
      </div>
      <button class="btn-disconnect">Disconnect</button>
    </div>

    <!-- Add another -->
    <button class="lib-add-card">
      <div class="lib-add-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
      </div>
      <div class="lib-add-label">Add another library</div>
      <div class="lib-add-hint">Connect a variable or component library to improve token suggestions.</div>
    </button>

    <!-- Usage Breakdown -->
    <div class="section-header-row" style="margin-top:4px;">
      <span class="section-heading">Usage Breakdown</span>
    </div>
    <p class="section-hint">Which variable collections are used most across your components.</p>

    <div class="lib-analytics-section" style="margin-bottom:4px;">
      <div class="lib-analytics-row">
        <div class="lib-row-name">semantic/color</div>
        <div class="lib-row-bar-wrap"><div class="lib-row-bar" style="width:78%;"></div></div>
        <div class="lib-row-count">78%</div>
      </div>
      <div class="lib-analytics-row">
        <div class="lib-row-name">primitives/spacing</div>
        <div class="lib-row-bar-wrap"><div class="lib-row-bar" style="width:55%;"></div></div>
        <div class="lib-row-count">55%</div>
      </div>
      <div class="lib-analytics-row">
        <div class="lib-row-name">semantic/typography</div>
        <div class="lib-row-bar-wrap"><div class="lib-row-bar" style="width:43%; background:#22c55e;"></div></div>
        <div class="lib-row-count">43%</div>
      </div>
      <div class="lib-analytics-row">
        <div class="lib-row-name">brand/primitives</div>
        <div class="lib-row-bar-wrap"><div class="lib-row-bar" style="width:22%; background:#ff912b;"></div></div>
        <div class="lib-row-count">22%</div>
      </div>
    </div>
    <div style="padding:0 12px 8px; text-align:center;">
      <button class="btn-ghost btn-sm">View all 12 collections</button>
    </div>

    <!-- Unused Variables -->
    <div class="section-header-row" style="margin-top:4px;">
      <span class="section-heading">Unused Variables</span>
    </div>
    <p class="section-hint">Variables defined in connected libraries but never used in this file.</p>
    <div style="background:#fff; border:1px solid #dbeafe; border-radius:12px; margin:0 12px 4px; overflow:hidden;">
      <div class="lib-analytics-row">
        <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; color:#0c1f3f;">semantic/color/brand-tertiary</span>
        <div class="lib-row-bar-wrap"><div class="lib-row-bar" style="width:0%; background:#b8cadf;"></div></div>
        <span style="font-size:10px; color:#9ca3af; font-family:'IBM Plex Mono',monospace;">0 uses</span>
      </div>
      <div class="lib-analytics-row">
        <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; color:#0c1f3f;">primitives/purple-100</span>
        <div class="lib-row-bar-wrap"><div class="lib-row-bar" style="width:0%; background:#b8cadf;"></div></div>
        <span style="font-size:10px; color:#9ca3af; font-family:'IBM Plex Mono',monospace;">0 uses</span>
      </div>
      <div class="lib-analytics-row">
        <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; color:#0c1f3f;">semantic/shadow/overlay</span>
        <div class="lib-row-bar-wrap"><div class="lib-row-bar" style="width:0%; background:#b8cadf;"></div></div>
        <span style="font-size:10px; color:#9ca3af; font-family:'IBM Plex Mono',monospace;">0 uses</span>
      </div>
      <div class="lib-analytics-row">
        <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; color:#0c1f3f;">primitives/blue-25</span>
        <div class="lib-row-bar-wrap"><div class="lib-row-bar" style="width:0%; background:#b8cadf;"></div></div>
        <span style="font-size:10px; color:#9ca3af; font-family:'IBM Plex Mono',monospace;">0 uses</span>
      </div>
      <div class="lib-analytics-row" style="border-bottom:none;">
        <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; color:#0c1f3f;">semantic/typography/overline</span>
        <div class="lib-row-bar-wrap"><div class="lib-row-bar" style="width:0%; background:#b8cadf;"></div></div>
        <span style="font-size:10px; color:#9ca3af; font-family:'IBM Plex Mono',monospace;">0 uses</span>
      </div>
    </div>
    <div style="padding:0 12px 12px; text-align:center;">
      <button class="btn-ghost btn-sm">View more (23 total)</button>
    </div>

    <!-- Hard-coded Hotspots -->
    <div class="section-header-row">
      <span class="section-heading">Hard-coded Hotspots</span>
    </div>
    <p class="section-hint">Frequent values with no variable binding — apply, override or create new tokens.</p>

    <div style="background:#fff; border:1px solid #dbeafe; border-radius:12px; margin:0 12px 14px; overflow:hidden;">

      <!-- Row 1: navy fill -->
      <div class="hc-bulk-row" style="padding:10px 12px; border-bottom:1px solid #eef3fb;">
        <div class="hc-row-content" style="border:none; background:transparent; padding:0;">
          <div class="hc-property-header">
            <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg></span>
            <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; font-weight:600; color:#0c1f3f;">#0c1f3f</span>
            <span class="hc-prop-arrow">·</span>
            <span class="hc-prop-attr">fill</span>
            <span class="hc-instance-count">24×</span>
          </div>
          <div class="bulk-fix-row" style="padding:0;">
            <div class="bulk-current">
              <span style="width:10px;height:10px;border-radius:3px;background:#0c1f3f;border:1px solid rgba(0,0,0,0.12);flex-shrink:0;display:inline-block;"></span>
              <span class="raw-value">#0c1f3f</span>
            </div>
            <span style="color:#6b7280; font-size:10px;">→</span>
            <div class="bulk-suggestion">
              <span style="width:10px;height:10px;border-radius:3px;background:#0c1f3f;border:1px solid rgba(0,0,0,0.12);flex-shrink:0;display:inline-block;"></span>
              <span class="bulk-var-name">color/brand/navy</span>
              <span class="prop-fix-match-tag closest">CLOSEST</span>
            </div>
            <button class="btn-row-primary" style="min-width:60px; justify-content:center;">Apply</button>
            <button class="btn-row-primary btn-hc-ghost" style="min-width:76px; justify-content:center;">New var</button>
          </div>
        </div>
      </div>

      <!-- Row 2: blue-tint fill -->
      <div class="hc-bulk-row" style="padding:10px 12px; border-bottom:1px solid #eef3fb;">
        <div class="hc-row-content" style="border:none; background:transparent; padding:0;">
          <div class="hc-property-header">
            <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg></span>
            <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; font-weight:600; color:#0c1f3f;">#dbeafe</span>
            <span class="hc-prop-arrow">·</span>
            <span class="hc-prop-attr">fill</span>
            <span class="hc-instance-count">18×</span>
          </div>
          <div class="bulk-fix-row" style="padding:0;">
            <div class="bulk-current">
              <span style="width:10px;height:10px;border-radius:3px;background:#dbeafe;border:1px solid rgba(0,0,0,0.12);flex-shrink:0;display:inline-block;"></span>
              <span class="raw-value">#dbeafe</span>
            </div>
            <span style="color:#6b7280; font-size:10px;">→</span>
            <div class="bulk-suggestion">
              <span style="width:10px;height:10px;border-radius:3px;background:#dbeafe;border:1px solid rgba(0,0,0,0.12);flex-shrink:0;display:inline-block;"></span>
              <span class="bulk-var-name">color/blue-tint</span>
              <span class="prop-fix-match-tag exact">EXACT</span>
            </div>
            <button class="btn-row-primary" style="min-width:60px; justify-content:center;">Apply</button>
            <button class="btn-row-primary btn-hc-ghost" style="min-width:76px; justify-content:center;">New var</button>
          </div>
        </div>
      </div>

      <!-- Row 3: padding spacing -->
      <div class="hc-bulk-row" style="padding:10px 12px;">
        <div class="hc-row-content" style="border:none; background:transparent; padding:0;">
          <div class="hc-property-header">
            <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 6H3M21 18H3"/></svg></span>
            <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; font-weight:600; color:#0c1f3f;">16px</span>
            <span class="hc-prop-arrow">·</span>
            <span class="hc-prop-attr">padding</span>
            <span class="hc-instance-count">12×</span>
          </div>
          <div class="bulk-fix-row" style="padding:0;">
            <div class="bulk-current">
              <span class="raw-value">16</span>
            </div>
            <span style="color:#6b7280; font-size:10px;">→</span>
            <div class="bulk-suggestion">
              <span class="bulk-var-name">spacing/md</span>
              <span class="prop-fix-match-tag closest">CLOSEST</span>
            </div>
            <button class="btn-row-primary" style="min-width:60px; justify-content:center;">Apply</button>
            <button class="btn-row-primary btn-hc-ghost" style="min-width:76px; justify-content:center;">New var</button>
          </div>
        </div>
      </div>

    </div>

    <div style="height:16px;"></div>
  </div>
`;

const libraryComponentContent = () => html`
  <div class="plugin-scroll">

    <!-- Connected Libraries -->
    <specd-section-label label="Variable Usage by Library"></specd-section-label>

    <!-- Library card 1 -->
    <div class="lib-card">
      <div class="lib-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      </div>
      <div class="lib-info">
        <div class="lib-name">Acme Design Tokens</div>
        <div class="lib-desc">Primary semantic token library — colours, spacing, typography, and shadows.</div>
        <div class="lib-meta-row">
          <specd-tag label="Variables" intent="info"></specd-tag>
          <span class="lib-status-dot"></span>
          <span class="lib-status-text">Connected · 124 variables used</span>
        </div>
      </div>
      <specd-button variant="danger" size="sm" label="Disconnect"></specd-button>
    </div>

    <!-- Library card 2 -->
    <div class="lib-card">
      <div class="lib-icon" style="background:#ebffe0; color:#008531;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8M12 8v8"/></svg>
      </div>
      <div class="lib-info">
        <div class="lib-name">Brand Primitives</div>
        <div class="lib-desc">Raw colour primitives and scale values from the brand team.</div>
        <div class="lib-meta-row">
          <specd-tag label="Variables" intent="info"></specd-tag>
          <span class="lib-status-dot"></span>
          <span class="lib-status-text">Connected · 88 variables used</span>
        </div>
      </div>
      <specd-button variant="danger" size="sm" label="Disconnect"></specd-button>
    </div>

    <!-- Add another -->
    <button class="lib-add-card">
      <div class="lib-add-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
      </div>
      <div class="lib-add-label">Add another library</div>
      <div class="lib-add-hint">Connect a variable or component library to improve token suggestions.</div>
    </button>

    <!-- Usage Breakdown -->
    <specd-section-label label="Usage Breakdown" hint="Which variable collections are used most across your components."></specd-section-label>

    <div class="lib-analytics-section" style="margin-bottom:4px;">
      <div class="lib-analytics-row">
        <div class="lib-row-name">semantic/color</div>
        <div class="lib-row-bar-wrap"><div class="lib-row-bar" style="width:78%;"></div></div>
        <div class="lib-row-count">78%</div>
      </div>
      <div class="lib-analytics-row">
        <div class="lib-row-name">primitives/spacing</div>
        <div class="lib-row-bar-wrap"><div class="lib-row-bar" style="width:55%;"></div></div>
        <div class="lib-row-count">55%</div>
      </div>
      <div class="lib-analytics-row">
        <div class="lib-row-name">semantic/typography</div>
        <div class="lib-row-bar-wrap"><div class="lib-row-bar" style="width:43%; background:#22c55e;"></div></div>
        <div class="lib-row-count">43%</div>
      </div>
      <div class="lib-analytics-row">
        <div class="lib-row-name">brand/primitives</div>
        <div class="lib-row-bar-wrap"><div class="lib-row-bar" style="width:22%; background:#ff912b;"></div></div>
        <div class="lib-row-count">22%</div>
      </div>
    </div>
    <div style="padding:0 12px 8px; text-align:center;">
      <specd-button variant="ghost" size="sm" label="View all 12 collections"></specd-button>
    </div>

    <!-- Unused Variables -->
    <specd-section-label label="Unused Variables" hint="Variables defined in connected libraries but never used in this file."></specd-section-label>
    <div style="background:#fff; border:1px solid #dbeafe; border-radius:12px; margin:0 12px 4px; overflow:hidden;">
      <specd-kv-row label="semantic/color/brand-tertiary" value="0 uses" mono></specd-kv-row>
      <specd-kv-row label="primitives/purple-100" value="0 uses" mono></specd-kv-row>
      <specd-kv-row label="semantic/shadow/overlay" value="0 uses" mono></specd-kv-row>
      <specd-kv-row label="primitives/blue-25" value="0 uses" mono></specd-kv-row>
      <specd-kv-row label="semantic/typography/overline" value="0 uses" mono></specd-kv-row>
    </div>
    <div style="padding:0 12px 12px; text-align:center;">
      <specd-button variant="ghost" size="sm" label="View more (23 total)"></specd-button>
    </div>

    <!-- Hard-coded Hotspots -->
    <specd-section-label label="Hard-coded Hotspots" hint="Frequent values with no variable binding — apply, override or create new tokens."></specd-section-label>

    <div style="background:#fff; border:1px solid #dbeafe; border-radius:12px; margin:0 12px 14px; overflow:hidden;">

      <!-- Row 1: navy fill -->
      <div class="hc-bulk-row" style="padding:10px 12px; border-bottom:1px solid #eef3fb;">
        <div class="hc-row-content" style="border:none; background:transparent; padding:0;">
          <div class="hc-property-header">
            <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg></span>
            <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; font-weight:600; color:#0c1f3f;">#0c1f3f</span>
            <span class="hc-prop-arrow">·</span>
            <span class="hc-prop-attr">fill</span>
            <span class="hc-instance-count">24×</span>
          </div>
          <div class="bulk-fix-row" style="padding:0;">
            <div class="bulk-current">
              <span style="width:10px;height:10px;border-radius:3px;background:#0c1f3f;border:1px solid rgba(0,0,0,0.12);flex-shrink:0;display:inline-block;"></span>
              <span class="raw-value">#0c1f3f</span>
            </div>
            <span style="color:#6b7280; font-size:10px;">→</span>
            <div class="bulk-suggestion">
              <span style="width:10px;height:10px;border-radius:3px;background:#0c1f3f;border:1px solid rgba(0,0,0,0.12);flex-shrink:0;display:inline-block;"></span>
              <span class="bulk-var-name">color/brand/navy</span>
              <specd-tag label="Closest match" intent="warn"></specd-tag>
            </div>
            <specd-button variant="primary" size="sm" label="Apply"></specd-button>
            <specd-button variant="ghost" size="sm" label="New var"></specd-button>
          </div>
        </div>
      </div>

      <!-- Row 2: blue-tint fill -->
      <div class="hc-bulk-row" style="padding:10px 12px; border-bottom:1px solid #eef3fb;">
        <div class="hc-row-content" style="border:none; background:transparent; padding:0;">
          <div class="hc-property-header">
            <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg></span>
            <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; font-weight:600; color:#0c1f3f;">#dbeafe</span>
            <span class="hc-prop-arrow">·</span>
            <span class="hc-prop-attr">fill</span>
            <span class="hc-instance-count">18×</span>
          </div>
          <div class="bulk-fix-row" style="padding:0;">
            <div class="bulk-current">
              <span style="width:10px;height:10px;border-radius:3px;background:#dbeafe;border:1px solid rgba(0,0,0,0.12);flex-shrink:0;display:inline-block;"></span>
              <span class="raw-value">#dbeafe</span>
            </div>
            <span style="color:#6b7280; font-size:10px;">→</span>
            <div class="bulk-suggestion">
              <span style="width:10px;height:10px;border-radius:3px;background:#dbeafe;border:1px solid rgba(0,0,0,0.12);flex-shrink:0;display:inline-block;"></span>
              <span class="bulk-var-name">color/blue-tint</span>
              <specd-tag label="Exact match" intent="info"></specd-tag>
            </div>
            <specd-button variant="primary" size="sm" label="Apply"></specd-button>
            <specd-button variant="ghost" size="sm" label="New var"></specd-button>
          </div>
        </div>
      </div>

      <!-- Row 3: padding spacing -->
      <div class="hc-bulk-row" style="padding:10px 12px;">
        <div class="hc-row-content" style="border:none; background:transparent; padding:0;">
          <div class="hc-property-header">
            <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 6H3M21 18H3"/></svg></span>
            <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; font-weight:600; color:#0c1f3f;">16px</span>
            <span class="hc-prop-arrow">·</span>
            <span class="hc-prop-attr">padding</span>
            <span class="hc-instance-count">12×</span>
          </div>
          <div class="bulk-fix-row" style="padding:0;">
            <div class="bulk-current">
              <span class="raw-value">16</span>
            </div>
            <span style="color:#6b7280; font-size:10px;">→</span>
            <div class="bulk-suggestion">
              <span class="bulk-var-name">spacing/md</span>
              <specd-tag label="Closest match" intent="warn"></specd-tag>
            </div>
            <specd-button variant="primary" size="sm" label="Apply"></specd-button>
            <specd-button variant="ghost" size="sm" label="New var"></specd-button>
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
    <div style="padding:0; display:flex; align-items:flex-start;">
      <div class="plugin-wrap">
        ${componentShell()}
        ${libraryComponentContent()}
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
          ${libraryRawContent()}
        </div>
      </div>
      <div style="background:#e8eef5; padding:16px;">
        <p style="font:700 10px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">Component Build</p>
        <div class="plugin-wrap">
          ${componentShell()}
          ${libraryComponentContent()}
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
        LibraryTab — Components Used
      </h2>
      <div style="display:flex; flex-direction:column; gap:24px;">

        ${sectionBlock('specd-app-header', html`
          <specd-app-header name="Pulse" showrefresh showexport showsettings></specd-app-header>
        `)}

        ${sectionBlock('specd-section-label', html`
          <specd-section-label label="Variable Usage by Library"></specd-section-label>
          <specd-section-label label="Usage Breakdown" hint="Which collections are most used"></specd-section-label>
          <specd-section-label label="Unused Variables" hint="Never used in this file"></specd-section-label>
          <specd-section-label label="Hard-coded Hotspots" hint="Values with no variable binding"></specd-section-label>
        `)}

        ${sectionBlock('specd-tag (library & match)', html`
          <specd-tag label="Variables" intent="info"></specd-tag>
          <specd-tag label="Closest match" intent="warn"></specd-tag>
          <specd-tag label="Exact match" intent="info"></specd-tag>
        `)}

        ${sectionBlock('specd-kv-row', html`
          <specd-kv-row label="semantic/color/brand-tertiary" value="0 uses" mono style="width:100%;"></specd-kv-row>
          <specd-kv-row label="primitives/purple-100" value="0 uses" mono style="width:100%;"></specd-kv-row>
          <specd-kv-row label="semantic/shadow/overlay" value="0 uses" mono style="width:100%;"></specd-kv-row>
        `)}

        ${sectionBlock('specd-button', html`
          <specd-button variant="danger" size="sm" label="Disconnect"></specd-button>
          <specd-button variant="ghost" size="sm" label="View all 12 collections"></specd-button>
          <specd-button variant="ghost" size="sm" label="View more (23 total)"></specd-button>
          <specd-button variant="primary" size="sm" label="Apply"></specd-button>
          <specd-button variant="ghost" size="sm" label="New var"></specd-button>
        `)}

      </div>
    </div>
  `,
};
