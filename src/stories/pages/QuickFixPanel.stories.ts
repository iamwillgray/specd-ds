import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../components/IssueRow/SpecdIssueRow.js';
import '../../components/SectionLabel/SpecdSectionLabel.js';

const meta: Meta = {
  title: 'Pages/QuickFixPanel',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const componentContent = () => html`
  <div style="width:360px; background:var(--bg, #f8f9fc); min-height:500px; overflow-y:auto; font-family:var(--font, Inter, sans-serif);">

    <!-- Panel header -->
    <div style="padding:12px 14px 8px; border-bottom:1px solid var(--border, rgba(0,0,0,0.08));">
      <specd-section-label label="Quick Fix" hint="Button/Primary — 4 issues to resolve"></specd-section-label>
    </div>

    <!-- Issue rows -->
    <div style="padding:8px 12px; display:flex; flex-direction:column; gap:2px;">

      <!-- 1. Doc link — initial state -->
      <specd-issue-row
        fieldtype="doc-link"
        title="Documentation link"
        description="Add a link to the component documentation page"
        rowstate="initial"
      ></specd-issue-row>

      <!-- 2. Doc link — editing state -->
      <specd-issue-row
        fieldtype="doc-link"
        title="Documentation link"
        description="Enter the URL for this component's docs"
        rowstate="editing"
        value="https://zeroheight.com/design-system/"
      ></specd-issue-row>

      <!-- 3. Description — initial state (Write with AI button) -->
      <specd-issue-row
        fieldtype="description"
        title="Component description"
        description="Describe what this component does and when to use it"
        rowstate="initial"
      ></specd-issue-row>

      <!-- 4. Dev ready — applied state -->
      <specd-issue-row
        fieldtype="dev-ready"
        title="Mark as dev ready"
        description="Signal that this component is ready for engineering handoff"
        rowstate="applied"
      ></specd-issue-row>

      <!-- 5. Hard-coded colour — editing state with assign panel -->
      <specd-issue-row
        fieldtype="hard-coded"
        title="Hard-coded colour"
        description="Fill #3b82f6 on Button/Primary/bg layer is not bound to a variable"
        rowstate="editing"
      >
        <!-- slot content: assign panel -->
        <div class="row-assign-panel" slot="fix-children" style="padding:8px 0 4px;">
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:8px;">
            <span class="chip-v2 active">All <span class="chip-count">3</span></span>
            <span class="chip-v2">Semantic <span class="chip-count">1</span></span>
            <span class="chip-v2">Primitives <span class="chip-count">2</span></span>
          </div>
          <div class="qf-replace-row selected">
            <span class="qf-replace-radio"></span>
            <div class="qf-replace-body">
              <div class="qf-replace-name">Semantic/Interactive/Default</div>
              <div class="qf-replace-collection">Semantic <span class="qf-modal-hex">#3B82F6</span></div>
            </div>
            <span class="qf-replace-swatch" style="background:#3b82f6;"></span>
          </div>
          <div class="qf-replace-row">
            <span class="qf-replace-radio"></span>
            <div class="qf-replace-body">
              <div class="qf-replace-name">Primitives/Blue 500</div>
              <div class="qf-replace-collection">Primitives <span class="qf-modal-hex">#3B82F6</span></div>
            </div>
            <span class="qf-replace-swatch" style="background:#3b82f6;"></span>
          </div>
        </div>
      </specd-issue-row>

    </div>

    <!-- QF Replace rows standalone demo -->
    <div style="padding:8px 12px 16px;">
      <div style="font-family:var(--font-mono, 'IBM Plex Mono', monospace); font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-muted, #6b7280); margin-bottom:8px;">
        Variable suggestions
      </div>
      <div class="qf-replace-row selected">
        <span class="qf-replace-radio"></span>
        <div class="qf-replace-body">
          <div class="qf-replace-name">Semantic/Interactive/Default</div>
          <div class="qf-replace-collection">Semantic <span class="qf-modal-hex">#3B82F6</span></div>
        </div>
        <span class="qf-replace-swatch" style="background:#3b82f6;"></span>
      </div>
      <div class="qf-replace-row">
        <span class="qf-replace-radio"></span>
        <div class="qf-replace-body">
          <div class="qf-replace-name">Primitives/Blue 500</div>
          <div class="qf-replace-collection">Primitives <span class="qf-modal-hex">#3B82F6</span></div>
        </div>
        <span class="qf-replace-swatch" style="background:#3b82f6;"></span>
      </div>
      <div class="qf-replace-row">
        <span class="qf-replace-radio"></span>
        <div class="qf-replace-body">
          <div class="qf-replace-name">Primitives/Navy</div>
          <div class="qf-replace-collection">Primitives <span class="qf-modal-hex">#0C1F3F</span></div>
        </div>
        <span class="qf-replace-swatch" style="background:#0c1f3f;"></span>
      </div>
    </div>

  </div>
`;

const rawContent = () => html`
  <div style="width:360px; background:var(--bg, #f8f9fc); min-height:500px; overflow-y:auto; font-family:var(--font, Inter, sans-serif);">

    <!-- Panel header -->
    <div style="padding:12px 14px 8px; border-bottom:1px solid var(--border, rgba(0,0,0,0.08));">
      <div class="section-label">Quick Fix</div>
      <div class="section-label-hint">Button/Primary — 4 issues to resolve</div>
    </div>

    <!-- Issue rows (raw CSS representations) -->
    <div style="padding:8px 12px; display:flex; flex-direction:column; gap:2px;">

      <!-- 1. Doc link — initial -->
      <div class="issue-row" data-row-state="initial">
        <div class="issue-row-top">
          <div class="issue-row-body">
            <div class="issue-row-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              Documentation link
            </div>
            <div class="issue-row-desc">Add a link to the component documentation page</div>
          </div>
          <div class="row-state-initial">
            <button class="btn-row-primary" type="button">Add doc link</button>
          </div>
          <div class="row-state-applied" style="display:none; align-items:center; gap:6px;">
            <button class="btn-row-applied" disabled>✓ Applied</button>
          </div>
        </div>
        <div class="row-state-editing" style="display:none;">
          <div class="row-link-field is-editing">
            <input type="url" placeholder="https://…" />
            <div class="row-edit-cluster">
              <button class="btn-save-pill">Save</button>
              <button class="btn-cancel-pill">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Doc link — editing -->
      <div class="issue-row" data-row-state="editing">
        <div class="issue-row-top">
          <div class="issue-row-body">
            <div class="issue-row-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              Documentation link
            </div>
          </div>
          <div class="row-state-initial" style="display:none;">
            <button class="btn-row-primary" type="button">Add doc link</button>
          </div>
        </div>
        <div class="row-state-editing">
          <div class="row-link-field is-editing">
            <input type="url" placeholder="https://…" value="https://zeroheight.com/design-system/" />
            <div class="row-edit-cluster">
              <button class="btn-save-pill">Save</button>
              <button class="btn-cancel-pill">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Description — initial (AI gradient button) -->
      <div class="issue-row" data-row-state="initial">
        <div class="issue-row-top">
          <div class="issue-row-body">
            <div class="issue-row-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
              Component description
            </div>
            <div class="issue-row-desc">Describe what this component does and when to use it</div>
          </div>
          <div class="row-state-initial">
            <button class="btn-ai-gradient" type="button">
              <span class="ai-icon">
                <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l1.8 4.2L16 8l-4.2 1.8L10 14 8.2 9.8 4 8l4.2-1.8L10 2z"/></svg>
              </span>
              <span class="ai-text">Write with AI</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 4. Dev ready — applied -->
      <div class="issue-row" data-row-state="applied">
        <div class="issue-row-top">
          <div class="issue-row-body">
            <div class="issue-row-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Mark as dev ready
            </div>
          </div>
          <div class="row-state-applied" style="display:flex; align-items:center; gap:6px;">
            <button class="btn-row-applied" type="button" disabled>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Applied
            </button>
            <button class="btn-edit-pill" type="button">Edit</button>
          </div>
        </div>
      </div>

    </div>

    <!-- QF Replace rows -->
    <div style="padding:8px 12px 16px;">
      <div style="font-family:var(--font-mono, 'IBM Plex Mono', monospace); font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-muted, #6b7280); margin-bottom:8px;">
        Variable suggestions
      </div>
      <div class="qf-replace-row selected">
        <span class="qf-replace-radio"></span>
        <div class="qf-replace-body">
          <div class="qf-replace-name">Semantic/Interactive/Default</div>
          <div class="qf-replace-collection">Semantic <span class="qf-modal-hex">#3B82F6</span></div>
        </div>
        <span class="qf-replace-swatch" style="background:#3b82f6;"></span>
      </div>
      <div class="qf-replace-row">
        <span class="qf-replace-radio"></span>
        <div class="qf-replace-body">
          <div class="qf-replace-name">Primitives/Blue 500</div>
          <div class="qf-replace-collection">Primitives <span class="qf-modal-hex">#3B82F6</span></div>
        </div>
        <span class="qf-replace-swatch" style="background:#3b82f6;"></span>
      </div>
      <div class="qf-replace-row">
        <span class="qf-replace-radio"></span>
        <div class="qf-replace-body">
          <div class="qf-replace-name">Primitives/Navy</div>
          <div class="qf-replace-collection">Primitives <span class="qf-modal-hex">#0C1F3F</span></div>
        </div>
        <span class="qf-replace-swatch" style="background:#0c1f3f;"></span>
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
