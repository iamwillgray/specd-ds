import type { Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/Button/SpecdButton.js';
import '../../components/Chip/SpecdChip.js';
import '../../components/ColorSwatch/SpecdColorSwatch.js';
import '../../components/RadioRow/SpecdRadioRow.js';
import '../../components/Tag/SpecdTag.js';
import '../../components/JumpBtn/SpecdJumpBtn.js';
import '../../components/Segmented/SpecdSegmented.js';
import '../../components/AiPill/SpecdAiPill.js';
import '../../components/Input/SpecdInput.js';

const LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 48 48" fill="none"><rect x="17" y="24.2427" width="10.2426" height="10.2426" rx="2" transform="rotate(-45 17 24.2427)" fill="white"/><rect x="12.7071" y="24.101" width="16.1133" height="16.1133" rx="4.5" transform="rotate(-45 12.7071 24.101)" stroke="white" stroke-width="1.2"/><rect x="7.70711" y="23.9664" width="22.9942" height="23.0891" rx="7.5" transform="rotate(-45 7.70711 23.9664)" stroke="white" stroke-width="1.2"/></svg>`;

const meta: Meta = {
  title: 'Pages/QuickFixWizard',
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

/** Live web component shell */
const componentShell = () => html`
  <specd-app-header name="Pulse" showrefresh showsettings></specd-app-header>
  <specd-tab-bar tabs=${TABS_JSON} active="issues"></specd-tab-bar>
`;

/** Raw CSS reference shell */
const pluginShell = () => html`
  <header class="app-header-v2">
    <div class="logo-mark">${unsafeSVG(LOGO_SVG)}</div>
    <div class="header-text"><div class="header-name">Pulse</div></div>
    <button class="header-icon-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-3.51-7.13"/><polyline points="21 4 21 10 15 10"/></svg>
    </button>
  </header>
  <nav class="tab-bar-v2" role="tablist">
    <button class="tab-v2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>Overview
    </button>
    <button class="tab-v2 active">
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

/** QF Wizard overlay — raw CSS classes only (reference) */
const qfWizardRawContent = () => html`
  <div class="qf-wizard" role="dialog" aria-modal="true">

    <!-- Topbar -->
    <div class="qf-topbar">
      <button class="qf-btn-close">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        Close
      </button>
      <div class="qf-topbar-brand">
        <span class="qf-topbar-logo">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l1.8 4.2L16 8l-4.2 1.8L10 14 8.2 9.8 4 8l4.2-1.8L10 2zM16 13l.9 2.1L19 16l-2.1.9L16 19l-.9-2.1L13 16l2.1-.9L16 13z"/></svg>
        </span>
        <h2 class="qf-topbar-title">Quick-Fix Issues</h2>
      </div>
      <button class="qf-btn-bulk">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        Bulk
      </button>
    </div>

    <!-- Filter chips -->
    <div class="qf-filter-chips">
      <button class="qf-chip is-active">All <span class="qf-chip-count">902</span></button>
      <button class="qf-chip">Colour <span class="qf-chip-count">51</span></button>
      <button class="qf-chip">Spacing <span class="qf-chip-count">816</span></button>
      <button class="qf-chip">Radius <span class="qf-chip-count">0</span></button>
      <button class="qf-chip">Typography <span class="qf-chip-count">3</span></button>
      <button class="qf-chip">Dev Status <span class="qf-chip-count">0</span></button>
      <button class="qf-chip">Storybook <span class="qf-chip-count">32</span></button>
    </div>

    <!-- Filter label -->
    <div class="qf-filter-label">All Issues</div>

    <!-- Main body -->
    <div class="qf-body">
      <div class="qf-card">

        <!-- Component header -->
        <div class="qf-card-head">
          <div class="qf-comp-head">
            <span class="qf-comp-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>
            </span>
            <span class="qf-comp-name-text">Button/Primary/Default</span>
          </div>
          <button class="qf-card-jump" title="Jump to layer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
          </button>
        </div>

        <!-- Split panel -->
        <div class="qf-split">

          <!-- LEFT: Current value -->
          <div class="qf-col">
            <div class="qf-col-head">
              <span class="qf-col-title">Current</span>
            </div>
            <div class="qf-col-body">
              <div class="qf-current-chip">
                <span class="qf-current-swatch" style="background:#2c2822;"></span>
                <span class="qf-current-value">#2C2822</span>
              </div>
            </div>
            <div class="qf-current-foot">
              <span class="qf-type-tag">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M3 12h2m14 0h2M12 3v2m0 14v2"/></svg>
                Colour · Fill
              </span>
              <button class="qf-ignore-btn">Ignore</button>
            </div>
          </div>

          <!-- RIGHT: Choose replacement -->
          <div class="qf-col qf-col-right">
            <div class="qf-col-head">
              <span class="qf-col-title">Choose replacement variable</span>
              <span class="qf-col-meta">6 matches</span>
            </div>
            <div class="qf-col-body">
              <div class="qf-replace-list">
                <button class="qf-replace-row selected">
                  <span class="qf-replace-radio"></span>
                  <span class="qf-replace-swatch" style="background:#1d4ed8;"></span>
                  <span class="qf-replace-meta">
                    <div class="qf-replace-name">theme/background</div>
                    <div class="qf-replace-collection">Theme · Primary</div>
                  </span>
                  <span class="qf-replace-value">#1D4ED8</span>
                </button>
                <button class="qf-replace-row">
                  <span class="qf-replace-radio"></span>
                  <span class="qf-replace-swatch" style="background:#2563eb;"></span>
                  <span class="qf-replace-meta">
                    <div class="qf-replace-name">semantic/fill/primary</div>
                    <div class="qf-replace-collection">Semantic · Fills</div>
                  </span>
                  <span class="qf-replace-value">#2563EB</span>
                </button>
                <button class="qf-replace-row">
                  <span class="qf-replace-radio"></span>
                  <span class="qf-replace-swatch" style="background:#3b82f6;"></span>
                  <span class="qf-replace-meta">
                    <div class="qf-replace-name">primitives/blue-500</div>
                    <div class="qf-replace-collection">Primitives</div>
                  </span>
                  <span class="qf-replace-value">#3B82F6</span>
                </button>
                <button class="qf-replace-row">
                  <span class="qf-replace-radio"></span>
                  <span class="qf-replace-swatch" style="background:#60a5fa;"></span>
                  <span class="qf-replace-meta">
                    <div class="qf-replace-name">primitives/blue-400</div>
                    <div class="qf-replace-collection">Primitives</div>
                  </span>
                  <span class="qf-replace-value">#60A5FA</span>
                </button>
                <button class="qf-replace-row">
                  <span class="qf-replace-radio"></span>
                  <span class="qf-replace-swatch" style="background:#0c1750;"></span>
                  <span class="qf-replace-meta">
                    <div class="qf-replace-name">primitives/navy</div>
                    <div class="qf-replace-collection">Primitives</div>
                  </span>
                  <span class="qf-replace-value">#0C1750</span>
                </button>
                <button class="qf-replace-row">
                  <span class="qf-replace-radio"></span>
                  <span class="qf-replace-swatch" style="background:#93c5fd;"></span>
                  <span class="qf-replace-meta">
                    <div class="qf-replace-name">primitives/blue-300</div>
                    <div class="qf-replace-collection">Primitives</div>
                  </span>
                  <span class="qf-replace-value">#93C5FD</span>
                </button>
              </div>
              <button class="qf-showmore">Show more</button>
            </div>
          </div>

        </div>

        <!-- Card footer -->
        <div class="qf-footer">
          <div class="qf-footer-left">
            <button class="qf-nav-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Prev
            </button>
            <button class="qf-nav-btn">
              Next
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
          <div class="qf-counter">1 of 902</div>
          <div class="qf-footer-right">
            <button class="qf-apply-btn">Apply Fix</button>
            <button class="qf-applyall-btn">Apply to all <span class="qf-applyall-count">902</span></button>
          </div>
        </div>

      </div>
    </div>

  </div>

  <!-- Background content behind overlay -->
  <div class="plugin-scroll" style="padding:14px;">
    <p style="font-size:11px; color:#9ca3af; padding:12px 0;">Issues panel content behind overlay…</p>
  </div>
`;

/** QF Wizard overlay — specd-* web components */
const qfWizardComponentContent = () => html`
  <div class="qf-wizard" role="dialog" aria-modal="true">

    <!-- Topbar -->
    <div class="qf-topbar" style="display:flex; justify-content:space-between; align-items:center;">
      <specd-button variant="ghost" size="sm" icon='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>'></specd-button>
      <div class="qf-topbar-brand">
        <span class="qf-topbar-logo">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l1.8 4.2L16 8l-4.2 1.8L10 14 8.2 9.8 4 8l4.2-1.8L10 2zM16 13l.9 2.1L19 16l-2.1.9L16 19l-.9-2.1L13 16l2.1-.9L16 13z"/></svg>
        </span>
        <h2 class="qf-topbar-title">Quick-Fix Issues</h2>
      </div>
      <specd-button variant="primary" size="sm" label="Apply"></specd-button>
    </div>

    <!-- Filter chips -->
    <div class="qf-filter-chips">
      <specd-chip label="All" count="902" active></specd-chip>
      <specd-chip label="Colour" count="51"></specd-chip>
      <specd-chip label="Spacing" count="816"></specd-chip>
      <specd-chip label="Radius" count="0"></specd-chip>
      <specd-chip label="Typography" count="3"></specd-chip>
      <specd-chip label="Dev Status" count="0"></specd-chip>
      <specd-chip label="Storybook" count="32"></specd-chip>
    </div>

    <!-- Tab nav — replace/zero/ignore -->
    <div style="padding:6px 12px;">
      <specd-segmented options='[{"value":"replace","label":"Replace"},{"value":"zero","label":"Set to 0"},{"value":"ignore","label":"Ignore"}]' value="replace" dark></specd-segmented>
    </div>

    <!-- Main body -->
    <div class="qf-body">
      <div class="qf-card">

        <!-- Component header -->
        <div class="qf-card-head">
          <div class="qf-comp-head">
            <span class="qf-comp-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>
            </span>
            <span class="qf-comp-name-text">Button/Primary/Default</span>
          </div>
          <specd-jump-btn label="Jump"></specd-jump-btn>
        </div>

        <!-- Split panel -->
        <div class="qf-split">

          <!-- LEFT: Current value -->
          <div class="qf-col">
            <div class="qf-col-head">
              <span class="qf-col-title">Current</span>
            </div>
            <div class="qf-col-body">
              <div class="qf-current-chip">
                <specd-color-swatch color="#2c2822" label="#2C2822"></specd-color-swatch>
                <span class="qf-current-value">#2C2822</span>
              </div>
            </div>
            <div class="qf-current-foot">
              <specd-tag label="Colour · Fill" intent="info"></specd-tag>
              <specd-button variant="ghost" size="sm" label="Ignore"></specd-button>
            </div>
          </div>

          <!-- RIGHT: Choose replacement -->
          <div class="qf-col qf-col-right">
            <div class="qf-col-head">
              <span class="qf-col-title">Choose replacement variable</span>
              <span class="qf-col-meta">6 matches</span>
            </div>
            <div class="qf-col-body">
              <div class="qf-replace-list" style="display:flex; flex-direction:column; gap:6px;">
                <specd-radio-row
                  value="theme/background"
                  label="theme/background"
                  collection="Theme · Primary"
                  color="#1d4ed8"
                  hex="#1D4ED8"
                  checked
                ></specd-radio-row>
                <specd-radio-row
                  value="semantic/fill/primary"
                  label="semantic/fill/primary"
                  collection="Semantic · Fills"
                  color="#2563eb"
                  hex="#2563EB"
                ></specd-radio-row>
                <specd-radio-row
                  value="primitives/blue-500"
                  label="primitives/blue-500"
                  collection="Primitives"
                  color="#3b82f6"
                  hex="#3B82F6"
                ></specd-radio-row>
                <specd-radio-row
                  value="primitives/blue-400"
                  label="primitives/blue-400"
                  collection="Primitives"
                  color="#60a5fa"
                  hex="#60A5FA"
                ></specd-radio-row>
                <specd-radio-row
                  value="primitives/navy"
                  label="primitives/navy"
                  collection="Primitives"
                  color="#0c1750"
                  hex="#0C1750"
                ></specd-radio-row>
                <specd-radio-row
                  value="primitives/blue-300"
                  label="primitives/blue-300"
                  collection="Primitives"
                  color="#93c5fd"
                  hex="#93C5FD"
                ></specd-radio-row>
              </div>
              <specd-button variant="ghost" size="sm" label="Show more" full></specd-button>
            </div>
          </div>

        </div>

        <!-- Card footer -->
        <div class="qf-footer">
          <div class="qf-footer-left">
            <specd-button variant="ghost" size="sm" label="← Prev"></specd-button>
            <specd-button variant="ghost" size="sm" label="Next →"></specd-button>
          </div>
          <div class="qf-counter">1 of 902</div>
          <div class="qf-footer-right">
            <specd-button variant="primary" size="sm" label="Apply Fix"></specd-button>
            <specd-button variant="primary" size="sm" label="Apply to all" badge="902"></specd-button>
          </div>
        </div>

      </div>
    </div>

  </div>

  <!-- Background content behind overlay -->
  <div class="plugin-scroll" style="padding:14px;">
    <p style="font-size:11px; color:#9ca3af; padding:12px 0;">Issues panel content behind overlay…</p>
  </div>
`;

export const PluginView: Story = {
  name: 'Plugin View',
  parameters: { layout: 'padded' },
  render: () => html`
    <div style="padding:0; display:flex; align-items:flex-start;">
      <div class="plugin-wrap" style="position:relative; overflow:hidden;">
        ${componentShell()}
        ${qfWizardComponentContent()}
      </div>
    </div>
  `,
};

const sectionBlock = (name: string, content: TemplateResult) => html`
  <div style="display:flex; flex-direction:column; gap:8px;">
    <div style="font:600 11px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; padding:0 2px;">${name}</div>
    <div style="background:#fff; border:1px solid #e5e7eb; border-radius:10px; padding:12px 14px; display:flex; flex-wrap:wrap; gap:10px; align-items:center;">
      ${content}
    </div>
  </div>
`;

export const ComponentBreakdown: Story = {
  name: 'Component Breakdown',
  parameters: { layout: 'padded' },
  render: () => html`
    <div style="padding:16px; background:#f0f4f8; min-height:100vh; font-family:Inter,sans-serif;">
      <h2 style="font:700 14px 'IBM Plex Mono',monospace; color:#6b7280; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 20px;">
        QuickFixWizard — Components Used
      </h2>
      <div style="display:flex; flex-direction:column; gap:24px;">
        ${sectionBlock('specd-button', html`
          <specd-button variant="primary" label="Apply Fix"></specd-button>
          <specd-button variant="primary" label="Apply to all"></specd-button>
          <specd-button variant="ghost" label="Cancel"></specd-button>
          <specd-button variant="ghost" label="Ignore"></specd-button>
          <specd-button variant="danger" label="Remove"></specd-button>
        `)}
        ${sectionBlock('specd-radio-row', html`
          <div style="width:100%; display:flex; flex-direction:column; gap:6px;">
            <specd-radio-row value="theme/background" label="theme/background" collection="Theme · Primary" color="#1d4ed8" hex="#1D4ED8" checked></specd-radio-row>
            <specd-radio-row value="semantic/fill/primary" label="semantic/fill/primary" collection="Semantic · Fills" color="#2563eb" hex="#2563EB"></specd-radio-row>
          </div>
        `)}
        ${sectionBlock('specd-segmented', html`
          <specd-segmented options='[{"value":"replace","label":"Replace"},{"value":"zero","label":"Set to 0"},{"value":"ignore","label":"Ignore"}]' value="replace"></specd-segmented>
          <specd-segmented options='[{"value":"replace","label":"Replace"},{"value":"zero","label":"Set to 0"},{"value":"ignore","label":"Ignore"}]' value="replace" dark></specd-segmented>
        `)}
        ${sectionBlock('specd-color-swatch', html`
          <specd-color-swatch color="#2c2822" label="#2C2822"></specd-color-swatch>
          <specd-color-swatch color="#3b82f6" label="semantic/fill/primary" sm></specd-color-swatch>
          <specd-color-swatch color="#0c1750" label="primitives/navy" sm></specd-color-swatch>
        `)}
        ${sectionBlock('specd-input (search)', html`
          <div style="flex:1;">
            <specd-input search placeholder="Search variables…"></specd-input>
          </div>
        `)}
        ${sectionBlock('specd-tag', html`
          <specd-tag label="Colour · Fill" intent="info"></specd-tag>
          <specd-tag label="Critical" intent="crit"></specd-tag>
          <specd-tag label="Warning" intent="warn"></specd-tag>
          <specd-tag label="Success" intent="success"></specd-tag>
          <specd-tag label="Neutral" intent="neutral"></specd-tag>
        `)}
        ${sectionBlock('specd-ai-pill', html`
          <specd-ai-pill label="AI suggestion"></specd-ai-pill>
          <specd-ai-pill label="Exact match found"></specd-ai-pill>
        `)}
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
        <div class="plugin-wrap" style="position:relative; overflow:hidden;">
          ${pluginShell()}
          ${qfWizardRawContent()}
        </div>
      </div>
      <div style="background:#e8eef5; padding:16px;">
        <p style="font:700 10px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">Component Build</p>
        <div class="plugin-wrap" style="position:relative; overflow:hidden;">
          ${componentShell()}
          ${qfWizardComponentContent()}
        </div>
      </div>
    </div>
  `,
};
