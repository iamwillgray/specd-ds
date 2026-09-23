import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/Button/SpecdButton.js';
import '../../components/Input/SpecdInput.js';
import '../../components/ToggleRow/SpecdToggleRow.js';
import '../../components/Tag/SpecdTag.js';
import '../../components/Sparkline/SpecdSparkline.js';

/**
 * REDESIGN — Phase 3, Settings.
 *
 * Every real section from pulse/src/ui.html's #panel-settings is preserved —
 * Figma API (PAT), What this unlocks, Code Connect setup, Claude AI, What
 * this unlocks (AI), Supporting Libraries, Report Metrics, Variable Rules
 * (with preview), Scan Options, Report Appearance, Scan history, Change
 * history, About, Replay onboarding, Danger zone — nothing dropped.
 *
 * New pattern introduced here: the grouped accordion list (.st2-accordion-*)
 * for the many collapsible sub-sections — one shared card, hairline-divided
 * disclosure rows, same max-height expand/collapse mechanic as .is2-card.
 * Deliberately does NOT copy .is2-card-detail-inner's border-top-on-open
 * rule, though — that separates a card's own header from its detail
 * content, but every accordion row here already has its own top hairline
 * from the row-to-row divider, so a second border directly under an open
 * header read as a redundant, misplaced divider rather than an
 * intentional second one (caught in review — see the CSS comment on
 * .st2-accordion-detail-inner). Everywhere else reuses established
 * patterns exactly: .cd2-section cards, .specd-tone-header-style section
 * headers, pill buttons, <specd-toggle-row> for every on/off setting.
 */
