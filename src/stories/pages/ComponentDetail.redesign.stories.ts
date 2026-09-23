import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/DrillHeader/SpecdDrillHeader.js';
import '../../components/StageBar/SpecdStageBar.js';
import '../../components/Button/SpecdButton.js';
import '../../components/ScoreRing/SpecdScoreRing.js';
import '../../components/DiffRow/SpecdDiffRow.js';
import '../../components/Segmented/SpecdSegmented.js';
import '../../components/Drawer/SpecdDrawer.js';

/**
 * REDESIGN — Phase 2, Component Detail — full ground-up rebuild.
 *
 * The first pass (previous version of this file) ported pulse-beta's real
 * component-drilldown page structure, which was the right call, but carried
 * its CSS over almost unchanged — flat 0-radius sections, hardcoded 6-7px
 * corners, a static unanimated score block, box-shadow hover lifts, and
 * `.tool-tiles`/`.tool-tile` that turned out to have NO real CSS in this
 * design system at all (that class lived only in pulse-beta's own separate
 * stylesheet). Colors resolved correctly through the legacy --blue-*
 * aliases, so it "worked," but next to .is2-card/.ov2-breakdown/.cx2-row it
 * read as a different, older app — exactly the feedback received.
 *
 * This version keeps the STRUCTURE (hero → Tools → Health checks sidebar+
 * detail → Canvas docs → Variant descriptions → stage bar; Preview was
 * removed per explicit direction — that feature is being dropped) but
 * every visual detail is now drawn from this redesign's own system:
 * - Score: <specd-score-ring> (same component Overview uses — one score
 *   treatment across the whole app, not a second "block" style)
 * - Every section is a real soft card: --radius-surface, 1px hairline
 *   border, var(--surface) background, matching .ov2-breakdown exactly
 * - Tool tiles: --radius-surface-sm cards with --radius-tile-sm concentric
 *   icon wells, hover shifts background + violet icon (no box-shadow lift)
 * - Health-check panel switches cross-fade (same keyframes as the Health
 *   Breakdown segmented control)
 * - Current/After editors use the real <specd-diff-row> component (already
 *   in this design system, just re-themed to match) instead of hand-rolled
 *   divs
 * - Every raw SVG gets an explicit width/height rule — the earlier
 *   "oversized icon" bug happened once already this project from skipping
 *   this, and .tool-tile icons had zero sizing at all before this rebuild
 */
