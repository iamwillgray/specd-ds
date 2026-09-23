import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/Chip/SpecdChip.js';
import '../../components/ColorSwatch/SpecdColorSwatch.js';
import '../../components/RadioRow/SpecdRadioRow.js';
import '../../components/Tag/SpecdTag.js';

/**
 * REDESIGN — Phase 3, Quick/Bulk-Fix Wizard.
 *
 * The real source (pulse/src/ui.html's "QUICK-FIX WIZARD (fullscreen
 * overlay)") is ONE overlay with two modes, toggled by the top-right
 * button — not two separate screens — so this story reproduces that
 * exact behaviour: click "Bulk" to switch to the grouped-by-property
 * view, click "Single" to switch back. Every real element is preserved:
 * topbar (close / brand / mode toggle), filter chips, single-issue card
 * (component header + jump, Current vs. Choose replacement split,
 * prev/next + counter + Apply Fix/Apply to all footer), and the Bulk
 * view (bulk header bar, filter chips, grouped fix rows, Apply all footer).
 *
 * This wizard already had its own deliberate dark-navy "focused mode"
 * treatment (contrasting with the light main app) — preserved as-is,
 * that's a good, considered design decision, not something this pass
 * should flatten into the light theme. What actually needed updating:
 * every qf-* button was still the pre-redesign box-radius style — now
 * pill, matching the suite-wide button standard (see DESIGN.md).
 *
 * Positioning: .qf-wizard is position:absolute; inset:0 in the real
 * plugin (not fixed, unlike the Drawer) — .plugin-wrap now sets
 * position:relative so that resolves correctly wherever this is
 * previewed, without needing the Drawer's JS-measured workaround.
 */
