import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/Input/SpecdInput.js';
import '../../components/Chip/SpecdChip.js';

/**
 * REDESIGN — Phase 2, Components tab.
 *
 * Every real column from ui.html/ui.ts is preserved — Component, Score,
 * Desc, Link, Tokens, Dev, Publish, Code, Storybook — nothing dropped. What
 * changes is the presentation: the old table was built dense (10-11px type,
 * 7px cell padding, sticky first column, mask-fade edge) for a 400px
 * canvas, and simply stretching it to 600px just left the same cramped
 * table with more blank margin either side — it didn't use the width for
 * anything. Instead this is a two-line card-row: name + score up top, a
 * wrapped strip of secondary indicator pills below. Desc+Link condense
 * into one "Docs" two-pill cell (same visual language as the existing
 * Storybook Name/Link match indicator, since both are simple present/
 * absent signals) and the per-row Jump action becomes a hover-reveal icon
 * instead of a permanent column — freeing real width for the rest.
 *
 * The real Audit ⇄ Storybook seg-toggle is preserved and functional: it
 * swaps which stat strip is visible per row (audit coverage stats vs.
 * story-match stats), matching ui.ts's real behaviour of swapping the
 * table's column set.
 */
const meta: Meta = {
  title: 'Redesign/ComponentsTab',
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
  <specd-tab-bar tabs=${TABS_JSON} active="components"></specd-tab-bar>
`;

const DIAMOND_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>`;
const JUMP_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17L17 7M8 7h9v9"/></svg>`;

/** Toggles the Audit ⇄ Storybook seg-control — swaps which `.cx2-row-stats`
 * strip is visible per row, matching the real ui.ts behaviour of swapping
 * the table's column set rather than just re-filtering rows. */
function toggleView(e: Event) {
  const btn = e.currentTarget as HTMLElement;
  const bar = btn.closest('.seg-toggle');
  if (!bar) return;
  bar.querySelectorAll('.seg-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  const view = btn.dataset.view;
  const list = bar.closest('.plugin-scroll')?.querySelector('.cx2-list');
  if (!list) return;
  list.querySelectorAll('.cx2-row-stats.audit').forEach((el) => el.classList.toggle('hidden', view !== 'audit'));
  list.querySelectorAll('.cx2-row-stats.storybook').forEach((el) => el.classList.toggle('hidden', view !== 'storybook'));
}

type Row = {
  name: string; meta: string; score: number; scoreTier: 'green' | 'amber' | 'red';
  desc: boolean; link: boolean; tokens: number;
  dev: 'ready' | 'progress' | 'none'; devLabel: string;
  pub: 'current' | 'changed' | 'unpub'; pubLabel: string;
  code: 'good' | 'warn' | 'bad' | 'muted'; codeLabel: string;
  sbName: boolean; sbLink: boolean;
};

const ROWS: Row[] = [
  { name: 'Button/Primary', meta: 'Design System · Buttons', score: 92, scoreTier: 'green',
    desc: true, link: true, tokens: 96,
    dev: 'ready', devLabel: 'Ready', pub: 'current', pubLabel: 'Current',
    code: 'good', codeLabel: 'Confirmed', sbName: true, sbLink: true },
  { name: 'Card/Default', meta: 'Design System · Surfaces', score: 71, scoreTier: 'amber',
    desc: false, link: false, tokens: 58,
    dev: 'progress', devLabel: 'In Progress', pub: 'current', pubLabel: 'Current',
    code: 'warn', codeLabel: 'Likely', sbName: true, sbLink: false },
  { name: 'Input/Text', meta: 'Design System · Forms', score: 64, scoreTier: 'amber',
    desc: true, link: false, tokens: 42,
    dev: 'ready', devLabel: 'Ready', pub: 'changed', pubLabel: 'Changed',
    code: 'muted', codeLabel: 'Unknown', sbName: true, sbLink: true },
  { name: 'Modal/Dialog', meta: 'Design System · Overlays', score: 38, scoreTier: 'red',
    desc: false, link: false, tokens: 30,
    dev: 'none', devLabel: 'Not Set', pub: 'unpub', pubLabel: 'Unpub',
    code: 'bad', codeLabel: 'None', sbName: false, sbLink: false },
  { name: 'Nav/Header', meta: 'Design System · Navigation', score: 80, scoreTier: 'green',
    desc: true, link: false, tokens: 88,
    dev: 'ready', devLabel: 'Ready', pub: 'current', pubLabel: 'Current',
    code: 'good', codeLabel: 'Confirmed', sbName: true, sbLink: true },
  { name: 'Badge/Status', meta: 'Design System · Indicators', score: 95, scoreTier: 'green',
    desc: true, link: true, tokens: 100,
    dev: 'ready', devLabel: 'Ready', pub: 'current', pubLabel: 'Current',
    code: 'good', codeLabel: 'Confirmed', sbName: true, sbLink: true },
  { name: 'Avatar/Default', meta: 'Design System · Media', score: 55, scoreTier: 'amber',
    desc: false, link: true, tokens: 61,
    dev: 'progress', devLabel: 'In Progress', pub: 'changed', pubLabel: 'Changed',
    code: 'warn', codeLabel: 'Likely', sbName: false, sbLink: false },
  { name: 'Tooltip/Default', meta: 'Design System · Overlays', score: 29, scoreTier: 'red',
    desc: false, link: false, tokens: 20,
    dev: 'none', devLabel: 'Not Set', pub: 'unpub', pubLabel: 'Unpub',
    code: 'bad', codeLabel: 'None', sbName: false, sbLink: false },
];

const codePillClass: Record<Row['code'], string> = {
  good: 'sb-pill-good', warn: 'sb-pill-warn', bad: 'sb-pill-bad', muted: 'sb-pill-muted',
};

const row = (r: Row) => html`
  <div class="cx2-row">
    <div class="cx2-row-top">
      <div class="cx2-icon">${unsafeSVG(DIAMOND_SVG)}</div>
      <div class="cx2-name-block">
        <div class="cx2-name">${r.name}</div>
        <div class="cx2-meta">${r.meta}</div>
      </div>
      <div class="cx2-score ${r.scoreTier}">${r.score}</div>
      <button class="cx2-jump" title="Jump to component">${unsafeSVG(JUMP_SVG)}</button>
    </div>
    <div class="cx2-row-stats audit">
      <span class="cx2-stat-label">Docs</span>
      <span class="sb-pill ${r.desc ? 'sb-pill-good' : 'sb-pill-bad'}">Desc ${r.desc ? '✓' : '✗'}</span>
      <span class="sb-pill ${r.link ? 'sb-pill-good' : 'sb-pill-bad'}">Link ${r.link ? '✓' : '✗'}</span>
      <span class="cx2-stat-label">Tokens</span>
      <span class="token-pct">${r.tokens}%</span>
      <span class="dev-chip ${r.dev}">${r.devLabel}</span>
      <span class="cx2-pub ${r.pub}">${r.pubLabel}</span>
      <span class="sb-pill ${codePillClass[r.code]}">Code · ${r.codeLabel}</span>
    </div>
    <div class="cx2-row-stats storybook hidden">
      <span class="cx2-stat-label">Story match</span>
      <div class="sb-cell">
        <span class="sb-pill ${r.sbName ? 'sb-pill-good' : 'sb-pill-bad'}">Name ${r.sbName ? '✓' : '✗'}</span>
        <span class="sb-pill ${r.sbLink ? 'sb-pill-good' : 'sb-pill-bad'}">Link ${r.sbLink ? '✓' : '✗'}</span>
      </div>
      <span class="cx2-stat-label">Doc link</span>
      <span class="sb-pill ${r.link ? 'sb-pill-good' : 'sb-pill-bad'}">${r.link ? 'Present' : 'Missing'}</span>
      <span class="cx2-stat-label">Code Connect</span>
      <span class="sb-pill ${codePillClass[r.code]}">${r.codeLabel}</span>
    </div>
  </div>
`;

export const PluginView: Story = {
  name: 'Plugin view (card-row list, was a dense table)',
  render: () => html`
    <div class="plugin-wrap">
      ${shell()}
      <div class="plugin-scroll">
        <div class="cx2-toolbar">
          <div class="cx2-toolbar-row">
            <div style="flex:1;"><specd-input search placeholder="Search components…" style="width:100%; display:block;"></specd-input></div>
            <div class="seg-toggle">
              <button class="seg-btn active" data-view="audit" @click=${toggleView}>Audit</button>
              <button class="seg-btn" data-view="storybook" @click=${toggleView}>Storybook</button>
            </div>
          </div>
          <div class="cx2-toolbar-row" style="justify-content:space-between;">
            <span class="cx2-count">152 components</span>
          </div>
          <div class="cx2-chips-row">
            <specd-chip label="All" count="152" active data-filter="all"></specd-chip>
            <specd-chip label="No description" data-filter="no-desc"></specd-chip>
            <specd-chip label="No doc link" data-filter="no-doc"></specd-chip>
            <specd-chip label="Hard-coded values" data-filter="hard-coded"></specd-chip>
            <specd-chip label="Not published" data-filter="not-pub"></specd-chip>
            <specd-chip label="No Storybook" data-filter="no-sb"></specd-chip>
          </div>
        </div>

        <div class="cx2-list">
          ${ROWS.map(row)}
        </div>
        <div style="height:16px;"></div>
      </div>
    </div>
  `,
};
