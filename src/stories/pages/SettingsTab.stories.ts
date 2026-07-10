import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TemplateResult } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/ToggleRow/SpecdToggleRow.js';
import '../../components/Input/SpecdInput.js';
import '../../components/Button/SpecdButton.js';
import '../../components/SectionLabel/SpecdSectionLabel.js';
import '../../components/Divider/SpecdDivider.js';

const LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 48 48" fill="none"><rect x="17" y="24.2427" width="10.2426" height="10.2426" rx="2" transform="rotate(-45 17 24.2427)" fill="white"/><rect x="12.7071" y="24.101" width="16.1133" height="16.1133" rx="4.5" transform="rotate(-45 12.7071 24.101)" stroke="white" stroke-width="1.2"/><rect x="7.70711" y="23.9664" width="22.9942" height="23.0891" rx="7.5" transform="rotate(-45 7.70711 23.9664)" stroke="white" stroke-width="1.2"/></svg>`;

const meta: Meta = {
  title: 'Pages/SettingsTab',
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
  <specd-tab-bar tabs=${TABS_JSON} ></specd-tab-bar>
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
    <button class="header-icon-btn active">
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
    <button class="tab-v2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>Library
    </button>
  </nav>
`;

const settingsRawContent = () => html`
  <div class="plugin-scroll">

    <!-- Figma API (PAT connected) -->
    <div class="section-label">Figma API</div>
    <div class="card" style="margin: 0 12px 10px;">
      <div class="pat-connected">
        <div class="pat-avatar">👤</div>
        <div style="flex:1;">
          <div class="pat-name">Will Gray</div>
          <div class="pat-email">will@specd.tools</div>
          <div class="pat-expiry">Expires Dec 2025</div>
        </div>
        <button class="btn-danger btn-sm">Disconnect</button>
      </div>
    </div>

    <!-- What this unlocks -->
    <div class="section-label">What this unlocks</div>
    <div class="card" style="margin: 0 12px 10px;">
      <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Shared plugin data code link detection</span></div>
      <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Documentation link analysis</span></div>
      <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Validated code links via REST API</span></div>
      <div class="capability-row"><span class="cap-icon off">○</span><span class="cap-text off">Library Analytics (Enterprise only)</span></div>
      <div class="capability-row"><span class="cap-icon off">○</span><span class="cap-text off">Figma Code Connect verification</span></div>
    </div>

    <!-- Accordion sections -->
    <div style="padding: 0 12px; display: flex; flex-direction: column; gap: 0; margin-bottom: 10px;">

      <!-- 1. Code Connect setup -->
      <div class="accordion">
        <button class="accordion-header">
          <span class="accordion-header-left">
            <span class="accordion-header-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </span>
            <span><div class="accordion-header-label">Code Connect setup</div></span>
          </span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="accordion-body">
          <p style="font-size:11px; color:#6B7280; line-height:1.55; margin-top:10px;">Connect your component library to Figma Code Connect to validate code links and detect component-code mismatches during audits.</p>
        </div>
      </div>

      <!-- 2. Claude AI — OPEN state -->
      <div class="accordion open">
        <button class="accordion-header">
          <span class="accordion-header-left">
            <span class="accordion-header-icon" style="font-size:15px; background:#fef3c7; color:#b45309;">✨</span>
            <span><div class="accordion-header-label">Claude AI</div></span>
          </span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="accordion-body">
          <div class="form-row" style="margin-top:10px;">
            <label class="form-label">Anthropic API Key</label>
            <input class="input" type="password" placeholder="sk-ant-..." />
            <span class="form-hint">Used for AI-powered description generation and component analysis.</span>
          </div>
          <button class="btn-ghost btn-sm" style="margin-top:4px;">Save key</button>
        </div>
      </div>

      <!-- 3. Supporting Libraries -->
      <div class="accordion">
        <button class="accordion-header">
          <span class="accordion-header-left">
            <span class="accordion-header-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </span>
            <span><div class="accordion-header-label">Supporting Libraries</div></span>
          </span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="accordion-body">
          <div style="margin-top:10px;">
            <div class="lib-meta-row-simple">
              <div class="lib-icon lib-icon--sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <div style="flex:1; min-width:0;">
                <div style="font-size:12px; font-weight:600; color:#0c1f3f;">Acme Design Tokens</div>
                <div style="font-size:10px; color:#6B7280;">124 variables used</div>
              </div>
              <button class="btn-ghost btn-sm">Remove</button>
            </div>
            <div class="lib-meta-row-simple">
              <div class="lib-icon lib-icon--sm lib-icon--green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8M12 8v8"/></svg>
              </div>
              <div style="flex:1; min-width:0;">
                <div style="font-size:12px; font-weight:600; color:#0c1f3f;">Brand Primitives</div>
                <div style="font-size:10px; color:#6B7280;">88 variables used</div>
              </div>
              <button class="btn-ghost btn-sm">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Report Metrics -->
      <div class="accordion">
        <button class="accordion-header">
          <span class="accordion-header-left">
            <span class="accordion-header-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
            </span>
            <span><div class="accordion-header-label">Report Metrics</div></span>
          </span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="accordion-body">
          <div style="margin-top:10px;">
            <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Description coverage</span></div>
            <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Token coverage (fill, stroke, spacing)</span></div>
            <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Documentation link coverage</span></div>
            <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Dev status tracking</span></div>
            <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Storybook coverage (when connected)</span></div>
          </div>
        </div>
      </div>

      <!-- 5. Variable Rules -->
      <div class="accordion">
        <button class="accordion-header">
          <span class="accordion-header-left">
            <span class="accordion-header-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6h16M4 12h10M4 18h16"/></svg>
            </span>
            <span><div class="accordion-header-label">Variable Rules</div></span>
          </span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="accordion-body">
          <p style="font-size:11px; color:#6B7280; line-height:1.55; margin-top:10px;">Manage variable rules and collection preferences in the Variables tab.</p>
          <button class="btn-ghost btn-sm" style="margin-top:8px;">Go to Variables tab</button>
        </div>
      </div>

      <!-- 6. Scan history -->
      <div class="accordion">
        <button class="accordion-header">
          <span class="accordion-header-left">
            <span class="accordion-header-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>
            </span>
            <span><div class="accordion-header-label">Scan history</div></span>
          </span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="accordion-body">
          <div style="margin-top:10px;">
            <div class="scan-history-row">
              <span class="scan-history-score">87%</span>
              <span style="flex:1;">May 19, 2026</span>
              <span>152 components</span>
            </div>
            <div class="scan-history-row">
              <span class="scan-history-score">81%</span>
              <span style="flex:1;">May 12, 2026</span>
              <span>149 components</span>
            </div>
            <div class="scan-history-row">
              <span class="scan-history-score">74%</span>
              <span style="flex:1;">Apr 28, 2026</span>
              <span>143 components</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 7. Change history -->
      <div class="accordion">
        <button class="accordion-header">
          <span class="accordion-header-left">
            <span class="accordion-header-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </span>
            <span><div class="accordion-header-label">Change history</div></span>
          </span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="accordion-body">
          <p style="font-size:11px; color:#9CA3AF; line-height:1.55; margin-top:10px;">No changes recorded yet.</p>
        </div>
      </div>

    </div>

    <!-- Scan Options -->
    <div class="section-label">Scan Options</div>
    <div class="card" style="margin: 0 12px 10px;">
      <label class="toggle-row">
        <div class="toggle-row-text">
          <span class="toggle-row-label">Include component sets</span>
        </div>
        <div class="toggle"><input type="checkbox" checked /><div class="toggle-track"></div></div>
      </label>
      <label class="toggle-row">
        <div class="toggle-row-text">
          <span class="toggle-row-label">Include private components</span>
          <span class="toggle-row-hint">_name or .name prefixed layers</span>
        </div>
        <div class="toggle"><input type="checkbox" /><div class="toggle-track"></div></div>
      </label>
      <label class="toggle-row">
        <div class="toggle-row-text">
          <span class="toggle-row-label">Ignore hidden layers</span>
          <span class="toggle-row-hint">Hidden layers don't affect rendered output</span>
        </div>
        <div class="toggle"><input type="checkbox" checked /><div class="toggle-track"></div></div>
      </label>
      <label class="toggle-row">
        <div class="toggle-row-text">
          <span class="toggle-row-label">Include local library</span>
          <span class="toggle-row-hint">Treat this file's own variables as approved tokens</span>
        </div>
        <div class="toggle"><input type="checkbox" checked /><div class="toggle-track"></div></div>
      </label>
    </div>

    <!-- Report Appearance -->
    <div class="section-label">Report Appearance</div>
    <div class="card" style="margin: 0 12px 10px;">
      <div class="toggle-row" style="justify-content:space-between;">
        <div>
          <div style="font-size:12px; font-weight:600; color:#0c1f3f;">Accent colour</div>
          <div style="font-size:10px; color:#9CA3AF; margin-top:2px;">Used in the canvas report</div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:24px; height:24px; border-radius:6px; background:#1652D6; border:1px solid rgba(0,0,0,0.1);"></div>
          <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; color:#4a6080;">#1652D6</span>
        </div>
      </div>
      <label class="toggle-row">
        <div class="toggle-row-text">
          <span class="toggle-row-label">Canvas credit footer</span>
        </div>
        <div class="toggle"><input type="checkbox" checked /><div class="toggle-track"></div></div>
      </label>
    </div>

    <!-- About -->
    <div class="section-label">About</div>
    <div class="card" style="margin: 0 12px 10px;">
      <div class="card-inner" style="font-size:11px; color:#6B7280; line-height:1.5; text-align:center;">
        <div style="font-family:'Bricolage Grotesque',sans-serif; font-size:18px; font-weight:800; color:#0c1f3f; margin-bottom:4px;">Pulse by Specd</div>
        <div>Design system audit tool · v1.4.2</div>
        <div style="margin-top:4px;">Built by <a href="#" style="color:#1d4ed8; font-weight:600; text-decoration:none;">Specd.tools</a></div>
      </div>
    </div>

    <div class="card" style="margin: 0 12px 8px;">
      <div class="card-inner" style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <div>
          <div style="font-size:13px; font-weight:500; color:#0c1f3f;">Replay setup guide</div>
          <div style="font-size:11px; color:#6B7280; margin-top:1px;">Re-open the onboarding flow to add or update connections.</div>
        </div>
        <button class="btn-ghost btn-sm" style="flex-shrink:0; white-space:nowrap;">Replay</button>
      </div>
    </div>

    <!-- Danger zone -->
    <div class="section-label danger">Danger zone</div>
    <div class="danger-card">
      <div class="card-inner">
        <p style="font-size:11px; color:#6B7280; line-height:1.55; margin-bottom:10px;">Wipes every stored setting — PAT, Anthropic key, connected libraries, variable rules, last scan, scan history, ignored issues. This cannot be undone.</p>
        <button class="btn-danger btn-full">Reset Pulse…</button>
      </div>
    </div>

    <div style="height:16px;"></div>
  </div>
`;

const settingsComponentContent = () => html`
  <div class="plugin-scroll">

    <!-- Figma API (PAT connected) -->
    <specd-section-label label="Figma API"></specd-section-label>
    <div class="card" style="margin: 0 12px 10px;">
      <div class="pat-connected">
        <div class="pat-avatar">👤</div>
        <div style="flex:1;">
          <div class="pat-name">Will Gray</div>
          <div class="pat-email">will@specd.tools</div>
          <div class="pat-expiry">Expires Dec 2025</div>
        </div>
        <specd-button variant="danger" size="sm" label="Disconnect"></specd-button>
      </div>
    </div>

    <!-- What this unlocks -->
    <specd-section-label label="What this unlocks"></specd-section-label>
    <div class="card" style="margin: 0 12px 10px;">
      <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Shared plugin data code link detection</span></div>
      <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Documentation link analysis</span></div>
      <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Validated code links via REST API</span></div>
      <div class="capability-row"><span class="cap-icon off">○</span><span class="cap-text off">Library Analytics (Enterprise only)</span></div>
      <div class="capability-row"><span class="cap-icon off">○</span><span class="cap-text off">Figma Code Connect verification</span></div>
    </div>

    <!-- Accordion sections -->
    <div style="padding: 0 12px; display: flex; flex-direction: column; gap: 0; margin-bottom: 10px;">

      <!-- 1. Code Connect setup -->
      <div class="accordion">
        <button class="accordion-header">
          <span class="accordion-header-left">
            <span class="accordion-header-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </span>
            <span><div class="accordion-header-label">Code Connect setup</div></span>
          </span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="accordion-body">
          <p style="font-size:11px; color:#6B7280; line-height:1.55; margin-top:10px;">Connect your component library to Figma Code Connect to validate code links and detect component-code mismatches during audits.</p>
        </div>
      </div>

      <!-- 2. Claude AI — OPEN state -->
      <div class="accordion open">
        <button class="accordion-header">
          <span class="accordion-header-left">
            <span class="accordion-header-icon" style="font-size:15px; background:#fef3c7; color:#b45309;">✨</span>
            <span><div class="accordion-header-label">Claude AI</div></span>
          </span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="accordion-body">
          <div class="form-row" style="margin-top:10px;">
            <label class="form-label">Anthropic API Key</label>
            <specd-input type="password" placeholder="sk-ant-..."></specd-input>
            <span class="form-hint">Used for AI-powered description generation and component analysis.</span>
          </div>
          <specd-button variant="ghost" size="sm" label="Save key" style="margin-top:4px;"></specd-button>
        </div>
      </div>

      <!-- 3. Supporting Libraries -->
      <div class="accordion">
        <button class="accordion-header">
          <span class="accordion-header-left">
            <span class="accordion-header-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </span>
            <span><div class="accordion-header-label">Supporting Libraries</div></span>
          </span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="accordion-body">
          <div style="margin-top:10px;">
            <div class="lib-meta-row-simple">
              <div class="lib-icon lib-icon--sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <div style="flex:1; min-width:0;">
                <div style="font-size:12px; font-weight:600; color:#0c1f3f;">Acme Design Tokens</div>
                <div style="font-size:10px; color:#6B7280;">124 variables used</div>
              </div>
              <specd-button variant="ghost" size="sm" label="Remove"></specd-button>
            </div>
            <div class="lib-meta-row-simple">
              <div class="lib-icon lib-icon--sm lib-icon--green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8M12 8v8"/></svg>
              </div>
              <div style="flex:1; min-width:0;">
                <div style="font-size:12px; font-weight:600; color:#0c1f3f;">Brand Primitives</div>
                <div style="font-size:10px; color:#6B7280;">88 variables used</div>
              </div>
              <specd-button variant="ghost" size="sm" label="Remove"></specd-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Report Metrics -->
      <div class="accordion">
        <button class="accordion-header">
          <span class="accordion-header-left">
            <span class="accordion-header-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
            </span>
            <span><div class="accordion-header-label">Report Metrics</div></span>
          </span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="accordion-body">
          <div style="margin-top:10px;">
            <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Description coverage</span></div>
            <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Token coverage (fill, stroke, spacing)</span></div>
            <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Documentation link coverage</span></div>
            <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Dev status tracking</span></div>
            <div class="capability-row"><span class="cap-icon on">✓</span><span class="cap-text on">Storybook coverage (when connected)</span></div>
          </div>
        </div>
      </div>

      <!-- 5. Variable Rules -->
      <div class="accordion">
        <button class="accordion-header">
          <span class="accordion-header-left">
            <span class="accordion-header-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6h16M4 12h10M4 18h16"/></svg>
            </span>
            <span><div class="accordion-header-label">Variable Rules</div></span>
          </span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="accordion-body">
          <p style="font-size:11px; color:#6B7280; line-height:1.55; margin-top:10px;">Manage variable rules and collection preferences in the Variables tab.</p>
          <specd-button variant="ghost" size="sm" label="Go to Variables tab" style="margin-top:8px;"></specd-button>
        </div>
      </div>

      <!-- 6. Scan history -->
      <div class="accordion">
        <button class="accordion-header">
          <span class="accordion-header-left">
            <span class="accordion-header-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>
            </span>
            <span><div class="accordion-header-label">Scan history</div></span>
          </span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="accordion-body">
          <div style="margin-top:10px;">
            <div class="scan-history-row">
              <span class="scan-history-score">87%</span>
              <span style="flex:1;">May 19, 2026</span>
              <span>152 components</span>
            </div>
            <div class="scan-history-row">
              <span class="scan-history-score">81%</span>
              <span style="flex:1;">May 12, 2026</span>
              <span>149 components</span>
            </div>
            <div class="scan-history-row">
              <span class="scan-history-score">74%</span>
              <span style="flex:1;">Apr 28, 2026</span>
              <span>143 components</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 7. Change history -->
      <div class="accordion">
        <button class="accordion-header">
          <span class="accordion-header-left">
            <span class="accordion-header-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </span>
            <span><div class="accordion-header-label">Change history</div></span>
          </span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="accordion-body">
          <p style="font-size:11px; color:#9CA3AF; line-height:1.55; margin-top:10px;">No changes recorded yet.</p>
        </div>
      </div>

    </div>

    <!-- Scan Options -->
    <div style="margin-top:24px;"><specd-section-label label="Scan Options"></specd-section-label></div>
    <div class="card" style="margin: 0 12px 10px;">
      <specd-toggle-row label="Include component sets" checked></specd-toggle-row>
      <specd-toggle-row label="Include private components" hint="_name or .name prefixed layers"></specd-toggle-row>
      <specd-toggle-row label="Ignore hidden layers" hint="Hidden layers don't affect rendered output" checked></specd-toggle-row>
      <specd-toggle-row label="Include local library" hint="Treat this file's own variables as approved tokens" checked></specd-toggle-row>
    </div>

    <!-- Report Appearance -->
    <div style="margin-top:24px;"><specd-section-label label="Report Appearance"></specd-section-label></div>
    <div class="card" style="margin: 0 12px 10px;">
      <div class="toggle-row" style="justify-content:space-between;">
        <div>
          <div style="font-size:12px; font-weight:600; color:#0c1f3f;">Accent colour</div>
          <div style="font-size:10px; color:#9CA3AF; margin-top:2px;">Used in the canvas report</div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:24px; height:24px; border-radius:6px; background:#1652D6; border:1px solid rgba(0,0,0,0.1);"></div>
          <span style="font-family:'IBM Plex Mono',monospace; font-size:10px; color:#4a6080;">#1652D6</span>
        </div>
      </div>
      <specd-toggle-row label="Canvas credit footer" checked></specd-toggle-row>
    </div>

    <!-- About -->
    <specd-section-label label="About"></specd-section-label>
    <div class="card" style="margin: 0 12px 10px;">
      <div class="card-inner" style="font-size:11px; color:#6B7280; line-height:1.5; text-align:center;">
        <div style="font-family:'Bricolage Grotesque',sans-serif; font-size:18px; font-weight:800; color:#0c1f3f; margin-bottom:4px;">Pulse by Specd</div>
        <div>Design system audit tool · v1.4.2</div>
        <div style="margin-top:4px;">Built by <a href="#" style="color:#1d4ed8; font-weight:600; text-decoration:none;">Specd.tools</a></div>
      </div>
    </div>

    <div class="card" style="margin: 0 12px 8px;">
      <div class="card-inner" style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <div>
          <div style="font-size:13px; font-weight:500; color:#0c1f3f;">Replay setup guide</div>
          <div style="font-size:11px; color:#6B7280; margin-top:1px;">Re-open the onboarding flow to add or update connections.</div>
        </div>
        <specd-button variant="ghost" size="sm" label="Replay" style="flex-shrink:0;"></specd-button>
      </div>
    </div>

    <!-- Danger zone -->
    <specd-section-label label="Danger zone"></specd-section-label>
    <div class="danger-card">
      <div class="card-inner">
        <p style="font-size:11px; color:#6B7280; line-height:1.55; margin-bottom:10px;">Wipes every stored setting — PAT, Anthropic key, connected libraries, variable rules, last scan, scan history, ignored issues. This cannot be undone.</p>
        <specd-button variant="danger" label="Reset Pulse…" full></specd-button>
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
  render: () => html`
    <div style="padding:0;">
      <div class="plugin-wrap">
        ${componentShell()}
        ${settingsComponentContent()}
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
          ${settingsRawContent()}
        </div>
      </div>
      <div style="background:#e8eef5; padding:16px;">
        <p style="font:700 10px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">Component Build</p>
        <div class="plugin-wrap">
          ${componentShell()}
          ${settingsComponentContent()}
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
        SettingsTab — Components Used
      </h2>
      <div style="display:flex; flex-direction:column; gap:24px;">

        ${sectionBlock('specd-app-header', html`
          <specd-app-header name="Pulse" showrefresh showexport showsettings></specd-app-header>
        `)}

        ${sectionBlock('specd-section-label', html`
          <specd-section-label label="Figma API"></specd-section-label>
          <specd-section-label label="Scan Options"></specd-section-label>
          <specd-section-label label="About"></specd-section-label>
          <specd-section-label label="Danger zone"></specd-section-label>
        `)}

        ${sectionBlock('specd-toggle-row', html`
          <specd-toggle-row label="Include component sets" checked style="width:100%;"></specd-toggle-row>
          <specd-toggle-row label="Ignore hidden layers" hint="Hidden layers don't affect rendered output" checked style="width:100%;"></specd-toggle-row>
          <specd-toggle-row label="Include private components" hint="_name or .name prefixed layers" style="width:100%;"></specd-toggle-row>
        `)}

        ${sectionBlock('specd-input', html`
          <specd-input type="password" placeholder="sk-ant-..."></specd-input>
          <specd-input type="url" placeholder="https://example.com"></specd-input>
        `)}

        ${sectionBlock('specd-button (variants)', html`
          <specd-button variant="ghost" size="sm" label="Save key"></specd-button>
          <specd-button variant="ghost" size="sm" label="Remove"></specd-button>
          <specd-button variant="ghost" size="sm" label="Replay"></specd-button>
          <specd-button variant="danger" size="sm" label="Disconnect"></specd-button>
          <specd-button variant="danger" label="Reset Pulse…" full></specd-button>
        `)}

      </div>
    </div>
  `,
};