const meta: Meta = {
  title: 'Redesign/QuickFixWizard',
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

const shell = () => html`
  <specd-app-header name="Pulse" showrefresh showsettings></specd-app-header>
  <specd-tab-bar tabs=${TABS_JSON} active="issues"></specd-tab-bar>
`;

/** Toggle between the single-issue card and the grouped bulk view — same
 * overlay, same topbar, just a different .qf-body content and a relabeled
 * mode-toggle button (matching the real plugin's Bulk/Single behaviour). */
function toggleMode() {
  const wizard = document.querySelector('.qf-wizard');
  if (!wizard) return;
  const goingBulk = !wizard.classList.contains('qf-bulk-mode');
  wizard.classList.toggle('qf-bulk-mode', goingBulk);
  wizard.querySelector('.qf-card')?.classList.toggle('hidden', goingBulk);
  wizard.querySelector('.qf-bulk-view')?.classList.toggle('hidden', !goingBulk);
  wizard.querySelector('.qf-filter-chips.qf-single-chips')?.classList.toggle('hidden', goingBulk);
  wizard.querySelector('.qf-filter-label')?.classList.toggle('hidden', goingBulk);
  wizard.querySelector('.qf-bulk-header')?.classList.toggle('hidden', !goingBulk);
  // .textContent on the button itself would wipe its leading icon SVG
  // (textContent replaces ALL children, not just the trailing text node) —
  // a real bug caught in review, not hypothetical. Scope the swap to the
  // dedicated label span instead.
  const modeLabel = wizard.querySelector('.qf-mode-toggle-label');
  if (modeLabel) modeLabel.textContent = goingBulk ? 'Single' : 'Bulk';
}

export const PluginView: Story = {
  name: 'Plugin View (Quick/Bulk-Fix Wizard)',
  render: () => html`
    <div class="plugin-wrap">
      ${shell()}

      <!-- Background content behind overlay, matching the real plugin
           (the wizard opens on top of the Issues tab, not a blank page). -->
      <div class="plugin-scroll" style="padding:14px;">
        <p style="font-size:11px;color:var(--text-muted);padding:12px 0;">Issues panel content behind overlay…</p>
      </div>

      <div class="qf-wizard" role="dialog" aria-modal="true" aria-labelledby="qf-title">
        <div class="qf-topbar">
          <button class="qf-btn-close">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            Close
          </button>
          <div class="qf-topbar-brand">
            <span class="qf-topbar-logo">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l1.8 4.2L16 8l-4.2 1.8L10 14 8.2 9.8 4 8l4.2-1.8L10 2zM16 13l.9 2.1L19 16l-2.1.9L16 19l-.9-2.1L13 16l2.1-.9L16 13z"/></svg>
            </span>
            <h2 class="qf-topbar-title" id="qf-title">Quick-Fix Issues</h2>
          </div>
          <button class="qf-btn-bulk qf-mode-toggle" @click=${toggleMode}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            <span class="qf-mode-toggle-label">Bulk</span>
          </button>
        </div>

        <!-- Single mode: filter chips + label -->
        <div class="qf-filter-chips qf-single-chips">
          <specd-chip label="All" count="902" active></specd-chip>
          <specd-chip label="Colour" count="51"></specd-chip>
          <specd-chip label="Spacing" count="816"></specd-chip>
          <specd-chip label="Radius" count="0"></specd-chip>
          <specd-chip label="Typography" count="3"></specd-chip>
          <specd-chip label="Storybook" count="32"></specd-chip>
        </div>
        <div class="qf-filter-label">All Issues</div>

        <!-- Bulk mode: header bar (hidden until Bulk is selected) -->
        <div class="qf-bulk-header hidden">
          <span class="qf-bulk-header-left">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Bulk
          </span>
          <span class="qf-bulk-header-count">902 issues</span>
        </div>

        <div class="qf-body">

          <!-- Single-issue card -->
          <div class="qf-card">
            <div class="qf-card-head">
              <div class="qf-comp-head">
                <span class="qf-comp-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>
                </span>
                <span class="qf-comp-name-text">Button/Primary/Default</span>
              </div>
              <button class="qf-card-jump" title="Jump to layer" aria-label="Jump to layer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
              </button>
            </div>

            <div class="qf-split">
              <div class="qf-col">
                <div class="qf-col-head"><span class="qf-col-title">Current</span></div>
                <div class="qf-col-body">
                  <div class="qf-current-chip">
                    <specd-color-swatch color="#2c2822" label="#2C2822"></specd-color-swatch>
                    <span class="qf-current-value">#2C2822</span>
                  </div>
                </div>
                <div class="qf-current-foot">
                  <specd-tag label="Colour · Fill" intent="info"></specd-tag>
                  <button class="qf-ignore-btn">Ignore</button>
                </div>
              </div>

              <div class="qf-col qf-col-right">
                <div class="qf-col-head">
                  <span class="qf-col-title">Choose replacement variable</span>
                  <span class="qf-col-meta">6 matches</span>
                </div>
                <div class="qf-col-body">
                  <div class="qf-replace-list">
                    <specd-radio-row value="theme/background" label="theme/background" collection="Theme · Primary" color="#1d4ed8" hex="#1D4ED8" checked></specd-radio-row>
                    <specd-radio-row value="semantic/fill/primary" label="semantic/fill/primary" collection="Semantic · Fills" color="#2563eb" hex="#2563EB"></specd-radio-row>
                    <specd-radio-row value="primitives/blue-500" label="primitives/blue-500" collection="Primitives" color="#3b82f6" hex="#3B82F6"></specd-radio-row>
                    <specd-radio-row value="primitives/blue-400" label="primitives/blue-400" collection="Primitives" color="#60a5fa" hex="#60A5FA"></specd-radio-row>
                    <specd-radio-row value="primitives/navy" label="primitives/navy" collection="Primitives" color="#0c1750" hex="#0C1750"></specd-radio-row>
                  </div>
                  <button class="qf-showmore">Show more</button>
                </div>
              </div>
            </div>

            <div class="qf-footer">
              <div class="qf-footer-left">
                <button class="qf-nav-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Prev
                </button>
                <button class="qf-nav-btn">
                  Next
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
              <div class="qf-counter">1 of 902</div>
              <div class="qf-footer-right">
                <button class="qf-apply-btn">Apply Fix</button>
                <button class="qf-applyall-btn">Apply to all<span class="qf-applyall-count">902</span></button>
              </div>
            </div>
          </div>

          <!-- Bulk Fix view — hidden until Bulk is selected -->
          <div class="qf-bulk-view hidden">
            <div class="qf-bulk-filters">
              <specd-chip label="All" count="902" active></specd-chip>
              <specd-chip label="Colour" count="51"></specd-chip>
              <specd-chip label="Spacing" count="816"></specd-chip>
              <specd-chip label="Typography" count="3"></specd-chip>
              <specd-chip label="Ignored" count="3"></specd-chip>
            </div>

            <div class="qf-bulk-scroll">
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
                    <div class="bulk-current"><specd-color-swatch color="#3b82f6" label="#3b82f6" sm></specd-color-swatch></div>
                    <span class="bulk-arrow">→</span>
                    <div class="bulk-suggestion">
                      <specd-color-swatch color="#3b82f6" label="semantic/fill/primary" sm></specd-color-swatch>
                      <span class="bulk-match-chip exact">EXACT</span>
                    </div>
                    <button class="qf-apply-btn">Apply</button>
                  </div>
                </div>
              </div>
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
                    <div class="bulk-current"><specd-color-swatch color="#f8f9fc" label="#f8f9fc" sm></specd-color-swatch></div>
                    <span class="bulk-arrow">→</span>
                    <div class="bulk-suggestion">
                      <specd-color-swatch color="#f8f9fc" label="color/surface/default" sm></specd-color-swatch>
                      <span class="bulk-match-chip partial">PARTIAL</span>
                    </div>
                    <button class="qf-apply-btn">Apply</button>
                  </div>
                </div>
              </div>
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
                    <div class="bulk-current"><span class="raw-value">8</span></div>
                    <span class="bulk-arrow">→</span>
                    <div class="bulk-suggestion"><span class="bulk-var-name">spacing/sm</span></div>
                    <button class="qf-apply-btn">Apply</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="qf-bulk-footer">
              <button class="qf-bulk-apply-all">Apply all <span class="qf-bulk-apply-all-count">867</span></button>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
};
