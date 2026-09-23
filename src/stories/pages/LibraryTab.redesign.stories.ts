import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/Button/SpecdButton.js';
import '../../components/Tag/SpecdTag.js';

/**
 * REDESIGN — Phase 3, Library.
 *
 * Every real section from pulse/src/ui.html's #panel-libraries is
 * preserved — Variable Usage by Library (connected library cards + add
 * card), Usage Breakdown, Unused Variables, Hard-coded Hotspots — nothing
 * dropped. Everywhere reuses established patterns: .cd2-section cards,
 * .specd-tone-header-style headers, pill buttons, and the same bar-track
 * recipe as Overview's coverage rows for the usage-breakdown bars.
 */
const meta: Meta = {
  title: 'Redesign/LibraryTab',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const TABS_JSON = JSON.stringify([
  { id: 'overview',    label: 'Overview',   icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`, iconActive: `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>` },
  { id: 'issues',      label: 'Issues',     badge: 47, icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`, iconActive: `<svg width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M12,2 A10,10 0 1,0 12.001,2 Z M11.15,7 L12.85,7 L12.85,13.2 L11.15,13.2 Z M12,15 A1.1,1.1 0 1,0 12.001,15 Z"/></svg>` },
  { id: 'components',  label: 'Components', icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`, iconActive: `<svg width="12" height="12" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { id: 'variables',   label: 'Variables',  icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 7h16M4 12h16M4 17h10"/></svg>`, iconActive: `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="6.25" width="16" height="1.5" rx="0.75"/><rect x="4" y="11.25" width="16" height="1.5" rx="0.75"/><rect x="4" y="16.25" width="10" height="1.5" rx="0.75"/></svg>` },
  { id: 'storybook',   label: 'Storybook',  icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`, iconActive: `<svg width="12" height="12" viewBox="0 0 24 24"><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="currentColor"/></svg>` },
  { id: 'library',     label: 'Library',    icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`, iconActive: `<svg width="12" height="12" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill="currentColor"/></svg>` },
]);

const shell = () => html`
  <specd-app-header name="Pulse" showrefresh showexport showsettings></specd-app-header>
  <specd-tab-bar tabs=${TABS_JSON} active="library"></specd-tab-bar>
`;

const ICO_LIB = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
const ICO_DIAMOND = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
const ICO_TARGET = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8M12 8v8"/></svg>`;
const ICO_PLUS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`;
const ICO_DOT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg>`;
const ICO_SPACING = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 6H3M21 18H3"/></svg>`;
const ICO_ALERT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;

/** Shows a "View more" button's remaining hidden rows and removes the
 * button — same disclosure shape used for "+N more" reveals elsewhere. */
function revealMore(e: Event) {
  const btn = e.currentTarget as HTMLElement;
  const wrap = btn.closest('.lb2-reveal-wrap');
  wrap?.querySelectorAll('.lb2-hidden-row').forEach((r) => r.classList.remove('hidden'));
  btn.remove();
}

export const PluginView: Story = {
  name: 'Plugin View (Library)',
  render: () => html`
    <div class="plugin-wrap">
      ${shell()}
      <div class="plugin-scroll">

        <!-- Variable Usage by Library -->
        <div class="cd2-section" style="margin-top:14px;">
          <div class="cd2-section-head"><div class="cd2-section-title-row tone-violet"><span class="cd2-section-icon">${unsafeSVG(ICO_LIB)}</span><div class="cd2-section-title">Variable Usage by Library</div></div></div>
          <div class="cd2-section-body">
            <div class="lb2-lib-card">
              <div class="lb2-lib-icon">${unsafeSVG(ICO_DIAMOND)}</div>
              <div class="lb2-lib-info">
                <div class="lb2-lib-name">Acme Design Tokens</div>
                <div class="lb2-lib-desc">Primary semantic token library — colours, spacing, typography, and shadows.</div>
                <div class="lb2-lib-meta-row">
                  <specd-tag label="Variables" intent="info"></specd-tag>
                  <span class="lb2-lib-status-dot"></span>
                  <span class="lb2-lib-status-text">Connected · 124 variables used</span>
                </div>
              </div>
              <specd-button variant="pill-danger" size="sm" label="Disconnect"></specd-button>
            </div>
            <div class="lb2-lib-card">
              <div class="lb2-lib-icon green">${unsafeSVG(ICO_TARGET)}</div>
              <div class="lb2-lib-info">
                <div class="lb2-lib-name">Brand Primitives</div>
                <div class="lb2-lib-desc">Raw colour primitives and scale values from the brand team.</div>
                <div class="lb2-lib-meta-row">
                  <specd-tag label="Variables" intent="info"></specd-tag>
                  <span class="lb2-lib-status-dot"></span>
                  <span class="lb2-lib-status-text">Connected · 88 variables used</span>
                </div>
              </div>
              <specd-button variant="pill-danger" size="sm" label="Disconnect"></specd-button>
            </div>
            <button class="lb2-add-card">
              <div class="lb2-add-icon">${unsafeSVG(ICO_PLUS)}</div>
              <div class="lb2-add-label">Add another library</div>
              <div class="lb2-add-hint">Connect a variable or component library to improve token suggestions.</div>
            </button>
          </div>
        </div>

        <!-- Usage Breakdown -->
        <div class="cd2-section">
          <div class="cd2-section-head"><div class="cd2-section-title-row"><div class="cd2-section-title">Usage Breakdown</div></div></div>
          <div class="cd2-section-body" style="padding-top:2px;">
            <p style="font-size:11px;color:var(--text-muted);margin:0 0 4px;">Which variable collections are used most across your components.</p>
            <div class="lb2-usage-row">
              <span class="lb2-usage-name">semantic/color</span>
              <div class="lb2-usage-bar-track"><div class="lb2-usage-bar-fill" style="width:78%;"></div></div>
              <span class="lb2-usage-pct">78%</span>
            </div>
            <div class="lb2-usage-row">
              <span class="lb2-usage-name">primitives/spacing</span>
              <div class="lb2-usage-bar-track"><div class="lb2-usage-bar-fill" style="width:55%;"></div></div>
              <span class="lb2-usage-pct">55%</span>
            </div>
            <div class="lb2-usage-row">
              <span class="lb2-usage-name">semantic/typography</span>
              <div class="lb2-usage-bar-track"><div class="lb2-usage-bar-fill" style="width:43%;background:var(--positive-accent);"></div></div>
              <span class="lb2-usage-pct">43%</span>
            </div>
            <div class="lb2-usage-row">
              <span class="lb2-usage-name">brand/primitives</span>
              <div class="lb2-usage-bar-track"><div class="lb2-usage-bar-fill" style="width:22%;background:var(--warning-accent);"></div></div>
              <span class="lb2-usage-pct">22%</span>
            </div>
          </div>
          <div style="padding:2px 16px 14px;text-align:center;">
            <specd-button variant="pill-ghost" size="sm" label="View all 12 collections"></specd-button>
          </div>
        </div>

        <!-- Unused Variables -->
        <div class="cd2-section">
          <div class="cd2-section-head"><div class="cd2-section-title-row"><div class="cd2-section-title">Unused Variables</div></div></div>
          <div class="cd2-section-body" style="padding-top:0;padding-bottom:0;">
            <p style="font-size:11px;color:var(--text-muted);margin:2px 0 4px;">Variables defined in connected libraries but never used in this file. Local variables can be deleted; library variables are read-only.</p>
            <div class="lb2-unused-row"><span class="lb2-unused-name">semantic/color/brand-tertiary</span><span class="lb2-unused-count">0 uses</span></div>
            <div class="lb2-unused-row"><span class="lb2-unused-name">primitives/purple-100</span><span class="lb2-unused-count">0 uses</span></div>
            <div class="lb2-unused-row"><span class="lb2-unused-name">semantic/shadow/overlay</span><span class="lb2-unused-count">0 uses</span></div>
            <div class="lb2-reveal-wrap">
              <div class="lb2-unused-row lb2-hidden-row hidden"><span class="lb2-unused-name">primitives/blue-25</span><span class="lb2-unused-count">0 uses</span></div>
              <div class="lb2-unused-row lb2-hidden-row hidden"><span class="lb2-unused-name">semantic/typography/overline</span><span class="lb2-unused-count">0 uses</span></div>
              <div style="padding:8px 0 12px;text-align:center;">
                <specd-button variant="pill-ghost" size="sm" label="View more (23 total)" @click=${revealMore}></specd-button>
              </div>
            </div>
          </div>
        </div>

        <!-- Hard-coded Hotspots -->
        <div class="cd2-section" style="margin-bottom:16px;">
          <div class="cd2-section-head"><div class="cd2-section-title-row tone-warning"><span class="cd2-section-icon">${unsafeSVG(ICO_ALERT)}</span><div class="cd2-section-title">Hard-coded Hotspots</div></div></div>
          <div class="cd2-section-body" style="padding-top:0;">
            <p style="font-size:11px;color:var(--text-muted);margin:2px 0 8px;">Frequent values with no variable binding — apply, override or create new tokens.</p>

            <div class="lb2-hotspot-row">
              <div class="lb2-hotspot-header">
                <span class="lb2-hotspot-icon">${unsafeSVG(ICO_DOT)}</span>
                <span class="lb2-hotspot-value">#0C1F3F</span>
                <span class="lb2-hotspot-attr">· fill</span>
                <span class="lb2-hotspot-count">24×</span>
              </div>
              <div class="lb2-hotspot-fix-row">
                <div class="lb2-hotspot-current"><span class="lb2-hotspot-swatch" style="background:#0C1F3F;"></span>#0C1F3F</div>
                <span class="lb2-hotspot-arrow">→</span>
                <div class="lb2-hotspot-suggest"><span class="lb2-hotspot-swatch" style="background:#0C1F3F;"></span>color/brand/navy</div>
                <specd-tag label="Closest match" intent="warn"></specd-tag>
                <div style="flex:1;"></div>
                <specd-button variant="pill-primary" size="sm" label="Apply"></specd-button>
                <specd-button variant="pill-ghost" size="sm" label="New var"></specd-button>
              </div>
            </div>

            <div class="lb2-hotspot-row">
              <div class="lb2-hotspot-header">
                <span class="lb2-hotspot-icon">${unsafeSVG(ICO_DOT)}</span>
                <span class="lb2-hotspot-value">#DBEAFE</span>
                <span class="lb2-hotspot-attr">· fill</span>
                <span class="lb2-hotspot-count">18×</span>
              </div>
              <div class="lb2-hotspot-fix-row">
                <div class="lb2-hotspot-current"><span class="lb2-hotspot-swatch" style="background:#DBEAFE;"></span>#DBEAFE</div>
                <span class="lb2-hotspot-arrow">→</span>
                <div class="lb2-hotspot-suggest"><span class="lb2-hotspot-swatch" style="background:#DBEAFE;"></span>color/blue-tint</div>
                <specd-tag label="Exact match" intent="info"></specd-tag>
                <div style="flex:1;"></div>
                <specd-button variant="pill-primary" size="sm" label="Apply"></specd-button>
                <specd-button variant="pill-ghost" size="sm" label="New var"></specd-button>
              </div>
            </div>

            <div class="lb2-hotspot-row">
              <div class="lb2-hotspot-header">
                <span class="lb2-hotspot-icon">${unsafeSVG(ICO_SPACING)}</span>
                <span class="lb2-hotspot-value">16px</span>
                <span class="lb2-hotspot-attr">· padding</span>
                <span class="lb2-hotspot-count">12×</span>
              </div>
              <div class="lb2-hotspot-fix-row">
                <div class="lb2-hotspot-current">16</div>
                <span class="lb2-hotspot-arrow">→</span>
                <div class="lb2-hotspot-suggest">spacing/md</div>
                <specd-tag label="Closest match" intent="warn"></specd-tag>
                <div style="flex:1;"></div>
                <specd-button variant="pill-primary" size="sm" label="Apply"></specd-button>
                <specd-button variant="pill-ghost" size="sm" label="New var"></specd-button>
              </div>
            </div>
          </div>
        </div>

        <div style="height:16px;"></div>
      </div>
    </div>
  `,
};
