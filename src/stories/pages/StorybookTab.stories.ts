import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TemplateResult } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/Input/SpecdInput.js';
import '../../components/Button/SpecdButton.js';
import '../../components/SectionLabel/SpecdSectionLabel.js';
import '../../components/Chip/SpecdChip.js';
import '../../components/ScoreRing/SpecdScoreRing.js';
import '../../components/Tag/SpecdTag.js';

const LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 48 48" fill="none"><rect x="17" y="24.2427" width="10.2426" height="10.2426" rx="2" transform="rotate(-45 17 24.2427)" fill="white"/><rect x="12.7071" y="24.101" width="16.1133" height="16.1133" rx="4.5" transform="rotate(-45 12.7071 24.101)" stroke="white" stroke-width="1.2"/><rect x="7.70711" y="23.9664" width="22.9942" height="23.0891" rx="7.5" transform="rotate(-45 7.70711 23.9664)" stroke="white" stroke-width="1.2"/></svg>`;
const COMP_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>`;

const meta: Meta = {
  title: 'Pages/StorybookTab',
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
  <specd-tab-bar tabs=${TABS_JSON} active="storybook"></specd-tab-bar>
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
    <button class="tab-v2 active">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>Storybook
    </button>
    <button class="tab-v2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>Library
    </button>
  </nav>
`;

const storybookConnectedRawContent = () => html`
  <div class="plugin-scroll">

    <!-- Connected Storybook details -->
    <div class="section-label">Connected Storybook</div>
    <div class="card" style="margin: 0 12px 10px;">
      <div class="pat-connected">
        <div class="pat-avatar" style="font-size:18px;">📖</div>
        <div style="flex:1;">
          <div class="pat-name">Acme Design Storybook</div>
          <div class="pat-email">https://storybook.acme.design</div>
          <div class="pat-expiry">49 / 152 stories matched · Last fetched May 19</div>
        </div>
      </div>
      <div style="display:flex; gap:8px; margin-top:10px;">
        <button class="btn-ghost btn-sm btn-full">Disconnect</button>
        <button class="btn-ghost btn-sm btn-full">Re-fetch</button>
      </div>
      <div class="form-row" style="margin-top:10px;">
        <label class="form-label">Base URL</label>
        <input type="url" class="input" value="https://storybook.acme.design" />
      </div>
    </div>

    <!-- Sync score -->
    <div class="section-label">Sync Score</div>
    <div class="sb-sync-card">
      <div class="sb-score-ring">
        <div class="sb-score-num">49</div>
        <div class="sb-score-denom">/ 152</div>
      </div>
      <div class="sb-score-info">
        <div class="sb-score-label">Components matched</div>
        <div class="sb-score-sub">32% of your library synced to Storybook stories. Review and accept the suggested mappings below.</div>
      </div>
    </div>

    <!-- Mapping table -->
    <div class="section-label">Component Mappings</div>
    <div class="sb-mapping-table">
      <div class="sb-mapping-header">
        <span>Component</span>
        <span>Story</span>
        <span>Match</span>
      </div>
      <div class="sb-mapping-row">
        <div class="sb-comp-name" style="display:flex; align-items:center; gap:8px;">
          ${unsafeSVG(COMP_SVG)}
          Button/Primary
        </div>
        <div class="sb-story-name">components/button</div>
        <div class="sb-match-quality"><span class="sb-pill sb-pill-good">HIGH</span></div>
      </div>
      <div class="sb-mapping-row">
        <div class="sb-comp-name" style="display:flex; align-items:center; gap:8px;">
          ${unsafeSVG(COMP_SVG)}
          Card/Default
        </div>
        <div class="sb-story-name">components/card</div>
        <div class="sb-match-quality"><span class="sb-pill sb-pill-good">HIGH</span></div>
      </div>
      <div class="sb-mapping-row">
        <div class="sb-comp-name" style="display:flex; align-items:center; gap:8px;">
          ${unsafeSVG(COMP_SVG)}
          Input/Text
        </div>
        <div class="sb-story-name">forms/text-input</div>
        <div class="sb-match-quality"><span class="sb-pill sb-pill-muted">MED</span></div>
      </div>
      <div class="sb-mapping-row">
        <div class="sb-comp-name" style="display:flex; align-items:center; gap:8px;">
          ${unsafeSVG(COMP_SVG)}
          Modal/Dialog
        </div>
        <div class="sb-story-name">overlays/dialog</div>
        <div class="sb-match-quality"><span class="sb-pill sb-pill-muted">LOW</span></div>
      </div>
      <div class="sb-mapping-row">
        <div class="sb-comp-name" style="display:flex; align-items:center; gap:8px;">
          ${unsafeSVG(COMP_SVG)}
          Nav/Header
        </div>
        <div class="sb-story-name">navigation/header</div>
        <div class="sb-match-quality"><span class="sb-pill sb-pill-good">HIGH</span></div>
      </div>
      <div class="sb-mapping-row">
        <div class="sb-comp-name" style="display:flex; align-items:center; gap:8px;">
          ${unsafeSVG(COMP_SVG)}
          Badge/Count
        </div>
        <div class="sb-story-name">—</div>
        <div class="sb-match-quality"><span class="sb-pill sb-pill-bad">NONE</span></div>
      </div>
    </div>

    <div style="padding: 0 12px 12px;">
      <button class="btn-primary btn-full">Apply accepted links</button>
    </div>

    <!-- Manual upload -->
    <div class="section-label">Manual Upload</div>
    <div class="card card-inner" style="margin: 0 12px 12px;">
      <span class="form-hint" style="margin-bottom:8px; display:block;">For private Storybooks, run <code style="background:#f5f8ff; padding:1px 4px; border-radius:4px; font-size:10px; font-family:'IBM Plex Mono',monospace;">npx storybook build</code> then upload the generated <code style="background:#f5f8ff; padding:1px 4px; border-radius:4px; font-size:10px; font-family:'IBM Plex Mono',monospace;">index.json</code>.</span>
      <div class="form-row">
        <label class="form-label">Storybook Base URL</label>
        <input type="url" class="input" placeholder="https://storybook.yourcompany.com" />
      </div>
      <button class="btn-ghost btn-full">Upload index.json</button>
    </div>

    <div style="height:16px;"></div>
  </div>
`;

