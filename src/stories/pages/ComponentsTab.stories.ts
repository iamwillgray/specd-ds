import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TemplateResult } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/Input/SpecdInput.js';
import '../../components/Segmented/SpecdSegmented.js';
import '../../components/Chip/SpecdChip.js';
import '../../components/JumpBtn/SpecdJumpBtn.js';
import '../../components/Button/SpecdButton.js';
import '../../components/Tag/SpecdTag.js';
import '../../components/HealthTag/SpecdHealthTag.js';
import '../../components/Badge/SpecdBadge.js';

const LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 48 48" fill="none"><rect x="17" y="24.2427" width="10.2426" height="10.2426" rx="2" transform="rotate(-45 17 24.2427)" fill="white"/><rect x="12.7071" y="24.101" width="16.1133" height="16.1133" rx="4.5" transform="rotate(-45 12.7071 24.101)" stroke="white" stroke-width="1.2"/><rect x="7.70711" y="23.9664" width="22.9942" height="23.0891" rx="7.5" transform="rotate(-45 7.70711 23.9664)" stroke="white" stroke-width="1.2"/></svg>`;
const JUMP_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17L17 7M8 7h9v9"/></svg>`;
const COMP_SVG = `<svg class="comp-name-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>`;

const meta: Meta = {
  title: 'Pages/ComponentsTab',
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
  <specd-tab-bar tabs=${TABS_JSON} active="components"></specd-tab-bar>
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
    <button class="tab-v2 active">
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

const componentsRawContent = () => html`
  <div class="plugin-scroll">

    <!-- Toolbar -->
    <div class="comp-toolbar">
      <input class="comp-search-input" placeholder="Search components…" />
      <div class="seg-toggle">
        <button class="seg-btn active">Audit</button>
        <button class="seg-btn">Storybook</button>
      </div>
    </div>

    <!-- Filter chips -->
    <div class="filter-chips-row">
      <span class="chip-v2 active">All <span class="chip-count">152</span></span>
      <span class="chip-v2">No description</span>
      <span class="chip-v2">No doc link</span>
      <span class="chip-v2">Hard-coded</span>
      <span class="chip-v2">Not published</span>
    </div>

    <!-- Table -->
    <div class="comp-table-wrap">
      <table class="comp-table">
        <thead>
          <tr>
            <th style="min-width:144px;">Component</th>
            <th class="center" style="min-width:44px;">Score</th>
            <th class="center" style="min-width:36px;">Issues</th>
            <th class="center" style="min-width:52px;">Tokens</th>
            <th class="center" style="min-width:38px;">Desc</th>
            <th class="center" style="min-width:38px;">Link</th>
            <th class="center" style="min-width:38px;">Pub</th>
            <th class="center" style="min-width:48px;">SB</th>
            <th class="center" style="min-width:72px;">Dev</th>
            <th style="min-width:28px;"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Button/Primary</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num green">85</span></td>
            <td style="text-align:center;"><span class="issues-chip">1</span></td>
            <td style="text-align:center;"><span class="token-pct">92%</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="sb-pill sb-pill-good">HIGH</span></td>
            <td style="text-align:center;"><span class="dev-chip ready">Ready</span></td>
            <td><button class="btn-jump-sm">${unsafeSVG(JUMP_SVG)}</button></td>
          </tr>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Card/Default</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num amber">71</span></td>
            <td style="text-align:center;"><span class="issues-chip">3</span></td>
            <td style="text-align:center;"><span class="token-pct">58%</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="sb-pill sb-pill-bad">NONE</span></td>
            <td style="text-align:center;"><span class="dev-chip review">In Review</span></td>
            <td><button class="btn-jump-sm">${unsafeSVG(JUMP_SVG)}</button></td>
          </tr>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Icon/Arrow</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num green">94</span></td>
            <td style="text-align:center;"><span class="issues-chip none">—</span></td>
            <td style="text-align:center;"><span class="token-pct">100%</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="sb-pill sb-pill-good">HIGH</span></td>
            <td style="text-align:center;"><span class="dev-chip ready">Ready</span></td>
            <td><button class="btn-jump-sm">${unsafeSVG(JUMP_SVG)}</button></td>
          </tr>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Input/Text</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num red">62</span></td>
            <td style="text-align:center;"><span class="issues-chip">5</span></td>
            <td style="text-align:center;"><span class="token-pct">41%</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="sb-pill sb-pill-bad">NONE</span></td>
            <td style="text-align:center;"><span class="dev-chip progress">In Progress</span></td>
            <td><button class="btn-jump-sm">${unsafeSVG(JUMP_SVG)}</button></td>
          </tr>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Modal/Dialog</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num amber">78</span></td>
            <td style="text-align:center;"><span class="issues-chip">2</span></td>
            <td style="text-align:center;"><span class="token-pct">71%</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="sb-pill sb-pill-good">MED</span></td>
            <td style="text-align:center;"><span class="dev-chip review">In Review</span></td>
            <td><button class="btn-jump-sm">${unsafeSVG(JUMP_SVG)}</button></td>
          </tr>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Nav/Header</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num green">88</span></td>
            <td style="text-align:center;"><span class="issues-chip none">—</span></td>
            <td style="text-align:center;"><span class="token-pct">89%</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="sb-pill sb-pill-good">HIGH</span></td>
            <td style="text-align:center;"><span class="dev-chip ready">Ready</span></td>
            <td><button class="btn-jump-sm">${unsafeSVG(JUMP_SVG)}</button></td>
          </tr>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Tag/Category</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num red">55</span></td>
            <td style="text-align:center;"><span class="issues-chip">7</span></td>
            <td style="text-align:center;"><span class="token-pct">38%</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="sb-pill sb-pill-bad">NONE</span></td>
            <td style="text-align:center;"><span class="dev-chip none">Not Set</span></td>
            <td><button class="btn-jump-sm">${unsafeSVG(JUMP_SVG)}</button></td>
          </tr>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Badge/Count</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num green">91</span></td>
            <td style="text-align:center;"><span class="issues-chip">1</span></td>
            <td style="text-align:center;"><span class="token-pct">96%</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="sb-pill sb-pill-good">HIGH</span></td>
            <td style="text-align:center;"><span class="dev-chip ready">Ready</span></td>
            <td><button class="btn-jump-sm">${unsafeSVG(JUMP_SVG)}</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-pagination">
      <span>Showing 1–8 of 152</span>
      <div style="display:flex; gap:6px;">
        <button class="btn-ghost btn-sm" style="opacity:0.4;">← Prev</button>
        <button class="btn-ghost btn-sm">Next →</button>
      </div>
    </div>

    <div style="height:16px;"></div>
  </div>
`;

const componentsComponentContent = () => html`
  <div class="plugin-scroll">

    <!-- Toolbar -->
    <div class="comp-toolbar">
      <div style="flex:1;"><specd-input search placeholder="Search components…" style="width:100%; display:block;"></specd-input></div>
      <specd-segmented
        options='[{"value":"audit","label":"Audit"},{"value":"storybook","label":"Storybook"}]'
        value="audit"
      ></specd-segmented>
    </div>

    <!-- Filter chips -->
    <div class="filter-chips-row">
      <specd-chip label="All" count="152" active data-filter="all"></specd-chip>
      <specd-chip label="No description" data-filter="no-description"></specd-chip>
      <specd-chip label="No doc link" data-filter="no-doc-link"></specd-chip>
      <specd-chip label="Hard-coded" data-filter="hard-coded"></specd-chip>
      <specd-chip label="Not published" data-filter="not-published"></specd-chip>
    </div>

    <!-- Table -->
    <div class="comp-table-wrap">
      <table class="comp-table">
        <thead>
          <tr>
            <th style="min-width:144px;">Component</th>
            <th class="center" style="min-width:44px;">Score</th>
            <th class="center" style="min-width:36px;">Issues</th>
            <th class="center" style="min-width:52px;">Tokens</th>
            <th class="center" style="min-width:38px;">Desc</th>
            <th class="center" style="min-width:38px;">Link</th>
            <th class="center" style="min-width:38px;">Pub</th>
            <th class="center" style="min-width:48px;">SB</th>
            <th class="center" style="min-width:72px;">Dev</th>
            <th style="min-width:28px;"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Button/Primary</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num green">85</span></td>
            <td style="text-align:center;"><specd-badge value="1" intent="warning"></specd-badge></td>
            <td style="text-align:center;"><span class="token-pct">92%</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><specd-tag label="✓ Matched" intent="success"></specd-tag></td>
            <td style="text-align:center;"><specd-tag label="Ready" intent="info"></specd-tag></td>
            <td><specd-jump-btn label="Jump"></specd-jump-btn></td>
          </tr>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Card/Default</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num amber">71</span></td>
            <td style="text-align:center;"><specd-badge value="3" intent="warning"></specd-badge></td>
            <td style="text-align:center;"><span class="token-pct">58%</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><specd-tag label="✗ Missing" intent="crit"></specd-tag></td>
            <td style="text-align:center;"><specd-tag label="In Review" intent="warn"></specd-tag></td>
            <td><specd-jump-btn label="Jump"></specd-jump-btn></td>
          </tr>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Icon/Arrow</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num green">94</span></td>
            <td style="text-align:center;"><span class="issues-chip none">—</span></td>
            <td style="text-align:center;"><span class="token-pct">100%</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><specd-tag label="✓ Matched" intent="success"></specd-tag></td>
            <td style="text-align:center;"><specd-tag label="Ready" intent="info"></specd-tag></td>
            <td><specd-jump-btn label="Jump"></specd-jump-btn></td>
          </tr>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Input/Text</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num red">62</span></td>
            <td style="text-align:center;"><specd-badge value="5" intent="negative"></specd-badge></td>
            <td style="text-align:center;"><span class="token-pct">41%</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><specd-tag label="✗ Missing" intent="crit"></specd-tag></td>
            <td style="text-align:center;"><specd-tag label="In Progress" intent="neutral"></specd-tag></td>
            <td><specd-jump-btn label="Jump"></specd-jump-btn></td>
          </tr>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Modal/Dialog</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num amber">78</span></td>
            <td style="text-align:center;"><specd-badge value="2" intent="warning"></specd-badge></td>
            <td style="text-align:center;"><span class="token-pct">71%</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><specd-tag label="— Partial" intent="neutral"></specd-tag></td>
            <td style="text-align:center;"><specd-tag label="In Review" intent="warn"></specd-tag></td>
            <td><specd-jump-btn label="Jump"></specd-jump-btn></td>
          </tr>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Nav/Header</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num green">88</span></td>
            <td style="text-align:center;"><span class="issues-chip none">—</span></td>
            <td style="text-align:center;"><span class="token-pct">89%</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><specd-tag label="✓ Matched" intent="success"></specd-tag></td>
            <td style="text-align:center;"><specd-tag label="Ready" intent="info"></specd-tag></td>
            <td><specd-jump-btn label="Jump"></specd-jump-btn></td>
          </tr>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Tag/Category</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num red">55</span></td>
            <td style="text-align:center;"><specd-badge value="7" intent="negative"></specd-badge></td>
            <td style="text-align:center;"><span class="token-pct">38%</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><span class="cap-icon off">○</span></td>
            <td style="text-align:center;"><specd-tag label="✗ Missing" intent="crit"></specd-tag></td>
            <td style="text-align:center;"><specd-tag label="—" intent="neutral"></specd-tag></td>
            <td><specd-jump-btn label="Jump"></specd-jump-btn></td>
          </tr>
          <tr>
            <td>
              <div class="comp-name-cell">
                ${unsafeSVG(COMP_SVG)}
                <span class="comp-name-text">Badge/Count</span>
              </div>
            </td>
            <td style="text-align:center;"><span class="score-num green">91</span></td>
            <td style="text-align:center;"><specd-badge value="1" intent="warning"></specd-badge></td>
            <td style="text-align:center;"><span class="token-pct">96%</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><span class="cap-icon on">✓</span></td>
            <td style="text-align:center;"><specd-tag label="✓ Matched" intent="success"></specd-tag></td>
            <td style="text-align:center;"><specd-tag label="Ready" intent="info"></specd-tag></td>
            <td><specd-jump-btn label="Jump"></specd-jump-btn></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-pagination">
      <span>Showing 1–8 of 152</span>
      <div style="display:flex; gap:6px;">
        <specd-button variant="ghost" size="sm" label="← Prev" disabled></specd-button>
        <specd-button variant="ghost" size="sm" label="Next →"></specd-button>
      </div>
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

export const PluginView: Story = {
  name: 'Plugin View',
  parameters: { layout: 'padded' },
  render: () => html`
    <div style="padding:0; display:flex; flex-direction:column; align-items:flex-start;">
      <div class="plugin-wrap">
        ${componentShell()}
        ${componentsComponentContent()}
      </div>
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
          ${componentsRawContent()}
        </div>
      </div>
      <div style="background:#e8eef5; padding:16px;">
        <p style="font:700 10px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">Component Build</p>
        <div class="plugin-wrap">
          ${componentShell()}
          ${componentsComponentContent()}
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
        ComponentsTab — Components Used
      </h2>
      <div style="display:flex; flex-direction:column; gap:24px;">

        ${sectionBlock('specd-app-header', html`
          <specd-app-header name="Pulse" showrefresh showexport showsettings></specd-app-header>
        `)}

        ${sectionBlock('specd-chip (filter chips)', html`
          <specd-chip label="All" count="152" active data-filter="all"></specd-chip>
          <specd-chip label="No description" data-filter="no-description"></specd-chip>
          <specd-chip label="No doc link" data-filter="no-doc-link"></specd-chip>
          <specd-chip label="Hard-coded" data-filter="hard-coded"></specd-chip>
          <specd-chip label="Not published" data-filter="not-published"></specd-chip>
        `)}

        ${sectionBlock('specd-input (search)', html`
          <specd-input search placeholder="Search components…"></specd-input>
        `)}

        ${sectionBlock('specd-segmented', html`
          <specd-segmented
            options='[{"value":"audit","label":"Audit"},{"value":"storybook","label":"Storybook"}]'
            value="audit"
          ></specd-segmented>
        `)}

        ${sectionBlock('specd-tag (status)', html`
          <specd-tag label="✓ Matched" intent="success"></specd-tag>
          <specd-tag label="✗ Missing" intent="crit"></specd-tag>
          <specd-tag label="— Partial" intent="neutral"></specd-tag>
          <specd-tag label="Ready" intent="info"></specd-tag>
          <specd-tag label="In Review" intent="warn"></specd-tag>
          <specd-tag label="In Progress" intent="neutral"></specd-tag>
        `)}

        ${sectionBlock('specd-health-tag (score)', html`
          <specd-health-tag tier="good" label="GOOD" size="sm"></specd-health-tag>
          <specd-health-tag tier="med" label="MED" size="sm"></specd-health-tag>
          <specd-health-tag tier="poor" label="POOR" size="sm"></specd-health-tag>
        `)}

        ${sectionBlock('specd-jump-btn', html`
          <specd-jump-btn label="Jump"></specd-jump-btn>
        `)}

        ${sectionBlock('specd-button (pagination)', html`
          <specd-button variant="ghost" size="sm" label="← Prev" disabled></specd-button>
          <specd-button variant="ghost" size="sm" label="Next →"></specd-button>
        `)}

      </div>
    </div>
  `,
};
