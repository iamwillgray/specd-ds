import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TemplateResult } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
import '../../components/Input/SpecdInput.js';
import '../../components/Chip/SpecdChip.js';
import '../../components/SeverityHeader/SpecdSeverityHeader.js';
import '../../components/IssuePreviewCard/SpecdIssuePreviewCard.js';
import '../../components/IgnoreFooter/SpecdIgnoreFooter.js';
import '../../components/JumpBtn/SpecdJumpBtn.js';
import '../../components/Button/SpecdButton.js';
import '../../components/SectionLabel/SpecdSectionLabel.js';
import '../../components/AiPill/SpecdAiPill.js';
import '../../components/PropFixRow/SpecdPropFixRow.js';
import '../../components/ColorSwatch/SpecdColorSwatch.js';
import '../../components/Tag/SpecdTag.js';

const LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 48 48" fill="none"><rect x="17" y="24.2427" width="10.2426" height="10.2426" rx="2" transform="rotate(-45 17 24.2427)" fill="white"/><rect x="12.7071" y="24.101" width="16.1133" height="16.1133" rx="4.5" transform="rotate(-45 12.7071 24.101)" stroke="white" stroke-width="1.2"/><rect x="7.70711" y="23.9664" width="22.9942" height="23.0891" rx="7.5" transform="rotate(-45 7.70711 23.9664)" stroke="white" stroke-width="1.2"/></svg>`;
const DIAMOND_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>`;
const JUMP_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17L17 7M8 7h9v9"/></svg>`;
const SPARKLE_SVG = `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 12C15.9498 12 16.1308 12.1186 16.209 12.3027L16.8809 13.8691L18.4473 14.541C18.6314 14.6192 18.75 14.8002 18.75 15C18.75 15.1998 18.6314 15.3808 18.4473 15.459L16.8809 16.1309L16.209 17.6973C16.1308 17.8814 15.9498 18 15.75 18C15.5502 18 15.3692 17.8814 15.291 17.6973L14.6191 16.1309L13.0527 15.459C12.8686 15.3808 12.75 15.1998 12.75 15C12.75 14.8002 12.8686 14.6192 13.0527 14.541L14.6191 13.8691L15.291 12.3027C15.3692 12.1186 15.5502 12 15.75 12ZM12.9219 9.8623L5.23438 17.5498C5.13483 17.6479 5.00476 17.7002 4.875 17.7002C4.7774 17.7002 4.67957 17.6706 4.59473 17.6143L4.51562 17.5498L3.2002 16.2344C3.1021 16.1348 3.0498 16.0048 3.0498 15.875C3.0498 15.7774 3.0794 15.6796 3.13574 15.5947L3.2002 15.5156L10.8877 7.82812L12.9219 9.8623ZM4.25 3.5C4.44983 3.5 4.63075 3.61863 4.70898 3.80273L5.38086 5.36914L6.94727 6.04102C7.13137 6.11925 7.25 6.30017 7.25 6.5C7.25 6.69983 7.13137 6.88075 6.94727 6.95898L5.38086 7.63086L4.70898 9.19727C4.63075 9.38137 4.44983 9.5 4.25 9.5C4.05017 9.5 3.86925 9.38137 3.79102 9.19727L3.11914 7.63086L1.55273 6.95898C1.36863 6.88075 1.25 6.69983 1.25 6.5C1.25 6.30017 1.36863 6.11925 1.55273 6.04102L3.11914 5.36914L3.79102 3.80273C3.86925 3.61863 4.05017 3.5 4.25 3.5ZM15.625 3.2998C15.7548 3.2998 15.8848 3.3521 15.9844 3.4502L17.2998 4.76562L17.3643 4.84473C17.4206 4.92957 17.4502 5.0274 17.4502 5.125C17.4502 5.25476 17.3979 5.38483 17.2998 5.48438L15.1123 7.67188L13.0781 5.6377L15.2656 3.4502C15.3652 3.3521 15.4952 3.2998 15.625 3.2998ZM9.25 1.5C9.35 1.5 9.44394 1.5625 9.48145 1.65625L9.94336 2.80664L11.0938 3.26855C11.1875 3.30605 11.25 3.4 11.25 3.5C11.25 3.6 11.1875 3.69395 11.0938 3.73145L9.94336 4.19336L9.48145 5.34375C9.44394 5.4375 9.35 5.5 9.25 5.5C9.15 5.5 9.05605 5.4375 9.01855 5.34375L8.55664 4.19336L7.40625 3.73145C7.3125 3.69395 7.25 3.6 7.25 3.5C7.25 3.4 7.3125 3.30605 7.40625 3.26855L8.55664 2.80664L9.01855 1.65625C9.05605 1.5625 9.15 1.5 9.25 1.5Z" fill="currentColor"/></svg>`;
const BROWSE_SVG = `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 15.502C16.2769 15.502 16.4998 15.7251 16.5 16.002C16.5 16.2789 16.277 16.502 16 16.502H4C3.72302 16.502 3.5 16.2789 3.5 16.002C3.5002 15.7251 3.72314 15.502 4 15.502H16ZM11 11.502C11.2769 11.502 11.4998 11.7251 11.5 12.002C11.5 12.2789 11.277 12.502 11 12.502H4C3.72302 12.502 3.5 12.2789 3.5 12.002C3.5002 11.7251 3.72314 11.502 4 11.502H11ZM16 7.50195C16.2769 7.50195 16.4998 7.72514 16.5 8.00195C16.5 8.27894 16.277 8.50195 16 8.50195H4C3.72302 8.50195 3.5 8.27894 3.5 8.00195C3.5002 7.72514 3.72314 7.50195 4 7.50195H16ZM11 3.50195C11.2769 3.50195 11.4998 3.72514 11.5 4.00195C11.5 4.27894 11.277 4.50195 11 4.50195H4C3.72302 4.50195 3.5 4.27894 3.5 4.00195C3.5002 3.72514 3.72314 3.50195 4 3.50195H11Z" fill="currentColor"/></svg>`;
const LANDING_ARROW_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