const storybookConnectedComponentContent = () => html`
  <div class="plugin-scroll">

    <!-- Connected Storybook details -->
    <specd-section-label label="Connected Storybook"></specd-section-label>
    <div class="card" style="margin: 0 12px 10px;">
      <div class="pat-connected">
        <div class="pat-avatar" style="font-size:18px;">📖</div>
        <div style="flex:1; min-width:0;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div class="pat-name" style="flex:1; min-width:0;">Acme Design Storybook</div>
            <specd-button variant="danger" size="sm" label="Disconnect"></specd-button>
          </div>
          <div class="pat-email">https://storybook.acme.design</div>
          <div class="pat-expiry">49 / 152 stories matched · Last fetched May 19</div>
        </div>
      </div>
      <div style="display:flex; gap:8px; margin-top:10px;">
        <specd-button variant="ghost" size="sm" label="Re-fetch" full></specd-button>
      </div>
      <div class="form-row" style="margin-top:10px;">
        <label class="form-label">Base URL</label>
        <div style="padding-left:12px;"><specd-input type="url" value="https://storybook.acme.design"></specd-input></div>
      </div>
    </div>

    <!-- Sync score -->
    <specd-section-label label="Sync Score"></specd-section-label>
    <div class="sb-sync-card">
      <specd-score-ring score="32" tier="poor" size="44"></specd-score-ring>
      <div class="sb-score-info">
        <div class="sb-score-label">Components matched</div>
        <div class="sb-score-sub">32% of your library synced to Storybook stories. Review and accept the suggested mappings below.</div>
      </div>
    </div>

    <!-- Mapping table -->
    <specd-section-label label="Component Mappings"></specd-section-label>
    <div class="sb-mapping-table">
      <div class="sb-mapping-header">
        <span>Component</span>
        <span>Story</span>
        <span>Match</span>
      </div>
      <div class="sb-mapping-row">
        <div class="sb-comp-name" style="display:flex; align-items:center; gap:8px;">
          ${unsafeSVG(COMP_SVG)}
          Button/Primary
        </div>
        <div class="sb-story-name">components/button</div>
        <div class="sb-match-quality"><specd-tag label="✓ Matched" intent="success"></specd-tag></div>
      </div>
      <div class="sb-mapping-row">
        <div class="sb-comp-name" style="display:flex; align-items:center; gap:8px;">
          ${unsafeSVG(COMP_SVG)}
          Card/Default
        </div>
        <div class="sb-story-name">components/card</div>
        <div class="sb-match-quality"><specd-tag label="✓ Matched" intent="success"></specd-tag></div>
      </div>
      <div class="sb-mapping-row">
        <div class="sb-comp-name" style="display:flex; align-items:center; gap:8px;">
          ${unsafeSVG(COMP_SVG)}
          Input/Text
        </div>
        <div class="sb-story-name">forms/text-input</div>
        <div class="sb-match-quality"><specd-tag label="—" intent="neutral"></specd-tag></div>
      </div>
      <div class="sb-mapping-row">
        <div class="sb-comp-name" style="display:flex; align-items:center; gap:8px;">
          ${unsafeSVG(COMP_SVG)}
          Modal/Dialog
        </div>
        <div class="sb-story-name">overlays/dialog</div>
        <div class="sb-match-quality"><specd-tag label="—" intent="neutral"></specd-tag></div>
      </div>
      <div class="sb-mapping-row">
        <div class="sb-comp-name" style="display:flex; align-items:center; gap:8px;">
          ${unsafeSVG(COMP_SVG)}
          Nav/Header
        </div>
        <div class="sb-story-name">navigation/header</div>
        <div class="sb-match-quality"><specd-tag label="✓ Matched" intent="success"></specd-tag></div>
      </div>
      <div class="sb-mapping-row">
        <div class="sb-comp-name" style="display:flex; align-items:center; gap:8px;">
          ${unsafeSVG(COMP_SVG)}
          Badge/Count
        </div>
        <div class="sb-story-name">—</div>
        <div class="sb-match-quality"><specd-tag label="✗ Missing" intent="crit"></specd-tag></div>
      </div>
    </div>

    <div style="padding: 0 12px 12px;">
      <specd-button variant="primary" label="Apply accepted links" full></specd-button>
    </div>

    <!-- Manual upload -->
    <specd-section-label label="Manual Upload"></specd-section-label>
    <div class="card card-inner" style="margin: 0 12px 12px;">
      <span class="form-hint" style="margin-bottom:8px; display:block;">For private Storybooks, run <code style="background:#f5f8ff; padding:1px 4px; border-radius:4px; font-size:10px; font-family:'IBM Plex Mono',monospace;">npx storybook build</code> then upload the generated <code style="background:#f5f8ff; padding:1px 4px; border-radius:4px; font-size:10px; font-family:'IBM Plex Mono',monospace;">index.json</code>.</span>
      <div class="form-row">
        <label class="form-label">Storybook Base URL</label>
        <specd-input type="url" placeholder="https://storybook.yourcompany.com"></specd-input>
      </div>
      <specd-button variant="ghost" label="Upload index.json" full></specd-button>
    </div>

    <div style="height:16px;"></div>
  </div>
`;

