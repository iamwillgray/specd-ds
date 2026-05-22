import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../components/Chip/SpecdChip.js';
import '../../components/Input/SpecdInput.js';
import '../../components/IssuePreviewCard/SpecdIssuePreviewCard.js';
import '../../components/SeverityHeader/SpecdSeverityHeader.js';

const meta: Meta = {
  title: 'Pages/IssuesTab',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const componentContent = () => html`
  <div style="width:360px; background:var(--bg, #f8f9fc); min-height:500px; overflow-y:auto; font-family:var(--font, Inter, sans-serif);">
    <!-- Search + filter bar -->
    <div style="padding:10px 12px 8px; display:flex; flex-direction:column; gap:8px; border-bottom:1px solid var(--border, rgba(0,0,0,0.08));">
      <specd-input search placeholder="Search issues…"></specd-input>
      <div style="display:flex; gap:6px; flex-wrap:wrap;">
        <specd-chip label="All" count="47" active clickable></specd-chip>
        <specd-chip label="Critical" count="3" severity="crit" clickable></specd-chip>
        <specd-chip label="Warning" count="12" severity="warn" clickable></specd-chip>
        <specd-chip label="Info" count="32" clickable></specd-chip>
        <specd-chip label="Ignored" count="5" clickable></specd-chip>
      </div>
    </div>

    <!-- Issues list -->
    <div style="padding:8px 12px; display:flex; flex-direction:column; gap:6px;">

      <!-- Critical section -->
      <specd-severity-header intent="critical" label="Critical" count="3"></specd-severity-header>

      <specd-issue-preview-card
        component="Button/Primary"
        type="Missing desc"
        count="!"
        severity="crit"
        tags='[{"label":"No description","sev":"crit"},{"label":"Published component","sev":"neutral"}]'
      ></specd-issue-preview-card>

      <specd-issue-preview-card
        component="Card/Elevated"
        type="Missing desc"
        count="!"
        severity="crit"
        tags='[{"label":"No description","sev":"crit"},{"label":"No doc link","sev":"crit"}]'
      ></specd-issue-preview-card>

      <specd-issue-preview-card
        component="Icon/Arrow/Right"
        type="No doc link"
        count="!"
        severity="crit"
        tags='[{"label":"Published • Required","sev":"crit"}]'
      ></specd-issue-preview-card>

      <!-- Warning section -->
      <specd-severity-header intent="warning" label="Warning" count="12"></specd-severity-header>

      <specd-issue-preview-card
        component="Input/Default"
        type="Hard-coded"
        count="3"
        severity="warn"
        tags='[{"label":"Hard-coded colour","sev":"warn"},{"label":"Fill • #3b82f6","sev":"neutral"}]'
      ></specd-issue-preview-card>

      <specd-issue-preview-card
        component="Modal/Overlay"
        type="Hard-coded"
        count="2"
        severity="warn"
        tags='[{"label":"Hard-coded spacing","sev":"warn"},{"label":"paddingLeft 16px","sev":"neutral"}]'
      ></specd-issue-preview-card>

    </div>
  </div>
`;

const rawContent = () => html`
  <div style="width:360px; background:var(--bg, #f8f9fc); min-height:500px; overflow-y:auto; font-family:var(--font, Inter, sans-serif);">
    <!-- Search + filter bar -->
    <div style="padding:10px 12px 8px; display:flex; flex-direction:column; gap:8px; border-bottom:1px solid var(--border, rgba(0,0,0,0.08));">
      <input class="input table-search" type="text" placeholder="Search issues…" />
      <div style="display:flex; gap:6px; flex-wrap:wrap;">
        <span class="chip-v2 active">All <span class="chip-count">47</span></span>
        <span class="chip-v2 chip-crit">Critical <span class="chip-count">3</span></span>
        <span class="chip-v2 chip-warn">Warning <span class="chip-count">12</span></span>
        <span class="chip-v2">Info <span class="chip-count">32</span></span>
        <span class="chip-v2">Ignored <span class="chip-count">5</span></span>
      </div>
    </div>

    <!-- Issues list -->
    <div style="padding:8px 12px; display:flex; flex-direction:column; gap:6px;">

      <!-- Critical section -->
      <div class="severity-header">
        <span class="severity-dot critical"></span>
        <span class="severity-title">Critical</span>
        <span class="severity-count critical">3</span>
      </div>

      <!-- Issue card 1 -->
      <div class="issue-card">
        <div class="issue-content">
          <div class="issue-card-top">
            <div class="issue-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" style="width:12px;height:12px;flex-shrink:0;color:var(--icon-secondary)"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>
            </div>
            <span class="issue-name">Button/Primary</span>
            <span class="issue-card-count crit">Missing desc <span class="issue-card-count-badge">!</span></span>
          </div>
          <div class="issue-tag-row stacked">
            <span class="tag intent-crit">No description</span>
            <span class="tag intent-neutral">Published component</span>
          </div>
        </div>
        <div class="issue-card-footer">
          <button class="btn-jump" type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
            Jump to component
          </button>
          <button class="btn-view-fixes" type="button">View Fixes</button>
        </div>
      </div>

      <!-- Issue card 2 -->
      <div class="issue-card">
        <div class="issue-content">
          <div class="issue-card-top">
            <div class="issue-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" style="width:12px;height:12px;flex-shrink:0;color:var(--icon-secondary)"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>
            </div>
            <span class="issue-name">Card/Elevated</span>
            <span class="issue-card-count crit">Missing desc <span class="issue-card-count-badge">!</span></span>
          </div>
          <div class="issue-tag-row stacked">
            <span class="tag intent-crit">No description</span>
            <span class="tag intent-crit">No doc link</span>
          </div>
        </div>
        <div class="issue-card-footer">
          <button class="btn-jump" type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
            Jump to component
          </button>
          <button class="btn-view-fixes" type="button">View Fixes</button>
        </div>
      </div>

      <!-- Warning section -->
      <div class="severity-header">
        <span class="severity-dot warning"></span>
        <span class="severity-title">Warning</span>
        <span class="severity-count warning">12</span>
      </div>

      <!-- Issue card 3 -->
      <div class="issue-card">
        <div class="issue-content">
          <div class="issue-card-top">
            <div class="issue-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" style="width:12px;height:12px;flex-shrink:0;color:var(--icon-secondary)"><path d="M12 3l9 9-9 9-9-9 9-9z"/></svg>
            </div>
            <span class="issue-name">Input/Default</span>
            <span class="issue-card-count warn">Hard-coded <span class="issue-card-count-badge">3</span></span>
          </div>
          <div class="issue-tag-row stacked">
            <span class="tag intent-warn">Hard-coded colour</span>
            <span class="tag intent-neutral">Fill • #3b82f6</span>
          </div>
        </div>
        <div class="issue-card-footer">
          <button class="btn-jump" type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
            Jump to component
          </button>
          <button class="btn-view-fixes" type="button">View Fixes <span class="view-fixes-count">3</span></button>
        </div>
      </div>

    </div>
  </div>
`;

export const PluginView: Story = {
  name: 'Plugin View',
  parameters: { layout: 'padded' },
  render: () => html`
    <div style="padding:16px; background:var(--bg, #f8f9fc); min-height:100vh;">
      ${componentContent()}
    </div>
  `,
};

export const Compare: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => html`
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0; min-height:100vh;">
      <div style="border-right:2px solid #dbeafe; padding:16px; background:var(--bg, #f8f9fc);">
        <p style="font:700 10px var(--font-mono, 'IBM Plex Mono', monospace); color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">
          Reference (CSS only)
        </p>
        ${rawContent()}
      </div>
      <div style="padding:16px; background:var(--bg, #f8f9fc);">
        <p style="font:700 10px var(--font-mono, 'IBM Plex Mono', monospace); color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">
          Component build
        </p>
        ${componentContent()}
      </div>
    </div>
  `,
};