const meta: Meta = {
  title: 'Redesign/ComponentDetail',
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
  <specd-tab-bar tabs=${TABS_JSON} active="components"></specd-tab-bar>
`;

const ICO_GEN_MD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/></svg>`;
const ICO_EXPORT_MD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>`;
const ICO_ADD_CANVAS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18"/></svg>`;
const ICO_JUMP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4M15 21h4a2 2 0 0 0 2-2v-4"/></svg>`;
const ICO_TOOLS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
const ICO_HEALTH = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
const ICO_SPARKLE = `<svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path d="M10.5 2a.75.75 0 0 1 .74.62l.62 3.44 3.44.62a.75.75 0 0 1 0 1.48l-3.44.62-.62 3.44a.75.75 0 0 1-1.48 0l-.62-3.44-3.44-.62a.75.75 0 0 1 0-1.48l3.44-.62.62-3.44A.75.75 0 0 1 10.5 2Z"/></svg>`;
const ICO_EXTERNAL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
const ICO_EDIT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`;
const ICO_TEMPLATE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>`;

type CheckState = 'pass' | 'warn' | 'fail';
type Check = { key: string; label: string; state: CheckState };

const CHECKS: Check[] = [
  { key: 'description', label: 'Description',       state: 'fail' },
  { key: 'docLinks',     label: 'Doc link',          state: 'fail' },
  { key: 'tokens',       label: 'Variable coverage', state: 'warn' },
  { key: 'devStatus',    label: 'Ready for dev',     state: 'pass' },
  { key: 'publish',      label: 'Publish status',    state: 'pass' },
  { key: 'storybook',    label: 'Storybook sync',    state: 'pass' },
  { key: 'codeConnect',  label: 'Code links',        state: 'warn' },
];
const PASS_COUNT = CHECKS.filter((c) => c.state === 'pass').length;
const PASS_RATIO = PASS_COUNT / CHECKS.length;
/** Health Checks heading colour reflects the real aggregate pass rate —
 * not a fixed colour — so it means the same thing the score tier does,
 * rather than being decoration. */
const HEALTH_TONE = PASS_RATIO >= 0.85 ? 'tone-positive' : PASS_RATIO >= 0.5 ? 'tone-warning' : 'tone-negative';

function checkTab(c: Check, active: boolean) {
  return html`
    <button class="cd2-check-tab ${active ? 'active' : ''}" data-check-key=${c.key} @click=${onCheckTabClick}>
      <span class="cd2-check-dot ${c.state}"></span>
      <span class="cd2-check-label">${c.label}</span>
    </button>
  `;
}

/** Swap which check's detail panel is shown — the panel that becomes
 * visible re-plays its .cd2-panel-in fade (removing then re-adding the
 * element isn't needed; toggling `.hidden` off is enough to re-trigger a
 * CSS animation on that element in all evergreen browsers). */
function onCheckTabClick(e: Event) {
  const btn = e.currentTarget as HTMLElement;
  const key = btn.dataset.checkKey;
  const root = btn.closest('.cd2-checks');
  if (!root || !key) return;
  root.querySelectorAll('.cd2-check-tab').forEach((t) => t.classList.toggle('active', t === btn));
  root.querySelectorAll('.cd2-check-detail').forEach((d) => {
    d.classList.toggle('hidden', (d as HTMLElement).dataset.checkKey !== key);
  });
}

/** Opens the one shared <specd-drawer> for the 3 "focused editor" checks
 * (shapes F/G/H — Variable coverage, Storybook sync, Code links).
 *
 * Ordering matters here and is easy to get wrong (did, the first time):
 * SpecdDrawer captures its slotted content on connect and keeps it
 * DETACHED until `open` flips true, at which point its own `updated()`
 * re-parents everything into the freshly-rendered .drawer-body/
 * .drawer-footer — but that re-render is scheduled asynchronously (Lit
 * property setters just call requestUpdate(), they don't render
 * synchronously). Toggling which body/footer block is visible has to
 * happen AFTER that re-parenting, not before — querying for the blocks
 * before `updateComplete` resolves finds nothing (they're still
 * detached), which silently no-ops the toggle and leaves whichever
 * block was visible in the original static markup stuck forever,
 * regardless of which check was actually clicked. */
async function openCheckDrawer(key: string, title: string) {
  const drawer = document.querySelector('specd-drawer') as HTMLElement & { open: boolean; title: string; updateComplete: Promise<boolean> };
  if (!drawer) return;
  drawer.title = title;
  drawer.open = true;
  await drawer.updateComplete;
  drawer.querySelectorAll('.cd2-drawer-body-block, .cd2-drawer-footer-block').forEach((b) => {
    b.classList.toggle('hidden', (b as HTMLElement).dataset.drawerKey !== key);
  });
}

/** Shape F micro-interaction: applying one suggested variable is a small,
 * independent decision — mark just that row done, don't touch the rest
 * of the list. This is the whole point of the itemized-list shape: each
 * row is its own commit, not one big all-or-nothing action. */
function applyVariableItem(e: Event) {
  const btn = e.currentTarget as HTMLButtonElement;
  btn.textContent = '✓ Applied';
  btn.classList.add('applied');
}

/** Shape G micro-interaction: picking a different match. */
function selectMatchItem(e: Event) {
  const item = e.currentTarget as HTMLElement;
  const list = item.closest('.cd2-match-list');
  list?.querySelectorAll('.cd2-match-item').forEach((i) => i.classList.toggle('selected', i === item));
}

export const PluginView: Story = {
  name: 'Plugin View (Input/Text)',
  render: () => html`
    <div class="plugin-wrap">
      ${shell()}
      <div class="plugin-scroll">

        <specd-drill-header back-label="Back" parent="Components" crumb="Input/Text"></specd-drill-header>

        <div class="cd2-hero">
          <specd-score-ring score="38" tier="poor" size="76"></specd-score-ring>
          <div class="cd2-titleblock">
            <!-- Jump to canvas moved here from the actions row below — the
                 single most-used action on this page reads better pinned
                 top-right of the card than buried behind two other buttons
                 further down. -->
            <div class="cd2-hero-top-row">
              <div class="cd2-eyebrow">COMPONENT SET &middot; 3 VARIANTS</div>
              <button class="cd2-jump-btn sm">${unsafeSVG(ICO_JUMP)} Jump to canvas</button>
            </div>
            <div class="cd2-title">Input/Text</div>
            <div class="cd2-path">
              <span class="pill">Design System</span>
              <span>&#9656;</span>
              <span class="pill">Forms</span>
              <span class="muted" style="margin-left:4px;">180 &times; 40</span>
            </div>
            <div class="cd2-actions">
              <specd-button variant="pill-ghost" size="sm" label="Open in Dev Mode"></specd-button>
            </div>
          </div>
        </div>

        <div class="cd2-section">
          <div class="cd2-section-head"><div class="cd2-section-title-row tone-violet"><span class="cd2-section-icon">${unsafeSVG(ICO_TOOLS)}</span><div class="cd2-section-title">Tools</div></div></div>
          <div class="cd2-section-body">
            <div class="cd2-tools">
              <button class="cd2-tool" data-tip="Generate this component's AI-readable Markdown spec and copy it to your clipboard.">
                <span class="cd2-tool-icon">${unsafeSVG(ICO_GEN_MD)}</span>
                <span class="cd2-tool-label">Generate .md</span>
              </button>
              <button class="cd2-tool" data-tip="Open the full .md spec in a window to copy or save it.">
                <span class="cd2-tool-icon">${unsafeSVG(ICO_EXPORT_MD)}</span>
                <span class="cd2-tool-label">Export .md</span>
              </button>
              <button class="cd2-tool" data-tip="Generate a formatted documentation frame 80px to the right of this component on the canvas.">
                <span class="cd2-tool-icon">${unsafeSVG(ICO_ADD_CANVAS)}</span>
                <span class="cd2-tool-label">Add to canvas</span>
              </button>
            </div>
          </div>
        </div>

        <div class="cd2-section">
          <div class="cd2-section-head"><div class="cd2-section-title-row ${HEALTH_TONE}"><span class="cd2-section-icon">${unsafeSVG(ICO_HEALTH)}</span><div class="cd2-section-title">Health checks</div></div><div class="cd2-section-note">${PASS_COUNT} / ${CHECKS.length} passing &middot; tap a check to edit</div></div>
          <div class="cd2-section-body">
            <div class="cd2-checks">
              <div class="cd2-check-tabs">
                ${CHECKS.map((c, i) => checkTab(c, i === 0))}
              </div>
              <div class="cd2-check-body">
                <div class="cd2-check-detail" data-check-key="description">
                  <!-- True empty state: nothing written yet. Generate drafts one from
                       the component's props/variants; Apply template swaps this
                       single field for the library's doc-template drawer (shape
                       B2 — see docTemplate body block below). Both actions belong
                       with the field they act on, not in the general Tools grid —
                       they were tried there first and read as disconnected from
                       what they actually do. Styled to match the small
                       .cd2-edit-trigger buttons every other check card uses,
                       not the square Tools tile look. -->
                  <div class="cd2-desc-actions">
                    <button class="cd2-edit-trigger sm">${unsafeSVG(ICO_SPARKLE)} Generate</button>
                    <button class="cd2-edit-trigger sm" @click=${() => openCheckDrawer('docTemplate', 'Apply doc template · Description')}>${unsafeSVG(ICO_TEMPLATE)} Apply template</button>
                  </div>
                  <specd-diff-row field="Description" before-empty="No description set"
                    after="" multiline>
                  </specd-diff-row>
                </div>
                <div class="cd2-check-detail hidden" data-check-key="docLinks">
                  <!-- No Generate here — only a human knows the right doc URL. -->
                  <specd-diff-row field="Documentation link" before-empty="No link"
                    after="">
                  </specd-diff-row>
                </div>
                <!-- Shape F: aggregate + itemized list. Playback stays a quiet
                     summary — the real decision-making (5 individual apply/skip
                     calls) needs more room than a status card, so "Edit" opens
                     the shared drawer instead of expanding in place. -->
                <div class="cd2-check-detail hidden" data-check-key="tokens">
                  <div class="cd2-status-card">
                    <div class="cd2-status-head">
                      <div class="cd2-status-head-main"><span class="cd2-check-dot warn"></span><span class="cd2-status-title">42% variable coverage</span></div>
                      <button class="cd2-edit-trigger sm" @click=${() => openCheckDrawer('tokens', 'Variable coverage · Input/Text')}>${unsafeSVG(ICO_EDIT)} Review &amp; apply</button>
                    </div>
                    <p class="cd2-status-desc">5 hard-coded values found.</p>
                  </div>
                </div>
                <!-- Shape D: enum/status. Playback is the pill; editing is a
                     same-space inline picker — a 4-way status has no need for
                     a whole drawer. -->
                <div class="cd2-check-detail hidden" data-check-key="devStatus">
                  <div class="cd2-status-card">
                    <div class="cd2-status-head"><div class="cd2-status-head-main"><span class="cd2-check-dot pass"></span><span class="cd2-status-title">Ready for Dev</span></div></div>
                    <p class="cd2-status-desc">Dev Mode status is set. Developers can hand this off without checking with design first.</p>
                    <specd-segmented options='[{"value":"none","label":"Not set"},{"value":"progress","label":"In progress"},{"value":"ready","label":"Ready for dev"},{"value":"complete","label":"Completed"}]' value="ready"></specd-segmented>
                  </div>
                </div>
                <!-- Shape E: external-action flag. No in-app edit exists —
                     publishing happens in Figma's own Assets panel — so the
                     "edit" affordance is a direct, primary-weight CTA reminder
                     rather than a quiet secondary link, per the explicit ask. -->
                <div class="cd2-check-detail hidden" data-check-key="publish">
                  <div class="cd2-status-card">
                    <div class="cd2-status-head"><div class="cd2-status-head-main"><span class="cd2-check-dot pass"></span><span class="cd2-status-title">Published with local changes</span></div></div>
                    <p class="cd2-status-desc">There are local changes that haven't been published. Publish from Figma's Assets panel so consumers get the update.</p>
                    <div class="cd2-status-actions">
                      <button class="cd2-jump-btn sm primary">${unsafeSVG(ICO_EXTERNAL)} Publish in Figma</button>
                      <button class="cd2-jump-btn sm">${unsafeSVG(ICO_JUMP)} Jump to canvas</button>
                    </div>
                  </div>
                </div>
                <!-- Shape G: search & match. Playback shows the current match
                     inline (per "should playback the information"); changing
                     it means browsing/searching a potentially long story list,
                     which is exactly the "needs more room" case for a drawer. -->
                <div class="cd2-check-detail hidden" data-check-key="storybook">
                  <div class="cd2-status-card">
                    <div class="cd2-status-head">
                      <div class="cd2-status-head-main"><span class="cd2-check-dot pass"></span><span class="cd2-status-title">Matched to a Storybook story</span></div>
                      <button class="cd2-edit-trigger sm" @click=${() => openCheckDrawer('storybook', 'Match Storybook story')}>${unsafeSVG(ICO_EDIT)} Change match</button>
                    </div>
                    <p class="cd2-status-desc">Story: <strong style="color:var(--text);">Forms/Input/Text</strong> <span class="sb-pill sb-pill-good">Linked ✓</span></p>
                  </div>
                </div>
                <!-- Shape H: structured multi-step mapping. Playback is a
                     one-line summary of the current state (here: nothing
                     mapped yet); editing opens the drawer's guided flow. -->
                <div class="cd2-check-detail hidden" data-check-key="codeConnect">
                  <div class="cd2-status-card">
                    <div class="cd2-status-head">
                      <div class="cd2-status-head-main"><span class="cd2-check-dot warn"></span><span class="cd2-status-title">Code Connect: unknown</span></div>
                      <button class="cd2-edit-trigger sm" @click=${() => openCheckDrawer('codeConnect', 'Code Connect mapping')}>${unsafeSVG(ICO_EDIT)} Add mapping</button>
                    </div>
                    <p class="cd2-status-desc">No confident code link found.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cd2-canvas-docs">
          <span class="cd2-canvas-docs-dot"></span>
          <span class="cd2-canvas-docs-label">Canvas docs</span>
          <span class="cd2-canvas-docs-detail">Not documented on canvas</span>
          <specd-button variant="pill-ghost" size="sm" label="Mark as documented"></specd-button>
          <specd-button variant="pill-primary" size="sm" label="Generate on canvas"></specd-button>
        </div>


        <div class="cd2-section" style="margin-bottom:16px;">
          <div class="cd2-section-head"><div class="cd2-section-title-row tone-violet"><span class="cd2-section-icon">${unsafeSVG(ICO_SPARKLE)}</span><div class="cd2-section-title">Variant descriptions</div></div><div class="cd2-section-note">2 variants &middot; 0 written</div></div>
          <div class="cd2-section-body gap-sm">
            <div style="display:flex;gap:8px;align-items:center;">
              <specd-button variant="pill-ghost" size="sm" label="✨ Generate all"></specd-button>
              <span class="muted" style="font-size:10px;">A one-liner per variant from the set name + prop values. Additive to the set description.</span>
            </div>
            <div>
              <div class="cd2-variant-row">
                <span class="cd2-variant-dot empty">○</span>
                <span class="cd2-variant-sig">state=Default</span>
                <textarea class="cd2-variant-input" rows="1" placeholder="one-line note…"></textarea>
              </div>
              <div class="cd2-variant-row">
                <span class="cd2-variant-dot empty">○</span>
                <span class="cd2-variant-sig">state=Error</span>
                <textarea class="cd2-variant-input" rows="1" placeholder="one-line note…"></textarea>
              </div>
            </div>
            <div style="display:flex;gap:8px;justify-content:flex-end;">
              <specd-button variant="pill-ghost" size="sm" label="Clear all"></specd-button>
              <specd-button variant="pill-primary" size="sm" label="Apply all 2"></specd-button>
            </div>
          </div>
        </div>

      </div>

      <specd-stage-bar count="0" hint="Walk the checks or edit above"></specd-stage-bar>

      <!-- One shared drawer for all 3 "focused editor" checks (shapes F/G/H).
           Body content is 3 pre-rendered blocks, only one visible at a time —
           see openCheckDrawer() above. -->
      <specd-drawer>
        <div class="cd2-drawer-body-block" data-drawer-key="tokens">
          <p class="cd2-drawer-intro">5 hard-coded values found on this component. Apply the suggested variable, or leave it and fix manually later.</p>
          <div class="cd2-vc-list">
            <div class="cd2-vc-item">
              <div class="cd2-vc-swatch" style="background:#E5E7EB;"></div>
              <div class="cd2-vc-info"><div class="cd2-vc-prop">Fill &middot; #E5E7EB</div><div class="cd2-vc-suggestion">&rarr; --color-border-subtle</div></div>
              <button class="cd2-vc-apply" @click=${applyVariableItem}>Apply</button>
            </div>
            <div class="cd2-vc-item">
              <div class="cd2-vc-swatch" style="background:#111827;"></div>
              <div class="cd2-vc-info"><div class="cd2-vc-prop">Text &middot; #111827</div><div class="cd2-vc-suggestion">&rarr; --color-ink</div></div>
              <button class="cd2-vc-apply" @click=${applyVariableItem}>Apply</button>
            </div>
            <div class="cd2-vc-item">
              <div class="cd2-vc-swatch" style="background:#fff;"></div>
              <div class="cd2-vc-info"><div class="cd2-vc-prop">Padding &middot; 12px</div><div class="cd2-vc-suggestion">&rarr; --space-3</div></div>
              <button class="cd2-vc-apply" @click=${applyVariableItem}>Apply</button>
            </div>
            <div class="cd2-vc-item">
              <div class="cd2-vc-swatch" style="background:#6E56F5;"></div>
              <div class="cd2-vc-info"><div class="cd2-vc-prop">Border &middot; #6E56F5</div><div class="cd2-vc-suggestion">&rarr; --color-signal-violet</div></div>
              <button class="cd2-vc-apply" @click=${applyVariableItem}>Apply</button>
            </div>
            <div class="cd2-vc-item">
              <div class="cd2-vc-swatch" style="background:#F3F4F6;"></div>
              <div class="cd2-vc-info"><div class="cd2-vc-prop">Fill (disabled) &middot; #F3F4F6</div><div class="cd2-vc-suggestion">&rarr; --color-neutral-tint</div></div>
              <button class="cd2-vc-apply" @click=${applyVariableItem}>Apply</button>
            </div>
          </div>
        </div>
        <div class="cd2-drawer-body-block hidden" data-drawer-key="storybook">
          <input class="cd2-drawer-search" placeholder="Search stories…" />
          <div class="cd2-match-list">
            <div class="cd2-match-item selected" @click=${selectMatchItem}><div class="cd2-match-name">Forms/Input/Text</div><span class="cd2-match-score">Current match</span></div>
            <div class="cd2-match-item" @click=${selectMatchItem}><div class="cd2-match-name">Forms/Input/Password</div><span class="cd2-match-score">61% match</span></div>
            <div class="cd2-match-item" @click=${selectMatchItem}><div class="cd2-match-name">Forms/Textarea</div><span class="cd2-match-score">48% match</span></div>
          </div>
        </div>
        <div class="cd2-drawer-body-block hidden" data-drawer-key="codeConnect">
          <p class="cd2-drawer-intro">Map this component to its implementation so developers can find the real code.</p>
          <div class="cd2-step-list">
            <div class="cd2-step done">
              <div class="cd2-step-num">&#10003;</div>
              <div class="cd2-step-body"><div class="cd2-step-label">Repository</div><div class="cd2-step-value">acme/design-system</div></div>
            </div>
            <div class="cd2-step">
              <div class="cd2-step-num">2</div>
              <div class="cd2-step-body">
                <div class="cd2-step-label">Component file</div>
                <input class="cd2-drawer-search" placeholder="Search components…" style="margin-bottom:0;" />
              </div>
            </div>
            <div class="cd2-step">
              <div class="cd2-step-num">3</div>
              <div class="cd2-step-body">
                <div class="cd2-step-label">Map props</div>
                <div class="cd2-prop-map-row"><span class="cd2-prop-map-figma">variant</span><span class="cd2-prop-map-arrow">&rarr;</span><span class="cd2-prop-map-code">variant</span></div>
                <div class="cd2-prop-map-row"><span class="cd2-prop-map-figma">state</span><span class="cd2-prop-map-arrow">&rarr;</span><span class="cd2-prop-map-code">disabled</span></div>
              </div>
            </div>
          </div>
        </div>
        <!-- Shape B2: multi-field templated text — one field per doc-template
             heading, opened from the Tools tile above. Same drawer, same
             mechanism as F/G/H, different content shape (plain fields, not a
             list/search/steps) — this is the concrete case that motivated
             splitting "text" into single-field (inline, shape B) vs
             multi-field (drawer, shape B2) instead of one catch-all shape. -->
        <div class="cd2-drawer-body-block hidden" data-drawer-key="docTemplate">
          <p class="cd2-drawer-intro">This library's doc template has 4 sections. Fill in what you can — Generate all can draft the rest from the component's name, props, and variants.</p>
          <div class="cd2-template-fields">
            <div class="cd2-template-field">
              <div class="cd2-template-field-label">Purpose</div>
              <textarea rows="2" placeholder="What is this component for?"></textarea>
            </div>
            <div class="cd2-template-field">
              <div class="cd2-template-field-label">When to use</div>
              <textarea rows="2" placeholder="When should someone reach for this?"></textarea>
            </div>
            <div class="cd2-template-field">
              <div class="cd2-template-field-label">Accessibility notes</div>
              <textarea rows="2" placeholder="Keyboard, screen reader, contrast considerations…"></textarea>
            </div>
            <div class="cd2-template-field">
              <div class="cd2-template-field-label">Related components</div>
              <textarea rows="2" placeholder="e.g. Input/Textarea, Input/Select"></textarea>
            </div>
          </div>
        </div>
        <div slot="footer" class="cd2-drawer-footer-block" data-drawer-key="tokens">
          <specd-button variant="pill-ghost" size="sm" label="Close"></specd-button>
          <div style="flex:1;"></div>
          <specd-button variant="pill-primary" size="sm" label="Apply all 5"></specd-button>
        </div>
        <div slot="footer" class="cd2-drawer-footer-block hidden" data-drawer-key="storybook">
          <specd-button variant="pill-ghost" size="sm" label="Cancel"></specd-button>
          <div style="flex:1;"></div>
          <specd-button variant="pill-primary" size="sm" label="Save match"></specd-button>
        </div>
        <div slot="footer" class="cd2-drawer-footer-block hidden" data-drawer-key="codeConnect">
          <specd-button variant="pill-ghost" size="sm" label="Cancel"></specd-button>
          <div style="flex:1;"></div>
          <specd-button variant="pill-primary" size="sm" label="Save mapping"></specd-button>
        </div>
        <div slot="footer" class="cd2-drawer-footer-block hidden" data-drawer-key="docTemplate">
          <specd-button variant="pill-ghost" size="sm" label="Cancel"></specd-button>
          <div style="flex:1;"></div>
          <specd-button variant="pill-ghost" size="sm" label="✨ Generate all"></specd-button>
          <specd-button variant="pill-primary" size="sm" label="Save description"></specd-button>
        </div>
      </specd-drawer>
    </div>
  `,
};