const storybookEmptyContent = () => html`
  <div class="plugin-scroll">

    <div class="section-label">Connect Storybook</div>
    <div class="card card-inner" style="margin: 0 12px 10px;">
      <div class="form-row">
        <label class="form-label">Storybook URL</label>
        <input type="url" class="input" placeholder="https://storybook.yourcompany.com" />
        <span class="form-hint">Supports self-hosted, GitHub Pages, Netlify, and public Chromatic deployments.</span>
      </div>
      <div class="form-row" style="flex-direction:row; align-items:center; gap:8px; margin-bottom:10px;">
        <input type="checkbox" id="sb-auth" />
        <label for="sb-auth" style="font-size:12px; color:#6B7280; cursor:pointer;">Private Storybook (requires auth)</label>
      </div>
      <button class="btn-primary btn-full">Fetch stories</button>
    </div>

    <div class="section-label">Manual Upload</div>
    <div class="card card-inner" style="margin: 0 12px 12px;">
      <span class="form-hint" style="margin-bottom:8px; display:block;">For private Storybooks, run <code style="background:#f5f8ff; padding:1px 4px; border-radius:4px; font-size:10px; font-family:'IBM Plex Mono',monospace;">npx storybook build</code> then upload the generated <code style="background:#f5f8ff; padding:1px 4px; border-radius:4px; font-size:10px; font-family:'IBM Plex Mono',monospace;">index.json</code>.</span>
      <div class="form-row">
        <label class="form-label">Storybook Base URL</label>
        <input type="url" class="input" placeholder="https://storybook.yourcompany.com" />
      </div>
      <button class="btn-ghost btn-full">Upload index.json</button>
    </div>

    <div class="section-label">Component Mappings</div>
    <div class="empty-state" style="margin: 0 12px 12px; background:#fff; border:1px solid var(--blue-20); border-radius:12px;">
      <div class="empty-state-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      </div>
      <p class="empty-state-title" style="font-size:13px;">No stories connected</p>
      <p class="empty-state-desc">Fetch your Storybook or upload an index.json to see component mappings.</p>
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

export const Connected: Story = {
  name: 'Connected',
  render: () => html`
    <div style="padding:0;">
      <div class="plugin-wrap">
        ${componentShell()}
        ${storybookConnectedComponentContent()}
      </div>
    </div>
  `,
};

export const NotConnected: Story = {
  name: 'Not Connected',
  render: () => html`
    <div class="plugin-wrap">
      ${pluginShell()}
      ${storybookEmptyContent()}
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
          ${storybookConnectedRawContent()}
        </div>
      </div>
      <div style="background:#e8eef5; padding:16px;">
        <p style="font:700 10px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">Component Build</p>
        <div class="plugin-wrap">
          ${componentShell()}
          ${storybookConnectedComponentContent()}
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
        StorybookTab — Components Used
      </h2>
      <div style="display:flex; flex-direction:column; gap:24px;">

        ${sectionBlock('specd-app-header', html`
          <specd-app-header name="Pulse" showrefresh showexport showsettings></specd-app-header>
        `)}

        ${sectionBlock('specd-section-label', html`
          <specd-section-label label="Connected Storybook"></specd-section-label>
          <specd-section-label label="Sync Score"></specd-section-label>
          <specd-section-label label="Component Mappings"></specd-section-label>
          <specd-section-label label="Manual Upload"></specd-section-label>
        `)}

        ${sectionBlock('specd-score-ring (sync score)', html`
          <specd-score-ring score="32" tier="poor" size="44"></specd-score-ring>
          <specd-score-ring score="72" tier="good" size="44"></specd-score-ring>
        `)}

        ${sectionBlock('specd-tag (mapping quality)', html`
          <specd-tag label="✓ Matched" intent="success"></specd-tag>
          <specd-tag label="— Partial" intent="neutral"></specd-tag>
          <specd-tag label="✗ Missing" intent="crit"></specd-tag>
        `)}

        ${sectionBlock('specd-input', html`
          <specd-input type="url" value="https://storybook.acme.design"></specd-input>
          <specd-input type="url" placeholder="https://storybook.yourcompany.com"></specd-input>
        `)}

        ${sectionBlock('specd-button', html`
          <specd-button variant="danger" size="sm" label="Disconnect" full></specd-button>
          <specd-button variant="ghost" size="sm" label="Re-fetch" full></specd-button>
          <specd-button variant="primary" label="Apply accepted links" full></specd-button>
          <specd-button variant="ghost" label="Upload index.json" full></specd-button>
        `)}

      </div>
    </div>
  `,
};