const meta: Meta = {
  title: 'Redesign/SettingsTab',
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

// Settings isn't a tab-bar tab — it's the header's own gear icon (specd-settings
// event) — so no tab is marked active here; the shell is shown for wayfinding
// continuity only, matching how the real plugin still shows the tab bar behind
// the settings panel.
const shell = () => html`
  <specd-app-header name="Pulse" showrefresh showexport showsettings></specd-app-header>
  <specd-tab-bar tabs=${TABS_JSON}></specd-tab-bar>
`;

const ICO_KEY = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>`;
const ICO_CODE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
const ICO_LIB = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
const ICO_METRICS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`;
const ICO_RULES = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h10M4 18h16"/></svg>`;
const ICO_HISTORY = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>`;
const ICO_CHANGELOG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`;
const ICO_MENU_DOTS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>`;
const ICO_DOWNLOAD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
const ICO_DIAMOND = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>`;
const ICO_TARGET = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8M12 8v8"/></svg>`;

/** Toggle a .st2-accordion-row's .open class and animate its detail's
 * max-height — direct reuse of the Issues card mechanic (toggleCard), see
 * that story's own comment for the measured-height + padding-transition
 * reasoning this depends on. */
function toggleAccordion(e: Event) {
  const header = e.currentTarget as HTMLElement;
  const row = header.closest('.st2-accordion-row');
  if (!row) return;
  const detail = row.querySelector<HTMLElement>('.st2-accordion-detail');
  const inner = row.querySelector<HTMLElement>('.st2-accordion-detail-inner');
  const opening = row.classList.toggle('open');
  if (!detail || !inner) return;
  detail.style.maxHeight = opening ? `${inner.scrollHeight}px` : '0px';
}

/** Pre-opened accordions (Claude AI, in this story) need their max-height
 * converted from the CSS "none" fallback to a real pixel value on mount —
 * same reasoning as primeOpenCards for Issues cards. */
function primeOpenAccordions(root: ParentNode) {
  root.querySelectorAll<HTMLElement>('.st2-accordion-row.open').forEach((row) => {
    const detail = row.querySelector<HTMLElement>('.st2-accordion-detail');
    const inner = row.querySelector<HTMLElement>('.st2-accordion-detail-inner');
    if (!detail || !inner) return;
    detail.style.maxHeight = `${inner.scrollHeight}px`;
  });
}

function toggleResetConfirm(e: Event) {
  const btn = e.currentTarget as HTMLElement;
  const card = btn.closest('.st2-danger-card');
  card?.querySelector('.st2-reset-step-1')?.classList.add('hidden');
  card?.querySelector('.st2-reset-step-2')?.classList.remove('hidden');
}

export const PluginView: Story = {
  name: 'Plugin View (Settings)',
  render: () => html`
    <div class="plugin-wrap">
      ${shell()}
      <div class="plugin-scroll">

        <!-- Figma API -->
        <div class="cd2-section" style="margin-top:14px;">
          <div class="cd2-section-head"><div class="cd2-section-title-row tone-violet"><span class="cd2-section-icon">${unsafeSVG(ICO_KEY)}</span><div class="cd2-section-title">Figma API</div></div></div>
          <div class="cd2-section-body">
            <div class="st2-account-row">
              <div class="st2-account-avatar">👤</div>
              <div class="st2-account-info">
                <div class="st2-account-name">Will Gray</div>
                <div class="st2-account-meta">will@specd.tools · Expires Dec 2025</div>
              </div>
              <specd-button variant="pill-danger" size="sm" label="Disconnect"></specd-button>
            </div>
          </div>
        </div>

        <!-- What this unlocks (Figma API) -->
        <div class="cd2-section">
          <div class="cd2-section-head"><div class="cd2-section-title-row"><div class="cd2-section-title">What this unlocks</div></div></div>
          <div class="cd2-section-body" style="padding-top:2px;padding-bottom:2px;">
            <div class="st2-capability-row on"><span class="st2-capability-icon">✓</span><span class="st2-capability-text">Shared plugin data code link detection</span></div>
            <div class="st2-capability-row on"><span class="st2-capability-icon">✓</span><span class="st2-capability-text">Documentation link analysis</span></div>
            <div class="st2-capability-row on"><span class="st2-capability-icon">✓</span><span class="st2-capability-text">Validated code links via REST API</span></div>
            <div class="st2-capability-row off"><span class="st2-capability-icon">○</span><span class="st2-capability-text">Library Analytics (Enterprise only)</span></div>
            <div class="st2-capability-row off"><span class="st2-capability-icon">○</span><span class="st2-capability-text">Figma Code Connect verification</span></div>
          </div>
        </div>

        <!-- Grouped accordion list -->
        <div class="cd2-section">
          <div class="st2-accordion-list">

            <!-- Code Connect setup -->
            <div class="st2-accordion-row">
              <button class="st2-accordion-header" @click=${toggleAccordion}>
                <span class="st2-accordion-icon">${unsafeSVG(ICO_CODE)}</span>
                <span class="st2-accordion-label">Code Connect setup</span>
                <svg class="st2-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <div class="st2-accordion-detail"><div class="st2-accordion-detail-inner">
                <p style="font-size:11px;color:var(--text-muted);line-height:1.55;margin:0 0 10px;">Connect your component library to Figma Code Connect to validate code links and detect component-code mismatches during audits.</p>
                <pre style="background:var(--color-neutral-tint);padding:8px 10px;border-radius:6px;font-size:11px;font-family:var(--font-mono);margin:0 0 10px;overflow-x:auto;">npx @figma/code-connect connect</pre>
                <specd-button variant="pill-ghost" size="sm" label="Open Code Connect docs ↗" full></specd-button>
              </div></div>
            </div>

            <!-- Claude AI — starts open -->
            <div class="st2-accordion-row open">
              <button class="st2-accordion-header" @click=${toggleAccordion}>
                <span class="st2-accordion-icon" style="color:var(--warning-dark);">✨</span>
                <span class="st2-accordion-label">Claude AI</span>
                <svg class="st2-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <div class="st2-accordion-detail"><div class="st2-accordion-detail-inner">
                <div class="st2-account-row" style="margin-bottom:10px;">
                  <div class="st2-account-avatar">✨</div>
                  <div class="st2-account-info">
                    <div class="st2-account-name">Claude API</div>
                    <div class="st2-account-meta" style="font-family:var(--font-mono);">sk-ant-••••7f2a</div>
                  </div>
                  <specd-button variant="pill-danger" size="sm" label="Disconnect"></specd-button>
                </div>
                <p style="font-size:11px;color:var(--text-muted);line-height:1.55;margin:0;">Used for AI-powered description generation and component analysis. Your key is stored locally in Figma and never shared.</p>
              </div></div>
            </div>

            <!-- Supporting Libraries -->
            <div class="st2-accordion-row">
              <button class="st2-accordion-header" @click=${toggleAccordion}>
                <span class="st2-accordion-icon">${unsafeSVG(ICO_LIB)}</span>
                <span class="st2-accordion-label">Supporting Libraries</span>
                <svg class="st2-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <div class="st2-accordion-detail"><div class="st2-accordion-detail-inner">
                <p style="font-size:11px;color:var(--text-muted);line-height:1.55;margin:0 0 10px;">Paste a full Figma file URL or just the file key. Pulse includes variables from approved libraries when suggesting token fixes.</p>
                <specd-input placeholder="Library name (e.g. Brand Tokens)" style="width:100%;display:block;margin-bottom:6px;"></specd-input>
                <specd-input placeholder="Figma URL or file key" style="width:100%;display:block;margin-bottom:10px;"></specd-input>
                <specd-button variant="pill-primary" size="sm" label="+ Add library" full></specd-button>
                <div style="margin-top:4px;">
                  <div class="st2-lib-row">
                    <div class="st2-lib-icon">${unsafeSVG(ICO_DIAMOND)}</div>
                    <div style="flex:1;min-width:0;">
                      <div class="st2-lib-name">Acme Design Tokens</div>
                      <div class="st2-lib-meta">124 variables used</div>
                    </div>
                    <specd-button variant="pill-ghost" size="sm" label="Remove"></specd-button>
                  </div>
                  <div class="st2-lib-row">
                    <div class="st2-lib-icon green">${unsafeSVG(ICO_TARGET)}</div>
                    <div style="flex:1;min-width:0;">
                      <div class="st2-lib-name">Brand Primitives</div>
                      <div class="st2-lib-meta">88 variables used</div>
                    </div>
                    <specd-button variant="pill-ghost" size="sm" label="Remove"></specd-button>
                  </div>
                </div>
              </div></div>
            </div>

            <!-- Report Metrics -->
            <div class="st2-accordion-row">
              <button class="st2-accordion-header" @click=${toggleAccordion}>
                <span class="st2-accordion-icon">${unsafeSVG(ICO_METRICS)}</span>
                <span class="st2-accordion-label">Report Metrics</span>
                <svg class="st2-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <div class="st2-accordion-detail"><div class="st2-accordion-detail-inner">
                <div style="font-size:11px;color:var(--text-muted);line-height:1.5;margin:0 0 10px;">Choose which metrics appear in the health score overview. At least one must remain enabled.</div>
                <specd-toggle-row label="Descriptions" checked style="width:100%;"></specd-toggle-row>
                <specd-toggle-row label="Variable Coverage" checked style="width:100%;"></specd-toggle-row>
                <specd-toggle-row label="Typography Styles" checked style="width:100%;"></specd-toggle-row>
                <specd-toggle-row label="Doc Links" checked style="width:100%;"></specd-toggle-row>
                <specd-toggle-row label="Dev Status" checked style="width:100%;"></specd-toggle-row>
                <specd-toggle-row label="Untracked Changes" checked style="width:100%;"></specd-toggle-row>
                <specd-toggle-row label="Code Links" checked style="width:100%;"></specd-toggle-row>
                <specd-toggle-row label="Storybook Sync" checked style="width:100%;"></specd-toggle-row>
                <specd-toggle-row label="Library Freshness" checked style="width:100%;"></specd-toggle-row>
                <specd-toggle-row label="Dev Mode: Completed (Org/Enterprise only)" style="width:100%;"></specd-toggle-row>
              </div></div>
            </div>

            <!-- Variable Rules -->
            <div class="st2-accordion-row">
              <button class="st2-accordion-header" @click=${toggleAccordion}>
                <span class="st2-accordion-icon">${unsafeSVG(ICO_RULES)}</span>
                <span class="st2-accordion-label">Variable Rules</span>
                <svg class="st2-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <div class="st2-accordion-detail"><div class="st2-accordion-detail-inner">
                <div style="display:flex;justify-content:flex-end;margin-bottom:8px;">
                  <specd-button variant="pill-ghost" size="sm" label="Load presets"></specd-button>
                </div>
                <div style="font-size:11px;color:var(--text-muted);line-height:1.5;margin:0 0 10px;">
                  Define rules that tell Pulse which variable collection to use when it finds a raw value. Rules with OR conditions fire if <em>any</em> condition matches.
                </div>
                <div class="st2-rule-card">
                  <div class="st2-rule-header">
                    <specd-tag label="Color" intent="info"></specd-tag>
                    <span class="st2-rule-title">Brand colours → Semantic Tokens</span>
                    <button class="st2-rule-menu-btn">${unsafeSVG(ICO_MENU_DOTS)}</button>
                  </div>
                  <div class="st2-rule-condition"><span class="st2-rule-condition-label">If</span><span class="st2-rule-condition-value">fill</span><span class="st2-rule-joiner">matches</span><span class="st2-rule-condition-value">#0C1F3F, #B8FF57, #3B82F6</span></div>
                  <div class="st2-rule-target"><span class="st2-rule-target-label">Use</span><span class="st2-rule-target-value">semantic/color</span><span class="st2-rule-target-lib">Acme DS</span></div>
                </div>
                <div class="st2-rule-card">
                  <div class="st2-rule-header">
                    <specd-tag label="Spacing" intent="warn"></specd-tag>
                    <span class="st2-rule-title">Spacing → Primitives</span>
                    <button class="st2-rule-menu-btn">${unsafeSVG(ICO_MENU_DOTS)}</button>
                  </div>
                  <div class="st2-rule-condition"><span class="st2-rule-condition-label">If</span><span class="st2-rule-condition-value">padding</span><span class="st2-rule-joiner">or</span><span class="st2-rule-condition-value">gap</span><span class="st2-rule-joiner">is set</span></div>
                  <div class="st2-rule-target"><span class="st2-rule-target-label">Use</span><span class="st2-rule-target-value">primitives/spacing</span><span class="st2-rule-target-lib">Acme DS</span></div>
                </div>
                <specd-button variant="pill-primary" size="sm" label="+ Add rule" full style="margin-top:10px;"></specd-button>
              </div></div>
            </div>

            <!-- Scan history -->
            <div class="st2-accordion-row">
              <button class="st2-accordion-header" @click=${toggleAccordion}>
                <span class="st2-accordion-icon">${unsafeSVG(ICO_HISTORY)}</span>
                <span class="st2-accordion-label">Scan history</span>
                <svg class="st2-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <div class="st2-accordion-detail"><div class="st2-accordion-detail-inner">
                <div style="font-family:var(--font-mono);font-size:9.5px;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-subtle);margin-bottom:6px;">Score trend · 3 scans recorded</div>
                <specd-sparkline values="[74,81,87]" width="280" height="40" intent="positive" style="display:block;margin-bottom:6px;"></specd-sparkline>
                <div class="st2-scan-row">
                  <div style="flex:1;min-width:0;"><div class="st2-scan-date">May 19, 9:41 AM</div><div class="st2-scan-meta">152 components</div></div>
                  <div class="st2-scan-score-wrap"><span class="cx2-score green" style="font-size:14px;">87</span><span class="st2-scan-delta up">↑ 6</span></div>
                  <button class="st2-scan-export-btn" title="Export this scan as JSON">${unsafeSVG(ICO_DOWNLOAD)}</button>
                </div>
                <div class="st2-scan-row">
                  <div style="flex:1;min-width:0;"><div class="st2-scan-date">May 12, 3:15 PM</div><div class="st2-scan-meta">149 components</div></div>
                  <div class="st2-scan-score-wrap"><span class="cx2-score green" style="font-size:14px;">81</span><span class="st2-scan-delta up">↑ 7</span></div>
                  <button class="st2-scan-export-btn" title="Export this scan as JSON">${unsafeSVG(ICO_DOWNLOAD)}</button>
                </div>
                <div class="st2-scan-row">
                  <div style="flex:1;min-width:0;"><div class="st2-scan-date">Apr 28, 11:02 AM</div><div class="st2-scan-meta">143 components</div></div>
                  <div class="st2-scan-score-wrap"><span class="cx2-score amber" style="font-size:14px;">74</span><span class="st2-scan-delta flat">—</span></div>
                  <button class="st2-scan-export-btn" title="Export this scan as JSON">${unsafeSVG(ICO_DOWNLOAD)}</button>
                </div>
              </div></div>
            </div>

            <!-- Change history -->
            <div class="st2-accordion-row">
              <button class="st2-accordion-header" @click=${toggleAccordion}>
                <span class="st2-accordion-icon">${unsafeSVG(ICO_CHANGELOG)}</span>
                <span class="st2-accordion-label">Change history</span>
                <svg class="st2-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <div class="st2-accordion-detail"><div class="st2-accordion-detail-inner">
                <p style="font-size:11px;color:var(--text-subtle);line-height:1.55;margin:0;">No changes recorded yet — applied fixes will appear here as an exportable audit trail.</p>
              </div></div>
            </div>

          </div>
        </div>

        <!-- Scan Options -->
        <div class="cd2-section">
          <div class="cd2-section-head"><div class="cd2-section-title-row"><div class="cd2-section-title">Scan Options</div></div></div>
          <div class="cd2-section-body">
            <specd-toggle-row label="Include component sets" checked style="width:100%;"></specd-toggle-row>
            <specd-toggle-row label="Include private components" hint="_name or .name prefixed layers" style="width:100%;"></specd-toggle-row>
            <specd-toggle-row label="Ignore hidden layers" hint="Hidden layers don't affect rendered output" checked style="width:100%;"></specd-toggle-row>
            <specd-toggle-row label="Include local library" hint="Treat this file's own variables as approved tokens" checked style="width:100%;"></specd-toggle-row>
          </div>
        </div>

        <!-- Report Appearance -->
        <div class="cd2-section">
          <div class="cd2-section-head"><div class="cd2-section-title-row"><div class="cd2-section-title">Report Appearance</div></div></div>
          <div class="cd2-section-body">
            <div class="st2-color-row" style="margin-bottom:12px;">
              <div>
                <div class="cd2-status-title" style="font-size:12.5px;">Accent colour</div>
                <div style="font-size:10.5px;color:var(--text-muted);margin-top:1px;">Used in the canvas report</div>
              </div>
              <div class="st2-color-swatch-group">
                <div class="st2-color-swatch" style="background:#1652D6;"><input type="color" value="#1652D6" /></div>
                <span class="st2-color-hex">#1652D6</span>
              </div>
            </div>
            <specd-toggle-row label="Canvas credit footer" checked style="width:100%;"></specd-toggle-row>
          </div>
        </div>

        <!-- About -->
        <div class="cd2-section">
          <div class="cd2-section-head"><div class="cd2-section-title-row"><div class="cd2-section-title">About</div></div></div>
          <div class="cd2-section-body">
            <div class="st2-about">
              <div class="st2-about-name">Pulse by Specd</div>
              <div class="st2-about-meta">Design system audit tool · v1.4.2<br />Built by <a href="#">Specd.tools</a></div>
            </div>
          </div>
        </div>

        <!-- Replay onboarding -->
        <div class="cd2-section">
          <div class="cd2-section-body" style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
            <div>
              <div class="cd2-status-title" style="font-size:12.5px;">Replay setup guide</div>
              <div style="font-size:11px;color:var(--text-muted);margin-top:1px;">Re-open the onboarding flow to add or update connections.</div>
            </div>
            <specd-button variant="pill-ghost" size="sm" label="Replay"></specd-button>
          </div>
        </div>

        <!-- Danger zone -->
        <div class="cd2-section-head" style="padding:4px 16px 8px;"><div class="cd2-section-title-row tone-negative"><div class="cd2-section-title">Danger zone</div></div></div>
        <div class="st2-danger-card">
          <p class="st2-danger-copy">Wipes every stored setting — PAT, Anthropic key, connected libraries, variable rules, last scan, scan history, ignored issues. The plugin reopens like a fresh install. This cannot be undone.</p>
          <div class="st2-reset-step-1">
            <specd-button variant="pill-danger" full label="Reset Pulse…" @click=${toggleResetConfirm}></specd-button>
          </div>
          <div class="st2-reset-step-2 hidden">
            <div style="font-size:11px;color:var(--text);line-height:1.55;margin-bottom:8px;">Type <strong>RESET</strong> to confirm:</div>
            <specd-input placeholder="RESET" style="width:100%;display:block;margin-bottom:8px;"></specd-input>
            <div style="display:flex;gap:6px;">
              <specd-button variant="pill-ghost" size="sm" label="Cancel" style="flex:1;"></specd-button>
              <specd-button variant="pill-danger" size="sm" label="Permanently reset" style="flex:1;" disabled></specd-button>
            </div>
          </div>
        </div>

        <div style="height:16px;"></div>
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    primeOpenAccordions(canvasElement);
  },
};
