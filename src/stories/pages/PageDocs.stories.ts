/**
 * Component inventory docs — one story per page.
 * Each story renders a visual catalogue of every specd-* component used on that page,
 * showing the exact props and variants employed.
 */
import type { Meta, StoryObj } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

// Shell
import '../../components/AppHeader/SpecdAppHeader.js';
import '../../components/TabBar/SpecdTabBar.js';
// Page components
import '../../components/ScoreRing/SpecdScoreRing.js';
import '../../components/HealthTag/SpecdHealthTag.js';
import '../../components/ScoreTrend/SpecdScoreTrend.js';
import '../../components/CovRow/SpecdCovRow.js';
import '../../components/StatTileLg/SpecdStatTileLg.js';
import '../../components/SectionLabel/SpecdSectionLabel.js';
import '../../components/Button/SpecdButton.js';
import '../../components/Input/SpecdInput.js';
import '../../components/Chip/SpecdChip.js';
import '../../components/SeverityHeader/SpecdSeverityHeader.js';
import '../../components/IssuePreviewCard/SpecdIssuePreviewCard.js';
import '../../components/JumpBtn/SpecdJumpBtn.js';
import '../../components/Segmented/SpecdSegmented.js';
import '../../components/Tag/SpecdTag.js';
import '../../components/Badge/SpecdBadge.js';
import '../../components/ToggleRow/SpecdToggleRow.js';
import '../../components/Divider/SpecdDivider.js';
import '../../components/KvRow/SpecdKvRow.js';
import '../../components/ColorSwatch/SpecdColorSwatch.js';
import '../../components/RadioRow/SpecdRadioRow.js';