const meta: Meta = {
  title: 'Pages/IssuesTab',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

/** Shared header + tab bar used in all plugin page stories */
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
  <specd-tab-bar tabs=${TABS_JSON} active="issues"></specd-tab-bar>
`;

const pluginShell = (activeTab: number) => html`
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
    <button class="tab-v2 ${activeTab === 0 ? 'active' : ''}">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
      Overview
    </button>
    <button class="tab-v2 ${activeTab === 1 ? 'active' : ''}">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      Issues <span class="tab-badge">47</span>
    </button>
    <button class="tab-v2 ${activeTab === 2 ? 'active' : ''}">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      Components
    </button>
    <button class="tab-v2 ${activeTab === 3 ? 'active' : ''}">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 7h16M4 12h16M4 17h10"/></svg>
      Variables
    </button>
    <button class="tab-v2 ${activeTab === 4 ? 'active' : ''}">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      Storybook
    </button>
    <button class="tab-v2 ${activeTab === 5 ? 'active' : ''}">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
      Library
    </button>
  </nav>
`;

/** Raw CSS version — verbatim issues tab content, no component substitutions */
const issuesRawContent = () => html`
  <div class="plugin-scroll">

    <!-- Sticky top bar -->
    <div class="issues-sticky-top">
      <div class="issues-action-row">
        <button class="issues-back-btn">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back
        </button>
        <div style="flex:1;"></div>
        <button class="ai-pill-sm">
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path d="M15.75 12C15.9498 12 16.1308 12.1186 16.209 12.3027L16.8809 13.8691L18.4473 14.541C18.6314 14.6192 18.75 14.8002 18.75 15C18.75 15.1998 18.6314 15.3808 18.4473 15.459L16.8809 16.1309L16.209 17.6973C16.1308 17.8814 15.9498 18 15.75 18C15.5502 18 15.3692 17.8814 15.291 17.6973L14.6191 16.1309L13.0527 15.459C12.8686 15.3808 12.75 15.1998 12.75 15C12.75 14.8002 12.8686 14.6192 13.0527 14.541L14.6191 13.8691L15.291 12.3027C15.3692 12.1186 15.5502 12 15.75 12Z"/></svg>
          Quick-Fix
        </button>
      </div>
      <div class="issues-page-title">Browse all issues</div>
      <div class="issues-filter-bar">
        <div class="issues-search-row">
          <div class="issues-search-wrap">
            <svg class="issues-search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="search" class="issues-search-input" placeholder="Search component name…" />
          </div>
          <button class="issues-type-trigger">
            All Issue Types
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
        <div class="issues-chips-row">
          <span class="sev-chip sev-chip-all active">All <b class="sev-chip-count">47</b></span>
          <span class="sev-chip sev-chip-crit">Critical <b class="sev-chip-count">2</b></span>
          <span class="sev-chip sev-chip-warn">Warnings <b class="sev-chip-count">31</b></span>
          <span class="sev-chip sev-chip-info">Advisory <b class="sev-chip-count">14</b></span>
          <span class="sev-chip sev-chip-ign">Ignored <b class="sev-chip-count">3</b></span>
        </div>
      </div>
    </div>

    <!-- CRITICAL section -->
    <div class="severity-header">
      <div class="severity-dot critical"></div>
      <div class="severity-title">Critical</div>
      <div class="severity-count critical">2</div>
    </div>

    <!-- Issue card 1: no description -->
    <div class="issue-card">
      <div class="issue-content">
        <div class="issue-card-top">
          <span class="issue-comp-tag">${unsafeSVG(DIAMOND_SVG)} Button/Primary</span>
          <span class="issue-card-count crit">Missing desc <span class="issue-card-count-badge">!</span></span>
        </div>
        <div class="issue-tag-row">
          <span class="issue-tag crit">No description</span>
          <span class="issue-tag neutral">Published</span>
        </div>
      </div>
      <div class="issue-card-footer">
        <button class="btn-jump">${unsafeSVG(JUMP_SVG)} Jump to component</button>
      </div>
    </div>

    <!-- Issue card 2: no description + no link -->
    <div class="issue-card">
      <div class="issue-content">
        <div class="issue-card-top">
          <span class="issue-comp-tag">${unsafeSVG(DIAMOND_SVG)} Card/Default</span>
          <span class="issue-card-count crit">No desc <span class="issue-card-count-badge">!</span></span>
        </div>
        <div class="issue-tag-row">
          <span class="issue-tag crit">No description</span>
          <span class="issue-tag crit">No doc link</span>
          <span class="issue-tag neutral">Published</span>
        </div>
      </div>
      <div class="issue-card-footer">
        <button class="btn-jump">${unsafeSVG(JUMP_SVG)} Jump to component</button>
      </div>
    </div>

    <!-- WARNINGS section -->
    <div class="severity-header">
      <div class="severity-dot warning"></div>
      <div class="severity-title">Warnings</div>
      <div class="severity-count warning">31</div>
    </div>

    <!-- Issue card 3: hard-coded EXPANDED with prop-fix-row -->
    <div class="issue-card">
      <div class="issue-content">
        <div class="issue-card-top">
          <span class="issue-comp-tag">${unsafeSVG(DIAMOND_SVG)} Input/Text</span>
          <span class="issue-card-count warn">Hard-coded <span class="issue-card-count-badge">5</span></span>
        </div>
        <div class="issue-tag-row">
          <span class="issue-tag warn">HC colours</span>
          <span class="issue-tag warn">HC spacing</span>
        </div>
      </div>
      <div class="issue-card-footer">
        <button class="btn-jump">${unsafeSVG(JUMP_SVG)} Jump to component</button>
        <button class="btn-view-fixes">View Fixes <span class="view-fixes-count">5</span></button>
      </div>

      <!-- Expanded fix panel -->
      <div class="issue-fixes-panel">
        <div style="display:flex; flex-wrap:wrap; gap:6px; padding:10px 12px; background:#fff; border-bottom:1px solid var(--blue-20);">
          <button class="chip-v2 active">All <span class="chip-count">5</span></button>
          <button class="chip-v2">Colour <span class="chip-count">3</span></button>
          <button class="chip-v2">Spacing <span class="chip-count">2</span></button>
        </div>

        <!-- Fix row 1: background fill -->
        <div class="prop-fix-row">
          <div class="prop-fix-content">
            <div class="prop-fix-hdr">
              <span class="prop-fix-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/></svg>
              </span>
              <button class="prop-fix-layer">Input/Text/Default</button>
              <span class="prop-fix-arrow">›</span>
              <span class="prop-fix-attr">background fill</span>
              <span class="prop-fix-count">1 layer</span>
            </div>
            <div class="prop-fix-slot">
              <span class="prop-fix-current">
                <div style="width:10px;height:10px;border-radius:2px;background:#3b82f6;border:1px solid rgba(0,0,0,0.1);flex-shrink:0;"></div>
                <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#0c1f3f;">#3b82f6</span>
              </span>
              <span class="prop-fix-arrow">→</span>
              <span class="prop-fix-suggest">
                <div style="width:10px;height:10px;border-radius:2px;background:#3b82f6;border:1px solid rgba(0,0,0,0.1);flex-shrink:0;"></div>
                <button class="prop-fix-layer-link">color/brand/blue-500</button>
                <span class="prop-fix-match-tag exact">EXACT</span>
                <span class="prop-fix-chevron">›</span>
              </span>
              <button class="prop-fix-btn">Apply</button>
            </div>
          </div>
        </div>

        <!-- Fix row 2: border stroke -->
        <div class="prop-fix-row">
          <div class="prop-fix-content">
            <div class="prop-fix-hdr">
              <span class="prop-fix-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/></svg>
              </span>
              <button class="prop-fix-layer">Input/Text/Default</button>
              <span class="prop-fix-arrow">›</span>
              <span class="prop-fix-attr">border stroke</span>
              <span class="prop-fix-count">1 layer</span>
            </div>
            <div class="prop-fix-slot">
              <span class="prop-fix-current">
                <div style="width:10px;height:10px;border-radius:2px;background:#d1d5db;border:1px solid rgba(0,0,0,0.1);flex-shrink:0;"></div>
                <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#0c1f3f;">#d1d5db</span>
              </span>
              <span class="prop-fix-arrow">→</span>
              <span class="prop-fix-suggest">
                <div style="width:10px;height:10px;border-radius:2px;background:#d1d5db;border:1px solid rgba(0,0,0,0.1);flex-shrink:0;"></div>
                <button class="prop-fix-layer-link">color/border/default</button>
                <span class="prop-fix-match-tag closest">CLOSEST</span>
                <span class="prop-fix-chevron">›</span>
              </span>
              <button class="prop-fix-btn">Apply</button>
            </div>
          </div>
        </div>

        <!-- Fix row 3: spacing — applied -->
        <div class="prop-fix-row">
          <div class="prop-fix-content">
            <div class="prop-fix-hdr">
              <span class="prop-fix-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><polyline points="5 8 2 12 5 16"/><polyline points="19 8 22 12 19 16"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
              </span>
              <button class="prop-fix-layer">Input/Text/Default</button>
              <span class="prop-fix-arrow">›</span>
              <span class="prop-fix-attr">padding horizontal</span>
              <span class="prop-fix-count">3 layers</span>
            </div>
            <div class="prop-fix-slot">
              <span class="prop-fix-current">
                <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#0c1f3f;">12px</span>
              </span>
              <span class="prop-fix-arrow">→</span>
              <span class="prop-fix-suggest">
                <button class="prop-fix-layer-link">spacing/300</button>
                <span class="prop-fix-chevron">›</span>
              </span>
              <button class="prop-fix-btn applied">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Applied
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Issue card 4: hard-coded colour + text -->
    <div class="issue-card">
      <div class="issue-content">
        <div class="issue-card-top">
          <span class="issue-comp-tag">${unsafeSVG(DIAMOND_SVG)} Tag/Category</span>
          <span class="issue-card-count warn">Hard-coded <span class="issue-card-count-badge">7</span></span>
        </div>
        <div class="issue-tag-row">
          <span class="issue-tag warn">HC colours</span>
          <span class="issue-tag warn">HC text</span>
        </div>
      </div>
      <div class="issue-card-footer">
        <button class="btn-jump">${unsafeSVG(JUMP_SVG)} Jump to component</button>
        <button class="btn-view-fixes">View Fixes <span class="view-fixes-count">7</span></button>
      </div>
    </div>

    <!-- Issue card 5: stale publish -->
    <div class="issue-card">
      <div class="issue-content">
        <div class="issue-card-top">
          <span class="issue-comp-tag">${unsafeSVG(DIAMOND_SVG)} Modal/Dialog</span>
          <span class="issue-card-count warn">Stale <span class="issue-card-count-badge">2</span></span>
        </div>
        <div class="issue-tag-row">
          <span class="issue-tag warn">Stale publish</span>
        </div>
      </div>
      <div class="issue-card-footer">
        <button class="btn-jump">${unsafeSVG(JUMP_SVG)} Jump to component</button>
      </div>
    </div>

    <!-- ADVISORY section -->
    <div class="severity-header">
      <div class="severity-dot info"></div>
      <div class="severity-title">Advisory</div>
      <div class="severity-count info">14</div>
    </div>

    <!-- Issue card 6: no doc link -->
    <div class="issue-card">
      <div class="issue-content">
        <div class="issue-card-top">
          <span class="issue-comp-tag">${unsafeSVG(DIAMOND_SVG)} Nav/Header</span>
          <span class="issue-card-count info">No link</span>
        </div>
        <div class="issue-tag-row">
          <span class="issue-tag info">No doc link</span>
        </div>
      </div>
      <div class="issue-card-footer">
        <button class="btn-jump">${unsafeSVG(JUMP_SVG)} Jump to component</button>
      </div>
    </div>

    <!-- Issue card 7: hard-coded values -->
    <div class="issue-card">
      <div class="issue-content">
        <div class="issue-card-top">
          <span class="issue-comp-tag">${unsafeSVG(DIAMOND_SVG)} Badge/Count</span>
          <span class="issue-card-count warn">Hard-coded <span class="issue-card-count-badge">3</span></span>
        </div>
        <div class="issue-tag-row">
          <span class="issue-tag warn">HC colours</span>
          <span class="issue-tag warn">HC spacing</span>
        </div>
      </div>
      <div class="issue-card-footer">
        <button class="btn-jump">${unsafeSVG(JUMP_SVG)} Jump to component</button>
        <button class="btn-view-fixes">View Fixes <span class="view-fixes-count">3</span></button>
      </div>
    </div>

    <div style="height:16px;"></div>
  </div>
`;

/** Component version — same layout using specd-* web components */
const issuesComponentContent = () => html`
  <div class="plugin-scroll">

    <!-- Sticky top bar -->
    <div class="issues-sticky-top">
      <div class="issues-action-row">
        <button class="issues-back-btn">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back
        </button>
        <div style="flex:1;"></div>
        <specd-ai-pill label="Quick-Fix"></specd-ai-pill>
        <specd-ai-pill label="Bulk-Fix"></specd-ai-pill>
      </div>
      <div class="issues-page-title">Browse all issues</div>
      <div class="issues-filter-bar">
        <div class="issues-search-row">
          <div style="flex:1;"><specd-input search placeholder="Search component name…" style="width:100%; display:block;"></specd-input></div>
          <button class="issues-type-trigger">
            All Issue Types
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
        <div class="issues-chips-row">
          <specd-chip label="All" count="47" active data-filter="all"></specd-chip>
          <specd-chip label="Critical" count="2" intent="negative" data-filter="critical"></specd-chip>
          <specd-chip label="Warnings" count="31" intent="warning" data-filter="warning"></specd-chip>
          <specd-chip label="Advisory" count="14" data-filter="info"></specd-chip>
          <specd-chip label="Ignored" count="3" data-filter="ignored"></specd-chip>
        </div>
      </div>
    </div>

    <!-- CRITICAL section -->
    <specd-severity-header intent="critical" label="Critical" count="2"></specd-severity-header>

    <!-- Issue card 1: no description -->
    <specd-issue-preview-card
      component="Button/Primary"
      type="Missing desc"
      severity="crit"
      tags='[{"label":"No description","sev":"crit"},{"label":"Published","sev":"neutral"}]'
    ></specd-issue-preview-card>

    <!-- Issue card 2: no description + no link -->
    <specd-issue-preview-card
      component="Card/Default"
      type="No desc"
      severity="crit"
      tags='[{"label":"No description","sev":"crit"},{"label":"No doc link","sev":"crit"},{"label":"Published","sev":"neutral"}]'
    ></specd-issue-preview-card>

    <!-- WARNINGS section -->
    <specd-severity-header intent="warning" label="Warnings" count="31"></specd-severity-header>

    <!-- Issue card 3: hard-coded EXPANDED with prop-fix-row -->
    <specd-issue-preview-card
      component="Input/Text"
      type="Hard-coded"
      count="5"
      severity="warn"
      expanded
      tags='[{"label":"HC colours","sev":"warn"},{"label":"HC spacing","sev":"warn"}]'
    >
        <div style="display:flex; flex-wrap:wrap; gap:6px; padding:10px 12px; background:#fff; border-bottom:1px solid var(--blue-20);">
          <specd-chip label="All" count="5" active></specd-chip>
          <specd-chip label="Colour" count="3"></specd-chip>
          <specd-chip label="Spacing" count="2"></specd-chip>
        </div>

        <!-- Fix row 1: background fill -->
        <specd-prop-fix-row prop="fill" layer="Input/Text/Default" attr="background fill" count="1 layer">
          <div class="prop-fix-slot">
            <span class="prop-fix-current">
              <specd-color-swatch color="#3b82f6" sm></specd-color-swatch>
              <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#0c1f3f;">#3b82f6</span>
            </span>
            <span class="prop-fix-arrow">→</span>
            <span class="prop-fix-suggest">
              <specd-color-swatch color="#3b82f6" sm></specd-color-swatch>
              <button class="prop-fix-layer-link">color/brand/blue-500</button>
              <span class="prop-fix-match-tag exact">EXACT</span>
              <span class="prop-fix-chevron">›</span>
            </span>
            <specd-button variant="ghost" size="sm" label="Apply"></specd-button>
          </div>
        </specd-prop-fix-row>

        <!-- Fix row 2: border stroke -->
        <specd-prop-fix-row prop="stroke" layer="Input/Text/Default" attr="border stroke" count="1 layer">
          <div class="prop-fix-slot">
            <span class="prop-fix-current">
              <specd-color-swatch color="#d1d5db" sm></specd-color-swatch>
              <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#0c1f3f;">#d1d5db</span>
            </span>
            <span class="prop-fix-arrow">→</span>
            <span class="prop-fix-suggest">
              <specd-color-swatch color="#d1d5db" sm></specd-color-swatch>
              <button class="prop-fix-layer-link">color/border/default</button>
              <span class="prop-fix-match-tag closest">CLOSEST</span>
              <span class="prop-fix-chevron">›</span>
            </span>
            <specd-button variant="ghost" size="sm" label="Apply"></specd-button>
          </div>
        </specd-prop-fix-row>

        <!-- Fix row 3: spacing — applied -->
        <specd-prop-fix-row prop="spacing" layer="Input/Text/Default" attr="padding horizontal" count="3 layers">
          <div class="prop-fix-slot">
            <span class="prop-fix-current">
              <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#0c1f3f;">12px</span>
            </span>
            <span class="prop-fix-arrow">→</span>
            <span class="prop-fix-suggest">
              <button class="prop-fix-layer-link">spacing/300</button>
              <span class="prop-fix-chevron">›</span>
            </span>
            <button class="prop-fix-btn applied">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Applied
            </button>
          </div>
        </specd-prop-fix-row>
    </specd-issue-preview-card>

    <!-- Issue card 4: hard-coded colour + text -->
    <specd-issue-preview-card
      component="Tag/Category"
      type="Hard-coded"
      count="7"
      severity="warn"
      tags='[{"label":"HC colours","sev":"warn"},{"label":"HC text","sev":"warn"}]'
    ></specd-issue-preview-card>

    <!-- Issue card 5: stale publish -->
    <specd-issue-preview-card
      component="Modal/Dialog"
      type="Stale"
      count="2"
      severity="warn"
      tags='[{"label":"Stale publish","sev":"warn"}]'
    ></specd-issue-preview-card>

    <!-- ADVISORY section -->
    <specd-severity-header intent="info" label="Advisory" count="14"></specd-severity-header>

    <!-- Issue card 6: no doc link -->
    <specd-issue-preview-card
      component="Nav/Header"
      type="No link"
      severity="info"
      tags='[{"label":"No doc link","sev":"info"}]'
    ></specd-issue-preview-card>

    <!-- Issue card 7: hard-coded values -->
    <specd-issue-preview-card
      component="Badge/Count"
      type="Hard-coded"
      count="3"
      severity="warn"
      tags='[{"label":"HC colours","sev":"warn"},{"label":"HC spacing","sev":"warn"}]'
    ></specd-issue-preview-card>

    <div style="height:16px;"></div>
  </div>
`;

/** "What would you like to do?" landing screen — shown before the browse list.
 * Ported verbatim (copy + structure) from pulse/src/ui.html #issues-landing,
 * which was completely absent from this story (confirmed gap, item 1). */
const issuesLandingContent = () => html`
  <div class="issues-landing">
    <div class="issues-landing-header">
      <span class="t-label">Issues</span>
      <h2 class="t-heading">What would you like to do?</h2>
    </div>
    <div class="issues-landing-grid">
      <button class="issues-landing-card issues-landing-card-dark">
        <div class="issues-landing-card-top">
          <div class="issues-landing-card-icon">${unsafeSVG(SPARKLE_SVG)}</div>
          ${unsafeSVG(LANDING_ARROW_SVG)}
        </div>
        <div class="issues-landing-card-body">
          <div class="issues-landing-card-title">Quick-Fix Issues</div>
          <div class="issues-landing-card-sub">Apply variable updates and component fixes with just one click. Auto-fix will guide you through the available fixes, update on bulk or fix issues one-by-one.</div>
          <div class="issues-landing-count issues-landing-count-lime">33 fixable</div>
        </div>
      </button>
      <button class="issues-landing-card issues-landing-card-light">
        <div class="issues-landing-card-top">
          <div class="issues-landing-card-icon">${unsafeSVG(BROWSE_SVG)}</div>
          ${unsafeSVG(LANDING_ARROW_SVG)}
        </div>
        <div class="issues-landing-card-body">
          <div class="issues-landing-card-title">Browse all issues</div>
          <div class="issues-landing-card-sub">Filter and search issues by type, severity or component name. A larger overview to review, fix and understand all your issues in one place.</div>
          <div class="issues-landing-count issues-landing-count-blue">47 total</div>
        </div>
      </button>
    </div>
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
  render: () => html`
    <div class="plugin-wrap">
      ${componentShell()}
      ${issuesComponentContent()}
    </div>
  `,
};

