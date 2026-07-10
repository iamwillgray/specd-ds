import type { Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/Button/SpecdButton.js';
import '../../components/Chip/SpecdChip.js';
import '../../components/ColorSwatch/SpecdColorSwatch.js';
import '../../components/SectionLabel/SpecdSectionLabel.js';
import '../../components/AiPill/SpecdAiPill.js';
import '../../components/Input/SpecdInput.js';
import '../../components/Segmented/SpecdSegmented.js';

const LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 48 48" fill="none"><rect x="17" y="24.2427" width="10.2426" height="10.2426" rx="2" transform="rotate(-45 17 24.2427)" fill="white"/><rect x="12.7071" y="24.101" width="16.1133" height="16.1133" rx="4.5" transform="rotate(-45 12.7071 24.101)" stroke="white" stroke-width="1.2"/><rect x="7.70711" y="23.9664" width="22.9942" height="23.0891" rx="7.5" transform="rotate(-45 7.70711 23.9664)" stroke="white" stroke-width="1.2"/></svg>`;

const meta: Meta = {
  title: 'Pages/BulkFixWizard',
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
  <specd-app-header name="Pulse" showrefresh showsettings></specd-app-header>
  <specd-tab-bar tabs=${TABS_JSON} active="issues"></specd-tab-bar>
`;

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

const bulkWizardRawContent = () => html`
  <!-- BULK WIZARD OVERLAY -->
  <div class="qf-wizard qf-bulk-mode" role="dialog" aria-modal="true">

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
      <button class="qf-btn-single">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        Single
      </button>
    </div>

    <!-- Bulk header bar -->
    <div class="qf-bulk-header">
      <span class="qf-bulk-header-left">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        Bulk
      </span>
      <span class="qf-bulk-header-count">902 issues</span>
    </div>

    <div class="qf-body">
      <div class="qf-bulk-view">

        <!-- Filter chips -->
        <div class="qf-bulk-filters">
          <button class="qf-bulk-filter-chip is-active">All <span class="qf-bulk-filter-chip-count">902</span></button>
          <button class="qf-bulk-filter-chip">Colour <span class="qf-bulk-filter-chip-count">51</span></button>
          <button class="qf-bulk-filter-chip">Spacing <span class="qf-bulk-filter-chip-count">816</span></button>
          <button class="qf-bulk-filter-chip">Typography <span class="qf-bulk-filter-chip-count">3</span></button>
          <button class="qf-bulk-filter-chip">Radius <span class="qf-bulk-filter-chip-count">0</span></button>
        </div>

        <!-- Scrollable rows -->
        <div class="qf-bulk-scroll">

          <!-- Row 1: background fill (colour) -->
          <div class="hc-bulk-row" style="margin-bottom:6px;">
            <div class="hc-row-content">
              <div class="hc-property-header">
                <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="7"/></svg></span>
                <button class="hc-prop-layer">Button/Primary/Default</button>
                <span class="hc-prop-arrow">›</span>
                <span class="hc-prop-attr">background fill</span>
                <span class="hc-instance-count">28 layers</span>
              </div>
              <div class="bulk-fix-row">
                <div class="bulk-current">
                  <span class="swatch-sq" style="background: #3b82f6;"></span>
                  <span class="raw-value">#3b82f6</span>
                </div>
                <span class="bulk-arrow">→</span>
                <div class="bulk-suggestion">
                  <span class="swatch-sq" style="background: #3b82f6;"></span>
                  <span class="bulk-var-name">semantic/fill/primary</span>
                  <span class="bulk-match-chip exact">EXACT</span>
                  <span class="bulk-chevron">›</span>
                </div>
                <button class="btn-row-primary">Apply</button>
              </div>
            </div>
          </div>

          <!-- Row 2: card surface -->
          <div class="hc-bulk-row" style="margin-bottom:6px;">
            <div class="hc-row-content">
              <div class="hc-property-header">
                <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="7"/></svg></span>
                <button class="hc-prop-layer">Card/Surface/Background</button>
                <span class="hc-prop-arrow">›</span>
                <span class="hc-prop-attr">background fill</span>
                <span class="hc-instance-count">14 layers</span>
              </div>
              <div class="bulk-fix-row">
                <div class="bulk-current">
                  <span class="swatch-sq" style="background: #f8f9fc;"></span>
                  <span class="raw-value">#f8f9fc</span>
                </div>
                <span class="bulk-arrow">→</span>
                <div class="bulk-suggestion">
                  <span class="swatch-sq" style="background: #f8f9fc;"></span>
                  <span class="bulk-var-name">color/surface/default</span>
                  <span class="bulk-match-chip partial">PARTIAL</span>
                  <span class="bulk-chevron">›</span>
                </div>
                <button class="btn-row-primary">Apply</button>
              </div>
            </div>
          </div>

          <!-- Row 3: stroke — applied state -->
          <div class="hc-bulk-row" style="margin-bottom:6px;">
            <div class="hc-row-content">
              <div class="hc-property-header">
                <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="7"/></svg></span>
                <button class="hc-prop-layer">Input/Text/Border</button>
                <span class="hc-prop-arrow">›</span>
                <span class="hc-prop-attr">stroke color</span>
                <span class="hc-instance-count">9 layers</span>
              </div>
              <div class="bulk-fix-row">
                <div class="bulk-current">
                  <span class="swatch-sq" style="background: #b8cadf;"></span>
                  <span class="raw-value">#b8cadf</span>
                </div>
                <span class="bulk-arrow">→</span>
                <div class="bulk-suggestion">
                  <span class="swatch-sq" style="background: #b8cadf;"></span>
                  <span class="bulk-var-name">color/border/default</span>
                  <span class="bulk-match-chip exact">EXACT</span>
                  <span class="bulk-chevron">›</span>
                </div>
                <button class="btn-row-primary is-applied">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Applied
                </button>
              </div>
            </div>
          </div>

          <!-- Row 4: paddingLeft · paddingRight -->
          <div class="hc-bulk-row" style="margin-bottom:6px;">
            <div class="hc-row-content">
              <div class="hc-property-header">
                <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg></span>
                <button class="hc-prop-layer">Button/Primary/Default</button>
                <span class="hc-prop-arrow">›</span>
                <span class="hc-prop-attr">paddingLeft · paddingRight</span>
                <span class="hc-instance-count">18 layers</span>
              </div>
              <div class="bulk-fix-row">
                <div class="bulk-current">
                  <span class="raw-value">16</span>
                  <specd-button variant="ghost" size="sm" label="Set to 0" style="--btn-px:8px;"></specd-button>
                </div>
                <span class="bulk-arrow">→</span>
                <div class="bulk-suggestion">
                  <span class="bulk-var-name">spacing/md</span>
                  <span class="bulk-chevron">›</span>
                </div>
                <button class="btn-row-primary">Apply</button>
              </div>
            </div>
          </div>

          <!-- Row 5: paddingTop · paddingBottom -->
          <div class="hc-bulk-row" style="margin-bottom:6px;">
            <div class="hc-row-content">
              <div class="hc-property-header">
                <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg></span>
                <button class="hc-prop-layer">Card/Default</button>
                <span class="hc-prop-arrow">›</span>
                <span class="hc-prop-attr">paddingTop · paddingBottom</span>
                <span class="hc-instance-count">12 layers</span>
              </div>
              <div class="bulk-fix-row">
                <div class="bulk-current">
                  <span class="raw-value">24</span>
                  <specd-button variant="ghost" size="sm" label="Set to 0" style="--btn-px:8px;"></specd-button>
                </div>
                <span class="bulk-arrow">→</span>
                <div class="bulk-suggestion">
                  <span class="bulk-var-name">spacing/xl</span>
                  <span class="bulk-chevron">›</span>
                </div>
                <button class="btn-row-primary">Apply</button>
              </div>
            </div>
          </div>

          <!-- Row 6: itemSpacing -->
          <div class="hc-bulk-row" style="margin-bottom:6px;">
            <div class="hc-row-content">
              <div class="hc-property-header">
                <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg></span>
                <button class="hc-prop-layer">Nav/Header</button>
                <span class="hc-prop-arrow">›</span>
                <span class="hc-prop-attr">itemSpacing</span>
                <span class="hc-instance-count">8 layers</span>
              </div>
              <div class="bulk-fix-row">
                <div class="bulk-current">
                  <span class="raw-value">8</span>
                  <specd-button variant="ghost" size="sm" label="Set to 0" style="--btn-px:8px;"></specd-button>
                </div>
                <span class="bulk-arrow">→</span>
                <div class="bulk-suggestion">
                  <span class="bulk-var-name">spacing/sm</span>
                  <span class="bulk-chevron">›</span>
                </div>
                <button class="btn-row-primary">Apply</button>
              </div>
            </div>
          </div>

          <!-- Row 7: fontSize -->
          <div class="hc-bulk-row" style="margin-bottom:6px;">
            <div class="hc-row-content">
              <div class="hc-property-header">
                <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg></span>
                <button class="hc-prop-layer">Input/Text/Label</button>
                <span class="hc-prop-arrow">›</span>
                <span class="hc-prop-attr">fontSize</span>
                <span class="hc-instance-count">6 layers</span>
              </div>
              <div class="bulk-fix-row">
                <div class="bulk-current">
                  <span class="raw-value">12</span>
                </div>
                <span class="bulk-arrow">→</span>
                <div class="bulk-suggestion">
                  <span class="bulk-var-name">font-size/xs</span>
                  <span class="bulk-chevron">›</span>
                </div>
                <button class="btn-row-primary">Apply</button>
              </div>
            </div>
          </div>

        </div><!-- /qf-bulk-scroll -->

        <!-- Sticky footer -->
        <div class="qf-bulk-footer">
          <button class="qf-bulk-apply-all">
            Apply all <span class="qf-bulk-apply-all-count">867</span>
          </button>
        </div>

      </div><!-- /qf-bulk-view -->
    </div><!-- /qf-body -->

  </div><!-- /qf-wizard -->

  <!-- Background content behind overlay -->
  <div class="plugin-scroll" style="padding: 14px;">
    <p style="font-size: 11px; color: #9ca3af; padding: 12px 0;">Issues panel content behind overlay…</p>
  </div>
`;

const bulkWizardComponentContent = () => html`
  <!-- BULK WIZARD OVERLAY -->
  <div class="qf-wizard qf-bulk-mode" role="dialog" aria-modal="true">

    <!-- Topbar -->
    <div class="qf-topbar" style="display:flex; justify-content:space-between; align-items:center;">
      <specd-button variant="ghost" size="sm" icon='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>'></specd-button>
      <div class="qf-topbar-brand">
        <span class="qf-topbar-logo">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l1.8 4.2L16 8l-4.2 1.8L10 14 8.2 9.8 4 8l4.2-1.8L10 2zM16 13l.9 2.1L19 16l-2.1.9L16 19l-.9-2.1L13 16l2.1-.9L16 13z"/></svg>
        </span>
        <h2 class="qf-topbar-title">Quick-Fix Issues</h2>
      </div>
      <specd-button variant="ghost" label="Single" size="sm"></specd-button>
    </div>

    <!-- Bulk header bar -->
    <div class="qf-bulk-header" style="padding-top:16px;">
      <span class="qf-bulk-header-left">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        Bulk
      </span>
      <span class="qf-bulk-header-count">902 issues</span>
    </div>

    <div class="qf-body">
      <div class="qf-bulk-view">

        <!-- Filter chips -->
        <div class="qf-bulk-filters">
          <specd-chip label="All" count="902" active></specd-chip>
          <specd-chip label="Colour" count="51"></specd-chip>
          <specd-chip label="Spacing" count="816"></specd-chip>
          <specd-chip label="Typography" count="3"></specd-chip>
          <specd-chip label="Radius" count="0"></specd-chip>
          <specd-chip label="Ignored" count="3"></specd-chip>
        </div>

        <!-- Scrollable rows -->
        <div class="qf-bulk-scroll">

          <!-- Row 1: background fill (colour) -->
          <div class="hc-bulk-row" style="margin-bottom:6px;">
            <div class="hc-row-content">
              <div class="hc-property-header">
                <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="7"/></svg></span>
                <button class="hc-prop-layer">Button/Primary/Default</button>
                <span class="hc-prop-arrow">›</span>
                <span class="hc-prop-attr">background fill</span>
                <span class="hc-instance-count">28 layers</span>
              </div>
              <div class="bulk-fix-row">
                <div class="bulk-current">
                  <specd-color-swatch color="#3b82f6" label="#3b82f6" sm></specd-color-swatch>
                </div>
                <span class="bulk-arrow">→</span>
                <div class="bulk-suggestion">
                  <specd-color-swatch color="#3b82f6" label="semantic/fill/primary" sm></specd-color-swatch>
                  <span class="bulk-match-chip exact">EXACT</span>
                  <span class="bulk-chevron">›</span>
                </div>
                <specd-button variant="primary" label="Apply" size="sm"></specd-button>
              </div>
            </div>
          </div>

          <!-- Row 2: card surface -->
          <div class="hc-bulk-row" style="margin-bottom:6px;">
            <div class="hc-row-content">
              <div class="hc-property-header">
                <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="7"/></svg></span>
                <button class="hc-prop-layer">Card/Surface/Background</button>
                <span class="hc-prop-arrow">›</span>
                <span class="hc-prop-attr">background fill</span>
                <span class="hc-instance-count">14 layers</span>
              </div>
              <div class="bulk-fix-row">
                <div class="bulk-current">
                  <specd-color-swatch color="#f8f9fc" label="#f8f9fc" sm></specd-color-swatch>
                </div>
                <span class="bulk-arrow">→</span>
                <div class="bulk-suggestion">
                  <specd-color-swatch color="#f8f9fc" label="color/surface/default" sm></specd-color-swatch>
                  <span class="bulk-match-chip partial">PARTIAL</span>
                  <span class="bulk-chevron">›</span>
                </div>
                <specd-button variant="primary" label="Apply" size="sm"></specd-button>
              </div>
            </div>
          </div>

          <!-- Row 3: stroke — applied state -->
          <div class="hc-bulk-row" style="margin-bottom:6px;">
            <div class="hc-row-content">
              <div class="hc-property-header">
                <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="7"/></svg></span>
                <button class="hc-prop-layer">Input/Text/Border</button>
                <span class="hc-prop-arrow">›</span>
                <span class="hc-prop-attr">stroke color</span>
                <span class="hc-instance-count">9 layers</span>
              </div>
              <div class="bulk-fix-row">
                <div class="bulk-current">
                  <specd-color-swatch color="#b8cadf" label="#b8cadf" sm></specd-color-swatch>
                </div>
                <span class="bulk-arrow">→</span>
                <div class="bulk-suggestion">
                  <specd-color-swatch color="#b8cadf" label="color/border/default" sm></specd-color-swatch>
                  <span class="bulk-match-chip exact">EXACT</span>
                  <span class="bulk-chevron">›</span>
                </div>
                <specd-button variant="primary" label="Applied" size="sm" disabled></specd-button>
              </div>
            </div>
          </div>

          <!-- Row 4: paddingLeft · paddingRight -->
          <div class="hc-bulk-row" style="margin-bottom:6px;">
            <div class="hc-row-content">
              <div class="hc-property-header">
                <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg></span>
                <button class="hc-prop-layer">Button/Primary/Default</button>
                <span class="hc-prop-arrow">›</span>
                <span class="hc-prop-attr">paddingLeft · paddingRight</span>
                <span class="hc-instance-count">18 layers</span>
              </div>
              <div class="bulk-fix-row">
                <div class="bulk-current">
                  <span class="raw-value">16</span>
                  <specd-button variant="ghost" size="sm" label="Set to 0" style="--btn-px:8px;"></specd-button>
                </div>
                <span class="bulk-arrow">→</span>
                <div class="bulk-suggestion">
                  <span class="bulk-var-name">spacing/md</span>
                  <span class="bulk-chevron">›</span>
                </div>
                <specd-button variant="primary" label="Apply" size="sm"></specd-button>
              </div>
            </div>
          </div>

          <!-- Row 5: paddingTop · paddingBottom -->
          <div class="hc-bulk-row" style="margin-bottom:6px;">
            <div class="hc-row-content">
              <div class="hc-property-header">
                <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg></span>
                <button class="hc-prop-layer">Card/Default</button>
                <span class="hc-prop-arrow">›</span>
                <span class="hc-prop-attr">paddingTop · paddingBottom</span>
                <span class="hc-instance-count">12 layers</span>
              </div>
              <div class="bulk-fix-row">
                <div class="bulk-current">
                  <span class="raw-value">24</span>
                  <specd-button variant="ghost" size="sm" label="Set to 0" style="--btn-px:8px;"></specd-button>
                </div>
                <span class="bulk-arrow">→</span>
                <div class="bulk-suggestion">
                  <span class="bulk-var-name">spacing/xl</span>
                  <span class="bulk-chevron">›</span>
                </div>
                <specd-button variant="primary" label="Apply" size="sm"></specd-button>
              </div>
            </div>
          </div>

          <!-- Row 6: itemSpacing -->
          <div class="hc-bulk-row" style="margin-bottom:6px;">
            <div class="hc-row-content">
              <div class="hc-property-header">
                <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg></span>
                <button class="hc-prop-layer">Nav/Header</button>
                <span class="hc-prop-arrow">›</span>
                <span class="hc-prop-attr">itemSpacing</span>
                <span class="hc-instance-count">8 layers</span>
              </div>
              <div class="bulk-fix-row">
                <div class="bulk-current">
                  <span class="raw-value">8</span>
                  <specd-button variant="ghost" size="sm" label="Set to 0" style="--btn-px:8px;"></specd-button>
                </div>
                <span class="bulk-arrow">→</span>
                <div class="bulk-suggestion">
                  <span class="bulk-var-name">spacing/sm</span>
                  <span class="bulk-chevron">›</span>
                </div>
                <specd-button variant="primary" label="Apply" size="sm"></specd-button>
              </div>
            </div>
          </div>

          <!-- Row 7: fontSize -->
          <div class="hc-bulk-row" style="margin-bottom:6px;">
            <div class="hc-row-content">
              <div class="hc-property-header">
                <span class="hc-prop-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg></span>
                <button class="hc-prop-layer">Input/Text/Label</button>
                <span class="hc-prop-arrow">›</span>
                <span class="hc-prop-attr">fontSize</span>
                <span class="hc-instance-count">6 layers</span>
              </div>
              <div class="bulk-fix-row">
                <div class="bulk-current">
                  <span class="raw-value">12</span>
                </div>
                <span class="bulk-arrow">→</span>
                <div class="bulk-suggestion">
                  <span class="bulk-var-name">font-size/xs</span>
                  <span class="bulk-chevron">›</span>
                </div>
                <specd-button variant="primary" label="Apply" size="sm"></specd-button>
              </div>
            </div>
          </div>

        </div><!-- /qf-bulk-scroll -->

        <!-- Sticky footer -->
        <div class="qf-bulk-footer" style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
          <specd-button variant="ghost" size="sm" label="Back"></specd-button>
          <div style="display:flex; gap:6px; align-items:center;">
            <specd-button variant="ghost" size="sm" label="Skip"></specd-button>
            <specd-button variant="primary" size="sm" label="Apply all 867"></specd-button>
          </div>
        </div>

      </div><!-- /qf-bulk-view -->
    </div><!-- /qf-body -->

  </div><!-- /qf-wizard -->

  <!-- Background content behind overlay -->
  <div class="plugin-scroll" style="padding: 14px;">
    <p style="font-size: 11px; color: #9ca3af; padding: 12px 0;">Issues panel content behind overlay…</p>
  </div>
`;

export const PluginView: Story = {
  name: 'Plugin View',
  parameters: { layout: 'padded' },
  render: () => html`
    <div style="padding:0; display:flex; align-items:flex-start;">
      <div class="plugin-wrap" style="position:relative; overflow:hidden;">
        ${componentShell()}
        ${bulkWizardComponentContent()}
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
        BulkFixWizard — Components Used
      </h2>
      <div style="display:flex; flex-direction:column; gap:24px;">
        ${sectionBlock('specd-button', html`
          <specd-button variant="primary" label="Apply"></specd-button>
          <specd-button variant="ghost" label="Cancel"></specd-button>
          <specd-button variant="ghost" label="Skip"></specd-button>
          <specd-button variant="ghost" label="Back"></specd-button>
          <specd-button variant="danger" label="Ignore"></specd-button>
        `)}
        ${sectionBlock('specd-ai-pill', html`
          <specd-ai-pill label="AI suggestion"></specd-ai-pill>
          <specd-ai-pill label="Exact match found"></specd-ai-pill>
        `)}
        ${sectionBlock('specd-chip', html`
          <specd-chip label="All" count="902" active></specd-chip>
          <specd-chip label="Colour" count="51"></specd-chip>
          <specd-chip label="Spacing" count="816"></specd-chip>
          <specd-chip label="Ignored" count="3"></specd-chip>
          <specd-chip label="Critical" count="12" severity="crit"></specd-chip>
          <specd-chip label="Warning" count="8" severity="warn"></specd-chip>
        `)}
        ${sectionBlock('specd-color-swatch', html`
          <specd-color-swatch color="#3b82f6" label="#3b82f6" sm></specd-color-swatch>
          <specd-color-swatch color="#f8f9fc" label="color/surface/default" sm></specd-color-swatch>
          <specd-color-swatch color="#b8cadf" label="color/border/default" sm></specd-color-swatch>
          <specd-color-swatch color="#0c1750" label="semantic/navy"></specd-color-swatch>
        `)}
        ${sectionBlock('specd-input (search)', html`
          <div style="flex:1;">
            <specd-input search placeholder="Search variables…"></specd-input>
          </div>
        `)}
        ${sectionBlock('specd-segmented', html`
          <specd-segmented options='[{"value":"all","label":"All"},{"value":"colour","label":"Colour"},{"value":"spacing","label":"Spacing"}]' value="all"></specd-segmented>
          <specd-segmented options='[{"value":"all","label":"All"},{"value":"colour","label":"Colour"},{"value":"spacing","label":"Spacing"}]' value="all" dark></specd-segmented>
        `)}
      </div>
    </div>
  `,
};

export const Compare: Story = {
  render: () => html`
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0; min-height:100vh;">
      <div style="border-right:2px solid #dbeafe; background:#e8eef5; padding:16px;">
        <p style="font:700 10px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">Reference HTML</p>
        <div class="plugin-wrap" style="position:relative; overflow:hidden;">
          ${pluginShell()}
          ${bulkWizardRawContent()}
        </div>
      </div>
      <div style="background:#e8eef5; padding:16px;">
        <p style="font:700 10px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">Component Build</p>
        <div class="plugin-wrap" style="position:relative; overflow:hidden;">
          ${componentShell()}
          ${bulkWizardComponentContent()}
        </div>
      </div>
    </div>
  `,
};