const meta: Meta = {
  title: 'Pages/Docs',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Shared styles (injected once via a <style> element)
// ---------------------------------------------------------------------------
const DOC_STYLES = `
  .pd-page { font-family: Inter, sans-serif; max-width: 900px; padding: 0 0 48px; }
  .pd-page h1 { font-size: 22px; font-weight: 700; color: #0C1750; margin: 0 0 4px; }
  .pd-page .pd-subtitle { font-size: 13px; color: #6b7280; margin: 0 0 32px; }
  .pd-section { margin-bottom: 40px; }
  .pd-section-title { font-size: 11px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; color: #6b7280; margin: 0 0 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(0,0,0,.08); }
  .pd-row { display: grid; grid-template-columns: 200px 1fr 220px; gap: 12px 24px; align-items: start; padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,.04); }
  .pd-row:last-child { border-bottom: none; }
  .pd-tag { font-family: "IBM Plex Mono", monospace; font-size: 11px; color: #0C1750; background: #dbeafe; border-radius: 4px; padding: 2px 6px; white-space: nowrap; display: inline-block; }
  .pd-props { display: flex; flex-direction: column; gap: 2px; }
  .pd-prop { font-family: "IBM Plex Mono", monospace; font-size: 11px; line-height: 1.5; }
  .pd-prop-name { color: #9333ea; }
  .pd-prop-eq { color: #374151; }
  .pd-prop-val { color: #15803d; }
  .pd-live { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
  .pd-col-head { font-size: 11px; font-weight: 600; color: #9ca3af; }
`;

function injectDocStyles() {
  if (typeof document === 'undefined') return;
  if (!document.getElementById('pd-styles')) {
    const s = document.createElement('style');
    s.id = 'pd-styles';
    s.textContent = DOC_STYLES;
    document.head.appendChild(s);
  }
}

/** Render a single component inventory row */
function row(
  tag: string,
  props: Array<[string, string]>,
  live: TemplateResult,
) {
  return html`
    <div class="pd-row">
      <div><span class="pd-tag">&lt;${tag}&gt;</span></div>
      <div class="pd-props">
        ${repeat(props, ([k, v]) => k, ([k, v]) => html`
          <span class="pd-prop">
            <span class="pd-prop-name">${k}</span><span class="pd-prop-eq">${v ? '=' : ''}</span><span class="pd-prop-val">${v ? `"${v}"` : ''}</span>
          </span>
        `)}
      </div>
      <div class="pd-live">${live}</div>
    </div>
  `;
}

/** Column headers */
const colHeads = html`
  <div class="pd-row" style="padding-top:0;">
    <div class="pd-col-head">Component</div>
    <div class="pd-col-head">Props / Variants</div>
    <div class="pd-col-head">Live Preview</div>
  </div>
`;

// ---------------------------------------------------------------------------
// 1. Overview Tab
// ---------------------------------------------------------------------------
export const OverviewTab: Story = {
  name: 'Overview Tab',
  render: () => {
    injectDocStyles();
    return html`
      <div class="pd-page">
        <h1>Overview Tab — Component Inventory</h1>
        <p class="pd-subtitle">All specd-* components used to build the Overview page, with the exact props and variants.</p>

        <div class="pd-section">
          <div class="pd-section-title">Shell</div>
          ${colHeads}
          ${row('specd-app-header', [['name','Pulse'],['showrefresh',''],['showsettings','']], html`<specd-app-header name="Pulse" showrefresh showsettings style="width:200px;flex-shrink:0;"></specd-app-header>`)}
          ${row('specd-tab-bar', [['tabs','[…]'],['active','overview']], html`<span style="font-size:11px;color:#6b7280;font-style:italic;">6-tab nav · active=overview</span>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Score Hero</div>
          ${colHeads}
          ${row('specd-score-ring', [['score','72'],['tier','good'],['size','104']], html`<specd-score-ring score="72" tier="good" size="104"></specd-score-ring>`)}
          ${row('specd-health-tag', [['tier','good'],['label','Good']], html`<specd-health-tag tier="good" label="Good"></specd-health-tag>`)}
          ${row('specd-score-trend', [['delta','+4'],['direction','up'],['meta','vs last scan · May 7']], html`<specd-score-trend delta="+4" direction="up" meta="vs last scan · May 7"></specd-score-trend>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Coverage Rows (×7)</div>
          ${colHeads}
          ${row('specd-cov-row', [['label','Descriptions'],['pct','78']], html`<specd-cov-row label="Descriptions" pct="78" style="width:200px;"></specd-cov-row>`)}
          ${row('specd-cov-row', [['label','Doc Links'],['pct','45']], html`<specd-cov-row label="Doc Links" pct="45" style="width:200px;"></specd-cov-row>`)}
          ${row('specd-cov-row', [['label','Variable Coverage'],['pct','63']], html`<specd-cov-row label="Variable Coverage" pct="63" style="width:200px;"></specd-cov-row>`)}
          ${row('specd-cov-row', [['label','Untracked Changes'],['pct','12']], html`<specd-cov-row label="Untracked Changes" pct="12" style="width:200px;"></specd-cov-row>`)}
          ${row('specd-cov-row', [['label','Ready for Dev'],['pct','71']], html`<specd-cov-row label="Ready for Dev" pct="71" style="width:200px;"></specd-cov-row>`)}
          ${row('specd-cov-row', [['label','Storybook Sync'],['pct','32']], html`<specd-cov-row label="Storybook Sync" pct="32" style="width:200px;"></specd-cov-row>`)}
          ${row('specd-cov-row', [['label','Code Links'],['pct','88']], html`<specd-cov-row label="Code Links" pct="88" style="width:200px;"></specd-cov-row>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Section Labels</div>
          ${colHeads}
          ${row('specd-section-label', [['label','Overview Report']], html`<specd-section-label label="Overview Report"></specd-section-label>`)}
          ${row('specd-section-label', [['label','Component Readiness']], html`<specd-section-label label="Component Readiness"></specd-section-label>`)}
          ${row('specd-section-label', [['label','Dev Readiness']], html`<specd-section-label label="Dev Readiness"></specd-section-label>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Stat Tiles (×7)</div>
          ${colHeads}
          ${row('specd-stat-tile-lg', [['color','green'],['num','119'],['title','Descriptions'],['subtitle','33 missing']], html`<specd-stat-tile-lg color="green" num="119" title="Descriptions" subtitle="33 missing"></specd-stat-tile-lg>`)}
          ${row('specd-stat-tile-lg', [['color','red'],['num','84'],['title','Doc Links'],['subtitle','68 missing links']], html`<specd-stat-tile-lg color="red" num="84" title="Doc Links" subtitle="68 missing links"></specd-stat-tile-lg>`)}
          ${row('specd-stat-tile-lg', [['color','amber'],['num','96'],['title','Variable Coverage'],['subtitle','56 hard-coded values']], html`<specd-stat-tile-lg color="amber" num="96" title="Variable Coverage" subtitle="56 hard-coded values"></specd-stat-tile-lg>`)}
          ${row('specd-stat-tile-lg', [['color','amber'],['num','108'],['title','Dev Status'],['subtitle','44 without status']], html`<specd-stat-tile-lg color="amber" num="108" title="Dev Status" subtitle="44 without status"></specd-stat-tile-lg>`)}
          ${row('specd-stat-tile-lg', [['color','green'],['num','134'],['title','Code Links'],['subtitle','linked']], html`<specd-stat-tile-lg color="green" num="134" title="Code Links" subtitle="linked"></specd-stat-tile-lg>`)}
          ${row('specd-stat-tile-lg', [['color','green'],['num','141'],['title','Published'],['subtitle','current']], html`<specd-stat-tile-lg color="green" num="141" title="Published" subtitle="current"></specd-stat-tile-lg>`)}
          ${row('specd-stat-tile-lg', [['color','amber'],['num','18'],['title','Untracked'],['subtitle','changed locally']], html`<specd-stat-tile-lg color="amber" num="18" title="Untracked" subtitle="changed locally"></specd-stat-tile-lg>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Buttons</div>
          ${colHeads}
          ${row('specd-button', [['variant','primary'],['size','sm'],['label','↺ Re-scan']], html`<specd-button variant="primary" size="sm" label="↺ Re-scan"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Report']], html`<specd-button variant="ghost" size="sm" label="Report"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','CSV']], html`<specd-button variant="ghost" size="sm" label="CSV"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','JSON']], html`<specd-button variant="ghost" size="sm" label="JSON"></specd-button>`)}
        </div>
      </div>
    `;
  },
};

// ---------------------------------------------------------------------------
// 2. Issues Tab
// ---------------------------------------------------------------------------
export const IssuesTab: Story = {
  name: 'Issues Tab',
  render: () => {
    injectDocStyles();
    return html`
      <div class="pd-page">
        <h1>Issues Tab — Component Inventory</h1>
        <p class="pd-subtitle">All specd-* components used to build the Issues page, with the exact props and variants.</p>

        <div class="pd-section">
          <div class="pd-section-title">Shell</div>
          ${colHeads}
          ${row('specd-app-header', [['name','Pulse'],['showrefresh',''],['showsettings','']], html`<specd-app-header name="Pulse" showrefresh showsettings style="width:200px;flex-shrink:0;"></specd-app-header>`)}
          ${row('specd-tab-bar', [['tabs','[…]'],['active','issues']], html`<span style="font-size:11px;color:#6b7280;font-style:italic;">6-tab nav · active=issues</span>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Search</div>
          ${colHeads}
          ${row('specd-input', [['search',''],['placeholder','Search component name…']], html`<specd-input search placeholder="Search component name…" style="width:180px;"></specd-input>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Severity Filter Chips</div>
          ${colHeads}
          ${row('specd-chip', [['label','All'],['count','47'],['active','']], html`<specd-chip label="All" count="47" active></specd-chip>`)}
          ${row('specd-chip', [['label','Critical'],['count','2'],['severity','crit']], html`<specd-chip label="Critical" count="2" severity="crit"></specd-chip>`)}
          ${row('specd-chip', [['label','Warnings'],['count','31'],['severity','warn']], html`<specd-chip label="Warnings" count="31" severity="warn"></specd-chip>`)}
          ${row('specd-chip', [['label','Advisory'],['count','14']], html`<specd-chip label="Advisory" count="14"></specd-chip>`)}
          ${row('specd-chip', [['label','Ignored'],['count','3']], html`<specd-chip label="Ignored" count="3"></specd-chip>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Severity Headers</div>
          ${colHeads}
          ${row('specd-severity-header', [['intent','critical'],['label','Critical'],['count','2']], html`<specd-severity-header intent="critical" label="Critical" count="2" style="width:200px;"></specd-severity-header>`)}
          ${row('specd-severity-header', [['intent','warning'],['label','Warnings'],['count','31']], html`<specd-severity-header intent="warning" label="Warnings" count="31" style="width:200px;"></specd-severity-header>`)}
          ${row('specd-severity-header', [['intent','info'],['label','Advisory'],['count','14']], html`<specd-severity-header intent="info" label="Advisory" count="14" style="width:200px;"></specd-severity-header>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Issue Preview Card</div>
          ${colHeads}
          ${row('specd-issue-preview-card', [['component','ButtonPrimary'],['type','hard_coded_colours'],['count','3'],['severity','warn']], html`<specd-issue-preview-card component="ButtonPrimary" type="hard_coded_colours" count="3" severity="warn" style="width:220px;"></specd-issue-preview-card>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">In-card Sub-chips (inline filter)</div>
          ${colHeads}
          ${row('specd-chip', [['label','All'],['count','5'],['active','']], html`<specd-chip label="All" count="5" active></specd-chip>`)}
          ${row('specd-chip', [['label','Colour'],['count','3']], html`<specd-chip label="Colour" count="3"></specd-chip>`)}
          ${row('specd-chip', [['label','Spacing'],['count','2']], html`<specd-chip label="Spacing" count="2"></specd-chip>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Action Buttons</div>
          ${colHeads}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Apply']], html`<specd-button variant="ghost" size="sm" label="Apply"></specd-button>`)}
          ${row('specd-jump-btn', [['label','Jump']], html`<specd-jump-btn label="Jump"></specd-jump-btn>`)}
        </div>
      </div>
    `;
  },
};

// ---------------------------------------------------------------------------
// 3. Components Tab
// ---------------------------------------------------------------------------
export const ComponentsTab: Story = {
  name: 'Components Tab',
  render: () => {
    injectDocStyles();
    return html`
      <div class="pd-page">
        <h1>Components Tab — Component Inventory</h1>
        <p class="pd-subtitle">All specd-* components used to build the Components table page, with the exact props and variants.</p>

        <div class="pd-section">
          <div class="pd-section-title">Shell</div>
          ${colHeads}
          ${row('specd-app-header', [['name','Pulse'],['showrefresh',''],['showsettings','']], html`<specd-app-header name="Pulse" showrefresh showsettings style="width:200px;flex-shrink:0;"></specd-app-header>`)}
          ${row('specd-tab-bar', [['tabs','[…]'],['active','components']], html`<span style="font-size:11px;color:#6b7280;font-style:italic;">6-tab nav · active=components</span>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Toolbar</div>
          ${colHeads}
          ${row('specd-input', [['search',''],['placeholder','Search components…']], html`<specd-input search placeholder="Search components…" style="width:180px;"></specd-input>`)}
          ${row('specd-segmented', [['options','[…]'],['value','grid']], html`<specd-segmented .options=${[{label:'Grid',value:'grid'},{label:'List',value:'list'}]} value="grid"></specd-segmented>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Filter Chips</div>
          ${colHeads}
          ${row('specd-chip', [['label','All'],['count','152'],['active',''],['data-filter','all']], html`<specd-chip label="All" count="152" active></specd-chip>`)}
          ${row('specd-chip', [['label','No description'],['data-filter','no-description']], html`<specd-chip label="No description"></specd-chip>`)}
          ${row('specd-chip', [['label','No doc link'],['data-filter','no-doc-link']], html`<specd-chip label="No doc link"></specd-chip>`)}
          ${row('specd-chip', [['label','Hard-coded'],['data-filter','hard-coded']], html`<specd-chip label="Hard-coded"></specd-chip>`)}
          ${row('specd-chip', [['label','Not published'],['data-filter','not-published']], html`<specd-chip label="Not published"></specd-chip>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Table Cells</div>
          ${colHeads}
          ${row('specd-badge', [['intent','warn']], html`<specd-badge intent="warn"></specd-badge>`)}
          ${row('specd-tag', [['label','✓ Matched'],['intent','info']], html`<specd-tag label="✓ Matched" intent="info"></specd-tag>`)}
          ${row('specd-tag', [['label','✗ Missing'],['intent','crit']], html`<specd-tag label="✗ Missing" intent="crit"></specd-tag>`)}
          ${row('specd-tag', [['label','— Partial'],['intent','neutral']], html`<specd-tag label="— Partial" intent="neutral"></specd-tag>`)}
          ${row('specd-tag', [['label','Ready'],['intent','info']], html`<specd-tag label="Ready" intent="info"></specd-tag>`)}
          ${row('specd-tag', [['label','In Review'],['intent','warn']], html`<specd-tag label="In Review" intent="warn"></specd-tag>`)}
          ${row('specd-tag', [['label','In Progress'],['intent','neutral']], html`<specd-tag label="In Progress" intent="neutral"></specd-tag>`)}
          ${row('specd-jump-btn', [['label','Jump']], html`<specd-jump-btn label="Jump"></specd-jump-btn>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Pagination Buttons</div>
          ${colHeads}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','← Prev'],['disabled','']], html`<specd-button variant="ghost" size="sm" label="← Prev" disabled></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Next →']], html`<specd-button variant="ghost" size="sm" label="Next →"></specd-button>`)}
        </div>
      </div>
    `;
  },
};

// ---------------------------------------------------------------------------
// 4. Variables Tab
// ---------------------------------------------------------------------------
export const VariablesTab: Story = {
  name: 'Variables Tab',
  render: () => {
    injectDocStyles();
    return html`
      <div class="pd-page">
        <h1>Variables Tab — Component Inventory</h1>
        <p class="pd-subtitle">All specd-* components used to build the Variables page, with the exact props and variants.</p>

        <div class="pd-section">
          <div class="pd-section-title">Shell</div>
          ${colHeads}
          ${row('specd-app-header', [['name','Pulse'],['showrefresh',''],['showsettings','']], html`<specd-app-header name="Pulse" showrefresh showsettings style="width:200px;flex-shrink:0;"></specd-app-header>`)}
          ${row('specd-tab-bar', [['tabs','[…]'],['active','variables']], html`<span style="font-size:11px;color:#6b7280;font-style:italic;">6-tab nav · active=variables</span>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Section Labels</div>
          ${colHeads}
          ${row('specd-section-label', [['label','Token Coverage by Type'],['hint','1,847 layers scanned · 63% overall bound']], html`<specd-section-label label="Token Coverage by Type" hint="1,847 layers scanned"></specd-section-label>`)}
          ${row('specd-section-label', [['label','Variable Rules']], html`<specd-section-label label="Variable Rules"></specd-section-label>`)}
          ${row('specd-section-label', [['label','Hard-coded Hotspots']], html`<specd-section-label label="Hard-coded Hotspots"></specd-section-label>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Coverage Rows (×5)</div>
          ${colHeads}
          ${row('specd-cov-row', [['label','Fill'],['pct','81']], html`<specd-cov-row label="Fill" pct="81" style="width:200px;"></specd-cov-row>`)}
          ${row('specd-cov-row', [['label','Stroke'],['pct','54']], html`<specd-cov-row label="Stroke" pct="54" style="width:200px;"></specd-cov-row>`)}
          ${row('specd-cov-row', [['label','Spacing'],['pct','38']], html`<specd-cov-row label="Spacing" pct="38" style="width:200px;"></specd-cov-row>`)}
          ${row('specd-cov-row', [['label','Typography'],['pct','61']], html`<specd-cov-row label="Typography" pct="61" style="width:200px;"></specd-cov-row>`)}
          ${row('specd-cov-row', [['label','Radius'],['pct','74']], html`<specd-cov-row label="Radius" pct="74" style="width:200px;"></specd-cov-row>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Rule Type Chips</div>
          ${colHeads}
          ${row('specd-chip', [['label','Color'],['active','']], html`<specd-chip label="Color" active></specd-chip>`)}
          ${row('specd-chip', [['label','Spacing'],['active','']], html`<specd-chip label="Spacing" active></specd-chip>`)}
          ${row('specd-chip', [['label','Typography'],['active','']], html`<specd-chip label="Typography" active></specd-chip>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Buttons</div>
          ${colHeads}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Presets']], html`<specd-button variant="ghost" size="sm" label="Presets"></specd-button>`)}
          ${row('specd-button', [['variant','primary'],['size','sm'],['label','+ Add Rule']], html`<specd-button variant="primary" size="sm" label="+ Add Rule"></specd-button>`)}
          ${row('specd-button', [['variant','primary'],['size','sm'],['label','Apply']], html`<specd-button variant="primary" size="sm" label="Apply"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','+ New var']], html`<specd-button variant="ghost" size="sm" label="+ New var"></specd-button>`)}
        </div>
      </div>
    `;
  },
};

// ---------------------------------------------------------------------------
// 5. Settings Tab
// ---------------------------------------------------------------------------
export const SettingsTab: Story = {
  name: 'Settings Tab',
  render: () => {
    injectDocStyles();
    return html`
      <div class="pd-page">
        <h1>Settings Tab — Component Inventory</h1>
        <p class="pd-subtitle">All specd-* components used to build the Settings page, with the exact props and variants.</p>

        <div class="pd-section">
          <div class="pd-section-title">Shell</div>
          ${colHeads}
          ${row('specd-app-header', [['name','Pulse'],['showrefresh',''],['showsettings','']], html`<specd-app-header name="Pulse" showrefresh showsettings style="width:200px;flex-shrink:0;"></specd-app-header>`)}
          ${row('specd-tab-bar', [['tabs','[…]']], html`<span style="font-size:11px;color:#6b7280;font-style:italic;">6-tab nav</span>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Section Labels</div>
          ${colHeads}
          ${row('specd-section-label', [['label','Figma API']], html`<specd-section-label label="Figma API"></specd-section-label>`)}
          ${row('specd-section-label', [['label','What this unlocks']], html`<specd-section-label label="What this unlocks"></specd-section-label>`)}
          ${row('specd-section-label', [['label','Scan Options']], html`<specd-section-label label="Scan Options"></specd-section-label>`)}
          ${row('specd-section-label', [['label','Report Appearance']], html`<specd-section-label label="Report Appearance"></specd-section-label>`)}
          ${row('specd-section-label', [['label','About']], html`<specd-section-label label="About"></specd-section-label>`)}
          ${row('specd-section-label', [['label','Danger zone']], html`<specd-section-label label="Danger zone"></specd-section-label>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Inputs</div>
          ${colHeads}
          ${row('specd-input', [['type','password'],['placeholder','sk-ant-…']], html`<specd-input type="password" placeholder="sk-ant-…" style="width:180px;"></specd-input>`)}
          ${row('specd-input', [['type','text']], html`<specd-input type="text" style="width:180px;"></specd-input>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Toggle Rows (×5)</div>
          ${colHeads}
          ${row('specd-toggle-row', [['label','Include component sets'],['checked','']], html`<specd-toggle-row label="Include component sets" checked style="width:220px;display:block;"></specd-toggle-row>`)}
          ${row('specd-toggle-row', [['label','Include private components'],['hint','_name or .name prefixed layers']], html`<specd-toggle-row label="Include private components" hint="_name or .name prefixed layers" style="width:220px;display:block;"></specd-toggle-row>`)}
          ${row('specd-toggle-row', [['label','Ignore hidden layers'],['hint','Hidden layers don\'t affect rendered output'],['checked','']], html`<specd-toggle-row label="Ignore hidden layers" checked style="width:220px;display:block;"></specd-toggle-row>`)}
          ${row('specd-toggle-row', [['label','Include local library'],['hint','Treat this file\'s own variables as approved tokens'],['checked','']], html`<specd-toggle-row label="Include local library" checked style="width:220px;display:block;"></specd-toggle-row>`)}
          ${row('specd-toggle-row', [['label','Canvas credit footer'],['checked','']], html`<specd-toggle-row label="Canvas credit footer" checked style="width:220px;display:block;"></specd-toggle-row>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Buttons</div>
          ${colHeads}
          ${row('specd-button', [['variant','danger'],['size','sm'],['label','Disconnect']], html`<specd-button variant="danger" size="sm" label="Disconnect"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Save key']], html`<specd-button variant="ghost" size="sm" label="Save key"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Remove']], html`<specd-button variant="ghost" size="sm" label="Remove"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Go to Variables tab']], html`<specd-button variant="ghost" size="sm" label="Go to Variables tab"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Replay']], html`<specd-button variant="ghost" size="sm" label="Replay"></specd-button>`)}
          ${row('specd-button', [['variant','danger'],['label','Reset Pulse…'],['full','']], html`<specd-button variant="danger" label="Reset Pulse…" full></specd-button>`)}
        </div>
      </div>
    `;
  },
};

// ---------------------------------------------------------------------------
// 6. Storybook Tab
// ---------------------------------------------------------------------------
export const StorybookTab: Story = {
  name: 'Storybook Tab',
  render: () => {
    injectDocStyles();
    return html`
      <div class="pd-page">
        <h1>Storybook Tab — Component Inventory</h1>
        <p class="pd-subtitle">All specd-* components used to build the Storybook connection page, with the exact props and variants.</p>

        <div class="pd-section">
          <div class="pd-section-title">Shell</div>
          ${colHeads}
          ${row('specd-app-header', [['name','Pulse'],['showrefresh',''],['showsettings','']], html`<specd-app-header name="Pulse" showrefresh showsettings style="width:200px;flex-shrink:0;"></specd-app-header>`)}
          ${row('specd-tab-bar', [['tabs','[…]'],['active','storybook']], html`<span style="font-size:11px;color:#6b7280;font-style:italic;">6-tab nav · active=storybook</span>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Section Labels</div>
          ${colHeads}
          ${row('specd-section-label', [['label','Connected Storybook']], html`<specd-section-label label="Connected Storybook"></specd-section-label>`)}
          ${row('specd-section-label', [['label','Sync Score']], html`<specd-section-label label="Sync Score"></specd-section-label>`)}
          ${row('specd-section-label', [['label','Component Mappings']], html`<specd-section-label label="Component Mappings"></specd-section-label>`)}
          ${row('specd-section-label', [['label','Manual Upload']], html`<specd-section-label label="Manual Upload"></specd-section-label>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Inputs</div>
          ${colHeads}
          ${row('specd-input', [['type','url'],['value','https://storybook.acme.design']], html`<specd-input type="url" value="https://storybook.acme.design" style="width:200px;"></specd-input>`)}
          ${row('specd-input', [['type','url'],['placeholder','https://storybook.yourcompany.com']], html`<specd-input type="url" placeholder="https://storybook.yourcompany.com" style="width:200px;"></specd-input>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Sync Score Ring</div>
          ${colHeads}
          ${row('specd-score-ring', [['score','32'],['tier','poor'],['size','48']], html`<specd-score-ring score="32" tier="poor" size="48"></specd-score-ring>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Match Quality Tags</div>
          ${colHeads}
          ${row('specd-tag', [['label','✓ Matched'],['intent','info']], html`<specd-tag label="✓ Matched" intent="info"></specd-tag>`)}
          ${row('specd-tag', [['label','—'],['intent','neutral']], html`<specd-tag label="—" intent="neutral"></specd-tag>`)}
          ${row('specd-tag', [['label','✗ Missing'],['intent','crit']], html`<specd-tag label="✗ Missing" intent="crit"></specd-tag>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Buttons</div>
          ${colHeads}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Disconnect'],['full','']], html`<specd-button variant="ghost" size="sm" label="Disconnect" full></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Re-fetch'],['full','']], html`<specd-button variant="ghost" size="sm" label="Re-fetch" full></specd-button>`)}
          ${row('specd-button', [['variant','primary'],['label','Apply accepted links'],['full','']], html`<specd-button variant="primary" label="Apply accepted links" full></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['label','Upload index.json'],['full','']], html`<specd-button variant="ghost" label="Upload index.json" full></specd-button>`)}
        </div>
      </div>
    `;
  },
};

// ---------------------------------------------------------------------------
// 7. Bulk Fix Wizard
// ---------------------------------------------------------------------------
export const BulkFixWizard: Story = {
  name: 'Bulk Fix Wizard',
  render: () => {
    injectDocStyles();
    return html`
      <div class="pd-page">
        <h1>Bulk Fix Wizard — Component Inventory</h1>
        <p class="pd-subtitle">All specd-* components used in the bulk variable fix overlay, with the exact props and variants.</p>

        <div class="pd-section">
          <div class="pd-section-title">Shell</div>
          ${colHeads}
          ${row('specd-app-header', [['name','Pulse'],['showrefresh',''],['showsettings','']], html`<specd-app-header name="Pulse" showrefresh showsettings style="width:200px;flex-shrink:0;"></specd-app-header>`)}
          ${row('specd-tab-bar', [['tabs','[…]'],['active','issues']], html`<span style="font-size:11px;color:#6b7280;font-style:italic;">6-tab nav · active=issues</span>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Category Filter Chips</div>
          ${colHeads}
          ${row('specd-chip', [['label','All'],['count','902'],['active','']], html`<specd-chip label="All" count="902" active></specd-chip>`)}
          ${row('specd-chip', [['label','Colour'],['count','51']], html`<specd-chip label="Colour" count="51"></specd-chip>`)}
          ${row('specd-chip', [['label','Spacing'],['count','816']], html`<specd-chip label="Spacing" count="816"></specd-chip>`)}
          ${row('specd-chip', [['label','Typography'],['count','3']], html`<specd-chip label="Typography" count="3"></specd-chip>`)}
          ${row('specd-chip', [['label','Radius'],['count','0']], html`<specd-chip label="Radius" count="0"></specd-chip>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Color Swatches (current → suggested)</div>
          ${colHeads}
          ${row('specd-color-swatch', [['color','#3b82f6'],['label','#3b82f6'],['sm','']], html`<specd-color-swatch color="#3b82f6" label="#3b82f6" sm></specd-color-swatch>`)}
          ${row('specd-color-swatch', [['color','#3b82f6'],['label','semantic/fill/primary'],['sm','']], html`<specd-color-swatch color="#3b82f6" label="semantic/fill/primary" sm></specd-color-swatch>`)}
          ${row('specd-color-swatch', [['color','#f8f9fc'],['label','color/surface/default'],['sm','']], html`<specd-color-swatch color="#f8f9fc" label="color/surface/default" sm></specd-color-swatch>`)}
          ${row('specd-color-swatch', [['color','#b8cadf'],['label','color/border/default'],['sm','']], html`<specd-color-swatch color="#b8cadf" label="color/border/default" sm></specd-color-swatch>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Buttons</div>
          ${colHeads}
          ${row('specd-button', [['variant','ghost'],['label','Single'],['size','sm']], html`<specd-button variant="ghost" label="Single" size="sm"></specd-button>`)}
          ${row('specd-button', [['variant','primary'],['label','Apply'],['size','sm']], html`<specd-button variant="primary" label="Apply" size="sm"></specd-button>`)}
          ${row('specd-button', [['variant','primary'],['label','Applied'],['size','sm'],['disabled','']], html`<specd-button variant="primary" label="Applied" size="sm" disabled></specd-button>`)}
          ${row('specd-button', [['variant','primary'],['label','Apply all 867'],['full','']], html`<specd-button variant="primary" label="Apply all 867" full></specd-button>`)}
        </div>
      </div>
    `;
  },
};

// ---------------------------------------------------------------------------
// 8. Library Tab
// ---------------------------------------------------------------------------
export const LibraryTab: Story = {
  name: 'Library Tab',
  render: () => {
    injectDocStyles();
    return html`
      <div class="pd-page">
        <h1>Library Tab — Component Inventory</h1>
        <p class="pd-subtitle">All specd-* components used to build the Library usage page, with the exact props and variants.</p>

        <div class="pd-section">
          <div class="pd-section-title">Shell</div>
          ${colHeads}
          ${row('specd-app-header', [['name','Pulse'],['showrefresh',''],['showsettings','']], html`<specd-app-header name="Pulse" showrefresh showsettings style="width:200px;flex-shrink:0;"></specd-app-header>`)}
          ${row('specd-tab-bar', [['tabs','[…]'],['active','library']], html`<span style="font-size:11px;color:#6b7280;font-style:italic;">6-tab nav · active=library</span>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Section Labels</div>
          ${colHeads}
          ${row('specd-section-label', [['label','Variable Usage by Library']], html`<specd-section-label label="Variable Usage by Library"></specd-section-label>`)}
          ${row('specd-section-label', [['label','Usage Breakdown'],['hint','Which variable collections are used most across your components.']], html`<specd-section-label label="Usage Breakdown" hint="Which collections are used most"></specd-section-label>`)}
          ${row('specd-section-label', [['label','Unused Variables'],['hint','Variables defined in connected libraries but never used in this file.']], html`<specd-section-label label="Unused Variables" hint="Variables never used in this file"></specd-section-label>`)}
          ${row('specd-section-label', [['label','Hard-coded Hotspots'],['hint','Frequent values with no variable binding.']], html`<specd-section-label label="Hard-coded Hotspots" hint="Frequent values with no variable binding"></specd-section-label>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Library Purpose Tags</div>
          ${colHeads}
          ${row('specd-tag', [['label','Variables'],['intent','info']], html`<specd-tag label="Variables" intent="info"></specd-tag>`)}
          ${row('specd-tag', [['label','Closest match'],['intent','warn']], html`<specd-tag label="Closest match" intent="warn"></specd-tag>`)}
          ${row('specd-tag', [['label','Exact match'],['intent','info']], html`<specd-tag label="Exact match" intent="info"></specd-tag>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">KV Rows (unused variables)</div>
          ${colHeads}
          ${row('specd-kv-row', [['label','semantic/color/brand-tertiary'],['value','0 uses'],['mono','']], html`<specd-kv-row label="semantic/color/brand-tertiary" value="0 uses" mono style="width:220px;"></specd-kv-row>`)}
          ${row('specd-kv-row', [['label','primitives/purple-100'],['value','0 uses'],['mono','']], html`<specd-kv-row label="primitives/purple-100" value="0 uses" mono style="width:220px;"></specd-kv-row>`)}
          ${row('specd-kv-row', [['label','semantic/shadow/overlay'],['value','0 uses'],['mono','']], html`<specd-kv-row label="semantic/shadow/overlay" value="0 uses" mono style="width:220px;"></specd-kv-row>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Buttons</div>
          ${colHeads}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Disconnect']], html`<specd-button variant="ghost" size="sm" label="Disconnect"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','View all 12 collections']], html`<specd-button variant="ghost" size="sm" label="View all 12 collections"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','View more (23 total)']], html`<specd-button variant="ghost" size="sm" label="View more (23 total)"></specd-button>`)}
          ${row('specd-button', [['variant','primary'],['size','sm'],['label','Apply']], html`<specd-button variant="primary" size="sm" label="Apply"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','New var']], html`<specd-button variant="ghost" size="sm" label="New var"></specd-button>`)}
        </div>
      </div>
    `;
  },
};

// ---------------------------------------------------------------------------
// 9. Quick Fix Panel
// ---------------------------------------------------------------------------
export const QuickFixPanel: Story = {
  name: 'Quick Fix Panel',
  render: () => {
    injectDocStyles();
    return html`
      <div class="pd-page">
        <h1>Quick Fix Panel — Component Inventory</h1>
        <p class="pd-subtitle">All specd-* components used in the single-component quick fix overlay, with the exact props and variants.</p>

        <div class="pd-section">
          <div class="pd-section-title">Shell</div>
          ${colHeads}
          ${row('specd-app-header', [['name','Pulse'],['showrefresh',''],['showsettings','']], html`<specd-app-header name="Pulse" showrefresh showsettings style="width:200px;flex-shrink:0;"></specd-app-header>`)}
          ${row('specd-tab-bar', [['tabs','[…]'],['active','issues']], html`<span style="font-size:11px;color:#6b7280;font-style:italic;">6-tab nav · active=issues</span>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Category Filter Chips</div>
          ${colHeads}
          ${row('specd-chip', [['label','All'],['count','902'],['active','']], html`<specd-chip label="All" count="902" active></specd-chip>`)}
          ${row('specd-chip', [['label','Colour'],['count','51']], html`<specd-chip label="Colour" count="51"></specd-chip>`)}
          ${row('specd-chip', [['label','Spacing'],['count','816']], html`<specd-chip label="Spacing" count="816"></specd-chip>`)}
          ${row('specd-chip', [['label','Radius'],['count','0']], html`<specd-chip label="Radius" count="0"></specd-chip>`)}
          ${row('specd-chip', [['label','Typography'],['count','3']], html`<specd-chip label="Typography" count="3"></specd-chip>`)}
          ${row('specd-chip', [['label','Dev Status'],['count','0']], html`<specd-chip label="Dev Status" count="0"></specd-chip>`)}
          ${row('specd-chip', [['label','Storybook'],['count','32']], html`<specd-chip label="Storybook" count="32"></specd-chip>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Issue Header Row</div>
          ${colHeads}
          ${row('specd-jump-btn', [['label','Jump']], html`<specd-jump-btn label="Jump"></specd-jump-btn>`)}
          ${row('specd-color-swatch', [['color','#2c2822'],['label','#2C2822']], html`<specd-color-swatch color="#2c2822" label="#2C2822"></specd-color-swatch>`)}
          ${row('specd-tag', [['label','Colour · Fill'],['intent','info']], html`<specd-tag label="Colour · Fill" intent="info"></specd-tag>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Ignore']], html`<specd-button variant="ghost" size="sm" label="Ignore"></specd-button>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Radio Rows — variable suggestions (×6)</div>
          ${colHeads}
          ${row('specd-radio-row', [['value','semantic/fill/primary'],['label','semantic/fill/primary'],['collection','Specd DS'],['color','#3b82f6'],['hex','#3b82f6'],['checked','']], html`<specd-radio-row value="semantic/fill/primary" label="semantic/fill/primary" collection="Specd DS" color="#3b82f6" hex="#3b82f6" checked style="width:220px;"></specd-radio-row>`)}
          ${row('specd-radio-row', [['value','primitives/blue-500'],['label','primitives/blue-500'],['collection','Specd DS'],['color','#3b82f6'],['hex','#3b82f6']], html`<specd-radio-row value="primitives/blue-500" label="primitives/blue-500" collection="Specd DS" color="#3b82f6" hex="#3b82f6" style="width:220px;"></specd-radio-row>`)}
        </div>

        <div class="pd-section">
          <div class="pd-section-title">Navigation &amp; Action Buttons</div>
          ${colHeads}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Close']], html`<specd-button variant="ghost" size="sm" label="Close"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Bulk']], html`<specd-button variant="ghost" size="sm" label="Bulk"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Show more'],['full','']], html`<specd-button variant="ghost" size="sm" label="Show more" full></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','← Prev']], html`<specd-button variant="ghost" size="sm" label="← Prev"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Next →']], html`<specd-button variant="ghost" size="sm" label="Next →"></specd-button>`)}
          ${row('specd-button', [['variant','ghost'],['size','sm'],['label','Apply Fix']], html`<specd-button variant="ghost" size="sm" label="Apply Fix"></specd-button>`)}
          ${row('specd-button', [['variant','primary'],['size','sm'],['label','Apply to all'],['badge','902']], html`<specd-button variant="primary" size="sm" label="Apply to all" badge="902"></specd-button>`)}
        </div>
      </div>
    `;
  },
};