export const Landing: Story = {
  name: 'Landing (What would you like to do?)',
  render: () => html`
    <div class="plugin-wrap">
      ${componentShell()}
      ${issuesLandingContent()}
    </div>
  `,
};

export const Compare: Story = {
  render: () => html`
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0; min-height:100vh;">
      <div style="border-right:2px solid #dbeafe; background:#e8eef5; padding:16px;">
        <p style="font:700 10px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">Reference HTML</p>
        <div class="plugin-wrap">
          ${pluginShell(1)}
          ${issuesRawContent()}
        </div>
      </div>
      <div style="background:#e8eef5; padding:16px;">
        <p style="font:700 10px 'IBM Plex Mono',monospace; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">Component Build</p>
        <div class="plugin-wrap">
          ${componentShell()}
          ${issuesComponentContent()}
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
        IssuesTab — Components Used
      </h2>
      <div style="display:flex; flex-direction:column; gap:24px;">

        ${sectionBlock('specd-app-header', html`
          <specd-app-header name="Pulse" showrefresh showexport showsettings></specd-app-header>
        `)}

        ${sectionBlock('specd-chip (severity filters)', html`
          <specd-chip label="All" count="47" active></specd-chip>
          <specd-chip label="Critical" count="2" intent="negative"></specd-chip>
          <specd-chip label="Warnings" count="31" intent="warning"></specd-chip>
          <specd-chip label="Advisory" count="14"></specd-chip>
          <specd-chip label="Ignored" count="3"></specd-chip>
        `)}

        ${sectionBlock('specd-severity-header', html`
          <specd-severity-header intent="critical" label="Critical" count="2" style="width:100%;"></specd-severity-header>
          <specd-severity-header intent="warning" label="Warnings" count="31" style="width:100%;"></specd-severity-header>
          <specd-severity-header intent="info" label="Advisory" count="14" style="width:100%;"></specd-severity-header>
        `)}

        ${sectionBlock('specd-issue-preview-card', html`
          <specd-issue-preview-card
            component="Button/Primary"
            type="Missing desc"
            severity="crit"
            tags='[{"label":"No description","sev":"crit"},{"label":"Published","sev":"neutral"}]'
            style="width:100%;"
          ></specd-issue-preview-card>
        `)}

        ${sectionBlock('specd-ai-pill', html`
          <specd-ai-pill label="Quick-Fix"></specd-ai-pill>
          <specd-ai-pill label="Bulk-Fix"></specd-ai-pill>
        `)}

        ${sectionBlock('specd-jump-btn', html`
          <specd-jump-btn label="Jump to component"></specd-jump-btn>
        `)}

        ${sectionBlock('specd-tag (issue tags)', html`
          <specd-tag label="No description" intent="crit"></specd-tag>
          <specd-tag label="Published" intent="neutral"></specd-tag>
          <specd-tag label="HC colours" intent="warn"></specd-tag>
          <specd-tag label="No doc link" intent="info"></specd-tag>
        `)}

        ${sectionBlock('specd-input (search)', html`
          <specd-input search placeholder="Search…"></specd-input>
        `)}

        ${sectionBlock('specd-color-swatch', html`
          <specd-color-swatch color="#3b82f6" sm></specd-color-swatch>
          <specd-color-swatch color="#d1d5db" sm></specd-color-swatch>
          <specd-color-swatch color="#0c1f3f" sm></specd-color-swatch>
        `)}

      </div>
    </div>
  `,
};
