import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/Input/SpecdInput.js';
import '../../components/Chip/SpecdChip.js';
import '../../components/Button/SpecdButton.js';
import '../../components/AiPill/SpecdAiPill.js';
import '../../components/PropFixRow/SpecdPropFixRow.js';
import '../../components/ColorSwatch/SpecdColorSwatch.js';

/**
 * REDESIGN — Phase 1, Issues tab.
 *
 * - Landing screen kept structurally as-is (already matches Apple's
 *   hero-choice pattern well) with generous-spacing polish.
 * - Browse cards: progressive tag disclosure (Stripe "one headline, detail
 *   on demand") — was 2-5 tags rendered simultaneously per card; now one
 *   primary tag + a quiet "+N" count, full tag list + fix rows reveal on
 *   click with a real height/opacity transition (Apple deference — chrome
 *   doesn't compete with the data until you ask for it).
 * - Every current feature preserved: severity grouping, search/filter bar,
 *   AI pills, fix-row apply flow, jump-to-component. Nothing removed.
 */
const meta: Meta = {
  title: 'Redesign/IssuesTab',
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

const shell = (active = 'issues') => html`
  <specd-app-header name="Pulse" showrefresh showexport showsettings></specd-app-header>
  <specd-tab-bar tabs=${TABS_JSON} active=${active}></specd-tab-bar>
`;

const DIAMOND_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>`;
const CHEVRON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
const JUMP_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17L17 7M8 7h9v9"/></svg>`;
const SPARKLE_SVG = `<svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path d="M15.75 12C15.9498 12 16.1308 12.1186 16.209 12.3027L16.8809 13.8691L18.4473 14.541C18.6314 14.6192 18.75 14.8002 18.75 15C18.75 15.1998 18.6314 15.3808 18.4473 15.459L16.8809 16.1309L16.209 17.6973C16.1308 17.8814 15.9498 18 15.75 18C15.5502 18 15.3692 17.8814 15.291 17.6973L14.6191 16.1309L13.0527 15.459C12.8686 15.3808 12.75 15.1998 12.75 15C12.75 14.8002 12.8686 14.6192 13.0527 14.541L14.6191 13.8691L15.291 12.3027C15.3692 12.1186 15.5502 12 15.75 12Z"/></svg>`;

/** Toggle the `.open` class on the ancestor `.is2-card` when its header row
 * is clicked. Bound natively via Lit's @click — not a <script> tag. */
function toggleCard(e: Event) {
  const header = e.currentTarget as HTMLElement;
  const card = header.closest('.is2-card');
  if (!card) return;
  const detail = card.querySelector<HTMLElement>('.is2-card-detail');
  const inner = card.querySelector<HTMLElement>('.is2-card-detail-inner');
  const opening = card.classList.toggle('open');
  if (!detail || !inner) return;
  if (opening) {
    // scrollHeight reflects the inner content's full natural height even
    // while the outer .is2-card-detail is clipped by max-height:0/overflow
    // hidden — that's what lets this animate to the right height without
    // guessing a fixed value.
    detail.style.maxHeight = `${inner.scrollHeight}px`;
  } else {
    detail.style.maxHeight = '0px';
  }
}

/** Cards that start pre-opened (`class="is2-card open"` in markup, before
 * any click has happened) render via the CSS fallback rule
 * `.is2-card.open .is2-card-detail { max-height: none }` — fine for the very
 * first paint, but "none" is not an interpolable value. If it's still the
 * operative value the first time a user closes that card, mixing it with
 * the inline-pixel value the close handler sets produces a cascade the
 * transition engine can't animate — it just snaps instead of easing closed
 * (this is what caused the reported "opens don't animate" asymmetry: the
 * very same ambiguity was happening on open too, just less noticeably).
 * Fix: immediately after mount, convert every pre-opened card's max-height
 * from the CSS "none" fallback to a real measured pixel value, so every
 * toggle from that point on — open or close — is a clean number-to-number
 * transition. The CSS fallback still does its job for the one frame before
 * this runs. */
function primeOpenCards(root: ParentNode) {
  root.querySelectorAll<HTMLElement>('.is2-card.open').forEach((card) => {
    const detail = card.querySelector<HTMLElement>('.is2-card-detail');
    const inner = card.querySelector<HTMLElement>('.is2-card-detail-inner');
    if (!detail || !inner) return;
    detail.style.maxHeight = `${inner.scrollHeight}px`;
  });
}

export const Landing: Story = {
  name: 'Landing (What would you like to do?)',
  render: () => html`
    <div class="plugin-wrap">
      ${shell()}
      <div class="issues-landing">
        <div class="issues-landing-header">
          <span class="t-label">Issues</span>
          <h2 class="t-heading">What would you like to do?</h2>
        </div>
        <div class="issues-landing-grid">
          <button class="issues-landing-card issues-landing-card-dark">
            <div class="issues-landing-card-top">
              <div class="issues-landing-card-icon">${unsafeSVG(SPARKLE_SVG)}</div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div class="issues-landing-card-body">
              <div class="issues-landing-card-title">Quick-Fix Issues</div>
              <div class="issues-landing-card-sub">Apply variable updates and component fixes with just one click. Auto-fix will guide you through the available fixes, update on bulk or fix issues one-by-one.</div>
              <div class="issues-landing-count issues-landing-count-lime">33 fixable</div>
            </div>
          </button>
          <button class="issues-landing-card issues-landing-card-light">
            <div class="issues-landing-card-top">
              <div class="issues-landing-card-icon"><svg viewBox="0 0 20 20" fill="none"><path d="M16 15.502C16.2769 15.502 16.4998 15.7251 16.5 16.002C16.5 16.2789 16.277 16.502 16 16.502H4C3.72302 16.502 3.5 16.2789 3.5 16.002C3.5002 15.7251 3.72314 15.502 4 15.502H16ZM11 11.502C11.2769 11.502 11.4998 11.7251 11.5 12.002C11.5 12.2789 11.277 12.502 11 12.502H4C3.72302 12.502 3.5 12.2789 3.5 12.002C3.5002 11.7251 3.72314 11.502 4 11.502H11ZM16 7.50195C16.2769 7.50195 16.4998 7.72514 16.5 8.00195C16.5 8.27894 16.277 8.50195 16 8.50195H4C3.72302 8.50195 3.5 8.27894 3.5 8.00195C3.5002 7.72514 3.72314 7.50195 4 7.50195H16ZM11 3.50195C11.2769 3.50195 11.4998 3.72514 11.5 4.00195C11.5 4.27894 11.277 4.50195 11 4.50195H4C3.72302 4.50195 3.5 4.27894 3.5 4.00195C3.5002 3.72514 3.72314 3.50195 4 3.50195H11Z" fill="currentColor"/></svg></div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div class="issues-landing-card-body">
              <div class="issues-landing-card-title">Browse all issues</div>
              <div class="issues-landing-card-sub">Filter and search issues by type, severity or component name. A larger overview to review, fix and understand all your issues in one place.</div>
              <div class="issues-landing-count issues-landing-count-blue">47 total</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  `,
};

export const Browse: Story = {
  name: 'Browse (progressive tag disclosure)',
  render: () => html`
    <div class="plugin-wrap">
      ${shell()}
      <div class="plugin-scroll">

        <!-- Sticky top bar — unchanged structure, tidied spacing -->
        <div class="issues-sticky-top">
          <div class="issues-action-row">
            <button class="issues-back-btn">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back
            </button>
            <div style="flex:1;"></div>
            <specd-ai-pill label="Quick-Fix"></specd-ai-pill>
          </div>
          <div class="issues-page-title">Browse all issues</div>
          <div class="issues-filter-bar">
            <div class="issues-search-row">
              <div style="flex:1;"><specd-input search placeholder="Search component name…" style="width:100%; display:block;"></specd-input></div>
            </div>
            <div class="issues-chips-row">
              <specd-chip label="All" count="47" active data-filter="all"></specd-chip>
              <specd-chip label="Critical" count="2" intent="negative" data-filter="critical"></specd-chip>
              <specd-chip label="Warnings" count="31" intent="warning" data-filter="warning"></specd-chip>
              <specd-chip label="Advisory" count="14" data-filter="info"></specd-chip>
            </div>
          </div>
        </div>

        <!-- 2-column grid at 560px+: opened cards break out to full width
             (see .is2-card.open in components.css) so the wider canvas
             actually gets used instead of leaving dead space either side of
             narrow single-column text rows. -->
        <div class="is2-grid">

        <!-- CRITICAL -->
        <div class="severity-header">
          <div class="severity-dot critical"></div>
          <div class="severity-title">Critical</div>
          <div class="severity-count critical">2</div>
        </div>

        <div class="is2-card">
          <div class="is2-card-top" @click=${toggleCard}>
            <div class="is2-card-icon">${unsafeSVG(DIAMOND_SVG)}</div>
            <div class="is2-card-body">
              <div class="is2-card-name">Button/Primary</div>
              <div class="is2-card-primary-tag">No description</div>
            </div>
            <span class="is2-card-more">+1</span>
            <span class="is2-card-chevron">${unsafeSVG(CHEVRON_SVG)}</span>
          </div>
          <div class="is2-card-detail"><div class="is2-card-detail-inner">
            <div class="is2-card-tags-full">
              <specd-chip label="No description" intent="negative"></specd-chip>
              <specd-chip label="Published"></specd-chip>
            </div>
            <div style="padding-top:12px;">
              <specd-button variant="pill-ghost" size="sm" label="Jump to component"></specd-button>
            </div>
          </div></div>
        </div>

        <!-- WARNINGS -->
        <div class="severity-header">
          <div class="severity-dot warning"></div>
          <div class="severity-title">Warnings</div>
          <div class="severity-count warning">31</div>
        </div>

        <div class="is2-card open">
          <div class="is2-card-top" @click=${toggleCard}>
            <div class="is2-card-icon">${unsafeSVG(DIAMOND_SVG)}</div>
            <div class="is2-card-body">
              <div class="is2-card-name">Input/Text</div>
              <div class="is2-card-primary-tag">Hard-coded values · 5</div>
            </div>
            <span class="is2-card-more">+1</span>
            <span class="is2-card-chevron">${unsafeSVG(CHEVRON_SVG)}</span>
          </div>
          <div class="is2-card-detail"><div class="is2-card-detail-inner">
            <div class="is2-card-tags-full" style="padding-bottom:4px;">
              <specd-chip label="HC colours" intent="warning"></specd-chip>
              <specd-chip label="HC spacing" intent="warning"></specd-chip>
            </div>
            <div style="display:flex; flex-direction:column; gap:8px; padding-top:8px;">
              <specd-prop-fix-row prop="fill" layer="Input/Text/Default" attr="background fill" count="1 layer">
                <div class="prop-fix-slot">
                  <span class="prop-fix-current">
                    <specd-color-swatch color="#5B3DF0" sm></specd-color-swatch>
                    <span style="font-family:var(--font-mono);font-size:10px;color:var(--text);">#5B3DF0</span>
                  </span>
                  <span class="prop-fix-arrow">→</span>
                  <span class="prop-fix-suggest">
                    <specd-color-swatch color="#5B3DF0" sm></specd-color-swatch>
                    <button class="prop-fix-layer-link">color/brand/violet-500</button>
                    <span class="prop-fix-match-tag exact">EXACT</span>
                  </span>
                  <specd-button variant="pill-ghost" size="sm" label="Apply"></specd-button>
                </div>
              </specd-prop-fix-row>
              <specd-prop-fix-row prop="spacing" layer="Input/Text/Default" attr="padding horizontal" count="3 layers">
                <div class="prop-fix-slot">
                  <span class="prop-fix-current"><span style="font-family:var(--font-mono);font-size:10px;color:var(--text);">12px</span></span>
                  <span class="prop-fix-arrow">→</span>
                  <span class="prop-fix-suggest"><button class="prop-fix-layer-link">spacing/300</button></span>
                  <button class="prop-fix-btn applied">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Applied
                  </button>
                </div>
              </specd-prop-fix-row>
            </div>
          </div></div>
        </div>

        <div class="is2-card">
          <div class="is2-card-top" @click=${toggleCard}>
            <div class="is2-card-icon">${unsafeSVG(DIAMOND_SVG)}</div>
            <div class="is2-card-body">
              <div class="is2-card-name">Modal/Dialog</div>
              <div class="is2-card-primary-tag">Stale publish</div>
            </div>
            <span class="is2-card-chevron">${unsafeSVG(CHEVRON_SVG)}</span>
          </div>
          <div class="is2-card-detail"><div class="is2-card-detail-inner">
            <div class="is2-card-tags-full">
              <specd-chip label="Stale publish" intent="warning"></specd-chip>
            </div>
            <div style="padding-top:12px;">
              <specd-button variant="pill-ghost" size="sm" label="Jump to component"></specd-button>
            </div>
          </div></div>
        </div>

        <!-- ADVISORY -->
        <div class="severity-header">
          <div class="severity-dot info"></div>
          <div class="severity-title">Advisory</div>
          <div class="severity-count info">14</div>
        </div>

        <div class="is2-card">
          <div class="is2-card-top" @click=${toggleCard}>
            <div class="is2-card-icon">${unsafeSVG(DIAMOND_SVG)}</div>
            <div class="is2-card-body">
              <div class="is2-card-name">Nav/Header</div>
              <div class="is2-card-primary-tag">No doc link</div>
            </div>
            <span class="is2-card-chevron">${unsafeSVG(CHEVRON_SVG)}</span>
          </div>
          <div class="is2-card-detail"><div class="is2-card-detail-inner">
            <div class="is2-card-tags-full">
              <specd-chip label="No doc link"></specd-chip>
            </div>
            <div style="padding-top:12px;">
              <specd-button variant="pill-ghost" size="sm" label="Jump to component"></specd-button>
            </div>
          </div></div>
        </div>

        </div>

        <div style="height:16px;"></div>
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    primeOpenCards(canvasElement);
  },
};
