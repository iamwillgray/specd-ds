import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
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
import '../../components/Segmented/SpecdSegmented.js';

/**
 * REDESIGN — Phase 1, Overview tab.
 *
 * Applies "ground up" IA changes validated with the user before building:
 * - Apple progressive disclosure: one hero moment (score + trend), everything
 *   else behind a segmented "Health Breakdown" switcher — one panel visible
 *   at a time instead of 4 stacked blocks (coverage rows, readiness tiles x2,
 *   freshness, health map all used to render simultaneously).
 * - Stripe generous whitespace: hero gets real breathing room; the old 4-tile
 *   stat grid becomes a quiet secondary strip.
 * - Every current feature/state is preserved — see the four story exports
 *   below (PluginView, Empty, Scanning, StaleData) — nothing was dropped,
 *   only reorganized. This is a high-fidelity static mockup (per validated
 *   scope), not yet wired to real ui.ts logic.
 */
const meta: Meta = {
  title: 'Redesign/OverviewTab',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

// Each tab defines both an outline `icon` (default) and a filled `iconActive`
// (shown only while that tab is active) — HIG's outline/fill pairing for
// selected states, a second signal beyond the pill background color. Kept
// deliberately simple at 12px: closed shapes (Overview, Storybook, Library)
// become solid `fill="currentColor"` silhouettes; the Issues circle drops
// its exclamation glyph when filled (illegible at 12px anyway); Components
// fills just its top diamond and boldens the two chevron strokes below;
// Variables' three hairline rules become solid rounded bars. No SVG masks/
// cutouts anywhere — those need per-instance unique IDs to be safe, and
// these icons get duplicated across many story/mockup instances.
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
  <specd-tab-bar tabs=${TABS_JSON} active="overview"></specd-tab-bar>
`;

const SEGMENT_ICON_ARROW = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>`;
const ICO_HEALTH_BREAKDOWN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-8 4 16 2-8h6"/></svg>`;
const ICO_REPORT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
const ICO_CSV = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`;
const ICO_JSON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1M16 3h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1"/></svg>`;

/** Swaps which .ov2-breakdown-panel is visible AND animates the shared
 * `.ov2-breakdown-body` wrapper's height to match — replaces the old fixed
 * `min-height: 360px` (calibrated to the tallest panel, Health Map/Coverage)
 * which left short panels like Freshness with a lot of dead space below
 * their content. Bound via Lit's native @specd-change event handler (NOT a
 * raw <script> tag — script elements inserted through template cloning/
 * innerHTML are inert in browsers and would silently never run). */
function handleBreakdownChange(e: CustomEvent<{ value: string }>) {
  const root = (e.currentTarget as HTMLElement).closest('.plugin-wrap');
  if (!root) return;
  const scroller = root.querySelector<HTMLElement>('.plugin-scroll');
  const body = root.querySelector<HTMLElement>('.ov2-breakdown-body');
  // Measure BEFORE mutating anything — this is the actual on-screen height
  // the container is transitioning away from.
  const oldHeight = body?.getBoundingClientRect().height ?? 0;
  const oldScrollTop = scroller?.scrollTop ?? 0;

  root.querySelectorAll('.ov2-breakdown-panel').forEach((p) => {
    p.classList.toggle('hidden', p.getAttribute('data-panel') !== e.detail.value);
  });
  const activePanel = root.querySelector<HTMLElement>(`.ov2-breakdown-panel[data-panel="${e.detail.value}"]`);
  const newHeight = activePanel?.scrollHeight ?? oldHeight;
  if (body) body.style.height = `${newHeight}px`;

  /* Panels have genuinely different natural heights — Health Map's dot
   * grid renders far shorter than 7 detailed Coverage rows, for instance.
   * Switching to a shorter panel while scrolled down means the scroll
   * container's total scrollable height shrinks out from under the
   * current scroll position; left to the browser's own clamping, that
   * reads as "the page randomly scrolled up" (reported switching to
   * Health Map specifically, but it's really any panel-height-shrink past
   * the new max). Rather than trust the browser to land wherever the
   * clamp arithmetic happens to put it — timing that's already fragile
   * given .ov2-breakdown-body's own height change is itself animating —
   * explicitly compensate scrollTop by the exact height delta, smoothly,
   * in the same motion as the height change. Content above the breakdown
   * card doesn't move at all; only the space the card itself no longer
   * needs is reclaimed, deliberately, instead of an implicit clamp. */
  if (scroller) {
    const delta = newHeight - oldHeight;
    if (delta < 0) {
      scroller.scrollTo({ top: Math.max(0, oldScrollTop + delta), behavior: 'smooth' });
    }
  }
}

/** Same "prime the starting value" reasoning as issue cards: without this,
 * .ov2-breakdown-body's height starts as the CSS-computed "auto" (from no
 * inline height ever being set), and the very first segment switch would
 * try to transition from "auto" — not reliably animatable — instead of a
 * real measured pixel value. */
async function primeBreakdownHeight(root: ParentNode) {
  const body = root.querySelector<HTMLElement>('.ov2-breakdown-body');
  const activePanel = root.querySelector<HTMLElement>('.ov2-breakdown-panel:not(.hidden)');
  if (!body || !activePanel) return;
  // The active (Coverage) panel is full of <specd-cov-row> custom elements.
  // Measuring scrollHeight immediately after mount can run before those
  // elements have upgraded and rendered their content — Lit registers and
  // renders asynchronously, so an un-upgraded <specd-cov-row> contributes
  // ~0px to the measurement. That primed the wrapper's height far too short
  // on first load, clipping every row after the first (real bug, not just a
  // race in tests — confirmed via a genuine cold reload, no artificial
  // delay: measured 63px primed vs. 287px actual with all 7 rows present).
  // Fix: wait for the custom elements actually inside this panel to finish
  // their first render before measuring.
  const pending = Array.from(activePanel.querySelectorAll(':not(:defined)'))
    .map((el) => customElements.whenDefined(el.tagName.toLowerCase()));
  await Promise.all(pending);
  // whenDefined resolves once the class is registered, not once THIS
  // element has rendered — one more microtask/frame lets Lit's initial
  // render actually commit before we measure.
  await new Promise((resolve) => requestAnimationFrame(resolve));
  body.style.height = `${activePanel.scrollHeight}px`;
}

/** The hero block. `dynamic` (now the sole treatment in active use, via
 * the canonical PluginView story — promoted out of the former
 * "DynamicHero" experiment once the tier-tinted gradient + corner ripple
 * were signed off) wraps it in the .ov2-hero-dynamic gradient card plus
 * the .ov2-header-ripple corner ripple — see both comment blocks in
 * components.css for the full history and the contrast reasoning
 * (checked for real: --text-secondary passes 7.75–9:1 against every
 * tier's gradient stops; --text-muted was tried first and FAILED on 3 of
 * 8). `dynamic=false` (plain hero, no gradient/ripple) is kept as a
 * parameter rather than deleted — Empty/Scanning don't call renderHero at
 * all (they have their own dedicated empty/loading markup), but a future
 * story needing a quieter static hero shouldn't have to reconstruct one
 * from scratch. */
type HeroTier = 'positive' | 'warning' | 'negative' | 'advisory';
const TIER_CONTENT: Record<HeroTier, { score: number; ringTier: string; label: string; meta: string }> = {
  positive: { score: 92, ringTier: 'excellent', label: 'EXCELLENT', meta: '152 components · 6 issues' },
  warning:  { score: 68, ringTier: 'med',       label: 'FAIR',      meta: '152 components · 31 issues' },
  negative: { score: 34, ringTier: 'poor',      label: 'POOR',      meta: '152 components · 61 issues' },
  advisory: { score: 72, ringTier: 'good',      label: 'GOOD',      meta: '152 components · 47 issues' },
};

const renderHero = (dynamic: boolean, tier: HeroTier = 'positive') => {
  const c = TIER_CONTENT[tier];
  const hero = html`
    <div class="ov2-hero">
      <div class="ov2-hero-ring-wrap">
        <specd-score-ring score=${c.score} tier=${c.ringTier} size="120"></specd-score-ring>
      </div>
      <div class="ov2-hero-name">Acme DS</div>
      <div class="ov2-hero-meta">${c.meta}</div>
      <div class="ov2-hero-badges">
        <specd-health-tag tier=${c.ringTier} label=${c.label}></specd-health-tag>
        <specd-score-trend delta="+4" direction="up" meta="vs last scan · May 7"></specd-score-trend>
      </div>
    </div>
  `;
  const ripple = html`
    <div class="ov2-header-ripple" aria-hidden="true">
      <div class="circle xxlarge shade1"></div>
      <div class="circle xlarge shade2"></div>
      <div class="circle large shade3"></div>
      <div class="circle medium shade4"></div>
      <div class="circle small shade5"></div>
    </div>
  `;
  return dynamic
    ? html`<div class="ov2-hero-dynamic tier-${tier}">${ripple}${hero}</div>`
    : hero;
};

export const PluginView: Story = {
  name: 'Plugin View (populated)',
  render: () => html`
    <div class="plugin-wrap">
      ${shell()}
      <div class="plugin-scroll">

        <!-- HERO: score ring + identity + trend, in the tier-tinted
             drifting-gradient card with the corner ripple. Promoted from
             the former "DynamicHero" experiment story once the ripple
             treatment was signed off — see the .ov2-hero-dynamic and
             .ov2-header-ripple comment blocks in components.css for the
             full history/reasoning. -->
        ${renderHero(true)}

        <!-- Quiet secondary stat strip — was a heavy 4-tile grid -->
        <div class="ov2-stat-strip">
          <div class="ov2-stat"><div class="ov2-stat-num">152</div><div class="ov2-stat-label">Components</div></div>
          <div class="ov2-stat"><div class="ov2-stat-num">18</div><div class="ov2-stat-label">Sets</div></div>
          <div class="ov2-stat"><div class="ov2-stat-num">6</div><div class="ov2-stat-label">Pages</div></div>
          <div class="ov2-stat"><div class="ov2-stat-num" style="color:var(--color-error);">47</div><div class="ov2-stat-label">Issues</div></div>
        </div>

        <!-- Quiet inline stale-data notice (was a loud tinted banner) -->
        <div class="ov2-stale-notice">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></svg>
          Showing cached results from your last scan.
          <a href="#">Re-scan now</a>
        </div>

        <!-- HEALTH BREAKDOWN: segmented, one panel visible at a time.
             Folds what used to be 4 stacked blocks (coverage rows, two
             separate readiness tile-grids, freshness, health map) into a
             single card — same data, zero information lost, far less
             simultaneous visual weight. -->
        <div class="ov2-breakdown">
          <div class="ov2-breakdown-head">
            <!-- Scored section header (see DESIGN.md "Scored section headers") —
                 tone-positive here to match this story's sample data (92/EXCELLENT);
                 a real implementation should compute the tone from the actual
                 overall score tier, same as Component Detail's health-check
                 section header computes tone from PASS_RATIO. -->
            <div class="specd-tone-header tone-positive">
              <span class="specd-tone-header-icon">${unsafeSVG(ICO_HEALTH_BREAKDOWN)}</span>
              <span class="specd-tone-header-title">Health Breakdown</span>
            </div>
            <specd-segmented
              options='[{"value":"coverage","label":"Coverage"},{"value":"readiness","label":"Readiness"},{"value":"freshness","label":"Freshness"},{"value":"healthmap","label":"Health Map"}]'
              value="coverage"
              @specd-change=${handleBreakdownChange}
            ></specd-segmented>
          </div>

          <div class="ov2-breakdown-body">
          <!-- Panel: Coverage -->
          <div class="ov2-breakdown-panel" data-panel="coverage">
            <p class="ov2-panel-hint">Token, description, and documentation coverage across the library. Tap <b>?</b> on any row for how it's measured.</p>
            <specd-cov-row label="Descriptions" pct="78" hint="Percentage of components with a non-empty description field set in Figma." .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h16M4 10h16M4 14h10"/></svg>'}></specd-cov-row>
            <specd-cov-row label="Doc Links" pct="45" hint="Percentage of components with a valid documentation link in their description or dev-mode links." .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'}></specd-cov-row>
            <specd-cov-row label="Variable Coverage" pct="63" hint="Percentage of fill, stroke, spacing, and typography properties bound to a variable or style instead of a hard-coded value." .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>'}></specd-cov-row>
            <specd-cov-row label="Untracked Changes" pct="12" hint="Percentage of published components with local edits that haven't been re-published to the library." .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-3.51-7.13"/><polyline points="21 4 21 10 15 10"/></svg>'}></specd-cov-row>
            <specd-cov-row label="Ready for Dev" pct="71" hint="Percentage of components with a Dev Mode status of Ready for Dev or Completed." .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'}></specd-cov-row>
            <specd-cov-row label="Storybook Sync" pct="32" hint="Percentage of components matched to a Storybook story by name, or with an existing Storybook doc link." .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'}></specd-cov-row>
            <specd-cov-row label="Code Links" pct="88" hint="Percentage of components with a verified Code Connect mapping to a source repo component." .icon=${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'}></specd-cov-row>
          </div>

          <!-- Panel: Readiness (merges the old 2x2 + 3-col tile grids) -->
          <div class="ov2-breakdown-panel hidden" data-panel="readiness">
            <p class="ov2-panel-hint">Component-level readiness for handoff and publishing. Tap a tile to jump to the filtered list.</p>
            <div class="ov2-readiness-grid">
              <specd-stat-tile-lg color="green" num="119" title="Descriptions" subtitle="33 missing" icon=${SEGMENT_ICON_ARROW}></specd-stat-tile-lg>
              <specd-stat-tile-lg color="red" num="84" title="Doc Links" subtitle="68 missing links" icon=${SEGMENT_ICON_ARROW}></specd-stat-tile-lg>
              <specd-stat-tile-lg color="amber" num="96" title="Variable Coverage" subtitle="56 hard-coded values" icon=${SEGMENT_ICON_ARROW}></specd-stat-tile-lg>
              <specd-stat-tile-lg color="amber" num="108" title="Dev Status" subtitle="44 without status" icon=${SEGMENT_ICON_ARROW}></specd-stat-tile-lg>
              <specd-stat-tile-lg color="green" num="134" title="Code Links" subtitle="linked" icon=${SEGMENT_ICON_ARROW}></specd-stat-tile-lg>
              <specd-stat-tile-lg color="green" num="141" title="Published" subtitle="current" icon=${SEGMENT_ICON_ARROW}></specd-stat-tile-lg>
              <specd-stat-tile-lg color="amber" num="18" title="Untracked" subtitle="changed locally" icon=${SEGMENT_ICON_ARROW}></specd-stat-tile-lg>
            </div>
          </div>

          <!-- Panel: Freshness -->
          <div class="ov2-breakdown-panel hidden" data-panel="freshness">
            <p class="ov2-panel-hint">Compares connected libraries' last-modified time to your latest scan. Last checked 2 minutes ago.</p>
            <div class="freshness-grid" style="margin:0;">
              <div class="freshness-tile ft-fresh"><div class="ft-num">92%</div><div class="ft-label">Fresh</div></div>
              <div class="freshness-tile"><div class="ft-num">12</div><div class="ft-label">Checked</div></div>
              <div class="freshness-tile ft-stale"><div class="ft-num">1</div><div class="ft-label">Outdated</div></div>
              <div class="freshness-list">
                <div class="freshness-row"><div><div class="lib-name">Acme Design Tokens</div><div style="font-size:10px;color:var(--text-muted);">Updated May 18, 2026, 4:02 PM</div></div><span class="lib-state fresh">Fresh</span></div>
                <div class="freshness-row"><div><div class="lib-name">Brand Primitives</div><div style="font-size:10px;color:var(--text-muted);">Updated May 19, 2026, 11:20 AM</div></div><span class="lib-state stale">Outdated</span></div>
              </div>
            </div>
          </div>

          <!-- Panel: Health Map -->
          <div class="ov2-breakdown-panel hidden" data-panel="healthmap">
            <div class="ov-health-top" style="margin-bottom:10px;">
              <div class="ov-health-legend">
                <span class="ov-health-legend-item"><span class="ov-health-legend-dot excellent"></span>Excellent</span>
                <span class="ov-health-legend-item"><span class="ov-health-legend-dot good"></span>Good</span>
                <span class="ov-health-legend-item"><span class="ov-health-legend-dot warn"></span>Warn</span>
                <span class="ov-health-legend-item"><span class="ov-health-legend-dot poor"></span>Poor</span>
              </div>
            </div>
            <div class="ov-health-grid">
              ${Array.from({length:120}).map((_,i)=>{
                const r = Math.random();
                const cls = r>0.65?'excellent':r>0.4?'good':r>0.25?'warn':r>0.05?'poor':'na';
                return html`<div class="hm-dot ${cls}"></div>`;
              })}
            </div>
          </div>
          </div>
        </div>

        <div style="height:8px;"></div>
      </div>

      <!-- Sticky action bar -->
      <div class="ov2-action-bar">
        <specd-button variant="primary" size="sm" label="↺ Re-scan"></specd-button>
        <div style="flex:1;"></div>
        <div class="ov2-export-group">
          <span class="ov2-export-label">Export</span>
          <specd-button variant="ghost" size="sm" label="Report" icon=${ICO_REPORT} cls="ov2-export-btn"></specd-button>
          <specd-button variant="ghost" size="sm" label="CSV" icon=${ICO_CSV} cls="ov2-export-btn"></specd-button>
          <specd-button variant="ghost" size="sm" label="JSON" icon=${ICO_JSON} cls="ov2-export-btn"></specd-button>
        </div>
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    await primeBreakdownHeight(canvasElement);
  },
};

/** Quick side-by-side of all 4 dynamic-hero tiers, stacked in one view —
 * for reviewing the gradient + contrast choices in one place rather than
 * flipping between 4 separate stories or hand-editing classes in devtools.
 * Each card uses different score/label content on purpose (rather than
 * the same "Acme DS · 72 · GOOD" repeated 4 times) so it reads like 4 real
 * libraries in different states, not 1 library re-skinned 4 times. */
export const DynamicHeroAllTiers: Story = {
  name: 'Dynamic hero — all tiers (comparison)',
  render: () => html`
    <div class="plugin-wrap" style="height: auto;">
      ${shell()}
      <div class="plugin-scroll" style="padding: 16px 0 24px;">
        ${(['positive', 'warning', 'negative', 'advisory'] as HeroTier[]).map(
          (tier) => html`
            <div style="margin: 0 12px 8px; font-family: var(--font-mono); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted);">
              tier-${tier}
            </div>
            ${renderHero(true, tier)}
            <div style="height: 8px;"></div>
          `
        )}
      </div>
    </div>
  `,
};

export const Empty: Story = {
  name: 'Empty (no scan yet)',
  render: () => html`
    <div class="plugin-wrap">
      ${shell()}
      <div class="ov2-empty">
        <div class="ov2-empty-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
        </div>
        <div class="ov2-empty-title">No scan yet</div>
        <div class="ov2-empty-desc">Run your first scan to see a health score, coverage breakdown, and every issue across your library.</div>
        <specd-button variant="primary" label="Run first scan"></specd-button>
      </div>
    </div>
  `,
};

export const Scanning: Story = {
  name: 'Scanning (in progress)',
  render: () => html`
    <div class="plugin-wrap">
      ${shell()}
      <div class="ov2-scanning">
        <div class="ov2-scanning-pct">64%</div>
        <div class="ov2-scanning-track"><div class="ov2-scanning-fill" style="width:64%;"></div></div>
        <div class="ov2-scanning-label">Scanning components…</div>
        <div class="ov2-scanning-component">Button/Primary/Large</div>
      </div>
    </div>
  `,
};
